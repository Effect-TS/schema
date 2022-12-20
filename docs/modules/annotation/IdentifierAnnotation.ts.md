---
title: annotation/IdentifierAnnotation.ts
nav_order: 6
parent: Modules
---

## IdentifierAnnotation overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [IdentifierAnnotation (interface)](#identifierannotation-interface)
  - [IdentifierAnnotationId](#identifierannotationid)
  - [identifierAnnotation](#identifierannotation)
  - [isIdentifierAnnotation](#isidentifierannotation)

---

# utils

## IdentifierAnnotation (interface)

**Signature**

```ts
export interface IdentifierAnnotation {
  readonly _id: typeof IdentifierAnnotationId
  readonly identifier: string
}
```

Added in v1.0.0

## IdentifierAnnotationId

**Signature**

```ts
export declare const IdentifierAnnotationId: '@fp-ts/schema/annotation/IdentifierAnnotation'
```

Added in v1.0.0

## identifierAnnotation

**Signature**

```ts
export declare const identifierAnnotation: (identifier: string) => IdentifierAnnotation
```

Added in v1.0.0

## isIdentifierAnnotation

**Signature**

```ts
export declare const isIdentifierAnnotation: (u: unknown) => u is IdentifierAnnotation
```

Added in v1.0.0
