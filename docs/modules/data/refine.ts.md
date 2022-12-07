---
title: data/refine.ts
nav_order: 27
parent: Modules
---

## refine overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [refine](#refine)

---

# utils

## refine

**Signature**

```ts
export declare const refine: <B, C extends B>(
  id: symbol,
  decode: (i: B) => These<readonly [DecodeError, ...DecodeError[]], C>
) => <A extends B>(self: Schema<A>) => Schema<A & C>
```

Added in v1.0.0
