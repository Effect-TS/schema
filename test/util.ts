import * as Duration from "@effect/data/Duration"
import * as E from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import type { NonEmptyReadonlyArray } from "@effect/data/ReadonlyArray"
import * as RA from "@effect/data/ReadonlyArray"
import * as Effect from "@effect/io/Effect"
import * as A from "@effect/schema/Arbitrary"
import type { ParseOptions } from "@effect/schema/AST"
import * as AST from "@effect/schema/AST"
import { getDecode } from "@effect/schema/Parser"
import * as PR from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import type { Transform } from "@effect/schema/Transform"
import * as T from "@effect/schema/Transform"
import { formatActual, formatErrors, formatExpected } from "@effect/schema/TreeFormatter"
import * as fc from "fast-check"

// TODO
const doEffectify = false
// TODO
const doRoundtrip = false

export const sleep = Effect.sleep(Duration.millis(10))

export const effectifyDecode = (
  decode: (input: any, options: ParseOptions, self: AST.AST) => PR.ParseResult<any>,
  override: AST.AST
): (input: any, options: ParseOptions, self: AST.AST) => PR.ParseResult<any> =>
  (input, options) => PR.flatMap(sleep, () => decode(input, options, override))

let skip = false

const effectifyAST = (ast: AST.AST, mode: "all" | "semi"): AST.AST => {
  if (mode === "semi") {
    skip = !skip
    if (!skip) {
      return ast
    }
  }
  switch (ast._tag) {
    case "Declaration":
      return AST.createDeclaration(
        ast.typeParameters.map((ast) => effectifyAST(ast, mode)),
        ast.type,
        ast.decode,
        ast.annotations
      )
    case "Tuple":
      return AST.createTuple(
        ast.elements.map((e) => AST.createElement(effectifyAST(e.type, mode), e.isOptional)),
        O.map(ast.rest, RA.mapNonEmpty((ast) => effectifyAST(ast, mode))),
        ast.isReadonly,
        ast.annotations
      )
    case "TypeLiteral":
      return AST.createTypeLiteral(
        ast.propertySignatures.map((p) => ({ ...p, type: effectifyAST(p.type, mode) })),
        ast.indexSignatures.map((is) =>
          AST.createIndexSignature(is.parameter, effectifyAST(is.type, mode), is.isReadonly)
        ),
        ast.annotations
      )
    case "Union":
      return AST.createUnion(ast.types.map((ast) => effectifyAST(ast, mode)), ast.annotations)
    case "Lazy":
      return AST.createLazy(() => effectifyAST(ast.f(), mode), ast.annotations)
    case "Refinement":
      return AST.createRefinement(
        effectifyAST(ast.from, mode),
        // I need to override with the original ast here in order to not change the error message
        // -------------------------v
        effectifyDecode(ast.decode, ast),
        ast.annotations
      )
    case "Transform":
      return AST.createTransform(
        effectifyAST(ast.from, mode),
        effectifyAST(ast.to, mode),
        AST.createFinalTransformation(
          // I need to override with the original ast here in order to not change the error message
          // ------------------------------------------------v
          effectifyDecode(getDecode(ast.transformAST, true), ast),
          // I need to override with the original ast here in order to not change the error message
          // ------------------------------------------------v
          effectifyDecode(getDecode(ast.transformAST, false), ast)
        ),
        ast.annotations
      )
  }
  const decode = T.decodeEffect(T.make(ast))
  return AST.createTransform(
    ast,
    ast,
    AST.createFinalTransformation(
      (a, options) => Effect.flatMap(sleep, () => decode(a, options)),
      (a, options) => Effect.flatMap(sleep, () => decode(a, options))
    )
  )
}

export const effectify = <I, A>(schema: Transform<I, A>, mode: "all" | "semi"): Transform<I, A> =>
  T.make(effectifyAST(schema.ast, mode))

export const roundtrip = <I, A>(schema: Transform<I, A>) => {
  if (!doRoundtrip) {
    return
  }
  const to = T.to(schema)
  const arb = A.build(to)
  const is = S.is(to)
  fc.assert(fc.property(arb(fc), (a) => {
    if (!is(a)) {
      return false
    }
    const roundtrip = pipe(
      a,
      T.encodeEither(schema),
      E.flatMap(T.decodeEither(schema))
    )
    if (E.isLeft(roundtrip)) {
      return false
    }
    return is(roundtrip.right)
  }))
  if (doEffectify) {
    const effect = effectify(schema, "semi")
    fc.assert(fc.asyncProperty(arb(fc), async (a) => {
      const roundtrip = await Effect.runPromiseEither(
        PR.flatMap(T.encodeEffect(effect)(a), T.decodeEffect(effect))
      )
      return E.isRight(roundtrip)
    }))
  }
}

export const onExcessPropertyError: ParseOptions = {
  onExcessProperty: "error"
}

export const allErrors: ParseOptions = {
  errors: "all"
}

