import * as C from "@effect/data/Chunk"
import * as S from "@effect/schema"
import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as Util from "@effect/schema/test/util"

const NumberFromString = S.numberFromString(S.string)

describe.concurrent("Chunk", () => {
  it("chunk. keyof", () => {
    expect(S.keyof(S.chunk(S.string))).toEqual(S.union(S.literal("_id"), S.literal("length")))
  })

  it("chunk. property tests", () => {
    Util.property(S.chunk(S.number))
  })

  it("chunk. decoder", () => {
    const schema = S.chunk(NumberFromString)
    Util.expectDecodingSuccess(schema, C.empty(), C.empty())
    Util.expectDecodingSuccess(schema, C.fromIterable(["1", "2", "3"]), C.fromIterable([1, 2, 3]))

    Util.expectDecodingFailure(
      schema,
      null,
      `Expected Chunk, actual null`
    )
    Util.expectDecodingFailure(
      schema,
      C.fromIterable(["1", "a", "3"]),
      `/1 Expected a parsable value from string to number, actual "a"`
    )
  })

  it("chunk. encoder", () => {
    const schema = S.chunk(NumberFromString)
    Util.expectEncodingSuccess(schema, C.empty(), C.empty())
    Util.expectEncodingSuccess(schema, C.fromIterable([1, 2, 3]), C.fromIterable(["1", "2", "3"]))
  })

  it("chunk. guard", () => {
    const schema = S.chunk(S.string)
    const is = P.is(schema)
    expect(is(C.empty())).toEqual(true)
    expect(is(C.fromIterable(["a", "b", "c"]))).toEqual(true)

    expect(is(C.fromIterable(["a", "b", 1]))).toEqual(false)
    expect(is({ _id: Symbol.for("@effect/schema/test/FakeChunk") })).toEqual(false)
  })

  it("chunk. pretty", () => {
    const schema = S.chunk(S.string)
    const pretty = Pretty.pretty(schema)
    expect(pretty(C.empty())).toEqual("Chunk()")
    expect(pretty(C.fromIterable(["a", "b"]))).toEqual(
      "Chunk(\"a\", \"b\")"
    )
  })

  it("chunkFromValues. property tests", () => {
    Util.property(S.chunkFromValues(S.number))
  })

  it("chunkFromValues. decoder", () => {
    const schema = S.chunkFromValues(S.number)
    Util.expectDecodingSuccess(schema, [], C.empty())
    Util.expectDecodingSuccess(schema, [1, 2, 3], C.fromIterable([1, 2, 3]))

    Util.expectDecodingFailure(
      schema,
      null,
      `Expected tuple or array, actual null`
    )
    Util.expectDecodingFailure(schema, [1, "a"], `/1 Expected number, actual "a"`)
  })

  it("chunkFromValues. encoder", () => {
    const schema = S.chunkFromValues(S.number)
    Util.expectEncodingSuccess(schema, C.empty(), [])
    Util.expectEncodingSuccess(schema, C.fromIterable([1, 2, 3]), [1, 2, 3])
  })
})
