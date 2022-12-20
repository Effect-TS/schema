---
title: Guard.ts
nav_order: 28
parent: Modules
---

## Guard overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Guard (interface)](#guard-interface)
  - [guardFor](#guardfor)
  - [make](#make)

---

# utils

## Guard (interface)

**Signature**

```ts
export interface Guard<A> extends Schema<A> {
  readonly is: (input: unknown) => input is A
}
```

Added in v1.0.0

## guardFor

**Signature**

```ts
export declare const guardFor: <A>(schema: Schema<A>) => Guard<A>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <A>(schema: Schema<A>, is: (input: unknown) => input is A) => Guard<A>
```

Added in v1.0.0
