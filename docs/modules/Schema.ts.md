---
title: Schema.ts
nav_order: 40
parent: Modules
---

## Schema overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Infer (type alias)](#infer-type-alias)
  - [Schema (interface)](#schema-interface)
  - [Spread (type alias)](#spread-type-alias)
  - [any](#any)
  - [array](#array)
  - [bigint](#bigint)
  - [boolean](#boolean)
  - [chunk](#chunk)
  - [clone](#clone)
  - [declare](#declare)
  - [extend](#extend)
  - [filter](#filter)
  - [filterWith](#filterwith)
  - [greaterThan](#greaterthan)
  - [greaterThanOrEqualTo](#greaterthanorequalto)
  - [int](#int)
  - [json](#json)
  - [jsonArray](#jsonarray)
  - [jsonObject](#jsonobject)
  - [keyof](#keyof)
  - [lazy](#lazy)
  - [lessThan](#lessthan)
  - [lessThanOrEqualTo](#lessthanorequalto)
  - [list](#list)
  - [literal](#literal)
  - [make](#make)
  - [maxLength](#maxlength)
  - [minLength](#minlength)
  - [nativeEnum](#nativeenum)
  - [never](#never)
  - [nonEmptyArray](#nonemptyarray)
  - [number](#number)
  - [of](#of)
  - [omit](#omit)
  - [option](#option)
  - [partial](#partial)
  - [pick](#pick)
  - [readonlySet](#readonlyset)
  - [refine](#refine)
  - [string](#string)
  - [stringIndexSignature](#stringindexsignature)
  - [struct](#struct)
  - [symbol](#symbol)
  - [symbolIndexSignature](#symbolindexsignature)
  - [tuple](#tuple)
  - [union](#union)
  - [unknown](#unknown)
  - [unknownArray](#unknownarray)
  - [unknownObject](#unknownobject)
  - [withRest](#withrest)

---

# utils

## Infer (type alias)

**Signature**

```ts
export type Infer<S extends Schema<any>> = Parameters<S['A']>[0]
```

Added in v1.0.0

## Schema (interface)

**Signature**

```ts
export interface Schema<
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

## any

**Signature**

```ts
export declare const any: any
```

Added in v1.0.0

## array

**Signature**

```ts
export declare const array: <A>(item: any) => any
```

Added in v1.0.0

## bigint

**Signature**

```ts
export declare const bigint: any
```

Added in v1.0.0

## boolean

**Signature**

```ts
export declare const boolean: any
```

Added in v1.0.0

## chunk

**Signature**

```ts
export declare const chunk: <A>(item: any) => any
```

Added in v1.0.0

## clone

**Signature**

```ts
export declare const clone: (id: symbol, interpreters: Record<symbol, Function>) => <A>(schema: any) => any
```

Added in v1.0.0

## declare

**Signature**

```ts
export declare const declare: <Schemas extends readonly any[]>(
  id: symbol,
  config: Option<unknown>,
  provider: Provider,
  ...schemas: Schemas
) => any
```

Added in v1.0.0

## extend

**Signature**

```ts
export declare const extend: <B>(that: any) => <A>(self: any) => any
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare const filter: <A>(id: symbol, decode: any) => (schema: any) => any
```

Added in v1.0.0

## filterWith

**Signature**

```ts
export declare const filterWith: <Config, A>(
  id: symbol,
  decode: (config: Config) => any
) => (config: Config) => (schema: any) => any
```

Added in v1.0.0

## greaterThan

**Signature**

```ts
export declare const greaterThan: (min: number) => <A extends number>(self: any) => any
```

Added in v1.0.0

## greaterThanOrEqualTo

**Signature**

```ts
export declare const greaterThanOrEqualTo: (min: number) => <A extends number>(self: any) => any
```

Added in v1.0.0

## int

**Signature**

```ts
export declare const int: <A extends number>(self: any) => any
```

Added in v1.0.0

## json

**Signature**

```ts
export declare const json: any
```

Added in v1.0.0

## jsonArray

**Signature**

```ts
export declare const jsonArray: any
```

Added in v1.0.0

## jsonObject

**Signature**

```ts
export declare const jsonObject: any
```

Added in v1.0.0

## keyof

**Signature**

```ts
export declare const keyof: <A>(schema: any) => any
```

Added in v1.0.0

## lazy

**Signature**

```ts
export declare const lazy: <A>(f: () => any) => any
```

Added in v1.0.0

## lessThan

**Signature**

```ts
export declare const lessThan: (max: number) => <A extends number>(self: any) => any
```

Added in v1.0.0

## lessThanOrEqualTo

**Signature**

```ts
export declare const lessThanOrEqualTo: (max: number) => <A extends number>(self: any) => any
```

Added in v1.0.0

## list

**Signature**

```ts
export declare const list: <A>(item: any) => any
```

Added in v1.0.0

## literal

**Signature**

```ts
export declare const literal: <A extends readonly (string | number | boolean | null | undefined)[]>(...a: A) => any
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <A>(ast: AST.AST) => any
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: (maxLength: number) => <A extends { length: number }>(self: any) => any
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: (minLength: number) => <A extends { length: number }>(self: any) => any
```

Added in v1.0.0

## nativeEnum

**Signature**

```ts
export declare const nativeEnum: <A extends { [_: string]: string | number }>(nativeEnum: A) => any
```

Added in v1.0.0

## never

**Signature**

```ts
export declare const never: any
```

Added in v1.0.0

## nonEmptyArray

**Signature**

```ts
export declare const nonEmptyArray: <A>(item: any) => any
```

Added in v1.0.0

## number

**Signature**

```ts
export declare const number: any
```

Added in v1.0.0

## of

**Signature**

```ts
export declare const of: <A>(value: A) => any
```

Added in v1.0.0

## omit

**Signature**

```ts
export declare const omit: <A, Keys extends readonly (keyof A)[]>(...keys: Keys) => (self: any) => any
```

Added in v1.0.0

## option

**Signature**

```ts
export declare const option: <A>(value: any) => any
```

Added in v1.0.0

## partial

**Signature**

```ts
export declare const partial: <A>(self: any) => any
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: <A, Keys extends readonly (keyof A)[]>(...keys: Keys) => (self: any) => any
```

Added in v1.0.0

## readonlySet

**Signature**

```ts
export declare const readonlySet: <A>(item: any) => any
```

Added in v1.0.0

## refine

**Signature**

```ts
export declare const refine: <A, B extends A>(id: symbol, decode: any) => (schema: any) => any
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: any
```

Added in v1.0.0

## stringIndexSignature

**Signature**

```ts
export declare const stringIndexSignature: <A>(value: any) => any
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: {
  <Required extends Record<string | number | symbol, any>>(required: Required): any
  <Required extends Record<string | number | symbol, any>, Optional extends Record<string | number | symbol, any>>(
    required: Required,
    optional: Optional
  ): any
}
```

Added in v1.0.0

## symbol

**Signature**

```ts
export declare const symbol: any
```

Added in v1.0.0

## symbolIndexSignature

**Signature**

```ts
export declare const symbolIndexSignature: <A>(value: any) => any
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <Components extends readonly any[]>(...components: Components) => any
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: <Members extends readonly any[]>(...members: Members) => any
```

Added in v1.0.0

## unknown

**Signature**

```ts
export declare const unknown: any
```

Added in v1.0.0

## unknownArray

**Signature**

```ts
export declare const unknownArray: any
```

Added in v1.0.0

## unknownObject

**Signature**

```ts
export declare const unknownObject: any
```

Added in v1.0.0

## withRest

**Signature**

```ts
export declare const withRest: <R>(rest: any) => <A extends readonly any[]>(self: any) => any
```

Added in v1.0.0
