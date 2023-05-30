import * as C from "@effect/schema/Codec"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Schema.Date", () => {
  const schema = S.Date

  it("keyof", () => {
    expect(S.keyof(schema)).toEqual(S.never)
  })

  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("pretty", () => {
    const pretty = Pretty.build(schema)
    expect(pretty(new Date(0))).toEqual("new Date(\"1970-01-01T00:00:00.000Z\")")
  })
})

describe.concurrent("Transform.Date", () => {
  const schema = C.Date

  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("decode", async () => {
    await Util.expectParseSuccess(
      schema,
      "1970-01-01T00:00:00.000Z",
      new Date(0)
    )
    await Util.expectParseFailure(
      schema,
      "a",
      `Expected a valid Date, actual Invalid Date`
    )
  })

  it("encode", async () => {
    await Util.expectEncodeSuccess(schema, new Date(0), "1970-01-01T00:00:00.000Z")
    await Util.expectEncodeFailure(
      schema,
      new Date("fail"),
      "Expected a valid Date, actual Invalid Date"
    )
  })
})
