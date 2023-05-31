/**
 * @since 1.0.0
 */

import * as B from "@effect/data/Bigint"
import type { Chunk } from "@effect/data/Chunk"
import * as C from "@effect/data/Chunk"
import type * as D from "@effect/data/Data"
import type { Either } from "@effect/data/Either"
import * as E from "@effect/data/Either"
import { dual, identity, pipe } from "@effect/data/Function"
import * as N from "@effect/data/Number"
import type { Option } from "@effect/data/Option"
import * as O from "@effect/data/Option"
import * as RA from "@effect/data/ReadonlyArray"
import type { ParseOptions } from "@effect/schema/AST"
import * as AST from "@effect/schema/AST"
import * as I from "@effect/schema/internal/common"
import * as P from "@effect/schema/Parser"
import type { ParseResult } from "@effect/schema/ParseResult"
import * as PR from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"

/**
 * @category model
 * @since 1.0.0
 */
export interface Codec<From, To> {
  readonly From: (_: From) => From
  readonly To: (_: To) => To
  readonly ast: AST.AST
}

/**
 * @category model
 * @since 1.0.0
 */
export type From<S extends { readonly From: (..._: any) => any }> = Parameters<S["From"]>[0]

/**
 * @category model
 * @since 1.0.0
 */
export type To<S extends { readonly To: (..._: any) => any }> = Parameters<S["To"]>[0]

/**
 * @since 1.0.0
 */
export const from = <I, A>(transform: Codec<I, A>): S.Schema<I> => S.make(AST.from(transform.ast))

/**
 * @since 1.0.0
 */
export const to = <I, A>(transform: Codec<I, A>): S.Schema<A> => S.make(AST.to(transform.ast))

/* c8 ignore start */
export {
  /**
   * @category decoding
   * @since 1.0.0
   */
  decode,
  /**
   * @category decoding
   * @since 1.0.0
   */
  decodeEffect,
  /**
   * @category decoding
   * @since 1.0.0
   */
  decodeEither,
  /**
   * @category decoding
   * @since 1.0.0
   */
  decodeOption,
  /**
   * @category decoding
   * @since 1.0.0
   */
  decodePromise,
  /**
   * @category decoding
   * @since 1.0.0
   */
  decodeResult,
  /**
   * @category encoding
   * @since 1.0.0
   */
  encode,
  /**
   * @category encoding
   * @since 1.0.0
   */
  encodeEffect,
  /**
   * @category encoding
   * @since 1.0.0
   */
  encodeEither,
  /**
   * @category encoding
   * @since 1.0.0
   */
  encodeOption,
  /**
   * @category encoding
   * @since 1.0.0
   */
  encodePromise,
  /**
   * @category encoding
   * @since 1.0.0
   */
  encodeResult,
  /**
   * @category parsing
   * @since 1.0.0
   */
  parse,
  /**
   * @category parsing
   * @since 1.0.0
   */
  parseEffect,
  /**
   * @category parsing
   * @since 1.0.0
   */
  parseEither,
  /**
   * @category parsing
   * @since 1.0.0
   */
  parseOption,
  /**
   * @category parsing
   * @since 1.0.0
   */
  parsePromise,
  /**
   * @category parsing
   * @since 1.0.0
   */
  parseResult
} from "@effect/schema/Parser"
/* c8 ignore end */

// ---------------------------------------------
// constructors
// ---------------------------------------------

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <I, A>(ast: AST.AST): Codec<I, A> => ({ ast }) as any

/**
  Create a new `Codec` by transforming the input and output of an existing `Schema`
  using the provided decoding functions.

  @category constructors
  @since 1.0.0
 */
