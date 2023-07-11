import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("string transformations", () => {
  describe.concurrent("trim", () => {
    it("property tests", () => {
      const codec = C.Trim
      Util.roundtrip(codec)
    })

    it("decode / encode", async () => {
      const codec = S.string.pipe(S.minLength(1), C.trim)
      await Util.expectParseSuccess(codec, "a", "a")
      await Util.expectParseSuccess(codec, "a ", "a")
      await Util.expectParseSuccess(codec, " a ", "a")

      await Util.expectParseFailure(
        codec,
        "  ",
        `Expected a string at least 1 character(s) long, actual ""`
      )
      await Util.expectParseFailure(
        codec,
        "",
        `Expected a string at least 1 character(s) long, actual ""`
      )
      await Util.expectEncodeSuccess(codec, "a", "a")

      await Util.expectEncodeFailure(
        codec,
        "",
        `Expected a string at least 1 character(s) long, actual ""`
      )
      await Util.expectEncodeFailure(
        codec,
        " a",
        `Expected a string with no leading or trailing whitespace, actual " a"`
      )
      await Util.expectEncodeFailure(
        codec,
        "a ",
        `Expected a string with no leading or trailing whitespace, actual "a "`
      )
      await Util.expectEncodeFailure(
        codec,
        " a ",
        `Expected a string with no leading or trailing whitespace, actual " a "`
      )
      await Util.expectEncodeFailure(
        codec,
        " ",
        `Expected a string with no leading or trailing whitespace, actual " "`
      )
    })
  })
})

describe.concurrent("number transformations", () => {
  describe.concurrent("clamp", () => {
    it("decode / encode", async () => {
      const codec = S.number.pipe(C.clamp(-1, 1))

      await Util.expectParseSuccess(codec, 3, 1)
      await Util.expectParseSuccess(codec, 0, 0)
      await Util.expectParseSuccess(codec, -3, -1)
    })
  })

  describe.concurrent("NumberFromString", () => {
    it("property tests", () => {
      const codec = C.NumberFromString
      Util.roundtrip(codec)
    })

    it("decode / encode", async () => {
      const codec = C.NumberFromString

      await Util.expectParseSuccess(codec, "0", 0)
      await Util.expectParseSuccess(codec, "-0", -0)
      await Util.expectParseSuccess(codec, "1", 1)
      await Util.expectParseSuccess(codec, "1.2", 1.2)

      await Util.expectParseSuccess(codec, "NaN", NaN)
      await Util.expectParseSuccess(codec, "Infinity", Infinity)
      await Util.expectParseSuccess(codec, "-Infinity", -Infinity)

      await Util.expectParseFailure(codec, "", `Expected (a string -> a number), actual ""`)
      await Util.expectParseFailure(codec, " ", `Expected (a string -> a number), actual " "`)
      await Util.expectParseFailure(codec, "1AB", `Expected (a string -> a number), actual "1AB"`)
      await Util.expectParseFailure(
        codec,
        "a",
        `Expected (a string -> a number), actual "a"`
      )
      await Util.expectParseFailure(
        codec,
        "a1",
        `Expected (a string -> a number), actual "a1"`
      )

      await Util.expectEncodeSuccess(codec, 1, "1")
    })
  })
})

describe.concurrent("boolean transformations", () => {
  describe.concurrent("not", () => {
    it("decode / encode", async () => {
      const codec = S.boolean.pipe(C.not)

      await Util.expectParseSuccess(codec, true, false)
      await Util.expectParseSuccess(codec, false, true)
      await Util.expectEncodeSuccess(codec, true, false)
      await Util.expectEncodeSuccess(codec, false, true)
    })
  })
})

describe.concurrent("bigint transformations", () => {
  describe.concurrent("clampBigint", () => {
    it("decode / encode", async () => {
      const codec = S.bigint.pipe(C.clampBigint(-1n, 1n))

      await Util.expectParseSuccess(codec, 3n, 1n)
      await Util.expectParseSuccess(codec, 0n, 0n)
      await Util.expectParseSuccess(codec, -3n, -1n)
    })
  })
})
