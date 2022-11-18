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

# Basic usage

Creating a simple string decoder

```ts
import { decoder as D } from "@fp-ts/codec";

const mySchema = D.string;

mySchema.decode("tuna"); // => right("tuna")
mySchema.decode(12); // => left(DecodeError)
```

Creating an object decoder

```ts
import { decoder as D, schema as S } from "@fp-ts/codec";

const User = D.struct({
  username: D.string,
});

User.decode({ username: "Ludwig" });

// extract the inferred type
type User = S.Infer<typeof User>;
// { username: string }
```

Deriving a guard

```ts
import { decoder as D, guard as G } from "@fp-ts/codec";

const User = D.struct({
  username: D.string,
});

const guard = G.unsafeGuardFor(User);
guard.is({ username: "Ludwig" }); // => true
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
