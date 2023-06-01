import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("to", () => {
  it("transform", () => {
    const schema = pipe(
      S.string,
      C.transform(
        C.tuple(C.NumberFromString, C.NumberFromString),
        (s) => [s, s] as const,
        ([s]) => s
      ),
      C.to
    )
    expect(C.parse(schema)([1, 2])).toEqual([1, 2])
  })

  it("filter", () => {
    const schema = pipe(
      C.NumberFromString,
      C.andThen(S.greaterThanOrEqualTo(1)),
      C.andThen(S.lessThanOrEqualTo(2)),
      C.to
    )
    expect(S.is(schema)(0)).toEqual(false)
    expect(S.is(schema)(1)).toEqual(true)
    expect(S.is(schema)(2)).toEqual(true)
    expect(S.is(schema)(3)).toEqual(false)
  })

  it("lazy", async () => {
    interface I {
      prop: I | string
    }
    interface A {
      prop: A | number
    }
    const schema: C.Codec<I, A> = C.lazy(() =>
      C.struct({
        prop: C.union(C.NumberFromString, schema)
      })
    )
    const to = C.to(schema)
    await Util.expectParseSuccess(to, { prop: 1 })
    await Util.expectParseSuccess(to, { prop: { prop: 1 } })
  })
})
