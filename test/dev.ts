import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it.skip("dev", async () => {
    const schema = S.struct({ a: S.optional(S.union(S.number, S.undefined)) })
    await Util.expectParseSuccess(schema, {})
  })
})
