---
title: Schema.ts
nav_order: 7
parent: Modules
---

## Schema overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Chunk constructors](#chunk-constructors)
  - [chunk](#chunk)
- [Data constructors](#data-constructors)
  - [data](#data)
- [Date combinators](#date-combinators)
  - [validDate](#validdate)
- [Date constructors](#date-constructors)
  - [Date](#date)
  - [ValidDate](#validdate)
- [Either constructors](#either-constructors)
  - [either](#either)
- [Json](#json)
  - [Json (type alias)](#json-type-alias)
  - [JsonArray (type alias)](#jsonarray-type-alias)
  - [JsonObject (type alias)](#jsonobject-type-alias)
- [Json constructors](#json-constructors)
  - [JsonNumber](#jsonnumber)
  - [json](#json)
- [Option constructors](#option-constructors)
  - [option](#option)
- [ReadonlyArray filters](#readonlyarray-filters)
  - [itemsCount](#itemscount)
  - [maxItems](#maxitems)
  - [minItems](#minitems)
- [ReadonlyMap constructors](#readonlymap-constructors)
  - [readonlyMap](#readonlymap)
- [ReadonlySet constructors](#readonlyset-constructors)
  - [readonlySet](#readonlyset)
- [asserts](#asserts)
  - [ToAsserts](#toasserts)
  - [asserts](#asserts-1)
- [bigint constructors](#bigint-constructors)
  - [NegativeBigint](#negativebigint)
  - [NonNegativeBigint](#nonnegativebigint)
  - [NonPositiveBigint](#nonpositivebigint)
  - [PositiveBigint](#positivebigint)
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
- [combinators](#combinators)
  - [annotations](#annotations)
  - [array](#array)
  - [brand](#brand)
  - [element](#element)
  - [extend](#extend)
  - [filter](#filter)
  - [keyof](#keyof)
  - [lazy](#lazy)
  - [nonEmptyArray](#nonemptyarray)
  - [nullable](#nullable)
  - [omit](#omit)
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
  - [declare](#declare)
  - [enums](#enums)
  - [fromBrand](#frombrand)
  - [instanceOf](#instanceof)
  - [literal](#literal)
  - [make](#make)
  - [propertySignature](#propertysignature)
  - [templateLiteral](#templateliteral)
  - [uniqueSymbol](#uniquesymbol)
- [guards](#guards)
  - [is](#is)
- [model](#model)
  - [Schema (interface)](#schema-interface)
  - [SchemaTypeId](#schematypeid)
  - [SchemaTypeId (type alias)](#schematypeid-type-alias)
- [number constructors](#number-constructors)
  - [Finite](#finite)
  - [Int](#int)
  - [Negative](#negative)
  - [NonNaN](#nonnan)
  - [NonNegative](#nonnegative)
  - [NonPositive](#nonpositive)
  - [Positive](#positive)
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
- [primitives](#primitives)
  - [any](#any)
  - [bigint](#bigint)
  - [boolean](#boolean)
  - [never](#never)
  - [null](#null)
  - [number](#number)
  - [object](#object)
  - [string](#string)
  - [symbol](#symbol)
  - [undefined](#undefined)
  - [unknown](#unknown)
  - [void](#void)
- [string constructors](#string-constructors)
  - [Trimmed](#trimmed)
  - [ULID](#ulid)
  - [UUID](#uuid)
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
- [type id](#type-id)
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
  - [NonNaNTypeId](#nonnantypeid)
  - [PatternTypeId](#patterntypeid)
  - [StartsWithTypeId](#startswithtypeid)
  - [TrimmedTypeId](#trimmedtypeid)
  - [ULIDTypeId](#ulidtypeid)
  - [UUIDTypeId](#uuidtypeid)
  - [ValidDateTypeId](#validdatetypeid)
- [utils](#utils)
  - [BrandSchema (interface)](#brandschema-interface)
  - [DocAnnotations (interface)](#docannotations-interface)
  - [FilterAnnotations (interface)](#filterannotations-interface)
  - [Join (type alias)](#join-type-alias)
  - [OptionalPropertySignature (interface)](#optionalpropertysignature-interface)
  - [OptionalSchemaPropertySignature (interface)](#optionalschemapropertysignature-interface)
  - [PropertySignature (interface)](#propertysignature-interface)
  - [SchemaPropertySignature (interface)](#schemapropertysignature-interface)
  - [Simplify (type alias)](#simplify-type-alias)
  - [To (type alias)](#to-type-alias)
  - [ToOptionalKeys (type alias)](#tooptionalkeys-type-alias)
  - [optional](#optional)
- [validating](#validating)
  - [validate](#validate)
  - [validateEither](#validateeither)
  - [validateOption](#validateoption)
  - [validatePromise](#validatepromise)
  - [validateResult](#validateresult)
  - [validateSync](#validatesync)

---

# Chunk constructors

## chunk

**Signature**

```ts
export declare const chunk: <A>(item: Schema<A>) => Schema<Chunk<A>>
```

Added in v1.0.0

# Data constructors

## data

**Signature**

```ts
export declare const data: <A extends readonly any[] | Readonly<Record<string, any>>>(
  item: Schema<A>
) => Schema<D.Data<A>>
```

Added in v1.0.0

# Date combinators

## validDate

A filter excluding invalid dates (e.g. `new Date("fail")`).

**Signature**

```ts
export declare const validDate: (options?: FilterAnnotations<Date>) => (self: Schema<Date>) => Schema<Date>
```

Added in v1.0.0

# Date constructors

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

# Either constructors

## either

**Signature**

```ts
export declare const either: <E, A>(left: Schema<E>, right: Schema<A>) => Schema<E.Either<E, A>>
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

## JsonObject (type alias)

**Signature**

```ts
export type JsonObject = { readonly [key: string]: Json }
```

Added in v1.0.0

# Json constructors

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

## json

**Signature**

```ts
export declare const json: Schema<Json>
```

Added in v1.0.0

# Option constructors

## option

**Signature**

```ts
export declare const option: <A>(value: Schema<A>) => Schema<Option<A>>
```

Added in v1.0.0

# ReadonlyArray filters

## itemsCount

**Signature**

```ts
export declare const itemsCount: <A>(
  n: number,
  options?: FilterAnnotations<readonly A[]> | undefined
) => (self: Schema<readonly A[]>) => Schema<readonly A[]>
```

Added in v1.0.0

## maxItems

**Signature**

```ts
export declare const maxItems: <A>(
  n: number,
  options?: FilterAnnotations<readonly A[]> | undefined
) => (self: Schema<readonly A[]>) => Schema<readonly A[]>
```

Added in v1.0.0

## minItems

**Signature**

```ts
export declare const minItems: <A>(
  n: number,
  options?: FilterAnnotations<readonly A[]> | undefined
) => (self: Schema<readonly A[]>) => Schema<readonly A[]>
```

Added in v1.0.0

# ReadonlyMap constructors

## readonlyMap

**Signature**

```ts
export declare const readonlyMap: <K, V>(key: Schema<K>, value: Schema<V>) => Schema<ReadonlyMap<K, V>>
```

Added in v1.0.0

# ReadonlySet constructors

## readonlySet

**Signature**

```ts
export declare const readonlySet: <A>(item: Schema<A>) => Schema<ReadonlySet<A>>
```

Added in v1.0.0

# asserts

## ToAsserts

**Signature**

```ts
export declare const ToAsserts: P.ToAsserts<S>
```

Added in v1.0.0

## asserts

**Signature**

```ts
export declare const asserts: <A>(
  schema: Schema<A>
) => (a: unknown, options?: AST.ParseOptions | undefined) => asserts a is A
```

Added in v1.0.0

# bigint constructors

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

# bigint filters

## betweenBigint

Tests if a `bigint` is between a minimum and a maximum value (included).

**Signature**

```ts
export declare const betweenBigint: <A extends bigint>(
  min: bigint,
  max: bigint,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThanBigint

**Signature**

```ts
export declare const greaterThanBigint: <A extends bigint>(
  min: bigint,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThanOrEqualToBigint

**Signature**

```ts
export declare const greaterThanOrEqualToBigint: <A extends bigint>(
  min: bigint,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThanBigint

**Signature**

```ts
export declare const lessThanBigint: <A extends bigint>(
  max: bigint,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThanOrEqualToBigint

**Signature**

```ts
export declare const lessThanOrEqualToBigint: <A extends bigint>(
  max: bigint,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## negativeBigint

**Signature**

```ts
export declare const negativeBigint: <A extends bigint>(
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonNegativeBigint

**Signature**

```ts
export declare const nonNegativeBigint: <A extends bigint>(
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonPositiveBigint

**Signature**

```ts
export declare const nonPositiveBigint: <A extends bigint>(
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## positiveBigint

**Signature**

```ts
export declare const positiveBigint: <A extends bigint>(
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

# combinators

## annotations

**Signature**

```ts
export declare const annotations: <A>(options: DocAnnotations<A>) => (self: Schema<A>) => Schema<A>
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
  options?: DocAnnotations<A> | undefined
) => (self: Schema<A>) => BrandSchema<A & Brand<B>>
```

**Example**

```ts
import * as S from '@effect/schema/Schema'
import { pipe } from '@effect/data/Function'

const Int = pipe(S.number, S.int(), S.brand('Int'))
type Int = S.To<typeof Int> // number & Brand<"Int">
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
  <B>(that: Schema<B>): <A>(self: Schema<A>) => Schema<Simplify<A & B>>
  <A, B>(self: Schema<A>, that: Schema<B>): Schema<Simplify<A & B>>
}
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare function filter<C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>,
  options?: FilterAnnotations<A>
): (self: Schema<C>) => Schema<C & B>
export declare function filter<B extends A, A = B>(
  predicate: Predicate<A>,
  options?: FilterAnnotations<A>
): (self: Schema<B>) => Schema<B>
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
export declare const lazy: <A>(f: () => Schema<A>, annotations?: AST.Annotated['annotations']) => Schema<A>
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
) => (self: Schema<A>) => Schema<Simplify<Omit<A, Keys[number]>>>
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
export declare const partial: <A>(self: Schema<A>) => Schema<Simplify<Partial<A>>>
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => (self: Schema<A>) => Schema<Simplify<Pick<A, Keys[number]>>>
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
export declare const required: <A>(self: Schema<A>) => Schema<Simplify<Required<A>>>
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
    PropertyKey,
    | Schema<any>
    | Schema<never>
    | SchemaPropertySignature<any, boolean, any, boolean>
    | SchemaPropertySignature<never, boolean, never, boolean>
  >
>(
  fields: Fields
) => Schema<
  Simplify<
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

## declare

**Signature**

```ts
export declare const declare: (
  typeParameters: ReadonlyArray<Schema<any>>,
  type: Schema<any>,
  decode: (
    ...typeParameters: ReadonlyArray<Schema<any>>
  ) => (input: any, options: ParseOptions, ast: AST.AST) => PR.ParseResult<any>,
  annotations?: AST.Annotated['annotations']
) => Schema<any>
```

Added in v1.0.0

## enums

**Signature**

```ts
export declare const enums: <A extends { [x: string]: string | number }>(enums: A) => Schema<A[keyof A]>
```

Added in v1.0.0

## fromBrand

**Signature**

```ts
export declare const fromBrand: <C extends Brand<string | symbol>>(
  constructor: Brand.Constructor<C>,
  options?: FilterAnnotations<Brand.Unbranded<C>> | undefined
) => <A extends Brand.Unbranded<C>>(self: Schema<A>) => Schema<A & C>
```

Added in v1.0.0

## instanceOf

**Signature**

```ts
export declare const instanceOf: <A extends abstract new (...args: any) => any>(
  constructor: A,
  options?: FilterAnnotations<unknown>
) => Schema<InstanceType<A>>
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
  options: DocAnnotations<A>
) => SchemaPropertySignature<A, false, A, false>
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
export declare const uniqueSymbol: <S extends symbol>(
  symbol: S,
  annotations?: AST.Annotated['annotations']
) => Schema<S>
```

Added in v1.0.0

# guards

## is

**Signature**

```ts
export declare const is: <A>(schema: Schema<A>) => (a: unknown) => a is A
```

Added in v1.0.0

# model

## Schema (interface)

**Signature**

```ts
export interface Schema<A> extends Pipeable {
  readonly [SchemaTypeId]: (_: A) => A
  readonly From: (_: A) => A
  readonly To: (_: A) => A
  readonly ast: AST.AST
}
```

Added in v1.0.0

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

# number constructors

## Finite

**Signature**

```ts
export declare const Finite: Schema<number>
```

Added in v1.0.0

## Int

**Signature**

```ts
export declare const Int: Schema<number>
```

Added in v1.0.0

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

# number filters

## between

Tests if a `number` is between a minimum and a maximum value (included).

**Signature**

```ts
export declare const between: <A extends number>(
  min: number,
  max: number,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## finite

**Signature**

```ts
export declare const finite: <A extends number>(
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThan

**Signature**

```ts
export declare const greaterThan: <A extends number>(
  min: number,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThanOrEqualTo

**Signature**

```ts
export declare const greaterThanOrEqualTo: <A extends number>(
  min: number,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## int

**Signature**

```ts
export declare const int: <A extends number>(
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThan

**Signature**

```ts
export declare const lessThan: <A extends number>(
  max: number,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThanOrEqualTo

**Signature**

```ts
export declare const lessThanOrEqualTo: <A extends number>(
  max: number,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## multipleOf

**Signature**

```ts
export declare const multipleOf: <A extends number>(
  divisor: number,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## negative

**Signature**

```ts
export declare const negative: <A extends number>(
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonNaN

**Signature**

```ts
export declare const nonNaN: <A extends number>(
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonNegative

**Signature**

```ts
export declare const nonNegative: <A extends number>(
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonPositive

**Signature**

```ts
export declare const nonPositive: <A extends number>(
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## positive

**Signature**

```ts
export declare const positive: <A extends number>(
  options?: FilterAnnotations<A> | undefined
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

# string constructors

## Trimmed

**Signature**

```ts
export declare const Trimmed: Schema<string>
```

Added in v1.0.0

## ULID

**Signature**

```ts
export declare const ULID: Schema<string>
```

Added in v1.0.0

## UUID

**Signature**

```ts
export declare const UUID: Schema<string>
```

Added in v1.0.0

# string filters

## endsWith

**Signature**

```ts
export declare const endsWith: <A extends string>(
  endsWith: string,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## includes

**Signature**

```ts
export declare const includes: <A extends string>(
  searchString: string,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## length

**Signature**

```ts
export declare const length: <A extends string>(
  length: number,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: <A extends string>(
  maxLength: number,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: <A extends string>(
  minLength: number,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonEmpty

**Signature**

```ts
export declare const nonEmpty: <A extends string>(
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## pattern

**Signature**

```ts
export declare const pattern: <A extends string>(
  regex: RegExp,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## startsWith

**Signature**

```ts
export declare const startsWith: <A extends string>(
  startsWith: string,
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## trimmed

Verifies that a string contains no leading or trailing whitespaces.

Note. This combinator does not make any transformations, it only validates.
If what you were looking for was a combinator to trim strings, then check out the `Codec.trim` combinator.

**Signature**

```ts
export declare const trimmed: <A extends string>(
  options?: FilterAnnotations<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

# type id

## BrandTypeId

**Signature**

```ts
export declare const BrandTypeId: typeof BrandTypeId
```

Added in v1.0.0

## EndsWithTypeId

**Signature**

```ts
export declare const EndsWithTypeId: typeof EndsWithTypeId
```

Added in v1.0.0

## FiniteTypeId

**Signature**

```ts
export declare const FiniteTypeId: typeof FiniteTypeId
```

Added in v1.0.0

## GreaterThanBigintTypeId

**Signature**

```ts
export declare const GreaterThanBigintTypeId: typeof GreaterThanBigintTypeId
```

Added in v1.0.0

## GreaterThanOrEqualToBigintTypeId

**Signature**

```ts
export declare const GreaterThanOrEqualToBigintTypeId: typeof GreaterThanOrEqualToBigintTypeId
```

Added in v1.0.0

## GreaterThanOrEqualToTypeId

**Signature**

```ts
export declare const GreaterThanOrEqualToTypeId: typeof GreaterThanOrEqualToTypeId
```

Added in v1.0.0

## GreaterThanTypeId

**Signature**

```ts
export declare const GreaterThanTypeId: typeof GreaterThanTypeId
```

Added in v1.0.0

## IncludesTypeId

**Signature**

```ts
export declare const IncludesTypeId: typeof IncludesTypeId
```

Added in v1.0.0

## InstanceOfTypeId

**Signature**

```ts
export declare const InstanceOfTypeId: typeof InstanceOfTypeId
```

Added in v1.0.0

## IntTypeId

**Signature**

```ts
export declare const IntTypeId: typeof IntTypeId
```

Added in v1.0.0

## JsonNumberTypeId

**Signature**

```ts
export declare const JsonNumberTypeId: typeof JsonNumberTypeId
```

Added in v1.0.0

## LessThanBigintTypeId

**Signature**

```ts
export declare const LessThanBigintTypeId: typeof LessThanBigintTypeId
```

Added in v1.0.0

## LessThanOrEqualToBigintTypeId

**Signature**

```ts
export declare const LessThanOrEqualToBigintTypeId: typeof LessThanOrEqualToBigintTypeId
```

Added in v1.0.0

## LessThanOrEqualToTypeId

**Signature**

```ts
export declare const LessThanOrEqualToTypeId: typeof LessThanOrEqualToTypeId
```

Added in v1.0.0

## LessThanTypeId

**Signature**

```ts
export declare const LessThanTypeId: typeof LessThanTypeId
```

Added in v1.0.0

## MaxItemsTypeId

**Signature**

```ts
export declare const MaxItemsTypeId: typeof MaxItemsTypeId
```

Added in v1.0.0

## MaxLengthTypeId

**Signature**

```ts
export declare const MaxLengthTypeId: typeof MaxLengthTypeId
```

Added in v1.0.0

## MinItemsTypeId

**Signature**

```ts
export declare const MinItemsTypeId: typeof MinItemsTypeId
```

Added in v1.0.0

## MinLengthTypeId

**Signature**

```ts
export declare const MinLengthTypeId: typeof MinLengthTypeId
```

Added in v1.0.0

## MultipleOfTypeId

**Signature**

```ts
export declare const MultipleOfTypeId: typeof MultipleOfTypeId
```

Added in v1.0.0

## NonNaNTypeId

**Signature**

```ts
export declare const NonNaNTypeId: typeof NonNaNTypeId
```

Added in v1.0.0

## PatternTypeId

**Signature**

```ts
export declare const PatternTypeId: typeof PatternTypeId
```

Added in v1.0.0

## StartsWithTypeId

**Signature**

```ts
export declare const StartsWithTypeId: typeof StartsWithTypeId
```

Added in v1.0.0

## TrimmedTypeId

**Signature**

```ts
export declare const TrimmedTypeId: typeof TrimmedTypeId
```

Added in v1.0.0

## ULIDTypeId

**Signature**

```ts
export declare const ULIDTypeId: typeof ULIDTypeId
```

Added in v1.0.0

## UUIDTypeId

**Signature**

```ts
export declare const UUIDTypeId: typeof UUIDTypeId
```

Added in v1.0.0

## ValidDateTypeId

**Signature**

```ts
export declare const ValidDateTypeId: typeof ValidDateTypeId
```

Added in v1.0.0

# utils

## BrandSchema (interface)

**Signature**

```ts
export interface BrandSchema<A extends Brand<any>> extends Schema<A>, Brand.Constructor<A> {}
```

Added in v1.0.0

## DocAnnotations (interface)

**Signature**

```ts
export interface DocAnnotations<A> extends AST.Annotations {
  readonly identifier?: AST.IdentifierAnnotation
  readonly title?: AST.TitleAnnotation
  readonly description?: AST.DescriptionAnnotation
  readonly examples?: AST.ExamplesAnnotation
  readonly documentation?: AST.DocumentationAnnotation
  readonly message?: AST.MessageAnnotation<A>
}
```

Added in v1.0.0

## FilterAnnotations (interface)

**Signature**

```ts
export interface FilterAnnotations<A> extends DocAnnotations<A> {
  readonly typeId?: AST.TypeAnnotation | { id: AST.TypeAnnotation; params: unknown }
  readonly jsonSchema?: AST.JSONSchemaAnnotation
  readonly arbitrary?: (...args: ReadonlyArray<Arbitrary<any>>) => Arbitrary<any>
}
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

## OptionalPropertySignature (interface)

**Signature**

```ts
export interface OptionalPropertySignature<From, FromIsOptional, To, ToIsOptional>
  extends PropertySignature<From, FromIsOptional, To, ToIsOptional> {
  readonly withDefault: (value: () => To) => PropertySignature<From, true, To, false>
  readonly toOption: () => PropertySignature<From, true, Option<To>, false>
}
```

Added in v1.0.0

## OptionalSchemaPropertySignature (interface)

**Signature**

```ts
export interface OptionalSchemaPropertySignature<From, FromIsOptional, To, ToIsOptional>
  extends OptionalPropertySignature<From, FromIsOptional, To, ToIsOptional> {
  readonly [SchemaTypeId]: (_: From) => From
}
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
  readonly [SchemaTypeId]: (_: From) => From
}
```

Added in v1.0.0

## Simplify (type alias)

**Signature**

```ts
export type Simplify<A> = {
  readonly [K in keyof A]: A[K]
} extends infer B
  ? B
  : never
```

Added in v1.0.0

## To (type alias)

**Signature**

```ts
export type To<S extends { readonly To: (..._: any) => any }> = Parameters<S['To']>[0]
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
  options?: DocAnnotations<A> | undefined
) => OptionalSchemaPropertySignature<A, true, A, true>
```

Added in v1.0.0

# validating

## validate

**Signature**

```ts
export declare const validate: <A>(
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
) => (a: unknown, options?: AST.ParseOptions | undefined) => PR.ParseResult<A>
```

Added in v1.0.0

## validateSync

**Signature**

```ts
export declare const validateSync: <A>(schema: Schema<A>) => (a: unknown, options?: AST.ParseOptions | undefined) => A
```

Added in v1.0.0
