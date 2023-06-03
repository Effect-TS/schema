import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("string filters", () => {
  describe.concurrent("minLength", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.string), C.minLength(1))
      await Util.expectParseSuccess(codec, "a")
      await Util.expectParseSuccess(codec, "aa")
      await Util.expectParseFailure(
        codec,
        "",
        `Expected a string at least 1 character(s) long, actual ""`
      )
    })
  })

  describe.concurrent("maxLength", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.string), C.maxLength(1))
      await Util.expectParseSuccess(codec, "")
      await Util.expectParseSuccess(codec, "a")
      await Util.expectParseFailure(
        codec,
        "aa",
        `Expected a string at most 1 character(s) long, actual "aa"`
      )
    })
  })

  describe.concurrent("pattern", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.string), C.pattern(/^abb+$/))

      await Util.expectParseSuccess(codec, "abb")
      await Util.expectParseSuccess(codec, "abbb")

      await Util.expectParseFailure(
        codec,
        "ab",
        `Expected a string matching the pattern ^abb+$, actual "ab"`
      )
      await Util.expectParseFailure(
        codec,
        "a",
        `Expected a string matching the pattern ^abb+$, actual "a"`
      )
    })

    it("should reset lastIndex to 0 before each `test` call (#88)", () => {
      const regex = /^(A|B)$/g
      const codec = pipe(
        Util.identityTransform(S.string),
        C.pattern(regex)
      )
      expect(C.decode(codec)("A")).toEqual("A")
      expect(C.decode(codec)("A")).toEqual("A")
    })
  })

  describe.concurrent("startsWith", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.string), C.startsWith("a"))

      await Util.expectParseSuccess(codec, "a")
      await Util.expectParseSuccess(codec, "ab")

      await Util.expectParseFailure(
        codec,
        "",
        `Expected a string starting with "a", actual ""`
      )
      await Util.expectParseFailure(
        codec,
        "b",
        `Expected a string starting with "a", actual "b"`
      )
    })
  })

  describe.concurrent("endsWith", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.string), C.endsWith("a"))

      await Util.expectParseSuccess(codec, "a")
      await Util.expectParseSuccess(codec, "ba")

      await Util.expectParseFailure(
        codec,
        "",
        `Expected a string ending with "a", actual ""`
      )
      await Util.expectParseFailure(
        codec,
        "b",
        `Expected a string ending with "a", actual "b"`
      )
    })
  })

  describe.concurrent("includes", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.string), C.includes("a"))
      await Util.expectParseSuccess(codec, "a")
      await Util.expectParseSuccess(codec, "aa")
      await Util.expectParseSuccess(codec, "bac")
      await Util.expectParseSuccess(codec, "ba")
      await Util.expectParseFailure(
        codec,
        "",
        `Expected a string including "a", actual ""`
      )
    })
  })
})

