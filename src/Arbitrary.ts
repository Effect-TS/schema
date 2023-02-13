/**
 * @since 1.0.0
 */

import * as E from "@fp-ts/core/Either"
import { compose, pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as TAH from "@fp-ts/schema/annotation/Hook"
import * as AST from "@fp-ts/schema/AST"
import * as I from "@fp-ts/schema/internal/common"
import type { Schema } from "@fp-ts/schema/Schema"
import type * as FastCheck from "fast-check"

/*
 * @since 1.0.0
 * Pending ecosystem package update
 */
export const all = <E, A>(
  collection: Iterable<E.Either<E, A>>
): E.Either<E, Array<A>> => {
  const out: Array<A> = []
  for (const e of collection) {
    if (E.isLeft(e)) {
      return e
    }
    out.push(e.right)
  }
  return E.right(out)
}

/*
 * @since 1.0.0
 * Pending ecosystem package update
 */
export const eitherTuple = <E, A>(
  tuple: readonly [E.Either<E, A>, E.Either<E, A>]
): E.Either<E, readonly [A, A]> =>
  pipe(
    E.Do,
    E.andThenBind("a", tuple[0]),
    E.andThenBind("b", tuple[1]),
    E.map(({ a, b }) => [a, b])
  )

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
  (fc: typeof FastCheck): E.Either<string, FastCheck.Arbitrary<A>> => arbitraryFor(fc)(schema)

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

const typeLiteral = (fc: typeof FastCheck, go: AST.Compiler<string, FastCheck.Arbitrary<any>>) =>
  (ast: AST.TypeLiteral): E.Either<string, FastCheck.Arbitrary<any>> => {
    const propertySignaturesTypes = ast.propertySignatures.map((f) => go(f.type))
    const indexSignatures = pipe(
      ast.indexSignatures.map((is) => [go(is.parameter), go(is.type)] as const),
      (x) => x.map(eitherTuple),
      all
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
    pipe(
      indexSignatures,
      E.map((arbs) =>
        arbs.forEach(([parameter, type]) => {
          output = output.chain((o) => record(fc, parameter, type).map((d) => ({ ...d, ...o })))
        })
      )
    )
    return E.right(output)
  }

const tuple = (fc: typeof FastCheck, go: AST.Compiler<string, FastCheck.Arbitrary<any>>) =>
  (ast: AST.Tuple): E.Either<string, FastCheck.Arbitrary<any>> => {
    const elements = ast.elements.map((e) => go(e.type))
    const rest = pipe(ast.rest, O.map(RA.mapNonEmpty(go)))
    // ---------------------------------------------
    // handle elements
    // ---------------------------------------------
    let output = pipe(elements, all, E.map((arbs) => fc.tuple(...arbs)))

    if (elements.length > 0 && O.isNone(rest)) {
      const firstOptionalIndex = ast.elements.findIndex((e) => e.isOptional)
      if (firstOptionalIndex !== -1) {
        output = pipe(
          output,
          E.map((arbs) =>
            arbs.chain((as) =>
              fc.integer({ min: firstOptionalIndex, max: elements.length - 1 }).map((i) =>
                as.slice(0, i)
              )
            )
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
      output = pipe(
        output,
        E.flatMap((arbs) =>
          pipe(
            head,
            E.map((h) =>
              arbs.chain((as) => fc.array(h, { maxLength: 5 }).map((rest) => [...as, ...rest]))
            )
          )
        )
      )
      // ---------------------------------------------
      // handle post rest elements
      // ---------------------------------------------
      pipe(
        tail,
        all,
        E.map((t) =>
          t.forEach((t) => {
            output = pipe(output, E.map((arbs) => arbs.chain((as) => t.map((a) => [...as, a]))))
          })
        )
      )
    }

    return output
  }

const compilerMap = (
  fc: typeof FastCheck,
  go: AST.Compiler<string, FastCheck.Arbitrary<any>>
): AST.CompilerASTMap<string, FastCheck.Arbitrary<any>> => ({
  NeverKeyword: () => E.left("cannot build an Arbitrary for `never`"),
  StringKeyword: () => E.right(fc.string()),
  NumberKeyword: () => E.right(fc.float()),
  BooleanKeyword: () => E.right(fc.boolean()),
  BigIntKeyword: () => E.right(fc.bigInt()),
  UnknownKeyword: () => E.right(fc.anything()),
  AnyKeyword: () => E.right(fc.anything()),
  VoidKeyword: () => E.right(fc.constant(undefined)),
  UndefinedKeyword: () => E.right(fc.constant(undefined)),
  SymbolKeyword: () => E.right(fc.string().map((s) => Symbol.for(s))),
  ObjectKeyword: () => E.right(fc.oneof(fc.object(), fc.array(fc.anything()))),
  Literal: (ast) => E.right(fc.constant(ast.literal)),
  UniqueSymbol: (ast) => E.right(fc.constant(ast.symbol)),
  Enums: (ast) =>
    ast.enums.length === 0 ?
      E.left("cannot build an Arbitrary for an empty enum") :
      E.right(fc.oneof(...ast.enums.map(([_, value]) => fc.constant(value)))),
  Refinement: (ast) => pipe(go(ast.from), E.map((arb) => arb.filter((a) => ast.refinement(a)))),
  Union: (ast) => pipe(ast.types.map(go), all, E.map((arbs) => fc.oneof(...arbs))),
  TypeAlias: (ast) => {
    return pipe(
      getHook(ast),
      O.match(
        () => go(ast.type),
        ({ handler }) => pipe(ast.typeParameters.map(go), all, E.map((arbs) => handler(...arbs)))
      )
    )
  },
  Transform: (ast) => go(ast.to),
  TemplateLiteral: (ast) => {
    const components = [fc.constant(ast.head)]
    for (const span of ast.spans) {
      components.push(fc.string({ maxLength: 5 }))
      components.push(fc.constant(span.literal))
    }
    return E.right(fc.tuple(...components).map((spans) => spans.join("")))
  },
  Tuple: tuple(fc, go),
  TypeLiteral: typeLiteral(fc, go),
  Lazy: (ast) => {
    const f = () => go(ast.f())
    try {
      return E.right(fc.constant(null).chain(() => E.getOrThrow(f())))
    } catch (e) {
      return E.left("Lazy fn threw an error")
    }
  }
} as const)

const arbitraryFor = (fc: typeof FastCheck) =>
  <A>(schema: Schema<A>): E.Either<string, FastCheck.Arbitrary<A>> => {
    const go: AST.Compiler<string, FastCheck.Arbitrary<any>> = (ast) => {
      switch (ast._tag) {
        case "TypeAlias":
          return compilerMap(fc, go)[ast._tag](ast)
        case "Literal":
          return compilerMap(fc, go)[ast._tag](ast)
        case "UniqueSymbol":
          return compilerMap(fc, go)[ast._tag](ast)
        case "UndefinedKeyword":
          return compilerMap(fc, go)[ast._tag](ast)
        case "VoidKeyword":
          return compilerMap(fc, go)[ast._tag](ast)
        case "NeverKeyword":
          return compilerMap(fc, go)[ast._tag](ast)
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
        case "Union":
          return compilerMap(fc, go)[ast._tag](ast)
        case "Lazy":
          return compilerMap(fc, go)[ast._tag](ast)
        case "Enums":
          return compilerMap(fc, go)[ast._tag](ast)
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
