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
  - [createAndThenTransformation](#createandthentransformation)
  - [createFinalPropertySignatureTransformation](#createfinalpropertysignaturetransformation)
  - [createFinalTransformation](#createfinaltransformation)
  - [createIndexSignatureTransformation](#createindexsignaturetransformation)
  - [createPropertySignatureTransformation](#createpropertysignaturetransformation)
  - [createTupleTransformation](#createtupletransformation)
  - [createTypeLiteralTransformation](#createtypeliteraltransformation)
- [guard](#guard)
  - [isTypeLiteralTransformation](#istypeliteraltransformation)
- [model](#model)
  - [AndThenTransformation (interface)](#andthentransformation-interface)
  - [FinalPropertySignatureTransformation (interface)](#finalpropertysignaturetransformation-interface)
  - [FinalTransformation (interface)](#finaltransformation-interface)
  - [IndexSignatureTransformation (interface)](#indexsignaturetransformation-interface)
  - [PropertySignatureTransformation (interface)](#propertysignaturetransformation-interface)
  - [TransformAST (type alias)](#transformast-type-alias)
  - [TupleTransformation (interface)](#tupletransformation-interface)
  - [TypeLiteralTransformation (interface)](#typeliteraltransformation-interface)

---

# constructors

## createAndThenTransformation

**Signature**

```ts
export declare const createAndThenTransformation: (from: TransformAST, to: TransformAST) => AndThenTransformation
```

Added in v1.0.0

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
  decode: FinalTransformation['decode'],
  encode: FinalTransformation['encode']
) => FinalTransformation
```

Added in v1.0.0

## createIndexSignatureTransformation

**Signature**

```ts
export declare const createIndexSignatureTransformation: (
  parameter: AST.StringKeyword | AST.SymbolKeyword,
  transformation: IndexSignatureTransformation['transformation']
) => IndexSignatureTransformation
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

## createTupleTransformation

**Signature**

```ts
export declare const createTupleTransformation: (elements: TupleTransformation['elements']) => TupleTransformation
```

Added in v1.0.0

## createTypeLiteralTransformation

**Signature**

```ts
export declare const createTypeLiteralTransformation: (
  propertySignatureTransformations: TypeLiteralTransformation['propertySignatureTransformations'],
  indexSignatureTransformations: TypeLiteralTransformation['indexSignatureTransformations'],
  exclude: TypeLiteralTransformation['exclude']
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

## AndThenTransformation (interface)

**Signature**

```ts
export interface AndThenTransformation {
  readonly _tag: 'AndThenTransformation'
  readonly from: TransformAST
  readonly to: TransformAST
}
```

Added in v1.0.0

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
  readonly decode: (o: Option<any>) => Option<any>
  readonly encode: (o: Option<any>) => Option<any>
}
```

Added in v1.0.0

## FinalTransformation (interface)

**Signature**

```ts
export interface FinalTransformation {
  readonly _tag: 'FinalTransformation'
  readonly decode: AST.Transform['decode']
  readonly encode: AST.Transform['encode']
}
```

Added in v1.0.0

## IndexSignatureTransformation (interface)

**Signature**

```ts
export interface IndexSignatureTransformation {
  readonly parameter: AST.StringKeyword | AST.SymbolKeyword
  readonly transformation: TransformAST
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
export type TransformAST = FinalTransformation | AndThenTransformation | TypeLiteralTransformation | TupleTransformation
```

Added in v1.0.0

## TupleTransformation (interface)

**Signature**

```ts
export interface TupleTransformation {
  readonly _tag: 'TupleTransformation'
  readonly elements: ReadonlyArray.NonEmptyReadonlyArray<TransformAST>
}
```

Added in v1.0.0

## TypeLiteralTransformation (interface)

**Signature**

```ts
export interface TypeLiteralTransformation {
  readonly _tag: 'TypeLiteralTransformation'
  readonly propertySignatureTransformations: ReadonlyArray<PropertySignatureTransformation>
  readonly indexSignatureTransformations: ReadonlyArray<IndexSignatureTransformation>
  readonly exclude: ReadonlyArray<PropertyKey>
}
```

Added in v1.0.0
