/**
 * @since 1.0.0
 */

import { pipe } from "@fp-ts/core/Function"
import * as I from "@fp-ts/schema/internal/common"
import type { AnnotationOptions, Schema } from "@fp-ts/schema/Schema"

/**
 * @since 1.0.0
 */
export const FiniteId = "@fp-ts/schema/data/Number/FiniteId"

/**
 * @since 1.0.0
 */
export const GreaterThanId = "@fp-ts/schema/data/Number/GreaterThanId"

/**
 * @since 1.0.0
 */
export const GreaterThanOrEqualToId = "@fp-ts/schema/data/Number/GreaterThanOrEqualToId"

/**
 * @since 1.0.0
 */
export const LessThanId = "@fp-ts/schema/data/Number/LessThanId"

/**
 * @since 1.0.0
 */
export const LessThanOrEqualToId = "@fp-ts/schema/data/Number/LessThanOrEqualToId"

/**
 * @since 1.0.0
 */
export const MultipleOfId = "@fp-ts/schema/data/Number/MultipleOfId"

/**
 * @since 1.0.0
 */
export const IntId = "@fp-ts/schema/data/Number/IntId"

/**
 * @since 1.0.0
 */
export const NonNaNId = "@fp-ts/schema/data/Number/NonNaNId"

/**
 * @since 1.0.0
 */
export const PositiveId = "@fp-ts/schema/data/Number/PositiveId"

/**
 * @since 1.0.0
 */
export const NegativeId = "@fp-ts/schema/data/Number/NegativeId"

/**
 * @since 1.0.0
 */
export const NonPositiveId = "@fp-ts/schema/data/Number/NonPositiveId"

/**
 * @since 1.0.0
 */
export const NonNegativeId = "@fp-ts/schema/data/Number/NonNegativeId"

/**
 * @since 1.0.0
 */
export const finite = <A extends number>(annotationOptions?: AnnotationOptions<A>) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      I.filter((a): a is A => Number.isFinite(a), {
        id: FiniteId,
        description: "a finite number",
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const greaterThan = <A extends number>(
  min: number,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      I.filter((a): a is A => a > min, {
        id: GreaterThanId,
        description: `a number greater than ${min}`,
        jsonSchema: { exclusiveMinimum: min },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const greaterThanOrEqualTo = <A extends number>(
  min: number,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      I.filter((a): a is A => a >= min, {
        id: GreaterThanOrEqualToId,
        description: `a number greater than or equal to ${min}`,
        jsonSchema: { minimum: min },
        ...annotationOptions
      })
    )

// https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
// https://github.com/colinhacks/zod/blob/5616f6b505090ebb1775d1d5567d3ee7baa5519d/src/types.ts#L915
function floatSafeRemainder(val: number, step: number) {
  const valDecCount = (val.toString().split(".")[1] || "").length
  const stepDecCount = (step.toString().split(".")[1] || "").length
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""))
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""))
  return (((valInt % stepInt) + stepInt) % stepInt) / Math.pow(10, decCount)
}

/**
 * @since 1.0.0
 */
export const multipleOf = <A extends number>(
  divisor: number,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      I.filter((a): a is A => floatSafeRemainder(a, divisor) === 0, {
        id: MultipleOfId,
        description: `a number divisible by ${divisor}`,
        jsonSchema: { multipleOf: divisor < 0 ? -divisor : divisor }, // spec requires positive divisor
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const int = <A extends number>(annotationOptions?: AnnotationOptions<A>) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      I.filter((a): a is A => Number.isInteger(a), {
        id: IntId,
        description: "integer",
        jsonSchema: { type: "integer" },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const lessThan = <A extends number>(max: number, annotationOptions?: AnnotationOptions<A>) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      I.filter((a): a is A => a < max, {
        id: LessThanId,
        description: `a number less than ${max}`,
        jsonSchema: { exclusiveMaximum: max },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const lessThanOrEqualTo = <A extends number>(
  max: number,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      I.filter((a): a is A => a <= max, {
        id: LessThanOrEqualToId,
        description: `a number less than or equal to ${max}`,
        jsonSchema: { maximum: max },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const nonNaN = <A extends number>(annotationOptions?: AnnotationOptions<A>) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      I.filter((a): a is A => !Number.isNaN(a), {
        id: NonNaNId,
        description: "a number NaN excluded",
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const positive = <A extends number>(
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  greaterThan(0, {
    id: PositiveId,
    description: "a positive number",
    ...annotationOptions
  })

/**
 * @since 1.0.0
 */
export const negative = <A extends number>(
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  lessThan(0, {
    id: NegativeId,
    description: "a negative number",
    ...annotationOptions
  })

/**
 * @since 1.0.0
 */
export const nonNegative = <A extends number>(
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  greaterThanOrEqualTo(0, {
    id: NonNegativeId,
    description: "a non-negative number",
    ...annotationOptions
  })

/**
 * @since 1.0.0
 */
export const nonPositive = <A extends number>(
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  lessThanOrEqualTo(0, {
    id: NonPositiveId,
    description: "a non-positive number",
    ...annotationOptions
  })
