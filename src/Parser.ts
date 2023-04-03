/**
 * @since 1.0.0
 */

import { untraced, untracedMethod } from "@effect/data/Debug"
import * as E from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import type { Option } from "@effect/data/Option"
import * as O from "@effect/data/Option"
import * as P from "@effect/data/Predicate"
import type { NonEmptyReadonlyArray } from "@effect/data/ReadonlyArray"
import * as RA from "@effect/data/ReadonlyArray"
import * as Effect from "@effect/io/Effect"
import type { ParseOptions } from "@effect/schema/AST"
import * as AST from "@effect/schema/AST"
import * as I from "@effect/schema/internal/common"
import type { ParseResult } from "@effect/schema/ParseResult"
import * as PR from "@effect/schema/ParseResult"
import type { Schema, To } from "@effect/schema/Schema"
import { formatErrors } from "@effect/schema/TreeFormatter"

const get = (ast: AST.AST) => {
  const parser = go(ast)
  return (input: unknown, options?: ParseOptions) => {
    const result = parser(input, options)
    // @ts-expect-error
    if (E.isLeft(result)) {
      throw new Error(formatErrors(result.left.errors))
    }
    // @ts-expect-error
    return result.right
  }
}

const getOption = (ast: AST.AST) => {
  const parser = go(ast)
  return (input: unknown, options?: ParseOptions) =>
    O.fromEither<any, any>(parser(input, options) as any)
}

const getEither = (ast: AST.AST) => {
  const parser = go(ast)
  return (input: unknown, options?: ParseOptions) => parser(input, options) as any
}

const getPromise = (ast: AST.AST) => {
  const parser = go(ast)
  return (input: unknown, options?: ParseOptions) =>
    Effect.runPromise(parser(input, { ...options, isEffectAllowed: true }))
}

const getEffect = (ast: AST.AST) => {
  const parser = go(ast)
  return (input: unknown, options?: ParseOptions) =>
    parser(input, { ...options, isEffectAllowed: true })
}

/**
 * @category parsing
 * @since 1.0.0
 */
export const parse = <_, A>(schema: Schema<_, A>): (i: unknown, options?: ParseOptions) => A =>
  get(schema.ast)

/**
 * @category parsing
 * @since 1.0.0
 */
export const parseOption = <_, A>(
  schema: Schema<_, A>
): (i: unknown, options?: ParseOptions) => Option<A> => getOption(schema.ast)

/**
 * @category parsing
 * @since 1.0.0
 */
export const parseEither = <_, A>(
  schema: Schema<_, A>
): (i: unknown, options?: ParseOptions) => E.Either<PR.ParseError, A> => getEither(schema.ast)

/**
 * @category parsing
 * @since 1.0.0
 */
export const parseResult = <_, A>(
  schema: Schema<_, A>
): (i: unknown, options?: ParseOptions) => PR.ParseResult<A> => go(schema.ast)

/**
 * @category parsing
 * @since 1.0.0
 */
export const parsePromise = <_, A>(
  schema: Schema<_, A>
): (i: unknown, options?: ParseOptions) => Promise<A> => getPromise(schema.ast)

/**
 * @category parsing
 * @since 1.0.0
 */
export const parseEffect = <_, A>(
  schema: Schema<_, A>
): (i: unknown, options?: ParseOptions) => Effect.Effect<never, PR.ParseError, A> =>
  getEffect(schema.ast)

/**
 * @category decoding
 * @since 1.0.0
 */
export const decode: <I, A>(schema: Schema<I, A>) => (i: I, options?: ParseOptions) => A = parse

/**
 * @category decoding
 * @since 1.0.0
 */
export const decodeOption: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions) => Option<A> = parseOption

/**
 * @category decoding
 * @since 1.0.0
 */
export const decodeEither: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions) => E.Either<PR.ParseError, A> = parseEither

/**
 * @category decoding
 * @since 1.0.0
 */
export const decodeResult: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => ParseResult<A> = parseResult

/**
 * @category decoding
 * @since 1.0.0
 */
export const decodePromise: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions) => Promise<A> = parsePromise

/**
 * @category decoding
 * @since 1.0.0
 */
export const decodeEffect: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => Effect.Effect<never, PR.ParseError, A> =
  parseEffect

