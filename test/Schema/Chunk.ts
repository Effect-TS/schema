import * as Chunk from "@effect/data/Chunk"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Chunk", () => {
  it("keyof", () => {
    expect(S.keyof(S.chunk(S.string))).toEqual(
      S.union(S.literal("_id"), S.literal("length"))
    )
  })

  it("decode / encode", async () => {
    const schema = S.chunk(S.string)

    await Util.expectParseSuccess(schema, Chunk.empty())
    await Util.expectParseSuccess(schema, Chunk.fromIterable(["a", "b", "c"]))

    await Util.expectParseFailure(
      schema,
      Chunk.fromIterable(["a", "b", 1]),
      "/2 Expected a string, actual 1"
    )
    await Util.expectParseFailure(
      schema,
      { _id: Symbol.for("@effect/schema/test/FakeChunk") },
      "Expected a Chunk, actual {}"
    )
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
