import * as A from "@effect/schema/Arbitrary"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as fc from "fast-check"

const doProperty = true

export const property = <A>(schema: S.Schema<A>) => {
  if (!doProperty) {
    return
  }
  const arbitrary = A.build(schema)
  const is = S.is(schema)
  fc.assert(fc.property(arbitrary(fc), (a) => is(a)))
}

describe.concurrent("Arbitrary", () => {
  it("exports", () => {
    expect(A.ArbitraryHookId).exist
  })

  it("should throw on transformations", () => {
    const schema = C.NumberFromString
    expect(() => A.go(schema.ast)).toThrowError(
      new Error("cannot build an Arbitrary for transformations")
    )
  })

  it("to", () => {
    const schema = C.NumberFromString
    property(C.to(schema))
  })

  it("from", () => {
    const NumberFromString = C.NumberFromString
    const schema = C.struct({
      a: NumberFromString,
      b: C.tuple(NumberFromString),
      c: C.union(NumberFromString, S.boolean),
      d: NumberFromString.pipe(C.compose(S.number.pipe(S.positive()))),
      e: C.optionFromSelf(NumberFromString)
    })
    property(C.from(schema))
  })

  it("from/ lazy", () => {
    const NumberFromString = C.NumberFromString
    interface I {
      readonly a: string | I
    }
    interface A {
      readonly a: number | A
    }
    const codec: C.Codec<I, A> = C.lazy(() =>
      C.struct({
        a: C.union(NumberFromString, codec)
      })
    )
    property(C.from(codec))
  })

  it("templateLiteral. a", () => {
    const schema = S.templateLiteral(S.literal("a"))
    property(schema)
  })

  it("templateLiteral. a b", () => {
    const schema = S.templateLiteral(S.literal("a"), S.literal(" "), S.literal("b"))
    property(schema)
  })

  it("templateLiteral. a${string}", () => {
    const schema = S.templateLiteral(S.literal("a"), S.string)
    property(schema)
  })

  it("templateLiteral. a", () => {
    const schema = S.templateLiteral(S.literal("a"))
    property(schema)
  })

  it("templateLiteral. ${string}", () => {
    const schema = S.templateLiteral(S.string)
    property(schema)
  })

  it("templateLiteral. a${string}b", () => {
    const schema = S.templateLiteral(S.literal("a"), S.string, S.literal("b"))
    property(schema)
  })

  it("never", () => {
    expect(() => A.build(S.never)(fc)).toThrowError(
      new Error("cannot build an Arbitrary for `never`")
    )
  })

  it("string", () => {
    property(S.string)
  })

  it("void", () => {
    property(S.void)
  })

  it("number", () => {
    property(S.number)
  })

  it("boolean", () => {
    property(S.boolean)
  })

  it("bigint", () => {
    property(S.bigint)
  })

  it("symbol", () => {
    property(S.symbol)
  })

  it("object", () => {
    property(S.object)
  })

  it("literal 1 member", () => {
    const schema = S.literal(1)
    property(schema)
  })

  it("literal 2 members", () => {
    const schema = S.literal(1, "a")
    property(schema)
  })

  it("uniqueSymbol", () => {
    const a = Symbol.for("@effect/schema/test/a")
    const schema = S.uniqueSymbol(a)
    property(schema)
  })

  it("empty enums should throw", () => {
    enum Fruits {}
    const schema = S.enums(Fruits)
    expect(() => A.build(schema)(fc)).toThrowError(
      new Error("cannot build an Arbitrary for an empty enum")
    )
  })

  it("Numeric enums", () => {
    enum Fruits {
      Apple,
      Banana
    }
    const schema = S.enums(Fruits)
    property(schema)
  })

  it("String enums", () => {
    enum Fruits {
      Apple = "apple",
      Banana = "banana",
      Cantaloupe = 0
    }
    const schema = S.enums(Fruits)
    property(schema)
  })

  it("Const enums", () => {
    const Fruits = {
      Apple: "apple",
      Banana: "banana",
      Cantaloupe: 3
    } as const
    const schema = S.enums(Fruits)
    property(schema)
  })

  it("tuple. empty", () => {
    const schema = S.tuple()
    property(schema)
  })

  it("tuple. required element", () => {
    const schema = S.tuple(S.number)
    property(schema)
  })

  it("tuple. required element with undefined", () => {
    const schema = S.tuple(S.union(S.number, S.undefined))
    property(schema)
  })

  it("tuple. optional element", () => {
    const schema = S.tuple().pipe(S.optionalElement(S.number))
    property(schema)
  })

  it("tuple. optional element with undefined", () => {
    const schema = S.tuple().pipe(S.optionalElement(S.union(S.number, S.undefined)))
    property(schema)
  })

  it("tuple. e + e?", () => {
    const schema = S.tuple(S.string).pipe(S.optionalElement(S.number))
    property(schema)
  })

  it("tuple. e + r", () => {
    const schema = S.tuple(S.string).pipe(S.rest(S.number))
    property(schema)
  })

  it("tuple. e? + r", () => {
    const schema = S.tuple().pipe(S.optionalElement(S.string), S.rest(S.number))
    property(schema)
  })

  it("tuple. r", () => {
    const schema = S.array(S.number)
    property(schema)
  })

  it("tuple. r + e", () => {
    const schema = S.array(S.string).pipe(S.element(S.number))
    property(schema)
  })

  it("tuple. e + r + e", () => {
    const schema = S.tuple(S.string).pipe(S.rest(S.number), S.element(S.boolean))
    property(schema)
  })

  it("lazy/to tuple", () => {
    type A = readonly [number, A | null]
    const schema: S.Schema<A> = S.lazy(
      () => S.tuple(S.number, S.union(schema, S.literal(null)))
    )
    property(schema)
  })

  it.skip("lazy/to struct", () => {
    interface A {
      readonly a: string
      readonly as: ReadonlyArray<A>
    }
    const schema: S.Schema<A> = S.lazy(() =>
      S.struct({
        a: S.string,
        as: S.array(schema)
      })
    )
    property(schema)
  })

  it.skip("lazy/to record", () => {
    type A = {
      [_: string]: A
    }
    const schema: S.Schema<A> = S.lazy(() => S.record(S.string, schema))
    property(schema)
  })

  describe.concurrent("struct", () => {
    it("required property signature", () => {
      const schema = S.struct({ a: S.number })
      property(schema)
    })

    it("required property signature with undefined", () => {
      const schema = S.struct({ a: S.union(S.number, S.undefined) })
      property(schema)
    })

    it("optional property signature", () => {
      const schema = S.struct({ a: S.optional(S.number) })
      property(schema)
    })

    it("optional property signature with undefined", () => {
      const schema = S.struct({ a: S.optional(S.union(S.number, S.undefined)) })
      property(schema)
    })

    it("baseline", () => {
      const schema = S.struct({ a: S.string, b: S.number })
      property(schema)
    })
  })

  it("union", () => {
    const schema = S.union(S.string, S.number)
    property(schema)
  })

  it("record(string, string)", () => {
    const schema = S.record(S.string, S.string)
    property(schema)
  })

  it("record(symbol, string)", () => {
    const schema = S.record(S.symbol, S.string)
    property(schema)
  })

  it("extend/ struct + record", () => {
    const schema = S.struct({ a: S.string }).pipe(
      S.extend(S.record(S.string, S.union(S.string, S.number)))
    )
    property(schema)
  })

  // ---------------------------------------------
  // filters
  // ---------------------------------------------

  it("minLength", () => {
    const schema = S.string.pipe(S.minLength(1))
    property(schema)
  })

  it("maxLength", () => {
    const schema = S.string.pipe(S.maxLength(2))
    property(schema)
  })

  it("lessThanOrEqualTo", () => {
    const schema = S.number.pipe(S.lessThanOrEqualTo(1))
    property(schema)
  })

  it("greaterThanOrEqualTo", () => {
    const schema = S.number.pipe(S.greaterThanOrEqualTo(1))
    property(schema)
  })

  it("lessThan", () => {
    const schema = S.number.pipe(S.lessThan(1))
    property(schema)
  })

  it("greaterThan", () => {
    const schema = S.number.pipe(S.greaterThan(1))
    property(schema)
  })

  it("startsWith", () => {
    const schema = S.string.pipe(S.startsWith("a"))
    property(schema)
  })

  it("endsWith", () => {
    const schema = S.string.pipe(S.endsWith("a"))
    property(schema)
  })

  it("int", () => {
    const schema = S.number.pipe(S.int())
    property(schema)
  })

  it("nonNaN", () => {
    const schema = S.number.pipe(S.nonNaN())
    property(schema)
  })

  it("finite", () => {
    const schema = S.number.pipe(S.finite())
    property(schema)
  })

  it("between + int", () => {
    const schema = S.number.pipe(S.between(1, 10), S.int())
    property(schema)
  })

  it("int + between", () => {
    const schema = S.number.pipe(S.int(), S.between(1, 10))
    property(schema)
  })
})
