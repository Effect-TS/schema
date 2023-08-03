import * as Data from "@effect/data/Data"
import { isSome, some } from "@effect/data/Option"
import * as Effect from "@effect/io/Effect"
import * as PR from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import {
  SchemaClass,
  SchemaClassExtends,
  SchemaClassTransform,
  SchemaClassTransformFrom
} from "@effect/schema/SchemaClass"

class Person extends SchemaClass({
  id: S.number,
  name: S.string
}) {
  get upperName() {
    return this.name.toUpperCase()
  }
}

class PersonWithAge extends SchemaClassExtends(Person, {
  age: S.number
}) {
  get isAdult() {
    return this.age >= 18
  }
}

class PersonWithNick extends SchemaClassExtends(PersonWithAge, {
  nick: S.string
}) {}

class PersonWithTransform extends SchemaClassTransform(
  Person,
  { thing: S.optional(S.struct({ id: S.number })).toOption() },
  (input) =>
    PR.success({
      ...input,
      thing: some({ id: 123 })
    }),
  PR.success
) {}

class PersonWithTransformFrom extends SchemaClassTransformFrom(
  Person,
  { thing: S.optional(S.struct({ id: S.number })).toOption() },
  (input) =>
    PR.success({
      ...input,
      thing: { id: 123 }
    }),
  PR.success
) {}

describe("SchemaClass", () => {
  it("constructor", () => {
    const person = new Person({ id: 1, name: "John" })
    assert(person.name === "John")
    assert(person.upperName === "JOHN")
  })

  it("schema", () => {
    const person = S.parseSync(Person.schema())({ id: 1, name: "John" })
    assert(person.name === "John")
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

  it("copy", () => {
    const person = new Person({ id: 1, name: "John" })
    const joe = person.copy({ name: "Joe" })
    assert(joe.id === 1)
    assert(joe.name === "Joe")
  })

  it("unsafeCopy", () => {
    const person = new Person({ id: 1, name: "John" })
    const joe = person.unsafeCopy({ name: "Joe" })
    assert(joe.id === 1)
    assert(joe.name === "Joe")
  })

  it("transform", () => {
    const decode = S.decodeSync(PersonWithTransform.schema())
    const person = decode({
      id: 1,
      name: "John"
    })
    assert(person.id === 1)
    assert(person.name === "John")
    assert(isSome(person.thing) && person.thing.value.id === 123)
  })

  it("transform from", () => {
    const decode = S.decodeSync(PersonWithTransformFrom.schema())
    const person = decode({
      id: 1,
      name: "John"
    })
    assert(person.id === 1)
    assert(person.name === "John")
    assert(isSome(person.thing) && person.thing.value.id === 123)
  })

  it("unsafe", () => {
    const person = Person.unsafe({ id: 1, name: "John" })
    assert(person.id === 1)
    assert(person.name === "John")
  })

  it("effect", () => {
    const person = Effect.runSync(Person.effect({ id: 1, name: "John" }))
    assert(person.id === 1)
    assert(person.name === "John")
  })
})
