import * as O from "@effect/data/Option"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Option", () => {
  describe.concurrent("optionFromSelf", () => {
    it("property tests", () => {
      Util.roundtrip(C.optionFromSelf(C.NumberFromString))
    })

    it("decode / encode", async () => {
      const codec = C.optionFromSelf(C.NumberFromString)
      await Util.expectParseSuccess(codec, O.none(), O.none())
      await Util.expectParseSuccess(codec, O.some("1"), O.some(1))
    })
  })

  describe.concurrent("option", () => {
    it("property tests", () => {
      Util.roundtrip(C.option(S.number))
    })

    it("decode / encode", async () => {
      const codec = C.option(C.NumberFromString)
      await Util.expectParseSuccess(codec, JSON.parse(JSON.stringify(O.none())), O.none())
      await Util.expectParseSuccess(codec, JSON.parse(JSON.stringify(O.some("1"))), O.some(1))
      await Util.expectEncodeSuccess(codec, O.none(), { _tag: "None" })
      await Util.expectEncodeSuccess(codec, O.some(1), { _tag: "Some", value: "1" })
    })
  })

  describe.concurrent("optionFromNullable", () => {
    it("property tests", () => {
      Util.roundtrip(C.optionFromNullable(S.number))
    })

    it("decode / encode", async () => {
      const codec = C.optionFromNullable(C.NumberFromString)
      await Util.expectParseSuccess(codec, null, O.none())
      await Util.expectParseSuccess(codec, "1", O.some(1))

      expect(O.isOption(C.decode(codec)(null))).toEqual(true)
      expect(O.isOption(C.decode(codec)("1"))).toEqual(true)

      await Util.expectParseFailure(
        codec,
        undefined,
        `union member: Expected null, actual undefined, union member: Expected a string, actual undefined`
      )
      await Util.expectParseFailure(
        codec,
        {},
        `union member: Expected null, actual {}, union member: Expected a string, actual {}`
      )
      await Util.expectEncodeSuccess(codec, O.none(), null)
      await Util.expectEncodeSuccess(codec, O.some(1), "1")
    })
  })
})
