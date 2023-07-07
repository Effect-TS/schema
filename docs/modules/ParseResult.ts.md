---
title: ParseResult.ts
nav_order: 4
parent: Modules
---

## ParseResult overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [failure](#failure)
  - [failures](#failures)
  - [forbidden](#forbidden)
  - [index](#index)
  - [key](#key)
  - [missing](#missing)
  - [success](#success)
  - [type](#type)
  - [unexpected](#unexpected)
  - [unionMember](#unionmember)
- [model](#model)
  - [Forbidden (interface)](#forbidden-interface)
  - [Index (interface)](#index-interface)
  - [Key (interface)](#key-interface)
  - [Missing (interface)](#missing-interface)
  - [ParseErrors (type alias)](#parseerrors-type-alias)
  - [Type (interface)](#type-interface)
  - [Unexpected (interface)](#unexpected-interface)
  - [UnionMember (interface)](#unionmember-interface)
- [optimisation](#optimisation)
  - [eitherOrUndefined](#eitherorundefined)
  - [flatMap](#flatmap)
  - [map](#map)
- [utils](#utils)
  - [ParseError (interface)](#parseerror-interface)
  - [ParseResult (type alias)](#parseresult-type-alias)
  - [parseError](#parseerror)

---

# constructors

## failure

**Signature**

```ts
export declare const failure: (e: ParseErrors) => ParseResult<never>
```

Added in v1.0.0

## failures

**Signature**

```ts
export declare const failures: (es: readonly [ParseErrors, ...ParseErrors[]]) => ParseResult<never>
```

Added in v1.0.0

## forbidden

**Signature**

```ts
export declare const forbidden: Forbidden
```

Added in v1.0.0

## index

**Signature**

```ts
export declare const index: (index: number, errors: readonly [ParseErrors, ...ParseErrors[]]) => Index
```

Added in v1.0.0

## key

**Signature**

```ts
export declare const key: (key: PropertyKey, errors: readonly [ParseErrors, ...ParseErrors[]]) => Key
```

Added in v1.0.0

## missing

**Signature**

```ts
export declare const missing: Missing
```

Added in v1.0.0

## success

**Signature**

```ts
export declare const success: <A>(a: A) => ParseResult<A>
```

Added in v1.0.0

## type

**Signature**

```ts
export declare const type: (expected: AST.AST, actual: unknown, message?: string) => Type
```

Added in v1.0.0

## unexpected

**Signature**

```ts
export declare const unexpected: (actual: unknown) => Unexpected
```

Added in v1.0.0

## unionMember

**Signature**

```ts
export declare const unionMember: (errors: readonly [ParseErrors, ...ParseErrors[]]) => UnionMember
```

Added in v1.0.0

# model

## Forbidden (interface)

The `Forbidden` variant of the `ParseError` type represents an error that occurs when an Effect is encounter but disallowed from execution.

**Signature**

```ts
export interface Forbidden {
  readonly _tag: 'Forbidden'
}
```

Added in v1.0.0

## Index (interface)

The `Index` decode error indicates that there was an error at a specific index in an array or tuple.
The `errors` field contains the decode errors for that index. This error is typically used when decoding an array or tuple
with a schema that has constraints on the elements. For example, you might use an `Index` decode error to indicate
that a specific element in an array did not match the expected type or value.

**Signature**

```ts
export interface Index {
  readonly _tag: 'Index'
  readonly index: number
  readonly errors: NonEmptyReadonlyArray<ParseErrors>
}
```

Added in v1.0.0

## Key (interface)

The `Key` variant of the `ParseError` type represents an error that occurs when a key in an object is invalid.
This error typically occurs when the `actual` value is not a valid key type (e.g. a string or number)
or when the key is not present in the object being decoded. In either case, the `key` field of the error will contain
the invalid key value. This error is typically used in combination with the `Unexpected` error,
which indicates that an unexpected key was found in the object being decoded.

**Signature**

```ts
export interface Key {
  readonly _tag: 'Key'
  readonly key: PropertyKey
  readonly errors: NonEmptyReadonlyArray<ParseErrors>
}
```

Added in v1.0.0

## Missing (interface)

Error that occurs when a required key or index is missing.

**Signature**

```ts
export interface Missing {
  readonly _tag: 'Missing'
}
```

Added in v1.0.0

## ParseErrors (type alias)

`ParseErrors` is a type that represents the different types of errors that can occur when decoding a value.

**Signature**

```ts
export type ParseErrors = Type | Index | Key | Missing | Unexpected | UnionMember | Forbidden
```

Added in v1.0.0

## Type (interface)

The `Type` variant of the `ParseError` type represents an error that occurs when the `actual` value is not of the expected type.
The `expected` field specifies the expected type, and the `actual` field contains the value that caused the error.
This error can occur when trying to decode a value using a schema that is only able to decode values of a specific type,
and the actual value is not of that type. For example, if you are using a schema to decode a string value and the actual value
is a number, a `Type` decode error would be returned.

**Signature**

```ts
export interface Type {
  readonly _tag: 'Type'
  readonly expected: AST.AST
  readonly actual: unknown
  readonly message: O.Option<string>
}
```

Added in v1.0.0

## Unexpected (interface)

Error that occurs when an unexpected key or index is present.

**Signature**

```ts
export interface Unexpected {
  readonly _tag: 'Unexpected'
  readonly actual: unknown
}
```

Added in v1.0.0

## UnionMember (interface)

Error that occurs when a member in a union has an error.

**Signature**

```ts
export interface UnionMember {
  readonly _tag: 'UnionMember'
  readonly errors: NonEmptyReadonlyArray<ParseErrors>
}
```

Added in v1.0.0

# optimisation

## eitherOrUndefined

**Signature**

```ts
export declare const eitherOrUndefined: <A>(self: ParseResult<A>) => E.Either<ParseError, A> | undefined
```

Added in v1.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(self: ParseResult<A>, f: (self: A) => ParseResult<B>) => ParseResult<B>
```

Added in v1.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(self: ParseResult<A>, f: (self: A) => B) => ParseResult<B>
```

Added in v1.0.0

# utils

## ParseError (interface)

**Signature**

```ts
export interface ParseError {
  readonly _tag: 'ParseError'
  readonly errors: NonEmptyReadonlyArray<ParseErrors>
}
```

Added in v1.0.0

## ParseResult (type alias)

**Signature**

```ts
export type ParseResult<A> = Effect.Effect<never, ParseError, A>
```

Added in v1.0.0

## parseError

**Signature**

```ts
export declare const parseError: (errors: readonly [ParseErrors, ...ParseErrors[]]) => ParseError
```

Added in v1.0.0
