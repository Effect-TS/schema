import * as E from "@fp-ts/core/Either"
import { pipe } from "@fp-ts/core/Function"
import { isNumber } from "@fp-ts/core/Number"
import { isString } from "@fp-ts/core/String"
import { json } from "@fp-ts/schema/data/Json"
import * as _ from "@fp-ts/schema/formatter/Tree"
import * as I from "@fp-ts/schema/internal/common"
import * as S from "@fp-ts/schema/Schema"
import * as Util from "@fp-ts/schema/test/util"

describe.concurrent("Tree", () => {
  it("formatErrors/ Unexpected", () => {
    const schema = S.struct({ a: S.string })
    Util.expectDecodingFailureTree(
      schema,
      { a: "a", b: 1 },
      `1 error(s) found
└─ key "b"
   └─ is unexpected`
    )
  })

  it("formatErrors/ union", () => {
    const parser = I.fromRefinement(
      S.union(S.string, S.number),
      (u): u is string | number => isString(u) || isNumber(u)
    )
    expect(pipe(parser.parse(null), E.mapLeft(_.formatErrors))).toEqual(E.left(`1 error(s) found
└─ Expected string or number, actual null`))
  })

  it("formatErrors/ lazy", () => {
    const parser = I.fromRefinement(json, I.isJson)
    expect(pipe(parser.parse(undefined), E.mapLeft(_.formatErrors))).toEqual(
      E.left(`1 error(s) found
└─ Expected <anonymous Lazy schema>, actual undefined`)
    )
  })

  it("formatActual/ catch", () => {
    const circular: any = { a: null }
    circular.a = circular
    expect(_.formatActual(circular)).toEqual("[object Object]")
  })
})
