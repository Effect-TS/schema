/**
 * @since 1.0.0
 *
 * Serializable represents an object that has self-contained Schema(s)
 */
import type * as Effect from "effect/Effect"
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
  readonly [symbol]: {
    readonly Self: Schema.Schema<any, any>
  }
}

/**
 * @since 1.0.0
 * @category model
 */
export declare namespace Serializable {
  /**
   * @since 1.0.0
   */
  export type SelfFrom<A extends Serializable> = Schema.Schema.From<A[typeof symbol]["Self"]>

  /**
   * @since 1.0.0
   */
  export type SelfTo<A extends Serializable> = Schema.Schema.To<A[typeof symbol]["Self"]>
}

/**
 * @since 1.0.0
 * @category accessor
 */
export const selfSchema = <A extends Serializable>(self: A): A[typeof symbol]["Self"] =>
  self[symbol].Self

/**
 * @since 1.0.0
 * @category symbol
 */
export const symbolResult: unique symbol = Symbol.for(
  "@effect/schema/Serializable/symbolResult"
)

/**
 * @since 1.0.0
 * @category model
 */
export interface WithResult {
  readonly [symbolResult]: {
    readonly Failure: Schema.Schema<any, any>
    readonly Success: Schema.Schema<any, any>
  }
}

/**
 * @since 1.0.0
 * @category model
 */
export declare namespace WithResult {
  /**
   * @since 1.0.0
   */
  export type FailureFrom<A extends WithResult> = Schema.Schema.From<
    A[typeof symbolResult]["Failure"]
  >

  /**
   * @since 1.0.0
   */
  export type FailureTo<A extends WithResult> = Schema.Schema.To<A[typeof symbolResult]["Failure"]>

  /**
   * @since 1.0.0
   */
  export type SuccessFrom<A extends WithResult> = Schema.Schema.From<
    A[typeof symbolResult]["Success"]
  >

  /**
   * @since 1.0.0
   */
  export type SuccessTo<A extends WithResult> = Schema.Schema.To<A[typeof symbolResult]["Success"]>
}

/**
 * @since 1.0.0
 * @category accessor
 */
export const failureSchema = <A extends WithResult>(
  self: A
): A[typeof symbolResult]["Failure"] => self[symbolResult].Failure

/**
 * @since 1.0.0
 * @category accessor
 */
export const successSchema = <A extends WithResult>(
  self: A
): A[typeof symbolResult]["Success"] => self[symbolResult].Success

/**
 * @since 1.0.0
 * @category model
 */
export interface SerializableWithResult extends Serializable, WithResult {}

/**
 * @since 1.0.0
 * @category encoding
 */
export const serialize: {
  <A extends Serializable>(
    value: Serializable.SelfTo<A>
  ): (self: A) => Effect.Effect<never, ParseResult.ParseError, Serializable.SelfFrom<A>>
  <A extends Serializable>(
    self: A,
    value: Serializable.SelfTo<A>
  ): Effect.Effect<never, ParseResult.ParseError, Serializable.SelfFrom<A>>
} = dual<
  <A extends Serializable>(
    value: Serializable.SelfTo<A>
  ) => (self: A) => Effect.Effect<never, ParseResult.ParseError, Serializable.SelfFrom<A>>,
  <A extends Serializable>(
    self: A,
    value: Serializable.SelfTo<A>
  ) => Effect.Effect<never, ParseResult.ParseError, Serializable.SelfFrom<A>>
>(2, (self, value) => Parser.encode(self[symbol].Self)(value))

/**
 * @since 1.0.0
 * @category decoding
 */
export const deserialize: {
  (
    value: unknown
  ): <A extends Serializable>(
    self: A
  ) => Effect.Effect<never, ParseResult.ParseError, Serializable.SelfTo<A>>
  <A extends Serializable>(
    self: A,
    value: unknown
  ): Effect.Effect<never, ParseResult.ParseError, Serializable.SelfTo<A>>
} = dual<
  (value: unknown) => <A extends Serializable>(
    self: A
  ) => Effect.Effect<never, ParseResult.ParseError, Serializable.SelfTo<A>>,
  <A extends Serializable>(
    self: A,
    value: unknown
  ) => Effect.Effect<never, ParseResult.ParseError, Serializable.SelfTo<A>>
