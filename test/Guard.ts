import { pipe } from "@effect/data/Function"
import * as P from "@effect/schema/Parser"
import * as S from "@effect/schema/Schema"
import * as T from "@effect/schema/Transform"

describe.concurrent("is", () => {
  it("never", () => {
    const is = P.is(T.never)
    expect(is(1)).toEqual(false)
  })

  it("string", () => {
    const is = P.is(T.string)
    expect(is("a")).toEqual(true)
    expect(is(1)).toEqual(false)
  })

  it("number", () => {
    const is = P.is(T.number)
    expect(is(1)).toEqual(true)
    expect(is(NaN)).toEqual(true)
    expect(is(Infinity)).toEqual(true)
    expect(is(-Infinity)).toEqual(true)
    expect(is("a")).toEqual(false)
  })

  it("boolean", () => {
    const is = P.is(T.boolean)
    expect(is(true)).toEqual(true)
    expect(is(false)).toEqual(true)
    expect(is(1)).toEqual(false)
  })

  it("bigint", () => {
    const is = P.is(T.bigint)
    expect(is(0n)).toEqual(true)
    expect(is(1n)).toEqual(true)
    expect(is(BigInt("1"))).toEqual(true)
    expect(is(null)).toEqual(false)
    expect(is(1.2)).toEqual(false)
  })

  it("symbol", () => {
    const a = Symbol.for("@effect/schema/test/a")
    const is = P.is(T.symbol)
    expect(is(a)).toEqual(true)
    expect(is("@effect/schema/test/a")).toEqual(false)
  })

  it("object", () => {
    const is = P.is(T.object)
    expect(is({})).toEqual(true)
    expect(is([])).toEqual(true)
    expect(is(null)).toEqual(false)
    expect(is("a")).toEqual(false)
    expect(is(1)).toEqual(false)
    expect(is(true)).toEqual(false)
  })

  it("literal 1 member", () => {
    const schema = T.literal(1)
    const is = P.is(schema)
    expect(is(1)).toEqual(true)
    expect(is("a")).toEqual(false)
    expect(is(null)).toEqual(false)
  })

  it("literal 2 members", () => {
    const schema = T.literal(1, "a")
    const is = P.is(schema)
    expect(is(1)).toEqual(true)
    expect(is("a")).toEqual(true)
    expect(is(null)).toEqual(false)
  })

  it("uniqueSymbol", () => {
    const a = Symbol.for("@effect/schema/test/a")
    const schema = T.uniqueSymbol(a)
    const is = P.is(schema)
    expect(is(a)).toEqual(true)
    expect(is(Symbol.for("@effect/schema/test/a"))).toEqual(true)
    expect(is("Symbol(@effect/schema/test/a)")).toEqual(false)
  })

  it("Numeric enums", () => {
    enum Fruits {
      Apple,
      Banana
    }
    const schema = T.enums(Fruits)
    const is = P.is(schema)
    expect(is(Fruits.Apple)).toEqual(true)
    expect(is(Fruits.Banana)).toEqual(true)
    expect(is(0)).toEqual(true)
    expect(is(1)).toEqual(true)
    expect(is(3)).toEqual(false)
  })

  it("String enums", () => {
    enum Fruits {
      Apple = "apple",
      Banana = "banana",
      Cantaloupe = 0
    }
    const schema = T.enums(Fruits)
    const is = P.is(schema)
    expect(is(Fruits.Apple)).toEqual(true)
    expect(is(Fruits.Cantaloupe)).toEqual(true)
    expect(is("apple")).toEqual(true)
    expect(is("banana")).toEqual(true)
    expect(is(0)).toEqual(true)
    expect(is("Cantaloupe")).toEqual(false)
  })

  it("Const enums", () => {
    const Fruits = {
      Apple: "apple",
      Banana: "banana",
      Cantaloupe: 3
    } as const
    const schema = T.enums(Fruits)
    const is = P.is(schema)
    expect(is("apple")).toEqual(true)
    expect(is("banana")).toEqual(true)
    expect(is(3)).toEqual(true)
    expect(is("Cantaloupe")).toEqual(false)
  })

  it("tuple. empty", () => {
    const schema = T.tuple()
    const is = P.is(schema)
    expect(is([])).toEqual(true)

    expect(is(null)).toEqual(false)
    expect(is([undefined])).toEqual(false)
    expect(is([1])).toEqual(false)
    expect(is({})).toEqual(false)
  })

  it("tuple. required element", () => {
    const schema = T.tuple(T.number)
    const is = P.is(schema)
    expect(is([1])).toEqual(true)

    expect(is(null)).toEqual(false)
    expect(is([])).toEqual(false)
    expect(is([undefined])).toEqual(false)
    expect(is(["a"])).toEqual(false)
    expect(is([1, "b"])).toEqual(false)
  })

  it("tuple. required element with undefined", () => {
    const schema = T.tuple(T.union(T.number, T.undefined))
    const is = P.is(schema)
    expect(is([1])).toEqual(true)
    expect(is([undefined])).toEqual(true)

    expect(is(null)).toEqual(false)
    expect(is([])).toEqual(false)
    expect(is(["a"])).toEqual(false)
    expect(is([1, "b"])).toEqual(false)
  })

  it("tuple. optional element", () => {
    const schema = pipe(T.tuple(), T.optionalElement(T.number))
    const is = P.is(schema)
    expect(is([])).toEqual(true)
    expect(is([1])).toEqual(true)

    expect(is(null)).toEqual(false)
    expect(is(["a"])).toEqual(false)
    expect(is([undefined])).toEqual(false)
    expect(is([1, "b"])).toEqual(false)
  })

  it("tuple. optional element with undefined", () => {
    const schema = pipe(T.tuple(), T.optionalElement(T.union(T.number, T.undefined)))
    const is = P.is(schema)
    expect(is([])).toEqual(true)
    expect(is([1])).toEqual(true)
    expect(is([undefined])).toEqual(true)

    expect(is(null)).toEqual(false)
    expect(is(["a"])).toEqual(false)
    expect(is([1, "b"])).toEqual(false)
  })

  it("tuple. e + e?", () => {
    const schema = pipe(T.tuple(T.string), T.optionalElement(T.number))
    const is = P.is(schema)
    expect(is(["a"])).toEqual(true)
    expect(is(["a", 1])).toEqual(true)

    expect(is([1])).toEqual(false)
    expect(is(["a", "b"])).toEqual(false)
  })

  it("tuple. e + r", () => {
    const schema = pipe(T.tuple(T.string), T.rest(T.number))
    const is = P.is(schema)
    expect(is(["a"])).toEqual(true)
    expect(is(["a", 1])).toEqual(true)
    expect(is(["a", 1, 2])).toEqual(true)

    expect(is([])).toEqual(false)
  })

  it("tuple. e? + r", () => {
    const schema = pipe(T.tuple(), T.optionalElement(T.string), T.rest(T.number))
    const is = P.is(schema)
    expect(is([])).toEqual(true)
    expect(is(["a"])).toEqual(true)
    expect(is(["a", 1])).toEqual(true)
    expect(is(["a", 1, 2])).toEqual(true)

    expect(is([1])).toEqual(false)
  })

  it("tuple. r", () => {
    const schema = T.array(T.number)
    const is = P.is(schema)
    expect(is([])).toEqual(true)
    expect(is([1])).toEqual(true)
    expect(is([1, 2])).toEqual(true)

    expect(is(["a"])).toEqual(false)
    expect(is([1, "a"])).toEqual(false)
  })

  it("tuple. r + e", () => {
    const schema = pipe(T.array(T.string), T.element(T.number))
    const is = P.is(schema)
    expect(is([1])).toEqual(true)
    expect(is(["a", 1])).toEqual(true)
    expect(is(["a", "b", 1])).toEqual(true)

    expect(is([])).toEqual(false)
    expect(is(["a"])).toEqual(false)
    expect(is([1, 2])).toEqual(false)
  })

  it("tuple. e + r + e", () => {
    const schema = pipe(T.tuple(T.string), T.rest(T.number), T.element(T.boolean))
    const is = P.is(schema)
    expect(is(["a", true])).toEqual(true)
    expect(is(["a", 1, true])).toEqual(true)
    expect(is(["a", 1, 2, true])).toEqual(true)

    expect(is([])).toEqual(false)
    expect(is(["a"])).toEqual(false)
    expect(is([true])).toEqual(false)
    expect(is(["a", 1])).toEqual(false)
    expect(is([1, true])).toEqual(false)
  })

  it("struct. empty", () => {
    const schema = T.struct({})
    const is = P.is(schema)
    expect(is({})).toEqual(true)
    expect(is({ a: 1 })).toEqual(true)
    expect(is([])).toEqual(true)

    expect(is(null)).toEqual(false)
    expect(is(undefined)).toEqual(false)
  })

  describe.concurrent("struct", () => {
    it("required property signature", () => {
      const schema = T.struct({ a: T.number })
      const is = P.is(schema)
      expect(is({ a: 1 })).toEqual(true)
      expect(is({ a: 1, b: "b" })).toEqual(true)

      expect(is(null)).toEqual(false)
      expect(is({})).toEqual(false)
      expect(is({ a: undefined })).toEqual(false)
      expect(is({ a: "a" })).toEqual(false)
    })

    it("required property signature with undefined", () => {
      const schema = T.struct({ a: T.union(T.number, T.undefined) })
      const is = P.is(schema)
      expect(is({ a: 1 })).toEqual(true)
      expect(is({ a: undefined })).toEqual(true)
      expect(is({ a: 1, b: "b" })).toEqual(true)

      expect(is(null)).toEqual(false)
      expect(is({})).toEqual(false)
      expect(is({ a: "a" })).toEqual(false)
    })

    it("optional property signature", () => {
      const schema = T.struct({ a: T.optional(T.number) })
      const is = P.is(schema)
      expect(is({})).toEqual(true)
      expect(is({ a: 1 })).toEqual(true)
      expect(is({ a: 1, b: "b" })).toEqual(true)

      expect(is(null)).toEqual(false)
      expect(is({ a: "a" })).toEqual(false)
      expect(is({ a: undefined })).toEqual(false)
    })

    it("optional property signature with undefined", () => {
      const schema = T.struct({ a: T.optional(T.union(T.number, T.undefined)) })
      const is = P.is(schema)
      expect(is({})).toEqual(true)
      expect(is({ a: 1 })).toEqual(true)
      expect(is({ a: undefined })).toEqual(true)
      expect(is({ a: 1, b: "b" })).toEqual(true)

      expect(is(null)).toEqual(false)
      expect(is({ a: "a" })).toEqual(false)
    })
  })

  it("record(string, string)", () => {
    const a = Symbol.for("@effect/schema/test/a")
    const schema = T.record(T.string, T.string)
    const is = P.is(schema)
    expect(is(null)).toEqual(false)
    expect(is({})).toEqual(true)
    expect(is({ a: "a" })).toEqual(true)
    expect(is({ a: 1 })).toEqual(false)
    expect(is({ [a]: 1 })).toEqual(true)
    expect(is({ a: "a", b: "b" })).toEqual(true)
    expect(is({ a: "a", b: 1 })).toEqual(false)
    expect(is({ [a]: 1, b: "b" })).toEqual(true)
  })

  it("record(symbol, string)", () => {
    const a = Symbol.for("@effect/schema/test/a")
    const b = Symbol.for("@effect/schema/test/b")
    const schema = T.record(T.symbol, T.string)
    const is = P.is(schema)
    expect(is(null)).toEqual(false)
    expect(is({})).toEqual(true)
    expect(is({ [a]: "a" })).toEqual(true)
    expect(is({ [a]: 1 })).toEqual(false)
    expect(is({ a: 1 })).toEqual(true)
    expect(is({ [a]: "a", [b]: "b" })).toEqual(true)
    expect(is({ [a]: "a", [b]: 1 })).toEqual(false)
    expect(is({ a: 1, [b]: "b" })).toEqual(true)
  })

  it("record(never, number)", () => {
    const schema = T.record(T.never, T.number)
    const is = P.is(schema)
    expect(is({})).toEqual(true)
    expect(is({ a: 1 })).toEqual(true)
  })

  it("record('a' | 'b', number)", () => {
    const schema = T.record(S.union(S.literal("a"), S.literal("b")), T.number)
    const is = P.is(schema)
    expect(is({ a: 1, b: 2 })).toEqual(true)

    expect(is({})).toEqual(false)
    expect(is({ a: 1 })).toEqual(false)
    expect(is({ b: 2 })).toEqual(false)
  })

  it("record(keyof struct({ a, b }), number)", () => {
    const schema = T.record(S.keyof(S.struct({ a: T.string, b: T.string })), T.number)
    const is = P.is(schema)
    expect(is({ a: 1, b: 2 })).toEqual(true)

    expect(is({})).toEqual(false)
    expect(is({ a: 1 })).toEqual(false)
    expect(is({ b: 2 })).toEqual(false)
    expect(is({ a: "a" })).toEqual(false)
  })

  it("record(keyof struct({ a, b } & Record<string, string>), number)", () => {
    const schema = T.record(
      S.keyof(pipe(S.struct({ a: T.string, b: T.string }), S.extend(S.record(T.string, T.string)))),
      T.number
    )
    const is = P.is(schema)
    expect(is({ a: 1, b: 2 })).toEqual(true)
    expect(is({})).toEqual(true)
    expect(is({ a: 1 })).toEqual(true)
    expect(is({ b: 2 })).toEqual(true)

    expect(is({ a: "a" })).toEqual(false)
  })

  it("record(keyof struct({ a, b } & Record<symbol, string>), number)", () => {
    const schema = T.record(
      S.keyof(pipe(S.struct({ a: T.string, b: T.string }), S.extend(S.record(T.symbol, T.string)))),
      S.number
    )
    const is = P.is(schema)
    expect(is({ a: 1, b: 2 })).toEqual(true)
    const c = Symbol.for("@effect/schema/test/c")
    expect(is({ a: 1, b: 2, [c]: 3 })).toEqual(true)

    expect(is({})).toEqual(false)
    expect(is({ a: 1 })).toEqual(false)
    expect(is({ b: 2 })).toEqual(false)
    expect(is({ a: "a" })).toEqual(false)
    expect(is({ a: 1, b: 2, [c]: "c" })).toEqual(false)
  })

  it("record(Symbol('a') | Symbol('b'), number)", () => {
    const a = Symbol.for("@effect/schema/test/a")
    const b = Symbol.for("@effect/schema/test/b")
    const schema = T.record(S.union(S.uniqueSymbol(a), S.uniqueSymbol(b)), T.number)
    const is = P.is(schema)
    expect(is({ [a]: 1, [b]: 2 })).toEqual(true)

    expect(is({})).toEqual(false)
    expect(is({ a: 1 })).toEqual(false)
    expect(is({ b: 2 })).toEqual(false)
  })

  it("record(${string}-${string}, number)", () => {
    const schema = T.record(T.templateLiteral(T.string, T.literal("-"), T.string), T.number)
    const is = P.is(schema)
    expect(is({})).toEqual(true)
    expect(is({ "-": 1 })).toEqual(true)
    expect(is({ "a-": 1 })).toEqual(true)
    expect(is({ "-b": 1 })).toEqual(true)
    expect(is({ "a-b": 1 })).toEqual(true)

    expect(is({ "": 1 })).toEqual(false)
    expect(is({ "-": "a" })).toEqual(false)
  })

  it("record(minLength(1), number)", () => {
    const schema = T.record(pipe(S.string, S.minLength(2)), T.number)
    const is = P.is(schema)
    expect(is({})).toEqual(true)
    expect(is({ "aa": 1 })).toEqual(true)
    expect(is({ "aaa": 1 })).toEqual(true)

    expect(is({ "": 1 })).toEqual(false)
    expect(is({ "a": 1 })).toEqual(false)
  })

  it("union", () => {
    const schema = T.union(T.string, T.number)
    const is = P.is(schema)
    expect(is(null)).toEqual(false)
    expect(is(1)).toEqual(true)
    expect(is("a")).toEqual(true)
  })

  describe.concurrent("lazy", () => {
    it("baseline", () => {
      interface Category {
        readonly name: string
        readonly categories: ReadonlyArray<Category>
      }
      const schema: T.Transform<Category, Category> = T.lazy(() =>
        T.struct({
          name: T.string,
          categories: T.array(schema)
        })
      )
      const is = P.is(schema)
      expect(is({ name: "a", categories: [] })).toEqual(true)
      expect(
        is({
          name: "a",
          categories: [{
            name: "b",
            categories: [{ name: "c", categories: [] }]
          }]
        })
      ).toEqual(true)
      expect(is({ name: "a", categories: [1] })).toEqual(false)
    })

    it("mutually recursive", () => {
      interface A {
        readonly a: string
        readonly bs: ReadonlyArray<B>
      }
      interface B {
        readonly b: number
        readonly as: ReadonlyArray<A>
      }
      const schemaA: T.Transform<A, A> = T.lazy(() =>
        T.struct({
          a: T.string,
          bs: T.array(schemaB)
        })
      )
      const schemaB: T.Transform<B, B> = T.lazy(() =>
        T.struct({
          b: T.number,
          as: T.array(schemaA)
        })
      )
      const isA = P.is(schemaA)
      expect(isA({ a: "a1", bs: [] })).toEqual(true)
      expect(isA({ a: "a1", bs: [{ b: 1, as: [] }] })).toEqual(true)
      expect(
        isA({ a: "a1", bs: [{ b: 1, as: [{ a: "a2", bs: [] }] }] })
      ).toEqual(true)
      expect(
        isA({ a: "a1", bs: [{ b: 1, as: [{ a: "a2", bs: [null] }] }] })
      ).toEqual(false)
    })
  })

  it("union", () => {
    const schema = T.union(T.string, T.number)
    const is = P.is(schema)
    expect(is(null)).toEqual(false)
    expect(is(1)).toEqual(true)
    expect(is("a")).toEqual(true)
  })

  describe.concurrent("rest", () => {
    it("baseline", () => {
      const schema = pipe(T.tuple(T.string, T.number), T.rest(T.boolean))
      const is = P.is(schema)
      expect(is(["a", 1])).toEqual(true)
      expect(is(["a", 1, true])).toEqual(true)
      expect(is(["a", 1, true, false])).toEqual(true)
      expect(is(["a", 1, true, "a"])).toEqual(false)
      expect(is(["a", 1, true, "a", true])).toEqual(false)
    })
  })

  describe.concurrent("extend", () => {
    it("struct", () => {
      const schema = pipe(
        T.struct({ a: T.string }),
        T.extend(T.struct({ b: T.number }))
      )
      const is = P.is(schema)
      expect(is({ a: "a", b: 1 })).toEqual(true)

      expect(is({})).toEqual(false)
      expect(is({ a: "a" })).toEqual(false)
    })

    it("record(string, string)", () => {
      const schema = pipe(
        T.struct({ a: T.string }),
        T.extend(T.record(T.string, T.string))
      )
      const is = P.is(schema)
      expect(is({ a: "a" })).toEqual(true)
      expect(is({ a: "a", b: "b" })).toEqual(true)

      expect(is({})).toEqual(false)
      expect(is({ b: "b" })).toEqual(false)
      expect(is({ a: 1 })).toEqual(false)
      expect(is({ a: "a", b: 2 })).toEqual(false)
    })
  })

  it("nonEmpty", () => {
    const schema = pipe(T.string, T.nonEmpty())
    const is = P.is(schema)
    expect(is("a")).toEqual(true)
    expect(is("aa")).toEqual(true)

    expect(is("")).toEqual(false)
  })
})
