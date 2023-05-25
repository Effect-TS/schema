import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("Boolean", () => {
  it("not", async () => {
    const transform = pipe(S.boolean, T.not)

    await Util.expectParseSuccess(transform, true, false)
    await Util.expectParseSuccess(transform, false, true)
    await Util.expectEncodeSuccess(transform, true, false)
    await Util.expectEncodeSuccess(transform, false, true)
  })
})
