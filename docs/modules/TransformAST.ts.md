---
title: TransformAST.ts
nav_order: 8
parent: Modules
---

## TransformAST overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [createFinalPropertySignatureTransformation](#createfinalpropertysignaturetransformation)
  - [createFinalTransformation](#createfinaltransformation)
  - [createPropertySignatureTransformation](#createpropertysignaturetransformation)
  - [createTypeLiteralTransformation](#createtypeliteraltransformation)
- [guard](#guard)
  - [isTypeLiteralTransformation](#istypeliteraltransformation)
- [model](#model)
  - [FinalPropertySignatureTransformation (interface)](#finalpropertysignaturetransformation-interface)
  - [FinalTransformation (interface)](#finaltransformation-interface)
  - [PropertySignatureTransformation (interface)](#propertysignaturetransformation-interface)
  - [TransformAST (type alias)](#transformast-type-alias)
  - [TypeLiteralTransformation (interface)](#typeliteraltransformation-interface)

---

# constructors

## createFinalPropertySignatureTransformation

**Signature**

```ts
export declare const createFinalPropertySignatureTransformation: (
  decode: FinalPropertySignatureTransformation['decode'],
  encode: FinalPropertySignatureTransformation['encode']
) => FinalPropertySignatureTransformation
```

Added in v1.0.0

## createFinalTransformation

**Signature**

```ts
export declare const createFinalTransformation: (
  decode: Transform['decode'],
  encode: Transform['encode']
) => FinalTransformation
```

Added in v1.0.0

## createPropertySignatureTransformation

**Signature**

```ts
export declare const createPropertySignatureTransformation: (
  from: PropertyKey,
  to: PropertyKey,
  transformation: PropertySignatureTransformation['transformation']
) => PropertySignatureTransformation
```

Added in v1.0.0

## createTypeLiteralTransformation

**Signature**

```ts
export declare const createTypeLiteralTransformation: (
  propertySignatureTransformations: TypeLiteralTransformation['propertySignatureTransformations']
) => TypeLiteralTransformation
```

Added in v1.0.0

# guard

## isTypeLiteralTransformation

**Signature**

```ts
export declare const isTypeLiteralTransformation: (ast: TransformAST) => ast is TypeLiteralTransformation
```

Added in v1.0.0

# model

## FinalPropertySignatureTransformation (interface)

Represents a `PropertySignature -> PropertySignature` transformation

The semantic of `decode` is:

- `none()` represents the absence of the key/value pair
- `some(value)` represents the presence of the key/value pair

The semantic of `encode` is:

- `none()` you don't want to output the key/value pair
- `some(value)` you want to output the key/value pair

**Signature**

```ts
export interface FinalPropertySignatureTransformation {
  readonly _tag: 'FinalPropertySignatureTransformation'
  decode: (o: Option<any>) => Option<any>
  encode: (o: Option<any>) => Option<any>
}
```

Added in v1.0.0

## FinalTransformation (interface)

**Signature**

```ts
export interface FinalTransformation {
  readonly _tag: 'FinalTransformation'
  decode: Transform['decode']
  encode: Transform['encode']
}
```

Added in v1.0.0

## PropertySignatureTransformation (interface)

**Signature**

```ts
export interface PropertySignatureTransformation {
  readonly from: PropertyKey
  readonly to: PropertyKey
  readonly transformation: FinalPropertySignatureTransformation | TransformAST
}
```

Added in v1.0.0

## TransformAST (type alias)

**Signature**

```ts
export type TransformAST = FinalTransformation | TypeLiteralTransformation
```

Added in v1.0.0

## TypeLiteralTransformation (interface)

**Signature**

```ts
export interface TypeLiteralTransformation {
  readonly _tag: 'TypeLiteralTransformation'
  readonly propertySignatureTransformations: RA.NonEmptyReadonlyArray<PropertySignatureTransformation>
}
```

Added in v1.0.0
