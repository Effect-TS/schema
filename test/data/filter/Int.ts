import { pipe } from "@effect/data/Function"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

const schema = pipe(S.number, S.int())

describe.concurrent("int", () => {
  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("is", () => {
    const is = S.is(schema)
    expect(is(0)).toEqual(true)
    expect(is(1)).toEqual(true)
    expect(is(0.5)).toEqual(false)
  })

  it("decode", async () => {
    await Util.expectParseSuccess(schema, 0)
    await Util.expectParseSuccess(schema, 1)
    await Util.expectParseFailure(schema, 0.5, `Expected integer, actual 0.5`)
  })

  it("pretty", () => {
    const pretty = Pretty.build(schema)
    expect(pretty(1)).toEqual("1")
  })
})
