---
title: ParseResult.ts
nav_order: 9
parent: Modules
---

## ParseResult overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fail](#fail)
  - [forbidden](#forbidden)
  - [index](#index)
  - [key](#key)
  - [member](#member)
  - [missing](#missing)
  - [refinement](#refinement)
  - [succeed](#succeed)
  - [transform](#transform)
  - [try](#try)
  - [tuple](#tuple)
  - [type](#type)
  - [typeLiteral](#typeliteral)
  - [unexpected](#unexpected)
  - [union](#union)
- [model](#model)
  - [Forbidden (interface)](#forbidden-interface)
  - [Index (interface)](#index-interface)
  - [Key (interface)](#key-interface)
  - [Member (interface)](#member-interface)
  - [Missing (interface)](#missing-interface)
  - [ParseIssue (type alias)](#parseissue-type-alias)
  - [Refinement (interface)](#refinement-interface)
  - [Transform (interface)](#transform-interface)
  - [Tuple (interface)](#tuple-interface)
  - [Type (interface)](#type-interface)
  - [TypeLiteral (interface)](#typeliteral-interface)
  - [Unexpected (interface)](#unexpected-interface)
  - [Union (interface)](#union-interface)
- [optimisation](#optimisation)
  - [bimap](#bimap)
  - [eitherOrUndefined](#eitherorundefined)
  - [flatMap](#flatmap)
  - [map](#map)
  - [mapLeft](#mapleft)
  - [orElse](#orelse)
- [utils](#utils)
  - [ParseError (interface)](#parseerror-interface)
  - [ParseResult (interface)](#parseresult-interface)
  - [parseError](#parseerror)

---

# constructors

## fail

**Signature**

```ts
export declare const fail: (
  error: ParseError | ParseIssue | ReadonlyArray.NonEmptyReadonlyArray<ParseIssue>
) => ParseResult<never>
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
export declare const index: (index: number, errors: readonly [ParseIssue, ...ParseIssue[]]) => Index
```

Added in v1.0.0

## key

**Signature**

```ts
export declare const key: (key: PropertyKey, errors: readonly [ParseIssue, ...ParseIssue[]]) => Key
```

Added in v1.0.0

## member

**Signature**

```ts
export declare const member: (ast: AST.AST, errors: readonly [ParseIssue, ...ParseIssue[]]) => Member
```

Added in v1.0.0

## missing

**Signature**

```ts
export declare const missing: Missing
```

Added in v1.0.0

## refinement

**Signature**

```ts
export declare const refinement: (
  ast: AST.Refinement,
  actual: unknown,
  kind: "From" | "Predicate",
  errors: readonly [ParseIssue, ...ParseIssue[]]
) => Refinement
```

Added in v1.0.0

## succeed

**Signature**

```ts
export declare const succeed: <A>(a: A) => ParseResult<A>
```

Added in v1.0.0

## transform

**Signature**

```ts
export declare const transform: (
  ast: AST.Transform,
  actual: unknown,
  kind: "From" | "Transformation" | "To",
  errors: readonly [ParseIssue, ...ParseIssue[]]
) => Transform
```

Added in v1.0.0

## try

**Signature**

```ts
export declare const try: <A>(options: { try: LazyArg<A>; catch: (e: unknown) => ParseError; }) => ParseResult<A>
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: (ast: AST.Tuple, actual: unknown, errors: readonly [Index, ...Index[]]) => Tuple
```

Added in v1.0.0

## type

**Signature**

```ts
export declare const type: (ast: AST.AST, actual: unknown, message?: string) => Type
```

Added in v1.0.0

## typeLiteral

**Signature**

```ts
export declare const typeLiteral: (
  ast: AST.TypeLiteral,
  actual: unknown,
  errors: readonly [Key, ...Key[]]
) => TypeLiteral
```

Added in v1.0.0

## unexpected

**Signature**

```ts
export declare const unexpected: (expected: AST.AST) => Unexpected
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: (
  ast: AST.Union,
  actual: unknown,
  errors: readonly [Key | Type | Member, ...(Key | Type | Member)[]]
) => Union
```

Added in v1.0.0

# model

## Forbidden (interface)

The `Forbidden` variant of the `ParseIssue` type represents an error that occurs when an Effect is encounter but disallowed from execution.

**Signature**

```ts
export interface Forbidden {
  readonly _tag: "Forbidden"
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
  readonly _tag: "Index"
  readonly index: number
  readonly errors: ReadonlyArray.NonEmptyReadonlyArray<ParseIssue>
}
```

Added in v1.0.0

## Key (interface)

The `Key` variant of the `ParseIssue` type represents an error that occurs when a key in an object is invalid.
This error typically occurs when the `actual` value is not a valid key type (e.g. a string or number)
or when the key is not present in the object being decoded. In either case, the `key` field of the error will contain
the invalid key value. This error is typically used in combination with the `Unexpected` error,
which indicates that an unexpected key was found in the object being decoded.

**Signature**

```ts
export interface Key {
  readonly _tag: "Key"
  readonly key: PropertyKey
  readonly errors: ReadonlyArray.NonEmptyReadonlyArray<ParseIssue>
}
```

Added in v1.0.0

## Member (interface)

Error that occurs when a member in a union has an error.

**Signature**

```ts
export interface Member {
  readonly _tag: "Member"
  readonly ast: AST.AST
  readonly errors: ReadonlyArray.NonEmptyReadonlyArray<ParseIssue>
}
```

Added in v1.0.0

## Missing (interface)

Error that occurs when a required key or index is missing.

**Signature**

```ts
export interface Missing {
  readonly _tag: "Missing"
}
```

Added in v1.0.0

## ParseIssue (type alias)

`ParseErrors` is a type that represents the different types of errors that can occur when decoding a value.

**Signature**

```ts
export type ParseIssue =
  // context
  | Refinement
  | Tuple
  | TypeLiteral
  | Union
  | Key
  | Transform
  // primitives
  | Type
  | Missing
  | Unexpected
  | Forbidden
```

Added in v1.0.0

## Refinement (interface)

**Signature**

```ts
export interface Refinement {
  readonly _tag: "Refinement"
  readonly ast: AST.Refinement
  readonly actual: unknown
  readonly kind: "From" | "Predicate"
  readonly errors: ReadonlyArray.NonEmptyReadonlyArray<ParseIssue>
}
```

Added in v1.0.0

## Transform (interface)

Error that occurs when a transformation has an error.

**Signature**

```ts
export interface Transform {
  readonly _tag: "Transform"
  readonly ast: AST.Transform
  readonly actual: unknown
  readonly kind: "From" | "Transformation" | "To"
  readonly errors: ReadonlyArray.NonEmptyReadonlyArray<ParseIssue>
}
```

Added in v1.0.0

## Tuple (interface)

**Signature**

```ts
export interface Tuple {
  readonly _tag: "Tuple"
  readonly ast: AST.Tuple
  readonly actual: unknown
  readonly errors: ReadonlyArray.NonEmptyReadonlyArray<Index>
}
```

Added in v1.0.0

## Type (interface)

The `Type` variant of the `ParseIssue` type represents an error that occurs when the `actual` value is not of the expected type.
The `expected` field specifies the expected type, and the `actual` field contains the value that caused the error.
This error can occur when trying to decode a value using a schema that is only able to decode values of a specific type,
and the actual value is not of that type. For example, if you are using a schema to decode a string value and the actual value
is a number, a `Type` decode error would be returned.

**Signature**

```ts
export interface Type {
  readonly _tag: "Type"
  readonly ast: AST.AST
  readonly actual: unknown
  readonly message: Option.Option<string>
}
```

Added in v1.0.0

## TypeLiteral (interface)

**Signature**

```ts
export interface TypeLiteral {
  readonly _tag: "TypeLiteral"
  readonly ast: AST.TypeLiteral
  readonly actual: unknown
  readonly errors: ReadonlyArray.NonEmptyReadonlyArray<Key>
}
```

Added in v1.0.0

## Unexpected (interface)

Error that occurs when an unexpected key or index is present.

**Signature**

```ts
export interface Unexpected {
  readonly _tag: "Unexpected"
  readonly expected: AST.AST
}
```

Added in v1.0.0

## Union (interface)

Error that occurs when a union has an error.

**Signature**

```ts
export interface Union {
  readonly _tag: "Union"
  readonly ast: AST.Union
  readonly actual: unknown
  readonly errors: ReadonlyArray.NonEmptyReadonlyArray<Member | Key | Type>
}
```

Added in v1.0.0

# optimisation

## bimap

**Signature**

```ts
export declare const bimap: <A, B>(
  self: ParseResult<A>,
  f: (error: ParseError) => ParseError,
  g: (a: A) => B
) => ParseResult<B>
```

Added in v1.0.0

## eitherOrUndefined

**Signature**

```ts
export declare const eitherOrUndefined: <A>(self: ParseResult<A>) => Either.Either<ParseError, A> | undefined
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

## mapLeft

**Signature**

```ts
export declare const mapLeft: <A>(self: ParseResult<A>, f: (error: ParseError) => ParseError) => ParseResult<A>
```

Added in v1.0.0

## orElse

**Signature**

```ts
export declare const orElse: <A>(self: ParseResult<A>, f: (error: ParseError) => ParseResult<A>) => ParseResult<A>
```

Added in v1.0.0

# utils

## ParseError (interface)

**Signature**

```ts
export interface ParseError {
  readonly _tag: "ParseError"
  readonly errors: ReadonlyArray.NonEmptyReadonlyArray<ParseIssue>
}
```

Added in v1.0.0

## ParseResult (interface)

**Signature**

```ts
export interface ParseResult<A> extends Effect.Effect<never, ParseError, A> {}
```

Added in v1.0.0

## parseError

**Signature**

```ts
export declare const parseError: (errors: readonly [ParseIssue, ...ParseIssue[]]) => ParseError
```

Added in v1.0.0
