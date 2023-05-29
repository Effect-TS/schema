import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"

describe.concurrent("rest", () => {
  it("should throw on unsupported schemas", () => {
    const schema = pipe(S.tuple(), S.filter(() => true))
    expect(() => pipe(schema, S.rest(S.number))).toThrowError(
      new Error("`rest` is not supported on this schema")
    )
  })
})
