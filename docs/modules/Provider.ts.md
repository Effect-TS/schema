---
title: Provider.ts
nav_order: 36
parent: Modules
---

## Provider overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Handlers (interface)](#handlers-interface)
  - [Monoid](#monoid)
  - [Provider (interface)](#provider-interface)
  - [Semigroup](#semigroup)
  - [empty](#empty)
  - [findHandler](#findhandler)
  - [make](#make)
  - [replace](#replace)

---

# utils

## Handlers (interface)

**Signature**

```ts
export interface Handlers extends Map<symbol, Function> {}
```

Added in v1.0.0

## Monoid

**Signature**

```ts
export declare const Monoid: monoid.Monoid<Provider>
```

Added in v1.0.0

## Provider (interface)

**Signature**

```ts
export interface Provider extends Map<symbol, Handlers> {}
```

Added in v1.0.0

## Semigroup

**Signature**

```ts
export declare const Semigroup: semigroup.Semigroup<Provider>
```

Added in v1.0.0

## empty

**Signature**

```ts
export declare const empty: Provider
```

Added in v1.0.0

## findHandler

**Signature**

```ts
export declare const findHandler: (interpreterId: symbol, typeId: symbol) => (provider: Provider) => Option<Function>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: (typeId: symbol, providers: Record<symbol, Function>) => Provider
```

Added in v1.0.0

## replace

**Signature**

```ts
export declare const replace: (from: symbol, to: symbol) => (self: Provider) => Provider
```

Added in v1.0.0
