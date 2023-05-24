/**
 * @since 1.0.0
 */

import type * as AST from "@effect/schema/AST"

/**
 * @category model
 * @since 1.0.0
 */
export interface Schema<A> {
  readonly A: (_: A) => A
  readonly ast: AST.AST
}
