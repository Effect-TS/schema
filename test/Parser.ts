import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema"
import * as P from "@effect/schema/Parser"

describe.concurrent("Parser", () => {
  it("_getFirstLiteral", () => {
    expect(P._getFirstLiteral(S.string.ast, "decoder")).toEqual(null)
    // TypeLiteral
    expect(P._getFirstLiteral(S.struct({ _tag: S.literal("a") }).ast, "decoder"))
      .toEqual(["_tag", "a"])
    // Refinement
    expect(
      P._getFirstLiteral(
        pipe(
          S.struct({ _tag: S.literal("a") }),
          S.filter(() => true)
        ).ast,
        "decoder"
      )
    ).toEqual(["_tag", "a"])
    // TypeAlias
    expect(
      P._getFirstLiteral(
        S.typeAlias([], S.struct({ _tag: S.literal("a") })).ast,
        "decoder"
      )
    ).toEqual(["_tag", "a"])

    // Transform
    expect(
      P._getFirstLiteral(
        pipe(S.struct({ radius: S.number }), S.attachPropertySignature("kind", "circle")).ast,
        "decoder"
      )
    ).toEqual(null)
    expect(
      P._getFirstLiteral(
        pipe(S.struct({ radius: S.number }), S.attachPropertySignature("kind", "circle")).ast,
        "encoder"
      )
    ).toEqual(["kind", "circle"])
  })

  it("_getSearchTree", () => {
    expect(P._getSearchTree([S.string, S.number], "decoder")).toEqual({
      keys: {},
      otherwise: [S.string, S.number]
    })

    expect(P._getSearchTree([S.struct({ _tag: S.literal("a") }), S.number], "decoder")).toEqual(
      {
        keys: {
          _tag: {
            a: [S.struct({ _tag: S.literal("a") })]
          }
        },
        otherwise: [S.number]
      }
    )

    expect(
      P._getSearchTree([
        S.struct({ _tag: S.literal("a") }),
        S.struct({ _tag: S.literal("b") })
      ], "decoder")
    ).toEqual({
      keys: {
        _tag: {
          a: [S.struct({ _tag: S.literal("a") })],
          b: [S.struct({ _tag: S.literal("b") })]
        }
      },
      otherwise: []
    })

    expect(
      P._getSearchTree([
        S.struct({ a: S.literal("A"), c: S.string }),
        S.struct({ b: S.literal("B"), d: S.number })
      ], "decoder")
    ).toEqual({
      keys: {
        a: {
          A: [S.struct({ a: S.literal("A"), c: S.string })]
        },
        b: {
          B: [S.struct({ b: S.literal("B"), d: S.number })]
        }
      },
      otherwise: []
    })
  })
})