>(2, (self, value) => Parser.parse(self[symbol].Self)(value))

/**
 * @since 1.0.0
 * @category encoding
 */
export const serializeFailure: {
  <A extends WithResult>(
    value: WithResult.FailureTo<A>
  ): (self: A) => Effect.Effect<never, ParseResult.ParseError, WithResult.FailureFrom<A>>
  <A extends WithResult>(
    self: A,
    value: WithResult.FailureTo<A>
  ): Effect.Effect<never, ParseResult.ParseError, WithResult.FailureFrom<A>>
} = dual<
  <A extends WithResult>(
    value: WithResult.FailureTo<A>
  ) => (self: A) => Effect.Effect<never, ParseResult.ParseError, WithResult.FailureFrom<A>>,
  <A extends WithResult>(
    self: A,
    value: WithResult.FailureTo<A>
  ) => Effect.Effect<never, ParseResult.ParseError, WithResult.FailureFrom<A>>
>(2, (self, value) => Parser.encode(self[symbolResult].Failure)(value))

/**
 * @since 1.0.0
 * @category decoding
 */
export const deserializeFailure: {
  (
    value: unknown
  ): <A extends WithResult>(
    self: A
  ) => Effect.Effect<never, ParseResult.ParseError, WithResult.FailureTo<A>>
  <A extends WithResult>(
    self: A,
    value: unknown
  ): Effect.Effect<never, ParseResult.ParseError, WithResult.FailureTo<A>>
} = dual<
  (value: unknown) => <A extends WithResult>(
    self: A
  ) => Effect.Effect<never, ParseResult.ParseError, WithResult.FailureTo<A>>,
  <A extends WithResult>(
    self: A,
    value: unknown
  ) => Effect.Effect<never, ParseResult.ParseError, WithResult.FailureTo<A>>
>(2, (self, value) => Parser.parse(self[symbolResult].Failure)(value))

/**
 * @since 1.0.0
 * @category encoding
 */
export const serializeSuccess: {
  <A extends WithResult>(
    value: WithResult.SuccessTo<A>
  ): (self: A) => Effect.Effect<never, ParseResult.ParseError, WithResult.SuccessFrom<A>>
  <A extends WithResult>(
    self: A,
    value: WithResult.SuccessTo<A>
  ): Effect.Effect<never, ParseResult.ParseError, WithResult.SuccessFrom<A>>
} = dual<
  <A extends WithResult>(
    value: WithResult.SuccessTo<A>
  ) => (self: A) => Effect.Effect<never, ParseResult.ParseError, WithResult.SuccessFrom<A>>,
  <A extends WithResult>(
    self: A,
    value: WithResult.SuccessTo<A>
  ) => Effect.Effect<never, ParseResult.ParseError, WithResult.SuccessFrom<A>>
>(2, (self, value) => Parser.encode(self[symbolResult].Success)(value))

/**
 * @since 1.0.0
 * @category decoding
 */
export const deserializeSuccess: {
  (
    value: unknown
  ): <A extends WithResult>(
    self: A
  ) => Effect.Effect<never, ParseResult.ParseError, WithResult.SuccessTo<A>>
  <A extends WithResult>(
    self: A,
    value: unknown
  ): Effect.Effect<never, ParseResult.ParseError, WithResult.SuccessTo<A>>
} = dual<
  (value: unknown) => <A extends WithResult>(
    self: A
  ) => Effect.Effect<never, ParseResult.ParseError, WithResult.SuccessTo<A>>,
  <A extends WithResult>(
    self: A,
    value: unknown
  ) => Effect.Effect<never, ParseResult.ParseError, WithResult.SuccessTo<A>>
>(2, (self, value) => Parser.parse(self[symbolResult].Success)(value))
