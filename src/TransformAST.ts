/**
 * @since 1.0.0
 */

import type { Option } from "@effect/data/Option"
import type * as RA from "@effect/data/ReadonlyArray"
import type { Transform } from "@effect/schema/AST"

/**
 * @category model
 * @since 1.0.0
 */
export type TransformAST = FinalTransformation | TypeLiteralTransformation

/**
 * @category model
 * @since 1.0.0
 */
export interface FinalTransformation {
  readonly _tag: "FinalTransformation"
  decode: Transform["decode"]
  encode: Transform["encode"]
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const createFinalTransformation = (
  decode: Transform["decode"],
  encode: Transform["encode"]
): FinalTransformation => ({ _tag: "FinalTransformation", decode, encode })

/**
 * Represents a `PropertySignature -> PropertySignature` transformation
 *
 * The semantic of `decode` is:
 * - `none()` represents the absence of the key/value pair
 * - `some(value)` represents the presence of the key/value pair
 *
 * The semantic of `encode` is:
 * - `none()` you don't want to output the key/value pair
 * - `some(value)` you want to output the key/value pair
 *
 * @category model
 * @since 1.0.0
 */
export interface FinalPropertySignatureTransformation {
  readonly _tag: "FinalPropertySignatureTransformation"
  decode: (o: Option<any>) => Option<any>
  encode: (o: Option<any>) => Option<any>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const createFinalPropertySignatureTransformation = (
  decode: FinalPropertySignatureTransformation["decode"],
  encode: FinalPropertySignatureTransformation["encode"]
): FinalPropertySignatureTransformation => ({
  _tag: "FinalPropertySignatureTransformation",
  decode,
  encode
})

/**
 * @category model
 * @since 1.0.0
 */
export interface PropertySignatureTransformation {
  readonly from: PropertyKey
  readonly to: PropertyKey
  readonly transformation: FinalPropertySignatureTransformation | TransformAST
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const createPropertySignatureTransformation = (
  from: PropertyKey,
  to: PropertyKey,
  transformation: PropertySignatureTransformation["transformation"]
): PropertySignatureTransformation => ({ from, to, transformation })

/**
 * @category model
 * @since 1.0.0
 */
export interface TypeLiteralTransformation {
  readonly _tag: "TypeLiteralTransformation"
  readonly propertySignatureTransformations: RA.NonEmptyReadonlyArray<
    PropertySignatureTransformation
  >
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const createTypeLiteralTransformation = (
  propertySignatureTransformations: TypeLiteralTransformation["propertySignatureTransformations"]
): TypeLiteralTransformation => ({
  _tag: "TypeLiteralTransformation",
  propertySignatureTransformations
})

/**
 * @category guard
 * @since 1.0.0
 */
export const isTypeLiteralTransformation = (ast: TransformAST): ast is TypeLiteralTransformation =>
  ast._tag === "TypeLiteralTransformation"
