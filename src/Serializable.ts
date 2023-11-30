/**
 * @since 1.0.0
 *
 * Serializable represents an object that has self-contained Schema(s)
 */
import type * as Effect from "effect/Effect"
import type * as Exit from "effect/Exit"
import { dual } from "effect/Function"
import * as Parser from "./Parser.js"
import type * as ParseResult from "./ParseResult.js"
import type * as Schema from "./Schema.js"

/**
 * @since 1.0.0
 * @category symbol
 */
export const symbol: unique symbol = Symbol.for("@effect/schema/Serializable/symbol")

/**
 * @since 1.0.0
 * @category model
 */
export interface Serializable {
  readonly [symbol]: Schema.Schema<any, any>
}

/**
 * @since 1.0.0
 * @category model
 */
export declare namespace Serializable {
  /**
   * @since 1.0.0
   */
  export type From<A extends Serializable> = Schema.Schema.From<A[typeof symbol]>

  /**
   * @since 1.0.0
   */
  export type To<A extends Serializable> = Schema.Schema.To<A[typeof symbol]>
}

/**
 * @since 1.0.0
 * @category accessor
 */
export const selfSchema = <A extends Serializable>(self: A): A[typeof symbol] => self[symbol]

/**
 * @since 1.0.0
 * @category symbol
 */
export const symbolExit: unique symbol = Symbol.for(
  "@effect/schema/Serializable/symbolExit"
)

/**
 * @since 1.0.0
 * @category model
 */
export interface WithExit {
  readonly [symbolExit]: Schema.Schema<any, Exit.Exit<any, any>>
}

/**
 * @since 1.0.0
 * @category model
 */
export declare namespace WithExit {
  /**
   * @since 1.0.0
   */
  export type From<A extends WithExit> = Schema.Schema.From<
    A[typeof symbolExit]
  >

  /**
   * @since 1.0.0
   */
  export type To<A extends WithExit> = Schema.Schema.To<A[typeof symbolExit]>
}

/**
 * @since 1.0.0
 * @category accessor
 */
export const exitSchema = <A extends WithExit>(
  self: A
): A[typeof symbolExit] => self[symbolExit]

/**
 * @since 1.0.0
 * @category model
 */
export interface SerializableWithExit extends Serializable, WithExit {}

/**
 * @since 1.0.0
 * @category encoding
 */
export const serialize = <A extends Serializable>(
  self: A
): Effect.Effect<never, ParseResult.ParseError, Serializable.From<A>> =>
  Parser.encode(self[symbol])(self)

/**
 * @since 1.0.0
 * @category decoding
 */
export const deserialize: {
  (
    value: unknown
  ): <A extends Serializable>(
    self: A
  ) => Effect.Effect<never, ParseResult.ParseError, Serializable.To<A>>
  <A extends Serializable>(
    self: A,
    value: unknown
  ): Effect.Effect<never, ParseResult.ParseError, Serializable.To<A>>
} = dual<
  (value: unknown) => <A extends Serializable>(
    self: A
  ) => Effect.Effect<never, ParseResult.ParseError, Serializable.To<A>>,
  <A extends Serializable>(
    self: A,
    value: unknown
  ) => Effect.Effect<never, ParseResult.ParseError, Serializable.To<A>>
>(2, (self, value) => Parser.parse(self[symbol])(value))

/**
 * @since 1.0.0
 * @category encoding
 */
export const serializeExit: {
  <A extends WithExit>(
    value: WithExit.To<A>
  ): (self: A) => Effect.Effect<never, ParseResult.ParseError, WithExit.From<A>>
  <A extends WithExit>(
    self: A,
    value: WithExit.To<A>
  ): Effect.Effect<never, ParseResult.ParseError, WithExit.From<A>>
} = dual<
  <A extends WithExit>(
    value: WithExit.To<A>
  ) => (self: A) => Effect.Effect<never, ParseResult.ParseError, WithExit.From<A>>,
  <A extends WithExit>(
    self: A,
    value: WithExit.To<A>
  ) => Effect.Effect<never, ParseResult.ParseError, WithExit.From<A>>
>(2, (self, value) => Parser.encode(self[symbolExit])(value))

/**
 * @since 1.0.0
 * @category decoding
 */
export const deserializeExit: {
  (
    value: unknown
  ): <A extends WithExit>(
    self: A
  ) => Effect.Effect<never, ParseResult.ParseError, WithExit.To<A>>
  <A extends WithExit>(
    self: A,
    value: unknown
  ): Effect.Effect<never, ParseResult.ParseError, WithExit.To<A>>
} = dual<
  (value: unknown) => <A extends WithExit>(
    self: A
  ) => Effect.Effect<never, ParseResult.ParseError, WithExit.To<A>>,
  <A extends WithExit>(
    self: A,
    value: unknown
  ) => Effect.Effect<never, ParseResult.ParseError, WithExit.To<A>>
>(2, (self, value) => Parser.parse(self[symbolExit])(value))
