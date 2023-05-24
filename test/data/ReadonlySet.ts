import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

const NumberFromString = T.NumberFromString

describe.concurrent("ReadonlySet", () => {
  it("readonlySetFromSelf. keyof", () => {
    expect(T.keyof(T.readonlySetFromSelf(T.number))).toEqual(T.literal("size"))
  })

  it("readonlySetFromSelf. property tests", () => {
    Util.roundtrip(T.readonlySetFromSelf(T.number))
  })

  it("readonlySetFromSelf. decoder", async () => {
    const schema = T.readonlySetFromSelf(NumberFromString)
    await Util.expectParseSuccess(schema, new Set(), new Set())
    await Util.expectParseSuccess(schema, new Set(["1", "2", "3"]), new Set([1, 2, 3]))

    await Util.expectParseFailure(
      schema,
      null,
      `Expected ReadonlySet, actual null`
    )
    await Util.expectParseFailure(
      schema,
      new Set(["1", "a", "3"]),
      `/1 Expected string -> number, actual "a"`
    )
  })

  it("readonlySetFromSelf. encoder", async () => {
    const schema = T.readonlySetFromSelf(NumberFromString)
    await Util.expectEncodeSuccess(schema, new Set(), new Set())
    await Util.expectEncodeSuccess(schema, new Set([1, 2, 3]), new Set(["1", "2", "3"]))
  })

  it("readonlySetFromSelf. guard", () => {
    const schema = T.readonlySetFromSelf(T.string)
    const is = P.is(schema)
    expect(is(new Set())).toEqual(true)
    expect(is(new Set(["a", "b", "c"]))).toEqual(true)

    expect(is(new Set(["a", "b", 1]))).toEqual(false)
    expect(is(null)).toEqual(false)
    expect(is(undefined)).toEqual(false)
  })

  it("readonlySetFromSelf. pretty", () => {
    const schema = T.readonlySetFromSelf(T.string)
    const pretty = Pretty.to(schema)
    expect(pretty(new Set())).toEqual("new Set([])")
    expect(pretty(new Set(["a", "b"]))).toEqual(
      `new Set(["a", "b"])`
    )
  })

  it("readonlySet. property tests", () => {
    Util.roundtrip(T.readonlySet(T.number))
  })

  it("readonlySet. decoder", async () => {
    const schema = T.readonlySet(T.number)
    await Util.expectParseSuccess(schema, [], new Set([]))
    await Util.expectParseSuccess(schema, [1, 2, 3], new Set([1, 2, 3]))

    await Util.expectParseFailure(
      schema,
      null,
      `Expected a generic array, actual null`
    )
    await Util.expectParseFailure(schema, [1, "a"], `/1 Expected number, actual "a"`)
  })

  it("readonlySet. encoder", async () => {
    const schema = T.readonlySet(T.number)
    await Util.expectEncodeSuccess(schema, new Set(), [])
    await Util.expectEncodeSuccess(schema, new Set([1, 2, 3]), [1, 2, 3])
  })
})
