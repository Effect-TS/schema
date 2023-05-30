import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"

describe.concurrent("dev", () => {
  it.skip("dev", async () => {
    const schema = C.struct({ a: C.optional(S.string).toOption() })
    console.log(schema.ast)
  })
})
