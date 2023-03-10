---
title: data/Option.ts
nav_order: 14
parent: Modules
---

## Option overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [option](#option)
  - [parseNullable](#parsenullable)
  - [parseOptionals](#parseoptionals)

---

# utils

## option

**Signature**

```ts
export declare const option: <A>(value: Schema<A>) => Schema<Option<A>>
```

Added in v1.0.0

## parseNullable

**Signature**

```ts
export declare const parseNullable: <A>(value: Schema<A>) => Schema<Option<A>>
```

Added in v1.0.0

## parseOptionals

**Signature**

```ts
export declare const parseOptionals: <Fields extends Record<string | number | symbol, Schema<any>>>(
  fields: Fields
) => <A extends object>(
  schema: Schema<A>
) => Schema<Spread<A & { readonly [K in keyof Fields]: Option<Infer<Fields[K]>> }>>
```

Added in v1.0.0
