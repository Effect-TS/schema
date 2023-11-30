---
title: Serializable.ts
nav_order: 11
parent: Modules
---

## Serializable overview

Added in v1.0.0

Serializable represents an object that has self-contained Schema(s)

---

<h2 class="text-delta">Table of contents</h2>

- [accessor](#accessor)
  - [exitSchema](#exitschema)
  - [selfSchema](#selfschema)
- [decoding](#decoding)
  - [deserialize](#deserialize)
  - [deserializeExit](#deserializeexit)
- [encoding](#encoding)
  - [serialize](#serialize)
  - [serializeExit](#serializeexit)
- [model](#model)
  - [Serializable (interface)](#serializable-interface)
  - [Serializable (namespace)](#serializable-namespace)
    - [From (type alias)](#from-type-alias)
    - [To (type alias)](#to-type-alias)
  - [SerializableWithExit (interface)](#serializablewithexit-interface)
  - [WithExit (interface)](#withexit-interface)
  - [WithExit (namespace)](#withexit-namespace)
    - [From (type alias)](#from-type-alias-1)
    - [To (type alias)](#to-type-alias-1)
- [symbol](#symbol)
  - [symbol](#symbol-1)
  - [symbolExit](#symbolexit)

---

# accessor

## exitSchema

**Signature**

```ts
export declare const exitSchema: <A extends WithExit>(self: A) => A[typeof symbolExit]
```

Added in v1.0.0

## selfSchema

**Signature**

```ts
export declare const selfSchema: <A extends Serializable>(self: A) => A[typeof symbol]
```

Added in v1.0.0

# decoding

## deserialize

**Signature**

```ts
export declare const deserialize: {
  (
    value: unknown
  ): <A extends Serializable>(self: A) => Effect.Effect<never, ParseResult.ParseError, Serializable.To<A>>
  <A extends Serializable>(self: A, value: unknown): Effect.Effect<never, ParseResult.ParseError, Serializable.To<A>>
}
```

Added in v1.0.0

## deserializeExit

**Signature**

```ts
export declare const deserializeExit: {
  (value: unknown): <A extends WithExit>(self: A) => Effect.Effect<never, ParseResult.ParseError, WithExit.To<A>>
  <A extends WithExit>(self: A, value: unknown): Effect.Effect<never, ParseResult.ParseError, WithExit.To<A>>
}
```

Added in v1.0.0

# encoding

## serialize

**Signature**

```ts
export declare const serialize: <A extends Serializable>(
  self: A
) => Effect.Effect<never, ParseResult.ParseError, Serializable.From<A>>
```

Added in v1.0.0

## serializeExit

**Signature**

```ts
export declare const serializeExit: {
  <A extends WithExit>(
    value: WithExit.To<A>
  ): (self: A) => Effect.Effect<never, ParseResult.ParseError, WithExit.From<A>>
  <A extends WithExit>(self: A, value: WithExit.To<A>): Effect.Effect<never, ParseResult.ParseError, WithExit.From<A>>
}
```

Added in v1.0.0

# model

## Serializable (interface)

**Signature**

```ts
export interface Serializable {
  readonly [symbol]: Schema.Schema<any, any>
}
```

Added in v1.0.0

## Serializable (namespace)

Added in v1.0.0

### From (type alias)

**Signature**

```ts
export type From<A extends Serializable> = Schema.Schema.From<A[typeof symbol]>
```

Added in v1.0.0

### To (type alias)

**Signature**

```ts
export type To<A extends Serializable> = Schema.Schema.To<A[typeof symbol]>
```

Added in v1.0.0

## SerializableWithExit (interface)

**Signature**

```ts
export interface SerializableWithExit extends Serializable, WithExit {}
```

Added in v1.0.0

## WithExit (interface)

**Signature**

```ts
export interface WithExit {
  readonly [symbolExit]: Schema.Schema<any, Exit.Exit<any, any>>
}
```

Added in v1.0.0

## WithExit (namespace)

Added in v1.0.0

### From (type alias)

**Signature**

```ts
export type From<A extends WithExit> = Schema.Schema.From<A[typeof symbolExit]>
```

Added in v1.0.0

### To (type alias)

**Signature**

```ts
export type To<A extends WithExit> = Schema.Schema.To<A[typeof symbolExit]>
```

Added in v1.0.0

# symbol

## symbol

**Signature**

```ts
export declare const symbol: typeof symbol
```

Added in v1.0.0

## symbolExit

**Signature**

```ts
export declare const symbolExit: typeof symbolExit
```

Added in v1.0.0
