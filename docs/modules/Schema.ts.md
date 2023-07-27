---
title: Schema.ts
nav_order: 6
parent: Modules
---

## Schema overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Date](#date)
  - [Date](#date-1)
  - [DateFromSelf](#datefromself)
  - [ValidDateFromSelf](#validdatefromself)
  - [dateFromString](#datefromstring)
  - [validDate](#validdate)
- [annotations](#annotations)
  - [description](#description)
  - [documentation](#documentation)
  - [examples](#examples)
  - [identifier](#identifier)
  - [message](#message)
  - [title](#title)
- [array](#array)
  - [itemsCount](#itemscount)
  - [maxItems](#maxitems)
  - [minItems](#minitems)
- [bigint](#bigint)
  - [BigintFromString](#bigintfromstring)
  - [betweenBigint](#betweenbigint)
  - [bigintFromString](#bigintfromstring)
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
  - [annotations](#annotations-1)
  - [array](#array-1)
  - [attachPropertySignature](#attachpropertysignature)
  - [brand](#brand)
  - [chunk](#chunk)
  - [compose](#compose)
  - [data](#data)
  - [dataFromSelf](#datafromself)
  - [declare](#declare)
  - [either](#either)
  - [eitherFromSelf](#eitherfromself)
  - [element](#element)
  - [extend](#extend)
  - [filter](#filter)
  - [fromBrand](#frombrand)
  - [keyof](#keyof)
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
  - [JsonNumber](#jsonnumber)
  - [ULID](#ulid)
  - [UUID](#uuid)
  - [chunkFromSelf](#chunkfromself)
  - [enums](#enums)
  - [instanceOf](#instanceof)
  - [literal](#literal)
  - [make](#make)
  - [propertySignature](#propertysignature)
  - [readonlyMapFromSelf](#readonlymapfromself)
  - [readonlySetFromSelf](#readonlysetfromself)
  - [templateLiteral](#templateliteral)
  - [uniqueSymbol](#uniquesymbol)
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
  - [isSchema](#isschema)
- [model](#model)
  - [AnnotationOptions (type alias)](#annotationoptions-type-alias)
  - [BrandSchema (interface)](#brandschema-interface)
  - [From (type alias)](#from-type-alias)
  - [Schema (interface)](#schema-interface)
  - [To (type alias)](#to-type-alias)
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
  - [parseEither](#parseeither)
  - [parseOption](#parseoption)
  - [parsePromise](#parsepromise)
  - [parseResult](#parseresult)
  - [parseSync](#parsesync)
- [primitives](#primitives)
  - [any](#any)
  - [bigint](#bigint-1)
  - [boolean](#boolean-1)
  - [never](#never)
  - [null](#null)
  - [number](#number-1)
  - [object](#object)
  - [string](#string)
  - [symbol](#symbol)
  - [undefined](#undefined)
  - [unknown](#unknown)
  - [void](#void)
- [string](#string-1)
  - [Trim](#trim)
  - [endsWith](#endswith)
  - [includes](#includes)
  - [length](#length)
  - [maxLength](#maxlength)
  - [minLength](#minlength)
  - [nonEmpty](#nonempty)
  - [pattern](#pattern)
  - [split](#split)
  - [startsWith](#startswith)
  - [trim](#trim)
  - [trimmed](#trimmed)
- [symbol](#symbol-1)
  - [TypeId (type alias)](#typeid-type-alias)
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
  - [InstanceOfTypeId](#instanceoftypeid)
  - [IntTypeId](#inttypeid)
  - [ItemsCountTypeId](#itemscounttypeid)
  - [JsonNumberTypeId](#jsonnumbertypeid)
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
  - [ULIDTypeId](#ulidtypeid)
  - [UUIDTypeId](#uuidtypeid)
  - [ValidDateTypeId](#validdatetypeid)
- [utils](#utils)
  - [FromOptionalKeys (type alias)](#fromoptionalkeys-type-alias)
  - [Join (type alias)](#join-type-alias)
  - [PropertySignature (interface)](#propertysignature-interface)
  - [Spread (type alias)](#spread-type-alias)
  - [ToAsserts](#toasserts)
  - [ToOptionalKeys (type alias)](#tooptionalkeys-type-alias)
  - [from](#from)
  - [optional](#optional)
  - [to](#to)
- [validation](#validation)
  - [asserts](#asserts)
  - [is](#is)
  - [validate](#validate)
  - [validateEither](#validateeither)
  - [validateOption](#validateoption)
  - [validatePromise](#validatepromise)
  - [validateResult](#validateresult)
  - [validateSync](#validatesync)

---

# Date

## Date

A schema that transforms a `string` into a valid `Date`.

**Signature**

```ts
export declare const Date: Schema<string, Date>
```

Added in v1.0.0

## DateFromSelf

**Signature**

```ts
export declare const DateFromSelf: Schema<Date, Date>
```

Added in v1.0.0

## ValidDateFromSelf

A schema representing valid dates, e.g. `new Date("fail")` is excluded, even though it is an instance of `Date`.

**Signature**

```ts
export declare const ValidDateFromSelf: Schema<Date, Date>
```

Added in v1.0.0

## dateFromString

A combinator that transforms a `string` into a valid `Date`.

**Signature**

```ts
export declare const dateFromString: <I, A extends string>(self: Schema<I, A>) => Schema<I, Date>
```

Added in v1.0.0

## validDate

A filter excluding invalid dates (e.g. `new Date("fail")`).

**Signature**

```ts
export declare const validDate: (options?: AnnotationOptions<Date>) => <I>(self: Schema<I, Date>) => Schema<I, Date>
```

Added in v1.0.0

# annotations

## description

**Signature**

```ts
export declare const description: (description: AST.DescriptionAnnotation) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## documentation

**Signature**

```ts
export declare const documentation: (
  documentation: AST.DocumentationAnnotation
) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## examples

**Signature**

```ts
export declare const examples: (examples: AST.ExamplesAnnotation) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## identifier

**Signature**

```ts
export declare const identifier: (identifier: AST.IdentifierAnnotation) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## message

**Signature**

```ts
export declare const message: (message: AST.MessageAnnotation<unknown>) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## title

**Signature**

```ts
export declare const title: (title: AST.TitleAnnotation) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

# array

## itemsCount

**Signature**

```ts
export declare const itemsCount: <A>(
  n: number,
  options?: AnnotationOptions<readonly A[]> | undefined
) => <I>(self: Schema<I, readonly A[]>) => Schema<I, readonly A[]>
```

Added in v1.0.0

## maxItems

**Signature**

```ts
export declare const maxItems: <A>(
  n: number,
  options?: AnnotationOptions<readonly A[]> | undefined
) => <I>(self: Schema<I, readonly A[]>) => Schema<I, readonly A[]>
```

Added in v1.0.0

## minItems

**Signature**

```ts
export declare const minItems: <A>(
  n: number,
  options?: AnnotationOptions<readonly A[]> | undefined
) => <I>(self: Schema<I, readonly A[]>) => Schema<I, readonly A[]>
```

Added in v1.0.0

# bigint

## BigintFromString

This schema transforms a `string` into a `bigint` by parsing the string using the `BigInt` function.

It returns an error if the value can't be converted (for example when non-numeric characters are provided).

**Signature**

```ts
export declare const BigintFromString: Schema<string, bigint>
```

Added in v1.0.0

## betweenBigint

**Signature**

```ts
export declare const betweenBigint: <A extends bigint>(
  min: bigint,
  max: bigint,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## bigintFromString

This combinator transforms a `string` into a `bigint` by parsing the string using the `BigInt` function.

It returns an error if the value can't be converted (for example when non-numeric characters are provided).

**Signature**

```ts
export declare const bigintFromString: <I, A extends string>(self: Schema<I, A>) => Schema<I, bigint>
```

Added in v1.0.0

## clampBigint

Clamps a bigint between a minimum and a maximum value.

**Signature**

```ts
export declare const clampBigint: (
  min: bigint,
  max: bigint
) => <I, A extends bigint>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## greaterThanBigint

**Signature**

```ts
export declare const greaterThanBigint: <A extends bigint>(
  min: bigint,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## greaterThanOrEqualToBigint

**Signature**

```ts
export declare const greaterThanOrEqualToBigint: <A extends bigint>(
  min: bigint,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## lessThanBigint

**Signature**

```ts
export declare const lessThanBigint: <A extends bigint>(
  max: bigint,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## lessThanOrEqualToBigint

**Signature**

```ts
export declare const lessThanOrEqualToBigint: <A extends bigint>(
  max: bigint,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## negativeBigint

**Signature**

```ts
export declare const negativeBigint: <A extends bigint>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## nonNegativeBigint

**Signature**

```ts
export declare const nonNegativeBigint: <A extends bigint>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## nonPositiveBigint

**Signature**

```ts
export declare const nonPositiveBigint: <A extends bigint>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## positiveBigint

**Signature**

```ts
export declare const positiveBigint: <A extends bigint>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

# boolean

## not

Negates a boolean value

**Signature**

```ts
export declare const not: <I>(self: Schema<I, boolean>) => Schema<I, boolean>
```

Added in v1.0.0

# combinators

## annotations

**Signature**

```ts
export declare const annotations: (
  annotations: AST.Annotated['annotations']
) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## array

**Signature**

```ts
export declare const array: <I, A>(item: Schema<I, A>) => Schema<readonly I[], readonly A[]>
```

Added in v1.0.0

## attachPropertySignature

Attaches a property signature with the specified key and value to the schema.
This API is useful when you want to add a property to your schema which doesn't describe the shape of the input,
but rather maps to another schema, for example when you want to add a discriminant to a simple union.

**Signature**

```ts
export declare const attachPropertySignature: <K extends PropertyKey, V extends AST.LiteralValue>(
  key: K,
  value: V
) => <I, A extends object>(schema: Schema<I, A>) => Schema<I, Spread<A & { readonly [k in K]: V }>>
```

**Example**

```ts
import * as S from '@effect/schema/Schema'
import { pipe } from '@effect/data/Function'

const Circle = S.struct({ radius: S.number })
const Square = S.struct({ sideLength: S.number })
const Shape = S.union(
  Circle.pipe(S.attachPropertySignature('kind', 'circle')),
  Square.pipe(S.attachPropertySignature('kind', 'square'))
)

assert.deepStrictEqual(S.decodeSync(Shape)({ radius: 10 }), {
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
) => <I>(self: Schema<I, A>) => BrandSchema<I, A & Brand<B>>
```

**Example**

```ts
import * as S from '@effect/schema/Schema'

const Int = S.number.pipe(S.int(), S.brand('Int'))
type Int = S.To<typeof Int> // number & Brand<"Int">
```

Added in v1.0.0

## chunk

**Signature**

```ts
export declare const chunk: <I, A>(item: Schema<I, A>) => Schema<readonly I[], Chunk<A>>
```

Added in v1.0.0

## compose

**Signature**

```ts
export declare const compose: {
  <B, C>(bc: Schema<B, C>): <A>(ab: Schema<A, B>) => Schema<A, C>
  <A, B, C>(ab: Schema<A, B>, bc: Schema<B, C>): Schema<A, C>
}
```

Added in v1.0.0

## data

**Signature**

```ts
export declare const data: <
  I extends readonly any[] | Readonly<Record<string, any>>,
  A extends readonly any[] | Readonly<Record<string, any>>
>(
  item: Schema<I, A>
) => Schema<I, D.Data<A>>
```

Added in v1.0.0

## dataFromSelf

**Signature**

```ts
export declare const dataFromSelf: <
  I extends readonly any[] | Readonly<Record<string, any>>,
  A extends readonly any[] | Readonly<Record<string, any>>
>(
  item: Schema<I, A>
) => Schema<D.Data<I>, D.Data<A>>
```

Added in v1.0.0

## declare

**Signature**

```ts
export declare const declare: (
  typeParameters: ReadonlyArray<Schema<any>>,
  type: Schema<any>,
  decode: (
    ...typeParameters: ReadonlyArray<Schema<any>>
  ) => (input: unknown, options?: ParseOptions) => ParseResult<any>,
  annotations?: AST.Annotated['annotations']
) => Schema<any>
```

Added in v1.0.0

## either

**Signature**

```ts
export declare const either: <IE, E, IA, A>(
  left: Schema<IE, E>,
  right: Schema<IA, A>
) => Schema<{ readonly _tag: 'Left'; readonly left: IE } | { readonly _tag: 'Right'; readonly right: IA }, Either<E, A>>
```

Added in v1.0.0

## eitherFromSelf

**Signature**

```ts
export declare const eitherFromSelf: <IE, E, IA, A>(
  left: Schema<IE, E>,
  right: Schema<IA, A>
) => Schema<Either<IE, IA>, Either<E, A>>
```

Added in v1.0.0

## element

**Signature**

```ts
export declare const element: <IE, E>(
  element: Schema<IE, E>
) => <I extends readonly any[], A extends readonly any[]>(
  self: Schema<I, A>
) => Schema<readonly [...I, IE], readonly [...A, E]>
```

Added in v1.0.0

## extend

**Signature**

```ts
export declare const extend: {
  <IB, B>(that: Schema<IB, B>): <I, A>(self: Schema<I, A>) => Schema<Spread<I & IB>, Spread<A & B>>
  <I, A, IB, B>(self: Schema<I, A>, that: Schema<IB, B>): Schema<Spread<I & IB>, Spread<A & B>>
}
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare function filter<C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>,
  options?: AnnotationOptions<A>
): <I>(self: Schema<I, C>) => Schema<I, C & B>
export declare function filter<B extends A, A = B>(
  predicate: Predicate<A>,
  options?: AnnotationOptions<A>
): <I>(self: Schema<I, B>) => Schema<I, B>
```

Added in v1.0.0

## fromBrand

**Signature**

```ts
export declare const fromBrand: <C extends Brand<string | symbol>>(
  constructor: Brand.Constructor<C>,
  options?: AnnotationOptions<Brand.Unbranded<C>> | undefined
) => <I, A extends Brand.Unbranded<C>>(self: Schema<I, A>) => Schema<I, A & C>
```

Added in v1.0.0

## keyof

**Signature**

```ts
export declare const keyof: <I, A>(schema: Schema<I, A>) => Schema<keyof A, keyof A>
```

Added in v1.0.0

## lazy

**Signature**

```ts
export declare const lazy: <I, A = I>(f: () => Schema<I, A>, annotations?: AST.Annotated['annotations']) => Schema<I, A>
```

Added in v1.0.0

## nonEmptyArray

**Signature**

```ts
export declare const nonEmptyArray: <I, A>(item: Schema<I, A>) => Schema<readonly [I, ...I[]], readonly [A, ...A[]]>
```

Added in v1.0.0

## nullable

**Signature**

```ts
export declare const nullable: <From, To>(self: Schema<From, To>) => Schema<From | null, To | null>
```

Added in v1.0.0

## omit

**Signature**

```ts
export declare const omit: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => <I extends { [K in keyof A]?: any }>(
  self: Schema<I, A>
) => Schema<Spread<Omit<I, Keys[number]>>, Spread<Omit<A, Keys[number]>>>
```

Added in v1.0.0

## option

**Signature**

```ts
export declare const option: <I, A>(
  value: Schema<I, A>
) => Schema<{ readonly _tag: 'None' } | { readonly _tag: 'Some'; readonly value: I }, Option<A>>
```

Added in v1.0.0

## optionFromSelf

**Signature**

```ts
export declare const optionFromSelf: <I, A>(value: Schema<I, A>) => Schema<Option<I>, Option<A>>
```

Added in v1.0.0

## optionalElement

**Signature**

```ts
export declare const optionalElement: <IE, E>(
  element: Schema<IE, E>
) => <I extends readonly any[], A extends readonly any[]>(
  self: Schema<I, A>
) => Schema<readonly [...I, (IE | undefined)?], readonly [...A, (E | undefined)?]>
```

Added in v1.0.0

## partial

**Signature**

```ts
export declare const partial: <I, A>(self: Schema<I, A>) => Schema<Spread<Partial<I>>, Spread<Partial<A>>>
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => <I extends { [K in keyof A]?: any }>(
  self: Schema<I, A>
) => Schema<Spread<Pick<I, Keys[number]>>, Spread<Pick<A, Keys[number]>>>
```

Added in v1.0.0

## readonlyMap

**Signature**

```ts
export declare const readonlyMap: <IK, K, IV, V>(
  key: Schema<IK, K>,
  value: Schema<IV, V>
) => Schema<readonly (readonly [IK, IV])[], ReadonlyMap<K, V>>
```

Added in v1.0.0

## readonlySet

**Signature**

```ts
export declare const readonlySet: <I, A>(item: Schema<I, A>) => Schema<readonly I[], ReadonlySet<A>>
```

Added in v1.0.0

## record

**Signature**

```ts
export declare const record: <K extends string | symbol, I, A>(
  key: Schema<K, K>,
  value: Schema<I, A>
) => Schema<{ readonly [k in K]: I }, { readonly [k in K]: A }>
```

Added in v1.0.0

## required

**Signature**

```ts
export declare const required: <I, A>(self: Schema<I, A>) => Schema<Spread<Required<I>>, Spread<Required<A>>>
```

Added in v1.0.0

## rest

**Signature**

```ts
export declare const rest: <IR, R>(
  rest: Schema<IR, R>
) => <I extends readonly any[], A extends readonly any[]>(
  self: Schema<I, A>
) => Schema<readonly [...I, ...IR[]], readonly [...A, ...R[]]>
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <
  Fields extends Record<
    PropertyKey,
    | Schema<any, any>
    | Schema<never, never>
    | PropertySignature<any, boolean, any, boolean>
    | PropertySignature<never, boolean, never, boolean>
  >
>(
  fields: Fields
) => Schema<
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
  <I2, A2, A1>(to: Schema<I2, A2>, decode: (a1: A1) => I2, encode: (i2: I2) => A1): <I1>(
    self: Schema<I1, A1>
  ) => Schema<I1, A2>
  <I1, A1, I2, A2>(from: Schema<I1, A1>, to: Schema<I2, A2>, decode: (a1: A1) => I2, encode: (i2: I2) => A1): Schema<
    I1,
    A2
  >
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
    to: Schema<I2, A2>,
    decode: (a1: A1, options?: ParseOptions) => ParseResult<I2>,
    encode: (i2: I2, options?: ParseOptions) => ParseResult<A1>
  ): <I1>(self: Schema<I1, A1>) => Schema<I1, A2>
  <I1, A1, I2, A2>(
    from: Schema<I1, A1>,
    to: Schema<I2, A2>,
    decode: (a1: A1, options?: ParseOptions) => ParseResult<I2>,
    encode: (i2: I2, options?: ParseOptions) => ParseResult<A1>
  ): Schema<I1, A2>
}
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <Elements extends readonly Schema<any, any>[]>(
  ...elements: Elements
) => Schema<{ readonly [K in keyof Elements]: From<Elements[K]> }, { readonly [K in keyof Elements]: To<Elements[K]> }>
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: <Members extends readonly Schema<any, any>[]>(
  ...members: Members
) => Schema<From<Members[number]>, To<Members[number]>>
```

Added in v1.0.0

# constructors

## JsonNumber

The `JsonNumber` is a schema for representing JSON numbers. It ensures that the provided value is a valid
number by filtering out `NaN` and `(+/-) Infinity`. This is useful when you want to validate and represent numbers in JSON
format.

**Signature**

```ts
export declare const JsonNumber: Schema<number, number>
```

**Example**

```ts
import * as S from '@effect/schema/Schema'

const is = S.is(S.JsonNumber)

assert.deepStrictEqual(is(42), true)
assert.deepStrictEqual(is(Number.NaN), false)
assert.deepStrictEqual(is(Number.POSITIVE_INFINITY), false)
assert.deepStrictEqual(is(Number.NEGATIVE_INFINITY), false)
```

Added in v1.0.0

## ULID

**Signature**

```ts
export declare const ULID: Schema<string, string>
```

Added in v1.0.0

## UUID

**Signature**

```ts
export declare const UUID: Schema<string, string>
```

Added in v1.0.0

## chunkFromSelf

**Signature**

```ts
export declare const chunkFromSelf: <I, A>(item: Schema<I, A>) => Schema<Chunk<I>, Chunk<A>>
```

Added in v1.0.0

## enums

**Signature**

```ts
export declare const enums: <A extends { [x: string]: string | number }>(enums: A) => Schema<A[keyof A], A[keyof A]>
```

Added in v1.0.0

## instanceOf

**Signature**

```ts
export declare const instanceOf: <A extends abstract new (...args: any) => any>(
  constructor: A,
  options?: AnnotationOptions<object>
) => Schema<InstanceType<A>, InstanceType<A>>
```

Added in v1.0.0

## literal

**Signature**

```ts
export declare const literal: <Literals extends readonly AST.LiteralValue[]>(
  ...literals: Literals
) => Schema<Literals[number], Literals[number]>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <I, A>(ast: AST.AST) => Schema<I, A>
```

Added in v1.0.0

## propertySignature

**Signature**

```ts
export declare const propertySignature: <I, A>(
  schema: Schema<I, A>,
  annotations?: AST.Annotated['annotations']
) => PropertySignature<I, false, A, false>
```

Added in v1.0.0

## readonlyMapFromSelf

**Signature**

```ts
export declare const readonlyMapFromSelf: <IK, K, IV, V>(
  key: Schema<IK, K>,
  value: Schema<IV, V>
) => Schema<ReadonlyMap<IK, IV>, ReadonlyMap<K, V>>
```

Added in v1.0.0

## readonlySetFromSelf

**Signature**

```ts
export declare const readonlySetFromSelf: <I, A>(item: Schema<I, A>) => Schema<ReadonlySet<I>, ReadonlySet<A>>
```

Added in v1.0.0

## templateLiteral

**Signature**

```ts
export declare const templateLiteral: <T extends [Schema<any, any>, ...Schema<any, any>[]]>(
  ...[head, ...tail]: T
) => Schema<Join<{ [K in keyof T]: To<T[K]> }>, Join<{ [K in keyof T]: To<T[K]> }>>
```

Added in v1.0.0

## uniqueSymbol

**Signature**

```ts
export declare const uniqueSymbol: <S extends symbol>(
  symbol: S,
  annotations?: AST.Annotated['annotations']
) => Schema<S, S>
```

Added in v1.0.0

# decoding

## decode

**Signature**

```ts
export declare const decode: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => Effect<never, PR.ParseError, A>
```

Added in v1.0.0

## decodeEither

**Signature**

```ts
export declare const decodeEither: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => Either<PR.ParseError, A>
```

Added in v1.0.0

## decodeOption

**Signature**

```ts
export declare const decodeOption: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

## decodePromise

**Signature**

```ts
export declare const decodePromise: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => Promise<A>
```

Added in v1.0.0

## decodeResult

**Signature**

```ts
export declare const decodeResult: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => ParseResult<A>
```

Added in v1.0.0

## decodeSync

**Signature**

```ts
export declare const decodeSync: <I, A>(schema: Schema<I, A>) => (i: I, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

# encoding

## encode

**Signature**

```ts
export declare const encode: <I, A>(
  schema: Schema<I, A>
) => (a: A, options?: ParseOptions | undefined) => Effect<never, PR.ParseError, I>
```

Added in v1.0.0

## encodeEither

**Signature**

```ts
export declare const encodeEither: <I, A>(
  schema: Schema<I, A>
) => (a: A, options?: ParseOptions | undefined) => Either<PR.ParseError, I>
```

Added in v1.0.0

## encodeOption

**Signature**

```ts
export declare const encodeOption: <I, A>(
  schema: Schema<I, A>
) => (input: A, options?: ParseOptions | undefined) => Option<I>
```

Added in v1.0.0

## encodePromise

**Signature**

```ts
export declare const encodePromise: <I, A>(
  schema: Schema<I, A>
) => (a: A, options?: ParseOptions | undefined) => Promise<I>
```

Added in v1.0.0

## encodeResult

**Signature**

```ts
export declare const encodeResult: <I, A>(
  schema: Schema<I, A>
) => (a: A, options?: ParseOptions | undefined) => ParseResult<I>
```

Added in v1.0.0

## encodeSync

**Signature**

```ts
export declare const encodeSync: <I, A>(schema: Schema<I, A>) => (a: A, options?: ParseOptions | undefined) => I
```

Added in v1.0.0

# guards

## isSchema

Tests if a value is a `Schema`.

**Signature**

```ts
export declare const isSchema: (input: unknown) => input is Schema<unknown, unknown>
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

## BrandSchema (interface)

**Signature**

```ts
export interface BrandSchema<From, To extends Brand<any>> extends Schema<From, To>, Brand.Constructor<To> {}
```

Added in v1.0.0

## From (type alias)

**Signature**

```ts
export type From<S extends { readonly From: (..._: any) => any }> = Parameters<S['From']>[0]
```

Added in v1.0.0

## Schema (interface)

**Signature**

```ts
export interface Schema<From, To = From> extends Pipeable {
  readonly _id: TypeId
  readonly From: (_: From) => From
  readonly To: (_: To) => To
  readonly ast: AST.AST
}
```

Added in v1.0.0

## To (type alias)

**Signature**

```ts
export type To<S extends { readonly To: (..._: any) => any }> = Parameters<S['To']>[0]
```

Added in v1.0.0

# number

## NumberFromString

This schema transforms a `string` into a `number` by parsing the string using the `Number` function.

It returns an error if the value can't be converted (for example when non-numeric characters are provided).

The following special string values are supported: "NaN", "Infinity", "-Infinity".

**Signature**

```ts
export declare const NumberFromString: Schema<string, number>
```

Added in v1.0.0

## between

**Signature**

```ts
export declare const between: <A extends number>(
  min: number,
  max: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## clamp

Clamps a number between a minimum and a maximum value.

**Signature**

```ts
export declare const clamp: (min: number, max: number) => <I, A extends number>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## finite

**Signature**

```ts
export declare const finite: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## greaterThan

**Signature**

```ts
export declare const greaterThan: <A extends number>(
  min: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## greaterThanOrEqualTo

**Signature**

```ts
export declare const greaterThanOrEqualTo: <A extends number>(
  min: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## int

**Signature**

```ts
export declare const int: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## lessThan

**Signature**

```ts
export declare const lessThan: <A extends number>(
  max: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## lessThanOrEqualTo

**Signature**

```ts
export declare const lessThanOrEqualTo: <A extends number>(
  max: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## multipleOf

**Signature**

```ts
export declare const multipleOf: <A extends number>(
  divisor: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## negative

**Signature**

```ts
export declare const negative: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## nonNaN

**Signature**

```ts
export declare const nonNaN: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## nonNegative

**Signature**

```ts
export declare const nonNegative: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## nonPositive

**Signature**

```ts
export declare const nonPositive: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## numberFromString

This combinator transforms a `string` into a `number` by parsing the string using the `Number` function.

It returns an error if the value can't be converted (for example when non-numeric characters are provided).

The following special string values are supported: "NaN", "Infinity", "-Infinity".

**Signature**

```ts
export declare const numberFromString: <I, A extends string>(self: Schema<I, A>) => Schema<I, number>
```

Added in v1.0.0

## positive

**Signature**

```ts
export declare const positive: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

# option

## optionFromNullable

**Signature**

```ts
export declare const optionFromNullable: <I, A>(value: Schema<I, A>) => Schema<I | null, Option<A>>
```

Added in v1.0.0

# parsing

## parse

**Signature**

```ts
export declare const parse: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => Effect<never, PR.ParseError, A>
```

Added in v1.0.0

## parseEither

**Signature**

```ts
export declare const parseEither: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => Either<PR.ParseError, A>
```

Added in v1.0.0

## parseOption

**Signature**

```ts
export declare const parseOption: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

## parsePromise

**Signature**

```ts
export declare const parsePromise: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => Promise<A>
```

Added in v1.0.0

## parseResult

**Signature**

```ts
export declare const parseResult: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => ParseResult<A>
```

Added in v1.0.0

## parseSync

**Signature**

```ts
export declare const parseSync: <_, A>(schema: Schema<_, A>) => (i: unknown, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

# primitives

## any

**Signature**

```ts
export declare const any: Schema<any, any>
```

Added in v1.0.0

## bigint

**Signature**

```ts
export declare const bigint: Schema<bigint, bigint>
```

Added in v1.0.0

## boolean

**Signature**

```ts
export declare const boolean: Schema<boolean, boolean>
```

Added in v1.0.0

## never

**Signature**

```ts
export declare const never: Schema<never, never>
```

Added in v1.0.0

## null

**Signature**

```ts
export declare const null: Schema<null, null>
```

Added in v1.0.0

## number

**Signature**

```ts
export declare const number: Schema<number, number>
```

Added in v1.0.0

## object

**Signature**

```ts
export declare const object: Schema<object, object>
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: Schema<string, string>
```

Added in v1.0.0

## symbol

**Signature**

```ts
export declare const symbol: Schema<symbol, symbol>
```

Added in v1.0.0

## undefined

**Signature**

```ts
export declare const undefined: Schema<undefined, undefined>
```

Added in v1.0.0

## unknown

**Signature**

```ts
export declare const unknown: Schema<unknown, unknown>
```

Added in v1.0.0

## void

**Signature**

```ts
export declare const void: Schema<void, void>
```

Added in v1.0.0

# string

## Trim

This schema allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const Trim: Schema<string, string>
```

Added in v1.0.0

## endsWith

**Signature**

```ts
export declare const endsWith: <A extends string>(
  endsWith: string,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## includes

**Signature**

```ts
export declare const includes: <A extends string>(
  searchString: string,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## length

**Signature**

```ts
export declare const length: <A extends string>(
  length: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: <A extends string>(
  maxLength: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: <A extends string>(
  minLength: number,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## nonEmpty

**Signature**

```ts
export declare const nonEmpty: <A extends string>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## pattern

**Signature**

```ts
export declare const pattern: <A extends string>(
  regex: RegExp,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## split

This combinator allows splitting a string into an array of strings.

**Signature**

```ts
export declare const split: {
  (separator: string): <I>(self: Schema<I, string>) => Schema<I, readonly string[]>
  <I>(self: Schema<I, string>, separator: string): Schema<I, readonly string[]>
}
```

Added in v1.0.0

## startsWith

**Signature**

```ts
export declare const startsWith: <A extends string>(
  startsWith: string,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## trim

This combinator allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const trim: <I, A extends string>(self: Schema<I, A>) => Schema<I, A>
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
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

# symbol

## TypeId (type alias)

**Signature**

```ts
export type TypeId = typeof TypeId
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

## InstanceOfTypeId

**Signature**

```ts
export declare const InstanceOfTypeId: '@effect/schema/InstanceOfTypeId'
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

## JsonNumberTypeId

**Signature**

```ts
export declare const JsonNumberTypeId: '@effect/schema/JsonNumberTypeId'
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

## ULIDTypeId

**Signature**

```ts
export declare const ULIDTypeId: '@effect/schema/ULIDTypeId'
```

Added in v1.0.0

## UUIDTypeId

**Signature**

```ts
export declare const UUIDTypeId: '@effect/schema/UUIDTypeId'
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
    | PropertySignature<any, true, any, boolean>
    | PropertySignature<never, true, never, boolean>
    ? K
    : never
}[keyof Fields]
```

Added in v1.0.0

## Join (type alias)

**Signature**

```ts
export type Join<T> = T extends [infer Head, ...infer Tail]
  ? `${Head & (string | number | bigint | boolean | null | undefined)}${Tail extends [] ? '' : Join<Tail>}`
  : never
```

Added in v1.0.0

## PropertySignature (interface)

**Signature**

```ts
export interface PropertySignature<From, FromIsOptional, To, ToIsOptional> {
  readonly From: (_: From) => From
  readonly FromIsOptional: FromIsOptional
  readonly To: (_: To) => To
  readonly ToIsOptional: ToIsOptional
  readonly optional: () => PropertySignature<From, true, To, true>
  readonly withDefault: (value: () => To) => PropertySignature<From, true, To, false>
  readonly toOption: () => PropertySignature<From, true, Option<To>, false>
}
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

## ToAsserts

**Signature**

```ts
export declare const ToAsserts: P.ToAsserts<S>
```

Added in v1.0.0

## ToOptionalKeys (type alias)

**Signature**

```ts
export type ToOptionalKeys<Fields> = {
  [K in keyof Fields]: Fields[K] extends
    | PropertySignature<any, boolean, any, true>
    | PropertySignature<never, boolean, never, true>
    ? K
    : never
}[keyof Fields]
```

Added in v1.0.0

## from

**Signature**

```ts
export declare const from: <I, A>(schema: Schema<I, A>) => Schema<I, I>
```

Added in v1.0.0

## optional

**Signature**

```ts
export declare const optional: <I, A>(
  schema: Schema<I, A>,
  annotations?: AST.Annotated['annotations']
) => PropertySignature<I, true, A, true>
```

Added in v1.0.0

## to

**Signature**

```ts
export declare const to: <I, A>(schema: Schema<I, A>) => Schema<A, A>
```

Added in v1.0.0

# validation

## asserts

**Signature**

```ts
export declare const asserts: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions | undefined) => asserts a is A
```

Added in v1.0.0

## is

**Signature**

```ts
export declare const is: <_, A>(schema: Schema<_, A>) => (a: unknown) => a is A
```

Added in v1.0.0

## validate

**Signature**

```ts
export declare const validate: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions | undefined) => Effect<never, PR.ParseError, A>
```

Added in v1.0.0

## validateEither

**Signature**

```ts
export declare const validateEither: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions | undefined) => Either<PR.ParseError, A>
```

Added in v1.0.0

## validateOption

**Signature**

```ts
export declare const validateOption: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

## validatePromise

**Signature**

```ts
export declare const validatePromise: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => Promise<A>
```

Added in v1.0.0

## validateResult

**Signature**

```ts
export declare const validateResult: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions | undefined) => ParseResult<A>
```

Added in v1.0.0

## validateSync

**Signature**

```ts
export declare const validateSync: <_, A>(schema: Schema<_, A>) => (a: unknown, options?: ParseOptions | undefined) => A
```

Added in v1.0.0
