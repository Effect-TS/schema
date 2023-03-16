import { pipe } from "@effect/data/Function"
import * as N from "@effect/data/Number"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("ReadonlyArray", () => {
  it("minItems", () => {
    const schema = pipe(S.array(S.number), S.minItems(2))

    Util.expectDecodingFailure(
      schema,
      [1],
      "Expected an array of at least 2 items, actual [1]"
    )

    Util.expectDecodingSuccess(schema, [1, 2])
    Util.expectDecodingSuccess(schema, [1, 2, 3])
  })

  it("maxItems", () => {
    const schema = pipe(S.array(S.number), S.maxItems(2))

    Util.expectDecodingFailure(
      schema,
      [1, 2, 3],
      "Expected an array of at most 2 items, actual [1,2,3]"
    )

    Util.expectDecodingSuccess(schema, [1])
    Util.expectDecodingSuccess(schema, [1, 2])
  })

  it("items", () => {
    const schema = pipe(S.array(S.number), S.itemsCount(2))

    Util.expectDecodingFailure(
      schema,
      [],
      "Expected an array of exactly 2 items, actual []"
    )
    Util.expectDecodingFailure(
      schema,
      [1],
      "Expected an array of exactly 2 items, actual [1]"
    )
    Util.expectDecodingSuccess(schema, [1, 2])
    Util.expectDecodingFailure(
      schema,
      [1, 2, 3],
      "Expected an array of exactly 2 items, actual [1,2,3]"
    )
  })

  it("sort", () => {
    const schema = pipe(S.array(S.number), S.sort(N.Order))

    Util.expectDecodingSuccess(schema, [1, 2, 3], [1, 2, 3])
    Util.expectDecodingSuccess(schema, [3, 2, 1], [1, 2, 3])
  })

  it("uniq", () => {
    const schema = pipe(S.array(S.number), S.uniq(N.Equivalence))

    Util.expectDecodingSuccess(schema, [1, 2, 3], [1, 2, 3])
    Util.expectDecodingSuccess(schema, [1, 1, 2, 3, 3], [1, 2, 3])
  })
})
