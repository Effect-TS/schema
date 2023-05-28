import * as O from "@effect/data/Option"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("dev", () => {
  it.skip("dev", async () => {
    const transform = T.struct({
      c: T.optional(T.Trim).withDefault(() => "-"),
      d: T.optional(T.Date).toOption()
    })
    await Util.expectParseSuccess(transform, { a: true }, { c: "-", d: O.none() })
  })
})
