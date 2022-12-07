---
title: Codec.ts
nav_order: 3
parent: Modules
---

## Codec overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Codec (interface)](#codec-interface)
  - [Infer (type alias)](#infer-type-alias)
  - [any](#any)
  - [array](#array)
  - [bigint](#bigint)
  - [boolean](#boolean)
  - [chunk](#chunk)
  - [codecFor](#codecfor)
  - [extend](#extend)
  - [failure](#failure)
  - [failures](#failures)
  - [filter](#filter)
  - [filterWith](#filterwith)
  - [greaterThan](#greaterthan)
  - [greaterThanOrEqualTo](#greaterthanorequalto)
  - [int](#int)
  - [isFailure](#isfailure)
  - [isSuccess](#issuccess)
  - [isWarning](#iswarning)
  - [json](#json)
  - [jsonArray](#jsonarray)
  - [jsonObject](#jsonobject)
  - [keyof](#keyof)
  - [lazy](#lazy)
  - [lessThan](#lessthan)
  - [lessThanOrEqualTo](#lessthanorequalto)
  - [list](#list)
  - [literal](#literal)
  - [make](#make)
  - [maxLength](#maxlength)
  - [minLength](#minlength)
  - [nativeEnum](#nativeenum)
  - [never](#never)
  - [nonEmptyArray](#nonemptyarray)
  - [number](#number)
  - [omit](#omit)
  - [option](#option)
  - [partial](#partial)
  - [pick](#pick)
  - [provideCodecFor](#providecodecfor)
  - [readonlySet](#readonlyset)
  - [refine](#refine)
  - [restElement](#restelement)
  - [string](#string)
  - [stringIndexSignature](#stringindexsignature)
  - [struct](#struct)
  - [success](#success)
  - [symbol](#symbol)
  - [symbolIndexSignature](#symbolindexsignature)
  - [tuple](#tuple)
  - [union](#union)
  - [unknown](#unknown)
  - [unknownArray](#unknownarray)
  - [unknownObject](#unknownobject)
  - [warning](#warning)
  - [warnings](#warnings)

---

# utils

## Codec (interface)

**Signature**

```ts
export interface Codec<A>
  extends Schema<A>,
    Decoder<unknown, A>,
    Encoder<unknown, A>,
    Guard<A>,
    Arbitrary<A>,
    Pretty<A> {
  readonly parseOrThrow: (text: string, format?: (errors: NonEmptyReadonlyArray<DecodeError>) => string) => A
  readonly stringify: (value: A) => string
  readonly of: (value: A) => A
}
```

Added in v1.0.0

## Infer (type alias)

**Signature**

```ts
export type Infer<S extends Schema<any>> = Parameters<S['A']>[0]
```

Added in v1.0.0

## any

**Signature**

```ts
export declare const any: Codec<any>
```

Added in v1.0.0

## array

**Signature**

```ts
export declare const array: <A>(item: Schema<A>) => Codec<readonly A[]>
```

Added in v1.0.0

## bigint

**Signature**

```ts
export declare const bigint: Codec<bigint>
```

Added in v1.0.0

## boolean

**Signature**

```ts
export declare const boolean: Codec<boolean>
```

Added in v1.0.0

## chunk

**Signature**

```ts
export declare const chunk: <A>(item: Schema<A>) => Codec<Chunk<A>>
```

Added in v1.0.0

## codecFor

**Signature**

```ts
export declare const codecFor: <A>(schema: Schema<A>) => Codec<A>
```

Added in v1.0.0

## extend

**Signature**

```ts
export declare const extend: <B>(that: Schema<B>) => <A>(self: Schema<A>) => Codec<A & B>
```

Added in v1.0.0

## failure

**Signature**

```ts
export declare const failure: (e: DecodeError) => These<NonEmptyReadonlyArray<DecodeError>, never>
```

Added in v1.0.0

## failures

**Signature**

```ts
export declare const failures: (
  es: readonly [DecodeError, ...DecodeError[]]
) => These<NonEmptyReadonlyArray<DecodeError>, never>
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare const filter: <A>(
  id: symbol,
  decode: (i: A) => These<readonly [DecodeError, ...DecodeError[]], A>
) => (schema: Schema<A>) => Codec<A>
```

Added in v1.0.0

## filterWith

**Signature**

```ts
export declare const filterWith: <Config, A>(
  id: symbol,
  decode: (config: Config) => (i: A) => These<readonly [DecodeError, ...DecodeError[]], A>
) => (config: Config) => (schema: Schema<A>) => Codec<A>
```

Added in v1.0.0

## greaterThan

**Signature**

```ts
export declare const greaterThan: (max: number) => <A extends number>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## greaterThanOrEqualTo

**Signature**

```ts
export declare const greaterThanOrEqualTo: (max: number) => <A extends number>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## int

**Signature**

```ts
export declare const int: <A extends number>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## isFailure

**Signature**

```ts
export declare const isFailure: <E, A>(self: These<E, A>) => self is Left<E>
```

Added in v1.0.0

## isSuccess

**Signature**

```ts
export declare const isSuccess: <E, A>(self: These<E, A>) => self is Right<A>
```

Added in v1.0.0

## isWarning

**Signature**

```ts
export declare const isWarning: <E, A>(self: These<E, A>) => self is Both<E, A>
```

Added in v1.0.0

## json

**Signature**

```ts
export declare const json: Codec<Json>
```

Added in v1.0.0

## jsonArray

**Signature**

```ts
export declare const jsonArray: Codec<JsonArray>
```

Added in v1.0.0

## jsonObject

**Signature**

```ts
export declare const jsonObject: Codec<JsonObject>
```

Added in v1.0.0

## keyof

**Signature**

```ts
export declare const keyof: <A>(schema: Schema<A>) => Codec<keyof A>
```

Added in v1.0.0

## lazy

**Signature**

```ts
export declare const lazy: <A>(f: () => Schema<A>) => Codec<A>
```

Added in v1.0.0

## lessThan

**Signature**

```ts
export declare const lessThan: (min: number) => <A extends number>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## lessThanOrEqualTo

**Signature**

```ts
export declare const lessThanOrEqualTo: (min: number) => <A extends number>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## list

**Signature**

```ts
export declare const list: <A>(item: Schema<A>) => Codec<List<A>>
```

Added in v1.0.0

## literal

**Signature**

```ts
export declare const literal: <A extends readonly (string | number | boolean | null | undefined)[]>(
  ...a: A
) => Codec<A[number]>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <A>(schema: Schema<A>, decode: (i: unknown) => These<readonly [DecodeError, ...DecodeError[]], A>, encode: (value: A) => unknown, is: (input: unknown) => input is A, arbitrary: (fc: typeof  => Arbitrary<A>, pretty: (a: A) => string) => Codec<A>
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: (maxLength: number) => <A extends { length: number }>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: (minLength: number) => <A extends { length: number }>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## nativeEnum

**Signature**

```ts
export declare const nativeEnum: <A extends { [_: string]: string | number }>(nativeEnum: A) => Codec<A>
```

Added in v1.0.0

## never

**Signature**

```ts
export declare const never: Codec<never>
```

Added in v1.0.0

## nonEmptyArray

**Signature**

```ts
export declare const nonEmptyArray: <A>(item: Schema<A>) => Codec<readonly [A, ...A[]]>
```

Added in v1.0.0

## number

**Signature**

```ts
export declare const number: Codec<number>
```

Added in v1.0.0

## omit

**Signature**

```ts
export declare const omit: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => (self: Schema<A>) => Codec<{ readonly [P in Exclude<keyof A, Keys[number]>]: A[P] }>
```

Added in v1.0.0

## option

**Signature**

```ts
export declare const option: <A>(value: Schema<A>) => Codec<Option<A>>
```

Added in v1.0.0

## partial

**Signature**

```ts
export declare const partial: <A>(self: Schema<A>) => Codec<Partial<A>>
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => (self: Schema<A>) => Codec<{ readonly [P in Keys[number]]: A[P] }>
```

Added in v1.0.0

## provideCodecFor

**Signature**

```ts
export declare const provideCodecFor: (provider: Provider) => <A>(schema: Schema<A>) => Codec<A>
```

Added in v1.0.0

## readonlySet

**Signature**

```ts
export declare const readonlySet: <A>(item: Schema<A>) => Codec<ReadonlySet<A>>
```

Added in v1.0.0

## refine

**Signature**

```ts
export declare const refine: <A, B extends A>(
  id: symbol,
  decode: (i: A) => These<readonly [DecodeError, ...DecodeError[]], B>
) => (schema: Schema<A>) => Codec<B>
```

Added in v1.0.0

## restElement

**Signature**

```ts
export declare const restElement: <R>(
  rest: Schema<R>
) => <A extends readonly any[]>(self: Schema<A>) => Schema<readonly [...A, ...R[]]>
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: Codec<string>
```

Added in v1.0.0

## stringIndexSignature

**Signature**

```ts
export declare const stringIndexSignature: <A>(value: Schema<A>) => Codec<{ readonly [_: string]: A }>
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: {
  <Required extends Record<string | number | symbol, Schema<any>>>(required: Required): Codec<{
    readonly [K in keyof Required]: Infer<Required[K]>
  }>
  <
    Required extends Record<string | number | symbol, Schema<any>>,
    Optional extends Record<string | number | symbol, Schema<any>>
  >(
    required: Required,
    optional: Optional
  ): Codec<
    S.Spread<
      { readonly [K in keyof Required]: Infer<Required[K]> } & {
        readonly [K in keyof Optional]?: Infer<Optional[K]> | undefined
      }
    >
  >
}
```

Added in v1.0.0

## success

**Signature**

```ts
export declare const success: <A>(a: A) => These<never, A>
```

Added in v1.0.0

## symbol

**Signature**

```ts
export declare const symbol: Codec<symbol>
```

Added in v1.0.0

## symbolIndexSignature

**Signature**

```ts
export declare const symbolIndexSignature: <A>(value: Schema<A>) => Codec<{}>
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <Components extends readonly Schema<any>[]>(
  ...components: Components
) => Codec<{ readonly [K in keyof Components]: Infer<Components[K]> }>
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: <Members extends readonly Schema<any>[]>(
  ...members: Members
) => Codec<Infer<Members[number]>>
```

Added in v1.0.0

## unknown

**Signature**

```ts
export declare const unknown: Codec<unknown>
```

Added in v1.0.0

## unknownArray

**Signature**

```ts
export declare const unknownArray: Codec<UnknownArray>
```

Added in v1.0.0

## unknownObject

**Signature**

```ts
export declare const unknownObject: Codec<UnknownObject>
```

Added in v1.0.0

## warning

**Signature**

```ts
export declare const warning: <A>(e: DecodeError, a: A) => These<readonly [DecodeError, ...DecodeError[]], A>
```

Added in v1.0.0

## warnings

**Signature**

```ts
export declare const warnings: <A>(
  es: readonly [DecodeError, ...DecodeError[]],
  a: A
) => These<readonly [DecodeError, ...DecodeError[]], A>
```

Added in v1.0.0
