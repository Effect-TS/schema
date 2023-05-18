import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it("dev", async () => {
    interface A {
      readonly a: string
      readonly as: ReadonlyArray<A>
    }
    const schema: S.Schema<A> = S.lazy(() => {
      console.log("constructor")
      return S.struct({
        a: S.string,
        as: S.array(schema)
      })
    })
    await Util.expectParseSuccess(schema, { a: "a1", as: [] })
    await Util.expectParseSuccess(schema, { a: "a1", as: [{ a: "a2", as: [] }] })

    await Util.expectParseFailure(
      schema,
      null,
      `Expected a generic object, actual null`
    )
    await Util.expectParseFailure(
      schema,
      { a: "a1" },
      `/as is missing`
    )
    await Util.expectParseFailure(
      schema,
      { a: "a1", as: [{ a: "a2", as: [1] }] },
      "/as /0 /as /0 Expected a generic object, actual 1"
    )
  })
})
