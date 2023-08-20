import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("compose", async () => {
  it("B = C", async () => {
    const schema1 = C.compose(C.split(S.string, ","), C.array(C.NumberFromString))
    await Util.expectParseSuccess(schema1, "1,2,3", [1, 2, 3])
    const schema2 = C.split(S.string, ",").pipe(C.compose(C.array(C.NumberFromString)))
    await Util.expectParseSuccess(schema2, "1,2,3", [1, 2, 3])
  })

  it("force decoding: (A U B) compose (B -> C)", async () => {
    const schema1 = C.compose(C.union(S.null, S.string), C.NumberFromString)
    await Util.expectParseSuccess(schema1, "1", 1)
    await Util.expectParseFailure(schema1, "a", `Expected (a string -> a number), actual "a"`)
    await Util.expectParseFailure(schema1, null, "Expected a string, actual null")
    const schema2 = C.union(S.null, S.string).pipe(
      C.compose(C.NumberFromString)
    )
    await Util.expectParseSuccess(schema2, "1", 1)
    await Util.expectParseFailure(schema2, "a", `Expected (a string -> a number), actual "a"`)
    await Util.expectParseFailure(schema2, null, "Expected a string, actual null")
  })

  it("force encoding: (A -> B) compose (C U B)", async () => {
    const schema1 = C.compose(C.NumberFromString, C.union(S.null, S.number))
    await Util.expectEncodeSuccess(schema1, 1, "1")
    await Util.expectEncodeFailure(schema1, null, "Expected a number, actual null")
    const schema2 = C.NumberFromString.pipe(
      C.compose(C.union(S.null, S.number))
    )
    await Util.expectEncodeSuccess(schema2, 1, "1")
    await Util.expectEncodeFailure(schema2, null, "Expected a number, actual null")
  })
})
