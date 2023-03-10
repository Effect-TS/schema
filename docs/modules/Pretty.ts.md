---
title: Pretty.ts
nav_order: 8
parent: Modules
---

## Pretty overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
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
export declare const make: <A>(schema: Schema<A>, pretty: (a: A) => string) => Pretty<A>
```

Added in v1.0.0

# model

## Pretty (interface)

**Signature**

```ts
export interface Pretty<A> extends Schema<A> {
  readonly pretty: (a: A) => string
}
```

Added in v1.0.0

# prettify

## pretty

**Signature**

```ts
export declare const pretty: <A>(schema: Schema<A>) => (a: A) => string
```

Added in v1.0.0

# utils

## match

**Signature**

```ts
export declare const match: AST.Match<Pretty<any>>
```

Added in v1.0.0
