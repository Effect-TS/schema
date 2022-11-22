<h3 align="center">
  <a href="https://fp-ts.github.io/codec/">
    <img src="./docs/fp-ts-logo.png">
  </a>
</h3>

<p align="center">
Schema validation with static type inference
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@fp-ts/codec">
    <img src="https://img.shields.io/npm/dm/@fp-ts/codec.svg" alt="npm downloads" height="20">
  </a>
</p>

# Schemas

Creating a schema

```ts
import * as S from "@fp-ts/codec/Schema";

const Person = S.struct({
  name: S.string,
  age: S.number,
});

// extract the inferred type
type Person = S.Infer<typeof Person>;
/*
type Person = {
    readonly name: string;
    readonly age: number;
}
*/
```

# Decoders

Deriving a decoder from a schema

```ts
import * as S from "@fp-ts/codec/Schema";
import * as D from "@fp-ts/codec/Decoder";
import * as DE from "@fp-ts/codec/DecodeError";

const schema = S.struct({
  name: S.string,
  age: S.number,
});

const decoder = D.unsafeDecoderFor(schema);
/*
const decoder: D.Decoder<unknown, {
  readonly name: string;
  readonly age: number;
}>
*/

expect(decoder.decode({ name: "name", age: 18 })).toEqual(
  D.succeed({ name: "name", age: 18 })
);

expect(decoder.decode(null)).toEqual(
  D.fail(DE.notType("{ readonly [_: string]: unknown }", null))
);
```

# Guards

Deriving a guard from a schema

```ts
import * as S from "@fp-ts/codec/Schema";
import * as G from "@fp-ts/codec/Guard";

const schema = S.struct({
  name: S.string,
  age: S.number,
});

const guard = G.unsafeGuardFor(schema);
/*
const decoder: G.Guard<{
  readonly name: string;
  readonly age: number;
}>
*/

expect(guard.is({ name: "name", age: 18 })).toEqual(true);
expect(guard.is(null)).toEqual(false);
```

# Arbitraries

Deriving an arbitrary from a schema

```ts
import * as S from "@fp-ts/codec/Schema";
import * as A from "@fp-ts/codec/Arbitrary";
import * as fc from "fast-check";

const schema = S.struct({
  name: S.string,
  age: S.number,
});

const arb = A.unsafeArbitraryFor(schema).arbitrary(fc);
/*
const arb: fc.Arbitrary<{
  readonly name: string;
  readonly age: number;
}>
*/

console.log(fc.sample(arb, 2));
/*
[
  { name: 't9dUS+\\Z', age: 3.4028228579130005e+38 },
  { name: 'o', age: -3.4028218437925203e+38 }
]
*/
```

# Native enums

```ts
import * as S from "@fp-ts/codec/Schema";

enum E {
  a,
  b,
}

const e = S.nativeEnum(E);
/*
const e: S.Schema<typeof E>
*/
```

# Supported data types

|                      |                   | TypeScript                                                       | `AST`          |
| -------------------- | ----------------- | ---------------------------------------------------------------- | -------------- |
| Primitives           |                   |                                                                  |                |
|                      | strings           | `string`                                                         | `String`       |
|                      | numbers           | `number`                                                         | `Number`       |
|                      | booleans          | `boolean`                                                        | `Boolean`      |
| Literals             |                   |                                                                  |                |
|                      | string literals   | `"a"`                                                            | `Of`           |
|                      | number literals   | `1`                                                              | `Of`           |
|                      | boolean literals  | `true`                                                           | `Of`           |
| Enums                |                   |                                                                  |                |
|                      | numeric enums     | `enum Fruits { Apple, Banana }`                                  | `Of` + `Union` |
|                      | string enums      | `enum Fruits { Apple = "apple", Banana = "banana" }`             | `Of` + `Union` |
|                      | const enums       | `const Fruits = { Apple = "apple", Banana = "banana" } as const` | `Of` + `Union` |
| Objects              |                   |                                                                  |                |
|                      |                   | `{ a: string, b: number }`                                       | `Struct`       |
|                      | index signature   | `{ a: string, b: string, [_: string]: string }`                  | `Struct`       |
| Records              |                   |                                                                  |                |
|                      |                   | `{ [_: string]: number }`                                        | `Struct`       |
| Tuples               |                   |                                                                  |                |
|                      |                   | `[string, number]`                                               | `Tuple`        |
|                      | with rest element | `[string, number, ...boolean[]]`                                 | `Tuple`        |
| Arrays               |                   |                                                                  |                |
|                      |                   | `string[]`                                                       | `Tuple`        |
| Unions               |                   |                                                                  |                |
|                      |                   | `string \| number`                                               | `Union`        |
| Recursive data types |                   | `type A = { as: A[] }`                                           | `Lazy`         |

# Documentation

- [API Reference](https://fp-ts.github.io/codec/)

# License

The MIT License (MIT)

```

```
