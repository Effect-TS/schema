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
import * as N from "@effect/data/Number"
import type { Option } from "@effect/data/Option"
import * as O from "@effect/data/Option"
import { isDate } from "@effect/data/Predicate"
import type { Predicate, Refinement } from "@effect/data/Predicate"
import * as RA from "@effect/data/ReadonlyArray"
import { Arbitrary } from "@effect/schema/Arbitrary"
import * as Arb from "@effect/schema/Arbitrary"
import * as AST from "@effect/schema/AST"
import type { ParseOptions } from "@effect/schema/AST"
import * as I from "@effect/schema/internal/common"
import * as P from "@effect/schema/Parser"
import type { ParseResult } from "@effect/schema/ParseResult"
import * as PR from "@effect/schema/ParseResult"
import type { Pretty } from "@effect/schema/Pretty"
import { formatErrors } from "@effect/schema/TreeFormatter"

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

/* c8 ignore start */
export {
  /**
   * @since 1.0.0
   */
  asserts,
  /**
   * @since 1.0.0
   */
  decode,
  /**
   * @since 1.0.0
   */
  decodeEither,
  /**
   * @since 1.0.0
   */
  decodeOption,
  /**
   * @since 1.0.0
   */
  encode,
  /**
   * @since 1.0.0
   */
  encodeEither,
  /**
   * @since 1.0.0
   */
  encodeOption,
  /**
   * @since 1.0.0
   */
  is
} from "@effect/schema/Parser"

export type {
  /**
   * @since 1.0.0
   */
  InferAsserts
} from "@effect/schema/Parser"
/* c8 ignore end */

// ---------------------------------------------
// constructors
// ---------------------------------------------

/**
 * @category constructors
 * @since 1.0.0
 */
export const make: <A>(ast: AST.AST) => Schema<A> = I.makeSchema

const makeLiteral = <Literal extends AST.LiteralValue>(value: Literal): Schema<Literal> =>
  make(AST.createLiteral(value))

/**
 * @category constructors
 * @since 1.0.0
 */
export const literal = <Literals extends ReadonlyArray<AST.LiteralValue>>(
  ...literals: Literals
): Schema<Literals[number]> => union(...literals.map((literal) => makeLiteral(literal)))

/**
 * @category constructors
 * @since 1.0.0
 */
export const uniqueSymbol = <S extends symbol>(
  symbol: S,
  annotations?: AST.Annotated["annotations"]
): Schema<S> => make(AST.createUniqueSymbol(symbol, annotations))

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
export const typeAlias = (
  typeParameters: ReadonlyArray<Schema<any>>,
  type: Schema<any>,
  annotations?: AST.Annotated["annotations"]
): Schema<any> =>
  make(AST.createTypeAlias(
    typeParameters.map((tp) => tp.ast),
    type.ast,
    annotations
  ))

// ---------------------------------------------
// combinators
// ---------------------------------------------

/**
 * @category combinators
 * @since 1.0.0
 */
export const union = <Members extends ReadonlyArray<Schema<any>>>(
  ...members: Members
): Schema<Infer<Members[number]>> => make(AST.createUnion(members.map((m) => m.ast)))

/**
 * @category combinators
 * @since 1.0.0
 */
export const nullable = <A>(self: Schema<A>): Schema<A | null> => union(_null, self)

/**
 * @category combinators
 * @since 1.0.0
 */
export const keyof = <A>(schema: Schema<A>): Schema<keyof A> => make(AST.keyof(schema.ast))

/**
 * @category combinators
 * @since 1.0.0
 */
export const tuple = <Elements extends ReadonlyArray<Schema<any>>>(
  ...elements: Elements
): Schema<{ readonly [K in keyof Elements]: Infer<Elements[K]> }> =>
  make(
    AST.createTuple(elements.map((schema) => AST.createElement(schema.ast, false)), O.none(), true)
  )

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
export const array = <A>(item: Schema<A>): Schema<ReadonlyArray<A>> =>
  make(AST.createTuple([], O.some([item.ast]), true))

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
 * @since 1.0.0
 */
export const OptionalSchemaId = Symbol.for("@effect/schema/Schema/OptionalSchema")

/**
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

const isOptionalSchema = <A>(schema: object): schema is OptionalSchema<A> =>
  "_id" in schema && schema["_id"] === OptionalSchemaId

/**
 * @since 1.0.0
 */
export const optional = <A>(schema: Schema<A>): OptionalSchema<A> => {
  const out: any = make(schema.ast)
  out["_id"] = OptionalSchemaId
  return out
}

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
export const struct = <Fields extends Record<PropertyKey, Schema<any> | OptionalSchema<any>>>(
  fields: Fields
): Schema<
  Spread<
    & { readonly [K in Exclude<keyof Fields, OptionalKeys<Fields>>]: Infer<Fields[K]> }
    & { readonly [K in OptionalKeys<Fields>]?: Infer<Fields[K]> }
  >
