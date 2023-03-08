import * as E from "@effect/schema/Empty"
import * as S from "@effect/schema/Schema"

describe("Empty", () => {
  it("boolean", () => {
    const empty = E.empty(S.boolean)
    expect(empty).toBe(false)
  })

  it("string", () => {
    const empty = E.empty(S.string)
    expect(empty).toBe("")
  })

  it("number", () => {
    const empty = E.empty(S.number)
    expect(empty).toBe(0)
  })

  it("bigint", () => {
    const empty = E.empty(S.bigint)
    expect(empty).toBe(0n)
  })

  it("array", () => {
    const empty = E.empty(S.array(S.string))
    expect(empty).toEqual([])
  })

  it("tuple", () => {
    const empty = E.empty(S.tuple(S.string, S.number))
    expect(empty).toEqual(["", 0])
  })

  it("record", () => {
    const empty = E.empty(S.record(S.string, S.number))
    expect(empty).toEqual({})
  })

  it("struct", () => {
    const schema = S.struct({
      a: S.string,
      b: S.number,
      c: S.array(S.number),
      d: S.optional(S.boolean)
    })
    const empty = E.empty(schema)

    expect(empty).toEqual({ a: "", b: 0, c: [] })
  })

  it("struct - partial", () => {
    const schema = S.partial(S.struct({ a: S.string, b: S.number }))
    const empty = E.empty(schema)

    expect(empty).toEqual({})
  })

  it("object", () => {
    const empty = E.empty(S.object)
    expect(empty).toEqual({})
  })

  it("literal", () => {
    const empty = E.empty(S.literal(1))
    expect(empty).toBe(1)
  })

  it("enum", () => {
    enum e {
      a = "a",
      b = "b"
    }

    const empty = E.empty(S.enums(e))
    expect(empty).toBe(e.a)
  })

  it("union", () => {
    const schema = S.union(S.number, S.string)
    const empty = E.empty(schema)

    expect(empty).toEqual(0)
  })

  it("union - discriminated", () => {
    const schema = S.union(
      S.struct({ type: S.literal("a"), a: S.string }),
      S.struct({ type: S.literal("b"), b: S.number })
    )

    const empty = E.empty(schema)
    expect(empty).toEqual({ type: "a", a: "" })
  })

  it("void", () => {
    const empty = E.empty(S.void)
    expect(empty).toBeUndefined()
  })

  it("any", () => {
    const empty = E.empty(S.any)
    expect(empty).toBeUndefined()
  })

  it("unknown", () => {
    const empty = E.empty(S.undefined)
    expect(empty).toBeUndefined()
  })
})
