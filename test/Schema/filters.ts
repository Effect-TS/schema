import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("string filters", () => {
  describe.concurrent("minLength", () => {
    it("property tests", () => {
      const schema = pipe(S.string, S.minLength(1))
      Util.roundtrip(schema)
    })

    it("decode / encode", async () => {
      const schema = pipe(S.string, S.minLength(1))
      await Util.expectParseSuccess(schema, "a")
      await Util.expectParseSuccess(schema, "aa")
      await Util.expectParseFailure(
        schema,
        "",
        `Expected a string at least 1 character(s) long, actual ""`
      )
    })
  })

  describe.concurrent("maxLength", () => {
    it("property tests", () => {
      const schema = pipe(S.string, S.maxLength(1))
      Util.roundtrip(schema)
    })

    it("decode / encode", async () => {
      const schema = pipe(S.string, S.maxLength(1))
      await Util.expectParseSuccess(schema, "")
      await Util.expectParseSuccess(schema, "a")
      await Util.expectParseFailure(
        schema,
        "aa",
        `Expected a string at most 1 character(s) long, actual "aa"`
      )
    })
  })

  describe.concurrent("pattern", () => {
    // TODO: property tests

    it("decode / encode", async () => {
      const schema = pipe(S.string, S.pattern(/^abb+$/))

      await Util.expectParseSuccess(schema, "abb")
      await Util.expectParseSuccess(schema, "abbb")

      await Util.expectParseFailure(
        schema,
        "ab",
        `Expected a string matching the pattern ^abb+$, actual "ab"`
      )
      await Util.expectParseFailure(
        schema,
        "a",
        `Expected a string matching the pattern ^abb+$, actual "a"`
      )
    })

    it("should reset lastIndex to 0 before each `test` call (#88)", () => {
      const regex = /^(A|B)$/g
      const schema: S.Schema<string> = pipe(
        S.string,
        S.pattern(regex)
      )
      expect(S.validate(schema)("A")).toEqual("A")
      expect(S.validate(schema)("A")).toEqual("A")
    })
  })

  describe.concurrent("startsWith", () => {
    // TODO: property tests

    it("decode / encode", async () => {
      const schema = pipe(S.string, S.startsWith("a"))

      await Util.expectParseSuccess(schema, "a")
      await Util.expectParseSuccess(schema, "ab")

      await Util.expectParseFailure(
        schema,
        "",
        `Expected a string starting with "a", actual ""`
      )
      await Util.expectParseFailure(
        schema,
        "b",
        `Expected a string starting with "a", actual "b"`
      )
    })
  })

  describe.concurrent("endsWith", () => {
    // TODO: property tests

    it("decode / encode", async () => {
      const schema = pipe(S.string, S.endsWith("a"))

      await Util.expectParseSuccess(schema, "a")
      await Util.expectParseSuccess(schema, "ba")

      await Util.expectParseFailure(
        schema,
        "",
        `Expected a string ending with "a", actual ""`
      )
      await Util.expectParseFailure(
        schema,
        "b",
        `Expected a string ending with "a", actual "b"`
      )
    })
  })

  describe.concurrent("includes", () => {
    it("property tests", () => {
      const schema = pipe(S.string, S.includes("a"))
      Util.roundtrip(schema)
    })

    it("decode / encode", async () => {
      const schema = pipe(S.string, S.includes("a"))
      await Util.expectParseSuccess(schema, "a")
      await Util.expectParseSuccess(schema, "aa")
      await Util.expectParseSuccess(schema, "bac")
      await Util.expectParseSuccess(schema, "ba")
      await Util.expectParseFailure(
        schema,
        "",
        `Expected a string including "a", actual ""`
      )
    })
  })

  describe.concurrent("trimmed", () => {
    const schema = S.Trimmed

    it("property tests", () => {
      Util.roundtrip(schema)
    })

    it("decode / encode", async () => {
      await Util.expectParseSuccess(schema, "a")
      await Util.expectParseSuccess(schema, "")
      await Util.expectParseFailure(
        schema,
        "a ",
        `Expected a string with no leading or trailing whitespace, actual "a "`
      )
      await Util.expectParseFailure(
        schema,
        " a",
        `Expected a string with no leading or trailing whitespace, actual " a"`
      )
      await Util.expectParseFailure(
        schema,
        " a ",
        `Expected a string with no leading or trailing whitespace, actual " a "`
      )

      await Util.expectEncodeSuccess(schema, "a", "a")
      await Util.expectEncodeSuccess(schema, "", "")
      await Util.expectEncodeFailure(
        schema,
        "a ",
        `Expected a string with no leading or trailing whitespace, actual "a "`
      )
      await Util.expectEncodeFailure(
        schema,
        " a",
        `Expected a string with no leading or trailing whitespace, actual " a"`
      )
      await Util.expectEncodeFailure(
        schema,
        " a ",
        `Expected a string with no leading or trailing whitespace, actual " a "`
      )
    })
  })
})

