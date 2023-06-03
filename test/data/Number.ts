import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Number", () => {
  describe.concurrent("Transform", () => {
    it("clamp", async () => {
      const transform = pipe(S.number, C.clamp(-1, 1))

      await Util.expectParseSuccess(transform, 3, 1)
      await Util.expectParseSuccess(transform, 0, 0)
      await Util.expectParseSuccess(transform, -3, -1)
    })

    describe.concurrent("NumberFromString", () => {
      const transform = C.NumberFromString

      it("property tests", () => {
        Util.roundtrip(transform)
      })

      it("parse", async () => {
        await Util.expectParseSuccess(transform, "1", 1)
        await Util.expectParseSuccess(transform, "1a", 1)
        await Util.expectParseFailure(
          transform,
          "a",
          `Expected (a string -> a number), actual "a"`
        )
        await Util.expectParseFailure(
          transform,
          "a1",
          `Expected (a string -> a number), actual "a1"`
        )
      })

      it("encode", async () => {
        await Util.expectEncodeSuccess(transform, 1, "1")
      })

      it("example", async () => {
        // success cases
        await Util.expectParseSuccess(transform, "1", 1)
        await Util.expectParseSuccess(transform, "-1", -1)
        await Util.expectParseSuccess(transform, "1.5", 1.5)
        await Util.expectParseSuccess(transform, "NaN", NaN)
        await Util.expectParseSuccess(transform, "Infinity", Infinity)
        await Util.expectParseSuccess(transform, "-Infinity", -Infinity)

        // failure cases
        await Util.expectParseFailure(
          transform,
          "a",
          `Expected (a string -> a number), actual "a"`
        )
      })
    })
  })
})
