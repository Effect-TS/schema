import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("ReadonlySet", () => {
  it("keyof", () => {
    expect(S.keyof(S.readonlySet(S.number))).toEqual(S.literal("size"))
  })

  it("decode / encode", async () => {
    const schema = S.readonlySet(S.string)

    await Util.expectParseSuccess(schema, new Set())
    await Util.expectParseSuccess(schema, new Set(["a", "b", "c"]))

    await Util.expectParseFailure(schema, null, "Expected a ReadonlySet, actual null")
    await Util.expectParseFailure(schema, new Set(["a", "b", 1]), "/2 Expected a string, actual 1")
  })

  it("pretty", () => {
    const schema = S.readonlySet(S.string)
    const pretty = Pretty.build(schema)
    expect(pretty(new Set())).toEqual("new Set([])")
    expect(pretty(new Set(["a", "b"]))).toEqual(
      `new Set(["a", "b"])`
    )
  })
})
