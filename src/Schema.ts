/**
 * @since 1.0.0
 */

import type { Brand } from "@effect/data/Brand"
import { RefinedConstructorsTypeId } from "@effect/data/Brand"
import type { Chunk } from "@effect/data/Chunk"
import * as C from "@effect/data/Chunk"
import * as D from "@effect/data/Data"
import { untracedMethod } from "@effect/data/Debug"
import * as E from "@effect/data/Either"
import type { Either } from "@effect/data/Either"
import * as Equal from "@effect/data/Equal"
import type { LazyArg } from "@effect/data/Function"
import { dual, identity, pipe } from "@effect/data/Function"
import * as N from "@effect/data/Number"
import type { Option } from "@effect/data/Option"
import * as O from "@effect/data/Option"
import type { Predicate, Refinement } from "@effect/data/Predicate"
import { isDate } from "@effect/data/Predicate"
import * as ReadonlyArray from "@effect/data/ReadonlyArray"
import type { Arbitrary } from "@effect/schema/Arbitrary"
import * as AST from "@effect/schema/AST"
import type { ParseOptions } from "@effect/schema/AST"
import * as I from "@effect/schema/internal/common"
import * as P from "@effect/schema/Parser"
import * as PR from "@effect/schema/ParseResult"
import type { ParseResult } from "@effect/schema/ParseResult"
import type { Pretty } from "@effect/schema/Pretty"
import { formatErrors } from "@effect/schema/TreeFormatter"

// ---------------------------------------------
// model
// ---------------------------------------------

/**
 * @category model
 * @since 1.0.0
 */
export const SchemaTypeId = Symbol.for("@effect/schema/Schema")

/**
 * @category model
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
 * @since 1.0.0
 */
export type To<S extends { readonly To: (..._: any) => any }> = Parameters<S["To"]>[0]

// ---------------------------------------------
// validating / asserts / guards
// ---------------------------------------------

/* c8 ignore start */
export {
  /**
   * @category asserts
   * @since 1.0.0
   */
  asserts,
  /**
   * @category guards
   * @since 1.0.0
   */
  is,
  /**
   * @category validating
   * @since 1.0.0
   */
  validate,
  /**
   * @category validating
   * @since 1.0.0
   */
  validateEffect,
  /**
   * @category validating
   * @since 1.0.0
   */
  validateEither,
  /**
   * @category validating
   * @since 1.0.0
   */
  validateOption,
  /**
   * @category validating
   * @since 1.0.0
   */
  validatePromise,
  /**
   * @category validating
   * @since 1.0.0
   */
  validateResult
} from "@effect/schema/Parser"

export type {
  /**
   * @category asserts
   * @since 1.0.0
   */
  ToAsserts
} from "@effect/schema/Parser"

// ---------------------------------------------
// annotations
// ---------------------------------------------

/**
 * @category combinators
 * @since 1.0.0
 */
export const annotations = <A>(options: AnnotationOptions<A>) =>
  (self: Schema<A>): Schema<A> => make(AST.mergeAnnotations(self.ast, toAnnotations(options)))

// ---------------------------------------------
// constructors
// ---------------------------------------------

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <A>(ast: AST.AST): Schema<A> => ({ [SchemaTypeId]: identity, ast }) as any

/**
  @category constructors
  @since 1.0.0
*/
export const declare = (
  typeParameters: ReadonlyArray<Schema<any>>,
  type: Schema<any>,
  decode: (
    ...typeParameters: ReadonlyArray<Schema<any>>
  ) => (input: any, options: ParseOptions, ast: AST.AST) => ParseResult<any>,
  annotations?: AST.Annotated["annotations"]
): Schema<any> =>
  make(
    AST.createDeclaration(
      typeParameters.map((schema) => schema.ast),
      type.ast,
      (...typeParameters) => decode(...typeParameters.map(make)),
      annotations
    )
  )

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

/**
 * @category type id
 * @since 1.0.0
 */
export const InstanceOfTypeId = Symbol.for("@effect/schema/InstanceOfTypeId")

/**
 * @category constructors
 * @since 1.0.0
 */
export const instanceOf = <A extends abstract new(...args: any) => any>(
  constructor: A,
  options?: AnnotationOptions<object>
): Schema<InstanceType<A>> =>
  declare(
    [],
    struct({}),
    () =>
      (input, _, self) =>
        input instanceof constructor ? PR.success(input) : PR.failure(PR.type(self, input)),
    {
      [AST.TypeAnnotationId]: InstanceOfTypeId,
      [InstanceOfTypeId]: { constructor },
      [AST.DescriptionAnnotationId]: `an instance of ${constructor.name}`,
      ...options
    }
  )

/**
 * @category type id
 * @since 1.0.0
 */
