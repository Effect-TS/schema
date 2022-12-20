---
title: AST.ts
nav_order: 10
parent: Modules
---

## AST overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [AST (type alias)](#ast-type-alias)
  - [Annotated (interface)](#annotated-interface)
  - [AnyKeyword (interface)](#anykeyword-interface)
  - [BigIntKeyword (interface)](#bigintkeyword-interface)
  - [BooleanKeyword (interface)](#booleankeyword-interface)
  - [Element (interface)](#element-interface)
  - [Enums (interface)](#enums-interface)
  - [Field (interface)](#field-interface)
  - [IndexSignature (interface)](#indexsignature-interface)
  - [Lazy (interface)](#lazy-interface)
  - [Literal (type alias)](#literal-type-alias)
  - [LiteralType (interface)](#literaltype-interface)
  - [NeverKeyword (interface)](#neverkeyword-interface)
  - [NumberKeyword (interface)](#numberkeyword-interface)
  - [Refinement (interface)](#refinement-interface)
  - [StringKeyword (interface)](#stringkeyword-interface)
  - [Struct (interface)](#struct-interface)
  - [SymbolKeyword (interface)](#symbolkeyword-interface)
  - [Tuple (interface)](#tuple-interface)
  - [TypeAliasDeclaration (interface)](#typealiasdeclaration-interface)
  - [UndefinedKeyword (interface)](#undefinedkeyword-interface)
  - [Union (interface)](#union-interface)
  - [UniqueSymbol (interface)](#uniquesymbol-interface)
  - [UnknownKeyword (interface)](#unknownkeyword-interface)
  - [VoidKeyword (interface)](#voidkeyword-interface)
  - [anyKeyword](#anykeyword)
  - [appendElement](#appendelement)
  - [appendRestElement](#appendrestelement)
  - [bigIntKeyword](#bigintkeyword)
  - [booleanKeyword](#booleankeyword)
  - [element](#element)
  - [enums](#enums)
  - [field](#field)
  - [getFields](#getfields)
  - [indexSignature](#indexsignature)
  - [isLazy](#islazy)
  - [isLiteralType](#isliteraltype)
  - [isStruct](#isstruct)
  - [isTuple](#istuple)
  - [isTypeAliasDeclaration](#istypealiasdeclaration)
  - [isUnion](#isunion)
  - [keyof](#keyof)
  - [lazy](#lazy)
  - [literalType](#literaltype)
  - [neverKeyword](#neverkeyword)
  - [numberKeyword](#numberkeyword)
  - [omit](#omit)
  - [partial](#partial)
  - [pick](#pick)
  - [prependAllAnnotations](#prependallannotations)
  - [prependAnnotation](#prependannotation)
  - [refinement](#refinement)
  - [stringKeyword](#stringkeyword)
  - [struct](#struct)
  - [symbolKeyword](#symbolkeyword)
  - [tuple](#tuple)
  - [typeAliasDeclaration](#typealiasdeclaration)
  - [undefinedKeyword](#undefinedkeyword)
  - [union](#union)
  - [uniqueSymbol](#uniquesymbol)
  - [unknownKeyword](#unknownkeyword)
  - [voidKeyword](#voidkeyword)

---

# utils

## AST (type alias)

**Signature**

```ts
export type AST =
  | TypeAliasDeclaration
  | LiteralType
  | UniqueSymbol
  | UndefinedKeyword
  | VoidKeyword
  | NeverKeyword
  | UnknownKeyword
  | AnyKeyword
  | StringKeyword
  | NumberKeyword
  | BooleanKeyword
  | BigIntKeyword
  | SymbolKeyword
  | Tuple
  | Struct
  | Union
  | Lazy
  | Enums
  | Refinement
```

Added in v1.0.0

## Annotated (interface)

**Signature**

```ts
export interface Annotated {
  readonly annotations: ReadonlyArray<unknown>
}
```

Added in v1.0.0

## AnyKeyword (interface)

**Signature**

```ts
export interface AnyKeyword extends Annotated {
  readonly _tag: 'AnyKeyword'
}
```

Added in v1.0.0

## BigIntKeyword (interface)

**Signature**

```ts
export interface BigIntKeyword extends Annotated {
  readonly _tag: 'BigIntKeyword'
}
```

Added in v1.0.0

## BooleanKeyword (interface)

**Signature**

```ts
export interface BooleanKeyword extends Annotated {
  readonly _tag: 'BooleanKeyword'
}
```

Added in v1.0.0

## Element (interface)

**Signature**

```ts
export interface Element extends Annotated {
  readonly type: AST
  readonly isOptional: boolean
}
```

Added in v1.0.0

## Enums (interface)

**Signature**

```ts
export interface Enums extends Annotated {
  readonly _tag: 'Enums'
  readonly enums: ReadonlyArray<readonly [string, string | number]>
}
```

Added in v1.0.0

## Field (interface)

**Signature**

```ts
export interface Field extends Annotated {
  readonly key: PropertyKey
  readonly value: AST
  readonly isOptional: boolean
  readonly isReadonly: boolean
}
```

Added in v1.0.0

## IndexSignature (interface)

**Signature**

```ts
export interface IndexSignature extends Annotated {
  readonly key: 'string' | 'symbol'
  readonly value: AST
  readonly isReadonly: boolean
}
```

Added in v1.0.0

## Lazy (interface)

**Signature**

```ts
export interface Lazy extends Annotated {
  readonly _tag: 'Lazy'
  readonly f: () => AST
}
```

Added in v1.0.0

## Literal (type alias)

**Signature**

```ts
export type Literal = string | number | boolean | null | bigint
```

Added in v1.0.0

## LiteralType (interface)

**Signature**

```ts
export interface LiteralType extends Annotated {
  readonly _tag: 'LiteralType'
  readonly literal: Literal
}
```

Added in v1.0.0

## NeverKeyword (interface)

**Signature**

```ts
export interface NeverKeyword extends Annotated {
  readonly _tag: 'NeverKeyword'
}
```

Added in v1.0.0

## NumberKeyword (interface)

**Signature**

```ts
export interface NumberKeyword extends Annotated {
  readonly _tag: 'NumberKeyword'
}
```

Added in v1.0.0

## Refinement (interface)

**Signature**

```ts
export interface Refinement extends Annotated {
  readonly _tag: 'Refinement'
  readonly from: AST
  readonly decode: Decoder<any, any>['decode']
}
```

Added in v1.0.0

## StringKeyword (interface)

**Signature**

```ts
export interface StringKeyword extends Annotated {
  readonly _tag: 'StringKeyword'
}
```

Added in v1.0.0

## Struct (interface)

**Signature**

```ts
export interface Struct extends Annotated {
  readonly _tag: 'Struct'
  readonly fields: ReadonlyArray<Field>
  readonly indexSignatures: ReadonlyArray<IndexSignature>
}
```

Added in v1.0.0

## SymbolKeyword (interface)

**Signature**

```ts
export interface SymbolKeyword extends Annotated {
  readonly _tag: 'SymbolKeyword'
}
```

Added in v1.0.0

## Tuple (interface)

**Signature**

```ts
export interface Tuple extends Annotated {
  readonly _tag: 'Tuple'
  readonly elements: ReadonlyArray<Element>
  readonly rest: Option<RA.NonEmptyReadonlyArray<AST>>
  readonly isReadonly: boolean
}
```

Added in v1.0.0

## TypeAliasDeclaration (interface)

**Signature**

```ts
export interface TypeAliasDeclaration extends Annotated {
  readonly _tag: 'TypeAliasDeclaration'
  readonly typeParameters: ReadonlyArray<AST>
  readonly type: AST
}
```

Added in v1.0.0

## UndefinedKeyword (interface)

**Signature**

```ts
export interface UndefinedKeyword extends Annotated {
  readonly _tag: 'UndefinedKeyword'
}
```

Added in v1.0.0

## Union (interface)

**Signature**

```ts
export interface Union extends Annotated {
  readonly _tag: 'Union'
  readonly members: readonly [AST, AST, ...Array<AST>]
}
```

Added in v1.0.0

## UniqueSymbol (interface)

**Signature**

```ts
export interface UniqueSymbol extends Annotated {
  readonly _tag: 'UniqueSymbol'
  readonly symbol: symbol
}
```

Added in v1.0.0

## UnknownKeyword (interface)

**Signature**

```ts
export interface UnknownKeyword extends Annotated {
  readonly _tag: 'UnknownKeyword'
}
```

Added in v1.0.0

## VoidKeyword (interface)

**Signature**

```ts
export interface VoidKeyword extends Annotated {
  readonly _tag: 'VoidKeyword'
}
```

Added in v1.0.0

## anyKeyword

**Signature**

```ts
export declare const anyKeyword: (annotations: ReadonlyArray<unknown>) => AnyKeyword
```

Added in v1.0.0

## appendElement

**Signature**

```ts
export declare const appendElement: (ast: Tuple, element: Element, annotations: ReadonlyArray<unknown>) => Tuple
```

Added in v1.0.0

## appendRestElement

**Signature**

```ts
export declare const appendRestElement: (ast: Tuple, restElement: AST, annotations: ReadonlyArray<unknown>) => Tuple
```

Added in v1.0.0

## bigIntKeyword

**Signature**

```ts
export declare const bigIntKeyword: (annotations: ReadonlyArray<unknown>) => BigIntKeyword
```

Added in v1.0.0

## booleanKeyword

**Signature**

```ts
export declare const booleanKeyword: (annotations: ReadonlyArray<unknown>) => BooleanKeyword
```

Added in v1.0.0

## element

**Signature**

```ts
export declare const element: (type: AST, isOptional: boolean, annotations: ReadonlyArray<unknown>) => Element
```

Added in v1.0.0

## enums

**Signature**

```ts
export declare const enums: (
  enums: ReadonlyArray<readonly [string, string | number]>,
  annotations: ReadonlyArray<unknown>
) => Enums
```

Added in v1.0.0

## field

**Signature**

```ts
export declare const field: (
  key: PropertyKey,
  value: AST,
  isOptional: boolean,
  isReadonly: boolean,
  annotations: ReadonlyArray<unknown>
) => Field
```

Added in v1.0.0

## getFields

**Signature**

```ts
export declare const getFields: (ast: AST) => ReadonlyArray<Field>
```

Added in v1.0.0

## indexSignature

**Signature**

```ts
export declare const indexSignature: (
  key: 'string' | 'symbol',
  value: AST,
  isReadonly: boolean,
  annotations: ReadonlyArray<unknown>
) => IndexSignature
```

Added in v1.0.0

## isLazy

**Signature**

```ts
export declare const isLazy: (ast: AST) => ast is Lazy
```

Added in v1.0.0

## isLiteralType

**Signature**

```ts
export declare const isLiteralType: (ast: AST) => ast is LiteralType
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

## isTypeAliasDeclaration

**Signature**

```ts
export declare const isTypeAliasDeclaration: (ast: AST) => ast is TypeAliasDeclaration
```

Added in v1.0.0

## isUnion

**Signature**

```ts
export declare const isUnion: (ast: AST) => ast is Union
```

Added in v1.0.0

## keyof

**Signature**

```ts
export declare const keyof: (ast: AST) => ReadonlyArray<PropertyKey>
```

Added in v1.0.0

## lazy

**Signature**

```ts
export declare const lazy: (f: () => AST, annotations: ReadonlyArray<unknown>) => Lazy
```

Added in v1.0.0

## literalType

**Signature**

```ts
export declare const literalType: (literal: Literal, annotations: ReadonlyArray<unknown>) => LiteralType
```

Added in v1.0.0

## neverKeyword

**Signature**

```ts
export declare const neverKeyword: (annotations: ReadonlyArray<unknown>) => NeverKeyword
```

Added in v1.0.0

## numberKeyword

**Signature**

```ts
export declare const numberKeyword: (annotations: ReadonlyArray<unknown>) => NumberKeyword
```

Added in v1.0.0

## omit

**Signature**

```ts
export declare const omit: (ast: AST, keys: ReadonlyArray<PropertyKey>, annotations: ReadonlyArray<unknown>) => Struct
```

Added in v1.0.0

## partial

**Signature**

```ts
export declare const partial: (ast: AST, annotations: ReadonlyArray<unknown>) => AST
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: (ast: AST, keys: ReadonlyArray<PropertyKey>, annotations: ReadonlyArray<unknown>) => Struct
```

Added in v1.0.0

## prependAllAnnotations

**Signature**

```ts
export declare const prependAllAnnotations: (ast: AST, annotations: ReadonlyArray<unknown>) => AST
```

Added in v1.0.0

## prependAnnotation

**Signature**

```ts
export declare const prependAnnotation: (ast: AST, annotation: unknown) => AST
```

Added in v1.0.0

## refinement

**Signature**

```ts
export declare const refinement: (
  from: AST,
  decode: Decoder<any, any>['decode'],
  annotations: ReadonlyArray<unknown>
) => Refinement
```

Added in v1.0.0

## stringKeyword

**Signature**

```ts
export declare const stringKeyword: (annotations: ReadonlyArray<unknown>) => StringKeyword
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: (
  fields: ReadonlyArray<Field>,
  indexSignatures: ReadonlyArray<IndexSignature>,
  annotations: ReadonlyArray<unknown>
) => Struct
```

Added in v1.0.0

## symbolKeyword

**Signature**

```ts
export declare const symbolKeyword: (annotations: ReadonlyArray<unknown>) => SymbolKeyword
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: (
  elements: ReadonlyArray<Element>,
  rest: Option<RA.NonEmptyReadonlyArray<AST>>,
  isReadonly: boolean,
  annotations: ReadonlyArray<unknown>
) => Tuple
```

Added in v1.0.0

## typeAliasDeclaration

**Signature**

```ts
export declare const typeAliasDeclaration: (
  typeParameters: ReadonlyArray<AST>,
  type: AST,
  annotations: ReadonlyArray<unknown>
) => TypeAliasDeclaration
```

Added in v1.0.0

## undefinedKeyword

**Signature**

```ts
export declare const undefinedKeyword: (annotations: ReadonlyArray<unknown>) => UndefinedKeyword
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: (candidates: ReadonlyArray<AST>, annotations: ReadonlyArray<unknown>) => AST
```

Added in v1.0.0

## uniqueSymbol

**Signature**

```ts
export declare const uniqueSymbol: (symbol: symbol, annotations: ReadonlyArray<unknown>) => UniqueSymbol
```

Added in v1.0.0

## unknownKeyword

**Signature**

```ts
export declare const unknownKeyword: (annotations: ReadonlyArray<unknown>) => UnknownKeyword
```

Added in v1.0.0

## voidKeyword

**Signature**

```ts
export declare const voidKeyword: (annotations: ReadonlyArray<unknown>) => VoidKeyword
```

Added in v1.0.0
