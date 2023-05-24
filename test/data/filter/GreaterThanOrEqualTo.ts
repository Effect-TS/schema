import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("greaterThanOrEqualTo", () => {
  it("property tests", () => {
    Util.roundtrip(T.greaterThanOrEqualTo(0)(T.number))
  })

  it("Guard", () => {
    const is = P.is(T.greaterThanOrEqualTo(0)(T.number))
    expect(is(0)).toEqual(true)
    expect(is(1)).toEqual(true)
    expect(is(-1)).toEqual(false)
  })

  it("Decoder", async () => {
    const schema = T.greaterThanOrEqualTo(0)(T.number)
    await Util.expectParseSuccess(schema, 0)
    await Util.expectParseSuccess(schema, 1)
    await Util.expectParseFailure(
      schema,
      -1,
      `Expected a number greater than or equal to 0, actual -1`
    )
  })

  it("Pretty", () => {
    const pretty = Pretty.to(T.greaterThanOrEqualTo(0)(T.number))
    expect(pretty(1)).toEqual("1")
  })
})
