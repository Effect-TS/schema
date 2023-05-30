import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it.skip("dev", async () => {
    const transform = pipe(
      S.struct({ a: S.string }),
      C.extend(C.record(S.string, S.string))
    )
    // console.log("%o", transform.ast)
    await Util.expectEncodeSuccess(transform, { a: "a" }, { a: "a" })
    await Util.expectEncodeSuccess(transform, { a: "a", b: "b" }, { a: "a", b: "b" })
  })
})
