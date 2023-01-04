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
- [model](#model)
  - [Encoder (interface)](#encoder-interface)
- [utils](#utils)
  - [encoderFor](#encoderfor)

---

# constructors

## make

**Signature**

```ts
export declare const make: <S, A>(schema: Schema<A>, encode: (value: A) => S) => Encoder<S, A>
```

Added in v1.0.0

# model

## Encoder (interface)

**Signature**

```ts
export interface Encoder<S, A> extends Schema<A> {
  readonly encode: (value: A) => S
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
