/**
 * @since 1.0.0
 */

import * as B from "@effect/data/Bigint"
import type { Brand } from "@effect/data/Brand"
import { RefinedConstructorsTypeId } from "@effect/data/Brand"
import type { Chunk } from "@effect/data/Chunk"
import * as C from "@effect/data/Chunk"
import * as D from "@effect/data/Data"
import { untracedMethod } from "@effect/data/Debug"
import type { Either } from "@effect/data/Either"
import * as E from "@effect/data/Either"
import * as Equal from "@effect/data/Equal"
import type { LazyArg } from "@effect/data/Function"
import { dual, identity, pipe } from "@effect/data/Function"
import * as N from "@effect/data/Number"
import type { Option } from "@effect/data/Option"
import * as O from "@effect/data/Option"
import type { Predicate, Refinement } from "@effect/data/Predicate"
import type { Arbitrary } from "@effect/schema/Arbitrary"
import type { ParseOptions } from "@effect/schema/AST"
import * as AST from "@effect/schema/AST"
import * as I from "@effect/schema/internal/common"
import * as P from "@effect/schema/Parser"
import type { ParseResult } from "@effect/schema/ParseResult"
import * as PR from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import { formatErrors } from "@effect/schema/TreeFormatter"

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

export {
  /**
   * @category primitives
   * @since 1.0.0
   */
  any,
  /**
   * @category primitives
   * @since 1.0.0
   */
  bigint,
  /**
   * @category primitives
   * @since 1.0.0
   */
  boolean,
  /**
   * @category constructors
   * @since 1.0.0
   */
  enums,
  /**
   * @category constructors
   * @since 1.0.0
   */
  literal,
  /**
   * @category primitives
   * @since 1.0.0
   */
  never,
  /**
   * @category primitives
   * @since 1.0.0
   */
  null,
  /**
   * @category primitives
   * @since 1.0.0
   */
  number,
  /**
   * @category primitives
   * @since 1.0.0
   */
  object,
  /**
   * @category primitives
   * @since 1.0.0
   */
  string,
  /**
   * @category primitives
   * @since 1.0.0
   */
  symbol,
  /**
   * @category constructors
   * @since 1.0.0
   */
  templateLiteral,
  /**
   * @category primitives
   * @since 1.0.0
   */
  undefined,
  /**
   * @category constructors
   * @since 1.0.0
   */
  uniqueSymbol,
  /**
   * @category primitives
   * @since 1.0.0
   */
  unknown,
  /**
   * @category primitives
   * @since 1.0.0
   */
  void
} from "@effect/schema/Schema"
/* c8 ignore end */

// ---------------------------------------------
// constructors
// ---------------------------------------------

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <I, A>(ast: AST.AST): Transform<I, A> => ({ ast }) as any

/**
  @category constructors
  @since 1.0.0
*/
export const declare = (
  typeParameters: ReadonlyArray<Transform<any, any>>,
  type: Transform<any, any>,
  decode: (
    ...typeParameters: ReadonlyArray<Transform<any, any>>
  ) => (input: any, options: ParseOptions, ast: AST.AST) => ParseResult<any>,
  encode: (
    ...typeParameters: ReadonlyArray<Transform<any, any>>
  ) => (input: any, options: ParseOptions, ast: AST.AST) => ParseResult<any>,
  annotations?: AST.Annotated["annotations"]
): Transform<any, any> =>
  make(
    AST.createDeclaration(
      typeParameters.map((schema) => schema.ast),
      type.ast,
      (...typeParameters) => decode(...typeParameters.map(make)),
      (...typeParameters) => encode(...typeParameters.map(make)),
      annotations
    )
  )

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
export const keyof = <I, A>(schema: Transform<I, A>): Transform<keyof A, keyof A> =>
  make(AST.keyof(schema.ast))

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
    throw new Error("`rest` is not supported on this schema")
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
    throw new Error("`element` is not supported on this schema")
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
    throw new Error("`optionalElement` is not supported on this schema")
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
export type Spread<A> = {
  [K in keyof A]: A[K]
} extends infer B ? B : never

/**
 * @since 1.0.0
 */
