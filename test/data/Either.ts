import * as E from "@effect/data/Either"
import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

const NumberFromString = T.NumberFromString

describe.concurrent("Either", () => {
  describe.concurrent("eitherFromSelf", () => {
    it("property tests", () => {
      Util.roundtrip(T.eitherFromSelf(T.string, T.number))
    })

    it("Guard", () => {
      const schema = T.eitherFromSelf(T.string, T.number)
      const is = P.is(schema)
      expect(is(E.left("a"))).toEqual(true)
      expect(is(E.right(1))).toEqual(true)
      expect(is(null)).toEqual(false)
      expect(is(E.right("a"))).toEqual(false)
      expect(is(E.left(1))).toEqual(false)

      expect(is({ _tag: "Right", right: 1 })).toEqual(false)
      expect(is({ _tag: "Left", left: "a" })).toEqual(false)
    })

    it("Decoder", async () => {
      const schema = T.eitherFromSelf(T.string, NumberFromString)
      await Util.expectParseSuccess(schema, E.left("a"), E.left("a"))
      await Util.expectParseSuccess(schema, E.right("1"), E.right(1))
    })

    it("Pretty", () => {
      const schema = T.eitherFromSelf(T.string, T.number)
      const pretty = Pretty.to(schema)
      expect(pretty(E.left("a"))).toEqual(`left("a")`)
      expect(pretty(E.right(1))).toEqual("right(1)")
    })
  })

  describe.concurrent("either", () => {
    it("property tests", () => {
      Util.roundtrip(T.either(T.string, T.number))
    })

    it("Decoder", async () => {
      const schema = T.either(T.string, NumberFromString)
      await Util.expectParseSuccess(
        schema,
        JSON.parse(JSON.stringify(E.left("a"))),
        E.left("a")
      )
      await Util.expectParseSuccess(
        schema,
        JSON.parse(JSON.stringify(E.right("1"))),
        E.right(1)
      )
    })

    it("Encoder", async () => {
      const schema = T.either(T.string, NumberFromString)
      await Util.expectEncodeSuccess(schema, E.left("a"), { _tag: "Left", left: "a" })
      await Util.expectEncodeSuccess(schema, E.right(1), { _tag: "Right", right: "1" })
    })
  })
})
