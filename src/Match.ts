/**
 * @since 1.0.0
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as E from "@fp-ts/core/Either"
import { identity } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import type * as T from "@fp-ts/core/These"
import type * as AST from "@fp-ts/schema/AST"
import * as P from "@fp-ts/schema/Parser"
import * as S from "@fp-ts/schema/Schema"

/**
 * @since 1.0.0
 */
export type Matcher<Input, Remaining, RemainingApplied, Result, Provided> =
  | TypeMatcher<Input, Remaining, RemainingApplied, Result>
  | ValueMatcher<Input, Remaining, RemainingApplied, Result, Provided>

/**
 * @since 1.0.0
 */
export class TypeMatcher<Input, Remaining, RemainingApplied, Result> {
  /**
   * @since 1.0.0
   */
  readonly _tag = "TypeMatcher"
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
  readonly _remainingApplied: (_: never) => RemainingApplied = identity
  /**
   * @since 1.0.0
   */
  readonly _result: (_: never) => Result = identity

  constructor(
    /**
     * @since 1.0.0
     */
    readonly cases: ReadonlyArray<Case>
  ) {}

  /**
   * @since 1.0.0
   */
  add<I, R, RA, A>(_case: Case): TypeMatcher<I, R, RA, A> {
    return new TypeMatcher([...this.cases, _case])
  }
}

/**
 * @since 1.0.0
 */
export class ValueMatcher<Input, Remaining, RemainingApplied, Result, Provided> {
  /**
   * @since 1.0.0
   */
  readonly _tag = "ValueMatcher"
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
    readonly provided: Provided,
    /**
     * @since 1.0.0
     */
    readonly value: E.Either<RemainingApplied, Provided>
  ) {}

  /**
   * @since 1.0.0
   */
  add<I, R, RA, A, Pr>(_case: Case): ValueMatcher<I, R, RA, A, Pr> {
    if (this.value._tag === "Right") {
      // @ts-expect-error
      return this
    }

    if (_case._tag === "When" && _case.guard(this.provided, { isUnexpectedAllowed: true })) {
      return new ValueMatcher(
        this.provided,
        E.right(_case.evaluate(this.provided))
      )
    } else if (_case._tag === "Not" && !_case.guard(this.provided, { isUnexpectedAllowed: true })) {
      return new ValueMatcher(
        this.provided,
        E.right(_case.evaluate(this.provided))
      )
    }

    // @ts-expect-error
    return this
  }
}

/**
 * @since 1.0.0
 */
export type Case = When | Not

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
export const type = <I>(): Matcher<I, I, I, never, never> => new TypeMatcher([])

/**
 * @since 1.0.0
 */
export const value = <I>(i: I): Matcher<I, I, I, never, I> => new ValueMatcher(i, E.left(i))

/**
 * @since 1.0.0
 */
export const when: {
  <RA, P extends DeepPartial<RA>, B>(
    pattern: Narrow<P>,
    f: (_: Replace<TryExtract<RA, WithoutSchema<P>>, P>) => B
  ): <I, R, A, Pr>(
    self: Matcher<I, R, RA, A, Pr>
  ) => Matcher<
    I,
    AddWithout<R, WithoutSchema<P>>,
    ApplyFilters<AddWithout<R, WithoutSchema<P>>>,
    Unify<A | B>,
    Pr
  >

  <P, RA, B>(
    schema: S.Schema<P>,
    f: (_: Replace<TryExtract<RA, P>, P>) => B
  ): <I, R, A, Pr>(
    self: Matcher<I, R, RA, A, Pr>
  ) => Matcher<I, AddWithout<R, P>, ApplyFilters<AddWithout<R, P>>, Unify<A | B>, Pr>
} = (
  pattern: any,
  f: (input: unknown) => any
) => (self: any) => self.add(new When(P.is(makeSchema(pattern)), f))

/**
 * @since 1.0.0
 */
export const tag: {
  <RA, P extends Tags<RA> & (string | number | symbol | object | {}), B>(
    pattern: P,
    f: (_: Extract<RA, { readonly _tag: P }>) => B
  ): <I, R, A, Pr>(
    self: Matcher<I, R, RA, A, Pr>
  ) => Matcher<
    I,
    AddWithout<R, Extract<RA, { _tag: P }>>,
    ApplyFilters<AddWithout<R, Extract<RA, { _tag: P }>>>,
    Unify<A | B>,
    Pr
  >
} = (pattern, f) =>
  (self: any) =>
    self.add(
      new When(
        (_) => typeof _ === "object" && _ != null && "_tag" in _ && _._tag === pattern,
        f as any
      )
    )

