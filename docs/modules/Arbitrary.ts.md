---
title: Arbitrary.ts
nav_order: 1
parent: Modules
---

## Arbitrary overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [arbitrary](#arbitrary)
  - [from](#from)
  - [to](#to)
- [hooks](#hooks)
  - [ArbitraryHookId](#arbitraryhookid)
  - [ArbitraryHookId (type alias)](#arbitraryhookid-type-alias)
- [model](#model)
  - [Arbitrary (interface)](#arbitrary-interface)

---

# arbitrary

## from

**Signature**

```ts
export declare const from: <I, A>(schema: Schema.Schema<I, A>) => Arbitrary<I>
```

Added in v1.0.0

## to

**Signature**

```ts
export declare const to: <I, A>(schema: Schema.Schema<I, A>) => Arbitrary<A>
```

Added in v1.0.0

# hooks

## ArbitraryHookId

**Signature**

```ts
export declare const ArbitraryHookId: typeof ArbitraryHookId
```

Added in v1.0.0

## ArbitraryHookId (type alias)

**Signature**

```ts
export type ArbitraryHookId = typeof ArbitraryHookId
```

Added in v1.0.0

# model

## Arbitrary (interface)

**Signature**

```ts
export interface Arbitrary<A> {
  (fc: typeof FastCheck): FastCheck.Arbitrary<A>
}
```

Added in v1.0.0
