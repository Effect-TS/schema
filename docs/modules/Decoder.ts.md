---
title: Decoder.ts
nav_order: 15
parent: Modules
---

## Decoder overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [decoding](#decoding)
  - [decode](#decode)
  - [decodeOrThrow](#decodeorthrow)
- [model](#model)
  - [Decoder (interface)](#decoder-interface)
- [utils](#utils)
  - [decoderFor](#decoderfor)

---

# constructors

## make

**Signature**

```ts
export declare const make: <I, A>(
  schema: Schema<A>,
  decode: (i: I) => These<readonly [DE.DecodeError, ...DE.DecodeError[]], A>
) => Decoder<I, A>
```

Added in v1.0.0

# decoding

## decode

**Signature**

```ts
export declare const decode: <A>(
  schema: Schema<A>
) => (u: unknown) => These<readonly [DE.DecodeError, ...DE.DecodeError[]], A>
```

Added in v1.0.0

## decodeOrThrow

**Signature**

```ts
export declare const decodeOrThrow: <A>(schema: Schema<A>) => (u: unknown) => A
```

Added in v1.0.0

# model

## Decoder (interface)

**Signature**

```ts
export interface Decoder<I, A> extends Schema<A> {
  readonly decode: (i: I) => DE.DecodeResult<A>
}
```

Added in v1.0.0

# utils

## decoderFor

**Signature**

```ts
export declare const decoderFor: <A>(schema: Schema<A>) => Decoder<unknown, A>
```

Added in v1.0.0
