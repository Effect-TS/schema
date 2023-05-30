import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("union", () => {
  it("schema + Transform", async () => {
    const transform = T.union(S.number, T.NumberFromString)
    await Util.expectParseSuccess(transform, 1, 1)
    await Util.expectParseSuccess(transform, "2", 2)
  })
})
