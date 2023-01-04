---
title: Codec.ts
nav_order: 7
parent: Modules
---

## Codec overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [array](#array)
  - [element](#element)
  - [extend](#extend)
  - [field](#field)
  - [filter](#filter)
  - [keyof](#keyof)
  - [lazy](#lazy)
  - [nonEmptyArray](#nonemptyarray)
  - [nullable](#nullable)
  - [omit](#omit)
  - [optional](#optional)
  - [optionalElement](#optionalelement)
  - [partial](#partial)
  - [pick](#pick)
  - [record](#record)
  - [rest](#rest)
  - [struct](#struct)
  - [transform](#transform)
  - [transformOrFail](#transformorfail)
  - [tuple](#tuple)
  - [union](#union)
- [constructors](#constructors)
  - [enums](#enums)
  - [failure](#failure)
  - [failures](#failures)
  - [instanceOf](#instanceof)
  - [literal](#literal)
  - [success](#success)
  - [templateLiteral](#templateliteral)
  - [uniqueSymbol](#uniquesymbol)
  - [warning](#warning)
  - [warnings](#warnings)
- [data](#data)
  - [json](#json)
  - [option](#option)
- [filters](#filters)
  - [endsWith](#endswith)
  - [finite](#finite)
  - [greaterThan](#greaterthan)
  - [greaterThanOrEqualTo](#greaterthanorequalto)
  - [int](#int)
  - [length](#length)
  - [lessThan](#lessthan)
  - [lessThanOrEqualTo](#lessthanorequalto)
  - [maxLength](#maxlength)
  - [minLength](#minlength)
  - [nonEmpty](#nonempty)
  - [nonNaN](#nonnan)
  - [regex](#regex)
  - [startsWith](#startswith)
- [guards](#guards)
  - [isFailure](#isfailure)
  - [isSuccess](#issuccess)
  - [isWarning](#iswarning)
- [model](#model)
  - [Codec (interface)](#codec-interface)
- [primitives](#primitives)
  - [any](#any)
  - [bigint](#bigint)
  - [boolean](#boolean)
  - [never](#never)
  - [null](#null)
  - [number](#number)
  - [object](#object)
  - [string](#string)
  - [symbol](#symbol)
  - [undefined](#undefined)
  - [unknown](#unknown)
  - [void](#void)
- [unexpected keys / indexes](#unexpected-keys--indexes)
  - [allowUnexpected](#allowunexpected)
  - [disallowUnexpected](#disallowunexpected)
- [utils](#utils)
  - [Infer (type alias)](#infer-type-alias)
  - [codecFor](#codecfor)

---

# combinators

## array

**Signature**

```ts
export declare const array: <A>(item: Schema<A>) => Codec<readonly A[]>
```

Added in v1.0.0

## element

**Signature**

```ts
export declare const element: <E>(
  element: Schema<E>
) => <A extends readonly any[]>(self: Schema<A>) => Codec<readonly [...A, E]>
```

Added in v1.0.0

## extend

**Signature**

```ts
export declare const extend: <B>(that: Schema<B>) => <A>(self: Schema<A>) => Codec<S.Spread<A & B>>
```

Added in v1.0.0

## field

**Signature**

```ts
export declare const field: <Key extends string | number | symbol, A, isOptional extends boolean>(
  key: Key,
  value: Schema<A>,
  isOptional: isOptional,
  annotations?: Record<string | symbol, unknown> | undefined
) => Codec<isOptional extends true ? { readonly [K in Key]?: A | undefined } : { readonly [K in Key]: A }>
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare const filter: <A, B extends A>(
  refinement: Refinement<A, B>,
  meta: unknown,
  annotations?: Annotated['annotations']
) => (self: Schema<A>) => Codec<B>
```

Added in v1.0.0

## keyof

**Signature**

```ts
export declare const keyof: <A>(schema: Schema<A>) => Codec<keyof A>
```

Added in v1.0.0

## lazy

**Signature**

```ts
export declare const lazy: <A>(f: () => Schema<A>) => Codec<A>
```

Added in v1.0.0

## nonEmptyArray

**Signature**

```ts
export declare const nonEmptyArray: <A>(item: Schema<A>) => Codec<readonly [A, ...A[]]>
```

Added in v1.0.0

## nullable

**Signature**

```ts
export declare const nullable: <A>(self: Schema<A>) => Codec<A | null>
```

Added in v1.0.0

## omit

**Signature**

```ts
export declare const omit: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => (self: Schema<A>) => Codec<{ readonly [P in Exclude<keyof A, Keys[number]>]: A[P] }>
```

Added in v1.0.0

## optional

**Signature**

```ts
export declare const optional: <A>(schema: Schema<A>) => S.OptionalSchema<A, true>
```

Added in v1.0.0

## optionalElement

**Signature**

```ts
export declare const optionalElement: <E>(
  element: Schema<E>
) => <A extends readonly any[]>(self: Schema<A>) => Codec<readonly [...A, (E | undefined)?]>
```

Added in v1.0.0

## partial

**Signature**

```ts
export declare const partial: <A>(self: Schema<A>) => Codec<Partial<A>>
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => (self: Schema<A>) => Codec<{ readonly [P in Keys[number]]: A[P] }>
```

Added in v1.0.0

## record

**Signature**

```ts
export declare const record: <K extends string | symbol, V>(
  key: Schema<K>,
  value: Schema<V>
) => Codec<{ readonly [k in K]: V }>
```

Added in v1.0.0

## rest

**Signature**

```ts
export declare const rest: <R>(
  rest: Schema<R>
) => <A extends readonly any[]>(self: Schema<A>) => Codec<readonly [...A, ...R[]]>
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <Fields extends Record<string | number | symbol, Schema<any>>>(
  fields: Fields
) => Codec<
  S.Spread<
    { readonly [K in Exclude<keyof Fields, S.OptionalKeys<Fields>>]: Infer<Fields[K]> } & {
      readonly [K in S.OptionalKeys<Fields>]?: Infer<Fields[K]> | undefined
    }
  >
>
```

Added in v1.0.0

## transform

**Signature**

```ts
export declare const transform: <A, B>(to: Schema<B>, f: (a: A) => B, g: (b: B) => A) => (self: Schema<A>) => Codec<B>
```

Added in v1.0.0

## transformOrFail

**Signature**

```ts
export declare const transformOrFail: <A, B>(
  to: Schema<B>,
  f: (i: A) => These<readonly [DecodeError, ...DecodeError[]], B>,
  g: (i: B) => These<readonly [DecodeError, ...DecodeError[]], A>
) => (self: Schema<A>) => Codec<B>
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <Elements extends readonly Schema<any>[]>(
  ...elements: Elements
) => Codec<{ readonly [K in keyof Elements]: Infer<Elements[K]> }>
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: <Members extends readonly Schema<any>[]>(
  ...members: Members
) => Codec<Infer<Members[number]>>
```

Added in v1.0.0

# constructors

## enums

**Signature**

```ts
export declare const enums: <A extends { [x: string]: string | number }>(
  nativeEnum: A,
  annotations?: Record<string | symbol, unknown> | undefined
) => Codec<A[keyof A]>
```

Added in v1.0.0

## failure

**Signature**

```ts
export declare const failure: (e: DecodeError) => These<NonEmptyReadonlyArray<DecodeError>, never>
```

Added in v1.0.0

## failures

**Signature**

```ts
export declare const failures: (
  es: readonly [DecodeError, ...DecodeError[]]
) => These<NonEmptyReadonlyArray<DecodeError>, never>
```

Added in v1.0.0

## instanceOf

**Signature**

```ts
export declare const instanceOf: <A extends typeof Class>(
  constructor: A
) => (self: Schema<object>) => Codec<InstanceType<A>>
```

Added in v1.0.0

## literal

**Signature**

```ts
export declare const literal: <A extends readonly LiteralValue[]>(...a: A) => Codec<A[number]>
```

Added in v1.0.0

## success

**Signature**

```ts
export declare const success: <A>(a: A) => These<never, A>
```

Added in v1.0.0

## templateLiteral

**Signature**

```ts
export declare const templateLiteral: <T extends [Schema<any>, ...Schema<any>[]]>(
  ...spans: T
) => Codec<S.Join<{ [K in keyof T]: Infer<T[K]> }>>
```

Added in v1.0.0

## uniqueSymbol

**Signature**

```ts
export declare const uniqueSymbol: <S extends symbol>(
  symbol: S,
  annotations?: Record<string | symbol, unknown> | undefined
) => Codec<S>
```

Added in v1.0.0

## warning

**Signature**

```ts
export declare const warning: <A>(e: DecodeError, a: A) => These<readonly [DecodeError, ...DecodeError[]], A>
```

Added in v1.0.0

## warnings

**Signature**

```ts
export declare const warnings: <A>(
  es: readonly [DecodeError, ...DecodeError[]],
  a: A
) => These<readonly [DecodeError, ...DecodeError[]], A>
```

Added in v1.0.0

# data

## json

**Signature**

```ts
export declare const json: Codec<Json.Json>
```

Added in v1.0.0

## option

**Signature**

```ts
export declare const option: <A>(value: Schema<A>, kind?: 'plain' | 'fromNullable' | 'inline') => Codec<Option<A>>
```

Added in v1.0.0

# filters

## endsWith

**Signature**

```ts
export declare const endsWith: (endsWith: string) => <A extends string>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## finite

**Signature**

```ts
export declare const finite: <A extends number>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## greaterThan

**Signature**

```ts
export declare const greaterThan: (max: number) => <A extends number>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## greaterThanOrEqualTo

**Signature**

```ts
export declare const greaterThanOrEqualTo: (max: number) => <A extends number>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## int

**Signature**

```ts
export declare const int: <A extends number>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## length

**Signature**

```ts
export declare const length: (length: number) => <A extends string>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## lessThan

**Signature**

```ts
export declare const lessThan: (min: number) => <A extends number>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## lessThanOrEqualTo

**Signature**

```ts
export declare const lessThanOrEqualTo: (min: number) => <A extends number>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: (maxLength: number) => <A extends string>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: (minLength: number) => <A extends string>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## nonEmpty

**Signature**

```ts
export declare const nonEmpty: <A extends string>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## nonNaN

**Signature**

```ts
export declare const nonNaN: <A extends number>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## regex

**Signature**

```ts
export declare const regex: (regex: RegExp) => <A extends string>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## startsWith

**Signature**

```ts
export declare const startsWith: (startsWith: string) => <A extends string>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

# guards

## isFailure

**Signature**

```ts
export declare const isFailure: <E, A>(self: These<E, A>) => self is Left<E>
```

Added in v1.0.0

## isSuccess

**Signature**

```ts
export declare const isSuccess: <E, A>(self: These<E, A>) => self is Right<A>
```

Added in v1.0.0

## isWarning

**Signature**

```ts
export declare const isWarning: <E, A>(self: These<E, A>) => self is Both<E, A>
```

Added in v1.0.0

# model

## Codec (interface)

**Signature**

```ts
export interface Codec<A> extends Schema<A>, Decoder<unknown, A>, Encoder<unknown, A>, Guard<A> {
  readonly decodeOrThrow: (u: unknown) => A
}
```

Added in v1.0.0

# primitives

## any

**Signature**

```ts
export declare const any: Codec<any>
```

Added in v1.0.0

## bigint

**Signature**

```ts
export declare const bigint: Codec<bigint>
```

Added in v1.0.0

## boolean

**Signature**

```ts
export declare const boolean: Codec<boolean>
```

Added in v1.0.0

## never

**Signature**

```ts
export declare const never: Codec<never>
```

Added in v1.0.0

## null

**Signature**

```ts
export declare const null: Codec<null>
```

Added in v1.0.0

## number

**Signature**

```ts
export declare const number: Codec<number>
```

Added in v1.0.0

## object

**Signature**

```ts
export declare const object: Codec<object>
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: Codec<string>
```

Added in v1.0.0

## symbol

**Signature**

```ts
export declare const symbol: Codec<symbol>
```

Added in v1.0.0

## undefined

**Signature**

```ts
export declare const undefined: Codec<undefined>
```

Added in v1.0.0

## unknown

**Signature**

```ts
export declare const unknown: Codec<unknown>
```

Added in v1.0.0

## void

**Signature**

```ts
export declare const void: Codec<void>
```

Added in v1.0.0

# unexpected keys / indexes

## allowUnexpected

**Signature**

```ts
export declare const allowUnexpected: <A>(self: Schema<A>) => Codec<A>
```

Added in v1.0.0

## disallowUnexpected

**Signature**

```ts
export declare const disallowUnexpected: <A>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0

# utils

## Infer (type alias)

**Signature**

```ts
export type Infer<S extends Schema<any>> = Parameters<S['A']>[0]
```

Added in v1.0.0

## codecFor

**Signature**

```ts
export declare const codecFor: <A>(schema: Schema<A>) => Codec<A>
```

Added in v1.0.0
