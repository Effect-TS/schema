import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("number transformations", () => {
  describe.concurrent("clamp", () => {
    it("decode / encode", async () => {
      const codec = pipe(S.number, C.clamp(-1, 1))

      await Util.expectParseSuccess(codec, 3, 1)
      await Util.expectParseSuccess(codec, 0, 0)
      await Util.expectParseSuccess(codec, -3, -1)
    })
  })

  describe.concurrent("NumberFromString", () => {
    it("property tests", () => {
      const codec = C.NumberFromString
      Util.roundtrip(codec)
    })

    it("decode / encode", async () => {
      const codec = C.NumberFromString

      await Util.expectParseSuccess(codec, "0", 0)
      await Util.expectParseSuccess(codec, "-0", -0)
      await Util.expectParseSuccess(codec, "1", 1)
      await Util.expectParseSuccess(codec, "1.2", 1.2)

      await Util.expectParseSuccess(codec, "NaN", NaN)
      await Util.expectParseSuccess(codec, "Infinity", Infinity)
      await Util.expectParseSuccess(codec, "-Infinity", -Infinity)

      await Util.expectParseFailure(codec, "", `Expected (a string -> a number), actual ""`)
      await Util.expectParseFailure(codec, " ", `Expected (a string -> a number), actual " "`)
      await Util.expectParseFailure(codec, "1AB", `Expected (a string -> a number), actual "1AB"`)
      await Util.expectParseFailure(
        codec,
        "a",
        `Expected (a string -> a number), actual "a"`
      )
      await Util.expectParseFailure(
        codec,
        "a1",
        `Expected (a string -> a number), actual "a1"`
      )

      await Util.expectEncodeSuccess(codec, 1, "1")
    })
  })
})