> =>
  make(
    AST.createTypeLiteral(
      Reflect.ownKeys(fields).map((key) =>
        AST.createPropertySignature(
          key,
          (fields[key] as any).ast,
          isOptionalSchema(fields[key]),
          true
        )
      ),
      []
    )
  )

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
 * import * as S from "@effect/schema/Schema"
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
 * import * as S from "@effect/schema/Schema"
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
    const annotations = toAnnotations(options)
    annotations[AST.BrandAnnotationId] = [...getBrands(self.ast), brand]
    const ast = AST.mergeAnnotations(self.ast, annotations)
    const schema: Schema<A & Brand<B>> = make(ast)
    const decode = P.decode(schema)
    const decodeOption = P.decodeOption(schema)
    const decodeEither = P.decodeEither(schema)
    const is = P.is(schema)
    const out: any = Object.assign((input: unknown) => decode(input), {
      [RefinedConstructorsTypeId]: RefinedConstructorsTypeId,
      ast,
      option: (input: unknown) => decodeOption(input),
      either: (input: unknown) =>
        E.mapLeft(
          decodeEither(input),
          (errors) => [{ meta: input, message: formatErrors(errors) }]
        ),
      refine: (input: unknown): input is A & Brand<B> => is(input)
    })
    return out
  }

const getBrands = (ast: AST.AST): Array<string> =>
  (ast.annotations[AST.BrandAnnotationId] as Array<string> | undefined) || []

/**
 * @category combinators
 * @since 1.0.0
 */
export const partial = <A>(self: Schema<A>): Schema<Partial<A>> => make(AST.partial(self.ast))

/**
 * @category combinators
 * @since 1.0.0
 */
export const record = <K extends string | symbol, V>(
  key: Schema<K>,
  value: Schema<V>
): Schema<{ readonly [k in K]: V }> => make(AST.createRecord(key.ast, value.ast, true))

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
}

const toAnnotations = <A>(
  options?: AnnotationOptions<A>
): AST.Annotated["annotations"] => {
  const annotations: AST.Annotated["annotations"] = {}
  if (options?.typeId !== undefined) {
    const typeId = options?.typeId
    if (typeof typeId === "object") {
      annotations[AST.TypeAnnotationId] = typeId.id
      annotations[typeId.id] = typeId.params
    } else {
      annotations[AST.TypeAnnotationId] = typeId
    }
  }
  if (options?.message !== undefined) {
    annotations[AST.MessageAnnotationId] = options?.message
  }
  if (options?.identifier !== undefined) {
    annotations[AST.IdentifierAnnotationId] = options?.identifier
  }
  if (options?.title !== undefined) {
    annotations[AST.TitleAnnotationId] = options?.title
  }
  if (options?.description !== undefined) {
    annotations[AST.DescriptionAnnotationId] = options?.description
  }
  if (options?.examples !== undefined) {
    annotations[AST.ExamplesAnnotationId] = options?.examples
  }
  if (options?.documentation !== undefined) {
    annotations[AST.DocumentationAnnotationId] = options?.documentation
  }
  if (options?.jsonSchema !== undefined) {
    annotations[AST.JSONSchemaAnnotationId] = options?.jsonSchema
  }
  return annotations
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
  return (from) => make(AST.createRefinement(from.ast, predicate, toAnnotations(options)))
}

/**
  Create a new `Schema` by transforming the input and output of an existing `Schema`
  using the provided decoding functions.

  @category combinators
  @since 1.0.0
 */
export const transformEither = <A, B>(
  to: Schema<B>,
  decode: (input: A, options?: ParseOptions) => ParseResult<B>,
  encode: (input: B, options?: ParseOptions) => ParseResult<A>
) => (self: Schema<A>): Schema<B> => make(AST.createTransform(self.ast, to.ast, decode, encode))

/**
  Create a new `Schema` by transforming the input and output of an existing `Schema`
  using the provided mapping functions.

  @category combinators
  @since 1.0.0
*/
export const transform = <A, B>(
  to: Schema<B>,
  ab: (a: A) => B,
  ba: (b: B) => A
) =>
  (self: Schema<A>): Schema<B> =>
    pipe(self, transformEither(to, (a) => PR.success(ab(a)), (b) => PR.success(ba(b))))

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
 * @category combinators
 * @since 1.0.0
 */
export const annotations = (annotations: AST.Annotated["annotations"]) =>
  <A>(self: Schema<A>): Schema<A> => make(AST.mergeAnnotations(self.ast, annotations))

/**
 * @category annotations
 * @since 1.0.0
 */
export const message = (message: AST.MessageAnnotation<unknown>) =>
  <A>(self: Schema<A>): Schema<A> =>
    make(AST.setAnnotation(self.ast, AST.MessageAnnotationId, message))

/**
 * @category annotations
 * @since 1.0.0
 */
