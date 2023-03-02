---
title: data/ReadonlyArray.ts
nav_order: 15
parent: Modules
---

## ReadonlyArray overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [identifiers](#identifiers)
  - [ItemsCountId](#itemscountid)
  - [MaxItemsId](#maxitemsid)
  - [MinItemsId](#minitemsid)
- [utils](#utils)
  - [itemsCount](#itemscount)
  - [maxItems](#maxitems)
  - [minItems](#minitems)

---

# identifiers

## ItemsCountId

**Signature**

```ts
export declare const ItemsCountId: '@effect/schema/ReadonlyArray/itemsCount'
```

Added in v1.0.0

## MaxItemsId

**Signature**

```ts
export declare const MaxItemsId: '@effect/schema/ReadonlyArray/maxItems'
```

Added in v1.0.0

## MinItemsId

**Signature**

```ts
export declare const MinItemsId: '@effect/schema/ReadonlyArray/minItems'
```

Added in v1.0.0

# utils

## itemsCount

**Signature**

```ts
export declare const itemsCount: <A>(
  n: number,
  annotationOptions?: AnnotationOptions<readonly A[]> | undefined
) => (self: Schema<readonly A[]>) => Schema<readonly A[]>
```

Added in v1.0.0

## maxItems

**Signature**

```ts
export declare const maxItems: <A>(
  n: number,
  annotationOptions?: AnnotationOptions<readonly A[]> | undefined
) => (self: Schema<readonly A[]>) => Schema<readonly A[]>
```

Added in v1.0.0

## minItems

**Signature**

```ts
export declare const minItems: <A>(
  n: number,
  annotationOptions?: AnnotationOptions<readonly A[]> | undefined
) => (self: Schema<readonly A[]>) => Schema<readonly A[]>
```

Added in v1.0.0
