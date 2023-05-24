import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("includes", () => {
  it("property tests", () => {
    Util.roundtrip(T.includes("a")(T.string))
  })

  it("Guard", () => {
    const is = P.is(T.includes("a")(T.string))
    expect(is("")).toEqual(false)
    expect(is("a")).toEqual(true)
    expect(is("aa")).toEqual(true)
    expect(is("bac")).toEqual(true)
    expect(is("ba")).toEqual(true)
  })

  it("Decoder", async () => {
    const schema = T.includes("a")(T.string)
    await Util.expectParseSuccess(schema, "a")
    await Util.expectParseSuccess(schema, "aa")
    await Util.expectParseSuccess(schema, "bac")
    await Util.expectParseSuccess(schema, "ba")
    await Util.expectParseFailure(
      schema,
      "",
      `Expected a string including "a", actual ""`
    )
  })

  it("Pretty", () => {
    const pretty = Pretty.to(T.includes("a")(T.string))
    expect(pretty("a")).toEqual(`"a"`)
  })
})
