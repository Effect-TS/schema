---
title: annotation/Hook.ts
nav_order: 1
parent: Modules
---

## Hook overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [ArbitraryHookId](#arbitraryhookid)
  - [Hook (interface)](#hook-interface)
  - [ParserHookId](#parserhookid)
  - [PrettyHookId](#prettyhookid)
  - [hook](#hook)

---

# utils

## ArbitraryHookId

**Signature**

```ts
export declare const ArbitraryHookId: '@effect/schema/annotation/ArbitraryHookId'
```

Added in v1.0.0

## Hook (interface)

**Signature**

```ts
export interface Hook<A> {
  readonly handler: (...typeParameters: ReadonlyArray<A>) => A
}
```

Added in v1.0.0

## ParserHookId

**Signature**

```ts
export declare const ParserHookId: '@effect/schema/annotation/ParserHookId'
```

Added in v1.0.0

## PrettyHookId

**Signature**

```ts
export declare const PrettyHookId: '@effect/schema/annotation/PrettyHookId'
```

Added in v1.0.0

## hook

**Signature**

```ts
export declare const hook: (handler: (...typeParameters: ReadonlyArray<any>) => any) => Hook<any>
```

Added in v1.0.0