/**
 * @since 1.0.0
 */
export const not: {
  <P, RA, B>(
    schema: S.Schema<P>,
    f: (_: Exclude<RA, P>) => B
  ): <I, R, A, Pr>(
    self: Matcher<I, R, RA, A, Pr>
  ) => Matcher<I, AddOnly<R, P>, ApplyFilters<AddOnly<R, P>>, Unify<A | B>, Pr>

  <RA, P extends DeepPartial<RA>, B>(
    pattern: Narrow<P>,
    f: (_: Exclude<RA, WithoutSchema<P>>) => B
  ): <I, R, A, Pr>(
    self: Matcher<I, R, RA, A, Pr>
  ) => Matcher<
    I,
    AddOnly<R, WithoutSchema<P>>,
    ApplyFilters<AddOnly<R, WithoutSchema<P>>>,
    Unify<A | B>,
    Pr
  >
} = (
  pattern: any,
  f: (_: never) => any
) => (self: any): any => self.add(new Not(P.is(makeSchema(pattern)), f as any))

/**
 * @since 1.0.0
 */
export const orElse = <RA, B>(f: (b: RA) => B) =>
  <I, R, A, Pr>(
    self: Matcher<I, R, RA, A, Pr>
  ): [Pr] extends [never] ? (input: I) => (A | B) : (A | B) => {
    const result = either(self)

    if (E.isEither(result)) {
      // @ts-expect-error
      return result._tag === "Right" ? result.right : f(result.left)
    }

    // @ts-expect-error
    return (input: I) => {
      const a = result(input)
      return a._tag === "Right" ? a.right : f(a.left)
    }
  }

/**
 * @since 1.0.0
 */
export const either: <I, R, RA, A, Pr>(
  self: Matcher<I, R, RA, A, Pr>
) => [Pr] extends [never] ? (input: I) => E.Either<RA, A>
  : E.Either<RA, A> = (<I, R, RA, A>(self: Matcher<I, R, RA, A, I>) => {
    if (self._tag === "ValueMatcher") {
      return self.value
    }

    return (input: I): E.Either<RA, A> => {
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
        }
      }

      return E.left(input as any)
    }
  }) as any

/**
 * @since 1.0.0
 */
export const option: <I, R, RA, A, Pr>(
  self: Matcher<I, R, RA, A, Pr>
) => [Pr] extends [never] ? (input: I) => O.Option<A> : O.Option<A> =
  (<I, A>(self: Matcher<I, any, any, A, I>) => {
    const toEither = either(self)
    if (E.isEither(toEither)) {
      return O.fromEither(toEither)
    }
    return (input: I): O.Option<A> => O.fromEither((toEither as any)(input))
  }) as any

/**
 * @since 1.0.0
 */
export const exaustive: <I, R, A, Pr>(
  self: Matcher<I, R, never, A, Pr>
) => [Pr] extends [never] ? (u: I) => A : A = (<I, A>(
  self: Matcher<I, any, never, A, I>
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
  : A

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

interface Without<A, X> {
  readonly _A: A
  readonly _Without: X
}

interface Only<A, X> {
  readonly _A: A
  readonly _Only: X
}

type AddWithout<A, X> = A extends Without<infer P, infer WX> ? Without<P, X | WX>
  : A extends Only<infer P, infer OX> ? Only<P, Exclude<OX, X>>
  : Without<A, X>

type AddOnly<A, X> = A extends Without<infer P, infer WX> ? X extends WX ? never
: Only<P, X>
  : A extends Only<infer P, infer OX> ? X extends OX ? Only<P, X> : never
  : Only<A, X>

type ApplyFilters<A> = A extends Only<any, infer X> ? X
  : A extends Without<infer P, infer X> ? Exclude<P, X>
  : A

type Tags<P> = P extends { _tag: infer X } ? X : never

/**
 * @since 1.0.0
 */
export declare const unifyF: unique symbol
/**
 * @since 1.0.0
 */
export type unifyF = typeof unifyF
/**
 * @since 1.0.0
 */
export declare const unify: unique symbol
/**
 * @since 1.0.0
 */
export type unify = typeof unify
/**
 * @since 1.0.0
 */
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
