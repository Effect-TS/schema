---
title: Encoder.ts
nav_order: 16
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
  - [encoderFor](#encoderfor)

---

# constructors

## make

**Signature**

```ts
export declare const make: <O, A>(
  schema: Schema<A>,
  encode: (value: A) => These<readonly [DE.DecodeError, ...DE.DecodeError[]], O>
) => Encoder<O, A>
```

Added in v1.0.0

# encoding

## encode

**Signature**

```ts
export declare const encode: <A>(schema: Schema<A>) => (a: A) => DE.DecodeResult<unknown>
```

Added in v1.0.0

## encodeOrThrow

**Signature**

```ts
export declare const encodeOrThrow: <A>(schema: Schema<A>) => (a: A) => unknown
```

Added in v1.0.0

# model

## Encoder (interface)

**Signature**

```ts
export interface Encoder<O, A> extends Schema<A> {
  readonly encode: (value: A) => DE.DecodeResult<O>
}
```

Added in v1.0.0

# utils

## encoderFor

**Signature**

```ts
export declare const encoderFor: <A>(schema: Schema<A>) => Encoder<unknown, A>
```

Added in v1.0.0
