---
title: JsonEncoder.ts
nav_order: 34
parent: Modules
---

## JsonEncoder overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [JsonEncoder (interface)](#jsonencoder-interface)
  - [JsonEncoderId](#jsonencoderid)
  - [jsonEncoderFor](#jsonencoderfor)
  - [provideJsonEncoderFor](#providejsonencoderfor)

---

# utils

## JsonEncoder (interface)

**Signature**

```ts
export interface JsonEncoder<A> extends Encoder<Json, A> {}
```

Added in v1.0.0

## JsonEncoderId

**Signature**

```ts
export declare const JsonEncoderId: symbol
```

Added in v1.0.0

## jsonEncoderFor

**Signature**

```ts
export declare const jsonEncoderFor: <A>(schema: any) => Encoder<Json, A>
```

Added in v1.0.0

## provideJsonEncoderFor

**Signature**

```ts
export declare const provideJsonEncoderFor: (provider: Provider) => <A>(schema: any) => Encoder<Json, A>
```

Added in v1.0.0
