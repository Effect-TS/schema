import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("string/length", () => {
  it("decoding", async () => {
    const schema = S.string.pipe(S.length(1))
    await Util.expectParseSuccess(schema, "a")

    await Util.expectParseFailure(
      schema,
      "",
      `Expected a string at least 1 character(s) long, actual ""`
    )
    await Util.expectParseFailure(
      schema,
      "aa",
      `Expected a string at most 1 character(s) long, actual "aa"`
    )
  })
})
