import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"

describe.concurrent("to", () => {
  it("transform", () => {
    const schema = pipe(
      S.string,
      S.transform(
        S.tuple(S.numberFromString(S.string), S.numberFromString(S.string)),
        (s) => [s, s] as const,
        ([s]) => s
      ),
      S.to
    )
    expect(S.parse(schema)([1, 2])).toEqual([1, 2])
  })

  it("refinement", () => {
    const schema = pipe(
      S.string,
      S.minLength(1),
      S.maxLength(2),
      S.to
    )
    expect(S.is(schema)("")).toEqual(false)
    expect(S.is(schema)("a")).toEqual(true)
    expect(S.is(schema)("ab")).toEqual(true)
    expect(S.is(schema)("abc")).toEqual(false)
  })
})
