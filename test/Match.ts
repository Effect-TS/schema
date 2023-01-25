import * as E from "@fp-ts/core/Either"
import { pipe } from "@fp-ts/core/Function"
import * as Match from "@fp-ts/schema/Match"
import * as S from "@fp-ts/schema/Schema"

describe("Match", () => {
  it("exhaustive", () => {
    const match = pipe(
      Match.match<{ a: number } | { b: number }>(),
      Match.when({ a: S.number }, (_) => _.a),
      Match.when({ b: S.number }, (_) => _.b),
      Match.exaustive
    )
    expect(match({ a: 0 })).toBe(0)
    expect(match({ b: 1 })).toBe(1)
  })

  it("exhaustive-literal", () => {
    const match = pipe(
      Match.match<{ _tag: "A"; a: number } | { _tag: "B"; b: number }>(),
      Match.when({ _tag: "A" }, (_) => E.right(_.a)),
      Match.when({ _tag: "B" }, (_) => E.left(_.b)),
      Match.exaustive
    )
    expect(match({ _tag: "A", a: 0 })).toBe(0)
    expect(match({ _tag: "B", b: 1 })).toBe(1)
  })
})
