---
title: JSONSchema.ts
nav_order: 7
parent: Modules
---

## JSONSchema overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [encoding](#encoding)
  - [from](#from)
  - [to](#to)
- [model](#model)
  - [JsonSchema7 (type alias)](#jsonschema7-type-alias)
  - [JsonSchema7Any (interface)](#jsonschema7any-interface)
  - [JsonSchema7AnyOf (interface)](#jsonschema7anyof-interface)
  - [JsonSchema7Array (interface)](#jsonschema7array-interface)
  - [JsonSchema7Boolean (interface)](#jsonschema7boolean-interface)
  - [JsonSchema7Const (interface)](#jsonschema7const-interface)
  - [JsonSchema7Enum (interface)](#jsonschema7enum-interface)
  - [JsonSchema7Enums (interface)](#jsonschema7enums-interface)
  - [JsonSchema7Integer (interface)](#jsonschema7integer-interface)
  - [JsonSchema7Number (interface)](#jsonschema7number-interface)
  - [JsonSchema7Numeric (interface)](#jsonschema7numeric-interface)
  - [JsonSchema7Object (interface)](#jsonschema7object-interface)
  - [JsonSchema7OneOf (interface)](#jsonschema7oneof-interface)
  - [JsonSchema7Ref (interface)](#jsonschema7ref-interface)
  - [JsonSchema7Root (type alias)](#jsonschema7root-type-alias)
  - [JsonSchema7String (interface)](#jsonschema7string-interface)
  - [JsonSchema7Unknown (interface)](#jsonschema7unknown-interface)
  - [JsonSchema7empty (interface)](#jsonschema7empty-interface)
  - [JsonSchema7object (interface)](#jsonschema7object-interface-1)

---

# encoding

## from

**Signature**

```ts
export declare const from: <I, A>(schema: Schema.Schema<I, A>) => JsonSchema7Root
```

Added in v1.0.0

## to

**Signature**

```ts
export declare const to: <I, A>(schema: Schema.Schema<I, A>) => JsonSchema7Root
```

Added in v1.0.0

# model

## JsonSchema7 (type alias)

**Signature**

```ts
export type JsonSchema7 =
  | JsonSchema7Any
  | JsonSchema7Unknown
  | JsonSchema7object
  | JsonSchema7empty
  | JsonSchema7Ref
  | JsonSchema7Const
  | JsonSchema7String
  | JsonSchema7Number
  | JsonSchema7Integer
  | JsonSchema7Boolean
  | JsonSchema7Array
  | JsonSchema7OneOf
  | JsonSchema7Enum
  | JsonSchema7Enums
  | JsonSchema7AnyOf
  | JsonSchema7Object
```

Added in v1.0.0

## JsonSchema7Any (interface)

**Signature**

```ts
export interface JsonSchema7Any {
  $id: "/schemas/any"
}
```

Added in v1.0.0

## JsonSchema7AnyOf (interface)

**Signature**

```ts
export interface JsonSchema7AnyOf {
  anyOf: Array<JsonSchema7>
}
```

Added in v1.0.0

## JsonSchema7Array (interface)

**Signature**

```ts
export interface JsonSchema7Array {
  type: "array"
  items?: JsonSchema7 | Array<JsonSchema7>
  minItems?: number
  maxItems?: number
  additionalItems?: JsonSchema7 | boolean
}
```

Added in v1.0.0

## JsonSchema7Boolean (interface)

**Signature**

```ts
export interface JsonSchema7Boolean {
  type: "boolean"
}
```

Added in v1.0.0

## JsonSchema7Const (interface)

**Signature**

```ts
export interface JsonSchema7Const {
  const: AST.LiteralValue
}
```

Added in v1.0.0

## JsonSchema7Enum (interface)

**Signature**

```ts
export interface JsonSchema7Enum {
  enum: Array<AST.LiteralValue>
}
```

Added in v1.0.0

## JsonSchema7Enums (interface)

**Signature**

```ts
export interface JsonSchema7Enums {
  $comment: "/schemas/enums"
  oneOf: Array<{
    title: string
    const: string | number
  }>
}
```

Added in v1.0.0

## JsonSchema7Integer (interface)

**Signature**

```ts
export interface JsonSchema7Integer extends JsonSchema7Numeric {
  type: "integer"
}
```

Added in v1.0.0

## JsonSchema7Number (interface)

**Signature**

```ts
export interface JsonSchema7Number extends JsonSchema7Numeric {
  type: "number"
}
```

Added in v1.0.0

## JsonSchema7Numeric (interface)

**Signature**

```ts
export interface JsonSchema7Numeric {
  minimum?: number
  exclusiveMinimum?: number
  maximum?: number
  exclusiveMaximum?: number
}
```

Added in v1.0.0

## JsonSchema7Object (interface)

**Signature**

```ts
export interface JsonSchema7Object {
  type: "object"
  required: Array<string>
  properties: Record<string, JsonSchema7>
  additionalProperties?: boolean | JsonSchema7
  patternProperties?: Record<string, JsonSchema7>
}
```

Added in v1.0.0

## JsonSchema7OneOf (interface)

**Signature**

```ts
export interface JsonSchema7OneOf {
  oneOf: Array<JsonSchema7>
}
```

Added in v1.0.0

## JsonSchema7Ref (interface)

**Signature**

```ts
export interface JsonSchema7Ref {
  $ref: string
}
```

Added in v1.0.0

## JsonSchema7Root (type alias)

**Signature**

```ts
export type JsonSchema7Root = JsonSchema7 & {
  $schema?: string
  $defs?: Record<string, JsonSchema7>
}
```

Added in v1.0.0

## JsonSchema7String (interface)

**Signature**

```ts
export interface JsonSchema7String {
  type: "string"
  minLength?: number
  maxLength?: number
  pattern?: string
  description?: string
}
```

Added in v1.0.0

## JsonSchema7Unknown (interface)

**Signature**

```ts
export interface JsonSchema7Unknown {
  $id: "/schemas/unknown"
}
```

Added in v1.0.0

## JsonSchema7empty (interface)

**Signature**

```ts
export interface JsonSchema7empty {
  $id: "/schemas/{}"
  oneOf: [{ type: "object" }, { type: "array" }]
}
```

Added in v1.0.0

## JsonSchema7object (interface)

**Signature**

```ts
export interface JsonSchema7object {
  $id: "/schemas/object"
  oneOf: [{ type: "object" }, { type: "array" }]
}
```

Added in v1.0.0
