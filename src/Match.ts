/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @since 1.0.0
 */
import * as E from "@fp-ts/core/Either"
import { identity, pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import type * as T from "@fp-ts/core/These"
import type * as AST from "@fp-ts/schema/AST"
import * as P from "@fp-ts/schema/Parser"
import * as S from "@fp-ts/schema/Schema"

/**
 * @since 1.0.0
 */
export class Matcher<Input, Remaining, Result, Provided> {
  /**
   * @since 1.0.0
   */
  readonly _tag = "Matcher"
  /**
   * @since 1.0.0
   */
  readonly _input: (_: Input) => unknown = identity
  /**
   * @since 1.0.0
   */
  readonly _remaining: (_: never) => Remaining = identity
  /**
   * @since 1.0.0
   */
  readonly _result: (_: never) => Result = identity
  constructor(
    /**
     * @since 1.0.0
     */
    readonly cases: ReadonlyArray<Case>,
    /**
     * @since 1.0.0
     */
    readonly provided?: { provided: Provided }
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
export const type: {
  <I>(): Matcher<I, I, never, never>
} = <I>(...args: Array<any>) =>
  // @ts-expect-error
  new Matcher<I, I, never, never>([], args.length === 1 ? { provided: args[0] } : void 0)

/**
 * @since 1.0.0
 */
export const value: {
  <I>(i: I): Matcher<I, I, never, I>
} = <I>(...args: Array<any>) =>
  // @ts-expect-error
  new Matcher<I, I, never, never>([], args.length === 1 ? { provided: args[0] } : void 0)

/**
 * @since 1.0.0
 */
export const when: {
  <R, P extends DeepPartial<R>, B>(
    pattern: Narrow<P>,
    f: (_: Replace<TryExtract<R, WithoutSchema<P>>, P>) => B
  ): <I, A, Pr>(
    self: Matcher<I, R, A, Pr>
  ) => Matcher<I, Exclude<R, WithoutSchema<P>>, Unify<A | B>, Pr>
  <P, R, B>(
    schema: S.Schema<P>,
    f: (_: Replace<TryExtract<R, P>, P>) => B
  ): <I, A, Pr>(self: Matcher<I, R, A, Pr>) => Matcher<I, Exclude<R, P>, Unify<A | B>, Pr>
} = <R, P extends DeepPartial<R>, B>(
  pattern: Narrow<P>,
  f: (_: TryExtract<R, WithoutSchema<P>>) => B
) =>
  <I, A, Pr>(self: Matcher<I, R, A, Pr>) =>
    new Matcher<I, Exclude<R, WithoutSchema<P>>, Unify<Unify<A | B>>, Pr>([
      ...self.cases,
      new When(P.is(makeSchema(pattern)), f as any)
    ], self.provided)

/**
 * @since 1.0.0
 */
export const tag: {
  <R, P extends Tags<R> & (string | number | symbol | object | {}), B>(
    pattern: P,
    f: (_: Extract<R, { readonly _tag: P }>) => B
  ): <I, A, Pr>(
    self: Matcher<I, R, A, Pr>
  ) => Matcher<I, Exclude<R, Extract<R, { _tag: P }>>, Unify<A | B>, Pr>
} = (pattern, f) =>
  // @ts-expect-error
  when({ _tag: pattern }, f)

/**
 * @since 1.0.0
 */
export const not: {
  <P, R, B>(
    schema: S.Schema<P>,
    f: (b: Exclude<R, P>) => B
  ): <I, A, Pr>(self: Matcher<I, R, A, Pr>) => Matcher<I, TryExtract<R, P>, Unify<A | B>, Pr>

  <R, P extends DeepPartial<R>, B>(
    pattern: Narrow<P>,
    f: (_: Exclude<R, WithoutSchema<P>>) => B
  ): <I, A, Pr>(
    self: Matcher<I, R, A, Pr>
  ) => Matcher<I, TryExtract<R, WithoutSchema<P>>, Unify<A | B>, Pr>
} = <R, P extends DeepPartial<R>, B>(
  pattern: Narrow<P>,
  f: (_: Exclude<R, WithoutSchema<P>>) => B
) =>
  <I, A, Pr>(self: Matcher<I, R, A, Pr>) =>
    new Matcher<I, TryExtract<R, WithoutSchema<P>>, Unify<A | B>, Pr>([
      ...self.cases,
      new Not(P.is(makeSchema(pattern)), f as any)
    ], self.provided)

/**
 * @since 1.0.0
 */
export const orElse = <R, B>(f: (b: R) => B) =>
  <I, A, Pr>(self: Matcher<I, R, A, Pr>) =>
    pipe(
      new Matcher<I, never, Unify<A | B>, Pr>([...self.cases, new OrElse(f as any)], self.provided),
      exaustive
    )

/**
 * @since 1.0.0
 */
export const either: {
  <I, R, A, Pr>(
    self: Matcher<I, R, A, Pr>
  ): [Pr] extends [never] ? (input: I) => E.Either<R, A> : E.Either<R, A>
} = (<I, R, A>(self: Matcher<I, R, A, I>) => {
  const body = (input: I): E.Either<R, A> => {
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
  if (self.provided) {
    return body(self.provided.provided)
  }
  return body
}) as any

/**
 * @since 1.0.0
 */
export const option: {
  <I, A, Pr>(
    self: Matcher<I, any, A, Pr>
  ): [Pr] extends [never] ? (input: I) => O.Option<A> : O.Option<A>
} = (<I, A>(self: Matcher<I, any, A, I>) => {
  const toEither = either(self)
  if (E.isEither(toEither)) {
    return O.fromEither(toEither)
  }
  return (input: I): O.Option<A> => O.fromEither((toEither as any)(input))
}) as any

/**
 * @since 1.0.0
 */
export const exaustive: {
  <I, A, Pr>(self: Matcher<I, never, A, Pr>): [Pr] extends [never] ? (u: I) => A : A
} = (<I, A>(
  self: Matcher<I, never, A, I>
) => {
  const toEither = either(self as any)

  if (E.isEither(toEither)) {
    if (toEither._tag === "Right") {
      return toEither.right
    }

    throw "absurd"
  }

  return (u: I): A => {
    // @ts-expect-error
    const result = toEither(u)

    if (result._tag === "Right") {
      return result.right as any
    }

    throw "absurd"
  }
}) as any

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

type ExpandTuples<A> = A extends Array<(infer I)> ? (Array<I> | A)
  : A extends Record<string, any> ? { [K in keyof A]: ExpandTuples<A[K]> }
  : A

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

type TryExtract<A, E> = Extract<A, ExpandTuples<E>> extends never
  ? ExtractWithoutLiterals<A, ExpandTuples<E>>
  : Extract<A, ExpandTuples<E>>

type Replace<A, B> = A extends Record<string | number, any>
  ? { [K in keyof A]: K extends keyof B ? Replace<A[K], B[K]> : A[K] }
  : B extends A ? B
  : A

type Tags<P> = P extends { _tag: infer X } ? X : never

export declare const unifyF: unique symbol
export type unifyF = typeof unifyF

export declare const unify: unique symbol
export type unify = typeof unify

export type Unify<A> = [A] extends [{ [unify]?: any; [unifyF]?: () => any }]
  ? ReturnType<NonNullable<(A & { [unify]: A })[unifyF]>>
  : A

declare module "@fp-ts/core/Either" {
  interface Left<E> {
    [unify]?: unknown
    [unifyF]?: () => this[unify] extends E.Either<infer E0, infer A0> ? E.Either<E0, A0>
      : this[unify]
  }
  interface Right<A> {
    [unify]?: unknown
    [unifyF]?: () => this[unify] extends E.Either<infer E0, infer A0> ? E.Either<E0, A0>
      : this[unify]
  }
}

declare module "@fp-ts/core/These" {
  interface Both<E, A> {
    [unify]?: unknown
    [unifyF]?: () => this[unify] extends T.These<infer E0, infer A0> ? T.These<E0, A0>
      : this[unify]
  }
}
