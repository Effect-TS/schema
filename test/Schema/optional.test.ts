import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as O from "effect/Option"
import { describe, expect, it } from "vitest"

describe("optional APIs", () => {
  describe("optionalExact", () => {
    it("should add annotations", () => {
      const schema = S.struct({
        a: S.optionalExact(S.string, {
          [Symbol.for("custom-annotation")]: "custom-annotation-value"
        })
      })
      expect((schema.ast as any).propertySignatures[0].annotations).toEqual({
        [Symbol.for("custom-annotation")]: "custom-annotation-value"
      })
    })

    it("decoding / encoding", async () => {
      const schema = S.struct({
        a: S.optionalExact(S.NumberFromString)
      })
      await Util.expectParseSuccess(schema, {}, {})
      await Util.expectParseSuccess(schema, { a: "1" }, { a: 1 })
      await Util.expectParseFailure(
        schema,
        { a: "a" },
        `/a Expected string <-> number, actual "a"`
      )

      await Util.expectEncodeSuccess(schema, {}, {})
      await Util.expectEncodeSuccess(schema, { a: 1 }, { a: "1" })
    })

    it("never", async () => {
      const schema = S.struct({ a: S.optionalExact(S.never), b: S.number })
      await Util.expectParseSuccess(schema, { b: 1 })
      await Util.expectParseFailure(schema, { a: "a", b: 1 }, `/a Expected never, actual "a"`)
    })
  })

  describe("optional", () => {
    it("decoding / encoding", async () => {
      const schema = S.struct({
        a: S.optional(S.NumberFromString)
      })
      await Util.expectParseSuccess(schema, {}, {})
      await Util.expectParseSuccess(schema, { a: undefined }, { a: undefined })
      await Util.expectParseSuccess(schema, { a: "1" }, { a: 1 })
      await Util.expectParseFailure(
        schema,
        { a: "a" },
        `/a union member: Expected undefined, actual "a", union member: Expected string <-> number, actual "a"`
      )

      await Util.expectEncodeSuccess(schema, {}, {})
      await Util.expectEncodeSuccess(schema, { a: undefined }, { a: undefined })
      await Util.expectEncodeSuccess(schema, { a: 1 }, { a: "1" })
    })
  })

  describe("optionalExactToOption", () => {
    it("should add annotations", () => {
      const schema = S.struct({
        a: S.optionalExactToOption(S.string, {
          [Symbol.for("custom-annotation")]: "custom-annotation-value"
        })
      })
      expect((schema.ast as any).to.propertySignatures[0].annotations).toEqual({
        [Symbol.for("custom-annotation")]: "custom-annotation-value"
      })
    })

    it("decoding / encoding", async () => {
      const schema = S.struct({ a: S.optionalExactToOption(S.NumberFromString) })
      await Util.expectParseSuccess(schema, {}, { a: O.none() })
      await Util.expectParseSuccess(schema, { a: "1" }, { a: O.some(1) })
      await Util.expectParseFailure(schema, {
        a: "a"
      }, `/a Expected string <-> number, actual "a"`)

      await Util.expectEncodeSuccess(schema, { a: O.some(1) }, { a: "1" })
      await Util.expectEncodeSuccess(schema, { a: O.none() }, {})
    })
  })

  describe("optionalExactNullableToOption", () => {
    it("decoding / encoding", async () => {
      const schema = S.struct({ a: S.optionalExactNullableToOption(S.NumberFromString) })
      await Util.expectParseSuccess(schema, {}, { a: O.none() })
      await Util.expectParseSuccess(schema, { a: null }, { a: O.none() })
      await Util.expectParseSuccess(schema, { a: "1" }, { a: O.some(1) })
      await Util.expectParseFailure(
        schema,
        {
          a: "a"
        },
        `/a union member: Expected null, actual "a", union member: Expected string <-> number, actual "a"`
      )

      await Util.expectEncodeSuccess(schema, { a: O.some(1) }, { a: "1" })
      await Util.expectEncodeSuccess(schema, { a: O.none() }, {})
    })
  })

  describe("optionalToOption", () => {
    it("decoding / encoding", async () => {
      const schema = S.struct({ a: S.optionalToOption(S.NumberFromString) })
      await Util.expectParseSuccess(schema, {}, { a: O.none() })
      await Util.expectParseSuccess(schema, { a: undefined }, { a: O.none() })
      await Util.expectParseSuccess(schema, { a: "1" }, { a: O.some(1) })
      await Util.expectParseFailure(
        schema,
        {
          a: "a"
        },
        `/a union member: Expected undefined, actual "a", union member: Expected string <-> number, actual "a"`
      )

      await Util.expectEncodeSuccess(schema, { a: O.some(1) }, { a: "1" })
      await Util.expectEncodeSuccess(schema, { a: O.none() }, {})
    })
  })

  describe("optionalNullableToOption", () => {
    it("decoding / encoding", async () => {
      const schema = S.struct({ a: S.optionalNullableToOption(S.NumberFromString) })
      await Util.expectParseSuccess(schema, {}, { a: O.none() })
      await Util.expectParseSuccess(schema, { a: undefined }, { a: O.none() })
      await Util.expectParseSuccess(schema, { a: null }, { a: O.none() })
      await Util.expectParseSuccess(schema, { a: "1" }, { a: O.some(1) })
      await Util.expectParseFailure(
        schema,
        {
          a: "a"
        },
        `/a union member: Expected null, actual "a", union member: Expected undefined, actual "a", union member: Expected string <-> number, actual "a"`
      )

      await Util.expectEncodeSuccess(schema, { a: O.some(1) }, { a: "1" })
      await Util.expectEncodeSuccess(schema, { a: O.none() }, {})
    })
  })

  describe("optionalExactWithDefault", () => {
    it("should add annotations", () => {
      const schema = S.struct({
        a: S.optionalExactWithDefault(S.string, () => "", {
          [Symbol.for("custom-annotation")]: "custom-annotation-value"
        })
      })
      expect((schema.ast as any).to.propertySignatures[0].annotations).toEqual({
        [Symbol.for("custom-annotation")]: "custom-annotation-value"
      })
    })

    it("decoding / encoding", async () => {
      const schema = S.struct({
        a: S.optionalExactWithDefault(S.NumberFromString, () => 0)
      })
      await Util.expectParseSuccess(schema, {}, { a: 0 })
      await Util.expectParseSuccess(schema, { a: "1" }, { a: 1 })
      await Util.expectParseFailure(
        schema,
        { a: "a" },
        `/a Expected string <-> number, actual "a"`
      )

      await Util.expectEncodeSuccess(schema, { a: 1 }, { a: "1" })
      await Util.expectEncodeSuccess(schema, { a: 0 }, { a: "0" })
    })
  })

  describe("optionalWithDefault", () => {
    it("decoding / encoding", async () => {
      const schema = S.struct({
        a: S.optionalWithDefault(S.NumberFromString, () => 0)
      })
      await Util.expectParseSuccess(schema, {}, { a: 0 })
      await Util.expectParseSuccess(schema, { a: undefined }, { a: 0 })
      await Util.expectParseSuccess(schema, { a: "1" }, { a: 1 })
      await Util.expectParseFailure(
        schema,
        { a: "a" },
        `/a union member: Expected undefined, actual "a", union member: Expected string <-> number, actual "a"`
      )

      await Util.expectEncodeSuccess(schema, { a: 1 }, { a: "1" })
      await Util.expectEncodeSuccess(schema, { a: 0 }, { a: "0" })
    })
  })

  describe("optionalNullableWithDefault", () => {
    it("decoding / encoding", async () => {
      const schema = S.struct({
        a: S.optionalNullableWithDefault(S.NumberFromString, () => 0)
      })
      await Util.expectParseSuccess(schema, {}, { a: 0 })
      await Util.expectParseSuccess(schema, { a: null }, { a: 0 })
      await Util.expectParseSuccess(schema, { a: undefined }, { a: 0 })
      await Util.expectParseSuccess(schema, { a: "1" }, { a: 1 })
      await Util.expectParseFailure(
        schema,
        { a: "a" },
        `/a union member: Expected null, actual "a", union member: Expected undefined, actual "a", union member: Expected string <-> number, actual "a"`
      )

      await Util.expectEncodeSuccess(schema, { a: 1 }, { a: "1" })
      await Util.expectEncodeSuccess(schema, { a: 0 }, { a: "0" })
    })
  })
})