describe.concurrent("number filters", () => {
  describe.concurrent("greaterThan", () => {
    it("property tests", () => {
      const schema = pipe(S.number, S.greaterThan(1))
      Util.roundtrip(schema)
    })

    it("decode / encode", async () => {
      const schema = pipe(S.number, S.greaterThan(1))
      await Util.expectParseSuccess(schema, 2)
      await Util.expectParseFailure(schema, 1, `Expected a number greater than 1, actual 1`)
      await Util.expectParseFailure(schema, 0, `Expected a number greater than 1, actual 0`)
    })
  })

  describe.concurrent("greaterThanOrEqualTo", () => {
    it("property tests", () => {
      const schema = pipe(S.number, S.greaterThanOrEqualTo(1))
      Util.roundtrip(schema)
    })

    it("decode / encode", async () => {
      const schema = pipe(S.number, S.greaterThanOrEqualTo(1))

      await Util.expectParseSuccess(schema, 1)
      await Util.expectParseSuccess(schema, 2)
      await Util.expectParseFailure(
        schema,
        0,
        `Expected a number greater than or equal to 1, actual 0`
      )
    })
  })

  describe.concurrent("lessThan", () => {
    it("property tests", () => {
      const schema = pipe(S.number, S.lessThan(1))
      Util.roundtrip(schema)
    })

    it("decode / encode", async () => {
      const schema = pipe(S.number, S.lessThan(1))
      await Util.expectParseSuccess(schema, 0)
      await Util.expectParseFailure(schema, 1, `Expected a number less than 1, actual 1`)
      await Util.expectParseFailure(schema, 2, `Expected a number less than 1, actual 2`)
    })
  })

  describe.concurrent("lessThanOrEqualTo", () => {
    it("property tests", () => {
      const schema = pipe(S.number, S.lessThanOrEqualTo(1))
      Util.roundtrip(schema)
    })

    it("decode / encode", async () => {
      const schema = pipe(S.number, S.lessThanOrEqualTo(1))
      await Util.expectParseSuccess(schema, 1)
      await Util.expectParseSuccess(schema, 0)
      await Util.expectParseFailure(
        schema,
        2,
        `Expected a number less than or equal to 1, actual 2`
      )
    })
  })

  describe.concurrent("int", () => {
    it("property tests", () => {
      const schema = pipe(S.number, S.int())
      Util.roundtrip(schema)
    })

    it("decode / encode", async () => {
      const schema = pipe(S.number, S.int())
      await Util.expectParseSuccess(schema, 0)
      await Util.expectParseSuccess(schema, 1)
      await Util.expectParseFailure(schema, 0.5, `Expected an integer, actual 0.5`)
    })
  })

  describe.concurrent("nonNaN", () => {
    const schema = S.NonNaN

    it("property tests", () => {
      Util.roundtrip(schema)
    })

    it("decode / encode", async () => {
      await Util.expectParseSuccess(schema, 1)
      await Util.expectParseFailure(schema, NaN, `Expected a number NaN excluded, actual NaN`)
    })
  })

  describe.concurrent("finite", () => {
    const schema = S.Finite

    it("property tests", () => {
      Util.roundtrip(schema)
    })

    it("decode / encode", async () => {
      await Util.expectParseSuccess(schema, 1)
      await Util.expectParseFailure(
        schema,
        Infinity,
        `Expected a finite number, actual Infinity`
      )
      await Util.expectParseFailure(
        schema,
        -Infinity,
        `Expected a finite number, actual -Infinity`
      )
    })
  })

  describe.concurrent("multipleOf", () => {
    it("property tests", () => {
      const schema = pipe(S.number, S.multipleOf(2))
      Util.roundtrip(schema)
    })

    it("is", () => {
      const schema = pipe(S.number, S.multipleOf(-.2))
      const is = S.is(schema)
      expect(is(-2.8)).toEqual(true)
      expect(is(-2)).toEqual(true)
      expect(is(-1.5)).toEqual(false)
      expect(is(0)).toEqual(true)
      expect(is(1)).toEqual(true)
      expect(is(2.6)).toEqual(true)
      expect(is(3.1)).toEqual(false)
    })

    it("decode / encode", async () => {
      const schema = pipe(S.number, S.multipleOf(2))
      await Util.expectParseSuccess(schema, -4)
      await Util.expectParseFailure(
        schema,
        -3,
        `Expected a number divisible by 2, actual -3`
      )
      await Util.expectParseSuccess(schema, 0)
      await Util.expectParseSuccess(schema, 2)
      await Util.expectParseFailure(
        schema,
        2.5,
        `Expected a number divisible by 2, actual 2.5`
      )
      await Util.expectParseFailure(
        schema,
        "",
        `Expected a number, actual ""`
      )
    })
  })

  describe.concurrent("between", () => {
    it("decode / encode", async () => {
      const schema = pipe(S.number, S.between(-1, 1))

      await Util.expectParseFailure(
        schema,
        -2,
        "Expected a number greater than or equal to -1, actual -2"
      )
      await Util.expectParseSuccess(schema, 0, 0)
      await Util.expectEncodeSuccess(schema, 1, 1)
      await Util.expectParseFailure(schema, 2, "Expected a number between -1 and 1, actual 2")
    })
  })

  describe.concurrent("Positive", () => {
    it("decode / encode", async () => {
      const schema = S.Positive

      await Util.expectParseFailure(schema, -1, "Expected a positive number, actual -1")
      await Util.expectParseFailure(schema, 0, "Expected a positive number, actual 0")
      await Util.expectEncodeSuccess(schema, 1, 1)
    })
  })

  describe.concurrent("Negative", () => {
    it("decode / encode", async () => {
      const schema = S.Negative

      await Util.expectEncodeSuccess(schema, -1, -1)
      await Util.expectParseFailure(schema, 0, "Expected a negative number, actual 0")
      await Util.expectParseFailure(schema, 1, "Expected a negative number, actual 1")
    })
  })

  describe.concurrent("NonNegative", () => {
    it("decode / encode", async () => {
      const schema = S.NonNegative

      await Util.expectEncodeFailure(schema, -1, "Expected a non-negative number, actual -1")
      await Util.expectParseSuccess(schema, 0, 0)
      await Util.expectParseSuccess(schema, 1, 1)
    })
  })

  describe.concurrent("NonPositive", () => {
    it("decode / encode", async () => {
      const schema = S.NonPositive

      await Util.expectEncodeSuccess(schema, -1, -1)
      await Util.expectParseSuccess(schema, 0, 0)
      await Util.expectParseFailure(schema, 1, "Expected a non-positive number, actual 1")
    })
  })
})

