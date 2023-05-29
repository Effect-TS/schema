/**
 * @since 1.0.0
 */

import * as E from "@effect/data/Either"
import * as O from "@effect/data/Option"
import type { Option } from "@effect/data/Option"
import type * as ReadonlyArray from "@effect/data/ReadonlyArray"
import type * as AST from "@effect/schema/AST"
import * as I from "@effect/schema/internal/common"
import * as ParseResult from "@effect/schema/ParseResult"

/**
 * @category model
 * @since 1.0.0
 */
export type TransformAST =
  | FinalTransformation
  | AndThenTransformation
  | TypeLiteralTransformation
  | TupleTransformation

/**
 * @category model
 * @since 1.0.0
 */
export interface FinalTransformation {
  readonly _tag: "FinalTransformation"
  readonly decode: AST.Transform["decode"]
  readonly encode: AST.Transform["encode"]
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const createFinalTransformation = (
  decode: FinalTransformation["decode"],
  encode: FinalTransformation["encode"]
): FinalTransformation => ({ _tag: "FinalTransformation", decode, encode })

/**
 * @category model
 * @since 1.0.0
 */
export interface AndThenTransformation {
  readonly _tag: "AndThenTransformation"
  readonly from: TransformAST
  readonly to: TransformAST
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const createAndThenTransformation = (
  from: TransformAST,
  to: TransformAST
): AndThenTransformation => ({ _tag: "AndThenTransformation", from, to })

/**
 * Represents a `PropertySignature -> PropertySignature` transformation
 *
 * The semantic of `decode` is:
 * - `none()` represents the absence of the key/value pair
 * - `some(value)` represents the presence of the key/value pair
 *
 * The semantic of `encode` is:
 * - `none()` you don't want to output the key/value pair
 * - `some(value)` you want to output the key/value pair
 *
 * @category model
 * @since 1.0.0
 */
export interface FinalPropertySignatureTransformation {
  readonly _tag: "FinalPropertySignatureTransformation"
  readonly decode: (o: Option<any>) => Option<any>
  readonly encode: (o: Option<any>) => Option<any>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const createFinalPropertySignatureTransformation = (
  decode: FinalPropertySignatureTransformation["decode"],
  encode: FinalPropertySignatureTransformation["encode"]
): FinalPropertySignatureTransformation => ({
  _tag: "FinalPropertySignatureTransformation",
  decode,
  encode
})

/**
 * @category model
 * @since 1.0.0
 */
export interface PropertySignatureTransformation {
  readonly from: PropertyKey
  readonly to: PropertyKey
  readonly transformation: FinalPropertySignatureTransformation | TransformAST
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const createPropertySignatureTransformation = (
  from: PropertyKey,
  to: PropertyKey,
  transformation: PropertySignatureTransformation["transformation"]
): PropertySignatureTransformation => ({ from, to, transformation })

/**
 * @category model
 * @since 1.0.0
 */
export interface IndexSignatureTransformation {
  readonly parameter: AST.StringKeyword | AST.SymbolKeyword
  readonly transformation: TransformAST
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const createIndexSignatureTransformation = (
  parameter: AST.StringKeyword | AST.SymbolKeyword,
  transformation: IndexSignatureTransformation["transformation"]
): IndexSignatureTransformation => ({ parameter, transformation })

/**
 * @category model
 * @since 1.0.0
 */
export interface TypeLiteralTransformation {
  readonly _tag: "TypeLiteralTransformation"
  readonly propertySignatureTransformations: ReadonlyArray<
    PropertySignatureTransformation
  >
  readonly indexSignatureTransformations: ReadonlyArray<IndexSignatureTransformation>
  readonly exclude: ReadonlyArray<PropertyKey>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const createTypeLiteralTransformation = (
  propertySignatureTransformations: TypeLiteralTransformation["propertySignatureTransformations"],
  indexSignatureTransformations: TypeLiteralTransformation["indexSignatureTransformations"],
  exclude: TypeLiteralTransformation["exclude"]
): TypeLiteralTransformation => {
  // check for duplicate property signature transformations
  const keys: Record<PropertyKey, true> = {}
  for (const pst of propertySignatureTransformations) {
    const key = pst.from
    if (keys[key]) {
      throw new Error(`Duplicate property signature transformation ${String(key)}`)
    }
    keys[key] = true
  }

  // check for duplicate index signature transformations
  const parameters = {
    string: false,
    symbol: false
  }
  for (const ist of indexSignatureTransformations) {
    if (I.isStringKeyword(ist.parameter)) {
      if (parameters.string) {
        throw new Error("Duplicate index signature transformation for type `string`")
      }
      parameters.string = true
    } else if (I.isSymbolKeyword(ist.parameter)) {
      if (parameters.symbol) {
        throw new Error("Duplicate index signature transformation for type `symbol`")
      }
      parameters.symbol = true
    }
  }

  return {
    _tag: "TypeLiteralTransformation",
    propertySignatureTransformations,
    indexSignatureTransformations,
    exclude
  }
}

/**
 * @category guard
 * @since 1.0.0
 */
export const isTypeLiteralTransformation = (ast: TransformAST): ast is TypeLiteralTransformation =>
  ast._tag === "TypeLiteralTransformation"

/**
 * @category model
 * @since 1.0.0
 */
export interface TupleTransformation {
  readonly _tag: "TupleTransformation"
  readonly elements: ReadonlyArray.NonEmptyReadonlyArray<TransformAST>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const createTupleTransformation = (
  elements: TupleTransformation["elements"]
): TupleTransformation => ({ _tag: "TupleTransformation", elements })

const isFinalPropertySignatureTransformation = (
  ast: FinalPropertySignatureTransformation | TransformAST
): ast is FinalPropertySignatureTransformation =>
  ast._tag === "FinalPropertySignatureTransformation"

/** @internal */
export const go = (transform: TransformAST, isDecoding: boolean): AST.Transform["decode"] => {
  switch (transform._tag) {
    case "FinalTransformation":
      return isDecoding ? transform.decode : transform.encode
    case "AndThenTransformation": {
      const from = isDecoding ? go(transform.from, true) : go(transform.to, false)
      const to = isDecoding ? go(transform.to, true) : go(transform.from, false)
      return (input, options, ast) =>
        ParseResult.flatMap(from(input, options, ast), (input) => to(input, options, ast))
    }
    case "TypeLiteralTransformation":
      return (input, options, ast) => {
        let out: ParseResult.ParseResult<any> = E.right(input)

        // ---------------------------------------------
        // handle property signature transformations
        // ---------------------------------------------
        for (const pst of transform.propertySignatureTransformations) {
          const [from, to] = isDecoding ?
            [pst.from, pst.to] :
            [pst.to, pst.from]
          const t = pst.transformation
          if (isFinalPropertySignatureTransformation(t)) {
            const parse = isDecoding ? t.decode : t.encode
            const f = (input: any) => {
              const o = parse(
                Object.prototype.hasOwnProperty.call(input, from) ?
                  O.some(input[from]) :
                  O.none()
              )
              if (O.isSome(o)) {
                input[to] = o.value
              } else {
                delete input[from]
              }
              return input
            }
            out = ParseResult.map(out, f)
          } else {
            const parse = go(t, isDecoding)
            out = ParseResult.flatMap(
              out,
              (input) =>
                ParseResult.bimap(
                  parse(input[from], options, ast),
                  (e) => ParseResult.parseError([ParseResult.key(from, e.errors)]),
                  (value) => {
                    input[to] = value
                    return input
                  }
                )
            )
          }
        }
        // ---------------------------------------------
        // handle index signature transformations
        // ---------------------------------------------
        const exclude = transform.exclude
        for (const ist of transform.indexSignatureTransformations) {
          const parameter = ist.parameter
          const keys = I.getKeysForIndexSignature(input, parameter)
          const parse = go(ist.transformation, isDecoding)
          for (const key of keys) {
            if (!exclude.includes(key)) {
              out = ParseResult.flatMap(
                out,
                (input) =>
                  ParseResult.bimap(
                    parse(input[key], options, ast),
                    (e) => ParseResult.parseError([ParseResult.key(key, e.errors)]),
                    (value) => {
                      input[key] = value
                      return input
                    }
                  )
              )
            }
          }
        }
        return out
      }
    case "TupleTransformation":
      return (input, options, ast) => {
        let out: ParseResult.ParseResult<any> = E.right(input)
        for (const [i, element] of transform.elements.entries()) {
          const parse = go(element, isDecoding)
          out = ParseResult.flatMap(
            out,
            (input) =>
              ParseResult.bimap(
                parse(input[i], options, ast),
                (e) => ParseResult.parseError([ParseResult.index(i, e.errors)]),
                (value) => {
                  input[i] = value
                  return input
                }
              )
          )
        }
        return out
      }
  }
}
