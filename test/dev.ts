import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it.skip("dev", async () => {
    const NumberFromString = S.numberFromString(S.string)
    const schema = S.optionFromNullable(NumberFromString)
    // await Util.expectEncodeSuccess(schema, O.none(), null)
    await Util.expectEncodeSuccess(schema, O.some(1), "1")
  })

  it.skip("refinement", async () => {
    const schema = pipe(
      S.string,
      S.filter(() => {
        console.log("filter 1")
        return true
      }),
      S.filter(() => {
        console.log("filter 2")
        return true
      })
    )
    // console.log("%o", schema.ast)
    // expect(S.decode(schema)("a")).toEqual("a")
    expect(S.encode(schema)("a")).toEqual("a")
  })
})
