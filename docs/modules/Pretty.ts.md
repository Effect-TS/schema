---
title: Pretty.ts
nav_order: 6
parent: Modules
---

## Pretty overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [hooks](#hooks)
  - [PrettyHookId](#prettyhookid)
- [model](#model)
  - [Pretty (interface)](#pretty-interface)
- [prettify](#prettify)
  - [build](#build)
- [utils](#utils)
  - [match](#match)

---

# hooks

## PrettyHookId

**Signature**

```ts
export declare const PrettyHookId: symbol
```

Added in v1.0.0

# model

## Pretty (interface)

**Signature**

```ts
export interface Pretty<To> {
  (a: To): string
}
```

Added in v1.0.0

# prettify

## build

**Signature**

```ts
export declare const build: <A>(schema: S.Schema<A>) => (a: A) => string
```

Added in v1.0.0

# utils

## match

**Signature**

```ts
export declare const match: AST.Match<Pretty<any>>
```

Added in v1.0.0
