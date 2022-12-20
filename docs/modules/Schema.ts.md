---
title: Schema.ts
nav_order: 31
parent: Modules
---

## Schema overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [symbol](#symbol)
  - [FieldSchemaId (type alias)](#fieldschemaid-type-alias)
- [utils](#utils)
  - [Infer (type alias)](#infer-type-alias)
  - [OptionalKeys (type alias)](#optionalkeys-type-alias)
  - [OptionalSchema (interface)](#optionalschema-interface)
  - [Schema (interface)](#schema-interface)
  - [Spread (type alias)](#spread-type-alias)
  - [annotation](#annotation)
  - [annotations](#annotations)
  - [any](#any)
  - [array](#array)
  - [bigint](#bigint)
  - [boolean](#boolean)
  - [element](#element)
  - [enums](#enums)
  - [extend](#extend)
  - [filter](#filter)
  - [greaterThan](#greaterthan)
  - [greaterThanOrEqualTo](#greaterthanorequalto)
  - [int](#int)
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
  - [symbol](#symbol-1)
  - [symbolIndexSignature](#symbolindexsignature)
  - [tuple](#tuple)
  - [undefined](#undefined)
  - [union](#union)
  - [uniqueSymbol](#uniquesymbol)
  - [unknown](#unknown)
  - [void](#void)

---

# symbol

## FieldSchemaId (type alias)

**Signature**

```ts
export type FieldSchemaId = typeof I.FieldSchemaId
```

Added in v1.0.0

# utils

## Infer (type alias)

**Signature**

```ts
export type Infer<S extends Schema<any>> = Parameters<S['A']>[0]
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
  readonly _id: FieldSchemaId
  readonly isOptional: isOptional
}
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

## annotation

**Signature**

```ts
export declare const annotation: (annotation: unknown) => <A>(schema: Schema<A>) => Schema<A>
```

Added in v1.0.0

## annotations

**Signature**

```ts
export declare const annotations: (annotations: ReadonlyArray<unknown>) => <A>(schema: Schema<A>) => Schema<A>
```

Added in v1.0.0

## any

**Signature**

```ts
export declare const any: Schema<any>
```

Added in v1.0.0

## array

**Signature**

```ts
export declare const array: <A>(item: Schema<A>) => Schema<readonly A[]>
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

## element

**Signature**

```ts
export declare const element: <E>(
  element: Schema<E>
) => <A extends readonly any[]>(self: Schema<A>) => Schema<readonly [...A, E]>
```

Added in v1.0.0

## enums

**Signature**

```ts
export declare const enums: <A extends { [x: string]: string | number }>(enums: A) => Schema<A[keyof A]>
```

Added in v1.0.0

## extend

**Signature**

```ts
export declare const extend: <B>(that: Schema<B>) => <A>(self: Schema<A>) => Schema<A & B>
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare const filter: <A, B extends A>(
  decode: (i: A) => These<readonly [DecodeError, ...DecodeError[]], B>,
  annotations: ReadonlyArray<unknown>
) => (self: Schema<A>) => Schema<B>
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

## int

**Signature**

```ts
export declare const int: <A extends number>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## json

**Signature**

```ts
export declare const json: Schema<Json>
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

## literal

**Signature**

```ts
export declare const literal: <Literals extends readonly AST.Literal[]>(
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

## maxLength

**Signature**

```ts
export declare const maxLength: (maxLength: number) => <A extends { length: number }>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: (minLength: number) => <A extends { length: number }>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## never

**Signature**

```ts
export declare const never: Schema<never>
```

Added in v1.0.0

## nonEmptyArray

**Signature**

```ts
export declare const nonEmptyArray: <A>(item: Schema<A>) => Schema<readonly [A, ...A[]]>
```

Added in v1.0.0

## number

**Signature**

```ts
export declare const number: Schema<number>
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

## option

**Signature**

```ts
export declare const option: <A>(value: Schema<A>) => Schema<Option<A>>
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

## parse

**Signature**

```ts
export declare const parse: <A, B>(decode: (i: A) => These<readonly [DecodeError, ...DecodeError[]], B>, encode: (value: B) => A, is: (u: unknown) => u is B, arbitrary: (fc: typeof  => Arbitrary<B>, pretty: (a: B) => string, annotations: ReadonlyArray<unknown>) => (self: Schema<A>) => Schema<B>
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

## rest

**Signature**

```ts
export declare const rest: <R>(
  rest: Schema<R>
) => <A extends readonly any[]>(self: Schema<A>) => Schema<readonly [...A, ...R[]]>
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: Schema<string>
```

Added in v1.0.0

## stringIndexSignature

**Signature**

```ts
export declare const stringIndexSignature: <A>(value: Schema<A>) => Schema<{ readonly [x: string]: A }>
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

## symbol

**Signature**

```ts
export declare const symbol: Schema<symbol>
```

Added in v1.0.0

## symbolIndexSignature

**Signature**

```ts
export declare const symbolIndexSignature: <A>(value: Schema<A>) => Schema<{}>
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

## undefined

**Signature**

```ts
export declare const undefined: Schema<undefined>
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

## uniqueSymbol

**Signature**

```ts
export declare const uniqueSymbol: <S extends symbol>(symbol: S) => Schema<S>
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