export interface TransformPropertySignature<From, FromIsOptional, To, ToIsOptional> {
  readonly From: (_: From) => From
  readonly FromIsOptional: FromIsOptional
  readonly To: (_: To) => To
  readonly ToIsOptional: ToIsOptional
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
export type ToOptionalKeys<Fields> = {
  [K in keyof Fields]: Fields[K] extends
    | TransformPropertySignature<any, boolean, any, true>
    | TransformPropertySignature<never, boolean, never, true> ? K
    : never
}[keyof Fields]

/**
 * @since 1.0.0
 */
export type FromOptionalKeys<Fields> = {
  [K in keyof Fields]: Fields[K] extends
    | TransformPropertySignature<any, true, any, boolean>
    | TransformPropertySignature<never, true, never, boolean> ? K
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
    | TransformPropertySignature<any, boolean, any, boolean>
    | TransformPropertySignature<never, boolean, never, boolean>
  >
>(
  fields: Fields
): Transform<
  Spread<
    & { readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: From<Fields[K]> }
    & { readonly [K in FromOptionalKeys<Fields>]?: From<Fields[K]> }
  >,
  Spread<
    & { readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: To<Fields[K]> }
    & { readonly [K in ToOptionalKeys<Fields>]?: To<Fields[K]> }
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
                optionFromSelf(make(AST.to(field._from))).ast,
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
  ): Transform<Spread<Pick<I, Keys[number]>>, Spread<Pick<A, Keys[number]>>> => {
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
  ): Transform<Spread<Omit<I, Keys[number]>>, Spread<Omit<A, Keys[number]>>> => {
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
 * @category model
 * @since 1.0.0
 */
export interface BrandTransform<From, To extends Brand<any>>
  extends Transform<From, To>, Brand.Constructor<To>
{}

/**
 * Returns a nominal branded schema by applying a brand to a given schema.
 *
 * ```
 * Schema<A> + B -> Schema<A & Brand<B>>
 * ```
 *
 * @param self - The input schema to be combined with the brand.
 * @param brand - The brand to apply.
 *
 * @example
 * import * as T from "@effect/schema/Transform"
 * import { pipe } from "@effect/data/Function"
 *
 * const Int = pipe(T.number, T.int(), T.brand("Int"))
 * type Int = T.To<typeof Int> // number & Brand<"Int">
 *
 * @category combinators
 * @since 1.0.0
 */
export const brand = <B extends string | symbol, A>(
  brand: B,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): BrandTransform<I, A & Brand<B>> => {
    const annotations = S.toAnnotations(options)
    annotations[AST.BrandAnnotationId] = [...S.getBrands(self.ast), brand]
    const ast = AST.mergeAnnotations(self.ast, annotations)
    const transform = make(ast)
    const schema = to(transform)
    const validate = P.validate(schema)
    const validateOption = P.validateOption(schema)
    const validateEither = P.validateEither(schema)
    const is = P.is(schema)
    const out: any = Object.assign((input: unknown) => validate(input), {
      [RefinedConstructorsTypeId]: RefinedConstructorsTypeId,
      ast,
      option: (input: unknown) => validateOption(input),
      either: (input: unknown) =>
        E.mapLeft(
          validateEither(input),
          (e) => [{ meta: input, message: formatErrors(e.errors) }]
        ),
      refine: (input: unknown): input is A & Brand<B> => is(input)
    })
    return out
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const partial = <I, A>(
  self: Transform<I, A>
): Transform<Spread<Partial<I>>, Spread<Partial<A>>> => make(AST.partial(self.ast))

/**
 * @category combinators
 * @since 1.0.0
 */
export const required = <I, A>(
  self: Transform<I, A>
): Transform<Spread<Required<I>>, Spread<Required<A>>> => make(AST.required(self.ast))

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
  ): <I, A>(self: Transform<I, A>) => Transform<Spread<I & IB>, Spread<A & B>>
  <I, A, IB, B>(
    self: Transform<I, A>,
    that: Transform<IB, B>
  ): Transform<Spread<I & IB>, Spread<A & B>>
} = dual(
  2,
  <I, A, IB, B>(
    self: Transform<I, A>,
    that: Transform<IB, B>
  ): Transform<Spread<I & IB>, Spread<A & B>> =>
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
 * @category combinators
 * @since 1.0.0
 */
export function filter<C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>,
  options?: AnnotationOptions<A>
): <I>(self: Transform<I, C>) => Transform<I, C & B>
export function filter<B extends A, A = B>(
  predicate: Predicate<A>,
  options?: AnnotationOptions<A>
): <I>(self: Transform<I, B>) => Transform<I, B>
export function filter<A>(
  predicate: Predicate<A>,
  options?: AnnotationOptions<A>
): <I>(self: Transform<I, A>) => Transform<I, A> {
  return (self) =>
    make(AST.createRefinement(
      self.ast,
      (a: A, _, ast: AST.AST) => predicate(a) ? PR.success(a) : PR.failure(PR.type(ast, a)),
      S.toAnnotations(options)
    ))
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
 * import * as S from "@effect/schema/Transform"
 * import { pipe } from "@effect/data/Function"
 *
 * const Circle = S.struct({ radius: S.number })
 * const Square = S.struct({ sideLength: S.number })
 * const Shape = S.union(
 *   pipe(Circle, S.attachPropertySignature("kind", "circle")),
 *   pipe(Square, S.attachPropertySignature("kind", "square"))
 * )
 *
 * assert.deepStrictEqual(S.decode(Shape)({ radius: 10 }), {
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
  ): Transform<I, Spread<A & { readonly [k in K]: V }>> =>
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
// annotations
// ---------------------------------------------

/**
 * @category combinators
 * @since 1.0.0
 */
export const annotations = (annotations: AST.Annotated["annotations"]) =>
  <I, A>(self: Transform<I, A>): Transform<I, A> =>
    make(AST.mergeAnnotations(self.ast, annotations))

/**
 * @category annotations
 * @since 1.0.0
 */
export const message = (message: AST.MessageAnnotation<unknown>) =>
  <I, A>(self: Transform<I, A>): Transform<I, A> =>
    make(AST.setAnnotation(self.ast, AST.MessageAnnotationId, message))

/**
 * @category annotations
 * @since 1.0.0
 */
export const identifier = (identifier: AST.IdentifierAnnotation) =>
  <I, A>(self: Transform<I, A>): Transform<I, A> =>
    make(AST.setAnnotation(self.ast, AST.IdentifierAnnotationId, identifier))

/**
 * @category annotations
 * @since 1.0.0
 */
export const title = (title: AST.TitleAnnotation) =>
  <I, A>(self: Transform<I, A>): Transform<I, A> =>
    make(AST.setAnnotation(self.ast, AST.TitleAnnotationId, title))

/**
 * @category annotations
 * @since 1.0.0
 */
export const description = (description: AST.DescriptionAnnotation) =>
  <I, A>(self: Transform<I, A>): Transform<I, A> =>
    make(AST.setAnnotation(self.ast, AST.DescriptionAnnotationId, description))

/**
 * @category annotations
 * @since 1.0.0
 */
export const examples = (examples: AST.ExamplesAnnotation) =>
  <I, A>(self: Transform<I, A>): Transform<I, A> =>
    make(AST.setAnnotation(self.ast, AST.ExamplesAnnotationId, examples))

/**
 * @category annotations
 * @since 1.0.0
 */
export const documentation = (documentation: AST.DocumentationAnnotation) =>
  <I, A>(self: Transform<I, A>): Transform<I, A> =>
    make(AST.setAnnotation(self.ast, AST.DocumentationAnnotationId, documentation))

// ---------------------------------------------
// data/Bigint
// ---------------------------------------------

/**
 * @category type id
 * @since 1.0.0
 */
export const GreaterThanBigintTypeId = "@effect/schema/GreaterThanBigintTypeId"

/**
 * @category bigint
 * @since 1.0.0
 */
export const greaterThanBigint = <A extends bigint>(
  min: bigint,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => a > min, {
        typeId: GreaterThanBigintTypeId,
        description: `a bigint greater than ${min}n`,
        jsonSchema: { exclusiveMinimum: min },
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const GreaterThanOrEqualToBigintTypeId = "@effect/schema/GreaterThanOrEqualToBigintTypeId"

/**
 * @category bigint
 * @since 1.0.0
 */
export const greaterThanOrEqualToBigint = <A extends bigint>(
  min: bigint,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => a >= min, {
        typeId: GreaterThanOrEqualToBigintTypeId,
        description: `a bigint greater than or equal to ${min}n`,
        jsonSchema: { minimum: min },
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const LessThanBigintTypeId = "@effect/schema/LessThanBigintTypeId"

/**
 * @category bigint
 * @since 1.0.0
 */
export const lessThanBigint = <A extends bigint>(
  max: bigint,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => a < max, {
        typeId: LessThanBigintTypeId,
        description: `a bigint less than ${max}n`,
        jsonSchema: { exclusiveMaximum: max },
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const LessThanOrEqualToBigintTypeId = "@effect/schema/LessThanOrEqualToBigintTypeId"

/**
 * @category bigint
 * @since 1.0.0
 */
export const lessThanOrEqualToBigint = <A extends bigint>(
  max: bigint,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => a <= max, {
        typeId: LessThanOrEqualToBigintTypeId,
        description: `a bigint less than or equal to ${max}n`,
        jsonSchema: { maximum: max },
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const BetweenBigintTypeId = "@effect/schema/BetweenBigintTypeId"

/**
 * @category bigint
 * @since 1.0.0
 */
export const betweenBigint = <A extends bigint>(
  min: bigint,
  max: bigint,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => a >= min && a <= max, {
        typeId: BetweenBigintTypeId,
        description: `a bigint between ${min}n and ${max}n`,
        jsonSchema: { maximum: max, minimum: min },
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const PositiveBigintTypeId = "@effect/schema/PositiveBigintTypeId"

/**
 * @category bigint
 * @since 1.0.0
 */
export const positiveBigint = <A extends bigint>(
  options?: AnnotationOptions<A>
): <I>(self: Transform<I, A>) => Transform<I, A> =>
  greaterThanBigint(0n, {
    typeId: PositiveBigintTypeId,
    description: "a positive bigint",
    ...options
  })

/**
 * @category type id
 * @since 1.0.0
 */
export const NegativeBigintTypeId = "@effect/schema/NegativeBigintTypeId"

/**
 * @category bigint
 * @since 1.0.0
 */
export const negativeBigint = <A extends bigint>(
  options?: AnnotationOptions<A>
): <I>(self: Transform<I, A>) => Transform<I, A> =>
  lessThanBigint(0n, {
    typeId: NegativeBigintTypeId,
    description: "a negative bigint",
    ...options
  })

/**
 * @category type id
 * @since 1.0.0
 */
export const NonNegativeBigintTypeId = "@effect/schema/NonNegativeBigintTypeId"

/**
 * @category bigint
 * @since 1.0.0
 */
export const nonNegativeBigint = <A extends bigint>(
  options?: AnnotationOptions<A>
): <I>(self: Transform<I, A>) => Transform<I, A> =>
  greaterThanOrEqualToBigint(0n, {
    typeId: NonNegativeBigintTypeId,
    description: "a non-negative bigint",
    ...options
  })

/**
 * @category type id
 * @since 1.0.0
 */
export const NonPositiveBigintTypeId = "@effect/schema/NonPositiveBigintTypeId"

/**
 * @category bigint
 * @since 1.0.0
 */
export const nonPositiveBigint = <A extends bigint>(
  options?: AnnotationOptions<A>
): <I>(self: Transform<I, A>) => Transform<I, A> =>
  lessThanOrEqualToBigint(0n, {
    typeId: NonPositiveBigintTypeId,
    description: "a non-positive bigint",
    ...options
  })

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
      pipe(to(self), betweenBigint(min, max)),
      (input) => B.clamp(input, min, max),
      identity
    )

// ---------------------------------------------
// data/Boolean
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
// data/Brand
// ---------------------------------------------

/**
 * @category type id
 * @since 1.0.0
 */
export const BrandTypeId = "@effect/schema/BrandTypeId"

/**
 * @category combinators
 * @since 1.0.0
 */
export const fromBrand = <C extends Brand<string | symbol>>(
  constructor: Brand.Constructor<C>,
  options?: AnnotationOptions<Brand.Unbranded<C>>
) =>
  <I, A extends Brand.Unbranded<C>>(self: Transform<I, A>): Transform<I, A & C> => {
    const decode = untracedMethod(() =>
      (a: A, _, self: AST.AST): ParseResult<C> =>
        E.mapLeft(
          constructor.either(a),
          (brandErrors) =>
            PR.parseError([PR.type(self, a, brandErrors.map((v) => v.message).join(", "))])
        )
    )
    const ast = AST.createRefinement(
      self.ast,
      decode,
      S.toAnnotations({ typeId: BrandTypeId, ...options })
    )
    return make(ast)
  }

// ---------------------------------------------
// data/Chunk
// ---------------------------------------------

/**
 * @category constructors
 * @since 1.0.0
 */
export const chunkFromSelf = <I, A>(item: Transform<I, A>): Transform<Chunk<I>, Chunk<A>> =>
  declare(
    [item],
    struct({
      _id: S.uniqueSymbol(Symbol.for("@effect/data/Chunk")),
      length: S.number
    }),
    <I, A>(item: Transform<I, A>) => {
      const parseResult = P.parseResult(array(item))
      return (u: unknown, options, self) =>
        !C.isChunk(u) ?
          PR.failure(PR.type(self, u)) :
          PR.map(
            parseResult(C.toReadonlyArray(u), options),
            C.fromIterable
          )
    },
    <I, A>(item: Transform<I, A>) => {
      const encodeResult = P.encodeResult(array(item))
      return (a: Chunk<A>, options) =>
        PR.map(
          encodeResult(C.toReadonlyArray(a), options),
          C.fromIterable
        )
    },
    {
      [AST.IdentifierAnnotationId]: "Chunk",
      [I.PrettyHookId]: S.chunkPretty,
      [I.ArbitraryHookId]: S.chunkArbitrary
    }
  )

/**
 * @category combinators
 * @since 1.0.0
 */
export const chunk = <I, A>(item: Transform<I, A>): Transform<ReadonlyArray<I>, Chunk<A>> =>
  transform(array(item), to(chunkFromSelf(item)), C.fromIterable, C.toReadonlyArray)

// ---------------------------------------------
// data/Data
// ---------------------------------------------

const toData = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(a: A): D.Data<A> =>
  Array.isArray(a) ? D.array(a) : D.struct(a)

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
  return declare(
    [item],
    item,
    <
      I extends Readonly<Record<string, any>> | ReadonlyArray<any>,
      A extends Readonly<Record<string, any>> | ReadonlyArray<any>
    >(
      item: Transform<I, A>
    ) => {
      const parseResult = P.parseResult(item)
      return (u: unknown, options, self) =>
        !Equal.isEqual(u) ?
          PR.failure(PR.type(self, u)) :
          PR.map(parseResult(u, options), toData)
    },
    <
      I extends Readonly<Record<string, any>> | ReadonlyArray<any>,
      A extends Readonly<Record<string, any>> | ReadonlyArray<any>
    >(
      item: Transform<I, A>
    ) => {
      const encodeResult = P.encodeResult(item)
      return (a: A, options) => PR.map(encodeResult(a, options), toData)
    },
    {
      [AST.IdentifierAnnotationId]: "Data",
      [I.PrettyHookId]: S.dataPretty,
      [I.ArbitraryHookId]: S.dataArbitrary
    }
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
    to(dataFromSelf(item)),
    toData,
    (a) => Array.isArray(a) ? Array.from(a) : Object.assign({}, a) as any
  )

// ---------------------------------------------
// data/Date
// ---------------------------------------------

/**
 * @category type id
 * @since 1.0.0
 */
export const ValidDateTypeId = "@effect/schema/ValidDateTypeId"

/**
 * A filter excluding invalid dates (e.g. `new Date("fail")`).
 *
 * @category Date
 * @since 1.0.0
 */
export const validDate = (options?: AnnotationOptions<Date>) =>
  <I>(self: Transform<I, Date>): Transform<I, Date> =>
    pipe(
      self,
      filter((a) => !isNaN(a.getTime()), {
        typeId: ValidDateTypeId,
        description: "a valid Date",
        ...options
      })
    )

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
// data/Either
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
  return declare(
    [left, right],
    eitherInline(left, right),
    <IE, E, IA, A>(left: Transform<IE, E>, right: Transform<IA, A>) => {
      const parseResultLeft = P.parseResult(left)
      const parseResultRight = P.parseResult(right)
      return (u: unknown, options, self) =>
        !E.isEither(u) ?
          PR.failure(PR.type(self, u)) :
          E.isLeft(u) ?
          PR.map(parseResultLeft(u.left, options), E.left) :
          PR.map(parseResultRight(u.right, options), E.right)
    },
    <IE, E, IA, A>(left: Transform<IE, E>, right: Transform<IA, A>) => {
      const encodeResultLeft = P.encodeResult(left)
      const encodeResultRight = P.encodeResult(right)
      return (a: Either<E, A>, options) =>
        E.isLeft(a) ?
          PR.map(encodeResultLeft(a.left, options), E.left) :
          PR.map(encodeResultRight(a.right, options), E.right)
    },
    {
      [AST.IdentifierAnnotationId]: "Either",
      [I.PrettyHookId]: S.eitherPretty,
      [I.ArbitraryHookId]: S.eitherArbitrary
    }
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
    to(eitherFromSelf(left, right)),
    (a) => a._tag === "Left" ? E.left(a.left) : E.right(a.right),
    E.match(
      (left) => ({ _tag: "Left" as const, left }),
      (right) => ({ _tag: "Right" as const, right })
    )
  )

// ---------------------------------------------
// data/Number
// ---------------------------------------------

/**
 * @category type id
 * @since 1.0.0
 */
export const FiniteTypeId = "@effect/schema/FiniteTypeId"

/**
 * @category number
 * @since 1.0.0
 */
export const finite = <A extends number>(options?: AnnotationOptions<A>) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => Number.isFinite(a), {
        typeId: FiniteTypeId,
        description: "a finite number",
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const GreaterThanTypeId = "@effect/schema/GreaterThanTypeId"

/**
 * @category number
 * @since 1.0.0
 */
export const greaterThan = <A extends number>(
  min: number,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => a > min, {
        typeId: GreaterThanTypeId,
        description: `a number greater than ${min}`,
        jsonSchema: { exclusiveMinimum: min },
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const GreaterThanOrEqualToTypeId = "@effect/schema/GreaterThanOrEqualToTypeId"

/**
 * @category number
 * @since 1.0.0
 */
export const greaterThanOrEqualTo = <A extends number>(
  min: number,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => a >= min, {
        typeId: GreaterThanOrEqualToTypeId,
        description: `a number greater than or equal to ${min}`,
        jsonSchema: { minimum: min },
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const MultipleOfTypeId = "@effect/schema/MultipleOfTypeId"

/**
 * @category number
 * @since 1.0.0
 */
export const multipleOf = <A extends number>(
  divisor: number,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => N.remainder(a, divisor) === 0, {
        typeId: MultipleOfTypeId,
        description: `a number divisible by ${divisor}`,
        jsonSchema: { multipleOf: Math.abs(divisor) }, // spec requires positive divisor
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const IntTypeId = "@effect/schema/IntTypeId"

/**
 * @category number
 * @since 1.0.0
 */
export const int = <A extends number>(options?: AnnotationOptions<A>) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => Number.isInteger(a), {
        typeId: IntTypeId,
        description: "integer",
        jsonSchema: { type: "integer" },
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const LessThanTypeId = "@effect/schema/LessThanTypeId"

/**
 * @category number
 * @since 1.0.0
 */
export const lessThan = <A extends number>(max: number, options?: AnnotationOptions<A>) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => a < max, {
        typeId: LessThanTypeId,
        description: `a number less than ${max}`,
        jsonSchema: { exclusiveMaximum: max },
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const LessThanOrEqualToTypeId = "@effect/schema/LessThanOrEqualToTypeId"

/**
 * @category number
 * @since 1.0.0
 */
export const lessThanOrEqualTo = <A extends number>(
  max: number,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => a <= max, {
        typeId: LessThanOrEqualToTypeId,
        description: `a number less than or equal to ${max}`,
        jsonSchema: { maximum: max },
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const BetweenTypeId = "@effect/schema/BetweenTypeId"

/**
 * @category number
 * @since 1.0.0
 */
export const between = <A extends number>(
  min: number,
  max: number,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => a >= min && a <= max, {
        typeId: BetweenTypeId,
        description: `a number between ${min} and ${max}`,
        jsonSchema: { maximum: max, minimum: min },
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const NonNaNTypeId = "@effect/schema/NonNaNTypeId"

/**
 * @category number
 * @since 1.0.0
 */
export const nonNaN = <A extends number>(options?: AnnotationOptions<A>) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => !Number.isNaN(a), {
        typeId: NonNaNTypeId,
        description: "a number NaN excluded",
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const PositiveTypeId = "@effect/schema/PositiveTypeId"

/**
 * @category number
 * @since 1.0.0
 */
export const positive = <A extends number>(
  options?: AnnotationOptions<A>
): <I>(self: Transform<I, A>) => Transform<I, A> =>
  greaterThan(0, {
    typeId: PositiveTypeId,
    description: "a positive number",
    ...options
  })

/**
 * @category type id
 * @since 1.0.0
 */
export const NegativeTypeId = "@effect/schema/NegativeTypeId"

/**
 * @category number
 * @since 1.0.0
 */
export const negative = <A extends number>(
  options?: AnnotationOptions<A>
): <I>(self: Transform<I, A>) => Transform<I, A> =>
  lessThan(0, {
    typeId: NegativeTypeId,
    description: "a negative number",
    ...options
  })

/**
 * @category type id
 * @since 1.0.0
 */
export const NonNegativeTypeId = "@effect/schema/NonNegativeTypeId"

/**
 * @category number
 * @since 1.0.0
 */
export const nonNegative = <A extends number>(
  options?: AnnotationOptions<A>
): <I>(self: Transform<I, A>) => Transform<I, A> =>
  greaterThanOrEqualTo(0, {
    typeId: NonNegativeTypeId,
    description: "a non-negative number",
    ...options
  })

/**
 * @category type id
 * @since 1.0.0
 */
export const NonPositiveTypeId = "@effect/schema/NonPositiveTypeId"

/**
 * @category number
 * @since 1.0.0
 */
export const nonPositive = <A extends number>(
  options?: AnnotationOptions<A>
): <I>(self: Transform<I, A>) => Transform<I, A> =>
  lessThanOrEqualTo(0, {
    typeId: NonPositiveTypeId,
    description: "a non-positive number",
    ...options
  })

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
      pipe(to(self), between(min, max)),
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
 * This schema transforms a `string` into a `number` by parsing the string using `parseFloat`.
 *
 * The following special string values are supported: "NaN", "Infinity", "-Infinity".
 *
 * @category number
 * @since 1.0.0
 */
export const NumberFromString: Transform<string, number> = numberFromString(S.string)

// ---------------------------------------------
// data/Option
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
  return declare(
    [value],
    optionInline(value),
    <I, A>(value: Transform<I, A>) => {
      const parseResult = P.parseResult(value)
      return (u: unknown, options, self) =>
        !O.isOption(u) ?
          PR.failure(PR.type(self, u)) :
          O.isNone(u) ?
          PR.success(O.none()) :
          PR.map(parseResult(u.value, options), O.some)
    },
    <I, A>(value: Transform<I, A>) => {
      const encodeResult = P.encodeResult(value)
      return (a: Option<A>, options) =>
        O.isNone(a) ?
          PR.success(O.none()) :
          PR.map(encodeResult(a.value, options), O.some)
    },
    {
      [AST.IdentifierAnnotationId]: "Option",
      [I.PrettyHookId]: S.optionPretty,
      [I.ArbitraryHookId]: S.optionArbitrary
    }
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
    to(optionFromSelf(value)),
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
  transform(nullable(value), to(optionFromSelf(value)), O.fromNullable, O.getOrNull)

// ---------------------------------------------
// data/ReadonlyArray
// ---------------------------------------------

/**
 * @category type id
 * @since 1.0.0
 */
export const MinItemsTypeId = "@effect/schema/MinItemsTypeId"

/**
 * @category array
 * @since 1.0.0
 */
export const minItems = <A>(
  n: number,
  options?: AnnotationOptions<ReadonlyArray<A>>
) =>
  <I>(self: Transform<I, ReadonlyArray<A>>): Transform<I, ReadonlyArray<A>> =>
    pipe(
      self,
      filter((a): a is ReadonlyArray<A> => a.length >= n, {
        typeId: MinItemsTypeId,
        description: `an array of at least ${n} items`,
        jsonSchema: { minItems: n },
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const MaxItemsTypeId = "@effect/schema/MaxItemsTypeId"

/**
 * @category array
 * @since 1.0.0
 */
export const maxItems = <A>(
  n: number,
  options?: AnnotationOptions<ReadonlyArray<A>>
) =>
  <I>(self: Transform<I, ReadonlyArray<A>>): Transform<I, ReadonlyArray<A>> =>
    pipe(
      self,
      filter((a): a is ReadonlyArray<A> => a.length <= n, {
        typeId: MaxItemsTypeId,
        description: `an array of at most ${n} items`,
        jsonSchema: { maxItems: n },
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const ItemsCountTypeId = "@effect/schema/ItemsCountTypeId"

/**
 * @category array
 * @since 1.0.0
 */
export const itemsCount = <A>(
  n: number,
  options?: AnnotationOptions<ReadonlyArray<A>>
) =>
  <I>(self: Transform<I, ReadonlyArray<A>>): Transform<I, ReadonlyArray<A>> =>
    pipe(
      self,
      filter((a): a is ReadonlyArray<A> => a.length === n, {
        typeId: ItemsCountTypeId,
        description: `an array of exactly ${n} items`,
        jsonSchema: { minItems: n, maxItems: n },
        ...options
      })
    )

// ---------------------------------------------
// data/ReadonlyMap
// ---------------------------------------------

/**
 * @category constructors
 * @since 1.0.0
 */
export const readonlyMapFromSelf = <IK, K, IV, V>(
  key: Transform<IK, K>,
  value: Transform<IV, V>
): Transform<ReadonlyMap<IK, IV>, ReadonlyMap<K, V>> => {
  return declare(
    [key, value],
    struct({
      size: S.number
    }),
    <IK, K, IV, V>(key: Transform<IK, K>, value: Transform<IV, V>) => {
      const parseResult = P.parseResult(array(tuple(key, value)))
      return (u: unknown, options, self) =>
        !S.isMap(u) ?
          PR.failure(PR.type(self, u)) :
          PR.map(parseResult(Array.from(u.entries()), options), (as) => new Map(as))
    },
    <IK, K, IV, V>(key: Transform<IK, K>, value: Transform<IV, V>) => {
      const encodeResult = P.encodeResult(array(tuple(key, value)))
      return (a: ReadonlyMap<K, V>, options) =>
        PR.map(encodeResult(Array.from(a.entries()), options), (as) => new Map(as))
    },
    {
      [AST.IdentifierAnnotationId]: "ReadonlyMap",
      [I.PrettyHookId]: S.readonlyMapPretty,
      [I.ArbitraryHookId]: S.readonlyMapArbitrary
    }
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
    to(readonlyMapFromSelf(key, value)),
    (entries) => new Map(entries),
    (map) => Array.from(map.entries())
  )

// ---------------------------------------------
// data/ReadonlySet
// ---------------------------------------------

/**
 * @category constructors
 * @since 1.0.0
 */
export const readonlySetFromSelf = <I, A>(
  item: Transform<I, A>
): Transform<ReadonlySet<I>, ReadonlySet<A>> => {
  return declare(
    [item],
    struct({
      size: S.number
    }),
    <I, A>(item: Transform<I, A>) =>
      (u: unknown, options, self) => {
        const parseResult = P.parseResult(array(item))
        return !S.isSet(u) ?
          PR.failure(PR.type(self, u)) :
          PR.map(parseResult(Array.from(u.values()), options), (as) => new Set(as))
      },
    <I, A>(item: Transform<I, A>) =>
      (a: ReadonlySet<A>, options) => {
        const encodeResult = P.encodeResult(array(item))
        return PR.map(encodeResult(Array.from(a.values()), options), (as) => new Set(as))
      },
    {
      [AST.IdentifierAnnotationId]: "ReadonlySet",
      [I.PrettyHookId]: S.readonlySetPretty,
      [I.ArbitraryHookId]: S.readonlySetArbitrary
    }
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
    to(readonlySetFromSelf(item)),
    (as) => new Set(as),
    (set) => Array.from(set)
  )

// ---------------------------------------------
// data/String
// ---------------------------------------------

/**
 * @category type id
 * @since 1.0.0
 */
export const TrimmedTypeId = "@effect/schema/TrimmedTypeId"

const trimmedRegex = /^\S.*\S$|^\S$|^$/

/**
 * Verifies that a string contains no leading or trailing whitespaces.
 *
 * Note. This combinator does not make any transformations, it only validates.
 * If what you were looking for was a combinator to trim strings, then check out the `trim` combinator.
 *
 * @category string
 * @since 1.0.0
 */
export const trimmed = <A extends string>(options?: AnnotationOptions<A>) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter((a): a is A => trimmedRegex.test(a), {
        typeId: TrimmedTypeId,
        description: "a string with no leading or trailing whitespace",
        jsonSchema: {
          type: "string",
          pattern: trimmedRegex.source
        },
        ...options
      })
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const MaxLengthTypeId = "@effect/schema/MaxLengthTypeId"

/**
 * @category string
 * @since 1.0.0
 */
export const maxLength = <A extends string>(
  maxLength: number,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter(
        (a): a is A => a.length <= maxLength,
        {
          typeId: MaxLengthTypeId,
          description: `a string at most ${maxLength} character(s) long`,
          jsonSchema: { maxLength },
          ...options
        }
      )
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const MinLengthTypeId = "@effect/schema/MinLengthTypeId"

/**
 * @category string
 * @since 1.0.0
 */
export const minLength = <A extends string>(
  minLength: number,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter(
        (a): a is A => a.length >= minLength,
        {
          typeId: MinLengthTypeId,
          description: `a string at least ${minLength} character(s) long`,
          jsonSchema: { minLength },
          ...options
        }
      )
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const PatternTypeId = "@effect/schema/PatternTypeId"

/**
 * @category string
 * @since 1.0.0
 */
export const pattern = <A extends string>(
  regex: RegExp,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> => {
    const pattern = regex.source
    return pipe(
      self,
      filter(
        (a): a is A => {
          // The following line ensures that `lastIndex` is reset to `0` in case the user has specified the `g` flag
          regex.lastIndex = 0
          return regex.test(a)
        },
        {
          typeId: { id: PatternTypeId, params: { regex } },
          description: `a string matching the pattern ${pattern}`,
          jsonSchema: { pattern },
          ...options
        }
      )
    )
  }

/**
 * @category type id
 * @since 1.0.0
 */
export const StartsWithTypeId = "@effect/schema/StartsWithTypeId"

/**
 * @category string
 * @since 1.0.0
 */
export const startsWith = <A extends string>(
  startsWith: string,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter(
        (a): a is A => a.startsWith(startsWith),
        {
          typeId: { id: StartsWithTypeId, params: { startsWith } },
          description: `a string starting with ${JSON.stringify(startsWith)}`,
          jsonSchema: { pattern: `^${startsWith}` },
          ...options
        }
      )
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const EndsWithTypeId = "@effect/schema/EndsWithTypeId"

/**
 * @category string
 * @since 1.0.0
 */
export const endsWith = <A extends string>(
  endsWith: string,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter(
        (a): a is A => a.endsWith(endsWith),
        {
          typeId: { id: EndsWithTypeId, params: { endsWith } },
          description: `a string ending with ${JSON.stringify(endsWith)}`,
          jsonSchema: { pattern: `^.*${endsWith}$` },
          ...options
        }
      )
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const IncludesTypeId = "@effect/schema/IncludesTypeId"

/**
 * @category string
 * @since 1.0.0
 */
export const includes = <A extends string>(
  searchString: string,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    pipe(
      self,
      filter(
        (a): a is A => a.includes(searchString),
        {
          typeId: { id: IncludesTypeId, params: { includes: searchString } },
          description: `a string including ${JSON.stringify(searchString)}`,
          jsonSchema: { pattern: `.*${searchString}.*` },
          ...options
        }
      )
    )

/**
 * This combinator allows removing whitespaces from the beginning and end of a string.
 *
 * @category string
 * @since 1.0.0
 */
export const trim = <I>(self: Transform<I, string>): Transform<I, string> =>
  transform(
    self,
    pipe(to(self), trimmed()),
    (s) => s.trim(),
    identity
  )

/**
 * This schema allows removing whitespaces from the beginning and end of a string.
 *
 * @category string
 * @since 1.0.0
 */
export const Trim: Transform<string, string> = trim(S.string)

/**
 * @category string
 * @since 1.0.0
 */
export const length = <A extends string>(
  length: number,
  options?: AnnotationOptions<A>
) =>
  <I>(self: Transform<I, A>): Transform<I, A> =>
    minLength(length, options)(maxLength<A>(length)(self))

/**
 * @category string
 * @since 1.0.0
 */
export const nonEmpty = <A extends string>(
  options?: AnnotationOptions<A>
): <I>(self: Transform<I, A>) => Transform<I, A> => minLength(1, options)
