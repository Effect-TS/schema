import * as S from "@effect/schema/Schema"

describe.concurrent("rest", () => {
  it("should throw on unsupported schemas", () => {
    const schema = S.tuple().pipe(S.filter(() => true))
    expect(() => schema.pipe(S.rest(S.number))).toThrowError(
      new Error("`rest` is not supported on this schema")
    )
  })
})
