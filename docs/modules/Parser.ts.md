---
title: Parser.ts
nav_order: 6
parent: Modules
---

## Parser overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [decoding](#decoding)
  - [decode](#decode)
  - [decodeEither](#decodeeither)
  - [decodeOption](#decodeoption)
  - [decodePromise](#decodepromise)
  - [decodeSync](#decodesync)
- [encoding](#encoding)
  - [encode](#encode)
  - [encodeEither](#encodeeither)
  - [encodeOption](#encodeoption)
  - [encodePromise](#encodepromise)
  - [encodeSync](#encodesync)
- [parsing](#parsing)
  - [parse](#parse)
  - [parseEither](#parseeither)
  - [parseOption](#parseoption)
  - [parsePromise](#parsepromise)
  - [parseSync](#parsesync)
- [utils](#utils)
  - [defaultParseOption](#defaultparseoption)
- [validation](#validation)
  - [asserts](#asserts)
  - [is](#is)
  - [validate](#validate)
  - [validateEither](#validateeither)
  - [validateOption](#validateoption)
  - [validatePromise](#validatepromise)
  - [validateSync](#validatesync)

---

# decoding

## decode

**Signature**

```ts
export declare const decode: <I, A>(
  schema: Schema.Schema<I, A>
) => (i: I, options?: AST.ParseOptions) => Effect.Effect<never, ParseResult.ParseError, A>
```

Added in v1.0.0

## decodeEither

**Signature**

```ts
export declare const decodeEither: <I, A>(
  schema: Schema.Schema<I, A>
) => (i: I, options?: AST.ParseOptions) => Either.Either<ParseResult.ParseError, A>
```

Added in v1.0.0

## decodeOption

**Signature**

```ts
export declare const decodeOption: <I, A>(
  schema: Schema.Schema<I, A>
) => (i: I, options?: AST.ParseOptions) => Option.Option<A>
```

Added in v1.0.0

## decodePromise

**Signature**

```ts
export declare const decodePromise: <I, A>(
  schema: Schema.Schema<I, A>
) => (i: I, options?: AST.ParseOptions) => Promise<A>
```

Added in v1.0.0

## decodeSync

**Signature**

```ts
export declare const decodeSync: <I, A>(schema: Schema.Schema<I, A>) => (i: I, options?: AST.ParseOptions) => A
```

Added in v1.0.0

# encoding

## encode

**Signature**

```ts
export declare const encode: <I, A>(
  schema: Schema.Schema<I, A>
) => (a: A, options?: AST.ParseOptions) => Effect.Effect<never, ParseResult.ParseError, I>
```

Added in v1.0.0

## encodeEither

**Signature**

```ts
export declare const encodeEither: <I, A>(
  schema: Schema.Schema<I, A>
) => (a: A, options?: AST.ParseOptions) => Either.Either<ParseResult.ParseError, I>
```

Added in v1.0.0

## encodeOption

**Signature**

```ts
export declare const encodeOption: <I, A>(
  schema: Schema.Schema<I, A>
) => (input: A, options?: AST.ParseOptions) => Option.Option<I>
```

Added in v1.0.0

## encodePromise

**Signature**

```ts
export declare const encodePromise: <I, A>(
  schema: Schema.Schema<I, A>
) => (a: A, options?: AST.ParseOptions) => Promise<I>
```

Added in v1.0.0

## encodeSync

**Signature**

```ts
export declare const encodeSync: <I, A>(schema: Schema.Schema<I, A>) => (a: A, options?: AST.ParseOptions) => I
```

Added in v1.0.0

# parsing

## parse

**Signature**

```ts
export declare const parse: <_, A>(
  schema: Schema.Schema<_, A>
) => (i: unknown, options?: AST.ParseOptions) => Effect.Effect<never, ParseResult.ParseError, A>
```

Added in v1.0.0

## parseEither

**Signature**

```ts
export declare const parseEither: <_, A>(
  schema: Schema.Schema<_, A>
) => (i: unknown, options?: AST.ParseOptions) => Either.Either<ParseResult.ParseError, A>
```

Added in v1.0.0

## parseOption

**Signature**

```ts
export declare const parseOption: <_, A>(
  schema: Schema.Schema<_, A>
) => (i: unknown, options?: AST.ParseOptions) => Option.Option<A>
```

Added in v1.0.0

## parsePromise

**Signature**

```ts
export declare const parsePromise: <_, A>(
  schema: Schema.Schema<_, A>
) => (i: unknown, options?: AST.ParseOptions) => Promise<A>
```

Added in v1.0.0

## parseSync

**Signature**

```ts
export declare const parseSync: <_, A>(schema: Schema.Schema<_, A>) => (i: unknown, options?: AST.ParseOptions) => A
```

Added in v1.0.0

# utils

## defaultParseOption

**Signature**

```ts
export declare const defaultParseOption: AST.ParseOptions
```

Added in v1.0.0"

# validation

## asserts

**Signature**

```ts
export declare const asserts: <_, A>(
  schema: Schema.Schema<_, A>
) => (a: unknown, options?: AST.ParseOptions) => asserts a is A
```

Added in v1.0.0

## is

**Signature**

```ts
export declare const is: <_, A>(schema: Schema.Schema<_, A>) => (a: unknown) => a is A
```

Added in v1.0.0

## validate

**Signature**

```ts
export declare const validate: <_, A>(
  schema: Schema.Schema<_, A>
) => (a: unknown, options?: AST.ParseOptions) => Effect.Effect<never, ParseResult.ParseError, A>
```

Added in v1.0.0

## validateEither

**Signature**

```ts
export declare const validateEither: <_, A>(
  schema: Schema.Schema<_, A>
) => (a: unknown, options?: AST.ParseOptions) => Either.Either<ParseResult.ParseError, A>
```

Added in v1.0.0

## validateOption

**Signature**

```ts
export declare const validateOption: <_, A>(
  schema: Schema.Schema<_, A>
) => (a: unknown, options?: AST.ParseOptions) => Option.Option<A>
```

Added in v1.0.0

## validatePromise

**Signature**

```ts
export declare const validatePromise: <_, A>(
  schema: Schema.Schema<_, A>
) => (i: unknown, options?: AST.ParseOptions) => Promise<A>
```

Added in v1.0.0

## validateSync

**Signature**

```ts
export declare const validateSync: <_, A>(schema: Schema.Schema<_, A>) => (a: unknown, options?: AST.ParseOptions) => A
```

Added in v1.0.0
