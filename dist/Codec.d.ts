/**
 * @since 1.0.0
 */
import type { Brand } from "@effect/data/Brand";
import type { Chunk } from "@effect/data/Chunk";
import type * as D from "@effect/data/Data";
import type { Either } from "@effect/data/Either";
import type { Option } from "@effect/data/Option";
import type { Pipeable } from "@effect/data/Pipeable";
import { type Predicate, type Refinement } from "@effect/data/Predicate";
import type { ParseOptions } from "@effect/schema/AST";
import * as AST from "@effect/schema/AST";
import type { ParseResult } from "@effect/schema/ParseResult";
import * as S from "@effect/schema/Schema";
/**
 * @since 1.0.0
 * @category symbol
 */
export type CodecTypeId = S.CodecTypeId;
/**
 * @category model
 * @since 1.0.0
 */
export interface Codec<From, To> extends Pipeable {
    readonly _codecId: CodecTypeId;
    readonly From: (_: From) => From;
    readonly To: (_: To) => To;
    readonly ast: AST.AST;
}
/**
 * @since 1.0.0
 */
export type From<S extends {
    readonly From: (..._: any) => any;
}> = Parameters<S["From"]>[0];
/**
 * @since 1.0.0
 */
export type To<S extends {
    readonly To: (..._: any) => any;
}> = Parameters<S["To"]>[0];
/**
 * @category converters
 * @since 1.0.0
 */
export declare const from: <I, A>(codec: Codec<I, A>) => S.Schema<I>;
/**
 * @category converters
 * @since 1.0.0
 */
