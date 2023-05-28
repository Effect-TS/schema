import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("dev", () => {
  it("dev", async () => {
    const transform = T.record(S.string, T.NumberFromString)
    console.log(JSON.stringify(transform.ast, null, 2))
    await Util.expectParseSuccess(transform, { a: "1" }, { a: 1 })
  })
})
