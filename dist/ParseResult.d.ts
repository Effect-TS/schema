/**
 * @since 1.0.0
 */
import * as E from "@effect/data/Either";
import * as O from "@effect/data/Option";
import type { NonEmptyReadonlyArray } from "@effect/data/ReadonlyArray";
import * as Effect from "@effect/io/Effect";
import type * as AST from "@effect/schema/AST";
/**
 * @since 1.0.0
 */
export type IO<E, A> = Effect.Effect<never, E, A> | E.Either<E, A>;
/**
 * @since 1.0.0
 */
export type ParseResult<A> = IO<ParseError, A>;
/**
 * @since 1.0.0
 */
export interface ParseError {
    readonly _tag: "ParseError";
    readonly errors: NonEmptyReadonlyArray<ParseErrors>;
}
/**
 * @since 1.0.0
 */
export declare const parseError: (errors: readonly [ParseErrors, ...ParseErrors[]]) => ParseError;
/**
 * `ParseErrors` is a type that represents the different types of errors that can occur when decoding a value.
 *
 * @category model
 * @since 1.0.0
 */
export type ParseErrors = Type | Index | Key | Missing | Unexpected | UnionMember | Forbidden;
/**
 * The `Type` variant of the `ParseError` type represents an error that occurs when the `actual` value is not of the expected type.
 * The `expected` field specifies the expected type, and the `actual` field contains the value that caused the error.
 * This error can occur when trying to decode a value using a schema that is only able to decode values of a specific type,
 * and the actual value is not of that type. For example, if you are using a schema to decode a string value and the actual value
 * is a number, a `Type` decode error would be returned.
 *
 * @category model
 * @since 1.0.0
 */
export interface Type {
    readonly _tag: "Type";
    readonly expected: AST.AST;
    readonly actual: unknown;
    readonly message: O.Option<string>;
}
/**
 * The `Forbidden` variant of the `ParseError` type represents an error that occurs when an Effect is encounter but disallowed from execution.
 *
 * @category model
 * @since 1.0.0
 */
export interface Forbidden {
    readonly _tag: "Forbidden";
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const type: (expected: AST.AST, actual: unknown, message?: string) => Type;
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const forbidden: Forbidden;
/**
 * The `Index` decode error indicates that there was an error at a specific index in an array or tuple.
 * The `errors` field contains the decode errors for that index. This error is typically used when decoding an array or tuple
 * with a schema that has constraints on the elements. For example, you might use an `Index` decode error to indicate
 * that a specific element in an array did not match the expected type or value.
 *
 * @category model
 * @since 1.0.0
 */
export interface Index {
    readonly _tag: "Index";
    readonly index: number;
    readonly errors: NonEmptyReadonlyArray<ParseErrors>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const index: (index: number, errors: readonly [ParseErrors, ...ParseErrors[]]) => Index;
/**
 * The `Key` variant of the `ParseError` type represents an error that occurs when a key in an object is invalid.
 * This error typically occurs when the `actual` value is not a valid key type (e.g. a string or number)
 * or when the key is not present in the object being decoded. In either case, the `key` field of the error will contain
 * the invalid key value. This error is typically used in combination with the `Unexpected` error,
 * which indicates that an unexpected key was found in the object being decoded.
 *
 * @category model
 * @since 1.0.0
 */
export interface Key {
    readonly _tag: "Key";
    readonly key: PropertyKey;
    readonly errors: NonEmptyReadonlyArray<ParseErrors>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const key: (key: PropertyKey, errors: readonly [ParseErrors, ...ParseErrors[]]) => Key;
/**
 * Error that occurs when a required key or index is missing.
 *
 * @category model
 * @since 1.0.0
 */
export interface Missing {
    readonly _tag: "Missing";
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const missing: Missing;
/**
 * Error that occurs when an unexpected key or index is present.
 *
 * @category model
 * @since 1.0.0
 */
export interface Unexpected {
    readonly _tag: "Unexpected";
    readonly actual: unknown;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const unexpected: (actual: unknown) => Unexpected;
/**
 * Error that occurs when a member in a union has an error.
 *
 * @category model
 * @since 1.0.0
 */
export interface UnionMember {
    readonly _tag: "UnionMember";
    readonly errors: NonEmptyReadonlyArray<ParseErrors>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const unionMember: (errors: readonly [ParseErrors, ...ParseErrors[]]) => UnionMember;
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const success: <A>(a: A) => ParseResult<A>;
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const fail: (error: ParseError) => ParseResult<never>;
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const failure: (e: ParseErrors) => ParseResult<never>;
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const failures: (es: readonly [ParseErrors, ...ParseErrors[]]) => ParseResult<never>;
/**
 * @category optimisation
 * @since 1.0.0
 */
export declare const eitherOrUndefined: <E, A>(self: IO<E, A>) => E.Either<E, A> | undefined;
/**
 * @category optimisation
 * @since 1.0.0
 */
export declare const flatMap: <E, E1, A, B>(self: IO<E, A>, f: (a: A) => IO<E1, B>) => IO<E | E1, B>;
/**
 * @category optimisation
 * @since 1.0.0
 */
export declare const map: <E, A, B>(self: IO<E, A>, f: (a: A) => B) => IO<E, B>;
/**
 * @category optimisation
 * @since 1.0.0
 */
export declare const mapLeft: <E1, A, E2>(self: IO<E1, A>, f: (e1: E1) => E2) => IO<E2, A>;
/**
 * @category optimisation
 * @since 1.0.0
 */
export declare const bimap: <E1, E2, A, B>(self: IO<E1, A>, f: (e1: E1) => E2, g: (a: A) => B) => IO<E2, B>;
//# sourceMappingURL=ParseResult.d.ts.map