/**
 * @category validation
 * @since 1.0.0
 */
export const validate = <_, A>(
  schema: Schema<_, A>
): (a: unknown, options?: ParseOptions) => A => get(AST.getTo(schema.ast))

/**
 * @category validation
 * @since 1.0.0
 */
export const validateOption = <_, A>(
  schema: Schema<_, A>
): (a: unknown, options?: ParseOptions) => Option<A> => getOption(AST.getTo(schema.ast))

/**
 * @category validation
 * @since 1.0.0
 */
export const validateEither = <_, A>(
  schema: Schema<_, A>
): (a: unknown, options?: ParseOptions) => E.Either<PR.ParseError, A> =>
  getEither(AST.getTo(schema.ast))

/**
 * @category validation
 * @since 1.0.0
 */
export const validateResult = <_, A>(
  schema: Schema<_, A>
): (a: unknown, options?: ParseOptions) => PR.ParseResult<A> => go(AST.getTo(schema.ast))

/**
 * @category validation
 * @since 1.0.0
 */
export const validatePromise = <_, A>(
  schema: Schema<_, A>
): (i: unknown, options?: ParseOptions) => Promise<A> => getPromise(AST.getTo(schema.ast))

/**
 * @category validation
 * @since 1.0.0
 */
export const validateEffect = <_, A>(
  schema: Schema<_, A>
): (a: unknown, options?: ParseOptions) => Effect.Effect<never, PR.ParseError, A> =>
  getEffect(AST.getTo(schema.ast))

/**
 * @category validation
 * @since 1.0.0
 */
export const is = <_, A>(schema: Schema<_, A>) => {
  const getEither = validateEither(schema)
  return (a: unknown): a is A => E.isRight(getEither(a))
}

/**
 * @since 1.0.0
 */
export type ToAsserts<S extends Schema<any>> = (
  input: unknown,
  options?: ParseOptions
) => asserts input is To<S>

/**
 * @category validation
 * @since 1.0.0
 */
export const asserts = <_, A>(schema: Schema<_, A>) => {
  const get = validate(schema)
  return (a: unknown, options?: ParseOptions): asserts a is A => {
    get(a, options)
  }
}

/**
 * @category encoding
 * @since 1.0.0
 */
export const encode = <I, A>(schema: Schema<I, A>): (a: A, options?: ParseOptions) => I =>
  get(AST.reverse(schema.ast))

/**
 * @category encoding
 * @since 1.0.0
 */
export const encodeOption = <I, A>(
  schema: Schema<I, A>
): (input: A, options?: ParseOptions) => Option<I> => getOption(AST.reverse(schema.ast))

/**
 * @category encoding
 * @since 1.0.0
 */
export const encodeEither = <I, A>(
  schema: Schema<I, A>
): (a: A, options?: ParseOptions) => E.Either<PR.ParseError, I> =>
  getEither(AST.reverse(schema.ast))

/**
 * @category encoding
 * @since 1.0.0
 */
export const encodeResult = <I, A>(
  schema: Schema<I, A>
): (a: A, options?: ParseOptions) => PR.ParseResult<I> => go(AST.reverse(schema.ast))

/**
 * @category encoding
 * @since 1.0.0
 */
export const encodePromise = <I, A>(
  schema: Schema<I, A>
): (a: A, options?: ParseOptions) => Promise<I> => getPromise(AST.reverse(schema.ast))

/**
 * @category encoding
 * @since 1.0.0
 */
export const encodeEffect = <I, A>(
  schema: Schema<I, A>
): (a: A, options?: ParseOptions) => Effect.Effect<never, PR.ParseError, I> =>
  getEffect(AST.reverse(schema.ast))

interface ParseEffectOptions extends ParseOptions {
  readonly isEffectAllowed?: boolean
}

interface Parser<I, A> {
  (i: I, options?: ParseEffectOptions): ParseResult<A>
}

