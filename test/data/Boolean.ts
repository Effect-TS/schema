import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Boolean", () => {
  it("not", async () => {
    const transform = pipe(S.boolean, C.not)

    await Util.expectParseSuccess(transform, true, false)
    await Util.expectParseSuccess(transform, false, true)
    await Util.expectEncodeSuccess(transform, true, false)
    await Util.expectEncodeSuccess(transform, false, true)
  })
})
