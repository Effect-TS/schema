/**
 * @since 1.0.0
 */

import { dual, pipe } from "@effect/data/Function"
import * as Option from "@effect/data/Option"
import type { Predicate, Refinement } from "@effect/data/Predicate"
import * as ReadonlyArray from "@effect/data/ReadonlyArray"
import type { Arbitrary } from "@effect/schema/Arbitrary"
import * as AST from "@effect/schema/AST"
import * as I from "@effect/schema/internal/common"
import * as ParseResult from "@effect/schema/ParseResult"

/**
 * @category symbols
 * @since 1.0.0
 */
export const SchemaTypeId = Symbol.for("@effect/schema/Schema")

/**
 * @category symbols
 * @since 1.0.0
 */
export type SchemaTypeId = typeof SchemaTypeId

/**
 * @category model
 * @since 1.0.0
 */
export interface Schema<A> {
  readonly [SchemaTypeId]: (_: A) => A
  readonly From: (_: A) => A
  readonly To: (_: A) => A
  readonly ast: AST.AST
}

/**
 * @category model
 * @since 1.0.0
 */
export type To<S extends { readonly To: (..._: any) => any }> = Parameters<S["To"]>[0]

// ---------------------------------------------
// constructors
// ---------------------------------------------

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <A>(ast: AST.AST): Schema<A> => ({ ast }) as any

/**
 * @category constructors
 * @since 1.0.0
 */
export const literal = <Literals extends ReadonlyArray<AST.LiteralValue>>(
  ...literals: Literals
): Schema<Literals[number]> =>
  make(AST.createUnion(literals.map((literal) => AST.createLiteral(literal))))

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
): Schema<Join<{ [K in keyof T]: To<T[K]> }>> => {
  let types: ReadonlyArray<AST.TemplateLiteral | AST.Literal> = getTemplateLiterals(head.ast)
  for (const span of tail) {
    types = pipe(
      types,
      ReadonlyArray.flatMap((a) =>
        getTemplateLiterals(span.ast).map((b) => combineTemplateLiterals(a, b))
      )
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
        ReadonlyArray.modifyNonEmptyLast((span) => ({
          ...span,
          literal: span.literal + String(b.literal)
        }))
      )
    )
  }
  return AST.createTemplateLiteral(
    a.head,
    pipe(
      a.spans,
      ReadonlyArray.modifyNonEmptyLast((span) => ({
        ...span,
        literal: span.literal + String(b.head)
      })),
      ReadonlyArray.appendAll(b.spans)
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
      return pipe(ast.types, ReadonlyArray.flatMap(getTemplateLiterals))
    default:
      throw new Error(`templateLiteral: unsupported template literal span ${ast._tag}`)
  }
}

// ---------------------------------------------
// primitives
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
// combinators
// ---------------------------------------------

/**
 * @category combinators
 * @since 1.0.0
 */
export const union = <Members extends ReadonlyArray<Schema<any>>>(
  ...members: Members
): Schema<To<Members[number]>> => make(AST.createUnion(members.map((m) => m.ast)))

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
): Schema<{ readonly [K in keyof Elements]: To<Elements[K]> }> =>
  make(
    AST.createTuple(
      elements.map((schema) => AST.createElement(schema.ast, false)),
      Option.none(),
      true
    )
  )

/**
 * @category combinators
 * @since 1.0.0
 */
