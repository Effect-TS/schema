/**
 * @since 1.0.0
 */
import type { Brand } from "@effect/data/Brand";
import type { Chunk } from "@effect/data/Chunk";
import * as D from "@effect/data/Data";
import * as E from "@effect/data/Either";
import type { Either } from "@effect/data/Either";
import type { Option } from "@effect/data/Option";
import type { Predicate, Refinement } from "@effect/data/Predicate";
import * as ReadonlyArray from "@effect/data/ReadonlyArray";
import type { Arbitrary } from "@effect/schema/Arbitrary";
import * as AST from "@effect/schema/AST";
import type { ParseOptions } from "@effect/schema/AST";
import type { ParseResult } from "@effect/schema/ParseResult";
/**
 * @category model
 * @since 1.0.0
 */
export declare const SchemaTypeId: unique symbol;
/**
 * @category model
 * @since 1.0.0
 */
export type SchemaTypeId = typeof SchemaTypeId;
/**
 * @category model
 * @since 1.0.0
 */
export interface Schema<A> {
    readonly [SchemaTypeId]: (_: A) => A;
    readonly From: (_: A) => A;
    readonly To: (_: A) => A;
    readonly ast: AST.AST;
}
/**
 * @since 1.0.0
 */
export type To<S extends {
    readonly To: (..._: any) => any;
}> = Parameters<S["To"]>[0];
export { 
/**
 * @category asserts
 * @since 1.0.0
 */
asserts, 
/**
 * @category guards
 * @since 1.0.0
 */
is, 
/**
 * @category validating
 * @since 1.0.0
 */
validate, 
/**
 * @category validating
 * @since 1.0.0
 */
validateEffect, 
/**
 * @category validating
 * @since 1.0.0
 */
validateEither, 
/**
 * @category validating
 * @since 1.0.0
 */
validateOption, 
/**
 * @category validating
 * @since 1.0.0
 */
validatePromise, 
/**
 * @category validating
 * @since 1.0.0
 */
validateResult } from "@effect/schema/Parser";
export type { 
/**
 * @category asserts
 * @since 1.0.0
 */
ToAsserts } from "@effect/schema/Parser";
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const annotations: <A>(options: DocAnnotations<A>) => (self: Schema<A>) => Schema<A>;
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const make: <A>(ast: AST.AST) => Schema<A>;
/**
  @category constructors
  @since 1.0.0
*/
export declare const declare: (typeParameters: ReadonlyArray<Schema<any>>, type: Schema<any>, decode: (...typeParameters: ReadonlyArray<Schema<any>>) => (input: any, options: ParseOptions, ast: AST.AST) => ParseResult<any>, annotations?: AST.Annotated["annotations"]) => Schema<any>;
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const literal: <Literals extends readonly AST.LiteralValue[]>(...literals: Literals) => Schema<Literals[number]>;
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const uniqueSymbol: <S extends symbol>(symbol: S, annotations?: AST.Annotated["annotations"]) => Schema<S>;
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const enums: <A extends {
    [x: string]: string | number;
}>(enums: A) => Schema<A[keyof A]>;
/**
 * @since 1.0.0
 */
export type Join<T> = T extends [infer Head, ...infer Tail] ? `${Head & (string | number | bigint | boolean | null | undefined)}${Tail extends [] ? "" : Join<Tail>}` : never;
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const templateLiteral: <T extends [Schema<any>, ...Schema<any>[]]>(...[head, ...tail]: T) => Schema<Join<{ [K in keyof T]: To<T[K]>; }>>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const InstanceOfTypeId: unique symbol;
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const instanceOf: <A extends abstract new (...args: any) => any>(constructor: A, options?: FilterAnnotations<unknown>) => Schema<InstanceType<A>>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const BrandTypeId: unique symbol;
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const fromBrand: <C extends Brand<string | symbol>>(constructor: Brand.Constructor<C>, options?: FilterAnnotations<Brand.Unbranded<C>> | undefined) => <A extends Brand.Unbranded<C>>(self: Schema<A>) => Schema<A & C>;
declare const _undefined: Schema<undefined>;
declare const _void: Schema<void>;
declare const _null: Schema<null>;
export { 
/**
 * @category primitives
 * @since 1.0.0
 */
_null as null, 
/**
 * @category primitives
 * @since 1.0.0
 */
_undefined as undefined, 
/**
 * @category primitives
 * @since 1.0.0
 */
_void as void };
/**
 * @category primitives
 * @since 1.0.0
 */
