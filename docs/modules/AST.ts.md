---
title: AST.ts
nav_order: 10
parent: Modules
---

## AST overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [anyKeyword](#anykeyword)
  - [bigIntKeyword](#bigintkeyword)
  - [booleanKeyword](#booleankeyword)
  - [enums](#enums)
  - [lazy](#lazy)
  - [literalType](#literaltype)
  - [neverKeyword](#neverkeyword)
  - [numberKeyword](#numberkeyword)
  - [objectKeyword](#objectkeyword)
  - [refinement](#refinement)
  - [stringKeyword](#stringkeyword)
  - [struct](#struct)
  - [symbolKeyword](#symbolkeyword)
  - [tuple](#tuple)
  - [typeAlias](#typealias)
  - [undefinedKeyword](#undefinedkeyword)
  - [union](#union)
  - [uniqueSymbol](#uniquesymbol)
  - [unknownKeyword](#unknownkeyword)
  - [voidKeyword](#voidkeyword)
- [guards](#guards)
  - [isLazy](#islazy)
  - [isLiteralType](#isliteraltype)
  - [isNumberKeyword](#isnumberkeyword)
  - [isStringKeyword](#isstringkeyword)
  - [isStruct](#isstruct)
  - [isSymbolKeyword](#issymbolkeyword)
  - [isTuple](#istuple)
  - [isTypeAlias](#istypealias)
  - [isUnion](#isunion)
  - [isUniqueSymbol](#isuniquesymbol)
- [model](#model)
  - [AST (type alias)](#ast-type-alias)
  - [AnyKeyword (interface)](#anykeyword-interface)
  - [BigIntKeyword (interface)](#bigintkeyword-interface)
  - [BooleanKeyword (interface)](#booleankeyword-interface)
  - [Enums (interface)](#enums-interface)
  - [Lazy (interface)](#lazy-interface)
  - [LiteralType (interface)](#literaltype-interface)
  - [NeverKeyword (interface)](#neverkeyword-interface)
  - [NumberKeyword (interface)](#numberkeyword-interface)
  - [ObjectKeyword (interface)](#objectkeyword-interface)
  - [Refinement (interface)](#refinement-interface)
  - [StringKeyword (interface)](#stringkeyword-interface)
  - [Struct (interface)](#struct-interface)
  - [SymbolKeyword (interface)](#symbolkeyword-interface)
  - [Tuple (interface)](#tuple-interface)
  - [TypeAlias (interface)](#typealias-interface)
  - [UndefinedKeyword (interface)](#undefinedkeyword-interface)
  - [Union (interface)](#union-interface)
  - [UniqueSymbol (interface)](#uniquesymbol-interface)
  - [UnknownKeyword (interface)](#unknownkeyword-interface)
  - [VoidKeyword (interface)](#voidkeyword-interface)
- [utils](#utils)
  - [Annotated (interface)](#annotated-interface)
  - [Element (interface)](#element-interface)
  - [Field (interface)](#field-interface)
  - [IndexSignature (interface)](#indexsignature-interface)
  - [Literal (type alias)](#literal-type-alias)
  - [annotations](#annotations)
  - [appendElement](#appendelement)
  - [appendRestElement](#appendrestelement)
  - [element](#element)
  - [field](#field)
  - [getFields](#getfields)
  - [indexSignature](#indexsignature)
  - [keyof](#keyof)
  - [omit](#omit)
  - [partial](#partial)
  - [pick](#pick)
  - [propertyKeys](#propertykeys)
  - [record](#record)

---

# constructors

## anyKeyword

**Signature**

```ts
export declare const anyKeyword: AnyKeyword
```

Added in v1.0.0

## bigIntKeyword

**Signature**

```ts
export declare const bigIntKeyword: BigIntKeyword
```

Added in v1.0.0

## booleanKeyword

**Signature**

```ts
export declare const booleanKeyword: BooleanKeyword
```

Added in v1.0.0

## enums

**Signature**

```ts
export declare const enums: (
  enums: ReadonlyArray<readonly [string, string | number]>,
  annotations?: Annotated['annotations']
) => Enums
```

Added in v1.0.0

## lazy

**Signature**

```ts
export declare const lazy: (f: () => AST, annotations?: Annotated['annotations']) => Lazy
```

Added in v1.0.0

## literalType

**Signature**

```ts
export declare const literalType: (literal: Literal, annotations?: Annotated['annotations']) => LiteralType
```

Added in v1.0.0

## neverKeyword

**Signature**

```ts
export declare const neverKeyword: NeverKeyword
```

Added in v1.0.0

## numberKeyword

**Signature**

```ts
export declare const numberKeyword: NumberKeyword
```

Added in v1.0.0

## objectKeyword

**Signature**

```ts
export declare const objectKeyword: ObjectKeyword
```

Added in v1.0.0

## refinement

**Signature**

```ts
export declare const refinement: (
  from: AST,
  refinement: Predicate<any>,
  meta: unknown,
  annotations?: Annotated['annotations']
) => Refinement
```

Added in v1.0.0

## stringKeyword

**Signature**

```ts
export declare const stringKeyword: StringKeyword
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: (
  fields: ReadonlyArray<Field>,
  indexSignatures: ReadonlyArray<IndexSignature>,
  annotations?: Annotated['annotations'],
  allowUnexpected?: boolean
) => Struct
```

Added in v1.0.0

## symbolKeyword

**Signature**

```ts
export declare const symbolKeyword: SymbolKeyword
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: (
  elements: ReadonlyArray<Element>,
  rest: Option<RA.NonEmptyReadonlyArray<AST>>,
  isReadonly: boolean,
  annotations?: Annotated['annotations'],
  allowUnexpected?: boolean
) => Tuple
```

Added in v1.0.0

## typeAlias

**Signature**

```ts
export declare const typeAlias: (
  typeParameters: ReadonlyArray<AST>,
  type: AST,
  annotations?: Annotated['annotations']
) => TypeAlias
```

Added in v1.0.0

## undefinedKeyword

**Signature**

```ts
export declare const undefinedKeyword: UndefinedKeyword
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: (candidates: ReadonlyArray<AST>, annotations?: Annotated['annotations']) => AST
```

Added in v1.0.0

## uniqueSymbol

**Signature**

```ts
export declare const uniqueSymbol: (symbol: symbol, annotations?: Annotated['annotations']) => UniqueSymbol
```

Added in v1.0.0

## unknownKeyword

**Signature**

```ts
export declare const unknownKeyword: UnknownKeyword
```

Added in v1.0.0

## voidKeyword

**Signature**

```ts
export declare const voidKeyword: VoidKeyword
```

Added in v1.0.0

# guards

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

## isNumberKeyword

**Signature**

```ts
export declare const isNumberKeyword: (ast: AST) => ast is NumberKeyword
```

Added in v1.0.0

## isStringKeyword

**Signature**

```ts
export declare const isStringKeyword: (ast: AST) => ast is StringKeyword
```

Added in v1.0.0

## isStruct

**Signature**

```ts
export declare const isStruct: (ast: AST) => ast is Struct
```

Added in v1.0.0

## isSymbolKeyword

**Signature**

```ts
export declare const isSymbolKeyword: (ast: AST) => ast is SymbolKeyword
```

Added in v1.0.0

## isTuple

**Signature**

```ts
export declare const isTuple: (ast: AST) => ast is Tuple
```

Added in v1.0.0

## isTypeAlias

**Signature**

```ts
export declare const isTypeAlias: (ast: AST) => ast is TypeAlias
```

Added in v1.0.0

## isUnion

**Signature**

```ts
export declare const isUnion: (ast: AST) => ast is Union
```

Added in v1.0.0

## isUniqueSymbol

**Signature**

```ts
export declare const isUniqueSymbol: (ast: AST) => ast is UniqueSymbol
```

Added in v1.0.0

# model

## AST (type alias)

**Signature**

```ts
export type AST =
  | TypeAlias
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
  | ObjectKeyword
  | Tuple
  | Struct
  | Union
  | Lazy
  | Enums
  | Refinement
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

## Enums (interface)

**Signature**

```ts
export interface Enums extends Annotated {
  readonly _tag: 'Enums'
  readonly enums: ReadonlyArray<readonly [string, string | number]>
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

## ObjectKeyword (interface)

**Signature**

```ts
export interface ObjectKeyword extends Annotated {
  readonly _tag: 'ObjectKeyword'
}
```

Added in v1.0.0

## Refinement (interface)

**Signature**

```ts
export interface Refinement extends Annotated {
  readonly _tag: 'Refinement'
  readonly from: AST
  readonly refinement: Predicate<any>
  readonly meta: unknown
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
  readonly allowUnexpected: boolean
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
  readonly allowUnexpected: boolean
}
```

Added in v1.0.0

## TypeAlias (interface)

**Signature**

```ts
export interface TypeAlias extends Annotated {
  readonly _tag: 'TypeAlias'
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

# utils

## Annotated (interface)

**Signature**

```ts
export interface Annotated {
  readonly annotations: Record<string | symbol, unknown>
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
  readonly key: 'string' | 'number' | 'symbol'
  readonly value: AST
  readonly isReadonly: boolean
}
```

Added in v1.0.0

## Literal (type alias)

**Signature**

```ts
export type Literal = string | number | boolean | null | bigint
```

Added in v1.0.0

## annotations

**Signature**

```ts
export declare const annotations: (ast: AST, annotations?: Annotated['annotations']) => AST
```

Added in v1.0.0

## appendElement

**Signature**

```ts
export declare const appendElement: (ast: Tuple, newElement: Element, annotations?: Annotated['annotations']) => Tuple
```

Added in v1.0.0

## appendRestElement

**Signature**

```ts
export declare const appendRestElement: (ast: Tuple, restElement: AST, annotations?: Annotated['annotations']) => Tuple
```

Added in v1.0.0

## element

**Signature**

```ts
export declare const element: (type: AST, isOptional: boolean, annotations?: Annotated['annotations']) => Element
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
  annotations?: Annotated['annotations']
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
  key: IndexSignature['key'],
  value: AST,
  isReadonly: boolean,
  annotations?: Annotated['annotations']
) => IndexSignature
```

Added in v1.0.0

## keyof

**Signature**

```ts
export declare const keyof: (ast: AST) => AST
```

Added in v1.0.0

## omit

**Signature**

```ts
export declare const omit: (ast: AST, keys: ReadonlyArray<PropertyKey>) => Struct
```

Added in v1.0.0

## partial

**Signature**

```ts
export declare const partial: (ast: AST) => AST
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: (ast: AST, keys: ReadonlyArray<PropertyKey>) => Struct
```

Added in v1.0.0

## propertyKeys

**Signature**

```ts
export declare const propertyKeys: (ast: AST) => ReadonlyArray<PropertyKey>
```

Added in v1.0.0

## record

**Signature**

```ts
export declare const record: (key: AST, value: AST, isReadonly: boolean) => Struct
```

Added in v1.0.0
