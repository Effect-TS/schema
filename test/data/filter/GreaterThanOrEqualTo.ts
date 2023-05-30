import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("greaterThanOrEqualTo", () => {
  it("property tests", () => {
    Util.roundtrip(S.greaterThanOrEqualTo(0)(S.number))
  })

  it("is", () => {
    const is = S.is(S.greaterThanOrEqualTo(0)(S.number))
    expect(is(0)).toEqual(true)
    expect(is(1)).toEqual(true)
    expect(is(-1)).toEqual(false)
  })

  it("decode", async () => {
    const schema = S.greaterThanOrEqualTo(0)(S.number)
    await Util.expectParseSuccess(schema, 0)
    await Util.expectParseSuccess(schema, 1)
    await Util.expectParseFailure(
      schema,
      -1,
      `Expected a number greater than or equal to 0, actual -1`
    )
  })

  it("pretty", () => {
    const pretty = Pretty.build(S.greaterThanOrEqualTo(0)(S.number))
    expect(pretty(1)).toEqual("1")
  })
})