export declare const never: Schema<never>;
/**
 * @category primitives
 * @since 1.0.0
 */
export declare const unknown: Schema<unknown>;
/**
 * @category primitives
 * @since 1.0.0
 */
export declare const any: Schema<any>;
/**
 * @category primitives
 * @since 1.0.0
 */
export declare const string: Schema<string>;
/**
 * @category primitives
 * @since 1.0.0
 */
export declare const number: Schema<number>;
/**
 * @category primitives
 * @since 1.0.0
 */
export declare const boolean: Schema<boolean>;
/**
 * @category primitives
 * @since 1.0.0
 */
export declare const bigint: Schema<bigint>;
/**
 * @category primitives
 * @since 1.0.0
 */
export declare const symbol: Schema<symbol>;
/**
 * @category primitives
 * @since 1.0.0
 */
export declare const object: Schema<object>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const union: <Members extends readonly Schema<any>[]>(...members: Members) => Schema<To<Members[number]>>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const nullable: <A>(self: Schema<A>) => Schema<A | null>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const keyof: <A>(schema: Schema<A>) => Schema<keyof A>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const tuple: <Elements extends readonly Schema<any>[]>(...elements: Elements) => Schema<{ readonly [K in keyof Elements]: To<Elements[K]>; }>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const optionalElement: <E>(element: Schema<E>) => <A extends readonly any[]>(self: Schema<A>) => Schema<readonly [...A, E?]>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const rest: <R>(rest: Schema<R>) => <A extends readonly any[]>(self: Schema<A>) => Schema<readonly [...A, ...R[]]>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const element: <E>(element: Schema<E>) => <A extends readonly any[]>(self: Schema<A>) => Schema<readonly [...A, E]>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const array: <A>(item: Schema<A>) => Schema<readonly A[]>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const nonEmptyArray: <A>(item: Schema<A>) => Schema<readonly [A, ...A[]]>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const lazy: <A>(f: () => Schema<A>, annotations?: AST.Annotated["annotations"]) => Schema<A>;
/**
 * @since 1.0.0
 */
export interface PropertySignature<From, FromIsOptional, To, ToIsOptional> {
    readonly From: (_: From) => From;
    readonly FromIsOptional: FromIsOptional;
    readonly To: (_: To) => To;
    readonly ToIsOptional: ToIsOptional;
}
/**
 * @since 1.0.0
 */
export interface OptionalPropertySignature<From, FromIsOptional, To, ToIsOptional> extends PropertySignature<From, FromIsOptional, To, ToIsOptional> {
    readonly withDefault: (value: () => To) => PropertySignature<From, true, To, false>;
    readonly toOption: () => PropertySignature<From, true, Option<To>, false>;
}
/**
 * @since 1.0.0
 */
export interface SchemaPropertySignature<From, FromIsOptional, To, ToIsOptional> extends PropertySignature<From, FromIsOptional, To, ToIsOptional> {
    readonly [SchemaTypeId]: (_: From) => From;
}
/**
 * @since 1.0.0
 */
export interface OptionalSchemaPropertySignature<From, FromIsOptional, To, ToIsOptional> extends OptionalPropertySignature<From, FromIsOptional, To, ToIsOptional> {
    readonly [SchemaTypeId]: (_: From) => From;
}
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const propertySignature: <A>(schema: Schema<A>, options: DocAnnotations<A>) => SchemaPropertySignature<A, false, A, false>;
/**
 * @since 1.0.0
 */
export declare const optional: <A>(schema: Schema<A>, options?: DocAnnotations<A> | undefined) => OptionalSchemaPropertySignature<A, true, A, true>;
/**
 * @since 1.0.0
 */
