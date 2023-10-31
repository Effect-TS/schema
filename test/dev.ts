import * as Equivalence from "@effect/schema/Equivalence"
import * as S from "@effect/schema/Schema"
import { describe, it } from "vitest"

describe.skip("dev", () => {
  it("tmp", async () => {
    const Person = S.struct({
      name: S.string,
      age: S.number
    })

    const PersonEquivalence = Equivalence.to(Person)

    const john = { name: "John", age: 23 }
    const alice = { name: "Alice", age: 30 }

    console.log(PersonEquivalence(john, { name: "John", age: 23 })) // Output: true
    console.log(PersonEquivalence(john, alice)) // Output: false
  })
})
