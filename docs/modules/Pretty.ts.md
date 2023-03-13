---
title: Pretty.ts
nav_order: 5
parent: Modules
---

## Pretty overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [hooks](#hooks)
  - [PrettyHookId](#prettyhookid)
- [model](#model)
  - [Pretty (interface)](#pretty-interface)
- [prettify](#prettify)
  - [pretty](#pretty)
- [utils](#utils)
  - [match](#match)

---

# constructors

## make

**Signature**

```ts
export declare const make: <A>(schema: Schema<A, A>, pretty: (a: A) => string) => Pretty<A>
```

Added in v1.0.0

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
export interface Pretty<To> extends Schema<To> {
  readonly pretty: (a: To) => string
}
```

Added in v1.0.0

# prettify

## pretty

**Signature**

```ts
export declare const pretty: <A>(schema: Schema<A, A>) => (a: A) => string
```

Added in v1.0.0

# utils

## match

**Signature**

```ts
export declare const match: AST.Match<Pretty<any>>
```

Added in v1.0.0
