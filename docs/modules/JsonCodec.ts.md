---
title: JsonCodec.ts
nav_order: 32
parent: Modules
---

## JsonCodec overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Infer](#infer)
  - [JsonCodec (interface)](#jsoncodec-interface)
  - [Spread (type alias)](#spread-type-alias)
  - [UnknownObject](#unknownobject)
  - [any](#any)
  - [array](#array)
  - [bigint](#bigint)
  - [boolean](#boolean)
  - [chunk](#chunk)
  - [extend](#extend)
  - [filter](#filter)
  - [filterWith](#filterwith)
  - [json](#json)
  - [jsonArray](#jsonarray)
  - [jsonCodecFor](#jsoncodecfor)
  - [jsonObject](#jsonobject)
  - [keyof](#keyof)
  - [literal](#literal)
  - [make](#make)
  - [max](#max)
  - [maxLength](#maxlength)
  - [min](#min)
  - [minLength](#minlength)
  - [nativeEnum](#nativeenum)
  - [never](#never)
  - [nonEmptyArray](#nonemptyarray)
  - [number](#number)
  - [omit](#omit)
  - [option](#option)
  - [partial](#partial)
  - [pick](#pick)
  - [provideJsonCodecFor](#providejsoncodecfor)
  - [readonlySet](#readonlyset)
  - [refine](#refine)
  - [string](#string)
  - [stringIndexSignature](#stringindexsignature)
  - [struct](#struct)
  - [symbolIndexSignature](#symbolindexsignature)
  - [tuple](#tuple)
  - [union](#union)
  - [unknown](#unknown)
  - [unknownArray](#unknownarray)
  - [withRest](#withrest)

---

# utils

## Infer

**Signature**

```ts
export declare const Infer: any
```

Added in v1.0.0

## JsonCodec (interface)

**Signature**

```ts
export interface JsonCodec<
```

Added in v1.0.0

## Spread (type alias)

**Signature**

```ts
export type Spread<K> = {
  [k in keyof K]: K[k]
} extends infer A
  ? A
  : never
```

Added in v1.0.0

## UnknownObject

**Signature**

```ts
export declare const UnknownObject: any
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
export declare const chunk: <A>(value: any) => any
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

## jsonCodecFor

**Signature**

```ts
export declare const jsonCodecFor: <A>(schema: any) => any
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

## literal

**Signature**

```ts
export declare const literal: <A extends readonly (string | number | boolean | null | undefined)[]>(...a: A) => any
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <A>(schema: any, decode: any, encode: any, is: any, arbitrary: any, pretty: any) => any
```

Added in v1.0.0

## max

**Signature**

```ts
export declare const max: (max: number) => <A extends number>(self: any) => any
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: (maxLength: number) => <A extends { length: number }>(self: any) => any
```

Added in v1.0.0

## min

**Signature**

```ts
export declare const min: (min: number) => <A extends number>(self: any) => any
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

## provideJsonCodecFor

**Signature**

```ts
export declare const provideJsonCodecFor: (provider: Provider) => <A>(schema: any) => any
```

Added in v1.0.0

## readonlySet

**Signature**

```ts
export declare const readonlySet: <A>(schema: any) => any
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
  <Fields extends Record<string | number | symbol, any>>(fields: Fields): any
  <Fields extends Record<string | number | symbol, any>, Partial extends Record<string | number | symbol, any>>(
    fields: Fields,
    partial: Partial
  ): any
}
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

## withRest

**Signature**

```ts
export declare const withRest: <R>(rest: any) => <A extends readonly any[]>(self: any) => any
```

Added in v1.0.0
