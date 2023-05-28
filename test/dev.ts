import * as S from "@effect/schema/Schema"
import * as T from "@effect/schema/Transform"

describe.concurrent("dev", () => {
  it.skip("dev", async () => {
    const transform = T.tuple(S.string, T.NumberFromString)
    console.log(JSON.stringify(transform.ast, null, 2))
  })
})
