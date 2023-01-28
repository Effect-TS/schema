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

  it("schema exhaustive-literal", () => {
    const match = pipe(
      Match.type<{ _tag: "A"; a: number } | { _tag: "B"; b: number }>(),
      Match.when({ _tag: S.literal("A", "B") }, (_) => E.right(_._tag)),
      Match.exaustive
    )
    expect(match({ _tag: "A", a: 0 })).toEqual(E.right("A"))
    expect(match({ _tag: "B", b: 1 })).toEqual(T.right("B"))
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

  it("nested", () => {
    const match = pipe(
      Match.type<
        | { foo: { bar: { baz: { qux: string } } } }
        | { foo: { bar: { baz: { qux: number } } } }
        | { foo: { bar: null } }
      >(),
      Match.when({ foo: { bar: { baz: { qux: 2 } } } }, (_) => `literal ${_.foo.bar.baz.qux}`),
      Match.when({ foo: { bar: { baz: { qux: "b" } } } }, (_) => `literal ${_.foo.bar.baz.qux}`),
      Match.when({ foo: { bar: { baz: { qux: S.number } } } }, (_) => _.foo.bar.baz.qux),
      Match.when({ foo: { bar: { baz: { qux: S.string } } } }, (_) => _.foo.bar.baz.qux),
      Match.when({ foo: { bar: null } }, (_) => _.foo.bar),
      Match.exaustive
    )

    expect(match({ foo: { bar: { baz: { qux: 1 } } } })).toEqual(1)
    expect(match({ foo: { bar: { baz: { qux: 2 } } } })).toEqual("literal 2")
    expect(match({ foo: { bar: { baz: { qux: "a" } } } })).toEqual("a")
    expect(match({ foo: { bar: { baz: { qux: "b" } } } })).toEqual("literal b")
    expect(match({ foo: { bar: null } })).toEqual(null)
  })

  it("predicate", () => {
    const match = pipe(
      Match.type<{ age: number }>(),
      Match.when({
        age: (_) => _ >= 5
      }, (_) => `Age: ${_.age}`),
      Match.orElse((_) => `${_} is too young`)
    )

    expect(match({ age: 5 }), "Age: 5")
    expect(match({ age: 4 }), "4 is too young")
  })

  it("predicate not", () => {
    const match = pipe(
      Match.type<{ age: number }>(),
      Match.not({
        age: (_) => _ >= 5
      }, (_) => `Age: ${_.age}`),
      Match.orElse((_) => `${_} is too old`)
    )

    expect(match({ age: 4 }), "Age: 4")
    expect(match({ age: 5 }), "5 is too old")
  })
})
