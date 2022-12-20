---
title: annotation/GuardAnnotation.ts
nav_order: 5
parent: Modules
---

## GuardAnnotation overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [GuardAnnotation (interface)](#guardannotation-interface)
  - [GuardAnnotationId](#guardannotationid)
  - [guardAnnotation](#guardannotation)
  - [isGuardAnnotation](#isguardannotation)

---

# utils

## GuardAnnotation (interface)

**Signature**

```ts
export interface GuardAnnotation {
  readonly _id: typeof GuardAnnotationId
  readonly handler: (...guards: ReadonlyArray<Guard<any>>) => Guard<any>
}
```

Added in v1.0.0

## GuardAnnotationId

**Signature**

```ts
export declare const GuardAnnotationId: '@fp-ts/schema/annotation/GuardAnnotation'
```

Added in v1.0.0

## guardAnnotation

**Signature**

```ts
export declare const guardAnnotation: (handler: (...guards: ReadonlyArray<Guard<any>>) => Guard<any>) => GuardAnnotation
```

Added in v1.0.0

## isGuardAnnotation

**Signature**

```ts
export declare const isGuardAnnotation: (u: unknown) => u is GuardAnnotation
```

Added in v1.0.0
