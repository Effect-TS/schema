import * as Chunk from "@effect/data/Chunk"
import * as C from "@effect/schema/Codec"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Chunk", () => {
  describe.concurrent("Schema", () => {
    it("keyof", () => {
      expect(S.keyof(S.chunk(S.string))).toEqual(
        S.union(S.literal("_id"), S.literal("length"))
      )
    })

    it("is", () => {
      const schema = S.chunk(S.string)
      const is = S.is(schema)
      expect(is(Chunk.empty())).toEqual(true)
      expect(is(Chunk.fromIterable(["a", "b", "c"]))).toEqual(true)

      expect(is(Chunk.fromIterable(["a", "b", 1]))).toEqual(false)
      expect(is({ _id: Symbol.for("@effect/schema/test/FakeChunk") })).toEqual(false)
    })

    it("pretty", () => {
      const schema = S.chunk(S.string)
      const pretty = Pretty.build(schema)
      expect(pretty(Chunk.empty())).toEqual("Chunk()")
      expect(pretty(Chunk.fromIterable(["a", "b"]))).toEqual(
        "Chunk(\"a\", \"b\")"
      )
    })
  })

  describe.concurrent("Transform", () => {
    describe.concurrent("chunkFromSelf", () => {
      it("property tests", () => {
        Util.roundtrip(C.chunkFromSelf(S.number))
      })

      it("parse", async () => {
        const transform = C.chunkFromSelf(C.NumberFromString)
        await Util.expectParseSuccess(transform, Chunk.empty(), Chunk.empty())
        await Util.expectParseSuccess(
          transform,
          Chunk.fromIterable(["1", "2", "3"]),
          Chunk.fromIterable([1, 2, 3])
        )

        await Util.expectParseFailure(
          transform,
          null,
          `Expected Chunk, actual null`
        )
        await Util.expectParseFailure(
          transform,
          Chunk.fromIterable(["1", "a", "3"]),
          `/1 Expected string -> number, actual "a"`
        )
      })

      it("encode", async () => {
        const transform = C.chunkFromSelf(C.NumberFromString)
        await Util.expectEncodeSuccess(transform, Chunk.empty(), Chunk.empty())
        await Util.expectEncodeSuccess(
          transform,
          Chunk.fromIterable([1, 2, 3]),
          Chunk.fromIterable(["1", "2", "3"])
        )
      })
    })

    describe.concurrent("chunk", () => {
      it("property tests", () => {
        Util.roundtrip(C.chunk(S.number))
      })

      it("parse", async () => {
        const transform = C.chunk(C.NumberFromString)
        await Util.expectParseSuccess(transform, [], Chunk.empty())
        await Util.expectParseSuccess(transform, ["1", "2", "3"], Chunk.fromIterable([1, 2, 3]))

        await Util.expectParseFailure(
          transform,
          null,
          `Expected a generic array, actual null`
        )
        await Util.expectParseFailure(transform, ["1", 1], `/1 Expected string, actual 1`)
      })

      it("encode", async () => {
        const transform = C.chunk(C.NumberFromString)
        await Util.expectEncodeSuccess(transform, Chunk.empty(), [])
        await Util.expectEncodeSuccess(transform, Chunk.fromIterable([1, 2, 3]), ["1", "2", "3"])
      })
    })
  })
})
