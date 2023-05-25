import { pipe } from "@effect/data/Function"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("trim", () => {
  it("property tests", () => {
    const schema = T.Trim
    Util.roundtrip(schema)
  })

  it("parse", async () => {
    const schema = pipe(T.string, T.minLength(1), T.trim)
    await Util.expectParseSuccess(schema, "a", "a")
    await Util.expectParseSuccess(schema, "a ", "a")
    await Util.expectParseSuccess(schema, " a ", "a")

    await Util.expectParseFailure(
      schema,
      "  ",
      `Expected a string at least 1 character(s) long, actual ""`
    )
    await Util.expectParseFailure(
      schema,
      "",
      `Expected a string at least 1 character(s) long, actual ""`
    )
  })

  it("encode", async () => {
    const schema = pipe(T.string, T.minLength(1), T.trim)
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
