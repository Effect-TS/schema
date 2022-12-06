---
title: AST.ts
nav_order: 2
parent: Modules
---

## AST overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [AST (type alias)](#ast-type-alias)
  - [Declaration (interface)](#declaration-interface)
  - [Field (interface)](#field-interface)
  - [IndexSignature (interface)](#indexsignature-interface)
  - [Lazy (interface)](#lazy-interface)
  - [Of (interface)](#of-interface)
  - [Struct (interface)](#struct-interface)
  - [Tuple (interface)](#tuple-interface)
  - [Union (interface)](#union-interface)
  - [declare](#declare)
  - [field](#field)
  - [getFields](#getfields)
  - [getStringIndexSignature](#getstringindexsignature)
  - [getSymbolIndexSignature](#getsymbolindexsignature)
  - [indexSignature](#indexsignature)
  - [isDeclaration](#isdeclaration)
  - [isStruct](#isstruct)
  - [isTuple](#istuple)
  - [lazy](#lazy)
  - [of](#of)
  - [struct](#struct)
  - [tuple](#tuple)
  - [union](#union)

---

# utils

## AST (type alias)

**Signature**

```ts
export type AST = Declaration | Of | Struct | Tuple | Union | Lazy
```

Added in v1.0.0

## Declaration (interface)

**Signature**

```ts
export interface Declaration {
  readonly _tag: 'Declaration'
  readonly id: symbol
  readonly config: Option<unknown>
  readonly provider: Provider
  readonly nodes: ReadonlyArray<AST>
}
```

Added in v1.0.0

## Field (interface)

**Signature**

```ts
export interface Field {
  readonly key: PropertyKey
  readonly value: AST
  readonly optional: boolean
  readonly readonly: boolean
}
```

Added in v1.0.0

## IndexSignature (interface)

**Signature**

```ts
export interface IndexSignature {
  readonly value: AST
  readonly readonly: boolean
}
```

Added in v1.0.0

## Lazy (interface)

**Signature**

```ts
export interface Lazy {
  readonly _tag: 'Lazy'
  readonly f: () => AST
}
```

Added in v1.0.0

## Of (interface)

**Signature**

```ts
export interface Of {
  readonly _tag: 'Of'
  readonly value: unknown
}
```

Added in v1.0.0

## Struct (interface)

**Signature**

```ts
export interface Struct {
  readonly _tag: 'Struct'
  readonly fields: ReadonlyArray<Field>
  readonly stringIndexSignature: Option<IndexSignature>
  readonly symbolIndexSignature: Option<IndexSignature>
}
```

Added in v1.0.0

## Tuple (interface)

**Signature**

```ts
export interface Tuple {
  readonly _tag: 'Tuple'
  readonly components: ReadonlyArray<AST>
  readonly restElement: Option<AST>
  readonly readonly: boolean
}
```

Added in v1.0.0

## Union (interface)

**Signature**

```ts
export interface Union {
  readonly _tag: 'Union'
  readonly members: ReadonlyArray<AST>
}
```

Added in v1.0.0

## declare

**Signature**

```ts
export declare const declare: (
  id: symbol,
  config: Option<unknown>,
  provider: Provider,
  nodes: ReadonlyArray<AST>
) => Declaration
```

Added in v1.0.0

## field

**Signature**

```ts
export declare const field: (key: PropertyKey, value: AST, optional: boolean, readonly: boolean) => Field
```

Added in v1.0.0

## getFields

**Signature**

```ts
export declare const getFields: (ast: AST) => ReadonlyArray<Field>
```

Added in v1.0.0

## getStringIndexSignature

**Signature**

```ts
export declare const getStringIndexSignature: (ast: AST) => Option<IndexSignature>
```

Added in v1.0.0

## getSymbolIndexSignature

**Signature**

```ts
export declare const getSymbolIndexSignature: (ast: AST) => Option<IndexSignature>
```

Added in v1.0.0

## indexSignature

**Signature**

```ts
export declare const indexSignature: (value: AST, readonly: boolean) => IndexSignature
```

Added in v1.0.0

## isDeclaration

**Signature**

```ts
export declare const isDeclaration: (ast: AST) => ast is Declaration
```

Added in v1.0.0

## isStruct

**Signature**

```ts
export declare const isStruct: (ast: AST) => ast is Struct
```

Added in v1.0.0

## isTuple

**Signature**

```ts
export declare const isTuple: (ast: AST) => ast is Tuple
```

Added in v1.0.0

## lazy

**Signature**

```ts
export declare const lazy: (f: () => AST) => Lazy
```

Added in v1.0.0

## of

**Signature**

```ts
export declare const of: (value: unknown) => Of
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: (
  fields: ReadonlyArray<Field>,
  stringIndexSignature: Option<IndexSignature>,
  symbolIndexSignature: Option<IndexSignature>
) => Struct
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: (components: ReadonlyArray<AST>, restElement: Option<AST>, readonly: boolean) => Tuple
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: (members: ReadonlyArray<AST>) => Union
```

Added in v1.0.0
