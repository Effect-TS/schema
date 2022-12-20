---
title: Pretty.ts
nav_order: 30
parent: Modules
---

## Pretty overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Pretty (interface)](#pretty-interface)
  - [make](#make)
  - [prettyFor](#prettyfor)

---

# utils

## Pretty (interface)

**Signature**

```ts
export interface Pretty<A> extends Schema<A> {
  readonly pretty: (a: A) => string
}
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <A>(schema: Schema<A>, pretty: (a: A) => string) => Pretty<A>
```

Added in v1.0.0

## prettyFor

**Signature**

```ts
export declare const prettyFor: <A>(schema: Schema<A>) => Pretty<A>
```

Added in v1.0.0
