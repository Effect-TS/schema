/**
 * @since 1.0.0
 */

// import * as E from "@fp-ts/core/Either"
import { pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as TAH from "@fp-ts/schema/annotation/Hook"
import * as AST from "@fp-ts/schema/AST"
import * as I from "@fp-ts/schema/internal/common"
import type { Schema } from "@fp-ts/schema/Schema"
import type * as FastCheck from "fast-check"

/**
 * @category model
 * @since 1.0.0
 */
export interface Arbitrary<A> extends Schema<A> {
  readonly arbitrary: (fc: typeof FastCheck) => FastCheck.Arbitrary<A>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const make: <A>(
  schema: Schema<A>,
  arbitrary: FastCheck.Arbitrary<A>
) => FastCheck.Arbitrary<A> = I.makeArbitrary

/**
 * @category arbitrary
 * @since 1.0.0
 */
export const arbitrary = <A>(schema: Schema<A>) =>
  (fc: typeof FastCheck): FastCheck.Arbitrary<A> => arbitraryFor(fc)(schema)

const record = <K extends PropertyKey, V>(
  fc: typeof FastCheck,
  key: FastCheck.Arbitrary<K>,
  value: FastCheck.Arbitrary<V>
): FastCheck.Arbitrary<{ readonly [k in K]: V }> =>
  fc.array(fc.tuple(key, value), { maxLength: 10 }).map((tuples) => {
    const out: { [k in K]: V } = {} as any
    for (const [k, v] of tuples) {
      out[k] = v
    }
    return out
  })

const getHook = AST.getAnnotation<TAH.Hook<FastCheck.Arbitrary<any>>>(
  TAH.ArbitraryHookId
)

const typeLiteral = (fc: typeof FastCheck, go: AST.Compiler<FastCheck.Arbitrary<any>>) =>
  (ast: AST.TypeLiteral) => {
    const propertySignaturesTypes = ast.propertySignatures.map((f) => go(f.type))
    const indexSignatures = ast.indexSignatures.map((is) =>
      [go(is.parameter), go(is.type)] as const
    )
    const arbs: any = {}
    const requiredKeys: Array<PropertyKey> = []
    // ---------------------------------------------
    // handle property signatures
    // ---------------------------------------------
    for (let i = 0; i < propertySignaturesTypes.length; i++) {
      const ps = ast.propertySignatures[i]
      const name = ps.name
      if (!ps.isOptional) {
        requiredKeys.push(name)
      }
      arbs[name] = propertySignaturesTypes[i]
    }
    let output = fc.record<any, any>(arbs, { requiredKeys })
    // ---------------------------------------------
    // handle index signatures
    // ---------------------------------------------
    indexSignatures.forEach(([parameter, type]) => {
      output = output.chain((o) => record(fc, parameter, type).map((d) => ({ ...d, ...o })))
    })

    return output
  }

const tuple = (fc: typeof FastCheck, go: AST.Compiler<FastCheck.Arbitrary<any>>) =>
  (ast: AST.Tuple) => {
    const elements = ast.elements.map((e) => go(e.type))
    const rest = pipe(ast.rest, O.map(RA.mapNonEmpty(go)))
    // ---------------------------------------------
    // handle elements
    // ---------------------------------------------
    let output = fc.tuple(...elements.map((e) => e))
    if (elements.length > 0 && O.isNone(rest)) {
      const firstOptionalIndex = ast.elements.findIndex((e) => e.isOptional)
      if (firstOptionalIndex !== -1) {
        output = output.chain((as) =>
          fc.integer({ min: firstOptionalIndex, max: elements.length - 1 }).map((i) =>
            as.slice(0, i)
          )
        )
      }
    }

    // ---------------------------------------------
    // handle rest element
    // ---------------------------------------------
    if (O.isSome(rest)) {
      const head = RA.headNonEmpty(rest.value)
      const tail = RA.tailNonEmpty(rest.value)
      output = output.chain((as) =>
        fc.array(head, { maxLength: 5 }).map((rest) => [...as, ...rest])
      )
      // ---------------------------------------------
      // handle post rest elements
      // ---------------------------------------------
      for (let j = 0; j < tail.length; j++) {
        output = output.chain((as) => tail[j].map((a) => [...as, a]))
      }
    }

    return output
  }

const compilerMap = (
  fc: typeof FastCheck,
  go: AST.Compiler<FastCheck.Arbitrary<any>>
): AST.CompilerASTMap<FastCheck.Arbitrary<any>> => ({
  NeverKeyword: () => fc.string(), // TODO
  StringKeyword: () => fc.string(),
  NumberKeyword: () => fc.float(),
  BooleanKeyword: () => fc.boolean(),
  BigIntKeyword: () => fc.bigInt(),
  UnknownKeyword: () => fc.anything(),
  AnyKeyword: () => fc.anything(),
  VoidKeyword: () => fc.constant(undefined),
  UndefinedKeyword: () => fc.constant(undefined),
  SymbolKeyword: () => fc.string().map((s) => Symbol.for(s)),
  ObjectKeyword: () => fc.oneof(fc.object(), fc.array(fc.anything())),
  Literal: (ast) => fc.constant(ast.literal),
  UniqueSymbol: (ast) => fc.constant(ast.symbol),
  Enums: (ast) => fc.oneof(...ast.enums.map(([_, value]) => fc.constant(value))),
  Refinement: (ast) => go(ast.from).filter((a) => ast.refinement(a)),
  Lazy: (ast) => fc.constant(null).chain(() => go(ast.f())),
  Union: (ast) => fc.oneof(...ast.types.map(go).map((c) => c)),
  TypeAlias: (ast) => go(ast.type),
  Transform: (ast) => go(ast.to),
  TemplateLiteral: (ast) => {
    const components = [fc.constant(ast.head)]
    for (const span of ast.spans) {
      components.push(fc.string({ maxLength: 5 }))
      components.push(fc.constant(span.literal))
    }
    return fc.tuple(...components).map((spans) => spans.join(""))
  },
  Tuple: tuple(fc, go),
  TypeLiteral: typeLiteral(fc, go)
} as const)

const arbitraryFor = (fc: typeof FastCheck) =>
  <A>(schema: Schema<A>): FastCheck.Arbitrary<A> => {
    const go: AST.Compiler<FastCheck.Arbitrary<any>> = (ast) => {
      switch (ast._tag) {
        case "TypeAlias":
          return pipe(
            getHook(ast),
            O.match(
              () => compilerMap(fc, go)[ast._tag](ast),
              ({ handler }) => handler(...ast.typeParameters.map(go))
            )
          )
        case "Literal":
          return compilerMap(fc, go)[ast._tag](ast)
        case "UniqueSymbol":
          return compilerMap(fc, go)[ast._tag](ast)
        case "UndefinedKeyword":
          return compilerMap(fc, go)[ast._tag](ast)
        case "VoidKeyword":
          return compilerMap(fc, go)[ast._tag](ast)
        case "NeverKeyword":
          throw new Error("cannot build an Arbitrary for `never`")
        case "UnknownKeyword":
          return compilerMap(fc, go)[ast._tag](ast)
        case "AnyKeyword":
          return compilerMap(fc, go)[ast._tag](ast)
        case "StringKeyword":
          return compilerMap(fc, go)[ast._tag](ast)
        case "NumberKeyword":
          return compilerMap(fc, go)[ast._tag](ast)
        case "BooleanKeyword":
          return compilerMap(fc, go)[ast._tag](ast)
        case "BigIntKeyword":
          return compilerMap(fc, go)[ast._tag](ast)
        case "SymbolKeyword":
          return compilerMap(fc, go)[ast._tag](ast)
        case "ObjectKeyword":
          return compilerMap(fc, go)[ast._tag](ast)
        case "Tuple":
          return compilerMap(fc, go)[ast._tag](ast)
        case "TypeLiteral":
          return compilerMap(fc, go)[ast._tag](ast)
        case "Union": {
          return compilerMap(fc, go)[ast._tag](ast)
        }
        case "Lazy": {
          return compilerMap(fc, go)[ast._tag](ast)
        }
        case "Enums": {
          if (ast.enums.length === 0) {
            throw new Error("cannot build an Arbitrary for an empty enum")
          }
          return compilerMap(fc, go)[ast._tag](ast)
        }
        case "Refinement":
          return compilerMap(fc, go)[ast._tag](ast)
        case "TemplateLiteral":
          return compilerMap(fc, go)[ast._tag](ast)
        case "Transform":
          return compilerMap(fc, go)[ast._tag](ast)
      }
    }

    return go(schema.ast)
  }