export const identifier = (identifier: AST.IdentifierAnnotation) =>
  <A>(self: Schema<A>): Schema<A> =>
    make(AST.setAnnotation(self.ast, AST.IdentifierAnnotationId, identifier))

/**
 * @category annotations
 * @since 1.0.0
 */
export const title = (title: AST.TitleAnnotation) =>
  <A>(self: Schema<A>): Schema<A> => make(AST.setAnnotation(self.ast, AST.TitleAnnotationId, title))

/**
 * @category annotations
 * @since 1.0.0
 */
export const description = (description: AST.DescriptionAnnotation) =>
  <A>(self: Schema<A>): Schema<A> =>
    make(AST.setAnnotation(self.ast, AST.DescriptionAnnotationId, description))

/**
 * @category annotations
 * @since 1.0.0
 */
export const examples = (examples: AST.ExamplesAnnotation) =>
  <A>(self: Schema<A>): Schema<A> =>
    make(AST.setAnnotation(self.ast, AST.ExamplesAnnotationId, examples))

/**
 * @category annotations
 * @since 1.0.0
 */
export const documentation = (documentation: AST.DocumentationAnnotation) =>
  <A>(self: Schema<A>): Schema<A> =>
    make(AST.setAnnotation(self.ast, AST.DocumentationAnnotationId, documentation))

// ---------------------------------------------
// data
// ---------------------------------------------

const _undefined: Schema<undefined> = make(AST.undefinedKeyword)

const _void: Schema<void> = make(AST.voidKeyword)

const _null: Schema<null> = make(AST.createLiteral(null))

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
export const never: Schema<never> = make(AST.neverKeyword)

/**
 * @category primitives
 * @since 1.0.0
 */
export const unknown: Schema<unknown> = make(AST.unknownKeyword)

/**
 * @category primitives
 * @since 1.0.0
 */
export const any: Schema<any> = make(AST.anyKeyword)

/**
 * @category primitives
 * @since 1.0.0
 */
export const string: Schema<string> = make(AST.stringKeyword)

/**
 * @category primitives
 * @since 1.0.0
 */
export const number: Schema<number> = make(AST.numberKeyword)

/**
 * @category primitives
 * @since 1.0.0
 */
export const boolean: Schema<boolean> = make(AST.booleanKeyword)

/**
 * @category primitives
 * @since 1.0.0
 */
export const bigint: Schema<bigint> = make(AST.bigIntKeyword)

/**
 * @category primitives
 * @since 1.0.0
 */
export const symbol: Schema<symbol> = make(AST.symbolKeyword)

/**
 * @category primitives
 * @since 1.0.0
 */
export const object: Schema<object> = make(AST.objectKeyword)

// ---------------------------------------------
// data/Bigint
// ---------------------------------------------

/**
 * @since 1.0.0
 */
export const GreaterThanBigintTypeId = "@effect/schema/GreaterThanBigintTypeId"

/**
 * @category filters
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
 * @category filters
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
 * @category filters
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
 * @category filters
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
 * @category filters
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
 * @category filters
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
 * @category filters
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
 * @category filters
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
 * @category filters
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
 * @category parsers
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
 * @category combinators
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
  const items = P.decodeEither(array(item))
  const schema = chunkFromSelf(item)
  return I.makeParser(
    schema,
    (u, options) =>
      !C.isChunk(u) ?
        PR.failure(PR.type(schema.ast, u)) :
        E.map(items(C.toReadonlyArray(u), options), C.fromIterable)
  )
}

const chunkArbitrary = <A>(item: Arbitrary<A>): Arbitrary<Chunk<A>> =>
  I.makeArbitrary(chunkFromSelf(item), (fc) => fc.array(item.arbitrary(fc)).map(C.fromIterable))

const chunkPretty = <A>(item: Pretty<A>): Pretty<Chunk<A>> =>
  I.makePretty(
    chunkFromSelf(item),
    (c) => `Chunk(${C.toReadonlyArray(c).map(item.pretty).join(", ")})`
  )

/**
 * @category constructors
 * @since 1.0.0
 */
export const chunkFromSelf = <A>(item: Schema<A>): Schema<Chunk<A>> =>
  typeAlias(
    [item],
    struct({
      _id: uniqueSymbol(Symbol.for("@effect/data/Chunk")),
      length: number
    }),
    {
      [AST.IdentifierAnnotationId]: "Chunk",
      [I.ParserHookId]: chunkParser,
      [I.PrettyHookId]: chunkPretty,
      [I.ArbitraryHookId]: chunkArbitrary
    }
  )

/**
 * @category parsers
 * @since 1.0.0
 */
export const chunk = <A>(item: Schema<A>): Schema<Chunk<A>> =>
  pipe(array(item), transform(chunkFromSelf(item), C.fromIterable, C.toReadonlyArray))

// ---------------------------------------------
// data/Data
// ---------------------------------------------

const toData = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(a: A): D.Data<A> =>
  Array.isArray(a) ? D.array(a) : D.struct(a)

