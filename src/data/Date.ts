/**
 * @since 1.0.0
 */
import * as O from "@fp-ts/data/Option"
import type * as A from "@fp-ts/schema/Arbitrary"
import * as DE from "@fp-ts/schema/DecodeError"
import type * as D from "@fp-ts/schema/Decoder"
import type * as E from "@fp-ts/schema/Encoder"
import type * as G from "@fp-ts/schema/Guard"
import * as I from "@fp-ts/schema/internal/common"
import * as P from "@fp-ts/schema/Provider"
import type * as S from "@fp-ts/schema/Schema"
import type * as Sh from "@fp-ts/schema/Show"

/**
 * @since 1.0.0
 */
export const id = Symbol.for("@fp-ts/schema/data/date")

/**
 * @since 1.0.0
 */
export const Provider: P.Provider = P.make(id, {
  [I.GuardId]: () => Guard,
  [I.ArbitraryId]: () => Arbitrary,
  [I.DecoderId]: () => Decoder,
  [I.JsonDecoderId]: () => Decoder,
  [I.EncoderId]: () => Encoder,
  [I.ShowId]: () => Show,
  [I.JsonEncoderId]: () => Encoder
})

/**
 * @since 1.0.0
 */
export const Schema: S.Schema<Date> = I.declareSchema(id, O.none, Provider)

const Guard: G.Guard<Date> = I.makeGuard(Schema, (u): u is Date => u instanceof Date)

const parseDate = (s: string) => {
  const d = new Date(s)
  return isNaN(d.getTime()) ? I.fail(DE.notType("date", s)) : I.succeed(d)
}

const Decoder: D.Decoder<unknown, Date> = I.makeDecoder(
  Schema,
  (u) =>
    Guard.is(u)
      ? I.succeed(u)
      : typeof u === "string"
      ? parseDate(u)
      : I.fail(DE.notType("date", u))
)

const Encoder: E.Encoder<string, Date> = I.makeEncoder(Schema, (_) => _.toISOString())

const Arbitrary: A.Arbitrary<Date> = I.makeArbitrary(Schema, (fc) => fc.date())

const Show: Sh.Show<Date> = I.makeShow(Schema, (n) => JSON.stringify(n))
