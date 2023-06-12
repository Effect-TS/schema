import { pipe } from "@effect/data/Function"
import type * as AST from "@effect/schema/AST"
import type * as C from "@effect/schema/Codec"
import type * as S from "@effect/schema/Schema"

export const SchemaTypeId = Symbol.for("@effect/schema/Schema")

export type SchemaTypeId = typeof SchemaTypeId

export interface Schema<A> {
  readonly [SchemaTypeId]: (_: A) => A
  readonly From: (_: A) => A
  readonly To: (_: A) => A
}

export interface Codec<From, To> {
  readonly From: (_: From) => From
  readonly To: (_: To) => To
}

// extractors
export type From<S extends { readonly From: (..._: any) => any }> = Parameters<
  S["From"]
>[0]
export type To<S extends { readonly To: (..._: any) => any }> = Parameters<
  S["To"]
>[0]

// built-in schemas
export declare const string: Schema<string>
export declare const number: Schema<number>
export declare const boolean: Schema<boolean>

// built-in codecs
export declare const NumberFromString: Codec<string, number>

export type Shrink<
  C extends Codec<any, any>,
  unionOfInvolvedCodecs
> = SchemaTypeId extends keyof unionOfInvolvedCodecs ? Schema<To<C>> : Codec<From<C>, To<C>>

// ---------------------------------------------
// combinators
// ---------------------------------------------

export declare const union: <Members extends ReadonlyArray<Codec<any, any>>>(
  ...members: Members
) => Shrink<Codec<From<Members[number]>, To<Members[number]>>, Members[number]>

export declare const nullable: <C extends Codec<any, any>>(
  self: C
) => Shrink<Codec<From<C> | null, To<C> | null>, C>

export declare const tuple: <Elements extends ReadonlyArray<Codec<any, any>>>(
  ...elements: Elements
) => Shrink<
  Codec<
    { readonly [K in keyof Elements]: From<Elements[K]> },
    { readonly [K in keyof Elements]: To<Elements[K]> }
  >,
  Elements[number]
>

export declare const optionalElement: <Element extends Codec<any, any>>(
  element: Element
) => <Self extends Codec<any, any>>(
  self: Self
) => Shrink<
  Codec<readonly [...From<Self>, From<Element>?], readonly [...To<Self>, To<Element>?]>,
  Self | Element
>

export declare const array: <C extends Codec<any, any>>(
  item: C
) => Shrink<Codec<ReadonlyArray<From<C>>, ReadonlyArray<To<C>>>, C>

export declare const filter: <C extends Codec<any, any>>(
  predicate: (a: To<C>) => boolean,
  options?: {}
) => (self: C) => Shrink<C, C>

export declare const struct: <
  Fields extends Record<
    PropertyKey,
    | Codec<any, any>
    | Codec<never, never>
    | S.PropertySignature<any, boolean, any, boolean>
    | S.PropertySignature<never, boolean, never, boolean>
  >
>(
  fields: Fields
) => Shrink<
  Codec<
    S.Simplify<
      & { readonly [K in Exclude<keyof Fields, C.FromOptionalKeys<Fields>>]: From<Fields[K]> }
      & { readonly [K in C.FromOptionalKeys<Fields>]?: From<Fields[K]> }
    >,
    S.Simplify<
      & { readonly [K in Exclude<keyof Fields, S.ToOptionalKeys<Fields>>]: To<Fields[K]> }
      & { readonly [K in S.ToOptionalKeys<Fields>]?: To<Fields[K]> }
    >
  >,
  Fields[keyof Fields]
>

export declare const lazy: <C extends Codec<any, any>>(
  f: () => C,
  annotations?: AST.Annotated["annotations"]
) => Shrink<C, C>

// ---------------------------------------------
// codec tests
// ---------------------------------------------

// $ExpectType Codec<string | boolean, number | boolean>
union(boolean, NumberFromString)

// $ExpectType Codec<string | null, number | null>
nullable(NumberFromString)

// $ExpectType Codec<readonly [string, string], readonly [string, number]>
tuple(string, NumberFromString)

// $ExpectType Codec<readonly [string, string?], readonly [string, number?]>
pipe(tuple(string), optionalElement(NumberFromString))

// $ExpectType Codec<readonly string[], readonly number[]>
array(NumberFromString)

// $ExpectType Codec<string, number>
pipe(
  NumberFromString,
  filter((n) => n > 0)
)

// $ExpectType Codec<{ readonly a: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
struct({
  a: string,
  b: NumberFromString
})

// ---------------------------------------------
// schema tests
// ---------------------------------------------

// $ExpectType Schema<number | boolean>
union(boolean, number)

// $ExpectType Schema<number | null>
nullable(number)

// $ExpectType Schema<readonly [string, number]>
tuple(string, number)

// $ExpectType Schema<readonly [string, number?]>
pipe(tuple(string), optionalElement(number))

// $ExpectType Schema<readonly number[]>
array(number)

// $ExpectType Schema<number>
pipe(
  number,
  filter((n) => n > 0)
)

// $ExpectType Schema<{ readonly a: string; readonly b: number; }>
struct({
  a: string,
  b: number
})

interface CodecLazyFrom {
  readonly a: string
  readonly as: ReadonlyArray<CodecLazyFrom>
}

interface CodecLazyTo {
  readonly a: number
  readonly as: ReadonlyArray<CodecLazyTo>
}

const lazyCodec: Codec<CodecLazyFrom, CodecLazyTo> = lazy(() =>
  struct({
    a: NumberFromString,
    as: array(lazyCodec)
  })
)

// ---------------------------------------------
// generic functions
// ---------------------------------------------

// $ExpectType <A>(schema: Schema<A>) => Schema<readonly [A, A]>
export const pairSchema = <A>(schema: Schema<A>) => tuple(schema, schema)

// $ExpectType <I, A>(codec: Codec<I, A>) => Codec<readonly [I, I], readonly [A, A]>
export const pairCodec = <I, A>(codec: Codec<I, A>) => tuple(codec, codec)

export const pair = <C extends Codec<any, any>>(codec: C) => tuple(codec, codec)

// $ExpectType Schema<readonly [string, string]>
pair(string)

// $ExpectType Codec<readonly [string, string], readonly [number, number]>
pair(NumberFromString)

const lazySchema: Schema<CodecLazyTo> = lazy(() =>
  struct({
    a: number,
    as: array(lazySchema)
  })
)
