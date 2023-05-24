import * as E from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as AST from "@effect/schema/AST"
import * as PR from "@effect/schema/ParseResult"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

const expectMessage = <I, A>(
  schema: T.Transform<I, A>,
  u: unknown,
  message: string
) => {
  expect(E.mapLeft(T.parseEither(schema)(u), (e) => Util.formatAll(e.errors))).toEqual(
    E.left(message)
  )
}

export const expectForbidden = <I, A>(
  schema: T.Transform<I, A>,
  u: unknown,
  message: string
) => {
  expectMessage(Util.effectify(schema, "all"), u, message)
}

describe.concurrent("Forbidden", () => {
  it("tuple", () => {
    expectForbidden(T.tuple(T.string), ["a"], "/0 is forbidden")
  })

  it("array", () => {
    expectForbidden(T.array(T.string), ["a"], "/0 is forbidden")
  })

  it("struct", () => {
    expectForbidden(T.struct({ a: T.string }), { a: "a" }, "/a is forbidden")
  })

  it("record", () => {
    expectForbidden(T.record(T.string, T.string), { a: "a" }, "/a is forbidden")
  })

  it("union", () => {
    expectForbidden(
      T.union(T.string, pipe(T.string, T.minLength(2))),
      "a",
      `union member: is forbidden, union member: is forbidden`
    )
  })

  it("declaration", () => {
    const schema = T.declare(
      [],
      T.number,
      () => T.parseEffect(Util.effectify(T.number, "all")),
      () => T.encodeEffect(Util.effectify(T.number, "all"))
    )
    expectMessage(
      schema,
      1,
      "is forbidden"
    )
  })

  it("transform", () => {
    const schema = pipe(
      T.transformResult(
        T.string,
        T.transformResult(
          T.string,
          T.string,
          (s) => PR.flatMap(Util.sleep, () => PR.success(s)),
          (s) => PR.flatMap(Util.sleep, () => PR.success(s))
        ),
        E.right,
        E.right
      )
    )
    expectMessage(
      schema,
      "a",
      "is forbidden"
    )
  })

  it("refinement", () => {
    const ast = AST.createRefinement(
      T.string.ast,
      (input) => PR.flatMap(Util.sleep, () => PR.success(input))
    )
    const schema: T.Transform<string, string> = T.make(ast)
    expectMessage(
      schema,
      "a",
      "is forbidden"
    )
  })
})