export const BrandTypeId = Symbol.for("@effect/schema/BrandTypeId")

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromBrand = <C extends Brand<string | symbol>>(
  constructor: Brand.Constructor<C>,
  options?: AnnotationOptions<Brand.Unbranded<C>>
) =>
  <A extends Brand.Unbranded<C>>(self: Schema<A>): Schema<A & C> => {
    const filter = untracedMethod(() =>
      (a: A, _, self: AST.AST): Option<PR.ParseError> => {
        const e = constructor.either(a)
        return E.isLeft(e) ?
          O.some(PR.parseError([PR.type(self, a, e.left.map((v) => v.message).join(", "))])) :
          O.none()
      }
    )
    const ast = AST.createRefinement(
      self.ast,
      filter,
      toAnnotations({ typeId: { id: BrandTypeId, params: { constructor } }, ...options })
    )
    return make(ast)
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
      O.none(),
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
  make(AST.createTuple([], O.some([item.ast]), true))

/**
 * @category combinators
 * @since 1.0.0
 */
export const nonEmptyArray = <A>(
  item: Schema<A>
): Schema<readonly [A, ...Array<A>]> => pipe(tuple(item), rest(item))

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
export interface PropertySignature<From, FromIsOptional, To, ToIsOptional> {
  readonly From: (_: From) => From
  readonly FromIsOptional: FromIsOptional
  readonly To: (_: To) => To
  readonly ToIsOptional: ToIsOptional
}

/**
 * @since 1.0.0
 */
export interface OptionalPropertySignature<From, FromIsOptional, To, ToIsOptional>
  extends PropertySignature<From, FromIsOptional, To, ToIsOptional>
{
  readonly withDefault: (value: () => To) => PropertySignature<From, true, To, false>
  readonly toOption: () => PropertySignature<From, true, Option<To>, false>
}

/**
 * @since 1.0.0
 */
export interface SchemaPropertySignature<From, FromIsOptional, To, ToIsOptional>
  extends PropertySignature<From, FromIsOptional, To, ToIsOptional>
{
  readonly [SchemaTypeId]: (_: From) => From
}

/**
 * @since 1.0.0
 */
export interface OptionalSchemaPropertySignature<From, FromIsOptional, To, ToIsOptional>
  extends OptionalPropertySignature<From, FromIsOptional, To, ToIsOptional>
{
  readonly [SchemaTypeId]: (_: From) => From
}

/** @internal */
export type PropertySignatureConfig =
  | {
    readonly _tag: "PropertySignature"
    readonly ast: AST.AST
    readonly annotations: AST.Annotated["annotations"]
  }
  | {
    readonly _tag: "Optional"
    readonly ast: AST.AST
    readonly annotations: AST.Annotated["annotations"] | undefined
  }
  | {
    readonly _tag: "Default"
    readonly ast: AST.AST
    readonly value: LazyArg<any>
    readonly annotations: AST.Annotated["annotations"] | undefined
  }
  | {
    readonly _tag: "Option"
    readonly ast: AST.AST
    readonly annotations: AST.Annotated["annotations"] | undefined
  }

/** @internal */
export class PropertySignatureImpl<From, FromIsOptional, To, ToIsOptional> {
  readonly [SchemaTypeId]!: (_: From) => From
  readonly From!: (_: From) => From
  readonly FromIsOptional!: FromIsOptional
  readonly To!: (_: To) => To
  readonly ToIsOptional!: ToIsOptional

  constructor(
    readonly config: PropertySignatureConfig
  ) {}

  withDefault(value: () => To): SchemaPropertySignature<From, true, To, false> {
    return new PropertySignatureImpl(
      {
        _tag: "Default",
        ast: this.config.ast,
        value,
        annotations: this.config.annotations
      }
    )
  }

  toOption(): SchemaPropertySignature<From, true, Option<To>, false> {
    return new PropertySignatureImpl({
      _tag: "Option",
      ast: this.config.ast,
      annotations: this.config.annotations
    })
  }
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const propertySignature = <A>(
  schema: Schema<A>,
  options: AnnotationOptions<A>
): SchemaPropertySignature<A, false, A, false> =>
  new PropertySignatureImpl({
    _tag: "PropertySignature",
    ast: schema.ast,
    annotations: toAnnotations(options)
  })

/**
 * @since 1.0.0
 */
export const optional = <A>(
  schema: Schema<A>,
  annotations?: AST.Annotated["annotations"]
): OptionalSchemaPropertySignature<A, true, A, true> =>
  new PropertySignatureImpl({
    _tag: "Optional",
    ast: schema.ast,
    annotations
  })

/**
 * @since 1.0.0
 */
export type Spread<A> = {
  readonly [K in keyof A]: A[K]
} extends infer B ? B : never

/**
 * @since 1.0.0
 */
export type ToOptionalKeys<Fields> = {
  [K in keyof Fields]: Fields[K] extends
    | PropertySignature<any, boolean, any, true>
    | PropertySignature<never, boolean, never, true> ? K
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
        const isOptional = "config" in field
        const ast = isOptional ? field.config.ast : field.ast
        const annotations = isOptional ? field.config.annotations : undefined
        return AST.createPropertySignature(
          key,
          ast,
          isOptional,
          true,
          annotations
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
            AST.isTransform(y) && AST.isTypeLiteralTransformation(y.transformAST) &&
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
            return AST.createTransform(
              from,
              to,
              AST.createTypeLiteralTransformation(
                y.transformAST.propertySignatureTransformations
              )
            )
          }
        } else if (
          AST.isTransform(x) && AST.isTypeLiteralTransformation(x.transformAST) &&
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
            return AST.createTransform(
              from,
              to,
              AST.createTypeLiteralTransformation(
                x.transformAST.propertySignatureTransformations
              )
            )
          } else if (
            AST.isTransform(y) && AST.isTypeLiteralTransformation(y.transformAST) &&
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
            return AST.createTransform(
              from,
              to,
              AST.createTypeLiteralTransformation(
                x.transformAST.propertySignatureTransformations.concat(
                  y.transformAST.propertySignatureTransformations
                )
              )
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

/**
 * @category combinators
 * @since 1.0.0
 */
export const pick = <A, Keys extends ReadonlyArray<keyof A>>(...keys: Keys) =>
  (self: Schema<A>): Schema<Spread<Pick<A, Keys[number]>>> => make(AST.pick(self.ast, keys))

/**
 * @category combinators
 * @since 1.0.0
 */
export const omit = <A, Keys extends ReadonlyArray<keyof A>>(...keys: Keys) =>
  (self: Schema<A>): Schema<Spread<Omit<A, Keys[number]>>> => make(AST.omit(self.ast, keys))

/**
 * @since 1.0.0
 */
export interface BrandSchema<To extends Brand<any>> extends Schema<To>, Brand.Constructor<To> {}

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
 * type Int = S.To<typeof Int> // number & Brand<"Int">
 *
 * @category combinators
 * @since 1.0.0
 */
export const brand = <B extends string | symbol, A>(
  brand: B,
  options?: AnnotationOptions<A>
) =>
  (self: Schema<A>): BrandSchema<A & Brand<B>> => {
    const annotations = toAnnotations(options)
    annotations[AST.BrandAnnotationId] = [...getBrands(self.ast), brand]
    const ast = AST.mergeAnnotations(self.ast, annotations)
    const schema = make(ast)
    const validate = P.validate(schema)
    const validateOption = P.validateOption(schema)
    const validateEither = P.validateEither(schema)
    const is = P.is(schema)
    const out: any = Object.assign((input: unknown) => validate(input), {
      [RefinedConstructorsTypeId]: RefinedConstructorsTypeId,
      [SchemaTypeId]: identity,
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

/** @internal */
export const getBrands = (ast: AST.AST): Array<string> =>
  (ast.annotations[AST.BrandAnnotationId] as Array<string> | undefined) || []

/**
 * @category combinators
 * @since 1.0.0
 */
export const partial = <A>(
  self: Schema<A>
): Schema<Spread<Partial<A>>> => make(AST.partial(self.ast))

/**
 * @category combinators
 * @since 1.0.0
 */
export const required = <A>(
  self: Schema<A>
): Schema<Spread<Required<A>>> => make(AST.required(self.ast))

/** @internal */
export const toAnnotations = <A>(
  options?: AnnotationOptions<A>
): AST.Annotated["annotations"] => {
  if (!options) {
    return {}
  }
  const out: AST.Annotated["annotations"] = {}

  // symbols are reserved for custom annotations
  const custom = Object.getOwnPropertySymbols(options)
  for (const sym of custom) {
    out[sym] = options[sym]
  }

  // string keys are reserved as /schema namespace
  if (options.typeId !== undefined) {
    const typeId = options.typeId
    if (typeof typeId === "object") {
      out[AST.TypeAnnotationId] = typeId.id
      out[typeId.id] = typeId.params
    } else {
      out[AST.TypeAnnotationId] = typeId
    }
  }
  const move = (from: keyof AnnotationOptions<A>, to: symbol) => {
    if (options[from] !== undefined) {
      out[to] = options[from]
    }
  }
  move("message", AST.MessageAnnotationId)
  move("identifier", AST.IdentifierAnnotationId)
  move("title", AST.TitleAnnotationId)
  move("description", AST.DescriptionAnnotationId)
  move("examples", AST.ExamplesAnnotationId)
  move("documentation", AST.DocumentationAnnotationId)
  move("jsonSchema", AST.JSONSchemaAnnotationId)
  move("arbitrary", I.ArbitraryHookId)

  return out
}

/**
 * @category model
 * @since 1.0.0
 */
export interface AnnotationOptions<A> extends AST.Annotations {
  readonly typeId?: AST.TypeAnnotation | { id: AST.TypeAnnotation; params: unknown }
  readonly message?: AST.MessageAnnotation<A>
  readonly identifier?: AST.IdentifierAnnotation
  readonly title?: AST.TitleAnnotation
  readonly description?: AST.DescriptionAnnotation
  readonly examples?: AST.ExamplesAnnotation
  readonly documentation?: AST.DocumentationAnnotation
  readonly jsonSchema?: AST.JSONSchemaAnnotation
  readonly arbitrary?: (...args: ReadonlyArray<Arbitrary<any>>) => Arbitrary<any>
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
      (a: A, _, ast: AST.AST) => predicate(a) ? O.none() : O.some(PR.parseError([PR.type(ast, a)])),
      toAnnotations(options)
    ))
}

// ---------------------------------------------
// string filters
// ---------------------------------------------

/**
 * @category type id
 * @since 1.0.0
 */
export const MinLengthTypeId = Symbol.for("@effect/schema/MinLengthTypeId")

/**
 * @category string filters
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
 * @category string filters
 * @since 1.0.0
 */
export const nonEmpty = <A extends string>(
  options?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> => minLength(1, options)

/**
 * @category type id
 * @since 1.0.0
 */
export const MaxLengthTypeId = Symbol.for("@effect/schema/MaxLengthTypeId")

/**
 * @category string filters
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

/**
 * @category string filters
 * @since 1.0.0
 */
export const length = <A extends string>(
  length: number,
  options?: AnnotationOptions<A>
) => (self: Schema<A>): Schema<A> => minLength(length, options)(maxLength<A>(length)(self))

/**
 * @category type id
 * @since 1.0.0
 */
export const PatternTypeId = Symbol.for("@effect/schema/PatternTypeId")

/**
 * @category string filters
 * @since 1.0.0
 */
export const pattern = <A extends string>(
  regex: RegExp,
  options?: AnnotationOptions<A>
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
          ...options
        }
      )
    )
  }

/**
 * @category type id
 * @since 1.0.0
 */
export const StartsWithTypeId = Symbol.for("@effect/schema/StartsWithTypeId")

/**
 * @category string filters
 * @since 1.0.0
 */
export const startsWith = <A extends string>(
  startsWith: string,
  options?: AnnotationOptions<A>
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
          ...options
        }
      )
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const EndsWithTypeId = Symbol.for("@effect/schema/EndsWithTypeId")

/**
 * @category string filters
 * @since 1.0.0
 */
export const endsWith = <A extends string>(
  endsWith: string,
  options?: AnnotationOptions<A>
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
          ...options
        }
      )
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const IncludesTypeId = Symbol.for("@effect/schema/IncludesTypeId")

/**
 * @category string filters
 * @since 1.0.0
 */
export const includes = <A extends string>(
  searchString: string,
  options?: AnnotationOptions<A>
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
          ...options
        }
      )
    )

