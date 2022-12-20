---
title: annotation/PrettyAnnotation.ts
nav_order: 8
parent: Modules
---

## PrettyAnnotation overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [PrettyAnnotation (interface)](#prettyannotation-interface)
  - [PrettyAnnotationId](#prettyannotationid)
  - [isPrettyAnnotation](#isprettyannotation)
  - [prettyAnnotation](#prettyannotation)

---

# utils

## PrettyAnnotation (interface)

**Signature**

```ts
export interface PrettyAnnotation {
  readonly _id: typeof PrettyAnnotationId
  readonly handler: (...Prettys: ReadonlyArray<Pretty<any>>) => Pretty<any>
}
```

Added in v1.0.0

## PrettyAnnotationId

**Signature**

```ts
export declare const PrettyAnnotationId: '@fp-ts/schema/annotation/PrettyAnnotation'
```

Added in v1.0.0

## isPrettyAnnotation

**Signature**

```ts
export declare const isPrettyAnnotation: (u: unknown) => u is PrettyAnnotation
```

Added in v1.0.0

## prettyAnnotation

**Signature**

```ts
export declare const prettyAnnotation: (
  handler: (...Prettys: ReadonlyArray<Pretty<any>>) => Pretty<any>
) => PrettyAnnotation
```

Added in v1.0.0
