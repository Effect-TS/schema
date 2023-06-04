import * as E from "@effect/data/Either"
import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Either", () => {
  it("decode / encode", async () => {
    const schema = S.either(S.string, S.number)

    await Util.expectParseSuccess(schema, E.right(1))
    await Util.expectParseSuccess(schema, E.left("a"))

    await Util.expectParseFailure(schema, E.right("a"), `Expected a number, actual "a"`)
    await Util.expectParseFailure(schema, E.left(1), "Expected a string, actual 1")
    await Util.expectParseFailure(
      schema,
      { _tag: "Right", right: 1 },
      `Expected an Either, actual {"_tag":"Right","right":1}`
    )
    await Util.expectParseFailure(
      schema,
      { _tag: "Left", left: "a" },
      `Expected an Either, actual {"_tag":"Left","left":"a"}`
    )
  })

  it("pretty", () => {
    const schema = S.either(S.string, S.number)
    const pretty = Pretty.build(schema)
    expect(pretty(E.left("a"))).toEqual(`left("a")`)
    expect(pretty(E.right(1))).toEqual("right(1)")
  })
})
