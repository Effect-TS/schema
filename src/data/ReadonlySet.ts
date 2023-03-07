/**
 * @since 1.0.0
 */

import { pipe } from "@effect/data/Function"
import * as RA from "@effect/data/ReadonlyArray"
import * as Effect from "@effect/io/Effect"
import { IdentifierId } from "@effect/schema/annotation/AST"
import * as H from "@effect/schema/annotation/Hook"
import type { Arbitrary } from "@effect/schema/Arbitrary"
import * as I from "@effect/schema/internal/common"
import * as PE from "@effect/schema/ParseError"
import * as P from "@effect/schema/Parser"
import type { Pretty } from "@effect/schema/Pretty"
import type { Schema } from "@effect/schema/Schema"

const isSet = (u: unknown): u is Set<unknown> => u instanceof Set

const parser = <A>(item: P.Parser<A>): P.Parser<ReadonlySet<A>> => {
  const items = P.decodeEffect(I.array(item))
  const schema = readonlySet(item)
  return I.makeParser(
    schema,
    (u) =>
      !isSet(u) ?
        Effect.fail(RA.of(PE.type(schema.ast, u))) :
        Effect.map(
          items(Array.from(u.values())),
          (as) => new Set(as)
        )
  )
}

const arbitrary = <A>(item: Arbitrary<A>): Arbitrary<ReadonlySet<A>> =>
  I.makeArbitrary(readonlySet(item), (fc) => fc.array(item.arbitrary(fc)).map((as) => new Set(as)))

const pretty = <A>(item: Pretty<A>): Pretty<ReadonlySet<A>> =>
  I.makePretty(
    readonlySet(item),
    (set) => `new Set([${Array.from(set.values()).map((a) => item.pretty(a)).join(", ")}])`
  )

/**
 * @since 1.0.0
 */
export const readonlySet = <A>(item: Schema<A>): Schema<ReadonlySet<A>> =>
  I.typeAlias(
    [item],
    I.struct({
      size: I.number
    }),
    {
      [IdentifierId]: "ReadonlySet",
      [H.ParserHookId]: H.hook(parser),
      [H.PrettyHookId]: H.hook(pretty),
      [H.ArbitraryHookId]: H.hook(arbitrary)
    }
  )

/**
 * @since 1.0.0
 */
export const fromValues = <A>(item: Schema<A>): Schema<ReadonlySet<A>> =>
  pipe(I.array(item), I.transform(readonlySet(item), (as) => new Set(as), (set) => Array.from(set)))
