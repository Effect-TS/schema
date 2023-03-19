import * as Either from "@effect/data/Either"
import * as Effect from "@effect/io/Effect"
import * as S from "@effect/schema/Schema"

describe.concurrent("Effect", () => {
  it("demo", () => {
    const effect = S.transformEffect(
      S.string,
      S.string,
      (x) => Effect.succeed(x),
      (x) => Effect.sync(() => x)
    )
    const schemaTuple = S.tuple(S.string, effect)
    const schemaStruct = S.struct({ a: S.string, b: effect })
    const schemaUnion = S.union(
      S.struct({ _tag: S.literal("A"), a: S.string }),
      S.struct({ _tag: S.literal("B"), b: effect })
    )
    expect(S.encodeEither(schemaTuple)(["a", "b"]))
      .toEqual(Either.right(["a", "b"]))
    expect(S.encodeEither(schemaStruct)({ a: "a", b: "b" }))
      .toEqual(Either.right({ a: "a", b: "b" }))
    expect(S.encodeEither(schemaUnion)({ _tag: "B", b: "0" }))
      .toEqual(Either.right({ _tag: "B", b: "0" }))
  })
})
