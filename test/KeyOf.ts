import { pipe } from "@fp-ts/data/Function"
import { provideKeyOfFor } from "@fp-ts/schema/KeyOf"
import { empty } from "@fp-ts/schema/Provider"
import * as S from "@fp-ts/schema/Schema"
import { provideTypeRepFor } from "@fp-ts/schema/test/compilers/TypeRep"

describe("keyOfFor", () => {
  const keyOfFor = provideKeyOfFor(empty)
  const typeRepFor = provideTypeRepFor(empty)
  const keyOfRep = <A>(value: S.Schema<A>) => typeRepFor(keyOfFor(value).keyOf).typeRep

  it("struct", () => {
    const schema = S.struct({
      a: S.string,
      b: S.number
    })
    expect(pipe(schema, keyOfRep)).toEqual(
      `"a" | "b"`
    )
  })

  it("tuple", () => {
    const schema = S.tuple(S.string, S.number)
    expect(pipe(schema, keyOfRep)).toEqual(
      `0 | 1`
    )
  })

  it("tuple with rest", () => {
    const schema = pipe(S.tuple(S.string, S.number), S.restElement(S.string))
    expect(pipe(schema, keyOfRep)).toEqual(
      `number | 0 | 1`
    )
  })

  it("union of struct", () => {
    const add = S.struct({
      _tag: S.literal("AddTodo"),
      name: S.string
    })
    const remove = S.struct({
      _tag: S.literal("RemoveTodo"),
      id: S.number
    })
    const schema = S.union(add, remove)
    expect(pipe(schema, keyOfRep)).toEqual(
      `"_tag"`
    )
  })
})
