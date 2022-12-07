---
title: data/ReadonlySet.ts
nav_order: 26
parent: Modules
---

## ReadonlySet overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Provider](#provider)
  - [arbitrary](#arbitrary)
  - [decoder](#decoder)
  - [guard](#guard)
  - [id](#id)
  - [pretty](#pretty)
  - [schema](#schema)

---

# utils

## Provider

**Signature**

```ts
export declare const Provider: P.Provider
```

Added in v1.0.0

## arbitrary

**Signature**

```ts
export declare const arbitrary: <A>(item: Arbitrary<A>) => Arbitrary<ReadonlySet<A>>
```

Added in v1.0.0

## decoder

**Signature**

```ts
export declare const decoder: <A>(item: D.Decoder<unknown, A>) => D.Decoder<unknown, ReadonlySet<A>>
```

Added in v1.0.0

## guard

**Signature**

```ts
export declare const guard: <A>(item: Guard<A>) => Guard<ReadonlySet<A>>
```

Added in v1.0.0

## id

**Signature**

```ts
export declare const id: typeof id
```

Added in v1.0.0

## pretty

**Signature**

```ts
export declare const pretty: <A>(item: Pretty<A>) => Pretty<ReadonlySet<A>>
```

Added in v1.0.0

## schema

**Signature**

```ts
export declare const schema: <A>(item: Schema<A>) => Schema<ReadonlySet<A>>
```

Added in v1.0.0
