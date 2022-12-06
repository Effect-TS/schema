---
title: Schema.ts
nav_order: 37
parent: Modules
---

## Schema overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Infer (type alias)](#infer-type-alias)
  - [Schema (interface)](#schema-interface)
  - [array](#array)
  - [boolean](#boolean)
  - [clone](#clone)
  - [declare](#declare)
  - [extend](#extend)
  - [keyof](#keyof)
  - [lazy](#lazy)
  - [literal](#literal)
  - [make](#make)
  - [max](#max)
  - [maxLength](#maxlength)
  - [min](#min)
  - [minLength](#minlength)
  - [nativeEnum](#nativeenum)
  - [nonEmptyArray](#nonemptyarray)
  - [number](#number)
  - [of](#of)
  - [omit](#omit)
  - [partial](#partial)
  - [pick](#pick)
  - [string](#string)
  - [stringIndexSignature](#stringindexsignature)
  - [struct](#struct)
  - [symbolIndexSignature](#symbolindexsignature)
  - [tuple](#tuple)
  - [union](#union)
  - [unknown](#unknown)
  - [withRest](#withrest)

---

# utils

## Infer (type alias)

**Signature**

```ts
export type Infer<S extends Schema<any>> = Parameters<S['A']>[0]
```

Added in v1.0.0

## Schema (interface)

**Signature**

```ts
export interface Schema<
```

Added in v1.0.0

## array

**Signature**

```ts
export declare const array: <A>(item: any) => any
```

Added in v1.0.0

## boolean

**Signature**

```ts
export declare const boolean: any
```

Added in v1.0.0

## clone

**Signature**

```ts
export declare const clone: (id: symbol, interpreters: Record<symbol, Function>) => <A>(schema: any) => any
```

Added in v1.0.0

## declare

**Signature**

```ts
export declare const declare: <Schemas extends readonly any[]>(
  id: symbol,
  config: Option<unknown>,
  provider: Provider,
  ...schemas: Schemas
) => any
```

Added in v1.0.0

## extend

**Signature**

```ts
export declare const extend: <B>(that: any) => <A>(self: any) => any
```

Added in v1.0.0

## keyof

**Signature**

```ts
export declare const keyof: <A>(schema: any) => any
```

Added in v1.0.0

## lazy

**Signature**

```ts
export declare const lazy: <A>(f: () => any) => any
```

Added in v1.0.0

## literal

**Signature**

```ts
export declare const literal: <A extends readonly (string | number | boolean | null | undefined)[]>(...a: A) => any
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <A>(ast: AST.AST) => any
```

Added in v1.0.0

## max

**Signature**

```ts
export declare const max: (min: number) => <A extends number>(self: any) => any
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: (maxLength: number) => <A extends { length: number }>(self: any) => any
```

Added in v1.0.0

## min

**Signature**

```ts
export declare const min: (min: number) => <A extends number>(self: any) => any
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: (minLength: number) => <A extends { length: number }>(self: any) => any
```

Added in v1.0.0

## nativeEnum

**Signature**

```ts
export declare const nativeEnum: <A extends { [_: string]: string | number }>(nativeEnum: A) => any
```

Added in v1.0.0

## nonEmptyArray

**Signature**

```ts
export declare const nonEmptyArray: <A>(item: any) => any
```

Added in v1.0.0

## number

**Signature**

```ts
export declare const number: any
```

Added in v1.0.0

## of

**Signature**

```ts
export declare const of: <A>(value: A) => any
```

Added in v1.0.0

## omit

**Signature**

```ts
export declare const omit: <A, Keys extends readonly (keyof A)[]>(...keys: Keys) => (self: any) => any
```

Added in v1.0.0

## partial

**Signature**

```ts
export declare const partial: <A>(self: any) => any
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: <A, Keys extends readonly (keyof A)[]>(...keys: Keys) => (self: any) => any
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: any
```

Added in v1.0.0

## stringIndexSignature

**Signature**

```ts
export declare const stringIndexSignature: <A>(value: any) => any
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <Fields extends Record<string | number | symbol, any>>(fields: Fields) => any
```

Added in v1.0.0

## symbolIndexSignature

**Signature**

```ts
export declare const symbolIndexSignature: <A>(value: any) => any
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <Components extends readonly any[]>(...components: Components) => any
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: <Members extends readonly any[]>(...members: Members) => any
```

Added in v1.0.0

## unknown

**Signature**

```ts
export declare const unknown: any
```

Added in v1.0.0

## withRest

**Signature**

```ts
export declare const withRest: <R>(rest: any) => <A extends readonly any[]>(self: any) => any
```

Added in v1.0.0
