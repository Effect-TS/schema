---
title: index.ts
nav_order: 21
parent: Modules
---

## index overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [InferAsserts](#inferasserts)
  - [asserts](#asserts)
  - [decode](#decode)
  - [decodeOrThrow](#decodeorthrow)
  - [encode](#encode)
  - [encodeOrThrow](#encodeorthrow)
  - [failure](#failure)
  - [failures](#failures)
  - [is](#is)
  - [isFailure](#isfailure)
  - [isSuccess](#issuccess)
  - [success](#success)

---

# utils

## InferAsserts

**Signature**

```ts
export declare const InferAsserts: InferAsserts<S>
```

Added in v1.0.0

## asserts

**Signature**

```ts
export declare const asserts: <A>(
  schema: Schema<A>
) => (input: unknown, options?: ParseOptions | undefined) => asserts input is A
```

Added in v1.0.0

## decode

**Signature**

```ts
export declare const decode: <A>(
  schema: Schema<A>
) => (input: unknown, options?: ParseOptions | undefined) => Either<readonly [ParseError, ...ParseError[]], A>
```

Added in v1.0.0

## decodeOrThrow

**Signature**

```ts
export declare const decodeOrThrow: <A>(schema: Schema<A>) => (input: unknown, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

## encode

**Signature**

```ts
export declare const encode: <A>(
  schema: Schema<A>
) => (a: A, options?: ParseOptions | undefined) => Either<readonly [ParseError, ...ParseError[]], unknown>
```

Added in v1.0.0

## encodeOrThrow

**Signature**

```ts
export declare const encodeOrThrow: <A>(schema: Schema<A>) => (a: A, options?: ParseOptions | undefined) => unknown
```

Added in v1.0.0

## failure

**Signature**

```ts
export declare const failure: (e: ParseError) => Either<readonly [ParseError, ...ParseError[]], never>
```

Added in v1.0.0

## failures

**Signature**

```ts
export declare const failures: (
  es: readonly [ParseError, ...ParseError[]]
) => Either<readonly [ParseError, ...ParseError[]], never>
```

Added in v1.0.0

## is

**Signature**

```ts
export declare const is: <A>(schema: Schema<A>) => (input: unknown, options?: ParseOptions | undefined) => input is A
```

Added in v1.0.0

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

## success

**Signature**

```ts
export declare const success: <A>(a: A) => Either<readonly [ParseError, ...ParseError[]], A>
```

Added in v1.0.0
