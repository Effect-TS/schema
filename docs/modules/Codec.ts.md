---
title: Codec.ts
nav_order: 11
parent: Modules
---

## Codec overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Codec (interface)](#codec-interface)
  - [Infer (type alias)](#infer-type-alias)
  - [annotation](#annotation)
  - [annotations](#annotations)
  - [any](#any)
  - [array](#array)
  - [bigint](#bigint)
  - [boolean](#boolean)
  - [codecFor](#codecfor)
  - [element](#element)
  - [enums](#enums)
  - [extend](#extend)
  - [failure](#failure)
  - [failures](#failures)
  - [filter](#filter)
  - [greaterThan](#greaterthan)
  - [greaterThanOrEqualTo](#greaterthanorequalto)
  - [int](#int)
  - [isFailure](#isfailure)
  - [isSuccess](#issuccess)
  - [isWarning](#iswarning)
  - [json](#json)
  - [keyof](#keyof)
  - [lazy](#lazy)
  - [lessThan](#lessthan)
  - [lessThanOrEqualTo](#lessthanorequalto)
  - [literal](#literal)
  - [make](#make)
  - [maxLength](#maxlength)
  - [minLength](#minlength)
  - [never](#never)
  - [nonEmptyArray](#nonemptyarray)
  - [number](#number)
  - [omit](#omit)
  - [option](#option)
  - [optional](#optional)
  - [optionalElement](#optionalelement)
  - [parse](#parse)
  - [partial](#partial)
  - [pick](#pick)
  - [rest](#rest)
  - [string](#string)
  - [stringIndexSignature](#stringindexsignature)
  - [struct](#struct)
  - [success](#success)
  - [symbol](#symbol)
  - [symbolIndexSignature](#symbolindexsignature)
  - [tuple](#tuple)
  - [undefined](#undefined)
  - [union](#union)
  - [uniqueSymbol](#uniquesymbol)
  - [unknown](#unknown)
  - [void](#void)
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

## annotation

**Signature**

```ts
export declare const annotation: (annotation: unknown) => <A>(schema: Schema<A>) => Codec<A>
```

Added in v1.0.0

## annotations

**Signature**

```ts
export declare const annotations: (annotations: ReadonlyArray<unknown>) => <A>(schema: Schema<A>) => Codec<A>
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

## codecFor

**Signature**

```ts
export declare const codecFor: <A>(schema: Schema<A>) => Codec<A>
```

Added in v1.0.0

## element

**Signature**

```ts
export declare const element: <E>(
  element: Schema<E>
) => <A extends readonly any[]>(self: Schema<A>) => Codec<readonly [...A, E]>
```

Added in v1.0.0

## enums

**Signature**

```ts
export declare const enums: <A extends { [x: string]: string | number }>(nativeEnum: A) => Codec<A[keyof A]>
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
export declare const filter: <A, B extends A>(
  decode: (i: A) => These<readonly [DecodeError, ...DecodeError[]], B>,
  annotations: ReadonlyArray<unknown>
) => (self: Schema<A>) => Codec<B>
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
export declare const json: Codec<Json.Json>
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

## literal

**Signature**

```ts
export declare const literal: <A extends readonly Literal[]>(...a: A) => Codec<A[number]>
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

## optional

**Signature**

```ts
export declare const optional: <A>(schema: Schema<A>) => S.OptionalSchema<A, true>
```

Added in v1.0.0

## optionalElement

**Signature**

```ts
export declare const optionalElement: <E>(
  element: Schema<E>
) => <A extends readonly any[]>(self: Schema<A>) => Codec<readonly [...A, (E | undefined)?]>
```

Added in v1.0.0

## parse

**Signature**

```ts
export declare const parse: <A, B>(decode: (i: A) => These<readonly [DecodeError, ...DecodeError[]], B>, encode: (value: B) => A, is: (u: unknown) => u is B, arbitrary: (fc: typeof  => Arbitrary<B>, pretty: (a: B) => string, annotations: ReadonlyArray<unknown>) => (self: Schema<A>) => Codec<B>
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

## rest

**Signature**

```ts
export declare const rest: <R>(
  rest: Schema<R>
) => <A extends readonly any[]>(self: Schema<A>) => Codec<readonly [...A, ...R[]]>
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
export declare const stringIndexSignature: <A>(value: Schema<A>) => Codec<{ readonly [x: string]: A }>
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <Fields extends Record<string | number | symbol, Schema<any>>>(
  fields: Fields
) => Codec<
  S.Spread<
    { readonly [K in Exclude<keyof Fields, S.OptionalKeys<Fields>>]: Infer<Fields[K]> } & {
      readonly [K in S.OptionalKeys<Fields>]?: Infer<Fields[K]> | undefined
    }
  >
>
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
export declare const tuple: <Elements extends readonly Schema<any>[]>(
  ...elements: Elements
) => Codec<{ readonly [K in keyof Elements]: Infer<Elements[K]> }>
```

Added in v1.0.0

## undefined

**Signature**

```ts
export declare const undefined: Codec<undefined>
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

## uniqueSymbol

**Signature**

```ts
export declare const uniqueSymbol: <S extends symbol>(symbol: S) => Codec<S>
```

Added in v1.0.0

## unknown

**Signature**

```ts
export declare const unknown: Codec<unknown>
```

Added in v1.0.0

## void

**Signature**

```ts
export declare const void: Codec<void>
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
