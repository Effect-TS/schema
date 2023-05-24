import * as E from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("attachPropertySignature", () => {
  it("baseline", () => {
    const Circle = T.struct({ radius: T.number })
    const Square = T.struct({ sideLength: T.number })
    const DiscriminatedShape = T.union(
      pipe(Circle, T.attachPropertySignature("kind", "circle")),
      pipe(Square, T.attachPropertySignature("kind", "square"))
    )

    expect(T.decode(DiscriminatedShape)({ radius: 10 })).toEqual({
      kind: "circle",
      radius: 10
    })
    expect(
      T.encode(DiscriminatedShape)({
        kind: "circle",
        radius: 10
      })
    ).toEqual({ radius: 10 })
    expect(T.decode(DiscriminatedShape)({ sideLength: 10 })).toEqual({
      kind: "square",
      sideLength: 10
    })
    expect(
      T.encode(DiscriminatedShape)({
        kind: "square",
        sideLength: 10
      })
    ).toEqual({ sideLength: 10 })
  })

  it("should be compatible with extend", async () => {
    const schema = pipe(
      T.struct({ a: T.string }),
      T.attachPropertySignature("_tag", "b"),
      T.extend(T.struct({ c: T.number }))
    )
    await Util.expectParseSuccess(schema, { a: "a", c: 1 }, { a: "a", c: 1, _tag: "b" as const })
    await Util.expectEncodeSuccess(schema, { a: "a", c: 1, _tag: "b" as const }, { a: "a", c: 1 })
  })

  it("with a transformation", () => {
    const From = T.struct({ radius: T.number, _isVisible: T.optional(T.boolean) })
    const To = T.struct({ radius: T.number, _isVisible: T.boolean })

    const Circle = pipe(
      T.transformResult(
        From,
        To,
        T.parseEither(To),
        ({ _isVisible, ...rest }) => E.right(rest)
      ),
      T.attachPropertySignature("_tag", "Circle")
    )
    expect(T.decode(Circle)({ radius: 10, _isVisible: true })).toEqual({
      _tag: "Circle",
      _isVisible: true,
      radius: 10
    })
    expect(T.encode(Circle)({ _tag: "Circle", radius: 10, _isVisible: true })).toEqual({
      radius: 10
    })
  })
})
