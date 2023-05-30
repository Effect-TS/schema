import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"

describe.concurrent("propertySignature", () => {
  it("should add annotations to propertySignature", () => {
    const schema = C.struct({
      a: C.propertySignature(S.string, { a: "a" })
    })
    const ast: any = schema.ast
    expect(ast.propertySignatures[0].annotations).toEqual({ a: "a" })
  })
})
