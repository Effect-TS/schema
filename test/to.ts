import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("to", () => {
  it("transform", () => {
    const schema = pipe(
      S.string,
      T.transform(
        T.tuple(T.NumberFromString, T.NumberFromString),
        (s) => [s, s] as const,
        ([s]) => s
      ),
      T.to
    )
    expect(T.parse(schema)([1, 2])).toEqual([1, 2])
  })

  it("refinement", () => {
    const schema = pipe(
      T.NumberFromString,
      T.filter(S.greaterThanOrEqualTo(1)),
      T.filter(S.lessThanOrEqualTo(2)),
      T.to
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
    const schema: T.Transform<I, A> = T.lazy(() =>
      T.struct({
        prop: T.union(T.NumberFromString, schema)
      })
    )
    const to = T.to(schema)
    await Util.expectParseSuccess(to, { prop: 1 })
    await Util.expectParseSuccess(to, { prop: { prop: 1 } })
  })
})
