import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("ReadonlyMap", () => {
  describe.concurrent("readonlyMapFromSelf", () => {
    it("property tests", () => {
      Util.roundtrip(C.readonlyMapFromSelf(S.number, S.string))
    })

    it("decode / encode", async () => {
      const codec = C.readonlyMapFromSelf(C.NumberFromString, S.string)
      await Util.expectParseSuccess(codec, new Map(), new Map())
      await Util.expectParseSuccess(
        codec,
        new Map([["1", "a"], ["2", "b"], ["3", "c"]]),
        new Map([[1, "a"], [2, "b"], [3, "c"]])
      )

      await Util.expectParseFailure(
        codec,
        null,
        `Expected a ReadonlyMap, actual null`
      )
      await Util.expectParseFailure(
        codec,
        new Map([["1", "a"], ["a", "b"]]),
        `/1 /0 Expected (a string -> a number), actual "a"`
      )
      await Util.expectEncodeSuccess(codec, new Map(), new Map())
      await Util.expectEncodeSuccess(
        codec,
        new Map([[1, "a"], [2, "b"], [3, "c"]]),
        new Map([["1", "a"], ["2", "b"], ["3", "c"]])
      )
    })
  })

  describe.concurrent("readonlyMap", () => {
    it("property tests", () => {
      Util.roundtrip(C.readonlyMap(S.number, S.string))
    })

    it("decode / encode", async () => {
      const codec = C.readonlyMap(S.number, S.string)
      await Util.expectParseSuccess(codec, [], new Map())
      await Util.expectParseSuccess(
        codec,
        [[1, "a"], [2, "b"], [3, "c"]],
        new Map([[1, "a"], [2, "b"], [3, "c"]])
      )

      await Util.expectParseFailure(
        codec,
        null,
        `Expected a generic array, actual null`
      )
      await Util.expectParseFailure(
        codec,
        [[1, "a"], [2, 1]],
        `/1 /1 Expected a string, actual 1`
      )
      await Util.expectEncodeSuccess(codec, new Map(), [])
      await Util.expectEncodeSuccess(codec, new Map([[1, "a"], [2, "b"], [3, "c"]]), [[
        1,
        "a"
      ], [
        2,
        "b"
      ], [3, "c"]])
    })
  })
})