export type Spread<A> = {
    readonly [K in keyof A]: A[K];
} extends infer B ? B : never;
/**
 * @since 1.0.0
 */
export type ToOptionalKeys<Fields> = {
    [K in keyof Fields]: Fields[K] extends PropertySignature<any, boolean, any, true> | PropertySignature<never, boolean, never, true> ? K : never;
}[keyof Fields];
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const struct: <Fields extends Record<PropertyKey, Schema<any> | Schema<never> | SchemaPropertySignature<any, boolean, any, boolean> | SchemaPropertySignature<never, boolean, never, boolean>>>(fields: Fields) => Schema<Spread<{ readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: To<Fields[K]>; } & { readonly [K_1 in ToOptionalKeys<Fields>]?: To<Fields[K_1]>; }>>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const record: <K extends string | symbol, A>(key: Schema<K>, value: Schema<A>) => Schema<{ readonly [k in K]: A; }>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const extend: {
    <B>(that: Schema<B>): <A>(self: Schema<A>) => Schema<Spread<A & B>>;
    <A, B>(self: Schema<A>, that: Schema<B>): Schema<Spread<A & B>>;
};
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const pick: <A, Keys extends readonly (keyof A)[]>(...keys: Keys) => (self: Schema<A>) => Schema<Spread<Pick<A, Keys[number]>>>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const omit: <A, Keys extends readonly (keyof A)[]>(...keys: Keys) => (self: Schema<A>) => Schema<Spread<Omit<A, Keys[number]>>>;
/**
 * @since 1.0.0
 */
export interface BrandSchema<A extends Brand<any>> extends Schema<A>, Brand.Constructor<A> {
}
/**
 * Returns a nominal branded schema by applying a brand to a given schema.
 *
 * ```
 * Schema<A> + B -> Schema<A & Brand<B>>
 * ```
 *
 * @param self - The input schema to be combined with the brand.
 * @param brand - The brand to apply.
 *
 * @example
 * import * as S from "@effect/schema/Schema"
 * import { pipe } from "@effect/data/Function"
 *
 * const Int = pipe(S.number, S.int(), S.brand("Int"))
 * type Int = S.To<typeof Int> // number & Brand<"Int">
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const brand: <B extends string | symbol, A>(brand: B, options?: DocAnnotations<A> | undefined) => (self: Schema<A>) => BrandSchema<A & Brand<B>>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const partial: <A>(self: Schema<A>) => Schema<Spread<Partial<A>>>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const required: <A>(self: Schema<A>) => Schema<Spread<Required<A>>>;
/**
 * @since 1.0.0
 */
export interface DocAnnotations<A> extends AST.Annotations {
    readonly identifier?: AST.IdentifierAnnotation;
    readonly title?: AST.TitleAnnotation;
    readonly description?: AST.DescriptionAnnotation;
    readonly examples?: AST.ExamplesAnnotation;
    readonly documentation?: AST.DocumentationAnnotation;
    readonly message?: AST.MessageAnnotation<A>;
}
/**
 * @since 1.0.0
 */
export interface FilterAnnotations<A> extends DocAnnotations<A> {
    readonly typeId?: AST.TypeAnnotation | {
        id: AST.TypeAnnotation;
        params: unknown;
    };
    readonly jsonSchema?: AST.JSONSchemaAnnotation;
    readonly arbitrary?: (...args: ReadonlyArray<Arbitrary<any>>) => Arbitrary<any>;
}
/**
 * @category combinators
 * @since 1.0.0
 */
