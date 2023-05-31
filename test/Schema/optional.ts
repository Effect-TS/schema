import * as S from "@effect/schema/Schema"

describe.concurrent("optional", () => {
  it("should add annotations", () => {
    const schema = S.struct({
      a: S.optional(S.string, { a: "a" })
    })
    const ast: any = schema.ast
    expect(ast.propertySignatures[0].annotations).toEqual({ a: "a" })
  })
})
