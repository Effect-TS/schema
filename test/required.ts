import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

const NumberFromString = S.numberFromString(S.string)

describe.concurrent("required", () => {
  it("struct", async () => {
    const schema = S.required(S.struct({
      a: S.optional(pipe(NumberFromString, S.greaterThan(0)))
    }))

    await Util.expectParseSuccess(schema, { a: "1" }, { a: 1 })
    await Util.expectParseFailure(schema, {}, "/a is missing")
    await Util.expectParseFailure(
      schema,
      { a: "-1" },
      "/a Expected a number greater than 0, actual -1"
    )
  })

  it("tuple/ e?", async () => {
    // type A = [string?]
    // type B = Required<A>
    const schema = S.required(pipe(S.tuple(), S.optionalElement(NumberFromString)))

    await Util.expectParseSuccess(schema, ["1"], [1])
    await Util.expectParseFailure(schema, [], "/0 is missing")
  })

  it("tuple/ e + e?", async () => {
    const schema = S.required(pipe(S.tuple(NumberFromString), S.optionalElement(S.string)))

    await Util.expectParseSuccess(schema, ["0", ""], [0, ""])
    await Util.expectParseFailure(schema, ["0"], "/1 is missing")
  })

  it("tuple/ e + r + e", async () => {
    // type A = readonly [string, ...Array<number>, boolean]
    // type B = Required<A> // [string, ...(number | boolean)[], number | boolean]

    const schema = S.required(pipe(S.tuple(S.string), S.rest(S.number), S.element(S.boolean)))

    await Util.expectParseSuccess(schema, ["", 0], ["", 0])
    await Util.expectParseSuccess(schema, ["", true], ["", true])
    await Util.expectParseSuccess(schema, ["", true, 0], ["", true, 0])
    await Util.expectParseSuccess(schema, ["", 0, true], ["", 0, true])

    await Util.expectParseFailure(schema, [], "/0 is missing")
    await Util.expectParseFailure(schema, [""], "/1 is missing")
  })

  it("tuple/ e + r + 2e", async () => {
    // type A = readonly [string, ...Array<number>, boolean, boolean]
    // type B = Required<A> // [string, ...(number | boolean)[], number | boolean, number | boolean]

    const schema = S.required(
      pipe(S.tuple(S.string), S.rest(S.number), S.element(S.boolean), S.element(S.boolean))
    )

    await Util.expectParseSuccess(schema, ["", 0, true])
    await Util.expectParseSuccess(schema, ["", 0, true, false])
    await Util.expectParseSuccess(schema, ["", 0, 1, 2, 3, true, false])

    await Util.expectParseFailure(schema, [], "/0 is missing")
    await Util.expectParseFailure(schema, [""], "/1 is missing")
    await Util.expectParseFailure(schema, ["", true], "/2 is missing")
    await Util.expectParseFailure(
      schema,
      ["", 0, "a"],
      `/2 union member: Expected number, actual "a", union member: Expected boolean, actual "a"`
    )
  })

  it("required/refinement", () => {
    const schema = pipe(
      S.struct({ a: S.optional(S.string), b: S.optional(S.string) }),
      S.filter(({ a, b }) => a === b),
      S.required
    )
    expect(schema.ast).toEqual(S.struct({ a: S.string, b: S.string }).ast)
  })

  it("required/transform", () => {
    const schema = pipe(
      S.string,
      S.transform(S.struct({ a: S.optional(S.string) }), (a) => ({ a }), ({ a }) => a || ""),
      S.required
    )
    expect(schema.ast).toEqual(S.struct({ a: S.string }).ast)
  })
})
