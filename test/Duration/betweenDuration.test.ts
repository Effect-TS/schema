import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import { Duration } from "effect"
import { describe, it } from "vitest"

describe("Schema/betweenDuration", () => {
  const schema = S.DurationFromSelf.pipe(S.betweenDuration("5 seconds", "10 seconds"))

  it("decoding", async () => {
    await Util.expectParseFailure(
      schema,
      Duration.decode("4 seconds"),
      `Expected a Duration between 5 seconds and 10 seconds, actual {
  "_id": "Duration",
  "_tag": "Millis",
  "millis": 4000
}`
    )

    await Util.expectParseSuccess(
      schema,
      Duration.decode("7 seconds"),
      Duration.decode("7 seconds")
    )

    await Util.expectParseFailure(
      schema,
      Duration.decode("11 seconds"),
      `Expected a Duration between 5 seconds and 10 seconds, actual {
  "_id": "Duration",
  "_tag": "Millis",
  "millis": 11000
}`
    )
  })

  it("encoding", async () => {
    await Util.expectEncodeSuccess(
      schema,
      Duration.decode("7 seconds"),
      Duration.decode("7 seconds")
    )
  })
})
