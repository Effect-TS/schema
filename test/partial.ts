import { identity, pipe } from "@effect/data/Function"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

const NumberFromString = T.NumberFromString

describe.concurrent("partial", () => {
  it("struct", async () => {
    const schema = T.partial(T.struct({ a: T.number }))
    await Util.expectParseSuccess(schema, {})
    await Util.expectParseSuccess(schema, { a: 1 })

    await Util.expectParseFailure(
      schema,
      { a: undefined },
      `/a Expected number, actual undefined`
    )
  })

  it("tuple", async () => {
    const schema = T.partial(T.tuple(T.string, T.number))
    await Util.expectParseSuccess(schema, [])
    await Util.expectParseSuccess(schema, ["a"])
    await Util.expectParseSuccess(schema, ["a", 1])
  })

  it("array", async () => {
    const schema = T.partial(T.array(T.number))
    await Util.expectParseSuccess(schema, [])
    await Util.expectParseSuccess(schema, [1])
    await Util.expectParseSuccess(schema, [undefined])

    await Util.expectParseFailureTree(
      schema,
      ["a"],
      `error(s) found
└─ [0]
   ├─ union member
   │  └─ Expected number, actual "a"
   └─ union member
      └─ Expected undefined, actual "a"`
    )
  })

  it("union", async () => {
    const schema = T.partial(T.union(T.string, T.array(T.number)))
    await Util.expectParseSuccess(schema, "a")
    await Util.expectParseSuccess(schema, [])
    await Util.expectParseSuccess(schema, [1])
    await Util.expectParseSuccess(schema, [undefined])

    await Util.expectParseFailureTree(
      schema,
      ["a"],
      `error(s) found
├─ union member
│  └─ [0]
│     ├─ union member
│     │  └─ Expected number, actual "a"
│     └─ union member
│        └─ Expected undefined, actual "a"
└─ union member
   └─ Expected string, actual ["a"]`
    )
  })

  it("tuple/ e", async () => {
    const schema = T.partial(T.tuple(NumberFromString))
    await Util.expectParseSuccess(schema, ["1"], [1])
    await Util.expectParseSuccess(schema, [], [])
  })

  it("tuple/ e + r", async () => {
    const schema = T.partial(pipe(T.tuple(NumberFromString), T.rest(NumberFromString)))
    await Util.expectParseSuccess(schema, ["1"], [1])
    await Util.expectParseSuccess(schema, [], [])
    await Util.expectParseSuccess(schema, ["1", "2"], [1, 2])
    await Util.expectParseSuccess(schema, ["1", undefined], [1, undefined])
  })

  it("record", async () => {
    const schema = T.partial(T.record(T.string, NumberFromString))
    await Util.expectParseSuccess(schema, {}, {})
    await Util.expectParseSuccess(schema, { a: "1" }, { a: 1 })
  })

  it("lazy", async () => {
    interface A {
      readonly a?: null | A
    }
    const schema: T.Transform<A, A> = T.partial(T.lazy(() =>
      T.struct({
        a: T.union(T.null, schema)
      })
    ))
    await Util.expectParseSuccess(schema, {})
    await Util.expectParseSuccess(schema, { a: null })
    await Util.expectParseSuccess(schema, { a: {} })
    await Util.expectParseSuccess(schema, { a: { a: null } })
    await Util.expectParseFailure(
      schema,
      { a: 1 },
      "/a union member: Expected a generic object, actual 1, union member: Expected null, actual 1"
    )
  })

  it("declarations should throw", async () => {
    expect(() => T.partial(T.optionFromSelf(T.string))).toThrowError(
      new Error("`partial` cannot handle declarations")
    )
  })

  it("refinements should throw", async () => {
    expect(() => T.partial(pipe(T.string, T.minLength(2)))).toThrowError(
      new Error("`partial` cannot handle refinements")
    )
  })

  it("transformations should throw", async () => {
    expect(() => T.partial(T.transform(T.string, T.string, identity, identity))).toThrowError(
      new Error("`partial` cannot handle transformations")
    )
  })
})
