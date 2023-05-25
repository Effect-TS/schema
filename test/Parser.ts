import * as E from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import * as Effect from "@effect/io/Effect"
import * as AST from "@effect/schema/AST"
import * as P from "@effect/schema/Parser"
import * as PR from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import * as T from "@effect/schema/Transform"

describe.concurrent("Parser", () => {
  it("asserts", () => {
    const schema = S.string
    expect(P.asserts(schema)("a")).toEqual(undefined)
    expect(() => P.asserts(schema)(1)).toThrowError(
      new Error(`error(s) found
└─ Expected string, actual 1`)
    )
  })

  it("parse", () => {
    const transform = T.NumberFromString
    expect(P.parse(transform)("1")).toEqual(1)
    expect(() => P.parse(transform)("a")).toThrowError(
      new Error(`error(s) found
└─ Expected string -> number, actual "a"`)
    )
  })

  it("parseOption", () => {
    const transform = T.NumberFromString
    expect(P.parseOption(transform)("1")).toEqual(O.some(1))
    expect(P.parseOption(transform)("a")).toEqual(O.none())
  })

  it("parseEither", () => {
    const transform = T.NumberFromString
    expect(P.parseEither(transform)("1")).toEqual(E.right(1))
    expect(P.parseEither(transform)("a")).toEqual(
      E.left(PR.parseError([PR.type(transform.ast, "a")]))
    )
  })

  it("parsePromise", async () => {
    const transform = T.NumberFromString
    await expect(P.parsePromise(transform)("1")).resolves.toEqual(1)
    await expect(P.parsePromise(transform)("a")).rejects.toThrow()
  })

  it("parseEffect", async () => {
    const transform = T.NumberFromString
    expect(await Effect.runPromiseEither(P.parseEffect(transform)("1"))).toEqual(E.right(1))
    expect(await Effect.runPromiseEither(P.parseEffect(transform)("a"))).toEqual(
      E.left(PR.parseError([PR.type(transform.ast, "a")]))
    )
  })

  it("decode", () => {
    const transform = T.NumberFromString
    expect(P.decode(transform)("1")).toEqual(1)
    expect(() => P.decode(transform)("a")).toThrowError(
      new Error(`error(s) found
└─ Expected string -> number, actual "a"`)
    )
  })

  it("decodeOption", () => {
    const transform = T.NumberFromString
    expect(P.decodeOption(transform)("1")).toEqual(O.some(1))
    expect(P.decodeOption(transform)("a")).toEqual(O.none())
  })

  it("decodeEither", () => {
    const transform = T.NumberFromString
    expect(P.decodeEither(transform)("1")).toEqual(E.right(1))
    expect(P.decodeEither(transform)("a")).toEqual(
      E.left(PR.parseError([PR.type(transform.ast, "a")]))
    )
  })

  it("decodePromise", async () => {
    const transform = T.NumberFromString
    await expect(P.decodePromise(transform)("1")).resolves.toEqual(1)
    await expect(P.decodePromise(transform)("a")).rejects.toThrow()
  })

  it("decodeEffect", async () => {
    const transform = T.NumberFromString
    expect(await Effect.runPromiseEither(P.decodeEffect(transform)("1"))).toEqual(E.right(1))
    expect(await Effect.runPromiseEither(P.decodeEffect(transform)("a"))).toEqual(
      E.left(PR.parseError([PR.type(transform.ast, "a")]))
    )
  })

  it("validate", () => {
    const schema = S.number
    expect(P.validate(schema)(1)).toEqual(1)
    expect(() => P.validate(schema)("1")).toThrowError(
      new Error(`error(s) found
└─ Expected number, actual "1"`)
    )
  })

  it("validateOption", () => {
    const schema = S.number
    expect(P.validateOption(schema)(1)).toEqual(O.some(1))
    expect(P.validateOption(schema)("1")).toEqual(O.none())
  })

  it("validateEither", () => {
    const schema = S.number
    expect(P.validateEither(schema)(1)).toEqual(E.right(1))
    expect(P.validateEither(schema)("1")).toEqual(
      E.left(PR.parseError([PR.type(S.number.ast, "1")]))
    )
  })

  it("validateResult", () => {
    const schema = S.number
    expect(P.validateResult(schema)(1)).toEqual(E.right(1))
    expect(P.validateResult(schema)("1")).toEqual(
      E.left(PR.parseError([PR.type(S.number.ast, "1")]))
    )
  })

  it("validatePromise", async () => {
    const schema = S.number
    await expect(P.validatePromise(schema)(1)).resolves.toEqual(1)
    await expect(P.validatePromise(schema)("1")).rejects.toThrow()
    await expect(P.validatePromise(schema)("a")).rejects.toThrow()
  })

  it("validateEffect", async () => {
    const schema = S.number
    expect(await Effect.runPromiseEither(P.validateEffect(schema)(1))).toEqual(E.right(1))
    expect(await Effect.runPromiseEither(P.validateEffect(schema)("1"))).toEqual(
      E.left(PR.parseError([PR.type(S.number.ast, "1")]))
    )
  })

  it("encodeResult", () => {
    const transform = T.NumberFromString
    expect(P.encodeResult(transform)(1)).toEqual(E.right("1"))
  })

  it("encodePromise", async () => {
    const transform = T.NumberFromString
    await expect(P.encodePromise(transform)(1)).resolves.toEqual("1")
  })

  it("_getLiterals", () => {
    expect(P._getLiterals(S.string.ast)).toEqual([])
    // TypeLiteral
    expect(P._getLiterals(T.struct({ _tag: S.literal("a") }).ast))
      .toEqual([["_tag", AST.createLiteral("a")]])
    // Refinement
    expect(
      P._getLiterals(
        pipe(
          T.struct({ _tag: S.literal("a") }),
          T.filter(() => true)
        ).ast
      )
    ).toEqual([["_tag", AST.createLiteral("a")]])
    // declare
    expect(
      P._getLiterals(
        S.declare(
          [],
          S.struct({ _tag: S.literal("a") }),
          () => P.parseResult(T.struct({ _tag: S.literal("a") })),
          () => P.encodeResult(T.struct({ _tag: S.literal("a") }))
        ).ast
      )
    ).toEqual([["_tag", AST.createLiteral("a")]])

    // Transform
    expect(
      P._getLiterals(
        pipe(T.struct({ radius: S.number }), T.attachPropertySignature("kind", "circle")).ast
      )
    ).toEqual([])
  })

  it("_getSearchTree", () => {
    expect(P._getSearchTree([S.string.ast, S.number.ast])).toEqual({
      keys: {},
      otherwise: [S.string.ast, S.number.ast]
    })

    expect(P._getSearchTree([T.struct({ _tag: S.literal("a") }).ast, S.number.ast])).toEqual(
      {
        keys: {
          _tag: {
            buckets: {
              a: [T.struct({ _tag: S.literal("a") }).ast]
            },
            ast: AST.createLiteral("a")
          }
        },
        otherwise: [S.number.ast]
      }
    )

    expect(
      P._getSearchTree([
        T.struct({ _tag: S.literal("a") }).ast,
        T.struct({ _tag: S.literal("b") }).ast
      ])
    ).toEqual({
      keys: {
        _tag: {
          buckets: {
            a: [T.struct({ _tag: S.literal("a") }).ast],
            b: [T.struct({ _tag: S.literal("b") }).ast]
          },
          ast: AST.createUnion([AST.createLiteral("a"), AST.createLiteral("b")])
        }
      },
      otherwise: []
    })

    expect(
      P._getSearchTree([
        T.struct({ a: S.literal("A"), c: S.string }).ast,
        T.struct({ b: S.literal("B"), d: S.number }).ast
      ])
    ).toEqual({
      keys: {
        a: {
          buckets: {
            A: [T.struct({ a: S.literal("A"), c: S.string }).ast]
          },
          ast: AST.createLiteral("A")
        },
        b: {
          buckets: {
            B: [T.struct({ b: S.literal("B"), d: S.number }).ast]
          },
          ast: AST.createLiteral("B")
        }
      },
      otherwise: []
    })

    // should handle multiple tags
    expect(
      P._getSearchTree([
        T.struct({ category: S.literal("catA"), tag: S.literal("a") }).ast,
        T.struct({ category: S.literal("catA"), tag: S.literal("b") }).ast,
        T.struct({ category: S.literal("catA"), tag: S.literal("c") }).ast
      ])
    ).toEqual({
      keys: {
        category: {
          buckets: {
            catA: [T.struct({ category: S.literal("catA"), tag: S.literal("a") }).ast]
          },
          ast: AST.createLiteral("catA")
        },
        tag: {
          buckets: {
            b: [T.struct({ category: S.literal("catA"), tag: S.literal("b") }).ast],
            c: [T.struct({ category: S.literal("catA"), tag: S.literal("c") }).ast]
          },
          ast: AST.createUnion([AST.createLiteral("b"), AST.createLiteral("c")])
        }
      },
      otherwise: []
    })
  })

  const schema = T.union(
    T.struct({ type: S.literal("a"), value: S.string }),
    T.struct({ type: S.literal("b"), value: S.string }),
    T.struct({ type: S.literal("c"), value: S.string }),
    T.struct({ type: S.string, value: S.string }),
    T.struct({ type: S.literal(null), value: S.string }),
    T.struct({ type: S.undefined, value: S.string }),
    T.struct({ type: S.literal("d", "e"), value: S.string }),
    T.struct({ type: T.struct({ nested: S.string }), value: S.string }),
    T.struct({ type: T.array(S.number), value: S.string })
  )
  const types = (schema.ast as AST.Union).types
  expect(
    P._getSearchTree(types)
  ).toEqual({
    keys: {
      type: {
        buckets: {
          a: [T.struct({ type: S.literal("a"), value: S.string }).ast],
          b: [T.struct({ type: S.literal("b"), value: S.string }).ast],
          c: [T.struct({ type: S.literal("c"), value: S.string }).ast],
          null: [T.struct({ type: S.literal(null), value: S.string }).ast]
        },
        ast: AST.createUnion([
          AST.createLiteral("a"),
          AST.createLiteral("b"),
          AST.createLiteral("c"),
          AST.createLiteral(null)
        ])
      }
    },
    otherwise: [
      T.struct({ type: S.string, value: S.string }).ast,
      T.struct({ type: S.undefined, value: S.string }).ast,
      T.struct({ type: S.literal("d", "e"), value: S.string }).ast,
      T.struct({ type: T.struct({ nested: S.string }), value: S.string }).ast,
      T.struct({ type: T.array(S.number), value: S.string }).ast
    ]
  })
})
