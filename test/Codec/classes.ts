import * as Data from "@effect/data/Data"
import * as Equal from "@effect/data/Equal"
import * as Option from "@effect/data/Option"
import * as C from "@effect/schema/Codec"
import * as PR from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

class Person extends C.Class({
  id: S.number,
  name: S.string.pipe(S.nonEmpty())
}) {
  get upperName() {
    return this.name.toUpperCase()
  }
}

class PersonWithAge extends Person.extend({
  age: S.number
}) {
  get isAdult() {
    return this.age >= 18
  }
}

class PersonWithNick extends PersonWithAge.extend({
  nick: S.string
}) {}

class PersonWithTransform extends Person.transform(
  {
    thing: S.optional(S.struct({ id: S.number })).toOption()
  },
  (input) =>
    PR.success({
      ...input,
      thing: Option.some({ id: 123 })
    }),
  PR.success
) {}

class PersonWithTransformFrom extends Person.transformFrom(
  {
    thing: S.optional(S.struct({ id: S.number })).toOption()
  },
  (input) =>
    PR.success({
      ...input,
      thing: { id: 123 }
    }),
  PR.success
) {}

describe("Class", () => {
  it("constructor", () => {
    const john = new Person({ id: 1, name: "John" })
    assert(john.name === "John")
    assert(john.upperName === "JOHN")
    expect(() => new Person({ id: 1, name: "" })).toThrowError(
      new Error(`error(s) found
└─ ["name"]
   └─ Expected a string at least 1 character(s) long, actual ""`)
    )
  })

  it("codec", () => {
    const person = C.parseSync(Person.codec())({ id: 1, name: "John" })
    assert(person.name === "John")

    const PersonFromSelf = C.to(Person.codec())
    Util.expectParseSuccess(PersonFromSelf, new Person({ id: 1, name: "John" }))
    Util.expectParseFailure(
      PersonFromSelf,
      { id: 1, name: "John" },
      `Expected an instance of Person, actual {"id":1,"name":"John"}`
    )
  })

  it("extends", () => {
    const person = C.parseSync(PersonWithAge.codec())({
      id: 1,
      name: "John",
      age: 30
    })
    assert(person.name === "John")
    assert(person.age === 30)
    assert(person.isAdult === true)
    assert(person.upperName === "JOHN")
  })

  it("extends extends", () => {
    const person = C.parseSync(PersonWithNick.codec())({
      id: 1,
      name: "John",
      age: 30,
      nick: "Joe"
    })
    assert(person.age === 30)
    assert(person.nick === "Joe")
  })

  it("extends error", () => {
    expect(() => C.parseSync(PersonWithAge.codec())({ id: 1, name: "John" })).toThrowError(
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

    const person2 = new Person({ id: 1, name: "John" })
    assert(Equal.equals(person, person2))

    const person3 = new Person({ id: 2, name: "John" })
    assert(!Equal.equals(person, person3))
  })

  it("transform", () => {
    const decode = C.decodeSync(PersonWithTransform.codec())
    const person = decode({
      id: 1,
      name: "John"
    })
    assert(person.id === 1)
    assert(person.name === "John")
    assert(Option.isSome(person.thing) && person.thing.value.id === 123)
    assert(person.upperName === "JOHN")
  })

  it("transform from", () => {
    const decode = C.decodeSync(PersonWithTransformFrom.codec())
    const person = decode({
      id: 1,
      name: "John"
    })
    assert(person.id === 1)
    assert(person.name === "John")
    assert(Option.isSome(person.thing) && person.thing.value.id === 123)
    assert(person.upperName === "JOHN")
  })
})
