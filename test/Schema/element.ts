import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"

describe.concurrent("element", () => {
  it("should throw on unsupported schemas", () => {
    const schema = pipe(S.tuple(), S.filter(() => true))
    expect(() => pipe(schema, S.element(S.number))).toThrowError(
      new Error("`element` is not supported on this schema")
    )
  })
})
