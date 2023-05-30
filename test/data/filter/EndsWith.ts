import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"

describe.concurrent("endsWith", () => {
  it("is", () => {
    const schema = pipe(S.string, S.endsWith("a"))
    const is = S.is(schema)
    expect(is("a")).toEqual(true)
    expect(is("ba")).toEqual(true)

    expect(is("")).toEqual(false)
    expect(is("b")).toEqual(false)
  })
})
