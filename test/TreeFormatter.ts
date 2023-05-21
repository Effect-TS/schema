import { pipe } from "@effect/data/Function"
import * as AST from "@effect/schema/AST"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as _ from "@effect/schema/TreeFormatter"

describe.concurrent("formatExpected", () => {
  it("lazy", () => {
    type A = readonly [number, A | null]
    const schema: S.Schema<A> = S.lazy<A>(
      () => S.tuple(S.number, S.union(schema, S.literal(null)))
    )
    expect(_.formatExpected(schema.ast)).toEqual("<anonymous lazy schema>")
  })
})

describe.concurrent("formatErrors", () => {
  it("refinement", () => {
    const schema = pipe(
      S.NumberFromString,
      S.filter((n) => n > 0),
      S.annotations({ [AST.MessageAnnotationId]: () => "mymessage" })
    )
    expect(() => S.parse(schema)("a")).toThrowError(
      new Error(`error(s) found
└─ Expected string -> number, actual "a"`)
    )
    expect(() => S.parse(schema)("-1")).toThrowError(
      new Error(`error(s) found
└─ mymessage`)
    )
    expect(() => S.encode(schema)(-1)).toThrowError(
      new Error(`error(s) found
└─ mymessage`)
    )
  })

  it("forbidden", async () => {
    const schema = Util.effectify(S.struct({ a: S.string }), "all")
    expect(() => S.parse(schema)({ a: "a" })).toThrowError(
      new Error(`error(s) found
└─ ["a"]
   └─ is forbidden`)
    )
  })

  it("missing", async () => {
    const schema = S.struct({ a: S.string })
    await Util.expectParseFailureTree(
      schema,
      {},
      `error(s) found
└─ ["a"]
   └─ is missing`
    )
  })

  it("excess property", async () => {
    const schema = S.struct({ a: S.string })
    await Util.expectParseFailureTree(
      schema,
      { a: "a", b: 1 },
      `error(s) found
└─ ["b"]
   └─ is unexpected`,
      Util.onExcessPropertyError
    )
  })

  it("should collapse trees that have a branching factor of 1", async () => {
    const schema = S.struct({
      a: S.struct({ b: S.struct({ c: S.array(S.struct({ d: S.string })) }) })
    })
    Util.expectParseFailureTree(
      schema,
      { a: { b: { c: [{ d: null }] } } },
      `error(s) found
└─ ["a"]["b"]["c"][0]["d"]
   └─ Expected string, actual null`
    )
    Util.expectParseFailureTree(
      schema,
      { a: { b: { c: [{ d: null }, { d: 1 }] } } },
      `error(s) found
└─ ["a"]["b"]["c"][0]["d"]
   └─ Expected string, actual null`
    )
    Util.expectParseFailureTree(
      schema,
      { a: { b: { c: [{ d: null }, { d: 1 }] } } },
      `error(s) found
└─ ["a"]["b"]["c"]
   ├─ [0]["d"]
   │  └─ Expected string, actual null
   └─ [1]["d"]
      └─ Expected string, actual 1`,
      Util.allErrors
    )
  })
})

describe.concurrent("formatActual", () => {
  it("should handle unexpected errors", () => {
    const circular: any = { a: null }
    circular.a = circular
    expect(_.formatActual(circular)).toEqual("[object Object]")
  })
})