const go = untracedMethod(() =>
  (ast: AST.AST, isBoundary = true): Parser<any, any> => {
    if (isBoundary === false && !AST.hasTransformation(ast)) {
      return PR.success
    }
    switch (ast._tag) {
      case "Refinement":
      case "Transform": {
        const to = go(ast.to, false)
        if (isBoundary) {
          const from = go(ast.from)
          return (i1, options) => {
            const conditional = to === PR.success ?
              PR.flatMap(from(i1, options), (a) => ast.decode(a, options)) :
              PR.flatMap(
                from(i1, options),
                (a) => PR.flatMap(ast.decode(a, options), (i2) => to(i2, options))
              )
            const either = PR.eitherOrUndefined(conditional)
            return either ?
              either :
              options?.isEffectAllowed === true ?
              conditional :
              PR.failure(PR.forbidden)
          }
        } else {
          return to === PR.success ?
            ast.decode :
            (a, options) => PR.flatMap(ast.decode(a, options), (i2) => to(i2, options))
        }
      }
      case "Declaration":
        return (i, options) => {
          const conditional = ast.decode(...ast.typeParameters)(i, options)
          const either = PR.eitherOrUndefined(conditional)
          return either ?
            either :
            options?.isEffectAllowed === true ?
            conditional :
            PR.failure(PR.forbidden)
        }
      case "Literal":
        return fromRefinement(ast, (u): u is typeof ast.literal => u === ast.literal)
      case "UniqueSymbol":
        return fromRefinement(ast, (u): u is typeof ast.symbol => u === ast.symbol)
      case "UndefinedKeyword":
        return fromRefinement(ast, P.isUndefined)
      case "VoidKeyword":
        return fromRefinement(ast, P.isUndefined)
      case "NeverKeyword":
        return fromRefinement(ast, P.isNever)
      case "UnknownKeyword":
      case "AnyKeyword":
        return PR.success
      case "StringKeyword":
        return fromRefinement(ast, P.isString)
      case "NumberKeyword":
        return fromRefinement(ast, P.isNumber)
      case "BooleanKeyword":
        return fromRefinement(ast, P.isBoolean)
      case "BigIntKeyword":
        return fromRefinement(ast, P.isBigint)
      case "SymbolKeyword":
        return fromRefinement(ast, P.isSymbol)
      case "ObjectKeyword":
        return fromRefinement(ast, P.isObject)
      case "Enums":
        return fromRefinement(ast, (u): u is any => ast.enums.some(([_, value]) => value === u))
      case "TemplateLiteral": {
        const regex = getTemplateLiteralRegex(ast)
        return fromRefinement(ast, (u): u is any => P.isString(u) && regex.test(u))
      }
      case "Tuple": {
        const elements = ast.elements.map((e) => go(e.type, isBoundary))
        const rest = pipe(ast.rest, O.map(RA.mapNonEmpty((ast) => go(ast))))
        let requiredLen = ast.elements.filter((e) => !e.isOptional).length
        if (O.isSome(ast.rest)) {
          requiredLen += ast.rest.value.length - 1
        }
        return (input: unknown, options) => {
          if (!Array.isArray(input)) {
            return PR.failure(PR.type(unknownArray, input))
          }
          const allErrors = options?.errors === "all"
          const es: Array<[number, PR.ParseErrors]> = []
          let stepKey = 0
          // ---------------------------------------------
          // handle missing indexes
          // ---------------------------------------------
          const len = input.length
          for (let i = len; i <= requiredLen - 1; i++) {
            const e = PR.index(i, [PR.missing])
            if (allErrors) {
              es.push([stepKey++, e])
              continue
            } else {
              return PR.failure(e)
            }
          }

          // ---------------------------------------------
          // handle excess indexes
          // ---------------------------------------------
          if (O.isNone(ast.rest)) {
            for (let i = ast.elements.length; i <= len - 1; i++) {
              const e = PR.index(i, [PR.unexpected(input[i])])
              if (allErrors) {
                es.push([stepKey++, e])
                continue
              } else {
                return PR.failures(mutableAppend(sortByIndex(es), e))
              }
            }
          }

          const output: Array<[number, any]> = []
          let i = 0
          type State = {
            es: typeof es
            output: typeof output
          }
          let queue: Array<(_: State) => Effect.Effect<never, PR.ParseError, void>> | undefined =
            undefined

          // ---------------------------------------------
          // handle elements
          // ---------------------------------------------
          for (; i < elements.length; i++) {
            if (len < i + 1) {
              // the input element is missing...
              if (ast.elements[i].isOptional) {
                continue
              }
            } else {
              const parser = elements[i]
              const te = parser(input[i], options)
              const t = PR.eitherOrUndefined(te)
              if (t) {
                if (E.isLeft(t)) {
                  // the input element is present but is not valid
                  const e = PR.index(i, t.left.errors)
                  if (allErrors) {
                    es.push([stepKey++, e])
                    continue
                  } else {
                    return PR.failures(mutableAppend(sortByIndex(es), e))
                  }
                }
                output.push([stepKey++, t.right])
              } else {
                const nk = stepKey++
                const index = i
                if (!queue) {
                  queue = []
                }
                queue.push(
                  untracedMethod(() =>
                    ({ es, output }: State) =>
                      Effect.flatMap(Effect.either(te), (t) => {
                        if (E.isLeft(t)) {
                          // the input element is present but is not valid
                          const e = PR.index(index, t.left.errors)
                          if (allErrors) {
                            es.push([nk, e])
                            return Effect.unit()
                          } else {
                            return PR.failures(mutableAppend(sortByIndex(es), e))
                          }
                        }
                        output.push([nk, t.right])
                        return Effect.unit()
                      })
                  )
                )
              }
            }
          }
          // ---------------------------------------------
          // handle rest element
          // ---------------------------------------------
          if (O.isSome(rest)) {
            const head = RA.headNonEmpty(rest.value)
            const tail = RA.tailNonEmpty(rest.value)
            for (; i < len - tail.length; i++) {
              const te = head(input[i], options)
              const t = PR.eitherOrUndefined(te)
              if (t) {
                if (E.isLeft(t)) {
                  const e = PR.index(i, t.left.errors)
                  if (allErrors) {
                    es.push([stepKey++, e])
                    continue
                  } else {
                    return PR.failures(mutableAppend(sortByIndex(es), e))
                  }
                } else {
                  output.push([stepKey++, t.right])
                }
              } else {
                const nk = stepKey++
                const index = i
                if (!queue) {
                  queue = []
                }
                queue.push(
                  untracedMethod(() =>
                    ({ es, output }: State) =>
                      Effect.flatMap(Effect.either(te), (t) => {
                        if (E.isLeft(t)) {
                          const e = PR.index(index, t.left.errors)
                          if (allErrors) {
                            es.push([nk, e])
                            return Effect.unit()
                          } else {
                            return PR.failures(mutableAppend(sortByIndex(es), e))
                          }
                        } else {
                          output.push([nk, t.right])
                          return Effect.unit()
                        }
                      })
                  )
                )
              }
            }
            // ---------------------------------------------
            // handle post rest elements
            // ---------------------------------------------
            for (let j = 0; j < tail.length; j++) {
              i += j
              if (len < i + 1) {
                continue
              } else {
                const te = tail[j](input[i], options)
                const t = PR.eitherOrUndefined(te)
                if (t) {
                  if (E.isLeft(t)) {
                    // the input element is present but is not valid
                    const e = PR.index(i, t.left.errors)
                    if (allErrors) {
                      es.push([stepKey++, e])
                      continue
                    } else {
                      return PR.failures(mutableAppend(sortByIndex(es), e))
                    }
                  }
                  output.push([stepKey++, t.right])
                } else {
                  const nk = stepKey++
                  const index = i
                  if (!queue) {
                    queue = []
                  }
                  queue.push(
                    untracedMethod(() =>
                      ({ es, output }: State) =>
                        Effect.flatMap(Effect.either(te), (t) => {
                          if (E.isLeft(t)) {
                            // the input element is present but is not valid
                            const e = PR.index(index, t.left.errors)
                            if (allErrors) {
                              es.push([nk, e])
                              return Effect.unit()
                            } else {
                              return PR.failures(mutableAppend(sortByIndex(es), e))
                            }
                          }
                          output.push([nk, t.right])
                          return Effect.unit()
                        })
                    )
                  )
                }
              }
            }
          }

          // ---------------------------------------------
          // compute output
          // ---------------------------------------------
          const computeResult = ({ es, output }: State) =>
            RA.isNonEmptyArray(es) ?
              PR.failures(sortByIndex(es)) :
              PR.success(sortByIndex(output))
          if (queue && queue.length > 0) {
            const cqueue = queue
            return untraced(() =>
              Effect.suspend(() => {
                const state: State = {
                  es: Array.from(es),
                  output: Array.from(output)
                }
                return Effect.flatMap(
                  Effect.forEachDiscard(cqueue, (f) => f(state)),
                  () => computeResult(state)
                )
              })
            )
          }
          return computeResult({ output, es })
        }
      }
      case "TypeLiteral": {
        if (ast.propertySignatures.length === 0 && ast.indexSignatures.length === 0) {
          return fromRefinement(ast, P.isNotNullable)
        }
        const propertySignaturesTypes = ast.propertySignatures.map((f) => go(f.type, isBoundary))
        const indexSignatures = ast.indexSignatures.map((is) =>
          [go(is.parameter, isBoundary), go(is.type, isBoundary)] as const
        )
        const expectedKeys: any = {}
        for (let i = 0; i < propertySignaturesTypes.length; i++) {
          expectedKeys[ast.propertySignatures[i].name] = null
        }
        return (input: unknown, options) => {
          if (!P.isRecord(input)) {
            return PR.failure(PR.type(unknownRecord, input))
          }
          const allErrors = options?.errors === "all"
          const es: Array<[number, PR.ParseErrors]> = []
          let stepKey = 0
          // ---------------------------------------------
          // handle missing keys
          // ---------------------------------------------
          for (let i = 0; i < propertySignaturesTypes.length; i++) {
            const ps = ast.propertySignatures[i]
            const name = ps.name
            if (!Object.prototype.hasOwnProperty.call(input, name)) {
              if (!ps.isOptional) {
                const e = PR.key(name, [PR.missing])
                if (allErrors) {
                  es.push([stepKey++, e])
                  continue
                } else {
                  return PR.failure(e)
                }
              }
            }
          }

          // ---------------------------------------------
          // handle excess properties
          // ---------------------------------------------
          const onExcessPropertyError = options?.onExcessProperty === "error"
          if (onExcessPropertyError && indexSignatures.length === 0) {
            for (const key of I.ownKeys(input)) {
              if (!(Object.prototype.hasOwnProperty.call(expectedKeys, key))) {
                const e = PR.key(key, [PR.unexpected(input[key])])
                if (allErrors) {
                  es.push([stepKey++, e])
                  continue
                } else {
                  return PR.failures(mutableAppend(sortByIndex(es), e))
                }
              }
            }
          }

          // ---------------------------------------------
          // handle property signatures
          // ---------------------------------------------
          const output: any = {}
          type State = {
            es: typeof es
            output: typeof output
          }
          let queue:
            | Array<(state: State) => Effect.Effect<never, PR.ParseError, void>>
            | undefined = undefined

          for (let i = 0; i < propertySignaturesTypes.length; i++) {
            const ps = ast.propertySignatures[i]
            const parser = propertySignaturesTypes[i]
            const name = ps.name
            if (Object.prototype.hasOwnProperty.call(input, name)) {
              const te = parser(input[name], options)
              const t = PR.eitherOrUndefined(te)
              if (t) {
                if (E.isLeft(t)) {
                  // the input key is present but is not valid
                  const e = PR.key(name, t.left.errors)
                  if (allErrors) {
                    es.push([stepKey++, e])
                    continue
                  } else {
                    return PR.failures(mutableAppend(sortByIndex(es), e))
                  }
                }
                output[name] = t.right
              } else {
                const nk = stepKey++
                const index = name
                if (!queue) {
                  queue = []
                }
                queue.push(
                  untracedMethod(() =>
                    ({ es, output }: State) =>
                      Effect.flatMap(Effect.either(te), (t) => {
                        if (E.isLeft(t)) {
                          // the input key is present but is not valid
                          const e = PR.key(index, t.left.errors)
                          if (allErrors) {
                            es.push([nk, e])
                            return Effect.unit()
                          } else {
                            return PR.failures(mutableAppend(sortByIndex(es), e))
                          }
                        }
                        output[index] = t.right
                        return Effect.unit()
                      })
                  )
                )
              }
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
                const te = parameter(key, options)
                // ---------------------------------------------
                // handle keys
                // ---------------------------------------------
                const t = PR.eitherOrUndefined(te)
                if (t) {
                  if (E.isLeft(t)) {
                    const e = PR.key(key, t.left.errors)
                    if (allErrors) {
                      es.push([stepKey++, e])
                      continue
                    } else {
                      return PR.failures(mutableAppend(sortByIndex(es), e))
                    }
                  }
                }
                // there's no else here because index signature parameters are restricted to primitives

                // ---------------------------------------------
                // handle values
                // ---------------------------------------------
                const tve = type(input[key], options)
                const tv = PR.eitherOrUndefined(tve)
                if (tv) {
                  if (E.isLeft(tv)) {
                    const e = PR.key(key, tv.left.errors)
                    if (allErrors) {
                      es.push([stepKey++, e])
                      continue
                    } else {
                      return PR.failures(mutableAppend(sortByIndex(es), e))
                    }
                  } else {
                    output[key] = tv.right
                  }
                } else {
                  const nk = stepKey++
                  const index = key
                  if (!queue) {
                    queue = []
                  }
                  queue.push(
                    untracedMethod(() =>
                      ({ es, output }: State) =>
                        Effect.flatMap(
                          Effect.either(tve),
                          (tv) => {
                            if (E.isLeft(tv)) {
                              const e = PR.key(index, tv.left.errors)
                              if (allErrors) {
                                es.push([nk, e])
                                return Effect.unit()
                              } else {
                                return PR.failures(mutableAppend(sortByIndex(es), e))
                              }
                            } else {
                              output[key] = tv.right
                              return Effect.unit()
                            }
                          }
                        )
                    )
                  )
                }
              }
            }
          }
          // ---------------------------------------------
          // compute output
          // ---------------------------------------------
          const computeResult = ({ es, output }: State) =>
            RA.isNonEmptyArray(es) ?
              PR.failures(sortByIndex(es)) :
              PR.success(output)
          if (queue && queue.length > 0) {
            const cqueue = queue
            return untraced(() =>
              Effect.suspend(() => {
                const state: State = {
                  es: Array.from(es),
                  output: Object.assign({}, output)
                }
                return Effect.flatMap(
                  Effect.forEachDiscard(cqueue, (f) => f(state)),
                  () => computeResult(state)
                )
              })
            )
          }
          return computeResult({ es, output })
        }
      }
      case "Union": {
        const searchTree = _getSearchTree(ast.types)
        const ownKeys = I.ownKeys(searchTree.keys)
        const len = ownKeys.length
        const map = new Map<any, Parser<any, any>>()
        for (let i = 0; i < ast.types.length; i++) {
          map.set(ast.types[i], go(ast.types[i], true)) // <= this must be true
        }
        return (input, options) => {
          const es: Array<[number, PR.ParseErrors]> = []
          let stepKey = 0
          let candidates: Array<AST.AST> = []
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
                    candidates = candidates.concat(buckets[literal])
                  } else {
                    es.push([
                      stepKey++,
                      PR.key(name, [PR.type(
                        searchTree.keys[name].ast,
                        input[name]
                      )])
                    ])
                  }
                } else {
                  es.push([stepKey++, PR.key(name, [PR.missing])])
                }
              }
            } else {
              es.push([stepKey++, PR.type(unknownRecord, input)])
            }
          }
          if (searchTree.otherwise.length > 0) {
            candidates = candidates.concat(searchTree.otherwise)
          }

          let queue:
            | Array<(state: State) => Effect.Effect<never, PR.ParseError, unknown>>
            | undefined = undefined

          type State = {
            finalResult?: any
            es: typeof es
          }

          for (let i = 0; i < candidates.length; i++) {
            const te = map.get(candidates[i])!(input, options)
            // the members of a union are ordered based on which one should be decoded first,
            // therefore if one member has added a task, all subsequent members must
            // also add a task to the queue even if they are synchronous
            const t = !queue || queue.length === 0 ? PR.eitherOrUndefined(te) : undefined
            if (t) {
              if (E.isRight(t)) {
                return PR.success(t.right)
              } else {
                es.push([stepKey++, PR.unionMember(t.left.errors)])
              }
            } else {
              const nk = stepKey++
              if (!queue) {
                queue = []
              }
              queue.push(
                untracedMethod(() =>
                  (state) =>
                    Effect.suspend(() => {
                      if ("finalResult" in state) {
                        return Effect.unit()
                      } else {
                        return Effect.flatMap(Effect.either(te), (t) => {
                          if (E.isRight(t)) {
                            state.finalResult = PR.success(t.right)
                          } else {
                            state.es.push([nk, PR.unionMember(t.left.errors)])
                          }
                          return Effect.unit()
                        })
                      }
                    })
                )
              )
            }
          }

          // ---------------------------------------------
          // compute output
          // ---------------------------------------------
          const computeResult = (es: State["es"]) =>
            RA.isNonEmptyArray(es) ?
              PR.failures(sortByIndex(es)) :
              // this should never happen
              PR.failure(PR.type(AST.neverKeyword, input))

          if (queue && queue.length > 0) {
            const cqueue = queue
            return untraced(() =>
              Effect.suspend(() => {
                const state: State = { es: Array.from(es) }
                return Effect.flatMap(
                  Effect.forEachDiscard(cqueue, (f) => f(state)),
                  () => {
                    if ("finalResult" in state) {
                      return state.finalResult
                    }
                    return computeResult(state.es)
                  }
                )
              })
            )
          }
          return computeResult(es)
        }
      }
      case "Lazy": {
        const f = () => go(ast.f(), isBoundary)
        const get = I.memoize<void, Parser<any, any>>(f)
        return (a, options) => get()(a, options)
      }
    }
  }
)

