import * as C from "@effect/data/Chunk"
import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

const NumberFromString = S.numberFromString(S.string)

describe.concurrent("Chunk", () => {
  it("chunkGuard. keyof", () => {
    expect(S.keyof(S.chunkGuard(S.string))).toEqual(S.union(S.literal("_id"), S.literal("length")))
  })

  it("chunkGuard. property tests", () => {
    Util.property(S.chunkGuard(S.number))
  })

  it("chunkGuard. decoder", () => {
    const schema = S.chunkGuard(NumberFromString)
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

  it("chunkGuard. encoder", () => {
    const schema = S.chunkGuard(NumberFromString)
    Util.expectEncodingSuccess(schema, C.empty(), C.empty())
    Util.expectEncodingSuccess(schema, C.fromIterable([1, 2, 3]), C.fromIterable(["1", "2", "3"]))
  })

  it("chunkGuard. guard", () => {
    const schema = S.chunkGuard(S.string)
    const is = P.is(schema)
    expect(is(C.empty())).toEqual(true)
    expect(is(C.fromIterable(["a", "b", "c"]))).toEqual(true)

    expect(is(C.fromIterable(["a", "b", 1]))).toEqual(false)
    expect(is({ _id: Symbol.for("@effect/schema/test/FakeChunk") })).toEqual(false)
  })

  it("chunkGuard. pretty", () => {
    const schema = S.chunkGuard(S.string)
    const pretty = Pretty.pretty(schema)
    expect(pretty(C.empty())).toEqual("Chunk()")
    expect(pretty(C.fromIterable(["a", "b"]))).toEqual(
      "Chunk(\"a\", \"b\")"
    )
  })

  it("chunk. property tests", () => {
    Util.property(S.chunk(S.number))
  })

  it("chunk. decoder", () => {
    const schema = S.chunk(S.number)
    Util.expectDecodingSuccess(schema, [], C.empty())
    Util.expectDecodingSuccess(schema, [1, 2, 3], C.fromIterable([1, 2, 3]))

    Util.expectDecodingFailure(
      schema,
      null,
      `Expected tuple or array, actual null`
    )
    Util.expectDecodingFailure(schema, [1, "a"], `/1 Expected number, actual "a"`)
  })

  it("chunk. encoder", () => {
    const schema = S.chunk(S.number)
    Util.expectEncodingSuccess(schema, C.empty(), [])
    Util.expectEncodingSuccess(schema, C.fromIterable([1, 2, 3]), [1, 2, 3])
  })
})
