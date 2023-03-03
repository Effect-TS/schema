import { pipe } from "@effect/data/Function"
import * as S from "@effect/schema"
import * as AST from "@effect/schema/AST"
import * as P from "@effect/schema/Parser"

describe.concurrent("Parser", () => {
  it("_getLiterals", () => {
    expect(P._getLiterals(S.string.ast, "decoder")).toEqual([])
    // TypeLiteral
    expect(P._getLiterals(S.struct({ _tag: S.literal("a") }).ast, "decoder"))
      .toEqual([["_tag", AST.createLiteral("a")]])
    // Refinement
    expect(
      P._getLiterals(
        pipe(
          S.struct({ _tag: S.literal("a") }),
          S.filter(() => true)
        ).ast,
        "decoder"
      )
    ).toEqual([["_tag", AST.createLiteral("a")]])
    // TypeAlias
    expect(
      P._getLiterals(
        S.typeAlias([], S.struct({ _tag: S.literal("a") })).ast,
        "decoder"
      )
    ).toEqual([["_tag", AST.createLiteral("a")]])

    // Transform
    expect(
      P._getLiterals(
        pipe(S.struct({ radius: S.number }), S.attachPropertySignature("kind", "circle")).ast,
        "decoder"
      )
    ).toEqual([])
    expect(
      P._getLiterals(
        pipe(S.struct({ radius: S.number }), S.attachPropertySignature("kind", "circle")).ast,
        "encoder"
      )
    ).toEqual([["kind", AST.createLiteral("circle")]])
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
            buckets: {
              a: [S.struct({ _tag: S.literal("a") })]
            },
            literals: [AST.createLiteral("a")]
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
          buckets: {
            a: [S.struct({ _tag: S.literal("a") })],
            b: [S.struct({ _tag: S.literal("b") })]
          },
          literals: [AST.createLiteral("a"), AST.createLiteral("b")]
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
          buckets: {
            A: [S.struct({ a: S.literal("A"), c: S.string })]
          },
          literals: [AST.createLiteral("A")]
        },
        b: {
          buckets: {
            B: [S.struct({ b: S.literal("B"), d: S.number })]
          },
          literals: [AST.createLiteral("B")]
        }
      },
      otherwise: []
    })

    // should handle multiple tags
    expect(
      P._getSearchTree([
        S.struct({ category: S.literal("catA"), tag: S.literal("a") }),
        S.struct({ category: S.literal("catA"), tag: S.literal("b") }),
        S.struct({ category: S.literal("catA"), tag: S.literal("c") })
      ], "decoder")
    ).toEqual({
      keys: {
        category: {
          buckets: {
            catA: [S.struct({ category: S.literal("catA"), tag: S.literal("a") })]
          },
          literals: [AST.createLiteral("catA")]
        },
        tag: {
          buckets: {
            b: [S.struct({ category: S.literal("catA"), tag: S.literal("b") })],
            c: [S.struct({ category: S.literal("catA"), tag: S.literal("c") })]
          },
          literals: [AST.createLiteral("b"), AST.createLiteral("c")]
        }
      },
      otherwise: []
    })
  })
  expect(
    P._getSearchTree([
      S.struct({ tag: S.literal("a"), category: S.literal("catA") }),
      S.struct({ tag: S.literal("b"), category: S.literal("catA") }),
      S.struct({ tag: S.literal("c"), category: S.literal("catA") })
    ], "decoder")
  ).toEqual({
    keys: {
      tag: {
        buckets: {
          a: [S.struct({ tag: S.literal("a"), category: S.literal("catA") })],
          b: [S.struct({ tag: S.literal("b"), category: S.literal("catA") })],
          c: [S.struct({ tag: S.literal("c"), category: S.literal("catA") })]
        },
        literals: [AST.createLiteral("a"), AST.createLiteral("b"), AST.createLiteral("c")]
      }
    },
    otherwise: []
  })
})
