import type { Refinement } from "@effect/data/Predicate"
import * as P from "@effect/schema/Parser"
import * as S from "@effect/schema/Schema"

describe.concurrent("every", () => {
  it("every/ predicate", () => {
    const schema = S.array(S.number).pipe(S.every((n) => n % 2 === 0)) // even
    const is = P.is(schema)

    expect(is([])).toEqual(true)
    expect(is([1])).toEqual(false)
    expect(is([1, 2])).toEqual(false)
    expect(is([2, 4])).toEqual(true)
    expect(is([2, 3])).toEqual(false)
  })

  it("every/ refinement", () => {
    const isString: Refinement<unknown, string> = (u: unknown): u is string => typeof u === "string"
    const schema = S.array(S.unknown).pipe(S.every(isString))
    const is = P.is(schema)

    expect(is([])).toEqual(true)
    expect(is([""])).toEqual(true)
  })
})
