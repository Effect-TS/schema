---
title: Format.ts
nav_order: 5
parent: Modules
---

## Format overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [formatting](#formatting)
  - [format](#format)
  - [formatAST](#formatast)
  - [formatUnknown](#formatunknown)

---

# formatting

## format

**Signature**

```ts
export declare const format: <I, A>(schema: Schema.Schema<I, A>) => string
```

Added in v1.0.0

## formatAST

**Signature**

```ts
export declare const formatAST: (ast: AST.AST, verbose?: boolean) => string
```

Added in v1.0.0

## formatUnknown

**Signature**

```ts
export declare const formatUnknown: (u: unknown) => string
```

Added in v1.0.0
