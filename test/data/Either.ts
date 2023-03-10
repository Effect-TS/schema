import * as E from "@effect/data/Either"
import * as S from "@effect/schema"
import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as Util from "@effect/schema/test/util"

const NumberFromString = S.numberFromString(S.string)

describe.concurrent("Either", () => {
  it("eitherGuard. property tests", () => {
    Util.property(S.eitherGuard(S.string, S.number))
  })

  it("eitherGuard. Guard", () => {
    const schema = S.eitherGuard(S.string, S.number)
    const is = P.is(schema)
    expect(is(E.left("a"))).toEqual(true)
    expect(is(E.right(1))).toEqual(true)
    expect(is(null)).toEqual(false)
    expect(is(E.right("a"))).toEqual(false)
    expect(is(E.left(1))).toEqual(false)

    expect(is({ _tag: "Right", right: 1 })).toEqual(false)
    expect(is({ _tag: "Left", left: "a" })).toEqual(false)
  })

  it("eitherGuard. Decoder", () => {
    const schema = S.eitherGuard(S.string, NumberFromString)
    Util.expectDecodingSuccess(schema, E.left("a"), E.left("a"))
    Util.expectDecodingSuccess(schema, E.right("1"), E.right(1))
  })

  it("eitherGuard. Pretty", () => {
    const schema = S.eitherGuard(S.string, S.number)
    const pretty = Pretty.pretty(schema)
    expect(pretty(E.left("a"))).toEqual(`left("a")`)
    expect(pretty(E.right(1))).toEqual("right(1)")
  })
})
