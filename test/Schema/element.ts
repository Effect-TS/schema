import * as S from "@effect/schema/Schema"

describe.concurrent("element", () => {
  it("should throw on unsupported schemas", () => {
    const schema = S.tuple().pipe(S.filter(() => true))
    expect(() => schema.pipe(S.element(S.number))).toThrowError(
      new Error("`element` is not supported on this schema")
    )
  })
})
