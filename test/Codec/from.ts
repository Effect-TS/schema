import * as C from "@effect/schema/Codec"
import * as Util from "@effect/schema/test/util"

describe.concurrent("from", () => {
  it("lazy", async () => {
    interface I {
      prop: I | string
    }
    interface A {
      prop: A | number
    }
    const schema: C.Codec<I, A> = C.lazy(() =>
      C.struct({
        prop: C.union(C.NumberFromString, schema)
      })
    )
    const from = C.from(schema)
    await Util.expectParseSuccess(from, { prop: "a" })
    await Util.expectParseSuccess(from, { prop: { prop: "a" } })
  })
})
