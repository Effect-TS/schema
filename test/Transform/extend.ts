import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

const X2 = T.transform(
  S.string,
  S.string,
  (s) => s + s,
  (s) => s.substring(0, 1)
)

const X3 = T.transform(
  S.string,
  S.string,
  (s) => s + s + s,
  (s) => s.substring(0, 1)
)

describe.concurrent("extend", () => {
  it(`struct with defaults extend struct`, async () => {
    const schema = pipe(
      T.struct({ a: T.optional(S.string).withDefault(() => ""), b: S.string }),
      T.extend(S.struct({ c: S.number }))
    )
    await Util.expectParseSuccess(schema, { b: "b", c: 1 }, { a: "", b: "b", c: 1 })
  })

  it(`struct extend struct with defaults`, async () => {
    const schema = pipe(
      S.struct({ a: S.number }),
      T.extend(
        T.struct({ b: S.string, c: T.optional(S.string).withDefault(() => "") })
      )
    )
    await Util.expectParseSuccess(schema, { a: 1, b: "b" }, { a: 1, b: "b", c: "" })
  })

  it(`struct with defaults extend struct with defaults `, async () => {
    const schema = pipe(
      T.struct({ a: T.optional(S.string).withDefault(() => ""), b: S.string }),
      T.extend(
        T.struct({ c: T.optional(S.number).withDefault(() => 0), d: S.boolean })
      )
    )
    await Util.expectParseSuccess(schema, { b: "b", d: true }, { a: "", b: "b", c: 0, d: true })
  })

  it(`union with defaults extend union with defaults `, async () => {
    const schema = pipe(
      T.union(
        T.struct({
          a: T.optional(S.string).withDefault(() => "a"),
          b: S.string
        }),
        T.struct({
          c: T.optional(S.string).withDefault(() => "c"),
          d: S.string
        })
      ),
      T.extend(
        T.union(
          T.struct({
            e: T.optional(S.string).withDefault(() => "e"),
            f: S.string
          }),
          T.struct({
            g: T.optional(S.string).withDefault(() => "g"),
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
    await Util.expectParseSuccess(schema, { d: "d", h: "h" }, {
      c: "c",
      d: "d",
      g: "g",
      h: "h"
    })
  })

  it("record(string, X3)", async () => {
    const transform = pipe(
      S.struct({ a: S.string }),
      T.extend(T.struct({ b: X2 })),
      T.extend(T.record(S.string, X3))
    )
    await Util.expectParseSuccess(transform, { a: "a", b: "b" }, { a: "a", b: "bb" })
    await Util.expectParseSuccess(transform, { a: "a", b: "b", c: "c" }, {
      a: "a",
      b: "bb",
      c: "ccc"
    })

    await Util.expectEncodeSuccess(transform, { a: "a", b: "bb" }, { a: "a", b: "b" })
    await Util.expectEncodeSuccess(transform, { a: "a", b: "bb", c: "ccc" }, {
      a: "a",
      b: "b",
      c: "c"
    })
  })

  it("record(symbol, X3)", async () => {
    const transform = pipe(
      S.struct({ a: S.string }),
      T.extend(T.struct({ b: X2 })),
      T.extend(T.record(S.symbol, X3))
    )
    const c = Symbol.for("@effect/schema/test/c")
    await Util.expectParseSuccess(transform, { a: "a", b: "b" }, { a: "a", b: "bb" })
    await Util.expectParseSuccess(transform, { a: "a", b: "b", [c]: "c" }, {
      a: "a",
      b: "bb",
      [c]: "ccc"
    })

    await Util.expectEncodeSuccess(transform, { a: "a", b: "bb" }, { a: "a", b: "b" })
    await Util.expectEncodeSuccess(transform, { a: "a", b: "bb", [c]: "ccc" }, {
      a: "a",
      b: "b",
      [c]: "c"
    })
  })
})
