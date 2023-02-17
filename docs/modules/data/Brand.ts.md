---
title: data/Brand.ts
nav_order: 6
parent: Modules
---

## Brand overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [brand](#brand)

---

# utils

## brand

**Signature**

```ts
export declare const brand: <C extends any>(
  constructor: any,
  annotationOptions?: S.AnnotationOptions<any> | undefined
) => <A extends any>(self: S.Schema<A>) => S.Schema<A & C>
```

Added in v1.0.0
