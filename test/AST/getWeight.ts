import { pipe } from "@effect/data/Function"
import * as AST from "@effect/schema/AST"
import * as S from "@effect/schema/Schema"
import * as T from "@effect/schema/Transform"

describe.concurrent("AST.getWeight", () => {
  it("order", () => {
    const transform = T.optionFromSelf(S.number)
    const union = S.union(S.struct({ a: S.string }), S.struct({ b: S.number }))
    const refinement = pipe(S.array(S.string), S.filter((as) => as.length === 2))
    const actual = [
      transform.ast,
      union.ast,
      refinement.ast,
      S.unknown.ast,
      S.any.ast
    ].map(AST.getWeight).sort()
    const expected = [
      S.unknown.ast,
      S.any.ast,
      refinement.ast,
      union.ast,
      transform.ast
    ].map(AST.getWeight)
    expect(actual).toEqual(expected)
  })
})
