---
title: Serializable.ts
nav_order: 11
parent: Modules
---

## Serializable overview

Added in v1.0.0

Serializable represents an object that has self-contained Schema(s)

---

<h2 class="text-delta">Table of contents</h2>

- [accessor](#accessor)
  - [failureSchema](#failureschema)
  - [selfSchema](#selfschema)
  - [successSchema](#successschema)
- [model](#model)
  - [Serializable (interface)](#serializable-interface)
  - [SerializableWithResult (interface)](#serializablewithresult-interface)
- [symbol](#symbol)
  - [symbol](#symbol-1)
  - [symbolResult](#symbolresult)

---

# accessor

## failureSchema

**Signature**

```ts
export declare const failureSchema: <A extends SerializableWithResult>(self: A) => A[typeof symbolResult]["Failure"]
```

Added in v1.0.0

## selfSchema

**Signature**

```ts
export declare const selfSchema: <A extends Serializable>(self: A) => A[typeof symbol]["Self"]
```

Added in v1.0.0

## successSchema

**Signature**

```ts
export declare const successSchema: <A extends SerializableWithResult>(self: A) => A[typeof symbolResult]["Success"]
```

Added in v1.0.0

# model

## Serializable (interface)

**Signature**

```ts
export interface Serializable {
  readonly [symbol]: {
    readonly Self: Schema.Schema<any, any>
  }
}
```

Added in v1.0.0

## SerializableWithResult (interface)

**Signature**

```ts
export interface SerializableWithResult extends Serializable {
  readonly [symbolResult]: {
    readonly Failure: Schema.Schema<any, any>
    readonly Success: Schema.Schema<any, any>
  }
}
```

Added in v1.0.0

# symbol

## symbol

**Signature**

```ts
export declare const symbol: typeof symbol
```

Added in v1.0.0

## symbolResult

**Signature**

```ts
export declare const symbolResult: typeof symbolResult
```

Added in v1.0.0
