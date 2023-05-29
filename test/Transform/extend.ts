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
