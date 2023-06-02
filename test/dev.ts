import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it.skip("tuple/e", async () => {
    const NumberFromChar = pipe(S.string, S.maxLength(1), C.numberFromString)
    const codec = C.array(NumberFromChar)
    await Util.expectEncodeFailure(
      codec,
      [10],
      `/0 Expected a string at most 1 character(s) long, actual "10"`
    )
  })

  it.skip("codec + schema", async () => {
    const codec = C.NumberFromString
    const schema = pipe(S.number, S.int())

    const composition = pipe(codec, C.filter((n) => n > 0), C.compose(schema))
    Util.printAST(composition)
  })
})
