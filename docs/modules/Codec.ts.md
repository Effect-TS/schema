---
title: Codec.ts
nav_order: 3
parent: Modules
---

## Codec overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Chunk transformations](#chunk-transformations)
  - [chunk](#chunk)
  - [chunkFromSelf](#chunkfromself)
- [Data transformations](#data-transformations)
  - [data](#data)
  - [dataFromSelf](#datafromself)
- [Date transformations](#date-transformations)
  - [Date](#date)
  - [dateFromString](#datefromstring)
- [Either transformations](#either-transformations)
  - [either](#either)
  - [eitherFromSelf](#eitherfromself)
- [Option transformations](#option-transformations)
  - [option](#option)
  - [optionFromNullable](#optionfromnullable)
  - [optionFromSelf](#optionfromself)
- [ReadonlyArray filters](#readonlyarray-filters)
  - [itemsCount](#itemscount)
  - [maxItems](#maxitems)
  - [minItems](#minitems)
- [ReadonlyMap transformations](#readonlymap-transformations)
  - [readonlyMap](#readonlymap)
  - [readonlyMapFromSelf](#readonlymapfromself)
- [ReadonlySet transformations](#readonlyset-transformations)
  - [readonlySet](#readonlyset)
  - [readonlySetFromSelf](#readonlysetfromself)
- [bigint filters](#bigint-filters)
  - [betweenBigint](#betweenbigint)
  - [greaterThanBigint](#greaterthanbigint)
  - [greaterThanOrEqualToBigint](#greaterthanorequaltobigint)
  - [lessThanBigint](#lessthanbigint)
  - [lessThanOrEqualToBigint](#lessthanorequaltobigint)
  - [negativeBigint](#negativebigint)
  - [nonNegativeBigint](#nonnegativebigint)
  - [nonPositiveBigint](#nonpositivebigint)
  - [positiveBigint](#positivebigint)
- [bigint transformations](#bigint-transformations)
  - [BigintFromString](#bigintfromstring)
  - [bigintFromString](#bigintfromstring)
  - [clampBigint](#clampbigint)
- [boolean transformations](#boolean-transformations)
  - [not](#not)
- [combinators](#combinators)
  - [array](#array)
  - [attachPropertySignature](#attachpropertysignature)
  - [brand](#brand)
  - [compose](#compose)
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
- [converters](#converters)
  - [from](#from)
  - [to](#to)
- [decoding](#decoding)
  - [decode](#decode)
  - [decodeEither](#decodeeither)
  - [decodeOption](#decodeoption)
  - [decodePromise](#decodepromise)
  - [decodeResult](#decoderesult)
  - [decodeSync](#decodesync)
- [encoding](#encoding)
  - [encode](#encode)
  - [encodeEither](#encodeeither)
  - [encodeOption](#encodeoption)
  - [encodePromise](#encodepromise)
  - [encodeResult](#encoderesult)
  - [encodeSync](#encodesync)
- [guards](#guards)
  - [isCodec](#iscodec)
- [model](#model)
  - [Codec (interface)](#codec-interface)
- [number filters](#number-filters)
  - [between](#between)
  - [finite](#finite)
  - [greaterThan](#greaterthan)
  - [greaterThanOrEqualTo](#greaterthanorequalto)
  - [int](#int)
  - [lessThan](#lessthan)
  - [lessThanOrEqualTo](#lessthanorequalto)
  - [multipleOf](#multipleof)
  - [negative](#negative)
  - [nonNaN](#nonnan)
  - [nonNegative](#nonnegative)
  - [nonPositive](#nonpositive)
  - [positive](#positive)
- [number transformations](#number-transformations)
  - [NumberFromString](#numberfromstring)
  - [clamp](#clamp)
  - [numberFromString](#numberfromstring)
- [parsing](#parsing)
  - [parse](#parse)
  - [parseEither](#parseeither)
  - [parseOption](#parseoption)
  - [parsePromise](#parsepromise)
  - [parseResult](#parseresult)
  - [parseSync](#parsesync)
- [string filters](#string-filters)
  - [endsWith](#endswith)
  - [includes](#includes)
  - [length](#length)
  - [maxLength](#maxlength)
  - [minLength](#minlength)
  - [nonEmpty](#nonempty)
  - [pattern](#pattern)
  - [startsWith](#startswith)
  - [trimmed](#trimmed)
- [string transformations](#string-transformations)
  - [Trim](#trim)
  - [split](#split)
  - [trim](#trim)
- [symbol](#symbol)
  - [CodecTypeId (type alias)](#codectypeid-type-alias)
- [utils](#utils)
  - [From (type alias)](#from-type-alias)
  - [FromOptionalKeys (type alias)](#fromoptionalkeys-type-alias)
  - [JSONEither (type alias)](#jsoneither-type-alias)
  - [JSONOption (type alias)](#jsonoption-type-alias)
  - [To (type alias)](#to-type-alias)
  - [optional](#optional)
  - [propertySignature](#propertysignature)

---

# Chunk transformations

## chunk

**Signature**

```ts
export declare const chunk: <I, A>(item: Codec<I, A>) => Codec<readonly I[], Chunk<A>>
```

Added in v1.0.0

## chunkFromSelf

**Signature**

```ts
export declare const chunkFromSelf: <I, A>(item: Codec<I, A>) => Codec<Chunk<I>, Chunk<A>>
```

Added in v1.0.0

# Data transformations

## data

**Signature**

```ts
export declare const data: <
  I extends readonly any[] | Readonly<Record<string, any>>,
  A extends readonly any[] | Readonly<Record<string, any>>
>(
  item: Codec<I, A>
) => Codec<I, D.Data<A>>
```

Added in v1.0.0

## dataFromSelf

**Signature**

```ts
export declare const dataFromSelf: <
  I extends readonly any[] | Readonly<Record<string, any>>,
  A extends readonly any[] | Readonly<Record<string, any>>
>(
  item: Codec<I, A>
) => Codec<D.Data<I>, D.Data<A>>
```

Added in v1.0.0

# Date transformations

## Date

A schema that transforms a `string` into a `Date`.

**Signature**

```ts
export declare const Date: Codec<string, Date>
```

Added in v1.0.0

## dateFromString

A combinator that transforms a `string` into a valid `Date`.

**Signature**

```ts
export declare const dateFromString: <I>(self: Codec<I, string>) => Codec<I, Date>
```

Added in v1.0.0

# Either transformations

## either

**Signature**

```ts
export declare const either: <IE, E, IA, A>(
  left: Codec<IE, E>,
  right: Codec<IA, A>
) => Codec<JSONEither<IE, IA>, Either<E, A>>
```

Added in v1.0.0

## eitherFromSelf

**Signature**

```ts
export declare const eitherFromSelf: <IE, E, IA, A>(
  left: Codec<IE, E>,
  right: Codec<IA, A>
) => Codec<Either<IE, IA>, Either<E, A>>
```

Added in v1.0.0

# Option transformations

## option

**Signature**

```ts
export declare const option: <I, A>(value: Codec<I, A>) => Codec<JSONOption<I>, Option<A>>
```

Added in v1.0.0

## optionFromNullable

**Signature**

```ts
export declare const optionFromNullable: <I, A>(value: Codec<I, A>) => Codec<I | null, Option<A>>
```

Added in v1.0.0

## optionFromSelf

**Signature**

```ts
export declare const optionFromSelf: <I, A>(value: Codec<I, A>) => Codec<Option<I>, Option<A>>
```

Added in v1.0.0

# ReadonlyArray filters

## itemsCount

**Signature**

```ts
export declare const itemsCount: <A>(
  n: number,
  options?: S.FilterAnnotations<readonly A[]> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## maxItems

**Signature**

```ts
export declare const maxItems: <A>(
  n: number,
  options?: S.FilterAnnotations<readonly A[]> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## minItems

**Signature**

```ts
export declare const minItems: <A>(
  n: number,
  options?: S.FilterAnnotations<readonly A[]> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

# ReadonlyMap transformations

## readonlyMap

**Signature**

```ts
export declare const readonlyMap: <IK, K, IV, V>(
  key: Codec<IK, K>,
  value: Codec<IV, V>
) => Codec<readonly (readonly [IK, IV])[], ReadonlyMap<K, V>>
```

Added in v1.0.0

## readonlyMapFromSelf

**Signature**

```ts
export declare const readonlyMapFromSelf: <IK, K, IV, V>(
  key: Codec<IK, K>,
  value: Codec<IV, V>
) => Codec<ReadonlyMap<IK, IV>, ReadonlyMap<K, V>>
```

Added in v1.0.0

# ReadonlySet transformations

## readonlySet

**Signature**

```ts
export declare const readonlySet: <I, A>(item: Codec<I, A>) => Codec<readonly I[], ReadonlySet<A>>
```

Added in v1.0.0

## readonlySetFromSelf

**Signature**

```ts
export declare const readonlySetFromSelf: <I, A>(item: Codec<I, A>) => Codec<ReadonlySet<I>, ReadonlySet<A>>
```

Added in v1.0.0

# bigint filters

## betweenBigint

Tests if a `bigint` is between a minimum and a maximum value (included).

**Signature**

```ts
export declare const betweenBigint: <A extends bigint>(
  min: bigint,
  max: bigint,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## greaterThanBigint

**Signature**

```ts
export declare const greaterThanBigint: <A extends bigint>(
  min: bigint,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## greaterThanOrEqualToBigint

**Signature**

```ts
export declare const greaterThanOrEqualToBigint: <A extends bigint>(
  min: bigint,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## lessThanBigint

**Signature**

```ts
export declare const lessThanBigint: <A extends bigint>(
  max: bigint,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## lessThanOrEqualToBigint

**Signature**

```ts
export declare const lessThanOrEqualToBigint: <A extends bigint>(
  max: bigint,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## negativeBigint

**Signature**

```ts
export declare const negativeBigint: <A extends bigint>(
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## nonNegativeBigint

**Signature**

```ts
export declare const nonNegativeBigint: <A extends bigint>(
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## nonPositiveBigint

**Signature**

```ts
export declare const nonPositiveBigint: <A extends bigint>(
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## positiveBigint

**Signature**

```ts
export declare const positiveBigint: <A extends bigint>(
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

# bigint transformations

## BigintFromString

This codec transforms a `string` into a `bigint` by parsing the string using the `BigInt` function.

It returns an error if the value can't be converted (for example when non-numeric characters are provided).

**Signature**

```ts
export declare const BigintFromString: Codec<string, bigint>
```

Added in v1.0.0

## bigintFromString

This combinator transforms a `string` into a `bigint` by parsing the string using the `BigInt` function.

It returns an error if the value can't be converted (for example when non-numeric characters are provided).

**Signature**

```ts
export declare const bigintFromString: <I>(self: Codec<I, string>) => Codec<I, bigint>
```

Added in v1.0.0

## clampBigint

Clamps a bigint between a minimum and a maximum value.

**Signature**

```ts
export declare const clampBigint: (min: bigint, max: bigint) => <I>(self: Codec<I, bigint>) => Codec<I, bigint>
```

Added in v1.0.0

# boolean transformations

## not

Negates a boolean value

**Signature**

```ts
export declare const not: <I>(self: Codec<I, boolean>) => Codec<I, boolean>
```

Added in v1.0.0

# combinators

## array

**Signature**

```ts
export declare const array: <I, A>(item: Codec<I, A>) => Codec<readonly I[], readonly A[]>
```

Added in v1.0.0

## attachPropertySignature

Attaches a property signature with the specified key and value to the schema.
This API is useful when you want to add a property to your schema which doesn't describe the shape of the input,
but rather maps to another schema, for example when you want to add a discriminant to a simple union.

**Signature**

```ts
export declare const attachPropertySignature: {
  <K extends PropertyKey, V extends AST.LiteralValue>(key: K, value: V): <I, A extends object>(
    codec: Codec<I, A>
  ) => Codec<I, S.Simplify<A & { readonly [k in K]: V }>>
  <I, A, K extends PropertyKey, V extends AST.LiteralValue>(codec: Codec<I, A>, key: K, value: V): Codec<
    I,
    S.Simplify<A & { readonly [k in K]: V }>
  >
}
```

**Example**

```ts
import * as S from '@effect/schema/Schema'
import * as C from '@effect/schema/Codec'
import { pipe } from '@effect/data/Function'

const Circle = S.struct({ radius: S.number })
const Square = S.struct({ sideLength: S.number })
const Shape = C.union(
  C.attachPropertySignature(Circle, 'kind', 'circle'),
  C.attachPropertySignature(Square, 'kind', 'square')
)

assert.deepStrictEqual(C.decodeSync(Shape)({ radius: 10 }), {
  kind: 'circle',
  radius: 10,
})
```

Added in v1.0.0

## brand

**Signature**

```ts
export declare const brand: <B extends string | symbol, A>(
  brand: B,
  options?: S.DocAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A & Brand<B>>
```

Added in v1.0.0

## compose

**Signature**

```ts
export declare const compose: {
  <A, B>(that: Codec<A, B>): <I>(self: Codec<I, A>) => Codec<I, B>
  <I, A, B>(self: Codec<I, A>, that: Codec<A, B>): Codec<I, B>
}
```

Added in v1.0.0

## element

**Signature**

```ts
export declare const element: <IE, E>(
  element: Codec<IE, E>
) => <I extends readonly any[], A extends readonly any[]>(
  self: Codec<I, A>
) => Codec<readonly [...I, IE], readonly [...A, E]>
```

Added in v1.0.0

## extend

**Signature**

```ts
export declare const extend: {
  <IB, B>(that: Codec<IB, B>): <I, A>(self: Codec<I, A>) => Codec<S.Simplify<I & IB>, S.Simplify<A & B>>
  <I, A, IB, B>(self: Codec<I, A>, that: Codec<IB, B>): Codec<S.Simplify<I & IB>, S.Simplify<A & B>>
}
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare function filter<C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>,
  options?: S.FilterAnnotations<A>
): <I>(self: Codec<I, C>) => Codec<I, C & B>
export declare function filter<B extends A, A = B>(
  predicate: Predicate<A>,
  options?: S.FilterAnnotations<A>
): <I>(self: Codec<I, B>) => Codec<I, B>
```

Added in v1.0.0

## lazy

**Signature**

```ts
export declare const lazy: <I, A>(f: () => Codec<I, A>, annotations?: AST.Annotated['annotations']) => Codec<I, A>
```

Added in v1.0.0

## nonEmptyArray

**Signature**

```ts
export declare const nonEmptyArray: <I, A>(item: Codec<I, A>) => Codec<readonly [I, ...I[]], readonly [A, ...A[]]>
```

Added in v1.0.0

## nullable

**Signature**

```ts
export declare const nullable: <From, To>(self: Codec<From, To>) => Codec<From | null, To | null>
```

Added in v1.0.0

## omit

**Signature**

```ts
export declare const omit: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => <I extends { [K in keyof A]?: any }>(
  self: Codec<I, A>
) => Codec<S.Simplify<Omit<I, Keys[number]>>, S.Simplify<Omit<A, Keys[number]>>>
```

Added in v1.0.0

## optionalElement

**Signature**

```ts
export declare const optionalElement: <IE, E>(
  element: Codec<IE, E>
) => <I extends readonly any[], A extends readonly any[]>(
  self: Codec<I, A>
) => Codec<readonly [...I, (IE | undefined)?], readonly [...A, (E | undefined)?]>
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => <I extends { [K in keyof A]?: any }>(
  self: Codec<I, A>
) => Codec<S.Simplify<Pick<I, Keys[number]>>, S.Simplify<Pick<A, Keys[number]>>>
```

Added in v1.0.0

## record

**Signature**

```ts
export declare const record: <K extends string | symbol, I, A>(
  key: S.Schema<K>,
  value: Codec<I, A>
) => Codec<{ readonly [k in K]: I }, { readonly [k in K]: A }>
```

Added in v1.0.0

## rest

**Signature**

```ts
export declare const rest: <IR, R>(
  rest: Codec<IR, R>
) => <I extends readonly any[], A extends readonly any[]>(
  self: Codec<I, A>
) => Codec<readonly [...I, ...IR[]], readonly [...A, ...R[]]>
```

Added in v1.0.0

## struct

**Signature**

```ts
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
) => Codec<
  S.Simplify<
    { readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: From<Fields[K]> } & {
      readonly [K in FromOptionalKeys<Fields>]?: From<Fields[K]> | undefined
    }
  >,
  S.Simplify<
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
export declare const tuple: <Elements extends readonly Codec<any, any>[]>(
  ...elements: Elements
) => Codec<{ readonly [K in keyof Elements]: From<Elements[K]> }, { readonly [K in keyof Elements]: To<Elements[K]> }>
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: <Members extends readonly Codec<any, any>[]>(
  ...members: Members
) => Codec<From<Members[number]>, To<Members[number]>>
```

Added in v1.0.0

# constructors

## make

**Signature**

```ts
export declare const make: <I, A>(ast: AST.AST) => Codec<I, A>
```

Added in v1.0.0

## transform

Create a new `Codec` by transforming the input and output of an existing `Schema`
using the provided mapping functions.

**Signature**

```ts
export declare const transform: {
  <I2, A2, A1>(
    to: Codec<I2, A2>,
    decode: (a1: A1) => I2,
    encode: (i2: I2) => A1,
    annotations?: AST.Annotated['annotations']
  ): <I1>(self: Codec<I1, A1>) => Codec<I1, A2>
  <I1, A1, I2, A2>(
    from: Codec<I1, A1>,
    to: Codec<I2, A2>,
    decode: (a1: A1) => I2,
    encode: (i2: I2) => A1,
    annotations?: AST.Annotated['annotations']
  ): Codec<I1, A2>
}
```

Added in v1.0.0

## transformResult

Create a new `Codec` by transforming the input and output of an existing `Schema`
using the provided decoding functions.

**Signature**

```ts
export declare const transformResult: {
  <I2, A2, A1>(
    to: Codec<I2, A2>,
    decode: (a1: A1, options: ParseOptions, self: AST.AST) => ParseResult<I2>,
    encode: (i2: I2, options: ParseOptions, self: AST.AST) => ParseResult<A1>,
    annotations?: AST.Annotated['annotations']
  ): <I1>(self: Codec<I1, A1>) => Codec<I1, A2>
  <I1, A1, I2, A2>(
    from: Codec<I1, A1>,
    to: Codec<I2, A2>,
    decode: (a1: A1, options: ParseOptions, self: AST.AST) => ParseResult<I2>,
    encode: (i2: I2, options: ParseOptions, self: AST.AST) => ParseResult<A1>,
    annotations?: AST.Annotated['annotations']
  ): Codec<I1, A2>
}
```

Added in v1.0.0

# converters

## from

**Signature**

```ts
export declare const from: <I, A>(codec: Codec<I, A>) => S.Schema<I>
```

Added in v1.0.0

## to

**Signature**

```ts
export declare const to: <I, A>(codec: Codec<I, A>) => S.Schema<A>
```

Added in v1.0.0

# decoding

## decode

**Signature**

```ts
export declare const decode: <I, A>(
  schema: Codec<I, A>
) => (i: I, options?: ParseOptions | undefined) => Effect<never, PR.ParseError, A>
```

Added in v1.0.0

## decodeEither

**Signature**

```ts
export declare const decodeEither: <I, A>(
  schema: Codec<I, A>
) => (i: I, options?: ParseOptions | undefined) => Either<PR.ParseError, A>
```

Added in v1.0.0

## decodeOption

**Signature**

```ts
export declare const decodeOption: <I, A>(
  schema: Codec<I, A>
) => (i: I, options?: ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

## decodePromise

**Signature**

```ts
export declare const decodePromise: <I, A>(
  schema: Codec<I, A>
) => (i: I, options?: ParseOptions | undefined) => Promise<A>
```

Added in v1.0.0

## decodeResult

**Signature**

```ts
export declare const decodeResult: <I, A>(
  schema: Codec<I, A>
) => (i: I, options?: ParseOptions | undefined) => ParseResult<A>
```

Added in v1.0.0

## decodeSync

**Signature**

```ts
export declare const decodeSync: <I, A>(schema: Codec<I, A>) => (i: I, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

# encoding

## encode

**Signature**

```ts
export declare const encode: <I, A>(
  schema: Codec<I, A>
) => (a: A, options?: ParseOptions | undefined) => Effect<never, PR.ParseError, I>
```

Added in v1.0.0

## encodeEither

**Signature**

```ts
export declare const encodeEither: <I, A>(
  schema: Codec<I, A>
) => (a: A, options?: ParseOptions | undefined) => Either<PR.ParseError, I>
```

Added in v1.0.0

## encodeOption

**Signature**

```ts
export declare const encodeOption: <I, A>(
  schema: Codec<I, A>
) => (input: A, options?: ParseOptions | undefined) => Option<I>
```

Added in v1.0.0

## encodePromise

**Signature**

```ts
export declare const encodePromise: <I, A>(
  schema: Codec<I, A>
) => (a: A, options?: ParseOptions | undefined) => Promise<I>
```

Added in v1.0.0

## encodeResult

**Signature**

```ts
export declare const encodeResult: <I, A>(
  schema: Codec<I, A>
) => (a: A, options?: ParseOptions | undefined) => ParseResult<I>
```

Added in v1.0.0

## encodeSync

**Signature**

```ts
export declare const encodeSync: <I, A>(schema: Codec<I, A>) => (a: A, options?: ParseOptions | undefined) => I
```

Added in v1.0.0

# guards

## isCodec

Tests if a value is a `Codec`.

**Signature**

```ts
export declare const isCodec: (input: unknown) => input is Codec<unknown, unknown>
```

Added in v1.0.0

# model

## Codec (interface)

**Signature**

```ts
export interface Codec<From, To> extends Pipeable {
  readonly _codecId: CodecTypeId
  readonly From: (_: From) => From
  readonly To: (_: To) => To
  readonly ast: AST.AST
}
```

Added in v1.0.0

# number filters

## between

Tests if a `number` is between a minimum and a maximum value (included).

**Signature**

```ts
export declare const between: <A extends number>(
  min: number,
  max: number,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## finite

**Signature**

```ts
export declare const finite: <A extends number>(
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## greaterThan

**Signature**

```ts
export declare const greaterThan: <A extends number>(
  min: number,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## greaterThanOrEqualTo

**Signature**

```ts
export declare const greaterThanOrEqualTo: <A extends number>(
  min: number,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## int

**Signature**

```ts
export declare const int: <A extends number>(
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## lessThan

**Signature**

```ts
export declare const lessThan: <A extends number>(
  max: number,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## lessThanOrEqualTo

**Signature**

```ts
export declare const lessThanOrEqualTo: <A extends number>(
  max: number,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## multipleOf

**Signature**

```ts
export declare const multipleOf: <A extends number>(
  divisor: number,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## negative

**Signature**

```ts
export declare const negative: <A extends number>(
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## nonNaN

**Signature**

```ts
export declare const nonNaN: <A extends number>(
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## nonNegative

**Signature**

```ts
export declare const nonNegative: <A extends number>(
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## nonPositive

**Signature**

```ts
export declare const nonPositive: <A extends number>(
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## positive

**Signature**

```ts
export declare const positive: <A extends number>(
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

# number transformations

## NumberFromString

This codec transforms a `string` into a `number` by parsing the string using the `Number` function.

It returns an error if the value can't be converted (for example when non-numeric characters are provided).

The following special string values are supported: "NaN", "Infinity", "-Infinity".

**Signature**

```ts
export declare const NumberFromString: Codec<string, number>
```

Added in v1.0.0

## clamp

Clamps a number between a minimum and a maximum value.

**Signature**

```ts
export declare const clamp: (min: number, max: number) => <I>(self: Codec<I, number>) => Codec<I, number>
```

Added in v1.0.0

## numberFromString

This combinator transforms a `string` into a `number` by parsing the string using the `Number` function.

It returns an error if the value can't be converted (for example when non-numeric characters are provided).

The following special string values are supported: "NaN", "Infinity", "-Infinity".

**Signature**

```ts
export declare const numberFromString: <I>(self: Codec<I, string>) => Codec<I, number>
```

Added in v1.0.0

# parsing

## parse

**Signature**

```ts
export declare const parse: <I, A>(
  schema: Codec<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => Effect<never, PR.ParseError, A>
```

Added in v1.0.0

## parseEither

**Signature**

```ts
export declare const parseEither: <I, A>(
  schema: Codec<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => Either<PR.ParseError, A>
```

Added in v1.0.0

## parseOption

**Signature**

```ts
export declare const parseOption: <I, A>(
  schema: Codec<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

## parsePromise

**Signature**

```ts
export declare const parsePromise: <I, A>(
  schema: Codec<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => Promise<A>
```

Added in v1.0.0

## parseResult

**Signature**

```ts
export declare const parseResult: <I, A>(
  schema: Codec<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => ParseResult<A>
```

Added in v1.0.0

## parseSync

**Signature**

```ts
export declare const parseSync: <I, A>(schema: Codec<I, A>) => (i: unknown, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

# string filters

## endsWith

**Signature**

```ts
export declare const endsWith: <A extends string>(
  endsWith: string,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## includes

**Signature**

```ts
export declare const includes: <A extends string>(
  searchString: string,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## length

**Signature**

```ts
export declare const length: <A extends string>(
  length: number,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: <A extends string>(
  maxLength: number,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: <A extends string>(
  minLength: number,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## nonEmpty

**Signature**

```ts
export declare const nonEmpty: <A extends string>(
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## pattern

**Signature**

```ts
export declare const pattern: <A extends string>(
  regex: RegExp,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## startsWith

**Signature**

```ts
export declare const startsWith: <A extends string>(
  startsWith: string,
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

## trimmed

Verifies that a string contains no leading or trailing whitespaces.

Note. This combinator does not make any transformations, it only validates.
If what you were looking for was a combinator to trim strings, then check out the `trim` combinator.

**Signature**

```ts
export declare const trimmed: <A extends string>(
  options?: S.FilterAnnotations<A> | undefined
) => <I>(self: Codec<I, A>) => Codec<I, A>
```

Added in v1.0.0

# string transformations

## Trim

This transformation allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const Trim: Codec<string, string>
```

Added in v1.0.0

## split

This combinator allows splitting a string into an array of strings.

**Signature**

```ts
export declare const split: {
  (separator: string): <I>(self: Codec<I, string>) => Codec<I, readonly string[]>
  <I>(self: Codec<I, string>, separator: string): Codec<I, readonly string[]>
}
```

Added in v1.0.0

## trim

This combinator allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const trim: <I>(self: Codec<I, string>) => Codec<I, string>
```

Added in v1.0.0

# symbol

## CodecTypeId (type alias)

**Signature**

```ts
export type CodecTypeId = S.CodecTypeId
```

Added in v1.0.0

# utils

## From (type alias)

**Signature**

```ts
export type From<S extends { readonly From: (..._: any) => any }> = Parameters<S['From']>[0]
```

Added in v1.0.0

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

## JSONEither (type alias)

**Signature**

```ts
export type JSONEither<E, A> =
  | { readonly _tag: 'Left'; readonly left: E }
  | {
      readonly _tag: 'Right'
      readonly right: A
    }
```

Added in v1.0.0

## JSONOption (type alias)

**Signature**

```ts
export type JSONOption<A> = { readonly _tag: 'None' } | { readonly _tag: 'Some'; readonly value: A }
```

Added in v1.0.0

## To (type alias)

**Signature**

```ts
export type To<S extends { readonly To: (..._: any) => any }> = Parameters<S['To']>[0]
```

Added in v1.0.0

## optional

**Signature**

```ts
export declare const optional: <I, A>(
  codec: Codec<I, A>,
  options?: S.DocAnnotations<A> | undefined
) => S.OptionalPropertySignature<I, true, A, true>
```

Added in v1.0.0

## propertySignature

**Signature**

```ts
export declare const propertySignature: <I, A>(
  codec: Codec<I, A>,
  options: S.DocAnnotations<A>
) => S.PropertySignature<I, false, A, false>
```

Added in v1.0.0
