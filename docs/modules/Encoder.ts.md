---
title: Encoder.ts
nav_order: 17
parent: Modules
---

## Encoder overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [encoding](#encoding)
  - [encode](#encode)
  - [encodeOrThrow](#encodeorthrow)
- [model](#model)
  - [Encoder (interface)](#encoder-interface)
- [utils](#utils)
  - [InferOutput (type alias)](#inferoutput-type-alias)

---

# constructors

## make

**Signature**

```ts
export declare const make: <O, A>(
  schema: S.Schema<A>,
  encode: (value: A, options?: DecodeOptions | undefined) => These<readonly [DE.DecodeError, ...DE.DecodeError[]], O>
) => Encoder<O, A>
```

Added in v1.0.0

# encoding

## encode

**Signature**

```ts
export declare const encode: <A>(
  schema: S.Schema<A>
) => (a: A, options?: DecodeOptions | undefined) => DE.DecodeResult<unknown>
```

Added in v1.0.0

## encodeOrThrow

**Signature**

```ts
export declare const encodeOrThrow: <A>(schema: S.Schema<A>) => (a: A, options?: DecodeOptions | undefined) => unknown
```

Added in v1.0.0

# model

## Encoder (interface)

**Signature**

```ts
export interface Encoder<O, A> extends S.Schema<A> {
  readonly O: () => O
  readonly encode: (value: A, options?: DecodeOptions) => DE.DecodeResult<O>
}
```

Added in v1.0.0

# utils

## InferOutput (type alias)

**Signature**

```ts
export type InferOutput<E extends Encoder<any, any>> = ReturnType<E['O']>
```

Added in v1.0.0
