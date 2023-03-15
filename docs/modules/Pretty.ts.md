---
title: Pretty.ts
nav_order: 5
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
  - [from](#from)
  - [to](#to)
- [utils](#utils)
  - [match](#match)

---

# hooks

## PrettyHookId

**Signature**

```ts
export declare const PrettyHookId: '@effect/schema/PrettyHookId'
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

## from

**Signature**

```ts
export declare const from: <I, A>(schema: Schema<I, A>) => (i: I) => string
```

Added in v1.0.0

## to

**Signature**

```ts
export declare const to: <I, A>(schema: Schema<I, A>) => (a: A) => string
```

Added in v1.0.0

# utils

## match

**Signature**

```ts
export declare const match: AST.Match<Pretty<any>>
```

Added in v1.0.0
