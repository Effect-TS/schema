---
title: Guard.ts
nav_order: 18
parent: Modules
---

## Guard overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [assertions](#assertions)
  - [asserts](#asserts)
  - [is](#is)
- [constructors](#constructors)
  - [make](#make)
- [model](#model)
  - [Guard (interface)](#guard-interface)
- [utils](#utils)
  - [guardFor](#guardfor)

---

# assertions

## asserts

**Signature**

```ts
export declare const asserts: <A>(schema: Schema<A>, message?: string) => (input: unknown) => asserts input is A
```

Added in v1.0.0

## is

**Signature**

```ts
export declare const is: <A>(schema: Schema<A>) => (input: unknown) => input is A
```

Added in v1.0.0

# constructors

## make

**Signature**

```ts
export declare const make: <A>(schema: Schema<A>, is: (input: unknown) => input is A) => Guard<A>
```

Added in v1.0.0

# model

## Guard (interface)

**Signature**

```ts
export interface Guard<A> extends Schema<A> {
  readonly is: (input: unknown) => input is A
}
```

Added in v1.0.0

# utils

## guardFor

**Signature**

```ts
export declare const guardFor: <A>(schema: Schema<A>) => Guard<A>
```

Added in v1.0.0
