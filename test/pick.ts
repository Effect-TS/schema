import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("pick", () => {
  it("struct", async () => {
    const a = Symbol.for("@effect/schema/test/a")
    const schema = pipe(
      T.struct({ [a]: S.string, b: T.NumberFromString, c: S.boolean }),
      T.pick(a, "b")
    )
    await Util.expectParseSuccess(schema, { [a]: "a", b: "1" }, { [a]: "a", b: 1 })

    await Util.expectParseFailure(schema, null, "Expected a generic object, actual null")
    await Util.expectParseFailure(schema, { [a]: "a" }, `/b is missing`)
    await Util.expectParseFailure(
      schema,
      { b: 1 },
      `/Symbol(@effect/schema/test/a) is missing`
    )
  })

  it("struct with optionals", async () => {
    const schema = pipe(
      T.struct({ a: T.optional(S.string), b: T.NumberFromString, c: S.boolean }),
      T.pick("a", "b")
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
    const A: T.Transform<A, A> = T.lazy(() =>
      T.struct({
        a: S.string,
        as: T.array(A)
      })
    )
    const schema = pipe(A, T.pick("as"))
    await Util.expectParseSuccess(schema, { as: [] })
    await Util.expectParseSuccess(schema, { as: [{ a: "a", as: [] }] })

    await Util.expectParseFailure(schema, { as: [{ as: [] }] }, `/as /0 /a is missing`)
  })

  it("struct with property signature transformations", async () => {
    const schema = pipe(
      T.struct({
        a: T.optional(S.string).withDefault(() => ""),
        b: T.NumberFromString,
        c: S.boolean
      }),
      T.pick("a", "b")
    )
    await Util.expectParseSuccess(schema, { a: "a", b: "1" }, { a: "a", b: 1 })
    await Util.expectParseSuccess(schema, { b: "1" }, { a: "", b: 1 })
  })
})
