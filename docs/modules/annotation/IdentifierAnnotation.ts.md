---
title: annotation/IdentifierAnnotation.ts
nav_order: 2
parent: Modules
---

## IdentifierAnnotation overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [IdentifierAnnotation (interface)](#identifierannotation-interface)
  - [IdentifierAnnotationId](#identifierannotationid)
  - [getIdentifierAnnotation](#getidentifierannotation)
  - [identifierAnnotation](#identifierannotation)

---

# utils

## IdentifierAnnotation (interface)

**Signature**

```ts
export interface IdentifierAnnotation {
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

## getIdentifierAnnotation

**Signature**

```ts
export declare const getIdentifierAnnotation: (annotated: Annotated) => Option<IdentifierAnnotation>
```

Added in v1.0.0

## identifierAnnotation

**Signature**

```ts
export declare const identifierAnnotation: (identifier: string) => IdentifierAnnotation
```

Added in v1.0.0
