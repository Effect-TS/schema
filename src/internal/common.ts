/**
 * @since 1.0.0
 */

import type { Arbitrary } from "@effect/schema/Arbitrary"
import * as AST from "@effect/schema/AST"
import type { Parser } from "@effect/schema/Parser"
import type { Pretty } from "@effect/schema/Pretty"
import type * as S from "@effect/schema/Schema"

// ---------------------------------------------
// compiler constructors
// ---------------------------------------------

/** @internal */
export const makeArbitrary = <A>(
  schema: S.Schema<A>,
  arbitrary: Arbitrary<A>["arbitrary"]
): Arbitrary<A> => ({ ast: schema.ast, arbitrary }) as any

/** @internal */
export const makeParser = <A>(
  schema: S.Schema<A>,
  parse: Parser<A>["parse"]
): Parser<A> => ({ ast: schema.ast, parse }) as any

/** @internal */
export const makePretty = <A>(
  schema: S.Schema<A>,
  pretty: Pretty<A>["pretty"]
): Pretty<A> => ({ ast: schema.ast, pretty }) as any

// ---------------------------------------------
// hooks
// ---------------------------------------------

/** @internal */
export const ArbitraryHookId = "@effect/schema/ArbitraryHookId"

/** @internal */
export const ParserHookId = "@effect/schema/ParserHookId"

/** @internal */
export const PrettyHookId = "@effect/schema/PrettyHookId"

// ---------------------------------------------
// Schema APIs
// ---------------------------------------------

/** @internal */
export const makeSchema = <A>(ast: AST.AST): S.Schema<A> => ({ ast }) as any

/** @internal */
export const lazy = <A>(
  f: () => S.Schema<A>,
  annotations?: AST.Annotated["annotations"]
): S.Schema<A> => makeSchema(AST.createLazy(() => f().ast, annotations))

/** @internal */
export const getKeysForIndexSignature = (
  input: { readonly [x: PropertyKey]: unknown },
  parameter: AST.IndexSignature["parameter"]
): ReadonlyArray<string> | ReadonlyArray<symbol> => {
  switch (parameter._tag) {
    case "StringKeyword":
    case "TemplateLiteral":
      return Object.keys(input)
    case "SymbolKeyword":
      return Object.getOwnPropertySymbols(input)
    case "Refinement":
      return getKeysForIndexSignature(input, parameter.from as any)
  }
}

// ---------------------------------------------
// general helpers
// ---------------------------------------------

/** @internal */
export const memoize = <A, B>(f: (a: A) => B): (a: A) => B => {
  const cache = new Map()
  return (a) => {
    if (!cache.has(a)) {
      const b = f(a)
      cache.set(a, b)
      return b
    }
    return cache.get(a)
  }
}
