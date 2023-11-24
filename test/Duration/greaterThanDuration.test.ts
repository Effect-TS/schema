import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import { Duration } from "effect"
import { describe, it } from "vitest"

describe("Schema/greaterThanDuration", () => {
  const min = Duration.decode("5 seconds")
  const schema = S.DurationFromSelf.pipe(S.greaterThanDuration(min))

  it("decoding", async () => {
    await Util.expectParseSuccess(
      schema,
      Duration.decode("6 seconds"),
      Duration.decode("6 seconds")
    )

    await Util.expectParseFailure(
      schema,
      Duration.decode("5 seconds"),
      `Expected a Duration greater than ${min.toString()}, actual {"_id":"Duration","_tag":"Millis","millis":5000}`
    )

    await Util.expectParseFailure(
      schema,
      Duration.decode("4 seconds"),
      `Expected a Duration greater than ${min.toString()}, actual {"_id":"Duration","_tag":"Millis","millis":4000}`
    )
  })

  it("encoding", async () => {
    await Util.expectEncodeSuccess(
      schema,
      Duration.decode("6 seconds"),
      Duration.decode("6 seconds")
    )
  })
})
