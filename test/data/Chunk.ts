import * as C from "@effect/data/Chunk"
import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("Chunk", () => {
  describe.concurrent("Schema", () => {
    it("is", () => {
      const schema = S.chunk(S.string)
      const is = P.is(schema)
      expect(is(C.empty())).toEqual(true)
      expect(is(C.fromIterable(["a", "b", "c"]))).toEqual(true)

      expect(is(C.fromIterable(["a", "b", 1]))).toEqual(false)
      expect(is({ _id: Symbol.for("@effect/schema/test/FakeChunk") })).toEqual(false)
    })

    it("pretty", () => {
      const schema = S.chunk(S.string)
      const pretty = Pretty.build(schema)
      expect(pretty(C.empty())).toEqual("Chunk()")
      expect(pretty(C.fromIterable(["a", "b"]))).toEqual(
        "Chunk(\"a\", \"b\")"
      )
    })
  })

  describe.concurrent("Transform", () => {
    describe.concurrent("chunkFromSelf", () => {
      it("keyof", () => {
        expect(T.keyof(T.chunkFromSelf(S.string))).toEqual(
          S.union(S.literal("_id"), S.literal("length"))
        )
      })

      it("property tests", () => {
        Util.roundtrip(T.chunkFromSelf(S.number))
      })

      it("parse", async () => {
        const transform = T.chunkFromSelf(T.NumberFromString)
        await Util.expectParseSuccess(transform, C.empty(), C.empty())
        await Util.expectParseSuccess(
          transform,
          C.fromIterable(["1", "2", "3"]),
          C.fromIterable([1, 2, 3])
        )

        await Util.expectParseFailure(
          transform,
          null,
          `Expected Chunk, actual null`
        )
        await Util.expectParseFailure(
          transform,
          C.fromIterable(["1", "a", "3"]),
          `/1 Expected string -> number, actual "a"`
        )
      })

      it("encode", async () => {
        const transform = T.chunkFromSelf(T.NumberFromString)
        await Util.expectEncodeSuccess(transform, C.empty(), C.empty())
        await Util.expectEncodeSuccess(
          transform,
          C.fromIterable([1, 2, 3]),
          C.fromIterable(["1", "2", "3"])
        )
      })
    })

    describe.concurrent("chunk", () => {
      it("property tests", () => {
        Util.roundtrip(T.chunk(S.number))
      })

      it("parse", async () => {
        const transform = T.chunk(T.NumberFromString)
        await Util.expectParseSuccess(transform, [], C.empty())
        await Util.expectParseSuccess(transform, ["1", "2", "3"], C.fromIterable([1, 2, 3]))

        await Util.expectParseFailure(
          transform,
          null,
          `Expected a generic array, actual null`
        )
        await Util.expectParseFailure(transform, ["1", 1], `/1 Expected string, actual 1`)
      })

      it("encoder", async () => {
        const transform = T.chunk(T.NumberFromString)
        await Util.expectEncodeSuccess(transform, C.empty(), [])
        await Util.expectEncodeSuccess(transform, C.fromIterable([1, 2, 3]), ["1", "2", "3"])
      })
    })
  })
})
