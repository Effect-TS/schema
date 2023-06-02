import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as Util from "@effect/schema/test/util"

describe.concurrent("minLength", () => {
  it("property tests", () => {
    Util.roundtrip(pipe(Util.X2, C.minLength(2)))
  })

  it("decode", async () => {
    const codec = pipe(Util.X2, C.minLength(2))
    await Util.expectParseSuccess(codec, "a", "aa")
    await Util.expectParseSuccess(codec, "aa", "aaaa")
    await Util.expectParseFailure(
      codec,
      "",
      `Expected a string at least 2 character(s) long, actual ""`
    )
  })
})
