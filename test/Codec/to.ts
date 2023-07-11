import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("to", async () => {
  it("Transform", async () => {
    const schema = S.string.pipe(
      C.transform(
        C.tuple(C.NumberFromString, C.NumberFromString),
        (s) => [s, s] as const,
        ([s]) => s
      ),
      C.to
    )
    await Util.expectParseSuccess(schema, [1, 2])
  })

  it("Refinement", async () => {
    const schema = C.NumberFromString.pipe(
      C.compose(S.number.pipe(S.greaterThanOrEqualTo(1), S.lessThanOrEqualTo(2))),
      C.to
    )
    await Util.expectParseFailure(
      schema,
      0,
      "Expected a number greater than or equal to 1, actual 0"
    )
    await Util.expectParseSuccess(schema, 1)
    await Util.expectParseSuccess(schema, 2)
    await Util.expectParseFailure(schema, 3, "Expected a number less than or equal to 2, actual 3")
  })

  it("Refinement (struct)", async () => {
    const schema = C.struct({
      a: C.NumberFromString.pipe(C.compose(S.number.pipe(S.greaterThanOrEqualTo(1))))
    }).pipe(
      C.filter(({ a }) => a > 0),
      C.to
    )
    await Util.expectParseSuccess(schema, { a: 1 })
  })

  it("Lazy", async () => {
    interface I {
      prop: I | string
    }
    interface A {
      prop: A | number
    }
    const codec: C.Codec<I, A> = C.lazy(() =>
      C.struct({
        prop: C.union(C.NumberFromString, codec)
      })
    )
    const to = C.to(codec)
    await Util.expectParseSuccess(to, { prop: 1 })
    await Util.expectParseSuccess(to, { prop: { prop: 1 } })
  })
})
