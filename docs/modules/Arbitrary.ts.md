---
title: Arbitrary.ts
nav_order: 1
parent: Modules
---

## Arbitrary overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Arbitrary (interface)](#arbitrary-interface)
  - [ArbitraryId](#arbitraryid)
  - [arbitraryFor](#arbitraryfor)
  - [make](#make)
  - [provideArbitraryFor](#providearbitraryfor)

---

# utils

## Arbitrary (interface)

**Signature**

```ts
export interface Arbitrary<
```

Added in v1.0.0

## ArbitraryId

**Signature**

```ts
export declare const ArbitraryId: symbol
```

Added in v1.0.0

## arbitraryFor

**Signature**

```ts
export declare const arbitraryFor: <A>(schema: any) => any
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <A>(schema: any, arbitrary: any) => any
```

Added in v1.0.0

## provideArbitraryFor

**Signature**

```ts
export declare const provideArbitraryFor: (provider: Provider) => <A>(schema: any) => any
```

Added in v1.0.0
