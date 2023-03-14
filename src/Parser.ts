/**
 * @since 1.0.0
 */

import * as E from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import type { Option } from "@effect/data/Option"
import * as P from "@effect/data/Predicate"
import * as RA from "@effect/data/ReadonlyArray"
import type { NonEmptyReadonlyArray } from "@effect/data/ReadonlyArray"
import * as AST from "@effect/schema/AST"
import type { ParseOptions } from "@effect/schema/AST"
import * as I from "@effect/schema/internal/common"
import * as PR from "@effect/schema/ParseResult"
import type { ParseResult } from "@effect/schema/ParseResult"
import type { Schema, To } from "@effect/schema/Schema"
import { formatErrors } from "@effect/schema/TreeFormatter"

const parse = (schema: Schema<any>, kind: ParserKind) => {
  const parse = parserFor(schema, kind).parse
  return (input: unknown, options?: ParseOptions): any => {
    const t = parse(input, options)
    if (PR.isFailure(t)) {
      throw new Error(formatErrors(t.left))
    }
    return t.right
  }
}

const parseOption = (schema: Schema<any>, kind: ParserKind) => {
  const parse = parserFor(schema, kind).parse
  return (input: unknown, options?: ParseOptions): Option<any> =>
    O.fromEither(parse(input, options))
}

const parseEither = (
  schema: Schema<any>,
  kind: ParserKind
): (input: unknown, options?: ParseOptions) => ParseResult<any> => parserFor(schema, kind).parse

/**
 * @category decoding
 * @since 1.0.0
 */
export const decodeEither = <I, A>(
  schema: Schema<I, A>
): (input: unknown, options?: ParseOptions) => ParseResult<A> => parseEither(schema, "decoding")

/**
 * @category decoding
 * @since 1.0.0
 */
export const decodeOption = <I, A>(
  schema: Schema<I, A>
): (input: unknown, options?: ParseOptions) => Option<A> => parseOption(schema, "decoding")

/**
 * @category decoding
 * @since 1.0.0
 */
export const decode = <I, A>(schema: Schema<I, A>): (input: unknown, options?: ParseOptions) => A =>
  parse(schema, "decoding")

/**
 * @category validation
 * @since 1.0.0
 */
export const is = <I, A>(schema: Schema<I, A>) =>
  (input: unknown, options?: ParseOptions): input is A =>
    E.isRight(parseEither(schema, "validation")(input, options))

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
export const asserts = <A>(schema: Schema<A>) =>
  (input: unknown, options?: ParseOptions): asserts input is A => {
    parse(schema, "validation")(input, options)
  }

/**
 * @category validation
 * @since 1.0.0
 */
export const validateEither = <I, A>(
  schema: Schema<I, A>
): (input: unknown, options?: ParseOptions) => ParseResult<A> => parseEither(schema, "validation")

/**
 * @category validation
 * @since 1.0.0
 */
export const validateOption = <I, A>(
  schema: Schema<I, A>
): (input: unknown, options?: ParseOptions) => Option<A> => parseOption(schema, "validation")

/**
 * @category validation
 * @since 1.0.0
 */
export const validate = <I, A>(
  schema: Schema<I, A>
): (input: unknown, options?: ParseOptions) => A => parse(schema, "validation")

/**
 * @category encoding
 * @since 1.0.0
 */
export const encodeEither = <I, A>(
  schema: Schema<I, A>
): (a: A, options?: ParseOptions) => ParseResult<I> => parseEither(schema, "encoding")

/**
 * @category encoding
 * @since 1.0.0
 */
export const encodeOption = <I, A>(
  schema: Schema<I, A>
): (input: A, options?: ParseOptions) => Option<I> => parseOption(schema, "encoding")

/**
 * @category encoding
 * @since 1.0.0
 */
export const encode = <I, A>(schema: Schema<I, A>): (a: A, options?: ParseOptions) => I =>
  parse(schema, "encoding")

type ParserKind = "decoding" | "validation" | "encoding"

interface Parser<To> extends Schema<To> {
  readonly parse: (input: unknown, options?: ParseOptions) => ParseResult<To>
}

const make = <A>(schema: Schema<A>, parse: Parser<A>["parse"]): Parser<A> =>
  ({ ast: schema.ast, parse }) as any

