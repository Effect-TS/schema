---
title: Transform.ts
nav_order: 7
parent: Modules
---

## Transform overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Chunk](#chunk)
  - [chunk](#chunk)
  - [chunkFromSelf](#chunkfromself)
- [Data](#data)
  - [data](#data)
  - [dataFromSelf](#datafromself)
- [Date](#date)
  - [Date](#date-1)
  - [dateFromString](#datefromstring)
- [Either](#either)
  - [either](#either)
  - [eitherFromSelf](#eitherfromself)
- [Option](#option)
  - [option](#option)
  - [optionFromSelf](#optionfromself)
- [ReadonlyMap](#readonlymap)
  - [readonlyMap](#readonlymap)
  - [readonlyMapFromSelf](#readonlymapfromself)
- [ReadonlySet](#readonlyset)
  - [readonlySet](#readonlyset)
  - [readonlySetFromSelf](#readonlysetfromself)
- [bigint](#bigint)
  - [clampBigint](#clampbigint)
- [boolean](#boolean)
  - [not](#not)
- [combinators](#combinators)
  - [array](#array)
  - [attachPropertySignature](#attachpropertysignature)
  - [element](#element)
  - [extend](#extend)
  - [filter](#filter)
  - [lazy](#lazy)
  - [nonEmptyArray](#nonemptyarray)
  - [nullable](#nullable)
  - [omit](#omit)
  - [optionalElement](#optionalelement)
  - [pick](#pick)
  - [record](#record)
  - [rest](#rest)
  - [struct](#struct)
  - [tuple](#tuple)
  - [union](#union)
- [constructors](#constructors)
  - [make](#make)
  - [transform](#transform)
  - [transformResult](#transformresult)
- [decoding](#decoding)
  - [decode](#decode)
  - [decodeEffect](#decodeeffect)
  - [decodeEither](#decodeeither)
  - [decodeOption](#decodeoption)
  - [decodePromise](#decodepromise)
  - [decodeResult](#decoderesult)
- [encoding](#encoding)
  - [encode](#encode)
  - [encodeEffect](#encodeeffect)
  - [encodeEither](#encodeeither)
  - [encodeOption](#encodeoption)
  - [encodePromise](#encodepromise)
  - [encodeResult](#encoderesult)
- [model](#model)
  - [From (type alias)](#from-type-alias)
  - [To (type alias)](#to-type-alias)
  - [Transform (interface)](#transform-interface)
- [number](#number)
  - [NumberFromString](#numberfromstring)
  - [clamp](#clamp)
  - [numberFromString](#numberfromstring)
- [option](#option-1)
  - [optionFromNullable](#optionfromnullable)
- [parsing](#parsing)
  - [parse](#parse)
  - [parseEffect](#parseeffect)
  - [parseEither](#parseeither)
  - [parseOption](#parseoption)
  - [parsePromise](#parsepromise)
  - [parseResult](#parseresult)
- [string](#string)
  - [Trim](#trim)
  - [trim](#trim)
- [utils](#utils)
  - [FromOptionalKeys (type alias)](#fromoptionalkeys-type-alias)
  - [TransformPropertySignature (interface)](#transformpropertysignature-interface)
  - [from](#from)
  - [optional](#optional)
  - [propertySignature](#propertysignature)
  - [to](#to)

---

# Chunk

## chunk

**Signature**

```ts
export declare const chunk: <I, A>(item: Transform<I, A>) => Transform<readonly I[], Chunk<A>>
```

Added in v1.0.0

## chunkFromSelf

**Signature**

```ts
export declare const chunkFromSelf: <I, A>(item: Transform<I, A>) => Transform<Chunk<I>, Chunk<A>>
```

Added in v1.0.0

# Data

## data

**Signature**

```ts
export declare const data: <
  I extends readonly any[] | Readonly<Record<string, any>>,
  A extends readonly any[] | Readonly<Record<string, any>>
>(
  item: Transform<I, A>
) => Transform<I, D.Data<A>>
```

Added in v1.0.0

## dataFromSelf

**Signature**

```ts
export declare const dataFromSelf: <
  I extends readonly any[] | Readonly<Record<string, any>>,
  A extends readonly any[] | Readonly<Record<string, any>>
>(
  item: Transform<I, A>
) => Transform<D.Data<I>, D.Data<A>>
```

Added in v1.0.0

# Date

## Date

A schema that transforms a `string` into a `Date`.

**Signature**

```ts
export declare const Date: Transform<string, Date>
```

Added in v1.0.0

## dateFromString

A combinator that transforms a `string` into a valid `Date`.

**Signature**

```ts
export declare const dateFromString: <I>(self: Transform<I, string>) => Transform<I, Date>
```

Added in v1.0.0

# Either

## either

**Signature**

```ts
export declare const either: <IE, E, IA, A>(
  left: Transform<IE, E>,
  right: Transform<IA, A>
) => Transform<
  { readonly _tag: 'Left'; readonly left: IE } | { readonly _tag: 'Right'; readonly right: IA },
  Either<E, A>
>
```

Added in v1.0.0

## eitherFromSelf

**Signature**

```ts
export declare const eitherFromSelf: <IE, E, IA, A>(
  left: Transform<IE, E>,
  right: Transform<IA, A>
) => Transform<Either<IE, IA>, Either<E, A>>
```

Added in v1.0.0

# Option

## option

**Signature**

```ts
export declare const option: <I, A>(
  value: Transform<I, A>
) => Transform<{ readonly _tag: 'None' } | { readonly _tag: 'Some'; readonly value: I }, Option<A>>
```

Added in v1.0.0

## optionFromSelf

**Signature**

```ts
export declare const optionFromSelf: <I, A>(value: Transform<I, A>) => Transform<Option<I>, Option<A>>
```

Added in v1.0.0

# ReadonlyMap

## readonlyMap

**Signature**

```ts
export declare const readonlyMap: <IK, K, IV, V>(
  key: Transform<IK, K>,
  value: Transform<IV, V>
) => Transform<readonly (readonly [IK, IV])[], ReadonlyMap<K, V>>
```

Added in v1.0.0

## readonlyMapFromSelf

**Signature**

```ts
export declare const readonlyMapFromSelf: <IK, K, IV, V>(
  key: Transform<IK, K>,
  value: Transform<IV, V>
) => Transform<ReadonlyMap<IK, IV>, ReadonlyMap<K, V>>
```

Added in v1.0.0

# ReadonlySet

## readonlySet

**Signature**

```ts
export declare const readonlySet: <I, A>(item: Transform<I, A>) => Transform<readonly I[], ReadonlySet<A>>
```

Added in v1.0.0

## readonlySetFromSelf

**Signature**

```ts
export declare const readonlySetFromSelf: <I, A>(item: Transform<I, A>) => Transform<ReadonlySet<I>, ReadonlySet<A>>
```

Added in v1.0.0

# bigint

## clampBigint

Clamps a bigint between a minimum and a maximum value.

**Signature**

```ts
export declare const clampBigint: (min: bigint, max: bigint) => <I>(self: Transform<I, bigint>) => Transform<I, bigint>
```

Added in v1.0.0

# boolean

## not

Negates a boolean value

**Signature**

```ts
export declare const not: <I>(self: Transform<I, boolean>) => Transform<I, boolean>
```

Added in v1.0.0

# combinators

## array

**Signature**

```ts
export declare const array: <I, A>(item: Transform<I, A>) => Transform<readonly I[], readonly A[]>
```

Added in v1.0.0

## attachPropertySignature

Attaches a property signature with the specified key and value to the schema.
This API is useful when you want to add a property to your schema which doesn't describe the shape of the input,
but rather maps to another schema, for example when you want to add a discriminant to a simple union.

**Signature**

```ts
export declare const attachPropertySignature: <K extends string | number | symbol, V extends AST.LiteralValue>(
  key: K,
  value: V
) => <I, A extends object>(transform: Transform<I, A>) => Transform<I, S.Spread<A & { readonly [k in K]: V }>>
```

**Example**

```ts
import * as S from '@effect/schema/Schema'
import * as T from '@effect/schema/Transform'
import { pipe } from '@effect/data/Function'

const Circle = S.struct({ radius: S.number })
const Square = S.struct({ sideLength: S.number })
const Shape = T.union(
  pipe(Circle, T.attachPropertySignature('kind', 'circle')),
  pipe(Square, T.attachPropertySignature('kind', 'square'))
)

assert.deepStrictEqual(T.decode(Shape)({ radius: 10 }), {
  kind: 'circle',
  radius: 10,
})
```

Added in v1.0.0

## element

**Signature**

```ts
export declare const element: <IE, E>(
  element: Transform<IE, E>
) => <I extends readonly any[], A extends readonly any[]>(
  self: Transform<I, A>
) => Transform<readonly [...I, IE], readonly [...A, E]>
```

Added in v1.0.0

## extend

**Signature**

```ts
export declare const extend: {
  <IB, B>(that: Transform<IB, B>): <I, A>(self: Transform<I, A>) => Transform<S.Spread<I & IB>, S.Spread<A & B>>
  <I, A, IB, B>(self: Transform<I, A>, that: Transform<IB, B>): Transform<S.Spread<I & IB>, S.Spread<A & B>>
}
```

Added in v1.0.0

## filter

Applies a `Schema` transformation.

**Signature**

```ts
export declare const filter: <A, B extends A>(
  f: (schema: S.Schema<A>) => S.Schema<B>
) => <I>(transform: Transform<I, A>) => Transform<I, B>
```

Added in v1.0.0

## lazy

**Signature**

```ts
export declare const lazy: <I, A>(
  f: () => Transform<I, A>,
  annotations?: AST.Annotations | undefined
) => Transform<I, A>
```

Added in v1.0.0

## nonEmptyArray

**Signature**

```ts
export declare const nonEmptyArray: <I, A>(
  item: Transform<I, A>
) => Transform<readonly [I, ...I[]], readonly [A, ...A[]]>
```

Added in v1.0.0

## nullable

**Signature**

```ts
export declare const nullable: <From, To>(self: Transform<From, To>) => Transform<From | null, To | null>
```

Added in v1.0.0

## omit

**Signature**

```ts
export declare const omit: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => <I extends { [K in keyof A]?: any }>(
  self: Transform<I, A>
) => Transform<S.Spread<Pick<I, Exclude<keyof I, Keys[number]>>>, S.Spread<Pick<A, Exclude<keyof A, Keys[number]>>>>
```

Added in v1.0.0

## optionalElement

**Signature**

```ts
export declare const optionalElement: <IE, E>(
  element: Transform<IE, E>
) => <I extends readonly any[], A extends readonly any[]>(
  self: Transform<I, A>
) => Transform<readonly [...I, (IE | undefined)?], readonly [...A, (E | undefined)?]>
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => <I extends { [K in keyof A]?: any }>(
  self: Transform<I, A>
) => Transform<S.Spread<Pick<I, Keys[number]>>, S.Spread<Pick<A, Keys[number]>>>
```

Added in v1.0.0

## record

**Signature**

```ts
export declare const record: <K extends string | symbol, I, A>(
  key: S.Schema<K>,
  value: Transform<I, A>
) => Transform<{ readonly [k in K]: I }, { readonly [k in K]: A }>
```

Added in v1.0.0

## rest

**Signature**

```ts
export declare const rest: <IR, R>(
  rest: Transform<IR, R>
) => <I extends readonly any[], A extends readonly any[]>(
  self: Transform<I, A>
) => Transform<readonly [...I, ...IR[]], readonly [...A, ...R[]]>
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <
  Fields extends Record<
    string | number | symbol,
    | Transform<any, any>
    | Transform<never, never>
    | S.PropertySignature<any, boolean, any, boolean>
    | S.PropertySignature<never, boolean, never, boolean>
  >
>(
  fields: Fields
) => Transform<
  S.Spread<
    { readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: From<Fields[K]> } & {
      readonly [K in FromOptionalKeys<Fields>]?: From<Fields[K]> | undefined
    }
  >,
  S.Spread<
    { readonly [K in Exclude<keyof Fields, S.ToOptionalKeys<Fields>>]: To<Fields[K]> } & {
      readonly [K in S.ToOptionalKeys<Fields>]?: To<Fields[K]> | undefined
    }
  >
>
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <Elements extends readonly Transform<any, any>[]>(
  ...elements: Elements
) => Transform<
  { readonly [K in keyof Elements]: From<Elements[K]> },
  { readonly [K in keyof Elements]: To<Elements[K]> }
>
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: <Members extends readonly Transform<any, any>[]>(
  ...members: Members
) => Transform<From<Members[number]>, To<Members[number]>>
```

Added in v1.0.0

# constructors

## make

**Signature**

```ts
export declare const make: <I, A>(ast: AST.AST) => Transform<I, A>
```

Added in v1.0.0

## transform

Create a new `Transform` by transforming the input and output of an existing `Schema`
using the provided mapping functions.

**Signature**

```ts
export declare const transform: {
  <I2, A2, A1>(to: Transform<I2, A2>, decode: (a1: A1) => I2, encode: (i2: I2) => A1): <I1>(
    self: Transform<I1, A1>
  ) => Transform<I1, A2>
  <I1, A1, I2, A2>(
    from: Transform<I1, A1>,
    to: Transform<I2, A2>,
    decode: (a1: A1) => I2,
    encode: (i2: I2) => A1
  ): Transform<I1, A2>
}
```

Added in v1.0.0

## transformResult

Create a new `Transform` by transforming the input and output of an existing `Schema`
using the provided decoding functions.

**Signature**

```ts
export declare const transformResult: {
  <I2, A2, A1>(
    to: Transform<I2, A2>,
    decode: (a1: A1, options: ParseOptions, self: AST.AST) => PR.IO<PR.ParseError, I2>,
    encode: (i2: I2, options: ParseOptions, self: AST.AST) => PR.IO<PR.ParseError, A1>
  ): <I1>(self: Transform<I1, A1>) => Transform<I1, A2>
  <I1, A1, I2, A2>(
    from: Transform<I1, A1>,
    to: Transform<I2, A2>,
    decode: (a1: A1, options: ParseOptions, self: AST.AST) => PR.IO<PR.ParseError, I2>,
    encode: (i2: I2, options: ParseOptions, self: AST.AST) => PR.IO<PR.ParseError, A1>
  ): Transform<I1, A2>
}
```

Added in v1.0.0

# decoding

## decode

**Signature**

```ts
export declare const decode: <I, A>(schema: Transform<I, A>) => (i: I, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

## decodeEffect

**Signature**

```ts
export declare const decodeEffect: <I, A>(
  schema: Transform<I, A>
) => (i: I, options?: ParseOptions | undefined) => Effect<never, PR.ParseError, A>
```

Added in v1.0.0

## decodeEither

**Signature**

```ts
export declare const decodeEither: <I, A>(
  schema: Transform<I, A>
) => (i: I, options?: ParseOptions | undefined) => Either<PR.ParseError, A>
```

Added in v1.0.0

## decodeOption

**Signature**

```ts
export declare const decodeOption: <I, A>(
  schema: Transform<I, A>
) => (i: I, options?: ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

## decodePromise

**Signature**

```ts
export declare const decodePromise: <I, A>(
  schema: Transform<I, A>
) => (i: I, options?: ParseOptions | undefined) => Promise<A>
```

Added in v1.0.0

## decodeResult

**Signature**

```ts
export declare const decodeResult: <I, A>(
  schema: Transform<I, A>
) => (i: I, options?: ParseOptions | undefined) => PR.IO<PR.ParseError, A>
```

Added in v1.0.0

# encoding

## encode

**Signature**

```ts
export declare const encode: <I, A>(schema: Transform<I, A>) => (a: A, options?: ParseOptions | undefined) => I
```

Added in v1.0.0

## encodeEffect

**Signature**

```ts
export declare const encodeEffect: <I, A>(
  schema: Transform<I, A>
) => (a: A, options?: ParseOptions | undefined) => Effect<never, PR.ParseError, I>
```

Added in v1.0.0

## encodeEither

**Signature**

```ts
export declare const encodeEither: <I, A>(
  schema: Transform<I, A>
) => (a: A, options?: ParseOptions | undefined) => Either<PR.ParseError, I>
```

Added in v1.0.0

## encodeOption

**Signature**

```ts
export declare const encodeOption: <I, A>(
  schema: Transform<I, A>
) => (input: A, options?: ParseOptions | undefined) => Option<I>
```

Added in v1.0.0

## encodePromise

**Signature**

```ts
export declare const encodePromise: <I, A>(
  schema: Transform<I, A>
) => (a: A, options?: ParseOptions | undefined) => Promise<I>
```

Added in v1.0.0

## encodeResult

**Signature**

```ts
export declare const encodeResult: <I, A>(
  schema: Transform<I, A>
) => (a: A, options?: ParseOptions | undefined) => PR.IO<PR.ParseError, I>
```

Added in v1.0.0

# model

## From (type alias)

**Signature**

```ts
export type From<S extends { readonly From: (..._: any) => any }> = Parameters<S['From']>[0]
```

Added in v1.0.0

## To (type alias)

**Signature**

```ts
export type To<S extends { readonly To: (..._: any) => any }> = Parameters<S['To']>[0]
```

Added in v1.0.0

## Transform (interface)

**Signature**

```ts
export interface Transform<From, To> {
  readonly From: (_: From) => From
  readonly To: (_: To) => To
  readonly ast: AST.AST
}
```

Added in v1.0.0

# number

## NumberFromString

This transformation converts a `string` into a `number` by parsing the string using `parseFloat`.

The following special string values are supported: "NaN", "Infinity", "-Infinity".

**Signature**

```ts
export declare const NumberFromString: Transform<string, number>
```

Added in v1.0.0

## clamp

Clamps a number between a minimum and a maximum value.

**Signature**

```ts
export declare const clamp: (min: number, max: number) => <I>(self: Transform<I, number>) => Transform<I, number>
```

Added in v1.0.0

## numberFromString

This combinator transforms a `string` into a `number` by parsing the string using `parseFloat`.

The following special string values are supported: "NaN", "Infinity", "-Infinity".

**Signature**

```ts
export declare const numberFromString: <I>(self: Transform<I, string>) => Transform<I, number>
```

Added in v1.0.0

# option

## optionFromNullable

**Signature**

```ts
export declare const optionFromNullable: <I, A>(value: Transform<I, A>) => Transform<I | null, Option<A>>
```

Added in v1.0.0

# parsing

## parse

**Signature**

```ts
export declare const parse: <I, A>(schema: Transform<I, A>) => (i: unknown, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

## parseEffect

**Signature**

```ts
export declare const parseEffect: <I, A>(
  schema: Transform<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => Effect<never, PR.ParseError, A>
```

Added in v1.0.0

## parseEither

**Signature**

```ts
export declare const parseEither: <I, A>(
  schema: Transform<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => Either<PR.ParseError, A>
```

Added in v1.0.0

## parseOption

**Signature**

```ts
export declare const parseOption: <I, A>(
  schema: Transform<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

## parsePromise

**Signature**

```ts
export declare const parsePromise: <I, A>(
  schema: Transform<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => Promise<A>
```

Added in v1.0.0

## parseResult

**Signature**

```ts
export declare const parseResult: <I, A>(
  schema: Transform<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => PR.IO<PR.ParseError, A>
```

Added in v1.0.0

# string

## Trim

This transformation allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const Trim: Transform<string, string>
```

Added in v1.0.0

## trim

This combinator allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const trim: <I>(self: Transform<I, string>) => Transform<I, string>
```

Added in v1.0.0

# utils

## FromOptionalKeys (type alias)

**Signature**

```ts
export type FromOptionalKeys<Fields> = {
  [K in keyof Fields]: Fields[K] extends
    | S.PropertySignature<any, true, any, boolean>
    | S.PropertySignature<never, true, never, boolean>
    ? K
    : never
}[keyof Fields]
```

Added in v1.0.0

## TransformPropertySignature (interface)

**Signature**

```ts
export interface TransformPropertySignature<From, FromIsOptional, To, ToIsOptional>
  extends S.PropertySignature<From, FromIsOptional, To, ToIsOptional> {
  readonly optional: () => TransformPropertySignature<From, true, To, true>
  readonly withDefault: (value: () => To) => TransformPropertySignature<From, true, To, false>
  readonly toOption: () => TransformPropertySignature<From, true, Option<To>, false>
}
```

Added in v1.0.0

## from

**Signature**

```ts
export declare const from: <I, A>(transform: Transform<I, A>) => S.Schema<I>
```

Added in v1.0.0

## optional

**Signature**

```ts
export declare const optional: <I, A>(
  transform: Transform<I, A>,
  annotations?: AST.Annotations | undefined
) => TransformPropertySignature<I, true, A, true>
```

Added in v1.0.0

## propertySignature

**Signature**

```ts
export declare const propertySignature: <I, A>(
  transform: Transform<I, A>,
  annotations?: AST.Annotations | undefined
) => TransformPropertySignature<I, false, A, false>
```

Added in v1.0.0

## to

**Signature**

```ts
export declare const to: <I, A>(transform: Transform<I, A>) => S.Schema<A>
```

Added in v1.0.0
