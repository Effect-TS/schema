/**
 * @since 1.0.0
 */

import * as B from "@effect/data/Bigint"
import type { Brand } from "@effect/data/Brand"
import type { Chunk } from "@effect/data/Chunk"
import * as C from "@effect/data/Chunk"
import type * as D from "@effect/data/Data"
import type { Either } from "@effect/data/Either"
import * as E from "@effect/data/Either"
import { dual, identity } from "@effect/data/Function"
import * as N from "@effect/data/Number"
import type { Option } from "@effect/data/Option"
import * as O from "@effect/data/Option"
import type { Pipeable } from "@effect/data/Pipeable"
import { pipeArguments } from "@effect/data/Pipeable"
import { isObject, type Predicate, type Refinement } from "@effect/data/Predicate"
import * as RA from "@effect/data/ReadonlyArray"
import * as Str from "@effect/data/String"
import type { ParseOptions } from "@effect/schema/AST"
import * as AST from "@effect/schema/AST"
import * as I from "@effect/schema/internal/common"
import * as P from "@effect/schema/Parser"
import type { ParseResult } from "@effect/schema/ParseResult"
import * as PR from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"

// ---------------------------------------------
// model
// ---------------------------------------------

/**
 * @since 1.0.0
 * @category symbol
 */
export type CodecTypeId = S.CodecTypeId

/**
 * @category model
 * @since 1.0.0
 */
export interface Codec<From, To> extends Pipeable {
  readonly _codecId: CodecTypeId
  readonly From: (_: From) => From
  readonly To: (_: To) => To
  readonly ast: AST.AST
}

/**
 * @since 1.0.0
 */
export type From<S extends { readonly From: (..._: any) => any }> = Parameters<S["From"]>[0]

/**
 * @since 1.0.0
 */
export type To<S extends { readonly To: (..._: any) => any }> = Parameters<S["To"]>[0]

// ---------------------------------------------
// converters
// ---------------------------------------------

/**
 * @category converters
 * @since 1.0.0
 */
export const from = <I, A>(codec: Codec<I, A>): S.Schema<I> => S.make(AST.from(codec.ast))

/**
 * @category converters
 * @since 1.0.0
 */
export const to = <I, A>(codec: Codec<I, A>): S.Schema<A> => S.make(AST.to(codec.ast))

// ---------------------------------------------
// decoding / encoding / parsing
// ---------------------------------------------

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
   * @category decoding
   * @since 1.0.0
   */
  decodeSync,
  /**
   * @category encoding
   * @since 1.0.0
   */
  encode,
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
   * @category encoding
   * @since 1.0.0
   */
  encodeSync,
  /**
   * @category parsing
   * @since 1.0.0
   */
  parse,
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
  parseResult,
  /**
   * @category parsing
   * @since 1.0.0
   */
  parseSync
} from "@effect/schema/Parser"
/* c8 ignore end */

// ---------------------------------------------
// constructors
// ---------------------------------------------

