import * as E from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import * as Effect from "@effect/io/Effect"
import * as AST from "@effect/schema/AST"
import * as C from "@effect/schema/Codec"
import * as P from "@effect/schema/Parser"
import * as PR from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"

describe.concurrent("Parser", () => {
  it("asserts", () => {
    const schema = S.string
    expect(S.asserts(schema)("a")).toEqual(undefined)
    expect(() => S.asserts(schema)(1)).toThrowError(
      new Error(`error(s) found
└─ Expected a string, actual 1`)
    )
  })

  it("parseSync", () => {
    const transform = C.NumberFromString
    expect(C.parseSync(transform)("1")).toEqual(1)
    expect(() => C.parseSync(transform)("a")).toThrowError(
      new Error(`error(s) found
└─ Expected (a string -> a number), actual "a"`)
    )
  })

  it("parseOption", () => {
    const transform = C.NumberFromString
    expect(C.parseOption(transform)("1")).toEqual(O.some(1))
    expect(C.parseOption(transform)("a")).toEqual(O.none())
  })

  it("parseEither", () => {
    const transform = C.NumberFromString
    expect(C.parseEither(transform)("1")).toEqual(E.right(1))
    expect(C.parseEither(transform)("a")).toEqual(
      E.left(PR.parseError([PR.type(transform.ast, "a")]))
    )
  })

  it("parsePromise", async () => {
    const transform = C.NumberFromString
    await expect(C.parsePromise(transform)("1")).resolves.toEqual(1)
    await expect(C.parsePromise(transform)("a")).rejects.toThrow()
  })

  it("parse", async () => {
    const codec = C.NumberFromString
    expect(await Effect.runPromise(Effect.either(P.parse(codec)("1")))).toEqual(
      E.right(1)
    )
    expect(await Effect.runPromise(Effect.either(P.parse(codec)("a")))).toEqual(
      E.left(PR.parseError([PR.type(codec.ast, "a")]))
    )
  })

  it("decodeSync", () => {
    const transform = C.NumberFromString
    expect(C.decodeSync(transform)("1")).toEqual(1)
    expect(() => C.decodeSync(transform)("a")).toThrowError(
      new Error(`error(s) found
└─ Expected (a string -> a number), actual "a"`)
    )
  })

  it("decodeOption", () => {
    const transform = C.NumberFromString
    expect(C.decodeOption(transform)("1")).toEqual(O.some(1))
    expect(C.decodeOption(transform)("a")).toEqual(O.none())
  })

  it("decodeEither", () => {
    const transform = C.NumberFromString
    expect(C.decodeEither(transform)("1")).toEqual(E.right(1))
    expect(C.decodeEither(transform)("a")).toEqual(
      E.left(PR.parseError([PR.type(transform.ast, "a")]))
    )
  })

  it("decodePromise", async () => {
    const transform = C.NumberFromString
    await expect(C.decodePromise(transform)("1")).resolves.toEqual(1)
    await expect(C.decodePromise(transform)("a")).rejects.toThrow()
  })

  it("decode", async () => {
    const codec = C.NumberFromString
    expect(await Effect.runPromise(Effect.either(P.decode(codec)("1")))).toEqual(E.right(1))
    expect(await Effect.runPromise(Effect.either(P.decode(codec)("a")))).toEqual(
      E.left(PR.parseError([PR.type(codec.ast, "a")]))
    )
  })

  it("validateSync", () => {
    const schema = S.number
    expect(S.validateSync(schema)(1)).toEqual(1)
    expect(() => S.validateSync(schema)("1")).toThrowError(
      new Error(`error(s) found
└─ Expected a number, actual "1"`)
    )
  })

  it("validateOption", () => {
    const schema = S.number
    expect(S.validateOption(schema)(1)).toEqual(O.some(1))
    expect(S.validateOption(schema)("1")).toEqual(O.none())
  })

  it("validateEither", () => {
    const schema = S.number
    expect(S.validateEither(schema)(1)).toEqual(E.right(1))
    expect(S.validateEither(schema)("1")).toEqual(
      E.left(PR.parseError([PR.type(S.number.ast, "1")]))
    )
  })

  it("validateResult", () => {
    const schema = S.number
    expect(S.validateResult(schema)(1)).toEqual(E.right(1))
    expect(S.validateResult(schema)("1")).toEqual(
      E.left(PR.parseError([PR.type(S.number.ast, "1")]))
    )
  })

  it("validatePromise", async () => {
    const schema = S.number
    await expect(S.validatePromise(schema)(1)).resolves.toEqual(1)
    await expect(S.validatePromise(schema)("1")).rejects.toThrow()
    await expect(S.validatePromise(schema)("a")).rejects.toThrow()
  })

  it("validate", async () => {
    const schema = S.number
    expect(await Effect.runPromise(Effect.either(P.validate(schema)(1)))).toEqual(E.right(1))
    expect(await Effect.runPromise(Effect.either(P.validate(schema)("1")))).toEqual(
      E.left(PR.parseError([PR.type(S.number.ast, "1")]))
    )
  })

  it("encodeResult", () => {
    const transform = C.NumberFromString
    expect(C.encodeResult(transform)(1)).toEqual(E.right("1"))
  })

  it("encodePromise", async () => {
    const transform = C.NumberFromString
    await expect(C.encodePromise(transform)(1)).resolves.toEqual("1")
  })

  it("_getLiterals", () => {
    expect(P._getLiterals(S.string.ast)).toEqual([])
    // TypeLiteral
    expect(P._getLiterals(S.struct({ _tag: S.literal("a") }).ast))
      .toEqual([["_tag", AST.createLiteral("a")]])
    // Refinement
    expect(
      P._getLiterals(
        pipe(
          S.struct({ _tag: S.literal("a") }),
          S.filter(() => true)
        ).ast
      )
    ).toEqual([["_tag", AST.createLiteral("a")]])
    // declare
    expect(
      P._getLiterals(
        S.declare(
          [],
          S.struct({ _tag: S.literal("a") }),
          () => C.parseResult(S.struct({ _tag: S.literal("a") }))
        ).ast
      )
    ).toEqual([["_tag", AST.createLiteral("a")]])

    // Transform
    expect(
      P._getLiterals(
        pipe(S.struct({ radius: S.number }), C.attachPropertySignature("kind", "circle")).ast
      )
    ).toEqual([])
  })

  it("_getSearchTree", () => {
    expect(P._getSearchTree([S.string.ast, S.number.ast])).toEqual({
      keys: {},
      otherwise: [S.string.ast, S.number.ast]
    })

    expect(P._getSearchTree([S.struct({ _tag: S.literal("a") }).ast, S.number.ast])).toEqual(
      {
        keys: {
          _tag: {
            buckets: {
              a: [S.struct({ _tag: S.literal("a") }).ast]
            },
            ast: AST.createLiteral("a")
          }
        },
        otherwise: [S.number.ast]
      }
    )

    expect(
      P._getSearchTree([
        S.struct({ _tag: S.literal("a") }).ast,
        S.struct({ _tag: S.literal("b") }).ast
      ])
    ).toEqual({
      keys: {
        _tag: {
          buckets: {
            a: [S.struct({ _tag: S.literal("a") }).ast],
            b: [S.struct({ _tag: S.literal("b") }).ast]
          },
          ast: AST.createUnion([AST.createLiteral("a"), AST.createLiteral("b")])
        }
      },
      otherwise: []
    })

    expect(
      P._getSearchTree([
        S.struct({ a: S.literal("A"), c: S.string }).ast,
        S.struct({ b: S.literal("B"), d: S.number }).ast
      ])
    ).toEqual({
      keys: {
        a: {
          buckets: {
            A: [S.struct({ a: S.literal("A"), c: S.string }).ast]
          },
          ast: AST.createLiteral("A")
        },
        b: {
          buckets: {
            B: [S.struct({ b: S.literal("B"), d: S.number }).ast]
          },
          ast: AST.createLiteral("B")
        }
      },
      otherwise: []
    })

    // should handle multiple tags
    expect(
      P._getSearchTree([
        S.struct({ category: S.literal("catA"), tag: S.literal("a") }).ast,
        S.struct({ category: S.literal("catA"), tag: S.literal("b") }).ast,
        S.struct({ category: S.literal("catA"), tag: S.literal("c") }).ast
      ])
    ).toEqual({
      keys: {
        category: {
          buckets: {
            catA: [S.struct({ category: S.literal("catA"), tag: S.literal("a") }).ast]
          },
          ast: AST.createLiteral("catA")
        },
        tag: {
          buckets: {
            b: [S.struct({ category: S.literal("catA"), tag: S.literal("b") }).ast],
            c: [S.struct({ category: S.literal("catA"), tag: S.literal("c") }).ast]
          },
          ast: AST.createUnion([AST.createLiteral("b"), AST.createLiteral("c")])
        }
      },
      otherwise: []
    })
  })

  const schema = S.union(
    S.struct({ type: S.literal("a"), value: S.string }),
    S.struct({ type: S.literal("b"), value: S.string }),
    S.struct({ type: S.literal("c"), value: S.string }),
    S.struct({ type: S.string, value: S.string }),
    S.struct({ type: S.literal(null), value: S.string }),
    S.struct({ type: S.undefined, value: S.string }),
    S.struct({ type: S.literal("d", "e"), value: S.string }),
    S.struct({ type: S.struct({ nested: S.string }), value: S.string }),
    S.struct({ type: S.array(S.number), value: S.string })
  )
  const types = (schema.ast as AST.Union).types
  expect(
    P._getSearchTree(types)
  ).toEqual({
    keys: {
      type: {
        buckets: {
          a: [S.struct({ type: S.literal("a"), value: S.string }).ast],
          b: [S.struct({ type: S.literal("b"), value: S.string }).ast],
          c: [S.struct({ type: S.literal("c"), value: S.string }).ast],
          null: [S.struct({ type: S.literal(null), value: S.string }).ast]
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
      S.struct({ type: S.string, value: S.string }).ast,
      S.struct({ type: S.undefined, value: S.string }).ast,
      S.struct({ type: S.literal("d", "e"), value: S.string }).ast,
      S.struct({ type: S.struct({ nested: S.string }), value: S.string }).ast,
      S.struct({ type: S.array(S.number), value: S.string }).ast
    ]
  })
})
