import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it.skip("dev", async () => {
    const schema = S.NumberFromString
    await Util.expectParseFailure(
      schema,
      "a",
      `Expected string -> number, actual "a"`
    )
  })
})
