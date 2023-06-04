import * as O from "@effect/data/Option"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Option", () => {
  it("decode / encode", async () => {
    const schema = S.option(S.number)

    await Util.expectParseSuccess(schema, O.none())
    await Util.expectParseSuccess(schema, O.some(1))

    await Util.expectParseFailure(schema, null, "Expected an Option, actual null")
    await Util.expectParseFailure(schema, O.some("a"), `Expected a number, actual "a"`)
    await Util.expectParseFailure(
      schema,
      { _tag: "None" },
      `Expected an Option, actual {"_tag":"None"}`
    )
    await Util.expectParseFailure(
      schema,
      { _tag: "Some", value: 1 },
      `Expected an Option, actual {"_tag":"Some","value":1}`
    )
  })

  it("pretty", () => {
    const schema = S.option(S.number)
    const pretty = Pretty.build(schema)
    expect(pretty(O.none())).toEqual("none()")
    expect(pretty(O.some(1))).toEqual("some(1)")
  })
})
