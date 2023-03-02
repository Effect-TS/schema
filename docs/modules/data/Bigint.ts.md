---
title: data/Bigint.ts
nav_order: 5
parent: Modules
---

## Bigint overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [BetweenTypeId](#betweentypeid)
  - [GreaterThanOrEqualToTypeId](#greaterthanorequaltotypeid)
  - [GreaterThanTypeId](#greaterthantypeid)
  - [LessThanOrEqualToTypeId](#lessthanorequaltotypeid)
  - [LessThanTypeId](#lessthantypeid)
  - [NegativeTypeId](#negativetypeid)
  - [NonNegativeTypeId](#nonnegativetypeid)
  - [NonPositiveTypeId](#nonpositivetypeid)
  - [PositiveTypeId](#positivetypeid)
  - [between](#between)
  - [clamp](#clamp)
  - [greaterThan](#greaterthan)
  - [greaterThanOrEqualTo](#greaterthanorequalto)
  - [lessThan](#lessthan)
  - [lessThanOrEqualTo](#lessthanorequalto)
  - [negative](#negative)
  - [nonNegative](#nonnegative)
  - [nonPositive](#nonpositive)
  - [positive](#positive)

---

# utils

## BetweenTypeId

**Signature**

```ts
export declare const BetweenTypeId: '@effect/schema/data/Bigint/BetweenTypeId'
```

Added in v1.0.0

## GreaterThanOrEqualToTypeId

**Signature**

```ts
export declare const GreaterThanOrEqualToTypeId: '@effect/schema/data/Bigint/GreaterThanOrEqualToTypeId'
```

Added in v1.0.0

## GreaterThanTypeId

**Signature**

```ts
export declare const GreaterThanTypeId: '@effect/schema/data/Bigint/GreaterThanTypeId'
```

Added in v1.0.0

## LessThanOrEqualToTypeId

**Signature**

```ts
export declare const LessThanOrEqualToTypeId: '@effect/schema/data/Bigint/LessThanOrEqualToTypeId'
```

Added in v1.0.0

## LessThanTypeId

**Signature**

```ts
export declare const LessThanTypeId: '@effect/schema/data/Bigint/LessThanTypeId'
```

Added in v1.0.0

## NegativeTypeId

**Signature**

```ts
export declare const NegativeTypeId: '@effect/schema/data/Bigint/NegativeTypeId'
```

Added in v1.0.0

## NonNegativeTypeId

**Signature**

```ts
export declare const NonNegativeTypeId: '@effect/schema/data/Bigint/NonNegativeTypeId'
```

Added in v1.0.0

## NonPositiveTypeId

**Signature**

```ts
export declare const NonPositiveTypeId: '@effect/schema/data/Bigint/NonPositiveTypeId'
```

Added in v1.0.0

## PositiveTypeId

**Signature**

```ts
export declare const PositiveTypeId: '@effect/schema/data/Bigint/PositiveTypeId'
```

Added in v1.0.0

## between

**Signature**

```ts
export declare const between: <A extends bigint>(
  min: bigint,
  max: bigint,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## clamp

Clamps a bigint between a minimum and a maximum value.

**Signature**

```ts
export declare const clamp: <A extends bigint>(min: bigint, max: bigint) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThan

**Signature**

```ts
export declare const greaterThan: <A extends bigint>(
  min: bigint,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThanOrEqualTo

**Signature**

```ts
export declare const greaterThanOrEqualTo: <A extends bigint>(
  min: bigint,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThan

**Signature**

```ts
export declare const lessThan: <A extends bigint>(
  max: bigint,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThanOrEqualTo

**Signature**

```ts
export declare const lessThanOrEqualTo: <A extends bigint>(
  max: bigint,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## negative

**Signature**

```ts
export declare const negative: <A extends bigint>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonNegative

**Signature**

```ts
export declare const nonNegative: <A extends bigint>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonPositive

**Signature**

```ts
export declare const nonPositive: <A extends bigint>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## positive

**Signature**

```ts
export declare const positive: <A extends bigint>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0
