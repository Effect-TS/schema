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
  - [failureSchema](#failureschema)
  - [selfSchema](#selfschema)
  - [successSchema](#successschema)
- [decoding](#decoding)
  - [deserialize](#deserialize)
  - [deserializeExit](#deserializeexit)
  - [deserializeFailure](#deserializefailure)
  - [deserializeSuccess](#deserializesuccess)
- [encoding](#encoding)
  - [serialize](#serialize)
  - [serializeExit](#serializeexit)
  - [serializeFailure](#serializefailure)
  - [serializeSuccess](#serializesuccess)
- [model](#model)
  - [Serializable (interface)](#serializable-interface)
  - [SerializableWithResult (interface)](#serializablewithresult-interface)
  - [WithResult (interface)](#withresult-interface)
- [symbol](#symbol)
  - [symbol](#symbol-1)
  - [symbolResult](#symbolresult)

---

# accessor

## exitSchema

**Signature**

```ts
export declare const exitSchema: <IE, E, IA, A>(
  self: WithResult<IE, E, IA, A>
) => Schema.Schema<Schema.ExitFrom<IE, IA>, Exit.Exit<E, A>>
```

Added in v1.0.0

## failureSchema

**Signature**

```ts
export declare const failureSchema: <IE, E, IA, A>(self: WithResult<IE, E, IA, A>) => Schema.Schema<IE, E>
```

Added in v1.0.0

## selfSchema

**Signature**

```ts
export declare const selfSchema: <I, A>(self: Serializable<I, A>) => Schema.Schema<I, A>
```

Added in v1.0.0

## successSchema

**Signature**

```ts
export declare const successSchema: <IE, E, IA, A>(self: WithResult<IE, E, IA, A>) => Schema.Schema<IA, A>
```

Added in v1.0.0

# decoding

## deserialize

**Signature**

```ts
export declare const deserialize: {
  (value: unknown): <I, A>(self: Serializable<I, A>) => Effect.Effect<never, ParseResult.ParseError, A>
  <I, A>(self: Serializable<I, A>, value: unknown): Effect.Effect<never, ParseResult.ParseError, A>
}
```

Added in v1.0.0

## deserializeExit

**Signature**

```ts
export declare const deserializeExit: (<IE, E, IA, A>(
  value: unknown
) => (self: WithResult<IE, E, IA, A>) => Effect.Effect<never, ParseResult.ParseError, Exit.Exit<E, A>>) &
  (<IE, E, IA, A>(
    self: WithResult<IE, E, IA, A>,
    value: unknown
  ) => Effect.Effect<never, ParseResult.ParseError, Exit.Exit<E, A>>)
```

Added in v1.0.0

## deserializeFailure

**Signature**

```ts
export declare const deserializeFailure: (<IE, E, IA, A>(
  value: unknown
) => (self: WithResult<IE, E, IA, A>) => Effect.Effect<never, ParseResult.ParseError, E>) &
  (<IE, E, IA, A>(self: WithResult<IE, E, IA, A>, value: unknown) => Effect.Effect<never, ParseResult.ParseError, E>)
```

Added in v1.0.0

## deserializeSuccess

**Signature**

```ts
export declare const deserializeSuccess: (<IE, E, IA, A>(
  value: unknown
) => (self: WithResult<IE, E, IA, A>) => Effect.Effect<never, ParseResult.ParseError, A>) &
  (<IE, E, IA, A>(self: WithResult<IE, E, IA, A>, value: unknown) => Effect.Effect<never, ParseResult.ParseError, A>)
```

Added in v1.0.0

# encoding

## serialize

**Signature**

```ts
export declare const serialize: <I, A>(self: Serializable<I, A>) => Effect.Effect<never, ParseResult.ParseError, I>
```

Added in v1.0.0

## serializeExit

**Signature**

```ts
export declare const serializeExit: (<IE, E, IA, A>(
  value: Exit.Exit<E, A>
) => (self: WithResult<IE, E, IA, A>) => Effect.Effect<never, ParseResult.ParseError, Schema.ExitFrom<IE, IA>>) &
  (<IE, E, IA, A>(
    self: WithResult<IE, E, IA, A>,
    value: Exit.Exit<E, A>
  ) => Effect.Effect<never, ParseResult.ParseError, Schema.ExitFrom<IE, IA>>)
```

Added in v1.0.0

## serializeFailure

**Signature**

```ts
export declare const serializeFailure: (<IE, E, IA, A>(
  value: E
) => (self: WithResult<IE, E, IA, A>) => Effect.Effect<never, ParseResult.ParseError, IE>) &
  (<IE, E, IA, A>(self: WithResult<IE, E, IA, A>, value: E) => Effect.Effect<never, ParseResult.ParseError, IE>)
```

Added in v1.0.0

## serializeSuccess

**Signature**

```ts
export declare const serializeSuccess: (<IE, E, IA, A>(
  value: A
) => (self: WithResult<IE, E, IA, A>) => Effect.Effect<never, ParseResult.ParseError, IA>) &
  (<IE, E, IA, A>(self: WithResult<IE, E, IA, A>, value: A) => Effect.Effect<never, ParseResult.ParseError, IA>)
```

Added in v1.0.0

# model

## Serializable (interface)

**Signature**

```ts
export interface Serializable<I, A> {
  readonly [symbol]: Schema.Schema<I, A>
}
```

Added in v1.0.0

## SerializableWithResult (interface)

**Signature**

```ts
export interface SerializableWithResult<IS, S, IE, E, IA, A> extends Serializable<IS, S>, WithResult<IE, E, IA, A> {}
```

Added in v1.0.0

## WithResult (interface)

**Signature**

```ts
export interface WithResult<IE, E, IA, A> {
  readonly [symbolResult]: {
    readonly Failure: Schema.Schema<IE, E>
    readonly Success: Schema.Schema<IA, A>
  }
}
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
