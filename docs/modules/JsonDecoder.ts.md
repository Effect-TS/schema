---
title: JsonDecoder.ts
nav_order: 33
parent: Modules
---

## JsonDecoder overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [JsonDecoder (interface)](#jsondecoder-interface)
  - [JsonDecoderId](#jsondecoderid)
  - [jsonDecoderFor](#jsondecoderfor)
  - [provideJsonDecoderFor](#providejsondecoderfor)

---

# utils

## JsonDecoder (interface)

**Signature**

```ts
export interface JsonDecoder<A> extends Decoder<Json, A> {}
```

Added in v1.0.0

## JsonDecoderId

**Signature**

```ts
export declare const JsonDecoderId: symbol
```

Added in v1.0.0

## jsonDecoderFor

**Signature**

```ts
export declare const jsonDecoderFor: <A>(schema: any) => JsonDecoder<A>
```

Added in v1.0.0

## provideJsonDecoderFor

**Signature**

```ts
export declare const provideJsonDecoderFor: (provider: Provider) => <A>(schema: any) => JsonDecoder<A>
```

Added in v1.0.0
