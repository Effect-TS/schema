import * as C from "@effect/schema/Codec"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("ReadonlySet", () => {
  describe.concurrent("Schema", () => {
    it("keyof", () => {
      expect(S.keyof(S.readonlySet(S.number))).toEqual(S.literal("size"))
    })

    it("is", () => {
      const schema = S.readonlySet(S.string)
      const is = S.is(schema)
      expect(is(new Set())).toEqual(true)
      expect(is(new Set(["a", "b", "c"]))).toEqual(true)

      expect(is(new Set(["a", "b", 1]))).toEqual(false)
      expect(is(null)).toEqual(false)
      expect(is(undefined)).toEqual(false)
    })

    it("pretty", () => {
      const schema = S.readonlySet(S.string)
      const pretty = Pretty.build(schema)
      expect(pretty(new Set())).toEqual("new Set([])")
      expect(pretty(new Set(["a", "b"]))).toEqual(
        `new Set(["a", "b"])`
      )
    })
  })

  describe.concurrent("Transform", () => {
    describe.concurrent("readonlySetFromSelf", () => {
      it("property tests", () => {
        Util.roundtrip(C.readonlySetFromSelf(S.number))
      })

      it("parse", async () => {
        const transform = C.readonlySetFromSelf(C.NumberFromString)
        await Util.expectParseSuccess(transform, new Set(), new Set())
        await Util.expectParseSuccess(transform, new Set(["1", "2", "3"]), new Set([1, 2, 3]))

        await Util.expectParseFailure(
          transform,
          null,
          `Expected ReadonlySet, actual null`
        )
        await Util.expectParseFailure(
          transform,
          new Set(["1", "a", "3"]),
          `/1 Expected (a string -> a number), actual "a"`
        )
      })

      it("encode", async () => {
        const transform = C.readonlySetFromSelf(C.NumberFromString)
        await Util.expectEncodeSuccess(transform, new Set(), new Set())
        await Util.expectEncodeSuccess(transform, new Set([1, 2, 3]), new Set(["1", "2", "3"]))
      })
    })

    describe.concurrent("readonlySet", () => {
      it("property tests", () => {
        Util.roundtrip(C.readonlySet(S.number))
      })

      it("parse", async () => {
        const transform = C.readonlySet(S.number)
        await Util.expectParseSuccess(transform, [], new Set([]))
        await Util.expectParseSuccess(transform, [1, 2, 3], new Set([1, 2, 3]))

        await Util.expectParseFailure(
          transform,
          null,
          `Expected a generic array, actual null`
        )
        await Util.expectParseFailure(transform, [1, "a"], `/1 Expected a number, actual "a"`)
      })

      it("encode", async () => {
        const transform = C.readonlySet(S.number)
        await Util.expectEncodeSuccess(transform, new Set(), [])
        await Util.expectEncodeSuccess(transform, new Set([1, 2, 3]), [1, 2, 3])
      })
    })
  })
})
