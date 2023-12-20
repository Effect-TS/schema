import * as P from "@effect/schema/Parser"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import { describe, expect, it } from "vitest"

describe("string/trim", () => {
  it("property tests", () => {
    const schema = S.Trim
    Util.roundtrip(schema)
  })

  it("is", () => {
    const schema = S.Trim
    const is = P.is(schema)
    expect(is("a")).toEqual(true)
    expect(is("")).toEqual(true)
    expect(is("a ")).toEqual(false)
    expect(is(" a")).toEqual(false)
    expect(is(" a ")).toEqual(false)
    expect(is(" ")).toEqual(false)
  })

  it("decoding", async () => {
    const schema = S.string.pipe(S.minLength(1), S.compose(S.Trim))
    await Util.expectParseSuccess(schema, "a", "a")
    await Util.expectParseSuccess(schema, "a ", "a")
    await Util.expectParseSuccess(schema, " a ", "a")
    await Util.expectParseSuccess(schema, " ", "")

    await Util.expectParseFailure(
      schema,
      "",
      `Expected a string at least 1 character(s) long, actual ""`
    )
  })

  it("encoding", async () => {
    const schema = S.string.pipe(S.minLength(1), S.compose(S.Trim))
    await Util.expectEncodeSuccess(schema, "a", "a")

    await Util.expectEncodeFailure(
      schema,
      "",
      `Expected a string at least 1 character(s) long, actual ""`
    )
    await Util.expectEncodeFailure(
      schema,
      " a",
      `Expected a string with no leading or trailing whitespace, actual " a"`
    )
    await Util.expectEncodeFailure(
      schema,
      "a ",
      `Expected a string with no leading or trailing whitespace, actual "a "`
    )
    await Util.expectEncodeFailure(
      schema,
      " a ",
      `Expected a string with no leading or trailing whitespace, actual " a "`
    )
    await Util.expectEncodeFailure(
      schema,
      " ",
      `Expected a string with no leading or trailing whitespace, actual " "`
    )
  })
})
