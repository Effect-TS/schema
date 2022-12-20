---
title: annotation/DocumentationAnnotation.ts
nav_order: 3
parent: Modules
---

## DocumentationAnnotation overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [DocumentationAnnotation (interface)](#documentationannotation-interface)
  - [DocumentationAnnotationId](#documentationannotationid)
  - [documentationAnnotation](#documentationannotation)
  - [isDocumentationAnnotation](#isdocumentationannotation)

---

# utils

## DocumentationAnnotation (interface)

**Signature**

```ts
export interface DocumentationAnnotation {
  readonly _id: typeof DocumentationAnnotationId
  readonly documentation: string
}
```

Added in v1.0.0

## DocumentationAnnotationId

**Signature**

```ts
export declare const DocumentationAnnotationId: '@fp-ts/schema/annotation/DocumentationAnnotation'
```

Added in v1.0.0

## documentationAnnotation

**Signature**

```ts
export declare const documentationAnnotation: (documentation: string) => DocumentationAnnotation
```

Added in v1.0.0

## isDocumentationAnnotation

**Signature**

```ts
export declare const isDocumentationAnnotation: (u: unknown) => u is DocumentationAnnotation
```

Added in v1.0.0
