import * as JSONSchema from "@effect/schema/JSONSchema"
import * as S from "@effect/schema/Schema"

describe("dev", () => {
  it.skip("tmp", async () => {
    const Person = S.struct({
      name: S.string,
      age: S.number
    })

    const jsonSchema = JSONSchema.to(Person)

    console.log(JSON.stringify(jsonSchema, null, 2))
  })
})
