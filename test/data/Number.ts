import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Number", () => {
  describe.concurrent("Schema", () => {
    it("between", async () => {
      const schema = pipe(S.number, S.between(-1, 1))

      await Util.expectParseFailure(schema, -2, "Expected a number between -1 and 1, actual -2")
      await Util.expectParseSuccess(schema, 0, 0)
      await Util.expectEncodeSuccess(schema, 1, 1)
      await Util.expectParseFailure(schema, 2, "Expected a number between -1 and 1, actual 2")
    })

    it("Positive", async () => {
      const schema = S.Positive

      await Util.expectParseFailure(schema, -1, "Expected a positive number, actual -1")
      await Util.expectParseFailure(schema, 0, "Expected a positive number, actual 0")
      await Util.expectEncodeSuccess(schema, 1, 1)
    })

    it("Negative", async () => {
      const schema = S.Negative

      await Util.expectEncodeSuccess(schema, -1, -1)
      await Util.expectParseFailure(schema, 0, "Expected a negative number, actual 0")
      await Util.expectParseFailure(schema, 1, "Expected a negative number, actual 1")
    })

    it("NonNegative", async () => {
      const schema = S.NonNegative

      await Util.expectEncodeFailure(schema, -1, "Expected a non-negative number, actual -1")
      await Util.expectParseSuccess(schema, 0, 0)
      await Util.expectParseSuccess(schema, 1, 1)
    })

    it("NonPositive", async () => {
      const schema = S.NonPositive

      await Util.expectEncodeSuccess(schema, -1, -1)
      await Util.expectParseSuccess(schema, 0, 0)
      await Util.expectParseFailure(schema, 1, "Expected a non-positive number, actual 1")
    })
  })

  describe.concurrent("Transform", () => {
    it("clamp", async () => {
      const transform = pipe(S.number, C.clamp(-1, 1))

      await Util.expectParseSuccess(transform, 3, 1)
      await Util.expectParseSuccess(transform, 0, 0)
      await Util.expectParseSuccess(transform, -3, -1)
    })

    describe.concurrent("NumberFromString", () => {
      const transform = C.NumberFromString

      it("property tests", () => {
        Util.roundtrip(transform)
      })

      it("parse", async () => {
        await Util.expectParseSuccess(transform, "1", 1)
        await Util.expectParseSuccess(transform, "1a", 1)
        await Util.expectParseFailure(
          transform,
          "a",
          `Expected string -> number, actual "a"`
        )
        await Util.expectParseFailure(
          transform,
          "a1",
          `Expected string -> number, actual "a1"`
        )
      })

      it("encode", async () => {
        await Util.expectEncodeSuccess(transform, 1, "1")
      })

      it("example", async () => {
        // success cases
        await Util.expectParseSuccess(transform, "1", 1)
        await Util.expectParseSuccess(transform, "-1", -1)
        await Util.expectParseSuccess(transform, "1.5", 1.5)
        await Util.expectParseSuccess(transform, "NaN", NaN)
        await Util.expectParseSuccess(transform, "Infinity", Infinity)
        await Util.expectParseSuccess(transform, "-Infinity", -Infinity)

        // failure cases
        await Util.expectParseFailure(
          transform,
          "a",
          `Expected string -> number, actual "a"`
        )
      })
    })
  })
})
