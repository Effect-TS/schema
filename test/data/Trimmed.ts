import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("trimmed", () => {
  const schema = S.Trimmed

  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("is", () => {
    const is = S.is(schema)
    expect(is("a")).toEqual(true)
    expect(is("")).toEqual(true)
    expect(is("a ")).toEqual(false)
    expect(is(" a")).toEqual(false)
    expect(is(" a ")).toEqual(false)
    expect(is(" ")).toEqual(false)
  })

  it("parse", async () => {
    await Util.expectParseSuccess(schema, "a")
    await Util.expectParseSuccess(schema, "")
    await Util.expectParseFailure(
      schema,
      "a ",
      `Expected a string with no leading or trailing whitespace, actual "a "`
    )
    await Util.expectParseFailure(
      schema,
      " a",
      `Expected a string with no leading or trailing whitespace, actual " a"`
    )
    await Util.expectParseFailure(
      schema,
      " a ",
      `Expected a string with no leading or trailing whitespace, actual " a "`
    )
  })

  it("encode", async () => {
    await Util.expectEncodeSuccess(schema, "a", "a")
    await Util.expectEncodeSuccess(schema, "", "")
    await Util.expectEncodeFailure(
      schema,
      "a ",
      `Expected a string with no leading or trailing whitespace, actual "a "`
    )
    await Util.expectEncodeFailure(
      schema,
      " a",
      `Expected a string with no leading or trailing whitespace, actual " a"`
    )
    await Util.expectEncodeFailure(
      schema,
      " a ",
      `Expected a string with no leading or trailing whitespace, actual " a "`
    )
  })

  it("pretty", () => {
    const pretty = Pretty.build(schema)
    expect(pretty("a")).toEqual(`"a"`)
    expect(pretty("")).toEqual(`""`)
  })
})