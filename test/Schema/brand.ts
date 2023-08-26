import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Schema/brand", () => {
  describe.concurrent("decoding", () => {
    it("string brand", async () => {
      const schema = S.string.pipe(S.numberFromString, S.int(), S.brand("Int"))
      await Util.expectParseSuccess(schema, "1", 1 as any)
      await Util.expectParseFailure(
        schema,
        null,
        `Expected string, actual null`
      )
    })

    it("symbol brand", async () => {
      const Int = Symbol.for("Int")
      const schema = S.string.pipe(S.numberFromString, S.int(), S.brand(Int))
      await Util.expectParseSuccess(schema, "1", 1 as any)
      await Util.expectParseFailure(
        schema,
        null,
        `Expected string, actual null`
      )
    })
  })
})
