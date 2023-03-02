---
title: data/String.ts
nav_order: 18
parent: Modules
---

## String overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [EndsWithTypeId](#endswithtypeid)
  - [IncludesTypeId](#includestypeid)
  - [PatternTypeId](#patterntypeid)
  - [StartsWithTypeId](#startswithtypeid)
  - [TrimmedTypeId](#trimmedtypeid)
  - [UUID](#uuid)
  - [UUIDTypeId](#uuidtypeid)
  - [endsWith](#endswith)
  - [includes](#includes)
  - [maxLength](#maxlength)
  - [minLength](#minlength)
  - [pattern](#pattern)
  - [startsWith](#startswith)
  - [trim](#trim)
  - [trimmed](#trimmed)

---

# utils

## EndsWithTypeId

**Signature**

```ts
export declare const EndsWithTypeId: '@effect/schema/data/String/EndsWithTypeId'
```

Added in v1.0.0

## IncludesTypeId

**Signature**

```ts
export declare const IncludesTypeId: '@effect/schema/data/String/IncludesTypeId'
```

Added in v1.0.0

## PatternTypeId

**Signature**

```ts
export declare const PatternTypeId: '@effect/schema/data/String/PatternTypeId'
```

Added in v1.0.0

## StartsWithTypeId

**Signature**

```ts
export declare const StartsWithTypeId: '@effect/schema/data/String/StartsWithTypeId'
```

Added in v1.0.0

## TrimmedTypeId

**Signature**

```ts
export declare const TrimmedTypeId: '@effect/schema/data/String/TrimmedTypeId'
```

Added in v1.0.0

## UUID

**Signature**

```ts
export declare const UUID: Schema<string>
```

Added in v1.0.0

## UUIDTypeId

**Signature**

```ts
export declare const UUIDTypeId: '@effect/schema/data/String/UUIDTypeId'
```

Added in v1.0.0

## endsWith

**Signature**

```ts
export declare const endsWith: <A extends string>(
  endsWith: string,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## includes

**Signature**

```ts
export declare const includes: <A extends string>(
  searchString: string,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: <A extends string>(
  maxLength: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: <A extends string>(
  minLength: number,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## pattern

**Signature**

```ts
export declare const pattern: <A extends string>(
  regex: RegExp,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## startsWith

**Signature**

```ts
export declare const startsWith: <A extends string>(
  startsWith: string,
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0

## trim

The `trim` parser allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const trim: (self: Schema<string>) => Schema<string>
```

Added in v1.0.0

## trimmed

Verifies that a string contains no leading or trailing whitespaces.

Note. This combinator does not make any transformations, it only validates.
If what you were looking for was a combinator to trim strings, then check out the `trim` combinator.

**Signature**

```ts
export declare const trimmed: <A extends string>(
  annotationOptions?: AnnotationOptions<A> | undefined
) => (self: Schema<A>) => Schema<A>
```

Added in v1.0.0