/**
 * @category type id
 * @since 1.0.0
 */
export const TrimmedTypeId = Symbol.for("@effect/schema/TrimmedTypeId")

const trimmedRegex = /^\S.*\S$|^\S$|^$/

/**
 * Verifies that a string contains no leading or trailing whitespaces.
 *
 * Note. This combinator does not make any transformations, it only validates.
 * If what you were looking for was a combinator to trim strings, then check out the `trim` combinator.
 *
 * @category string filters
 * @since 1.0.0
 */
export const trimmed = <A extends string>(options?: AnnotationOptions<A>) =>
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
        ...options
      })
    )

// ---------------------------------------------
// number filters
// ---------------------------------------------

/**
 * @category type id
 * @since 1.0.0
 */
export const GreaterThanTypeId = Symbol.for("@effect/schema/GreaterThanTypeId")

/**
 * @category number filters
 * @since 1.0.0
 */
export const greaterThan = <A extends number>(
  min: number,
  options?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
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
export const GreaterThanOrEqualToTypeId = Symbol.for("@effect/schema/GreaterThanOrEqualToTypeId")

/**
 * @category number filters
 * @since 1.0.0
 */
export const greaterThanOrEqualTo = <A extends number>(
  min: number,
  options?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
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
export const LessThanTypeId = Symbol.for("@effect/schema/LessThanTypeId")

/**
 * @category number filters
 * @since 1.0.0
 */
export const lessThan = <A extends number>(max: number, options?: AnnotationOptions<A>) =>
  (self: Schema<A>): Schema<A> =>
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
export const LessThanOrEqualToTypeId = Symbol.for("@effect/schema/LessThanOrEqualToTypeId")

/**
 * @category number filters
 * @since 1.0.0
 */
export const lessThanOrEqualTo = <A extends number>(
  max: number,
  options?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
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
export const IntTypeId = Symbol.for("@effect/schema/IntTypeId")

/**
 * @category number filters
 * @since 1.0.0
 */
export const int = <A extends number>(options?: AnnotationOptions<A>) =>
  (self: Schema<A>): Schema<A> =>
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
export const FiniteTypeId = Symbol.for("@effect/schema/FiniteTypeId")

/**
 * @category number filters
 * @since 1.0.0
 */
export const finite = <A extends number>(options?: AnnotationOptions<A>) =>
  (self: Schema<A>): Schema<A> =>
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
export const BetweenTypeId = Symbol.for("@effect/schema/BetweenTypeId")

/**
 * @category number filters
 * @since 1.0.0
 */
export const between = <A extends number>(
  min: number,
  max: number,
  options?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
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
export const NonNaNTypeId = Symbol.for("@effect/schema/NonNaNTypeId")

/**
 * @category number filters
 * @since 1.0.0
 */
export const nonNaN = <A extends number>(options?: AnnotationOptions<A>) =>
  (self: Schema<A>): Schema<A> =>
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
export const PositiveTypeId = Symbol.for("@effect/schema/PositiveTypeId")

/**
 * @category number filters
 * @since 1.0.0
 */
export const positive = <A extends number>(
  options?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  greaterThan(0, {
    typeId: PositiveTypeId,
    description: "a positive number",
    ...options
  })

/**
 * @category type id
 * @since 1.0.0
 */
export const NegativeTypeId = Symbol.for("@effect/schema/NegativeTypeId")

/**
 * @category number filters
 * @since 1.0.0
 */
export const negative = <A extends number>(
  options?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  lessThan(0, {
    typeId: NegativeTypeId,
    description: "a negative number",
    ...options
  })

/**
 * @category type id
 * @since 1.0.0
 */
export const NonNegativeTypeId = Symbol.for("@effect/schema/NonNegativeTypeId")

/**
 * @category number filters
 * @since 1.0.0
 */
export const nonNegative = <A extends number>(
  options?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  greaterThanOrEqualTo(0, {
    typeId: NonNegativeTypeId,
    description: "a non-negative number",
    ...options
  })

/**
 * @category type id
 * @since 1.0.0
 */
export const NonPositiveTypeId = Symbol.for("@effect/schema/NonPositiveTypeId")

/**
 * @category number filters
 * @since 1.0.0
 */
export const nonPositive = <A extends number>(
  options?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  lessThanOrEqualTo(0, {
    typeId: NonPositiveTypeId,
    description: "a non-positive number",
    ...options
  })

/**
 * @category type id
 * @since 1.0.0
 */
export const MultipleOfTypeId = Symbol.for("@effect/schema/MultipleOfTypeId")

/**
 * @category number filters
 * @since 1.0.0
 */
export const multipleOf = <A extends number>(
  divisor: number,
  options?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
    pipe(
      self,
      filter((a): a is A => N.remainder(a, divisor) === 0, {
        typeId: MultipleOfTypeId,
        description: `a number divisible by ${divisor}`,
        jsonSchema: { multipleOf: Math.abs(divisor) }, // spec requires positive divisor
        ...options
      })
    )

// ---------------------------------------------
// bigint filters
// ---------------------------------------------

/**
 * @category type id
 * @since 1.0.0
 */
export const GreaterThanBigintTypeId = Symbol.for("@effect/schema/GreaterThanBigintTypeId")

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const greaterThanBigint = <A extends bigint>(
  min: bigint,
  options?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
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
export const GreaterThanOrEqualToBigintTypeId = Symbol.for(
  "@effect/schema/GreaterThanOrEqualToBigintTypeId"
)

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const greaterThanOrEqualToBigint = <A extends bigint>(
  min: bigint,
  options?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
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
export const LessThanBigintTypeId = Symbol.for("@effect/schema/LessThanBigintTypeId")

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const lessThanBigint = <A extends bigint>(
  max: bigint,
  options?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
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
export const LessThanOrEqualToBigintTypeId = Symbol.for(
  "@effect/schema/LessThanOrEqualToBigintTypeId"
)

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const lessThanOrEqualToBigint = <A extends bigint>(
  max: bigint,
  options?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
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
export const BetweenBigintTypeId = Symbol.for("@effect/schema/BetweenBigintTypeId")

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const betweenBigint = <A extends bigint>(
  min: bigint,
  max: bigint,
  options?: AnnotationOptions<A>
) =>
  (self: Schema<A>): Schema<A> =>
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
export const PositiveBigintTypeId = Symbol.for("@effect/schema/PositiveBigintTypeId")

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const positiveBigint = <A extends bigint>(
  options?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  greaterThanBigint(0n, {
    typeId: PositiveBigintTypeId,
    description: "a positive bigint",
    ...options
  })

/**
 * @category type id
 * @since 1.0.0
 */
export const NegativeBigintTypeId = Symbol.for("@effect/schema/NegativeBigintTypeId")

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const negativeBigint = <A extends bigint>(
  options?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  lessThanBigint(0n, {
    typeId: NegativeBigintTypeId,
    description: "a negative bigint",
    ...options
  })

/**
 * @category type id
 * @since 1.0.0
 */
export const NonPositiveBigintTypeId = Symbol.for("@effect/schema/NonPositiveBigintTypeId")

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const nonPositiveBigint = <A extends bigint>(
  options?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  lessThanOrEqualToBigint(0n, {
    typeId: NonPositiveBigintTypeId,
    description: "a non-positive bigint",
    ...options
  })

/**
 * @category type id
 * @since 1.0.0
 */
export const NonNegativeBigintTypeId = Symbol.for("@effect/schema/NonNegativeBigintTypeId")

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const nonNegativeBigint = <A extends bigint>(
  options?: AnnotationOptions<A>
): (self: Schema<A>) => Schema<A> =>
  greaterThanOrEqualToBigint(0n, {
    typeId: NonNegativeBigintTypeId,
    description: "a non-negative bigint",
    ...options
  })

// ---------------------------------------------
// ReadonlyArray filters
// ---------------------------------------------

/**
 * @category type id
 * @since 1.0.0
 */
export const MinItemsTypeId = Symbol.for("@effect/schema/MinItemsTypeId")

/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export const minItems = <A>(
  n: number,
  options?: AnnotationOptions<ReadonlyArray<A>>
) =>
  (self: Schema<ReadonlyArray<A>>): Schema<ReadonlyArray<A>> =>
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
export const MaxItemsTypeId = Symbol.for("@effect/schema/MaxItemsTypeId")

/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export const maxItems = <A>(
  n: number,
  options?: AnnotationOptions<ReadonlyArray<A>>
) =>
  (self: Schema<ReadonlyArray<A>>): Schema<ReadonlyArray<A>> =>
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
export const ItemsCountTypeId = Symbol.for("@effect/schema/ItemsCountTypeId")

/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export const itemsCount = <A>(
  n: number,
  options?: AnnotationOptions<ReadonlyArray<A>>
) =>
  (self: Schema<ReadonlyArray<A>>): Schema<ReadonlyArray<A>> =>
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
// data types
// ---------------------------------------------

// ---------------------------------------------
// string constructors
// ---------------------------------------------

/**
 * @category string constructors
 * @since 1.0.0
 */
export const Trimmed: Schema<string> = pipe(string, trimmed())

/**
 * @category type id
 * @since 1.0.0
 */
export const UUIDTypeId = Symbol.for("@effect/schema/UUIDTypeId")

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i

/**
 * @category string constructors
 * @since 1.0.0
 */
export const UUID: Schema<string> = pipe(
  string,
  pattern(uuidRegex, {
    typeId: UUIDTypeId,
    arbitrary: (): Arbitrary<string> => (fc) => fc.uuid()
  })
)

// ---------------------------------------------
// number constructors
// ---------------------------------------------

/**
 * @category number constructors
 * @since 1.0.0
 */
export const NonNaN: Schema<number> = pipe(number, nonNaN())

/**
 * @category number constructors
 * @since 1.0.0
 */
export const Int: Schema<number> = pipe(number, int())

/**
 * @category number constructors
 * @since 1.0.0
 */
export const Positive: Schema<number> = pipe(number, positive())

/**
 * @category number constructors
 * @since 1.0.0
 */
export const Negative: Schema<number> = pipe(number, negative())

/**
 * @category number constructors
 * @since 1.0.0
 */
export const NonNegative: Schema<number> = pipe(number, nonNegative())

/**
 * @category number constructors
 * @since 1.0.0
 */
export const NonPositive: Schema<number> = pipe(number, nonPositive())

// ---------------------------------------------
// bigint constructors
// ---------------------------------------------

/**
 * @category bigint constructors
 * @since 1.0.0
 */
export const PositiveBigint: Schema<bigint> = pipe(bigint, positiveBigint())

/**
 * @category bigint constructors
 * @since 1.0.0
 */
export const NegativeBigint: Schema<bigint> = pipe(bigint, negativeBigint())

/**
 * @category bigint constructors
 * @since 1.0.0
 */
export const NonNegativeBigint: Schema<bigint> = pipe(bigint, nonNegativeBigint())

/**
 * @category bigint constructors
 * @since 1.0.0
 */
export const NonPositiveBigint: Schema<bigint> = pipe(bigint, nonPositiveBigint())

// ---------------------------------------------
// Date
// ---------------------------------------------

const dateArbitrary = (): Arbitrary<Date> => (fc) => fc.date()

const datePretty = (): Pretty<Date> => (date) => `new Date(${JSON.stringify(date)})`

/**
 * @category Date constructors
 * @since 1.0.0
 */
export const Date: Schema<Date> = declare(
  [],
  struct({}),
  () => (u: unknown, _, self) => !isDate(u) ? PR.failure(PR.type(self, u)) : PR.success(u),
  {
    [AST.IdentifierAnnotationId]: "Date",
    [I.PrettyHookId]: datePretty,
    [I.ArbitraryHookId]: dateArbitrary
  }
)

/**
 * @category type id
 * @since 1.0.0
 */
export const ValidDateTypeId = Symbol.for("@effect/schema/ValidDateTypeId")

/**
 * A filter excluding invalid dates (e.g. `new Date("fail")`).
 *
 * @category Date combinators
 * @since 1.0.0
 */
export const validDate = (options?: AnnotationOptions<Date>) =>
  (self: Schema<Date>): Schema<Date> =>
    pipe(
      self,
      filter((a) => !isNaN(a.getTime()), {
        typeId: ValidDateTypeId,
        description: "a valid Date",
        ...options
      })
    )

/**
 * A schema representing valid dates, e.g. `new Date("fail")` is excluded, even though it is an instance of `Date`.
 *
 * @category Date constructors
 * @since 1.0.0
 */
export const ValidDate: Schema<Date> = pipe(Date, validDate())

// ---------------------------------------------
// Chunk
// ---------------------------------------------

/** @internal */
export const chunkArbitrary = <A>(item: Arbitrary<A>): Arbitrary<Chunk<A>> =>
  (fc) => fc.array(item(fc)).map(C.fromIterable)

/** @internal */
export const chunkPretty = <A>(item: Pretty<A>): Pretty<Chunk<A>> =>
  (c) => `Chunk(${C.toReadonlyArray(c).map(item).join(", ")})`

/**
 * @category Chunk constructors
 * @since 1.0.0
 */
export const chunk = <A>(item: Schema<A>): Schema<Chunk<A>> =>
  declare(
    [item],
    struct({
      _id: uniqueSymbol(Symbol.for("@effect/data/Chunk")),
      length: number
    }),
    <A>(item: Schema<A>) => {
      const parseResult = P.parseResult(array(item))
      return (u: unknown, options, self) =>
        !C.isChunk(u) ?
          PR.failure(PR.type(self, u)) :
          PR.map(
            parseResult(C.toReadonlyArray(u), options),
            C.fromIterable
          )
    },
    {
      [AST.IdentifierAnnotationId]: "Chunk",
      [I.PrettyHookId]: chunkPretty,
      [I.ArbitraryHookId]: chunkArbitrary
    }
  )

// ---------------------------------------------
// Data
// ---------------------------------------------

/** @internal */
export const toData = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  a: A
): D.Data<A> => Array.isArray(a) ? D.array(a) : D.struct(a)

/** @internal */
export const dataArbitrary = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  item: Arbitrary<A>
): Arbitrary<D.Data<A>> => (fc) => item(fc).map(toData)

/** @internal */
export const dataPretty = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  item: Pretty<A>
): Pretty<D.Data<A>> => (d) => `Data(${item(d)})`

/**
 * @category Data constructors
 * @since 1.0.0
 */
export const data = <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(
  item: Schema<A>
): Schema<D.Data<A>> =>
  declare(
    [item],
    item,
    <A extends Readonly<Record<string, any>> | ReadonlyArray<any>>(item: Schema<A>) => {
      const parseResult = P.parseResult(item)
      return (u: unknown, options, self) =>
        !Equal.isEqual(u) ?
          PR.failure(PR.type(self, u)) :
          PR.map(parseResult(u, options), toData)
    },
    {
      [AST.IdentifierAnnotationId]: "Data",
      [I.PrettyHookId]: dataPretty,
      [I.ArbitraryHookId]: dataArbitrary
    }
  )

// ---------------------------------------------
// Either
// ---------------------------------------------

/** @internal */
export const eitherArbitrary = <E, A>(
  left: Arbitrary<E>,
  right: Arbitrary<A>
): Arbitrary<Either<E, A>> => (fc) => fc.oneof(left(fc).map(E.left), right(fc).map(E.right))

/** @internal */
export const eitherPretty = <E, A>(left: Pretty<E>, right: Pretty<A>): Pretty<Either<E, A>> =>
  E.match(
    (e) => `left(${left(e)})`,
    (a) => `right(${right(a)})`
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
 * @category Either constructors
 * @since 1.0.0
 */
export const either = <E, A>(
  left: Schema<E>,
  right: Schema<A>
): Schema<Either<E, A>> => {
  return declare(
    [left, right],
    eitherInline(left, right),
    <E, A>(left: Schema<E>, right: Schema<A>) => {
      const parseResultLeft = P.parseResult(left)
      const parseResultRight = P.parseResult(right)
      return (u: unknown, options, self) =>
        !E.isEither(u) ?
          PR.failure(PR.type(self, u)) :
          E.isLeft(u) ?
          PR.map(parseResultLeft(u.left, options), E.left) :
          PR.map(parseResultRight(u.right, options), E.right)
    },
    {
      [AST.IdentifierAnnotationId]: "Either",
      [I.PrettyHookId]: eitherPretty,
      [I.ArbitraryHookId]: eitherArbitrary
    }
  )
}

// ---------------------------------------------
// Json
// ---------------------------------------------

/**
 * @category Json
 * @since 1.0.0
 */
export type JsonArray = ReadonlyArray<Json>

/**
 * @category Json
 * @since 1.0.0
 */
export type JsonObject = { readonly [key: string]: Json }

/**
 * @category Json
 * @since 1.0.0
 */
export type Json =
  | null
  | boolean
  | number
  | string
  | JsonArray
  | JsonObject

const arbitraryJson: Arbitrary<Json> = (fc) => fc.jsonValue().map((json) => json as Json)

/**
 * @category type id
 * @since 1.0.0
 */
export const JsonNumberTypeId = Symbol.for("@effect/schema/JsonNumberTypeId")

/**
 * The `JsonNumber` is a schema for representing JSON numbers. It ensures that the provided value is a valid
 * number by filtering out `NaN` and `(+/-) Infinity`. This is useful when you want to validate and represent numbers in JSON
 * format.
 *
 * @example
 * import * as S from "@effect/schema/Schema"
 *
 * const is = S.is(S.JsonNumber)
 *
 * assert.deepStrictEqual(is(42), true)
 * assert.deepStrictEqual(is(Number.NaN), false)
 * assert.deepStrictEqual(is(Number.POSITIVE_INFINITY), false)
 * assert.deepStrictEqual(is(Number.NEGATIVE_INFINITY), false)
 *
 * @category Json constructors
 * @since 1.0.0
 */
export const JsonNumber = pipe(
  number,
  filter((n) => !isNaN(n) && isFinite(n), {
    typeId: JsonNumberTypeId,
    description: "a JSON number"
  })
)

/**
 * @category Json constructors
 * @since 1.0.0
 */
export const json: Schema<Json> = lazy(() =>
  union(
    _null,
    string,
    JsonNumber,
    boolean,
    array(json),
    record(string, json)
  ), {
  [I.ArbitraryHookId]: () => arbitraryJson
})

// ---------------------------------------------
// Option
// ---------------------------------------------

/** @internal */
export const optionArbitrary = <A>(value: Arbitrary<A>): Arbitrary<Option<A>> =>
  (fc) => fc.oneof(fc.constant(O.none()), value(fc).map(O.some))

/** @internal */
export const optionPretty = <A>(value: Pretty<A>): Pretty<Option<A>> =>
  O.match(
    () => "none()",
    (a) => `some(${value(a)})`
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
 * @category Option constructors
 * @since 1.0.0
 */
export const option = <A>(value: Schema<A>): Schema<Option<A>> => {
  return declare(
    [value],
    optionInline(value),
    <A>(value: Schema<A>) => {
      const parseResult = P.parseResult(value)
      return (u: unknown, options, self) =>
        !O.isOption(u) ?
          PR.failure(PR.type(self, u)) :
          O.isNone(u) ?
          PR.success(O.none()) :
          PR.map(parseResult(u.value, options), O.some)
    },
    {
      [AST.IdentifierAnnotationId]: "Option",
      [I.PrettyHookId]: optionPretty,
      [I.ArbitraryHookId]: optionArbitrary
    }
  )
}

// ---------------------------------------------
// ReadonlyMap
// ---------------------------------------------

/** @internal */
export const isMap = (u: unknown): u is Map<unknown, unknown> => u instanceof Map

/** @internal */
export const readonlyMapArbitrary = <K, V>(
  key: Arbitrary<K>,
  value: Arbitrary<V>
): Arbitrary<ReadonlyMap<K, V>> =>
  (fc) => fc.array(fc.tuple(key(fc), value(fc))).map((as) => new Map(as))

/** @internal */
export const readonlyMapPretty = <K, V>(
  key: Pretty<K>,
  value: Pretty<V>
): Pretty<ReadonlyMap<K, V>> =>
  (map) =>
    `new Map([${
      Array.from(map.entries())
        .map(([k, v]) => `[${key(k)}, ${value(v)}]`)
        .join(", ")
    }])`

/**
 * @category ReadonlyMap constructors
 * @since 1.0.0
 */
export const readonlyMap = <K, V>(
  key: Schema<K>,
  value: Schema<V>
): Schema<ReadonlyMap<K, V>> =>
  declare(
    [key, value],
    struct({
      size: number
    }),
    <K, V>(key: Schema<K>, value: Schema<V>) => {
      const parseResult = P.parseResult(array(tuple(key, value)))
      return (u: unknown, options, self) =>
        !isMap(u) ?
          PR.failure(PR.type(self, u)) :
          PR.map(parseResult(Array.from(u.entries()), options), (as) => new Map(as))
    },
    {
      [AST.IdentifierAnnotationId]: "ReadonlyMap",
      [I.PrettyHookId]: readonlyMapPretty,
      [I.ArbitraryHookId]: readonlyMapArbitrary
    }
  )

// ---------------------------------------------
// ReadonlySet
// ---------------------------------------------

/** @internal */
export const isSet = (u: unknown): u is Set<unknown> => u instanceof Set

/** @internal */
export const readonlySetArbitrary = <A>(item: Arbitrary<A>): Arbitrary<ReadonlySet<A>> =>
  (fc) => fc.array(item(fc)).map((as) => new Set(as))

/** @internal */
export const readonlySetPretty = <A>(item: Pretty<A>): Pretty<ReadonlySet<A>> =>
  (set) => `new Set([${Array.from(set.values()).map((a) => item(a)).join(", ")}])`

/**
 * @category ReadonlySet constructors
 * @since 1.0.0
 */
export const readonlySet = <A>(
  item: Schema<A>
): Schema<ReadonlySet<A>> =>
  declare(
    [item],
    struct({
      size: number
    }),
    <A>(item: Schema<A>) =>
      (u: unknown, options, self) => {
        const parseResult = P.parseResult(array(item))
        return !isSet(u) ?
          PR.failure(PR.type(self, u)) :
          PR.map(parseResult(Array.from(u.values()), options), (as) => new Set(as))
      },
    {
      [AST.IdentifierAnnotationId]: "ReadonlySet",
      [I.PrettyHookId]: readonlySetPretty,
      [I.ArbitraryHookId]: readonlySetArbitrary
    }
  )
