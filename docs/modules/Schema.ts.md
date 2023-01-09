---
title: Schema.ts
nav_order: 20
parent: Modules
---

## Schema overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [array](#array)
  - [element](#element)
  - [extend](#extend)
  - [field](#field)
  - [filter](#filter)
  - [keyof](#keyof)
  - [lazy](#lazy)
  - [nonEmptyArray](#nonemptyarray)
  - [nullable](#nullable)
  - [omit](#omit)
  - [optional](#optional)
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
  - [enums](#enums)
  - [literal](#literal)
  - [make](#make)
  - [templateLiteral](#templateliteral)
  - [uniqueSymbol](#uniquesymbol)
- [data](#data)
  - [json](#json)
  - [option](#option)
- [filters](#filters)
  - [endsWith](#endswith)
  - [finite](#finite)
  - [greaterThan](#greaterthan)
  - [greaterThanOrEqualTo](#greaterthanorequalto)
  - [includes](#includes)
  - [int](#int)
  - [length](#length)
  - [lessThan](#lessthan)
  - [lessThanOrEqualTo](#lessthanorequalto)
  - [maxLength](#maxlength)
  - [minLength](#minlength)
  - [nonEmpty](#nonempty)
  - [nonNaN](#nonnan)
  - [pattern](#pattern)
  - [startsWith](#startswith)
- [model](#model)
  - [Schema (interface)](#schema-interface)
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
- [symbol](#symbol-1)
  - [OptionalSchemaId](#optionalschemaid)
  - [OptionalSchemaId (type alias)](#optionalschemaid-type-alias)
- [utils](#utils)
  - [Infer (type alias)](#infer-type-alias)
  - [Join (type alias)](#join-type-alias)
  - [OptionalKeys (type alias)](#optionalkeys-type-alias)
  - [OptionalSchema (interface)](#optionalschema-interface)
  - [Spread (type alias)](#spread-type-alias)
  - [sensitive](#sensitive)

---

# combinators

## array

**Signature**

```ts
export declare const array: <A>(item: Schema<A>) => Schema<readonly A[]>
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

## field

**Signature**

```ts
export declare const field: <Key extends string | number | symbol, A, isOptional extends boolean>(
  key: Key,
  value: Schema<A>,
  isOptional: isOptional,
  annotations?: Record<string | symbol, unknown> | undefined
) => Schema<isOptional extends true ? { readonly [K in Key]?: A | undefined } : { readonly [K in Key]: A }>
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare const filter: <A, B extends A>(
  refinement: Refinement<A, B>,
  meta: unknown,
  annotations?: Record<string | symbol, unknown> | undefined
) => (self: Schema<A>) => Schema<B>
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
export declare const lazy: <A>(f: () => Schema<A>) => Schema<A>
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

## optional

**Signature**

```ts
export declare const optional: <A>(schema: Schema<A>) => OptionalSchema<A, true>
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
export declare const struct: <Fields extends Record<string | number | symbol, Schema<any>>>(
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

Creates a new schema that transforms values from one type to another using the provided functions.

**Signature**

```ts
export declare const transform: <A, B>(to: Schema<B>, f: (a: A) => B, g: (b: B) => A) => (self: Schema<A>) => Schema<B>
```

Added in v1.0.0

## transformOrFail

Combinator that creates a new Schema by transforming the input and output of an existing Schema using the provided decoding functions.

**Signature**

```ts
export declare const transformOrFail: <A, B>(
  to: Schema<B>,
  f: (i: A, options?: DecodeOptions | undefined) => These<readonly [DecodeError, ...DecodeError[]], B>,
  g: (i: B, options?: DecodeOptions | undefined) => These<readonly [DecodeError, ...DecodeError[]], A>
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

## enums

**Signature**

```ts
export declare const enums: <A extends { [x: string]: string | number }>(
  enums: A,
  annotations?: AST.Annotated['annotations']
) => Schema<A[keyof A]>
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

# data

## json

**Signature**

```ts
export declare const json: Schema<Json>
```

Added in v1.0.0

## option

**Signature**

```ts
export declare const option: <A>(value: Schema<A>) => Schema<Option<A>>
```

Added in v1.0.0

# filters

## endsWith

**Signature**

```ts
export declare const endsWith: (endsWith: string) => <A extends string>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## finite

**Signature**

```ts
export declare const finite: <A extends number>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThan

**Signature**

```ts
export declare const greaterThan: (min: number) => <A extends number>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThanOrEqualTo

**Signature**

```ts
export declare const greaterThanOrEqualTo: (min: number) => <A extends number>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## includes

**Signature**

```ts
export declare const includes: (searchString: string) => <A extends string>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## int

**Signature**

```ts
export declare const int: <A extends number>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## length

**Signature**

```ts
export declare const length: (length: number) => <A extends string>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThan

**Signature**

```ts
export declare const lessThan: (max: number) => <A extends number>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThanOrEqualTo

**Signature**

```ts
export declare const lessThanOrEqualTo: (max: number) => <A extends number>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: (maxLength: number) => <A extends string>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: (minLength: number) => <A extends string>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonEmpty

**Signature**

```ts
export declare const nonEmpty: <A extends string>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonNaN

**Signature**

```ts
export declare const nonNaN: <A extends number>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## pattern

**Signature**

```ts
export declare const pattern: (
  regex: RegExp,
  meta?: object | undefined,
  annotations?: Record<string | symbol, unknown> | undefined
) => <A extends string>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## startsWith

**Signature**

```ts
export declare const startsWith: (startsWith: string) => <A extends string>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

# model

## Schema (interface)

**Signature**

```ts
export interface Schema<A> {
  readonly A: (_: A) => A
  readonly ast: AST.AST
}
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

# symbol

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

# utils

## Infer (type alias)

**Signature**

```ts
export type Infer<S extends Schema<any>> = Parameters<S['A']>[0]
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

## OptionalKeys (type alias)

**Signature**

```ts
export type OptionalKeys<T> = {
  [K in keyof T]: T[K] extends OptionalSchema<any, true> ? K : never
}[keyof T]
```

Added in v1.0.0

## OptionalSchema (interface)

**Signature**

```ts
export interface OptionalSchema<A, isOptional extends boolean> extends Schema<A>, AST.Annotated {
  readonly _id: OptionalSchemaId
  readonly isOptional: isOptional
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

## sensitive

**Signature**

```ts
export declare const sensitive: <A>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0
