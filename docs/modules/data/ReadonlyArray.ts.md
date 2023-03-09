---
title: data/ReadonlyArray.ts
nav_order: 15
parent: Modules
---

## ReadonlyArray overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [~~ItemsCountId~~](#itemscountid)
  - [~~MaxItemsId~~](#maxitemsid)
  - [~~MinItemsId~~](#minitemsid)
  - [~~itemsCount~~](#itemscount)
  - [~~maxItems~~](#maxitems)
  - [~~minItems~~](#minitems)

---

# utils

## ~~ItemsCountId~~

**Signature**

```ts
export declare const ItemsCountId: '@effect/schema/ItemsCountTypeId'
```

Added in v1.0.0

## ~~MaxItemsId~~

**Signature**

```ts
export declare const MaxItemsId: '@effect/schema/MaxItemsTypeId'
```

Added in v1.0.0

## ~~MinItemsId~~

**Signature**

```ts
export declare const MinItemsId: '@effect/schema/MinItemsTypeId'
```

Added in v1.0.0

## ~~itemsCount~~

**Signature**

```ts
export declare const itemsCount: <A>(
  n: number,
  annotationOptions?: S.AnnotationOptions<readonly A[]> | undefined
) => (self: S.Schema<readonly A[]>) => S.Schema<readonly A[]>
```

Added in v1.0.0

## ~~maxItems~~

**Signature**

```ts
export declare const maxItems: <A>(
  n: number,
  annotationOptions?: S.AnnotationOptions<readonly A[]> | undefined
) => (self: S.Schema<readonly A[]>) => S.Schema<readonly A[]>
```

Added in v1.0.0

## ~~minItems~~

**Signature**

```ts
export declare const minItems: <A>(
  n: number,
  annotationOptions?: S.AnnotationOptions<readonly A[]> | undefined
) => (self: S.Schema<readonly A[]>) => S.Schema<readonly A[]>
```

Added in v1.0.0
