import { pipe } from "@effect/data/Function"
import * as AST from "@effect/schema/AST"
import * as T from "@effect/schema/Transform"

describe.concurrent("AST.getWeight", () => {
  it("order", () => {
    const transformation = T.optionFromSelf(T.number)
    const union = T.union(T.struct({ a: T.string }), T.struct({ b: T.number }))
    const refinement = pipe(T.array(T.string), T.filter((as) => as.length === 2))
    const actual = [
      transformation.ast,
      union.ast,
      refinement.ast,
      T.unknown.ast,
      T.any.ast
    ].map(AST.getWeight).sort()
    const expected = [
      T.unknown.ast,
      T.any.ast,
      refinement.ast,
      union.ast,
      transformation.ast
    ].map(AST.getWeight)
    expect(actual).toEqual(expected)
  })
})
