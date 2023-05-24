import * as E from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import * as Effect from "@effect/io/Effect"
import * as AST from "@effect/schema/AST"
import * as P from "@effect/schema/Parser"
import * as PR from "@effect/schema/ParseResult"
import * as T from "@effect/schema/Transform"

describe.concurrent("Parser", () => {
  it("exports", () => {
    expect(T.parseResult).exist
    expect(T.decodeResult).exist
    expect(T.validateResult).exist
    expect(T.encodeResult).exist
  })

  it("asserts", () => {
    const schema = T.string
    expect(P.asserts(schema)("a")).toEqual(undefined)
    expect(() => P.asserts(schema)(1)).toThrowError(
      new Error(`error(s) found
└─ Expected string, actual 1`)
    )
  })

  it("parse", () => {
    const schema = T.NumberFromString
    expect(P.parse(schema)("1")).toEqual(1)
    expect(() => P.parse(schema)("a")).toThrowError(
      new Error(`error(s) found
└─ Expected string -> number, actual "a"`)
    )
  })

  it("parseOption", () => {
    const schema = T.NumberFromString
    expect(P.parseOption(schema)("1")).toEqual(O.some(1))
    expect(P.parseOption(schema)("a")).toEqual(O.none())
  })

  it("parseEither", () => {
    const schema = T.NumberFromString
    expect(P.parseEither(schema)("1")).toEqual(E.right(1))
    expect(P.parseEither(schema)("a")).toEqual(E.left(PR.parseError([PR.type(schema.ast, "a")])))
  })

  it("parsePromise", async () => {
    const schema = T.NumberFromString
    await expect(P.parsePromise(schema)("1")).resolves.toEqual(1)
    await expect(P.parsePromise(schema)("a")).rejects.toThrow()
  })

  it("parseEffect", async () => {
    const schema = T.NumberFromString
    expect(await Effect.runPromiseEither(P.parseEffect(schema)("1"))).toEqual(E.right(1))
    expect(await Effect.runPromiseEither(P.parseEffect(schema)("a"))).toEqual(
      E.left(PR.parseError([PR.type(schema.ast, "a")]))
    )
  })

  it("decode", () => {
    const schema = T.NumberFromString
    expect(P.decode(schema)("1")).toEqual(1)
    expect(() => P.decode(schema)("a")).toThrowError(
      new Error(`error(s) found
└─ Expected string -> number, actual "a"`)
    )
  })

  it("decodeOption", () => {
    const schema = T.NumberFromString
    expect(P.decodeOption(schema)("1")).toEqual(O.some(1))
    expect(P.decodeOption(schema)("a")).toEqual(O.none())
  })

  it("decodeEither", () => {
    const schema = T.NumberFromString
    expect(P.decodeEither(schema)("1")).toEqual(E.right(1))
    expect(P.decodeEither(schema)("a")).toEqual(E.left(PR.parseError([PR.type(schema.ast, "a")])))
  })

  it("decodePromise", async () => {
    const schema = T.NumberFromString
    await expect(P.decodePromise(schema)("1")).resolves.toEqual(1)
    await expect(P.decodePromise(schema)("a")).rejects.toThrow()
  })

  it("decodeEffect", async () => {
    const schema = T.NumberFromString
    expect(await Effect.runPromiseEither(P.decodeEffect(schema)("1"))).toEqual(E.right(1))
    expect(await Effect.runPromiseEither(P.decodeEffect(schema)("a"))).toEqual(
      E.left(PR.parseError([PR.type(schema.ast, "a")]))
    )
  })

  it("validate", () => {
    const schema = T.NumberFromString
    expect(P.validate(schema)(1)).toEqual(1)
    expect(() => P.validate(schema)("1")).toThrowError(
      new Error(`error(s) found
└─ Expected number, actual "1"`)
    )
  })

  it("validateOption", () => {
    const schema = T.NumberFromString
    expect(P.validateOption(schema)(1)).toEqual(O.some(1))
    expect(P.validateOption(schema)("1")).toEqual(O.none())
  })

  it("validateEither", () => {
    const schema = T.NumberFromString
    expect(P.validateEither(schema)(1)).toEqual(E.right(1))
    expect(P.validateEither(schema)("1")).toEqual(
      E.left(PR.parseError([PR.type(T.number.ast, "1")]))
    )
  })

  it("validateResult", () => {
    const schema = T.NumberFromString
    expect(P.validateResult(schema)(1)).toEqual(E.right(1))
    expect(P.validateResult(schema)("1")).toEqual(
      E.left(PR.parseError([PR.type(T.number.ast, "1")]))
    )
  })

  it("validatePromise", async () => {
    const schema = T.NumberFromString
    await expect(P.validatePromise(schema)(1)).resolves.toEqual(1)
    await expect(P.validatePromise(schema)("1")).rejects.toThrow()
    await expect(P.validatePromise(schema)("a")).rejects.toThrow()
  })

  it("validateEffect", async () => {
    const schema = T.NumberFromString
    expect(await Effect.runPromiseEither(P.validateEffect(schema)(1))).toEqual(E.right(1))
    expect(await Effect.runPromiseEither(P.validateEffect(schema)("1"))).toEqual(
      E.left(PR.parseError([PR.type(T.number.ast, "1")]))
    )
  })

  it("encodeResult", () => {
    const schema = T.NumberFromString
    expect(P.encodeResult(schema)(1)).toEqual(E.right("1"))
  })

  it("encodePromise", async () => {
    const schema = T.NumberFromString
    await expect(P.encodePromise(schema)(1)).resolves.toEqual("1")
  })

  it("_getLiterals", () => {
    expect(P._getLiterals(T.string.ast)).toEqual([])
    // TypeLiteral
    expect(P._getLiterals(T.struct({ _tag: T.literal("a") }).ast))
      .toEqual([["_tag", AST.createLiteral("a")]])
    // Refinement
    expect(
      P._getLiterals(
        pipe(
          T.struct({ _tag: T.literal("a") }),
          T.filter(() => true)
        ).ast
      )
    ).toEqual([["_tag", AST.createLiteral("a")]])
    // declare
    expect(
      P._getLiterals(
        T.declare(
          [],
          T.struct({ _tag: T.literal("a") }),
          () => P.parseResult(T.struct({ _tag: T.literal("a") })),
          () => P.encodeResult(T.struct({ _tag: T.literal("a") }))
        ).ast
      )
    ).toEqual([["_tag", AST.createLiteral("a")]])

    // Transform
    expect(
      P._getLiterals(
        pipe(T.struct({ radius: T.number }), T.attachPropertySignature("kind", "circle")).ast
      )
    ).toEqual([])
  })

  it("_getSearchTree", () => {
    expect(P._getSearchTree([T.string.ast, T.number.ast])).toEqual({
      keys: {},
      otherwise: [T.string.ast, T.number.ast]
    })

    expect(P._getSearchTree([T.struct({ _tag: T.literal("a") }).ast, T.number.ast])).toEqual(
      {
        keys: {
          _tag: {
            buckets: {
              a: [T.struct({ _tag: T.literal("a") }).ast]
            },
            ast: AST.createLiteral("a")
          }
        },
        otherwise: [T.number.ast]
      }
    )

    expect(
      P._getSearchTree([
        T.struct({ _tag: T.literal("a") }).ast,
        T.struct({ _tag: T.literal("b") }).ast
      ])
    ).toEqual({
      keys: {
        _tag: {
          buckets: {
            a: [T.struct({ _tag: T.literal("a") }).ast],
            b: [T.struct({ _tag: T.literal("b") }).ast]
          },
          ast: AST.createUnion([AST.createLiteral("a"), AST.createLiteral("b")])
        }
      },
      otherwise: []
    })

    expect(
      P._getSearchTree([
        T.struct({ a: T.literal("A"), c: T.string }).ast,
        T.struct({ b: T.literal("B"), d: T.number }).ast
      ])
    ).toEqual({
      keys: {
        a: {
          buckets: {
            A: [T.struct({ a: T.literal("A"), c: T.string }).ast]
          },
          ast: AST.createLiteral("A")
        },
        b: {
          buckets: {
            B: [T.struct({ b: T.literal("B"), d: T.number }).ast]
          },
          ast: AST.createLiteral("B")
        }
      },
      otherwise: []
    })

    // should handle multiple tags
    expect(
      P._getSearchTree([
        T.struct({ category: T.literal("catA"), tag: T.literal("a") }).ast,
        T.struct({ category: T.literal("catA"), tag: T.literal("b") }).ast,
        T.struct({ category: T.literal("catA"), tag: T.literal("c") }).ast
      ])
    ).toEqual({
      keys: {
        category: {
          buckets: {
            catA: [T.struct({ category: T.literal("catA"), tag: T.literal("a") }).ast]
          },
          ast: AST.createLiteral("catA")
        },
        tag: {
          buckets: {
            b: [T.struct({ category: T.literal("catA"), tag: T.literal("b") }).ast],
            c: [T.struct({ category: T.literal("catA"), tag: T.literal("c") }).ast]
          },
          ast: AST.createUnion([AST.createLiteral("b"), AST.createLiteral("c")])
        }
      },
      otherwise: []
    })
  })

  const schema = T.union(
    T.struct({ type: T.literal("a"), value: T.string }),
    T.struct({ type: T.literal("b"), value: T.string }),
    T.struct({ type: T.literal("c"), value: T.string }),
    T.struct({ type: T.string, value: T.string }),
    T.struct({ type: T.literal(null), value: T.string }),
    T.struct({ type: T.undefined, value: T.string }),
    T.struct({ type: T.literal("d", "e"), value: T.string }),
    T.struct({ type: T.struct({ nested: T.string }), value: T.string }),
    T.struct({ type: T.array(T.number), value: T.string })
  )
  const types = (schema.ast as AST.Union).types
  expect(
    P._getSearchTree(types)
  ).toEqual({
    keys: {
      type: {
        buckets: {
          a: [T.struct({ type: T.literal("a"), value: T.string }).ast],
          b: [T.struct({ type: T.literal("b"), value: T.string }).ast],
          c: [T.struct({ type: T.literal("c"), value: T.string }).ast],
          null: [T.struct({ type: T.literal(null), value: T.string }).ast]
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
      T.struct({ type: T.string, value: T.string }).ast,
      T.struct({ type: T.undefined, value: T.string }).ast,
      T.struct({ type: T.literal("d", "e"), value: T.string }).ast,
      T.struct({ type: T.struct({ nested: T.string }), value: T.string }).ast,
      T.struct({ type: T.array(T.number), value: T.string }).ast
    ]
  })
})
