import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"

describe.concurrent("record", () => {
  describe.concurrent("Duplicate index signature", () => {
    const stringRecord = C.record(S.string, C.NumberFromString)
    const refinedStringRecord = C.record(pipe(S.string, S.nonEmpty()), C.NumberFromString)
    const symbolRecord = C.record(S.symbol, C.NumberFromString)
    const templateLiteral1 = C.record(
      S.templateLiteral(S.literal("a"), S.string),
      C.NumberFromString
    )
    const templateLiteral2 = C.record(
      S.templateLiteral(S.string, S.literal("b")),
      C.NumberFromString
    )

    it("string + string should throw", () => {
      expect(() => pipe(stringRecord, C.extend(stringRecord))).toThrowError(
        new Error("Duplicate index signature for type `string`")
      )
    })

    it("string + string should throw", () => {
      expect(() => pipe(stringRecord, C.extend(refinedStringRecord))).toThrowError(
        new Error("Duplicate index signature for type `string`")
      )
    })

    it("symbol + symbol should throw", () => {
      expect(() => pipe(symbolRecord, C.extend(symbolRecord))).toThrowError(
        new Error("Duplicate index signature for type `symbol`")
      )
    })

    it("string + symbol should be ok", () => {
      const schema1 = pipe(stringRecord, C.extend(symbolRecord))
      expect(schema1).exist
      const schema2 = pipe(symbolRecord, C.extend(stringRecord))
      expect(schema2).exist
    })

    it("string + template literal should be ok", () => {
      const schema1 = pipe(stringRecord, C.extend(templateLiteral1))
      expect(schema1).exist
      const schema2 = pipe(templateLiteral1, C.extend(stringRecord))
      expect(schema2).exist
    })

    it("template literal + template literal should be ok", () => {
      const schema1 = pipe(templateLiteral1, C.extend(templateLiteral2))
      expect(schema1).exist
      const schema2 = pipe(templateLiteral1, C.extend(templateLiteral1))
      expect(schema2).exist
    })
  })
})
