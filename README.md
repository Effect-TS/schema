<h3 align="center">
  <a href="https://fp-ts.github.io/codec/">
    <img src="./docs/fp-ts-logo.png">
  </a>
</h3>

<p align="center">
Functional programming in TypeScript
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@fp-ts/codec">
    <img src="https://img.shields.io/npm/dm/@fp-ts/codec.svg" alt="npm downloads" height="20">
  </a>
</p>

# Schema validation with static type inference

## Supported data types

|                      |                              | TypeScript                                      | Meta      |
| -------------------- | ---------------------------- | ----------------------------------------------- | --------- |
| Primitives           |                              |                                                 |           |
|                      | strings                      | `string`                                        | `String`  |
|                      | numbers                      | `number`                                        | `Number`  |
|                      | booleans                     | `boolean`                                       | `Boolean` |
| Literals             |                              |                                                 |           |
|                      | string literals              | `"a"`                                           | `Of`      |
|                      | number literals              | `1`                                             | `Of`      |
|                      | boolean literals             | `true`                                          | `Of`      |
| Objects              |                              |                                                 |           |
|                      |                              | `{ a: string, b: number }`                      | `Struct`  |
|                      | structs with index signature | `{ a: string, b: string, [_: string]: string }` | `Struct`  |
| Records              |                              |                                                 |           |
|                      |                              | `{ [_: string]: number }`                       | `Struct`  |
| Tuples               |                              |                                                 |           |
|                      |                              | `[string, number]`                              | `Tuple`   |
|                      | tuples with rest element     | `[string, number, ...boolean[]]`                | `Tuple`   |
| Arrays               |                              |                                                 |           |
|                      |                              | `string[]`                                      | `Tuple`   |
| Unions               |                              |                                                 |           |
|                      |                              | `string \| number`                              | `Union`   |
| Recursive data types |                              | `type A = { as: A[] }`                          | `Lazy`    |

# Documentation

- [API Reference](https://fp-ts.github.io/codec/)

# License

The MIT License (MIT)
