import { pipe } from "@fp-ts/data/Function"
import * as _ from "@fp-ts/schema/data/filter"
import * as P from "@fp-ts/schema/Parser"
import * as S from "@fp-ts/schema/Schema"

describe.concurrent("startsWith", () => {
  it("Guard", () => {
    const schema = pipe(S.string, S.startsWith("a"))
    const is = P.is(schema)
    expect(is("a")).toEqual(true)
    expect(is("ab")).toEqual(true)

    expect(is("")).toEqual(false)
    expect(is("b")).toEqual(false)
  })
})
