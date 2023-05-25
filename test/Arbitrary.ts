import { pipe } from "@effect/data/Function"
import * as A from "@effect/schema/Arbitrary"
import * as AST from "@effect/schema/AST"
import * as PR from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"
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
    const schema = T.NumberFromString
    expect(() => A.go(schema.ast)).toThrowError(
      new Error("cannot build an Arbitrary for transformations")
    )
  })

  it("should throw on effectful refinements", () => {
    const ast = AST.createRefinement(
      S.number.ast,
      // I need to override with the original ast here in order to not change the error message
      // ------------------------------v
      Util.effectifyDecode(PR.success, S.number.ast)
    )
    expect(() => fc.sample(A.go(ast)(fc), 1)).toThrowError(
      new Error("cannot build an Arbitrary for effectful refinements")
    )
  })

  it("to", () => {
    const schema = T.NumberFromString
    property(T.to(schema))
  })

  it("from", () => {
    const NumberFromString = T.NumberFromString
    const schema = T.struct({
      a: NumberFromString,
      b: T.tuple(NumberFromString),
      c: T.union(NumberFromString, S.boolean),
      d: pipe(NumberFromString, T.positive()),
      e: T.optionFromSelf(NumberFromString)
    })
    property(T.from(schema))
  })

  it("from/ lazy", () => {
    const NumberFromString = T.NumberFromString
    interface I {
      readonly a: string | I
    }
    interface A {
      readonly a: number | A
    }
    const schema: T.Transform<I, A> = T.lazy(() =>
      T.struct({
        a: T.union(NumberFromString, schema)
      })
    )
    property(T.from(schema))
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
    const schema = pipe(S.tuple(), S.optionalElement(S.number))
    property(schema)
  })

  it("tuple. optional element with undefined", () => {
    const schema = pipe(S.tuple(), S.optionalElement(S.union(S.number, S.undefined)))
    property(schema)
  })

  it("tuple. e + e?", () => {
    const schema = pipe(S.tuple(S.string), S.optionalElement(S.number))
    property(schema)
  })

  it("tuple. e + r", () => {
    const schema = pipe(S.tuple(S.string), S.rest(S.number))
    property(schema)
  })

  it("tuple. e? + r", () => {
    const schema = pipe(S.tuple(), S.optionalElement(S.string), S.rest(S.number))
    property(schema)
  })

  it("tuple. r", () => {
    const schema = S.array(S.number)
    property(schema)
  })

  it("tuple. r + e", () => {
    const schema = pipe(S.array(S.string), S.element(S.number))
    property(schema)
  })

  it("tuple. e + r + e", () => {
    const schema = pipe(S.tuple(S.string), S.rest(S.number), S.element(S.boolean))
    property(schema)
  })

  it("lazy/to tuple", () => {
    type A = readonly [number, A | null]
    const schema: S.Schema<A> = S.lazy(
      () => S.tuple(S.number, S.union(schema, S.literal(null)))
    )
    property(schema)
  })

  it("lazy/to struct", () => {
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

  it("lazy/to record", () => {
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
    const schema = pipe(
      S.struct({ a: S.string }),
      S.extend(S.record(S.string, S.union(S.string, S.number)))
    )
    property(schema)
  })

  // ---------------------------------------------
  // filters
  // ---------------------------------------------

  it("minLength", () => {
    const schema = pipe(S.string, S.minLength(1))
    property(schema)
  })

  it("maxLength", () => {
    const schema = pipe(S.string, S.maxLength(2))
    property(schema)
  })

  it("lessThanOrEqualTo", () => {
    const schema = pipe(S.number, S.lessThanOrEqualTo(1))
    property(schema)
  })

  it("greaterThanOrEqualTo", () => {
    const schema = pipe(S.number, S.greaterThanOrEqualTo(1))
    property(schema)
  })

  it("lessThan", () => {
    const schema = pipe(S.number, S.lessThan(1))
    property(schema)
  })

  it("greaterThan", () => {
    const schema = pipe(S.number, S.greaterThan(1))
    property(schema)
  })

  it("startsWith", () => {
    const schema = pipe(S.string, S.startsWith("a"))
    property(schema)
  })

  it("endsWith", () => {
    const schema = pipe(S.string, S.endsWith("a"))
    property(schema)
  })

  it("int", () => {
    const schema = pipe(S.number, S.int())
    property(schema)
  })

  it("nonNaN", () => {
    const schema = pipe(S.number, S.nonNaN())
    property(schema)
  })

  it("finite", () => {
    const schema = pipe(S.number, S.finite())
    property(schema)
  })

  it("between + int", () => {
    const schema = pipe(S.number, S.between(1, 10), S.int())
    property(schema)
  })

  it("int + between", () => {
    const schema = pipe(S.number, S.int(), S.between(1, 10))
    property(schema)
  })
})
