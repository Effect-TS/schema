/**
 * @since 1.0.0
 */

import * as B from "@effect/data/Bigint"
import type { Brand } from "@effect/data/Brand"
import { RefinedConstructorsTypeId } from "@effect/data/Brand"
import type { Chunk } from "@effect/data/Chunk"
import * as C from "@effect/data/Chunk"
import * as D from "@effect/data/Data"
import * as E from "@effect/data/Either"
import type { Either } from "@effect/data/Either"
import * as Equal from "@effect/data/Equal"
import { pipe } from "@effect/data/Function"
import * as Hash from "@effect/data/Hash"
import type { Option } from "@effect/data/Option"
import { isDate } from "@effect/data/Predicate"
import type { Predicate, Refinement } from "@effect/data/Predicate"
import * as RA from "@effect/data/ReadonlyArray"
import * as A from "@effect/schema/annotation/AST"
import * as H from "@effect/schema/annotation/Hook"
import { Arbitrary } from "@effect/schema/Arbitrary"
import * as Arb from "@effect/schema/Arbitrary"
import * as AST from "@effect/schema/AST"
import type { ParseOptions } from "@effect/schema/AST"
import * as N from "@effect/schema/data/Number"
import * as DataObject from "@effect/schema/data/Object"
import * as DataOption from "@effect/schema/data/Option"
import * as SRA from "@effect/schema/data/ReadonlyArray"
import * as S from "@effect/schema/data/String"
import { formatErrors } from "@effect/schema/formatter/Tree"
import * as I from "@effect/schema/internal/common"
import * as P from "@effect/schema/Parser"
import type { ParseResult } from "@effect/schema/ParseResult"
import * as PR from "@effect/schema/ParseResult"
import type { Pretty } from "@effect/schema/Pretty"

/**
 * @category model
 * @since 1.0.0
 */
export interface Schema<A> {
  readonly A: (_: A) => A
  readonly ast: AST.AST
}

/**
 * @since 1.0.0
 */
export type Infer<S extends { readonly A: (_: any) => any }> = Parameters<S["A"]>[0]

// ---------------------------------------------
// constructors
// ---------------------------------------------

/**
 * @category constructors
 * @since 1.0.0
 */
export const make: <A>(ast: AST.AST) => Schema<A> = I.makeSchema

/**
 * @category constructors
 * @since 1.0.0
 */
export const literal: <Literals extends ReadonlyArray<AST.LiteralValue>>(
  ...literals: Literals
) => Schema<Literals[number]> = I.literal

/**
 * @category constructors
 * @since 1.0.0
 */
export const uniqueSymbol: <S extends symbol>(
  symbol: S,
  annotations?: AST.Annotated["annotations"]
) => Schema<S> = I.uniqueSymbol

/**
 * @category constructors
 * @since 1.0.0
 */
export const enums = <A extends { [x: string]: string | number }>(
  enums: A
): Schema<A[keyof A]> =>
  make(
    AST.createEnums(
      Object.keys(enums).filter(
        (key) => typeof enums[enums[key]] !== "number"
      ).map((key) => [key, enums[key]])
    )
  )

/**
 * @category constructors
 * @since 1.0.0
 */
export const instanceOf: <A extends abstract new(...args: any) => any>(
  constructor: A,
  annotationOptions?: AnnotationOptions<object>
) => Schema<InstanceType<A>> = DataObject.instanceOf

/**
 * @since 1.0.0
 */
export type Join<T> = T extends [infer Head, ...infer Tail]
  ? `${Head & (string | number | bigint | boolean | null | undefined)}${Tail extends [] ? ""
    : Join<Tail>}`
  : never

/**
 * @category constructors
 * @since 1.0.0
 */
export const templateLiteral = <T extends [Schema<any>, ...Array<Schema<any>>]>(
  ...[head, ...tail]: T
): Schema<Join<{ [K in keyof T]: Infer<T[K]> }>> => {
  let types: ReadonlyArray<AST.TemplateLiteral | AST.Literal> = getTemplateLiterals(head.ast)
  for (const span of tail) {
    types = pipe(
      types,
      RA.flatMap((a) => getTemplateLiterals(span.ast).map((b) => combineTemplateLiterals(a, b)))
    )
  }
  return make(AST.createUnion(types))
}

const combineTemplateLiterals = (
  a: AST.TemplateLiteral | AST.Literal,
  b: AST.TemplateLiteral | AST.Literal
): AST.TemplateLiteral | AST.Literal => {
  if (AST.isLiteral(a)) {
    return AST.isLiteral(b) ?
      AST.createLiteral(String(a.literal) + String(b.literal)) :
      AST.createTemplateLiteral(String(a.literal) + b.head, b.spans)
  }
  if (AST.isLiteral(b)) {
    return AST.createTemplateLiteral(
      a.head,
      pipe(
        a.spans,
        RA.modifyNonEmptyLast((span) => ({ ...span, literal: span.literal + String(b.literal) }))
      )
    )
  }
  return AST.createTemplateLiteral(
    a.head,
    pipe(
      a.spans,
      RA.modifyNonEmptyLast((span) => ({ ...span, literal: span.literal + String(b.head) })),
      RA.appendAll(b.spans)
    )
  )
}

