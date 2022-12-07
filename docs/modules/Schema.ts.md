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
  - [restElement](#restelement)
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

## chunk

**Signature**

```ts
export declare const chunk: <A>(item: Schema<A>) => Schema<Chunk<A>>
```

Added in v1.0.0

## clone

**Signature**

```ts
export declare const clone: (id: symbol, interpreters: Record<symbol, Function>) => <A>(schema: Schema<A>) => Schema<A>
```

Added in v1.0.0

## declare

**Signature**

```ts
export declare const declare: <Schemas extends readonly Schema<any>[]>(
  id: symbol,
  config: Option<unknown>,
  provider: Provider,
  ...schemas: Schemas
) => Schema<any>
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
export declare const filter: <A>(
  id: symbol,
  decode: (i: A) => These<readonly [DecodeError, ...DecodeError[]], A>
) => (schema: Schema<A>) => Schema<A>
```

Added in v1.0.0

## filterWith

**Signature**

```ts
export declare const filterWith: <Config, A>(
  id: symbol,
  decode: (config: Config) => (i: A) => These<readonly [DecodeError, ...DecodeError[]], A>
) => (config: Config) => (schema: Schema<A>) => Schema<A>
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

## jsonArray

**Signature**

```ts
export declare const jsonArray: Schema<JsonArray>
```

Added in v1.0.0

## jsonObject

**Signature**

```ts
export declare const jsonObject: Schema<JsonObject>
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

## list

**Signature**

```ts
export declare const list: <A>(item: Schema<A>) => Schema<List<A>>
```

Added in v1.0.0

## literal

**Signature**

```ts
export declare const literal: <A extends readonly (string | number | boolean | null | undefined)[]>(
  ...a: A
) => Schema<A[number]>
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

## nativeEnum

**Signature**

```ts
export declare const nativeEnum: <A extends { [_: string]: string | number }>(nativeEnum: A) => Schema<A>
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

## of

**Signature**

```ts
export declare const of: <A>(value: A) => Schema<A>
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

## readonlySet

**Signature**

```ts
export declare const readonlySet: <A>(item: Schema<A>) => Schema<ReadonlySet<A>>
```

Added in v1.0.0

## refine

**Signature**

```ts
export declare const refine: <A, B extends A>(
  id: symbol,
  decode: (i: A) => These<readonly [DecodeError, ...DecodeError[]], B>
) => (schema: Schema<A>) => Schema<B>
```

Added in v1.0.0

## restElement

**Signature**

```ts
export declare const restElement: <R>(
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
export declare const stringIndexSignature: <A>(value: Schema<A>) => Schema<{ readonly [_: string]: A }>
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: {
  <Required extends Record<string | number | symbol, Schema<any>>>(required: Required): Schema<{
    readonly [K in keyof Required]: Infer<Required[K]>
  }>
  <
    Required extends Record<string | number | symbol, Schema<any>>,
    Optional extends Record<string | number | symbol, Schema<any>>
  >(
    required: Required,
    optional: Optional
  ): Schema<
    Spread<
      { readonly [K in keyof Required]: Infer<Required[K]> } & {
        readonly [K in keyof Optional]?: Infer<Optional[K]> | undefined
      }
    >
  >
}
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
export declare const tuple: <Components extends readonly Schema<any>[]>(
  ...components: Components
) => Schema<{ readonly [K in keyof Components]: Infer<Components[K]> }>
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

## unknown

**Signature**

```ts
export declare const unknown: Schema<unknown>
```

Added in v1.0.0

## unknownArray

**Signature**

```ts
export declare const unknownArray: Schema<DataUnknownArray.UnknownArray>
```

Added in v1.0.0

## unknownObject

**Signature**

```ts
export declare const unknownObject: Schema<UnknownObject>
```

Added in v1.0.0
