---
title: Decoder.ts
nav_order: 16
parent: Modules
---

## Decoder overview

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
  - [DecodeOptions (interface)](#decodeoptions-interface)
  - [Decoder (interface)](#decoder-interface)
- [utils](#utils)
  - [InferInput (type alias)](#inferinput-type-alias)

---

# assertions

## asserts

**Signature**

```ts
export declare const asserts: <A>(schema: Schema<A>) => (input: unknown) => asserts input is A
```

Added in v1.0.0

## is

**Signature**

```ts
export declare const is: <A>(schema: Schema<A>) => (input: unknown) => input is A
```

Added in v1.0.0

# constructors

## make

**Signature**

```ts
export declare const make: <I, A>(
  schema: Schema<A>,
  decode: (i: I, options?: DecodeOptions | undefined) => These<readonly [DE.DecodeError, ...DE.DecodeError[]], A>
) => Decoder<I, A>
```

Added in v1.0.0

# decoding

## decode

**Signature**

```ts
export declare const decode: <A>(
  schema: Schema<A>
) => (i: unknown, options?: DecodeOptions | undefined) => These<readonly [DE.DecodeError, ...DE.DecodeError[]], A>
```

Added in v1.0.0

## decodeOrThrow

**Signature**

```ts
export declare const decodeOrThrow: <A>(schema: Schema<A>) => (u: unknown, options?: DecodeOptions | undefined) => A
```

Added in v1.0.0

# encoding

## encode

**Signature**

```ts
export declare const encode: <A>(
  schema: Schema<A>
) => (a: A, options?: DecodeOptions | undefined) => DE.DecodeResult<unknown>
```

Added in v1.0.0

## encodeOrThrow

**Signature**

```ts
export declare const encodeOrThrow: <A>(schema: Schema<A>) => (a: A, options?: DecodeOptions | undefined) => unknown
```

Added in v1.0.0

# model

## DecodeOptions (interface)

**Signature**

```ts
export interface DecodeOptions {
  readonly isUnexpectedAllowed?: boolean
  readonly allErrors?: boolean
}
```

Added in v1.0.0

## Decoder (interface)

**Signature**

```ts
export interface Decoder<I, A> extends Schema<A> {
  readonly I: (i: I) => void
  readonly decode: (i: I, options?: DecodeOptions) => DE.DecodeResult<A>
}
```

Added in v1.0.0

# utils

## InferInput (type alias)

**Signature**

```ts
export type InferInput<D extends Decoder<any, any>> = Parameters<D['I']>[0]
```

Added in v1.0.0
