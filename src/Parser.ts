/**
 * @since 1.0.0
 */

import * as E from "@effect/data/Either"
import type { Either } from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import type { Option } from "@effect/data/Option"
import * as P from "@effect/data/Predicate"
import * as RA from "@effect/data/ReadonlyArray"
import type { NonEmptyReadonlyArray } from "@effect/data/ReadonlyArray"
import * as Debug from "@effect/io/Debug"
import * as Effect from "@effect/io/Effect"
import * as H from "@effect/schema/annotation/Hook"
import * as AST from "@effect/schema/AST"
import type { ParseOptions } from "@effect/schema/AST"
import { formatErrors } from "@effect/schema/formatter/Tree"
import * as I from "@effect/schema/internal/common"
import * as PE from "@effect/schema/ParseError"
import type { ParseError } from "@effect/schema/ParseError"
import type { Infer, Schema } from "@effect/schema/Schema"

/**
 * @category model
 * @since 1.0.0
 */
export interface Parser<A> extends Schema<A> {
  readonly parse: (
    input: unknown,
    options: AST.ParseOptions
  ) => Effect.Effect<never, NonEmptyReadonlyArray<ParseError>, A>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const make: <A>(schema: Schema<A>, parse: Parser<A>["parse"]) => Parser<A> = I.makeParser

/**
 * @category decoding
 * @since 1.0.0
 */
export const decode = <A>(schema: Schema<A>) =>
  Debug.untracedMethod(() =>
    (input: unknown, options?: ParseOptions): A => {
      const t = decodeEither(schema)(input, options)
      if (E.isLeft(t)) {
        throw new Error(formatErrors(t.left))
      }
      return t.right
    }
  )

/**
 * @category decoding
 * @since 1.0.0
 */
export const decodeEither = <A>(schema: Schema<A>) =>
  Debug.untracedMethod(() =>
    (input: unknown, options?: ParseOptions): Either<NonEmptyReadonlyArray<ParseError>, A> =>
      Effect.runSyncEither(decodeEffect(schema)(input, options))
  )

/**
 * @category decoding
 * @since 1.0.0
 */
export const decodeOption = <A>(schema: Schema<A>) =>
  Debug.untracedMethod(() =>
    (input: unknown, options?: ParseOptions): Option<A> =>
      O.fromEither(decodeEither(schema)(input, options))
  )

/**
 * @category decoding
 * @since 1.0.0
 */
export const decodeEffect = <A>(schema: Schema<A>) =>
  Debug.methodWithTrace((trace) =>
    (
      input: unknown,
      options?: ParseOptions
    ): Effect.Effect<never, NonEmptyReadonlyArray<ParseError>, A> =>
      parserForInternal(schema, input, "decoder", options).traced(trace)
  )

/**
 * @category encoding
 * @since 1.0.0
 */
export const encode = <A>(schema: Schema<A>) =>
  Debug.untracedMethod(() =>
    (a: A, options?: ParseOptions): unknown => {
      const t = Effect.runSyncEither(encodeEffect(schema)(a, options))
      if (E.isLeft(t)) {
        throw new Error(formatErrors(t.left))
      }
      return t.right
    }
  )

/**
 * @category encoding
 * @since 1.0.0
 */
export const encodeEither = <A>(schema: Schema<A>) =>
  Debug.untracedMethod(() =>
    (a: A, options?: ParseOptions): Either<NonEmptyReadonlyArray<ParseError>, unknown> =>
      Effect.runSyncEither(encodeEffect(schema)(a, options))
  )

/**
 * @category encoding
 * @since 1.0.0
 */
export const encodeOption = <A>(schema: Schema<A>) =>
  Debug.untracedMethod(() =>
    (a: A, options?: ParseOptions): Option<unknown> =>
      O.fromEither(encodeEither(schema)(a, options))
  )

/**
 * @category encoding
 * @since 1.0.0
 */
export const encodeEffect = <A>(schema: Schema<A>) =>
  Debug.methodWithTrace((trace) =>
    (
      input: unknown,
      options?: ParseOptions
    ): Effect.Effect<never, NonEmptyReadonlyArray<ParseError>, unknown> =>
      parserForInternal(schema, input, "encoder", options).traced(trace)
  )

/**
 * @category assertions
 * @since 1.0.0
 */
export const is = <A>(schema: Schema<A>) =>
  Debug.untracedMethod(() =>
    (input: unknown, options?: ParseOptions): input is A =>
      E.isRight(Effect.runSyncEither(parserForInternal(schema, input, "guard", options)))
  )

/**
 * @since 1.0.0
 */
export type InferAsserts<S extends Schema<any>> = (
  input: unknown,
  options?: ParseOptions
) => asserts input is Infer<S>

/**
 * @category assertions
 * @since 1.0.0
 */
export const asserts = <A>(schema: Schema<A>) =>
  Debug.untracedMethod(() =>
    (input: unknown, options?: ParseOptions): asserts input is A => {
      const t = Effect.runSyncEither(parserForInternal(schema, input, "guard", options))
      if (E.isLeft(t)) {
        throw new Error(formatErrors(t.left))
      }
    }
  )

const getHook = AST.getAnnotation<H.Hook<Parser<any>>>(
  H.ParserHookId
)

const parserForInternal = <A>(
  schema: Schema<A>,
  input: unknown,
  as: "decoder" | "guard" | "encoder" = "decoder",
  options?: ParseOptions
): Effect.Effect<never, NonEmptyReadonlyArray<ParseError>, A> =>
  parserFor(schema, as).parse(input, options ?? {})

const parserFor = <A>(
  schema: Schema<A>,
  as: "decoder" | "guard" | "encoder" = "decoder"
): Parser<A> => {
  const go = (ast: AST.AST): Parser<any> => {
    switch (ast._tag) {
      case "TypeAlias":
        return pipe(
          getHook(ast),
          O.match(
            () => go(ast.type),
            ({ handler }) => handler(...ast.typeParameters.map(go))
          )
        )
      case "Literal":
        return I.fromRefinement(
          I.makeSchema(ast),
          (u): u is typeof ast.literal => u === ast.literal
        )
      case "UniqueSymbol":
        return I.fromRefinement(
          I.makeSchema(ast),
          (u): u is typeof ast.symbol => u === ast.symbol
        )
      case "UndefinedKeyword":
        return I.fromRefinement(I.makeSchema(ast), P.isUndefined)
      case "VoidKeyword":
        return I.fromRefinement(I.makeSchema(ast), P.isUndefined)
      case "NeverKeyword":
        return I.fromRefinement(I.makeSchema(ast), P.isNever)
      case "UnknownKeyword":
      case "AnyKeyword":
        return make(I.makeSchema(ast), Effect.succeed)
      case "StringKeyword":
        return I.fromRefinement(I.makeSchema(ast), P.isString)
      case "NumberKeyword":
        return I.fromRefinement(I.makeSchema(ast), P.isNumber)
      case "BooleanKeyword":
        return I.fromRefinement(I.makeSchema(ast), P.isBoolean)
      case "BigIntKeyword":
        return I.fromRefinement(I.makeSchema(ast), P.isBigint)
      case "SymbolKeyword":
        return I.fromRefinement(I.makeSchema(ast), P.isSymbol)
      case "ObjectKeyword":
        return I.fromRefinement(I.makeSchema(ast), P.isObject)
      case "Enums":
        return I.fromRefinement(
          I.makeSchema(ast),
          (u): u is any => ast.enums.some(([_, value]) => value === u)
        )
      case "TemplateLiteral": {
        const regex = I.getTemplateLiteralRegex(ast)
        return I.fromRefinement(I.makeSchema(ast), (u): u is any => P.isString(u) && regex.test(u))
      }
      case "Tuple": {
        const elements = ast.elements.map((e) => go(e.type))
        const rest = pipe(ast.rest, O.map(RA.mapNonEmpty(go)))
        return make(
          I.makeSchema(ast),
          (input: unknown, options) =>
            Effect.gen(function*($) {
              if (!Array.isArray(input)) {
                return yield* $(Effect.fail(RA.of(PE.type(unknownArray, input))))
              }
              const output: Array<any> = []
              const es: Array<ParseError> = []
              const allErrors = options.allErrors
              let i = 0
              // ---------------------------------------------
              // handle elements
              // ---------------------------------------------
              for (; i < elements.length; i++) {
                if (input.length < i + 1) {
                  // the input element is missing...
                  if (!ast.elements[i].isOptional) {
                    // ...but the element is required
                    const e = PE.index(i, [PE.missing])
                    if (allErrors) {
                      es.push(e)
                      continue
                    } else {
                      return yield* $(Effect.fail(RA.of(e)))
                    }
                  }
                } else {
                  const parser = elements[i]
                  const t = yield* $(Effect.either(parser.parse(input[i], options)))
                  if (E.isLeft(t)) {
                    // the input element is present but is not valid
                    const e = PE.index(i, t.left)
                    if (allErrors) {
                      es.push(e)
                      continue
                    } else {
                      return yield* $(Effect.fail(I.mutableAppend(es, e)))
                    }
                  }
                  output.push(t.right)
                }
              }
              // ---------------------------------------------
              // handle rest element
              // ---------------------------------------------
              if (O.isSome(rest)) {
                const head = RA.headNonEmpty(rest.value)
                const tail = RA.tailNonEmpty(rest.value)
                for (; i < input.length - tail.length; i++) {
                  const t = yield* $(Effect.either(head.parse(input[i], options)))
                  if (E.isLeft(t)) {
                    const e = PE.index(i, t.left)
                    if (allErrors) {
                      es.push(e)
                      continue
                    } else {
                      return yield* $(Effect.fail(I.mutableAppend(es, e)))
                    }
                  } else {
                    output.push(t.right)
                  }
                }
                // ---------------------------------------------
                // handle post rest elements
                // ---------------------------------------------
                for (let j = 0; j < tail.length; j++) {
                  i += j
                  if (input.length < i + 1) {
                    // the input element is missing and the element is required, bail out
                    return yield* $(Effect.fail(I.mutableAppend(es, PE.index(i, [PE.missing]))))
                  } else {
                    const t = yield* $(Effect.either(tail[j].parse(input[i], options)))
                    if (E.isLeft(t)) {
                      // the input element is present but is not valid
                      const e = PE.index(i, t.left)
                      if (allErrors) {
                        es.push(e)
                        continue
                      } else {
                        return yield* $(Effect.fail(I.mutableAppend(es, e)))
                      }
                    }
                    output.push(t.right)
                  }
                }
              } else {
                // ---------------------------------------------
                // handle unexpected indexes
                // ---------------------------------------------
                const isUnexpectedAllowed = options.isUnexpectedAllowed
                for (; i < input.length; i++) {
                  const e = PE.index(i, [PE.unexpected(input[i])])
                  if (!isUnexpectedAllowed) {
                    if (allErrors) {
                      es.push(e)
                      continue
                    } else {
                      return yield* $(Effect.fail(I.mutableAppend(es, e)))
                    }
                  }
                }
              }
              // ---------------------------------------------
              // compute output
              // ---------------------------------------------
              return yield* $(
                I.isNonEmptyReadonlyArray(es) ?
                  Effect.fail(es) :
                  Effect.succeed(output)
              )
            })
        )
      }
      case "TypeLiteral": {
        if (ast.propertySignatures.length === 0 && ast.indexSignatures.length === 0) {
          return I.fromRefinement(I.makeSchema(ast), P.isNotNullable)
        }
        const propertySignaturesTypes = ast.propertySignatures.map((f) => go(f.type))
        const indexSignatures = ast.indexSignatures.map((is) =>
          [go(is.parameter), go(is.type)] as const
        )
        return make(
          I.makeSchema(ast),
          (input: unknown, options) =>
            Effect.gen(function*($) {
              if (!P.isRecord(input)) {
                return yield* $(Effect.fail(RA.of(PE.type(unknownRecord, input))))
              }
              const output: any = {}
              const expectedKeys: any = {}
              const es: Array<ParseError> = []
              const allErrors = options.allErrors
              // ---------------------------------------------
              // handle property signatures
              // ---------------------------------------------
              for (let i = 0; i < propertySignaturesTypes.length; i++) {
                const ps = ast.propertySignatures[i]
                const parser = propertySignaturesTypes[i]
                const name = ps.name
                expectedKeys[name] = null
                if (!Object.prototype.hasOwnProperty.call(input, name)) {
                  if (!ps.isOptional) {
                    const e = PE.key(name, [PE.missing])
                    if (allErrors) {
                      es.push(e)
                      continue
                    } else {
                      return yield* $(Effect.fail(RA.of(e)))
                    }
                  }
                } else {
                  const t = yield* $(Effect.either(parser.parse(input[name], options)))
                  if (E.isLeft(t)) {
                    // the input key is present but is not valid
                    const e = PE.key(name, t.left)
                    if (allErrors) {
                      es.push(e)
                      continue
                    } else {
                      return yield* $(Effect.fail(I.mutableAppend(es, e)))
                    }
                  }
                  output[name] = t.right
                }
              }
              // ---------------------------------------------
              // handle index signatures
              // ---------------------------------------------
              if (indexSignatures.length > 0) {
                for (let i = 0; i < indexSignatures.length; i++) {
                  const parameter = indexSignatures[i][0]
                  const type = indexSignatures[i][1]
                  const keys = I.getKeysForIndexSignature(input, ast.indexSignatures[i].parameter)
                  for (const key of keys) {
                    if (Object.prototype.hasOwnProperty.call(expectedKeys, key)) {
                      continue
                    }
                    // ---------------------------------------------
                    // handle keys
                    // ---------------------------------------------
                    let t = yield* $(Effect.either(parameter.parse(key, options)))
                    if (E.isLeft(t)) {
                      const e = PE.key(key, t.left)
                      if (allErrors) {
                        es.push(e)
                        continue
                      } else {
                        return yield* $(Effect.fail(I.mutableAppend(es, e)))
                      }
                    }
                    // ---------------------------------------------
                    // handle values
                    // ---------------------------------------------
                    t = yield* $(Effect.either(type.parse(input[key], options)))
                    if (E.isLeft(t)) {
                      const e = PE.key(key, t.left)
                      if (allErrors) {
                        es.push(e)
                        continue
                      } else {
                        return yield* $(Effect.fail(I.mutableAppend(es, e)))
                      }
                    } else {
                      output[key] = t.right
                    }
                  }
                }
              } else {
                // ---------------------------------------------
                // handle unexpected keys
                // ---------------------------------------------
                const isUnexpectedAllowed = options?.isUnexpectedAllowed
                for (const key of Reflect.ownKeys(input)) {
                  if (!(Object.prototype.hasOwnProperty.call(expectedKeys, key))) {
                    const e = PE.key(key, [PE.unexpected(input[key])])
                    if (!isUnexpectedAllowed) {
                      if (allErrors) {
                        es.push(e)
                        continue
                      } else {
                        return yield* $(Effect.fail(I.mutableAppend(es, e)))
                      }
                    }
                  }
                }
              }
              // ---------------------------------------------
              // compute output
              // ---------------------------------------------
              return yield* $(
                I.isNonEmptyReadonlyArray(es) ?
                  Effect.fail(es) :
                  Effect.succeed(output)
              )
            })
        )
      }
      case "Union": {
        const types = ast.types.map(go)
        const searchTree = _getSearchTree(types, as)
        const ownKeys = Reflect.ownKeys(searchTree.keys)
        const len = ownKeys.length
        const otherwise = searchTree.otherwise
        return make(I.makeSchema(ast), (input, options) =>
          Effect.gen(function*($) {
            const es: Array<ParseError> = []
            if (len > 0) {
              // if there is at least one key then input must be an object
              if (P.isRecord(input)) {
                for (let i = 0; i < len; i++) {
                  const name = ownKeys[i]
                  const buckets = searchTree.keys[name].buckets
                  // for each property that should contain a literal, check if the input contains that property
                  if (Object.prototype.hasOwnProperty.call(input, name)) {
                    const literal = String(input[name])
                    // check that the value obtained from the input for the property corresponds to an existing bucket
                    if (Object.prototype.hasOwnProperty.call(buckets, literal)) {
                      // retrive the minimal set of candidates for decoding
                      const bucket = buckets[literal]
                      for (let i = 0; i < bucket.length; i++) {
                        const t = yield* $(Effect.either(bucket[i].parse(input, options)))
                        if (E.isRight(t)) {
                          return t.right
                        } else {
                          es.push(PE.unionMember(t.left))
                        }
                      }
                    } else {
                      es.push(
                        PE.key(name, [
                          PE.type(
                            searchTree.keys[name].ast,
                            input[name]
                          )
                        ])
                      )
                    }
                  } else {
                    es.push(PE.key(name, [PE.missing]))
                  }
                }
              } else {
                es.push(PE.type(unknownRecord, input))
              }
            }
            // if none of the schemas with at least one property with a literal value succeeded,
            // proceed with those that have no literal at all
            for (let i = 0; i < otherwise.length; i++) {
              const t = yield* $(Effect.either(otherwise[i].parse(input, options)))
              if (E.isRight(t)) {
                return t.right
              } else {
                es.push(PE.unionMember(t.left))
              }
            }
            // ---------------------------------------------
            // compute output
            // ---------------------------------------------
            return yield* $(
              I.isNonEmptyReadonlyArray(es) ?
                Effect.fail(es) :
                Effect.fail(RA.of(PE.type(AST.neverKeyword, input)))
            )
          }))
      }
      case "Lazy": {
        const f = () => go(ast.f())
        const get = I.memoize<void, Parser<any>>(f)
        const schema = I.lazy(f)
        return make(schema, (a, options) => get().parse(a, options))
      }
      case "Refinement": {
        const type = go(ast.from)
        const checkRefinement = (a: unknown) =>
          ast.refinement(a) ? Effect.succeed(a) : Effect.fail(RA.of(PE.type(ast, a)))
        switch (as) {
          case "guard":
          case "decoder":
            return make(
              I.makeSchema(ast),
              (u, options) => Effect.flatMap(type.parse(u, options), checkRefinement)
            )
          case "encoder":
            return make(
              I.makeSchema(ast),
              (u, options) => Effect.flatMap(checkRefinement(u), (a) => type.parse(a, options))
            )
        }
      }
      case "Transform": {
        switch (as) {
          case "decoder": {
            const from = go(ast.from)
            return make(
              I.makeSchema(ast),
              (u, options) => Effect.flatMap(from.parse(u, options), (a) => ast.decode(a, options))
            )
          }
          case "guard":
            return go(ast.to)
          case "encoder": {
            const from = go(ast.from)
            return make(
              I.makeSchema(AST.createTransform(ast.to, ast.from, ast.encode, ast.decode)),
              (a, options) => Effect.flatMap(ast.encode(a, options), (a) => from.parse(a, options))
            )
          }
        }
      }
    }
  }
  return Debug.untraced(() => go(schema.ast))
}

/** @internal */
export const _getLiterals = (
  ast: AST.AST,
  as: "decoder" | "guard" | "encoder"
): ReadonlyArray<[PropertyKey, AST.Literal]> => {
  switch (ast._tag) {
    case "TypeAlias":
      return _getLiterals(ast.type, as)
    case "TypeLiteral": {
      const out: Array<[PropertyKey, AST.Literal]> = []
      for (let i = 0; i < ast.propertySignatures.length; i++) {
        const propertySignature = ast.propertySignatures[i]
        if (AST.isLiteral(propertySignature.type) && !propertySignature.isOptional) {
          out.push([propertySignature.name, propertySignature.type])
        }
      }
      return out
    }
    case "Refinement":
      return _getLiterals(ast.from, as)
    case "Transform":
      return as === "decoder" ?
        _getLiterals(ast.from, as) :
        _getLiterals(ast.to, as)
  }
  return []
}

/**
 * The purpose of the algorithm is to narrow down the pool of possible candidates for decoding as much as possible.
 *
 * This function separates the schemas into two groups, `keys` and `otherwise`:
 *
 * - `keys`: the schema has at least one property with a literal value
 * - `otherwise`: the schema has no properties with a literal value
 *
 * If a schema has at least one property with a literal value, so it ends up in `keys`, first a namespace is created for
 * the name of the property containing the literal, and then within this namespace a "bucket" is created for the literal
 * value in which to store all the schemas that have the same property and literal value.
 *
 * @internal
 */
export const _getSearchTree = <A extends Schema<any>>(
  members: ReadonlyArray<A>,
  as: "decoder" | "guard" | "encoder"
): {
  keys: {
    readonly [key: PropertyKey]: {
      buckets: { [literal: string]: ReadonlyArray<A> }
      ast: AST.AST // this is for error messages
    }
  }
  otherwise: ReadonlyArray<A>
} => {
  const keys: {
    [key: PropertyKey]: {
      buckets: { [literal: string]: Array<A> }
      ast: AST.AST
    }
  } = {}
  const otherwise: Array<A> = []
  for (let i = 0; i < members.length; i++) {
    const member = members[i]
    const tags = _getLiterals(member.ast, as)
    if (tags.length > 0) {
      for (let j = 0; j < tags.length; j++) {
        const [key, literal] = tags[j]
        const hash = String(literal.literal)
        keys[key] = keys[key] || { buckets: {}, ast: AST.neverKeyword }
        const buckets = keys[key].buckets
        if (Object.prototype.hasOwnProperty.call(buckets, hash)) {
          if (j < tags.length - 1) {
            continue
          }
          buckets[hash].push(member)
          keys[key].ast = AST.createUnion([keys[key].ast, literal])
        } else {
          buckets[hash] = [member]
          keys[key].ast = AST.createUnion([keys[key].ast, literal])
          break
        }
      }
    } else {
      otherwise.push(member)
    }
  }
  return { keys, otherwise }
}

const unknownArray = AST.createTuple([], O.some([AST.unknownKeyword]), true)

const unknownRecord = AST.createTypeLiteral([], [
  AST.createIndexSignature(AST.stringKeyword, AST.unknownKeyword, true),
  AST.createIndexSignature(AST.symbolKeyword, AST.unknownKeyword, true)
])
