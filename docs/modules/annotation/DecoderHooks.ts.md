---
title: annotation/DecoderHooks.ts
nav_order: 2
parent: Modules
---

## DecoderHooks overview

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
  readonly handler: (...typeParameters: ReadonlyArray<Decoder<unknown, any>>) => Decoder<unknown, any>
}
```

Added in v1.0.0

## TypeAliasHookId

**Signature**

```ts
export declare const TypeAliasHookId: '@fp-ts/schema/annotation/decoder/TypeAliasHook'
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
  handler: (...typeParameters: ReadonlyArray<Decoder<unknown, any>>) => Decoder<unknown, any>
) => TypeAliasHook
```

Added in v1.0.0
