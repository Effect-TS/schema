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
import type * as PR from "@effect/schema/ParseResult"
import type { Schema } from "@effect/schema/Schema"
import * as S from "@effect/schema/Schema"
import { formatActual, formatErrors, formatExpected } from "@effect/schema/TreeFormatter"
import * as fc from "fast-check"

const sleep = Effect.sleep(Duration.millis(10))

const goDecode = (
  decode: (input: any, options?: ParseOptions) => PR.ParseResult<any>
): (input: any, options?: ParseOptions) => PR.ParseResult<any> =>
  (input, options) => Effect.flatMap(sleep, () => decode(input, options))

const go = (ast: AST.AST): AST.AST => {
  if (Math.random() < 0.5) {
    return ast
  }
  switch (ast._tag) {
    case "Declaration":
      return AST.createDeclaration(
        ast.typeParameters.map(go),
        ast.type,
        ast.decode,
        ast.annotations
      )
    case "Tuple":
      return AST.createTuple(
        ast.elements.map((e) => AST.createElement(go(e.type), e.isOptional)),
        O.map(ast.rest, RA.mapNonEmpty(go)),
        ast.isReadonly,
        ast.annotations
      )
    case "TypeLiteral":
      return AST.createTypeLiteral(
        ast.propertySignatures.map((p) => ({ ...p, type: go(p.type) })),
        ast.indexSignatures.map((is) => ({ ...is, type: go(is.type) })),
        ast.annotations
      )
    case "Union":
      return AST.createUnion(ast.types.map(go), ast.annotations)
    case "Lazy":
      return AST.createLazy(() => go(ast.f()), ast.annotations)
    case "Refinement":
      return AST.createRefinement(
        ast.from,
        ast.to,
        goDecode(ast.decode),
        goDecode(ast.encode),
        ast.annotations
      )
    case "Transform":
      return AST.createTransform(
        ast.from,
        ast.to,
        goDecode(ast.decode),
        goDecode(ast.encode),
        ast.annotations
      )
  }
  return AST.createTransform(
    ast,
    ast,
    (a) => Effect.map(sleep, () => a),
    (a) => Effect.map(sleep, () => a)
  )
}

const effectify = <I, A>(schema: Schema<I, A>): Schema<I, A> => S.make(go(schema.ast))

export const roundtrip = <I, A>(schema: Schema<I, A>) => {
  const to = S.to(schema)
  const arb = A.to(to)
  const is = S.is(to)
  fc.assert(fc.property(arb(fc), (a) => {
    if (!is(a)) {
      return false
    }
    const roundtrip = pipe(
      a,
      S.encodeEither(schema),
      E.flatMap(S.parseEither(schema))
    )
    if (E.isLeft(roundtrip)) {
      return false
    }
    return is(roundtrip.right)
  }))
  // fc.assert(fc.asyncProperty(arb(fc), async (a) => {
  //   const roundtrip = await Effect.runPromiseEither(
  //     PR.flatMap(S.encodeEffect(schema)(a), S.parseEffect(schema))
  //   )
  //   return E.isRight(roundtrip)
  // }))
}

export const expectDecodingSuccess = async <I, A>(
  schema: Schema<I, A>,
  u: unknown,
  a: A = u as any,
  options?: ParseOptions
) => {
  const t = S.parseEither(schema)(u, options)
  expect(t).toStrictEqual(E.right(a))
  const t2 = await Effect.runPromiseEither(S.parseEffect(effectify(schema))(u, options))
  expect(t2).toStrictEqual(t)
}

export const expectDecodingFailure = async <I, A>(
  schema: Schema<I, A>,
  u: unknown,
  message: string,
  options?: ParseOptions
) => {
  const t = E.mapLeft(S.parseEither(schema)(u, options), (e) => formatAll(e.errors))
  expect(t).toStrictEqual(E.left(message))
  const t2 = E.mapLeft(
    await Effect.runPromiseEither(S.parseEffect(effectify(schema))(u, options)),
    (e) => formatAll(e.errors)
  )
  expect(t2).toStrictEqual(t)
}

export const expectEncodingSuccess = async <I, A>(
  schema: Schema<I, A>,
  a: A,
  o: unknown,
  options?: ParseOptions
) => {
  const t = S.encodeEither(schema)(a, options)
  expect(t).toStrictEqual(E.right(o))
  const t2 = await Effect.runPromiseEither(S.encodeEffect(effectify(schema))(a, options))
  expect(t2).toStrictEqual(t)
}

export const expectEncodingFailure = async <I, A>(
  schema: Schema<I, A>,
  a: A,
  message: string,
  options?: ParseOptions
) => {
  const t = E.mapLeft(S.encodeEither(schema)(a, options), (e) => formatAll(e.errors))
  expect(t).toStrictEqual(E.left(message))
  const t2 = E.mapLeft(
    await Effect.runPromiseEither(S.encodeEffect(effectify(schema))(a, options)),
    (e) => formatAll(e.errors)
  )
  expect(t2).toStrictEqual(t)
}

export const expectDecodingFailureTree = async <I, A>(
  schema: Schema<I, A>,
  u: unknown,
  message: string,
  options?: ParseOptions
) => {
  const t = E.mapLeft(S.parseEither(schema)(u, options), (e) => formatErrors(e.errors))
  expect(E.isLeft(t)).toEqual(true)
  expect(t).toEqual(E.left(message))
  const t2 = E.mapLeft(
    await Effect.runPromiseEither(S.parseEffect(effectify(schema))(u, options)),
    (e) => formatErrors(e.errors)
  )
  expect(t2).toStrictEqual(t)
}

const formatAll = (errors: NonEmptyReadonlyArray<PR.ParseErrors>): string => {
  return pipe(errors, RA.map(formatDecodeError), RA.join(", "))
}

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