const parserFor = (schema: Schema<any>, as: ParserKind): Parser<any> => {
  const go = (ast: AST.AST): Parser<any> => {
    switch (ast._tag) {
      case "Declaration":
        return make(I.makeSchema(ast), ast.decode(...ast.typeParameters.map((p) => go(p).ast)))
      case "Literal":
        return fromRefinement(
          I.makeSchema(ast),
          (u): u is typeof ast.literal => u === ast.literal
        )
      case "UniqueSymbol":
        return fromRefinement(
          I.makeSchema(ast),
          (u): u is typeof ast.symbol => u === ast.symbol
        )
      case "UndefinedKeyword":
        return fromRefinement(I.makeSchema(ast), P.isUndefined)
      case "VoidKeyword":
        return fromRefinement(I.makeSchema(ast), P.isUndefined)
      case "NeverKeyword":
        return fromRefinement(I.makeSchema(ast), P.isNever)
      case "UnknownKeyword":
      case "AnyKeyword":
        return make(I.makeSchema(ast), PR.success)
      case "StringKeyword":
        return fromRefinement(I.makeSchema(ast), P.isString)
      case "NumberKeyword":
        return fromRefinement(I.makeSchema(ast), P.isNumber)
      case "BooleanKeyword":
        return fromRefinement(I.makeSchema(ast), P.isBoolean)
      case "BigIntKeyword":
        return fromRefinement(I.makeSchema(ast), P.isBigint)
      case "SymbolKeyword":
        return fromRefinement(I.makeSchema(ast), P.isSymbol)
      case "ObjectKeyword":
        return fromRefinement(I.makeSchema(ast), P.isObject)
      case "Enums":
        return fromRefinement(
          I.makeSchema(ast),
          (u): u is any => ast.enums.some(([_, value]) => value === u)
        )
      case "TemplateLiteral": {
        const regex = getTemplateLiteralRegex(ast)
        return fromRefinement(I.makeSchema(ast), (u): u is any => P.isString(u) && regex.test(u))
      }
      case "Tuple": {
        const elements = ast.elements.map((e) => go(e.type))
        const rest = pipe(ast.rest, O.map(RA.mapNonEmpty(go)))
        return make(
          I.makeSchema(ast),
          (input: unknown, options) => {
            if (!Array.isArray(input)) {
              return PR.failure(PR.type(unknownArray, input))
            }
            const output: Array<any> = []
            const es: Array<PR.ParseError> = []
            const allErrors = options?.allErrors
            let i = 0
            // ---------------------------------------------
            // handle elements
            // ---------------------------------------------
            for (; i < elements.length; i++) {
              if (input.length < i + 1) {
                // the input element is missing...
                if (!ast.elements[i].isOptional) {
                  // ...but the element is required
                  const e = PR.index(i, [PR.missing])
                  if (allErrors) {
                    es.push(e)
                    continue
                  } else {
                    return PR.failure(e)
                  }
                }
              } else {
                const parser = elements[i]
                const t = parser.parse(input[i], options)
                if (PR.isFailure(t)) {
                  // the input element is present but is not valid
                  const e = PR.index(i, t.left)
                  if (allErrors) {
                    es.push(e)
                    continue
                  } else {
                    return PR.failures(mutableAppend(es, e))
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
                const t = head.parse(input[i], options)
                if (PR.isFailure(t)) {
                  const e = PR.index(i, t.left)
                  if (allErrors) {
                    es.push(e)
                    continue
                  } else {
                    return PR.failures(mutableAppend(es, e))
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
                  return PR.failures(mutableAppend(es, PR.index(i, [PR.missing])))
                } else {
                  const t = tail[j].parse(input[i], options)
                  if (PR.isFailure(t)) {
                    // the input element is present but is not valid
                    const e = PR.index(i, t.left)
                    if (allErrors) {
                      es.push(e)
                      continue
                    } else {
                      return PR.failures(mutableAppend(es, e))
                    }
                  }
                  output.push(t.right)
                }
              }
            } else {
              // ---------------------------------------------
              // handle unexpected indexes
              // ---------------------------------------------
              const isUnexpectedAllowed = options?.isUnexpectedAllowed
              for (; i < input.length; i++) {
                const e = PR.index(i, [PR.unexpected(input[i])])
                if (!isUnexpectedAllowed) {
                  if (allErrors) {
                    es.push(e)
                    continue
                  } else {
                    return PR.failures(mutableAppend(es, e))
                  }
                }
              }
            }

            // ---------------------------------------------
            // compute output
            // ---------------------------------------------
            return RA.isNonEmptyReadonlyArray(es) ?
              PR.failures(es) :
              PR.success(output)
          }
        )
      }
      case "TypeLiteral": {
        if (ast.propertySignatures.length === 0 && ast.indexSignatures.length === 0) {
          return fromRefinement(I.makeSchema(ast), P.isNotNullable)
        }
        const propertySignaturesTypes = ast.propertySignatures.map((f) => go(f.type))
        const indexSignatures = ast.indexSignatures.map((is) =>
          [go(is.parameter), go(is.type)] as const
        )
        return make(
          I.makeSchema(ast),
          (input: unknown, options) => {
            if (!P.isRecord(input)) {
              return PR.failure(PR.type(unknownRecord, input))
            }
            const output: any = {}
            const expectedKeys: any = {}
            const es: Array<PR.ParseError> = []
            const allErrors = options?.allErrors
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
                  const e = PR.key(name, [PR.missing])
                  if (allErrors) {
                    es.push(e)
                    continue
                  } else {
                    return PR.failure(e)
                  }
                }
              } else {
                const t = parser.parse(input[name], options)
                if (PR.isFailure(t)) {
                  // the input key is present but is not valid
                  const e = PR.key(name, t.left)
                  if (allErrors) {
                    es.push(e)
                    continue
                  } else {
                    return PR.failures(mutableAppend(es, e))
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
                  let t = parameter.parse(key, options)
                  if (PR.isFailure(t)) {
                    const e = PR.key(key, t.left)
                    if (allErrors) {
                      es.push(e)
                      continue
                    } else {
                      return PR.failures(mutableAppend(es, e))
                    }
                  }
                  // ---------------------------------------------
                  // handle values
                  // ---------------------------------------------
                  t = type.parse(input[key], options)
                  if (PR.isFailure(t)) {
                    const e = PR.key(key, t.left)
                    if (allErrors) {
                      es.push(e)
                      continue
                    } else {
                      return PR.failures(mutableAppend(es, e))
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
                  const e = PR.key(key, [PR.unexpected(input[key])])
                  if (!isUnexpectedAllowed) {
                    if (allErrors) {
                      es.push(e)
                      continue
                    } else {
                      return PR.failures(mutableAppend(es, e))
                    }
                  }
                }
              }
            }

            // ---------------------------------------------
            // compute output
            // ---------------------------------------------
            return RA.isNonEmptyReadonlyArray(es) ?
              PR.failures(es) :
              PR.success(output)
          }
        )
      }
      case "Union": {
        const types = ast.types.map(go)
        const searchTree = _getSearchTree(types)
        const ownKeys = Reflect.ownKeys(searchTree.keys)
        const len = ownKeys.length
        const otherwise = searchTree.otherwise
        return make(I.makeSchema(ast), (input, options) => {
          const es: Array<PR.ParseError> = []

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
                      const t = bucket[i].parse(input, options)
                      if (PR.isSuccess(t)) {
                        return t
                      } else {
                        es.push(PR.unionMember(t.left))
                      }
                    }
                  } else {
                    es.push(
                      PR.key(name, [
                        PR.type(
                          searchTree.keys[name].ast,
                          input[name]
                        )
                      ])
                    )
                  }
                } else {
                  es.push(PR.key(name, [PR.missing]))
                }
              }
            } else {
              es.push(PR.type(unknownRecord, input))
            }
          }
          // if none of the schemas with at least one property with a literal value succeeded,
          // proceed with those that have no literal at all
          for (let i = 0; i < otherwise.length; i++) {
            const t = otherwise[i].parse(input, options)
            if (PR.isSuccess(t)) {
              return t
            } else {
              es.push(PR.unionMember(t.left))
            }
          }

          // ---------------------------------------------
          // compute output
          // ---------------------------------------------
          return RA.isNonEmptyReadonlyArray(es) ?
            PR.failures(es) :
            PR.failure(PR.type(AST.neverKeyword, input))
        })
      }
      case "Lazy": {
        const f = () => go(ast.f())
        const get = I.memoize<void, Parser<any>>(f)
        const schema = I.lazy(f)
        return make(schema, (a, options) => get().parse(a, options))
      }
      case "Refinement": {
        const type = go(ast.from)
        switch (as) {
          case "validation":
          case "decoding":
            return make(
              I.makeSchema(ast),
              (u, options) => pipe(type.parse(u, options), E.flatMap((a) => ast.decode(a, options)))
            )
          case "encoding":
            return make(
              I.makeSchema(ast),
              (u, options) => pipe(ast.decode(u, options), E.flatMap((a) => type.parse(a, options)))
            )
        }
      }
      case "Transform": {
        switch (as) {
          case "decoding": {
            const from = go(ast.from)
            return make(
              I.makeSchema(ast),
              (u, options) => pipe(from.parse(u, options), E.flatMap((a) => ast.decode(a, options)))
            )
          }
          case "validation":
            return go(ast.to)
          case "encoding": {
            const from = go(ast.from)
            return make(
              I.makeSchema(AST.createTransform(ast.to, ast.from, ast.encode, ast.decode)),
              (a, options) => pipe(ast.encode(a, options), E.flatMap((a) => from.parse(a, options)))
            )
          }
        }
      }
    }
  }

  return go(schema.ast)
}

const fromRefinement = <A>(
  schema: Schema<A>,
  refinement: (u: unknown) => u is A
): Parser<A> =>
  make(schema, (u) => refinement(u) ? PR.success(u) : PR.failure(PR.type(schema.ast, u)))

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
        if (AST.isLiteral(propertySignature.type) && !propertySignature.isOptional) {
          out.push([propertySignature.name, propertySignature.type])
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
export const _getSearchTree = <A extends Schema<any>>(
  members: ReadonlyArray<A>
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
    const tags = _getLiterals(member.ast)
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
