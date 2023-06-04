import * as Data from "@effect/data/Data"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Data", () => {
  describe.concurrent("dataFromSelf", () => {
    it("property tests", () => {
      Util.roundtrip(C.dataFromSelf(S.struct({ a: S.string, b: S.number })))
      Util.roundtrip(C.dataFromSelf(C.array(S.number)))
    })

    it("decode / encode", async () => {
      const codec = C.dataFromSelf(S.struct({ a: S.string, b: S.number }))
      await Util.expectParseSuccess(
        codec,
        Data.struct({ a: "ok", b: 0 }),
        Data.struct({ a: "ok", b: 0 })
      )
      await Util.expectParseFailure(
        codec,
        { a: "ok", b: 0 },
        "Expected a Data, actual {\"a\":\"ok\",\"b\":0}"
      )
      await Util.expectParseFailure(
        codec,
        Data.struct({ a: "ok", b: "0" }),
        "/b Expected a number, actual \"0\""
      )
      await Util.expectEncodeSuccess(
        codec,
        Data.struct({ a: "ok", b: 0 }),
        Data.struct({ a: "ok", b: 0 })
      )
    })
  })

  describe.concurrent("data", () => {
    it("property tests", () => {
      Util.roundtrip(C.data(S.struct({ a: S.string, b: S.number })))
      Util.roundtrip(C.data(C.array(S.number)))
    })

    it("decode / encode", async () => {
      const codec = C.data(S.struct({ a: S.string, b: S.number }))
      await Util.expectParseSuccess(
        codec,
        { a: "ok", b: 0 },
        Data.struct({ a: "ok", b: 0 })
      )
      await Util.expectParseFailure(
        codec,
        { a: "ok", b: "0" },
        "/b Expected a number, actual \"0\""
      )
      await Util.expectEncodeSuccess(codec, Data.struct({ a: "ok", b: 0 }), { a: "ok", b: 0 })
    })
  })
})
