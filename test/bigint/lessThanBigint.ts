import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("bigint/lessThanBigint", () => {
  const schema = S.bigint.pipe(S.lessThanBigint(0n))

  it("decoding", async () => {
    await Util.expectParseFailure(schema, 0n, "Expected a bigint less than 0n, actual 0n")
    await Util.expectParseFailure(schema, 1n, "Expected a bigint less than 0n, actual 1n")
  })

  it("encoding", async () => {
    await Util.expectEncodeSuccess(schema, -1n, -1n)
  })
})
