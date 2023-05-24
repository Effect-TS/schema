import * as AST from "@effect/schema/AST"
import * as T from "@effect/schema/Transform"

describe.concurrent("AST.getCardinality", () => {
  it("order", () => {
    const struct = T.struct({ a: T.string })
    const actual = [
      struct.ast,
      T.unknown.ast,
      T.any.ast,
      T.object.ast,
      T.symbol.ast,
      T.bigint.ast,
      T.number.ast,
      T.string.ast,
      T.boolean.ast,
      T.uniqueSymbol(Symbol.for("a")).ast,
      T.undefined.ast,
      T.void.ast,
      T.literal("a").ast,
      T.never.ast
    ].map(
      AST.getCardinality
    )
      .sort()
    const expected = [
      T.never.ast,
      T.uniqueSymbol(Symbol.for("a")).ast,
      T.undefined.ast,
      T.void.ast,
      T.literal("a").ast,
      T.boolean.ast,
      T.symbol.ast,
      T.bigint.ast,
      T.number.ast,
      T.string.ast,
      struct.ast,
      T.object.ast,
      T.unknown.ast,
      T.any.ast
    ].map(AST.getCardinality)
    expect(actual).toEqual(expected)
  })
})
