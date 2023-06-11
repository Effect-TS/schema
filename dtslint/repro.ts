import { pipe } from "@effect/data/Function"

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
export type From<S extends { readonly From: (..._: any) => any }> = Parameters<S["From"]>[0]
export type To<S extends { readonly To: (..._: any) => any }> = Parameters<S["To"]>[0]

// built-in schemas
export declare const string: Schema<string>
export declare const number: Schema<number>

// built-in codecs
export declare const NumberFromString: Codec<string, number>

// combinators
export declare const array: <I, A>(item: Codec<I, A>) => Codec<ReadonlyArray<I>, ReadonlyArray<A>>
export declare const filter: <A>(predicate: (a: A) => boolean,  options?: {}) => <I>(self: Codec<I, A>) => Codec<I, A>
export declare const tuple: <Elements extends ReadonlyArray<Codec<any, any>>>(
  ...elements: Elements
) => Codec<
  { readonly [K in keyof Elements]: From<Elements[K]> },
  { readonly [K in keyof Elements]: To<Elements[K]> }
>

// ---------------------------------------------
// successful tests
// ---------------------------------------------

// $ExpectType Codec<readonly string[], readonly number[]>
export const codec1 = array(NumberFromString)

// $ExpectType Codec<string, number>
export const codec2 = pipe(NumberFromString, filter(n => n > 0))

// $ExpectType Codec<readonly [string, string], readonly [string, number]>
export const codec3 = tuple(string, NumberFromString)

// ---------------------------------------------
// nice to have (failing tests)
// ---------------------------------------------

// // $ExpectType Schema<readonly number[]>
// export const schema1 = array(number)

// // $ExpectType Schema<number>
// export const schema2 = pipe(number, filter(n => n > 0))

// // $ExpectType Schema<readonly [string, number]>
// export const schema3 = tuple(string, number)

// converters
export declare const from: <I, A>(codec: Codec<I, A>) => Schema<I>
export declare const to: <I, A>(codec: Codec<I, A>) => Schema<A>

// $ExpectType Schema<readonly number[]>
export const schema1 = to(array(number))

// $ExpectType Schema<number>
export const schema2 = to(pipe(number, filter(n => n > 0)))

// $ExpectType Schema<readonly [string, number]>
export const schema3 = to(tuple(string, number))