describe.concurrent("bigint filters", () => {
  describe.concurrent("greaterThanBigint", () => {
    it("decode / encode", async () => {
      const schema = pipe(S.bigint, S.greaterThanBigint(1n))

      await Util.expectParseFailure(schema, 0n, "Expected a bigint greater than 1n, actual 0n")
      await Util.expectParseFailure(schema, 1n, "Expected a bigint greater than 1n, actual 1n")
      await Util.expectEncodeSuccess(schema, 2n, 2n)
    })
  })

  describe.concurrent("greaterThanOrEqualToBigint", () => {
    it("decode / encode", async () => {
      const schema = pipe(S.bigint, S.greaterThanOrEqualToBigint(1n))

      await Util.expectParseFailure(
        schema,
        0n,
        "Expected a bigint greater than or equal to 1n, actual 0n"
      )
      await Util.expectParseSuccess(schema, 1n, 1n)
      await Util.expectEncodeSuccess(schema, 2n, 2n)
    })
  })

  describe.concurrent("lessThanBigint", () => {
    it("decode / encode", async () => {
      const schema = pipe(S.bigint, S.lessThanBigint(1n))

      await Util.expectEncodeSuccess(schema, 0n, 0n)
      await Util.expectParseFailure(schema, 1n, "Expected a bigint less than 1n, actual 1n")
      await Util.expectParseFailure(schema, 2n, "Expected a bigint less than 1n, actual 2n")
    })
  })

  describe.concurrent("lessThanOrEqualToBigint", () => {
    it("decode / encode", async () => {
      const schema = pipe(S.bigint, S.lessThanOrEqualToBigint(1n))

      await Util.expectEncodeSuccess(schema, 0n, 0n)
      await Util.expectParseSuccess(schema, 1n, 1n)
      await Util.expectParseFailure(
        schema,
        2n,
        "Expected a bigint less than or equal to 1n, actual 2n"
      )
    })
  })

  describe.concurrent("betweenBigint", () => {
    it("decode / encode", async () => {
      const schema = pipe(S.bigint, S.betweenBigint(-1n, 1n))

      await Util.expectParseSuccess(schema, 0n, 0n)
      await Util.expectEncodeSuccess(schema, 1n, 1n)
      await Util.expectParseFailure(
        schema,
        -2n,
        "Expected a bigint greater than or equal to -1n, actual -2n"
      )
      await Util.expectParseFailure(
        schema,
        2n,
        "Expected a bigint between -1n and 1n, actual 2n"
      )
    })
  })

  describe.concurrent("positiveBigint", () => {
    it("decode / encode", async () => {
      const schema = pipe(S.bigint, S.positiveBigint())

      await Util.expectParseFailure(schema, -1n, "Expected a positive bigint, actual -1n")
      await Util.expectParseFailure(schema, 0n, "Expected a positive bigint, actual 0n")
      await Util.expectEncodeSuccess(schema, 1n, 1n)
    })
  })

  describe.concurrent("negativeBigint", () => {
    it("decode / encode", async () => {
      const schema = pipe(S.bigint, S.negativeBigint())

      await Util.expectEncodeSuccess(schema, -1n, -1n)
      await Util.expectParseFailure(schema, 0n, "Expected a negative bigint, actual 0n")
      await Util.expectParseFailure(schema, 1n, "Expected a negative bigint, actual 1n")
    })
  })

  describe.concurrent("nonNegativeBigint", () => {
    it("decode / encode", async () => {
      const schema = pipe(S.bigint, S.nonNegativeBigint())

      await Util.expectEncodeFailure(schema, -1n, "Expected a non-negative bigint, actual -1n")
      await Util.expectParseSuccess(schema, 0n, 0n)
      await Util.expectParseSuccess(schema, 1n, 1n)
    })
  })

  describe.concurrent("nonPositiveBigint", () => {
    it("decode / encode", async () => {
      const schema = pipe(S.bigint, S.nonPositiveBigint())

      await Util.expectEncodeSuccess(schema, -1n, -1n)
      await Util.expectParseSuccess(schema, 0n, 0n)
      await Util.expectParseFailure(schema, 1n, "Expected a non-positive bigint, actual 1n")
    })
  })
})

