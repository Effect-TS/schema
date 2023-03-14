---
title: Parser.ts
nav_order: 3
parent: Modules
---

## Parser overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [decoding](#decoding)
  - [decode](#decode)
  - [decodeEither](#decodeeither)
  - [decodeOption](#decodeoption)
- [encoding](#encoding)
  - [encode](#encode)
  - [encodeEither](#encodeeither)
  - [encodeOption](#encodeoption)
- [model](#model)
  - [Parser (interface)](#parser-interface)
- [utils](#utils)
  - [ToAsserts (type alias)](#toasserts-type-alias)
- [validation](#validation)
  - [asserts](#asserts)
  - [is](#is)
  - [validate](#validate)
  - [validateEither](#validateeither)
  - [validateOption](#validateoption)

---

# constructors

## make

**Signature**

```ts
export declare const make: <A>(
  schema: Schema<A, A>,
  parse: (
    input: unknown,
    options?: AST.ParseOptions | undefined
  ) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], A>
) => Parser<A>
```

Added in v1.0.0

# decoding

## decode

**Signature**

```ts
export declare const decode: <I, A>(
  schema: Schema<I, A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => A
```

Added in v1.0.0

## decodeEither

**Signature**

```ts
export declare const decodeEither: <I, A>(
  schema: Schema<I, A>
) => (
  input: unknown,
  options?: AST.ParseOptions | undefined
) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], A>
```

Added in v1.0.0

## decodeOption

**Signature**

```ts
export declare const decodeOption: <I, A>(
  schema: Schema<I, A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => O.Option<A>
```

Added in v1.0.0

# encoding

## encode

**Signature**

```ts
export declare const encode: <I, A>(schema: Schema<I, A>) => (a: A, options?: AST.ParseOptions | undefined) => I
```

Added in v1.0.0

## encodeEither

**Signature**

```ts
export declare const encodeEither: <I, A>(
  schema: Schema<I, A>
) => (a: A, options?: AST.ParseOptions | undefined) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], I>
```

Added in v1.0.0

## encodeOption

**Signature**

```ts
export declare const encodeOption: <I, A>(
  schema: Schema<I, A>
) => (input: A, options?: AST.ParseOptions | undefined) => O.Option<I>
```

Added in v1.0.0

# model

## Parser (interface)

**Signature**

```ts
export interface Parser<To> extends Schema<To> {
  readonly parse: (input: unknown, options?: ParseOptions) => ParseResult<To>
}
```

Added in v1.0.0

# utils

## ToAsserts (type alias)

**Signature**

```ts
export type ToAsserts<S extends Schema<any>> = (input: unknown, options?: ParseOptions) => asserts input is To<S>
```

Added in v1.0.0

# validation

## asserts

**Signature**

```ts
export declare const asserts: <A>(
  schema: Schema<A, A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => asserts input is A
```

Added in v1.0.0

## is

**Signature**

```ts
export declare const is: <I, A>(
  schema: Schema<I, A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => input is A
```

Added in v1.0.0

## validate

**Signature**

```ts
export declare const validate: <I, A>(
  schema: Schema<I, A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => A
```

Added in v1.0.0

## validateEither

**Signature**

```ts
export declare const validateEither: <I, A>(
  schema: Schema<I, A>
) => (
  input: unknown,
  options?: AST.ParseOptions | undefined
) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], A>
```

Added in v1.0.0

## validateOption

**Signature**

```ts
export declare const validateOption: <I, A>(
  schema: Schema<I, A>
) => (input: unknown, options?: AST.ParseOptions | undefined) => O.Option<A>
```

Added in v1.0.0
