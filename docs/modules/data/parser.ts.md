---
title: data/parser.ts
nav_order: 11
parent: Modules
---

## parser overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [parseDate](#parsedate)
  - [parseNumber](#parsenumber)
  - [trim](#trim)

---

# utils

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

## trim

The `trim` parser allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const trim: (self: Schema<string>) => Schema<string>
```

Added in v1.0.0
