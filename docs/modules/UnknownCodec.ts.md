---
title: UnknownCodec.ts
nav_order: 38
parent: Modules
---

## UnknownCodec overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Infer](#infer)
  - [UnknownCodec (interface)](#unknowncodec-interface)
  - [array](#array)
  - [boolean](#boolean)
  - [extend](#extend)
  - [keyof](#keyof)
  - [literal](#literal)
  - [make](#make)
  - [nativeEnum](#nativeenum)
  - [nonEmptyArray](#nonemptyarray)
  - [number](#number)
  - [omit](#omit)
  - [partial](#partial)
  - [pick](#pick)
  - [provideUnknownCodecFor](#provideunknowncodecfor)
  - [string](#string)
  - [stringIndexSignature](#stringindexsignature)
  - [struct](#struct)
  - [symbolIndexSignature](#symbolindexsignature)
  - [tuple](#tuple)
  - [union](#union)
  - [unknownCodecFor](#unknowncodecfor)
  - [withRest](#withrest)

---

# utils

## Infer

**Signature**

```ts
export declare const Infer: any
```

Added in v1.0.0

## UnknownCodec (interface)

**Signature**

```ts
export interface UnknownCodec<
```

Added in v1.0.0

## array

**Signature**

```ts
export declare const array: <A>(item: any) => any
```

Added in v1.0.0

## boolean

**Signature**

```ts
export declare const boolean: any
```

Added in v1.0.0

## extend

**Signature**

```ts
export declare const extend: <B>(that: any) => <A>(self: any) => any
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

## nativeEnum

**Signature**

```ts
export declare const nativeEnum: <A extends { [_: string]: string | number }>(nativeEnum: A) => any
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

## provideUnknownCodecFor

**Signature**

```ts
export declare const provideUnknownCodecFor: (provider: Provider) => <A>(schema: any) => any
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
export declare const struct: <Fields extends Record<string | number | symbol, any>>(fields: Fields) => any
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

## unknownCodecFor

**Signature**

```ts
export declare const unknownCodecFor: <A>(schema: any) => any
```

Added in v1.0.0

## withRest

**Signature**

```ts
export declare const withRest: <R>(rest: any) => <A extends readonly any[]>(self: any) => any
```

Added in v1.0.0