const dataParser = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  item: P.Parser<A>
): P.Parser<D.Data<A>> => {
  const decode = P.decodeEither(item)
  const schema = dataFromSelf(item)
  return I.makeParser(
    schema,
    (u, options) =>
      !Equal.isEqual(u) ?
        PR.failure(PR.type(schema.ast, u)) :
        E.map(decode(u, options), toData)
  )
}

const dataArbitrary = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  item: Arbitrary<A>
): Arbitrary<D.Data<A>> =>
  I.makeArbitrary(dataFromSelf(item), (fc) => item.arbitrary(fc).map(toData))

const dataPretty = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  item: Pretty<A>
): Pretty<D.Data<A>> =>
  I.makePretty(
    dataFromSelf(item),
    (d) => `Data(${item.pretty(d)})`
  )

/**
 * @category combinators
 * @since 1.0.0
 */
export const dataFromSelf = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  item: Schema<A>
): Schema<D.Data<A>> =>
  typeAlias(
    [item],
    item,
    {
      [AST.IdentifierAnnotationId]: "Data",
      [I.ParserHookId]: dataParser,
      [I.PrettyHookId]: dataPretty,
      [I.ArbitraryHookId]: dataArbitrary
    }
  )

/**
 * @category parsers
 * @since 1.0.0
 */
