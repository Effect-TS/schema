import * as E from "@effect/data/Either"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Either", () => {
  describe.concurrent("eitherFromSelf", () => {
    it("property tests", () => {
      Util.roundtrip(C.eitherFromSelf(S.string, S.number))
    })

    it("decode / encode", async () => {
      const transform = C.eitherFromSelf(S.string, C.NumberFromString)
      await Util.expectParseSuccess(transform, E.left("a"), E.left("a"))
      await Util.expectParseSuccess(transform, E.right("1"), E.right(1))
    })
  })

  describe.concurrent("either", () => {
    it("property tests", () => {
      Util.roundtrip(C.either(S.string, S.number))
    })

    it("decode / encode", async () => {
      const codec = C.either(S.string, C.NumberFromString)
      await Util.expectParseSuccess(
        codec,
        JSON.parse(JSON.stringify(E.left("a"))),
        E.left("a")
      )
      await Util.expectParseSuccess(
        codec,
        JSON.parse(JSON.stringify(E.right("1"))),
        E.right(1)
      )
      await Util.expectEncodeSuccess(codec, E.left("a"), { _tag: "Left", left: "a" })
      await Util.expectEncodeSuccess(codec, E.right(1), { _tag: "Right", right: "1" })
    })
  })
})
