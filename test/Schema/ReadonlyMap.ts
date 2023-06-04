import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("ReadonlyMap", () => {
  it("keyof", () => {
    expect(S.keyof(S.readonlyMap(S.number, S.string))).toEqual(S.literal("size"))
  })

  it("decode / encode", async () => {
    const schema = S.readonlyMap(S.number, S.string)

    await Util.expectParseSuccess(schema, new Map())
    await Util.expectParseSuccess(schema, new Map([[1, "a"], [2, "b"], [3, "c"]]))

    await Util.expectParseFailure(schema, null, "Expected a ReadonlyMap, actual null")
    await Util.expectParseFailure(
      schema,
      new Map<number, string | number>([[1, "a"], [2, 1]]),
      "/1 /1 Expected a string, actual 1"
    )
    await Util.expectParseFailure(
      schema,
      new Map<number, string | number>([[1, 1], [2, "b"]]),
      "/0 /1 Expected a string, actual 1"
    )
    await Util.expectParseFailure(
      schema,
      new Map([[1, 1], [2, 2]]),
      "/0 /1 Expected a string, actual 1"
    )
    await Util.expectParseFailure(
      schema,
      new Map<string | number, number>([["a", 1], ["b", 2], [3, 1]]),
      `/0 /0 Expected a number, actual "a"`
    )
    await Util.expectParseFailure(
      schema,
      new Map<number, string | number>([[1, "a"], [2, "b"], [3, 1]]),
      "/2 /1 Expected a string, actual 1"
    )
  })

  it("pretty", () => {
    const schema = S.readonlyMap(S.number, S.string)
    const pretty = Pretty.build(schema)
    expect(pretty(new Map())).toEqual("new Map([])")
    expect(pretty(new Map([[1, "a"], [2, "b"]]))).toEqual(
      `new Map([[1, "a"], [2, "b"]])`
    )
  })
})