export const transformResult: {
  <I2, A2, A1>(
    to: Codec<I2, A2>,
    decode: (a1: A1, options: ParseOptions, self: AST.AST) => ParseResult<I2>,
    encode: (i2: I2, options: ParseOptions, self: AST.AST) => ParseResult<A1>
  ): <I1>(self: Codec<I1, A1>) => Codec<I1, A2>
  <I1, A1, I2, A2>(
    from: Codec<I1, A1>,
    to: Codec<I2, A2>,
    decode: (a1: A1, options: ParseOptions, self: AST.AST) => ParseResult<I2>,
    encode: (i2: I2, options: ParseOptions, self: AST.AST) => ParseResult<A1>
  ): Codec<I1, A2>
} = dual(4, <I1, A1, I2, A2>(
  from: Codec<I1, A1>,
  to: Codec<I2, A2>,
  decode: (a1: A1, options: ParseOptions, self: AST.AST) => ParseResult<I2>,
  encode: (i2: I2, options: ParseOptions, self: AST.AST) => ParseResult<A1>
): Codec<I1, A2> =>
  make(
    AST.createTransform(from.ast, to.ast, AST.createFinalTransformation(decode, encode))
  ))

/**
    Create a new `Codec` by transforming the input and output of an existing `Schema`
    using the provided mapping functions.

    @category constructors
    @since 1.0.0
  */
export const transform: {
  <I2, A2, A1>(
    to: Codec<I2, A2>,
    decode: (a1: A1) => I2,
    encode: (i2: I2) => A1
  ): <I1>(self: Codec<I1, A1>) => Codec<I1, A2>
  <I1, A1, I2, A2>(
    from: Codec<I1, A1>,
    to: Codec<I2, A2>,
    decode: (a1: A1) => I2,
    encode: (i2: I2) => A1
  ): Codec<I1, A2>
} = dual(
  4,
  <I1, A1, I2, A2>(
    from: Codec<I1, A1>,
    to: Codec<I2, A2>,
    decode: (a1: A1) => I2,
    encode: (i2: I2) => A1
  ): Codec<I1, A2> =>
    transformResult(from, to, (a) => E.right(decode(a)), (b) => E.right(encode(b)))
)

// ---------------------------------------------
// combinators
// ---------------------------------------------

/**
 * @category combinators
 * @since 1.0.0
 */
export const union = <Members extends ReadonlyArray<Codec<any, any>>>(
  ...members: Members
): Codec<From<Members[number]>, To<Members[number]>> =>
  make(AST.createUnion(members.map((m) => m.ast)))

/**
 * @category combinators
 * @since 1.0.0
 */
export const nullable = <From, To>(
  self: Codec<From, To>
): Codec<From | null, To | null> => {
  const parseResult = P.parseResult(self)
  const encodeResult = P.encodeResult(self)
  return transformResult(
    S.nullable(from(self)),
    S.nullable(to(self)),
    (nullable, options) => nullable === null ? PR.success(null) : parseResult(nullable, options),
    (nullable, options) => nullable === null ? PR.success(null) : encodeResult(nullable, options)
  )
}

/**
 * @category combinators
 * @since 1.0.0
 */
export const tuple = <Elements extends ReadonlyArray<Codec<any, any>>>(
  ...elements: Elements
): Codec<
  { readonly [K in keyof Elements]: From<Elements[K]> },
  { readonly [K in keyof Elements]: To<Elements[K]> }
> =>
  make(
    AST.createTuple(elements.map((schema) => AST.createElement(schema.ast, false)), O.none(), true)
  )

/**
 * @category combinators
 * @since 1.0.0
 */
