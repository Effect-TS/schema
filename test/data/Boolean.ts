import { pipe } from "@effect/data/Function"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("Boolean", () => {
  it("not", async () => {
    const schema = pipe(T.boolean, T.not)

    await Util.expectParseSuccess(schema, true, false)
    await Util.expectParseSuccess(schema, false, true)
    await Util.expectEncodeSuccess(schema, true, false)
    await Util.expectEncodeSuccess(schema, false, true)
  })
})
