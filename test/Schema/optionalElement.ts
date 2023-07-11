import * as S from "@effect/schema/Schema"

describe.concurrent("optionalElement", () => {
  it("should throw on unsupported schemas", () => {
    const schema = S.tuple().pipe(S.filter(() => true))
    expect(() => schema.pipe(S.optionalElement(S.number))).toThrowError(
      new Error("`optionalElement` is not supported on this schema")
    )
  })
})
