---
title: data/Json.ts
nav_order: 11
parent: Modules
---

## Json overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Json (type alias)](#json-type-alias)
  - [JsonArray (type alias)](#jsonarray-type-alias)
  - [JsonObject (type alias)](#jsonobject-type-alias)
  - [json](#json)

---

# utils

## Json (type alias)

**Signature**

```ts
export type Json = null | boolean | number | string | JsonArray | JsonObject
```

Added in v1.0.0

## JsonArray (type alias)

**Signature**

```ts
export type JsonArray = ReadonlyArray<Json>
```

Added in v1.0.0

## JsonObject (type alias)

**Signature**

```ts
export type JsonObject = { readonly [key: string]: Json }
```

Added in v1.0.0

## json

**Signature**

```ts
export declare const json: S.Schema<Json>
```

Added in v1.0.0
