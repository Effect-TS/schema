import * as O from "@effect/data/Option"
import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("Option", () => {
  describe.concurrent("Schema", () => {
    it("is", () => {
      const schema = S.option(S.number)
      const is = P.is(schema)
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
        Util.roundtrip(T.optionFromSelf(T.NumberFromString))
      })

      it("parse", async () => {
        const schema = T.optionFromSelf(T.NumberFromString)
        await Util.expectParseSuccess(schema, O.none(), O.none())
        await Util.expectParseSuccess(schema, O.some("1"), O.some(1))
      })
    })

    describe.concurrent("option", () => {
      it("property tests", () => {
        Util.roundtrip(T.option(S.number))
      })

      it("parse", async () => {
        const schema = T.option(T.NumberFromString)
        await Util.expectParseSuccess(schema, JSON.parse(JSON.stringify(O.none())), O.none())
        await Util.expectParseSuccess(schema, JSON.parse(JSON.stringify(O.some("1"))), O.some(1))
      })

      it("encode", async () => {
        const schema = T.option(T.NumberFromString)
        await Util.expectEncodeSuccess(schema, O.none(), { _tag: "None" })
        await Util.expectEncodeSuccess(schema, O.some(1), { _tag: "Some", value: "1" })
      })
    })

    describe.concurrent("optionFromNullable", () => {
      it("property tests", () => {
        Util.roundtrip(T.optionFromNullable(S.number))
      })

      it("parse", async () => {
        const schema = T.optionFromNullable(T.NumberFromString)
        await Util.expectParseSuccess(schema, null, O.none())
        await Util.expectParseSuccess(schema, "1", O.some(1))

        expect(O.isOption(T.decode(schema)(null))).toEqual(true)
        expect(O.isOption(T.decode(schema)("1"))).toEqual(true)

        await Util.expectParseFailure(
          schema,
          undefined,
          `union member: Expected null, actual undefined, union member: Expected string, actual undefined`
        )
        await Util.expectParseFailure(
          schema,
          {},
          `union member: Expected null, actual {}, union member: Expected string, actual {}`
        )
      })

      it("encode", async () => {
        const schema = T.optionFromNullable(T.NumberFromString)
        await Util.expectEncodeSuccess(schema, O.none(), null)
        await Util.expectEncodeSuccess(schema, O.some(1), "1")
      })
    })
  })
})
