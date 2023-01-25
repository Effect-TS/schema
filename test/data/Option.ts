import { pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as S from "@fp-ts/schema"
import * as _ from "@fp-ts/schema/data/Option"
import { parseNumber } from "@fp-ts/schema/data/parser"
import * as P from "@fp-ts/schema/Parser"
import * as Pretty from "@fp-ts/schema/Pretty"
import * as Util from "@fp-ts/schema/test/util"

const NumberFromString = pipe(S.string, parseNumber)

describe.concurrent("Option", () => {
  it("option. property tests", () => {
    Util.property(_.fromNullable(NumberFromString))
  })

  it("option. Guard", () => {
    const schema = _.option(S.number)
    const is = P.is(schema)
    expect(is(O.none())).toEqual(true)
    expect(is(O.some(1))).toEqual(true)
    expect(is(null)).toEqual(false)
    expect(is(O.some("a"))).toEqual(false)
  })

  it("option. Decoder", () => {
    const schema = _.option(NumberFromString)
    Util.expectDecodingSuccess(schema, O.none(), O.none())
    Util.expectDecodingSuccess(schema, O.some("1"), O.some(1))
  })

  it("option. Pretty", () => {
    const schema = _.option(S.number)
    const pretty = Pretty.pretty(schema)
    expect(pretty(O.none())).toEqual("none()")
    expect(pretty(O.some(1))).toEqual("some(1)")
  })

  it("fromNullable. property tests", () => {
    Util.property(_.fromNullable(S.number))
  })

  it("fromNullable. Decoder", () => {
    const schema = _.fromNullable(NumberFromString)
    Util.expectDecodingSuccess(schema, undefined, O.none())
    Util.expectDecodingSuccess(schema, null, O.none())
    Util.expectDecodingSuccess(schema, "1", O.some(1))

    expect(O.isOption(S.decodeOrThrow(schema)(null))).toEqual(true)
    expect(O.isOption(S.decodeOrThrow(schema)("1"))).toEqual(true)

    Util.expectDecodingFailureTree(
      schema,
      {},
      `3 error(s) found
├─ union member
│  └─ Expected undefined, actual {}
├─ union member
│  └─ Expected null, actual {}
└─ union member
   └─ Expected string, actual {}`
    )
  })

  it("fromNullable. Encoder", () => {
    const schema = _.fromNullable(NumberFromString)
    Util.expectEncodingSuccess(schema, O.none(), null)
    Util.expectEncodingSuccess(schema, O.some(1), "1")
  })
})
