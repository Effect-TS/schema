import * as C from "@effect/schema/Codec"
import * as PR from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("union", () => {
  it("schema + Transform", async () => {
    const transform = C.union(S.number, C.NumberFromString)
    await Util.expectParseSuccess(transform, 1, 1)
    await Util.expectParseSuccess(transform, "2", 2)
  })

  it("should go on with the next member", async () => {
    const fail = C.transformResult(
      S.number,
      S.number,
      () => PR.failure(PR.forbidden),
      PR.success
    )
    const transform = C.union(fail, S.number)
    await Util.expectParseSuccess(transform, 1, 1)
  })
})
