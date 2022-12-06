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
  decode: (config: Config) => any
) => (config: Config) => <A extends B>(self: any) => any
```

Added in v1.0.0
