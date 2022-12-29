---
title: data/parser.ts
nav_order: 15
parent: Modules
---

## parser overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [parse](#parse)
  - [parseString](#parsestring)

---

# utils

## parse

**Signature**

```ts
export declare const parse: <A, B>(
  to: Schema<B>,
  decode: (i: A) => These<readonly [DE.DecodeError, ...DE.DecodeError[]], B>,
  encode: (value: B) => A
) => (from: Schema<A>) => Schema<B>
```

Added in v1.0.0

## parseString

**Signature**

```ts
export declare const parseString: (self: Schema<string>) => Schema<number>
```

Added in v1.0.0
