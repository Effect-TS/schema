---
title: annotation/JSONSchemaAnnotation.ts
nav_order: 7
parent: Modules
---

## JSONSchemaAnnotation overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [JSONSchema (type alias)](#jsonschema-type-alias)
  - [JSONSchemaAnnotation (interface)](#jsonschemaannotation-interface)
  - [JSONSchemaAnnotationId](#jsonschemaannotationid)
  - [isJSONSchemaAnnotation](#isjsonschemaannotation)
  - [jsonSchemaAnnotation](#jsonschemaannotation)

---

# utils

## JSONSchema (type alias)

**Signature**

```ts
export type JSONSchema = {}
```

Added in v1.0.0

## JSONSchemaAnnotation (interface)

**Signature**

```ts
export interface JSONSchemaAnnotation {
  readonly _id: typeof JSONSchemaAnnotationId
  readonly schema: JSONSchema
}
```

Added in v1.0.0

## JSONSchemaAnnotationId

**Signature**

```ts
export declare const JSONSchemaAnnotationId: '@fp-ts/schema/annotation/JSONSchemaAnnotation'
```

Added in v1.0.0

## isJSONSchemaAnnotation

**Signature**

```ts
export declare const isJSONSchemaAnnotation: (u: unknown) => u is JSONSchemaAnnotation
```

Added in v1.0.0

## jsonSchemaAnnotation

**Signature**

```ts
export declare const jsonSchemaAnnotation: (schema: JSONSchema) => JSONSchemaAnnotation
```

Added in v1.0.0