export const data = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  item: Schema<A>
): Schema<D.Data<A>> =>
  pipe(
    item,
    transform(dataFromSelf(item), toData, (a) =>
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
 * @category constructors
 * @since 1.0.0
 */
export const date: Schema<Date> = typeAlias([], struct({}), {
  [AST.IdentifierAnnotationId]: "Date",
  [I.ParserHookId]: dateParser,
  [I.PrettyHookId]: datePretty,
  [I.ArbitraryHookId]: dateArbitrary
})

/**
  Transforms a `string` into a `Date` by parsing the string using `Date.parse`.

  @category parsers
  @since 1.0.0
*/
export const dateFromString = (self: Schema<string>): Schema<Date> => {
  const schema: Schema<Date> = pipe(
    self,
    transformEither(
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
  const schema = eitherFromSelf(left, right)
  const decodeLeft = P.decodeEither(left)
  const decodeRight = P.decodeEither(right)
  return I.makeParser(
    schema,
    (u, options) =>
      !E.isEither(u) ?
        PR.failure(PR.type(schema.ast, u)) :
        E.isLeft(u) ?
        E.map(decodeLeft(u.left, options), E.left) :
        E.map(decodeRight(u.right, options), E.right)
  )
}

const eitherArbitrary = <E, A>(
  left: Arbitrary<E>,
  right: Arbitrary<A>
): Arbitrary<Either<E, A>> => {
  const schema = eitherFromSelf(left, right)
  const arbitrary = Arb.arbitrary(eitherInline(left, right))
  return I.makeArbitrary(
    schema,
    (fc) => arbitrary(fc).map((a) => a._tag === "Left" ? E.left(a.left) : E.right(a.right))
  )
}

const eitherPretty = <E, A>(left: Pretty<E>, right: Pretty<A>): Pretty<Either<E, A>> =>
  I.makePretty(
    eitherFromSelf(left, right),
    E.match(
      (e) => `left(${left.pretty(e)})`,
      (a) => `right(${right.pretty(a)})`
    )
  )

const eitherInline = <E, A>(left: Schema<E>, right: Schema<A>) =>
  union(
    struct({
      _tag: literal("Left"),
      left
    }),
    struct({
      _tag: literal("Right"),
      right
    })
  )

/**
 * @category constructors
 * @since 1.0.0
 */
export const eitherFromSelf = <E, A>(
  left: Schema<E>,
  right: Schema<A>
): Schema<Either<E, A>> =>
  typeAlias([left, right], eitherInline(left, right), {
    [AST.IdentifierAnnotationId]: "Either",
    [I.ParserHookId]: eitherParser,
    [I.PrettyHookId]: eitherPretty,
    [I.ArbitraryHookId]: eitherArbitrary
  })

/**
 * @category parsers
 * @since 1.0.0
 */
export const either = <E, A>(
  left: Schema<E>,
  right: Schema<A>
): Schema<Either<E, A>> =>
  pipe(
    eitherInline(left, right),
    transform(
      eitherFromSelf(left, right),
      (a) => a._tag === "Left" ? E.left(a.left) : E.right(a.right),
      E.match(
        (left) => ({ _tag: "Left" as const, left }),
        (right) => ({ _tag: "Right" as const, right })
      )
    )
  )

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
 * @category constructors
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
  [I.ArbitraryHookId]: () => Arbitrary
})

const Arbitrary = I.makeArbitrary<Json>(json, (fc) => fc.jsonValue().map((json) => json as Json))

// ---------------------------------------------
// data/Number
// ---------------------------------------------

/**
 * @since 1.0.0
 */
export const FiniteTypeId = "@effect/schema/FiniteTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const finite = <A extends number>(annotationOptions?: AnnotationOptions<A>) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => Number.isFinite(a), {
        typeId: FiniteTypeId,
        description: "a finite number",
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const GreaterThanTypeId = "@effect/schema/GreaterThanTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const greaterThan = <A extends number>(
  min: number,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => a > min, {
        typeId: GreaterThanTypeId,
        description: `a number greater than ${min}`,
        jsonSchema: { exclusiveMinimum: min },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const GreaterThanOrEqualToTypeId = "@effect/schema/GreaterThanOrEqualToTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const greaterThanOrEqualTo = <A extends number>(
  min: number,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => a >= min, {
        typeId: GreaterThanOrEqualToTypeId,
        description: `a number greater than or equal to ${min}`,
        jsonSchema: { minimum: min },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const MultipleOfTypeId = "@effect/schema/MultipleOfTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const multipleOf = <A extends number>(
  divisor: number,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => N.remainder(a, divisor) === 0, {
        typeId: MultipleOfTypeId,
        description: `a number divisible by ${divisor}`,
        jsonSchema: { multipleOf: Math.abs(divisor) }, // spec requires positive divisor
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const IntTypeId = "@effect/schema/IntTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const int = <A extends number>(annotationOptions?: AnnotationOptions<A>) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => Number.isInteger(a), {
        typeId: IntTypeId,
        description: "integer",
        jsonSchema: { type: "integer" },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const LessThanTypeId = "@effect/schema/LessThanTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const lessThan = <A extends number>(max: number, annotationOptions?: AnnotationOptions<A>) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => a < max, {
        typeId: LessThanTypeId,
        description: `a number less than ${max}`,
        jsonSchema: { exclusiveMaximum: max },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const LessThanOrEqualToTypeId = "@effect/schema/LessThanOrEqualToTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const lessThanOrEqualTo = <A extends number>(
  max: number,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => a <= max, {
        typeId: LessThanOrEqualToTypeId,
        description: `a number less than or equal to ${max}`,
        jsonSchema: { maximum: max },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const BetweenTypeId = "@effect/schema/BetweenTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const between = <A extends number>(
  min: number,
  max: number,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => a >= min && a <= max, {
        typeId: BetweenTypeId,
        description: `a number between ${min} and ${max}`,
        jsonSchema: { maximum: max, minimum: min },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const NonNaNTypeId = "@effect/schema/NonNaNTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const nonNaN = <A extends number>(annotationOptions?: AnnotationOptions<A>) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => !Number.isNaN(a), {
        typeId: NonNaNTypeId,
        description: "a number NaN excluded",
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const PositiveTypeId = "@effect/schema/PositiveTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const positive = <A extends number>(
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  greaterThan(0, {
    typeId: PositiveTypeId,
    description: "a positive number",
    ...annotationOptions
  })

/**
 * @since 1.0.0
 */
export const NegativeTypeId = "@effect/schema/NegativeTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const negative = <A extends number>(
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  lessThan(0, {
    typeId: NegativeTypeId,
    description: "a negative number",
    ...annotationOptions
  })

/**
 * @since 1.0.0
 */
export const NonNegativeTypeId = "@effect/schema/NonNegativeTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const nonNegative = <A extends number>(
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  greaterThanOrEqualTo(0, {
    typeId: NonNegativeTypeId,
    description: "a non-negative number",
    ...annotationOptions
  })

/**
 * @since 1.0.0
 */
export const NonPositiveTypeId = "@effect/schema/NonPositiveTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const nonPositive = <A extends number>(
  annotationOptions?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  lessThanOrEqualTo(0, {
    typeId: NonPositiveTypeId,
    description: "a non-positive number",
    ...annotationOptions
  })

/**
 * Clamps a number between a minimum and a maximum value.
 *
 * @category parsers
 * @since 1.0.0
 */
export const clamp = <A extends number>(min: number, max: number) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      transform(
        pipe(self, between<A>(min, max)),
        (self) => N.clamp(self, min, max) as A,
        (self) => N.clamp(self, min, max) as A
      )
    )

/**
  Transforms a `string` into a `number` by parsing the string using `parseFloat`.

  The following special string values are supported: "NaN", "Infinity", "-Infinity".

  @category parsers
  @since 1.0.0
*/
export const numberFromString = (self: Schema<string>): Schema<number> => {
  const schema: Schema<number> = pipe(
    self,
    transformEither(
      number,
      (s) => {
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
        return isNaN(n) ? PR.failure(PR.type(schema.ast, s)) : PR.success(n)
      },
      (n) => PR.success(String(n))
    )
  )
  return schema
}

// ---------------------------------------------
// data/Object
// ---------------------------------------------

/**
 * @since 1.0.0
 */
export const InstanceOfTypeId = "@effect/schema/InstanceOfTypeId"

/**
 * @category constructors
 * @since 1.0.0
 */
export const instanceOf = <A extends abstract new(...args: any) => any>(
  constructor: A,
  annotationOptions?: AnnotationOptions<object>
): Schema<InstanceType<A>> =>
  pipe(
    object,
    filter(
      (a): a is InstanceType<A> => a instanceof constructor,
      {
        typeId: { id: InstanceOfTypeId, params: { constructor } },
        description: `an instance of ${constructor.name}`,
        ...annotationOptions
      }
    )
  )

// ---------------------------------------------
// data/Option
// ---------------------------------------------

const optionParser = <A>(value: P.Parser<A>): P.Parser<Option<A>> => {
  const schema = optionFromSelf(value)
  const decodeValue = P.decodeEither(value)
  return I.makeParser(
    schema,
    (u, options) =>
      !O.isOption(u) ?
        PR.failure(PR.type(schema.ast, u)) :
        O.isNone(u) ?
        PR.success(O.none()) :
        E.map(decodeValue(u.value, options), O.some)
  )
}

const optionArbitrary = <A>(value: Arbitrary<A>): Arbitrary<Option<A>> => {
  const struct = Arb.arbitrary(optionInline(value))
  return I.makeArbitrary(
    optionFromSelf(value),
    (fc) => struct(fc).map((a) => a._tag === "None" ? O.none() : O.some(a.value))
  )
}

const optionPretty = <A>(value: Pretty<A>): Pretty<Option<A>> =>
  I.makePretty(
    optionFromSelf(value),
    O.match(
      () => "none()",
      (a) => `some(${value.pretty(a)})`
    )
  )

const optionInline = <A>(value: Schema<A>) =>
  union(
    struct({
      _tag: literal("None")
    }),
    struct({
      _tag: literal("Some"),
      value
    })
  )

/**
 * @category constructors
 * @since 1.0.0
 */
export const optionFromSelf = <A>(value: Schema<A>): Schema<Option<A>> => {
  return typeAlias(
    [value],
    optionInline(value),
    {
      [AST.IdentifierAnnotationId]: "Option",
      [I.ParserHookId]: optionParser,
      [I.PrettyHookId]: optionPretty,
      [I.ArbitraryHookId]: optionArbitrary
    }
  )
}

/**
 * @category parsers
 * @since 1.0.0
 */
export const option = <A>(value: Schema<A>): Schema<Option<A>> =>
  pipe(
    optionInline(value),
    transform(
      optionFromSelf(value),
      (a) => a._tag === "None" ? O.none() : O.some(a.value),
      O.match(() => ({ _tag: "None" as const }), (value) => ({ _tag: "Some" as const, value }))
    )
  )

/**
 * @category parsers
 * @since 1.0.0
 */
export const optionFromNullable = <A>(value: Schema<A>): Schema<Option<A>> =>
  pipe(
    union(_undefined, nullable(value)),
    transform(optionFromSelf(value), O.fromNullable, O.getOrNull)
  )

/**
 * @category parsers
 * @since 1.0.0
 */
export const optionsFromOptionals = <Fields extends Record<PropertyKey, Schema<any>>>(
  fields: Fields
) =>
  <A extends object>(
    schema: Schema<A>
  ): Schema<Spread<A & { readonly [K in keyof Fields]: Option<Infer<Fields[K]>> }>> => {
    if (AST.isTypeLiteral(schema.ast)) {
      const propertySignatures = schema.ast.propertySignatures
      const ownKeys = Reflect.ownKeys(fields)
      const from = AST.createTypeLiteral(
        propertySignatures.concat(
          ownKeys.map((key) =>
            AST.createPropertySignature(
              key,
              AST.createUnion([_undefined.ast, _null.ast, fields[key].ast]),
              true,
              true
            )
          )
        ),
        schema.ast.indexSignatures
      )
      const to = AST.createTypeLiteral(
        propertySignatures.concat(
          ownKeys.map((key) =>
            AST.createPropertySignature(
              key,
              optionFromSelf(fields[key]).ast,
              true,
              true
            )
          )
        ),
        schema.ast.indexSignatures
      )
      const out = AST.createTransform(from, to, (o: any) => {
        const out = { ...o }
        for (const key of ownKeys) {
          out[key] = O.fromNullable(o[key])
        }
        return PR.success(out)
      }, (o) => {
        const out = { ...o }
        for (const key of ownKeys) {
          if (O.isSome(o[key])) {
            out[key] = o[key].value
          } else {
            delete out[key]
          }
        }
        return PR.success(out)
      })
      return make(out)
    }
    throw new Error("`parseOptional` can only handle type literals")
  }

// ---------------------------------------------
// data/ReadonlyArray
// ---------------------------------------------

/**
 * @since 1.0.0
 */
export const MinItemsTypeId = "@effect/schema/MinItemsTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const minItems = <A>(
  n: number,
  annotationOptions?: AnnotationOptions<ReadonlyArray<A>>
) =>
  (self: Schema<ReadonlyArray<A>>): Schema<ReadonlyArray<A>> =>
    pipe(
      self,
      filter((a): a is ReadonlyArray<A> => a.length >= n, {
        typeId: MinItemsTypeId,
        description: `an array of at least ${n} items`,
        jsonSchema: { minItems: n },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const MaxItemsTypeId = "@effect/schema/MaxItemsTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const maxItems = <A>(
  n: number,
  annotationOptions?: AnnotationOptions<ReadonlyArray<A>>
) =>
  (self: Schema<ReadonlyArray<A>>): Schema<ReadonlyArray<A>> =>
    pipe(
      self,
      filter((a): a is ReadonlyArray<A> => a.length <= n, {
        typeId: MaxItemsTypeId,
        description: `an array of at most ${n} items`,
        jsonSchema: { maxItems: n },
        ...annotationOptions
      })
    )

/**
 * @since 1.0.0
 */
export const ItemsCountTypeId = "@effect/schema/ItemsCountTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const itemsCount = <A>(
  n: number,
  annotationOptions?: AnnotationOptions<ReadonlyArray<A>>
) =>
  (self: Schema<ReadonlyArray<A>>): Schema<ReadonlyArray<A>> =>
    pipe(
      self,
      filter((a): a is ReadonlyArray<A> => a.length === n, {
        typeId: ItemsCountTypeId,
        description: `an array of exactly ${n} items`,
        jsonSchema: { minItems: n, maxItems: n },
        ...annotationOptions
      })
    )

// ---------------------------------------------
// data/ReadonlyMap
// ---------------------------------------------

const isMap = (u: unknown): u is Map<unknown, unknown> => u instanceof Map

const readonlyMapParser = <K, V>(
  key: P.Parser<K>,
  value: P.Parser<V>
): P.Parser<ReadonlyMap<K, V>> => {
  const items = P.decodeEither(array(tuple(key, value)))
  const schema = readonlyMapFromSelf(key, value)
  return I.makeParser(
    schema,
    (u, options) =>
      !isMap(u) ?
        PR.failure(PR.type(schema.ast, u)) :
        E.map(items(Array.from(u.entries()), options), (as) => new Map(as))
  )
}

const readonlyMapArbitrary = <K, V>(
  key: Arbitrary<K>,
  value: Arbitrary<V>
): Arbitrary<ReadonlyMap<K, V>> =>
  I.makeArbitrary(
    readonlyMapFromSelf(key, value),
    (fc) => fc.array(fc.tuple(key.arbitrary(fc), value.arbitrary(fc))).map((as) => new Map(as))
  )

const readonlyMapPretty = <K, V>(
  key: Pretty<K>,
  value: Pretty<V>
): Pretty<ReadonlyMap<K, V>> =>
  I.makePretty(
    readonlyMapFromSelf(key, value),
    (map) =>
      `new Map([${
        Array.from(map.entries())
          .map(([k, v]) => `[${key.pretty(k)}, ${value.pretty(v)}]`)
          .join(", ")
      }])`
  )

/**
 * @category constructors
 * @since 1.0.0
 */
export const readonlyMapFromSelf = <K, V>(
  key: Schema<K>,
  value: Schema<V>
): Schema<ReadonlyMap<K, V>> =>
  typeAlias(
    [key, value],
    struct({
      size: number
    }),
    {
      [AST.IdentifierAnnotationId]: "ReadonlyMap",
      [I.ParserHookId]: readonlyMapParser,
      [I.PrettyHookId]: readonlyMapPretty,
      [I.ArbitraryHookId]: readonlyMapArbitrary
    }
  )

/**
 * @category parsers
 * @since 1.0.0
 */
export const readonlyMap = <K, V>(
  key: Schema<K>,
  value: Schema<V>
): Schema<ReadonlyMap<K, V>> =>
  pipe(
    array(tuple(key, value)),
    transform(
      readonlyMapFromSelf(key, value),
      (as) => new Map(as),
      (map) => Array.from(map.entries())
    )
  )

// ---------------------------------------------
// data/ReadonlySet
// ---------------------------------------------

const isSet = (u: unknown): u is Set<unknown> => u instanceof Set

const readonlySetParser = <A>(item: P.Parser<A>): P.Parser<ReadonlySet<A>> => {
  const items = P.decodeEither(array(item))
  const schema = readonlySetFromSelf(item)
  return I.makeParser(
    schema,
    (u, options) =>
      !isSet(u) ?
        PR.failure(PR.type(schema.ast, u)) :
        E.map(items(Array.from(u.values()), options), (as) => new Set(as))
  )
}

const readonlySetArbitrary = <A>(item: Arbitrary<A>): Arbitrary<ReadonlySet<A>> =>
  I.makeArbitrary(
    readonlySetFromSelf(item),
    (fc) => fc.array(item.arbitrary(fc)).map((as) => new Set(as))
  )

const readonlySetPretty = <A>(item: Pretty<A>): Pretty<ReadonlySet<A>> =>
  I.makePretty(
    readonlySetFromSelf(item),
    (set) => `new Set([${Array.from(set.values()).map((a) => item.pretty(a)).join(", ")}])`
  )

/**
 * @category constructors
 * @since 1.0.0
 */
export const readonlySetFromSelf = <A>(item: Schema<A>): Schema<ReadonlySet<A>> =>
  typeAlias(
    [item],
    struct({
      size: number
    }),
    {
      [AST.IdentifierAnnotationId]: "ReadonlySet",
      [I.ParserHookId]: readonlySetParser,
      [I.PrettyHookId]: readonlySetPretty,
      [I.ArbitraryHookId]: readonlySetArbitrary
    }
  )

/**
 * @category parsers
 * @since 1.0.0
 */
export const readonlySet = <A>(item: Schema<A>): Schema<ReadonlySet<A>> =>
  pipe(
    array(item),
    transform(readonlySetFromSelf(item), (as) => new Set(as), (set) => Array.from(set))
  )

// ---------------------------------------------
// data/String
// ---------------------------------------------

/**
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
 * @category filters
 * @since 1.0.0
 */
export const trimmed = <A extends string>(annotationOptions?: AnnotationOptions<A>) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => trimmedRegex.test(a), {
        typeId: TrimmedTypeId,
        description: "a string with no leading or trailing whitespace",
        jsonSchema: {
          type: "string",
          pattern: trimmedRegex.source
        },
        ...annotationOptions
      })
    )

/**
 * @category filters
 * @since 1.0.0
 */
export const maxLength = <A extends string>(
  maxLength: number,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter(
        (a): a is A => a.length <= maxLength,
        {
          description: `a string at most ${maxLength} character(s) long`,
          jsonSchema: { maxLength },
          ...annotationOptions
        }
      )
    )

/**
 * @category filters
 * @since 1.0.0
 */
export const minLength = <A extends string>(
  minLength: number,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter(
        (a): a is A => a.length >= minLength,
        {
          description: `a string at least ${minLength} character(s) long`,
          jsonSchema: { minLength },
          ...annotationOptions
        }
      )
    )

/**
 * @since 1.0.0
 */
export const PatternTypeId = "@effect/schema/PatternTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const pattern = <A extends string>(
  regex: RegExp,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> => {
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
          ...annotationOptions
        }
      )
    )
  }

/**
 * @since 1.0.0
 */
export const StartsWithTypeId = "@effect/schema/StartsWithTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const startsWith = <A extends string>(
  startsWith: string,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter(
        (a): a is A => a.startsWith(startsWith),
        {
          typeId: { id: StartsWithTypeId, params: { startsWith } },
          description: `a string starting with ${JSON.stringify(startsWith)}`,
          jsonSchema: { pattern: `^${startsWith}` },
          ...annotationOptions
        }
      )
    )

