import * as O from "@effect/data/Option"
import * as C from "@effect/schema/Codec"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Option", () => {
  describe.concurrent("Schema", () => {
    it("is", () => {
      const schema = S.option(S.number)
      const is = S.is(schema)
      expect(is(O.none())).toEqual(true)
      expect(is(O.some(1))).toEqual(true)
      expect(is(null)).toEqual(false)
      expect(is(O.some("a"))).toEqual(false)

      expect(is({ _tag: "None" })).toEqual(false)
      expect(is({ _tag: "Some", value: 1 })).toEqual(false)
    })

    it("pretty", () => {
      const schema = S.option(S.number)
      const pretty = Pretty.build(schema)
      expect(pretty(O.none())).toEqual("none()")
      expect(pretty(O.some(1))).toEqual("some(1)")
    })
  })

  describe.concurrent("Transform", () => {
    describe.concurrent("optionFromSelf", () => {
      it("property tests", () => {
        Util.roundtrip(C.optionFromSelf(C.NumberFromString))
      })

      it("parse", async () => {
        const schema = C.optionFromSelf(C.NumberFromString)
        await Util.expectParseSuccess(schema, O.none(), O.none())
        await Util.expectParseSuccess(schema, O.some("1"), O.some(1))
      })
    })

    describe.concurrent("option", () => {
      it("property tests", () => {
        Util.roundtrip(C.option(S.number))
      })

      it("parse", async () => {
        const schema = C.option(C.NumberFromString)
        await Util.expectParseSuccess(schema, JSON.parse(JSON.stringify(O.none())), O.none())
        await Util.expectParseSuccess(schema, JSON.parse(JSON.stringify(O.some("1"))), O.some(1))
      })

      it("encode", async () => {
        const schema = C.option(C.NumberFromString)
        await Util.expectEncodeSuccess(schema, O.none(), { _tag: "None" })
        await Util.expectEncodeSuccess(schema, O.some(1), { _tag: "Some", value: "1" })
      })
    })

    describe.concurrent("optionFromNullable", () => {
      it("property tests", () => {
        Util.roundtrip(C.optionFromNullable(S.number))
      })

      it("parse", async () => {
        const schema = C.optionFromNullable(C.NumberFromString)
        await Util.expectParseSuccess(schema, null, O.none())
        await Util.expectParseSuccess(schema, "1", O.some(1))

        expect(O.isOption(C.decode(schema)(null))).toEqual(true)
        expect(O.isOption(C.decode(schema)("1"))).toEqual(true)

        await Util.expectParseFailure(
          schema,
          undefined,
          `union member: Expected null, actual undefined, union member: Expected a string, actual undefined`
        )
        await Util.expectParseFailure(
          schema,
          {},
          `union member: Expected null, actual {}, union member: Expected a string, actual {}`
        )
      })

      it("encode", async () => {
        const schema = C.optionFromNullable(C.NumberFromString)
        await Util.expectEncodeSuccess(schema, O.none(), null)
        await Util.expectEncodeSuccess(schema, O.some(1), "1")
      })
    })
  })
})
