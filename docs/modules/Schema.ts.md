---
title: Schema.ts
nav_order: 6
parent: Modules
---

## Schema overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [annotations](#annotations)
  - [description](#description)
  - [documentation](#documentation)
  - [examples](#examples)
  - [identifier](#identifier)
  - [message](#message)
  - [title](#title)
- [combinators](#combinators)
  - [annotations](#annotations-1)
  - [array](#array)
  - [attachPropertySignature](#attachpropertysignature)
  - [brand](#brand)
  - [dataFromSelf](#datafromself)
  - [declare](#declare)
  - [element](#element)
  - [extend](#extend)
  - [filter](#filter)
  - [fromBrand](#frombrand)
  - [keyof](#keyof)
  - [lazy](#lazy)
  - [nonEmptyArray](#nonemptyarray)
  - [nullable](#nullable)
  - [omit](#omit)
  - [optionalElement](#optionalelement)
  - [partial](#partial)
  - [pick](#pick)
  - [record](#record)
  - [rest](#rest)
  - [struct](#struct)
  - [transform](#transform)
  - [transformEither](#transformeither)
  - [tuple](#tuple)
  - [union](#union)
- [constructors](#constructors)
  - [UUID](#uuid)
  - [chunkFromSelf](#chunkfromself)
  - [date](#date)
  - [eitherFromSelf](#eitherfromself)
  - [enums](#enums)
  - [instanceOf](#instanceof)
  - [json](#json)
  - [literal](#literal)
  - [make](#make)
  - [optionFromSelf](#optionfromself)
  - [readonlyMapFromSelf](#readonlymapfromself)
  - [readonlySetFromSelf](#readonlysetfromself)
  - [templateLiteral](#templateliteral)
  - [uniqueSymbol](#uniquesymbol)
- [filters](#filters)
  - [between](#between)
  - [betweenBigint](#betweenbigint)
  - [endsWith](#endswith)
  - [finite](#finite)
  - [greaterThan](#greaterthan)
  - [greaterThanBigint](#greaterthanbigint)
  - [greaterThanOrEqualTo](#greaterthanorequalto)
  - [greaterThanOrEqualToBigint](#greaterthanorequaltobigint)
  - [includes](#includes)
  - [int](#int)
  - [itemsCount](#itemscount)
  - [length](#length)
  - [lessThan](#lessthan)
  - [lessThanBigint](#lessthanbigint)
  - [lessThanOrEqualTo](#lessthanorequalto)
  - [lessThanOrEqualToBigint](#lessthanorequaltobigint)
  - [maxItems](#maxitems)
  - [maxLength](#maxlength)
  - [minItems](#minitems)
  - [minLength](#minlength)
  - [multipleOf](#multipleof)
  - [negative](#negative)
  - [negativeBigint](#negativebigint)
  - [nonEmpty](#nonempty)
  - [nonNaN](#nonnan)
  - [nonNegative](#nonnegative)
  - [nonNegativeBigint](#nonnegativebigint)
  - [nonPositive](#nonpositive)
  - [nonPositiveBigint](#nonpositivebigint)
  - [pattern](#pattern)
  - [positive](#positive)
  - [positiveBigint](#positivebigint)
  - [startsWith](#startswith)
  - [trimmed](#trimmed)
- [model](#model)
  - [BrandSchema (interface)](#brandschema-interface)
  - [Schema (interface)](#schema-interface)
- [parsers](#parsers)
  - [chunk](#chunk)
  - [clamp](#clamp)
  - [clampBigint](#clampbigint)
  - [data](#data)
  - [dateFromString](#datefromstring)
  - [either](#either)
  - [numberFromString](#numberfromstring)
  - [option](#option)
  - [optionFromNullable](#optionfromnullable)
  - [optionsFromOptionals](#optionsfromoptionals)
  - [readonlyMap](#readonlymap)
  - [readonlySet](#readonlyset)
  - [trim](#trim)
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
- [utils](#utils)
  - [AnnotationOptions (type alias)](#annotationoptions-type-alias)
  - [BetweenBigintTypeId](#betweenbiginttypeid)
  - [BetweenTypeId](#betweentypeid)
  - [BrandTypeId](#brandtypeid)
  - [EndsWithTypeId](#endswithtypeid)
  - [FiniteTypeId](#finitetypeid)
  - [From (type alias)](#from-type-alias)
  - [GreaterThanBigintTypeId](#greaterthanbiginttypeid)
  - [GreaterThanOrEqualToBigintTypeId](#greaterthanorequaltobiginttypeid)
  - [GreaterThanOrEqualToTypeId](#greaterthanorequaltotypeid)
  - [GreaterThanTypeId](#greaterthantypeid)
  - [IncludesTypeId](#includestypeid)
  - [InstanceOfTypeId](#instanceoftypeid)
  - [IntTypeId](#inttypeid)
  - [ItemsCountTypeId](#itemscounttypeid)
  - [Join (type alias)](#join-type-alias)
  - [Json (type alias)](#json-type-alias)
  - [JsonArray (type alias)](#jsonarray-type-alias)
  - [JsonObject (type alias)](#jsonobject-type-alias)
  - [LessThanBigintTypeId](#lessthanbiginttypeid)
  - [LessThanOrEqualToBigintTypeId](#lessthanorequaltobiginttypeid)
  - [LessThanOrEqualToTypeId](#lessthanorequaltotypeid)
  - [LessThanTypeId](#lessthantypeid)
  - [MaxItemsTypeId](#maxitemstypeid)
  - [MinItemsTypeId](#minitemstypeid)
  - [MultipleOfTypeId](#multipleoftypeid)
  - [NegativeBigintTypeId](#negativebiginttypeid)
  - [NegativeTypeId](#negativetypeid)
  - [NonNaNTypeId](#nonnantypeid)
  - [NonNegativeBigintTypeId](#nonnegativebiginttypeid)
  - [NonNegativeTypeId](#nonnegativetypeid)
  - [NonPositiveBigintTypeId](#nonpositivebiginttypeid)
  - [NonPositiveTypeId](#nonpositivetypeid)
  - [OptionalKeys (type alias)](#optionalkeys-type-alias)
  - [OptionalSchema (interface)](#optionalschema-interface)
  - [OptionalSchemaId](#optionalschemaid)
  - [OptionalSchemaId (type alias)](#optionalschemaid-type-alias)
  - [PatternTypeId](#patterntypeid)
  - [PositiveBigintTypeId](#positivebiginttypeid)
  - [PositiveTypeId](#positivetypeid)
  - [Spread (type alias)](#spread-type-alias)
  - [StartsWithTypeId](#startswithtypeid)
  - [To (type alias)](#to-type-alias)
  - [ToAsserts](#toasserts)
  - [TrimmedTypeId](#trimmedtypeid)
  - [UUIDTypeId](#uuidtypeid)
  - [asserts](#asserts)
  - [decode](#decode)
  - [decodeEither](#decodeeither)
  - [decodeOption](#decodeoption)
  - [encode](#encode)
  - [encodeEither](#encodeeither)
  - [encodeOption](#encodeoption)
  - [from](#from)
  - [getPropertySignatures](#getpropertysignatures)
  - [is](#is)
  - [optional](#optional)
  - [reverse](#reverse)
  - [to](#to)
  - [validate](#validate)
  - [validateEither](#validateeither)
  - [validateOption](#validateoption)

---

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
export declare const attachPropertySignature: <K extends string | number | symbol, V extends AST.LiteralValue>(
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
  pipe(Circle, S.attachPropertySignature('kind', 'circle')),
  pipe(Square, S.attachPropertySignature('kind', 'square'))
)

assert.deepStrictEqual(S.decode(Shape)({ radius: 10 }), {
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
export declare const brand: <B extends string, A>(
  brand: B,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => BrandSchema<I, any>
```

**Example**

```ts
import * as S from '@effect/schema/Schema'
import { pipe } from '@effect/data/Function'

const Int = pipe(S.number, S.int(), S.brand('Int'))
type Int = S.To<typeof Int> // number & Brand<"Int">
```

Added in v1.0.0

## dataFromSelf

**Signature**

```ts
export declare const dataFromSelf: <I, A extends readonly any[] | Readonly<Record<string, any>>>(
  item: Schema<I, A>
) => Schema<I, D.Data<A>>
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
  ) => (input: unknown, options?: AST.ParseOptions | undefined) => ParseResult<any>,
  annotations?: Record<string | symbol, unknown> | undefined
) => Schema<any>
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
export declare const extend: <IB, B>(
  that: Schema<IB, B>
) => <I, A>(self: Schema<I, A>) => Schema<Spread<I & IB>, Spread<A & B>>
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare function filter<A, B extends A>(
  refinement: Refinement<A, B>,
  options?: AnnotationOptions<A>
): <I>(self: Schema<I, A>) => Schema<I, B>
export declare function filter<A>(
  predicate: Predicate<A>,
  options?: AnnotationOptions<A>
): <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## fromBrand

**Signature**

```ts
export declare const fromBrand: <C extends any>(
  constructor: any,
  options?: AnnotationOptions<any> | undefined
) => <I, A extends any>(self: Schema<I, A>) => Schema<I, A & C>
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
export declare const lazy: <I, A = I>(
  f: () => Schema<I, A>,
  annotations?: Record<string | symbol, unknown> | undefined
) => Schema<I, A>
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
) => <I extends Record<keyof A, any>>(
  self: Schema<I, A>
) => Schema<
  { readonly [P in Exclude<keyof A, Keys[number]>]: I[P] },
  { readonly [P in Exclude<keyof A, Keys[number]>]: A[P] }
>
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
export declare const partial: <I, A>(self: Schema<I, A>) => Schema<Partial<I>, Partial<A>>
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => <I extends Record<keyof A, any>>(
  self: Schema<I, A>
) => Schema<{ readonly [P in Keys[number]]: I[P] }, { readonly [P in Keys[number]]: A[P] }>
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
  Fields extends Record<string | number | symbol, Schema<any, any> | OptionalSchema<any, any>>
>(
  fields: Fields
) => Schema<
  Spread<
    { readonly [K in Exclude<keyof Fields, OptionalKeys<Fields>>]: From<Fields[K]> } & {
      readonly [K in OptionalKeys<Fields>]?: From<Fields[K]> | undefined
    }
  >,
  Spread<
    { readonly [K in Exclude<keyof Fields, OptionalKeys<Fields>>]: To<Fields[K]> } & {
      readonly [K in OptionalKeys<Fields>]?: To<Fields[K]> | undefined
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
  <B, A>(to: Schema<any, B>, ab: (a: A) => B, ba: (b: B) => A): <I>(self: Schema<I, A>) => Schema<I, B>
  <I, A, B>(self: Schema<I, A>, to: Schema<any, B>, ab: (a: A) => B, ba: (b: B) => A): Schema<I, B>
}
```

Added in v1.0.0

## transformEither

Create a new `Schema` by transforming the input and output of an existing `Schema`
using the provided decoding functions.

**Signature**

```ts
export declare const transformEither: {
  <B, A>(
    to: Schema<any, B>,
    decode: (
      input: A,
      options?: AST.ParseOptions | undefined
    ) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], B>,
    encode: (
      input: B,
      options?: AST.ParseOptions | undefined
    ) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], A>
  ): <I>(self: Schema<I, A>) => Schema<I, B>
  <I, A, B>(
    self: Schema<I, A>,
    to: Schema<any, B>,
    decode: (
      input: A,
      options?: AST.ParseOptions | undefined
    ) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], B>,
    encode: (
      input: B,
      options?: AST.ParseOptions | undefined
    ) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], A>
  ): Schema<I, B>
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

## date

**Signature**

```ts
export declare const date: Schema<Date, Date>
```

Added in v1.0.0

## eitherFromSelf

**Signature**

```ts
export declare const eitherFromSelf: <IE, E, IA, A>(
  left: Schema<IE, E>,
  right: Schema<IA, A>
) => Schema<E.Either<IE, IA>, E.Either<E, A>>
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
export declare const instanceOf: new (...args: any) => any
```

Added in v1.0.0

## json

**Signature**

```ts
export declare const json: Schema<Json, Json>
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

## optionFromSelf

**Signature**

```ts
export declare const optionFromSelf: <I, A>(value: Schema<I, A>) => Schema<Option<I>, Option<A>>
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
  annotations?: Record<string | symbol, unknown> | undefined
) => Schema<S, S>
```

Added in v1.0.0

# filters

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

## endsWith

**Signature**

```ts
export declare const endsWith: <A extends string>(
  endsWith: string,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
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

## greaterThanBigint

**Signature**

```ts
export declare const greaterThanBigint: <A extends bigint>(
  min: bigint,
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

## greaterThanOrEqualToBigint

**Signature**

```ts
export declare const greaterThanOrEqualToBigint: <A extends bigint>(
  min: bigint,
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

## int

**Signature**

```ts
export declare const int: <A extends number>(
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## itemsCount

**Signature**

```ts
export declare const itemsCount: <A>(
  n: number,
  options?: AnnotationOptions<readonly A[]> | undefined
) => <I>(self: Schema<I, readonly A[]>) => Schema<I, readonly A[]>
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

## lessThan

**Signature**

```ts
export declare const lessThan: <A extends number>(
  max: number,
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

## lessThanOrEqualTo

**Signature**

```ts
export declare const lessThanOrEqualTo: <A extends number>(
  max: number,
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

## maxItems

**Signature**

```ts
export declare const maxItems: <A>(
  n: number,
  options?: AnnotationOptions<readonly A[]> | undefined
) => <I>(self: Schema<I, readonly A[]>) => Schema<I, readonly A[]>
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

## minItems

**Signature**

```ts
export declare const minItems: <A>(
  n: number,
  options?: AnnotationOptions<readonly A[]> | undefined
) => <I>(self: Schema<I, readonly A[]>) => Schema<I, readonly A[]>
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

## negativeBigint

**Signature**

```ts
export declare const negativeBigint: <A extends bigint>(
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

## nonNegativeBigint

**Signature**

```ts
export declare const nonNegativeBigint: <A extends bigint>(
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

## nonPositiveBigint

**Signature**

```ts
export declare const nonPositiveBigint: <A extends bigint>(
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

## positive

**Signature**

```ts
export declare const positive: <A extends number>(
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

## startsWith

**Signature**

```ts
export declare const startsWith: <A extends string>(
  startsWith: string,
  options?: AnnotationOptions<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
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

# model

## BrandSchema (interface)

**Signature**

```ts
export interface BrandSchema<From, To extends Brand<any>> extends Schema<From, To>, Brand.Constructor<To> {}
```

Added in v1.0.0

## Schema (interface)

**Signature**

```ts
export interface Schema<From, To = From> {
  readonly From: (_: From) => From
  readonly To: (_: To) => To
  readonly ast: AST.AST
}
```

Added in v1.0.0

# parsers

## chunk

**Signature**

```ts
export declare const chunk: <I, A>(item: Schema<I, A>) => Schema<readonly I[], Chunk<A>>
```

Added in v1.0.0

## clamp

Clamps a number between a minimum and a maximum value.

**Signature**

```ts
export declare const clamp: <A extends number>(min: number, max: number) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## clampBigint

Clamps a bigint between a minimum and a maximum value.

**Signature**

```ts
export declare const clampBigint: <A extends bigint>(
  min: bigint,
  max: bigint
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## data

**Signature**

```ts
export declare const data: <I, A extends readonly any[] | Readonly<Record<string, any>>>(
  item: Schema<I, A>
) => Schema<I, D.Data<A>>
```

Added in v1.0.0

## dateFromString

Transforms a `string` into a `Date` by parsing the string using `Date.parse`.

**Signature**

```ts
export declare const dateFromString: <I>(self: Schema<I, string>) => Schema<I, Date>
```

Added in v1.0.0

## either

**Signature**

```ts
export declare const either: <IE, E, IA, A>(
  left: Schema<IE, E>,
  right: Schema<IA, A>
) => Schema<
  { readonly _tag: 'Left'; readonly left: IE } | { readonly _tag: 'Right'; readonly right: IA },
  E.Either<E, A>
>
```

Added in v1.0.0

## numberFromString

Transforms a `string` into a `number` by parsing the string using `parseFloat`.

The following special string values are supported: "NaN", "Infinity", "-Infinity".

**Signature**

```ts
export declare const numberFromString: <I>(self: Schema<I, string>) => Schema<I, number>
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

## optionFromNullable

**Signature**

```ts
export declare const optionFromNullable: <I, A>(value: Schema<I, A>) => Schema<I | null | undefined, Option<A>>
```

Added in v1.0.0

## optionsFromOptionals

**Signature**

```ts
export declare const optionsFromOptionals: <Fields extends Record<string | number | symbol, Schema<any, any>>>(
  fields: Fields
) => <I, A extends object>(
  schema: Schema<I, A>
) => Schema<
  Spread<I & { readonly [K in keyof Fields]?: From<Fields[K]> | undefined }>,
  Spread<A & { readonly [K in keyof Fields]: Option<To<Fields[K]>> }>
>
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

## trim

The `trim` parser allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const trim: <I>(self: Schema<I, string>) => Schema<I, string>
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

# utils

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
}
```

Added in v1.0.0

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

## From (type alias)

**Signature**

```ts
export type From<S extends { readonly From: (_: any) => any }> = Parameters<S['From']>[0]
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

## Join (type alias)

**Signature**

```ts
export type Join<T> = T extends [infer Head, ...infer Tail]
  ? `${Head & (string | number | bigint | boolean | null | undefined)}${Tail extends [] ? '' : Join<Tail>}`
  : never
```

Added in v1.0.0

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

## MinItemsTypeId

**Signature**

```ts
export declare const MinItemsTypeId: '@effect/schema/MinItemsTypeId'
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

## OptionalKeys (type alias)

**Signature**

```ts
export type OptionalKeys<T> = {
  [K in keyof T]: T[K] extends OptionalSchema<any> ? K : never
}[keyof T]
```

Added in v1.0.0

## OptionalSchema (interface)

**Signature**

```ts
export interface OptionalSchema<From, To = From> {
  readonly From: (_: From) => From
  readonly To: (_: To) => To
  readonly _id: OptionalSchemaId
}
```

Added in v1.0.0

## OptionalSchemaId

**Signature**

```ts
export declare const OptionalSchemaId: typeof OptionalSchemaId
```

Added in v1.0.0

## OptionalSchemaId (type alias)

**Signature**

```ts
export type OptionalSchemaId = typeof OptionalSchemaId
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

## StartsWithTypeId

**Signature**

```ts
export declare const StartsWithTypeId: '@effect/schema/StartsWithTypeId'
```

Added in v1.0.0

## To (type alias)

**Signature**

```ts
export type To<S extends { readonly To: (_: any) => any }> = Parameters<S['To']>[0]
```

Added in v1.0.0

## ToAsserts

**Signature**

```ts
export declare const ToAsserts: P.ToAsserts<S>
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

## asserts

**Signature**

```ts
export declare const asserts: <A>(
  schema: Schema<A, A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => asserts input is A
```

Added in v1.0.0

## decode

**Signature**

```ts
export declare const decode: <I, A>(
  schema: Schema<I, A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => A
```

Added in v1.0.0

## decodeEither

**Signature**

```ts
export declare const decodeEither: <I, A>(
  schema: Schema<I, A>
) => (
  input: unknown,
  options?: AST.ParseOptions | undefined
) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], A>
```

Added in v1.0.0

## decodeOption

**Signature**

```ts
export declare const decodeOption: <I, A>(
  schema: Schema<I, A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

## encode

**Signature**

```ts
export declare const encode: <I, A>(schema: Schema<I, A>) => (a: A, options?: AST.ParseOptions | undefined) => I
```

Added in v1.0.0

## encodeEither

**Signature**

```ts
export declare const encodeEither: <I, A>(
  schema: Schema<I, A>
) => (a: A, options?: AST.ParseOptions | undefined) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], I>
```

Added in v1.0.0

## encodeOption

**Signature**

```ts
export declare const encodeOption: <I, A>(
  schema: Schema<I, A>
) => (input: A, options?: AST.ParseOptions | undefined) => Option<I>
```

Added in v1.0.0

## from

**Signature**

```ts
export declare const from: <I, A>(schema: Schema<I, A>) => Schema<I, I>
```

Added in v1.0.0

## getPropertySignatures

Returns an object containing all property signatures of a given schema.

```
Schema<A> -> { [K in keyof A]: Schema<A[K]> }
```

**Signature**

```ts
export declare const getPropertySignatures: <I extends Record<keyof A, any>, A>(
  schema: Schema<I, A>
) => { [K in keyof A]: Schema<I[K], A[K]> }
```

**Example**

```ts
import * as S from '@effect/schema/Schema'

const Person = S.struct({
  name: S.string,
  age: S.number,
})

const shape = S.getPropertySignatures(Person)

assert.deepStrictEqual(shape.name, S.string)
assert.deepStrictEqual(shape.age, S.number)
```

Added in v1.0.0

## is

**Signature**

```ts
export declare const is: <I, A>(
  schema: Schema<I, A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => input is A
```

Added in v1.0.0

## optional

**Signature**

```ts
export declare const optional: <I, A>(schema: Schema<I, A>) => OptionalSchema<I, A>
```

Added in v1.0.0

## reverse

**Signature**

```ts
export declare const reverse: <I, A>(schema: Schema<I, A>) => Schema<A, I>
```

Added in v1.0.0

## to

**Signature**

```ts
export declare const to: <I, A>(schema: Schema<I, A>) => Schema<A, A>
```

Added in v1.0.0

## validate

**Signature**

```ts
export declare const validate: <I, A>(
  schema: Schema<I, A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => A
```

Added in v1.0.0

## validateEither

**Signature**

```ts
export declare const validateEither: <I, A>(
  schema: Schema<I, A>
) => (
  input: unknown,
  options?: AST.ParseOptions | undefined
) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], A>
```

Added in v1.0.0

## validateOption

**Signature**

```ts
export declare const validateOption: <I, A>(
  schema: Schema<I, A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => Option<A>
```

Added in v1.0.0
