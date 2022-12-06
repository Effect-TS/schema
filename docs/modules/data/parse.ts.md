---
title: data/parse.ts
nav_order: 24
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
export declare const parse: <A, B>(
  id: symbol,
  decode: any,
  encode: any,
  is: (u: unknown) => u is B,
  arbitrary: any,
  pretty: any
) => (self: any) => any
```

Added in v1.0.0
