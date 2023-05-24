import { pipe } from "@effect/data/Function"
import * as A from "@effect/schema/Arbitrary"
import * as AST from "@effect/schema/AST"
import * as PR from "@effect/schema/ParseResult"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"
import * as fc from "fast-check"

const doProperty = true

export const propertyTo = <I, A>(schema: T.Transform<I, A>) => {
  if (!doProperty) {
    return
  }
  const arbitrary = A.to(schema)
  const is = T.is(schema)
  fc.assert(fc.property(arbitrary(fc), (a) => is(a)))
}

export const propertyFrom = <I, A>(schema: T.Transform<I, A>) => {
  if (!doProperty) {
    return
  }
  const arbitrary = A.from(schema)
  const is = T.is(T.from(schema))
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
      T.number.ast,
      // I need to override with the original ast here in order to not change the error message
      // ------------------------------v
      Util.effectifyDecode(PR.success, T.number.ast)
    )
    expect(() => fc.sample(A.go(ast)(fc), 1)).toThrowError(
      new Error("cannot build an Arbitrary for effectful refinements")
    )
  })

  it("to", () => {
    const schema = T.NumberFromString
    propertyTo(schema)
  })

  it("from", () => {
    const NumberFromString = T.NumberFromString
    const schema = T.struct({
      a: NumberFromString,
      b: T.tuple(NumberFromString),
      c: T.union(NumberFromString, T.boolean),
      d: pipe(NumberFromString, T.positive()),
      e: T.optionFromSelf(NumberFromString)
    })
    propertyFrom(schema)
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
    propertyFrom(schema)
  })

  it("templateLiteral. a", () => {
    const schema = T.templateLiteral(T.literal("a"))
    propertyTo(schema)
  })

  it("templateLiteral. a b", () => {
    const schema = T.templateLiteral(T.literal("a"), T.literal(" "), T.literal("b"))
    propertyTo(schema)
  })

  it("templateLiteral. a${string}", () => {
    const schema = T.templateLiteral(T.literal("a"), T.string)
    propertyTo(schema)
  })

  it("templateLiteral. a", () => {
    const schema = T.templateLiteral(T.literal("a"))
    propertyTo(schema)
  })

  it("templateLiteral. ${string}", () => {
    const schema = T.templateLiteral(T.string)
    propertyTo(schema)
  })

  it("templateLiteral. a${string}b", () => {
    const schema = T.templateLiteral(T.literal("a"), T.string, T.literal("b"))
    propertyTo(schema)
  })

  it("never", () => {
    expect(() => A.to(T.never)(fc)).toThrowError(
      new Error("cannot build an Arbitrary for `never`")
    )
  })

  it("string", () => {
    propertyTo(T.string)
  })

  it("void", () => {
    propertyTo(T.void)
  })

  it("number", () => {
    propertyTo(T.number)
  })

  it("boolean", () => {
    propertyTo(T.boolean)
  })

  it("bigint", () => {
    propertyTo(T.bigint)
  })

  it("symbol", () => {
    propertyTo(T.symbol)
  })

  it("object", () => {
    propertyTo(T.object)
  })

  it("literal 1 member", () => {
    const schema = T.literal(1)
    propertyTo(schema)
  })

  it("literal 2 members", () => {
    const schema = T.literal(1, "a")
    propertyTo(schema)
  })

  it("uniqueSymbol", () => {
    const a = Symbol.for("@effect/schema/test/a")
    const schema = T.uniqueSymbol(a)
    propertyTo(schema)
  })

  it("empty enums should throw", () => {
    enum Fruits {}
    const schema = T.enums(Fruits)
    expect(() => A.to(schema)(fc)).toThrowError(
      new Error("cannot build an Arbitrary for an empty enum")
    )
  })

  it("Numeric enums", () => {
    enum Fruits {
      Apple,
      Banana
    }
    const schema = T.enums(Fruits)
    propertyTo(schema)
  })

  it("String enums", () => {
    enum Fruits {
      Apple = "apple",
      Banana = "banana",
      Cantaloupe = 0
    }
    const schema = T.enums(Fruits)
    propertyTo(schema)
  })

  it("Const enums", () => {
    const Fruits = {
      Apple: "apple",
      Banana: "banana",
      Cantaloupe: 3
    } as const
    const schema = T.enums(Fruits)
    propertyTo(schema)
  })

  it("tuple. empty", () => {
    const schema = T.tuple()
    propertyTo(schema)
  })

  it("tuple. required element", () => {
    const schema = T.tuple(T.number)
    propertyTo(schema)
  })

  it("tuple. required element with undefined", () => {
    const schema = T.tuple(T.union(T.number, T.undefined))
    propertyTo(schema)
  })

  it("tuple. optional element", () => {
    const schema = pipe(T.tuple(), T.optionalElement(T.number))
    propertyTo(schema)
  })

  it("tuple. optional element with undefined", () => {
    const schema = pipe(T.tuple(), T.optionalElement(T.union(T.number, T.undefined)))
    propertyTo(schema)
  })

  it("tuple. e + e?", () => {
    const schema = pipe(T.tuple(T.string), T.optionalElement(T.number))
    propertyTo(schema)
  })

  it("tuple. e + r", () => {
    const schema = pipe(T.tuple(T.string), T.rest(T.number))
    propertyTo(schema)
  })

  it("tuple. e? + r", () => {
    const schema = pipe(T.tuple(), T.optionalElement(T.string), T.rest(T.number))
    propertyTo(schema)
  })

  it("tuple. r", () => {
    const schema = T.array(T.number)
    propertyTo(schema)
  })

  it("tuple. r + e", () => {
    const schema = pipe(T.array(T.string), T.element(T.number))
    propertyTo(schema)
  })

  it("tuple. e + r + e", () => {
    const schema = pipe(T.tuple(T.string), T.rest(T.number), T.element(T.boolean))
    propertyTo(schema)
  })

  it("lazy/to tuple", () => {
    type A = readonly [number, A | null]
    const schema: T.Transform<A, A> = T.lazy(
      () => T.tuple(T.number, T.union(schema, T.literal(null)))
    )
    propertyTo(schema)
  })

  it("lazy/to struct", () => {
    interface A {
      readonly a: string
      readonly as: ReadonlyArray<A>
    }
    const schema: T.Transform<A, A> = T.lazy(() =>
      T.struct({
        a: T.string,
        as: T.array(schema)
      })
    )
    propertyTo(schema)
  })

  it("lazy/to record", () => {
    type A = {
      [_: string]: A
    }
    const schema: T.Transform<A, A> = T.lazy(() => T.record(T.string, schema))
    propertyTo(schema)
  })

  describe.concurrent("struct", () => {
    it("required property signature", () => {
      const schema = T.struct({ a: T.number })
      propertyTo(schema)
    })

    it("required property signature with undefined", () => {
      const schema = T.struct({ a: T.union(T.number, T.undefined) })
      propertyTo(schema)
    })

    it("optional property signature", () => {
      const schema = T.struct({ a: T.optional(T.number) })
      propertyTo(schema)
    })

    it("optional property signature with undefined", () => {
      const schema = T.struct({ a: T.optional(T.union(T.number, T.undefined)) })
      propertyTo(schema)
    })

    it("baseline", () => {
      const schema = T.struct({ a: T.string, b: T.number })
      propertyTo(schema)
    })
  })

  it("union", () => {
    const schema = T.union(T.string, T.number)
    propertyTo(schema)
  })

  it("record(string, string)", () => {
    const schema = T.record(T.string, T.string)
    propertyTo(schema)
  })

  it("record(symbol, string)", () => {
    const schema = T.record(T.symbol, T.string)
    propertyTo(schema)
  })

  it("minLength", () => {
    const schema = pipe(T.string, T.minLength(1))
    propertyTo(schema)
  })

  it("maxLength", () => {
    const schema = pipe(T.string, T.maxLength(2))
    propertyTo(schema)
  })

  it("lessThanOrEqualTo", () => {
    const schema = pipe(T.number, T.lessThanOrEqualTo(1))
    propertyTo(schema)
  })

  it("greaterThanOrEqualTo", () => {
    const schema = pipe(T.number, T.greaterThanOrEqualTo(1))
    propertyTo(schema)
  })

  it("lessThan", () => {
    const schema = pipe(T.number, T.lessThan(1))
    propertyTo(schema)
  })

  it("greaterThan", () => {
    const schema = pipe(T.number, T.greaterThan(1))
    propertyTo(schema)
  })

  it("startsWith", () => {
    const schema = pipe(T.string, T.startsWith("a"))
    propertyTo(schema)
  })

  it("endsWith", () => {
    const schema = pipe(T.string, T.endsWith("a"))
    propertyTo(schema)
  })

  it("int", () => {
    const schema = pipe(T.number, T.int())
    propertyTo(schema)
  })

  it("nonNaN", () => {
    const schema = pipe(T.number, T.nonNaN())
    propertyTo(schema)
  })

  it("finite", () => {
    const schema = pipe(T.number, T.finite())
    propertyTo(schema)
  })

  it("extend/ struct + record", () => {
    const schema = pipe(
      T.struct({ a: T.string }),
      T.extend(T.record(T.string, T.union(T.string, T.number)))
    )
    propertyTo(schema)
  })

  it("between + int", () => {
    const schema = pipe(T.number, T.between(1, 10), T.int())
    propertyTo(schema)
  })

  it("int + between", () => {
    const schema = pipe(T.number, T.int(), T.between(1, 10))
    propertyTo(schema)
  })
})
