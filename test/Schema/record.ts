import * as S from "@effect/schema/Schema"

describe.concurrent("record", () => {
  describe.concurrent("Duplicate index signature", () => {
    const stringRecord = S.record(S.string, S.string)
    const refinedStringRecord = S.record(S.string.pipe(S.nonEmpty()), S.string)
    const symbolRecord = S.record(S.symbol, S.string)
    const templateLiteral1 = S.record(S.templateLiteral(S.literal("a"), S.string), S.string)
    const templateLiteral2 = S.record(S.templateLiteral(S.string, S.literal("b")), S.string)

    it("string + string should throw", () => {
      expect(() => stringRecord.pipe(S.extend(stringRecord))).toThrowError(
        new Error("Duplicate index signature for type `string`")
      )
    })

    it("string + refinement should throw", () => {
      expect(() => stringRecord.pipe(S.extend(refinedStringRecord))).toThrowError(
        new Error("Duplicate index signature for type `string`")
      )
    })

    it("symbol + symbol should throw", () => {
      expect(() => symbolRecord.pipe(S.extend(symbolRecord))).toThrowError(
        new Error("Duplicate index signature for type `symbol`")
      )
    })

    it("string + symbol should be ok", () => {
      const schema1 = stringRecord.pipe(S.extend(symbolRecord))
      expect(schema1).exist
      const schema2 = symbolRecord.pipe(S.extend(stringRecord))
      expect(schema2).exist
    })

    it("string + template literal should be ok", () => {
      const schema1 = stringRecord.pipe(S.extend(templateLiteral1))
      expect(schema1).exist
      const schema2 = templateLiteral1.pipe(S.extend(stringRecord))
      expect(schema2).exist
    })

    it("template literal + template literal should be ok", () => {
      const schema1 = templateLiteral1.pipe(S.extend(templateLiteral2))
      expect(schema1).exist
      const schema2 = templateLiteral1.pipe(S.extend(templateLiteral1))
      expect(schema2).exist
    })
  })
})
