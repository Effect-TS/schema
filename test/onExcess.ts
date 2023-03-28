import { pipe } from "@effect/data/Function"
import type { ParseOptions } from "@effect/schema/AST"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

const onExcessPropertyIgnore: ParseOptions = {
  isUnexpectedAllowed: true
}
const onExcessPropertyError: ParseOptions = {
  isUnexpectedAllowed: false
}

describe.concurrent("onExcess", () => {
  it("ignore should not change tuple behaviour", async () => {
    const schema = S.tuple(S.number)
    await Util.expectParseFailure(schema, [1, "b"], "/1 is unexpected", onExcessPropertyIgnore)
    await Util.expectEncodeFailure(
      schema,
      [1, "b"] as any,
      `/1 is unexpected`,
      onExcessPropertyIgnore
    )
  })

  describe.concurrent("union should choose the output with more info", () => {
    it("structs", async () => {
      const a = S.struct({ a: S.optional(S.number) })
      const b = S.struct({ a: S.optional(S.number), b: S.optional(S.string) })
      const schema = S.union(a, b)
      await Util.expectParseSuccess(
        schema,
        { a: 1, b: "b", c: true },
        { a: 1, b: "b" },
        onExcessPropertyIgnore
      )
      await Util.expectParseFailure(
        schema,
        { a: 1, b: "b", c: true },
        `union member: /c is unexpected, union member: /b is unexpected`,
        onExcessPropertyError
      )
      await Util.expectEncodeSuccess(
        schema,
        { a: 1, b: "b" },
        { a: 1, b: "b" },
        onExcessPropertyIgnore
      )
      await Util.expectEncodeSuccess(
        schema,
        { a: 1, b: "b" },
        { a: 1, b: "b" },
        onExcessPropertyError
      )
    })

    it("tuples", async () => {
      const a = S.tuple(S.number)
      const b = pipe(S.tuple(S.number), S.optionalElement(S.string))
      const schema = S.union(a, b)
      await Util.expectParseFailure(
        schema,
        [1, "b", true],
        `union member: /2 is unexpected, union member: /1 is unexpected`,
        onExcessPropertyIgnore
      )
      await Util.expectParseFailure(
        schema,
        [1, "b", true],
        `union member: /2 is unexpected, union member: /1 is unexpected`,
        onExcessPropertyError
      )
      await Util.expectEncodeSuccess(
        schema,
        [1, "b"],
        [1, "b"],
        onExcessPropertyIgnore
      )
      await Util.expectEncodeSuccess(
        schema,
        [1, "b"],
        [1, "b"],
        onExcessPropertyError
      )
    })
  })
})
