import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("extend", () => {
  it(`struct extend struct (dual)`, async () => {
    const schema = S.extend(S.struct({ a: S.string }), S.struct({ b: S.number }))
    await Util.expectParseSuccess(schema, { a: "a", b: 1 })
  })

  it(`struct with defaults extend struct`, async () => {
    const schema = pipe(
      T.struct({ a: T.optional(S.string).withDefault(() => ""), b: S.string }),
      T.extend(S.struct({ c: S.number }))
    )
    await Util.expectParseSuccess(schema, { b: "b", c: 1 }, { a: "", b: "b", c: 1 })
  })

  it(`struct extend struct with defaults`, async () => {
    const schema = pipe(
      S.struct({ a: S.number }),
      T.extend(
        T.struct({ b: S.string, c: T.optional(S.string).withDefault(() => "") })
      )
    )
    await Util.expectParseSuccess(schema, { a: 1, b: "b" }, { a: 1, b: "b", c: "" })
  })

  it(`struct with defaults extend struct with defaults `, async () => {
    const schema = pipe(
      T.struct({ a: T.optional(S.string).withDefault(() => ""), b: S.string }),
      T.extend(
        T.struct({ c: T.optional(S.number).withDefault(() => 0), d: S.boolean })
      )
    )
    await Util.expectParseSuccess(schema, { b: "b", d: true }, { a: "", b: "b", c: 0, d: true })
  })

  it(`union with defaults extend union with defaults `, async () => {
    const schema = pipe(
      T.union(
        T.struct({
          a: T.optional(S.string).withDefault(() => "a"),
          b: S.string
        }),
        T.struct({
          c: T.optional(S.string).withDefault(() => "c"),
          d: S.string
        })
      ),
      T.extend(
        T.union(
          T.struct({
            e: T.optional(S.string).withDefault(() => "e"),
            f: S.string
          }),
          T.struct({
            g: T.optional(S.string).withDefault(() => "g"),
            h: S.string
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
      S.struct({ b: S.boolean }),
      S.extend(S.union(
        S.struct({ a: S.literal("a") }),
        S.struct({ a: S.literal("b") })
      ))
    )
    const is = S.is(schema)

    expect(is({ a: "a", b: false })).toBe(true)
    expect(is({ a: "b", b: false })).toBe(true)

    expect(is({ a: "a" })).toBe(false)
    expect(is({ a: "b" })).toBe(false)
  })

  it(`union extend struct`, () => {
    const schema = pipe(
      S.union(
        S.struct({ a: S.literal("a") }),
        S.struct({ b: S.literal("b") })
      ),
      S.extend(S.struct({ c: S.boolean }))
    )
    const is = S.is(schema)

    expect(is({ a: "a", c: false })).toBe(true)
    expect(is({ b: "b", c: false })).toBe(true)

    expect(is({ a: "a" })).toBe(false)
    expect(is({ a: "b" })).toBe(false)
  })

  it(`union extend union`, () => {
    const schema = pipe(
      S.union(
        S.struct({ a: S.literal("a") }),
        S.struct({ a: S.literal("b") })
      ),
      S.extend(
        S.union(
          S.struct({ c: S.boolean }),
          S.struct({ d: S.number })
        )
      )
    )
    const is = S.is(schema)

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
    expect(() => pipe(S.string, T.extend(S.number))).toThrowError(
      new Error("`extend` can only handle type literals or unions of type literals")
    )
  })

  it(`extend/overlapping index signatures/ string`, () => {
    expect(() =>
      pipe(
        T.record(S.string, S.number),
        T.extend(T.record(S.string, S.boolean))
      )
    ).toThrowError(new Error("Duplicate index signature for type `string`"))
  })

  it(`extend/overlapping index signatures/ symbol`, () => {
    expect(() =>
      pipe(
        T.record(S.symbol, S.number),
        T.extend(T.record(S.symbol, S.boolean))
      )
    ).toThrowError(new Error("Duplicate index signature for type `symbol`"))
  })

  it("extend/overlapping index signatures/ refinements", () => {
    expect(() =>
      pipe(
        T.record(S.string, S.number),
        T.extend(T.record(pipe(S.string, S.minLength(2)), S.boolean))
      )
    ).toThrowError(new Error("Duplicate index signature for type `string`"))
  })

  it(`overlapping property signatures`, () => {
    expect(() =>
      pipe(
        S.struct({ a: S.literal("a") }),
        T.extend(S.struct({ a: S.string }))
      )
    ).toThrowError(new Error("Duplicate property signature a"))
    expect(() =>
      pipe(
        S.struct({ a: S.literal("a") }),
        T.extend(
          S.union(
            S.struct({ a: S.string }),
            S.struct({ b: S.number })
          )
        )
      )
    ).toThrowError(new Error("Duplicate property signature a"))
  })

  it("struct extend record(string, string)", async () => {
    const schema = pipe(
      S.struct({ a: S.string }),
      T.extend(T.record(S.string, S.string))
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
