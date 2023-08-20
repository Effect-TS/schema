import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("parseJson", () => {
  it("decoding", async () => {
    const codec = C.ParseJson
    await Util.expectParseSuccess(codec, "{}", {})
    await Util.expectParseSuccess(codec, `{"a":"b"}`, { "a": "b" })

    await Util.expectParseFailure(
      codec,
      "",
      `Unexpected end of JSON input`
    )
    await Util.expectParseFailure(
      codec,
      "a",
      `Unexpected token a in JSON at position 0`
    )
    await Util.expectParseFailure(
      codec,
      "{",
      `Unexpected end of JSON input`
    )
  })

  it("encoding", async () => {
    const codec = C.ParseJson
    await Util.expectEncodeSuccess(codec, "a", `"a"`)
    await Util.expectEncodeSuccess(codec, { a: "b" }, `{"a":"b"}`)

    const bad: any = { a: 0 }
    bad["a"] = bad
    await Util.expectEncodeFailure(
      codec,
      bad,
      `Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    --- property 'a' closes the circle`
    )
  })

  it("compose", async () => {
    const schema = C.ParseJson.pipe(C.compose(S.struct({ a: S.number })))
    await Util.expectParseSuccess(schema, `{"a":1}`, { a: 1 })
    await Util.expectParseFailure(schema, `{"a"}`, `Unexpected token } in JSON at position 4`)
    await Util.expectParseFailure(schema, `{"a":"b"}`, `/a Expected a number, actual "b"`)
    await Util.expectEncodeSuccess(schema, { a: 1 }, `{"a":1}`)
  })
})
