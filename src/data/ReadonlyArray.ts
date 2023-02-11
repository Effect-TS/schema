/**
 * @since 1.0.0
 */

import { pipe } from "@fp-ts/core/Function"
import * as I from "@fp-ts/schema/internal/common"
import type { AnnotationOptions, Schema } from "@fp-ts/schema/Schema"

/**
 * @category identifiers
 * @since 1.0.0
 */
export const MinItemsId = "@fp-ts/schema/ReadonlyArray/minItems"

/**
 * @category identifiers
 * @since 1.0.0
 */
export const MaxItemsId = "@fp-ts/schema/ReadonlyArray/maxItems"

/**
 * @category identifiers
 * @since 1.0.0
 */
export const ItemsCountId = "@fp-ts/schema/ReadonlyArray/itemsCount"

/**
 * @since 1.0.0
 */
export const minItems = <A>(
  n: number,
  annotationOptions?: AnnotationOptions<ReadonlyArray<A>>
) =>
  (self: Schema<ReadonlyArray<A>>): Schema<ReadonlyArray<A>> =>
    pipe(
      self,
      I.filter((a): a is ReadonlyArray<A> => a.length >= n, {
        id: MinItemsId,
        description: `an array of at least ${n} items`,
        jsonSchema: { minItems: n },
        props: { minItems: n },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const maxItems = <A>(
  n: number,
  annotationOptions?: AnnotationOptions<ReadonlyArray<A>>
) =>
  (self: Schema<ReadonlyArray<A>>): Schema<ReadonlyArray<A>> =>
    pipe(
      self,
      I.filter((a): a is ReadonlyArray<A> => a.length <= n, {
        id: MaxItemsId,
        description: `an array of at most ${n} items`,
        jsonSchema: { maxItems: n },
        props: { maxItems: n },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const itemsCount = <A>(
  n: number,
  annotationOptions?: AnnotationOptions<ReadonlyArray<A>>
) =>
  (self: Schema<ReadonlyArray<A>>): Schema<ReadonlyArray<A>> =>
    pipe(
      self,
      I.filter((a): a is ReadonlyArray<A> => a.length === n, {
        id: ItemsCountId,
        description: `an array of exactly ${n} items`,
        jsonSchema: { minItems: n, maxItems: n },
        props: { itemsCount: n },
        ...annotationOptions
      })
    )
