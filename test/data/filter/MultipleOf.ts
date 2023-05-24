import { pipe } from "@effect/data/Function"
import * as P from "@effect/schema/Parser"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("multipleOf", () => {
  it("property tests", () => {
    Util.roundtrip(T.multipleOf(2)(T.number))
  })

  it("Guard", () => {
    const schema = pipe(T.number, T.multipleOf(-.2))
    const is = P.is(schema)
    expect(is(-2.8)).toEqual(true)
    expect(is(-2)).toEqual(true)
    expect(is(-1.5)).toEqual(false)
    expect(is(0)).toEqual(true)
    expect(is(1)).toEqual(true)
    expect(is(2.6)).toEqual(true)
    expect(is(3.1)).toEqual(false)
  })

  it("Decoder", async () => {
    const schema = T.multipleOf(2)(T.number)
    await Util.expectParseSuccess(schema, -4)
    await Util.expectParseFailure(
      schema,
      -3,
      `Expected a number divisible by 2, actual -3`
    )
    await Util.expectParseSuccess(schema, 0)
    await Util.expectParseSuccess(schema, 2)
    await Util.expectParseFailure(
      schema,
      2.5,
      `Expected a number divisible by 2, actual 2.5`
    )
    await Util.expectParseFailure(
      schema,
      "",
      `Expected number, actual ""`
    )
  })
})
