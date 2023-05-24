import { pipe } from "@effect/data/Function"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("extend", () => {
  it(`struct extend struct (dual)`, async () => {
    const schema = T.extend(T.struct({ a: T.string }), T.struct({ b: T.number }))
    await Util.expectParseSuccess(schema, { a: "a", b: 1 })
  })

  it(`struct with defaults extend struct`, async () => {
    const schema = pipe(
      T.struct({ a: T.optional(T.string).withDefault(() => ""), b: T.string }),
      T.extend(T.struct({ c: T.number }))
    )
    await Util.expectParseSuccess(schema, { b: "b", c: 1 }, { a: "", b: "b", c: 1 })
  })

  it(`struct extend struct with defaults`, async () => {
    const schema = pipe(
      T.struct({ a: T.number }),
      T.extend(
        T.struct({ b: T.string, c: T.optional(T.string).withDefault(() => "") })
      )
    )
    await Util.expectParseSuccess(schema, { a: 1, b: "b" }, { a: 1, b: "b", c: "" })
  })

  it(`struct with defaults extend struct with defaults `, async () => {
    const schema = pipe(
      T.struct({ a: T.optional(T.string).withDefault(() => ""), b: T.string }),
      T.extend(
        T.struct({ c: T.optional(T.number).withDefault(() => 0), d: T.boolean })
      )
    )
    await Util.expectParseSuccess(schema, { b: "b", d: true }, { a: "", b: "b", c: 0, d: true })
  })

  it(`union with defaults extend union with defaults `, async () => {
    const schema = pipe(
      T.union(
        T.struct({
          a: T.optional(T.string).withDefault(() => "a"),
          b: T.string
        }),
        T.struct({
          c: T.optional(T.string).withDefault(() => "c"),
          d: T.string
        })
      ),
      T.extend(
        T.union(
          T.struct({
            e: T.optional(T.string).withDefault(() => "e"),
            f: T.string
          }),
          T.struct({
            g: T.optional(T.string).withDefault(() => "g"),
            h: T.string
          })
        )
      )
    )
    await Util.expectParseSuccess(schema, { b: "b", f: "f" }, {
      a: "a",
      b: "b",
      e: "e",
      f: "f"
    })
    await Util.expectParseSuccess(schema, { d: "d", h: "h" }, {
      c: "c",
      d: "d",
      g: "g",
      h: "h"
    })
  })

  it(`struct extend union`, () => {
    const schema = pipe(
      T.struct({ b: T.boolean }),
      T.extend(T.union(
        T.struct({ a: T.literal("a") }),
        T.struct({ a: T.literal("b") })
      ))
    )
    const is = T.is(schema)

    expect(is({ a: "a", b: false })).toBe(true)
    expect(is({ a: "b", b: false })).toBe(true)

    expect(is({ a: "a" })).toBe(false)
    expect(is({ a: "b" })).toBe(false)
  })

  it(`union extend struct`, () => {
    const schema = pipe(
      T.union(
        T.struct({ a: T.literal("a") }),
        T.struct({ b: T.literal("b") })
      ),
      T.extend(T.struct({ c: T.boolean }))
    )
    const is = T.is(schema)

    expect(is({ a: "a", c: false })).toBe(true)
    expect(is({ b: "b", c: false })).toBe(true)

    expect(is({ a: "a" })).toBe(false)
    expect(is({ a: "b" })).toBe(false)
  })

  it(`union extend union`, () => {
    const schema = pipe(
      T.union(
        T.struct({ a: T.literal("a") }),
        T.struct({ a: T.literal("b") })
      ),
      T.extend(
        T.union(
          T.struct({ c: T.boolean }),
          T.struct({ d: T.number })
        )
      )
    )
    const is = T.is(schema)

    expect(is({ a: "a", c: false })).toBe(true)
    expect(is({ a: "b", d: 69 })).toBe(true)
    expect(is({ a: "a", d: 69 })).toBe(true)
    expect(is({ a: "b", c: false })).toBe(true)

    expect(is({ a: "a" })).toBe(false)
    expect(is({ a: "b" })).toBe(false)
    expect(is({ c: false })).toBe(false)
    expect(is({ d: 42 })).toBe(false)
  })

  // -------------------------------------------------------------------------------------
  // errors
  // -------------------------------------------------------------------------------------

  it("can only handle type literals or unions of type literals", () => {
    expect(() => pipe(T.string, T.extend(T.number))).toThrowError(
      new Error("`extend` can only handle type literals or unions of type literals")
    )
  })

  it(`extend/overlapping index signatures/ string`, () => {
    expect(() =>
      pipe(
        T.record(T.string, T.number),
        T.extend(T.record(T.string, T.boolean))
      )
    ).toThrowError(new Error("Duplicate index signature for type `string`"))
  })

  it(`extend/overlapping index signatures/ symbol`, () => {
    expect(() =>
      pipe(
        T.record(T.symbol, T.number),
        T.extend(T.record(T.symbol, T.boolean))
      )
    ).toThrowError(new Error("Duplicate index signature for type `symbol`"))
  })

  it("extend/overlapping index signatures/ refinements", () => {
    expect(() =>
      pipe(
        T.record(T.string, T.number),
        T.extend(T.record(pipe(T.string, T.minLength(2)), T.boolean))
      )
    ).toThrowError(new Error("Duplicate index signature for type `string`"))
  })

  it(`overlapping property signatures`, () => {
    expect(() =>
      pipe(
        T.struct({ a: T.literal("a") }),
        T.extend(T.struct({ a: T.string }))
      )
    ).toThrowError(new Error("Duplicate property signature a"))
    expect(() =>
      pipe(
        T.struct({ a: T.literal("a") }),
        T.extend(
          T.union(
            T.struct({ a: T.string }),
            T.struct({ b: T.number })
          )
        )
      )
    ).toThrowError(new Error("Duplicate property signature a"))
  })

  it("struct extend record(string, string)", async () => {
    const schema = pipe(
      T.struct({ a: T.string }),
      T.extend(T.record(T.string, T.string))
    )
    await Util.expectParseSuccess(schema, { a: "a" })
    await Util.expectParseSuccess(schema, { a: "a", b: "b" })

    await Util.expectParseFailure(schema, {}, "/a is missing")
    await Util.expectParseFailure(schema, { b: "b" }, "/a is missing")
    await Util.expectParseFailure(schema, { a: 1 }, "/a Expected string, actual 1")
    await Util.expectParseFailure(
      schema,
      { a: "a", b: 1 },
      "/b Expected string, actual 1"
    )
  })
})
