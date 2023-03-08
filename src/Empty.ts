/**
 * @since 1.0.0
 */
import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import * as H from "@effect/schema/annotation/Hook"
import * as AST from "@effect/schema/AST"
import * as I from "@effect/schema/internal/common"
import type { Schema } from "@effect/schema/Schema"

/**
 * @category model
 * @since 1.0.0
 */
export interface Empty<A> extends Schema<A> {
  readonly empty: () => A
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const make: <A>(
  schema: Schema<A>,
  empty: Empty<A>["empty"]
) => Empty<A> = I.makeEmpty

const getHook = AST.getAnnotation<H.Hook<Empty<any>>>(H.EmptyHookId)

const constant = <A>(c: A) => (ast: AST.AST) => make(I.makeSchema(ast), () => c)

const error = (msg: string) =>
  (ast: AST.AST) =>
    make(I.makeSchema(ast), () => {
      throw new Error(msg)
    })

/**
 * @since 1.0.0
 */
export const match: AST.Match<Empty<any>> = {
  TypeAlias: (ast, go) =>
    pipe(
      getHook(ast),
      O.match(
        () => go(ast.type),
        ({ handler }) => handler(...ast.typeParameters.map(go))
      )
    ),
  VoidKeyword: constant(undefined),
  NeverKeyword: error("cannot create an empty value for `never`"),
  Literal: (ast) => make(I.makeSchema(ast), () => ast.literal),
  SymbolKeyword: constant(""),
  UniqueSymbol: (ast) => make(I.makeSchema(ast), () => JSON.stringify(ast.symbol.toString())),
  TemplateLiteral: (ast) => {
    return make(
      I.makeSchema(ast),
      () => {
        const components = [ast.head]
        for (const span of ast.spans) {
          components.push(span.literal)
        }
        return components.join("")
      }
    )
  },
  UndefinedKeyword: constant(undefined),
  UnknownKeyword: constant(undefined),
  AnyKeyword: constant(undefined),
  ObjectKeyword: constant({}),
  StringKeyword: constant(""),
  NumberKeyword: constant(0),
  BooleanKeyword: constant(false),
  BigIntKeyword: constant(0n),
  Enums: (ast) => make(I.makeSchema(ast), () => ast.enums[0][1]),
  Tuple: (ast, go) => {
    const elements = ast.elements.map((e) => go(e.type))
    return make(
      I.makeSchema(ast),
      () => elements.map((e) => e.empty())
    )
  },
  TypeLiteral: (ast, go) => {
    const propertySignaturesTypes = ast.propertySignatures.map((f) => go(f.type))

    return make(I.makeSchema(ast), () => {
      const output: any = {}

      // handle property signatures

      for (let i = 0; i < propertySignaturesTypes.length; i++) {
        const ps = ast.propertySignatures[i]
        const name = ps.name
        if (!ps.isOptional) {
          output[name] = propertySignaturesTypes[i].empty()
        }
      }

      return output
    })
  },
  Union: (ast, go) => {
    const types = ast.types.map(go)
    return make(I.makeSchema(ast), () => types[0].empty())
  },
  Lazy: (ast, go) => {
    const f = () => go(ast.f())
    const get = I.memoize<void, Empty<any>>(f)
    const schema = I.lazy(f)
    return make(schema, () => get().empty())
  },
  Refinement: (ast, go) => go(ast.from),
  Transform: (ast, go) => go(ast.to)
}

const compile = AST.getCompiler(match)

/**
 * @category prettify
 * @since 1.0.0
 */
export const empty = <A>(schema: Schema<A>) => compile(schema.ast).empty()
