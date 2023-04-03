import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"

describe.concurrent("to", () => {
  it("transform", () => {
    const to_ = S.tuple(S.numberFromString(S.string), S.numberFromString(S.string))
    const schema = pipe(
      S.string,
      S.transform(
        to_,
        (s) => [s, s] as const,
        ([s]) => s
      )
    )
    const to = S.to(schema)
    expect(S.parse(to)([1, 2])).toEqual([1, 2])
  })
})
