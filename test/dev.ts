import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it.skip("dev", async () => {
    const schema = S.number.pipe(S.int())
    Util.printAST(schema)
  })

  it.skip("codec + schema", async () => {
    const codec = C.NumberFromString
    const schema = S.number.pipe(S.int())

    const composition = codec.pipe(C.filter((n) => n > 0), C.compose(schema))
    Util.printAST(composition)
  })
})
