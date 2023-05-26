/**
 * @since 1.0.0
 */

import * as B from "@effect/data/Bigint"
import type { Chunk } from "@effect/data/Chunk"
import * as C from "@effect/data/Chunk"
import type * as D from "@effect/data/Data"
import type { Either } from "@effect/data/Either"
import * as E from "@effect/data/Either"
import type { LazyArg } from "@effect/data/Function"
import { dual, identity, pipe } from "@effect/data/Function"
import * as N from "@effect/data/Number"
import type { Option } from "@effect/data/Option"
import * as O from "@effect/data/Option"
import type { Arbitrary } from "@effect/schema/Arbitrary"
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
export interface Transform<From, To> {
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
export const from = <I, A>(schema: Transform<I, A>): S.Schema<I> => S.make(AST.from(schema.ast))

/**
 * @since 1.0.0
 */
export const to = <I, A>(schema: Transform<I, A>): S.Schema<A> => S.make(AST.to(schema.ast))

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
export const make = <I, A>(ast: AST.AST): Transform<I, A> => ({ ast }) as any

// ---------------------------------------------
// combinators
// ---------------------------------------------

/**
 * @category combinators
 * @since 1.0.0
 */
export const union = <Members extends ReadonlyArray<Transform<any, any>>>(
  ...members: Members
): Transform<From<Members[number]>, To<Members[number]>> =>
  make(AST.createUnion(members.map((m) => m.ast)))

/**
 * @category combinators
 * @since 1.0.0
 */
export const nullable = <From, To>(self: Transform<From, To>): Transform<From | null, To | null> =>
  union(S.null, self)

/**
 * @category combinators
 * @since 1.0.0
 */
export const tuple = <Elements extends ReadonlyArray<Transform<any, any>>>(
  ...elements: Elements
): Transform<
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
export const rest = <IR, R>(rest: Transform<IR, R>) =>
  <I extends ReadonlyArray<any>, A extends ReadonlyArray<any>>(
    self: Transform<I, A>
  ): Transform<readonly [...I, ...Array<IR>], readonly [...A, ...Array<R>]> => {
    if (AST.isTuple(self.ast)) {
      return make(AST.appendRestElement(self.ast, rest.ast))
    }
    throw new Error("`rest` is not supported on this transformation")
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const element = <IE, E>(element: Transform<IE, E>) =>
  <I extends ReadonlyArray<any>, A extends ReadonlyArray<any>>(
    self: Transform<I, A>
  ): Transform<readonly [...I, IE], readonly [...A, E]> => {
    if (AST.isTuple(self.ast)) {
      return make(AST.appendElement(self.ast, AST.createElement(element.ast, false)))
    }
    throw new Error("`element` is not supported on this transformation")
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const optionalElement = <IE, E>(element: Transform<IE, E>) =>
  <I extends ReadonlyArray<any>, A extends ReadonlyArray<any>>(
    self: Transform<I, A>
  ): Transform<readonly [...I, IE?], readonly [...A, E?]> => {
    if (AST.isTuple(self.ast)) {
      return make(AST.appendElement(self.ast, AST.createElement(element.ast, true)))
    }
    throw new Error("`optionalElement` is not supported on this transformation")
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const array = <I, A>(item: Transform<I, A>): Transform<ReadonlyArray<I>, ReadonlyArray<A>> =>
  make(AST.createTuple([], O.some([item.ast]), true))

/**
 * @category combinators
 * @since 1.0.0
 */
export const nonEmptyArray = <I, A>(
  item: Transform<I, A>
): Transform<readonly [I, ...Array<I>], readonly [A, ...Array<A>]> => pipe(tuple(item), rest(item))

/**
 * @since 1.0.0
 */
export interface TransformPropertySignature<From, FromIsOptional, To, ToIsOptional>
  extends S.PropertySignature<From, FromIsOptional, To, ToIsOptional>
{
  readonly optional: () => TransformPropertySignature<From, true, To, true>
  readonly withDefault: (value: () => To) => TransformPropertySignature<From, true, To, false>
  readonly toOption: () => TransformPropertySignature<From, true, Option<To>, false>
}

class TransformPropertySignatureImpl<From, FromIsOptional, To, ToIsOptional>
  implements TransformPropertySignature<From, FromIsOptional, To, ToIsOptional>
{
  readonly From!: (_: From) => From
  readonly FromIsOptional!: FromIsOptional
  readonly To!: (_: To) => To
  readonly ToIsOptional!: ToIsOptional

  constructor(
    readonly _from: AST.AST,
    readonly _annotations?: AST.Annotated["annotations"],
    readonly _optional?:
      | { readonly to: "optional" }
      | { readonly to: "Option" }
      | {
        readonly to: "default"
        readonly value: LazyArg<To>
      }
  ) {}

  optional(): TransformPropertySignature<From, true, To, true> {
    if (this._optional) {
      throw new Error(`duplicate optional configuration`)
    }
    return new TransformPropertySignatureImpl(this._from, this._annotations, { to: "optional" })
  }

  withDefault(value: () => To): TransformPropertySignature<From, true, To, false> {
    if (this._optional && this._optional.to !== "optional") {
      throw new Error(`duplicate optional configuration`)
    }
    return new TransformPropertySignatureImpl(this._from, this._annotations, {
      to: "default",
      value
    })
  }

  toOption(): TransformPropertySignature<From, true, Option<To>, false> {
    if (this._optional && this._optional.to !== "optional") {
      throw new Error(`duplicate optional configuration`)
    }
    return new TransformPropertySignatureImpl(this._from, this._annotations, { to: "Option" })
  }
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const propertySignature = <I, A>(
  schema: Transform<I, A>,
  annotations?: AST.Annotated["annotations"]
): TransformPropertySignature<I, false, A, false> =>
  new TransformPropertySignatureImpl(schema.ast, annotations)

/**
 * @since 1.0.0
 */
export const optional = <I, A>(
  schema: Transform<I, A>,
  annotations?: AST.Annotated["annotations"]
): TransformPropertySignature<I, true, A, true> => propertySignature(schema, annotations).optional()

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
    | Transform<any, any>
    | Transform<never, never>
    | S.PropertySignature<any, boolean, any, boolean>
    | S.PropertySignature<never, boolean, never, boolean>
  >
>(
  fields: Fields
): Transform<
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
  const propertySignatures: Array<AST.PropertySignature> = []
  const fromPropertySignatures: Array<AST.PropertySignature> = []
  const toPropertySignatures: Array<AST.PropertySignature> = []
  const propertySignatureTransformations: Array<AST.PropertySignatureTransformation> = []
  for (let i = 0; i < ownKeys.length; i++) {
    const key = ownKeys[i]
    const field = fields[key] as any
    if ("_from" in field) {
      const optional = field._optional
      if (optional) {
        switch (optional.to) {
          case "optional": {
            propertySignatures.push(
              AST.createPropertySignature(key, field._from, true, true, field._annotations)
            )
            fromPropertySignatures.push(AST.createPropertySignature(key, field._from, true, true))
            toPropertySignatures.push(
              AST.createPropertySignature(
                key,
                AST.to(field._from),
                true,
                true,
                field._annotations
              )
            )
            break
          }
          case "default": {
            fromPropertySignatures.push(AST.createPropertySignature(key, field._from, true, true))
            toPropertySignatures.push(
              AST.createPropertySignature(
                key,
                AST.to(field._from),
                false,
                true,
                field._annotations
              )
            )
            propertySignatureTransformations.push(AST.createPropertySignatureTransformation(
              key,
              key,
              O.orElse(() => O.some(optional.value())),
              identity
            ))
            break
          }
          case "Option": {
            fromPropertySignatures.push(AST.createPropertySignature(key, field._from, true, true))
            toPropertySignatures.push(
              AST.createPropertySignature(
                key,
                S.option(S.make(AST.to(field._from))).ast,
                false,
                true,
                field._annotations
              )
            )
            propertySignatureTransformations.push(AST.createPropertySignatureTransformation(
              key,
              key,
              O.some,
              O.flatten
            ))
            break
          }
        }
      } else {
        propertySignatures.push(
          AST.createPropertySignature(key, field._from, false, true, field._annotations)
        )
        fromPropertySignatures.push(AST.createPropertySignature(key, field._from, false, true))
        toPropertySignatures.push(
          AST.createPropertySignature(key, AST.to(field._from), false, true, field._annotations)
        )
      }
    } else {
      propertySignatures.push(AST.createPropertySignature(key, field.ast, false, true))
      fromPropertySignatures.push(AST.createPropertySignature(key, field.ast, false, true))
      toPropertySignatures.push(AST.createPropertySignature(key, AST.to(field.ast), false, true))
    }
  }
  if (propertySignatureTransformations.length > 0) {
    return make(
      AST.createTransformByPropertySignatureTransformations(
        AST.createTypeLiteral(fromPropertySignatures, []),
        AST.createTypeLiteral(toPropertySignatures, []),
        propertySignatureTransformations
      )
    )
  } else {
    return make(AST.createTypeLiteral(propertySignatures, []))
  }
}

/**
 * @category combinators
 * @since 1.0.0
 */
export const pick = <A, Keys extends ReadonlyArray<keyof A>>(...keys: Keys) =>
  <I extends { [K in keyof A]?: any }>(
    self: Transform<I, A>
  ): Transform<S.Spread<Pick<I, Keys[number]>>, S.Spread<Pick<A, Keys[number]>>> => {
    const ast = self.ast
    if (AST.isTransform(ast) && ast.propertySignatureTransformations.length > 0) {
      return make(
        AST.createTransformByPropertySignatureTransformations(
          AST.pick(ast.from, keys),
          AST.pick(ast.to, keys),
          ast.propertySignatureTransformations.filter((t) =>
            (keys as ReadonlyArray<PropertyKey>).includes(t.to)
          )
        )
      )
    }
    return make(AST.pick(ast, keys))
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const omit = <A, Keys extends ReadonlyArray<keyof A>>(...keys: Keys) =>
  <I extends { [K in keyof A]?: any }>(
    self: Transform<I, A>
  ): Transform<S.Spread<Omit<I, Keys[number]>>, S.Spread<Omit<A, Keys[number]>>> => {
    const ast = self.ast
    if (AST.isTransform(ast) && ast.propertySignatureTransformations.length > 0) {
      return make(
        AST.createTransformByPropertySignatureTransformations(
          AST.omit(ast.from, keys),
          AST.omit(ast.to, keys),
          ast.propertySignatureTransformations.filter((t) =>
            !(keys as ReadonlyArray<PropertyKey>).includes(t.to)
          )
        )
      )
    }
    return make(AST.omit(ast, keys))
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const record = <K extends string | symbol, I, A>(
  key: S.Schema<K>,
  value: Transform<I, A>
): Transform<{ readonly [k in K]: I }, { readonly [k in K]: A }> =>
  make(AST.createRecord(key.ast, value.ast, true))

/**
 * @category combinators
 * @since 1.0.0
 */
export const extend: {
  <IB, B>(
    that: Transform<IB, B>
  ): <I, A>(self: Transform<I, A>) => Transform<S.Spread<I & IB>, S.Spread<A & B>>
  <I, A, IB, B>(
    self: Transform<I, A>,
    that: Transform<IB, B>
  ): Transform<S.Spread<I & IB>, S.Spread<A & B>>
} = dual(
  2,
  <I, A, IB, B>(
    self: Transform<I, A>,
    that: Transform<IB, B>
  ): Transform<S.Spread<I & IB>, S.Spread<A & B>> =>
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
  f: () => Transform<I, A>,
  annotations?: AST.Annotated["annotations"]
): Transform<I, A> => make(AST.createLazy(() => f().ast, annotations))

/**
 * @category model
 * @since 1.0.0
 */
export type AnnotationOptions<A> = {
  typeId?: AST.TypeAnnotation | { id: AST.TypeAnnotation; params: unknown }
  message?: AST.MessageAnnotation<A>
  identifier?: AST.IdentifierAnnotation
  title?: AST.TitleAnnotation
  description?: AST.DescriptionAnnotation
  examples?: AST.ExamplesAnnotation
  documentation?: AST.DocumentationAnnotation
  jsonSchema?: AST.JSONSchemaAnnotation
  arbitrary?: (...args: ReadonlyArray<Arbitrary<any>>) => Arbitrary<any>
}

/**
 * Applies a `Schema` transformation.
 *
 * @category combinators
 * @since 1.0.0
 */
export const filter = <A, B extends A>(
  f: (schema: S.Schema<A>) => S.Schema<B>
) =>
  <I>(transform: Transform<I, A>): Transform<I, B> => {
    const schema = f(to(transform))
    if (AST.isRefinement(schema.ast)) {
      return make(AST.createRefinement(transform.ast, schema.ast.decode, schema.ast.annotations))
    }
    return make(AST.createTransform(transform.ast, schema.ast, PR.success, PR.success))
  }

/**
  Create a new `Schema` by transforming the input and output of an existing `Schema`
  using the provided decoding functions.

  @category combinators
  @since 1.0.0
 */
export const transformResult: {
  <I2, A2, A1>(
    to: Transform<I2, A2>,
    decode: (a1: A1, options: ParseOptions, self: AST.AST) => ParseResult<I2>,
    encode: (i2: I2, options: ParseOptions, self: AST.AST) => ParseResult<A1>
  ): <I1>(self: Transform<I1, A1>) => Transform<I1, A2>
  <I1, A1, I2, A2>(
    from: Transform<I1, A1>,
    to: Transform<I2, A2>,
    decode: (a1: A1, options: ParseOptions, self: AST.AST) => ParseResult<I2>,
    encode: (i2: I2, options: ParseOptions, self: AST.AST) => ParseResult<A1>
  ): Transform<I1, A2>
} = dual(4, <I1, A1, I2, A2>(
  from: Transform<I1, A1>,
  to: Transform<I2, A2>,
  decode: (a1: A1, options: ParseOptions, self: AST.AST) => ParseResult<I2>,
  encode: (i2: I2, options: ParseOptions, self: AST.AST) => ParseResult<A1>
): Transform<I1, A2> => make(AST.createTransform(from.ast, to.ast, decode, encode)))

/**
  Create a new `Schema` by transforming the input and output of an existing `Schema`
  using the provided mapping functions.

  @category combinators
  @since 1.0.0
*/
export const transform: {
  <I2, A2, A1>(
    to: Transform<I2, A2>,
    decode: (a1: A1) => I2,
    encode: (i2: I2) => A1
  ): <I1>(self: Transform<I1, A1>) => Transform<I1, A2>
  <I1, A1, I2, A2>(
    from: Transform<I1, A1>,
    to: Transform<I2, A2>,
    decode: (a1: A1) => I2,
    encode: (i2: I2) => A1
  ): Transform<I1, A2>
} = dual(
  4,
  <I1, A1, I2, A2>(
    from: Transform<I1, A1>,
    to: Transform<I2, A2>,
    decode: (a1: A1) => I2,
    encode: (i2: I2) => A1
  ): Transform<I1, A2> =>
    transformResult(from, to, (a) => E.right(decode(a)), (b) => E.right(encode(b)))
)

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
 * import * as T from "@effect/schema/Transform"
 * import { pipe } from "@effect/data/Function"
 *
 * const Circle = S.struct({ radius: S.number })
 * const Square = S.struct({ sideLength: S.number })
 * const Shape = T.union(
 *   pipe(Circle, T.attachPropertySignature("kind", "circle")),
 *   pipe(Square, T.attachPropertySignature("kind", "square"))
 * )
 *
 * assert.deepStrictEqual(T.decode(Shape)({ radius: 10 }), {
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
    schema: Transform<I, A>
  ): Transform<I, S.Spread<A & { readonly [k in K]: V }>> =>
    make(AST.createTransformByPropertySignatureTransformations(
      schema.ast,
      pipe(to(schema), extend(struct({ [key]: S.literal(value) }))).ast,
      [AST.createPropertySignatureTransformation(
        key,
        key,
        () => O.some(value),
        () => O.none()
      )]
    ))

// ---------------------------------------------
// Chunk
// ---------------------------------------------

/**
 * @category constructors
 * @since 1.0.0
 */
export const chunkFromSelf = <I, A>(item: Transform<I, A>): Transform<Chunk<I>, Chunk<A>> => {
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
 * @category combinators
 * @since 1.0.0
 */
export const chunk = <I, A>(item: Transform<I, A>): Transform<ReadonlyArray<I>, Chunk<A>> =>
  transform(array(item), S.chunk(to(item)), C.fromIterable, C.toReadonlyArray)

// ---------------------------------------------
// Data
// ---------------------------------------------

const fromData = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  data: D.Data<A>
): A => Array.isArray(data) ? Array.from(data) : Object.assign({}, data) as any

/**
 * @category combinators
 * @since 1.0.0
 */
export const dataFromSelf = <
  I extends Readonly<Record<string, any>> | ReadonlyArray<any>,
  A extends Readonly<Record<string, any>> | ReadonlyArray<any>
>(
  item: Transform<I, A>
): Transform<D.Data<I>, D.Data<A>> => {
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
 * @category combinators
 * @since 1.0.0
 */
export const data = <
  I extends Readonly<Record<string, any>> | ReadonlyArray<any>,
  A extends Readonly<Record<string, any>> | ReadonlyArray<any>
>(
  item: Transform<I, A>
): Transform<I, D.Data<A>> =>
  transform(
    item,
    S.data(to(item)),
    S.toData,
    (data) => Array.isArray(data) ? Array.from(data) : Object.assign({}, data) as any
  )

// ---------------------------------------------
// Date
// ---------------------------------------------

/**
  A combinator that transforms a `string` into a valid `Date`.

  @category Date
  @since 1.0.0
*/
export const dateFromString = <I>(self: Transform<I, string>): Transform<I, Date> =>
  transformResult(
    self,
    S.ValidDate,
    (input) => PR.success(new Date(input)),
    (date) => PR.success(date.toISOString())
  )

const _Date: Transform<string, Date> = dateFromString(S.string)

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
// Either
// ---------------------------------------------

const eitherInline = <IE, E, IA, A>(left: Transform<IE, E>, right: Transform<IA, A>) =>
  union(
    struct({
      _tag: S.literal("Left"),
      left
    }),
    struct({
      _tag: S.literal("Right"),
      right
    })
  )

/**
 * @category combinators
 * @since 1.0.0
 */
export const eitherFromSelf = <IE, E, IA, A>(
  left: Transform<IE, E>,
  right: Transform<IA, A>
): Transform<Either<IE, IA>, Either<E, A>> => {
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

/**
 * @category combinators
 * @since 1.0.0
 */
export const either = <IE, E, IA, A>(
  left: Transform<IE, E>,
  right: Transform<IA, A>
): Transform<
  { readonly _tag: "Left"; readonly left: IE } | { readonly _tag: "Right"; readonly right: IA },
  Either<E, A>
> =>
  transform(
    eitherInline(left, right),
    S.either(to(left), to(right)),
    (a) => a._tag === "Left" ? E.left(a.left) : E.right(a.right),
    E.match(
      (left) => ({ _tag: "Left" as const, left }),
      (right) => ({ _tag: "Right" as const, right })
    )
  )

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
  <I>(self: Transform<I, number>): Transform<I, number> =>
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
export const numberFromString = <I>(self: Transform<I, string>): Transform<I, number> =>
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
export const NumberFromString: Transform<string, number> = numberFromString(S.string)

// ---------------------------------------------
// boolean
// ---------------------------------------------

/**
 * Negates a boolean value
 *
 * @category boolean
 * @since 1.0.0
 */
export const not = <I>(self: Transform<I, boolean>): Transform<I, boolean> =>
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
  <I>(self: Transform<I, bigint>): Transform<I, bigint> =>
    transform(
      self,
      pipe(to(self), S.betweenBigint(min, max)),
      (input) => B.clamp(input, min, max),
      identity
    )

// ---------------------------------------------
// Option
// ---------------------------------------------

const optionInline = <I, A>(value: Transform<I, A>) =>
  union(
    struct({
      _tag: S.literal("None")
    }),
    struct({
      _tag: S.literal("Some"),
      value
    })
  )

/**
 * @category combinators
 * @since 1.0.0
 */
export const optionFromSelf = <I, A>(value: Transform<I, A>): Transform<Option<I>, Option<A>> => {
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

/**
 * @category combinators
 * @since 1.0.0
 */
export const option = <I, A>(
  value: Transform<I, A>
): Transform<{ readonly _tag: "None" } | { readonly _tag: "Some"; readonly value: I }, Option<A>> =>
  transform(
    optionInline(value),
    S.option(to(value)),
    (o) => o._tag === "None" ? O.none() : O.some(o.value),
    O.match(() => ({ _tag: "None" as const }), (value) => ({ _tag: "Some" as const, value }))
  )

/**
 * @category option
 * @since 1.0.0
 */
export const optionFromNullable = <I, A>(
  value: Transform<I, A>
): Transform<I | null, Option<A>> =>
  transform(nullable(value), S.option(to(value)), O.fromNullable, O.getOrNull)

// ---------------------------------------------
// ReadonlyMap
// ---------------------------------------------

/**
 * @category constructors
 * @since 1.0.0
 */
export const readonlyMapFromSelf = <IK, K, IV, V>(
  key: Transform<IK, K>,
  value: Transform<IV, V>
): Transform<ReadonlyMap<IK, IV>, ReadonlyMap<K, V>> => {
  const parseResult = P.parseResult(array(tuple(key, value)))
  const encodeResult = P.encodeResult(array(tuple(key, value)))
  return transformResult(
    S.readonlyMap(from(key), from(value)),
    S.readonlyMap(to(key), to(value)),
    (map, options) => PR.map(parseResult(Array.from(map.entries()), options), (as) => new Map(as)),
    (map, options) => PR.map(encodeResult(Array.from(map.entries()), options), (as) => new Map(as))
  )
}

/**
 * @category combinators
 * @since 1.0.0
 */
export const readonlyMap = <IK, K, IV, V>(
  key: Transform<IK, K>,
  value: Transform<IV, V>
): Transform<ReadonlyArray<readonly [IK, IV]>, ReadonlyMap<K, V>> =>
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
 * @category constructors
 * @since 1.0.0
 */
export const readonlySetFromSelf = <I, A>(
  item: Transform<I, A>
): Transform<ReadonlySet<I>, ReadonlySet<A>> => {
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
 * @category combinators
 * @since 1.0.0
 */
export const readonlySet = <I, A>(
  item: Transform<I, A>
): Transform<ReadonlyArray<I>, ReadonlySet<A>> =>
  transform(
    array(item),
    S.readonlySet(to(item)),
    (as) => new Set(as),
    (set) => Array.from(set)
  )

// ---------------------------------------------
// string
// ---------------------------------------------

/**
 * This combinator allows removing whitespaces from the beginning and end of a string.
 *
 * @category string
 * @since 1.0.0
 */
export const trim = <I>(self: Transform<I, string>): Transform<I, string> =>
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
export const Trim: Transform<string, string> = trim(S.string)
