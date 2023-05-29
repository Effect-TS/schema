import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

const NumberFromChar = pipe(S.string, S.maxLength(1), T.numberFromString)

describe.concurrent("dev", () => {
  it("dev", async () => {
    const transform = pipe(
      S.struct({ a: S.number }),
      T.extend(T.record(S.string, NumberFromChar))
    )
    // console.log("%o", transform.ast)
    await Util.expectEncodeSuccess(transform, { a: 1 }, { a: 1 })
    await Util.expectEncodeSuccess(transform, { a: 1, b: 1 }, { a: 1, b: "1" })
  })
})
