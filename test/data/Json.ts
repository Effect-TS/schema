import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Json", () => {
  it("property tests", () => {
    Util.roundtrip(S.json)
  })

  it("should exclude NaN", () => {
    expect(S.is(S.json)(NaN)).toEqual(false)
    Util.expectParseFailure(S.JsonNumber, NaN, "Expected a JSON number, actual NaN")
    Util.expectParseFailure(S.JsonNumber, Number.NaN, "Expected a JSON number, actual NaN")
  })

  it("should exclude +/- Infinity", () => {
    expect(S.is(S.json)(Infinity)).toEqual(false)
    expect(S.is(S.json)(-Infinity)).toEqual(false)
    Util.expectParseFailure(S.JsonNumber, Infinity, "Expected a JSON number, actual Infinity")
    Util.expectParseFailure(S.JsonNumber, -Infinity, "Expected a JSON number, actual -Infinity")
    Util.expectParseFailure(
      S.JsonNumber,
      Number.POSITIVE_INFINITY,
      "Expected a JSON number, actual Infinity"
    )
    Util.expectParseFailure(
      S.JsonNumber,
      Number.NEGATIVE_INFINITY,
      "Expected a JSON number, actual -Infinity"
    )
  })

  it("pretty", () => {
    const pretty = Pretty.build(S.json)
    expect(pretty({ a: [1, true] })).toEqual(`{ "a": [1, true] }`)
  })
})
