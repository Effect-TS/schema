// import * as Either from "@effect/data/Either"
// import * as Effect from "@effect/io/Effect"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Effect", () => {
  it("struct", async () => {
    const schema = S.struct({ a: S.string, b: S.number })
    await Util.expectParseFailure(schema, { a: 1, b: "a" }, "/a Expected string, actual 1")
  })
})
