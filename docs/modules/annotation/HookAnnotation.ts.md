---
title: annotation/HookAnnotation.ts
nav_order: 2
parent: Modules
---

## HookAnnotation overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [ArbitraryHookId](#arbitraryhookid)
  - [Hook (interface)](#hook-interface)
  - [ParserHookId](#parserhookid)
  - [PrettyHookId](#prettyhookid)
  - [getHook](#gethook)
  - [hook](#hook)

---

# utils

## ArbitraryHookId

**Signature**

```ts
export declare const ArbitraryHookId: '@fp-ts/schema/annotation/ArbitraryHookId'
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
export declare const ParserHookId: '@fp-ts/schema/annotation/ParserHookId'
```

Added in v1.0.0

## PrettyHookId

**Signature**

```ts
export declare const PrettyHookId: '@fp-ts/schema/annotation/PrettyHookId'
```

Added in v1.0.0

## getHook

**Signature**

```ts
export declare const getHook: <A>(key: string | number | symbol) => (annotated: Annotated) => Option<A>
```

Added in v1.0.0

## hook

**Signature**

```ts
export declare const hook: (handler: (...typeParameters: ReadonlyArray<any>) => any) => Hook<any>
```

Added in v1.0.0