export const expectParseSuccess = async <I, A>(
  schema: Transform<I, A>,
  input: unknown,
  expected: A = input as any,
  options?: ParseOptions
) => {
  const actual = await Effect.runPromiseEither(
    T.parseEffect(schema)(input, options)
  )
  expect(actual).toStrictEqual(E.right(expected))
  if (doEffectify) {
    const allParseEffectResult = await Effect.runPromiseEither(
      T.parseEffect(effectify(schema, "all"))(input, options)
    )
    expect(allParseEffectResult).toStrictEqual(actual)
    const semiParseEffectResult = await Effect.runPromiseEither(
      T.parseEffect(effectify(schema, "semi"))(input, options)
    )
    expect(semiParseEffectResult).toStrictEqual(actual)
  }
}

export const expectParseFailure = async <I, A>(
  schema: Transform<I, A>,
  input: unknown,
  message: string,
  options?: ParseOptions
) => {
  const actual = await Effect.runPromiseEither(PR.mapLeft(
    T.parseEffect(schema)(input, options),
    (e) => formatAll(e.errors)
  ))
  expect(actual).toStrictEqual(E.left(message))
  if (doEffectify) {
    const parseEffectResult = PR.mapLeft(
      await Effect.runPromiseEither(T.parseEffect(effectify(schema, "all"))(input, options)),
      (e) => formatAll(e.errors)
    )
    expect(parseEffectResult).toStrictEqual(actual)
    const semiParseEffectResult = PR.mapLeft(
      await Effect.runPromiseEither(T.parseEffect(effectify(schema, "semi"))(input, options)),
      (e) => formatAll(e.errors)
    )
    expect(semiParseEffectResult).toStrictEqual(actual)
  }
}

export const expectParseFailureTree = async <I, A>(
  schema: Transform<I, A>,
  input: unknown,
  message: string,
  options?: ParseOptions
) => {
  const actual = await Effect.runPromiseEither(PR.mapLeft(
    T.parseEffect(schema)(input, options),
    (e) => formatErrors(e.errors)
  ))
  expect(actual).toEqual(E.left(message))
  if (doEffectify) {
    const parseEffectResult = PR.mapLeft(
      await Effect.runPromiseEither(T.parseEffect(effectify(schema, "all"))(input, options)),
      (e) => formatErrors(e.errors)
    )
    expect(parseEffectResult).toStrictEqual(actual)
    const semiParseEffectResult = PR.mapLeft(
      await Effect.runPromiseEither(T.parseEffect(effectify(schema, "semi"))(input, options)),
      (e) => formatErrors(e.errors)
    )
    expect(semiParseEffectResult).toStrictEqual(actual)
  }
}

export const expectEncodeSuccess = async <I, A>(
  schema: Transform<I, A>,
  a: A,
  expected: unknown,
  options?: ParseOptions
) => {
  const actual = await Effect.runPromiseEither(
    T.encodeEffect(schema)(a, options)
  )
  expect(actual).toStrictEqual(E.right(expected))
  if (doEffectify) {
    const allencodeEffectResult = await Effect.runPromiseEither(
      T.encodeEffect(effectify(schema, "all"))(a, options)
    )
    expect(allencodeEffectResult).toStrictEqual(actual)
    const semiEncodeEffectResult = await Effect.runPromiseEither(
      T.encodeEffect(effectify(schema, "semi"))(a, options)
    )
    expect(semiEncodeEffectResult).toStrictEqual(actual)
  }
}

export const expectEncodeFailure = async <I, A>(
  schema: Transform<I, A>,
  a: A,
  message: string,
  options?: ParseOptions
) => {
  const actual = await Effect.runPromiseEither(PR.mapLeft(
    T.encodeEffect(schema)(a, options),
    (e) => formatAll(e.errors)
  ))
  expect(actual).toStrictEqual(E.left(message))
  if (doEffectify) {
    const encodeEffectResult = PR.mapLeft(
      await Effect.runPromiseEither(T.encodeEffect(effectify(schema, "all"))(a, options)),
      (e) => formatAll(e.errors)
    )
    expect(encodeEffectResult).toStrictEqual(actual)
    const randomEncodeEffectResult = PR.mapLeft(
      await Effect.runPromiseEither(T.encodeEffect(effectify(schema, "semi"))(a, options)),
      (e) => formatAll(e.errors)
    )
    expect(randomEncodeEffectResult).toStrictEqual(actual)
  }
}

export const formatAll = (errors: NonEmptyReadonlyArray<PR.ParseErrors>): string =>
  pipe(errors, RA.map(formatDecodeError), RA.join(", "))

const getMessage = AST.getAnnotation<AST.MessageAnnotation<unknown>>(AST.MessageAnnotationId)

const formatDecodeError = (e: PR.ParseErrors): string => {
  switch (e._tag) {
    case "Type":
      return pipe(
        getMessage(e.expected),
        O.map((f) => f(e.actual)),
        O.orElse(() => e.message),
        O.getOrElse(() =>
          `Expected ${formatExpected(e.expected)}, actual ${formatActual(e.actual)}`
        )
      )
    case "Forbidden":
      return "is forbidden"
    case "Index":
      return `/${e.index} ${pipe(e.errors, RA.map(formatDecodeError), RA.join(", "))}`
    case "Key":
      return `/${String(e.key)} ${pipe(e.errors, RA.map(formatDecodeError), RA.join(", "))}`
    case "Missing":
      return `is missing`
    case "Unexpected":
      return `is unexpected`
    case "UnionMember":
      return `union member: ${pipe(e.errors, RA.map(formatDecodeError), RA.join(", "))}`
  }
}
