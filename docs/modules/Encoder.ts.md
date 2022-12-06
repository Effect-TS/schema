---
title: Encoder.ts
nav_order: 35
parent: Modules
---

## Encoder overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Encoder (interface)](#encoder-interface)
  - [EncoderId](#encoderid)
  - [encoderFor](#encoderfor)
  - [make](#make)
  - [provideEncoderFor](#provideencoderfor)

---

# utils

## Encoder (interface)

**Signature**

```ts
export interface Encoder<out S,
```

Added in v1.0.0

## EncoderId

**Signature**

```ts
export declare const EncoderId: symbol
```

Added in v1.0.0

## encoderFor

**Signature**

```ts
export declare const encoderFor: <A>(schema: any) => Encoder<unknown, A>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <S, A>(schema: any, encode: any) => Encoder<S, A>
```

Added in v1.0.0

## provideEncoderFor

**Signature**

```ts
export declare const provideEncoderFor: (provider: Provider) => <A>(schema: any) => Encoder<unknown, A>
```

Added in v1.0.0
