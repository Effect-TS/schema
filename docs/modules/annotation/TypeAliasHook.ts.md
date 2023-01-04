---
title: annotation/TypeAliasHook.ts
nav_order: 4
parent: Modules
---

## TypeAliasHook overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [ArbitraryTypeAliasHookId](#arbitrarytypealiashookid)
  - [DecoderTypeAliasHookId](#decodertypealiashookid)
  - [EncoderTypeAliasHookId](#encodertypealiashookid)
  - [GuardTypeAliasHookId](#guardtypealiashookid)
  - [PrettyTypeAliasHookId](#prettytypealiashookid)
  - [TypeAliasHook (interface)](#typealiashook-interface)
  - [getTypeAliasHook](#gettypealiashook)
  - [typeAliasHook](#typealiashook)

---

# utils

## ArbitraryTypeAliasHookId

**Signature**

```ts
export declare const ArbitraryTypeAliasHookId: '@fp-ts/schema/annotation/ArbitraryTypeAliasHookId'
```

Added in v1.0.0

## DecoderTypeAliasHookId

**Signature**

```ts
export declare const DecoderTypeAliasHookId: '@fp-ts/schema/annotation/DecoderTypeAliasHookId'
```

Added in v1.0.0

## EncoderTypeAliasHookId

**Signature**

```ts
export declare const EncoderTypeAliasHookId: '@fp-ts/schema/annotation/EncoderTypeAliasHookId'
```

Added in v1.0.0

## GuardTypeAliasHookId

**Signature**

```ts
export declare const GuardTypeAliasHookId: '@fp-ts/schema/annotation/GuardTypeAliasHookId'
```

Added in v1.0.0

## PrettyTypeAliasHookId

**Signature**

```ts
export declare const PrettyTypeAliasHookId: '@fp-ts/schema/annotation/PrettyTypeAliasHookId'
```

Added in v1.0.0

## TypeAliasHook (interface)

**Signature**

```ts
export interface TypeAliasHook<A> {
  readonly handler: (...typeParameters: ReadonlyArray<A>) => A
}
```

Added in v1.0.0

## getTypeAliasHook

**Signature**

```ts
export declare const getTypeAliasHook: <A>(key: string | number | symbol) => (annotated: Annotated) => Option<A>
```

Added in v1.0.0

## typeAliasHook

**Signature**

```ts
export declare const typeAliasHook: (handler: (...typeParameters: ReadonlyArray<any>) => any) => TypeAliasHook<any>
```

Added in v1.0.0
