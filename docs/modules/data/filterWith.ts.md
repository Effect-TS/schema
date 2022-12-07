---
title: data/filterWith.ts
nav_order: 16
parent: Modules
---

## filterWith overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [filterWith](#filterwith)

---

# utils

## filterWith

**Signature**

```ts
export declare const filterWith: <Config, B>(
  id: symbol,
  decode: (config: Config) => (i: B) => These<readonly [DecodeError, ...DecodeError[]], B>
) => (config: Config) => <A extends B>(self: Schema<A>) => Schema<A>
```

Added in v1.0.0
