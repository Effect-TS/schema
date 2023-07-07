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
  - [decodeEither](#decodeeither)
  - [decodeOption](#decodeoption)
  - [decodePromise](#decodepromise)
  - [decodeResult](#decoderesult)
  - [decodeSync](#decodesync)
- [encoding](#encoding)
  - [encode](#encode)
  - [encodeEither](#encodeeither)
  - [encodeOption](#encodeoption)
  - [encodePromise](#encodepromise)
  - [encodeResult](#encoderesult)
  - [encodeSync](#encodesync)
- [parsing](#parsing)
  - [parse](#parse)
  - [parseEither](#parseeither)
  - [parseOption](#parseoption)
  - [parsePromise](#parsepromise)
  - [parseResult](#parseresult)
  - [parseSync](#parsesync)
- [utils](#utils)
  - [ToAsserts (type alias)](#toasserts-type-alias)
- [validation](#validation)
  - [asserts](#asserts)
  - [is](#is)
  - [validate](#validate)
  - [validateEither](#validateeither)
  - [validateOption](#validateoption)
  - [validatePromise](#validatepromise)
  - [validateResult](#validateresult)
  - [validateSync](#validatesync)

---

# decoding

## decode

**Signature**

```ts
export declare const decode: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => Effect.Effect<never, PR.ParseError, A>
```

Added in v1.0.0

## decodeEither

**Signature**

```ts
export declare const decodeEither: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions) => E.Either<PR.ParseError, A>
```

Added in v1.0.0

## decodeOption

**Signature**

```ts
export declare const decodeOption: <I, A>(schema: Schema<I, A>) => (i: I, options?: ParseOptions) => Option<A>
```

Added in v1.0.0

## decodePromise

**Signature**

```ts
export declare const decodePromise: <I, A>(schema: Schema<I, A>) => (i: I, options?: ParseOptions) => Promise<A>
```

Added in v1.0.0

## decodeResult

**Signature**

```ts
export declare const decodeResult: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => ParseResult<A>
```

Added in v1.0.0

## decodeSync

**Signature**

```ts
export declare const decodeSync: <I, A>(schema: Schema<I, A>) => (i: I, options?: ParseOptions) => A
```

Added in v1.0.0

# encoding

## encode

**Signature**

```ts
export declare const encode: <I, A>(
  schema: Schema<I, A>
) => (a: A, options?: ParseOptions) => Effect.Effect<never, PR.ParseError, I>
```

Added in v1.0.0

## encodeEither

**Signature**

```ts
export declare const encodeEither: <I, A>(
  schema: Schema<I, A>
) => (a: A, options?: ParseOptions) => E.Either<PR.ParseError, I>
```

Added in v1.0.0

## encodeOption

**Signature**

```ts
export declare const encodeOption: <I, A>(schema: Schema<I, A>) => (input: A, options?: ParseOptions) => Option<I>
```

Added in v1.0.0

## encodePromise

**Signature**

```ts
export declare const encodePromise: <I, A>(schema: Schema<I, A>) => (a: A, options?: ParseOptions) => Promise<I>
```

Added in v1.0.0

## encodeResult

**Signature**

```ts
export declare const encodeResult: <I, A>(schema: Schema<I, A>) => (a: A, options?: ParseOptions) => ParseResult<I>
```

Added in v1.0.0

## encodeSync

**Signature**

```ts
export declare const encodeSync: <I, A>(schema: Schema<I, A>) => (a: A, options?: ParseOptions) => I
```

Added in v1.0.0

# parsing

## parse

**Signature**

```ts
export declare const parse: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions) => Effect.Effect<never, PR.ParseError, A>
```

Added in v1.0.0

## parseEither

**Signature**

```ts
export declare const parseEither: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions) => E.Either<PR.ParseError, A>
```

Added in v1.0.0

## parseOption

**Signature**

```ts
export declare const parseOption: <_, A>(schema: Schema<_, A>) => (i: unknown, options?: ParseOptions) => Option<A>
```

Added in v1.0.0

## parsePromise

**Signature**

```ts
export declare const parsePromise: <_, A>(schema: Schema<_, A>) => (i: unknown, options?: ParseOptions) => Promise<A>
```

Added in v1.0.0

## parseResult

**Signature**

```ts
export declare const parseResult: <_, A>(schema: Schema<_, A>) => (i: unknown, options?: ParseOptions) => ParseResult<A>
```

Added in v1.0.0

## parseSync

**Signature**

```ts
export declare const parseSync: <_, A>(schema: Schema<_, A>) => (i: unknown, options?: ParseOptions) => A
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
export declare const asserts: <_, A>(schema: Schema<_, A>) => (a: unknown, options?: ParseOptions) => asserts a is A
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
export declare const validate: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions) => Effect.Effect<never, PR.ParseError, A>
```

Added in v1.0.0

## validateEither

**Signature**

```ts
export declare const validateEither: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions) => E.Either<PR.ParseError, A>
```

Added in v1.0.0

## validateOption

**Signature**

```ts
export declare const validateOption: <_, A>(schema: Schema<_, A>) => (a: unknown, options?: ParseOptions) => Option<A>
```

Added in v1.0.0

## validatePromise

**Signature**

```ts
export declare const validatePromise: <_, A>(schema: Schema<_, A>) => (i: unknown, options?: ParseOptions) => Promise<A>
```

Added in v1.0.0

## validateResult

**Signature**

```ts
export declare const validateResult: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions) => ParseResult<A>
```

Added in v1.0.0

## validateSync

**Signature**

```ts
export declare const validateSync: <_, A>(schema: Schema<_, A>) => (a: unknown, options?: ParseOptions) => A
```

Added in v1.0.0
