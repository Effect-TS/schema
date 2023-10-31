/**
 * @since 1.0.0
 */

import * as AST from "@effect/schema/AST"
import * as Parser from "@effect/schema/Parser"
import type * as S from "@effect/schema/Schema"
import * as Either from "effect/Either"
import * as Equivalence from "effect/Equivalence"
import * as Option from "effect/Option"
import * as ReadonlyArray from "effect/ReadonlyArray"
import * as Internal from "./internal/common"

/**
 * @category hooks
 * @since 1.0.0
 */
export const EquivalenceHookId = Internal.EquivalenceHookId

/**
 * @category Equivalence
 * @since 1.0.0
 */
export const to = <I, A>(schema: S.Schema<I, A>): Equivalence.Equivalence<A> =>
  go(AST.to(schema.ast))

/**
 * @category Equivalence
 * @since 1.0.0
 */
export const from = <I, A>(schema: S.Schema<I, A>): Equivalence.Equivalence<I> =>
  go(AST.from(schema.ast))

const getHook = AST.getAnnotation<
  (...args: ReadonlyArray<Equivalence.Equivalence<any>>) => Equivalence.Equivalence<any>
>(
  EquivalenceHookId
)

const is = (ast: AST.AST) => {
  const getEither = Parser.getEither(ast, true)
  return (i: unknown) => Either.isRight(getEither(i))
}

const go = (ast: AST.AST): Equivalence.Equivalence<any> => {
  const hook = getHook(ast)
  if (Option.isSome(hook)) {
    return AST.isDeclaration(ast) ? hook.value(...ast.typeParameters.map(go)) : hook.value()
  }
  switch (ast._tag) {
    case "NeverKeyword":
      throw new Error("cannot build an Equivalence for `never`")
    case "Transform":
      throw new Error("cannot build an Equivalence for transformations")
    case "Declaration":
    case "Literal":
    case "StringKeyword":
    case "TemplateLiteral":
    case "UniqueSymbol":
    case "SymbolKeyword":
    case "UnknownKeyword":
    case "AnyKeyword":
    case "NumberKeyword":
    case "BooleanKeyword":
    case "BigIntKeyword":
    case "UndefinedKeyword":
    case "VoidKeyword":
    case "Enums":
    case "ObjectKeyword":
      return Equivalence.strict()
    case "Refinement":
      return go(ast.from)
    case "Lazy": {
      const get = Internal.memoizeThunk(() => go(ast.f()))
      return (a, b) => get()(a, b)
    }
    case "Tuple": {
      const elements = ast.elements.map((element) => go(element.type))
      const rest = Option.map(ast.rest, ReadonlyArray.map(go))
      return Equivalence.make((a, b) => {
        if (a.length !== b.length) {
          return false
        }
        // ---------------------------------------------
        // handle elements
        // ---------------------------------------------
        let i = 0
        for (; i < ast.elements.length; i++) {
          if (!elements[i](a[i], b[i])) {
            return false
          }
        }
        // ---------------------------------------------
        // handle rest element
        // ---------------------------------------------
        if (Option.isSome(rest)) {
          const head = ReadonlyArray.headNonEmpty(rest.value)
          const tail = ReadonlyArray.tailNonEmpty(rest.value)
          for (; i < a.length - tail.length; i++) {
            if (!head(a[i], b[i])) {
              return false
            }
          }
          // ---------------------------------------------
          // handle post rest elements
          // ---------------------------------------------
          for (let j = 0; j < tail.length; j++) {
            i += j
            if (!tail[j](a[i], b[i])) {
              return false
            }
          }
        }
        return true
      })
    }
    case "TypeLiteral": {
      if (ast.propertySignatures.length === 0 && ast.indexSignatures.length === 0) {
        return Equivalence.strict()
      }
      const propertySignatures = ast.propertySignatures.map((ps) => go(ps.type))
      const indexSignatures = ast.indexSignatures.map((is) => go(is.type))
      return Equivalence.make((a, b) => {
        // ---------------------------------------------
        // handle property signatures
        // ---------------------------------------------
        for (let i = 0; i < propertySignatures.length; i++) {
          const ps = ast.propertySignatures[i]
          const name = ps.name
          if (ps.isOptional) {
            if (
              Object.prototype.hasOwnProperty.call(a, name) !==
                Object.prototype.hasOwnProperty.call(b, name)
            ) {
              return false
            }
          }
          if (!propertySignatures[i](a[name], b[name])) {
            return false
          }
        }
        // ---------------------------------------------
        // handle index signatures
        // ---------------------------------------------
        for (let i = 0; i < indexSignatures.length; i++) {
          const is = ast.indexSignatures[i]
          const aKeys = Internal.getKeysForIndexSignature(a, is.parameter)
          const bKeys = Internal.getKeysForIndexSignature(b, is.parameter)
          if (aKeys.length !== bKeys.length) {
            return false
          }
          for (const key of aKeys) {
            if (!indexSignatures[i](a[key], b[key])) {
              return false
            }
          }
        }
        return true
      })
    }
    case "Union": {
      const members = ast.types.map((type) => [go(type), is(type)] as const)
      return Equivalence.make((a, b) => {
        for (let i = 0; i < members.length; i++) {
          const [equivalence, is] = members[i]
          if (is(a) && is(b)) {
            return equivalence(a, b)
          }
        }
        return false
      })
    }
  }
}
