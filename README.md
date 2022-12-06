<h3 align="center">
  <a href="https://fp-ts.github.io/schema/">
    <img src="./docs/fp-ts-logo.png">
  </a>
</h3>

<p align="center">
Schema validation with static type inference
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@fp-ts/schema">
    <img src="https://img.shields.io/npm/dm/@fp-ts/schema.svg" alt="npm downloads" height="20">
  </a>
</p>

```mermaid
flowchart TD
  Schema -->|jsonDecoderFor| JsonDecoder
  Schema -->|jsonEncoderFor| JsonEncoder
  Schema -->|guardFor| Guard
  Schema -->|arbitraryFor| Arbitrary
  Schema -->|prettyFor| Pretty
```

# Features

- deriving single artifacts from a `Schema`:
  - `JsonDecoder`
  - `JsonEncoder`
  - `Guard`
  - `Arbitrary`
  - `Pretty`
- `Codec` (all in one artifact)
- custom interpreters
- custom schema combinators
- custom data types
- custom decode errors
- versioning (TODO)
- migration (TODO)

# Summary

```ts
import * as C from "@fp-ts/schema/Codec";

const Person = C.struct({
  name: C.string,
  age: C.number,
});

// extract the inferred type
type Person = C.Infer<typeof Person>;
/*
type Person = {
  readonly name: string;
  readonly age: number;
}
*/

import * as DE from "@fp-ts/schema/DecodeError";

// decode from JSON
expect(Person.decode({ name: "name", age: 18 })).toEqual(
  C.success({ name: "name", age: 18 })
);
expect(Person.decode(null)).toEqual(
  C.failure(DE.notType("{ readonly [_: string]: unknown }", null))
);

// encode to JSON
expect(Person.encode({ name: "name", age: 18 })).toEqual({
  name: "name",
  age: 18,
});

// guard
expect(Person.is({ name: "name", age: 18 })).toEqual(true);
expect(Person.is(null)).toEqual(false);

// pretty print
expect(Person.pretty({ name: "name", age: 18 })).toEqual(
  '{ "name": "name", "age": 18 }'
);

import * as fc from "fast-check";

// fast-check arbitrary
console.log(fc.sample(Person.arbitrary(fc), 2));
/*
[
  { name: '!U?z/X', age: -2.5223372357846707e-44 },
  { name: 'valukeypro', age: -1.401298464324817e-45 }
]
*/
```

# Custom interpreters

`src/Decoder.ts`, `src/Guard.ts` and `src/Arbitrary.ts` are good examples of defining a custom interpreter.

# Custom schema combinators

Examples in `/src/Schema.ts`.

All the combinators defined in `/src/Schema.ts` could be implemented in userland.

# Custom data types

Examples in `/src/data/*`

# Understanding Schemas

A schema is a description of a data structure that can be used to generate various artifacts from a single declaration.

## JsonDecoder

A `JsonDecoder` is a derivable artifact that is able to decode a value of type `Json` to a value of type `A`.

```ts
interface JsonDecoder<in out A> extends Schema<A> {
  readonly decode: (json: Json) => These<NonEmptyReadonlyArray<DecodeError>, A>;
}
```

## JsonEncoder

A `JsonEncoder` is a derivable artifact that is able to encode a value of type `A` to a value of type `Json`.

```ts
export interface JsonEncoder<A> extends Schema<A> {
  readonly encode: (value: A) => Json;
}
```

## Guard

A `Guard` is a derivable artifact that is able to refine a value of type `unknown` to a value of type `A`.

```ts
export interface Guard<A> extends Schema<A> {
  readonly is: (input: unknown) => input is A;
}
```

# Basic usage

## Primitives

```ts
import * as C from "@fp-ts/schema/Codec";

// $ExpectType Codec<string>
C.string;

// $ExpectType Codec<number>
C.number;

// $ExpectType Codec<boolean>
C.boolean;

// $ExpectType Codec<unknown>
C.unknown;
```

## Filters

```ts
// $ExpectType Codec<string>
pipe(C.string, C.minLength(1));

// $ExpectType Codec<string>
pipe(C.string, C.maxLength(10));

// $ExpectType Codec<number>
pipe(C.number, C.lessThan(0));

// $ExpectType Codec<number>
pipe(C.number, C.lessThanOrEqualTo(0));

// $ExpectType Codec<number>
pipe(C.number, C.greaterThan(10));

// $ExpectType Codec<number>
pipe(C.number, C.greaterThanOrEqualTo(10));

// $ExpectType Codec<number>
pipe(C.number, C.int);
```

## Literals

```ts
// $ExpectType Codec<"a">
C.literal("a");

// $ExpectType Codec<"a" | "b" | "c">
C.literal("a", "b", "c");
```

## Native enums

```ts
enum Fruits {
  Apple,
  Banana,
}

// $ExpectType Codec<typeof Fruits>
C.nativeEnum(Fruits);
```

## Unions

```ts
// $ExpectType Codec<string | number>
C.union(C.string, C.number);
```

## Tuples

```ts
// $ExpectType Codec<readonly [string, number]>
C.tuple(C.string, C.number);
```

## Rest element

```ts
// $ExpectType Schema<readonly [string, number, ...boolean[]]>
pipe(C.tuple(C.string, C.number), C.withRest(C.boolean));
```

## Arrays

```ts
// $ExpectType Codec<readonly number[]>
C.array(C.number);
```

## Non empty arrays

```ts
// $ExpectType Codec<readonly [number, ...number[]]>
C.nonEmptyArray(C.number);
```

## Structs

```ts
// $ExpectType Codec<{ readonly a: string; readonly b: number; }>
C.struct({ a: C.string, b: C.number });
```

Optional fields

```ts
// $ExpectType Codec<{ readonly a: string; readonly b: number; readonly c?: boolean | undefined; }>
C.struct({ a: C.string, b: C.number }, { c: C.boolean });
```

## Pick

```ts
// $ExpectType Codec<{ readonly a: string; }>
pipe(C.struct({ a: C.string, b: C.number }), C.pick("a"));
```

## Omit

```ts
// $ExpectType Codec<{ readonly b: number; }>
pipe(C.struct({ a: C.string, b: C.number }), C.omit("a"));
```

## Partial

```ts
// $ExpectType Codec<Partial<{ readonly a: string; readonly b: number; }>>
C.partial(C.struct({ a: C.string, b: C.number }));
```

## String index signature

```ts
// $ExpectType Codec<{ readonly [_: string]: string; }>
C.stringIndexSignature(C.string);
```

## Symbol index signature

```ts
// $ExpectType Codec<{ readonly [_: symbol]: string; }>
C.symbolIndexSignature(C.string);
```

## Extend

```ts
// $ExpectType Codec<{ readonly a: string; readonly b: string; } & { readonly [_: string]: string; }>
pipe(
  C.struct({ a: C.string, b: C.string }),
  C.extend(C.stringIndexSignature(C.string))
);
```

## Option

```ts
// $ExpectType Codec<Option<number>>
C.option(C.number);
```

## ReadonlySet

```ts
// $ExpectType Codec<ReadonlySet<number>>
C.readonlySet(C.number);
```

## Chunk

```ts
// $ExpectType Codec<Chunk<number>>
C.chunk(C.number);
```

# Documentation

- [API Reference](https://fp-ts.github.io/schema/)

# License

The MIT License (MIT)
