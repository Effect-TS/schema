import * as O from "@effect/data/Option"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("optional", () => {
  it("default", async () => {
    const schema = S.struct({ a: S.optional(S.NumberFromString, { to: "default", value: 0 }) })
    await Util.expectParseSuccess(schema, {}, { a: 0 })
    await Util.expectParseSuccess(schema, { a: "1" }, { a: 1 })
    await Util.expectParseFailure(schema, { a: "a" }, `/a Expected string -> number, actual "a"`)

    await Util.expectEncodeSuccess(schema, { a: 1 }, { a: "1" })
    await Util.expectEncodeSuccess(schema, { a: 0 }, { a: "0" })
  })

  it("Option", async () => {
    const schema = S.struct({ a: S.optional(S.NumberFromString, { to: "Option" }) })
    await Util.expectParseSuccess(schema, {}, { a: O.none() })
    await Util.expectParseSuccess(schema, { a: "1" }, { a: O.some(1) })
    await Util.expectParseFailure(schema, { a: "a" }, `/a Expected string -> number, actual "a"`)

    await Util.expectEncodeSuccess(schema, { a: O.some(1) }, { a: "1" })
    await Util.expectEncodeSuccess(schema, { a: O.none() }, {})
  })
})
