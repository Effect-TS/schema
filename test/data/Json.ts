import * as P from "@effect/schema/Pretty"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("Json", () => {
  it("property tests. json", () => {
    Util.roundtrip(T.json)
  })

  it("should exclude NaN", () => {
    expect(T.is(T.json)(NaN)).toEqual(false)
    Util.expectParseFailure(T.JsonNumber, NaN, "Expected a JSON number, actual NaN")
    Util.expectParseFailure(T.JsonNumber, Number.NaN, "Expected a JSON number, actual NaN")
  })

  it("should exclude +/- Infinity", () => {
    expect(T.is(T.json)(Infinity)).toEqual(false)
    expect(T.is(T.json)(-Infinity)).toEqual(false)
    Util.expectParseFailure(T.JsonNumber, Infinity, "Expected a JSON number, actual Infinity")
    Util.expectParseFailure(T.JsonNumber, -Infinity, "Expected a JSON number, actual -Infinity")
    Util.expectParseFailure(
      T.JsonNumber,
      Number.POSITIVE_INFINITY,
      "Expected a JSON number, actual Infinity"
    )
    Util.expectParseFailure(
      T.JsonNumber,
      Number.NEGATIVE_INFINITY,
      "Expected a JSON number, actual -Infinity"
    )
  })

  it("Pretty", () => {
    const pretty = P.to(T.json)
    expect(pretty({ a: [1, true] })).toEqual(`{ "a": [1, true] }`)
  })
})
