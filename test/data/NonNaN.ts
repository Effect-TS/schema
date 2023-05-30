import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("NonNaN", () => {
  const schema = S.NonNaN

  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("is", () => {
    const is = S.is(schema)
    expect(is(1)).toEqual(true)
    expect(is(NaN)).toEqual(false)
  })

  it("decode", async () => {
    await Util.expectParseSuccess(schema, 1)
    await Util.expectParseFailure(schema, NaN, `Expected a number NaN excluded, actual NaN`)
  })

  it("pretty", () => {
    const pretty = Pretty.build(schema)
    expect(pretty(1)).toEqual("1")
    expect(pretty(NaN)).toEqual("NaN")
  })
})