export declare const to: <I, A>(codec: Codec<I, A>) => S.Schema<A>;
export { 
/**
 * @category decoding
 * @since 1.0.0
 */
decode, 
/**
 * @category decoding
 * @since 1.0.0
 */
decodeEither, 
/**
 * @category decoding
 * @since 1.0.0
 */
decodeOption, 
/**
 * @category decoding
 * @since 1.0.0
 */
decodePromise, 
/**
 * @category decoding
 * @since 1.0.0
 */
decodeResult, 
/**
 * @category decoding
 * @since 1.0.0
 */
decodeSync, 
/**
 * @category encoding
 * @since 1.0.0
 */
encode, 
/**
 * @category encoding
 * @since 1.0.0
 */
encodeEither, 
/**
 * @category encoding
 * @since 1.0.0
 */
encodeOption, 
/**
 * @category encoding
 * @since 1.0.0
 */
encodePromise, 
/**
 * @category encoding
 * @since 1.0.0
 */
encodeResult, 
/**
 * @category encoding
 * @since 1.0.0
 */
encodeSync, 
/**
 * @category parsing
 * @since 1.0.0
 */
parse, 
/**
 * @category parsing
 * @since 1.0.0
 */
parseEither, 
/**
 * @category parsing
 * @since 1.0.0
 */
parseOption, 
/**
 * @category parsing
 * @since 1.0.0
 */
parsePromise, 
/**
 * @category parsing
 * @since 1.0.0
 */
parseResult, 
/**
 * @category parsing
 * @since 1.0.0
 */
parseSync } from "@effect/schema/Parser";
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const make: <I, A>(ast: AST.AST) => Codec<I, A>;
/**
 * Tests if a value is a `Codec`.
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isCodec: (input: unknown) => input is Codec<unknown, unknown>;
/**
 * Create a new `Codec` by transforming the input and output of an existing `Schema`
 * using the provided decoding functions.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const transformResult: {
    <I2, A2, A1>(to: Codec<I2, A2>, decode: (a1: A1, options: ParseOptions, self: AST.AST) => ParseResult<I2>, encode: (i2: I2, options: ParseOptions, self: AST.AST) => ParseResult<A1>, annotations?: AST.Annotated["annotations"]): <I1>(self: Codec<I1, A1>) => Codec<I1, A2>;
    <I1, A1, I2, A2>(from: Codec<I1, A1>, to: Codec<I2, A2>, decode: (a1: A1, options: ParseOptions, self: AST.AST) => ParseResult<I2>, encode: (i2: I2, options: ParseOptions, self: AST.AST) => ParseResult<A1>, annotations?: AST.Annotated["annotations"]): Codec<I1, A2>;
};
/**
 * Create a new `Codec` by transforming the input and output of an existing `Schema`
 * using the provided mapping functions.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const transform: {
    <I2, A2, A1>(to: Codec<I2, A2>, decode: (a1: A1) => I2, encode: (i2: I2) => A1, annotations?: AST.Annotated["annotations"]): <I1>(self: Codec<I1, A1>) => Codec<I1, A2>;
    <I1, A1, I2, A2>(from: Codec<I1, A1>, to: Codec<I2, A2>, decode: (a1: A1) => I2, encode: (i2: I2) => A1, annotations?: AST.Annotated["annotations"]): Codec<I1, A2>;
};
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const union: <Members extends readonly Codec<any, any>[]>(...members: Members) => Codec<From<Members[number]>, To<Members[number]>>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const nullable: <From_1, To_1>(self: Codec<From_1, To_1>) => Codec<From_1 | null, To_1 | null>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const tuple: <Elements extends readonly Codec<any, any>[]>(...elements: Elements) => Codec<{ readonly [K in keyof Elements]: From<Elements[K]>; }, { readonly [K_1 in keyof Elements]: To<Elements[K_1]>; }>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const optionalElement: <IE, E>(element: Codec<IE, E>) => <I extends readonly any[], A extends readonly any[]>(self: Codec<I, A>) => Codec<readonly [...I, IE?], readonly [...A, E?]>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const rest: <IR, R>(rest: Codec<IR, R>) => <I extends readonly any[], A extends readonly any[]>(self: Codec<I, A>) => Codec<readonly [...I, ...IR[]], readonly [...A, ...R[]]>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const element: <IE, E>(element: Codec<IE, E>) => <I extends readonly any[], A extends readonly any[]>(self: Codec<I, A>) => Codec<readonly [...I, IE], readonly [...A, E]>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const array: <I, A>(item: Codec<I, A>) => Codec<readonly I[], readonly A[]>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const nonEmptyArray: <I, A>(item: Codec<I, A>) => Codec<readonly [I, ...I[]], readonly [A, ...A[]]>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const lazy: <I, A>(f: () => Codec<I, A>, annotations?: AST.Annotated["annotations"]) => Codec<I, A>;
/**
 * @since 1.0.0
 */
export declare const propertySignature: <I, A>(codec: Codec<I, A>, options: S.DocAnnotations<A>) => S.PropertySignature<I, false, A, false>;
/**
 * @since 1.0.0
 */
export declare const optional: <I, A>(codec: Codec<I, A>, options?: S.DocAnnotations<A> | undefined) => S.OptionalPropertySignature<I, true, A, true>;
/**
 * @since 1.0.0
 */
