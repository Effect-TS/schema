import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("from", () => {
  it("lazy", async () => {
    interface I {
      prop: I | string
    }
    interface A {
      prop: A | number
    }
    const schema: T.Transform<I, A> = T.lazy(() =>
      T.struct({
        prop: T.union(T.NumberFromString, schema)
      })
    )
    const from = T.from(schema)
    await Util.expectParseSuccess(from, { prop: "a" })
    await Util.expectParseSuccess(from, { prop: { prop: "a" } })
  })
})
