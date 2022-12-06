---
title: UnknownDecoder.ts
nav_order: 39
parent: Modules
---

## UnknownDecoder overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [UnknownDecoder (interface)](#unknowndecoder-interface)
  - [UnknownDecoderId](#unknowndecoderid)
  - [provideUnknownDecoderFor](#provideunknowndecoderfor)
  - [unknownDecoderFor](#unknowndecoderfor)

---

# utils

## UnknownDecoder (interface)

**Signature**

```ts
export interface UnknownDecoder<A> extends Decoder<unknown, A> {}
```

Added in v1.0.0

## UnknownDecoderId

**Signature**

```ts
export declare const UnknownDecoderId: symbol
```

Added in v1.0.0

## provideUnknownDecoderFor

**Signature**

```ts
export declare const provideUnknownDecoderFor: (provider: Provider) => <A>(schema: any) => any
```

Added in v1.0.0

## unknownDecoderFor

**Signature**

```ts
export declare const unknownDecoderFor: <A>(schema: any) => any
```

Added in v1.0.0
