/**
 * @since 1.0.0
 *
 * Serializable represents an object that has self-contained Schema(s)
 */
import type * as Effect from "effect/Effect"
import type * as Exit from "effect/Exit"
import { dual } from "effect/Function"
import { globalValue } from "effect/GlobalValue"
import * as Internal from "./internal/serializable.js"
import * as Parser from "./Parser.js"
import type * as ParseResult from "./ParseResult.js"
import * as Schema from "./Schema.js"

/**
 * @since 1.0.0
 * @category symbol
 */
export const symbol: unique symbol = Internal.symbol as any

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
export const symbolResult: unique symbol = Internal.symbolResult as any

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

  /**
   * @since 1.0.0
   */
  export type ExitFrom<A extends WithResult> = Schema.ExitFrom<FailureFrom<A>, SuccessFrom<A>>

  /**
   * @since 1.0.0
   */
  export type ExitTo<A extends WithResult> = Exit.Exit<FailureTo<A>, SuccessTo<A>>

  /**
   * @since 1.0.0
   */
  export type ExitSchema<A extends WithResult> = Schema.Schema<ExitFrom<A>, ExitTo<A>>
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

const exitSchemaCache = globalValue(
  "@effect/schema/Serializabl/exitSchemaCache",
  () => new WeakMap<object, Schema.Schema<any, any>>()
)

/**
 * @since 1.0.0
 * @category accessor
 */
export const exitSchema = <A extends WithResult>(
  self: A
): WithResult.ExitSchema<A> => {
  const proto = Object.getPrototypeOf(self)
  if (!(symbolResult in proto)) {
    return Schema.exit(failureSchema(self), successSchema(self))
  }
  let schema = exitSchemaCache.get(proto)
  if (schema === undefined) {
    schema = Schema.exit(failureSchema(self), successSchema(self))
    exitSchemaCache.set(proto, schema)
  }
  return schema
}

/**
 * @since 1.0.0
 * @category model
 */
export interface SerializableWithResult extends Serializable, WithResult {}

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

/**
 * @since 1.0.0
 * @category encoding
 */
export const serializeExit: {
  <A extends WithResult>(
    value: WithResult.ExitTo<A>
  ): (self: A) => Effect.Effect<never, ParseResult.ParseError, WithResult.ExitFrom<A>>
  <A extends WithResult>(
    self: A,
    value: WithResult.ExitTo<A>
  ): Effect.Effect<never, ParseResult.ParseError, WithResult.ExitFrom<A>>
} = dual<
  <A extends WithResult>(
    value: WithResult.ExitTo<A>
  ) => (self: A) => Effect.Effect<never, ParseResult.ParseError, WithResult.ExitFrom<A>>,
  <A extends WithResult>(
    self: A,
    value: WithResult.ExitTo<A>
  ) => Effect.Effect<never, ParseResult.ParseError, WithResult.ExitFrom<A>>
>(2, (self, value) => Parser.encode(exitSchema(self))(value))

/**
 * @since 1.0.0
 * @category decoding
 */
export const deserializeExit: {
  (
    value: unknown
  ): <A extends WithResult>(
    self: A
  ) => Effect.Effect<never, ParseResult.ParseError, WithResult.ExitTo<A>>
  <A extends WithResult>(
    self: A,
    value: unknown
  ): Effect.Effect<never, ParseResult.ParseError, WithResult.ExitTo<A>>
} = dual<
  (value: unknown) => <A extends WithResult>(
    self: A
  ) => Effect.Effect<never, ParseResult.ParseError, WithResult.ExitTo<A>>,
  <A extends WithResult>(
    self: A,
    value: unknown
  ) => Effect.Effect<never, ParseResult.ParseError, WithResult.ExitTo<A>>
>(2, (self, value) => Parser.parse(exitSchema(self))(value))
