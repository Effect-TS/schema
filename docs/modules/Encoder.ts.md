---
title: Encoder.ts
nav_order: 27
parent: Modules
---

## Encoder overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Encoder (interface)](#encoder-interface)
  - [encoderFor](#encoderfor)
  - [make](#make)

---

# utils

## Encoder (interface)

**Signature**

```ts
export interface Encoder<S, A> extends Schema<A> {
  readonly encode: (value: A) => S
}
```

Added in v1.0.0

## encoderFor

**Signature**

```ts
export declare const encoderFor: <A>(schema: Schema<A>) => Encoder<unknown, A>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <S, A>(schema: Schema<A>, encode: (value: A) => S) => Encoder<S, A>
```

Added in v1.0.0
