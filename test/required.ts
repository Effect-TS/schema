import { identity, pipe } from "@effect/data/Function"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

const NumberFromString = T.NumberFromString

describe.concurrent("required", () => {
  it("string", () => {
    expect(T.required(T.string).ast).toEqual(T.string.ast)
  })

  it("struct", async () => {
    const schema = T.required(T.struct({
      a: T.optional(pipe(NumberFromString, T.greaterThan(0)))
    }))

    await Util.expectParseSuccess(schema, { a: "1" }, { a: 1 })
    await Util.expectParseFailure(schema, {}, "/a is missing")
    await Util.expectParseFailure(
      schema,
      { a: "-1" },
      "/a Expected a number greater than 0, actual -1"
    )
  })

  it("tuple/ e?", async () => {
    // type A = [string?]
    // type B = Required<A>
    const schema = T.required(pipe(T.tuple(), T.optionalElement(NumberFromString)))

    await Util.expectParseSuccess(schema, ["1"], [1])
    await Util.expectParseFailure(schema, [], "/0 is missing")
  })

  it("tuple/ e + e?", async () => {
    const schema = T.required(pipe(T.tuple(NumberFromString), T.optionalElement(T.string)))

    await Util.expectParseSuccess(schema, ["0", ""], [0, ""])
    await Util.expectParseFailure(schema, ["0"], "/1 is missing")
  })

  it("tuple/ e + r + e", async () => {
    // type A = readonly [string, ...Array<number>, boolean]
    // type B = Required<A> // [string, ...(number | boolean)[], number | boolean]

    const schema = T.required(pipe(T.tuple(T.string), T.rest(T.number), T.element(T.boolean)))

    await Util.expectParseSuccess(schema, ["", 0], ["", 0])
    await Util.expectParseSuccess(schema, ["", true], ["", true])
    await Util.expectParseSuccess(schema, ["", true, 0], ["", true, 0])
    await Util.expectParseSuccess(schema, ["", 0, true], ["", 0, true])

    await Util.expectParseFailure(schema, [], "/0 is missing")
    await Util.expectParseFailure(schema, [""], "/1 is missing")
  })

  it("tuple/ e + r + 2e", async () => {
    // type A = readonly [string, ...Array<number>, boolean, boolean]
    // type B = Required<A> // [string, ...(number | boolean)[], number | boolean, number | boolean]

    const schema = T.required(
      pipe(T.tuple(T.string), T.rest(T.number), T.element(T.boolean), T.element(T.boolean))
    )

    await Util.expectParseSuccess(schema, ["", 0, true])
    await Util.expectParseSuccess(schema, ["", 0, true, false])
    await Util.expectParseSuccess(schema, ["", 0, 1, 2, 3, true, false])

    await Util.expectParseFailure(schema, [], "/0 is missing")
    await Util.expectParseFailure(schema, [""], "/1 is missing")
    await Util.expectParseFailure(schema, ["", true], "/2 is missing")
    await Util.expectParseFailure(
      schema,
      ["", 0, "a"],
      `/2 union member: Expected number, actual "a", union member: Expected boolean, actual "a"`
    )
  })

  it("union", async () => {
    const schema = T.required(T.union(
      T.struct({ a: T.optional(T.string) }),
      T.struct({ b: T.optional(T.number) })
    ))
    await Util.expectParseSuccess(schema, { a: "a" })
    await Util.expectParseSuccess(schema, { b: 1 })
    await Util.expectParseFailure(
      schema,
      {},
      "union member: /a is missing, union member: /b is missing"
    )
  })

  it("lazy", async () => {
    interface A {
      readonly a: null | A
    }
    const schema: T.Transform<A, A> = T.required(T.lazy(() =>
      T.struct({
        a: T.optional(T.union(T.null, schema))
      })
    ))
    await Util.expectParseSuccess(schema, { a: null })
    await Util.expectParseSuccess(schema, { a: { a: null } })
    await Util.expectParseFailure(schema, {}, "/a is missing")
    await Util.expectParseFailure(
      schema,
      { a: {} },
      "/a union member: /a is missing, union member: Expected null, actual {}"
    )
  })

  it("declarations should throw", async () => {
    expect(() => T.required(T.optionFromSelf(T.string))).toThrowError(
      new Error("`required` cannot handle declarations")
    )
  })

  it("refinements should throw", async () => {
    expect(() => T.required(pipe(T.string, T.minLength(2)))).toThrowError(
      new Error("`required` cannot handle refinements")
    )
  })

  it("transformations should throw", async () => {
    expect(() => T.required(T.transform(T.string, T.string, identity, identity))).toThrowError(
      new Error("`required` cannot handle transformations")
    )
  })
})