/**
 * @since 1.0.0
 */
export const EndsWithTypeId = "@effect/schema/EndsWithTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const endsWith = <A extends string>(
  endsWith: string,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter(
        (a): a is A => a.endsWith(endsWith),
        {
          typeId: { id: EndsWithTypeId, params: { endsWith } },
          description: `a string ending with ${JSON.stringify(endsWith)}`,
          jsonSchema: { pattern: `^.*${endsWith}$` },
          ...annotationOptions
        }
      )
    )

/**
 * @since 1.0.0
 */
export const IncludesTypeId = "@effect/schema/IncludesTypeId"

/**
 * @category filters
 * @since 1.0.0
 */
export const includes = <A extends string>(
  searchString: string,
  annotationOptions?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter(
        (a): a is A => a.includes(searchString),
        {
          typeId: { id: IncludesTypeId, params: { includes: searchString } },
          description: `a string including ${JSON.stringify(searchString)}`,
          jsonSchema: { pattern: `.*${searchString}.*` },
          ...annotationOptions
        }
      )
    )

/**
 * The `trim` parser allows removing whitespaces from the beginning and end of a string.
 *
 * @category parsers
 * @since 1.0.0
 */
export const trim = (self: Schema<string>): Schema<string> =>
  pipe(
    self,
    transform(
      pipe(self, trimmed()),
      (s) => s.trim(),
      (s) => s.trim()
    )
  )

/**
 * @since 1.0.0
 */
export const UUIDTypeId = "@effect/schema/UUIDTypeId"

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i

/**
 * @category constructors
 * @since 1.0.0
 */
export const UUID: Schema<string> = pipe(
  string,
  pattern(uuidRegex, {
    typeId: UUIDTypeId
  }),
  annotations({
    [I.ArbitraryHookId]: () => I.makeArbitrary(UUID, (fc) => fc.uuid())
  })
)

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
