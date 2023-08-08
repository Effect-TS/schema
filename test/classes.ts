import * as Data from "@effect/data/Data"
import * as O from "@effect/data/Option"
import * as PR from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

class Person extends S.Class({
  id: S.number,
  name: S.string
}) {
  get upperName() {
    return this.name.toUpperCase()
  }
}

class PersonWithAge extends S.ClassExtends(Person, {
  age: S.number
}) {
  get isAdult() {
    return this.age >= 18
  }
}

class PersonWithNick extends S.ClassExtends(PersonWithAge, {
  nick: S.string
}) {}

class PersonWithTransform extends S.ClassTransform(
  Person,
  { thing: S.optional(S.struct({ id: S.number })).toOption() },
  (input) =>
    PR.success({
      ...input,
      thing: O.some({ id: 123 })
    }),
  PR.success
) {}

class PersonWithTransformFrom extends S.ClassTransformFrom(
  Person,
  { thing: S.optional(S.struct({ id: S.number })).toOption() },
  (input) =>
    PR.success({
      ...input,
      thing: { id: 123 }
    }),
  PR.success
) {}

describe("Class", () => {
  it("constructor", () => {
    const person = new Person({ id: 1, name: "John" })
    assert(person.name === "John")
    assert(person.upperName === "JOHN")
  })

  it("schema", () => {
    const person = S.parseSync(Person.schema())({ id: 1, name: "John" })
    assert(person.name === "John")

    const PersonFromSelf = S.to(Person.schema())
    Util.expectParseSuccess(PersonFromSelf, new Person({ id: 1, name: "John" }))
    Util.expectParseFailure(
      PersonFromSelf,
      { id: 1, name: "John" },
      `Expected an instance of Person, actual {"id":1,"name":"John"}`
    )
  })

  it("extends", () => {
    const person = S.parseSync(PersonWithAge.schema())({
      id: 1,
      name: "John",
      age: 30
    })
    assert(person.name === "John")
    assert(person.upperName === "JOHN")
    assert(person.age === 30)
    assert(person.isAdult === true)
  })

  it("extends extends", () => {
    const person = S.parseSync(PersonWithNick.schema())({
      id: 1,
      name: "John",
      age: 30,
      nick: "Joe"
    })
    assert(person.age === 30)
    assert(person.nick === "Joe")
  })

  it("extends error", () => {
    expect(() => S.parseSync(PersonWithAge.schema())({ id: 1, name: "John" })).toThrowError(
      new Error(`error(s) found
└─ ["age"]
   └─ is missing`)
    )
  })

  it("Data.Class", () => {
    const person = new Person({ id: 1, name: "John" })
    const personAge = new PersonWithAge({ id: 1, name: "John", age: 30 })
    assert(person instanceof Data.Class)
    assert(personAge instanceof Data.Class)
  })

  it("transform", () => {
    const decode = S.decodeSync(PersonWithTransform.schema())
    const person = decode({
      id: 1,
      name: "John"
    })
    assert(person.id === 1)
    assert(person.name === "John")
    assert(O.isSome(person.thing) && person.thing.value.id === 123)
  })

  it("transform from", () => {
    const decode = S.decodeSync(PersonWithTransformFrom.schema())
    const person = decode({
      id: 1,
      name: "John"
    })
    assert(person.id === 1)
    assert(person.name === "John")
    assert(O.isSome(person.thing) && person.thing.value.id === 123)
  })
})
