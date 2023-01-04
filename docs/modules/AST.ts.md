---
title: AST.ts
nav_order: 6
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
  - [literal](#literal)
  - [neverKeyword](#neverkeyword)
  - [numberKeyword](#numberkeyword)
  - [objectKeyword](#objectkeyword)
  - [refinement](#refinement)
  - [stringKeyword](#stringkeyword)
  - [symbolKeyword](#symbolkeyword)
  - [templateLiteral](#templateliteral)
  - [transformOrFail](#transformorfail)
  - [tuple](#tuple)
  - [typeAlias](#typealias)
  - [typeLiteral](#typeliteral)
  - [undefinedKeyword](#undefinedkeyword)
  - [union](#union)
  - [uniqueSymbol](#uniquesymbol)
  - [unknownKeyword](#unknownkeyword)
  - [voidKeyword](#voidkeyword)
- [guards](#guards)
  - [isLazy](#islazy)
  - [isLiteral](#isliteral)
  - [isNumberKeyword](#isnumberkeyword)
  - [isStringKeyword](#isstringkeyword)
  - [isSymbolKeyword](#issymbolkeyword)
  - [isTemplateLiteral](#istemplateliteral)
  - [isTuple](#istuple)
  - [isTypeAlias](#istypealias)
  - [isTypeLiteral](#istypeliteral)
  - [isUnion](#isunion)
  - [isUniqueSymbol](#isuniquesymbol)
- [model](#model)
  - [AST (type alias)](#ast-type-alias)
  - [AnyKeyword (interface)](#anykeyword-interface)
  - [BigIntKeyword (interface)](#bigintkeyword-interface)
  - [BooleanKeyword (interface)](#booleankeyword-interface)
  - [Enums (interface)](#enums-interface)
  - [Lazy (interface)](#lazy-interface)
  - [Literal (interface)](#literal-interface)
  - [NeverKeyword (interface)](#neverkeyword-interface)
  - [NumberKeyword (interface)](#numberkeyword-interface)
  - [ObjectKeyword (interface)](#objectkeyword-interface)
  - [Refinement (interface)](#refinement-interface)
  - [StringKeyword (interface)](#stringkeyword-interface)
  - [SymbolKeyword (interface)](#symbolkeyword-interface)
  - [TemplateLiteral (interface)](#templateliteral-interface)
  - [Transform (interface)](#transform-interface)
  - [Tuple (interface)](#tuple-interface)
  - [TypeAlias (interface)](#typealias-interface)
  - [TypeLiteral (interface)](#typeliteral-interface)
  - [UndefinedKeyword (interface)](#undefinedkeyword-interface)
  - [Union (interface)](#union-interface)
  - [UniqueSymbol (interface)](#uniquesymbol-interface)
  - [UnknownKeyword (interface)](#unknownkeyword-interface)
  - [VoidKeyword (interface)](#voidkeyword-interface)
- [utils](#utils)
  - [Annotated (interface)](#annotated-interface)
  - [Element (interface)](#element-interface)
  - [IndexSignature (interface)](#indexsignature-interface)
  - [LiteralValue (type alias)](#literalvalue-type-alias)
  - [PropertySignature (interface)](#propertysignature-interface)
  - [TemplateLiteralSpan (interface)](#templateliteralspan-interface)
  - [appendElement](#appendelement)
  - [appendRestElement](#appendrestelement)
  - [element](#element)
  - [getPropertySignatures](#getpropertysignatures)
  - [indexSignature](#indexsignature)
  - [keyof](#keyof)
  - [omit](#omit)
  - [partial](#partial)
  - [pick](#pick)
  - [propertySignature](#propertysignature)
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
export declare const lazy: (f: () => AST) => Lazy
```

Added in v1.0.0

## literal

**Signature**

```ts
export declare const literal: (literal: LiteralValue) => Literal
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
export declare const refinement: (from: AST, refinement: Predicate<any>, meta: unknown) => Refinement
```

Added in v1.0.0

## stringKeyword

**Signature**

```ts
export declare const stringKeyword: StringKeyword
```

Added in v1.0.0

## symbolKeyword

**Signature**

```ts
export declare const symbolKeyword: SymbolKeyword
```

Added in v1.0.0

## templateLiteral

**Signature**

```ts
export declare const templateLiteral: (
  head: string,
  spans: ReadonlyArray<TemplateLiteralSpan>
) => TemplateLiteral | Literal
```

Added in v1.0.0

## transformOrFail

**Signature**

```ts
export declare const transformOrFail: (from: AST, to: AST, f: Transform['f'], g: Transform['g']) => Transform
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: (
  elements: ReadonlyArray<Element>,
  rest: Option<RA.NonEmptyReadonlyArray<AST>>,
  isReadonly: boolean,
  isUnexpectedAllowed?: boolean,
  annotations?: Annotated['annotations']
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

## typeLiteral

**Signature**

```ts
export declare const typeLiteral: (
  propertySignatures: ReadonlyArray<PropertySignature>,
  indexSignatures: ReadonlyArray<IndexSignature>,
  isUnexpectedAllowed?: boolean,
  annotations?: Annotated['annotations']
) => TypeLiteral
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
export declare const union: (candidates: ReadonlyArray<AST>) => AST
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

## isLiteral

**Signature**

```ts
export declare const isLiteral: (ast: AST) => ast is Literal
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

## isSymbolKeyword

**Signature**

```ts
export declare const isSymbolKeyword: (ast: AST) => ast is SymbolKeyword
```

Added in v1.0.0

## isTemplateLiteral

**Signature**

```ts
export declare const isTemplateLiteral: (ast: AST) => ast is TemplateLiteral
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

## isTypeLiteral

**Signature**

```ts
export declare const isTypeLiteral: (ast: AST) => ast is TypeLiteral
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
  | Literal
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
  | TypeLiteral
  | Union
  | Lazy
  | Enums
  | Refinement
  | TemplateLiteral
  | Transform
```

Added in v1.0.0

## AnyKeyword (interface)

**Signature**

```ts
export interface AnyKeyword {
  readonly _tag: 'AnyKeyword'
}
```

Added in v1.0.0

## BigIntKeyword (interface)

**Signature**

```ts
export interface BigIntKeyword {
  readonly _tag: 'BigIntKeyword'
}
```

Added in v1.0.0

## BooleanKeyword (interface)

**Signature**

```ts
export interface BooleanKeyword {
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
export interface Lazy {
  readonly _tag: 'Lazy'
  readonly f: () => AST
}
```

Added in v1.0.0

## Literal (interface)

**Signature**

```ts
export interface Literal {
  readonly _tag: 'Literal'
  readonly literal: LiteralValue
}
```

Added in v1.0.0

## NeverKeyword (interface)

**Signature**

```ts
export interface NeverKeyword {
  readonly _tag: 'NeverKeyword'
}
```

Added in v1.0.0

## NumberKeyword (interface)

**Signature**

```ts
export interface NumberKeyword {
  readonly _tag: 'NumberKeyword'
}
```

Added in v1.0.0

## ObjectKeyword (interface)

**Signature**

```ts
export interface ObjectKeyword {
  readonly _tag: 'ObjectKeyword'
}
```

Added in v1.0.0

## Refinement (interface)

**Signature**

```ts
export interface Refinement {
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
export interface StringKeyword {
  readonly _tag: 'StringKeyword'
}
```

Added in v1.0.0

## SymbolKeyword (interface)

**Signature**

```ts
export interface SymbolKeyword {
  readonly _tag: 'SymbolKeyword'
}
```

Added in v1.0.0

## TemplateLiteral (interface)

**Signature**

```ts
export interface TemplateLiteral {
  readonly _tag: 'TemplateLiteral'
  readonly head: string
  readonly spans: RA.NonEmptyReadonlyArray<TemplateLiteralSpan>
}
```

Added in v1.0.0

## Transform (interface)

**Signature**

```ts
export interface Transform {
  readonly _tag: 'Transform'
  readonly from: AST
  readonly to: AST
  readonly f: Decoder<any, any>['decode']
  readonly g: Decoder<any, any>['decode']
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
  readonly isUnexpectedAllowed: boolean
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

## TypeLiteral (interface)

**Signature**

```ts
export interface TypeLiteral extends Annotated {
  readonly _tag: 'TypeLiteral'
  readonly propertySignatures: ReadonlyArray<PropertySignature>
  readonly indexSignatures: ReadonlyArray<IndexSignature>
  readonly isUnexpectedAllowed: boolean
}
```

Added in v1.0.0

## UndefinedKeyword (interface)

**Signature**

```ts
export interface UndefinedKeyword {
  readonly _tag: 'UndefinedKeyword'
}
```

Added in v1.0.0

## Union (interface)

**Signature**

```ts
export interface Union {
  readonly _tag: 'Union'
  readonly types: readonly [AST, AST, ...Array<AST>]
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
export interface UnknownKeyword {
  readonly _tag: 'UnknownKeyword'
}
```

Added in v1.0.0

## VoidKeyword (interface)

**Signature**

```ts
export interface VoidKeyword {
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
export interface Element {
  readonly type: AST
  readonly isOptional: boolean
}
```

Added in v1.0.0

## IndexSignature (interface)

**Signature**

```ts
export interface IndexSignature {
  readonly parameter: StringKeyword | SymbolKeyword | TemplateLiteral | Refinement
  readonly type: AST
  readonly isReadonly: boolean
}
```

Added in v1.0.0

## LiteralValue (type alias)

**Signature**

```ts
export type LiteralValue = string | number | boolean | null | bigint
```

Added in v1.0.0

## PropertySignature (interface)

**Signature**

```ts
export interface PropertySignature extends Annotated {
  readonly name: PropertyKey
  readonly type: AST
  readonly isOptional: boolean
  readonly isReadonly: boolean
}
```

Added in v1.0.0

## TemplateLiteralSpan (interface)

**Signature**

```ts
export interface TemplateLiteralSpan {
  readonly type: StringKeyword
  readonly literal: string
}
```

Added in v1.0.0

## appendElement

**Signature**

```ts
export declare const appendElement: (ast: Tuple, newElement: Element) => Tuple
```

Added in v1.0.0

## appendRestElement

**Signature**

```ts
export declare const appendRestElement: (ast: Tuple, restElement: AST) => Tuple
```

Added in v1.0.0

## element

**Signature**

```ts
export declare const element: (type: AST, isOptional: boolean) => Element
```

Added in v1.0.0

## getPropertySignatures

**Signature**

```ts
export declare const getPropertySignatures: (ast: AST) => ReadonlyArray<PropertySignature>
```

Added in v1.0.0

## indexSignature

**Signature**

```ts
export declare const indexSignature: (
  parameter: StringKeyword | SymbolKeyword | TemplateLiteral | Refinement,
  type: AST,
  isReadonly: boolean
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
export declare const omit: (ast: AST, keys: ReadonlyArray<PropertyKey>) => TypeLiteral
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
export declare const pick: (ast: AST, keys: ReadonlyArray<PropertyKey>) => TypeLiteral
```

Added in v1.0.0

## propertySignature

**Signature**

```ts
export declare const propertySignature: (
  name: PropertyKey,
  type: AST,
  isOptional: boolean,
  isReadonly: boolean,
  annotations?: Annotated['annotations']
) => PropertySignature
```

Added in v1.0.0

## record

**Signature**

```ts
export declare const record: (key: AST, value: AST, isReadonly: boolean) => TypeLiteral
```

Added in v1.0.0
