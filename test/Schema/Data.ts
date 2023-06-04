import * as Data from "@effect/data/Data"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Data", () => {
  it("keyof", () => {
    const transform = S.keyof(S.data(S.struct({ a: S.string, b: S.string })))
    expect(transform).toEqual(S.union(S.literal("a"), S.literal("b")))
  })

  it("decode / encode", async () => {
    const schema = S.data(S.struct({ a: S.string, b: S.number }))

    await Util.expectParseSuccess(schema, Data.struct({ a: "ok", b: 0 }))

    await Util.expectParseFailure(
      schema,
      { a: "ok", b: 0 },
      `Expected a Data, actual {"a":"ok","b":0}`
    )
    await Util.expectParseFailure(
      schema,
      Data.struct({ a: "ok", b: "no" }),
      `/b Expected a number, actual "no"`
    )
  })

  it("pretty", () => {
    const schema = S.data(S.struct({ a: S.string, b: S.number }))
    const pretty = Pretty.build(schema)
    expect(pretty(Data.struct({ a: "ok", b: 0 }))).toEqual("Data({ \"a\": \"ok\", \"b\": 0 })")
  })
})
