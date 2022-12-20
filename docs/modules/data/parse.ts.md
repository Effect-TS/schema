---
title: data/parse.ts
nav_order: 22
parent: Modules
---

## parse overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [parse](#parse)

---

# utils

## parse

**Signature**

```ts
export declare const parse: <A, B>(decode: (i: A) => These<readonly [DecodeError, ...DecodeError[]], B>, encode: (value: B) => A, is: (u: unknown) => u is B, arbitrary: (fc: typeof  => Arbitrary<B>, pretty: (a: B) => string, annotations: ReadonlyArray<unknown>) => (self: Schema<A>) => Schema<B>
```

Added in v1.0.0
