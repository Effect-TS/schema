import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("instanceOf", () => {
  it("is", () => {
    const schema = S.instanceOf(Set)
    const is = S.is(schema)
    expect(is(new Set())).toEqual(true)
    expect(is(1)).toEqual(false)
    expect(is({})).toEqual(false)
  })

  it("decode", async () => {
    const schema = S.instanceOf(Set)
    await Util.expectParseSuccess(schema, new Set())
    await Util.expectParseFailure(schema, 1, `Expected an instance of Set, actual 1`)
    await Util.expectParseFailure(schema, {}, `Expected an instance of Set, actual {}`)
  })

  it("pretty", () => {
    const schema = S.instanceOf(Set)
    const pretty = Pretty.build(schema)
    expect(pretty(new Set())).toEqual("{}")
  })
})