const fromRefinement = <A>(ast: AST.AST, refinement: (u: unknown) => u is A): Parser<unknown, A> =>
  (u) => refinement(u) ? PR.success(u) : PR.failure(PR.type(ast, u))

/** @internal */
export const _getLiterals = (
  ast: AST.AST
): ReadonlyArray<[PropertyKey, AST.Literal]> => {
  switch (ast._tag) {
    case "Declaration":
      return _getLiterals(ast.type)
    case "TypeLiteral": {
      const out: Array<[PropertyKey, AST.Literal]> = []
      for (let i = 0; i < ast.propertySignatures.length; i++) {
        const propertySignature = ast.propertySignatures[i]
        const type = AST.getFrom(propertySignature.type)
        if (AST.isLiteral(type) && !propertySignature.isOptional) {
          out.push([propertySignature.name, type])
        }
      }
      return out
    }
    case "Refinement":
    case "Transform":
      return _getLiterals(ast.from)
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
export const _getSearchTree = (
  members: ReadonlyArray<AST.AST>
): {
  keys: {
    readonly [key: PropertyKey]: {
      buckets: { [literal: string]: ReadonlyArray<AST.AST> }
      ast: AST.AST // this is for error messages
    }
  }
  otherwise: ReadonlyArray<AST.AST>
} => {
  const keys: {
    [key: PropertyKey]: {
      buckets: { [literal: string]: Array<AST.AST> }
      ast: AST.AST
    }
  } = {}
  const otherwise: Array<AST.AST> = []
  for (let i = 0; i < members.length; i++) {
    const member = members[i]
    const tags = _getLiterals(member)
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

const unknownArray = AST.createTuple([], O.some([AST.unknownKeyword]), true, {
  [AST.DescriptionAnnotationId]: "a generic array"
})

const unknownRecord = AST.createTypeLiteral([], [
  AST.createIndexSignature(AST.stringKeyword, AST.unknownKeyword, true),
  AST.createIndexSignature(AST.symbolKeyword, AST.unknownKeyword, true)
], {
  [AST.DescriptionAnnotationId]: "a generic object"
})

const mutableAppend = <A>(self: Array<A>, a: A): NonEmptyReadonlyArray<A> => {
  self.push(a)
  return self as any
}

const getTemplateLiteralRegex = (ast: AST.TemplateLiteral): RegExp => {
  let pattern = `^${ast.head}`
  for (const span of ast.spans) {
    if (AST.isStringKeyword(span.type)) {
      pattern += ".*"
    } else if (AST.isNumberKeyword(span.type)) {
      pattern += "-?\\d+(\\.\\d+)?"
    }
    pattern += span.literal
  }
  pattern += "$"
  return new RegExp(pattern)
}

function sortByIndex<T>(es: RA.NonEmptyArray<[number, T]>): RA.NonEmptyArray<T>
function sortByIndex<T>(es: Array<[number, T]>): Array<T>
function sortByIndex(es: Array<[number, any]>): any {
  return es.sort(([a], [b]) => a > b ? 1 : a < b ? -1 : 0).map(([_, a]) => a)
}
