import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("ReadonlyMap", () => {
  describe.concurrent("Schema", () => {
    it("is", () => {
      const schema = S.readonlyMap(S.number, S.string)
      const is = P.is(schema)
      expect(is(new Map())).toEqual(true)
      expect(is(new Map([[1, "a"], [2, "b"], [3, "c"]]))).toEqual(true)

      expect(is(null)).toEqual(false)
      expect(is(undefined)).toEqual(false)
      expect(is(new Map<number, string | number>([[1, "a"], [2, 1]]))).toEqual(false)
      expect(is(new Map<number, string | number>([[1, 1], [2, "b"]]))).toEqual(false)
      expect(is(new Map([[1, 1], [2, 2]]))).toEqual(false)
      expect(is(new Map<string | number, number>([["a", 1], ["b", 2], [3, 1]]))).toEqual(false)
      expect(is(new Map<number, string | number>([[1, "a"], [2, "b"], [3, 1]]))).toEqual(false)
    })

    it("pretty", () => {
      const schema = S.readonlyMap(S.number, S.string)
      const pretty = Pretty.build(schema)
      expect(pretty(new Map())).toEqual("new Map([])")
      expect(pretty(new Map([[1, "a"], [2, "b"]]))).toEqual(
        `new Map([[1, "a"], [2, "b"]])`
      )
    })
  })

  describe.concurrent("Transform", () => {
    describe.concurrent("readonlyMapFromSelf", () => {
      it("keyof", () => {
        expect(T.keyof(T.readonlyMapFromSelf(S.number, S.string))).toEqual(S.literal("size"))
      })

      it("property tests", () => {
        Util.roundtrip(T.readonlyMapFromSelf(S.number, S.string))
      })

      it("parse", async () => {
        const transform = T.readonlyMapFromSelf(T.NumberFromString, S.string)
        await Util.expectParseSuccess(transform, new Map(), new Map())
        await Util.expectParseSuccess(
          transform,
          new Map([["1", "a"], ["2", "b"], ["3", "c"]]),
          new Map([[1, "a"], [2, "b"], [3, "c"]])
        )

        await Util.expectParseFailure(
          transform,
          null,
          `Expected ReadonlyMap, actual null`
        )
        await Util.expectParseFailure(
          transform,
          new Map([["1", "a"], ["a", "b"]]),
          `/1 /0 Expected string -> number, actual "a"`
        )
      })

      it("encode", async () => {
        const transform = T.readonlyMapFromSelf(T.NumberFromString, S.string)
        await Util.expectEncodeSuccess(transform, new Map(), new Map())
        await Util.expectEncodeSuccess(
          transform,
          new Map([[1, "a"], [2, "b"], [3, "c"]]),
          new Map([["1", "a"], ["2", "b"], ["3", "c"]])
        )
      })
    })

    describe.concurrent("readonlyMap", () => {
      it("property tests", () => {
        Util.roundtrip(T.readonlyMap(S.number, S.string))
      })

      it("parse", async () => {
        const transform = T.readonlyMap(S.number, S.string)
        await Util.expectParseSuccess(transform, [], new Map())
        await Util.expectParseSuccess(
          transform,
          [[1, "a"], [2, "b"], [3, "c"]],
          new Map([[1, "a"], [2, "b"], [3, "c"]])
        )

        await Util.expectParseFailure(
          transform,
          null,
          `Expected a generic array, actual null`
        )
        await Util.expectParseFailure(
          transform,
          [[1, "a"], [2, 1]],
          `/1 /1 Expected string, actual 1`
        )
      })

      it("encode", async () => {
        const transform = T.readonlyMap(S.number, S.string)
        await Util.expectEncodeSuccess(transform, new Map(), [])
        await Util.expectEncodeSuccess(transform, new Map([[1, "a"], [2, "b"], [3, "c"]]), [[
          1,
          "a"
        ], [
          2,
          "b"
        ], [3, "c"]])
      })
    })
  })
})
