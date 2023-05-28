import * as S from "@effect/schema/Schema"
import * as T from "@effect/schema/Transform"

describe.concurrent("TypeLiteralTransformation", () => {
  it.skip("nested", () => {
    const transform = T.struct({ a: T.NumberFromString, b: S.string })
    console.log(JSON.stringify(transform.ast, null, 2))
  })
})
