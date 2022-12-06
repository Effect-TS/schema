---
title: Pretty.ts
nav_order: 35
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
export interface Pretty<
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
export declare const make: <A>(schema: any, pretty: any) => any
```

Added in v1.0.0

## prettyFor

**Signature**

```ts
export declare const prettyFor: <A>(schema: any) => any
```

Added in v1.0.0

## providePrettyFor

**Signature**

```ts
export declare const providePrettyFor: (provider: Provider) => <A>(schema: any) => any
```

Added in v1.0.0
