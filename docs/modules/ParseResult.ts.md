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
  - [index](#index)
  - [key](#key)
  - [missing](#missing)
  - [success](#success)
  - [type](#type)
  - [unexpected](#unexpected)
  - [unionMember](#unionmember)
- [guards](#guards)
  - [isFailure](#isfailure)
  - [isSuccess](#issuccess)
- [model](#model)
  - [Index (interface)](#index-interface)
  - [Key (interface)](#key-interface)
  - [Missing (interface)](#missing-interface)
  - [ParseError (type alias)](#parseerror-type-alias)
  - [Type (interface)](#type-interface)
  - [Unexpected (interface)](#unexpected-interface)
  - [UnionMember (interface)](#unionmember-interface)
- [utils](#utils)
  - [ParseResult (type alias)](#parseresult-type-alias)

---

# constructors

## failure

**Signature**

```ts
export declare const failure: (e: ParseError) => ParseResult<never>
```

Added in v1.0.0

## failures

**Signature**

```ts
export declare const failures: (es: readonly [ParseError, ...ParseError[]]) => ParseResult<never>
```

Added in v1.0.0

## index

**Signature**

```ts
export declare const index: (index: number, errors: readonly [ParseError, ...ParseError[]]) => Index
```

Added in v1.0.0

## key

**Signature**

```ts
export declare const key: (key: PropertyKey, errors: readonly [ParseError, ...ParseError[]]) => Key
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
export declare const success: <A>(a: A) => Either<readonly [ParseError, ...ParseError[]], A>
```

Added in v1.0.0

## type

**Signature**

```ts
export declare const type: (expected: AST.AST, actual: unknown) => Type
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
export declare const unionMember: (errors: readonly [ParseError, ...ParseError[]]) => UnionMember
```

Added in v1.0.0

# guards

## isFailure

**Signature**

```ts
export declare const isFailure: <A>(
  self: Either<readonly [ParseError, ...ParseError[]], A>
) => self is Left<readonly [ParseError, ...ParseError[]]>
```

Added in v1.0.0

## isSuccess

**Signature**

```ts
export declare const isSuccess: <A>(self: Either<readonly [ParseError, ...ParseError[]], A>) => self is Right<A>
```

Added in v1.0.0

# model

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
  readonly errors: NonEmptyReadonlyArray<ParseError>
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
  readonly errors: NonEmptyReadonlyArray<ParseError>
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

## ParseError (type alias)

`ParseError` is a type that represents the different types of errors that can occur when decoding a value.

**Signature**

```ts
export type ParseError = Type | Index | Key | Missing | Unexpected | UnionMember
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
  readonly errors: NonEmptyReadonlyArray<ParseError>
}
```

Added in v1.0.0

# utils

## ParseResult (type alias)

**Signature**

```ts
export type ParseResult<A> = Either<NonEmptyReadonlyArray<ParseError>, A>
```

Added in v1.0.0
