---
title: annotation/GuardHooks.ts
nav_order: 5
parent: Modules
---

## GuardHooks overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [TypeAliasHook (interface)](#typealiashook-interface)
  - [TypeAliasHookId](#typealiashookid)
  - [getTypeAliasHook](#gettypealiashook)
  - [typeAliasHook](#typealiashook)

---

# utils

## TypeAliasHook (interface)

**Signature**

```ts
export interface TypeAliasHook {
  readonly handler: (...typeParameters: ReadonlyArray<Guard<any>>) => Guard<any>
}
```

Added in v1.0.0

## TypeAliasHookId

**Signature**

```ts
export declare const TypeAliasHookId: '@fp-ts/schema/annotation/guard/TypeAliasHook'
```

Added in v1.0.0

## getTypeAliasHook

**Signature**

```ts
export declare const getTypeAliasHook: (annotated: Annotated) => Option<TypeAliasHook>
```

Added in v1.0.0

## typeAliasHook

**Signature**

```ts
export declare const typeAliasHook: (
  handler: (...typeParameters: ReadonlyArray<Guard<any>>) => Guard<any>
) => TypeAliasHook
```

Added in v1.0.0
