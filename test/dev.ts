import * as E from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it("dev", async () => {
    const schema = pipe(
      S.union(
        S.struct({
          a: S.optional(S.string, { to: "default", value: "a" }),
          b: S.string
        }),
        S.struct({
          c: S.optional(S.string, { to: "default", value: "c" }),
          d: S.string
        })
      ),
      S.extend(
        S.union(
          S.struct({
            e: S.optional(S.string, { to: "default", value: "e" }),
            f: S.string
          }),
          S.struct({
            g: S.optional(S.string, { to: "default", value: "g" }),
            h: S.string
          })
        )
      )
    )
    await Util.expectParseSuccess(schema, { b: "b", f: "f" }, {
      a: "a",
      b: "b",
      e: "e",
      f: "f"
    })
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
