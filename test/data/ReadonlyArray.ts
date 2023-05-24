import { pipe } from "@effect/data/Function"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("ReadonlyArray", () => {
  it("minItems", async () => {
    const schema = pipe(T.array(T.number), T.minItems(2))

    await Util.expectParseFailure(
      schema,
      [1],
      "Expected an array of at least 2 items, actual [1]"
    )

    await Util.expectParseSuccess(schema, [1, 2])
    await Util.expectParseSuccess(schema, [1, 2, 3])
  })

  it("maxItems", async () => {
    const schema = pipe(T.array(T.number), T.maxItems(2))

    await Util.expectParseFailure(
      schema,
      [1, 2, 3],
      "Expected an array of at most 2 items, actual [1,2,3]"
    )

    await Util.expectParseSuccess(schema, [1])
    await Util.expectParseSuccess(schema, [1, 2])
  })

  it("items", async () => {
    const schema = pipe(T.array(T.number), T.itemsCount(2))

    await Util.expectParseFailure(
      schema,
      [],
      "Expected an array of exactly 2 items, actual []"
    )
    await Util.expectParseFailure(
      schema,
      [1],
      "Expected an array of exactly 2 items, actual [1]"
    )
    await Util.expectParseSuccess(schema, [1, 2])
    await Util.expectParseFailure(
      schema,
      [1, 2, 3],
      "Expected an array of exactly 2 items, actual [1,2,3]"
    )
  })
})
