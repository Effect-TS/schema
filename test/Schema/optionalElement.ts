import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"

describe.concurrent("optionalElement", () => {
  it("should throw on unsupported schemas", () => {
    const schema = pipe(S.tuple(), S.filter(() => true))
    expect(() => pipe(schema, S.optionalElement(S.number))).toThrowError(
      new Error("`optionalElement` is not supported on this schema")
    )
  })
})
