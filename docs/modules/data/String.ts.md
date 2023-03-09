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
  - [~~EndsWithTypeId~~](#endswithtypeid)
  - [~~IncludesTypeId~~](#includestypeid)
  - [~~PatternTypeId~~](#patterntypeid)
  - [~~StartsWithTypeId~~](#startswithtypeid)
  - [~~TrimmedTypeId~~](#trimmedtypeid)
  - [~~UUIDTypeId~~](#uuidtypeid)
  - [~~UUID~~](#uuid)
  - [~~endsWith~~](#endswith)
  - [~~includes~~](#includes)
  - [~~maxLength~~](#maxlength)
  - [~~minLength~~](#minlength)
  - [~~pattern~~](#pattern)
  - [~~startsWith~~](#startswith)
  - [~~trimmed~~](#trimmed)
  - [~~trim~~](#trim)

---

# utils

## ~~EndsWithTypeId~~

**Signature**

```ts
export declare const EndsWithTypeId: '@effect/schema/EndsWithTypeId'
```

Added in v1.0.0

## ~~IncludesTypeId~~

**Signature**

```ts
export declare const IncludesTypeId: '@effect/schema/IncludesTypeId'
```

Added in v1.0.0

## ~~PatternTypeId~~

**Signature**

```ts
export declare const PatternTypeId: '@effect/schema/PositiveTypeId'
```

Added in v1.0.0

## ~~StartsWithTypeId~~

**Signature**

```ts
export declare const StartsWithTypeId: '@effect/schema/StartsWithTypeId'
```

Added in v1.0.0

## ~~TrimmedTypeId~~

**Signature**

```ts
export declare const TrimmedTypeId: '@effect/schema/TrimmedTypeId'
```

Added in v1.0.0

## ~~UUIDTypeId~~

**Signature**

```ts
export declare const UUIDTypeId: '@effect/schema/UUIDTypeId'
```

Added in v1.0.0

## ~~UUID~~

**Signature**

```ts
export declare const UUID: S.Schema<string>
```

Added in v1.0.0

## ~~endsWith~~

**Signature**

```ts
export declare const endsWith: <A extends string>(
  endsWith: string,
  annotationOptions?: S.AnnotationOptions<A> | undefined
) => (self: S.Schema<A>) => S.Schema<A>
```

Added in v1.0.0

## ~~includes~~

**Signature**

```ts
export declare const includes: <A extends string>(
  searchString: string,
  annotationOptions?: S.AnnotationOptions<A> | undefined
) => (self: S.Schema<A>) => S.Schema<A>
```

Added in v1.0.0

## ~~maxLength~~

**Signature**

```ts
export declare const maxLength: <A extends string>(
  maxLength: number,
  annotationOptions?: S.AnnotationOptions<A> | undefined
) => (self: S.Schema<A>) => S.Schema<A>
```

Added in v1.0.0

## ~~minLength~~

**Signature**

```ts
export declare const minLength: <A extends string>(
  minLength: number,
  annotationOptions?: S.AnnotationOptions<A> | undefined
) => (self: S.Schema<A>) => S.Schema<A>
```

Added in v1.0.0

## ~~pattern~~

**Signature**

```ts
export declare const pattern: <A extends string>(
  regex: RegExp,
  annotationOptions?: S.AnnotationOptions<A> | undefined
) => (self: S.Schema<A>) => S.Schema<A>
```

Added in v1.0.0

## ~~startsWith~~

**Signature**

```ts
export declare const startsWith: <A extends string>(
  startsWith: string,
  annotationOptions?: S.AnnotationOptions<A> | undefined
) => (self: S.Schema<A>) => S.Schema<A>
```

Added in v1.0.0

## ~~trimmed~~

**Signature**

```ts
export declare const trimmed: <A extends string>(
  annotationOptions?: S.AnnotationOptions<A> | undefined
) => (self: S.Schema<A>) => S.Schema<A>
```

Added in v1.0.0

## ~~trim~~

The `trim` parser allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const trim: (self: S.Schema<string>) => S.Schema<string>
```

Added in v1.0.0