export type FromOptionalKeys<Fields> = {
    [K in keyof Fields]: Fields[K] extends S.PropertySignature<any, true, any, boolean> | S.PropertySignature<never, true, never, boolean> ? K : never;
}[keyof Fields];
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const struct: <Fields extends Record<PropertyKey, S.PropertySignature<any, boolean, any, boolean> | S.PropertySignature<never, boolean, never, boolean> | Codec<any, any> | Codec<never, never>>>(fields: Fields) => Codec<S.Simplify<{ readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: From<Fields[K]>; } & { readonly [K_1 in FromOptionalKeys<Fields>]?: From<Fields[K_1]>; }>, S.Simplify<{ readonly [K_2 in Exclude<keyof Fields, S.ToOptionalKeys<Fields>>]: To<Fields[K_2]>; } & { readonly [K_3 in S.ToOptionalKeys<Fields>]?: To<Fields[K_3]>; }>>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const record: <K extends string | symbol, I, A>(key: S.Schema<K>, value: Codec<I, A>) => Codec<{ readonly [k in K]: I; }, { readonly [k_1 in K]: A; }>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const extend: {
    <IB, B>(that: Codec<IB, B>): <I, A>(self: Codec<I, A>) => Codec<S.Simplify<I & IB>, S.Simplify<A & B>>;
    <I, A, IB, B>(self: Codec<I, A>, that: Codec<IB, B>): Codec<S.Simplify<I & IB>, S.Simplify<A & B>>;
};
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const pick: <A, Keys extends readonly (keyof A)[]>(...keys: Keys) => <I extends { [K in keyof A]?: any; }>(self: Codec<I, A>) => Codec<S.Simplify<Pick<I, Keys[number]>>, S.Simplify<Pick<A, Keys[number]>>>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const omit: <A, Keys extends readonly (keyof A)[]>(...keys: Keys) => <I extends { [K in keyof A]?: any; }>(self: Codec<I, A>) => Codec<S.Simplify<Omit<I, Keys[number]>>, S.Simplify<Omit<A, Keys[number]>>>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const brand: <B extends string | symbol, A>(brand: B, options?: S.DocAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A & Brand<B>>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare function filter<C extends A, B extends A, A = C>(refinement: Refinement<A, B>, options?: S.FilterAnnotations<A>): <I>(self: Codec<I, C>) => Codec<I, C & B>;
export declare function filter<B extends A, A = B>(predicate: Predicate<A>, options?: S.FilterAnnotations<A>): <I>(self: Codec<I, B>) => Codec<I, B>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const compose: {
    <A, B>(that: Codec<A, B>): <I>(self: Codec<I, A>) => Codec<I, B>;
    <I, A, B>(self: Codec<I, A>, that: Codec<A, B>): Codec<I, B>;
};
/**
 * Attaches a property signature with the specified key and value to the schema.
 * This API is useful when you want to add a property to your schema which doesn't describe the shape of the input,
 * but rather maps to another schema, for example when you want to add a discriminant to a simple union.
 *
 * @param self - The input schema.
 * @param key - The name of the property to add to the schema.
 * @param value - The value of the property to add to the schema.
 *
 * @example
 * import * as S from "@effect/schema/Schema"
 * import * as C from "@effect/schema/Codec"
 * import { pipe } from "@effect/data/Function"
 *
 * const Circle = S.struct({ radius: S.number })
 * const Square = S.struct({ sideLength: S.number })
 * const Shape = C.union(
 *   C.attachPropertySignature(Circle, "kind", "circle"),
 *   C.attachPropertySignature(Square, "kind", "square")
 * )
 *
 * assert.deepStrictEqual(C.decodeSync(Shape)({ radius: 10 }), {
 *   kind: "circle",
 *   radius: 10
 * })
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const attachPropertySignature: {
    <K extends PropertyKey, V extends AST.LiteralValue>(key: K, value: V): <I, A extends object>(codec: Codec<I, A>) => Codec<I, S.Simplify<A & {
        readonly [k in K]: V;
    }>>;
    <I, A, K extends PropertyKey, V extends AST.LiteralValue>(codec: Codec<I, A>, key: K, value: V): Codec<I, S.Simplify<A & {
        readonly [k in K]: V;
    }>>;
};
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const minLength: <A extends string>(minLength: number, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const nonEmpty: <A extends string>(options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const maxLength: <A extends string>(maxLength: number, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const length: <A extends string>(length: number, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const pattern: <A extends string>(regex: RegExp, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const startsWith: <A extends string>(startsWith: string, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const endsWith: <A extends string>(endsWith: string, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category string filters
 * @since 1.0.0
 */
export declare const includes: <A extends string>(searchString: string, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * Verifies that a string contains no leading or trailing whitespaces.
 *
 * Note. This combinator does not make any transformations, it only validates.
 * If what you were looking for was a combinator to trim strings, then check out the `trim` combinator.
 *
 * @category string filters
 * @since 1.0.0
 */
export declare const trimmed: <A extends string>(options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const greaterThan: <A extends number>(min: number, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const greaterThanOrEqualTo: <A extends number>(min: number, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const lessThan: <A extends number>(max: number, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const lessThanOrEqualTo: <A extends number>(max: number, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const int: <A extends number>(options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const finite: <A extends number>(options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * Tests if a `number` is between a minimum and a maximum value (included).
 *
 * @category number filters
 * @since 1.0.0
 */
export declare const between: <A extends number>(min: number, max: number, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const nonNaN: <A extends number>(options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const positive: <A extends number>(options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const negative: <A extends number>(options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const nonNegative: <A extends number>(options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const nonPositive: <A extends number>(options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category number filters
 * @since 1.0.0
 */
export declare const multipleOf: <A extends number>(divisor: number, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const greaterThanBigint: <A extends bigint>(min: bigint, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const greaterThanOrEqualToBigint: <A extends bigint>(min: bigint, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const lessThanBigint: <A extends bigint>(max: bigint, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const lessThanOrEqualToBigint: <A extends bigint>(max: bigint, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * Tests if a `bigint` is between a minimum and a maximum value (included).
 *
 * @category bigint filters
 * @since 1.0.0
 */
export declare const betweenBigint: <A extends bigint>(min: bigint, max: bigint, options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const positiveBigint: <A extends bigint>(options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const negativeBigint: <A extends bigint>(options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const nonPositiveBigint: <A extends bigint>(options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category bigint filters
 * @since 1.0.0
 */
export declare const nonNegativeBigint: <A extends bigint>(options?: S.FilterAnnotations<A> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export declare const minItems: <A>(n: number, options?: S.FilterAnnotations<readonly A[]> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export declare const maxItems: <A>(n: number, options?: S.FilterAnnotations<readonly A[]> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export declare const itemsCount: <A>(n: number, options?: S.FilterAnnotations<readonly A[]> | undefined) => <I>(self: Codec<I, A>) => Codec<I, A>;
/**
 * This combinator allows removing whitespaces from the beginning and end of a string.
 *
 * @category string transformations
 * @since 1.0.0
 */
export declare const trim: <I>(self: Codec<I, string>) => Codec<I, string>;
/**
 * This transformation allows removing whitespaces from the beginning and end of a string.
 *
 * @category string transformations
 * @since 1.0.0
 */
export declare const Trim: Codec<string, string>;
/**
 * Clamps a number between a minimum and a maximum value.
 *
 * @category number transformations
 * @since 1.0.0
 */
export declare const clamp: (min: number, max: number) => <I>(self: Codec<I, number>) => Codec<I, number>;
/**
 * This combinator transforms a `string` into a `number` by parsing the string using the `Number` function.
 *
 * It returns an error if the value can't be converted (for example when non-numeric characters are provided).
 *
 * The following special string values are supported: "NaN", "Infinity", "-Infinity".
 *
 * @param self - The codec representing the input string
 *
 * @category number transformations
 * @since 1.0.0
 */
export declare const numberFromString: <I>(self: Codec<I, string>) => Codec<I, number>;
/**
 * This codec transforms a `string` into a `number` by parsing the string using the `Number` function.
 *
 * It returns an error if the value can't be converted (for example when non-numeric characters are provided).
 *
 * The following special string values are supported: "NaN", "Infinity", "-Infinity".
 *
 * @category number transformations
 * @since 1.0.0
 */
export declare const NumberFromString: Codec<string, number>;
/**
 * Negates a boolean value
 *
 * @category boolean transformations
 * @since 1.0.0
 */
export declare const not: <I>(self: Codec<I, boolean>) => Codec<I, boolean>;
/**
 * Clamps a bigint between a minimum and a maximum value.
 *
 * @category bigint transformations
 * @since 1.0.0
 */
export declare const clampBigint: (min: bigint, max: bigint) => <I>(self: Codec<I, bigint>) => Codec<I, bigint>;
/**
 * A combinator that transforms a `string` into a valid `Date`.
 *
 * @category Date transformations
 * @since 1.0.0
 */
export declare const dateFromString: <I>(self: Codec<I, string>) => Codec<I, Date>;
declare const _Date: Codec<string, Date>;
export { 
/**
 * A schema that transforms a `string` into a `Date`.
 *
 * @category Date transformations
 * @since 1.0.0
 */
_Date as Date };
/**
 * @category Option transformations
 * @since 1.0.0
 */
export declare const optionFromSelf: <I, A>(value: Codec<I, A>) => Codec<Option<I>, Option<A>>;
/**
 * @since 1.0.0
 */
export type JSONOption<A> = {
    readonly _tag: "None";
} | {
    readonly _tag: "Some";
    readonly value: A;
};
/**
 * @category Option transformations
 * @since 1.0.0
 */
export declare const option: <I, A>(value: Codec<I, A>) => Codec<JSONOption<I>, Option<A>>;
/**
 * @category Option transformations
 * @since 1.0.0
 */
export declare const optionFromNullable: <I, A>(value: Codec<I, A>) => Codec<I | null, Option<A>>;
/**
 * @category Either transformations
 * @since 1.0.0
 */
export declare const eitherFromSelf: <IE, E, IA, A>(left: Codec<IE, E>, right: Codec<IA, A>) => Codec<Either<IE, IA>, Either<E, A>>;
/**
 * @since 1.0.0
 */
export type JSONEither<E, A> = {
    readonly _tag: "Left";
    readonly left: E;
} | {
    readonly _tag: "Right";
    readonly right: A;
};
/**
 * @category Either transformations
 * @since 1.0.0
 */
export declare const either: <IE, E, IA, A>(left: Codec<IE, E>, right: Codec<IA, A>) => Codec<JSONEither<IE, IA>, Either<E, A>>;
/**
 * @category ReadonlyMap transformations
 * @since 1.0.0
 */
export declare const readonlyMapFromSelf: <IK, K, IV, V>(key: Codec<IK, K>, value: Codec<IV, V>) => Codec<ReadonlyMap<IK, IV>, ReadonlyMap<K, V>>;
/**
 * @category ReadonlyMap transformations
 * @since 1.0.0
 */
export declare const readonlyMap: <IK, K, IV, V>(key: Codec<IK, K>, value: Codec<IV, V>) => Codec<readonly (readonly [IK, IV])[], ReadonlyMap<K, V>>;
/**
 * @category ReadonlySet transformations
 * @since 1.0.0
 */
export declare const readonlySetFromSelf: <I, A>(item: Codec<I, A>) => Codec<ReadonlySet<I>, ReadonlySet<A>>;
/**
 * @category ReadonlySet transformations
 * @since 1.0.0
 */
export declare const readonlySet: <I, A>(item: Codec<I, A>) => Codec<readonly I[], ReadonlySet<A>>;
/**
 * @category Chunk transformations
 * @since 1.0.0
 */
export declare const chunkFromSelf: <I, A>(item: Codec<I, A>) => Codec<Chunk<I>, Chunk<A>>;
/**
 * @category Chunk transformations
 * @since 1.0.0
 */
export declare const chunk: <I, A>(item: Codec<I, A>) => Codec<readonly I[], Chunk<A>>;
/**
 * @category Data transformations
 * @since 1.0.0
 */
export declare const dataFromSelf: <I extends readonly any[] | Readonly<Record<string, any>>, A extends readonly any[] | Readonly<Record<string, any>>>(item: Codec<I, A>) => Codec<D.Data<I>, D.Data<A>>;
/**
 * @category Data transformations
 * @since 1.0.0
 */
export declare const data: <I extends readonly any[] | Readonly<Record<string, any>>, A extends readonly any[] | Readonly<Record<string, any>>>(item: Codec<I, A>) => Codec<I, D.Data<A>>;
//# sourceMappingURL=Codec.d.ts.map