import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Refinement", () => {
  it("filter int", async () => {
    const transform = pipe(C.NumberFromString, C.filter(S.int()))

    await Util.expectParseSuccess(transform, "1", 1)
    await Util.expectParseFailure(transform, "1.2", "Expected integer, actual 1.2")

    // should work with `Schema`s too
    const schema = pipe(S.number, C.filter(S.int()))
    await Util.expectParseSuccess(schema, 1)
    await Util.expectParseFailure(schema, 1.2, "Expected integer, actual 1.2")
  })

  it("filter greaterThanOrEqualTo + lessThanOrEqualTo", async () => {
    const schema = pipe(
      C.NumberFromString,
      C.filter(S.greaterThanOrEqualTo(1)),
      C.filter(S.lessThanOrEqualTo(2))
    )
    await Util.expectParseSuccess(schema, "1", 1)
    await Util.expectParseFailure(
      schema,
      "0",
      `Expected a number greater than or equal to 1, actual 0`
    )
    await Util.expectParseFailure(
      schema,
      "3",
      `Expected a number less than or equal to 2, actual 3`
    )

    await Util.expectEncodeSuccess(schema, 1, "1")
    await Util.expectEncodeFailure(
      schema,
      0,
      `Expected a number greater than or equal to 1, actual 0`
    )
    await Util.expectEncodeFailure(
      schema,
      3,
      `Expected a number less than or equal to 2, actual 3`
    )
  })
})
