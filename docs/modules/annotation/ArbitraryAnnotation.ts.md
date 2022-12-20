---
title: annotation/ArbitraryAnnotation.ts
nav_order: 1
parent: Modules
---

## ArbitraryAnnotation overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [ArbitraryAnnotation (interface)](#arbitraryannotation-interface)
  - [ArbitraryAnnotationId](#arbitraryannotationid)
  - [arbitraryAnnotation](#arbitraryannotation)
  - [isArbitraryAnnotation](#isarbitraryannotation)

---

# utils

## ArbitraryAnnotation (interface)

**Signature**

```ts
export interface ArbitraryAnnotation {
  readonly _id: typeof ArbitraryAnnotationId
  readonly handler: (...Arbitrarys: ReadonlyArray<Arbitrary<any>>) => Arbitrary<any>
}
```

Added in v1.0.0

## ArbitraryAnnotationId

**Signature**

```ts
export declare const ArbitraryAnnotationId: '@fp-ts/schema/annotation/ArbitraryAnnotation'
```

Added in v1.0.0

## arbitraryAnnotation

**Signature**

```ts
export declare const arbitraryAnnotation: (
  handler: (...Arbitrarys: ReadonlyArray<Arbitrary<any>>) => Arbitrary<any>
) => ArbitraryAnnotation
```

Added in v1.0.0

## isArbitraryAnnotation

**Signature**

```ts
export declare const isArbitraryAnnotation: (u: unknown) => u is ArbitraryAnnotation
```

Added in v1.0.0
