import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Effect", () => {
  it("tuple. e r e", async () => {
    const schema = pipe(S.tuple(S.string), S.rest(S.number), S.element(S.boolean))
    await Util.expectParseFailure(
      schema,
      [true],
      `/1 is missing, /0 Expected string, actual true`,
      {
        allErrors: true
      }
    )
  })
})