export const optionalElement = <E>(element: Schema<E>) =>
  <A extends ReadonlyArray<any>>(
    self: Schema<A>
  ): Schema<readonly [...A, E?]> => {
    if (AST.isTuple(self.ast)) {
      return make(AST.appendElement(self.ast, AST.createElement(element.ast, true)))
    }
    throw new Error("`optionalElement` is not supported on this schema")
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const rest = <R>(rest: Schema<R>) =>
  <A extends ReadonlyArray<any>>(
    self: Schema<A>
  ): Schema<readonly [...A, ...Array<R>]> => {
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
  <A extends ReadonlyArray<any>>(
    self: Schema<A>
  ): Schema<readonly [...A, E]> => {
    if (AST.isTuple(self.ast)) {
      return make(AST.appendElement(self.ast, AST.createElement(element.ast, false)))
    }
    throw new Error("`element` is not supported on this schema")
  }

/**
 * @category combinators
 * @since 1.0.0
 */
export const array = <A>(item: Schema<A>): Schema<ReadonlyArray<A>> =>
  make(AST.createTuple([], Option.some([item.ast]), true))

/**
 * @category combinators
 * @since 1.0.0
 */
export const lazy = <A>(
  f: () => Schema<A>,
  annotations?: AST.Annotated["annotations"]
): Schema<A> => make(AST.createLazy(() => f().ast, annotations))

/**
 * @since 1.0.0
 */
export interface SchemaPropertySignature<From, FromIsOptional, To, ToIsOptional> {
  readonly [SchemaTypeId]: (_: From) => From
  readonly From: (_: From) => From
  readonly FromIsOptional: FromIsOptional
  readonly To: (_: To) => To
  readonly ToIsOptional: ToIsOptional
  readonly optional: () => SchemaPropertySignature<From, true, To, true>
}

class SchemaPropertySignatureImpl<From, FromIsOptional, To, ToIsOptional>
  implements SchemaPropertySignature<From, FromIsOptional, To, ToIsOptional>
{
  readonly [SchemaTypeId]!: (_: From) => From
  readonly From!: (_: From) => From
  readonly FromIsOptional!: FromIsOptional
  readonly To!: (_: To) => To
  readonly ToIsOptional!: ToIsOptional

  constructor(
    readonly _from: AST.AST,
    readonly _annotations?: AST.Annotated["annotations"],
    readonly _optional?: { readonly to: "optional" }
  ) {}

  optional(): SchemaPropertySignature<From, true, To, true> {
    if (this._optional) {
      throw new Error(`duplicate optional configuration`)
    }
    return new SchemaPropertySignatureImpl(this._from, this._annotations, { to: "optional" })
  }
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const propertySignature = <A>(
  schema: Schema<A>,
  annotations?: AST.Annotated["annotations"]
): SchemaPropertySignature<A, false, A, false> =>
  new SchemaPropertySignatureImpl(schema.ast, annotations)

/**
 * @since 1.0.0
 */
export const optional = <A>(
  schema: Schema<A>,
  annotations?: AST.Annotated["annotations"]
): SchemaPropertySignature<A, true, A, true> => propertySignature(schema, annotations).optional()

/**
 * @since 1.0.0
 */
export type Spread<A> = {
  [K in keyof A]: A[K]
} extends infer B ? B : never

/**
 * @since 1.0.0
 */
export type ToOptionalKeys<Fields> = {
  [K in keyof Fields]: Fields[K] extends
    | SchemaPropertySignature<any, boolean, any, true>
    | SchemaPropertySignature<never, boolean, never, true> ? K
    : never
}[keyof Fields]

/**
 * @category combinators
 * @since 1.0.0
 */
export const struct = <
  Fields extends Record<
    PropertyKey,
    | Schema<any>
    | Schema<never>
    | SchemaPropertySignature<any, boolean, any, boolean>
    | SchemaPropertySignature<never, boolean, never, boolean>
  >
>(
  fields: Fields
): Schema<
  Spread<
    & { readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: To<Fields[K]> }
    & { readonly [K in ToOptionalKeys<Fields>]?: To<Fields[K]> }
  >
> =>
  make(
    AST.createTypeLiteral(
      I.ownKeys(fields).map((key) => {
        const field = fields[key] as any
        return AST.createPropertySignature(
          key,
          "_from" in field ? field._from : field.ast,
          "_from" in field,
          true
        )
      }),
      []
    )
  )

/**
 * @category combinators
 * @since 1.0.0
 */
export const record = <K extends string | symbol, A>(
  key: Schema<K>,
  value: Schema<A>
): Schema<{ readonly [k in K]: A }> => make(AST.createRecord(key.ast, value.ast, true))

/** @internal */
export const intersectUnionMembers = (xs: ReadonlyArray<AST.AST>, ys: ReadonlyArray<AST.AST>) => {
  return AST.createUnion(
    xs.flatMap((x) => {
      return ys.map((y) => {
        if (AST.isTypeLiteral(x)) {
          if (AST.isTypeLiteral(y)) {
            return AST.createTypeLiteral(
              x.propertySignatures.concat(y.propertySignatures),
              x.indexSignatures.concat(y.indexSignatures)
            )
          } else if (
            AST.isTransform(y) && y.propertySignatureTransformations.length > 0 &&
            AST.isTypeLiteral(y.from) && AST.isTypeLiteral(y.to)
          ) {
            const from = AST.createTypeLiteral(
              x.propertySignatures.concat(y.from.propertySignatures),
              x.indexSignatures.concat(y.from.indexSignatures)
            )
            const to = AST.createTypeLiteral(
              x.propertySignatures.concat(y.to.propertySignatures),
              x.indexSignatures.concat(y.to.indexSignatures)
            )
            return AST.createTransformByPropertySignatureTransformations(
              from,
              to,
              y.propertySignatureTransformations
            )
          }
        } else if (
          AST.isTransform(x) && x.propertySignatureTransformations.length > 0 &&
          AST.isTypeLiteral(x.from) && AST.isTypeLiteral(x.to)
        ) {
          if (AST.isTypeLiteral(y)) {
            const from = AST.createTypeLiteral(
              x.from.propertySignatures.concat(y.propertySignatures),
              x.from.indexSignatures.concat(y.indexSignatures)
            )
            const to = AST.createTypeLiteral(
              x.to.propertySignatures.concat(y.propertySignatures),
              x.to.indexSignatures.concat(y.indexSignatures)
            )
            return AST.createTransformByPropertySignatureTransformations(
              from,
              to,
              x.propertySignatureTransformations
            )
          } else if (
            AST.isTransform(y) && y.propertySignatureTransformations.length > 0 &&
            AST.isTypeLiteral(y.from) && AST.isTypeLiteral(y.to)
          ) {
            const from = AST.createTypeLiteral(
              x.from.propertySignatures.concat(y.from.propertySignatures),
              x.from.indexSignatures.concat(y.from.indexSignatures)
            )
            const to = AST.createTypeLiteral(
              x.to.propertySignatures.concat(y.to.propertySignatures),
              x.to.indexSignatures.concat(y.to.indexSignatures)
            )
            const propertySignatureTransformations = x.propertySignatureTransformations.concat(
              y.propertySignatureTransformations
            )
            return AST.createTransformByPropertySignatureTransformations(
              from,
              to,
              propertySignatureTransformations
            )
          }
        }
        throw new Error("`extend` can only handle type literals or unions of type literals")
      })
    })
  )
}

/**
 * @category combinators
 * @since 1.0.0
 */
export const extend: {
  <B>(
    that: Schema<B>
  ): <A>(self: Schema<A>) => Schema<Spread<A & B>>
  <A, B>(
    self: Schema<A>,
    that: Schema<B>
  ): Schema<Spread<A & B>>
} = dual(
  2,
  <A, B>(
    self: Schema<A>,
    that: Schema<B>
  ): Schema<Spread<A & B>> =>
    make(
      intersectUnionMembers(
        AST.isUnion(self.ast) ? self.ast.types : [self.ast],
        AST.isUnion(that.ast) ? that.ast.types : [that.ast]
      )
    )
)

/** @internal */
export const toAnnotations = <A>(
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
  if (options?.arbitrary !== undefined) {
    annotations[I.ArbitraryHookId] = options?.arbitrary
  }
  return annotations
}

/**
 * @category combinators
 * @since 1.0.0
 */
export function filter<C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>,
  options?: AnnotationOptions<A>
): (self: Schema<C>) => Schema<C & B>
export function filter<B extends A, A = B>(
  predicate: Predicate<A>,
  options?: AnnotationOptions<A>
): (self: Schema<B>) => Schema<B>
export function filter<A>(
  predicate: Predicate<A>,
  options?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> {
  return (self) =>
    make(AST.createRefinement(
      self.ast,
      (a: A, _, ast: AST.AST) =>
        predicate(a) ? ParseResult.success(a) : ParseResult.failure(ParseResult.type(ast, a)),
      toAnnotations(options)
    ))
}

// ---------------------------------------------
// filters
// ---------------------------------------------

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
  (self: Schema<A>): Schema<A> =>
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
export const MaxLengthTypeId = "@effect/schema/MaxLengthTypeId"

/**
 * @category string
 * @since 1.0.0
 */
export const maxLength = <A extends string>(
  maxLength: number,
  options?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
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
