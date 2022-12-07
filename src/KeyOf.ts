/**
 * @since 1.0.0
 */

import { pipe } from "@fp-ts/data/Function"
import * as O from "@fp-ts/data/Option"
import * as ReadonlyArray from "@fp-ts/data/ReadonlyArray"
import type { AST } from "@fp-ts/schema/AST"
import * as I from "@fp-ts/schema/internal/common"
import type { Provider } from "@fp-ts/schema/Provider"
import { empty, findHandler, Semigroup } from "@fp-ts/schema/Provider"
import type { Schema } from "@fp-ts/schema/Schema"
import * as S from "@fp-ts/schema/Schema"

/**
 * @since 1.0.0
 */
export const KeyOfId = I.KeyOfId

/**
 * @since 1.0.0
 */
export interface KeyOf<in out A> extends S.Schema<A> {
  readonly keyOf: S.Schema<keyof A>
}

/**
 * @since 1.0.0
 */
export const make: <A>(schema: Schema<A>, keyOf: KeyOf<A>["keyOf"]) => KeyOf<A> = I.makeKeyOf

function getUnionMembers(ast: AST): ReadonlyArray<AST> {
  if (ast._tag !== "Union") return ReadonlyArray.of(ast)
  return pipe(ast.members, ReadonlyArray.map(getUnionMembers), ReadonlyArray.flatten)
}

/**
 * @since 1.0.0
 */
export const provideKeyOfFor = (provider: Provider) =>
  <A>(schema: Schema<A>): KeyOf<A> => {
    const go = (ast: AST): KeyOf<any> => {
      switch (ast._tag) {
        case "Declaration": {
          const handler = pipe(
            ast.provider,
            Semigroup.combine(provider),
            findHandler(I.KeyOfId, ast.id)
          )
          if (O.isSome(handler)) {
            return O.isSome(ast.config) ?
              handler.value(ast.config.value)(...ast.nodes.map(go)) :
              handler.value(...ast.nodes.map(go))
          }
          throw new Error(
            `Missing support for KeyOf interpreter, data type ${String(ast.id.description)}`
          )
        }
        case "Of":
          return make(S.make(ast), S.union() as any)
        case "Tuple": {
          const components = ast.components.map((_, i) => S.of(i))
          const restElement = pipe(ast.restElement, O.map(() => S.number))
          if (O.isSome(restElement)) {
            return make(S.make(ast), S.union(restElement.value, ...components) as any)
          }
          return make(S.make(ast), S.union(...components) as any)
        }
        case "Union": {
          if (ast.members.length === 0) return make(S.make(ast), S.never as any)

          let members = getUnionMembers(go(ast.members[0]).keyOf.ast)
          for (let i = 0; i < ast.members.length; i++) {
            const incoming = getUnionMembers(go(ast.members[i]).keyOf.ast)
            members = ReadonlyArray.intersection(incoming)(members)
          }

          return make(S.make(ast), S.union(...members.map(S.make)) as any)
        }
        case "Struct": {
          const members: Array<Schema<any>> = ast.fields.map((field) => S.of(field.key))
          if (O.isSome(ast.indexSignatures.string)) {
            members.push(S.string)
          }
          if (O.isSome(ast.indexSignatures.number)) {
            members.push(S.number)
          }
          if (O.isSome(ast.indexSignatures.symbol)) {
            members.push(S.symbol)
          }

          return make(S.make(ast), S.union(...members))
        }
        case "Lazy":
          return _lazy(() => go(ast.f()))
      }
    }

    return go(schema.ast)
  }

/**
 * @since 1.0.0
 */
export const keyOf: <A>(schema: Schema<A>) => KeyOf<A> = provideKeyOfFor(
  empty
)

const _lazy = <A>(
  f: () => KeyOf<A>
): KeyOf<A> => {
  const get = I.memoize<void, KeyOf<A>>(f)
  const schema = I.lazy(f)
  return make(
    schema,
    get().keyOf
  )
}
