import * as Data from "@effect/data/Data"
import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("Data", () => {
  it("dataFromSelf. keyof", () => {
    const schema1 = T.keyof(T.dataFromSelf(T.struct({ a: T.string, b: T.string })))
    expect(schema1).toEqual(T.union(T.literal("a"), T.literal("b")))
  })

  it("dataFromSelf. property tests", () => {
    Util.roundtrip(T.dataFromSelf(T.struct({ a: T.string, b: T.number })))
    Util.roundtrip(T.dataFromSelf(T.array(T.number)))
  })

  it("dataFromSelf. decoder", async () => {
    const schema = T.dataFromSelf(T.struct({ a: T.string, b: T.number }))
    await Util.expectParseSuccess(
      schema,
      Data.struct({ a: "ok", b: 0 }),
      Data.struct({ a: "ok", b: 0 })
    )
    await Util.expectParseFailure(
      schema,
      { a: "ok", b: 0 },
      "Expected Data, actual {\"a\":\"ok\",\"b\":0}"
    )
    await Util.expectParseFailure(
      schema,
      Data.struct({ a: "ok", b: "0" }),
      "/b Expected number, actual \"0\""
    )
  })

  it("dataFromSelf. encoder", async () => {
    const schema = T.dataFromSelf(T.struct({ a: T.string, b: T.number }))
    await Util.expectEncodeSuccess(
      schema,
      Data.struct({ a: "ok", b: 0 }),
      Data.struct({ a: "ok", b: 0 })
    )
  })

  it("dataFromSelf. guard", () => {
    const schema = T.dataFromSelf(T.struct({ a: T.string, b: T.number }))
    const is = P.is(schema)
    expect(is(Data.struct({ a: "ok", b: 0 }))).toEqual(true)
    expect(is({ a: "ok", b: 0 })).toEqual(false)
    expect(is(Data.struct({ a: "ok", b: "no" }))).toEqual(false)
  })

  it("dataFromSelf. pretty", () => {
    const schema = T.dataFromSelf(T.struct({ a: T.string, b: T.number }))
    const pretty = Pretty.to(schema)
    expect(pretty(Data.struct({ a: "ok", b: 0 }))).toEqual("Data({ \"a\": \"ok\", \"b\": 0 })")
  })

  it("data. property tests", () => {
    Util.roundtrip(T.data(T.struct({ a: T.string, b: T.number })))
    Util.roundtrip(T.data(T.array(T.number)))
  })

  it("data. decoder", async () => {
    const schema = T.data(T.struct({ a: T.string, b: T.number }))
    await Util.expectParseSuccess(
      schema,
      { a: "ok", b: 0 },
      Data.struct({ a: "ok", b: 0 })
    )
    await Util.expectParseFailure(
      schema,
      { a: "ok", b: "0" },
      "/b Expected number, actual \"0\""
    )
  })

  it("data. encoder", async () => {
    const schema = T.data(T.struct({ a: T.string, b: T.number }))
    await Util.expectEncodeSuccess(schema, Data.struct({ a: "ok", b: 0 }), { a: "ok", b: 0 })
  })
})
