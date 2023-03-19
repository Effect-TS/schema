---
title: Parser.ts
nav_order: 3
parent: Modules
---

## Parser overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [decoding](#decoding)
  - [decode](#decode)
  - [decodeEffect](#decodeeffect)
  - [decodeEither](#decodeeither)
  - [decodeOption](#decodeoption)
  - [parse](#parse)
  - [parseEffect](#parseeffect)
  - [parseEither](#parseeither)
  - [parseOption](#parseoption)
- [encoding](#encoding)
  - [encode](#encode)
  - [encodeEffect](#encodeeffect)
  - [encodeEither](#encodeeither)
  - [encodeOption](#encodeoption)
- [utils](#utils)
  - [ToAsserts (type alias)](#toasserts-type-alias)
- [validation](#validation)
  - [asserts](#asserts)
  - [is](#is)
  - [validate](#validate)
  - [validateEffect](#validateeffect)
  - [validateEither](#validateeither)
  - [validateOption](#validateoption)

---

# decoding

## decode

**Signature**

```ts
export declare const decode: <I, A>(schema: Schema<I, A>) => (i: I, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

## decodeEffect

**Signature**

```ts
export declare const decodeEffect: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => ParseResult<A>
```

Added in v1.0.0

## decodeEither

**Signature**

```ts
export declare const decodeEither: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], A>
```

Added in v1.0.0

## decodeOption

**Signature**

```ts
export declare const decodeOption: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

## parse

**Signature**

```ts
export declare const parse: <_, A>(schema: Schema<_, A>) => (i: unknown, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

## parseEffect

**Signature**

```ts
export declare const parseEffect: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => ParseResult<A>
```

Added in v1.0.0

## parseEither

**Signature**

```ts
export declare const parseEither: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], A>
```

Added in v1.0.0

## parseOption

**Signature**

```ts
export declare const parseOption: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

# encoding

## encode

**Signature**

```ts
export declare const encode: <I, A>(schema: Schema<I, A>) => (a: A, options?: ParseOptions | undefined) => I
```

Added in v1.0.0

## encodeEffect

**Signature**

```ts
export declare const encodeEffect: <I, A>(
  schema: Schema<I, A>
) => (a: A, options?: ParseOptions | undefined) => ParseResult<I>
```

Added in v1.0.0

## encodeEither

**Signature**

```ts
export declare const encodeEither: <I, A>(
  schema: Schema<I, A>
) => (a: A, options?: ParseOptions | undefined) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], I>
```

Added in v1.0.0

## encodeOption

**Signature**

```ts
export declare const encodeOption: <I, A>(
  schema: Schema<I, A>
) => (input: A, options?: ParseOptions | undefined) => Option<I>
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
export declare const asserts: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions | undefined) => asserts a is A
```

Added in v1.0.0

## is

**Signature**

```ts
export declare const is: <_, A>(schema: Schema<_, A>) => (a: unknown) => a is A
```

Added in v1.0.0

## validate

**Signature**

```ts
export declare const validate: <_, A>(schema: Schema<_, A>) => (a: unknown, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

## validateEffect

**Signature**

```ts
export declare const validateEffect: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions | undefined) => ParseResult<A>
```

Added in v1.0.0

## validateEither

**Signature**

```ts
export declare const validateEither: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions | undefined) => E.Either<readonly [PR.ParseError, ...PR.ParseError[]], A>
```

Added in v1.0.0

## validateOption

**Signature**

```ts
export declare const validateOption: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions | undefined) => Option<A>
```

Added in v1.0.0
