---
title: formatter/Tree.ts
nav_order: 18
parent: Modules
---

## Tree overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Forest (interface)](#forest-interface)
  - [Tree (interface)](#tree-interface)
  - [format](#format)
  - [make](#make)

---

# utils

## Forest (interface)

**Signature**

```ts
export interface Forest<A> extends ReadonlyArray<Tree<A>> {}
```

Added in v1.0.0

## Tree (interface)

**Signature**

```ts
export interface Tree<A> {
  value: A
  forest: Forest<A>
}
```

Added in v1.0.0

## format

**Signature**

```ts
export declare const format: (errors: readonly [DE.DecodeError, ...DE.DecodeError[]]) => string
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <A>(value: A, forest?: Forest<A>) => Tree<A>
```

Added in v1.0.0
