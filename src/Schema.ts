/**
 * @since 1.0.0
 */

import * as BI from "@effect/data/Bigint"
import type { Brand } from "@effect/data/Brand"
import { RefinedConstructorsTypeId } from "@effect/data/Brand"
import type { Chunk } from "@effect/data/Chunk"
import * as C from "@effect/data/Chunk"
import * as D from "@effect/data/Data"
import * as E from "@effect/data/Either"
import type { Either } from "@effect/data/Either"
import * as Equal from "@effect/data/Equal"
import type { LazyArg } from "@effect/data/Function"
import { dual, identity } from "@effect/data/Function"
import * as N from "@effect/data/Number"
import type { Option } from "@effect/data/Option"
import * as O from "@effect/data/Option"
import type { Pipeable } from "@effect/data/Pipeable"
import { pipeArguments } from "@effect/data/Pipeable"
import type { Predicate, Refinement } from "@effect/data/Predicate"
import { isDate, not } from "@effect/data/Predicate"
import * as ReadonlyArray from "@effect/data/ReadonlyArray"
import * as Str from "@effect/data/String"
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
export interface Schema<A> extends Pipeable {
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
  validateResult,
  /**
   * @category validating
   * @since 1.0.0
   */
  validateSync
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
export const annotations = <A>(options: DocAnnotations<A>) =>
  (self: Schema<A>): Schema<A> => make(AST.mergeAnnotations(self.ast, toAnnotations(options)))

// ---------------------------------------------
// constructors
// ---------------------------------------------

class SchemaImpl<A> implements Schema<A> {
  readonly From!: (_: A) => A
  readonly To!: (_: A) => A
  readonly [SchemaTypeId] = identity
  constructor(readonly ast: AST.AST) {}
  pipe() {
    return pipeArguments(this, arguments)
  }
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <A>(ast: AST.AST): Schema<A> => new SchemaImpl(ast)

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
    types = ReadonlyArray.flatMap(
      types,
      (a) => getTemplateLiterals(span.ast).map((b) => combineTemplateLiterals(a, b))
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
      ReadonlyArray.modifyNonEmptyLast(a.spans, (span) => ({
        ...span,
        literal: span.literal + String(b.literal)
      }))
    )
  }
  return AST.createTemplateLiteral(
    a.head,
    ReadonlyArray.appendAll(
      ReadonlyArray.modifyNonEmptyLast(a.spans, (span) => ({
        ...span,
        literal: span.literal + String(b.head)
      })),
      b.spans
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
      return ReadonlyArray.flatMap(ast.types, getTemplateLiterals)
    default:
      throw new Error(`templateLiteral: unsupported template literal span ${ast._tag}`)
  }
}

/**
 * @category type id
 * @since 1.0.0
 */
export const InstanceOfTypeId = Symbol.for("@effect/schema/TypeId/InstanceOf")

/**
 * @category constructors
 * @since 1.0.0
 */
export const instanceOf = <A extends abstract new(...args: any) => any>(
  constructor: A,
  options?: FilterAnnotations<unknown>
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
      ...toAnnotations(options)
    }
  )

/**
 * @category type id
 * @since 1.0.0
 */
export const BrandTypeId = Symbol.for("@effect/schema/TypeId/Brand")

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromBrand = <C extends Brand<string | symbol>>(
  constructor: Brand.Constructor<C>,
  options?: FilterAnnotations<Brand.Unbranded<C>>
) =>
  <A extends Brand.Unbranded<C>>(self: Schema<A>): Schema<A & C> => {
    const filter = (a: A, _: ParseOptions, self: AST.AST): Option<PR.ParseError> => {
      const e = constructor.either(a)
      return E.isLeft(e) ?
        O.some(PR.parseError([PR.type(self, a, e.left.map((v) => v.message).join(", "))])) :
        O.none()
    }
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
): Schema<readonly [A, ...Array<A>]> => tuple(item).pipe(rest(item))

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
  readonly [SchemaTypeId]: (_: From) => From = identity
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
  options: DocAnnotations<A>
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
  options?: DocAnnotations<A>
): OptionalSchemaPropertySignature<A, true, A, true> =>
  new PropertySignatureImpl({
    _tag: "Optional",
    ast: schema.ast,
    annotations: toAnnotations(options)
  })

/**
 * @since 1.0.0
 */
