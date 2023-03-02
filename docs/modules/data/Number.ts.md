---
title: data/Number.ts
nav_order: 12
parent: Modules
---

## Number overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [BetweenTypeId](#betweentypeid)
  - [FiniteTypeId](#finitetypeid)
  - [GreaterThanOrEqualToTypeId](#greaterthanorequaltotypeid)
  - [GreaterThanTypeId](#greaterthantypeid)
  - [IntTypeId](#inttypeid)
  - [LessThanOrEqualToTypeId](#lessthanorequaltotypeid)
  - [LessThanTypeId](#lessthantypeid)
  - [MultipleOfTypeId](#multipleoftypeid)
  - [NegativeTypeId](#negativetypeid)
  - [NonNaNTypeId](#nonnantypeid)
  - [NonNegativeTypeId](#nonnegativetypeid)
  - [NonPositiveTypeId](#nonpositivetypeid)
  - [PositiveTypeId](#positivetypeid)
  - [between](#between)
  - [clamp](#clamp)
  - [finite](#finite)
  - [greaterThan](#greaterthan)
  - [greaterThanOrEqualTo](#greaterthanorequalto)
  - [int](#int)
  - [lessThan](#lessthan)
  - [lessThanOrEqualTo](#lessthanorequalto)
  - [multipleOf](#multipleof)
  - [negative](#negative)
  - [nonNaN](#nonnan)
  - [nonNegative](#nonnegative)
  - [nonPositive](#nonpositive)
  - [parseString](#parsestring)
  - [positive](#positive)

---

# utils

## BetweenTypeId

**Signature**

```ts
export declare const BetweenTypeId: '@effect/schema/data/Number/BetweenTypeId'
```

Added in v1.0.0

## FiniteTypeId

**Signature**

```ts
export declare const FiniteTypeId: '@effect/schema/data/Number/FiniteTypeId'
```

Added in v1.0.0

## GreaterThanOrEqualToTypeId

**Signature**

```ts
export declare const GreaterThanOrEqualToTypeId: '@effect/schema/data/Number/GreaterThanOrEqualToTypeId'
```

Added in v1.0.0

## GreaterThanTypeId

**Signature**

```ts
export declare const GreaterThanTypeId: '@effect/schema/data/Number/GreaterThanTypeId'
```

Added in v1.0.0

## IntTypeId

**Signature**

```ts
export declare const IntTypeId: '@effect/schema/data/Number/IntTypeId'
```

Added in v1.0.0

## LessThanOrEqualToTypeId

**Signature**

```ts
export declare const LessThanOrEqualToTypeId: '@effect/schema/data/Number/LessThanOrEqualToTypeId'
```

Added in v1.0.0

## LessThanTypeId

**Signature**

```ts
export declare const LessThanTypeId: '@effect/schema/data/Number/LessThanTypeId'
```

Added in v1.0.0

## MultipleOfTypeId

**Signature**

```ts
export declare const MultipleOfTypeId: '@effect/schema/data/Number/MultipleOfTypeId'
```

Added in v1.0.0

## NegativeTypeId

**Signature**

```ts
export declare const NegativeTypeId: '@effect/schema/data/Number/NegativeTypeId'
```

Added in v1.0.0

## NonNaNTypeId

**Signature**

```ts
export declare const NonNaNTypeId: '@effect/schema/data/Number/NonNaNTypeId'
```

Added in v1.0.0

## NonNegativeTypeId

**Signature**

```ts
export declare const NonNegativeTypeId: '@effect/schema/data/Number/NonNegativeTypeId'
```

Added in v1.0.0

## NonPositiveTypeId

**Signature**

```ts
export declare const NonPositiveTypeId: '@effect/schema/data/Number/NonPositiveTypeId'
```

Added in v1.0.0

## PositiveTypeId

**Signature**

```ts
export declare const PositiveTypeId: '@effect/schema/data/Number/PositiveTypeId'
```

Added in v1.0.0

## between

**Signature**

```ts
export declare const between: <A extends number>(
  min: number,
  max: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## clamp

Clamps a number between a minimum and a maximum value.

**Signature**

```ts
export declare const clamp: <A extends number>(min: number, max: number) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## finite

**Signature**

```ts
export declare const finite: <A extends number>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThan

**Signature**

```ts
export declare const greaterThan: <A extends number>(
  min: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## greaterThanOrEqualTo

**Signature**

```ts
export declare const greaterThanOrEqualTo: <A extends number>(
  min: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## int

**Signature**

```ts
export declare const int: <A extends number>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThan

**Signature**

```ts
export declare const lessThan: <A extends number>(
  max: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## lessThanOrEqualTo

**Signature**

```ts
export declare const lessThanOrEqualTo: <A extends number>(
  max: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## multipleOf

**Signature**

```ts
export declare const multipleOf: <A extends number>(
  divisor: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## negative

**Signature**

```ts
export declare const negative: <A extends number>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonNaN

**Signature**

```ts
export declare const nonNaN: <A extends number>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonNegative

**Signature**

```ts
export declare const nonNegative: <A extends number>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## nonPositive

**Signature**

```ts
export declare const nonPositive: <A extends number>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## parseString

Transforms a `string` into a `number` by parsing the string using `parseFloat`.

The following special string values are supported: "NaN", "Infinity", "-Infinity".

**Signature**

```ts
export declare const parseString: (self: Schema<string>) => Schema<number>
```

Added in v1.0.0

## positive

**Signature**

```ts
export declare const positive: <A extends number>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0
