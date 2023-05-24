import { pipe } from "@effect/data/Function"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("onExcess", () => {
  it("ignore should not change tuple behaviour", async () => {
    const schema = T.tuple(T.number)
    await Util.expectParseFailure(schema, [1, "b"], "/1 is unexpected")
    await Util.expectEncodeFailure(
      schema,
      [1, "b"] as any,
      `/1 is unexpected`
    )
  })

  describe.concurrent("union should choose the output with more info", () => {
    it("structs", async () => {
      const a = T.struct({ a: T.optional(T.number) })
      const b = T.struct({ a: T.optional(T.number), b: T.optional(T.string) })
      const schema = T.union(a, b)
      await Util.expectParseSuccess(
        schema,
        { a: 1, b: "b", c: true },
        { a: 1, b: "b" }
      )
      await Util.expectParseFailure(
        schema,
        { a: 1, b: "b", c: true },
        `union member: /c is unexpected, union member: /b is unexpected`,
        Util.onExcessPropertyError
      )
      await Util.expectEncodeSuccess(
        schema,
        { a: 1, b: "b" },
        { a: 1, b: "b" }
      )
      await Util.expectEncodeSuccess(
        schema,
        { a: 1, b: "b" },
        { a: 1, b: "b" },
        Util.onExcessPropertyError
      )
    })

    it("tuples", async () => {
      const a = T.tuple(T.number)
      const b = pipe(T.tuple(T.number), T.optionalElement(T.string))
      const schema = T.union(a, b)
      await Util.expectParseFailure(
        schema,
        [1, "b", true],
        `union member: /2 is unexpected, union member: /1 is unexpected`
      )
      await Util.expectParseFailure(
        schema,
        [1, "b", true],
        `union member: /2 is unexpected, union member: /1 is unexpected`,
        Util.onExcessPropertyError
      )
      await Util.expectEncodeSuccess(
        schema,
        [1, "b"],
        [1, "b"]
      )
      await Util.expectEncodeSuccess(
        schema,
        [1, "b"],
        [1, "b"],
        Util.onExcessPropertyError
      )
    })
  })

  describe.concurrent(`onExcessProperty = "ignore" option`, () => {
    it("tuple of a struct", async () => {
      const schema = T.tuple(T.struct({ b: T.number }))
      await Util.expectParseSuccess(
        schema,
        [{ b: 1, c: "c" }],
        [{ b: 1 }]
      )
    })

    it("tuple rest element of a struct", async () => {
      const schema = T.array(T.struct({ b: T.number }))
      await Util.expectParseSuccess(
        schema,
        [{ b: 1, c: "c" }],
        [{ b: 1 }]
      )
    })

    it("tuple. post rest elements of a struct", async () => {
      const schema = pipe(T.array(T.string), T.element(T.struct({ b: T.number })))
      await Util.expectParseSuccess(schema, [{ b: 1 }])
      await Util.expectParseSuccess(
        schema,
        [{ b: 1, c: "c" }],
        [{ b: 1 }]
      )
    })

    it("struct excess property signatures", async () => {
      const schema = T.struct({ a: T.number })
      await Util.expectParseSuccess(
        schema,
        { a: 1, b: "b" },
        { a: 1 }
      )
    })

    it("struct nested struct", async () => {
      const schema = T.struct({ a: T.struct({ b: T.number }) })
      await Util.expectParseSuccess(
        schema,
        { a: { b: 1, c: "c" } },
        {
          a: { b: 1 }
        }
      )
    })

    it("record of struct", async () => {
      const schema = T.record(T.string, T.struct({ b: T.number }))
      await Util.expectParseSuccess(
        schema,
        { a: { b: 1, c: "c" } },
        { a: { b: 1 } }
      )
    })
  })
})
