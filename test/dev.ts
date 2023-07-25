import * as Equal from "@effect/data/Equal"
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

  it("data", () => {
    const schema = C.data(
      S.struct({
        name: S.string,
        age: S.number
      })
    )

    const parseSync = C.parseSync(schema)

    const person1 = parseSync({ name: "Alice", age: 30 })
    const person2 = parseSync({ name: "Alice", age: 30 })

    expect(Equal.equals(person1, person2)).toBe(true)
  })

  it("data", () => {
    const schema = S.data(S.struct({
      name: S.string,
      age: S.number
    }))

    const person1 = S.decode(schema)({ name: "Alice", age: 30 })
    const person2 = S.decode(schema)({ name: "Alice", age: 30 })

    expect(Equal.equals(person1, person2)).toBe(true)
  })
})
