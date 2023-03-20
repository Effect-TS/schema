import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Effect", () => {
  it("struct/extend record(string, string)", async () => {
    const schema = pipe(
      S.struct({ a: S.string }),
      S.extend(S.record(S.string, S.string))
    )
    await Util.expectParseSuccess(schema, { a: "a", b: "b" })
  })
})
