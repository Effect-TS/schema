/**
 * @since 1.0.0
 */
import type { Option } from "@effect/data/Option";
import * as O from "@effect/data/Option";
import * as ReadonlyArray from "@effect/data/ReadonlyArray";
import type { ParseError, ParseResult } from "@effect/schema/ParseResult";
/**
 * @category model
 * @since 1.0.0
 */
export type AST = Declaration | Literal | UniqueSymbol | UndefinedKeyword | VoidKeyword | NeverKeyword | UnknownKeyword | AnyKeyword | StringKeyword | NumberKeyword | BooleanKeyword | BigIntKeyword | SymbolKeyword | ObjectKeyword | Enums | TemplateLiteral | Refinement | Tuple | TypeLiteral | Union | Lazy | Transform;
/**
 * @category annotations
 * @since 1.0.0
 */
export type BrandAnnotation = ReadonlyArray<string>;
/**
 * @category annotations
 * @since 1.0.0
 */
export declare const BrandAnnotationId: unique symbol;
/**
 * @category annotations
 * @since 1.0.0
 */
export type TypeAnnotation = symbol;
/**
 * @category annotations
 * @since 1.0.0
 */
export declare const TypeAnnotationId: unique symbol;
/**
 * @category annotations
 * @since 1.0.0
 */
export type MessageAnnotation<A> = (a: A) => string;
/**
 * @category annotations
 * @since 1.0.0
 */
export declare const MessageAnnotationId: unique symbol;
/**
 * @category annotations
 * @since 1.0.0
 */
export type IdentifierAnnotation = string;
/**
 * @category annotations
 * @since 1.0.0
 */
export declare const IdentifierAnnotationId: unique symbol;
/**
 * @category annotations
 * @since 1.0.0
 */
export type TitleAnnotation = string;
/**
 * @category annotations
 * @since 1.0.0
 */
export declare const TitleAnnotationId: unique symbol;
/**
 * @category annotations
 * @since 1.0.0
 */
export type DescriptionAnnotation = string;
/**
 * @category annotations
 * @since 1.0.0
 */
export declare const DescriptionAnnotationId: unique symbol;
/**
 * @category annotations
 * @since 1.0.0
 */
export type ExamplesAnnotation = ReadonlyArray<unknown>;
/**
 * @category annotations
 * @since 1.0.0
 */
export declare const ExamplesAnnotationId: unique symbol;
/**
 * @category annotations
 * @since 1.0.0
 */
export type JSONSchemaAnnotation = object;
/**
 * @category annotations
 * @since 1.0.0
 */
export declare const JSONSchemaAnnotationId: unique symbol;
/**
 * @category annotations
 * @since 1.0.0
 */
export type DocumentationAnnotation = string;
/**
 * @category annotations
 * @since 1.0.0
 */
export declare const DocumentationAnnotationId: unique symbol;
/**
 * @category model
 * @since 1.0.0
 */
export interface Annotations {
    [_: symbol]: unknown;
}
/**
 * @category model
 * @since 1.0.0
 */
export interface Annotated {
    readonly annotations: Annotations;
}
/**
 * @since 1.0.0
 */
export declare const getAnnotation: <A>(key: symbol) => (annotated: Annotated) => Option<A>;
/**
 * @category model
 * @since 1.0.0
 */
