---
title: UnknownEncoder.ts
nav_order: 40
parent: Modules
---

## UnknownEncoder overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [UnknownEncoder (interface)](#unknownencoder-interface)
  - [UnknownEncoderId](#unknownencoderid)
  - [provideUnknownEncoderFor](#provideunknownencoderfor)
  - [unknownEncoderFor](#unknownencoderfor)

---

# utils

## UnknownEncoder (interface)

**Signature**

```ts
export interface UnknownEncoder<A> extends Encoder<unknown, A> {}
```

Added in v1.0.0

## UnknownEncoderId

**Signature**

```ts
export declare const UnknownEncoderId: symbol
```

Added in v1.0.0

## provideUnknownEncoderFor

**Signature**

```ts
export declare const provideUnknownEncoderFor: (provider: Provider) => <A>(schema: any) => Encoder<unknown, A>
```

Added in v1.0.0

## unknownEncoderFor

**Signature**

```ts
export declare const unknownEncoderFor: <A>(schema: any) => Encoder<unknown, A>
```

Added in v1.0.0
