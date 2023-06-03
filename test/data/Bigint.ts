import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Bigint", () => {
  it("clampBigint", async () => {
    const transform = pipe(S.bigint, C.clampBigint(-1n, 1n))

    await Util.expectParseSuccess(transform, 3n, 1n)
    await Util.expectParseSuccess(transform, 0n, 0n)
    await Util.expectParseSuccess(transform, -3n, -1n)
  })
})
