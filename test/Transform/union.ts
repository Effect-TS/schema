import * as PR from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("union", () => {
  it("schema + Transform", async () => {
    const transform = T.union(S.number, T.NumberFromString)
    await Util.expectParseSuccess(transform, 1, 1)
    await Util.expectParseSuccess(transform, "2", 2)
  })

  it("should go on with the next member", async () => {
    const fail = T.transformResult(
      S.number,
      S.number,
      () => PR.failure(PR.forbidden),
      PR.success
    )
    const transform = T.union(fail, S.number)
    await Util.expectParseSuccess(transform, 1, 1)
  })
})
