---
title: Pretty.ts
nav_order: 38
parent: Modules
---

## Pretty overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Pretty (interface)](#pretty-interface)
  - [PrettyId](#prettyid)
  - [make](#make)
  - [prettyFor](#prettyfor)
  - [providePrettyFor](#provideprettyfor)

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

## PrettyId

**Signature**

```ts
export declare const PrettyId: symbol
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

## providePrettyFor

**Signature**

```ts
export declare const providePrettyFor: (provider: Provider) => <A>(schema: Schema<A>) => Pretty<A>
```

Added in v1.0.0
