/**
 * @since 1.0.0
 */
import * as E from "@fp-ts/core/Either"
import { identity } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import type * as AST from "@fp-ts/schema/AST"
import * as P from "@fp-ts/schema/Parser"
import * as S from "@fp-ts/schema/Schema"

/**
 * @since 1.0.0
 */
export class Matcher<Input, Remaining, Result> {
  /**
   * @since 1.0.0
   */
  readonly _tag = "Matcher"
  /**
   * @since 1.0.0
   */
  readonly _input: (_: Input) => Input = identity
  /**
   * @since 1.0.0
   */
  readonly _remaining: (_: Remaining) => Remaining = identity
  /**
   * @since 1.0.0
   */
  readonly _result: (_: Result) => Result = identity
  constructor(
    /**
     * @since 1.0.0
     */
    readonly cases: ReadonlyArray<Case>
  ) {}
}

/**
 * @since 1.0.0
 */
export type Case = When | Not | OrElse

/**
 * @since 1.0.0
 */
export class When {
  /**
   * @since 1.0.0
   */
  readonly _tag = "When"
  constructor(
    /**
     * @since 1.0.0
     */
    readonly guard: (u: unknown, opts: AST.ParseOptions) => boolean,
    /**
     * @since 1.0.0
     */
    readonly evaluate: (input: unknown) => any
  ) {}
}

/**
 * @since 1.0.0
 */
export class Not {
  /**
   * @since 1.0.0
   */
  readonly _tag = "Not"
  constructor(
    /**
     * @since 1.0.0
     */
    readonly guard: (u: unknown, opts: AST.ParseOptions) => boolean,
    /**
     * @since 1.0.0
     */
    readonly evaluate: (input: unknown) => any
  ) {}
}

/**
 * @since 1.0.0
 */
export class OrElse {
  /**
   * @since 1.0.0
   */
  readonly _tag = "OrElse"
  constructor(
    /**
     * @since 1.0.0
     */ readonly evaluate: (input: unknown) => any
  ) {}
}

const makeSchema = <I>(
  pattern: I
): I extends S.Schema<any> ? I : S.Schema<I> => {
  if (Array.isArray(pattern)) {
    return RA.isNonEmpty(pattern)
      ? S.tuple(...pattern.map(makeSchema))
      : (S.array(S.any) as any)
  } else if (pattern !== null && typeof pattern === "object") {
    if ("ast" in pattern) {
      return pattern as any
    }

    return S.struct(
      Object.fromEntries(
        Object.entries(pattern).map(([k, v]) => [k, makeSchema(v)])
      ) as Record<string, S.Schema<any>>
    ) as any
  }

  return S.literal(pattern as any) as any
}

/**
 * @since 1.0.0
 */
export const match = <I>() => new Matcher<I, I, never>([])

/**
 * @since 1.0.0
 */
export const when: {
  <R, P extends DeepPartial<R>, B>(
    pattern: Narrow<P>,
    f: (_: TryExtract<R, WithoutSchema<P>>) => B
  ): <I, A>(self: Matcher<I, R, A>) => Matcher<I, Exclude<R, WithoutSchema<P>>, A | B>

  <P, R, B>(
    schema: S.Schema<P>,
    f: (_: TryExtract<R, P>) => B
  ): <I, A>(self: Matcher<I, R, A>) => Matcher<I, Exclude<R, P>, A | B>
} = <R, P extends DeepPartial<R>, B>(
  pattern: Narrow<P>,
  f: (_: TryExtract<R, WithoutSchema<P>>) => B
) =>
  <I, A>(self: Matcher<I, R, A>) =>
    new Matcher<I, Exclude<R, WithoutSchema<P>>, A | B>([
      ...self.cases,
      new When(P.is(makeSchema(pattern)), f as any)
    ])

/**
 * @since 1.0.0
 */
export const notSchema = <P, R, B>(schema: S.Schema<P>, f: (b: Exclude<R, P>) => B) =>
  <I, A>(self: Matcher<I, R, A>) =>
    new Matcher<I, TryExtract<R, P>, A | B>([
      ...self.cases,
      new Not(P.is(schema), f as any)
    ])

/**
 * @since 1.0.0
 */
export const not = <R, P extends DeepPartial<R>, B>(
  pattern: Narrow<P>,
  f: (_: Exclude<R, WithoutSchema<P>>) => B
) =>
  <I, A>(self: Matcher<I, R, A>) =>
    new Matcher<I, TryExtract<R, WithoutSchema<P>>, A | B>([
      ...self.cases,
      new Not(P.is(makeSchema(pattern)), f as any)
    ])

/**
 * @since 1.0.0
 */
export const orElse = <R, B>(f: (b: R) => B) =>
  <I, A>(self: Matcher<I, R, A>) =>
    new Matcher<I, never, A | B>([...self.cases, new OrElse(f as any)])

/**
 * @since 1.0.0
 */
export const either = <I, R, A>(self: Matcher<I, R, A>) =>
  (input: I): E.Either<R, A> => {
    for (const _case of self.cases) {
      if (
        _case._tag === "When" &&
        _case.guard(input, { isUnexpectedAllowed: true })
      ) {
        return E.right(_case.evaluate(input))
      } else if (
        _case._tag === "Not" &&
        !_case.guard(input, { isUnexpectedAllowed: true })
      ) {
        return E.right(_case.evaluate(input))
      } else if (_case._tag === "OrElse") {
        return E.right(_case.evaluate(input))
      }
    }

    return E.left(input as any)
  }

/**
 * @since 1.0.0
 */
export const option = <I, A>(self: Matcher<I, any, A>) => {
  const toEither = either(self)
  return (input: I): O.Option<A> => O.fromEither(toEither(input))
}

/**
 * @since 1.0.0
 */
export const exaustive = <I, A>(self: Matcher<I, never, A>) => {
  const toEither = either(self)

  return (u: I): A => {
    const result = toEither(u)

    if (result._tag === "Right") {
      return result.right
    }

    throw "absurd"
  }
}

// type helpers
type Narrow<A> = NarrowRaw<A> | S.Schema<any>

type NarrowRaw<A> =
  | (A extends [] ? [] : never)
  | { [K in keyof A]: A[K] extends S.Schema<any> ? A[K] : NarrowRaw<A[K]> }
  | (A extends Narrowable ? A : never)

type Narrowable = string | number | bigint | boolean

type WithoutSchema<A> = A extends S.Schema<infer S> ? S
  : A extends Record<string, any>
    ? { [K in keyof A]: A[K] extends S.Schema<infer S> ? S : WithoutSchema<A[K]> }
  : S.Schema<A> | A

type DeepPartial<A> = A extends Record<string, any>
  ? Partial<{ [K in keyof A]: DeepPartial<A[K]> | S.Schema<A[K]> }>
  : A | S.Schema<any>

type WithoutLiterals<A> = A extends string ? string
  : A extends number ? number
  : A extends bigint ? bigint
  : A extends boolean ? boolean
  : A extends Record<string, any> ? { [K in keyof A]: WithoutLiterals<A[K]> }
  : A

type ExtractWithoutLiterals<A, E> = A extends WithoutLiterals<E> ? A : never

type TryExtract<A, E> = Extract<A, E> extends never ? ExtractWithoutLiterals<A, E>
  : Extract<A, E>
