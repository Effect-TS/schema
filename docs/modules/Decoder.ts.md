---
title: Decoder.ts
nav_order: 16
parent: Modules
---

## Decoder overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [failure](#failure)
  - [failures](#failures)
  - [make](#make)
  - [success](#success)
  - [warning](#warning)
  - [warnings](#warnings)
- [guards](#guards)
  - [isFailure](#isfailure)
  - [isSuccess](#issuccess)
  - [isWarning](#iswarning)
- [model](#model)
  - [Decoder (interface)](#decoder-interface)
- [utils](#utils)
  - [DecodeResult (type alias)](#decoderesult-type-alias)
  - [decoderFor](#decoderfor)

---

# constructors

## failure

**Signature**

```ts
export declare const failure: (e: DE.DecodeError) => These<readonly [DE.DecodeError, ...DE.DecodeError[]], never>
```

Added in v1.0.0

## failures

**Signature**

```ts
export declare const failures: (
  es: readonly [DE.DecodeError, ...DE.DecodeError[]]
) => These<readonly [DE.DecodeError, ...DE.DecodeError[]], never>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <S, A>(
  schema: Schema<A>,
  decode: (i: S) => These<readonly [DE.DecodeError, ...DE.DecodeError[]], A>
) => Decoder<S, A>
```

Added in v1.0.0

## success

**Signature**

```ts
export declare const success: <A>(a: A) => These<never, A>
```

Added in v1.0.0

## warning

**Signature**

```ts
export declare const warning: <A>(e: DE.DecodeError, a: A) => These<readonly [DE.DecodeError, ...DE.DecodeError[]], A>
```

Added in v1.0.0

## warnings

**Signature**

```ts
export declare const warnings: <A>(
  es: readonly [DE.DecodeError, ...DE.DecodeError[]],
  a: A
) => These<readonly [DE.DecodeError, ...DE.DecodeError[]], A>
```

Added in v1.0.0

# guards

## isFailure

**Signature**

```ts
export declare const isFailure: <E, A>(self: These<E, A>) => self is Left<E>
```

Added in v1.0.0

## isSuccess

**Signature**

```ts
export declare const isSuccess: <E, A>(self: These<E, A>) => self is Right<A>
```

Added in v1.0.0

## isWarning

**Signature**

```ts
export declare const isWarning: <E, A>(self: These<E, A>) => self is Both<E, A>
```

Added in v1.0.0

# model

## Decoder (interface)

**Signature**

```ts
export interface Decoder<I, A> extends Schema<A> {
  readonly I: (_: I) => void
  readonly decode: (i: I) => DecodeResult<A>
}
```

Added in v1.0.0

# utils

## DecodeResult (type alias)

**Signature**

```ts
export type DecodeResult<A> = Validated<DE.DecodeError, A>
```

Added in v1.0.0

## decoderFor

**Signature**

```ts
export declare const decoderFor: <A>(schema: Schema<A>) => Decoder<unknown, A>
```

Added in v1.0.0
