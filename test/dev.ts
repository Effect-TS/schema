import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it.skip("dev", async () => {
    const NumberFromString = S.NumberFromString
    const schema = S.optionFromNullable(NumberFromString)
    // await Util.expectEncodeSuccess(schema, O.none(), null)
    await Util.expectEncodeSuccess(schema, O.some(1), "1")
  })

  it("refinement", async () => {
    const schema = pipe(S.string, S.maxLength(1), S.numberFromString)
    // console.log("%o", schema.ast)
    // expect(S.decode(schema)("1")).toEqual(1)
    expect(S.encode(schema)(1)).toEqual("1")
  })
})
