import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("extend", () => {
  it(`struct with defaults + struct`, async () => {
    const schema = pipe(
      C.struct({ a: C.optional(S.string).withDefault(() => ""), b: S.string }),
      C.extend(S.struct({ c: S.number }))
    )
    await Util.expectParseSuccess(schema, { b: "b", c: 1 }, { a: "", b: "b", c: 1 })
  })

  it(`struct + struct with defaults`, async () => {
    const schema = pipe(
      S.struct({ a: S.number }),
      C.extend(
        C.struct({ b: S.string, c: C.optional(S.string).withDefault(() => "") })
      )
    )
    await Util.expectParseSuccess(schema, { a: 1, b: "b" }, { a: 1, b: "b", c: "" })
  })

  it(`struct with defaults + struct with defaults `, async () => {
    const schema = pipe(
      C.struct({ a: C.optional(S.string).withDefault(() => ""), b: S.string }),
      C.extend(
        C.struct({ c: C.optional(S.number).withDefault(() => 0), d: S.boolean })
      )
    )
    await Util.expectParseSuccess(schema, { b: "b", d: true }, { a: "", b: "b", c: 0, d: true })
  })

  it(`union with defaults + union with defaults `, async () => {
    const schema = pipe(
      C.union(
        C.struct({
          a: C.optional(S.string).withDefault(() => "a"),
          b: S.string
        }),
        C.struct({
          c: C.optional(S.string).withDefault(() => "c"),
          d: S.string
        })
      ),
      C.extend(
        C.union(
          C.struct({
            e: C.optional(S.string).withDefault(() => "e"),
            f: S.string
          }),
          C.struct({
            g: C.optional(S.string).withDefault(() => "g"),
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

  it("struct + struct + record(string, X3)", async () => {
    const transform = pipe(
      S.struct({ a: S.string }),
      C.extend(C.struct({ b: Util.X2 })),
      C.extend(C.record(S.string, Util.X3))
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

  it("struct + struct + record(symbol, X3)", async () => {
    const transform = pipe(
      S.struct({ a: S.string }),
      C.extend(C.struct({ b: Util.X2 })),
      C.extend(C.record(S.symbol, Util.X3))
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

  it("should fail on illegal types", async () => {
    const transform = pipe(
      S.struct({ a: S.number }), // <= this is illegal
      C.extend(C.record(S.string, C.NumberFromString))
    )
    await Util.expectParseFailure(transform, { a: 1 }, "/a Expected a string, actual 1")
  })
})
