import { pipe } from "@effect/data/Function"
import * as P from "@effect/schema/Parser"
import * as T from "@effect/schema/Transform"

describe.concurrent("endsWith", () => {
  it("Guard", () => {
    const schema = pipe(T.string, T.endsWith("a"))
    const is = P.is(schema)
    expect(is("a")).toEqual(true)
    expect(is("ba")).toEqual(true)

    expect(is("")).toEqual(false)
    expect(is("b")).toEqual(false)
  })
})
