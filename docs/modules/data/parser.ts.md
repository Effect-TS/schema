---
title: data/parser.ts
nav_order: 9
parent: Modules
---

## parser overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [parseNumber](#parsenumber)

---

# utils

## parseNumber

Transforms a `string` schema into a `number` schema by parsing the string value as a number.
If the string is not a valid number representation, the decoding will fail with a `DecodeError.transform` error.
The following special string values are supported: "NaN", "Infinity", "-Infinity".

**Signature**

```ts
export declare const parseNumber: (self: Schema<string>) => Schema<number>
```

Added in v1.0.0
