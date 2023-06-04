import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("ReadonlySet", () => {
  describe.concurrent("readonlySetFromSelf", () => {
    it("property tests", () => {
      Util.roundtrip(C.readonlySetFromSelf(S.number))
    })

    it("decode / encode", async () => {
      const codec = C.readonlySetFromSelf(C.NumberFromString)
      await Util.expectParseSuccess(codec, new Set(), new Set())
      await Util.expectParseSuccess(codec, new Set(["1", "2", "3"]), new Set([1, 2, 3]))

      await Util.expectParseFailure(
        codec,
        null,
        `Expected a ReadonlySet, actual null`
      )
      await Util.expectParseFailure(
        codec,
        new Set(["1", "a", "3"]),
        `/1 Expected (a string -> a number), actual "a"`
      )
      await Util.expectEncodeSuccess(codec, new Set(), new Set())
      await Util.expectEncodeSuccess(codec, new Set([1, 2, 3]), new Set(["1", "2", "3"]))
    })
  })

  describe.concurrent("readonlySet", () => {
    it("property tests", () => {
      Util.roundtrip(C.readonlySet(S.number))
    })

    it("decode / encode", async () => {
      const codec = C.readonlySet(S.number)
      await Util.expectParseSuccess(codec, [], new Set([]))
      await Util.expectParseSuccess(codec, [1, 2, 3], new Set([1, 2, 3]))

      await Util.expectParseFailure(
        codec,
        null,
        `Expected a generic array, actual null`
      )
      await Util.expectParseFailure(codec, [1, "a"], `/1 Expected a number, actual "a"`)
      await Util.expectEncodeSuccess(codec, new Set(), [])
      await Util.expectEncodeSuccess(codec, new Set([1, 2, 3]), [1, 2, 3])
    })
  })
})
