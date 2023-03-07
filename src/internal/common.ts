/**
 * @since 1.0.0
 */

import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import type { Predicate, Refinement } from "@effect/data/Predicate"
import type { NonEmptyReadonlyArray } from "@effect/data/ReadonlyArray"
import * as RA from "@effect/data/ReadonlyArray"
import * as Effect from "@effect/io/Effect"
import * as A from "@effect/schema/annotation/AST"
import type { Arbitrary } from "@effect/schema/Arbitrary"
import * as AST from "@effect/schema/AST"
import * as PE from "@effect/schema/ParseError"
import type { ParseError } from "@effect/schema/ParseError"
import type { Parser } from "@effect/schema/Parser"
import type { Pretty } from "@effect/schema/Pretty"
import type {
  AnnotationOptions,
  Infer,
  OptionalKeys,
  OptionalSchema,
  Schema,
  Spread
} from "@effect/schema/Schema"

/** @internal */
export const mutableAppend = <A>(self: Array<A>, a: A): NonEmptyReadonlyArray<A> => {
  self.push(a)
  return self as any
}

/** @internal */
export const isNonEmptyReadonlyArray = RA.isNonEmptyReadonlyArray

// ---------------------------------------------
// artifacts constructors
// ---------------------------------------------

/** @internal */
export const makeArbitrary = <A>(
  schema: Schema<A>,
  arbitrary: Arbitrary<A>["arbitrary"]
): Arbitrary<A> => ({ ast: schema.ast, arbitrary }) as any

/** @internal */
export const makeParser = <A>(
  schema: Schema<A>,
  parse: Parser<A>["parse"]
): Parser<A> => ({ ast: schema.ast, parse }) as any

/** @internal */
export const fromRefinement = <A>(
  schema: Schema<A>,
  refinement: (u: unknown) => u is A
): Parser<A> =>
  makeParser(
    schema,
    (u) => refinement(u) ? Effect.succeed(u) : Effect.fail(RA.of(PE.type(schema.ast, u)))
  )

/** @internal */
export const makePretty = <A>(
  schema: Schema<A>,
  pretty: Pretty<A>["pretty"]
): Pretty<A> => ({ ast: schema.ast, pretty }) as any

// ---------------------------------------------
// Schema APIs
// ---------------------------------------------

/** @internal */
export const makeSchema = <A>(ast: AST.AST): Schema<A> => ({ ast }) as any

/** @internal */
export const typeAlias = (
  typeParameters: ReadonlyArray<Schema<any>>,
  type: Schema<any>,
  annotations?: AST.Annotated["annotations"]
): Schema<any> =>
  makeSchema(AST.createTypeAlias(
    typeParameters.map((tp) => tp.ast),
    type.ast,
    annotations
  ))

/** @internal */
export const annotations = (annotations: AST.Annotated["annotations"]) =>
  <A>(self: Schema<A>): Schema<A> => makeSchema(AST.mergeAnnotations(self.ast, annotations))

/** @internal */
export const toAnnotations = <A>(
  options?: AnnotationOptions<A>
): AST.Annotated["annotations"] => {
  const annotations: AST.Annotated["annotations"] = {}
  if (options?.typeId !== undefined) {
    const typeId = options?.typeId
    if (typeof typeId === "object") {
      annotations[A.TypeId] = typeId.id
      annotations[typeId.id] = typeId.params
    } else {
      annotations[A.TypeId] = typeId
    }
  }
  if (options?.message !== undefined) {
    annotations[A.MessageId] = options?.message
  }
  if (options?.identifier !== undefined) {
    annotations[A.IdentifierId] = options?.identifier
  }
  if (options?.title !== undefined) {
    annotations[A.TitleId] = options?.title
  }
  if (options?.description !== undefined) {
    annotations[A.DescriptionId] = options?.description
  }
  if (options?.examples !== undefined) {
    annotations[A.ExamplesId] = options?.examples
  }
  if (options?.documentation !== undefined) {
    annotations[A.DocumentationId] = options?.documentation
  }
  if (options?.jsonSchema !== undefined) {
    annotations[A.JSONSchemaId] = options?.jsonSchema
  }
  return annotations
}

/** @internal */
export function filter<A, B extends A>(
  refinement: Refinement<A, B>,
  options?: AnnotationOptions<A>
): (from: Schema<A>) => Schema<B>
export function filter<A>(
  predicate: Predicate<A>,
  options?: AnnotationOptions<A>
): (from: Schema<A>) => Schema<A>
export function filter<A>(
  predicate: Predicate<A>,
  options?: AnnotationOptions<A>
): (from: Schema<A>) => Schema<A> {
  return (from) => makeSchema(AST.createRefinement(from.ast, predicate, toAnnotations(options)))
}

/** @internal */
export const transformOrFail = <A, B>(
  to: Schema<B>,
  decode: (
    input: A,
    options?: AST.ParseOptions
  ) => Effect.Effect<never, NonEmptyReadonlyArray<ParseError>, B>,
  encode: (
    input: B,
    options?: AST.ParseOptions
  ) => Effect.Effect<never, NonEmptyReadonlyArray<ParseError>, A>
) =>
  (self: Schema<A>): Schema<B> => makeSchema(AST.createTransform(self.ast, to.ast, decode, encode))

