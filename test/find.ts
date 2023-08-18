import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

const IntFromString = S.NumberFromString.pipe(S.int())

describe("find", () => {
  it("findAll", () => {
    const schema = S.findAll(S.array(S.string), IntFromString) // Schema<string[], number[]>

    Util.expectParseSuccess(schema, [], [])
    Util.expectParseSuccess(schema, ["1"], [1])
    Util.expectParseSuccess(schema, ["1", "a", "2", "1.5"], [1, 2])
    Util.expectEncodeSuccess(schema, [], [])
    Util.expectEncodeSuccess(schema, [1], ["1"])
  })

  it("findFirst", () => {
    const schema = S.findFirst(S.array(S.string), IntFromString) // Schema<string[], number>

    Util.expectParseSuccess(schema, ["1"], 1)
    Util.expectParseSuccess(schema, ["1.5", "2"], 2)
    Util.expectParseSuccess(schema, ["a", "1"], 1)
    Util.expectEncodeSuccess(schema, 1, ["1"])
  })

  it("findLast", () => {
    const schema = S.findLast(S.array(S.string), IntFromString) // Schema<string[], number>

    Util.expectParseSuccess(schema, ["1"], 1)
    Util.expectParseSuccess(schema, ["1", "2"], 2)
    Util.expectParseSuccess(schema, ["a", "1"], 1)
    Util.expectParseSuccess(schema, ["a", "1", "2"], 2)
    Util.expectEncodeSuccess(schema, 1, ["1"])
  })
})
