import * as Chunk from "@effect/data/Chunk"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Chunk", () => {
  describe.concurrent("chunkFromSelf", () => {
    it("property tests", () => {
      Util.roundtrip(C.chunkFromSelf(S.number))
    })

    it("decode / encode", async () => {
      const codec = C.chunkFromSelf(C.NumberFromString)
      await Util.expectParseSuccess(codec, Chunk.empty(), Chunk.empty())
      await Util.expectParseSuccess(
        codec,
        Chunk.fromIterable(["1", "2", "3"]),
        Chunk.fromIterable([1, 2, 3])
      )

      await Util.expectParseFailure(
        codec,
        null,
        `Expected a Chunk, actual null`
      )
      await Util.expectParseFailure(
        codec,
        Chunk.fromIterable(["1", "a", "3"]),
        `/1 Expected (a string -> a number), actual "a"`
      )
      await Util.expectEncodeSuccess(codec, Chunk.empty(), Chunk.empty())
      await Util.expectEncodeSuccess(
        codec,
        Chunk.fromIterable([1, 2, 3]),
        Chunk.fromIterable(["1", "2", "3"])
      )
    })
  })

  describe.concurrent("chunk", () => {
    it("property tests", () => {
      Util.roundtrip(C.chunk(S.number))
    })

    it("decode / encode", async () => {
      const toJSON = <A>(chunk: Chunk.Chunk<A>): unknown => JSON.parse(JSON.stringify(chunk))

      const codec = C.chunk(C.NumberFromString)
      await Util.expectParseSuccess(codec, toJSON(Chunk.empty()), Chunk.empty())
      await Util.expectParseSuccess(
        codec,
        toJSON(Chunk.fromIterable(["1", "2", "3"])),
        Chunk.fromIterable([1, 2, 3])
      )

      await Util.expectParseFailure(
        codec,
        null,
        `Expected a generic object, actual null`
      )
      await Util.expectParseFailure(
        codec,
        toJSON(Chunk.fromIterable(["1", 1])),
        `/values /1 Expected a string, actual 1`
      )
      await Util.expectEncodeSuccess(codec, Chunk.empty(), toJSON(Chunk.empty()))
      await Util.expectEncodeSuccess(
        codec,
        Chunk.fromIterable([1, 2, 3]),
        toJSON(Chunk.fromIterable(["1", "2", "3"]))
      )
    })
  })
})
