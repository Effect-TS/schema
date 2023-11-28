import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import { Duration } from "effect"
import { describe, it } from "vitest"

describe("Schema/greaterThanOrEqualToDuration", () => {
  const schema = S.DurationFromSelf.pipe(S.greaterThanOrEqualToDuration("5 seconds"))

  it("decoding", async () => {
    await Util.expectParseSuccess(
      schema,
      Duration.decode("6 seconds"),
      Duration.decode("6 seconds")
    )

    await Util.expectParseSuccess(
      schema,
      Duration.decode("5 seconds"),
      Duration.decode("5 seconds")
    )

    await Util.expectParseFailure(
      schema,
      Duration.decode("4 seconds"),
      `Expected a Duration greater than or equal to 5 seconds, actual {
  "_id": "Duration",
  "_tag": "Millis",
  "millis": 4000
}`
    )
  })

  it("encoding", async () => {
    await Util.expectEncodeSuccess(
      schema,
      Duration.decode("5 seconds"),
      Duration.decode("5 seconds")
    )
  })
})
