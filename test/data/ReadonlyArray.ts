import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("ReadonlyArray", () => {
  it("minItems", async () => {
    const schema = pipe(S.array(S.number), S.minItems(2))

    await Util.expectDecodingFailure(
      schema,
      [1],
      "Expected an array of at least 2 items, actual [1]"
    )

    await Util.expectDecodingSuccess(schema, [1, 2])
    await Util.expectDecodingSuccess(schema, [1, 2, 3])
  })

  it("maxItems", async () => {
    const schema = pipe(S.array(S.number), S.maxItems(2))

    await Util.expectDecodingFailure(
      schema,
      [1, 2, 3],
      "Expected an array of at most 2 items, actual [1,2,3]"
    )

    await Util.expectDecodingSuccess(schema, [1])
    await Util.expectDecodingSuccess(schema, [1, 2])
  })

  it("items", async () => {
    const schema = pipe(S.array(S.number), S.itemsCount(2))

    await Util.expectDecodingFailure(
      schema,
      [],
      "Expected an array of exactly 2 items, actual []"
    )
    await Util.expectDecodingFailure(
      schema,
      [1],
      "Expected an array of exactly 2 items, actual [1]"
    )
    await Util.expectDecodingSuccess(schema, [1, 2])
    await Util.expectDecodingFailure(
      schema,
      [1, 2, 3],
      "Expected an array of exactly 2 items, actual [1,2,3]"
    )
  })
})
