---
title: SchemaClass.ts
nav_order: 7
parent: Modules
---

## SchemaClass overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructor](#constructor)
  - [SchemaClass](#schemaclass)
  - [SchemaClassExtends](#schemaclassextends)
  - [SchemaClassTransform](#schemaclasstransform)
  - [SchemaClassTransformFrom](#schemaclasstransformfrom)
- [model](#model)
  - [CopyWith (interface)](#copywith-interface)
  - [SchemaClass (interface)](#schemaclass-interface)
  - [SchemaClassExtends (interface)](#schemaclassextends-interface)
  - [SchemaClassTransform (interface)](#schemaclasstransform-interface)

---

# constructor

## SchemaClass

**Signature**

```ts
export declare const SchemaClass: <
  Fields extends Record<
    PropertyKey,
    | Schema<any, any>
    | Schema<never, never>
    | PropertySignature<any, boolean, any, boolean>
    | PropertySignature<never, boolean, never, boolean>
  >
>(
  fields: Fields
) => SchemaClass<
  Spread<
    { readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: From<Fields[K]> } & {
      readonly [K in FromOptionalKeys<Fields>]?: From<Fields[K]> | undefined
    }
  >,
  Spread<
    { readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: To<Fields[K]> } & {
      readonly [K in ToOptionalKeys<Fields>]?: To<Fields[K]> | undefined
    }
  >
>
```

Added in v1.0.0

## SchemaClassExtends

**Signature**

```ts
export declare const SchemaClassExtends: <
  Base extends SchemaClass<any, any>,
  Fields extends Record<
    PropertyKey,
    | Schema<any, any>
    | Schema<never, never>
    | PropertySignature<any, boolean, any, boolean>
    | PropertySignature<never, boolean, never, boolean>
  >
>(
  base: Base,
  fields: Fields
) => SchemaClassExtends<
  Base,
  Spread<
    Omit<SchemaClass.From<Base>, keyof Fields> & {
      readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: From<Fields[K]>
    } & { readonly [K in FromOptionalKeys<Fields>]?: From<Fields[K]> | undefined }
  >,
  Spread<
    Omit<SchemaClass.To<Base>, keyof Fields> & {
      readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: To<Fields[K]>
    } & { readonly [K in ToOptionalKeys<Fields>]?: To<Fields[K]> | undefined }
  >
>
```

Added in v1.0.0

## SchemaClassTransform

**Signature**

```ts
export declare const SchemaClassTransform: <
  Base extends SchemaClass<any, any>,
  Fields extends Record<
    PropertyKey,
    | Schema<any, any>
    | Schema<never, never>
    | PropertySignature<any, boolean, any, boolean>
    | PropertySignature<never, boolean, never, boolean>
  >
>(
  base: Base,
  fields: Fields,
  decode: (
    input: SchemaClass.To<Base>
  ) => ParseResult<
    Omit<SchemaClass.To<Base>, keyof Fields> & {
      readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: To<Fields[K]>
    } & { readonly [K in ToOptionalKeys<Fields>]?: To<Fields[K]> | undefined }
  >,
  encode: (
    input: Omit<SchemaClass.To<Base>, keyof Fields> & {
      readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: To<Fields[K]>
    } & { readonly [K in ToOptionalKeys<Fields>]?: To<Fields[K]> | undefined }
  ) => ParseResult<SchemaClass.To<Base>>
) => SchemaClassTransform<
  Base,
  SchemaClass.From<Base>,
  Spread<
    Omit<SchemaClass.To<Base>, keyof Fields> & {
      readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: To<Fields[K]>
    } & { readonly [K in ToOptionalKeys<Fields>]?: To<Fields[K]> | undefined }
  >
>
```

Added in v1.0.0

## SchemaClassTransformFrom

**Signature**

```ts
export declare const SchemaClassTransformFrom: <
  Base extends SchemaClass<any, any>,
  Fields extends Record<
    PropertyKey,
    | Schema<any, any>
    | Schema<never, never>
    | PropertySignature<any, boolean, any, boolean>
    | PropertySignature<never, boolean, never, boolean>
  >
>(
  base: Base,
  fields: Fields,
  decode: (
    input: SchemaClass.From<Base>
  ) => ParseResult<
    Omit<SchemaClass.From<Base>, keyof Fields> & {
      readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: From<Fields[K]>
    } & { readonly [K in FromOptionalKeys<Fields>]?: From<Fields[K]> | undefined }
  >,
  encode: (
    input: Omit<SchemaClass.From<Base>, keyof Fields> & {
      readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: From<Fields[K]>
    } & { readonly [K in FromOptionalKeys<Fields>]?: From<Fields[K]> | undefined }
  ) => ParseResult<SchemaClass.From<Base>>
) => SchemaClassTransform<
  Base,
  SchemaClass.From<Base>,
  Spread<
    Omit<SchemaClass.To<Base>, keyof Fields> & {
      readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: To<Fields[K]>
    } & { readonly [K in ToOptionalKeys<Fields>]?: To<Fields[K]> | undefined }
  >
>
```

Added in v1.0.0

# model

## CopyWith (interface)

**Signature**

```ts
export interface CopyWith<A> {
  copy<T>(this: T, props: Partial<A>): T
  unsafeCopy<T>(this: T, props: Partial<A>): T
}
```

Added in v1.0.0

## SchemaClass (interface)

**Signature**

```ts
export interface SchemaClass<I, A> {
  new (props: A): A & CopyWith<A> & Data.Case

  effect<T extends new (...args: any) => any>(this: T, props: A): Effect.Effect<never, ParseError, InstanceType<T>>

  unsafe<T extends new (...args: any) => any>(this: T, props: A): InstanceType<T>

  schema<T extends new (...args: any) => any>(this: T): Schema<I, InstanceType<T>>

  structSchema(): Schema<I, A>

  readonly fields: Record<string, Schema<I, A>>
}
```

Added in v1.0.0

## SchemaClassExtends (interface)

**Signature**

```ts
export interface SchemaClassExtends<C extends SchemaClass<any, any>, I, A> {
  new (props: A): A & CopyWith<A> & Data.Case & Omit<InstanceType<C>, keyof CopyWith<unknown> | keyof A>

  effect<T extends new (...args: any) => any>(this: T, props: A): Effect.Effect<never, ParseError, InstanceType<T>>

  unsafe<T extends new (...args: any) => any>(this: T, props: A): InstanceType<T>

  schema<T extends new (...args: any) => any>(this: T): Schema<I, InstanceType<T>>

  structSchema(): Schema<I, A>

  readonly fields: Record<string, Schema<I, A>>
}
```

Added in v1.0.0

## SchemaClassTransform (interface)

**Signature**

```ts
export interface SchemaClassTransform<C extends SchemaClass<any, any>, I, A> {
  new (props: A): A & CopyWith<A> & Data.Case & Omit<InstanceType<C>, keyof CopyWith<unknown> | keyof A>

  unsafe<T extends new (...args: any) => any>(this: T, props: A): InstanceType<T>

  schema<T extends new (...args: any) => any>(this: T): Schema<I, InstanceType<T>>

  structSchema(): Schema<I, A>
}
```

Added in v1.0.0
