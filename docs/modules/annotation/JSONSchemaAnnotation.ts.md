---
title: annotation/JSONSchemaAnnotation.ts
nav_order: 3
parent: Modules
---

## JSONSchemaAnnotation overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [JSONSchemaAnnotation (interface)](#jsonschemaannotation-interface)
  - [JSONSchemaAnnotationId](#jsonschemaannotationid)
  - [getJSONSchemaAnnotation](#getjsonschemaannotation)
  - [jsonSchemaAnnotation](#jsonschemaannotation)

---

# utils

## JSONSchemaAnnotation (interface)

**Signature**

```ts
export interface JSONSchemaAnnotation {
  readonly schema: object
}
```

Added in v1.0.0

## JSONSchemaAnnotationId

**Signature**

```ts
export declare const JSONSchemaAnnotationId: '@fp-ts/schema/annotation/JSONSchemaAnnotation'
```

Added in v1.0.0

## getJSONSchemaAnnotation

**Signature**

```ts
export declare const getJSONSchemaAnnotation: (annotated: Annotated) => Option<JSONSchemaAnnotation>
```

Added in v1.0.0

## jsonSchemaAnnotation

**Signature**

```ts
export declare const jsonSchemaAnnotation: (schema: object) => JSONSchemaAnnotation
```

Added in v1.0.0
