---
title: Parser.ts
nav_order: 4
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
  - [decodePromise](#decodepromise)
  - [decodeResult](#decoderesult)
- [encoding](#encoding)
  - [encode](#encode)
  - [encodeEffect](#encodeeffect)
  - [encodeEither](#encodeeither)
  - [encodeOption](#encodeoption)
  - [encodePromise](#encodepromise)
  - [encodeResult](#encoderesult)
- [parsing](#parsing)
  - [parse](#parse)
  - [parseEffect](#parseeffect)
  - [parseEither](#parseeither)
  - [parseOption](#parseoption)
  - [parsePromise](#parsepromise)
  - [parseResult](#parseresult)
- [utils](#utils)
  - [ToAsserts (type alias)](#toasserts-type-alias)
  - [defaultParseOption](#defaultparseoption)
- [validation](#validation)
  - [asserts](#asserts)
  - [is](#is)
  - [validate](#validate)
  - [validateEffect](#validateeffect)
  - [validateEither](#validateeither)
  - [validateOption](#validateoption)
  - [validatePromise](#validatepromise)
  - [validateResult](#validateresult)

---

# decoding

## decode

**Signature**

```ts
export declare const decode: <I, A>(schema: Codec<I, A>) => (i: I, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

## decodeEffect

**Signature**

```ts
export declare const decodeEffect: <I, A>(
  schema: Codec<I, A>
) => (i: I, options?: ParseOptions | undefined) => Effect.Effect<never, PR.ParseError, A>
```

Added in v1.0.0

## decodeEither

**Signature**

```ts
export declare const decodeEither: <I, A>(
  schema: Codec<I, A>
) => (i: I, options?: ParseOptions | undefined) => E.Either<PR.ParseError, A>
```

Added in v1.0.0

## decodeOption

**Signature**

```ts
export declare const decodeOption: <I, A>(
  schema: Codec<I, A>
) => (i: I, options?: ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

## decodePromise

**Signature**

```ts
export declare const decodePromise: <I, A>(
  schema: Codec<I, A>
) => (i: I, options?: ParseOptions | undefined) => Promise<A>
```

Added in v1.0.0

## decodeResult

**Signature**

```ts
export declare const decodeResult: <I, A>(
  schema: Codec<I, A>
) => (i: I, options?: ParseOptions | undefined) => PR.IO<PR.ParseError, A>
```

Added in v1.0.0

# encoding

## encode

**Signature**

```ts
export declare const encode: <I, A>(schema: Codec<I, A>) => (a: A, options?: ParseOptions | undefined) => I
```

Added in v1.0.0

## encodeEffect

**Signature**

```ts
export declare const encodeEffect: <I, A>(
  schema: Codec<I, A>
) => (a: A, options?: ParseOptions | undefined) => Effect.Effect<never, PR.ParseError, I>
```

Added in v1.0.0

## encodeEither

**Signature**

```ts
export declare const encodeEither: <I, A>(
  schema: Codec<I, A>
) => (a: A, options?: ParseOptions | undefined) => E.Either<PR.ParseError, I>
```

Added in v1.0.0

## encodeOption

**Signature**

```ts
export declare const encodeOption: <I, A>(
  schema: Codec<I, A>
) => (input: A, options?: ParseOptions | undefined) => Option<I>
```

Added in v1.0.0

## encodePromise

**Signature**

```ts
export declare const encodePromise: <I, A>(
  schema: Codec<I, A>
) => (a: A, options?: ParseOptions | undefined) => Promise<I>
```

Added in v1.0.0

## encodeResult

**Signature**

```ts
export declare const encodeResult: <I, A>(
  schema: Codec<I, A>
) => (a: A, options?: ParseOptions | undefined) => PR.IO<PR.ParseError, I>
```

Added in v1.0.0

# parsing

## parse

**Signature**

```ts
export declare const parse: <I, A>(schema: Codec<I, A>) => (i: unknown, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

## parseEffect

**Signature**

```ts
export declare const parseEffect: <I, A>(
  schema: Codec<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => Effect.Effect<never, PR.ParseError, A>
```

Added in v1.0.0

## parseEither

**Signature**

```ts
export declare const parseEither: <I, A>(
  schema: Codec<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => E.Either<PR.ParseError, A>
```

Added in v1.0.0

## parseOption

**Signature**

```ts
export declare const parseOption: <I, A>(
  schema: Codec<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

## parsePromise

**Signature**

```ts
export declare const parsePromise: <I, A>(
  schema: Codec<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => Promise<A>
```

Added in v1.0.0

## parseResult

**Signature**

```ts
export declare const parseResult: <I, A>(
  schema: Codec<I, A>
) => (i: unknown, options?: ParseOptions | undefined) => PR.IO<PR.ParseError, A>
```

Added in v1.0.0

# utils

## ToAsserts (type alias)

**Signature**

```ts
export type ToAsserts<S extends Codec<any, any>> = (input: unknown, options?: ParseOptions) => asserts input is To<S>
```

Added in v1.0.0

## defaultParseOption

**Signature**

```ts
export declare const defaultParseOption: ParseOptions
```

Added in v1.0.0"decoding" | "encoding"

# validation

## asserts

**Signature**

```ts
export declare const asserts: <A>(
  schema: Schema<A>
) => (a: unknown, options?: ParseOptions | undefined) => asserts a is A
```

Added in v1.0.0

## is

**Signature**

```ts
export declare const is: <A>(schema: Schema<A>) => (a: unknown) => a is A
```

Added in v1.0.0

## validate

**Signature**

```ts
export declare const validate: <A>(schema: Schema<A>) => (a: unknown, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

## validateEffect

**Signature**

```ts
export declare const validateEffect: <A>(
  schema: Schema<A>
) => (a: unknown, options?: ParseOptions | undefined) => Effect.Effect<never, PR.ParseError, A>
```

Added in v1.0.0

## validateEither

**Signature**

```ts
export declare const validateEither: <A>(
  schema: Schema<A>
) => (a: unknown, options?: ParseOptions | undefined) => E.Either<PR.ParseError, A>
```

Added in v1.0.0

## validateOption

**Signature**

```ts
export declare const validateOption: <A>(
  schema: Schema<A>
) => (a: unknown, options?: ParseOptions | undefined) => Option<A>
```

Added in v1.0.0

## validatePromise

**Signature**

```ts
export declare const validatePromise: <A>(
  schema: Schema<A>
) => (i: unknown, options?: ParseOptions | undefined) => Promise<A>
```

Added in v1.0.0

## validateResult

**Signature**

```ts
export declare const validateResult: <A>(
  schema: Schema<A>
) => (a: unknown, options?: ParseOptions | undefined) => PR.IO<PR.ParseError, A>
```

Added in v1.0.0
