import * as Data from "@effect/data/Data"
import * as C from "@effect/schema/Codec"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Data", () => {
  describe.concurrent("Schema", () => {
    it("keyof", () => {
      const transform = S.keyof(S.data(S.struct({ a: S.string, b: S.string })))
      expect(transform).toEqual(S.union(S.literal("a"), S.literal("b")))
    })

    it("is", () => {
      const schema = S.data(S.struct({ a: S.string, b: S.number }))
      const is = S.is(schema)
      expect(is(Data.struct({ a: "ok", b: 0 }))).toEqual(true)
      expect(is({ a: "ok", b: 0 })).toEqual(false)
      expect(is(Data.struct({ a: "ok", b: "no" }))).toEqual(false)
    })

    it("pretty", () => {
      const schema = S.data(S.struct({ a: S.string, b: S.number }))
      const pretty = Pretty.build(schema)
      expect(pretty(Data.struct({ a: "ok", b: 0 }))).toEqual("Data({ \"a\": \"ok\", \"b\": 0 })")
    })
  })

  describe.concurrent("Transform", () => {
    describe.concurrent("dataFromSelf", () => {
      it("property tests", () => {
        Util.roundtrip(C.dataFromSelf(S.struct({ a: S.string, b: S.number })))
        Util.roundtrip(C.dataFromSelf(C.array(S.number)))
      })

      it("parse", async () => {
        const transform = C.dataFromSelf(S.struct({ a: S.string, b: S.number }))
        await Util.expectParseSuccess(
          transform,
          Data.struct({ a: "ok", b: 0 }),
          Data.struct({ a: "ok", b: 0 })
        )
        await Util.expectParseFailure(
          transform,
          { a: "ok", b: 0 },
          "Expected Data, actual {\"a\":\"ok\",\"b\":0}"
        )
        await Util.expectParseFailure(
          transform,
          Data.struct({ a: "ok", b: "0" }),
          "/b Expected number, actual \"0\""
        )
      })

      it("encode", async () => {
        const transform = C.dataFromSelf(S.struct({ a: S.string, b: S.number }))
        await Util.expectEncodeSuccess(
          transform,
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

      it("parse", async () => {
        const transform = C.data(S.struct({ a: S.string, b: S.number }))
        await Util.expectParseSuccess(
          transform,
          { a: "ok", b: 0 },
          Data.struct({ a: "ok", b: 0 })
        )
        await Util.expectParseFailure(
          transform,
          { a: "ok", b: "0" },
          "/b Expected number, actual \"0\""
        )
      })

      it("encode", async () => {
        const transform = C.data(S.struct({ a: S.string, b: S.number }))
        await Util.expectEncodeSuccess(transform, Data.struct({ a: "ok", b: 0 }), { a: "ok", b: 0 })
      })
    })
  })
})
