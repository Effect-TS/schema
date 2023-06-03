import * as Either from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("attachPropertySignature", () => {
  it("baseline", () => {
    const Circle = S.struct({ radius: S.number })
    const Square = S.struct({ sideLength: S.number })
    const DiscriminatedShape = C.union(
      C.attachPropertySignature(Circle, "kind", "circle"),
      C.attachPropertySignature(Square, "kind", "square")
    )

    expect(C.decode(DiscriminatedShape)({ radius: 10 })).toEqual({
      kind: "circle",
      radius: 10
    })
    expect(
      C.encode(DiscriminatedShape)({
        kind: "circle",
        radius: 10
      })
    ).toEqual({ radius: 10 })
    expect(C.decode(DiscriminatedShape)({ sideLength: 10 })).toEqual({
      kind: "square",
      sideLength: 10
    })
    expect(
      C.encode(DiscriminatedShape)({
        kind: "square",
        sideLength: 10
      })
    ).toEqual({ sideLength: 10 })
  })

  it("should be compatible with extend", async () => {
    const schema = pipe(
      S.struct({ a: S.string }),
      C.attachPropertySignature("_tag", "b"),
      C.extend(S.struct({ c: S.number }))
    )
    await Util.expectParseSuccess(schema, { a: "a", c: 1 }, { a: "a", c: 1, _tag: "b" as const })
    await Util.expectEncodeSuccess(schema, { a: "a", c: 1, _tag: "b" as const }, { a: "a", c: 1 })
  })

  it("with a transformation", () => {
    const From = S.struct({ radius: S.number, _isVisible: S.optional(S.boolean) })
    const To = S.struct({ radius: S.number, _isVisible: S.boolean })

    const Circle = pipe(
      C.transformResult(
        From,
        To,
        C.parseEither(To),
        ({ _isVisible, ...rest }) => Either.right(rest)
      ),
      C.attachPropertySignature("_tag", "Circle")
    )
    expect(C.decode(Circle)({ radius: 10, _isVisible: true })).toEqual({
      _tag: "Circle",
      _isVisible: true,
      radius: 10
    })
    expect(C.encode(Circle)({ _tag: "Circle", radius: 10, _isVisible: true })).toEqual({
      radius: 10
    })
  })
})
