import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("dev", () => {
  it.skip("dev", async () => {
    const schema = T.NumberFromString
    await Util.expectParseFailure(
      schema,
      "a",
      `Expected string -> number, actual "a"`
    )
  })
})
