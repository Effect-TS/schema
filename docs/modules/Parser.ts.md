---
title: Parser.ts
nav_order: 21
parent: Modules
---

## Parser overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [assertions](#assertions)
  - [asserts](#asserts)
  - [is](#is)
- [constructors](#constructors)
  - [make](#make)
- [decoding](#decoding)
  - [decode](#decode)
  - [decodeOrThrow](#decodeorthrow)
- [encoding](#encoding)
  - [encode](#encode)
  - [encodeOrThrow](#encodeorthrow)
- [model](#model)
  - [Parser (interface)](#parser-interface)
- [utils](#utils)
  - [InferAsserts (type alias)](#inferasserts-type-alias)

---

# assertions

## asserts

**Signature**

```ts
export declare const asserts: <A>(
  schema: Schema<A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => asserts input is A
```

Added in v1.0.0

## is

**Signature**

```ts
export declare const is: <A>(
  schema: Schema<A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => input is A
```

Added in v1.0.0

# constructors

## make

**Signature**

```ts
export declare const make: <A>(
  schema: Schema<A>,
  parse: (
    input: unknown,
    options?: AST.ParseOptions | undefined
  ) => Either<readonly [PR.ParseError, ...PR.ParseError[]], A>
) => Parser<A>
```

Added in v1.0.0

# decoding

## decode

**Signature**

```ts
export declare const decode: <A>(
  schema: Schema<A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => Either<readonly [PR.ParseError, ...PR.ParseError[]], A>
```

Added in v1.0.0

## decodeOrThrow

**Signature**

```ts
export declare const decodeOrThrow: <A>(
  schema: Schema<A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => A
```

Added in v1.0.0

# encoding

## encode

**Signature**

```ts
export declare const encode: <A>(
  schema: Schema<A>
) => (a: A, options?: AST.ParseOptions | undefined) => ParseResult<unknown>
```

Added in v1.0.0

## encodeOrThrow

**Signature**

```ts
export declare const encodeOrThrow: <A>(schema: Schema<A>) => (a: A, options?: AST.ParseOptions | undefined) => unknown
```

Added in v1.0.0

# model

## Parser (interface)

**Signature**

```ts
export interface Parser<A> extends Schema<A> {
  readonly parse: (input: unknown, options?: ParseOptions) => ParseResult<A>
}
```

Added in v1.0.0

# utils

## InferAsserts (type alias)

**Signature**

```ts
export type InferAsserts<S extends Schema<any>> = (input: unknown, options?: ParseOptions) => asserts input is Infer<S>
```

Added in v1.0.0
