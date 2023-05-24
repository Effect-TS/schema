import { pipe } from "@effect/data/Function"
import * as AST from "@effect/schema/AST"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"
import * as _ from "@effect/schema/TreeFormatter"

describe.concurrent("formatExpected", () => {
  it("lazy", () => {
    type A = readonly [number, A | null]
    const schema: T.Transform<A, A> = T.lazy(
      () => T.tuple(T.number, T.union(schema, T.literal(null)))
    )
    expect(_.formatExpected(schema.ast)).toEqual("<anonymous lazy schema>")
  })
})

describe.concurrent("formatErrors", () => {
  it("refinement", () => {
    const schema = pipe(
      T.NumberFromString,
      T.filter((n) => n > 0),
      T.annotations({ [AST.MessageAnnotationId]: () => "mymessage" })
    )
    expect(() => T.parse(schema)("a")).toThrowError(
      new Error(`error(s) found
└─ Expected string -> number, actual "a"`)
    )
    expect(() => T.parse(schema)("-1")).toThrowError(
      new Error(`error(s) found
└─ mymessage`)
    )
    expect(() => T.encode(schema)(-1)).toThrowError(
      new Error(`error(s) found
└─ mymessage`)
    )
  })

  it("forbidden", async () => {
    const schema = Util.effectify(T.struct({ a: T.string }), "all")
    expect(() => T.parse(schema)({ a: "a" })).toThrowError(
      new Error(`error(s) found
└─ ["a"]
   └─ is forbidden`)
    )
  })

  it("missing", async () => {
    const schema = T.struct({ a: T.string })
    await Util.expectParseFailureTree(
      schema,
      {},
      `error(s) found
└─ ["a"]
   └─ is missing`
    )
  })

  it("excess property", async () => {
    const schema = T.struct({ a: T.string })
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
    const schema = T.struct({
      a: T.struct({ b: T.struct({ c: T.array(T.struct({ d: T.string })) }) })
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
