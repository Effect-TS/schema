---
title: DecodeError.ts
nav_order: 27
parent: Modules
---

## DecodeError overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Custom (interface)](#custom-interface)
  - [DecodeError (type alias)](#decodeerror-type-alias)
  - [Index (interface)](#index-interface)
  - [Key (interface)](#key-interface)
  - [Max (interface)](#max-interface)
  - [MaxLength (interface)](#maxlength-interface)
  - [Member (interface)](#member-interface)
  - [Min (interface)](#min-interface)
  - [MinLength (interface)](#minlength-interface)
  - [NaN (interface)](#nan-interface)
  - [NotEqual (interface)](#notequal-interface)
  - [NotFinite (interface)](#notfinite-interface)
  - [NotType (interface)](#nottype-interface)
  - [UnexpectedIndex (interface)](#unexpectedindex-interface)
  - [UnexpectedKey (interface)](#unexpectedkey-interface)
  - [custom](#custom)
  - [index](#index)
  - [key](#key)
  - [max](#max)
  - [maxLength](#maxlength)
  - [member](#member)
  - [min](#min)
  - [minLength](#minlength)
  - [nan](#nan)
  - [notEqual](#notequal)
  - [notFinite](#notfinite)
  - [notType](#nottype)
  - [unexpectedIndex](#unexpectedindex)
  - [unexpectedKey](#unexpectedkey)

---

# utils

## Custom (interface)

**Signature**

```ts
export interface Custom {
  readonly _tag: 'Custom'
  readonly config: unknown
  readonly actual: unknown
}
```

Added in v1.0.0

## DecodeError (type alias)

**Signature**

```ts
export type DecodeError =
  | Custom
  | NotType
  | NotEqual
  | NaN
  | NotFinite
  | MinLength
  | MaxLength
  | Min
  | Max
  | Index
  | Key
  | UnexpectedKey
  | UnexpectedIndex
  | Member
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

## Max (interface)

**Signature**

```ts
export interface Max {
  readonly _tag: 'Max'
  readonly max: number
  readonly actual: unknown
}
```

Added in v1.0.0

## MaxLength (interface)

**Signature**

```ts
export interface MaxLength {
  readonly _tag: 'MaxLength'
  readonly maxLength: number
  readonly actual: unknown
}
```

Added in v1.0.0

## Member (interface)

**Signature**

```ts
export interface Member {
  readonly _tag: 'Member'
  readonly index: number
  readonly errors: NonEmptyReadonlyArray<DecodeError>
}
```

Added in v1.0.0

## Min (interface)

**Signature**

```ts
export interface Min {
  readonly _tag: 'Min'
  readonly min: number
  readonly actual: unknown
}
```

Added in v1.0.0

## MinLength (interface)

**Signature**

```ts
export interface MinLength {
  readonly _tag: 'MinLength'
  readonly minLength: number
  readonly actual: unknown
}
```

Added in v1.0.0

## NaN (interface)

**Signature**

```ts
export interface NaN {
  readonly _tag: 'NaN'
}
```

Added in v1.0.0

## NotEqual (interface)

**Signature**

```ts
export interface NotEqual {
  readonly _tag: 'NotEqual'
  readonly expected: unknown
  readonly actual: unknown
}
```

Added in v1.0.0

## NotFinite (interface)

**Signature**

```ts
export interface NotFinite {
  readonly _tag: 'NotFinite'
}
```

Added in v1.0.0

## NotType (interface)

**Signature**

```ts
export interface NotType {
  readonly _tag: 'NotType'
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
}
```

Added in v1.0.0

## UnexpectedKey (interface)

**Signature**

```ts
export interface UnexpectedKey {
  readonly _tag: 'UnexpectedKey'
  readonly key: PropertyKey
}
```

Added in v1.0.0

## custom

**Signature**

```ts
export declare const custom: (config: unknown, actual: unknown) => Custom
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

## max

**Signature**

```ts
export declare const max: (max: number, actual: unknown) => Max
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: (maxLength: number, actual: unknown) => MaxLength
```

Added in v1.0.0

## member

**Signature**

```ts
export declare const member: (index: number, errors: readonly [DecodeError, ...DecodeError[]]) => Member
```

Added in v1.0.0

## min

**Signature**

```ts
export declare const min: (min: number, actual: unknown) => Min
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: (minLength: number, actual: unknown) => MinLength
```

Added in v1.0.0

## nan

**Signature**

```ts
export declare const nan: NaN
```

Added in v1.0.0

## notEqual

**Signature**

```ts
export declare const notEqual: (expected: unknown, actual: unknown) => NotEqual
```

Added in v1.0.0

## notFinite

**Signature**

```ts
export declare const notFinite: NotFinite
```

Added in v1.0.0

## notType

**Signature**

```ts
export declare const notType: (expected: string, actual: unknown) => NotType
```

Added in v1.0.0

## unexpectedIndex

**Signature**

```ts
export declare const unexpectedIndex: (index: number) => UnexpectedIndex
```

Added in v1.0.0

## unexpectedKey

**Signature**

```ts
export declare const unexpectedKey: (key: PropertyKey) => UnexpectedKey
```

Added in v1.0.0