export declare function filter<C extends A, B extends A, A = C>(refinement: Refinement<A, B>, options?: FilterAnnotations<A>): (self: Schema<C>) => Schema<C & B>;
export declare function filter<B extends A, A = B>(predicate: Predicate<A>, options?: FilterAnnotations<A>): (self: Schema<B>) => Schema<B>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const MinLengthTypeId: unique symbol;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const minLength: <A extends string>(minLength: number, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const nonEmpty: <A extends string>(options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const MaxLengthTypeId: unique symbol;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const maxLength: <A extends string>(maxLength: number, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const length: <A extends string>(length: number, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const PatternTypeId: unique symbol;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const pattern: <A extends string>(regex: RegExp, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const StartsWithTypeId: unique symbol;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const startsWith: <A extends string>(startsWith: string, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const EndsWithTypeId: unique symbol;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const endsWith: <A extends string>(endsWith: string, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const IncludesTypeId: unique symbol;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const includes: <A extends string>(searchString: string, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const TrimmedTypeId: unique symbol;
/**
 * Verifies that a string contains no leading or trailing whitespaces.
 *
 * Note. This combinator does not make any transformations, it only validates.
 * If what you were looking for was a combinator to trim strings, then check out the `Codec.trim` combinator.
 *
 * @category string filters
 * @since 1.0.0
 */
export declare const trimmed: <A extends string>(options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const GreaterThanTypeId: unique symbol;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const greaterThan: <A extends number>(min: number, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const GreaterThanOrEqualToTypeId: unique symbol;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const greaterThanOrEqualTo: <A extends number>(min: number, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const LessThanTypeId: unique symbol;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const lessThan: <A extends number>(max: number, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const LessThanOrEqualToTypeId: unique symbol;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const lessThanOrEqualTo: <A extends number>(max: number, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const IntTypeId: unique symbol;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const int: <A extends number>(options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const FiniteTypeId: unique symbol;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const finite: <A extends number>(options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * Tests if a `number` is between a minimum and a maximum value (included).
 *
 * @category number filters
 * @since 1.0.0
 */
export declare const between: <A extends number>(min: number, max: number, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const NonNaNTypeId: unique symbol;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const nonNaN: <A extends number>(options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const positive: <A extends number>(options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const negative: <A extends number>(options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const nonNegative: <A extends number>(options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const nonPositive: <A extends number>(options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const MultipleOfTypeId: unique symbol;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const multipleOf: <A extends number>(divisor: number, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const GreaterThanBigintTypeId: unique symbol;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const greaterThanBigint: <A extends bigint>(min: bigint, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const GreaterThanOrEqualToBigintTypeId: unique symbol;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const greaterThanOrEqualToBigint: <A extends bigint>(min: bigint, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const LessThanBigintTypeId: unique symbol;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const lessThanBigint: <A extends bigint>(max: bigint, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const LessThanOrEqualToBigintTypeId: unique symbol;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const lessThanOrEqualToBigint: <A extends bigint>(max: bigint, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * Tests if a `bigint` is between a minimum and a maximum value (included).
 *
 * @category bigint filters
 * @since 1.0.0
 */
export declare const betweenBigint: <A extends bigint>(min: bigint, max: bigint, options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const positiveBigint: <A extends bigint>(options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const negativeBigint: <A extends bigint>(options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const nonPositiveBigint: <A extends bigint>(options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const nonNegativeBigint: <A extends bigint>(options?: FilterAnnotations<A> | undefined) => (self: Schema<A>) => Schema<A>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const MinItemsTypeId: unique symbol;
/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export declare const minItems: <A>(n: number, options?: FilterAnnotations<readonly A[]> | undefined) => (self: Schema<readonly A[]>) => Schema<readonly A[]>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const MaxItemsTypeId: unique symbol;
/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export declare const maxItems: <A>(n: number, options?: FilterAnnotations<readonly A[]> | undefined) => (self: Schema<readonly A[]>) => Schema<readonly A[]>;
/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export declare const itemsCount: <A>(n: number, options?: FilterAnnotations<readonly A[]> | undefined) => (self: Schema<readonly A[]>) => Schema<readonly A[]>;
/**
 * @category string constructors
 * @since 1.0.0
 */
export declare const Trimmed: Schema<string>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const UUIDTypeId: unique symbol;
/**
 * @category string constructors
 * @since 1.0.0
 */
export declare const UUID: Schema<string>;
/**
 * @category number constructors
 * @since 1.0.0
 */
export declare const NonNaN: Schema<number>;
/**
 * @category number constructors
 * @since 1.0.0
 */
export declare const Int: Schema<number>;
/**
 * @category number constructors
 * @since 1.0.0
 */
export declare const Positive: Schema<number>;
/**
 * @category number constructors
 * @since 1.0.0
 */
export declare const Negative: Schema<number>;
/**
 * @category number constructors
 * @since 1.0.0
 */
export declare const NonNegative: Schema<number>;
/**
 * @category number constructors
 * @since 1.0.0
 */
export declare const NonPositive: Schema<number>;
/**
 * @category bigint constructors
 * @since 1.0.0
 */
export declare const PositiveBigint: Schema<bigint>;
/**
 * @category bigint constructors
 * @since 1.0.0
 */
export declare const NegativeBigint: Schema<bigint>;
/**
 * @category bigint constructors
 * @since 1.0.0
 */
export declare const NonNegativeBigint: Schema<bigint>;
/**
 * @category bigint constructors
 * @since 1.0.0
 */
export declare const NonPositiveBigint: Schema<bigint>;
/**
 * @category Date constructors
 * @since 1.0.0
 */
export declare const Date: Schema<Date>;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const ValidDateTypeId: unique symbol;
/**
 * A filter excluding invalid dates (e.g. `new Date("fail")`).
 *
 * @category Date combinators
 * @since 1.0.0
 */
export declare const validDate: (options?: FilterAnnotations<Date>) => (self: Schema<Date>) => Schema<Date>;
/**
 * A schema representing valid dates, e.g. `new Date("fail")` is excluded, even though it is an instance of `Date`.
 *
 * @category Date constructors
 * @since 1.0.0
 */
export declare const ValidDate: Schema<Date>;
/**
 * @category Chunk constructors
 * @since 1.0.0
 */
export declare const chunk: <A>(item: Schema<A>) => Schema<Chunk<A>>;
/**
 * @category Data constructors
 * @since 1.0.0
 */
export declare const data: <A extends readonly any[] | Readonly<Record<string, any>>>(item: Schema<A>) => Schema<D.Data<A>>;
/**
 * @category Either constructors
 * @since 1.0.0
 */
export declare const either: <E, A>(left: Schema<E>, right: Schema<A>) => Schema<E.Either<E, A>>;
/**
 * @category Json
 * @since 1.0.0
 */
export type JsonArray = ReadonlyArray<Json>;
/**
 * @category Json
 * @since 1.0.0
 */
export type JsonObject = {
    readonly [key: string]: Json;
};
/**
 * @category Json
 * @since 1.0.0
 */
export type Json = null | boolean | number | string | JsonArray | JsonObject;
/**
 * @category type id
 * @since 1.0.0
 */
export declare const JsonNumberTypeId: unique symbol;
/**
 * The `JsonNumber` is a schema for representing JSON numbers. It ensures that the provided value is a valid
 * number by filtering out `NaN` and `(+/-) Infinity`. This is useful when you want to validate and represent numbers in JSON
 * format.
 *
 * @example
 * import * as S from "@effect/schema/Schema"
 *
 * const is = S.is(S.JsonNumber)
 *
 * assert.deepStrictEqual(is(42), true)
 * assert.deepStrictEqual(is(Number.NaN), false)
 * assert.deepStrictEqual(is(Number.POSITIVE_INFINITY), false)
 * assert.deepStrictEqual(is(Number.NEGATIVE_INFINITY), false)
 *
 * @category Json constructors
 * @since 1.0.0
 */
export declare const JsonNumber: Schema<number>;
/**
 * @category Json constructors
 * @since 1.0.0
 */
export declare const json: Schema<Json>;
/**
 * @category Option constructors
 * @since 1.0.0
 */
export declare const option: <A>(value: Schema<A>) => Schema<Option<A>>;
/**
 * @category ReadonlyMap constructors
 * @since 1.0.0
 */
export declare const readonlyMap: <K, V>(key: Schema<K>, value: Schema<V>) => Schema<ReadonlyMap<K, V>>;
/**
 * @category ReadonlySet constructors
 * @since 1.0.0
 */
export declare const readonlySet: <A>(item: Schema<A>) => Schema<ReadonlySet<A>>;
//# sourceMappingURL=Schema.d.ts.map