describe.concurrent("number filters", () => {
  describe.concurrent("greaterThan", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.number), C.greaterThan(0))
      await Util.expectParseSuccess(codec, 1)
      await Util.expectParseFailure(codec, 0, `Expected a number greater than 0, actual 0`)
      await Util.expectParseFailure(codec, -1, `Expected a number greater than 0, actual -1`)
    })
  })

  describe.concurrent("greaterThanOrEqualTo", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.number), C.greaterThanOrEqualTo(0))

      await Util.expectParseSuccess(codec, 0)
      await Util.expectParseSuccess(codec, 1)
      await Util.expectParseFailure(
        codec,
        -1,
        `Expected a number greater than or equal to 0, actual -1`
      )
    })
  })

  describe.concurrent("lessThan", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.number), C.lessThan(0))
      await Util.expectParseSuccess(codec, -1)
      await Util.expectParseFailure(codec, 0, `Expected a number less than 0, actual 0`)
      await Util.expectParseFailure(codec, 1, `Expected a number less than 0, actual 1`)
    })
  })

  describe.concurrent("lessThanOrEqualTo", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.number), C.lessThanOrEqualTo(0))
      await Util.expectParseSuccess(codec, 0)
      await Util.expectParseSuccess(codec, -1)
      await Util.expectParseFailure(
        codec,
        1,
        `Expected a number less than or equal to 0, actual 1`
      )
    })
  })

  describe.concurrent("int", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.number), C.int())
      await Util.expectParseSuccess(codec, 0)
      await Util.expectParseSuccess(codec, 1)
      await Util.expectParseFailure(codec, 0.5, `Expected integer, actual 0.5`)
    })
  })
  describe.concurrent("finite", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.number), C.finite())
      await Util.expectParseSuccess(codec, 1)
      await Util.expectParseFailure(
        codec,
        Infinity,
        `Expected a finite number, actual Infinity`
      )
      await Util.expectParseFailure(
        codec,
        -Infinity,
        `Expected a finite number, actual -Infinity`
      )
    })
  })

  describe.concurrent("multipleOf", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.number), C.multipleOf(2))
      await Util.expectParseSuccess(codec, -4)
      await Util.expectParseFailure(
        codec,
        -3,
        `Expected a number divisible by 2, actual -3`
      )
      await Util.expectParseSuccess(codec, 0)
      await Util.expectParseSuccess(codec, 2)
      await Util.expectParseFailure(
        codec,
        2.5,
        `Expected a number divisible by 2, actual 2.5`
      )
      await Util.expectParseFailure(
        codec,
        "",
        `Expected number, actual ""`
      )
    })
  })

  describe.concurrent("between", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.number), C.between(-1, 1))

      await Util.expectParseFailure(
        codec,
        -2,
        "Expected a number greater than or equal to -1, actual -2"
      )
      await Util.expectParseSuccess(codec, 0, 0)
      await Util.expectEncodeSuccess(codec, 1, 1)
      await Util.expectParseFailure(codec, 2, "Expected a number between -1 and 1, actual 2")
    })
  })

  describe.concurrent("positive", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.number), C.positive())

      await Util.expectParseFailure(codec, -1, "Expected a positive number, actual -1")
      await Util.expectParseFailure(codec, 0, "Expected a positive number, actual 0")
      await Util.expectEncodeSuccess(codec, 1, 1)
    })
  })

  describe.concurrent("negative", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.number), C.negative())

      await Util.expectEncodeSuccess(codec, -1, -1)
      await Util.expectParseFailure(codec, 0, "Expected a negative number, actual 0")
      await Util.expectParseFailure(codec, 1, "Expected a negative number, actual 1")
    })
  })

  describe.concurrent("nonNegative", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.number), C.nonNegative())

      await Util.expectEncodeFailure(codec, -1, "Expected a non-negative number, actual -1")
      await Util.expectParseSuccess(codec, 0, 0)
      await Util.expectParseSuccess(codec, 1, 1)
    })
  })

  describe.concurrent("nonPositive", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.number), C.nonPositive())

      await Util.expectEncodeSuccess(codec, -1, -1)
      await Util.expectParseSuccess(codec, 0, 0)
      await Util.expectParseFailure(codec, 1, "Expected a non-positive number, actual 1")
    })
  })
})

