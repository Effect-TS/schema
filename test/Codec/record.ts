import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"

describe.concurrent("record", () => {
  describe.concurrent("Duplicate index signature", () => {
    const stringRecord = C.record(S.string, C.NumberFromString)
    const refinedStringRecord = C.record(S.string.pipe(S.nonEmpty()), C.NumberFromString)
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
      expect(() => stringRecord.pipe(C.extend(stringRecord))).toThrowError(
        new Error("Duplicate index signature for type `string`")
      )
    })

    it("string + string should throw", () => {
      expect(() => stringRecord.pipe(C.extend(refinedStringRecord))).toThrowError(
        new Error("Duplicate index signature for type `string`")
      )
    })

    it("symbol + symbol should throw", () => {
      expect(() => symbolRecord.pipe(C.extend(symbolRecord))).toThrowError(
        new Error("Duplicate index signature for type `symbol`")
      )
    })

    it("string + symbol should be ok", () => {
      const schema1 = stringRecord.pipe(C.extend(symbolRecord))
      expect(schema1).exist
      const schema2 = symbolRecord.pipe(C.extend(stringRecord))
      expect(schema2).exist
    })

    it("string + template literal should be ok", () => {
      const schema1 = stringRecord.pipe(C.extend(templateLiteral1))
      expect(schema1).exist
      const schema2 = templateLiteral1.pipe(C.extend(stringRecord))
      expect(schema2).exist
    })

    it("template literal + template literal should be ok", () => {
      const schema1 = templateLiteral1.pipe(C.extend(templateLiteral2))
      expect(schema1).exist
      const schema2 = templateLiteral1.pipe(C.extend(templateLiteral1))
      expect(schema2).exist
    })
  })
})
