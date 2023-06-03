/**
 * @since 1.0.0
 */
import * as E from "@effect/data/Either";
import type { Option } from "@effect/data/Option";
import * as Effect from "@effect/io/Effect";
import type { ParseOptions } from "@effect/schema/AST";
import type { Codec, To } from "@effect/schema/Codec";
import type { ParseResult } from "@effect/schema/ParseResult";
import * as PR from "@effect/schema/ParseResult";
import type { Schema } from "@effect/schema/Schema";
/**
 * @category parsing
 * @since 1.0.0
 */
export declare const parse: <I, A>(schema: Codec<I, A>) => (i: unknown, options?: ParseOptions) => A;
/**
 * @category parsing
 * @since 1.0.0
 */
export declare const parseOption: <I, A>(schema: Codec<I, A>) => (i: unknown, options?: ParseOptions) => Option<A>;
/**
 * @category parsing
 * @since 1.0.0
 */
export declare const parseEither: <I, A>(schema: Codec<I, A>) => (i: unknown, options?: ParseOptions) => E.Either<PR.ParseError, A>;
/**
 * @category parsing
 * @since 1.0.0
 */
export declare const parseResult: <I, A>(schema: Codec<I, A>) => (i: unknown, options?: ParseOptions) => ParseResult<A>;
/**
 * @category parsing
 * @since 1.0.0
 */
export declare const parsePromise: <I, A>(schema: Codec<I, A>) => (i: unknown, options?: ParseOptions) => Promise<A>;
/**
 * @category parsing
 * @since 1.0.0
 */
export declare const parseEffect: <I, A>(schema: Codec<I, A>) => (i: unknown, options?: ParseOptions) => Effect.Effect<never, PR.ParseError, A>;
/**
 * @category decoding
 * @since 1.0.0
 */
export declare const decode: <I, A>(schema: Codec<I, A>) => (i: I, options?: ParseOptions) => A;
/**
 * @category decoding
 * @since 1.0.0
 */
export declare const decodeOption: <I, A>(schema: Codec<I, A>) => (i: I, options?: ParseOptions) => Option<A>;
/**
 * @category decoding
 * @since 1.0.0
 */
export declare const decodeEither: <I, A>(schema: Codec<I, A>) => (i: I, options?: ParseOptions) => E.Either<PR.ParseError, A>;
/**
 * @category decoding
 * @since 1.0.0
 */
export declare const decodeResult: <I, A>(schema: Codec<I, A>) => (i: I, options?: ParseOptions) => ParseResult<A>;
/**
 * @category decoding
 * @since 1.0.0
 */
export declare const decodePromise: <I, A>(schema: Codec<I, A>) => (i: I, options?: ParseOptions) => Promise<A>;
/**
 * @category decoding
 * @since 1.0.0
 */
export declare const decodeEffect: <I, A>(schema: Codec<I, A>) => (i: I, options?: ParseOptions) => Effect.Effect<never, PR.ParseError, A>;
/**
 * @category validation
 * @since 1.0.0
 */
export declare const validate: <A>(schema: Schema<A>) => (a: unknown, options?: ParseOptions) => A;
/**
 * @category validation
 * @since 1.0.0
 */
export declare const validateOption: <A>(schema: Schema<A>) => (a: unknown, options?: ParseOptions) => Option<A>;
/**
 * @category validation
 * @since 1.0.0
 */
export declare const validateEither: <A>(schema: Schema<A>) => (a: unknown, options?: ParseOptions) => E.Either<PR.ParseError, A>;
/**
 * @category validation
 * @since 1.0.0
 */
export declare const validateResult: <A>(schema: Schema<A>) => (a: unknown, options?: ParseOptions) => ParseResult<A>;
/**
 * @category validation
 * @since 1.0.0
 */
export declare const validatePromise: <A>(schema: Schema<A>) => (i: unknown, options?: ParseOptions) => Promise<A>;
/**
 * @category validation
 * @since 1.0.0
 */
export declare const validateEffect: <A>(schema: Schema<A>) => (a: unknown, options?: ParseOptions) => Effect.Effect<never, PR.ParseError, A>;
/**
 * @category validation
 * @since 1.0.0
 */
export declare const is: <A>(schema: Schema<A>) => (a: unknown) => a is A;
/**
 * @since 1.0.0
 */
export type ToAsserts<S extends Codec<any, any>> = (input: unknown, options?: ParseOptions) => asserts input is To<S>;
/**
 * @category validation
 * @since 1.0.0
 */
export declare const asserts: <A>(schema: Schema<A>) => (a: unknown, options?: ParseOptions) => asserts a is A;
/**
 * @category encoding
 * @since 1.0.0
 */
export declare const encode: <I, A>(schema: Codec<I, A>) => (a: A, options?: ParseOptions) => I;
/**
 * @category encoding
 * @since 1.0.0
 */
export declare const encodeOption: <I, A>(schema: Codec<I, A>) => (input: A, options?: ParseOptions) => Option<I>;
/**
 * @category encoding
 * @since 1.0.0
 */
export declare const encodeEither: <I, A>(schema: Codec<I, A>) => (a: A, options?: ParseOptions) => E.Either<PR.ParseError, I>;
/**
 * @category encoding
 * @since 1.0.0
 */
export declare const encodeResult: <I, A>(schema: Codec<I, A>) => (a: A, options?: ParseOptions) => ParseResult<I>;
/**
 * @category encoding
 * @since 1.0.0
 */
export declare const encodePromise: <I, A>(schema: Codec<I, A>) => (a: A, options?: ParseOptions) => Promise<I>;
/**
 * @category encoding
 * @since 1.0.0
 */
export declare const encodeEffect: <I, A>(schema: Codec<I, A>) => (a: A, options?: ParseOptions) => Effect.Effect<never, PR.ParseError, I>;
/**
 * @since 1.0.0"decoding" | "encoding"
 */
export declare const defaultParseOption: ParseOptions;
//# sourceMappingURL=Parser.d.ts.map