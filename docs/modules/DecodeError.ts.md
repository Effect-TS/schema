---
title: DecodeError.ts
nav_order: 14
parent: Modules
---

## DecodeError overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [enums](#enums)
  - [equal](#equal)
  - [failure](#failure)
  - [failures](#failures)
  - [index](#index)
  - [key](#key)
  - [member](#member)
  - [meta](#meta)
  - [missing](#missing)
  - [refinement](#refinement)
  - [success](#success)
  - [transform](#transform)
  - [type](#type)
  - [unexpected](#unexpected)
  - [warning](#warning)
  - [warnings](#warnings)
- [guards](#guards)
  - [hasWarnings](#haswarnings)
  - [isFailure](#isfailure)
  - [isIndex](#isindex)
  - [isKey](#iskey)
  - [isSuccess](#issuccess)
  - [isUnexpected](#isunexpected)
- [model](#model)
  - [DecodeError (type alias)](#decodeerror-type-alias)
  - [Enums (interface)](#enums-interface)
  - [Equal (interface)](#equal-interface)
  - [Index (interface)](#index-interface)
  - [Key (interface)](#key-interface)
  - [Member (interface)](#member-interface)
  - [Meta (interface)](#meta-interface)
  - [Missing (interface)](#missing-interface)
  - [Refinement (interface)](#refinement-interface)
  - [Transform (interface)](#transform-interface)
  - [Type (interface)](#type-interface)
  - [Unexpected (interface)](#unexpected-interface)
- [utils](#utils)
  - [DecodeResult (type alias)](#decoderesult-type-alias)

---

# constructors

## enums

**Signature**

```ts
export declare const enums: (enums: ReadonlyArray<readonly [string, string | number]>, actual: unknown) => Enums
```

Added in v1.0.0

## equal

**Signature**

```ts
export declare const equal: (expected: unknown, actual: unknown) => Equal
```

Added in v1.0.0

## failure

**Signature**

```ts
export declare const failure: (e: DecodeError) => DecodeResult<never>
```

Added in v1.0.0

## failures

**Signature**

```ts
export declare const failures: (es: readonly [DecodeError, ...DecodeError[]]) => DecodeResult<never>
```

Added in v1.0.0

## index

**Signature**

```ts
export declare const index: (index: number, errors: readonly [DecodeError, ...DecodeError[]]) => Index
```

Added in v1.0.0

## key

**Signature**

```ts
export declare const key: (key: PropertyKey, errors: readonly [DecodeError, ...DecodeError[]]) => Key
```

Added in v1.0.0

## member

**Signature**

```ts
export declare const member: (errors: readonly [DecodeError, ...DecodeError[]]) => Member
```

Added in v1.0.0

## meta

**Signature**

```ts
export declare const meta: (meta: unknown, actual: unknown) => Meta
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
export declare const refinement: (meta: unknown, actual: unknown) => Refinement
```

Added in v1.0.0

## success

**Signature**

```ts
export declare const success: <A>(a: A) => T.These<readonly [DecodeError, ...DecodeError[]], A>
```

Added in v1.0.0

## transform

**Signature**

```ts
export declare const transform: (from: string, to: string, actual: unknown) => Transform
```

Added in v1.0.0

## type

**Signature**

```ts
export declare const type: (expected: string, actual: unknown) => Type
```

Added in v1.0.0

## unexpected

**Signature**

```ts
export declare const unexpected: (actual: unknown) => Unexpected
```

Added in v1.0.0

## warning

**Signature**

```ts
export declare const warning: <A>(e: DecodeError, a: A) => T.These<readonly [DecodeError, ...DecodeError[]], A>
```

Added in v1.0.0

## warnings

**Signature**

```ts
export declare const warnings: <A>(
  es: readonly [DecodeError, ...DecodeError[]],
  a: A
) => T.These<readonly [DecodeError, ...DecodeError[]], A>
```

Added in v1.0.0

# guards

## hasWarnings

**Signature**

```ts
export declare const hasWarnings: <A>(
  self: T.These<readonly [DecodeError, ...DecodeError[]], A>
) => self is T.Both<readonly [DecodeError, ...DecodeError[]], A>
```

Added in v1.0.0

## isFailure

**Signature**

```ts
export declare const isFailure: <A>(
  self: T.These<readonly [DecodeError, ...DecodeError[]], A>
) => self is Left<readonly [DecodeError, ...DecodeError[]]>
```

Added in v1.0.0

## isIndex

**Signature**

```ts
export declare const isIndex: (e: DecodeError) => e is Index
```

Added in v1.0.0

## isKey

**Signature**

```ts
export declare const isKey: (e: DecodeError) => e is Key
```

Added in v1.0.0

## isSuccess

**Signature**

```ts
export declare const isSuccess: <A>(self: T.These<readonly [DecodeError, ...DecodeError[]], A>) => self is Right<A>
```

Added in v1.0.0

## isUnexpected

**Signature**

```ts
export declare const isUnexpected: (e: DecodeError) => e is Unexpected
```

Added in v1.0.0

# model

## DecodeError (type alias)

`DecodeError` is a type that represents the different types of errors that can occur when decoding a value.

**Signature**

```ts
export type DecodeError =
  | Meta
  | Type
  | Equal
  | Enums
  | Refinement
  | Transform
  | Index
  | Key
  | Missing
  | Unexpected
  | Member
```

Added in v1.0.0

## Enums (interface)

The `Enums` variant of the `DecodeError` type represents an error that occurs when the `actual` value being decoded
is not one of the expected enum values. This error typically occurs when decoding a string or number value that is expected
to match one of a predefined set of values. The `enums` field of this error type is an array of tuples, where each tuple contains
a string representation of the expected enum value and its corresponding raw value.
The `actual` field contains the value that was actually encountered during decoding.
This error is often used in combination with the `S.enums` schema constructor,
which allows users to specify a set of allowed enum values for a decoded value.

**Signature**

```ts
export interface Enums {
  readonly _tag: 'Enums'
  readonly enums: ReadonlyArray<readonly [string, string | number]>
  readonly actual: unknown
}
```

Added in v1.0.0

## Equal (interface)

The `Equal` variant of the `DecodeError` type represents an error that occurs when the `actual` value being decoded is not equal
to the `expected` value. This error is typically used when decoding a value that must match a specific value, such as a boolean or a
string literal. The `expected` field of the `Equal` error contains the expected value, and the `actual` field contains the value
that was actually encountered during decoding.

**Signature**

```ts
export interface Equal {
  readonly _tag: 'Equal'
  readonly expected: unknown
  readonly actual: unknown
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
  readonly errors: NonEmptyReadonlyArray<DecodeError>
}
```

Added in v1.0.0

## Key (interface)

The `Key` variant of the `DecodeError` type represents an error that occurs when a key in an object is invalid.
This error typically occurs when the `actual` value is not a valid key type (e.g. a string or number)
or when the key is not present in the object being decoded. In either case, the `key` field of the error will contain
the invalid key value. This error is typically used in combination with the `Unexpected` error,
which indicates that an unexpected key was found in the object being decoded.

**Signature**

```ts
export interface Key {
  readonly _tag: 'Key'
  readonly key: PropertyKey
  readonly errors: NonEmptyReadonlyArray<DecodeError>
}
```

Added in v1.0.0

## Member (interface)

Error that occurs when a member in a union has an error.

**Signature**

```ts
export interface Member {
  readonly _tag: 'Member'
  readonly errors: NonEmptyReadonlyArray<DecodeError>
}
```

Added in v1.0.0

## Meta (interface)

The `Meta` variant of the `DecodeError` type allows users to attach custom metadata to a decode error.
This metadata can be any value, and is typically used to provide additional context or information about the error.
For example, you might use the `meta` field to include information about the expected type or shape of the value being decoded,
or to include a custom error message.

**Signature**

```ts
export interface Meta {
  readonly _tag: 'Meta'
  readonly meta: unknown
  readonly actual: unknown
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

## Refinement (interface)

The `Refinement` variant of the `DecodeError` type indicates that the actual value did not pass a refinement check.
This error typically occurs when a `filter` function is used to further validate the shape or type of a value.
The `meta` field can be used to include additional information about the refinement,
such as the expected type or shape of the value, or a custom error message.

**Signature**

```ts
export interface Refinement {
  readonly _tag: 'Refinement'
  readonly meta: unknown
  readonly actual: unknown
}
```

Added in v1.0.0

## Transform (interface)

The `Transform` variant of the `DecodeError` type represents an error that occurs when a value cannot be transformed
from one format to another. For example, this error might occur when attempting to parse a string as a number.
The `from` field specifies the format that the value is being transformed from, and the `to` field specifies the format
that the value is being transformed to. The `actual` field contains the value that caused the error.
This error is typically used in conjunction with the `parse` function from the `@fp-ts/schema/data/parser` module,
which allows users to define custom parsers for specific types or formats.

**Signature**

```ts
export interface Transform {
  readonly _tag: 'Transform'
  readonly from: string
  readonly to: string
  readonly actual: unknown
}
```

Added in v1.0.0

## Type (interface)

The `Type` variant of the `DecodeError` type represents an error that occurs when the `actual` value is not of the expected type.
The `expected` field specifies the name of the expected type, and the `actual` field contains the value that caused the error.
This error can occur when trying to decode a value using a codec that is only able to decode values of a specific type,
and the actual value is not of that type. For example, if you are using a codec to decode a string value and the actual value
is a number, a `Type` decode error would be returned.

**Signature**

```ts
export interface Type {
  readonly _tag: 'Type'
  readonly expected: string
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

# utils

## DecodeResult (type alias)

**Signature**

```ts
export type DecodeResult<A> = Validated<DecodeError, A>
```

Added in v1.0.0
