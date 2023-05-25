import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("Schema.Date", () => {
  const schema = S.Date

  it("keyof", () => {
    expect(T.keyof(schema)).toEqual(T.never)
  })

  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("Pretty", () => {
    const pretty = Pretty.build(schema)
    expect(pretty(new Date(0))).toEqual("new Date(\"1970-01-01T00:00:00.000Z\")")
  })
})

describe.concurrent("Transform.Date", () => {
  const schema = T.Date

  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("Decoder", async () => {
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

  it("Encoder", async () => {
    await Util.expectEncodeSuccess(schema, new Date(0), "1970-01-01T00:00:00.000Z")
    await Util.expectEncodeFailure(
      schema,
      new Date("fail"),
      "Expected a valid Date, actual Invalid Date"
    )
  })
})
