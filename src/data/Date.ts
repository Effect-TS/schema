/**
 * @since 1.0.0
 */
import * as S from "@effect/schema"

/**
 * @since 1.0.0
 * @deprecated
 */
export const date = S.date

/**
  Transforms a `string` into a `Date` by parsing the string using `Date.parse`.

  @since 1.0.0
  @deprecated
*/
export const parseString = S.dateFromString