class CodecImpl<From, To> implements Codec<From, To> {
  readonly _codecId: CodecTypeId = S.CodecTypeId
  readonly From!: (_: From) => From
  readonly To!: (_: To) => To
  constructor(readonly ast: AST.AST) {}
  pipe() {
    return pipeArguments(this, arguments)
  }
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <I, A>(ast: AST.AST): Codec<I, A> => new CodecImpl(ast)

/**
 * Tests if a value is a `Codec`.
 *
 * @category guards
 * @since 1.0.0
 */
export const isCodec = (input: unknown): input is Codec<unknown, unknown> =>
  isObject(input) && "_codecId" in input && input["_codecId"] === S.CodecTypeId

// ---------------------------------------------
// codec combinators
// ---------------------------------------------

/**
 * Create a new `Codec` by transforming the input and output of an existing `Schema`
 * using the provided decoding functions.
 *
 * @category constructors
 * @since 1.0.0
 */
export const transformResult: {
  <I2, A2, A1>(
    to: Codec<I2, A2>,
    decode: (a1: A1, options: ParseOptions, self: AST.AST) => ParseResult<I2>,
    encode: (i2: I2, options: ParseOptions, self: AST.AST) => ParseResult<A1>,
    annotations?: AST.Annotated["annotations"]
  ): <I1>(self: Codec<I1, A1>) => Codec<I1, A2>
  <I1, A1, I2, A2>(
    from: Codec<I1, A1>,
    to: Codec<I2, A2>,
    decode: (a1: A1, options: ParseOptions, self: AST.AST) => ParseResult<I2>,
    encode: (i2: I2, options: ParseOptions, self: AST.AST) => ParseResult<A1>,
    annotations?: AST.Annotated["annotations"]
  ): Codec<I1, A2>
} = dual(4, <I1, A1, I2, A2>(
  from: Codec<I1, A1>,
  to: Codec<I2, A2>,
  decode: (a1: A1, options: ParseOptions, self: AST.AST) => ParseResult<I2>,
  encode: (i2: I2, options: ParseOptions, self: AST.AST) => ParseResult<A1>,
  annotations?: AST.Annotated["annotations"]
): Codec<I1, A2> =>
  make(
    AST.createTransform(
      from.ast,
      to.ast,
      AST.createFinalTransformation(decode, encode),
      annotations
    )
  ))

/**
 * Create a new `Codec` by transforming the input and output of an existing `Schema`
 * using the provided mapping functions.
 *
 * @category constructors
 * @since 1.0.0
 */
export const transform: {
  <I2, A2, A1>(
    to: Codec<I2, A2>,
    decode: (a1: A1) => I2,
    encode: (i2: I2) => A1,
    annotations?: AST.Annotated["annotations"]
  ): <I1>(self: Codec<I1, A1>) => Codec<I1, A2>
  <I1, A1, I2, A2>(
    from: Codec<I1, A1>,
    to: Codec<I2, A2>,
    decode: (a1: A1) => I2,
    encode: (i2: I2) => A1,
    annotations?: AST.Annotated["annotations"]
  ): Codec<I1, A2>
} = dual(
  4,
  <I1, A1, I2, A2>(
    from: Codec<I1, A1>,
    to: Codec<I2, A2>,
    decode: (a1: A1) => I2,
    encode: (i2: I2) => A1,
    annotations?: AST.Annotated["annotations"]
  ): Codec<I1, A2> =>
    transformResult(from, to, (a) => E.right(decode(a)), (b) => E.right(encode(b)), annotations)
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
): Codec<From | null, To | null> => union(S.null, self)

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
export const optionalElement =
  <IE, E>(element: Codec<IE, E>) =>
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
export const rest =
  <IR, R>(rest: Codec<IR, R>) =>
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
export const element =
  <IE, E>(element: Codec<IE, E>) =>
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
export const array = <I, A>(item: Codec<I, A>): Codec<ReadonlyArray<I>, ReadonlyArray<A>> =>
  make(AST.createTuple([], O.some([item.ast]), true))

/**
 * @category combinators
 * @since 1.0.0
 */
export const nonEmptyArray = <I, A>(
  item: Codec<I, A>
): Codec<readonly [I, ...Array<I>], readonly [A, ...Array<A>]> => tuple(item).pipe(rest(item))

/**
 * @category combinators
 * @since 1.0.0
 */
export const lazy = <I, A>(
  f: () => Codec<I, A>,
  annotations?: AST.Annotated["annotations"]
): Codec<I, A> => make(AST.createLazy(() => f().ast, annotations))

/**
 * @since 1.0.0
 */
export const propertySignature = <I, A>(
  codec: Codec<I, A>,
  options: S.DocAnnotations<A>
): S.PropertySignature<I, false, A, false> =>
  new S.PropertySignatureImpl({
    _tag: "PropertySignature",
    ast: codec.ast,
    annotations: S.toAnnotations(options)
  })

/**
 * @since 1.0.0
 */
export const optional = <I, A>(
  codec: Codec<I, A>,
  options?: S.DocAnnotations<A>
): S.OptionalPropertySignature<I, true, A, true> =>
  new S.PropertySignatureImpl({
    _tag: "Optional",
    ast: codec.ast,
    annotations: S.toAnnotations(options)
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
 * @since 1.0.0
 */
export type StructFields = Record<
  PropertyKey,
  | Codec<any, any>
  | Codec<never, never>
  | S.PropertySignature<any, boolean, any, boolean>
  | S.PropertySignature<never, boolean, never, boolean>
>

/**
 * @since 1.0.0
 */
export type FromStruct<Fields extends StructFields> =
  & { readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: From<Fields[K]> }
  & { readonly [K in FromOptionalKeys<Fields>]?: From<Fields[K]> }

/**
 * @since 1.0.0
 */
export type ToStruct<Fields extends StructFields> =
  & { readonly [K in Exclude<keyof Fields, S.ToOptionalKeys<Fields>>]: To<Fields[K]> }
  & { readonly [K in S.ToOptionalKeys<Fields>]?: To<Fields[K]> }

/**
 * @category combinators
 * @since 1.0.0
 */
export const struct = <Fields extends StructFields>(
  fields: Fields
): Codec<S.Simplify<FromStruct<Fields>>, S.Simplify<ToStruct<Fields>>> => {
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
  ): <I, A>(self: Codec<I, A>) => Codec<S.Simplify<I & IB>, S.Simplify<A & B>>
  <I, A, IB, B>(
    self: Codec<I, A>,
    that: Codec<IB, B>
  ): Codec<S.Simplify<I & IB>, S.Simplify<A & B>>
} = dual(
  2,
  <I, A, IB, B>(
    self: Codec<I, A>,
    that: Codec<IB, B>
  ): Codec<S.Simplify<I & IB>, S.Simplify<A & B>> =>
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
export const pick =
  <A, Keys extends ReadonlyArray<keyof A>>(...keys: Keys) =>
  <I extends { [K in keyof A]?: any }>(
    self: Codec<I, A>
  ): Codec<S.Simplify<Pick<I, Keys[number]>>, S.Simplify<Pick<A, Keys[number]>>> => {
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
export const omit =
  <A, Keys extends ReadonlyArray<keyof A>>(...keys: Keys) =>
  <I extends { [K in keyof A]?: any }>(
    self: Codec<I, A>
  ): Codec<S.Simplify<Omit<I, Keys[number]>>, S.Simplify<Omit<A, Keys[number]>>> => {
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

const recurseRight = <A extends ReadonlyArray<any>>(
  f: (ast: AST.AST, ...a: A) => AST.AST
) =>
(ast: AST.AST, ...a: A): AST.AST => {
  if (AST.isTransform(ast)) {
    return AST.createTransform(ast.from, f(ast.to, ...a), ast.transformAST, ast.annotations)
  }
  return f(ast, ...a)
}

const addBrand = recurseRight(S.addBrand)

/**
 * @category combinators
 * @since 1.0.0
 */
export const brand = <B extends string | symbol, A>(
  brand: B,
  options?: S.DocAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A & Brand<B>> => make(addBrand(self.ast, brand, options))

/**
 * @category combinators
 * @since 1.0.0
 */
export function filter<C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>,
  options?: S.FilterAnnotations<A>
): <I>(self: Codec<I, C>) => Codec<I, C & B>
export function filter<B extends A, A = B>(
  predicate: Predicate<A>,
  options?: S.FilterAnnotations<A>
): <I>(self: Codec<I, B>) => Codec<I, B>
export function filter<A>(
  predicate: Predicate<A>,
  options?: S.FilterAnnotations<A>
): <I>(self: Codec<I, A>) => Codec<I, A> {
  return <I>(self: Codec<I, A>) => make(S._filter(self.ast, predicate, options))
}

/**
 * @category combinators
 * @since 1.0.0
 */
export const compose: {
  <B, C extends B, D>(bc: Codec<C, D>): <A>(ab: Codec<A, B>) => Codec<A, D>
  <C, D>(bc: Codec<C, D>): <A, B extends C>(ab: Codec<A, B>) => Codec<A, D>
  <A, B, C extends B, D>(ab: Codec<A, B>, cd: Codec<C, D>): Codec<A, D>
  <A, B extends C, C, D>(ab: Codec<A, B>, cd: Codec<C, D>): Codec<A, D>
} = dual(
  2,
  <A, B, C, D>(ab: Codec<A, B>, cd: Codec<C, D>): Codec<A, D> =>
    make(AST.createTransform(ab.ast, cd.ast, AST.composeTransformation))
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
 * import * as C from "@effect/schema/Codec"
 * import { pipe } from "@effect/data/Function"
 *
 * const Circle = S.struct({ radius: S.number })
 * const Square = S.struct({ sideLength: S.number })
 * const Shape = C.union(
 *   C.attachPropertySignature(Circle, "kind", "circle"),
 *   C.attachPropertySignature(Square, "kind", "square")
 * )
 *
 * assert.deepStrictEqual(C.decodeSync(Shape)({ radius: 10 }), {
 *   kind: "circle",
 *   radius: 10
 * })
 *
 * @category combinators
 * @since 1.0.0
 */
export const attachPropertySignature: {
  <K extends PropertyKey, V extends AST.LiteralValue>(
    key: K,
    value: V
  ): <I, A extends object>(codec: Codec<I, A>) => Codec<I, S.Simplify<A & { readonly [k in K]: V }>>
  <I, A, K extends PropertyKey, V extends AST.LiteralValue>(
    codec: Codec<I, A>,
    key: K,
    value: V
  ): Codec<I, S.Simplify<A & { readonly [k in K]: V }>>
} = dual(3, <I, A, K extends PropertyKey, V extends AST.LiteralValue>(
  codec: Codec<I, A>,
  key: K,
  value: V
): Codec<I, S.Simplify<A & { readonly [k in K]: V }>> =>
  make(AST.createTransform(
    codec.ast,
    to(codec).pipe(extend(struct({ [key]: S.literal(value) }))).ast,
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
  )))

// ---------------------------------------------
// string filters
// ---------------------------------------------

/**
 * @category string filters
 * @since 1.0.0
 */
export const minLength = <A extends string>(
  minLength: number,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._minLength(self.ast, minLength, options))

/**
 * @category string filters
 * @since 1.0.0
 */
export const nonEmpty = <A extends string>(
  options?: S.FilterAnnotations<A>
): <I>(self: Codec<I, A>) => Codec<I, A> => minLength(1, options)

/**
 * @category string filters
 * @since 1.0.0
 */
export const maxLength = <A extends string>(
  maxLength: number,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._maxLength(self.ast, maxLength, options))

/**
 * @category string filters
 * @since 1.0.0
 */
export const length = <A extends string>(
  length: number,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => minLength(length, options)(maxLength<A>(length)(self))

/**
 * @category string filters
 * @since 1.0.0
 */
export const pattern = <A extends string>(
  regex: RegExp,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._pattern(self.ast, regex, options))

/**
 * @category string filters
 * @since 1.0.0
 */
export const startsWith = <A extends string>(
  startsWith: string,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._startsWith(self.ast, startsWith, options))

/**
 * @category string filters
 * @since 1.0.0
 */
export const endsWith = <A extends string>(
  endsWith: string,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._endsWith(self.ast, endsWith, options))

/**
 * @category string filters
 * @since 1.0.0
 */
export const includes = <A extends string>(
  searchString: string,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._includes(self.ast, searchString, options))

/**
 * Verifies that a string contains no leading or trailing whitespaces.
 *
 * Note. This combinator does not make any transformations, it only validates.
 * If what you were looking for was a combinator to trim strings, then check out the `trim` combinator.
 *
 * @category string filters
 * @since 1.0.0
 */
export const trimmed =
  <A extends string>(options?: S.FilterAnnotations<A>) => <I>(self: Codec<I, A>): Codec<I, A> =>
    make(S._trimmed(self.ast, options))

// ---------------------------------------------
// number filters
// ---------------------------------------------

/**
 * @category number filters
 * @since 1.0.0
 */
export const greaterThan = <A extends number>(
  min: number,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._greaterThan(self.ast, min, options))

/**
 * @category number filters
 * @since 1.0.0
 */
export const greaterThanOrEqualTo = <A extends number>(
  min: number,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._greaterThanOrEqualTo(self.ast, min, options))

/**
 * @category number filters
 * @since 1.0.0
 */
export const lessThan =
  <A extends number>(max: number, options?: S.FilterAnnotations<A>) =>
  <I>(self: Codec<I, A>): Codec<I, A> => make(S._lessThan(self.ast, max, options))

/**
 * @category number filters
 * @since 1.0.0
 */
export const lessThanOrEqualTo = <A extends number>(
  max: number,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._lessThanOrEqualTo(self.ast, max, options))

/**
 * @category number filters
 * @since 1.0.0
 */
export const int =
  <A extends number>(options?: S.FilterAnnotations<A>) => <I>(self: Codec<I, A>): Codec<I, A> =>
    make(S._int(self.ast, options))

/**
 * @category number filters
 * @since 1.0.0
 */
export const finite =
  <A extends number>(options?: S.FilterAnnotations<A>) => <I>(self: Codec<I, A>): Codec<I, A> =>
    make(S._finite(self.ast, options))

/**
 * Tests if a `number` is between a minimum and a maximum value (included).
 *
 * @category number filters
 * @since 1.0.0
 */
export const between = <A extends number>(
  min: number,
  max: number,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._between(self.ast, min, max, options))

/**
 * @category number filters
 * @since 1.0.0
 */
export const nonNaN =
  <A extends number>(options?: S.FilterAnnotations<A>) => <I>(self: Codec<I, A>): Codec<I, A> =>
    make(S._nonNaN(self.ast, options))

/**
 * @category number filters
 * @since 1.0.0
 */
export const positive = <A extends number>(
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._positive(self.ast, options))

/**
 * @category number filters
 * @since 1.0.0
 */
export const negative = <A extends number>(
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._negative(self.ast, options))

/**
 * @category number filters
 * @since 1.0.0
 */
export const nonNegative = <A extends number>(
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._nonNegative(self.ast, options))

/**
 * @category number filters
 * @since 1.0.0
 */
export const nonPositive = <A extends number>(
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._nonPositive(self.ast, options))

/**
 * @category number filters
 * @since 1.0.0
 */
export const multipleOf = <A extends number>(
  divisor: number,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._multipleOf(self.ast, divisor, options))

// ---------------------------------------------
// bigint filters
// ---------------------------------------------

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const greaterThanBigint = <A extends bigint>(
  min: bigint,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._greaterThanBigint(self.ast, min, options))

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const greaterThanOrEqualToBigint = <A extends bigint>(
  min: bigint,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._greaterThanOrEqualToBigint(self.ast, min, options))

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const lessThanBigint = <A extends bigint>(
  max: bigint,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._lessThanBigint(self.ast, max, options))

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const lessThanOrEqualToBigint = <A extends bigint>(
  max: bigint,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._lessThanOrEqualToBigint(self.ast, max, options))

/**
 * Tests if a `bigint` is between a minimum and a maximum value (included).
 *
 * @category bigint filters
 * @since 1.0.0
 */
export const betweenBigint = <A extends bigint>(
  min: bigint,
  max: bigint,
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._betweenBigint(self.ast, min, max, options))

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const positiveBigint = <A extends bigint>(
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._positiveBigint(self.ast, options))

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const negativeBigint = <A extends bigint>(
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._negativeBigint(self.ast, options))

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const nonPositiveBigint = <A extends bigint>(
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._nonPositiveBigint(self.ast, options))

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const nonNegativeBigint = <A extends bigint>(
  options?: S.FilterAnnotations<A>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._nonNegativeBigint(self.ast, options))

// ---------------------------------------------
// ReadonlyArray filters
// ---------------------------------------------

/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export const minItems = <A>(
  n: number,
  options?: S.FilterAnnotations<ReadonlyArray<A>>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._minItems(self.ast, n, options))

/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export const maxItems = <A>(
  n: number,
  options?: S.FilterAnnotations<ReadonlyArray<A>>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._maxItems(self.ast, n, options))

/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export const itemsCount = <A>(
  n: number,
  options?: S.FilterAnnotations<ReadonlyArray<A>>
) =>
<I>(self: Codec<I, A>): Codec<I, A> => make(S._itemsCount(self.ast, n, options))

// ---------------------------------------------
// string transformations
// ---------------------------------------------

/**
 * This combinator allows splitting a string into an array of strings.
 *
 * @category string transformations
 * @since 1.0.0
 */
export const split: {
  (separator: string): <I>(self: Codec<I, string>) => Codec<I, ReadonlyArray<string>>
  <I>(self: Codec<I, string>, separator: string): Codec<I, ReadonlyArray<string>>
} = dual(
  2,
  <I>(self: Codec<I, string>, separator: string): Codec<I, ReadonlyArray<string>> =>
    transform(
      self,
      array(S.string),
      Str.split(separator),
      RA.join(separator)
    )
)

/**
 * This combinator allows removing whitespaces from the beginning and end of a string.
 *
 * @category string transformations
 * @since 1.0.0
 */
export const trim = <I>(self: Codec<I, string>): Codec<I, string> =>
  transform(
    self,
    to(self).pipe(S.trimmed()),
    (s) => s.trim(),
    identity,
    { [AST.DocumentationAnnotationId]: "trim" }
  )

/**
 * This transformation allows removing whitespaces from the beginning and end of a string.
 *
 * @category string transformations
 * @since 1.0.0
 */
export const Trim: Codec<string, string> = trim(S.string)

/**
 * The `parseJson` combinator offers a method to convert JSON strings into the `unknown` type using the underlying
 * functionality of `JSON.parse`. It also employs `JSON.stringify` for encoding.
 *
 * @category string transformations
 * @since 1.0.0
 */
export const parseJson = <I, A extends string>(self: Codec<I, A>, options?: {
  reviver?: Parameters<typeof JSON.parse>[1]
  replacer?: Parameters<typeof JSON.stringify>[1]
  space?: Parameters<typeof JSON.stringify>[2]
}): Codec<I, unknown> =>
  transformResult(self, S.unknown, (s, _, ast) => {
    try {
      return PR.success<unknown>(JSON.parse(s, options?.reviver))
    } catch (e: any) {
      return PR.failure(PR.type(ast, s, e.message))
    }
  }, (u, _, ast) => {
    try {
      return PR.success(JSON.stringify(u, options?.replacer, options?.space) as A) // this is safe because `self` will check its input anyway
    } catch (e: any) {
      return PR.failure(PR.type(ast, u, e.message))
    }
  })

/**
 * The `ParseJson` codec offers a method to convert JSON strings into the `unknown` type using the underlying
 * functionality of `JSON.parse`. It also employs `JSON.stringify` for encoding.
 *
 * @category string
 * @since 1.0.0
 */
export const ParseJson: Codec<string, unknown> = parseJson(S.string)

// ---------------------------------------------
// number transformations
// ---------------------------------------------

/**
 * Clamps a number between a minimum and a maximum value.
 *
 * @category number transformations
 * @since 1.0.0
 */
export const clamp = (min: number, max: number) => <I>(self: Codec<I, number>): Codec<I, number> =>
  transform(
    self,
    to(self).pipe(S.between(min, max)),
    (n) => N.clamp(n, min, max),
    identity,
    { [AST.DocumentationAnnotationId]: "clamp" }
  )

/**
 * This combinator transforms a `string` into a `number` by parsing the string using the `Number` function.
 *
 * It returns an error if the value can't be converted (for example when non-numeric characters are provided).
 *
 * The following special string values are supported: "NaN", "Infinity", "-Infinity".
 *
 * @param self - The codec representing the input string
 *
 * @category number transformations
 * @since 1.0.0
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
      if (s.trim() === "") {
        return PR.failure(PR.type(ast, s))
      }
      const n = Number(s)
      return isNaN(n) ? PR.failure(PR.type(ast, s)) : PR.success(n)
    },
    (n) => PR.success(String(n)),
    { [AST.DocumentationAnnotationId]: "numberFromString" }
  )

/**
 * This codec transforms a `string` into a `number` by parsing the string using the `Number` function.
 *
 * It returns an error if the value can't be converted (for example when non-numeric characters are provided).
 *
 * The following special string values are supported: "NaN", "Infinity", "-Infinity".
 *
 * @category number transformations
 * @since 1.0.0
 */
export const NumberFromString: Codec<string, number> = numberFromString(S.string)

// ---------------------------------------------
// boolean transformations
// ---------------------------------------------

/**
 * Negates a boolean value
 *
 * @category boolean transformations
 * @since 1.0.0
 */
export const not = <I>(self: Codec<I, boolean>): Codec<I, boolean> =>
  transform(
    self,
    to(self),
    (b) => !b,
    (b) => !b,
    { [AST.DocumentationAnnotationId]: "not" }
  )

// ---------------------------------------------
// bigint transformations
// ---------------------------------------------

/**
 * This combinator transforms a `string` into a `bigint` by parsing the string using the `BigInt` function.
 *
 * It returns an error if the value can't be converted (for example when non-numeric characters are provided).
 *
 * @param self - The codec representing the input string
 *
 * @category bigint transformations
 * @since 1.0.0
 */
export const bigintFromString = <I>(self: Codec<I, string>): Codec<I, bigint> => {
  const schema: Codec<I, bigint> = transformResult(
    self,
    S.bigint,
    (s) => {
      if (s.trim() === "") {
        return PR.failure(PR.type(schema.ast, s))
      }

      try {
        return PR.success(BigInt(s))
      } catch (_) {
        return PR.failure(PR.type(schema.ast, s))
      }
    },
    (n) => PR.success(String(n))
  )
  return schema
}

/**
 * This codec transforms a `string` into a `bigint` by parsing the string using the `BigInt` function.
 *
 * It returns an error if the value can't be converted (for example when non-numeric characters are provided).
 *
 * @category bigint transformations
 * @since 1.0.0
 */
export const BigintFromString: Codec<string, bigint> = bigintFromString(S.string)

/**
 * Clamps a bigint between a minimum and a maximum value.
 *
 * @category bigint transformations
 * @since 1.0.0
 */
export const clampBigint =
  (min: bigint, max: bigint) => <I>(self: Codec<I, bigint>): Codec<I, bigint> =>
    transform(
      self,
      to(self).pipe(S.betweenBigint(min, max)),
      (input) => B.clamp(input, min, max),
      identity,
      { [AST.DocumentationAnnotationId]: "clampBigint" }
    )

// ---------------------------------------------
// Date transformations
// ---------------------------------------------

/**
 * A combinator that transforms a `string` into a valid `Date`.
 *
 * @category Date transformations
 * @since 1.0.0
 */
export const dateFromString = <I>(self: Codec<I, string>): Codec<I, Date> =>
  transformResult(
    self,
    S.ValidDate,
    (input) => PR.success(new Date(input)),
    (date) => PR.success(date.toISOString()),
    { [AST.DocumentationAnnotationId]: "dateFromString" }
  )

const _Date: Codec<string, Date> = dateFromString(S.string)

export {
  /**
   * A schema that transforms a `string` into a `Date`.
   *
   * @category Date transformations
   * @since 1.0.0
   */
  _Date as Date
}

// ---------------------------------------------
// Option transformations
// ---------------------------------------------

/**
 * @category Option transformations
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
        PR.map(encodeResult(option.value, options), O.some),
    { [AST.DocumentationAnnotationId]: "optionFromSelf" }
  )
}

const optionAsJson = <A>(value: S.Schema<A>) =>
  S.union(S.struct({ _tag: S.literal("None") }), S.struct({ _tag: S.literal("Some"), value }))

/**
 * @since 1.0.0
 */
export type JSONOption<A> = { readonly _tag: "None" } | { readonly _tag: "Some"; readonly value: A }

/**
 * @category Option transformations
 * @since 1.0.0
 */
export const option = <I, A>(
  value: Codec<I, A>
): Codec<JSONOption<I>, Option<A>> => {
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
        PR.map(encodeResult(o.value, options), (value) => ({ _tag: "Some" as const, value })),
    { [AST.DocumentationAnnotationId]: "option" }
  )
}

/**
 * @category Option transformations
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
    (o, options) => O.isNone(o) ? PR.success(null) : encodeResult(o.value, options),
    { [AST.DocumentationAnnotationId]: "optionFromNullable" }
  )
}

// ---------------------------------------------
// Either transformations
// ---------------------------------------------

/**
 * @category Either transformations
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
        PR.map(encodeResultRight(either.right, options), E.right),
    { [AST.DocumentationAnnotationId]: "eitherFromSelf" }
  )
}

const eitherAsJson = <E, A>(left: S.Schema<E>, right: S.Schema<A>) =>
  S.union(
    S.struct({ _tag: S.literal("Left"), left }),
    S.struct({ _tag: S.literal("Right"), right })
  )

/**
 * @since 1.0.0
 */
export type JSONEither<E, A> = { readonly _tag: "Left"; readonly left: E } | {
  readonly _tag: "Right"
  readonly right: A
}

/**
 * @category Either transformations
 * @since 1.0.0
 */
export const either = <IE, E, IA, A>(
  left: Codec<IE, E>,
  right: Codec<IA, A>
): Codec<JSONEither<IE, IA>, Either<E, A>> => {
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
        ),
    { [AST.DocumentationAnnotationId]: "either" }
  )
}

// ---------------------------------------------
// ReadonlyMap transformations
// ---------------------------------------------

/**
 * @category ReadonlyMap transformations
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
    (map, options) => PR.map(encodeResult(Array.from(map.entries()), options), (as) => new Map(as)),
    { [AST.DocumentationAnnotationId]: "readonlyMapFromSelf" }
  )
}

/**
 * @category ReadonlyMap transformations
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
    (map) => Array.from(map.entries()),
    { [AST.DocumentationAnnotationId]: "readonlyMap" }
  )

// ---------------------------------------------
// ReadonlySet transformations
// ---------------------------------------------

/**
 * @category ReadonlySet transformations
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
    (set, options) => PR.map(encodeResult(Array.from(set.values()), options), (as) => new Set(as)),
    { [AST.DocumentationAnnotationId]: "readonlySetFromSelf" }
  )
}

/**
 * @category ReadonlySet transformations
 * @since 1.0.0
 */
export const readonlySet = <I, A>(
  item: Codec<I, A>
): Codec<ReadonlyArray<I>, ReadonlySet<A>> =>
  transform(
    array(item),
    S.readonlySet(to(item)),
    (as) => new Set(as),
    (set) => Array.from(set),
    { [AST.DocumentationAnnotationId]: "readonlySet" }
  )

// ---------------------------------------------
// Chunk transformations
// ---------------------------------------------

/**
 * @category Chunk transformations
 * @since 1.0.0
 */
export const chunkFromSelf = <I, A>(item: Codec<I, A>): Codec<Chunk<I>, Chunk<A>> => {
  const parseResult = P.parseResult(array(item))
  const encodeResult = P.encodeResult(array(item))
  return transformResult(
    S.chunk(from(item)),
    S.chunk(to(item)),
    (chunk, options) => PR.map(parseResult(C.toReadonlyArray(chunk), options), C.fromIterable),
    (chunk, options) => PR.map(encodeResult(C.toReadonlyArray(chunk), options), C.fromIterable),
    { [AST.DocumentationAnnotationId]: "chunkFromSelf" }
  )
}

/**
 * @category Chunk transformations
 * @since 1.0.0
 */
export const chunk = <I, A>(
  item: Codec<I, A>
): Codec<ReadonlyArray<I>, Chunk<A>> =>
  transform(array(item), S.chunk(to(item)), C.fromIterable, C.toReadonlyArray, {
    [AST.DocumentationAnnotationId]: "chunk"
  })

// ---------------------------------------------
// Data transformations
// ---------------------------------------------

const fromData = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  data: D.Data<A>
): A => Array.isArray(data) ? Array.from(data) : Object.assign({}, data) as any

/**
 * @category Data transformations
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
    (data, options) => PR.map(encodeResult(fromData(data), options), S.toData),
    { [AST.DocumentationAnnotationId]: "dataFromSelf" }
  )
}

/**
 * @category Data transformations
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
    (data) => Array.isArray(data) ? Array.from(data) : Object.assign({}, data) as any,
    { [AST.DocumentationAnnotationId]: "data" }
  )
