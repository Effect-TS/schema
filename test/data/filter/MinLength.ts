import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("minLength", () => {
  it("property tests", () => {
    Util.roundtrip(T.minLength(0)(T.string))
  })

  it("Guard", () => {
    const is = P.is(T.minLength(1)(T.string))
    expect(is("")).toEqual(false)
    expect(is("a")).toEqual(true)
    expect(is("aa")).toEqual(true)
  })

  it("Decoder", async () => {
    const schema = T.minLength(1)(T.string)
    await Util.expectParseSuccess(schema, "a")
    await Util.expectParseSuccess(schema, "aa")
    await Util.expectParseFailure(
      schema,
      "",
      `Expected a string at least 1 character(s) long, actual ""`
    )
  })

  it("Pretty", () => {
    const pretty = Pretty.to(T.minLength(0)(T.string))
    expect(pretty("a")).toEqual(`"a"`)
  })
})
