---
title: Guard.ts
nav_order: 36
parent: Modules
---

## Guard overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Guard (interface)](#guard-interface)
  - [GuardId](#guardid)
  - [guardFor](#guardfor)
  - [make](#make)
  - [provideGuardFor](#provideguardfor)

---

# utils

## Guard (interface)

**Signature**

```ts
export interface Guard<
```

Added in v1.0.0

## GuardId

**Signature**

```ts
export declare const GuardId: symbol
```

Added in v1.0.0

## guardFor

**Signature**

```ts
export declare const guardFor: <A>(schema: any) => any
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <A>(schema: any, is: any) => any
```

Added in v1.0.0

## provideGuardFor

**Signature**

```ts
export declare const provideGuardFor: (provider: Provider) => <A>(schema: any) => any
```

Added in v1.0.0
