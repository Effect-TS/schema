import * as S from "@effect/schema/Schema"

describe.concurrent("struct", () => {
  it("struct should allow a \"constructor\" field name", () => {
    const schema = S.struct({ constructor: S.string })
    expect(schema.ast._tag).toEqual("TypeLiteral")
  })
})
