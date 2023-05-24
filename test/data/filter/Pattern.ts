import { pipe } from "@effect/data/Function"
import * as T from "@effect/schema/Transform"

describe.concurrent("pattern", () => {
  it("Guard", () => {
    const schema = pipe(T.string, T.pattern(/^abb+$/))
    const is = T.is(schema)
    expect(is("abb")).toEqual(true)
    expect(is("abbb")).toEqual(true)

    expect(is("ab")).toEqual(false)
    expect(is("a")).toEqual(false)
  })

  it("should reset lastIndex to 0 before each `test` call (#88)", () => {
    const regex = /^(A|B)$/g
    const schema: T.Transform<string, string> = pipe(
      T.string,
      T.pattern(regex)
    )
    expect(T.decode(schema)("A")).toEqual("A")
    expect(T.decode(schema)("A")).toEqual("A")
  })
})