/** @internal */
export const transform = <A, B>(to: Schema<B>, ab: (a: A) => B, ba: (b: B) => A) =>
  (self: Schema<A>): Schema<B> =>
    pipe(self, transformOrFail(to, (a) => Effect.succeed(ab(a)), (b) => Effect.succeed(ba(b))))

const makeLiteral = <Literal extends AST.LiteralValue>(value: Literal): Schema<Literal> =>
  makeSchema(AST.createLiteral(value))

/** @internal */
export const literal = <Literals extends ReadonlyArray<AST.LiteralValue>>(
  ...literals: Literals
): Schema<Literals[number]> => union(...literals.map((literal) => makeLiteral(literal)))

/** @internal */
export const uniqueSymbol = <S extends symbol>(
  symbol: S,
  annotations?: AST.Annotated["annotations"]
): Schema<S> => makeSchema(AST.createUniqueSymbol(symbol, annotations))

/** @internal */
export const never: Schema<never> = makeSchema(AST.neverKeyword)

/** @internal */
export const unknown: Schema<unknown> = makeSchema(AST.unknownKeyword)

/** @internal */
export const any: Schema<any> = makeSchema(AST.anyKeyword)

/** @internal */
export const _undefined: Schema<undefined> = makeSchema(AST.undefinedKeyword)

/** @internal */
export const _null: Schema<null> = makeSchema(AST.createLiteral(null))

/** @internal */
export const _void: Schema<void> = makeSchema(AST.voidKeyword)

/** @internal */
export const string: Schema<string> = makeSchema(AST.stringKeyword)

/** @internal */
export const number: Schema<number> = makeSchema(AST.numberKeyword)

/** @internal */
export const boolean: Schema<boolean> = makeSchema(AST.booleanKeyword)

/** @internal */
export const bigint: Schema<bigint> = makeSchema(AST.bigIntKeyword)

/** @internal */
export const symbol: Schema<symbol> = makeSchema(AST.symbolKeyword)

/** @internal */
export const object: Schema<object> = makeSchema(AST.objectKeyword)

/** @internal */
export const union = <Members extends ReadonlyArray<Schema<any>>>(
  ...members: Members
): Schema<Infer<Members[number]>> => makeSchema(AST.createUnion(members.map((m) => m.ast)))

/** @internal */
export const nullable = <A>(self: Schema<A>): Schema<A | null> => union(_null, self)

const OptionalSchemaId = Symbol.for("@effect/schema/Schema/OptionalSchema")

const isOptionalSchema = <A>(schema: object): schema is OptionalSchema<A> =>
  schema["_id"] === OptionalSchemaId

/** @internal */
export const optional = <A>(schema: Schema<A>): OptionalSchema<A> => {
  const out: any = makeSchema(schema.ast)
  out["_id"] = OptionalSchemaId
  return out
}

/** @internal */
export const struct = <
  Fields extends Record<PropertyKey, Schema<any> | OptionalSchema<any>>
>(
  fields: Fields
): Schema<
  Spread<
    & { readonly [K in Exclude<keyof Fields, OptionalKeys<Fields>>]: Infer<Fields[K]> }
    & { readonly [K in OptionalKeys<Fields>]?: Infer<Fields[K]> }
  >
> =>
  makeSchema(
    AST.createTypeLiteral(
      Reflect.ownKeys(fields).map((key) =>
        AST.createPropertySignature(
          key,
          (fields[key] as any).ast,
          isOptionalSchema(fields[key]),
          true
        )
      ),
      []
    )
  )

/** @internal */
export const tuple = <Elements extends ReadonlyArray<Schema<any>>>(
  ...elements: Elements
): Schema<{ readonly [K in keyof Elements]: Infer<Elements[K]> }> =>
  makeSchema(
    AST.createTuple(elements.map((schema) => AST.createElement(schema.ast, false)), O.none(), true)
  )

/** @internal */
export const lazy = <A>(
  f: () => Schema<A>,
  annotations?: AST.Annotated["annotations"]
): Schema<A> => makeSchema(AST.createLazy(() => f().ast, annotations))

/** @internal */
export const array = <A>(item: Schema<A>): Schema<ReadonlyArray<A>> =>
  makeSchema(AST.createTuple([], O.some([item.ast]), true))

/** @internal */
export const record = <K extends string | symbol, V>(
  key: Schema<K>,
  value: Schema<V>
): Schema<{ readonly [k in K]: V }> => makeSchema(AST.createRecord(key.ast, value.ast, true))

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

/** @internal */
export const getTemplateLiteralRegex = (ast: AST.TemplateLiteral): RegExp => {
  let pattern = `^${ast.head}`
  for (const span of ast.spans) {
    if (AST.isStringKeyword(span.type)) {
      pattern += ".*"
    } else if (AST.isNumberKeyword(span.type)) {
      pattern += "-?\\d+(\\.\\d+)?"
    }
    pattern += span.literal
  }
  pattern += "$"
  return new RegExp(pattern)
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
