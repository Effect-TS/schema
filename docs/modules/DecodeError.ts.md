---
title: DecodeError.ts
nav_order: 19
parent: Modules
---

## DecodeError overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [DecodeError (type alias)](#decodeerror-type-alias)
  - [Enums (interface)](#enums-interface)
  - [Equal (interface)](#equal-interface)
  - [Index (interface)](#index-interface)
  - [Key (interface)](#key-interface)
  - [Member (interface)](#member-interface)
  - [Meta (interface)](#meta-interface)
  - [Missing (interface)](#missing-interface)
  - [Parse (interface)](#parse-interface)
  - [Refinement (interface)](#refinement-interface)
  - [Type (interface)](#type-interface)
  - [UnexpectedIndex (interface)](#unexpectedindex-interface)
  - [UnexpectedKey (interface)](#unexpectedkey-interface)
  - [enums](#enums)
  - [equal](#equal)
  - [index](#index)
  - [key](#key)
  - [member](#member)
  - [meta](#meta)
  - [missing](#missing)
  - [parse](#parse)
  - [refinement](#refinement)
  - [some](#some)
  - [type](#type)
  - [unexpectedIndex](#unexpectedindex)
  - [unexpectedKey](#unexpectedkey)

---

# utils

## DecodeError (type alias)

**Signature**

```ts
export type DecodeError =
  | Meta
  | Type
  | Equal
  | Enums
  | Refinement
  | Parse
  | Index
  | Key
  | Missing
  | UnexpectedKey
  | UnexpectedIndex
  | Member
```

Added in v1.0.0

## Enums (interface)

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

**Signature**

```ts
export interface Member {
  readonly _tag: 'Member'
  readonly errors: NonEmptyReadonlyArray<DecodeError>
}
```

Added in v1.0.0

## Meta (interface)

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

**Signature**

```ts
export interface Missing {
  readonly _tag: 'Missing'
}
```

Added in v1.0.0

## Parse (interface)

**Signature**

```ts
export interface Parse {
  readonly _tag: 'Parse'
  readonly from: string
  readonly to: string
  readonly actual: unknown
}
```

Added in v1.0.0

## Refinement (interface)

**Signature**

```ts
export interface Refinement {
  readonly _tag: 'Refinement'
  readonly meta: unknown
  readonly actual: unknown
}
```

Added in v1.0.0

## Type (interface)

**Signature**

```ts
export interface Type {
  readonly _tag: 'Type'
  readonly expected: string
  readonly actual: unknown
}
```

Added in v1.0.0

## UnexpectedIndex (interface)

**Signature**

```ts
export interface UnexpectedIndex {
  readonly _tag: 'UnexpectedIndex'
  readonly index: number
  readonly actual: unknown
}
```

Added in v1.0.0

## UnexpectedKey (interface)

**Signature**

```ts
export interface UnexpectedKey {
  readonly _tag: 'UnexpectedKey'
  readonly key: PropertyKey
  readonly actual: unknown
}
```

Added in v1.0.0

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

## parse

**Signature**

```ts
export declare const parse: (from: string, to: string, actual: unknown) => Parse
```

Added in v1.0.0

## refinement

**Signature**

```ts
export declare const refinement: (meta: unknown, actual: unknown) => Refinement
```

Added in v1.0.0

## some

**Signature**

```ts
export declare const some: (
  predicate: Predicate<DecodeError>
) => (errors: readonly [DecodeError, ...DecodeError[]]) => boolean
```

Added in v1.0.0

## type

**Signature**

```ts
export declare const type: (expected: string, actual: unknown) => Type
```

Added in v1.0.0

## unexpectedIndex

**Signature**

```ts
export declare const unexpectedIndex: (index: number, actual: unknown) => UnexpectedIndex
```

Added in v1.0.0

## unexpectedKey

**Signature**

```ts
export declare const unexpectedKey: (key: PropertyKey, actual: unknown) => UnexpectedKey
```

Added in v1.0.0
