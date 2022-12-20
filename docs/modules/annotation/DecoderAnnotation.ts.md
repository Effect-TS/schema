---
title: annotation/DecoderAnnotation.ts
nav_order: 2
parent: Modules
---

## DecoderAnnotation overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [DecoderAnnotation (interface)](#decoderannotation-interface)
  - [DecoderAnnotationId](#decoderannotationid)
  - [decoderAnnotation](#decoderannotation)
  - [isDecoderAnnotation](#isdecoderannotation)

---

# utils

## DecoderAnnotation (interface)

**Signature**

```ts
export interface DecoderAnnotation {
  readonly _id: typeof DecoderAnnotationId
  readonly handler: (...Decoders: ReadonlyArray<Decoder<any, any>>) => Decoder<any, any>
}
```

Added in v1.0.0

## DecoderAnnotationId

**Signature**

```ts
export declare const DecoderAnnotationId: '@fp-ts/schema/annotation/DecoderAnnotation'
```

Added in v1.0.0

## decoderAnnotation

**Signature**

```ts
export declare const decoderAnnotation: (
  handler: (...Decoders: ReadonlyArray<Decoder<any, any>>) => Decoder<any, any>
) => DecoderAnnotation
```

Added in v1.0.0

## isDecoderAnnotation

**Signature**

```ts
export declare const isDecoderAnnotation: (u: unknown) => u is DecoderAnnotation
```

Added in v1.0.0
