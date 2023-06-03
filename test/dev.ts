import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it.skip("dev", async () => {
    const schema = pipe(S.number, S.int())
    Util.printAST(schema)
  })

  it.skip("codec + schema", async () => {
    const codec = C.NumberFromString
    const schema = pipe(S.number, S.int())

    const composition = pipe(codec, C.filter((n) => n > 0), C.compose(schema))
    Util.printAST(composition)
  })
})
