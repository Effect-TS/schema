import * as P from "@effect/schema/Parser"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("trim", () => {
  const schema = S.trim(S.string)

  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("Guard", () => {
    const is = P.is(schema)
    expect(is("a")).toEqual(true)
    expect(is("")).toEqual(true)
    expect(is("a ")).toEqual(false)
    expect(is(" a")).toEqual(false)
    expect(is(" a ")).toEqual(false)
    expect(is(" ")).toEqual(false)
  })

  it("Decoder", async () => {
    await Util.expectDecodingSuccess(schema, "a", "a")
    await Util.expectDecodingSuccess(schema, "", "")
    await Util.expectDecodingSuccess(schema, "a ", "a")
    await Util.expectDecodingSuccess(schema, " a ", "a")
    await Util.expectDecodingSuccess(schema, " ", "")
  })

  it("Encoder", async () => {
    Util.expectEncodingSuccess(schema, "a", "a")
    Util.expectEncodingSuccess(schema, "", "")
    await Util.expectEncodingFailure(
      schema,
      " a",
      `Expected a string with no leading or trailing whitespace, actual " a"`
    )
    await Util.expectEncodingFailure(
      schema,
      "a ",
      `Expected a string with no leading or trailing whitespace, actual "a "`
    )
    await Util.expectEncodingFailure(
      schema,
      " a ",
      `Expected a string with no leading or trailing whitespace, actual " a "`
    )
    await Util.expectEncodingFailure(
      schema,
      " ",
      `Expected a string with no leading or trailing whitespace, actual " "`
    )
  })
})
