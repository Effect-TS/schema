import { pipe } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Effect", () => {
  it("tuple. e r e", async () => {
    const schema = pipe(S.tuple(S.string), S.rest(S.number), S.element(S.boolean))
    // await Util.expectParseFailure(schema, [true], `/0 Expected string, actual true`)
    // await Util.expectParseFailure(
    //   schema,
    //   [true],
    //   `/0 Expected string, actual true, /1 is missing`,
    //   {
    //     allErrors: true
    //   }
    // )
    const firstError = await Effect.runPromise(
      Effect.flip(S.decodeEffect(schema)([true], {}))
    )
    const allErrors = await Effect.runPromise(
      Effect.flip(S.decodeEffect(schema)([true], { allErrors: true }))
    )
    expect(Util.formatAll(firstError.errors))
      .toStrictEqual("/0 Expected string, actual true")
    expect(Util.formatAll(allErrors.errors))
      .toStrictEqual("/0 Expected string, actual true, /1 is missing")
  })

  it("struct/ record(keyof struct({ a, b }), number)", async () => {
    const schema = S.record(S.keyof(S.struct({ a: S.string, b: S.string })), S.number)
    await Util.expectParseFailure(schema, { a: "a" }, `/a Expected number, actual "a"`)
  })

  it("struct/ record(keyof struct({ a, b } & Record<symbol, string>), number)", async () => {
    const schema = S.record(
      S.keyof(pipe(S.struct({ a: S.string, b: S.string }), S.extend(S.record(S.symbol, S.string)))),
      S.number
    )
    await Util.expectParseFailure(schema, { a: "a" }, `/a Expected number, actual "a"`)
  })
})
