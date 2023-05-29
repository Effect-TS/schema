import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("trim", () => {
  it("property tests", () => {
    const transform = T.Trim
    Util.roundtrip(transform)
  })

  it("parse", async () => {
    const transform = pipe(S.string, S.minLength(1), T.trim)
    await Util.expectParseSuccess(transform, "a", "a")
    await Util.expectParseSuccess(transform, "a ", "a")
    await Util.expectParseSuccess(transform, " a ", "a")

    await Util.expectParseFailure(
      transform,
      "  ",
      `Expected a string at least 1 character(s) long, actual ""`
    )
    await Util.expectParseFailure(
      transform,
      "",
      `Expected a string at least 1 character(s) long, actual ""`
    )
  })

  it("encode", async () => {
    const transform = pipe(S.string, S.minLength(1), T.trim)
    await Util.expectEncodeSuccess(transform, "a", "a")

    await Util.expectEncodeFailure(
      transform,
      "",
      `Expected a string at least 1 character(s) long, actual ""`
    )
    await Util.expectEncodeFailure(
      transform,
      " a",
      `Expected a string with no leading or trailing whitespace, actual " a"`
    )
    await Util.expectEncodeFailure(
      transform,
      "a ",
      `Expected a string with no leading or trailing whitespace, actual "a "`
    )
    await Util.expectEncodeFailure(
      transform,
      " a ",
      `Expected a string with no leading or trailing whitespace, actual " a "`
    )
    await Util.expectEncodeFailure(
      transform,
      " ",
      `Expected a string with no leading or trailing whitespace, actual " "`
    )
  })
})
