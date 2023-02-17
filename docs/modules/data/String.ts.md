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
  - [endsWith](#endswith)
  - [includes](#includes)
  - [maxLength](#maxlength)
  - [minLength](#minlength)
  - [parseDate](#parsedate)
  - [parseNumber](#parsenumber)
  - [pattern](#pattern)
  - [startsWith](#startswith)
  - [trim](#trim)
  - [trimmed](#trimmed)

---

# utils

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

## parseDate

Transforms a `string` into a `Date` by parsing the string using `Date.parse`.

**Signature**

```ts
export declare const parseDate: (self: Schema<string>) => Schema<Date>
```

Added in v1.0.0

## parseNumber

Transforms a `string` into a `number` by parsing the string using `parseFloat`.

The following special string values are supported: "NaN", "Infinity", "-Infinity".

**Signature**

```ts
export declare const parseNumber: (self: Schema<string>) => Schema<number>
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
