import { pipe } from "@effect/data/Function"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

const schema = pipe(S.number, S.finite())

describe.concurrent("finite", () => {
  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("is", () => {
    const is = S.is(schema)
    expect(is(1)).toEqual(true)
    expect(is(Infinity)).toEqual(false)
    expect(is(-Infinity)).toEqual(false)
  })

  it("decode", async () => {
    await Util.expectParseSuccess(schema, 1)
    await Util.expectParseFailure(
      schema,
      Infinity,
      `Expected a finite number, actual Infinity`
    )
    await Util.expectParseFailure(
      schema,
      -Infinity,
      `Expected a finite number, actual -Infinity`
    )
  })

  it("pretty", () => {
    const pretty = Pretty.build(schema)
    expect(pretty(1)).toEqual("1")
    expect(pretty(NaN)).toEqual("NaN")
    expect(pretty(Infinity)).toEqual("Infinity")
    expect(pretty(-Infinity)).toEqual("-Infinity")
  })
})
