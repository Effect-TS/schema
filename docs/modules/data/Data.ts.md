---
title: data/Data.ts
nav_order: 8
parent: Modules
---

## Data overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [data](#data)
  - [fromStructure](#fromstructure)

---

# utils

## data

**Signature**

```ts
export declare const data: <A extends readonly any[] | Readonly<Record<string, any>>>(
  item: Schema<A>
) => Schema<D.Data<A>>
```

Added in v1.0.0

## fromStructure

**Signature**

```ts
export declare const fromStructure: <A extends readonly any[] | Readonly<Record<string, any>>>(
  item: Schema<A>
) => Schema<D.Data<A>>
```

Added in v1.0.0
