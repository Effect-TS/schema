import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it.skip("dev", async () => {
    const codec = pipe(C.NumberFromString, C.filter((n) => n > 0))
    await Util.expectParseSuccess(codec, "1", 1)
    await Util.expectParseFailure(codec, "0", "Expected <anonymous refinement schema>, actual 0")
  })

  it.skip("tuple/e", async () => {
    const NumberFromChar = pipe(S.string, S.maxLength(1), C.numberFromString)
    const codec = C.array(NumberFromChar)
    await Util.expectEncodeFailure(
      codec,
      [10],
      `/0 Expected a string at most 1 character(s) long, actual "10"`
    )
  })
})
