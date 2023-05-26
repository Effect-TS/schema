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
  - [ValidDate](#validdate)
  - [validDate](#validdate)
- [Json](#json)
  - [Json (type alias)](#json-type-alias)
  - [JsonArray (type alias)](#jsonarray-type-alias)
  - [JsonNumber](#jsonnumber)
  - [JsonObject (type alias)](#jsonobject-type-alias)
  - [json](#json)
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
  - [NegativeBigint](#negativebigint)
  - [NonNegativeBigint](#nonnegativebigint)
  - [NonPositiveBigint](#nonpositivebigint)
  - [PositiveBigint](#positivebigint)
  - [betweenBigint](#betweenbigint)
  - [greaterThanBigint](#greaterthanbigint)
  - [greaterThanOrEqualToBigint](#greaterthanorequaltobigint)
  - [lessThanBigint](#lessthanbigint)
  - [lessThanOrEqualToBigint](#lessthanorequaltobigint)
  - [negativeBigint](#negativebigint)
  - [nonNegativeBigint](#nonnegativebigint)
  - [nonPositiveBigint](#nonpositivebigint)
  - [positiveBigint](#positivebigint)
- [combinators](#combinators)
  - [annotations](#annotations-1)
  - [array](#array-1)
  - [brand](#brand)
  - [data](#data)
  - [either](#either)
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
  - [optionalElement](#optionalelement)
  - [partial](#partial)
  - [pick](#pick)
  - [record](#record)
  - [required](#required)
  - [rest](#rest)
  - [struct](#struct)
  - [tuple](#tuple)
  - [union](#union)
- [constructors](#constructors)
  - [UUID](#uuid)
  - [chunk](#chunk)
  - [declare](#declare)
  - [enums](#enums)
  - [instanceOf](#instanceof)
  - [literal](#literal)
  - [make](#make)
  - [propertySignature](#propertysignature)
  - [readonlyMap](#readonlymap)
  - [readonlySet](#readonlyset)
  - [templateLiteral](#templateliteral)
  - [uniqueSymbol](#uniquesymbol)
- [model](#model)
  - [AnnotationOptions (type alias)](#annotationoptions-type-alias)
  - [BrandSchema (interface)](#brandschema-interface)
  - [Schema (interface)](#schema-interface)
  - [To (type alias)](#to-type-alias)
- [number](#number)
  - [Negative](#negative)
  - [NonNaN](#nonnan)
  - [NonNegative](#nonnegative)
  - [NonPositive](#nonpositive)
  - [Positive](#positive)
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
- [primitives](#primitives)
  - [any](#any)
  - [bigint](#bigint-1)
  - [boolean](#boolean)
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
  - [Trimmed](#trimmed)
  - [endsWith](#endswith)
  - [includes](#includes)
  - [length](#length)
  - [maxLength](#maxlength)
  - [minLength](#minlength)
  - [nonEmpty](#nonempty)
  - [pattern](#pattern)
  - [startsWith](#startswith)
  - [trimmed](#trimmed)
- [symbols](#symbols)
  - [SchemaTypeId](#schematypeid)
  - [SchemaTypeId (type alias)](#schematypeid-type-alias)
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
  - [UUIDTypeId](#uuidtypeid)
  - [ValidDateTypeId](#validdatetypeid)
- [utils](#utils)
  - [Join (type alias)](#join-type-alias)
  - [PropertySignature (interface)](#propertysignature-interface)
  - [SchemaPropertySignature (interface)](#schemapropertysignature-interface)
  - [Spread (type alias)](#spread-type-alias)
  - [ToAsserts](#toasserts)
  - [ToOptionalKeys (type alias)](#tooptionalkeys-type-alias)
  - [optional](#optional)
- [validation](#validation)
  - [asserts](#asserts)
  - [is](#is)
  - [validate](#validate)
  - [validateEffect](#validateeffect)
  - [validateEither](#validateeither)
  - [validateOption](#validateoption)
  - [validatePromise](#validatepromise)
  - [validateResult](#validateresult)

---

# Date

## Date

**Signature**

```ts
export declare const Date: Schema<Date>
```

Added in v1.0.0

## ValidDate

A schema representing valid dates, e.g. `new Date("fail")` is excluded, even though it is an instance of `Date`.

**Signature**

```ts
export declare const ValidDate: Schema<Date>
```

Added in v1.0.0

## validDate

A filter excluding invalid dates (e.g. `new Date("fail")`).

**Signature**

```ts
export declare const validDate: (options?: AnnotationOptions<Date> | undefined) => (self: Schema<Date>) => Schema<Date>
```

Added in v1.0.0

# Json

## Json (type alias)

**Signature**

```ts
export type Json = null | boolean | number | string | JsonArray | JsonObject
```

Added in v1.0.0

## JsonArray (type alias)

**Signature**

```ts
export type JsonArray = ReadonlyArray<Json>
```

Added in v1.0.0

## JsonNumber

The `JsonNumber` is a schema for representing JSON numbers. It ensures that the provided value is a valid
number by filtering out `NaN` and `(+/-) Infinity`. This is useful when you want to validate and represent numbers in JSON
format.

**Signature**

```ts
export declare const JsonNumber: Schema<number>
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

## JsonObject (type alias)

**Signature**

```ts
export type JsonObject = { readonly [key: string]: Json }
```

Added in v1.0.0

## json

**Signature**

```ts
export declare const json: Schema<Json>
```

Added in v1.0.0

# annotations

## description

**Signature**

```ts
export declare const description: (description: AST.DescriptionAnnotation) => <A>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## documentation

**Signature**

```ts
export declare const documentation: (documentation: AST.DocumentationAnnotation) => <A>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## examples

**Signature**

```ts
export declare const examples: (examples: AST.ExamplesAnnotation) => <A>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## identifier

**Signature**

```ts
export declare const identifier: (identifier: AST.IdentifierAnnotation) => <A>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## message

**Signature**

```ts
export declare const message: (message: AST.MessageAnnotation<unknown>) => <A>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## title

**Signature**

```ts
export declare const title: (title: AST.TitleAnnotation) => <A>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

# array

## itemsCount

**Signature**

```ts
export declare const itemsCount: <A>(
  n: number,
  options?: AnnotationOptions<readonly A[]> | undefined
) => (self: Schema<readonly A[]>) => Schema<readonly A[]>
```

Added in v1.0.0

## maxItems

**Signature**

```ts
export declare const maxItems: <A>(
  n: number,
  options?: AnnotationOptions<readonly A[]> | undefined
) => (self: Schema<readonly A[]>) => Schema<readonly A[]>
```

Added in v1.0.0

## minItems

**Signature**

```ts
export declare const minItems: <A>(
  n: number,
  options?: AnnotationOptions<readonly A[]> | undefined
) => (self: Schema<readonly A[]>) => Schema<readonly A[]>
```

Added in v1.0.0

# bigint

## NegativeBigint

**Signature**

```ts
export declare const NegativeBigint: Schema<bigint>
```

Added in v1.0.0

## NonNegativeBigint

**Signature**

```ts
export declare const NonNegativeBigint: Schema<bigint>
```

Added in v1.0.0

## NonPositiveBigint

**Signature**

```ts
export declare const NonPositiveBigint: Schema<bigint>
```

Added in v1.0.0

## PositiveBigint

**Signature**

```ts
export declare const PositiveBigint: Schema<bigint>
```

Added in v1.0.0

## betweenBigint

**Signature**

```ts
export declare const betweenBigint: <A extends bigint>(
  min: bigint,
  max: bigint,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThanBigint

**Signature**

```ts
export declare const greaterThanBigint: <A extends bigint>(
  min: bigint,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThanOrEqualToBigint

**Signature**

```ts
export declare const greaterThanOrEqualToBigint: <A extends bigint>(
  min: bigint,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThanBigint

**Signature**

```ts
export declare const lessThanBigint: <A extends bigint>(
  max: bigint,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThanOrEqualToBigint

**Signature**

```ts
export declare const lessThanOrEqualToBigint: <A extends bigint>(
  max: bigint,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## negativeBigint

**Signature**

```ts
export declare const negativeBigint: <A extends bigint>(
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonNegativeBigint

**Signature**

```ts
export declare const nonNegativeBigint: <A extends bigint>(
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonPositiveBigint

**Signature**

```ts
export declare const nonPositiveBigint: <A extends bigint>(
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## positiveBigint

**Signature**

```ts
export declare const positiveBigint: <A extends bigint>(
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

# combinators

## annotations

**Signature**

```ts
export declare const annotations: (annotations: AST.Annotated['annotations']) => <A>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## array

**Signature**

```ts
export declare const array: <A>(item: Schema<A>) => Schema<readonly A[]>
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
) => (self: Schema<A>) => BrandSchema<any>
```

**Example**

```ts
import * as S from '@effect/schema/Schema'
import { pipe } from '@effect/data/Function'

const Int = pipe(S.number, S.int(), S.brand('Int'))
type Int = S.To<typeof Int> // number & Brand<"Int">
```

Added in v1.0.0

## data

**Signature**

```ts
export declare const data: <A extends readonly any[] | Readonly<Record<string, any>>>(
  item: Schema<A>
) => Schema<D.Data<A>>
```

Added in v1.0.0

## either

**Signature**

```ts
export declare const either: <E, A>(left: Schema<E>, right: Schema<A>) => Schema<E.Either<E, A>>
```

Added in v1.0.0

## element

**Signature**

```ts
export declare const element: <E>(
  element: Schema<E>
) => <A extends readonly any[]>(self: Schema<A>) => Schema<readonly [...A, E]>
```

Added in v1.0.0

## extend

**Signature**

```ts
export declare const extend: {
  <B>(that: Schema<B>): <A>(self: Schema<A>) => Schema<Spread<A & B>>
  <A, B>(self: Schema<A>, that: Schema<B>): Schema<Spread<A & B>>
}
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare function filter<C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>,
  options?: AnnotationOptions<A>
): (self: Schema<C>) => Schema<C & B>
export declare function filter<B extends A, A = B>(
  predicate: Predicate<A>,
  options?: AnnotationOptions<A>
): (self: Schema<B>) => Schema<B>
```

Added in v1.0.0

## fromBrand

**Signature**

```ts
export declare const fromBrand: <C extends any>(
  constructor: any,
  options?: AnnotationOptions<any> | undefined
) => <A extends any>(self: Schema<A>) => Schema<A & C>
```

Added in v1.0.0

## keyof

**Signature**

```ts
export declare const keyof: <A>(schema: Schema<A>) => Schema<keyof A>
```

Added in v1.0.0

## lazy

**Signature**

```ts
export declare const lazy: <A>(f: () => Schema<A>, annotations?: AST.Annotations | undefined) => Schema<A>
```

Added in v1.0.0

## nonEmptyArray

**Signature**

```ts
export declare const nonEmptyArray: <A>(item: Schema<A>) => Schema<readonly [A, ...A[]]>
```

Added in v1.0.0

## nullable

**Signature**

```ts
export declare const nullable: <A>(self: Schema<A>) => Schema<A | null>
```

Added in v1.0.0

## omit

**Signature**

```ts
export declare const omit: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => (self: Schema<A>) => Schema<Spread<Pick<A, Exclude<keyof A, Keys[number]>>>>
```

Added in v1.0.0

## option

**Signature**

```ts
export declare const option: <A>(value: Schema<A>) => Schema<Option<A>>
```

Added in v1.0.0

## optionalElement

**Signature**

```ts
export declare const optionalElement: <E>(
  element: Schema<E>
) => <A extends readonly any[]>(self: Schema<A>) => Schema<readonly [...A, (E | undefined)?]>
```

Added in v1.0.0

## partial

**Signature**

```ts
export declare const partial: <A>(self: Schema<A>) => Schema<Spread<Partial<A>>>
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => (self: Schema<A>) => Schema<Spread<Pick<A, Keys[number]>>>
```

Added in v1.0.0

## record

**Signature**

```ts
export declare const record: <K extends string | symbol, A>(
  key: Schema<K>,
  value: Schema<A>
) => Schema<{ readonly [k in K]: A }>
```

Added in v1.0.0

## required

**Signature**

```ts
export declare const required: <A>(self: Schema<A>) => Schema<Spread<Required<A>>>
```

Added in v1.0.0

## rest

**Signature**

```ts
export declare const rest: <R>(
  rest: Schema<R>
) => <A extends readonly any[]>(self: Schema<A>) => Schema<readonly [...A, ...R[]]>
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <
  Fields extends Record<
    string | number | symbol,
    | PropertySignature<any, boolean, any, boolean>
    | PropertySignature<never, boolean, never, boolean>
    | Schema<any>
    | Schema<never>
  >
>(
  fields: Fields
) => Schema<
  Spread<
    { readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: To<Fields[K]> } & {
      readonly [K in ToOptionalKeys<Fields>]?: To<Fields[K]> | undefined
    }
  >
>
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <Elements extends readonly Schema<any>[]>(
  ...elements: Elements
) => Schema<{ readonly [K in keyof Elements]: To<Elements[K]> }>
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: <Members extends readonly Schema<any>[]>(...members: Members) => Schema<To<Members[number]>>
```

Added in v1.0.0

# constructors

## UUID

**Signature**

```ts
export declare const UUID: Schema<string>
```

Added in v1.0.0

## chunk

**Signature**

```ts
export declare const chunk: <A>(item: Schema<A>) => Schema<Chunk<A>>
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
  ) => (input: any, options: ParseOptions, ast: AST.AST) => ParseResult<any>,
  encode: (
    ...typeParameters: ReadonlyArray<Schema<any>>
  ) => (input: any, options: ParseOptions, ast: AST.AST) => ParseResult<any>,
  annotations?: AST.Annotations | undefined
) => Schema<any>
```

Added in v1.0.0

## enums

**Signature**

```ts
export declare const enums: <A extends { [x: string]: string | number }>(enums: A) => Schema<A[keyof A]>
```

Added in v1.0.0

## instanceOf

**Signature**

```ts
export declare const instanceOf: new (...args: any) => any
```

Added in v1.0.0

## literal

**Signature**

```ts
export declare const literal: <Literals extends readonly AST.LiteralValue[]>(
  ...literals: Literals
) => Schema<Literals[number]>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <A>(ast: AST.AST) => Schema<A>
```

Added in v1.0.0

## propertySignature

**Signature**

```ts
export declare const propertySignature: <A>(
  schema: Schema<A>,
  annotations?: AST.Annotations | undefined
) => SchemaPropertySignature<A, false, A, false>
```

Added in v1.0.0

## readonlyMap

**Signature**

```ts
export declare const readonlyMap: <K, V>(key: Schema<K>, value: Schema<V>) => Schema<ReadonlyMap<K, V>>
```

Added in v1.0.0

## readonlySet

**Signature**

```ts
export declare const readonlySet: <A>(item: Schema<A>) => Schema<ReadonlySet<A>>
```

Added in v1.0.0

## templateLiteral

**Signature**

```ts
export declare const templateLiteral: <T extends [Schema<any>, ...Schema<any>[]]>(
  ...[head, ...tail]: T
) => Schema<Join<{ [K in keyof T]: To<T[K]> }>>
```

Added in v1.0.0

## uniqueSymbol

**Signature**

```ts
export declare const uniqueSymbol: <S extends symbol>(symbol: S, annotations?: AST.Annotations | undefined) => Schema<S>
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
export interface BrandSchema<To extends Brand<any>> extends Schema<To>, Brand.Constructor<To> {}
```

Added in v1.0.0

## Schema (interface)

**Signature**

```ts
export interface Schema<A> {
  readonly [SchemaTypeId]: (_: A) => A
  readonly From: (_: A) => A
  readonly To: (_: A) => A
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

## Negative

**Signature**

```ts
export declare const Negative: Schema<number>
```

Added in v1.0.0

## NonNaN

**Signature**

```ts
export declare const NonNaN: Schema<number>
```

Added in v1.0.0

## NonNegative

**Signature**

```ts
export declare const NonNegative: Schema<number>
```

Added in v1.0.0

## NonPositive

**Signature**

```ts
export declare const NonPositive: Schema<number>
```

Added in v1.0.0

## Positive

**Signature**

```ts
export declare const Positive: Schema<number>
```

Added in v1.0.0

## between

**Signature**

```ts
export declare const between: <A extends number>(
  min: number,
  max: number,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## finite

**Signature**

```ts
export declare const finite: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThan

**Signature**

```ts
export declare const greaterThan: <A extends number>(
  min: number,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThanOrEqualTo

**Signature**

```ts
export declare const greaterThanOrEqualTo: <A extends number>(
  min: number,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## int

**Signature**

```ts
export declare const int: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThan

**Signature**

```ts
export declare const lessThan: <A extends number>(
  max: number,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThanOrEqualTo

**Signature**

```ts
export declare const lessThanOrEqualTo: <A extends number>(
  max: number,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## multipleOf

**Signature**

```ts
export declare const multipleOf: <A extends number>(
  divisor: number,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## negative

**Signature**

```ts
export declare const negative: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonNaN

**Signature**

```ts
export declare const nonNaN: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonNegative

**Signature**

```ts
export declare const nonNegative: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonPositive

**Signature**

```ts
export declare const nonPositive: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## positive

**Signature**

```ts
export declare const positive: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

# primitives

## any

**Signature**

```ts
export declare const any: Schema<any>
```

Added in v1.0.0

## bigint

**Signature**

```ts
export declare const bigint: Schema<bigint>
```

Added in v1.0.0

## boolean

**Signature**

```ts
export declare const boolean: Schema<boolean>
```

Added in v1.0.0

## never

**Signature**

```ts
export declare const never: Schema<never>
```

Added in v1.0.0

## null

**Signature**

```ts
export declare const null: Schema<null>
```

Added in v1.0.0

## number

**Signature**

```ts
export declare const number: Schema<number>
```

Added in v1.0.0

## object

**Signature**

```ts
export declare const object: Schema<object>
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: Schema<string>
```

Added in v1.0.0

## symbol

**Signature**

```ts
export declare const symbol: Schema<symbol>
```

Added in v1.0.0

## undefined

**Signature**

```ts
export declare const undefined: Schema<undefined>
```

Added in v1.0.0

## unknown

**Signature**

```ts
export declare const unknown: Schema<unknown>
```

Added in v1.0.0

## void

**Signature**

```ts
export declare const void: Schema<void>
```

Added in v1.0.0

# string

## Trimmed

**Signature**

```ts
export declare const Trimmed: Schema<string>
```

Added in v1.0.0

## endsWith

**Signature**

```ts
export declare const endsWith: <A extends string>(
  endsWith: string,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## includes

**Signature**

```ts
export declare const includes: <A extends string>(
  searchString: string,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## length

**Signature**

```ts
export declare const length: <A extends string>(
  length: number,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: <A extends string>(
  maxLength: number,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: <A extends string>(
  minLength: number,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonEmpty

**Signature**

```ts
export declare const nonEmpty: <A extends string>(
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## pattern

**Signature**

```ts
export declare const pattern: <A extends string>(
  regex: RegExp,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## startsWith

**Signature**

```ts
export declare const startsWith: <A extends string>(
  startsWith: string,
  options?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
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
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

# symbols

## SchemaTypeId

**Signature**

```ts
export declare const SchemaTypeId: typeof SchemaTypeId
```

Added in v1.0.0

## SchemaTypeId (type alias)

**Signature**

```ts
export type SchemaTypeId = typeof SchemaTypeId
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
}
```

Added in v1.0.0

## SchemaPropertySignature (interface)

**Signature**

```ts
export interface SchemaPropertySignature<From, FromIsOptional, To, ToIsOptional>
  extends PropertySignature<From, FromIsOptional, To, ToIsOptional> {
  readonly optional: () => SchemaPropertySignature<From, true, To, true>
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

## optional

**Signature**

```ts
export declare const optional: <A>(
  schema: Schema<A>,
  annotations?: AST.Annotations | undefined
) => SchemaPropertySignature<A, true, A, true>
```

Added in v1.0.0

# validation

## asserts

**Signature**

```ts
export declare const asserts: <A>(
  schema: Schema<A>
) => (a: unknown, options?: AST.ParseOptions | undefined) => asserts a is A
```

Added in v1.0.0

## is

**Signature**

```ts
export declare const is: <A>(schema: Schema<A>) => (a: unknown) => a is A
```

Added in v1.0.0

## validate

**Signature**

```ts
export declare const validate: <A>(schema: Schema<A>) => (a: unknown, options?: AST.ParseOptions | undefined) => A
```

Added in v1.0.0

## validateEffect

**Signature**

```ts
export declare const validateEffect: <A>(
  schema: Schema<A>
) => (a: unknown, options?: AST.ParseOptions | undefined) => Effect<never, PR.ParseError, A>
```

Added in v1.0.0

## validateEither

**Signature**

```ts
export declare const validateEither: <A>(
  schema: Schema<A>
) => (a: unknown, options?: AST.ParseOptions | undefined) => E.Either<PR.ParseError, A>
```

Added in v1.0.0

## validateOption

**Signature**

```ts
export declare const validateOption: <A>(
  schema: Schema<A>
) => (a: unknown, options?: AST.ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

## validatePromise

**Signature**

```ts
export declare const validatePromise: <A>(
  schema: Schema<A>
) => (i: unknown, options?: AST.ParseOptions | undefined) => Promise<A>
```

Added in v1.0.0

## validateResult

**Signature**

```ts
export declare const validateResult: <A>(
  schema: Schema<A>
) => (a: unknown, options?: AST.ParseOptions | undefined) => PR.IO<PR.ParseError, A>
```

Added in v1.0.0
