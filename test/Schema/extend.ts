import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("extend", () => {
  it(`struct extend struct (dual)`, async () => {
    const schema = S.extend(S.struct({ a: S.string }), S.struct({ b: S.number }))
    await Util.expectParseSuccess(schema, { a: "a", b: 1 })
  })

  it(`struct extend union`, () => {
    const schema = S.struct({ b: S.boolean }).pipe(
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
    const schema = S.union(
      S.struct({ a: S.literal("a") }),
      S.struct({ b: S.literal("b") })
    ).pipe(
      S.extend(S.struct({ c: S.boolean }))
    )
    const is = S.is(schema)

    expect(is({ a: "a", c: false })).toBe(true)
    expect(is({ b: "b", c: false })).toBe(true)

    expect(is({ a: "a" })).toBe(false)
    expect(is({ a: "b" })).toBe(false)
  })

  it(`union extend union`, () => {
    const schema = S.union(
      S.struct({ a: S.literal("a") }),
      S.struct({ a: S.literal("b") })
    ).pipe(
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
    expect(() => S.string.pipe(S.extend(S.number))).toThrowError(
      new Error("`extend` can only handle type literals or unions of type literals")
    )
  })

  it(`extend/overlapping index signatures/ string`, () => {
    expect(() =>
      S.record(S.string, S.number).pipe(
        S.extend(S.record(S.string, S.boolean))
      )
    ).toThrowError(new Error("Duplicate index signature for type `string`"))
  })

  it(`extend/overlapping index signatures/ symbol`, () => {
    expect(() =>
      S.record(S.symbol, S.number).pipe(
        S.extend(S.record(S.symbol, S.boolean))
      )
    ).toThrowError(new Error("Duplicate index signature for type `symbol`"))
  })

  it("extend/overlapping index signatures/ refinements", () => {
    expect(() =>
      S.record(S.string, S.number).pipe(
        S.extend(S.record(S.string.pipe(S.minLength(2)), S.boolean))
      )
    ).toThrowError(new Error("Duplicate index signature for type `string`"))
  })

  it(`overlapping property signatures`, () => {
    expect(() =>
      S.struct({ a: S.literal("a") }).pipe(
        S.extend(S.struct({ a: S.string }))
      )
    ).toThrowError(new Error("Duplicate property signature a"))
    expect(() =>
      S.struct({ a: S.literal("a") }).pipe(
        S.extend(
          S.union(
            S.struct({ a: S.string }),
            S.struct({ b: S.number })
          )
        )
      )
    ).toThrowError(new Error("Duplicate property signature a"))
  })

  it("struct extend record(string, string)", async () => {
    const schema = S.struct({ a: S.string }).pipe(
      S.extend(S.record(S.string, S.string))
    )
    await Util.expectParseSuccess(schema, { a: "a" })
    await Util.expectParseSuccess(schema, { a: "a", b: "b" })

    await Util.expectParseFailure(schema, {}, "/a is missing")
    await Util.expectParseFailure(schema, { b: "b" }, "/a is missing")
    await Util.expectParseFailure(schema, { a: 1 }, "/a Expected a string, actual 1")
    await Util.expectParseFailure(
      schema,
      { a: "a", b: 1 },
      "/b Expected a string, actual 1"
    )
  })
})
