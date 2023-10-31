---
title: Equivalence.ts
nav_order: 4
parent: Modules
---

## Equivalence overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Equivalence](#equivalence)
  - [from](#from)
  - [to](#to)
- [hooks](#hooks)
  - [EquivalenceHookId](#equivalencehookid)

---

# Equivalence

## from

**Signature**

```ts
export declare const from: <I, A>(schema: S.Schema<I, A>) => Equivalence.Equivalence<I>
```

Added in v1.0.0

## to

**Signature**

```ts
export declare const to: <I, A>(schema: S.Schema<I, A>) => Equivalence.Equivalence<A>
```

Added in v1.0.0

# hooks

## EquivalenceHookId

**Signature**

```ts
export declare const EquivalenceHookId: symbol
```

Added in v1.0.0
