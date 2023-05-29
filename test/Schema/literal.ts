import * as AST from "@effect/schema/AST"
import * as S from "@effect/schema/Schema"

describe.concurrent("literal", () => {
  it("should return never with no literals", () => {
    expect(S.literal().ast).toEqual(AST.neverKeyword)
  })

  it("should return an unwrapped AST with exactly one literal", () => {
    expect(S.literal(1).ast).toEqual(AST.createLiteral(1))
  })

  it("should return a union with more than one literal", () => {
    expect(S.literal(1, 2).ast).toEqual(
      AST.createUnion([AST.createLiteral(1), AST.createLiteral(2)])
    )
  })
})
