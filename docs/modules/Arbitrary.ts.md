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
  - [arbitrary](#arbitrary-1)
- [hooks](#hooks)
  - [ArbitraryHookId](#arbitraryhookid)
- [model](#model)
  - [Arbitrary (interface)](#arbitrary-interface)

---

# arbitrary

## arbitrary

**Signature**

```ts
export declare const arbitrary: <I, A>(schema: Schema<I, A>) => (fc: typeof FastCheck) => FastCheck.Arbitrary<A>
```

Added in v1.0.0

# hooks

## ArbitraryHookId

**Signature**

```ts
export declare const ArbitraryHookId: '@effect/schema/ArbitraryHookId'
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
