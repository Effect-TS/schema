---
title: Transform.ts
nav_order: 7
parent: Modules
---

## Transform overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Date](#date)
  - [Date](#date-1)
  - [dateFromString](#datefromstring)
  - [validDate](#validdate)
- [array](#array)
  - [itemsCount](#itemscount)
  - [maxItems](#maxitems)
  - [minItems](#minitems)
- [bigint](#bigint)
  - [betweenBigint](#betweenbigint)
  - [clampBigint](#clampbigint)
  - [greaterThanBigint](#greaterthanbigint)
  - [greaterThanOrEqualToBigint](#greaterthanorequaltobigint)
  - [lessThanBigint](#lessthanbigint)
  - [lessThanOrEqualToBigint](#lessthanorequaltobigint)
  - [negativeBigint](#negativebigint)
  - [nonNegativeBigint](#nonnegativebigint)
  - [nonPositiveBigint](#nonpositivebigint)
  - [positiveBigint](#positivebigint)
- [boolean](#boolean)
  - [not](#not)
- [combinators](#combinators)
  - [array](#array-1)
  - [attachPropertySignature](#attachpropertysignature)
  - [brand](#brand)
  - [chunk](#chunk)
  - [data](#data)
  - [dataFromSelf](#datafromself)
  - [either](#either)
  - [eitherFromSelf](#eitherfromself)
  - [element](#element)
  - [extend](#extend)
  - [filter](#filter)
  - [fromBrand](#frombrand)
  - [lazy](#lazy)
  - [nonEmptyArray](#nonemptyarray)
  - [nullable](#nullable)
  - [omit](#omit)
  - [option](#option)
  - [optionFromSelf](#optionfromself)
  - [optionalElement](#optionalelement)
  - [partial](#partial)
  - [pick](#pick)
  - [readonlyMap](#readonlymap)
  - [readonlySet](#readonlyset)
  - [record](#record)
  - [required](#required)
  - [rest](#rest)
  - [struct](#struct)
  - [transform](#transform)
  - [transformResult](#transformresult)
  - [tuple](#tuple)
  - [union](#union)
- [constructors](#constructors)
  - [chunkFromSelf](#chunkfromself)
  - [make](#make)
  - [propertySignature](#propertysignature)
  - [readonlyMapFromSelf](#readonlymapfromself)
  - [readonlySetFromSelf](#readonlysetfromself)
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
  - [AnnotationOptions (type alias)](#annotationoptions-type-alias)
  - [BrandTransform (interface)](#brandtransform-interface)
  - [From (type alias)](#from-type-alias)
  - [To (type alias)](#to-type-alias)
  - [Transform (interface)](#transform-interface)
- [number](#number)
  - [NumberFromString](#numberfromstring)
  - [between](#between)
  - [clamp](#clamp)
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
  - [numberFromString](#numberfromstring)
  - [positive](#positive)
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
  - [endsWith](#endswith)
  - [includes](#includes)
  - [length](#length)
  - [maxLength](#maxlength)
  - [minLength](#minlength)
  - [nonEmpty](#nonempty)
  - [pattern](#pattern)
  - [startsWith](#startswith)
  - [trim](#trim)
  - [trimmed](#trimmed)
- [type id](#type-id)
  - [BetweenBigintTypeId](#betweenbiginttypeid)
  - [BetweenTypeId](#betweentypeid)
  - [BrandTypeId](#brandtypeid)
  - [EndsWithTypeId](#endswithtypeid)
  - [FiniteTypeId](#finitetypeid)
  - [GreaterThanBigintTypeId](#greaterthanbiginttypeid)
  - [GreaterThanOrEqualToBigintTypeId](#greaterthanorequaltobiginttypeid)
  - [GreaterThanOrEqualToTypeId](#greaterthanorequaltotypeid)
  - [GreaterThanTypeId](#greaterthantypeid)
  - [IncludesTypeId](#includestypeid)
  - [IntTypeId](#inttypeid)
  - [ItemsCountTypeId](#itemscounttypeid)
  - [LessThanBigintTypeId](#lessthanbiginttypeid)
  - [LessThanOrEqualToBigintTypeId](#lessthanorequaltobiginttypeid)
  - [LessThanOrEqualToTypeId](#lessthanorequaltotypeid)
  - [LessThanTypeId](#lessthantypeid)
  - [MaxItemsTypeId](#maxitemstypeid)
  - [MaxLengthTypeId](#maxlengthtypeid)
  - [MinItemsTypeId](#minitemstypeid)
  - [MinLengthTypeId](#minlengthtypeid)
  - [MultipleOfTypeId](#multipleoftypeid)
  - [NegativeBigintTypeId](#negativebiginttypeid)
  - [NegativeTypeId](#negativetypeid)
  - [NonNaNTypeId](#nonnantypeid)
  - [NonNegativeBigintTypeId](#nonnegativebiginttypeid)
  - [NonNegativeTypeId](#nonnegativetypeid)
  - [NonPositiveBigintTypeId](#nonpositivebiginttypeid)
  - [NonPositiveTypeId](#nonpositivetypeid)
  - [PatternTypeId](#patterntypeid)
  - [PositiveBigintTypeId](#positivebiginttypeid)
  - [PositiveTypeId](#positivetypeid)
  - [StartsWithTypeId](#startswithtypeid)
  - [TrimmedTypeId](#trimmedtypeid)
  - [ValidDateTypeId](#validdatetypeid)
- [utils](#utils)
  - [FromOptionalKeys (type alias)](#fromoptionalkeys-type-alias)
  - [Spread (type alias)](#spread-type-alias)
  - [ToOptionalKeys (type alias)](#tooptionalkeys-type-alias)
  - [TransformPropertySignature (interface)](#transformpropertysignature-interface)
  - [from](#from)
  - [optional](#optional)
  - [to](#to)

---

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

## validDate

A filter excluding invalid dates (e.g. `new Date("fail")`).

**Signature**

```ts
export declare const validDate: (
  options?: AnnotationOptions<Date> | undefined
) => <I>(self: Transform<I, Date>) => Transform<I, Date>
```

Added in v1.0.0

# array

## itemsCount

**Signature**

```ts
export declare const itemsCount: <A>(
  n: number,
  options?: AnnotationOptions<readonly A[]> | undefined
) => <I>(self: Transform<I, readonly A[]>) => Transform<I, readonly A[]>
```

Added in v1.0.0

## maxItems

**Signature**

```ts
export declare const maxItems: <A>(
  n: number,
  options?: AnnotationOptions<readonly A[]> | undefined
) => <I>(self: Transform<I, readonly A[]>) => Transform<I, readonly A[]>
```

Added in v1.0.0

## minItems

**Signature**

```ts
export declare const minItems: <A>(
  n: number,
  options?: AnnotationOptions<readonly A[]> | undefined
) => <I>(self: Transform<I, readonly A[]>) => Transform<I, readonly A[]>
```

Added in v1.0.0

# bigint

## betweenBigint

**Signature**

```ts
export declare const betweenBigint: <A extends bigint>(
  min: bigint,
  max: bigint,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## clampBigint

Clamps a bigint between a minimum and a maximum value.

**Signature**

```ts
export declare const clampBigint: (min: bigint, max: bigint) => <I>(self: Transform<I, bigint>) => Transform<I, bigint>
```

Added in v1.0.0

## greaterThanBigint

**Signature**

```ts
export declare const greaterThanBigint: <A extends bigint>(
  min: bigint,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## greaterThanOrEqualToBigint

**Signature**

```ts
export declare const greaterThanOrEqualToBigint: <A extends bigint>(
  min: bigint,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## lessThanBigint

**Signature**

```ts
export declare const lessThanBigint: <A extends bigint>(
  max: bigint,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## lessThanOrEqualToBigint

**Signature**

```ts
export declare const lessThanOrEqualToBigint: <A extends bigint>(
  max: bigint,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## negativeBigint

**Signature**

```ts
export declare const negativeBigint: <A extends bigint>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## nonNegativeBigint

**Signature**

```ts
export declare const nonNegativeBigint: <A extends bigint>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## nonPositiveBigint

**Signature**

```ts
export declare const nonPositiveBigint: <A extends bigint>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## positiveBigint

**Signature**

```ts
export declare const positiveBigint: <A extends bigint>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
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
) => <I, A extends object>(schema: Transform<I, A>) => Transform<I, Spread<A & { readonly [k in K]: V }>>
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

## brand

Returns a nominal branded schema by applying a brand to a given schema.

```
Schema<A> + B -> Schema<A & Brand<B>>
```

**Signature**

```ts
export declare const brand: <B extends string | symbol, A>(
  brand: B,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => BrandTransform<I, any>
```

Added in v1.0.0

## chunk

**Signature**

```ts
export declare const chunk: <I, A>(item: Transform<I, A>) => Transform<readonly I[], Chunk<A>>
```

Added in v1.0.0

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
  <IB, B>(that: Transform<IB, B>): <I, A>(self: Transform<I, A>) => Transform<Spread<I & IB>, Spread<A & B>>
  <I, A, IB, B>(self: Transform<I, A>, that: Transform<IB, B>): Transform<Spread<I & IB>, Spread<A & B>>
}
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare function filter<C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>,
  options?: AnnotationOptions<A>
): <I>(self: Transform<I, C>) => Transform<I, C & B>
export declare function filter<B extends A, A = B>(
  predicate: Predicate<A>,
  options?: AnnotationOptions<A>
): <I>(self: Transform<I, B>) => Transform<I, B>
```

Added in v1.0.0

## fromBrand

**Signature**

```ts
export declare const fromBrand: <C extends any>(
  constructor: any,
  options?: AnnotationOptions<any> | undefined
) => <I, A extends any>(self: Transform<I, A>) => Transform<I, A & C>
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
) => Transform<Spread<Pick<I, Exclude<keyof I, Keys[number]>>>, Spread<Pick<A, Exclude<keyof A, Keys[number]>>>>
```

Added in v1.0.0

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

## partial

**Signature**

```ts
export declare const partial: <I, A>(self: Transform<I, A>) => Transform<Spread<Partial<I>>, Spread<Partial<A>>>
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => <I extends { [K in keyof A]?: any }>(
  self: Transform<I, A>
) => Transform<Spread<Pick<I, Keys[number]>>, Spread<Pick<A, Keys[number]>>>
```

Added in v1.0.0

## readonlyMap

**Signature**

```ts
export declare const readonlyMap: <IK, K, IV, V>(
  key: Transform<IK, K>,
  value: Transform<IV, V>
) => Transform<readonly (readonly [IK, IV])[], ReadonlyMap<K, V>>
```

Added in v1.0.0

## readonlySet

**Signature**

```ts
export declare const readonlySet: <I, A>(item: Transform<I, A>) => Transform<readonly I[], ReadonlySet<A>>
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

## required

**Signature**

```ts
export declare const required: <I, A>(self: Transform<I, A>) => Transform<Spread<Required<I>>, Spread<Required<A>>>
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
    | TransformPropertySignature<any, boolean, any, boolean>
    | TransformPropertySignature<never, boolean, never, boolean>
  >
>(
  fields: Fields
) => Transform<
  Spread<
    { readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: From<Fields[K]> } & {
      readonly [K in FromOptionalKeys<Fields>]?: From<Fields[K]> | undefined
    }
  >,
  Spread<
    { readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: To<Fields[K]> } & {
      readonly [K in ToOptionalKeys<Fields>]?: To<Fields[K]> | undefined
    }
  >
>
```

Added in v1.0.0

## transform

Create a new `Schema` by transforming the input and output of an existing `Schema`
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

Create a new `Schema` by transforming the input and output of an existing `Schema`
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

## chunkFromSelf

**Signature**

```ts
export declare const chunkFromSelf: <I, A>(item: Transform<I, A>) => Transform<Chunk<I>, Chunk<A>>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <I, A>(ast: AST.AST) => Transform<I, A>
```

Added in v1.0.0

## propertySignature

**Signature**

```ts
export declare const propertySignature: <I, A>(
  schema: Transform<I, A>,
  annotations?: AST.Annotations | undefined
) => TransformPropertySignature<I, false, A, false>
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

## readonlySetFromSelf

**Signature**

```ts
export declare const readonlySetFromSelf: <I, A>(item: Transform<I, A>) => Transform<ReadonlySet<I>, ReadonlySet<A>>
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

## AnnotationOptions (type alias)

**Signature**

```ts
export type AnnotationOptions<A> = {
  typeId?: AST.TypeAnnotation | { id: AST.TypeAnnotation; params: unknown }
  message?: AST.MessageAnnotation<A>
  identifier?: AST.IdentifierAnnotation
  title?: AST.TitleAnnotation
  description?: AST.DescriptionAnnotation
  examples?: AST.ExamplesAnnotation
  documentation?: AST.DocumentationAnnotation
  jsonSchema?: AST.JSONSchemaAnnotation
  arbitrary?: (...args: ReadonlyArray<Arbitrary<any>>) => Arbitrary<any>
}
```

Added in v1.0.0

## BrandTransform (interface)

**Signature**

```ts
export interface BrandTransform<From, To extends Brand<any>> extends Transform<From, To>, Brand.Constructor<To> {}
```

Added in v1.0.0

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

This schema transforms a `string` into a `number` by parsing the string using `parseFloat`.

The following special string values are supported: "NaN", "Infinity", "-Infinity".

**Signature**

```ts
export declare const NumberFromString: Transform<string, number>
```

Added in v1.0.0

## between

**Signature**

```ts
export declare const between: <A extends number>(
  min: number,
  max: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## clamp

Clamps a number between a minimum and a maximum value.

**Signature**

```ts
export declare const clamp: (min: number, max: number) => <I>(self: Transform<I, number>) => Transform<I, number>
```

Added in v1.0.0

## finite

**Signature**

```ts
export declare const finite: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## greaterThan

**Signature**

```ts
export declare const greaterThan: <A extends number>(
  min: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## greaterThanOrEqualTo

**Signature**

```ts
export declare const greaterThanOrEqualTo: <A extends number>(
  min: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## int

**Signature**

```ts
export declare const int: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## lessThan

**Signature**

```ts
export declare const lessThan: <A extends number>(
  max: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## lessThanOrEqualTo

**Signature**

```ts
export declare const lessThanOrEqualTo: <A extends number>(
  max: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## multipleOf

**Signature**

```ts
export declare const multipleOf: <A extends number>(
  divisor: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## negative

**Signature**

```ts
export declare const negative: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## nonNaN

**Signature**

```ts
export declare const nonNaN: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## nonNegative

**Signature**

```ts
export declare const nonNegative: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## nonPositive

**Signature**

```ts
export declare const nonPositive: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
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

## positive

**Signature**

```ts
export declare const positive: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
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

This schema allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const Trim: Transform<string, string>
```

Added in v1.0.0

## endsWith

**Signature**

```ts
export declare const endsWith: <A extends string>(
  endsWith: string,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## includes

**Signature**

```ts
export declare const includes: <A extends string>(
  searchString: string,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## length

**Signature**

```ts
export declare const length: <A extends string>(
  length: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: <A extends string>(
  maxLength: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: <A extends string>(
  minLength: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## nonEmpty

**Signature**

```ts
export declare const nonEmpty: <A extends string>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## pattern

**Signature**

```ts
export declare const pattern: <A extends string>(
  regex: RegExp,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## startsWith

**Signature**

```ts
export declare const startsWith: <A extends string>(
  startsWith: string,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

## trim

This combinator allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const trim: <I>(self: Transform<I, string>) => Transform<I, string>
```

Added in v1.0.0

## trimmed

Verifies that a string contains no leading or trailing whitespaces.

Note. This combinator does not make any transformations, it only validates.
If what you were looking for was a combinator to trim strings, then check out the `trim` combinator.

**Signature**

```ts
export declare const trimmed: <A extends string>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Transform<I, A>) => Transform<I, A>
```

Added in v1.0.0

# type id

## BetweenBigintTypeId

**Signature**

```ts
export declare const BetweenBigintTypeId: '@effect/schema/BetweenBigintTypeId'
```

Added in v1.0.0

## BetweenTypeId

**Signature**

```ts
export declare const BetweenTypeId: '@effect/schema/BetweenTypeId'
```

Added in v1.0.0

## BrandTypeId

**Signature**

```ts
export declare const BrandTypeId: '@effect/schema/BrandTypeId'
```

Added in v1.0.0

## EndsWithTypeId

**Signature**

```ts
export declare const EndsWithTypeId: '@effect/schema/EndsWithTypeId'
```

Added in v1.0.0

## FiniteTypeId

**Signature**

```ts
export declare const FiniteTypeId: '@effect/schema/FiniteTypeId'
```

Added in v1.0.0

## GreaterThanBigintTypeId

**Signature**

```ts
export declare const GreaterThanBigintTypeId: '@effect/schema/GreaterThanBigintTypeId'
```

Added in v1.0.0

## GreaterThanOrEqualToBigintTypeId

**Signature**

```ts
export declare const GreaterThanOrEqualToBigintTypeId: '@effect/schema/GreaterThanOrEqualToBigintTypeId'
```

Added in v1.0.0

## GreaterThanOrEqualToTypeId

**Signature**

```ts
export declare const GreaterThanOrEqualToTypeId: '@effect/schema/GreaterThanOrEqualToTypeId'
```

Added in v1.0.0

## GreaterThanTypeId

**Signature**

```ts
export declare const GreaterThanTypeId: '@effect/schema/GreaterThanTypeId'
```

Added in v1.0.0

## IncludesTypeId

**Signature**

```ts
export declare const IncludesTypeId: '@effect/schema/IncludesTypeId'
```

Added in v1.0.0

## IntTypeId

**Signature**

```ts
export declare const IntTypeId: '@effect/schema/IntTypeId'
```

Added in v1.0.0

## ItemsCountTypeId

**Signature**

```ts
export declare const ItemsCountTypeId: '@effect/schema/ItemsCountTypeId'
```

Added in v1.0.0

## LessThanBigintTypeId

**Signature**

```ts
export declare const LessThanBigintTypeId: '@effect/schema/LessThanBigintTypeId'
```

Added in v1.0.0

## LessThanOrEqualToBigintTypeId

**Signature**

```ts
export declare const LessThanOrEqualToBigintTypeId: '@effect/schema/LessThanOrEqualToBigintTypeId'
```

Added in v1.0.0

## LessThanOrEqualToTypeId

**Signature**

```ts
export declare const LessThanOrEqualToTypeId: '@effect/schema/LessThanOrEqualToTypeId'
```

Added in v1.0.0

## LessThanTypeId

**Signature**

```ts
export declare const LessThanTypeId: '@effect/schema/LessThanTypeId'
```

Added in v1.0.0

## MaxItemsTypeId

**Signature**

```ts
export declare const MaxItemsTypeId: '@effect/schema/MaxItemsTypeId'
```

Added in v1.0.0

## MaxLengthTypeId

**Signature**

```ts
export declare const MaxLengthTypeId: '@effect/schema/MaxLengthTypeId'
```

Added in v1.0.0

## MinItemsTypeId

**Signature**

```ts
export declare const MinItemsTypeId: '@effect/schema/MinItemsTypeId'
```

Added in v1.0.0

## MinLengthTypeId

**Signature**

```ts
export declare const MinLengthTypeId: '@effect/schema/MinLengthTypeId'
```

Added in v1.0.0

## MultipleOfTypeId

**Signature**

```ts
export declare const MultipleOfTypeId: '@effect/schema/MultipleOfTypeId'
```

Added in v1.0.0

## NegativeBigintTypeId

**Signature**

```ts
export declare const NegativeBigintTypeId: '@effect/schema/NegativeBigintTypeId'
```

Added in v1.0.0

## NegativeTypeId

**Signature**

```ts
export declare const NegativeTypeId: '@effect/schema/NegativeTypeId'
```

Added in v1.0.0

## NonNaNTypeId

**Signature**

```ts
export declare const NonNaNTypeId: '@effect/schema/NonNaNTypeId'
```

Added in v1.0.0

## NonNegativeBigintTypeId

**Signature**

```ts
export declare const NonNegativeBigintTypeId: '@effect/schema/NonNegativeBigintTypeId'
```

Added in v1.0.0

## NonNegativeTypeId

**Signature**

```ts
export declare const NonNegativeTypeId: '@effect/schema/NonNegativeTypeId'
```

Added in v1.0.0

## NonPositiveBigintTypeId

**Signature**

```ts
export declare const NonPositiveBigintTypeId: '@effect/schema/NonPositiveBigintTypeId'
```

Added in v1.0.0

## NonPositiveTypeId

**Signature**

```ts
export declare const NonPositiveTypeId: '@effect/schema/NonPositiveTypeId'
```

Added in v1.0.0

## PatternTypeId

**Signature**

```ts
export declare const PatternTypeId: '@effect/schema/PatternTypeId'
```

Added in v1.0.0

## PositiveBigintTypeId

**Signature**

```ts
export declare const PositiveBigintTypeId: '@effect/schema/PositiveBigintTypeId'
```

Added in v1.0.0

## PositiveTypeId

**Signature**

```ts
export declare const PositiveTypeId: '@effect/schema/PositiveTypeId'
```

Added in v1.0.0

## StartsWithTypeId

**Signature**

```ts
export declare const StartsWithTypeId: '@effect/schema/StartsWithTypeId'
```

Added in v1.0.0

## TrimmedTypeId

**Signature**

```ts
export declare const TrimmedTypeId: '@effect/schema/TrimmedTypeId'
```

Added in v1.0.0

## ValidDateTypeId

**Signature**

```ts
export declare const ValidDateTypeId: '@effect/schema/ValidDateTypeId'
```

Added in v1.0.0

# utils

## FromOptionalKeys (type alias)

**Signature**

```ts
export type FromOptionalKeys<Fields> = {
  [K in keyof Fields]: Fields[K] extends
    | TransformPropertySignature<any, true, any, boolean>
    | TransformPropertySignature<never, true, never, boolean>
    ? K
    : never
}[keyof Fields]
```

Added in v1.0.0

## Spread (type alias)

**Signature**

```ts
export type Spread<A> = {
  [K in keyof A]: A[K]
} extends infer B
  ? B
  : never
```

Added in v1.0.0

## ToOptionalKeys (type alias)

**Signature**

```ts
export type ToOptionalKeys<Fields> = {
  [K in keyof Fields]: Fields[K] extends
    | TransformPropertySignature<any, boolean, any, true>
    | TransformPropertySignature<never, boolean, never, true>
    ? K
    : never
}[keyof Fields]
```

Added in v1.0.0

## TransformPropertySignature (interface)

**Signature**

```ts
export interface TransformPropertySignature<From, FromIsOptional, To, ToIsOptional> {
  readonly From: (_: From) => From
  readonly FromIsOptional: FromIsOptional
  readonly To: (_: To) => To
  readonly ToIsOptional: ToIsOptional
  readonly optional: () => TransformPropertySignature<From, true, To, true>
  readonly withDefault: (value: () => To) => TransformPropertySignature<From, true, To, false>
  readonly toOption: () => TransformPropertySignature<From, true, Option<To>, false>
}
```

Added in v1.0.0

## from

**Signature**

```ts
export declare const from: <I, A>(schema: Transform<I, A>) => S.Schema<I>
```

Added in v1.0.0

## optional

**Signature**

```ts
export declare const optional: <I, A>(
  schema: Transform<I, A>,
  annotations?: AST.Annotations | undefined
) => TransformPropertySignature<I, true, A, true>
```

Added in v1.0.0

## to

**Signature**

```ts
export declare const to: <I, A>(schema: Transform<I, A>) => S.Schema<A>
```

Added in v1.0.0
