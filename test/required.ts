import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import * as AST from "@effect/schema/AST"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("required", () => {
  it("required/ struct", () => {
    const schema = S.required(S.struct({ a: S.optional(S.number) }))

    Util.expectParseSuccess(schema, { a: 1 }, { a: 1 })
    Util.expectParseFailure(schema, {}, "/a is missing")
  })

  it("required/ filter", () => {
    const schema = S.required(S.struct({
      a: S.optional(pipe(S.number, S.greaterThan(0)))
    }))

    Util.expectParseSuccess(schema, { a: 1 }, { a: 1 })
    Util.expectParseFailure(schema, {}, "/a is missing")
  })

  it("required/ deep struct", () => {
    const schema = S.required(S.struct({ c: S.struct({ d: S.optional(S.number) }) }))

    Util.expectParseSuccess(schema, { c: { d: 1 } }, { c: { d: 1 } })
    Util.expectParseFailure(schema, {}, "/c is missing")
  })

  it("required/ tuple", () => {
    const schema = S.required(pipe(S.tuple(S.number), S.optionalElement(S.string)))

    Util.expectParseSuccess(schema, [0, ""], [0, ""])
    Util.expectParseFailure(schema, [0], "/1 is missing")
  })

  it("required/tuple/ e + r + e", () => {
    // type A = readonly [string, ...Array<number>, boolean]
    // type B = Required<A> // [string, ...(number | boolean)[], number | boolean]

    const s_ = pipe(S.tuple(S.string), S.rest(S.number), S.element(S.boolean))
    const schema = S.required(s_)

    Util.expectParseFailure(schema, [], "/0 is missing")
    Util.expectParseFailure(schema, [""], "/1 is missing")
    Util.expectParseSuccess(schema, ["", 0], ["", 0])
    Util.expectParseSuccess(schema, ["", true], ["", true])
    Util.expectParseSuccess(schema, ["", true, 0], ["", true, 0])
    Util.expectParseSuccess(schema, ["", 0, true], ["", 0, true])
  })

  it("required/refinement", () => {
    const schema = pipe(
      S.struct({ a: S.optional(S.string), b: S.optional(S.string) }),
      S.filter(({ a, b }) => a === b),
      S.required
    )
    expect(schema.ast).toEqual(S.struct({ a: S.string, b: S.string }).ast)
  })

  it("required/transform", () => {
    const schema = pipe(
      S.string,
      S.transform(S.struct({ a: S.optional(S.string) }), (a) => ({ a }), ({ a }) => a || ""),
      S.required
    )
    expect(schema.ast).toEqual(S.struct({ a: S.string }).ast)
  })

  it("required/tuple/ e", () => {
    // type A = [string]
    // type B = Required<A>
    const tuple = AST.createTuple([AST.createElement(AST.stringKeyword, false)], O.none(), true)
    expect(AST.required(tuple)).toEqual(
      AST.createTuple([AST.createElement(AST.stringKeyword, false)], O.none(), true)
    )
  })

  it("required/tuple/ e + r", () => {
    // type A = readonly [string, ...Array<number>]
    // type B = Required<A>
    const tuple = AST.createTuple(
      [AST.createElement(AST.stringKeyword, false)],
      O.some([AST.numberKeyword]),
      true
    )
    expect(AST.required(tuple)).toEqual(
      AST.createTuple(
        [AST.createElement(AST.stringKeyword, false), AST.createElement(AST.numberKeyword, false)],
        O.some([AST.createUnion([AST.numberKeyword])]),
        true
      )
    )
  })

  it("required/tuple/ e + r + e", () => {
    // type A = readonly [string, ...Array<number>, boolean]
    // type B = Required<A> // [string, ...(number | boolean)[], number | boolean]
    const tuple = AST.createTuple(
      [AST.createElement(AST.stringKeyword, false)],
      O.some([AST.numberKeyword, AST.booleanKeyword]),
      true
    )

    expect(AST.required(tuple)).toEqual(
      AST.createTuple(
        [
          AST.createElement(AST.stringKeyword, false),
          AST.createElement(AST.createUnion([AST.numberKeyword, AST.booleanKeyword]), false)
        ],
        O.some([AST.createUnion([AST.numberKeyword, AST.booleanKeyword])]),
        true
      )
    )
  })
})
