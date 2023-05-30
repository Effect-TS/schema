import { identity } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import * as AST from "@effect/schema/AST"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("PropertySignatureTransformations", () => {
  it("default", async () => {
    const transform: T.Transform<{ readonly a?: string }, { readonly a: number }> = T.make(
      AST.createTransform(
        T.struct({ a: T.optional(T.NumberFromString) }).ast,
        S.struct({ a: S.number }).ast,
        AST.createTypeLiteralTransformation(
          [
            AST.createPropertySignatureTransformation(
              "a",
              "a",
              AST.createFinalPropertySignatureTransformation(
                O.orElse(() => O.some(0)),
                identity
              )
            )
          ]
        )
      )
    )
    await Util.expectParseSuccess(transform, {}, { a: 0 })
    await Util.expectParseSuccess(transform, { a: "1" }, { a: 1 })
    await Util.expectParseFailure(transform, { a: "a" }, `/a Expected string -> number, actual "a"`)

    await Util.expectEncodeSuccess(transform, { a: 1 }, { a: "1" })
    await Util.expectEncodeSuccess(transform, { a: 0 }, { a: "0" })
  })

  it("bidirectional default", async () => {
    const transform: T.Transform<{ readonly a?: string }, { readonly a: number }> = T.make(
      AST.createTransform(
        T.struct({ a: T.optional(T.NumberFromString) }).ast,
        S.struct({ a: S.number }).ast,
        AST.createTypeLiteralTransformation(
          [
            AST.createPropertySignatureTransformation(
              "a",
              "a",
              AST.createFinalPropertySignatureTransformation(
                O.orElse(() => O.some(0)),
                (o) => O.flatMap(o, O.liftPredicate((v) => v !== 0))
              )
            )
          ]
        )
      )
    )
    await Util.expectParseSuccess(transform, {}, { a: 0 })
    await Util.expectParseSuccess(transform, { a: "1" }, { a: 1 })
    await Util.expectParseFailure(transform, { a: "a" }, `/a Expected string -> number, actual "a"`)

    await Util.expectEncodeSuccess(transform, { a: 1 }, { a: "1" })
    await Util.expectEncodeSuccess(transform, { a: 0 }, {})
  })

  it("optional -> Option", async () => {
    const transform: T.Transform<{ readonly a?: string }, { readonly a: O.Option<number> }> = T
      .make(
        AST.createTransform(
          T.struct({ a: T.optional(T.NumberFromString) }).ast,
          T.struct({ a: T.optionFromSelf(S.number) }).ast,
          AST.createTypeLiteralTransformation(
            [
              AST.createPropertySignatureTransformation(
                "a",
                "a",
                AST.createFinalPropertySignatureTransformation(
                  O.some,
                  O.flatten
                )
              )
            ]
          )
        )
      )
    await Util.expectParseSuccess(transform, {}, { a: O.none() })
    await Util.expectParseSuccess(transform, { a: "1" }, { a: O.some(1) })
    await Util.expectParseFailure(transform, { a: "a" }, `/a Expected string -> number, actual "a"`)

    await Util.expectEncodeSuccess(transform, { a: O.some(1) }, { a: "1" })
    await Util.expectEncodeSuccess(transform, { a: O.none() }, {})
  })

  it("empty string as optional", async () => {
    const transform: T.Transform<{ readonly a: string }, { readonly a?: string }> = T.make(
      AST.createTransform(
        S.struct({ a: S.string }).ast,
        S.struct({ a: S.optional(S.string) }).ast,
        AST.createTypeLiteralTransformation(
          [
            AST.createPropertySignatureTransformation(
              "a",
              "a",
              AST.createFinalPropertySignatureTransformation(
                O.flatMap(O.liftPredicate((v) => v !== "")),
                identity
              )
            )
          ]
        )
      )
    )
    await Util.expectParseSuccess(transform, { a: "" }, {})
    await Util.expectParseSuccess(transform, { a: "a" }, { a: "a" })

    await Util.expectEncodeSuccess(transform, { a: "a" }, { a: "a" })
  })

  it("rename", async () => {
    const transform: T.Transform<{ readonly a: number }, { readonly b: number }> = T.make(
      AST.createTransform(
        S.struct({ a: S.number }).ast,
        S.struct({ b: S.number }).ast,
        AST.createTypeLiteralTransformation(
          [
            AST.createPropertySignatureTransformation(
              "a",
              "b",
              AST.createFinalPropertySignatureTransformation(
                identity,
                identity
              )
            )
          ]
        )
      )
    )
    await Util.expectParseSuccess(transform, { a: 1 }, { b: 1 })

    await Util.expectEncodeSuccess(transform, { b: 1 }, { a: 1 })
  })

  it("reversed default", async () => {
    const transform: T.Transform<{ readonly a: string }, { readonly a?: number }> = T.make(
      AST.createTransform(
        S.struct({ a: S.number }).ast,
        S.struct({ a: S.optional(S.number) }).ast,
        AST.createTypeLiteralTransformation(
          [
            AST.createPropertySignatureTransformation(
              "a",
              "a",
              AST.createFinalPropertySignatureTransformation(
                identity,
                O.orElse(() => O.some(0))
              )
            )
          ]
        )
      )
    )
    await Util.expectParseSuccess(transform, { a: 1 }, { a: 1 })
    await Util.expectParseSuccess(transform, { a: 0 }, { a: 0 })

    await Util.expectEncodeSuccess(transform, {}, { a: 0 })
    await Util.expectEncodeSuccess(transform, { a: 1 }, { a: 1 })
  })

  it("string -> number", async () => {
    const ast = T.NumberFromString.ast as any
    const transform: T.Transform<{ readonly a: string }, { readonly a: number }> = T.make(
      AST.createTransform(
        S.struct({ a: S.string }).ast,
        S.struct({ a: S.number }).ast,
        AST.createTypeLiteralTransformation(
          [
            AST.createPropertySignatureTransformation(
              "a",
              "a",
              ast.transformAST
            )
          ]
        )
      )
    )
    await Util.expectParseSuccess(transform, { a: "1" }, { a: 1 })

    await Util.expectEncodeSuccess(transform, { a: 1 }, { a: "1" })
  })

  it("string -> number (nested)", async () => {
    const ast = T.NumberFromString.ast as any
    const transform: T.Transform<
      { readonly a: { readonly b: string } },
      { readonly a: { readonly b: number } }
    > = T.make(
      AST.createTransform(
        S.struct({ a: S.struct({ b: S.string }) }).ast,
        S.struct({ a: S.struct({ b: S.number }) }).ast,
        AST.createTypeLiteralTransformation(
          [
            AST.createPropertySignatureTransformation(
              "a",
              "a",
              AST.createTypeLiteralTransformation(
                [
                  AST.createPropertySignatureTransformation(
                    "b",
                    "b",
                    ast.transformAST
                  )
                ]
              )
            )
          ]
        )
      )
    )
    await Util.expectParseSuccess(transform, { a: { b: "1" } }, { a: { b: 1 } })

    await Util.expectEncodeSuccess(transform, { a: { b: 1 } }, { a: { b: "1" } })
  })
})