export const rest = <IR, R>(rest: Codec<IR, R>) =>
  <I extends ReadonlyArray<any>, A extends ReadonlyArray<any>>(
    self: Codec<I, A>
  ): Codec<readonly [...I, ...Array<IR>], readonly [...A, ...Array<R>]> => {
    if (AST.isTuple(self.ast)) {
      return make(AST.appendRestElement(self.ast, rest.ast))
    }
    throw new Error("`rest` is not supported on this transformation")
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const element = <IE, E>(element: Codec<IE, E>) =>
  <I extends ReadonlyArray<any>, A extends ReadonlyArray<any>>(
    self: Codec<I, A>
  ): Codec<readonly [...I, IE], readonly [...A, E]> => {
    if (AST.isTuple(self.ast)) {
      return make(AST.appendElement(self.ast, AST.createElement(element.ast, false)))
    }
    throw new Error("`element` is not supported on this transformation")
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const optionalElement = <IE, E>(element: Codec<IE, E>) =>
  <I extends ReadonlyArray<any>, A extends ReadonlyArray<any>>(
    self: Codec<I, A>
  ): Codec<readonly [...I, IE?], readonly [...A, E?]> => {
    if (AST.isTuple(self.ast)) {
      return make(AST.appendElement(self.ast, AST.createElement(element.ast, true)))
    }
    throw new Error("`optionalElement` is not supported on this transformation")
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const array = <I, A>(item: Codec<I, A>): Codec<ReadonlyArray<I>, ReadonlyArray<A>> =>
  make(AST.createTuple([], O.some([item.ast]), true))

/**
 * @category combinators
 * @since 1.0.0
 */
export const nonEmptyArray = <I, A>(
  item: Codec<I, A>
): Codec<readonly [I, ...Array<I>], readonly [A, ...Array<A>]> => pipe(tuple(item), rest(item))

/**
 * @since 1.0.0
 */
export const propertySignature = <I, A>(
  transform: Codec<I, A>,
  annotations: AST.Annotated["annotations"]
): S.PropertySignature<I, false, A, false> =>
  new S.PropertySignatureImpl({
    _tag: "PropertySignature",
    ast: transform.ast,
    annotations
  })

/**
 * @since 1.0.0
 */
export const optional = <I, A>(
  transform: Codec<I, A>,
  annotations?: AST.Annotated["annotations"]
): S.OptionalPropertySignature<I, true, A, true> =>
  new S.PropertySignatureImpl({
    _tag: "Optional",
    ast: transform.ast,
    annotations
  })

/**
 * @since 1.0.0
 */
export type FromOptionalKeys<Fields> = {
  [K in keyof Fields]: Fields[K] extends
    | S.PropertySignature<any, true, any, boolean>
    | S.PropertySignature<never, true, never, boolean> ? K
    : never
}[keyof Fields]

/**
 * @category combinators
 * @since 1.0.0
 */
export const struct = <
  Fields extends Record<
    PropertyKey,
    | Codec<any, any>
    | Codec<never, never>
    | S.PropertySignature<any, boolean, any, boolean>
    | S.PropertySignature<never, boolean, never, boolean>
  >
>(
  fields: Fields
): Codec<
  S.Spread<
    & { readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: From<Fields[K]> }
    & { readonly [K in FromOptionalKeys<Fields>]?: From<Fields[K]> }
  >,
  S.Spread<
    & { readonly [K in Exclude<keyof Fields, S.ToOptionalKeys<Fields>>]: To<Fields[K]> }
    & { readonly [K in S.ToOptionalKeys<Fields>]?: To<Fields[K]> }
  >
> => {
  const ownKeys = I.ownKeys(fields)
  const pss: Array<AST.PropertySignature> = []
  const froms: Array<AST.PropertySignature> = []
  const tos: Array<AST.PropertySignature> = []
  const propertySignatureTransformations: Array<AST.PropertySignatureTransformation> = []
  for (let i = 0; i < ownKeys.length; i++) {
    const key = ownKeys[i]
    const field = fields[key] as any
    if ("config" in field) {
      const config: S.PropertySignatureConfig = field.config
      const from = config.ast
      const to = AST.to(from)
      const annotations = config.annotations
      switch (config._tag) {
        case "PropertySignature":
          pss.push(AST.createPropertySignature(key, from, false, true, annotations))
          froms.push(AST.createPropertySignature(key, from, false, true))
          tos.push(AST.createPropertySignature(key, to, false, true, annotations))
          break
        case "Optional":
          pss.push(AST.createPropertySignature(key, from, true, true, annotations))
          froms.push(AST.createPropertySignature(key, from, true, true))
          tos.push(AST.createPropertySignature(key, to, true, true, annotations))
          break
        case "Default":
          froms.push(AST.createPropertySignature(key, from, true, true))
          tos.push(AST.createPropertySignature(key, to, false, true, annotations))
          propertySignatureTransformations.push(
            AST.createPropertySignatureTransformation(
              key,
              key,
              AST.createFinalPropertySignatureTransformation(
                O.orElse(() => O.some(config.value())),
                identity
              )
            )
          )
          break
        case "Option":
          froms.push(AST.createPropertySignature(key, from, true, true))
          tos.push(
            AST.createPropertySignature(key, S.option(S.make(to)).ast, false, true, annotations)
          )
          propertySignatureTransformations.push(
            AST.createPropertySignatureTransformation(
              key,
              key,
              AST.createFinalPropertySignatureTransformation(O.some, O.flatten)
            )
          )
          break
      }
    } else {
      pss.push(AST.createPropertySignature(key, field.ast, false, true))
      froms.push(AST.createPropertySignature(key, field.ast, false, true))
      tos.push(AST.createPropertySignature(key, AST.to(field.ast), false, true))
    }
  }
  if (RA.isNonEmptyReadonlyArray(propertySignatureTransformations)) {
    return make(
      AST.createTransform(
        AST.createTypeLiteral(froms, []),
        AST.createTypeLiteral(tos, []),
        AST.createTypeLiteralTransformation(
          propertySignatureTransformations
        )
      )
    )
  }
  return make(AST.createTypeLiteral(pss, []))
}

/**
 * @category combinators
 * @since 1.0.0
 */
export const pick = <A, Keys extends ReadonlyArray<keyof A>>(...keys: Keys) =>
  <I extends { [K in keyof A]?: any }>(
    self: Codec<I, A>
  ): Codec<S.Spread<Pick<I, Keys[number]>>, S.Spread<Pick<A, Keys[number]>>> => {
    const ast = self.ast
    if (AST.isTransform(ast)) {
      if (AST.isTypeLiteralTransformation(ast.transformAST)) {
        const propertySignatureTransformations = ast.transformAST.propertySignatureTransformations
          .filter((t) => (keys as ReadonlyArray<PropertyKey>).includes(t.to))
        if (RA.isNonEmptyReadonlyArray(propertySignatureTransformations)) {
          return make(
            AST.createTransform(
              AST.pick(ast.from, keys),
              AST.pick(ast.to, keys),
              AST.createTypeLiteralTransformation(propertySignatureTransformations)
            )
          )
        } else {
          return make(AST.pick(ast.from, keys))
        }
      }
      throw new Error(`pick: cannot handle this kind of transformation`)
    }
    return make(AST.pick(ast, keys))
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const omit = <A, Keys extends ReadonlyArray<keyof A>>(...keys: Keys) =>
  <I extends { [K in keyof A]?: any }>(
    self: Codec<I, A>
  ): Codec<S.Spread<Omit<I, Keys[number]>>, S.Spread<Omit<A, Keys[number]>>> => {
    const ast = self.ast
    if (AST.isTransform(ast)) {
      if (AST.isTypeLiteralTransformation(ast.transformAST)) {
        const propertySignatureTransformations = ast.transformAST.propertySignatureTransformations
          .filter((t) => !(keys as ReadonlyArray<PropertyKey>).includes(t.to))
        if (RA.isNonEmptyReadonlyArray(propertySignatureTransformations)) {
          return make(
            AST.createTransform(
              AST.omit(ast.from, keys),
              AST.omit(ast.to, keys),
              AST.createTypeLiteralTransformation(propertySignatureTransformations)
            )
          )
        } else {
          return make(AST.omit(ast.from, keys))
        }
      }
      throw new Error(`omit: cannot handle this kind of transformation`)
    }
    return make(AST.omit(ast, keys))
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const record = <K extends string | symbol, I, A>(
  key: S.Schema<K>,
  value: Codec<I, A>
): Codec<{ readonly [k in K]: I }, { readonly [k in K]: A }> =>
  make(AST.createRecord(key.ast, value.ast, true))

/**
 * @category combinators
 * @since 1.0.0
 */
export const extend: {
  <IB, B>(
    that: Codec<IB, B>
  ): <I, A>(self: Codec<I, A>) => Codec<S.Spread<I & IB>, S.Spread<A & B>>
  <I, A, IB, B>(
    self: Codec<I, A>,
    that: Codec<IB, B>
  ): Codec<S.Spread<I & IB>, S.Spread<A & B>>
} = dual(
  2,
  <I, A, IB, B>(
    self: Codec<I, A>,
    that: Codec<IB, B>
  ): Codec<S.Spread<I & IB>, S.Spread<A & B>> =>
    make(
      S.intersectUnionMembers(
        AST.isUnion(self.ast) ? self.ast.types : [self.ast],
        AST.isUnion(that.ast) ? that.ast.types : [that.ast]
      )
    )
)

/**
 * @category combinators
 * @since 1.0.0
 */
export const lazy = <I, A>(
  f: () => Codec<I, A>,
  annotations?: AST.Annotated["annotations"]
): Codec<I, A> => make(AST.createLazy(() => f().ast, annotations))

/**
 * Applies a `Schema` transformation.
 *
 * @category combinators
 * @since 1.0.0
 */
export const filter = <A, B extends A>(
  f: (schema: S.Schema<A>) => S.Schema<B>
) =>
  <I>(transform: Codec<I, A>): Codec<I, B> => {
    if (AST.isTransform(transform.ast)) {
      return make(
        AST.createTransform(
          transform.ast.from,
          f(to(transform)).ast,
          transform.ast.transformAST
        )
      )
    }
    const schema = f(to(transform))
    if (AST.isRefinement(schema.ast)) {
      return make(AST.createRefinement(transform.ast, schema.ast.decode, schema.ast.annotations))
    }
    return make(
      AST.createTransform(
        transform.ast,
        schema.ast,
        AST.createFinalTransformation(PR.success, PR.success)
      )
    )
  }

/**
 * Attaches a property signature with the specified key and value to the schema.
 * This API is useful when you want to add a property to your schema which doesn't describe the shape of the input,
 * but rather maps to another schema, for example when you want to add a discriminant to a simple union.
 *
 * @param self - The input schema.
 * @param key - The name of the property to add to the schema.
 * @param value - The value of the property to add to the schema.
 *
 * @example
 * import * as S from "@effect/schema/Schema"
 * import * as C from "@effect/schema/Codec"
 * import { pipe } from "@effect/data/Function"
 *
 * const Circle = S.struct({ radius: S.number })
 * const Square = S.struct({ sideLength: S.number })
 * const Shape = C.union(
 *   pipe(Circle, C.attachPropertySignature("kind", "circle")),
 *   pipe(Square, C.attachPropertySignature("kind", "square"))
 * )
 *
 * assert.deepStrictEqual(C.decode(Shape)({ radius: 10 }), {
 *   kind: "circle",
 *   radius: 10
 * })
 *
 * @category combinators
 * @since 1.0.0
 */
export const attachPropertySignature = <K extends PropertyKey, V extends AST.LiteralValue>(
  key: K,
  value: V
) =>
  <I, A extends object>(
    transform: Codec<I, A>
  ): Codec<I, S.Spread<A & { readonly [k in K]: V }>> =>
    make(AST.createTransform(
      transform.ast,
      pipe(to(transform), extend(struct({ [key]: S.literal(value) }))).ast,
      AST.createTypeLiteralTransformation(
        [
          AST.createPropertySignatureTransformation(
            key,
            key,
            AST.createFinalPropertySignatureTransformation(
              () => O.some(value),
              () => O.none()
            )
          )
        ]
      )
    ))

// ---------------------------------------------
// string
// ---------------------------------------------

/**
 * This combinator allows removing whitespaces from the beginning and end of a string.
 *
 * @category string
 * @since 1.0.0
 */
export const trim = <I>(self: Codec<I, string>): Codec<I, string> =>
  transform(
    self,
    pipe(to(self), S.trimmed()),
    (s) => s.trim(),
    identity
  )

/**
 * This transformation allows removing whitespaces from the beginning and end of a string.
 *
 * @category string
 * @since 1.0.0
 */
export const Trim: Codec<string, string> = trim(S.string)

// ---------------------------------------------
// number
// ---------------------------------------------

/**
 * Clamps a number between a minimum and a maximum value.
 *
 * @category number
 * @since 1.0.0
 */
export const clamp = (min: number, max: number) =>
  <I>(self: Codec<I, number>): Codec<I, number> =>
    transform(
      self,
      pipe(to(self), S.between(min, max)),
      (n) => N.clamp(n, min, max),
      identity
    )

/**
  This combinator transforms a `string` into a `number` by parsing the string using `parseFloat`.

  The following special string values are supported: "NaN", "Infinity", "-Infinity".

  @category number
  @since 1.0.0
*/
export const numberFromString = <I>(self: Codec<I, string>): Codec<I, number> =>
  transformResult(
    self,
    S.number,
    (s, _, ast) => {
      if (s === "NaN") {
        return PR.success(NaN)
      }
      if (s === "Infinity") {
        return PR.success(Infinity)
      }
      if (s === "-Infinity") {
        return PR.success(-Infinity)
      }
      const n = parseFloat(s)
      return isNaN(n) ? PR.failure(PR.type(ast, s)) : PR.success(n)
    },
    (n) => PR.success(String(n))
  )

/**
 * This transformation converts a `string` into a `number` by parsing the string using `parseFloat`.
 *
 * The following special string values are supported: "NaN", "Infinity", "-Infinity".
 *
 * @category number
 * @since 1.0.0
 */
export const NumberFromString: Codec<string, number> = numberFromString(S.string)

// ---------------------------------------------
// boolean
// ---------------------------------------------

/**
 * Negates a boolean value
 *
 * @category boolean
 * @since 1.0.0
 */
export const not = <I>(self: Codec<I, boolean>): Codec<I, boolean> =>
  transform(
    self,
    to(self),
    (b) => !b,
    (b) => !b
  )

// ---------------------------------------------
// bigint
// ---------------------------------------------

/**
 * Clamps a bigint between a minimum and a maximum value.
 *
 * @category bigint
 * @since 1.0.0
 */
export const clampBigint = (min: bigint, max: bigint) =>
  <I>(self: Codec<I, bigint>): Codec<I, bigint> =>
    transform(
      self,
      pipe(to(self), S.betweenBigint(min, max)),
      (input) => B.clamp(input, min, max),
      identity
    )

// ---------------------------------------------
// Date
// ---------------------------------------------

/**
  A combinator that transforms a `string` into a valid `Date`.

  @category Date
  @since 1.0.0
*/
export const dateFromString = <I>(self: Codec<I, string>): Codec<I, Date> =>
  transformResult(
    self,
    S.ValidDate,
    (input) => PR.success(new Date(input)),
    (date) => PR.success(date.toISOString())
  )

const _Date: Codec<string, Date> = dateFromString(S.string)

export {
  /**
   * A schema that transforms a `string` into a `Date`.
   *
   * @category Date
   * @since 1.0.0
   */
  _Date as Date
}

// ---------------------------------------------
// Option
// ---------------------------------------------

/**
 * @category Option
 * @since 1.0.0
 */
export const optionFromSelf = <I, A>(value: Codec<I, A>): Codec<Option<I>, Option<A>> => {
  const parseResult = P.parseResult(value)
  const encodeResult = P.encodeResult(value)
  return transformResult(
    S.option(from(value)),
    S.option(to(value)),
    (option, options) =>
      O.isNone(option) ?
        PR.success(O.none()) :
        PR.map(parseResult(option.value, options), O.some),
    (option, options) =>
      O.isNone(option) ?
        PR.success(O.none()) :
        PR.map(encodeResult(option.value, options), O.some)
  )
}

const optionAsJson = <A>(value: S.Schema<A>) =>
  S.union(S.struct({ _tag: S.literal("None") }), S.struct({ _tag: S.literal("Some"), value }))

/**
 * @category Option
 * @since 1.0.0
 */
export const option = <I, A>(
  value: Codec<I, A>
): Codec<
  { readonly _tag: "None" } | { readonly _tag: "Some"; readonly value: I },
  Option<A>
> => {
  const parseResult = P.parseResult(value)
  const encodeResult = P.encodeResult(value)
  return transformResult(
    optionAsJson(from(value)),
    S.option(to(value)),
    (optionAsJson, options) =>
      optionAsJson._tag === "None" ?
        PR.success(O.none()) :
        PR.map(parseResult(optionAsJson.value, options), O.some),
    (o, options) =>
      O.isNone(o) ?
        PR.success({ _tag: "None" as const }) :
        PR.map(encodeResult(o.value, options), (value) => ({ _tag: "Some" as const, value }))
  )
}

/**
 * @category option
 * @since 1.0.0
 */
export const optionFromNullable = <I, A>(
  value: Codec<I, A>
): Codec<I | null, Option<A>> => {
  const parseResult = P.parseResult(value)
  const encodeResult = P.encodeResult(value)
  return transformResult(
    S.nullable(from(value)),
    S.option(to(value)),
    (nullable, options) =>
      nullable === null ? PR.success(O.none()) : PR.map(parseResult(nullable, options), O.some),
    (o, options) => O.isNone(o) ? PR.success(null) : encodeResult(o.value, options)
  )
}

// ---------------------------------------------
// Either
// ---------------------------------------------

/**
 * @category Either
 * @since 1.0.0
 */
export const eitherFromSelf = <IE, E, IA, A>(
  left: Codec<IE, E>,
  right: Codec<IA, A>
): Codec<Either<IE, IA>, Either<E, A>> => {
  const parseResultLeft = P.parseResult(left)
  const parseResultRight = P.parseResult(right)
  const encodeResultLeft = P.encodeResult(left)
  const encodeResultRight = P.encodeResult(right)
  return transformResult(
    S.either(from(left), from(right)),
    S.either(to(left), to(right)),
    (either, options) =>
      E.isLeft(either) ?
        PR.map(parseResultLeft(either.left, options), E.left) :
        PR.map(parseResultRight(either.right, options), E.right),
    (either, options) =>
      E.isLeft(either) ?
        PR.map(encodeResultLeft(either.left, options), E.left) :
        PR.map(encodeResultRight(either.right, options), E.right)
  )
}

const eitherAsJson = <E, A>(left: S.Schema<E>, right: S.Schema<A>) =>
  S.union(
    S.struct({ _tag: S.literal("Left"), left }),
    S.struct({ _tag: S.literal("Right"), right })
  )

/**
 * @category Either
 * @since 1.0.0
 */
export const either = <IE, E, IA, A>(
  left: Codec<IE, E>,
  right: Codec<IA, A>
): Codec<
  { readonly _tag: "Left"; readonly left: IE } | { readonly _tag: "Right"; readonly right: IA },
  Either<E, A>
> => {
  const parseResultLeft = P.parseResult(left)
  const parseResultRight = P.parseResult(right)
  const encodeResultLeft = P.encodeResult(left)
  const encodeResultRight = P.encodeResult(right)
  return transformResult(
    eitherAsJson(from(left), from(right)),
    S.either(to(left), to(right)),
    (eitherAsJson, options) =>
      eitherAsJson._tag === "Left" ?
        PR.map(parseResultLeft(eitherAsJson.left, options), E.left) :
        PR.map(parseResultRight(eitherAsJson.right, options), E.right),
    (either, options) =>
      E.isLeft(either) ?
        PR.map(
          encodeResultLeft(either.left, options),
          (left) => ({ _tag: "Left" as const, left })
        ) :
        PR.map(
          encodeResultRight(either.right, options),
          (right) => ({ _tag: "Right" as const, right })
        )
  )
}

// ---------------------------------------------
// ReadonlyMap
// ---------------------------------------------

/**
 * @category ReadonlyMap
 * @since 1.0.0
 */
export const readonlyMapFromSelf = <IK, K, IV, V>(
  key: Codec<IK, K>,
  value: Codec<IV, V>
): Codec<ReadonlyMap<IK, IV>, ReadonlyMap<K, V>> => {
  const entries = array(tuple(key, value))
  const parseResult = P.parseResult(entries)
  const encodeResult = P.encodeResult(entries)
  return transformResult(
    S.readonlyMap(from(key), from(value)),
    S.readonlyMap(to(key), to(value)),
    (map, options) => PR.map(parseResult(Array.from(map.entries()), options), (as) => new Map(as)),
    (map, options) => PR.map(encodeResult(Array.from(map.entries()), options), (as) => new Map(as))
  )
}

/**
 * @category ReadonlyMap
 * @since 1.0.0
 */
export const readonlyMap = <IK, K, IV, V>(
  key: Codec<IK, K>,
  value: Codec<IV, V>
): Codec<ReadonlyArray<readonly [IK, IV]>, ReadonlyMap<K, V>> =>
  transform(
    array(tuple(key, value)),
    S.readonlyMap(to(key), to(value)),
    (entries) => new Map(entries),
    (map) => Array.from(map.entries())
  )

// ---------------------------------------------
// ReadonlySet
// ---------------------------------------------

/**
 * @category ReadonlySet
 * @since 1.0.0
 */
export const readonlySetFromSelf = <I, A>(
  item: Codec<I, A>
): Codec<ReadonlySet<I>, ReadonlySet<A>> => {
  const parseResult = P.parseResult(array(item))
  const encodeResult = P.encodeResult(array(item))
  return transformResult(
    S.readonlySet(from(item)),
    S.readonlySet(to(item)),
    (set, options) => PR.map(parseResult(Array.from(set.values()), options), (as) => new Set(as)),
    (set, options) => PR.map(encodeResult(Array.from(set.values()), options), (as) => new Set(as))
  )
}

/**
 * @category ReadonlySet
 * @since 1.0.0
 */
export const readonlySet = <I, A>(
  item: Codec<I, A>
): Codec<ReadonlyArray<I>, ReadonlySet<A>> =>
  transform(
    array(item),
    S.readonlySet(to(item)),
    (as) => new Set(as),
    (set) => Array.from(set)
  )

// ---------------------------------------------
// Chunk
// ---------------------------------------------

/**
 * @category Chunk
 * @since 1.0.0
 */
export const chunkFromSelf = <I, A>(item: Codec<I, A>): Codec<Chunk<I>, Chunk<A>> => {
  const parseResult = P.parseResult(array(item))
  const encodeResult = P.encodeResult(array(item))
  return transformResult(
    S.chunk(from(item)),
    S.chunk(to(item)),
    (chunk, options) => PR.map(parseResult(C.toReadonlyArray(chunk), options), C.fromIterable),
    (chunk, options) => PR.map(encodeResult(C.toReadonlyArray(chunk), options), C.fromIterable)
  )
}

/**
 * @category Chunk
 * @since 1.0.0
 */
export const chunk = <I, A>(item: Codec<I, A>): Codec<ReadonlyArray<I>, Chunk<A>> =>
  transform(array(item), S.chunk(to(item)), C.fromIterable, C.toReadonlyArray)

// ---------------------------------------------
// Data
// ---------------------------------------------

const fromData = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  data: D.Data<A>
): A => Array.isArray(data) ? Array.from(data) : Object.assign({}, data) as any

/**
 * @category Data
 * @since 1.0.0
 */
export const dataFromSelf = <
  I extends Readonly<Record<string, any>> | ReadonlyArray<any>,
  A extends Readonly<Record<string, any>> | ReadonlyArray<any>
>(
  item: Codec<I, A>
): Codec<D.Data<I>, D.Data<A>> => {
  const parseResult = P.parseResult(item)
  const encodeResult = P.encodeResult(item)
  return transformResult(
    S.data(from(item)),
    S.data(to(item)),
    (data, options) => PR.map(parseResult(fromData(data), options), S.toData),
    (data, options) => PR.map(encodeResult(fromData(data), options), S.toData)
  )
}

/**
 * @category Data
 * @since 1.0.0
 */
export const data = <
  I extends Readonly<Record<string, any>> | ReadonlyArray<any>,
  A extends Readonly<Record<string, any>> | ReadonlyArray<any>
>(
  item: Codec<I, A>
): Codec<I, D.Data<A>> =>
  transform(
    item,
    S.data(to(item)),
    S.toData,
    (data) => Array.isArray(data) ? Array.from(data) : Object.assign({}, data) as any
  )
