import * as Data from "@effect/data/Data"
import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("Data", () => {
  describe.concurrent("Schema", () => {
    it("is", () => {
      const schema = S.data(S.struct({ a: S.string, b: S.number }))
      const is = P.is(schema)
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
      it("keyof", () => {
        const transform = T.keyof(T.dataFromSelf(S.struct({ a: S.string, b: S.string })))
        expect(transform).toEqual(T.union(T.literal("a"), T.literal("b")))
      })

      it("property tests", () => {
        Util.roundtrip(T.dataFromSelf(S.struct({ a: S.string, b: S.number })))
        Util.roundtrip(T.dataFromSelf(T.array(S.number)))
      })

      it("parse", async () => {
        const transform = T.dataFromSelf(S.struct({ a: S.string, b: S.number }))
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
        const transform = T.dataFromSelf(S.struct({ a: S.string, b: S.number }))
        await Util.expectEncodeSuccess(
          transform,
          Data.struct({ a: "ok", b: 0 }),
          Data.struct({ a: "ok", b: 0 })
        )
      })
    })

    describe.concurrent("data", () => {
      it("property tests", () => {
        Util.roundtrip(T.data(S.struct({ a: S.string, b: S.number })))
        Util.roundtrip(T.data(T.array(S.number)))
      })

      it("parse", async () => {
        const transform = T.data(S.struct({ a: S.string, b: S.number }))
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
        const transform = T.data(S.struct({ a: S.string, b: S.number }))
        await Util.expectEncodeSuccess(transform, Data.struct({ a: "ok", b: 0 }), { a: "ok", b: 0 })
      })
    })
  })
})
