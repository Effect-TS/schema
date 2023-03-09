import * as S from "@effect/schema"
import * as P from "@effect/schema/Parser"
import * as Pretty from "@effect/schema/Pretty"
import * as Util from "@effect/schema/test/util"

describe.concurrent("minLength", () => {
  it("property tests", () => {
    Util.property(S.minLength(0)(S.string))
  })

  it("Guard", () => {
    const is = P.is(S.minLength(1)(S.string))
    expect(is("")).toEqual(false)
    expect(is("a")).toEqual(true)
    expect(is("aa")).toEqual(true)
  })

  it("Decoder", () => {
    const schema = S.minLength(1)(S.string)
    Util.expectDecodingSuccess(schema, "a")
    Util.expectDecodingSuccess(schema, "aa")
    Util.expectDecodingFailure(
      schema,
      "",
      `Expected a string at least 1 character(s) long, actual ""`
    )
  })

  it("Pretty", () => {
    const pretty = Pretty.pretty(S.minLength(0)(S.string))
    expect(pretty("a")).toEqual(`"a"`)
  })
})
