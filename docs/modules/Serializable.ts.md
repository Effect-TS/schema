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
  - [failureSchema](#failureschema)
  - [selfSchema](#selfschema)
  - [successSchema](#successschema)
- [decoding](#decoding)
  - [deserialize](#deserialize)
  - [deserializeFailure](#deserializefailure)
  - [deserializeSuccess](#deserializesuccess)
- [encoding](#encoding)
  - [serialize](#serialize)
  - [serializeFailure](#serializefailure)
  - [serializeSuccess](#serializesuccess)
- [model](#model)
  - [Serializable (interface)](#serializable-interface)
  - [Serializable (namespace)](#serializable-namespace)
    - [SelfFrom (type alias)](#selffrom-type-alias)
    - [SelfTo (type alias)](#selfto-type-alias)
  - [SerializableWithResult (interface)](#serializablewithresult-interface)
  - [WithResult (interface)](#withresult-interface)
  - [WithResult (namespace)](#withresult-namespace)
    - [FailureFrom (type alias)](#failurefrom-type-alias)
    - [FailureTo (type alias)](#failureto-type-alias)
    - [SuccessFrom (type alias)](#successfrom-type-alias)
    - [SuccessTo (type alias)](#successto-type-alias)
- [symbol](#symbol)
  - [symbol](#symbol-1)
  - [symbolResult](#symbolresult)

---

# accessor

## failureSchema

**Signature**

```ts
export declare const failureSchema: <A extends WithResult>(self: A) => A[typeof symbolResult]["Failure"]
```

Added in v1.0.0

## selfSchema

**Signature**

```ts
export declare const selfSchema: <A extends Serializable>(self: A) => A[typeof symbol]["Self"]
```

Added in v1.0.0

## successSchema

**Signature**

```ts
export declare const successSchema: <A extends WithResult>(self: A) => A[typeof symbolResult]["Success"]
```

Added in v1.0.0

# decoding

## deserialize

**Signature**

```ts
export declare const deserialize: {
  (
    value: unknown
  ): <A extends Serializable>(self: A) => Effect.Effect<never, ParseResult.ParseError, Serializable.SelfTo<A>>
  <A extends Serializable>(
    self: A,
    value: unknown
  ): Effect.Effect<never, ParseResult.ParseError, Serializable.SelfTo<A>>
}
```

Added in v1.0.0

## deserializeFailure

**Signature**

```ts
export declare const deserializeFailure: {
  (
    value: unknown
  ): <A extends WithResult>(self: A) => Effect.Effect<never, ParseResult.ParseError, WithResult.FailureTo<A>>
  <A extends WithResult>(self: A, value: unknown): Effect.Effect<never, ParseResult.ParseError, WithResult.FailureTo<A>>
}
```

Added in v1.0.0

## deserializeSuccess

**Signature**

```ts
export declare const deserializeSuccess: {
  (
    value: unknown
  ): <A extends WithResult>(self: A) => Effect.Effect<never, ParseResult.ParseError, WithResult.SuccessTo<A>>
  <A extends WithResult>(self: A, value: unknown): Effect.Effect<never, ParseResult.ParseError, WithResult.SuccessTo<A>>
}
```

Added in v1.0.0

# encoding

## serialize

**Signature**

```ts
export declare const serialize: <A extends Serializable>(
  self: A
) => Effect.Effect<never, ParseResult.ParseError, Serializable.SelfFrom<A>>
```

Added in v1.0.0

## serializeFailure

**Signature**

```ts
export declare const serializeFailure: {
  <A extends WithResult>(
    value: WithResult.FailureTo<A>
  ): (self: A) => Effect.Effect<never, ParseResult.ParseError, WithResult.FailureFrom<A>>
  <A extends WithResult>(
    self: A,
    value: WithResult.FailureTo<A>
  ): Effect.Effect<never, ParseResult.ParseError, WithResult.FailureFrom<A>>
}
```

Added in v1.0.0

## serializeSuccess

**Signature**

```ts
export declare const serializeSuccess: {
  <A extends WithResult>(
    value: WithResult.SuccessTo<A>
  ): (self: A) => Effect.Effect<never, ParseResult.ParseError, WithResult.SuccessFrom<A>>
  <A extends WithResult>(
    self: A,
    value: WithResult.SuccessTo<A>
  ): Effect.Effect<never, ParseResult.ParseError, WithResult.SuccessFrom<A>>
}
```

Added in v1.0.0

# model

## Serializable (interface)

**Signature**

```ts
export interface Serializable {
  readonly [symbol]: {
    readonly Self: Schema.Schema<any, any>
  }
}
```

Added in v1.0.0

## Serializable (namespace)

Added in v1.0.0

### SelfFrom (type alias)

**Signature**

```ts
export type SelfFrom<A extends Serializable> = Schema.Schema.From<A[typeof symbol]["Self"]>
```

Added in v1.0.0

### SelfTo (type alias)

**Signature**

```ts
export type SelfTo<A extends Serializable> = Schema.Schema.To<A[typeof symbol]["Self"]>
```

Added in v1.0.0

## SerializableWithResult (interface)

**Signature**

```ts
export interface SerializableWithResult extends Serializable, WithResult {}
```

Added in v1.0.0

## WithResult (interface)

**Signature**

```ts
export interface WithResult {
  readonly [symbolResult]: {
    readonly Failure: Schema.Schema<any, any>
    readonly Success: Schema.Schema<any, any>
  }
}
```

Added in v1.0.0

## WithResult (namespace)

Added in v1.0.0

### FailureFrom (type alias)

**Signature**

```ts
export type FailureFrom<A extends WithResult> = Schema.Schema.From<A[typeof symbolResult]["Failure"]>
```

Added in v1.0.0

### FailureTo (type alias)

**Signature**

```ts
export type FailureTo<A extends WithResult> = Schema.Schema.To<A[typeof symbolResult]["Failure"]>
```

Added in v1.0.0

### SuccessFrom (type alias)

**Signature**

```ts
export type SuccessFrom<A extends WithResult> = Schema.Schema.From<A[typeof symbolResult]["Success"]>
```

Added in v1.0.0

### SuccessTo (type alias)

**Signature**

```ts
export type SuccessTo<A extends WithResult> = Schema.Schema.To<A[typeof symbolResult]["Success"]>
```

Added in v1.0.0

# symbol

## symbol

**Signature**

```ts
export declare const symbol: typeof symbol
```

Added in v1.0.0

## symbolResult

**Signature**

```ts
export declare const symbolResult: typeof symbolResult
```

Added in v1.0.0