import * as E from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it("all", async () => {
    const schema = S.struct({
      a: S.boolean,
      b: S.optional(S.NumberFromString),
      c: S.optional(S.Trim, { to: "default", value: "-" }),
      d: S.optional(S.DateFromString, { to: "Option" })
    })
    await Util.expectParseSuccess(schema, { a: true, b: "1" }, {
      a: true,
      b: 1,
      c: "-",
      d: O.none()
    })
    await Util.expectParseSuccess(schema, { a: true }, { a: true, c: "-", d: O.none() })
  })

  it.skip("dev2", async () => {
    const schema = S.literal(1)
    expect(S.parseEither(schema)(1)).toEqual(E.right(1))
    expect(S.parseEffect(schema)(1)).toEqual(E.right(1))
    await Util.expectParseSuccess(schema, 1)
  })

  it.skip("dev3", () => {
    const schema = pipe(
      S.string,
      S.filter(() => {
        console.log("filter1")
        return true
      }),
      S.filter(() => {
        console.log("filter2")
        return true
      }),
      S.filter(() => {
        console.log("filter3")
        return true
      })
    )
    // expect(S.decode(schema)("a")).toEqual("a")
    expect(S.encode(schema)("a")).toEqual("a")
  })
})
