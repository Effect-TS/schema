import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import type { ParseOptions } from "@effect/schema/AST"
import * as P from "@effect/schema/Parser"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

// raises an error while encoding from a number if the string is not a char
const NumberFromString = pipe(S.string, S.maxLength(1), S.numberFromString)

// raises an error while encoding if the string is not a char
const MustChar = pipe(S.string, S.maxLength(1))

describe.concurrent("Encoder", () => {
  it("encode", () => {
    const schema = NumberFromString
    expect(P.encode(schema)(1)).toEqual("1")
    expect(() => P.encode(schema)(10)).toThrowError(
      new Error(`error(s) found
└─ Expected a string at most 1 character(s) long, actual "10"`)
    )
  })

  it("encodeOption", () => {
    const schema = pipe(S.string, S.maxLength(1), S.numberFromString)
    expect(P.encodeOption(schema)(1)).toEqual(O.some("1"))
    expect(P.encodeOption(schema)(10)).toEqual(O.none())
  })

  it("never", async () => {
    const schema = S.never
    await Util.expectEncodingFailure(schema, 1 as any as never, "Expected never, actual 1")
  })

  it("templateLiteral. a${string}b", async () => {
    const schema = S.templateLiteral(S.literal("a"), S.string, S.literal("b"))
    Util.expectEncodingSuccess(schema, "acb", "acb")
  })

  it("string", async () => {
    const schema = S.string
    Util.expectEncodingSuccess(schema, "a", "a")
  })

  it("number", async () => {
    const schema = S.number
    Util.expectEncodingSuccess(schema, 1, 1)
  })

  it("boolean", async () => {
    const schema = S.boolean
    Util.expectEncodingSuccess(schema, true, true)
    Util.expectEncodingSuccess(schema, false, false)
  })

  it("bigint", async () => {
    const schema = S.bigint
    Util.expectEncodingSuccess(schema, 1n, 1n)
  })

  it("symbol", async () => {
    const a = Symbol.for("@effect/schema/test/a")
    const schema = S.symbol
    Util.expectEncodingSuccess(schema, a, a)
  })

  it("object", async () => {
    const schema = S.object
    Util.expectEncodingSuccess(schema, {}, {})
    Util.expectEncodingSuccess(schema, [], [])
    Util.expectEncodingSuccess(schema, [1, 2, 3], [1, 2, 3])
  })

  it("literal", async () => {
    const schema = S.literal(null)
    Util.expectEncodingSuccess(schema, null, null)
  })

  describe.concurrent("enums", () => {
    it("Numeric enums", async () => {
      enum Fruits {
        Apple,
        Banana
      }
      const schema = S.enums(Fruits)
      Util.expectEncodingSuccess(schema, Fruits.Apple, 0)
      Util.expectEncodingSuccess(schema, Fruits.Banana, 1)
    })

    it("String enums", async () => {
      enum Fruits {
        Apple = "apple",
        Banana = "banana",
        Cantaloupe = 0
      }
      const schema = S.enums(Fruits)
      Util.expectEncodingSuccess(schema, Fruits.Apple, "apple")
      Util.expectEncodingSuccess(schema, Fruits.Banana, "banana")
      Util.expectEncodingSuccess(schema, Fruits.Cantaloupe, 0)
    })

    it("Const enums", async () => {
      const Fruits = {
        Apple: "apple",
        Banana: "banana",
        Cantaloupe: 3
      } as const
      const schema = S.enums(Fruits)
      Util.expectEncodingSuccess(schema, Fruits.Apple, "apple")
      Util.expectEncodingSuccess(schema, Fruits.Banana, "banana")
      Util.expectEncodingSuccess(schema, Fruits.Cantaloupe, 3)
    })
  })

  it("tuple/empty", async () => {
    const schema = S.tuple()
    Util.expectEncodingSuccess(schema, [], [])
  })

  it("tuple/e", async () => {
    const schema = S.tuple(NumberFromString)
    Util.expectEncodingSuccess(schema, [1], ["1"])
    await Util.expectEncodingFailure(
      schema,
      [10],
      `/0 Expected a string at most 1 character(s) long, actual "10"`
    )
    await Util.expectEncodingFailure(schema, [1, "b"] as any, `/1 is unexpected`)
  })

  it("tuple/e with undefined", async () => {
    const schema = S.tuple(S.union(NumberFromString, S.undefined))
    Util.expectEncodingSuccess(schema, [1], ["1"])
    Util.expectEncodingSuccess(schema, [undefined], [undefined])
    await Util.expectEncodingFailure(schema, [1, "b"] as any, `/1 is unexpected`)
  })

  it("tuple/e?", async () => {
    const schema = pipe(S.tuple(), S.optionalElement(NumberFromString))
    Util.expectEncodingSuccess(schema, [], [])
    Util.expectEncodingSuccess(schema, [1], ["1"])
    await Util.expectEncodingFailure(
      schema,
      [10],
      `/0 Expected a string at most 1 character(s) long, actual "10"`
    )
    await Util.expectEncodingFailure(schema, [1, "b"] as any, `/1 is unexpected`)
  })

  it("tuple/e? with undefined", async () => {
    const schema = pipe(S.tuple(), S.optionalElement(S.union(NumberFromString, S.undefined)))
    Util.expectEncodingSuccess(schema, [], [])
    Util.expectEncodingSuccess(schema, [1], ["1"])
    Util.expectEncodingSuccess(schema, [undefined], [undefined])
    await Util.expectEncodingFailure(schema, [1, "b"] as any, `/1 is unexpected`)
  })

  it("tuple/e + e?", async () => {
    const schema = pipe(S.tuple(S.string), S.optionalElement(NumberFromString))
    Util.expectEncodingSuccess(schema, ["a"], ["a"])
    Util.expectEncodingSuccess(schema, ["a", 1], ["a", "1"])
  })

  it("tuple/e + r", async () => {
    const schema = pipe(S.tuple(S.string), S.rest(NumberFromString))
    Util.expectEncodingSuccess(schema, ["a"], ["a"])
    Util.expectEncodingSuccess(schema, ["a", 1], ["a", "1"])
    Util.expectEncodingSuccess(schema, ["a", 1, 2], ["a", "1", "2"])
  })

  it("tuple/e? + r", async () => {
    const schema = pipe(S.tuple(), S.optionalElement(S.string), S.rest(NumberFromString))
    Util.expectEncodingSuccess(schema, [], [])
    Util.expectEncodingSuccess(schema, ["a"], ["a"])
    Util.expectEncodingSuccess(schema, ["a", 1], ["a", "1"])
    Util.expectEncodingSuccess(schema, ["a", 1, 2], ["a", "1", "2"])
  })

  it("tuple/r", async () => {
    const schema = S.array(NumberFromString)
    Util.expectEncodingSuccess(schema, [], [])
    Util.expectEncodingSuccess(schema, [1], ["1"])
    Util.expectEncodingSuccess(schema, [1, 2], ["1", "2"])
    await Util.expectEncodingFailure(
      schema,
      [10],
      `/0 Expected a string at most 1 character(s) long, actual "10"`
    )
  })

  it("tuple/r + e", async () => {
    const schema = pipe(S.array(S.string), S.element(NumberFromString))
    Util.expectEncodingSuccess(schema, [1], ["1"])
    Util.expectEncodingSuccess(schema, ["a", 1], ["a", "1"])
    Util.expectEncodingSuccess(schema, ["a", "b", 1], ["a", "b", "1"])
    await Util.expectEncodingFailure(schema, [] as any, `/0 is missing`)
    await Util.expectEncodingFailure(
      schema,
      [10],
      `/0 Expected a string at most 1 character(s) long, actual "10"`
    )
  })

  it("tuple/e + r + e", async () => {
    const schema = pipe(S.tuple(S.string), S.rest(NumberFromString), S.element(S.boolean))
    Util.expectEncodingSuccess(schema, ["a", true], ["a", true])
    Util.expectEncodingSuccess(schema, ["a", 1, true], ["a", "1", true])
    Util.expectEncodingSuccess(schema, ["a", 1, 2, true], ["a", "1", "2", true])
  })

  it("struct/ required property signature", async () => {
    const schema = S.struct({ a: S.number })
    Util.expectEncodingSuccess(schema, { a: 1 }, { a: 1 })
    await Util.expectEncodingFailure(schema, { a: 1, b: "b" } as any, `/b is unexpected`)
  })

  it("struct/ required property signature with undefined", async () => {
    const schema = S.struct({ a: S.union(S.number, S.undefined) })
    Util.expectEncodingSuccess(schema, { a: 1 }, { a: 1 })
    Util.expectEncodingSuccess(schema, { a: undefined }, { a: undefined })
    await Util.expectEncodingFailure(schema, { a: 1, b: "b" } as any, `/b is unexpected`)
  })

  it("struct/ optional property signature", async () => {
    const schema = S.struct({ a: S.optional(S.number) })
    Util.expectEncodingSuccess(schema, {}, {})
    Util.expectEncodingSuccess(schema, { a: 1 }, { a: 1 })
    await Util.expectEncodingFailure(schema, { a: 1, b: "b" } as any, `/b is unexpected`)
  })

  it("struct/ optional property signature with undefined", async () => {
    const schema = S.struct({ a: S.optional(S.union(S.number, S.undefined)) })
    Util.expectEncodingSuccess(schema, {}, {})
    Util.expectEncodingSuccess(schema, { a: 1 }, { a: 1 })
    Util.expectEncodingSuccess(schema, { a: undefined }, { a: undefined })
    await Util.expectEncodingFailure(schema, { a: 1, b: "b" } as any, `/b is unexpected`)
  })

  it("struct/ should handle symbols as keys", async () => {
    const a = Symbol.for("@effect/schema/test/a")
    const schema = S.struct({ [a]: S.string })
    Util.expectEncodingSuccess(schema, { [a]: "a" }, { [a]: "a" })
  })

  it("record/ key error", async () => {
    const schema = S.record(MustChar, S.string)
    await Util.expectEncodingFailure(
      schema,
      { aa: "a" },
      `/aa Expected a string at most 1 character(s) long, actual "aa"`
    )
  })

  it("record/ value error", async () => {
    const schema = S.record(S.string, MustChar)
    await Util.expectEncodingFailure(
      schema,
      { a: "aa" },
      `/a Expected a string at most 1 character(s) long, actual "aa"`
    )
  })

  it("extend/record/ record(string, NumberFromString)", async () => {
    const schema = pipe(
      S.struct({ a: S.number }),
      S.extend(S.record(S.string, NumberFromString))
    )
    Util.expectEncodingSuccess(schema, { a: 1 }, { a: 1 })
    Util.expectEncodingSuccess(schema, { a: 1, b: 1 }, { a: 1, b: "1" })
  })

  it("extend/record/ record(symbol, NumberFromString)", async () => {
    const b = Symbol.for("@effect/schema/test/b")
    const schema = pipe(
      S.struct({ a: S.number }),
      S.extend(S.record(S.symbol, NumberFromString))
    )
    Util.expectEncodingSuccess(schema, { a: 1 }, { a: 1 })
    Util.expectEncodingSuccess(schema, { a: 1, [b]: 1 }, { a: 1, [b]: "1" })
  })

  it("union", async () => {
    const schema = S.union(S.string, NumberFromString)
    Util.expectEncodingSuccess(schema, "a", "a")
    Util.expectEncodingSuccess(schema, 1, "1")
  })

  it("union/ more required property signatures", async () => {
    const a = S.struct({ a: S.string })
    const ab = S.struct({ a: S.string, b: S.number })
    const schema = S.union(a, ab)
    Util.expectEncodingSuccess(schema, { a: "a", b: 1 }, { a: "a", b: 1 })
  })

  it("union/ optional property signatures", async () => {
    const ab = S.struct({ a: S.string, b: S.optional(S.number) })
    const ac = S.struct({ a: S.string, c: S.optional(S.number) })
    const schema = S.union(ab, ac)
    Util.expectEncodingSuccess(schema, { a: "a", c: 1 }, { a: "a", c: 1 })
  })

  describe.concurrent("partial", async () => {
    it("struct", () => {
      const schema = pipe(S.struct({ a: S.number }), S.partial)
      Util.expectEncodingSuccess(schema, {}, {})
      Util.expectEncodingSuccess(schema, { a: 1 }, { a: 1 })
    })

    it("tuple", async () => {
      const schema = pipe(S.tuple(S.string, S.number), S.partial)
      Util.expectEncodingSuccess(schema, [], [])
      Util.expectEncodingSuccess(schema, ["a"], ["a"])
      Util.expectEncodingSuccess(schema, ["a", 1], ["a", 1])
    })

    it("array", async () => {
      const schema = pipe(S.array(S.number), S.partial)
      Util.expectEncodingSuccess(schema, [], [])
      Util.expectEncodingSuccess(schema, [1], [1])
      Util.expectEncodingSuccess(schema, [undefined], [undefined])
    })

    it("union", async () => {
      const schema = pipe(S.union(S.string, S.array(S.number)), S.partial)
      Util.expectEncodingSuccess(schema, "a", "a")
      Util.expectEncodingSuccess(schema, [], [])
      Util.expectEncodingSuccess(schema, [1], [1])
      Util.expectEncodingSuccess(schema, [undefined], [undefined])
    })
  })

  it("lazy", async () => {
    interface A {
      readonly a: number
      readonly as: ReadonlyArray<A>
    }
    interface FromA {
      readonly a: string
      readonly as: ReadonlyArray<FromA>
    }
    const schema: S.Schema<FromA, A> = S.lazy<FromA, A>(() =>
      S.struct({
        a: NumberFromString,
        as: S.array(schema)
      })
    )
    Util.expectEncodingSuccess(schema, { a: 1, as: [] }, { a: "1", as: [] })
    Util.expectEncodingSuccess(schema, { a: 1, as: [{ a: 2, as: [] }] }, {
      a: "1",
      as: [{ a: "2", as: [] }]
    })
  })

  // ---------------------------------------------
  // isUnexpectedAllowed option
  // ---------------------------------------------

  const isUnexpectedAllowed: ParseOptions = {
    isUnexpectedAllowed: true
  }

  it("isUnexpectedAllowed/union/struct choose the output more info", async () => {
    const a = S.struct({ a: S.optional(S.number) })
    const b = S.struct({ a: S.optional(S.number), b: S.optional(S.string) })
    const schema = S.union(a, b)
    Util.expectEncodingSuccess(
      schema,
      { a: 1, b: "b", c: true } as any,
      {
        a: 1,
        b: "b"
      },
      isUnexpectedAllowed
    )
  })

  it("isUnexpectedAllowed/union/tuple choose the output more info", async () => {
    const a = S.tuple(S.number)
    const b = pipe(S.tuple(S.number), S.optionalElement(S.string))
    const schema = S.union(a, b)
    Util.expectEncodingSuccess(
      schema,
      [1, "b", true] as any,
      [1, "b"],
      isUnexpectedAllowed
    )
  })

  it("isUnexpectedAllowed/tuple unexpected indexes", async () => {
    const schema = S.tuple(S.string)
    Util.expectEncodingSuccess(
      schema,
      ["a", 1, 2] as any,
      ["a"],
      isUnexpectedAllowed
    )
  })

  it("struct/empty", async () => {
    const schema = S.struct({})
    Util.expectEncodingSuccess(schema, {}, {})
    Util.expectEncodingSuccess(schema, { a: 1 }, { a: 1 })
    Util.expectEncodingSuccess(schema, [], [])

    await Util.expectEncodingFailure(
      schema,
      null as any,
      `Expected <anonymous type literal schema>, actual null`
    )
  })

  // ---------------------------------------------
  // allErrors option
  // ---------------------------------------------

  const allErrors: ParseOptions = {
    allErrors: true
  }

  it("allErrors/tuple: unexpected indexes", async () => {
    const schema = S.tuple()
    await Util.expectEncodingFailure(
      schema,
      [1, 1] as any,
      `/0 is unexpected, /1 is unexpected`,
      allErrors
    )
  })

  it("allErrors/tuple: wrong type for values", async () => {
    const schema = S.tuple(NumberFromString, NumberFromString)
    await Util.expectEncodingFailure(
      schema,
      [10, 10],
      `/0 Expected a string at most 1 character(s) long, actual "10", /1 Expected a string at most 1 character(s) long, actual "10"`,
      allErrors
    )
  })

  it("allErrors/tuple/rest: wrong type for values", async () => {
    const schema = S.array(NumberFromString)
    await Util.expectEncodingFailure(
      schema,
      [10, 10],
      `/0 Expected a string at most 1 character(s) long, actual "10", /1 Expected a string at most 1 character(s) long, actual "10"`,
      allErrors
    )
  })

  it("allErrors/tuple/post rest elements: wrong type for values", async () => {
    const schema = pipe(S.array(S.string), S.element(NumberFromString), S.element(NumberFromString))
    await Util.expectEncodingFailure(
      schema,
      [10, 10],
      `/0 Expected a string at most 1 character(s) long, actual "10", /1 Expected a string at most 1 character(s) long, actual "10"`,
      allErrors
    )
  })

  it("allErrors/struct: wrong type for values", async () => {
    const schema = S.struct({ a: NumberFromString, b: NumberFromString })
    await Util.expectEncodingFailure(
      schema,
      { a: 10, b: 10 },
      `/a Expected a string at most 1 character(s) long, actual "10", /b Expected a string at most 1 character(s) long, actual "10"`,
      allErrors
    )
  })

  it("allErrors/record/ all key errors", async () => {
    const schema = S.record(MustChar, S.string)
    await Util.expectEncodingFailure(
      schema,
      { aa: "a", bb: "bb" },
      `/aa Expected a string at most 1 character(s) long, actual "aa", /bb Expected a string at most 1 character(s) long, actual "bb"`,
      allErrors
    )
  })

  it("allErrors/record/ all value errors", async () => {
    const schema = S.record(S.string, MustChar)
    await Util.expectEncodingFailure(
      schema,
      { a: "aa", b: "bb" },
      `/a Expected a string at most 1 character(s) long, actual "aa", /b Expected a string at most 1 character(s) long, actual "bb"`,
      allErrors
    )
  })
})
