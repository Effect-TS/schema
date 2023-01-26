import * as E from "@fp-ts/core/Either"
import { pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as T from "@fp-ts/core/These"
import * as Match from "@fp-ts/schema/Match"
import * as S from "@fp-ts/schema/Schema"

describe("Match", () => {
  it("exhaustive", () => {
    const match = pipe(
      Match.type<{ a: number } | { b: number }>(),
      Match.when({ a: S.number }, (_) => _.a),
      Match.when({ b: S.number }, (_) => _.b),
      Match.exaustive
    )
    expect(match({ a: 0 })).toBe(0)
    expect(match({ b: 1 })).toBe(1)
  })

  it("exhaustive-literal", () => {
    const match = pipe(
      Match.type<{ _tag: "A"; a: number } | { _tag: "B"; b: number }>(),
      Match.when({ _tag: "A" }, (_) => E.right(_.a)),
      Match.when({ _tag: "B" }, (_) => T.right(_.b)),
      Match.exaustive
    )
    expect(match({ _tag: "A", a: 0 })).toEqual(E.right(0))
    expect(match({ _tag: "B", b: 1 })).toEqual(T.right(1))
  })

  it("exhaustive literal with not", () => {
    const match = pipe(
      Match.type<number>(),
      Match.when(1, () => true),
      Match.not(1, () => false),
      Match.exaustive
    )
    expect(match(1)).toEqual(true)
    expect(match(2)).toEqual(false)
  })

  it("inline", () => {
    const result = pipe(
      Match.value(E.right(0)),
      Match.tag("Right", (_) => _.right),
      Match.tag("Left", (_) => _.left),
      Match.exaustive
    )
    expect(result).toEqual(0)
  })

  it("piped", () => {
    const result = pipe(
      E.right(0),
      Match.value,
      Match.when({ _tag: "Right" }, (_) => _.right),
      Match.option
    )
    expect(result).toEqual(O.some(0))
  })

  it("tuples", () => {
    const match = pipe(
      Match.type<[string, string]>(),
      Match.when(["yeah"], (_) => true),
      Match.option
    )

    expect(match(["yeah", "a"])).toEqual({ _tag: "Some", value: true })
  })

  it("literals", () => {
    const match = pipe(
      Match.type<string>(),
      Match.when("yeah", (_) => _ === "yeah"),
      Match.orElse(() => "nah")
    )

    expect(match("yeah")).toEqual(true)
    expect(match("a")).toEqual("nah")
  })

  it("piped", () => {
    const result = pipe(
      E.right(0),
      Match.value,
      Match.when({ _tag: "Right" }, (_) => _.right),
      Match.option
    )
    expect(result).toEqual(O.some(0))
  })

  it("not schema", () => {
    const match = pipe(
      Match.type<string | number>(),
      Match.not(S.number, (_) => "a"),
      Match.when(S.number, (_) => "b"),
      Match.exaustive
    )
    expect(match("hi")).toEqual("a")
    expect(match(123)).toEqual("b")
  })

  it("not literal", () => {
    const match = pipe(
      Match.type<string | number>(),
      Match.not("hi", (_) => "a"),
      Match.orElse(() => "b")
    )
    expect(match("hello")).toEqual("a")
    expect(match("hi")).toEqual("b")
  })

  it("tuples", () => {
    const match = pipe(
      Match.type<[string, string]>(),
      Match.when(["yeah"], (_) => true),
      Match.option
    )

    expect(match(["yeah", "a"])).toEqual({ _tag: "Some", value: true })
  })

  it("literals", () => {
    const match = pipe(
      Match.type<string>(),
      Match.when("yeah", (_) => _ === "yeah"),
      Match.orElse(() => "nah")
    )

    expect(match("yeah")).toEqual(true)
    expect(match("a")).toEqual("nah")
  })

  it("literals duplicate", () => {
    const result = pipe(
      Match.value("yeah"),
      Match.when("yeah", (_) => _ === "yeah"),
      Match.when("yeah", (_) => "dupe"),
      Match.orElse(() => "nah")
    )

    expect(result).toEqual(true)
  })
})
