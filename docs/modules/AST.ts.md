---
title: AST.ts
nav_order: 2
parent: Modules
---

## AST overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [annotations](#annotations)
  - [BrandAnnotation (type alias)](#brandannotation-type-alias)
  - [BrandAnnotationId](#brandannotationid)
  - [DescriptionAnnotation (type alias)](#descriptionannotation-type-alias)
  - [DescriptionAnnotationId](#descriptionannotationid)
  - [DocumentationAnnotation (type alias)](#documentationannotation-type-alias)
  - [DocumentationAnnotationId](#documentationannotationid)
  - [ExamplesAnnotation (type alias)](#examplesannotation-type-alias)
  - [ExamplesAnnotationId](#examplesannotationid)
  - [IdentifierAnnotation (type alias)](#identifierannotation-type-alias)
  - [IdentifierAnnotationId](#identifierannotationid)
  - [JSONSchemaAnnotation (type alias)](#jsonschemaannotation-type-alias)
  - [JSONSchemaAnnotationId](#jsonschemaannotationid)
  - [MessageAnnotation (type alias)](#messageannotation-type-alias)
  - [MessageAnnotationId](#messageannotationid)
  - [TitleAnnotation (type alias)](#titleannotation-type-alias)
  - [TitleAnnotationId](#titleannotationid)
  - [TypeAnnotation (type alias)](#typeannotation-type-alias)
  - [TypeAnnotationId](#typeannotationid)
- [constructors](#constructors)
  - [anyKeyword](#anykeyword)
  - [bigIntKeyword](#bigintkeyword)
  - [booleanKeyword](#booleankeyword)
  - [createEnums](#createenums)
  - [createLazy](#createlazy)
  - [createLiteral](#createliteral)
  - [createRefinement](#createrefinement)
  - [createTemplateLiteral](#createtemplateliteral)
  - [createTransform](#createtransform)
  - [createTuple](#createtuple)
  - [createTypeAlias](#createtypealias)
  - [createTypeLiteral](#createtypeliteral)
  - [createUnion](#createunion)
  - [createUniqueSymbol](#createuniquesymbol)
  - [neverKeyword](#neverkeyword)
  - [numberKeyword](#numberkeyword)
  - [objectKeyword](#objectkeyword)
  - [stringKeyword](#stringkeyword)
  - [symbolKeyword](#symbolkeyword)
  - [undefinedKeyword](#undefinedkeyword)
  - [unknownKeyword](#unknownkeyword)
  - [voidKeyword](#voidkeyword)
- [guards](#guards)
  - [isAnyKeyword](#isanykeyword)
  - [isBigIntKeyword](#isbigintkeyword)
  - [isBooleanKeyword](#isbooleankeyword)
  - [isLazy](#islazy)
  - [isLiteral](#isliteral)
  - [isNumberKeyword](#isnumberkeyword)
  - [isRefinement](#isrefinement)
  - [isStringKeyword](#isstringkeyword)
  - [isSymbolKeyword](#issymbolkeyword)
  - [isTemplateLiteral](#istemplateliteral)
  - [isTransform](#istransform)
  - [isTuple](#istuple)
  - [isTypeAlias](#istypealias)
  - [isTypeLiteral](#istypeliteral)
  - [isUnion](#isunion)
  - [isUniqueSymbol](#isuniquesymbol)
  - [isUnknownKeyword](#isunknownkeyword)
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
  - [ParseOptions (interface)](#parseoptions-interface)
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
  - [Compiler (type alias)](#compiler-type-alias)
  - [Element (interface)](#element-interface)
  - [IndexSignature (interface)](#indexsignature-interface)
  - [LiteralValue (type alias)](#literalvalue-type-alias)
  - [Match (type alias)](#match-type-alias)
  - [PropertySignature (interface)](#propertysignature-interface)
  - [TemplateLiteralSpan (interface)](#templateliteralspan-interface)
  - [appendElement](#appendelement)
  - [appendRestElement](#appendrestelement)
  - [createElement](#createelement)
  - [createIndexSignature](#createindexsignature)
  - [createPropertySignature](#createpropertysignature)
  - [createRecord](#createrecord)
  - [getAnnotation](#getannotation)
  - [getCompiler](#getcompiler)
  - [keyof](#keyof)
  - [mergeAnnotations](#mergeannotations)
  - [omit](#omit)
  - [partial](#partial)
  - [pick](#pick)
  - [setAnnotation](#setannotation)

---

# annotations

## BrandAnnotation (type alias)

**Signature**

```ts
export type BrandAnnotation = ReadonlyArray<string>
```

Added in v1.0.0

## BrandAnnotationId

**Signature**

```ts
export declare const BrandAnnotationId: '@effect/schema/BrandAnnotationId'
```

Added in v1.0.0

## DescriptionAnnotation (type alias)

**Signature**

```ts
export type DescriptionAnnotation = string
```

Added in v1.0.0

## DescriptionAnnotationId

**Signature**

```ts
export declare const DescriptionAnnotationId: '@effect/schema/DescriptionAnnotationId'
```

Added in v1.0.0

## DocumentationAnnotation (type alias)

**Signature**

```ts
export type DocumentationAnnotation = string
```

Added in v1.0.0

## DocumentationAnnotationId

**Signature**

```ts
export declare const DocumentationAnnotationId: '@effect/schema/DocumentationAnnotationId'
```

Added in v1.0.0

## ExamplesAnnotation (type alias)

**Signature**

```ts
export type ExamplesAnnotation = ReadonlyArray<unknown>
```

Added in v1.0.0

## ExamplesAnnotationId

**Signature**

```ts
export declare const ExamplesAnnotationId: '@effect/schema/ExamplesAnnotationId'
```

Added in v1.0.0

## IdentifierAnnotation (type alias)

**Signature**

```ts
export type IdentifierAnnotation = string
```

Added in v1.0.0

## IdentifierAnnotationId

**Signature**

```ts
export declare const IdentifierAnnotationId: '@effect/schema/IdentifierAnnotationId'
```

Added in v1.0.0

## JSONSchemaAnnotation (type alias)

**Signature**

```ts
export type JSONSchemaAnnotation = object
```

Added in v1.0.0

## JSONSchemaAnnotationId

**Signature**

```ts
export declare const JSONSchemaAnnotationId: '@effect/schema/JSONSchemaAnnotationId'
```

Added in v1.0.0

## MessageAnnotation (type alias)

**Signature**

```ts
export type MessageAnnotation<A> = (a: A) => string
```

Added in v1.0.0

## MessageAnnotationId

**Signature**

```ts
export declare const MessageAnnotationId: '@effect/schema/MessageAnnotationId'
```

Added in v1.0.0

## TitleAnnotation (type alias)

**Signature**

```ts
export type TitleAnnotation = string
```

Added in v1.0.0

## TitleAnnotationId

**Signature**

```ts
export declare const TitleAnnotationId: '@effect/schema/TitleAnnotationId'
```

Added in v1.0.0

## TypeAnnotation (type alias)

**Signature**

```ts
export type TypeAnnotation = string | symbol
```

Added in v1.0.0

## TypeAnnotationId

**Signature**

```ts
export declare const TypeAnnotationId: '@effect/schema/TypeAnnotationId'
```

Added in v1.0.0

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

## createEnums

**Signature**

```ts
export declare const createEnums: (enums: ReadonlyArray<readonly [string, string | number]>) => Enums
```

Added in v1.0.0

## createLazy

**Signature**

```ts
export declare const createLazy: (f: () => AST, annotations?: Annotated['annotations']) => Lazy
```

Added in v1.0.0

## createLiteral

**Signature**

```ts
export declare const createLiteral: (literal: LiteralValue) => Literal
```

Added in v1.0.0

## createRefinement

**Signature**

```ts
export declare const createRefinement: (
  from: AST,
  refinement: Predicate<any>,
  annotations?: Annotated['annotations']
) => Refinement
```

Added in v1.0.0

## createTemplateLiteral

**Signature**

```ts
export declare const createTemplateLiteral: (
  head: string,
  spans: ReadonlyArray<TemplateLiteralSpan>
) => TemplateLiteral | Literal
```

Added in v1.0.0

## createTransform

**Signature**

```ts
export declare const createTransform: (
  from: AST,
  to: AST,
  decode: Transform['decode'],
  encode: Transform['encode']
) => Transform
```

Added in v1.0.0

## createTuple

**Signature**

```ts
export declare const createTuple: (
  elements: ReadonlyArray<Element>,
  rest: Option<RA.NonEmptyReadonlyArray<AST>>,
  isReadonly: boolean,
  annotations?: Annotated['annotations']
) => Tuple
```

Added in v1.0.0

## createTypeAlias

**Signature**

```ts
export declare const createTypeAlias: (
  typeParameters: ReadonlyArray<AST>,
  type: AST,
  annotations?: Annotated['annotations']
) => TypeAlias
```

Added in v1.0.0

## createTypeLiteral

**Signature**

```ts
export declare const createTypeLiteral: (
  propertySignatures: ReadonlyArray<PropertySignature>,
  indexSignatures: ReadonlyArray<IndexSignature>,
  annotations?: Annotated['annotations']
) => TypeLiteral
```

Added in v1.0.0

## createUnion

**Signature**

```ts
export declare const createUnion: (candidates: ReadonlyArray<AST>, annotations?: Annotated['annotations']) => AST
```

Added in v1.0.0

## createUniqueSymbol

**Signature**

```ts
export declare const createUniqueSymbol: (symbol: symbol, annotations?: Annotated['annotations']) => UniqueSymbol
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

## undefinedKeyword

**Signature**

```ts
export declare const undefinedKeyword: UndefinedKeyword
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

## isAnyKeyword

**Signature**

```ts
export declare const isAnyKeyword: (ast: AST) => ast is AnyKeyword
```

Added in v1.0.0

## isBigIntKeyword

**Signature**

```ts
export declare const isBigIntKeyword: (ast: AST) => ast is BigIntKeyword
```

Added in v1.0.0

## isBooleanKeyword

**Signature**

```ts
export declare const isBooleanKeyword: (ast: AST) => ast is BooleanKeyword
```

Added in v1.0.0

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

## isRefinement

**Signature**

```ts
export declare const isRefinement: (ast: AST) => ast is Refinement
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

## isTransform

**Signature**

```ts
export declare const isTransform: (ast: AST) => ast is Transform
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

## isUnknownKeyword

**Signature**

```ts
export declare const isUnknownKeyword: (ast: AST) => ast is UnknownKeyword
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
  | Enums
  | TemplateLiteral
  | Tuple
  | TypeLiteral
  | Union
  | Lazy
  | Refinement
  | Transform
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

## Literal (interface)

**Signature**

```ts
export interface Literal extends Annotated {
  readonly _tag: 'Literal'
  readonly literal: LiteralValue
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

## ParseOptions (interface)

**Signature**

```ts
export interface ParseOptions {
  readonly isUnexpectedAllowed?: boolean
  readonly allErrors?: boolean
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

## SymbolKeyword (interface)

**Signature**

```ts
export interface SymbolKeyword extends Annotated {
  readonly _tag: 'SymbolKeyword'
}
```

Added in v1.0.0

## TemplateLiteral (interface)

**Signature**

```ts
export interface TemplateLiteral extends Annotated {
  readonly _tag: 'TemplateLiteral'
  readonly head: string
  readonly spans: RA.NonEmptyReadonlyArray<TemplateLiteralSpan>
}
```

Added in v1.0.0

## Transform (interface)

**Signature**

```ts
export interface Transform extends Annotated {
  readonly _tag: 'Transform'
  readonly from: AST
  readonly to: AST
  readonly decode: (input: any, options?: ParseOptions) => ParseResult<any>
  readonly encode: (input: any, options?: ParseOptions) => ParseResult<any>
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

## Compiler (type alias)

**Signature**

```ts
export type Compiler<A> = (ast: AST) => A
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

## Match (type alias)

**Signature**

```ts
export type Match<A> = {
  [K in AST['_tag']]: (ast: Extract<AST, { _tag: K }>, compile: Compiler<A>) => A
}
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
  readonly type: StringKeyword | NumberKeyword
  readonly literal: string
}
```

Added in v1.0.0

## appendElement

Appends an element to a tuple or throws an exception in the following cases:

- A required element cannot follow an optional element. ts(1257)
- An optional element cannot follow a rest element. ts(1266)

**Signature**

```ts
export declare const appendElement: (ast: Tuple, newElement: Element) => Tuple
```

Added in v1.0.0

## appendRestElement

Adds a rest element to the end of a tuple, or throws an exception if the rest element is already present.

**Signature**

```ts
export declare const appendRestElement: (ast: Tuple, restElement: AST) => Tuple
```

Added in v1.0.0

## createElement

**Signature**

```ts
export declare const createElement: (type: AST, isOptional: boolean) => Element
```

Added in v1.0.0

## createIndexSignature

**Signature**

```ts
export declare const createIndexSignature: (
  parameter: StringKeyword | SymbolKeyword | TemplateLiteral | Refinement,
  type: AST,
  isReadonly: boolean
) => IndexSignature
```

Added in v1.0.0

## createPropertySignature

**Signature**

```ts
export declare const createPropertySignature: (
  name: PropertyKey,
  type: AST,
  isOptional: boolean,
  isReadonly: boolean,
  annotations?: Annotated['annotations']
) => PropertySignature
```

Added in v1.0.0

## createRecord

Create a record with the specified key type and value type.

**Signature**

```ts
export declare const createRecord: (key: AST, value: AST, isReadonly: boolean) => TypeLiteral
```

Added in v1.0.0

## getAnnotation

**Signature**

```ts
export declare const getAnnotation: <A>(key: PropertyKey) => (annotated: Annotated) => Option<A>
```

Added in v1.0.0

## getCompiler

**Signature**

```ts
export declare const getCompiler: <A>(match: Match<A>) => Compiler<A>
```

Added in v1.0.0

## keyof

Equivalent at runtime to the TypeScript type-level `keyof` operator.

**Signature**

```ts
export declare const keyof: (ast: AST) => AST
```

Added in v1.0.0

## mergeAnnotations

Adds a group of annotations, potentially overwriting existing annotations.

**Signature**

```ts
export declare const mergeAnnotations: (
  ast: AST,
  annotations: Annotated['annotations']
) =>
  | { annotations: { [x: string]: unknown }; _tag: 'TypeAlias'; typeParameters: readonly AST[]; type: AST }
  | { annotations: { [x: string]: unknown }; _tag: 'Literal'; literal: LiteralValue }
  | { annotations: { [x: string]: unknown }; _tag: 'UniqueSymbol'; symbol: symbol }
  | { annotations: { [x: string]: unknown }; _tag: 'UndefinedKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'VoidKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'NeverKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'UnknownKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'AnyKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'StringKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'NumberKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'BooleanKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'BigIntKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'SymbolKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'ObjectKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'Enums'; enums: readonly (readonly [string, string | number])[] }
  | {
      annotations: { [x: string]: unknown }
      _tag: 'TemplateLiteral'
      head: string
      spans: readonly [TemplateLiteralSpan, ...TemplateLiteralSpan[]]
    }
  | {
      annotations: { [x: string]: unknown }
      _tag: 'Tuple'
      elements: readonly Element[]
      rest: Option<readonly [AST, ...AST[]]>
      isReadonly: boolean
    }
  | {
      annotations: { [x: string]: unknown }
      _tag: 'TypeLiteral'
      propertySignatures: readonly PropertySignature[]
      indexSignatures: readonly IndexSignature[]
    }
  | { annotations: { [x: string]: unknown }; _tag: 'Union'; types: readonly [AST, AST, ...AST[]] }
  | { annotations: { [x: string]: unknown }; _tag: 'Lazy'; f: () => AST }
  | { annotations: { [x: string]: unknown }; _tag: 'Refinement'; from: AST; refinement: Predicate<any> }
  | {
      annotations: { [x: string]: unknown }
      _tag: 'Transform'
      from: AST
      to: AST
      decode: (input: any, options?: ParseOptions | undefined) => Either<readonly [ParseError, ...ParseError[]], any>
      encode: (input: any, options?: ParseOptions | undefined) => Either<readonly [ParseError, ...ParseError[]], any>
    }
```

Added in v1.0.0

## omit

Equivalent at runtime to the built-in TypeScript utility type `Omit`.

**Signature**

```ts
export declare const omit: (ast: AST, keys: ReadonlyArray<PropertyKey>) => TypeLiteral
```

Added in v1.0.0

## partial

Equivalent at runtime to the built-in TypeScript utility type `Partial`.

**Signature**

```ts
export declare const partial: (ast: AST) => AST
```

Added in v1.0.0

## pick

Equivalent at runtime to the built-in TypeScript utility type `Pick`.

**Signature**

```ts
export declare const pick: (ast: AST, keys: ReadonlyArray<PropertyKey>) => TypeLiteral
```

Added in v1.0.0

## setAnnotation

Adds an annotation, potentially overwriting the existing annotation with the specified id.

**Signature**

```ts
export declare const setAnnotation: (
  ast: AST,
  id: PropertyKey,
  value: unknown
) =>
  | { annotations: { [x: string]: unknown }; _tag: 'TypeAlias'; typeParameters: readonly AST[]; type: AST }
  | { annotations: { [x: string]: unknown }; _tag: 'Literal'; literal: LiteralValue }
  | { annotations: { [x: string]: unknown }; _tag: 'UniqueSymbol'; symbol: symbol }
  | { annotations: { [x: string]: unknown }; _tag: 'UndefinedKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'VoidKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'NeverKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'UnknownKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'AnyKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'StringKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'NumberKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'BooleanKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'BigIntKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'SymbolKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'ObjectKeyword' }
  | { annotations: { [x: string]: unknown }; _tag: 'Enums'; enums: readonly (readonly [string, string | number])[] }
  | {
      annotations: { [x: string]: unknown }
      _tag: 'TemplateLiteral'
      head: string
      spans: readonly [TemplateLiteralSpan, ...TemplateLiteralSpan[]]
    }
  | {
      annotations: { [x: string]: unknown }
      _tag: 'Tuple'
      elements: readonly Element[]
      rest: Option<readonly [AST, ...AST[]]>
      isReadonly: boolean
    }
  | {
      annotations: { [x: string]: unknown }
      _tag: 'TypeLiteral'
      propertySignatures: readonly PropertySignature[]
      indexSignatures: readonly IndexSignature[]
    }
  | { annotations: { [x: string]: unknown }; _tag: 'Union'; types: readonly [AST, AST, ...AST[]] }
  | { annotations: { [x: string]: unknown }; _tag: 'Lazy'; f: () => AST }
  | { annotations: { [x: string]: unknown }; _tag: 'Refinement'; from: AST; refinement: Predicate<any> }
  | {
      annotations: { [x: string]: unknown }
      _tag: 'Transform'
      from: AST
      to: AST
      decode: (input: any, options?: ParseOptions | undefined) => Either<readonly [ParseError, ...ParseError[]], any>
      encode: (input: any, options?: ParseOptions | undefined) => Either<readonly [ParseError, ...ParseError[]], any>
    }
```

Added in v1.0.0
