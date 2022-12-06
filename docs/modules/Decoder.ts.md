---
title: Decoder.ts
nav_order: 28
parent: Modules
---

## Decoder overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Decoder (interface)](#decoder-interface)
  - [failure](#failure)
  - [failures](#failures)
  - [isFailure](#isfailure)
  - [isSuccess](#issuccess)
  - [isWarning](#iswarning)
  - [make](#make)
  - [success](#success)
  - [warning](#warning)
  - [warnings](#warnings)

---

# utils

## Decoder (interface)

**Signature**

```ts
export interface Decoder<
```

Added in v1.0.0

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

## make

**Signature**

```ts
export declare const make: <S, A>(schema: any, decode: any) => any
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
