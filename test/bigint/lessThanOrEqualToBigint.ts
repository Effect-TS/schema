import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("bigint/lessThanOrEqualToBigint", () => {
  const schema = S.bigint.pipe(S.lessThanOrEqualToBigint(0n))

  it("decoding", async () => {
    await Util.expectParseSuccess(schema, 0n, 0n)
    await Util.expectParseFailure(
      schema,
      1n,
      "Expected a bigint less than or equal to 0n, actual 1n"
    )
  })

  it("encoding", async () => {
    await Util.expectEncodeSuccess(schema, -1n, -1n)
  })
})
