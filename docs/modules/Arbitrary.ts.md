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
- [constructors](#constructors)
  - [make](#make)
- [hooks](#hooks)
  - [ArbitraryHookId](#arbitraryhookid)
- [model](#model)
  - [Arbitrary (interface)](#arbitrary-interface)

---

# arbitrary

## arbitrary

**Signature**

```ts
export declare const arbitrary: <A>(schema: Schema<A>) => (fc: typeof FastCheck) => FastCheck.Arbitrary<A>
```

Added in v1.0.0

# constructors

## make

**Signature**

```ts
export declare const make: <A>(
  schema: Schema<A>,
  arbitrary: (fc: typeof FastCheck) => FastCheck.Arbitrary<A>
) => Arbitrary<A>
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
export interface Arbitrary<A> extends Schema<A> {
  readonly arbitrary: (fc: typeof FastCheck) => FastCheck.Arbitrary<A>
}
```

Added in v1.0.0
