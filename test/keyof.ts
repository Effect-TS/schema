import { pipe } from "@effect/data/Function"
import * as AST from "@effect/schema/AST"
import * as P from "@effect/schema/Parser"
import * as T from "@effect/schema/Transform"

describe.concurrent("keyof", () => {
  it("struct/ string keys", () => {
    const schema = T.struct({
      a: T.string,
      b: T.number
    })
    const keyOf = T.keyof(schema)
    const is = P.is(keyOf)
    expect(is("a")).toEqual(true)
    expect(is("b")).toEqual(true)
    expect(is("c")).toEqual(false)
  })

  it("struct/ symbol keys", () => {
    const a = Symbol.for("@effect/schema/test/a")
    const b = Symbol.for("@effect/schema/test/b")
    const schema = T.struct({
      [a]: T.string,
      [b]: T.number
    })
    const keyOf = T.keyof(schema)
    const is = P.is(keyOf)
    expect(is(a)).toEqual(true)
    expect(is(b)).toEqual(true)
    expect(is("a")).toEqual(false)
    expect(is("b")).toEqual(false)
  })

  it("should unify string literals with string", () => {
    const schema = pipe(T.struct({ a: T.string }), T.extend(T.record(T.string, T.string)))
    expect(AST.keyof(schema.ast)).toEqual(T.string.ast)
  })

  it("should unify symbol literals with symbol", () => {
    const a = Symbol.for("@effect/schema/test/a")
    const schema = pipe(T.struct({ [a]: T.string }), T.extend(T.record(T.symbol, T.string)))
    expect(AST.keyof(schema.ast)).toEqual(T.symbol.ast)
  })

  it("lazy", () => {
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
    expect(AST.keyof(schema.ast)).toEqual(T.literal("name", "categories").ast)
  })

  it("should throw on unsupported schemas", () => {
    expect(() => AST.keyof(T.NumberFromString.ast)).toThrowError(
      new Error("keyof: unsupported schema (Transform)")
    )
  })
})