const getTemplateLiterals = (
  ast: AST.AST
): ReadonlyArray<AST.TemplateLiteral | AST.Literal> => {
  switch (ast._tag) {
    case "Literal":
      return [ast]
    case "NumberKeyword":
    case "StringKeyword":
      return [AST.createTemplateLiteral("", [{ type: ast, literal: "" }])]
    case "Union":
      return pipe(ast.types, RA.flatMap(getTemplateLiterals))
    default:
      throw new Error(`Unsupported template literal span ${ast._tag}`)
  }
}

/**
  @category combinators
  @since 1.0.0
*/
export const typeAlias: (
  typeParameters: ReadonlyArray<Schema<any>>,
  type: Schema<any>,
  annotations?: AST.Annotated["annotations"]
) => Schema<any> = I.typeAlias

// ---------------------------------------------
// filters
// ---------------------------------------------

/**
 * @category filters
 * @since 1.0.0
 */
export const minLength: <A extends string>(
  minLength: number,
  annotationOptions?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = S.minLength

/**
 * @category filters
 * @since 1.0.0
 */
export const maxLength: <A extends string>(
  maxLength: number,
  annotationOptions?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = S.maxLength

/**
 * @category filters
 * @since 1.0.0
 */
export const length = <A extends string>(
  length: number,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> => minLength(length, annotationOptions)(maxLength<A>(length)(self))

/**
 * @category filters
 * @since 1.0.0
 */
export const nonEmpty = <A extends string>(
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> => minLength(1, annotationOptions)

/**
 * @category filters
 * @since 1.0.0
 */
export const startsWith: <A extends string>(
  startsWith: string,
  annotationOptions?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = S.startsWith

/**
 * @category filters
 * @since 1.0.0
 */
export const endsWith: <A extends string>(
  endsWith: string,
  annotationOptions?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = S.endsWith

/**
 * @category filters
 * @since 1.0.0
 */
export const includes: <A extends string>(
  searchString: string,
  annotationOptions?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = S.includes

/**
 * @category filters
 * @since 1.0.0
 */
export const pattern: <A extends string>(
  regex: RegExp,
  annotationOptions?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = S.pattern

/**
 * @category filters
 * @since 1.0.0
 */
export const lessThan: <A extends number>(
  max: number,
  annotationOptions?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = N.lessThan

/**
 * @category filters
 * @since 1.0.0
 */
export const lessThanOrEqualTo: <A extends number>(
  max: number,
  annotationOptions?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = N.lessThanOrEqualTo

/**
 * @category filters
 * @since 1.0.0
 */
export const greaterThan: <A extends number>(
  min: number,
  annotationOptions?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = N.greaterThan

/**
 * @category filters
 * @since 1.0.0
 */
export const greaterThanOrEqualTo: <A extends number>(
  min: number,
  annotationOptions?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = N.greaterThanOrEqualTo

/**
 * @category filters
 * @since 1.0.0
 */
export const between: <A extends number>(
  min: number,
  max: number,
  annotationOptions?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = N.between

/**
 * @category filters
 * @since 1.0.0
 */
export const int: <A extends number>(
  annotationOptions?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = N.int

/**
 * Note. This combinator does not make any transformations, it only validates.
 * If what you were looking for was a combinator to trim strings, then check out the `trim` combinator.
 *
 * @category filters
 * @since 1.0.0
 */
export const trimmed: <A extends string>(
  annotationOptions?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = S.trimmed

/**
 * @category filters
 * @since 1.0.0
 */
export const nonNaN: <A extends number>(
  annotationOptions?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = N.nonNaN

/**
 * @category filters
 * @since 1.0.0
 */
export const finite: <A extends number>(
  options?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = N.finite

/**
 * @category filters
 * @since 1.0.0
 */
export const positive: <A extends number>(
  options?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = N.positive

/**
 * @category filters
 * @since 1.0.0
 */
export const negative: <A extends number>(
  options?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = N.negative

/**
 * @category filters
 * @since 1.0.0
 */
export const nonNegative: <A extends number>(
  options?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = N.nonNegative

/**
 * @category filters
 * @since 1.0.0
 */
export const nonPositive: <A extends number>(
  options?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = N.nonPositive

/**
 * @category filters
 * @since 1.0.0
 */
export const maxItems: <A>(
  n: number,
  options?: AnnotationOptions<ReadonlyArray<A>>
) => (self: Schema<ReadonlyArray<A>>) => Schema<ReadonlyArray<A>> = SRA.maxItems

/**
 * @category filters
 * @since 1.0.0
 */
export const minItems: <A>(
  n: number,
  options?: AnnotationOptions<ReadonlyArray<A>>
) => (self: Schema<ReadonlyArray<A>>) => Schema<ReadonlyArray<A>> = SRA.minItems

/**
 * @category filters
 * @since 1.0.0
 */
export const itemsCount: <A>(
  n: number,
  options?: AnnotationOptions<ReadonlyArray<A>>
) => (self: Schema<ReadonlyArray<A>>) => Schema<ReadonlyArray<A>> = SRA.itemsCount

// ---------------------------------------------
// combinators
// ---------------------------------------------

/**
 * @category combinators
 * @since 1.0.0
 */
export const union: <Members extends ReadonlyArray<Schema<any>>>(
  ...members: Members
) => Schema<Infer<Members[number]>> = I.union

/**
 * @category combinators
 * @since 1.0.0
 */
export const nullable: <A>(self: Schema<A>) => Schema<A | null> = I.nullable

/**
 * @category combinators
 * @since 1.0.0
 */
export const keyof = <A>(schema: Schema<A>): Schema<keyof A> => make(AST.keyof(schema.ast))

/**
 * @category combinators
 * @since 1.0.0
 */
export const tuple: <Elements extends ReadonlyArray<Schema<any>>>(
  ...elements: Elements
) => Schema<{ readonly [K in keyof Elements]: Infer<Elements[K]> }> = I.tuple

/**
 * @category combinators
 * @since 1.0.0
 */
export const rest = <R>(rest: Schema<R>) =>
  <A extends ReadonlyArray<any>>(self: Schema<A>): Schema<readonly [...A, ...Array<R>]> => {
    if (AST.isTuple(self.ast)) {
      return make(AST.appendRestElement(self.ast, rest.ast))
    }
    throw new Error("`rest` is not supported on this schema")
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const element = <E>(element: Schema<E>) =>
  <A extends ReadonlyArray<any>>(self: Schema<A>): Schema<readonly [...A, E]> => {
    if (AST.isTuple(self.ast)) {
      return make(AST.appendElement(self.ast, AST.createElement(element.ast, false)))
    }
    throw new Error("`element` is not supported on this schema")
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const optionalElement = <E>(element: Schema<E>) =>
  <A extends ReadonlyArray<any>>(self: Schema<A>): Schema<readonly [...A, E?]> => {
    if (AST.isTuple(self.ast)) {
      return make(AST.appendElement(self.ast, AST.createElement(element.ast, true)))
    }
    throw new Error("`optionalElement` is not supported on this schema")
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const array: <A>(item: Schema<A>) => Schema<ReadonlyArray<A>> = I.array

/**
 * @category combinators
 * @since 1.0.0
 */
export const nonEmptyArray = <A>(
  item: Schema<A>
): Schema<readonly [A, ...Array<A>]> => pipe(tuple(item), rest(item))

/**
 * @since 1.0.0
 */
export type Spread<A> = {
  [K in keyof A]: A[K]
} extends infer B ? B : never

/**
 * @category symbol
 * @since 1.0.0
 */
export const OptionalSchemaId = Symbol.for("@effect/schema/Schema/OptionalSchema")

/**
 * @category symbol
 * @since 1.0.0
 */
export type OptionalSchemaId = typeof OptionalSchemaId

/**
 * @since 1.0.0
 */
export interface OptionalSchema<A> {
  readonly A: (_: A) => A
  readonly _id: OptionalSchemaId
}

/**
 * @category combinators
 * @since 1.0.0
 */
export const optional: <A>(schema: Schema<A>) => OptionalSchema<A> = I.optional

/**
 * @since 1.0.0
 */
export type OptionalKeys<T> = {
  [K in keyof T]: T[K] extends OptionalSchema<any> ? K : never
}[keyof T]

/**
 * @category combinators
 * @since 1.0.0
 */
export const struct: <Fields extends Record<PropertyKey, Schema<any> | OptionalSchema<any>>>(
  fields: Fields
) => Schema<
  Spread<
    & { readonly [K in Exclude<keyof Fields, OptionalKeys<Fields>>]: Infer<Fields[K]> }
    & { readonly [K in OptionalKeys<Fields>]?: Infer<Fields[K]> }
  >
> = I.struct

/**
 * @category combinators
 * @since 1.0.0
 */
export const pick = <A, Keys extends ReadonlyArray<keyof A>>(...keys: Keys) =>
  (self: Schema<A>): Schema<{ readonly [P in Keys[number]]: A[P] }> =>
    make(AST.pick(self.ast, keys))

/**
 * @category combinators
 * @since 1.0.0
 */
export const omit = <A, Keys extends ReadonlyArray<keyof A>>(...keys: Keys) =>
  (self: Schema<A>): Schema<{ readonly [P in Exclude<keyof A, Keys[number]>]: A[P] }> =>
    make(AST.omit(self.ast, keys))

/**
 * Returns an object containing all property signatures of a given schema.
 *
 * ```
 * Schema<A> -> { [K in keyof A]: Schema<A[K]> }
 * ```
 *
 * @param schema - The schema to extract property signatures from.
 *
 * @example
 * import * as S from "@effect/schema"
 *
 * const Person = S.struct({
 *   name: S.string,
 *   age: S.number
 * })
 *
 * const shape = S.getPropertySignatures(Person)
 *
 * assert.deepStrictEqual(shape.name, S.string)
 * assert.deepStrictEqual(shape.age, S.number)
 *
 * @since 1.0.0
 */
export const getPropertySignatures = <A>(schema: Schema<A>): { [K in keyof A]: Schema<A[K]> } => {
  const out: Record<PropertyKey, Schema<any>> = {}
  const propertySignatures = AST._getPropertySignatures(schema.ast)
  for (const propertySignature of propertySignatures) {
    out[propertySignature.name] = make(propertySignature.type)
  }
  return out as any
}

/**
 * @category model
 * @since 1.0.0
 */
export interface BrandSchema<A extends Brand<any>> extends Schema<A>, Brand.Constructor<A> {}

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
 * import * as S from "@effect/schema"
 * import { pipe } from "@effect/data/Function"
 *
 * const Int = pipe(S.number, S.int(), S.brand("Int"))
 * type Int = S.Infer<typeof Int> // number & Brand<"Int">
 *
 * @category combinators
 * @since 1.0.0
 */
export const brand = <B extends string, A>(
  brand: B,
  options?: AnnotationOptions<A>
) =>
  (self: Schema<A>): BrandSchema<A & Brand<B>> => {
    const annotations = I.toAnnotations(options)
    annotations[A.BrandId] = [...getBrands(self.ast), brand]
    const ast = AST.mergeAnnotations(self.ast, annotations)
    const schema: Schema<A & Brand<B>> = make(ast)
    const decodeOrThrow = P.decodeOrThrow(schema)
    const getOption = P.getOption(schema)
    const decode = P.decode(schema)
    const is = P.is(schema)
    const out: any = Object.assign((input: unknown) => decodeOrThrow(input), {
      [RefinedConstructorsTypeId]: RefinedConstructorsTypeId,
      ast,
      option: (input: unknown) => getOption(input),
      either: (input: unknown) =>
        E.mapLeft(decode(input), (errors) => [{ meta: input, message: formatErrors(errors) }]),
      refine: (input: unknown): input is A & Brand<B> => is(input)
    })
    return out
  }

const getBrands = (ast: AST.AST): Array<string> =>
  (ast.annotations[A.BrandId] as Array<string> | undefined) || []

/**
 * @category combinators
 * @since 1.0.0
 */
export const partial = <A>(self: Schema<A>): Schema<Partial<A>> => make(AST.partial(self.ast))

/**
 * @category combinators
 * @since 1.0.0
 */
export const record: <K extends string | symbol, V>(
  key: Schema<K>,
  value: Schema<V>
) => Schema<{ readonly [k in K]: V }> = I.record

const isOverlappingPropertySignatures = (x: AST.TypeLiteral, y: AST.TypeLiteral): boolean =>
  x.propertySignatures.some((px) => y.propertySignatures.some((py) => px.name === py.name))

const isOverlappingIndexSignatures = (x: AST.TypeLiteral, y: AST.TypeLiteral): boolean =>
  x.indexSignatures.some((ix) =>
    y.indexSignatures.some((iy) => {
      const bx = AST._getParameter(ix.parameter)
      const by = AST._getParameter(iy.parameter)
      // there cannot be two string index signatures or two symbol index signatures at the same time
      return (AST.isStringKeyword(bx) && AST.isStringKeyword(by)) ||
        (AST.isSymbolKeyword(bx) && AST.isSymbolKeyword(by))
    })
  )

const intersectUnionMembers = (xs: ReadonlyArray<AST.AST>, ys: ReadonlyArray<AST.AST>) => {
  if (xs.every(AST.isTypeLiteral) && ys.every(AST.isTypeLiteral)) {
    return AST.createUnion(
      xs.flatMap((x) =>
        ys.map((y) => {
          if (isOverlappingPropertySignatures(x, y)) {
            throw new Error("`extend` cannot handle overlapping property signatures")
          }
          if (isOverlappingIndexSignatures(x, y)) {
            throw new Error("`extend` cannot handle overlapping index signatures")
          }
          return AST.createTypeLiteral(
            x.propertySignatures.concat(y.propertySignatures),
            x.indexSignatures.concat(y.indexSignatures)
          )
        })
      )
    )
  }
  throw new Error("`extend` can only handle type literals or unions of type literals")
}

/**
 * @category combinators
 * @since 1.0.0
 */
export const extend = <B>(that: Schema<B>) =>
  <A>(self: Schema<A>): Schema<Spread<A & B>> =>
    make(
      intersectUnionMembers(
        AST.isUnion(self.ast) ? self.ast.types : [self.ast],
        AST.isUnion(that.ast) ? that.ast.types : [that.ast]
      )
    )

/**
 * @category combinators
 * @since 1.0.0
 */
export const lazy: <A>(
  f: () => Schema<A>,
  annotations?: AST.Annotated["annotations"]
) => Schema<A> = I.lazy

/**
 * @category combinators
 * @since 1.0.0
 */
export type AnnotationOptions<A> = {
  typeId?: A.Type | { id: A.Type; params: unknown }
  message?: A.Message<A>
  identifier?: A.Identifier
  title?: A.Title
  description?: A.Description
  examples?: A.Examples
  documentation?: A.Documentation
  jsonSchema?: A.JSONSchema
}

/**
 * @category combinators
 * @since 1.0.0
 */
export function filter<A, B extends A>(
  refinement: Refinement<A, B>,
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<B>
export function filter<A>(
  predicate: Predicate<A>,
  options?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A>
export function filter<A>(
  predicate: Predicate<A>,
  options?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> {
  return I.filter(predicate, options)
}

/**
  Create a new `Schema` by transforming the input and output of an existing `Schema`
  using the provided decoding functions.

  @category combinators
  @since 1.0.0
 */
export const transformOrFail: <A, B>(
  to: Schema<B>,
  decode: (input: A, options?: ParseOptions) => ParseResult<B>,
  encode: (input: B, options?: ParseOptions) => ParseResult<A>
) => (self: Schema<A>) => Schema<B> = I.transformOrFail

/**
  Create a new `Schema` by transforming the input and output of an existing `Schema`
  using the provided mapping functions.

  @category combinators
  @since 1.0.0
*/
export const transform: <A, B>(
  to: Schema<B>,
  f: (a: A) => B,
  g: (b: B) => A
) => (self: Schema<A>) => Schema<B> = I.transform

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
 * import * as S from "@effect/schema"
 * import { pipe } from "@effect/data/Function"
 *
 * const Circle = S.struct({ radius: S.number })
 * const Square = S.struct({ sideLength: S.number })
 * const Shape = S.union(
 *   pipe(Circle, S.attachPropertySignature("kind", "circle")),
 *   pipe(Square, S.attachPropertySignature("kind", "square"))
 * )
 *
 * assert.deepStrictEqual(S.decodeOrThrow(Shape)({ radius: 10 }), {
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
  <A extends object>(schema: Schema<A>): Schema<Spread<A & { readonly [k in K]: V }>> =>
    pipe(
      schema,
      transform<A, any>(
        pipe(schema, extend(struct({ [key]: literal(value) }))),
        (a) => ({ ...a, [key]: value }),
        ({ [key]: _key, ...rest }) => rest
      )
    )

// ---------------------------------------------
// annotations
// ---------------------------------------------

/**
 * @category annotations
 * @since 1.0.0
 */
export const annotations: (
  annotations: AST.Annotated["annotations"]
) => <A>(self: Schema<A>) => Schema<A> = I.annotations

/**
 * @category annotations
 * @since 1.0.0
 */
export const message = (message: A.Message<unknown>) =>
  <A>(self: Schema<A>): Schema<A> => make(AST.setAnnotation(self.ast, A.MessageId, message))

/**
 * @category annotations
 * @since 1.0.0
 */
export const identifier = (identifier: A.Identifier) =>
  <A>(self: Schema<A>): Schema<A> => make(AST.setAnnotation(self.ast, A.IdentifierId, identifier))

/**
 * @category annotations
 * @since 1.0.0
 */
export const title = (title: A.Title) =>
  <A>(self: Schema<A>): Schema<A> => make(AST.setAnnotation(self.ast, A.TitleId, title))

/**
 * @category annotations
 * @since 1.0.0
 */
export const description = (description: A.Description) =>
  <A>(self: Schema<A>): Schema<A> => make(AST.setAnnotation(self.ast, A.DescriptionId, description))

/**
 * @category annotations
 * @since 1.0.0
 */
export const examples = (examples: A.Examples) =>
  <A>(self: Schema<A>): Schema<A> => make(AST.setAnnotation(self.ast, A.ExamplesId, examples))

/**
 * @category annotations
 * @since 1.0.0
 */
export const documentation = (documentation: A.Documentation) =>
  <A>(self: Schema<A>): Schema<A> =>
    make(AST.setAnnotation(self.ast, A.DocumentationId, documentation))

// ---------------------------------------------
// data
// ---------------------------------------------

const _undefined: Schema<undefined> = I._undefined

const _void: Schema<void> = I._void

const _null: Schema<null> = I._null

export {
  /**
   * @category primitives
   * @since 1.0.0
   */
  _null as null,
  /**
   * @category primitives
   * @since 1.0.0
   */
  _undefined as undefined,
  /**
   * @category primitives
   * @since 1.0.0
   */
  _void as void
}

/**
 * @category primitives
 * @since 1.0.0
 */
export const never: Schema<never> = I.never

/**
 * @category primitives
 * @since 1.0.0
 */
export const unknown: Schema<unknown> = I.unknown

/**
 * @category primitives
 * @since 1.0.0
 */
export const any: Schema<any> = I.any

/**
 * @category primitives
 * @since 1.0.0
 */
export const string: Schema<string> = I.string

/**
 * @category primitives
 * @since 1.0.0
 */
export const number: Schema<number> = I.number

/**
 * @category primitives
 * @since 1.0.0
 */
export const boolean: Schema<boolean> = I.boolean

/**
 * @category primitives
 * @since 1.0.0
 */
export const bigint: Schema<bigint> = I.bigint

/**
 * @category primitives
 * @since 1.0.0
 */
export const symbol: Schema<symbol> = I.symbol

/**
 * @category primitives
 * @since 1.0.0
 */
export const object: Schema<object> = I.object

/**
 * Transforms a `string` into a `string` with no leading or trailing whitespace.
 *
 * @category parsers
 * @since 1.0.0
 */
export const trim = (item: Schema<string>): Schema<string> => S.trim(item)

/**
 * @category parsers
 * @since 1.0.0
 */
export const option: <A>(value: Schema<A>) => Schema<Option<A>> = DataOption.parseNullable

/**
 * Restricts the value to be within the range specified by the minimum and maximum values.
 *
 * @category parsers
 * @since 1.0.0
 */
export const clamp: <A extends number>(
  min: number,
  max: number,
  options?: AnnotationOptions<A>
) => (self: Schema<A>) => Schema<A> = N.clamp

// ---------------------------------------------
// data/Bigint
// ---------------------------------------------

/**
 * @since 1.0.0
 */
export const GreaterThanBigintTypeId = "@effect/schema/GreaterThanBigintTypeId"

/**
 * @since 1.0.0
 */
export const greaterThanBigint = <A extends bigint>(
  min: bigint,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => a > min, {
        typeId: GreaterThanBigintTypeId,
        description: `a bigint greater than ${min}n`,
        jsonSchema: { exclusiveMinimum: min },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const GreaterThanOrEqualToBigintTypeId = "@effect/schema/GreaterThanOrEqualToBigintTypeId"

/**
 * @since 1.0.0
 */
export const greaterThanOrEqualToBigint = <A extends bigint>(
  min: bigint,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => a >= min, {
        typeId: GreaterThanOrEqualToBigintTypeId,
        description: `a bigint greater than or equal to ${min}n`,
        jsonSchema: { minimum: min },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const LessThanBigintTypeId = "@effect/schema/LessThanBigintTypeId"

/**
 * @since 1.0.0
 */
export const lessThanBigint = <A extends bigint>(
  max: bigint,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => a < max, {
        typeId: LessThanBigintTypeId,
        description: `a bigint less than ${max}n`,
        jsonSchema: { exclusiveMaximum: max },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const LessThanOrEqualToBigintTypeId = "@effect/schema/LessThanOrEqualToBigintTypeId"

/**
 * @since 1.0.0
 */
export const lessThanOrEqualToBigint = <A extends bigint>(
  max: bigint,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => a <= max, {
        typeId: LessThanOrEqualToBigintTypeId,
        description: `a bigint less than or equal to ${max}n`,
        jsonSchema: { maximum: max },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const BetweenBigintTypeId = "@effect/schema/BetweenBigintTypeId"

/**
 * @since 1.0.0
 */
export const betweenBigint = <A extends bigint>(
  min: bigint,
  max: bigint,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => a >= min && a <= max, {
        typeId: BetweenBigintTypeId,
        description: `a bigint between ${min}n and ${max}n`,
        jsonSchema: { maximum: max, minimum: min },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const PositiveBigintTypeId = "@effect/schema/PositiveBigintTypeId"

/**
 * @since 1.0.0
 */
export const positiveBigint = <A extends bigint>(
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  greaterThanBigint(0n, {
    typeId: PositiveBigintTypeId,
    description: "a positive bigint",
    ...annotationOptions
  })

/**
 * @since 1.0.0
 */
export const NegativeBigintTypeId = "@effect/schema/NegativeBigintTypeId"

/**
 * @since 1.0.0
 */
export const negativeBigint = <A extends bigint>(
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  lessThanBigint(0n, {
    typeId: NegativeBigintTypeId,
    description: "a negative bigint",
    ...annotationOptions
  })

/**
 * @since 1.0.0
 */
export const NonNegativeBigintTypeId = "@effect/schema/NonNegativeBigintTypeId"

/**
 * @since 1.0.0
 */
export const nonNegativeBigint = <A extends bigint>(
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  greaterThanOrEqualToBigint(0n, {
    typeId: NonNegativeBigintTypeId,
    description: "a non-negative bigint",
    ...annotationOptions
  })

/**
 * @since 1.0.0
 */
export const NonPositiveBigintTypeId = "@effect/schema/NonPositiveBigintTypeId"

/**
 * @since 1.0.0
 */
export const nonPositiveBigint = <A extends bigint>(
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  lessThanOrEqualToBigint(0n, {
    typeId: NonPositiveBigintTypeId,
    description: "a non-positive bigint",
    ...annotationOptions
  })

/**
 * Clamps a bigint between a minimum and a maximum value.
 *
 * @since 1.0.0
 */
export const clampBigint = <A extends bigint>(min: bigint, max: bigint) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      transform(
        pipe(self, betweenBigint(min, max)),
        (self) => B.clamp(self, min, max) as A,
        (self) => B.clamp(self, min, max) as A
      )
    )

// ---------------------------------------------
// data/Brand
// ---------------------------------------------

/**
 * @since 1.0.0
 */
export const BrandTypeId = "@effect/schema/BrandTypeId"

/**
 * @since 1.0.0
 */
export const fromBrand = <C extends Brand<string>>(
  constructor: Brand.Constructor<C>,
  annotationOptions?: AnnotationOptions<Brand.Unbranded<C>>
) =>
  <A extends Brand.Unbranded<C>>(self: Schema<A>): Schema<A & C> =>
    pipe(
      self,
      filter<A, A & C>(
        (x): x is A & C => constructor.refine(x),
        {
          typeId: BrandTypeId,
          message: (a) =>
            (constructor.either(a) as E.Left<Brand.BrandErrors>).left.map((v) => v.message)
              .join(", "),
          ...annotationOptions
        }
      )
    )

// ---------------------------------------------
// data/Chunk
// ---------------------------------------------

const chunkParser = <A>(item: P.Parser<A>): P.Parser<Chunk<A>> => {
  const items = P.decode(I.array(item))
  const schema = chunk(item)
  return I.makeParser(
    schema,
    (u, options) =>
      !C.isChunk(u) ?
        PR.failure(PR.type(schema.ast, u)) :
        pipe(C.toReadonlyArray(u), (us) => items(us, options), I.map(C.fromIterable))
  )
}

const chunkArbitrary = <A>(item: Arbitrary<A>): Arbitrary<Chunk<A>> =>
  I.makeArbitrary(chunk(item), (fc) => fc.array(item.arbitrary(fc)).map(C.fromIterable))

const chunkPretty = <A>(item: Pretty<A>): Pretty<Chunk<A>> =>
  I.makePretty(
    chunk(item),
    (c) => `Chunk(${C.toReadonlyArray(c).map(item.pretty).join(", ")})`
  )

/**
 * @since 1.0.0
 */
export const chunk = <A>(item: Schema<A>): Schema<Chunk<A>> =>
  typeAlias(
    [item],
    struct({
      _id: uniqueSymbol(Symbol.for("@effect/data/Chunk")),
      length: number
    }),
    {
      [A.IdentifierId]: "Chunk",
      [H.ParserHookId]: H.hook(chunkParser),
      [H.PrettyHookId]: H.hook(chunkPretty),
      [H.ArbitraryHookId]: H.hook(chunkArbitrary)
    }
  )

/**
 * @since 1.0.0
 */
export const chunkFromValues = <A>(item: Schema<A>): Schema<Chunk<A>> =>
  pipe(array(item), transform(chunk(item), C.fromIterable, C.toReadonlyArray))

// ---------------------------------------------
// data/Data
// ---------------------------------------------

const toData = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(a: A): D.Data<A> =>
  Array.isArray(a) ? D.array(a) : D.struct(a)

const dataParser = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  item: P.Parser<A>
): P.Parser<D.Data<A>> => {
  const decode = P.decode(item)
  const schema = data(item)

  return I.makeParser(
    schema,
    (u, options) =>
      !Equal.isEqual(u) ?
        PR.failure(PR.type(schema.ast, u)) :
        pipe(decode(u, options), I.map(toData))
  )
}

const dataArbitrary = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  item: Arbitrary<A>
): Arbitrary<D.Data<A>> => I.makeArbitrary(data(item), (fc) => item.arbitrary(fc).map(toData))

const dataPretty = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  item: Pretty<A>
): Pretty<D.Data<A>> =>
  I.makePretty(
    data(item),
    (d) => `Data(${item.pretty(d)})`
  )

/**
 * @since 1.0.0
 */
export const data = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  item: Schema<A>
): Schema<D.Data<A>> =>
  typeAlias(
    [item],
    item,
    {
      [A.IdentifierId]: "Data",
      [H.ParserHookId]: H.hook(dataParser),
      [H.PrettyHookId]: H.hook(dataPretty),
      [H.ArbitraryHookId]: H.hook(dataArbitrary)
    }
  )

/**
 * @since 1.0.0
 */
export const fromStructure = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  item: Schema<A>
): Schema<D.Data<A>> =>
  pipe(
    item,
    transform(data(item), toData, (a) =>
      // @ts-expect-error
      Array.isArray(a) ? Array.from(a) : Object.assign({}, a))
  )

// ---------------------------------------------
// data/Date
// ---------------------------------------------

const dateParser = (): P.Parser<Date> =>
  I.makeParser(date, (u) => !isDate(u) ? PR.failure(PR.type(date.ast, u)) : PR.success(u))

const dateArbitrary = (): Arbitrary<Date> => I.makeArbitrary(date, (fc) => fc.date())

const datePretty = (): Pretty<Date> =>
  I.makePretty(date, (date) => `new Date(${JSON.stringify(date)})`)

/**
 * @since 1.0.0
 */
export const date: Schema<Date> = typeAlias([], I.struct({}), {
  [A.IdentifierId]: "Date",
  [H.ParserHookId]: H.hook(dateParser),
  [H.PrettyHookId]: H.hook(datePretty),
  [H.ArbitraryHookId]: H.hook(dateArbitrary)
})

/**
  Transforms a `string` into a `Date` by parsing the string using `Date.parse`.

  @since 1.0.0
*/
export const dateFromString = (self: Schema<string>): Schema<Date> => {
  const schema: Schema<Date> = pipe(
    self,
    transformOrFail(
      date,
      (s) => {
        const n = Date.parse(s)
        return isNaN(n)
          ? PR.failure(PR.type(schema.ast, s))
          : PR.success(new Date(n))
      },
      (n) => PR.success(n.toISOString())
    )
  )
  return schema
}

// ---------------------------------------------
// data/Either
// ---------------------------------------------

const eitherParser = <E, A>(left: P.Parser<E>, right: P.Parser<A>): P.Parser<Either<E, A>> => {
  const schema = either(left, right)
  const decodeLeft = P.decode(left)
  const decodeRight = P.decode(right)
  return I.makeParser(
    schema,
    (u, options) =>
      !E.isEither(u) ?
        PR.failure(PR.type(schema.ast, u)) :
        E.isLeft(u) ?
        pipe(decodeLeft(u.left, options), I.map(E.left)) :
        pipe(decodeRight(u.right, options), I.map(E.right))
  )
}

const eitherArbitrary = <E, A>(
  left: Arbitrary<E>,
  right: Arbitrary<A>
): Arbitrary<Either<E, A>> => {
  const struct = Arb.arbitrary(eitherInline(left, right))
  return I.makeArbitrary(
    either(left, right),
    (fc) => struct(fc).map(E.match((e) => E.left(e), (a) => E.right(a)))
  )
}

const eitherPretty = <E, A>(left: Pretty<E>, right: Pretty<A>): Pretty<Either<E, A>> =>
  I.makePretty(
    either(left, right),
    E.match(
      (e) => `left(${left.pretty(e)})`,
      (a) => `right(${right.pretty(a)})`
    )
  )

const eitherInline = <E, A>(left: Schema<E>, right: Schema<A>): Schema<Either<E, A>> =>
  union(
    struct({
      _tag: literal("Left"),
      left,
      [Equal.symbol]: I.any,
      [Hash.symbol]: I.any
    }),
    struct({
      _tag: literal("Right"),
      right,
      [Equal.symbol]: I.any,
      [Hash.symbol]: I.any
    })
  )

/**
 * @since 1.0.0
 */
export const either = <E, A>(
  left: Schema<E>,
  right: Schema<A>
): Schema<Either<E, A>> =>
  typeAlias([left, right], eitherInline(left, right), {
    [A.IdentifierId]: "Either",
    [H.ParserHookId]: H.hook(eitherParser),
    [H.PrettyHookId]: H.hook(eitherPretty),
    [H.ArbitraryHookId]: H.hook(eitherArbitrary)
  })

// ---------------------------------------------
// data/Json
// ---------------------------------------------

/**
 * @since 1.0.0
 */
export type JsonArray = ReadonlyArray<Json>

/**
 * @since 1.0.0
 */
export type JsonObject = { readonly [key: string]: Json }

/**
 * @since 1.0.0
 */
export type Json =
  | null
  | boolean
  | number
  | string
  | JsonArray
  | JsonObject

/**
 * @since 1.0.0
 */
export const json: Schema<Json> = lazy(() =>
  union(
    _null,
    string,
    number,
    boolean,
    array(json),
    record(string, json)
  ), {
  [H.ArbitraryHookId]: H.hook(() => Arbitrary)
})

const Arbitrary = I.makeArbitrary<Json>(json, (fc) => fc.jsonValue().map((json) => json as Json))
