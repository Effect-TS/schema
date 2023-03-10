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
  - [transformOrFail](#transformorfail)
  - [tuple](#tuple)
  - [typeAlias](#typealias)
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
  - [GreaterThanBigintTypeId](#greaterthanbiginttypeid)
  - [GreaterThanOrEqualToBigintTypeId](#greaterthanorequaltobiginttypeid)
  - [GreaterThanOrEqualToTypeId](#greaterthanorequaltotypeid)
  - [GreaterThanTypeId](#greaterthantypeid)
  - [IncludesTypeId](#includestypeid)
  - [Infer (type alias)](#infer-type-alias)
  - [InferAsserts](#inferasserts)
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
  - [TrimmedTypeId](#trimmedtypeid)
  - [UUIDTypeId](#uuidtypeid)
  - [asserts](#asserts)
  - [decode](#decode)
  - [decodeOrThrow](#decodeorthrow)
  - [encode](#encode)
  - [encodeOrThrow](#encodeorthrow)
  - [getOption](#getoption)
  - [getPropertySignatures](#getpropertysignatures)
  - [is](#is)
  - [optional](#optional)

---

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

## attachPropertySignature

Attaches a property signature with the specified key and value to the schema.
This API is useful when you want to add a property to your schema which doesn't describe the shape of the input,
but rather maps to another schema, for example when you want to add a discriminant to a simple union.

**Signature**

```ts
export declare const attachPropertySignature: <K extends string | number | symbol, V extends AST.LiteralValue>(
  key: K,
  value: V
) => <A extends object>(schema: Schema<A>) => Schema<Spread<A & { readonly [k in K]: V }>>
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

assert.deepStrictEqual(S.decodeOrThrow(Shape)({ radius: 10 }), {
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
) => (self: Schema<A>) => BrandSchema<any>
```

**Example**

```ts
import * as S from '@effect/schema/Schema'
import { pipe } from '@effect/data/Function'

const Int = pipe(S.number, S.int(), S.brand('Int'))
type Int = S.Infer<typeof Int> // number & Brand<"Int">
```

Added in v1.0.0

## dataFromSelf

**Signature**

```ts
export declare const dataFromSelf: <A extends readonly any[] | Readonly<Record<string, any>>>(
  item: Schema<A>
) => Schema<D.Data<A>>
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
export declare const extend: <B>(that: Schema<B>) => <A>(self: Schema<A>) => Schema<Spread<A & B>>
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare function filter<A, B extends A>(
  refinement: Refinement<A, B>,
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<B>
export declare function filter<A>(
  predicate: Predicate<A>,
  options?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## fromBrand

**Signature**

```ts
export declare const fromBrand: <C extends any>(
  constructor: any,
  annotationOptions?: AnnotationOptions<any> | undefined
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
export declare const lazy: <A>(
  f: () => Schema<A>,
  annotations?: Record<string | symbol, unknown> | undefined
) => Schema<A>
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
) => (self: Schema<A>) => Schema<{ readonly [P in Exclude<keyof A, Keys[number]>]: A[P] }>
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
export declare const partial: <A>(self: Schema<A>) => Schema<Partial<A>>
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => (self: Schema<A>) => Schema<{ readonly [P in Keys[number]]: A[P] }>
```

Added in v1.0.0

## record

**Signature**

```ts
export declare const record: <K extends string | symbol, V>(
  key: Schema<K>,
  value: Schema<V>
) => Schema<{ readonly [k in K]: V }>
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
export declare const struct: <Fields extends Record<string | number | symbol, Schema<any> | OptionalSchema<any>>>(
  fields: Fields
) => Schema<
  Spread<
    { readonly [K in Exclude<keyof Fields, OptionalKeys<Fields>>]: Infer<Fields[K]> } & {
      readonly [K in OptionalKeys<Fields>]?: Infer<Fields[K]> | undefined
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
export declare const transform: <A, B>(
  to: Schema<B>,
  ab: (a: A) => B,
  ba: (b: B) => A
) => (self: Schema<A>) => Schema<B>
```

Added in v1.0.0

## transformOrFail

Create a new `Schema` by transforming the input and output of an existing `Schema`
using the provided decoding functions.

**Signature**

```ts
export declare const transformOrFail: <A, B>(
  to: Schema<B>,
  decode: (
    input: A,
    options?: AST.ParseOptions | undefined
  ) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], B>,
  encode: (
    input: B,
    options?: AST.ParseOptions | undefined
  ) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], A>
) => (self: Schema<A>) => Schema<B>
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <Elements extends readonly Schema<any>[]>(
  ...elements: Elements
) => Schema<{ readonly [K in keyof Elements]: Infer<Elements[K]> }>
```

Added in v1.0.0

## typeAlias

**Signature**

```ts
export declare const typeAlias: (
  typeParameters: ReadonlyArray<Schema<any>>,
  type: Schema<any>,
  annotations?: Record<string | symbol, unknown> | undefined
) => Schema<any>
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: <Members extends readonly Schema<any>[]>(
  ...members: Members
) => Schema<Infer<Members[number]>>
```

Added in v1.0.0

# constructors

## UUID

**Signature**

```ts
export declare const UUID: Schema<string>
```

Added in v1.0.0

## chunkFromSelf

**Signature**

```ts
export declare const chunkFromSelf: <A>(item: Schema<A>) => Schema<Chunk<A>>
```

Added in v1.0.0

## date

**Signature**

```ts
export declare const date: Schema<Date>
```

Added in v1.0.0

## eitherFromSelf

**Signature**

```ts
export declare const eitherFromSelf: <E, A>(left: Schema<E>, right: Schema<A>) => Schema<E.Either<E, A>>
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

## json

**Signature**

```ts
export declare const json: Schema<Json>
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

## optionFromSelf

**Signature**

```ts
export declare const optionFromSelf: <A>(value: Schema<A>) => Schema<Option<A>>
```

Added in v1.0.0

## readonlyMapFromSelf

**Signature**

```ts
export declare const readonlyMapFromSelf: <K, V>(key: Schema<K>, value: Schema<V>) => Schema<ReadonlyMap<K, V>>
```

Added in v1.0.0

## readonlySetFromSelf

**Signature**

```ts
export declare const readonlySetFromSelf: <A>(item: Schema<A>) => Schema<ReadonlySet<A>>
```

Added in v1.0.0

## templateLiteral

**Signature**

```ts
export declare const templateLiteral: <T extends [Schema<any>, ...Schema<any>[]]>(
  ...[head, ...tail]: T
) => Schema<Join<{ [K in keyof T]: Infer<T[K]> }>>
```

Added in v1.0.0

## uniqueSymbol

**Signature**

```ts
export declare const uniqueSymbol: <S extends symbol>(
  symbol: S,
  annotations?: Record<string | symbol, unknown> | undefined
) => Schema<S>
```

Added in v1.0.0

# filters

## between

**Signature**

```ts
export declare const between: <A extends number>(
  min: number,
  max: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## betweenBigint

**Signature**

```ts
export declare const betweenBigint: <A extends bigint>(
  min: bigint,
  max: bigint,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## endsWith

**Signature**

```ts
export declare const endsWith: <A extends string>(
  endsWith: string,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## finite

**Signature**

```ts
export declare const finite: <A extends number>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThan

**Signature**

```ts
export declare const greaterThan: <A extends number>(
  min: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThanBigint

**Signature**

```ts
export declare const greaterThanBigint: <A extends bigint>(
  min: bigint,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThanOrEqualTo

**Signature**

```ts
export declare const greaterThanOrEqualTo: <A extends number>(
  min: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThanOrEqualToBigint

**Signature**

```ts
export declare const greaterThanOrEqualToBigint: <A extends bigint>(
  min: bigint,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## includes

**Signature**

```ts
export declare const includes: <A extends string>(
  searchString: string,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## int

**Signature**

```ts
export declare const int: <A extends number>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## itemsCount

**Signature**

```ts
export declare const itemsCount: <A>(
  n: number,
  annotationOptions?: AnnotationOptions<readonly A[]> | undefined
) => (self: Schema<readonly A[]>) => Schema<readonly A[]>
```

Added in v1.0.0

## length

**Signature**

```ts
export declare const length: <A extends string>(
  length: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThan

**Signature**

```ts
export declare const lessThan: <A extends number>(
  max: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThanBigint

**Signature**

```ts
export declare const lessThanBigint: <A extends bigint>(
  max: bigint,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThanOrEqualTo

**Signature**

```ts
export declare const lessThanOrEqualTo: <A extends number>(
  max: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThanOrEqualToBigint

**Signature**

```ts
export declare const lessThanOrEqualToBigint: <A extends bigint>(
  max: bigint,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## maxItems

**Signature**

```ts
export declare const maxItems: <A>(
  n: number,
  annotationOptions?: AnnotationOptions<readonly A[]> | undefined
) => (self: Schema<readonly A[]>) => Schema<readonly A[]>
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: <A extends string>(
  maxLength: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## minItems

**Signature**

```ts
export declare const minItems: <A>(
  n: number,
  annotationOptions?: AnnotationOptions<readonly A[]> | undefined
) => (self: Schema<readonly A[]>) => Schema<readonly A[]>
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: <A extends string>(
  minLength: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## multipleOf

**Signature**

```ts
export declare const multipleOf: <A extends number>(
  divisor: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## negative

**Signature**

```ts
export declare const negative: <A extends number>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## negativeBigint

**Signature**

```ts
export declare const negativeBigint: <A extends bigint>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonEmpty

**Signature**

```ts
export declare const nonEmpty: <A extends string>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonNaN

**Signature**

```ts
export declare const nonNaN: <A extends number>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonNegative

**Signature**

```ts
export declare const nonNegative: <A extends number>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonNegativeBigint

**Signature**

```ts
export declare const nonNegativeBigint: <A extends bigint>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonPositive

**Signature**

```ts
export declare const nonPositive: <A extends number>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonPositiveBigint

**Signature**

```ts
export declare const nonPositiveBigint: <A extends bigint>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## pattern

**Signature**

```ts
export declare const pattern: <A extends string>(
  regex: RegExp,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## positive

**Signature**

```ts
export declare const positive: <A extends number>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## positiveBigint

**Signature**

```ts
export declare const positiveBigint: <A extends bigint>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## startsWith

**Signature**

```ts
export declare const startsWith: <A extends string>(
  startsWith: string,
  annotationOptions?: AnnotationOptions<A> | undefined
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
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

# model

## BrandSchema (interface)

**Signature**

```ts
export interface BrandSchema<A extends Brand<any>> extends Schema<A>, Brand.Constructor<A> {}
```

Added in v1.0.0

## Schema (interface)

**Signature**

```ts
export interface Schema<A> {
  readonly A: (_: A) => A
  readonly ast: AST.AST
}
```

Added in v1.0.0

# parsers

## chunk

**Signature**

```ts
export declare const chunk: <A>(item: Schema<A>) => Schema<Chunk<A>>
```

Added in v1.0.0

## clamp

Clamps a number between a minimum and a maximum value.

**Signature**

```ts
export declare const clamp: <A extends number>(min: number, max: number) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## clampBigint

Clamps a bigint between a minimum and a maximum value.

**Signature**

```ts
export declare const clampBigint: <A extends bigint>(min: bigint, max: bigint) => (self: Schema<A>) => Schema<A>
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

## dateFromString

Transforms a `string` into a `Date` by parsing the string using `Date.parse`.

**Signature**

```ts
export declare const dateFromString: (self: Schema<string>) => Schema<Date>
```

Added in v1.0.0

## numberFromString

Transforms a `string` into a `number` by parsing the string using `parseFloat`.

The following special string values are supported: "NaN", "Infinity", "-Infinity".

**Signature**

```ts
export declare const numberFromString: (self: Schema<string>) => Schema<number>
```

Added in v1.0.0

## option

**Signature**

```ts
export declare const option: <A>(value: Schema<A>) => Schema<Option<A>>
```

Added in v1.0.0

## optionFromNullable

**Signature**

```ts
export declare const optionFromNullable: <A>(value: Schema<A>) => Schema<Option<A>>
```

Added in v1.0.0

## optionsFromOptionals

**Signature**

```ts
export declare const optionsFromOptionals: <Fields extends Record<string | number | symbol, Schema<any>>>(
  fields: Fields
) => <A extends object>(
  schema: Schema<A>
) => Schema<Spread<A & { readonly [K in keyof Fields]: Option<Infer<Fields[K]>> }>>
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

## trim

The `trim` parser allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const trim: (self: Schema<string>) => Schema<string>
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

## Infer (type alias)

**Signature**

```ts
export type Infer<S extends { readonly A: (_: any) => any }> = Parameters<S['A']>[0]
```

Added in v1.0.0

## InferAsserts

**Signature**

```ts
export declare const InferAsserts: P.InferAsserts<S>
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
export interface OptionalSchema<A> {
  readonly A: (_: A) => A
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
  schema: Schema<A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => asserts input is A
```

Added in v1.0.0

## decode

**Signature**

```ts
export declare const decode: <A>(
  schema: Schema<A>
) => (
  input: unknown,
  options?: AST.ParseOptions | undefined
) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], A>
```

Added in v1.0.0

## decodeOrThrow

**Signature**

```ts
export declare const decodeOrThrow: <A>(
  schema: Schema<A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => A
```

Added in v1.0.0

## encode

**Signature**

```ts
export declare const encode: <A>(
  schema: Schema<A>
) => (a: A, options?: AST.ParseOptions | undefined) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], unknown>
```

Added in v1.0.0

## encodeOrThrow

**Signature**

```ts
export declare const encodeOrThrow: <A>(schema: Schema<A>) => (a: A, options?: AST.ParseOptions | undefined) => unknown
```

Added in v1.0.0

## getOption

**Signature**

```ts
export declare const getOption: <A>(
  schema: Schema<A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

## getPropertySignatures

Returns an object containing all property signatures of a given schema.

```
Schema<A> -> { [K in keyof A]: Schema<A[K]> }
```

**Signature**

```ts
export declare const getPropertySignatures: <A>(schema: Schema<A>) => { [K in keyof A]: Schema<A[K]> }
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
export declare const is: <A>(
  schema: Schema<A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => input is A
```

Added in v1.0.0

## optional

**Signature**

```ts
export declare const optional: <A>(schema: Schema<A>) => OptionalSchema<A>
```

Added in v1.0.0
