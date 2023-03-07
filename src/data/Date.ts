/**
 * @since 1.0.0
 */
import { pipe } from "@effect/data/Function"
import { isDate } from "@effect/data/Predicate"
import * as RA from "@effect/data/ReadonlyArray"
import * as Effect from "@effect/io/Effect"
import { IdentifierId } from "@effect/schema/annotation/AST"
import * as H from "@effect/schema/annotation/Hook"
import type { Arbitrary } from "@effect/schema/Arbitrary"
import * as I from "@effect/schema/internal/common"
import * as PE from "@effect/schema/ParseError"
import type * as P from "@effect/schema/Parser"
import type { Pretty } from "@effect/schema/Pretty"
import type { Schema } from "@effect/schema/Schema"

const parser = (): P.Parser<Date> =>
  I.makeParser(date, (u) =>
    !isDate(u) ?
      Effect.fail(RA.of(PE.type(date.ast, u))) :
      Effect.succeed(u))

const arbitrary = (): Arbitrary<Date> => I.makeArbitrary(date, (fc) => fc.date())

const pretty = (): Pretty<Date> => I.makePretty(date, (date) => `new Date(${JSON.stringify(date)})`)

/**
 * @since 1.0.0
 */
export const date: Schema<Date> = I.typeAlias([], I.struct({}), {
  [IdentifierId]: "Date",
  [H.ParserHookId]: H.hook(parser),
  [H.PrettyHookId]: H.hook(pretty),
  [H.ArbitraryHookId]: H.hook(arbitrary)
})

/**
  Transforms a `string` into a `Date` by parsing the string using `Date.parse`.

  @since 1.0.0
*/
export const parseString = (self: Schema<string>): Schema<Date> => {
  const schema: Schema<Date> = pipe(
    self,
    I.transformEffect(
      date,
      (s) => {
        const n = Date.parse(s)
        return isNaN(n)
          ? Effect.fail(RA.of(PE.type(schema.ast, s)))
          : Effect.succeed(new Date(n))
      },
      (n) => Effect.succeed(n.toISOString())
    )
  )
  return schema
}
