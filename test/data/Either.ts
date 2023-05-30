import * as E from "@effect/data/Either"
import * as C from "@effect/schema/Codec"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Either", () => {
  describe.concurrent("Schema", () => {
    it("is", () => {
      const schema = S.either(S.string, S.number)
      const is = S.is(schema)
      expect(is(E.left("a"))).toEqual(true)
      expect(is(E.right(1))).toEqual(true)
      expect(is(null)).toEqual(false)
      expect(is(E.right("a"))).toEqual(false)
      expect(is(E.left(1))).toEqual(false)

      expect(is({ _tag: "Right", right: 1 })).toEqual(false)
      expect(is({ _tag: "Left", left: "a" })).toEqual(false)
    })

    it("pretty", () => {
      const schema = S.either(S.string, S.number)
      const pretty = Pretty.build(schema)
      expect(pretty(E.left("a"))).toEqual(`left("a")`)
      expect(pretty(E.right(1))).toEqual("right(1)")
    })
  })

  describe.concurrent("Transform", () => {
    describe.concurrent("eitherFromSelf", () => {
      it("property tests", () => {
        Util.roundtrip(C.eitherFromSelf(S.string, S.number))
      })

      it("parse", async () => {
        const transform = C.eitherFromSelf(S.string, C.NumberFromString)
        await Util.expectParseSuccess(transform, E.left("a"), E.left("a"))
        await Util.expectParseSuccess(transform, E.right("1"), E.right(1))
      })
    })

    describe.concurrent("either", () => {
      it("property tests", () => {
        Util.roundtrip(C.either(S.string, S.number))
      })

      it("parse", async () => {
        const transform = C.either(S.string, C.NumberFromString)
        await Util.expectParseSuccess(
          transform,
          JSON.parse(JSON.stringify(E.left("a"))),
          E.left("a")
        )
        await Util.expectParseSuccess(
          transform,
          JSON.parse(JSON.stringify(E.right("1"))),
          E.right(1)
        )
      })

      it("encode", async () => {
        const transform = C.either(S.string, C.NumberFromString)
        await Util.expectEncodeSuccess(transform, E.left("a"), { _tag: "Left", left: "a" })
        await Util.expectEncodeSuccess(transform, E.right(1), { _tag: "Right", right: "1" })
      })
    })
  })
})