describe.concurrent("bigint filters", () => {
  describe.concurrent("greaterThanBigint", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.bigint), C.greaterThanBigint(0n))

      await Util.expectParseFailure(codec, -1n, "Expected a bigint greater than 0n, actual -1n")
      await Util.expectParseFailure(codec, 0n, "Expected a bigint greater than 0n, actual 0n")
      await Util.expectEncodeSuccess(codec, 1n, 1n)
    })
  })

  describe.concurrent("greaterThanOrEqualToBigint", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.bigint), C.greaterThanOrEqualToBigint(0n))

      await Util.expectParseFailure(
        codec,
        -1n,
        "Expected a bigint greater than or equal to 0n, actual -1n"
      )
      await Util.expectParseSuccess(codec, 0n, 0n)
      await Util.expectEncodeSuccess(codec, 1n, 1n)
    })
  })

  describe.concurrent("lessThanBigint", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.bigint), C.lessThanBigint(0n))

      await Util.expectEncodeSuccess(codec, -1n, -1n)
      await Util.expectParseFailure(codec, 0n, "Expected a bigint less than 0n, actual 0n")
      await Util.expectParseFailure(codec, 1n, "Expected a bigint less than 0n, actual 1n")
    })
  })

  describe.concurrent("lessThanOrEqualToBigint", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.bigint), C.lessThanOrEqualToBigint(0n))

      await Util.expectEncodeSuccess(codec, -1n, -1n)
      await Util.expectParseSuccess(codec, 0n, 0n)
      await Util.expectParseFailure(
        codec,
        1n,
        "Expected a bigint less than or equal to 0n, actual 1n"
      )
    })
  })

  describe.concurrent("betweenBigint", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.bigint), C.betweenBigint(-1n, 1n))

      await Util.expectParseSuccess(codec, 0n, 0n)
      await Util.expectEncodeSuccess(codec, 1n, 1n)
      await Util.expectParseFailure(
        codec,
        -2n,
        "Expected a bigint greater than or equal to -1n, actual -2n"
      )
      await Util.expectParseFailure(
        codec,
        2n,
        "Expected a bigint between -1n and 1n, actual 2n"
      )
    })
  })

  describe.concurrent("positiveBigint", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.bigint), C.positiveBigint())

      await Util.expectParseFailure(codec, -1n, "Expected a positive bigint, actual -1n")
      await Util.expectParseFailure(codec, 0n, "Expected a positive bigint, actual 0n")
      await Util.expectEncodeSuccess(codec, 1n, 1n)
    })
  })

  describe.concurrent("negativeBigint", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.bigint), C.negativeBigint())

      await Util.expectEncodeSuccess(codec, -1n, -1n)
      await Util.expectParseFailure(codec, 0n, "Expected a negative bigint, actual 0n")
      await Util.expectParseFailure(codec, 1n, "Expected a negative bigint, actual 1n")
    })
  })

  describe.concurrent("nonNegativeBigint", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.bigint), C.nonNegativeBigint())

      await Util.expectEncodeFailure(codec, -1n, "Expected a non-negative bigint, actual -1n")
      await Util.expectParseSuccess(codec, 0n, 0n)
      await Util.expectParseSuccess(codec, 1n, 1n)
    })
  })

  describe.concurrent("nonPositiveBigint", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.bigint), C.nonPositiveBigint())

      await Util.expectEncodeSuccess(codec, -1n, -1n)
      await Util.expectParseSuccess(codec, 0n, 0n)
      await Util.expectParseFailure(codec, 1n, "Expected a non-positive bigint, actual 1n")
    })
  })
})

describe.concurrent("ReadonlyArray filters", () => {
  describe.concurrent("minItems", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.array(S.number)), C.minItems(2))

      await Util.expectParseFailure(
        codec,
        [1],
        "Expected an array of at least 2 items, actual [1]"
      )

      await Util.expectParseSuccess(codec, [1, 2])
      await Util.expectParseSuccess(codec, [1, 2, 3])
    })
  })

  describe.concurrent("maxItems", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.array(S.number)), C.maxItems(2))

      await Util.expectParseFailure(
        codec,
        [1, 2, 3],
        "Expected an array of at most 2 items, actual [1,2,3]"
      )

      await Util.expectParseSuccess(codec, [1])
      await Util.expectParseSuccess(codec, [1, 2])
    })
  })

  describe.concurrent("itemsCount", () => {
    it("decode / encode", async () => {
      const codec = pipe(Util.identityTransform(S.array(S.number)), C.itemsCount(2))

      await Util.expectParseFailure(
        codec,
        [],
        "Expected an array of at least 2 items, actual []"
      )
      await Util.expectParseFailure(
        codec,
        [1],
        "Expected an array of at least 2 items, actual [1]"
      )
      await Util.expectParseSuccess(codec, [1, 2])
      await Util.expectParseFailure(
        codec,
        [1, 2, 3],
        "Expected an array of exactly 2 items, actual [1,2,3]"
      )
    })
  })
})
