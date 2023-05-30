import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("omit", () => {
  it("struct", async () => {
    const a = Symbol.for("@effect/schema/test/a")
    const schema = pipe(
      C.struct({ [a]: S.string, b: C.NumberFromString, c: S.boolean }),
      C.omit("c")
    )
    await Util.expectParseSuccess(schema, { [a]: "a", b: "1" }, { [a]: "a", b: 1 })

    await Util.expectParseFailure(
      schema,
      null,
      "Expected a generic object, actual null"
    )
    await Util.expectParseFailure(schema, { [a]: "a" }, `/b is missing`)
    await Util.expectParseFailure(
      schema,
      { b: "1" },
      `/Symbol(@effect/schema/test/a) is missing`
    )
  })

  it("struct with optionals", async () => {
    const schema = pipe(
      C.struct({ a: S.optional(S.string), b: C.NumberFromString, c: S.boolean }),
      C.omit("c")
    )
    await Util.expectParseSuccess(schema, { a: "a", b: "1" }, { a: "a", b: 1 })
    await Util.expectParseSuccess(schema, { b: "1" }, { b: 1 })

    await Util.expectParseFailure(schema, null, "Expected a generic object, actual null")
    await Util.expectParseFailure(schema, { a: "a" }, `/b is missing`)
  })

  it("recursive", async () => {
    interface A {
      readonly a: string
      readonly as: ReadonlyArray<A>
    }
    const A: C.Codec<A, A> = C.lazy(() =>
      C.struct({
        a: S.string,
        as: C.array(A)
      })
    )
    const schema = pipe(A, C.omit("a"))
    await Util.expectParseSuccess(schema, { as: [] })
    await Util.expectParseSuccess(schema, { as: [{ a: "a", as: [] }] })

    await Util.expectParseFailure(schema, { as: [{ as: [] }] }, `/as /0 /a is missing`)
  })

  it("struct with property signature transformations", async () => {
    const schema = pipe(
      C.struct({
        a: C.optional(S.string).withDefault(() => ""),
        b: C.NumberFromString,
        c: S.boolean
      }),
      C.omit("c")
    )
    await Util.expectParseSuccess(schema, { a: "a", b: "1" }, { a: "a", b: 1 })
    await Util.expectParseSuccess(schema, { b: "1" }, { a: "", b: 1 })
  })
})
