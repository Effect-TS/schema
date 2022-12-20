---
title: annotation/EncoderAnnotation.ts
nav_order: 4
parent: Modules
---

## EncoderAnnotation overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [EncoderAnnotation (interface)](#encoderannotation-interface)
  - [EncoderAnnotationId](#encoderannotationid)
  - [encoderAnnotation](#encoderannotation)
  - [isEncoderAnnotation](#isencoderannotation)

---

# utils

## EncoderAnnotation (interface)

**Signature**

```ts
export interface EncoderAnnotation {
  readonly _id: typeof EncoderAnnotationId
  readonly handler: (...Encoders: ReadonlyArray<Encoder<any, any>>) => Encoder<any, any>
}
```

Added in v1.0.0

## EncoderAnnotationId

**Signature**

```ts
export declare const EncoderAnnotationId: '@fp-ts/schema/annotation/EncoderAnnotation'
```

Added in v1.0.0

## encoderAnnotation

**Signature**

```ts
export declare const encoderAnnotation: (
  handler: (...Encoders: ReadonlyArray<Encoder<any, any>>) => Encoder<any, any>
) => EncoderAnnotation
```

Added in v1.0.0

## isEncoderAnnotation

**Signature**

```ts
export declare const isEncoderAnnotation: (u: unknown) => u is EncoderAnnotation
```

Added in v1.0.0
