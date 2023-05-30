import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"

describe.concurrent("startsWith", () => {
  it("is", () => {
    const schema = pipe(S.string, S.startsWith("a"))
    const is = S.is(schema)
    expect(is("a")).toEqual(true)
    expect(is("ab")).toEqual(true)

    expect(is("")).toEqual(false)
    expect(is("b")).toEqual(false)
  })
})
