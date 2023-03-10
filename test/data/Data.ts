import * as Data from "@effect/data/Data"
import * as S from "@effect/schema"
import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Data", () => {
  it("dataGuard. keyof", () => {
    expect(S.keyof(S.dataGuard(S.struct({ a: S.string, b: S.string }))))
      .toEqual(S.union(S.literal("a"), S.literal("b")))

    expect(S.keyof(S.dataGuard(S.array(S.string))))
      .toEqual(S.never)
  })

  it("dataGuard. property tests", () => {
    Util.property(S.dataGuard(S.struct({ a: S.string, b: S.number })))
    Util.property(S.dataGuard(S.array(S.number)))
  })

  it("dataGuard. decoder", () => {
    const schema = S.dataGuard(S.struct({ a: S.string, b: S.number }))
    Util.expectDecodingSuccess(
      schema,
      Data.struct({ a: "ok", b: 0 }),
      Data.struct({ a: "ok", b: 0 })
    )
    Util.expectDecodingFailure(
      schema,
      { a: "ok", b: 0 },
      "Expected Data, actual {\"a\":\"ok\",\"b\":0}"
    )
    Util.expectDecodingFailure(
      schema,
      Data.struct({ a: "ok", b: "0" }),
      "/b Expected number, actual \"0\""
    )
  })

  it("dataGuard. encoder", () => {
    const schema = S.dataGuard(S.struct({ a: S.string, b: S.number }))
    Util.expectEncodingSuccess(
      schema,
      Data.struct({ a: "ok", b: 0 }),
      Data.struct({ a: "ok", b: 0 })
    )
  })

  it("dataGuard. guard", () => {
    const schema = S.dataGuard(S.struct({ a: S.string, b: S.number }))
    const is = P.is(schema)
    expect(is(Data.struct({ a: "ok", b: 0 }))).toEqual(true)
    expect(is({ a: "ok", b: 0 })).toEqual(false)
    expect(is(Data.struct({ a: "ok", b: "no" }))).toEqual(false)
  })

  it("dataGuard. pretty", () => {
    const schema = S.dataGuard(S.struct({ a: S.string, b: S.number }))
    const pretty = Pretty.pretty(schema)
    expect(pretty(Data.struct({ a: "ok", b: 0 }))).toEqual("Data({ \"a\": \"ok\", \"b\": 0 })")
  })

  it("data. property tests", () => {
    Util.property(S.data(S.struct({ a: S.string, b: S.number })))
    Util.property(S.data(S.array(S.number)))
  })

  it("data. decoder", () => {
    const schema = S.data(S.struct({ a: S.string, b: S.number }))
    Util.expectDecodingSuccess(
      schema,
      { a: "ok", b: 0 },
      Data.struct({ a: "ok", b: 0 })
    )
    Util.expectDecodingFailure(
      schema,
      { a: "ok", b: "0" },
      "/b Expected number, actual \"0\""
    )
  })

  it("data. encoder", () => {
    const schema = S.data(S.struct({ a: S.string, b: S.number }))
    Util.expectEncodingSuccess(schema, Data.struct({ a: "ok", b: 0 }), { a: "ok", b: 0 })
  })
})