export interface Declaration extends Annotated {
    readonly _tag: "Declaration";
    readonly typeParameters: ReadonlyArray<AST>;
    readonly type: AST;
    readonly decode: (...typeParameters: ReadonlyArray<AST>) => (input: any, options: ParseOptions, self: AST) => ParseResult<any>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createDeclaration: (typeParameters: ReadonlyArray<AST>, type: AST, decode: Declaration["decode"], annotations?: Annotated["annotations"]) => Declaration;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isDeclaration: (ast: AST) => ast is Declaration;
/**
 * @category model
 * @since 1.0.0
 */
export type LiteralValue = string | number | boolean | null | bigint;
/**
 * @category model
 * @since 1.0.0
 */
export interface Literal extends Annotated {
    readonly _tag: "Literal";
    readonly literal: LiteralValue;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createLiteral: (literal: LiteralValue) => Literal;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isLiteral: (ast: AST) => ast is Literal;
/**
 * @category model
 * @since 1.0.0
 */
export interface UniqueSymbol extends Annotated {
    readonly _tag: "UniqueSymbol";
    readonly symbol: symbol;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createUniqueSymbol: (symbol: symbol, annotations?: Annotated["annotations"]) => UniqueSymbol;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isUniqueSymbol: (ast: AST) => ast is UniqueSymbol;
/**
 * @category model
 * @since 1.0.0
 */
export interface UndefinedKeyword extends Annotated {
    readonly _tag: "UndefinedKeyword";
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const undefinedKeyword: UndefinedKeyword;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isUndefinedKeyword: (ast: AST) => ast is UndefinedKeyword;
/**
 * @category model
 * @since 1.0.0
 */
export interface VoidKeyword extends Annotated {
    readonly _tag: "VoidKeyword";
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const voidKeyword: VoidKeyword;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isVoidKeyword: (ast: AST) => ast is VoidKeyword;
/**
 * @category model
 * @since 1.0.0
 */
export interface NeverKeyword extends Annotated {
    readonly _tag: "NeverKeyword";
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const neverKeyword: NeverKeyword;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isNeverKeyword: (ast: AST) => ast is NeverKeyword;
/**
 * @category model
 * @since 1.0.0
 */
export interface UnknownKeyword extends Annotated {
    readonly _tag: "UnknownKeyword";
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const unknownKeyword: UnknownKeyword;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isUnknownKeyword: (ast: AST) => ast is UnknownKeyword;
/**
 * @category model
 * @since 1.0.0
 */
export interface AnyKeyword extends Annotated {
    readonly _tag: "AnyKeyword";
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const anyKeyword: AnyKeyword;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isAnyKeyword: (ast: AST) => ast is AnyKeyword;
/**
 * @category model
 * @since 1.0.0
 */
export interface StringKeyword extends Annotated {
    readonly _tag: "StringKeyword";
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const stringKeyword: StringKeyword;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isStringKeyword: (ast: AST) => ast is StringKeyword;
/**
 * @category model
 * @since 1.0.0
 */
export interface NumberKeyword extends Annotated {
    readonly _tag: "NumberKeyword";
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const numberKeyword: NumberKeyword;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isNumberKeyword: (ast: AST) => ast is NumberKeyword;
/**
 * @category model
 * @since 1.0.0
 */
export interface BooleanKeyword extends Annotated {
    readonly _tag: "BooleanKeyword";
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const booleanKeyword: BooleanKeyword;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isBooleanKeyword: (ast: AST) => ast is BooleanKeyword;
/**
 * @category model
 * @since 1.0.0
 */
export interface BigIntKeyword extends Annotated {
    readonly _tag: "BigIntKeyword";
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const bigIntKeyword: BigIntKeyword;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isBigIntKeyword: (ast: AST) => ast is BigIntKeyword;
/**
 * @category model
 * @since 1.0.0
 */
export interface SymbolKeyword extends Annotated {
    readonly _tag: "SymbolKeyword";
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const symbolKeyword: SymbolKeyword;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isSymbolKeyword: (ast: AST) => ast is SymbolKeyword;
/**
 * @category model
 * @since 1.0.0
 */
export interface ObjectKeyword extends Annotated {
    readonly _tag: "ObjectKeyword";
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const objectKeyword: ObjectKeyword;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isObjectKeyword: (ast: AST) => ast is ObjectKeyword;
/**
 * @category model
 * @since 1.0.0
 */
export interface Enums extends Annotated {
    readonly _tag: "Enums";
    readonly enums: ReadonlyArray<readonly [string, string | number]>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createEnums: (enums: ReadonlyArray<readonly [string, string | number]>) => Enums;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isEnums: (ast: AST) => ast is Enums;
/**
 * @since 1.0.0
 */
export interface TemplateLiteralSpan {
    readonly type: StringKeyword | NumberKeyword;
    readonly literal: string;
}
/**
 * @category model
 * @since 1.0.0
 */
export interface TemplateLiteral extends Annotated {
    readonly _tag: "TemplateLiteral";
    readonly head: string;
    readonly spans: ReadonlyArray.NonEmptyReadonlyArray<TemplateLiteralSpan>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createTemplateLiteral: (head: string, spans: ReadonlyArray<TemplateLiteralSpan>) => TemplateLiteral | Literal;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isTemplateLiteral: (ast: AST) => ast is TemplateLiteral;
/**
 * @since 1.0.0
 */
export interface Element {
    readonly type: AST;
    readonly isOptional: boolean;
}
/**
 * @since 1.0.0
 */
export declare const createElement: (type: AST, isOptional: boolean) => Element;
/**
 * @category model
 * @since 1.0.0
 */
export interface Tuple extends Annotated {
    readonly _tag: "Tuple";
    readonly elements: ReadonlyArray<Element>;
    readonly rest: Option<ReadonlyArray.NonEmptyReadonlyArray<AST>>;
    readonly isReadonly: boolean;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createTuple: (elements: ReadonlyArray<Element>, rest: Option<ReadonlyArray.NonEmptyReadonlyArray<AST>>, isReadonly: boolean, annotations?: Annotated["annotations"]) => Tuple;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isTuple: (ast: AST) => ast is Tuple;
/**
 * @since 1.0.0
 */
export interface PropertySignature extends Annotated {
    readonly name: PropertyKey;
    readonly type: AST;
    readonly isOptional: boolean;
    readonly isReadonly: boolean;
}
/**
 * @since 1.0.0
 */
export declare const createPropertySignature: (name: PropertyKey, type: AST, isOptional: boolean, isReadonly: boolean, annotations?: Annotated["annotations"]) => PropertySignature;
/**
 * @since 1.0.0
 */
export type Parameter = StringKeyword | SymbolKeyword | TemplateLiteral | Refinement<Parameter>;
/**
 * @since 1.0.0
 */
export declare const isParameter: (ast: AST) => ast is Parameter;
/**
 * @since 1.0.0
 */
export interface IndexSignature {
    readonly parameter: Parameter;
    readonly type: AST;
    readonly isReadonly: boolean;
}
/**
 * @since 1.0.0
 */
export declare const createIndexSignature: (parameter: AST, type: AST, isReadonly: boolean) => IndexSignature;
/**
 * @category model
 * @since 1.0.0
 */
export interface TypeLiteral extends Annotated {
    readonly _tag: "TypeLiteral";
    readonly propertySignatures: ReadonlyArray<PropertySignature>;
    readonly indexSignatures: ReadonlyArray<IndexSignature>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createTypeLiteral: (propertySignatures: ReadonlyArray<PropertySignature>, indexSignatures: ReadonlyArray<IndexSignature>, annotations?: Annotated["annotations"]) => TypeLiteral;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isTypeLiteral: (ast: AST) => ast is TypeLiteral;
/**
 * @since 1.0.0
 */
export type Members<A> = readonly [A, A, ...Array<A>];
/**
 * @category model
 * @since 1.0.0
 */
export interface Union extends Annotated {
    readonly _tag: "Union";
    readonly types: Members<AST>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createUnion: (candidates: ReadonlyArray<AST>, annotations?: Annotated["annotations"]) => AST;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isUnion: (ast: AST) => ast is Union;
/**
 * @category model
 * @since 1.0.0
 */
export interface Lazy extends Annotated {
    readonly _tag: "Lazy";
    readonly f: () => AST;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createLazy: (f: () => AST, annotations?: Annotated["annotations"]) => Lazy;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isLazy: (ast: AST) => ast is Lazy;
/**
 * @category model
 * @since 1.0.0
 */
export interface Refinement<From = AST> extends Annotated {
    readonly _tag: "Refinement";
    readonly from: From;
    readonly filter: (input: any, options: ParseOptions, self: AST) => Option<ParseError>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createRefinement: <From extends AST>(from: From, filter: Refinement["filter"], annotations?: Annotated["annotations"]) => Transform | Refinement<From>;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isRefinement: (ast: AST) => ast is Refinement<AST>;
/**
 * @category model
 * @since 1.0.0
 */
export interface ParseOptions {
    /** default "first" */
    readonly errors?: "first" | "all";
    /** default "ignore" */
    readonly onExcessProperty?: "ignore" | "error";
}
/**
 * If `propertySignatureTransformations.length > 0` then `decode` / `encode` are derived.
 *
 * @category model
 * @since 1.0.0
 */
export interface Transform extends Annotated {
    readonly _tag: "Transform";
    readonly from: AST;
    readonly to: AST;
    readonly transformAST: TransformAST;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createTransform: (from: AST, to: AST, transformAST: TransformAST, annotations?: Annotated["annotations"]) => Transform;
/**
 * @category guards
 * @since 1.0.0
 */
export declare const isTransform: (ast: AST) => ast is Transform;
/**
 * Adds a group of annotations, potentially overwriting existing annotations.
 *
 * @since 1.0.0
 */
export declare const mergeAnnotations: (ast: AST, annotations: Annotated["annotations"]) => AST;
/**
 * Adds a rest element to the end of a tuple, or throws an exception if the rest element is already present.
 *
 * @since 1.0.0
 */
export declare const appendRestElement: (ast: Tuple, restElement: AST) => Tuple;
/**
 * Appends an element to a tuple or throws an exception in the following cases:
 * - A required element cannot follow an optional element. ts(1257)
 * - An optional element cannot follow a rest element. ts(1266)
 *
 * @since 1.0.0
 */
export declare const appendElement: (ast: Tuple, newElement: Element) => Tuple;
/**
 * Equivalent at runtime to the TypeScript type-level `keyof` operator.
 *
 * @since 1.0.0
 */
export declare const keyof: (ast: AST) => AST;
/**
 * @since 1.0.0
 */
export declare const getPropertySignatures: (ast: AST) => ReadonlyArray<PropertySignature>;
/**
 * Create a record with the specified key type and value type.
 *
 * @since 1.0.0
 */
export declare const createRecord: (key: AST, value: AST, isReadonly: boolean) => TypeLiteral;
/**
 * Equivalent at runtime to the built-in TypeScript utility type `Pick`.
 *
 * @since 1.0.0
 */
export declare const pick: (ast: AST, keys: ReadonlyArray<PropertyKey>) => TypeLiteral;
/**
 * Equivalent at runtime to the built-in TypeScript utility type `Omit`.
 *
 * @since 1.0.0
 */
export declare const omit: (ast: AST, keys: ReadonlyArray<PropertyKey>) => TypeLiteral;
/**
 * Equivalent at runtime to the built-in TypeScript utility type `Partial`.
 *
 * @since 1.0.0
 */
export declare const partial: (ast: AST) => AST;
/**
 * Equivalent at runtime to the built-in TypeScript utility type `Required`.
 *
 * @since 1.0.0
 */
export declare const required: (ast: AST) => AST;
/**
 * @since 1.0.0
 */
export type Compiler<A> = (ast: AST) => A;
/**
 * @since 1.0.0
 */
export type Match<A> = {
    [K in AST["_tag"]]: (ast: Extract<AST, {
        _tag: K;
    }>, compile: Compiler<A>) => A;
};
/**
 * @since 1.0.0
 */
export declare const getCompiler: <A>(match: Match<A>) => Compiler<A>;
/**
 * @since 1.0.0
 */
export declare const to: (ast: AST) => AST;
/**
 * @since 1.0.0
 */
export declare const from: (ast: AST) => AST;
/**
 * @category model
 * @since 1.0.0
 */
export type TransformAST = FinalTransformation | ComposeTransformation | TypeLiteralTransformation;
/**
 * @category model
 * @since 1.0.0
 */
export interface FinalTransformation {
    readonly _tag: "FinalTransformation";
    readonly decode: (input: any, options: ParseOptions, self: AST) => ParseResult<any>;
    readonly encode: (input: any, options: ParseOptions, self: AST) => ParseResult<any>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createFinalTransformation: (decode: FinalTransformation["decode"], encode: FinalTransformation["encode"]) => FinalTransformation;
/**
 * @category model
 * @since 1.0.0
 */
export interface ComposeTransformation {
    readonly _tag: "ComposeTransformation";
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const composeTransformation: ComposeTransformation;
/**
 * Represents a `PropertySignature -> PropertySignature` transformation
 *
 * The semantic of `decode` is:
 * - `none()` represents the absence of the key/value pair
 * - `some(value)` represents the presence of the key/value pair
 *
 * The semantic of `encode` is:
 * - `none()` you don't want to output the key/value pair
 * - `some(value)` you want to output the key/value pair
 *
 * @category model
 * @since 1.0.0
 */
export interface FinalPropertySignatureTransformation {
    readonly _tag: "FinalPropertySignatureTransformation";
    readonly decode: (o: Option<any>) => Option<any>;
    readonly encode: (o: Option<any>) => Option<any>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createFinalPropertySignatureTransformation: (decode: FinalPropertySignatureTransformation["decode"], encode: FinalPropertySignatureTransformation["encode"]) => FinalPropertySignatureTransformation;
/**
 * @category model
 * @since 1.0.0
 */
export interface PropertySignatureTransformation {
    readonly from: PropertyKey;
    readonly to: PropertyKey;
    readonly transformation: FinalPropertySignatureTransformation;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createPropertySignatureTransformation: (from: PropertyKey, to: PropertyKey, transformation: PropertySignatureTransformation["transformation"]) => PropertySignatureTransformation;
/**
 * @category model
 * @since 1.0.0
 */
export interface TypeLiteralTransformation {
    readonly _tag: "TypeLiteralTransformation";
    readonly propertySignatureTransformations: ReadonlyArray<PropertySignatureTransformation>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const createTypeLiteralTransformation: (propertySignatureTransformations: TypeLiteralTransformation["propertySignatureTransformations"]) => TypeLiteralTransformation;
/**
 * @category guard
 * @since 1.0.0
 */
export declare const isTypeLiteralTransformation: (ast: TransformAST) => ast is TypeLiteralTransformation;
//# sourceMappingURL=AST.d.ts.map