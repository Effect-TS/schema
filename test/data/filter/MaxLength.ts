import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("maxLength", () => {
  it("property tests", () => {
    Util.roundtrip(T.maxLength(0)(T.string))
  })

  it("Guard", () => {
    const is = P.is(T.maxLength(1)(T.string))
    expect(is("")).toEqual(true)
    expect(is("a")).toEqual(true)
    expect(is("aa")).toEqual(false)
  })

  it("Decoder", async () => {
    const schema = T.maxLength(1)(T.string)
    await Util.expectParseSuccess(schema, "")
    await Util.expectParseSuccess(schema, "a")
    await Util.expectParseFailure(
      schema,
      "aa",
      `Expected a string at most 1 character(s) long, actual "aa"`
    )
  })

  it("Pretty", () => {
    const pretty = Pretty.to(T.maxLength(0)(T.string))
    expect(pretty("a")).toEqual(`"a"`)
  })
})