describe.concurrent("ReadonlyArray filters", () => {
  describe.concurrent("minItems", () => {
    // it("property tests", () => {
    //   const schema = pipe(S.array(S.number), S.minItems(2))
    //   Util.roundtrip(schema)
    // })

    it("decode / encode", async () => {
      const schema = pipe(S.array(S.number), S.minItems(2))

      await Util.expectParseFailure(
        schema,
        [1],
        "Expected an array of at least 2 items, actual [1]"
      )

      await Util.expectParseSuccess(schema, [1, 2])
      await Util.expectParseSuccess(schema, [1, 2, 3])
    })
  })

  describe.concurrent("maxItems", () => {
    // it("property tests", () => {
    //   const schema = pipe(S.array(S.number), S.maxItems(2))
    //   Util.roundtrip(schema)
    // })

    it("decode / encode", async () => {
      const schema = pipe(S.array(S.number), S.maxItems(2))

      await Util.expectParseFailure(
        schema,
        [1, 2, 3],
        "Expected an array of at most 2 items, actual [1,2,3]"
      )

      await Util.expectParseSuccess(schema, [1])
      await Util.expectParseSuccess(schema, [1, 2])
    })
  })

  describe.concurrent("itemsCount", () => {
    it("decode / encode", async () => {
      const schema = pipe(S.array(S.number), S.itemsCount(2))

      await Util.expectParseFailure(
        schema,
        [],
        "Expected an array of at least 2 items, actual []"
      )
      await Util.expectParseFailure(
        schema,
        [1],
        "Expected an array of at least 2 items, actual [1]"
      )
      await Util.expectParseSuccess(schema, [1, 2])
      await Util.expectParseFailure(
        schema,
        [1, 2, 3],
        "Expected an array of exactly 2 items, actual [1,2,3]"
      )
    })
  })
})
