import * as E from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import { either } from "@effect/schema/data/Either"
import * as _ from "@effect/schema/Empty"
import * as S from "@effect/schema/Schema"

describe("Empty", () => {
  it("boolean", () => {
    const empty = _.empty(S.boolean)
    expect(empty).toBe(false)
  })

  it("date", () => {
    const empty = _.empty(S.date)
    expect(empty).toEqual(new Date(0))
  })

  it("string", () => {
    const empty = _.empty(S.string)
    expect(empty).toBe("")
  })

  it("number", () => {
    const empty = _.empty(S.number)
    expect(empty).toBe(0)
  })

  it("template literal", () => {
    const schema = S.templateLiteral(S.literal("a"), S.string, S.literal("b"))
    const empty = _.empty(schema)

    expect(empty).toBe("ab")
  })

  it("transform", () => {
    const schema: S.Schema<readonly [string]> = pipe(
      S.string,
      S.transform(S.tuple(S.string), (s) => [s], ([s]) => s)
    )
    const empty = _.empty(schema)

    expect(empty).toEqual([""])
  })

  it("option", () => {
    const schema = S.option(S.string)
    const empty = _.empty(schema)

    expect(empty).toEqual(O.none())
  })

  it("either", () => {
    const schemaStr = either(S.string, S.number)
    const emptyStr = _.empty(schemaStr)

    const schemaNum = either(S.number, S.number)
    const emptyNum = _.empty(schemaNum)

    expect(emptyStr).toEqual(E.left(""))
    expect(emptyNum).toEqual(E.left(0))
  })

  it("bigint", () => {
    const empty = _.empty(S.bigint)
    expect(empty).toBe(0n)
  })

  it("array", () => {
    const empty = _.empty(S.array(S.string))
    expect(empty).toEqual([])
  })

  it("tuple", () => {
    const empty = _.empty(S.tuple(S.string, S.number))
    expect(empty).toEqual(["", 0])
  })

  it("record", () => {
    const empty = _.empty(S.record(S.string, S.number))
    expect(empty).toEqual({})
  })

  it("struct", () => {
    const schema = S.struct({
      a: S.string,
      b: S.number,
      c: S.array(S.number),
      d: S.optional(S.boolean)
    })
    const empty = _.empty(schema)

    expect(empty).toEqual({ a: "", b: 0, c: [] })
  })

  it("struct - partial", () => {
    const schema = S.partial(S.struct({ a: S.string, b: S.number }))
    const empty = _.empty(schema)

    expect(empty).toEqual({})
  })

  it("object", () => {
    const empty = _.empty(S.object)
    expect(empty).toEqual({})
  })

  it("literal", () => {
    const empty = _.empty(S.literal(1))
    expect(empty).toBe(1)
  })

  it("enum", () => {
    enum e {
      a = "a",
      b = "b"
    }

    const empty = _.empty(S.enums(e))
    expect(empty).toBe(e.a)
  })

  it("union", () => {
    const schema = S.union(S.number, S.string)
    const empty = _.empty(schema)

    expect(empty).toEqual(0)
  })

  it("union - discriminated", () => {
    const schema = S.union(
      S.struct({ type: S.literal("a"), a: S.string }),
      S.struct({ type: S.literal("b"), b: S.number })
    )

    const empty = _.empty(schema)
    expect(empty).toEqual({ type: "a", a: "" })
  })

  it("void", () => {
    const empty = _.empty(S.void)
    expect(empty).toBeUndefined()
  })

  it("any", () => {
    const empty = _.empty(S.any)
    expect(empty).toBeUndefined()
  })

  it("unknown", () => {
    const empty = _.empty(S.undefined)
    expect(empty).toBeUndefined()
  })
})