export type Simplify<A> = {
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
  Simplify<
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
            // isTypeLiteral(x) && isTypeLiteral(y)
            return AST.createTypeLiteral(
              x.propertySignatures.concat(y.propertySignatures),
              x.indexSignatures.concat(y.indexSignatures)
            )
          } else if (
            AST.isTransform(y) && AST.isTypeLiteralTransformation(y.transformAST) &&
            AST.isTypeLiteral(y.from) && AST.isTypeLiteral(y.to)
          ) {
            // isTypeLiteral(x) && isTransform(y)
            const from = AST.createTypeLiteral(
              x.propertySignatures.concat(y.from.propertySignatures),
              x.indexSignatures.concat(y.from.indexSignatures)
            )
            const to = AST.createTypeLiteral(
              AST.getToPropertySignatures(x.propertySignatures).concat(y.to.propertySignatures),
              AST.getToIndexSignatures(x.indexSignatures).concat(y.to.indexSignatures)
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
            // isTransform(x) && isTypeLiteral(y)
            const from = AST.createTypeLiteral(
              x.from.propertySignatures.concat(y.propertySignatures),
              x.from.indexSignatures.concat(y.indexSignatures)
            )
            const to = AST.createTypeLiteral(
              x.to.propertySignatures.concat(AST.getToPropertySignatures(y.propertySignatures)),
              x.to.indexSignatures.concat(AST.getToIndexSignatures(y.indexSignatures))
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
            // isTransform(x) && isTransform(y)
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
  ): <A>(self: Schema<A>) => Schema<Simplify<A & B>>
  <A, B>(
    self: Schema<A>,
    that: Schema<B>
  ): Schema<Simplify<A & B>>
} = dual(
  2,
  <A, B>(
    self: Schema<A>,
    that: Schema<B>
  ): Schema<Simplify<A & B>> =>
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
  (self: Schema<A>): Schema<Simplify<Pick<A, Keys[number]>>> => make(AST.pick(self.ast, keys))

/**
 * @category combinators
 * @since 1.0.0
 */
export const omit = <A, Keys extends ReadonlyArray<keyof A>>(...keys: Keys) =>
  (self: Schema<A>): Schema<Simplify<Omit<A, Keys[number]>>> => make(AST.omit(self.ast, keys))

/**
 * @since 1.0.0
 */
export interface BrandSchema<A extends Brand<any>> extends Schema<A>, Brand.Constructor<A> {}

/** @internal */
export const addBrand = <B extends string | symbol, A>(
  ast: AST.AST,
  brand: B,
  options?: DocAnnotations<A>
): AST.AST => {
  const annotations = toAnnotations(options)
  annotations[AST.BrandAnnotationId] = [...getBrands(ast), brand]
  return AST.mergeAnnotations(ast, annotations)
}

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
  options?: DocAnnotations<A>
) =>
  (self: Schema<A>): BrandSchema<A & Brand<B>> => {
    const ast = addBrand(self.ast, brand, options)
    const schema = make(ast)
    const validate = P.validateSync(schema)
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
      refine: (input: unknown): input is A & Brand<B> => is(input),
      pipe() {
        return pipeArguments(this, arguments)
      }
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
): Schema<Simplify<Partial<A>>> => make(AST.partial(self.ast))

/**
 * @category combinators
 * @since 1.0.0
 */
export const required = <A>(
  self: Schema<A>
): Schema<Simplify<Required<A>>> => make(AST.required(self.ast))

/** @internal */
export const toAnnotations = <A>(
  options?: FilterAnnotations<A>
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
  const move = (from: keyof FilterAnnotations<A>, to: symbol) => {
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
 * @since 1.0.0
 */
export interface DocAnnotations<A> extends AST.Annotations {
  readonly identifier?: AST.IdentifierAnnotation
  readonly title?: AST.TitleAnnotation
  readonly description?: AST.DescriptionAnnotation
  readonly examples?: AST.ExamplesAnnotation
  readonly documentation?: AST.DocumentationAnnotation
  readonly message?: AST.MessageAnnotation<A>
}

/**
 * @since 1.0.0
 */
export interface FilterAnnotations<A> extends DocAnnotations<A> {
  readonly typeId?: AST.TypeAnnotation | { id: AST.TypeAnnotation; params: unknown }
  readonly jsonSchema?: AST.JSONSchemaAnnotation
  readonly arbitrary?: (...args: ReadonlyArray<Arbitrary<any>>) => Arbitrary<any>
}

/** @internal */
export const _filter = <From extends AST.AST, A>(
  from: From,
  predicate: Predicate<A>,
  options?: FilterAnnotations<A>
): AST.Transform | AST.Refinement<From> =>
  AST.createRefinement(
    from,
    (a: A, _, ast: AST.AST) => predicate(a) ? O.none() : O.some(PR.parseError([PR.type(ast, a)])),
    toAnnotations(options)
  )

/**
 * @category combinators
 * @since 1.0.0
 */
export function filter<C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>,
  options?: FilterAnnotations<A>
): (self: Schema<C>) => Schema<C & B>
export function filter<B extends A, A = B>(
  predicate: Predicate<A>,
  options?: FilterAnnotations<A>
): (self: Schema<B>) => Schema<B>
export function filter<A>(
  predicate: Predicate<A>,
  options?: FilterAnnotations<A>
): (self: Schema<A>) => Schema<A> {
  return (self) => make(_filter(self.ast, predicate, options))
}

// ---------------------------------------------
// string filters
// ---------------------------------------------

/**
 * @category type id
 * @since 1.0.0
 */
export const MinLengthTypeId = Symbol.for("@effect/schema/TypeId/MinLength")

/** @internal */
export const _minLength = <A extends string>(
  ast: AST.AST,
  minLength: number,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, (a) => a.length >= minLength, {
    typeId: MinLengthTypeId,
    description: `a string at least ${minLength} character(s) long`,
    jsonSchema: { minLength },
    ...options
  })

/**
 * @category string filters
 * @since 1.0.0
 */
export const minLength = <A extends string>(
  minLength: number,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_minLength(self.ast, minLength, options))

/**
 * @category string filters
 * @since 1.0.0
 */
export const nonEmpty = <A extends string>(
  options?: FilterAnnotations<A>
): (self: Schema<A>) => Schema<A> => minLength(1, options)

/**
 * @category type id
 * @since 1.0.0
 */
export const MaxLengthTypeId = Symbol.for("@effect/schema/TypeId/MaxLength")

/** @internal */
export const _maxLength = <A extends string>(
  ast: AST.AST,
  maxLength: number,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, (a) => a.length <= maxLength, {
    typeId: MaxLengthTypeId,
    description: `a string at most ${maxLength} character(s) long`,
    jsonSchema: { maxLength },
    ...options
  })

/**
 * @category string filters
 * @since 1.0.0
 */
export const maxLength = <A extends string>(
  maxLength: number,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_maxLength(self.ast, maxLength, options))

/**
 * @category string filters
 * @since 1.0.0
 */
export const length = <A extends string>(
  length: number,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => self.pipe(minLength(length), maxLength(length, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const PatternTypeId = Symbol.for("@effect/schema/TypeId/Pattern")

/** @internal */
export const _pattern = <A extends string>(
  ast: AST.AST,
  regex: RegExp,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, (a) => {
    // The following line ensures that `lastIndex` is reset to `0` in case the user has specified the `g` flag
    regex.lastIndex = 0
    return regex.test(a)
  }, {
    typeId: { id: PatternTypeId, params: { regex } },
    description: `a string matching the pattern ${regex.source}`,
    jsonSchema: { pattern },
    ...options
  })

/**
 * @category string filters
 * @since 1.0.0
 */
export const pattern = <A extends string>(
  regex: RegExp,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_pattern(self.ast, regex, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const StartsWithTypeId = Symbol.for("@effect/schema/TypeId/StartsWith")

/** @internal */
export const _startsWith = <A extends string>(
  ast: AST.AST,
  startsWith: string,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, Str.startsWith(startsWith), {
    typeId: { id: StartsWithTypeId, params: { startsWith } },
    description: `a string starting with ${JSON.stringify(startsWith)}`,
    jsonSchema: { pattern: `^${startsWith}` },
    ...options
  })

/**
 * @category string filters
 * @since 1.0.0
 */
export const startsWith = <A extends string>(
  startsWith: string,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_startsWith(self.ast, startsWith, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const EndsWithTypeId = Symbol.for("@effect/schema/TypeId/EndsWith")

/** @internal */
export const _endsWith = <A extends string>(
  ast: AST.AST,
  endsWith: string,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, Str.endsWith(endsWith), {
    typeId: { id: EndsWithTypeId, params: { endsWith } },
    description: `a string ending with ${JSON.stringify(endsWith)}`,
    jsonSchema: { pattern: `^.*${endsWith}$` },
    ...options
  })

/**
 * @category string filters
 * @since 1.0.0
 */
export const endsWith = <A extends string>(
  endsWith: string,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_endsWith(self.ast, endsWith, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const IncludesTypeId = Symbol.for("@effect/schema/TypeId/Includes")

/** @internal */
export const _includes = <A extends string>(
  ast: AST.AST,
  searchString: string,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, Str.includes(searchString), {
    typeId: { id: IncludesTypeId, params: { includes: searchString } },
    description: `a string including ${JSON.stringify(searchString)}`,
    jsonSchema: { pattern: `.*${searchString}.*` },
    ...options
  })

/**
 * @category string filters
 * @since 1.0.0
 */
export const includes = <A extends string>(
  searchString: string,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_includes(self.ast, searchString, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const TrimmedTypeId = Symbol.for("@effect/schema/TypeId/Trimmed")

/** @internal */
export const _trimmed = <A extends string>(
  ast: AST.AST,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, (a) => a === a.trim(), {
    typeId: TrimmedTypeId,
    description: "a string with no leading or trailing whitespace",
    ...options
  })

/**
 * Verifies that a string contains no leading or trailing whitespaces.
 *
 * Note. This combinator does not make any transformations, it only validates.
 * If what you were looking for was a combinator to trim strings, then check out the `Codec.trim` combinator.
 *
 * @category string filters
 * @since 1.0.0
 */
export const trimmed = <A extends string>(options?: FilterAnnotations<A>) =>
  (self: Schema<A>): Schema<A> => make(_trimmed(self.ast, options))

// ---------------------------------------------
// number filters
// ---------------------------------------------

/**
 * @category type id
 * @since 1.0.0
 */
export const GreaterThanTypeId = Symbol.for("@effect/schema/TypeId/GreaterThan")

/** @internal */
export const _greaterThan = <A extends number>(
  ast: AST.AST,
  min: number,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, N.greaterThan(min), {
    typeId: GreaterThanTypeId,
    description: min === 0 ? "a positive number" : `a number greater than ${min}`,
    jsonSchema: { exclusiveMinimum: min },
    ...options
  })

/**
 * @category number filters
 * @since 1.0.0
 */
export const greaterThan = <A extends number>(
  min: number,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_greaterThan(self.ast, min, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const GreaterThanOrEqualToTypeId = Symbol.for("@effect/schema/TypeId/GreaterThanOrEqualTo")

/** @internal */
export const _greaterThanOrEqualTo = <A extends number>(
  ast: AST.AST,
  min: number,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, N.greaterThanOrEqualTo(min), {
    typeId: GreaterThanOrEqualToTypeId,
    description: min === 0 ? "a non-negative number" : `a number greater than or equal to ${min}`,
    jsonSchema: { minimum: min },
    ...options
  })

/**
 * @category number filters
 * @since 1.0.0
 */
export const greaterThanOrEqualTo = <A extends number>(
  min: number,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_greaterThanOrEqualTo(self.ast, min, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const LessThanTypeId = Symbol.for("@effect/schema/TypeId/LessThan")

/** @internal */
export const _lessThan = <A extends number>(
  ast: AST.AST,
  max: number,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, N.lessThan(max), {
    typeId: LessThanTypeId,
    description: max === 0 ? "a negative number" : `a number less than ${max}`,
    jsonSchema: { exclusiveMaximum: max },
    ...options
  })

/**
 * @category number filters
 * @since 1.0.0
 */
export const lessThan = <A extends number>(max: number, options?: FilterAnnotations<A>) =>
  (self: Schema<A>): Schema<A> => make(_lessThan(self.ast, max, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const LessThanOrEqualToTypeId = Symbol.for("@effect/schema/TypeId/LessThanOrEqualTo")

/** @internal */
export const _lessThanOrEqualTo = <A extends number>(
  ast: AST.AST,
  max: number,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, N.lessThanOrEqualTo(max), {
    typeId: LessThanOrEqualToTypeId,
    description: max === 0 ? "a non-positive number" : `a number less than or equal to ${max}`,
    jsonSchema: { maximum: max },
    ...options
  })

/**
 * @category number filters
 * @since 1.0.0
 */
export const lessThanOrEqualTo = <A extends number>(
  max: number,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_lessThanOrEqualTo(self.ast, max, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const IntTypeId = Symbol.for("@effect/schema/TypeId/Int")

/** @internal */
export const _int = <A extends number>(
  ast: AST.AST,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, Number.isInteger, {
    typeId: IntTypeId,
    description: "an integer",
    jsonSchema: { type: "integer" },
    ...options
  })

/**
 * @category number filters
 * @since 1.0.0
 */
export const int = <A extends number>(options?: FilterAnnotations<A>) =>
  (self: Schema<A>): Schema<A> => make(_int(self.ast, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const FiniteTypeId = Symbol.for("@effect/schema/TypeId/Finite")

/** @internal */
export const _finite = <A extends number>(
  ast: AST.AST,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, Number.isFinite, {
    typeId: FiniteTypeId,
    description: "a finite number",
    ...options
  })

/**
 * @category number filters
 * @since 1.0.0
 */
export const finite = <A extends number>(options?: FilterAnnotations<A>) =>
  (self: Schema<A>): Schema<A> => make(_finite(self.ast, options))

/**
 * @category number constructors
 * @since 1.0.0
 */
export const Finite: Schema<number> = number.pipe(finite())

/** @internal */
export const _between = <A extends number>(
  ast: AST.AST,
  min: number,
  max: number,
  options?: FilterAnnotations<A>
): AST.AST =>
  _lessThanOrEqualTo(_greaterThanOrEqualTo(ast, min), max, {
    description: `a number between ${min} and ${max}`,
    ...options
  })

/**
 * Tests if a `number` is between a minimum and a maximum value (included).
 *
 * @category number filters
 * @since 1.0.0
 */
export const between = <A extends number>(
  min: number,
  max: number,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_between(self.ast, min, max, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const NonNaNTypeId = Symbol.for("@effect/schema/TypeId/NonNaN")

/** @internal */
export const _nonNaN = <A extends number>(
  ast: AST.AST,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, not(Number.isNaN), {
    typeId: NonNaNTypeId,
    description: "a number NaN excluded",
    ...options
  })

/**
 * @category number filters
 * @since 1.0.0
 */
export const nonNaN = <A extends number>(options?: FilterAnnotations<A>) =>
  (self: Schema<A>): Schema<A> => make(_nonNaN(self.ast, options))

/** @internal */
export const _positive = <A extends number>(
  ast: AST.AST,
  options?: FilterAnnotations<A>
): AST.AST => _greaterThan(ast, 0, options)

/**
 * @category number filters
 * @since 1.0.0
 */
export const positive = <A extends number>(
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_positive(self.ast, options))

/** @internal */
export const _negative = <A extends number>(
  ast: AST.AST,
  options?: FilterAnnotations<A>
): AST.AST => _lessThan(ast, 0, options)

/**
 * @category number filters
 * @since 1.0.0
 */
export const negative = <A extends number>(
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_negative(self.ast, options))

/** @internal */
export const _nonNegative = <A extends number>(
  ast: AST.AST,
  options?: FilterAnnotations<A>
): AST.AST => _greaterThanOrEqualTo(ast, 0, options)

/**
 * @category number filters
 * @since 1.0.0
 */
export const nonNegative = <A extends number>(
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_nonNegative(self.ast, options))

/** @internal */
export const _nonPositive = <A extends number>(
  ast: AST.AST,
  options?: FilterAnnotations<A>
): AST.AST => _lessThanOrEqualTo(ast, 0, options)

/**
 * @category number filters
 * @since 1.0.0
 */
export const nonPositive = <A extends number>(
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_nonPositive(self.ast, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const MultipleOfTypeId = Symbol.for("@effect/schema/TypeId/MultipleOf")

/** @internal */
export const _multipleOf = <A extends number>(
  ast: AST.AST,
  divisor: number,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, (a) => N.remainder(a, divisor) === 0, {
    typeId: MultipleOfTypeId,
    description: `a number divisible by ${divisor}`,
    jsonSchema: { multipleOf: Math.abs(divisor) }, // spec requires positive divisor
    ...options
  })

/**
 * @category number filters
 * @since 1.0.0
 */
export const multipleOf = <A extends number>(
  divisor: number,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_multipleOf(self.ast, divisor, options))

// ---------------------------------------------
// bigint filters
// ---------------------------------------------

/**
 * @category type id
 * @since 1.0.0
 */
export const GreaterThanBigintTypeId = Symbol.for("@effect/schema/TypeId/GreaterThanBigint")

/** @internal */
export const _greaterThanBigint = <A extends bigint>(
  ast: AST.AST,
  min: bigint,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, BI.greaterThan(min), {
    typeId: GreaterThanBigintTypeId,
    description: min === 0n ? "a positive bigint" : `a bigint greater than ${min}n`,
    jsonSchema: { exclusiveMinimum: min },
    ...options
  })

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const greaterThanBigint = <A extends bigint>(
  min: bigint,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_greaterThanBigint(self.ast, min, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const GreaterThanOrEqualToBigintTypeId = Symbol.for(
  "@effect/schema/TypeId/GreaterThanOrEqualToBigint"
)

/** @internal */
export const _greaterThanOrEqualToBigint = <A extends bigint>(
  ast: AST.AST,
  min: bigint,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, BI.greaterThanOrEqualTo(min), {
    typeId: GreaterThanOrEqualToBigintTypeId,
    description: min === 0n ? "a non-negative bigint" : `a bigint greater than or equal to ${min}n`,
    jsonSchema: { minimum: min },
    ...options
  })

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const greaterThanOrEqualToBigint = <A extends bigint>(
  min: bigint,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_greaterThanOrEqualToBigint(self.ast, min, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const LessThanBigintTypeId = Symbol.for("@effect/schema/TypeId/LessThanBigint")

/** @internal */
export const _lessThanBigint = <A extends bigint>(
  ast: AST.AST,
  max: bigint,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, BI.lessThan(max), {
    typeId: LessThanBigintTypeId,
    description: max === 0n ? "a negative bigint" : `a bigint less than ${max}n`,
    jsonSchema: { exclusiveMaximum: max },
    ...options
  })

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const lessThanBigint = <A extends bigint>(
  max: bigint,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_lessThanBigint(self.ast, max, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const LessThanOrEqualToBigintTypeId = Symbol.for(
  "@effect/schema/TypeId/LessThanOrEqualToBigint"
)

/** @internal */
export const _lessThanOrEqualToBigint = <A extends bigint>(
  ast: AST.AST,
  max: bigint,
  options?: FilterAnnotations<A>
): AST.AST =>
  _filter(ast, BI.lessThanOrEqualTo(max), {
    typeId: LessThanOrEqualToBigintTypeId,
    description: max === 0n ? "a non-positive bigint" : `a bigint less than or equal to ${max}n`,
    jsonSchema: { maximum: max },
    ...options
  })

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const lessThanOrEqualToBigint = <A extends bigint>(
  max: bigint,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_lessThanOrEqualToBigint(self.ast, max, options))

/** @internal */
export const _betweenBigint = <A extends bigint>(
  ast: AST.AST,
  min: bigint,
  max: bigint,
  options?: FilterAnnotations<A>
): AST.AST =>
  _lessThanOrEqualToBigint(_greaterThanOrEqualToBigint(ast, min), max, {
    description: `a bigint between ${min}n and ${max}n`,
    ...options
  })

/**
 * Tests if a `bigint` is between a minimum and a maximum value (included).
 *
 * @category bigint filters
 * @since 1.0.0
 */
export const betweenBigint = <A extends bigint>(
  min: bigint,
  max: bigint,
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_betweenBigint(self.ast, min, max, options))

/** @internal */
export const _positiveBigint = <A extends bigint>(
  ast: AST.AST,
  options?: FilterAnnotations<A>
): AST.AST => _greaterThanBigint(ast, 0n, options)

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const positiveBigint = <A extends bigint>(
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_positiveBigint(self.ast, options))

/** @internal */
export const _negativeBigint = <A extends bigint>(
  ast: AST.AST,
  options?: FilterAnnotations<A>
): AST.AST => _lessThanBigint(ast, 0n, options)

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const negativeBigint = <A extends bigint>(
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_negativeBigint(self.ast, options))

/** @internal */
export const _nonPositiveBigint = <A extends bigint>(
  ast: AST.AST,
  options?: FilterAnnotations<A>
): AST.AST => _lessThanOrEqualToBigint(ast, 0n, options)

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const nonPositiveBigint = <A extends bigint>(
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_nonPositiveBigint(self.ast, options))

/** @internal */
export const _nonNegativeBigint = <A extends bigint>(
  ast: AST.AST,
  options?: FilterAnnotations<A>
): AST.AST => _greaterThanOrEqualToBigint(ast, 0n, options)

/**
 * @category bigint filters
 * @since 1.0.0
 */
export const nonNegativeBigint = <A extends bigint>(
  options?: FilterAnnotations<A>
) => (self: Schema<A>): Schema<A> => make(_nonNegativeBigint(self.ast, options))

// ---------------------------------------------
// ReadonlyArray filters
// ---------------------------------------------

/**
 * @category type id
 * @since 1.0.0
 */
export const MinItemsTypeId = Symbol.for("@effect/schema/TypeId/MinItems")

/** @internal */
export const _minItems = <A>(
  ast: AST.AST,
  n: number,
  options?: FilterAnnotations<ReadonlyArray<A>>
): AST.AST =>
  _filter(ast, (a): a is ReadonlyArray<A> => a.length >= n, {
    typeId: MinItemsTypeId,
    description: `an array of at least ${n} items`,
    jsonSchema: { minItems: n },
    ...options
  })

/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export const minItems = <A>(
  n: number,
  options?: FilterAnnotations<ReadonlyArray<A>>
) =>
  (self: Schema<ReadonlyArray<A>>): Schema<ReadonlyArray<A>> =>
    make(_minItems(self.ast, n, options))

/**
 * @category type id
 * @since 1.0.0
 */
export const MaxItemsTypeId = Symbol.for("@effect/schema/TypeId/MaxItems")

/** @internal */
export const _maxItems = <A>(
  ast: AST.AST,
  n: number,
  options?: FilterAnnotations<ReadonlyArray<A>>
): AST.AST =>
  _filter(ast, (a): a is ReadonlyArray<A> => a.length <= n, {
    typeId: MaxItemsTypeId,
    description: `an array of at most ${n} items`,
    jsonSchema: { maxItems: n },
    ...options
  })

/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export const maxItems = <A>(
  n: number,
  options?: FilterAnnotations<ReadonlyArray<A>>
) =>
  (self: Schema<ReadonlyArray<A>>): Schema<ReadonlyArray<A>> =>
    make(_maxItems(self.ast, n, options))

/** @internal */
export const _itemsCount = <A>(
  ast: AST.AST,
  n: number,
  options?: FilterAnnotations<ReadonlyArray<A>>
): AST.AST =>
  _maxItems(_minItems(ast, n), n, {
    description: `an array of exactly ${n} items`,
    ...options
  })

/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export const itemsCount = <A>(
  n: number,
  options?: FilterAnnotations<ReadonlyArray<A>>
) =>
  (self: Schema<ReadonlyArray<A>>): Schema<ReadonlyArray<A>> =>
    make(_itemsCount(self.ast, n, options))

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
export const Trimmed: Schema<string> = string.pipe(trimmed())

/**
 * @category type id
 * @since 1.0.0
 */
export const UUIDTypeId = Symbol.for("@effect/schema/TypeId/UUID")

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i

/**
 * @category string constructors
 * @since 1.0.0
 */
export const UUID: Schema<string> = string.pipe(
  pattern(uuidRegex, {
    typeId: UUIDTypeId,
    title: "UUID",
    description: "a UUID",
    arbitrary: (): Arbitrary<string> => (fc) => fc.uuid()
  })
)

/**
 * @category type id
 * @since 1.0.0
 */
export const ULIDTypeId = Symbol.for("@effect/schema/ULIDTypeId")

const ulidRegex = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/i

/**
 * @category string constructors
 * @since 1.0.0
 */
export const ULID: Schema<string> = string.pipe(
  pattern(ulidRegex, {
    typeId: ULIDTypeId,
    title: "ULID",
    description: "a ULID",
    arbitrary: (): Arbitrary<string> => (fc) => fc.ulid()
  })
)

// ---------------------------------------------
// number constructors
// ---------------------------------------------

/**
 * @category number constructors
 * @since 1.0.0
 */
export const NonNaN: Schema<number> = number.pipe(nonNaN())

/**
 * @category number constructors
 * @since 1.0.0
 */
export const Int: Schema<number> = number.pipe(int())

/**
 * @category number constructors
 * @since 1.0.0
 */
export const Positive: Schema<number> = number.pipe(positive())

/**
 * @category number constructors
 * @since 1.0.0
 */
export const Negative: Schema<number> = number.pipe(negative())

/**
 * @category number constructors
 * @since 1.0.0
 */
export const NonNegative: Schema<number> = number.pipe(nonNegative())

/**
 * @category number constructors
 * @since 1.0.0
 */
export const NonPositive: Schema<number> = number.pipe(nonPositive())

// ---------------------------------------------
// bigint constructors
// ---------------------------------------------

/**
 * @category bigint constructors
 * @since 1.0.0
 */
export const PositiveBigint: Schema<bigint> = bigint.pipe(positiveBigint())

/**
 * @category bigint constructors
 * @since 1.0.0
 */
export const NegativeBigint: Schema<bigint> = bigint.pipe(negativeBigint())

/**
 * @category bigint constructors
 * @since 1.0.0
 */
export const NonNegativeBigint: Schema<bigint> = bigint.pipe(nonNegativeBigint())

/**
 * @category bigint constructors
 * @since 1.0.0
 */
export const NonPositiveBigint: Schema<bigint> = bigint.pipe(nonPositiveBigint())

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
export const ValidDateTypeId = Symbol.for("@effect/schema/TypeId/ValidDate")

/**
 * A filter excluding invalid dates (e.g. `new Date("fail")`).
 *
 * @category Date combinators
 * @since 1.0.0
 */
export const validDate = (options?: FilterAnnotations<Date>) =>
  (self: Schema<Date>): Schema<Date> =>
    self.pipe(
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
export const ValidDate: Schema<Date> = Date.pipe(validDate())

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
      const validateResult = P.validateResult(array(item))
      return (u: unknown, options, self) =>
        !C.isChunk(u) ?
          PR.failure(PR.type(self, u)) :
          PR.map(
            validateResult(C.toReadonlyArray(u), options),
            C.fromIterable
          )
    },
    {
      [AST.TitleAnnotationId]: "Chunk",
      [AST.DescriptionAnnotationId]: "a Chunk",
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
      const validateResult = P.validateResult(item)
      return (u: unknown, options, self) =>
        !Equal.isEqual(u) ?
          PR.failure(PR.type(self, u)) :
          PR.map(validateResult(u, options), toData)
    },
    {
      [AST.TitleAnnotationId]: "Data",
      [AST.DescriptionAnnotationId]: "a Data",
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
  E.match({
    onLeft: (e) => `left(${left(e)})`,
    onRight: (a) => `right(${right(a)})`
  })

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
      const validateResultLeft = P.validateResult(left)
      const validateResultRight = P.validateResult(right)
      return (u: unknown, options, self) =>
        !E.isEither(u) ?
          PR.failure(PR.type(self, u)) :
          E.isLeft(u) ?
          PR.map(validateResultLeft(u.left, options), E.left) :
          PR.map(validateResultRight(u.right, options), E.right)
    },
    {
      [AST.TitleAnnotationId]: "Either",
      [AST.DescriptionAnnotationId]: "an Either",
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
export const JsonNumberTypeId = Symbol.for("@effect/schema/TypeId/JsonNumber")

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
export const JsonNumber = number.pipe(
  filter((n) => !isNaN(n) && isFinite(n), {
    typeId: JsonNumberTypeId,
    title: "JSONNumber",
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
  O.match({
    onNone: () => "none()",
    onSome: (a) => `some(${value(a)})`
  })

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
      const validateResult = P.validateResult(value)
      return (u: unknown, options, self) =>
        !O.isOption(u) ?
          PR.failure(PR.type(self, u)) :
          O.isNone(u) ?
          PR.success(O.none()) :
          PR.map(validateResult(u.value, options), O.some)
    },
    {
      [AST.TitleAnnotationId]: "Option",
      [AST.DescriptionAnnotationId]: "an Option",
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
      const validateResult = P.validateResult(array(tuple(key, value)))
      return (u: unknown, options, self) =>
        !isMap(u) ?
          PR.failure(PR.type(self, u)) :
          PR.map(validateResult(Array.from(u.entries()), options), (as) => new Map(as))
    },
    {
      [AST.TitleAnnotationId]: "ReadonlyMap",
      [AST.DescriptionAnnotationId]: "a ReadonlyMap",
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
        const validateResult = P.validateResult(array(item))
        return !isSet(u) ?
          PR.failure(PR.type(self, u)) :
          PR.map(validateResult(Array.from(u.values()), options), (as) => new Set(as))
      },
    {
      [AST.TitleAnnotationId]: "ReadonlySet",
      [AST.DescriptionAnnotationId]: "a ReadonlySet",
      [I.PrettyHookId]: readonlySetPretty,
      [I.ArbitraryHookId]: readonlySetArbitrary
    }
  )
