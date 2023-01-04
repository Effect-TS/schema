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

# Features

- deriving artifacts from a `Schema`:
  - guards
  - decoders
  - encoders
  - codecs (decoder + encoder + guard)
  - [fast-check](https://github.com/dubzzz/fast-check) arbitraries
  - pretty printing
  - JSON Schema
  - TypeScript AST
- custom artifact compilers
- custom `Schema` combinators
- custom data types
- refinements (TODO)
- custom decode errors (TODO)
- versioning (TODO)
- migration (TODO)

# Introduction

Welcome to the documentation for `@fp-ts/schema`, a library for defining and using schemas to validate and transform data in TypeScript. `@fp-ts/schema` allows you to define a `Schema` that describes the structure and data types of a piece of data, and then use that `Schema` to perform various operations such as decoding from `unknown`, encoding to `unknown`, verifying that a value conforms to a given `Schema`. `@fp-ts/schema` also provides a number of other features, including the ability to derive various artifacts such as `Arbitrary`s, `JSONSchema`s, and `Pretty`s from a `Schema`, as well as the ability to customize the library through the use of custom artifact compilers and custom `Schema` combinators.

## Getting started

To get started with `@fp-ts/schema`, you will need to install the library using npm or yarn:

```
npm install @fp-ts/schema
```

```
yarn add @fp-ts/schema
```

Once you have installed the library, you can import the necessary types and functions from the `@fp-ts/schema/Codec` module.

```ts
import * as C from "@fp-ts/schema/Codec";
```

## Defining a schema

To define a `Schema`, you can use the provided `struct` function to define a new `Schema` that describes an object with a fixed set of properties. Each property of the object is described by a `Schema`, which specifies the data type and validation rules for that property.

For example, consider the following `Schema` that describes a person object with a `name` property of type `string` and an `age` property of type `number`:

```ts
const Person = C.struct({
  name: C.string,
  age: C.number,
});
```

You can also use the `union` function to define a `Schema` that describes a value that can be one of a fixed set of types. For example, the following `Schema` describes a value that can be either a `string` or a `number`:

```ts
const StringOrNumber = C.union(C.string, C.number);
```

In addition to the provided `struct` and `union` functions, `@fp-ts/schema` also provides a number of other functions for defining `Schema`s, including functions for defining arrays, tuples, and records.

## Extracting the inferred type

Once you have defined a `Schema`, you can use the `Infer` type to extract the inferred type of the data described by the `Schema`.

For example, given the `Person` `Schema` defined above, you can extract the inferred type of a `Person` object as follows:

```ts
interface Person extends C.Infer<typeof Person> {}
/*
interface Person {
  readonly name: string;
  readonly age: number;
}
*/
```

## Decoding from `unknown`

To use the `Person` `Schema` defined above to decode a value from `unknown`, you can use the `decode` function:

```ts
import * as DE from "@fp-ts/schema/DecodeError";

const unknown: unknown = { name: "Alice", age: 30 };

expect(Person.decode(unknown)).toEqual(C.success({ name: "Alice", age: 30 }));
expect(Person.decode(null)).toEqual(
  C.failure(DE.notType("{ readonly [x: string]: unknown }", null))
);
```

The `decode` function returns a value of type `Validated<DecodeError, A>`, which is a type alias for `These<NonEmptyReadonlyArray<DecodeError>, A>`, where `DecodeError` represents a list of errors that occurred during the decoding process and `A` is the inferred type of the data described by the `Schema`. A successful decode will result in a `Right` or `Both` value, containing the decoded data. A `Right` value indicates that the decode was successful and no errors occurred. A `Both` value represents a successful decode that also includes some decode errors (as warnings). It is important to note that a `Both` value still represents a successful decode, as the data was able to be successfully decoded despite the presence of decode errors. In the case of a failed decode, the result will be a `Left` value containing a list of `DecodeError`s.

The `decodeOrThrow` function is used to decode a value and throw an error if the decoding fails.
It is useful when you want to ensure that the value being decoded is in the correct format, and want to throw an error if it is not.

```ts
Person.decodeOrThrow({});
/*
1 error(s) found
└─ key "name"
   └─ is missing
*/
```

**Excess properties**

When using a `Codec` to decode a value, any properties that are not specified in the `Codec` will result in a decoding error. This is because the `Codec` is expecting a specific shape for the decoded value, and any excess properties do not conform to that shape.

However, you can use the `allowUnexpected` combinator to allow excess properties while decoding, and instead of a fatal error, it will return a warning and strip away the excess properties. This can be useful in cases where you want to be permissive in the shape of the decoded value, but still want to catch any potential errors or unexpected values.

Here's an example of how you might use `allowUnexpected`:

```ts
const Person = C.allowUnexpected(
  C.struct({
    name: C.string,
    age: C.number,
  })
);

// This will succeed and return a value with no warnings
const result = personCodec.decode({ name: "Alice", age: 30 });

// This will succeed, but return a warning about the excess property "email"
console.log(
  "%o",
  Person.decode({ name: "Bob", age: 40, email: "bob@example.com" })
);
/*
{
  _tag: 'Both',
  left: [
    {
      _tag: 'Key',
      key: 'email',
      errors: [
        { _tag: 'Unexpected', actual: 'bob@example.com' },
        [length]: 1
      ]
    },
    [length]: 1
  ],
  right: { name: 'Bob', age: 40 }
}
*/
```

The `disallowUnexpected` combinator can be used to switch the decoding behavior of a `Codec` back to the default behavior of raising fatal errors for excess properties.

## Encoding a value

To use the `Person` `Schema` defined above to encode a value to `unknown`, you can use the `encode` function:

```ts
expect(Person.encode({ name: "Alice", age: 30 })).toEqual({
  name: "Alice",
  age: 30,
});
```

## Guards

`Guard` is a type provided by the `@fp-ts/schema` library that represents a way of verifying that a value conforms to a given `Schema`. A `Guard` is a function that takes a value as an argument and returns a `boolean` indicating whether or not the value conforms to the `Schema`.

```ts
interface Guard<in out A> extends Schema<A> {
  readonly is: (input: unknown) => input is A;
}
```

For example, given the `Person` `Schema` defined above, you can use the `is` function provided by the `Person` `Guard` to check if a value conforms to the `Person` `Schema`:

```ts
expect(Person.is({ name: "Alice", age: 30 })).toEqual(true);
expect(Person.is(null)).toEqual(false);
```

## [fast-check](https://github.com/dubzzz/fast-check) arbitraries

`Arbitrary` is a type provided by the `@fp-ts/schema` library that represents a way of generating random values that conform to a given `Schema`. This can be useful for testing purposes, as it allows you to generate random test data that is guaranteed to be valid according to the `Schema`.

```ts
interface Arbitrary<in out A> extends Schema<A> {
  readonly arbitrary: (fc: typeof FastCheck) => FastCheck.Arbitrary<A>;
}
```

For example, given the `Person` `Schema` defined above, you can use the `arbitrary` function provided by the `Person` `Arbitrary` to generate random values that conform to the `Person` `Schema`:

```ts
import * as A from "@fp-ts/schema/Arbitrary";
import * as fc from "fast-check";

const PersonArbitrary = A.prettyFor(Person);

console.log(fc.sample(PersonArbitrary.arbitrary(fc), 2));
/*
[
{ name: '!U?z/X', age: -2.5223372357846707e-44 },
{ name: 'valukeypro', age: -1.401298464324817e-45 }
]
*/
```

## Pretty print

`Pretty` is a type provided by the `@fp-ts/schema` library that represents a way of pretty-printing values that conform to a given `Schema`. The `Pretty` type provides a `pretty` function that takes a value and returns a string representation of the value with proper indentation and formatting.

```ts
interface Pretty<in out A> extends Schema<A> {
  readonly pretty: (a: A) => string;
}
```

You can use the `Pretty` type to create a human-readable string representation of a value that conforms to a `Schema`. This can be useful for debugging or logging purposes, as it allows you to easily inspect the structure and data types of the value.

For example, given the `Person` `Schema` defined above, you can use the `pretty` function provided by the `Person` `Pretty` to create a pretty-printed string representation of a value that conforms to the `Person` `Schema`:

```ts
import * as P from "@fp-ts/schema/Pretty";

const PersonPretty = P.prettyFor(Person);

expect(PersonPretty.pretty({ name: "Alice", age: 30 })).toEqual(
  `{ "name": "Alice", "age": 30 }`
);
```

# Understanding Schemas

A schema is a description of a data structure that can be used to generate various artifacts from a single declaration.

From a technical point of view a schema is just a typed wrapper of an `AST` value

```ts
interface Schema<in out A> {
  readonly ast: AST;
}
```

The `AST` type represents a tiny portion of the TypeScript AST, roughly speaking the part describing ADTs (algebraic data types),
i.e. products (like structs and tuples) and unions.

This means that you can define your own schema constructors / combinators as long as you are able to manipulate the `AST` type accordingly, let's see an example.

Say we want to define a `pair` schema constructor, which takes a `Schema<A>` as input and returns a `Schema<readonly [A, A]>` as output.

First of all we need to define the signature of `pair`

```ts
import * as S from "@fp-ts/schema/Schema";

declare const pair: <A>(schema: S.Schema<A>) => S.Schema<readonly [A, A]>;
```

Then we can implement the body using the APIs exported by the `@fp-ts/schema/AST` module

```ts
import * as AST from "@fp-ts/schema/AST";
import * as O from "@fp-ts/data/Option";

const pair = <A>(schema: S.Schema<A>): S.Schema<readonly [A, A]> => {
  const tuple = AST.tuple(
    [AST.element(schema.ast, false), AST.element(schema.ast, false)], // <= elements definitions
    O.none, // <= rest element
    true // <= specifies if the tuple is readonly
  );
  return S.make(tuple); // <= wrap the AST value in a Schema
};
```

The goal of this example was showing the low-level APIs of the `AST` module, but the same result can
be achieved using the much more handy APIs of the `Schema` module

```ts
const pair = <A>(schema: S.Schema<A>): S.Schema<readonly [A, A]> =>
  S.tuple(schema, schema);
```

Please note that the `S.tuple` API itself is nothing special and can be defined in userland

```ts
export const tuple = <Elements extends ReadonlyArray<Schema<any>>>(
  ...elements: Elements
): Schema<{ readonly [K in keyof Elements]: Infer<Elements[K]> }> =>
  makeSchema(
    AST.tuple(
      elements.map((c) => c.ast),
      O.none,
      true
    )
  );
```

Now you can compile your `pair` schemas using the `codecFor` compiler

```ts
import * as C from "@fp-ts/schema/Codec";

// const myNumberPair: C.Codec<readonly [number, number]>
const myNumberPair = C.codecFor(pair(S.number));

expect(myNumberPair.is([1, 2])).toEqual(true);
expect(myNumberPair.is([1, "a"])).toEqual(false);
```

# Basic usage

## Primitives

```ts
import * as C from "@fp-ts/schema/Codec";

// primitive values
C.string;
C.number;
C.bigint;
C.boolean;
C.symbol;
C.object;

// empty types
C.undefined;
C.void; // accepts undefined

// catch-all types
// allows any value
C.any;
C.unknown;

// never type
// allows no values
C.never;
```

## Literals

```ts
C.null; // same as C.literal(null)
C.literal("a");
C.literal("a", "b", "c"); // union of literals
C.literal(1);
C.literal(2n); // bigint literal
C.literal(true);
```

## Template literals

The `templateLiteral` combinator allows you to create a codec for a TypeScript template literal type.

```ts
// $ExpectType Codec<`a${string}`>
C.templateLiteral(C.literal("a"), C.string);

// example from https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
const EmailLocaleIDs = C.literal("welcome_email", "email_heading");
const FooterLocaleIDs = C.literal("footer_title", "footer_sendoff");

// $ExpectType Codec<"welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id">
C.templateLiteral(C.union(EmailLocaleIDs, FooterLocaleIDs), C.literal("_id"));
```

## Filters

**Note**. Filters don't change the `Schema` type.

### Strings

```ts
pipe(C.string, C.maxLength(5));
pipe(C.string, C.minLength(5));
pipe(C.string, C.length(5));
pipe(C.string, C.regex(regex));
pipe(C.string, C.startsWith(string));
pipe(C.string, C.endsWith(string));
```

### Numbers

```ts
pipe(C.number, C.greaterThan(5));
pipe(C.number, C.greaterThanOrEqualTo(5));
pipe(C.number, C.lessThan(5));
pipe(C.number, C.lessThanOrEqualTo(5));

pipe(C.number, C.int); // value must be an integer

pipe(C.number, C.nonNaN); // not NaN
pipe(C.number, C.finite); // value must be finite, not Infinity or -Infinity
```

## Native enums

```ts
enum Fruits {
  Apple,
  Banana,
}

// $ExpectType Codec<Fruits>
C.enums(Fruits);
```

## Nullables

```ts
// $ExpectType Codec<string | null>
C.nullable(C.string);
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

Append a required element

```ts
// $ExpectType Codec<readonly [string, number, boolean]>
pipe(C.tuple(C.string, C.number), C.element(C.boolean));
```

Append an optional element

```ts
// $ExpectType Codec<readonly [string, number, boolean?]>
pipe(C.tuple(C.string, C.number), C.optionalElement(C.boolean));
```

Append a rest element

```ts
// $ExpectType Schema<readonly [string, number, ...boolean[]]>
pipe(C.tuple(C.string, C.number), C.rest(C.boolean));
```

## Arrays

```ts
// $ExpectType Codec<readonly number[]>
C.array(C.number);
```

Non empty arrays

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
// $ExpectType Codec<{ readonly a: string; readonly b: number; readonly c?: boolean; }>
C.struct({ a: C.string, b: C.number, c: C.optional(C.boolean) });
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

## Records

String keys

```ts
// $ExpectType Codec<{ readonly [x: string]: string; }>
C.record(C.string, C.string);

// $ExpectType Codec<{ readonly a: string; readonly b: string; }>
C.record(C.union(C.literal("a"), C.literal("b")), C.string);
```

Keys refinements

```ts
// $ExpectType Codec<{ readonly [x: string]: string; }>
C.record(pipe(C.string, C.minLength(2)), C.string);
```

Symbol keys

```ts
// $ExpectType Codec<{ readonly [x: symbol]: string; }>
C.record(C.symbol, C.string);
```

Template literal keys

```ts
// $ExpectType Codec<{ readonly [x: `a${string}`]: string; }>
C.record(C.templateLiteral(C.literal("a"), C.string), C.string);
```

## Extend

The `extend` combinator allows you to add additional fields or index signatures to an existing `Codec` or `Schema`.

```ts
// $ExpectType Codec<{ [x: string]: string; readonly a: string; readonly b: string; readonly c: boolean; }>
pipe(
  C.struct({ a: C.string, b: C.string }),
  C.extend(C.struct({ c: C.boolean })), // <= you can add more fields
  C.extend(C.record(C.string, C.string)) // <= you can add index signatures
);
```

## InstanceOf

In the following section, we demonstrate how to use the `instanceOf` combinator to create a `Codec` for a class instance.

```ts
class Test {
  constructor(readonly name: string) {}
}

// $ExpectType Codec<Test>
pipe(C.object, C.instanceOf(Test));
```

## Recursive types

The `lazy` combinator is useful when you need to define a `Schema` that depends on itself, like in the case of recursive data structures. In this example, the `Category` schema depends on itself because it has a field `subcategories` that is an array of `Category` objects.

```ts
interface Category {
  readonly name: string;
  readonly subcategories: ReadonlyArray<Category>;
}

const Category: S.Schema<Category> = S.lazy(() =>
  S.struct({
    name: S.string,
    subcategories: S.array(Category),
  })
);
```

Here's an example of two mutually recursive schemas, `Expression` and `Operation`, that represent a simple arithmetic expression tree.

```ts
interface Expression {
  readonly type: "expression";
  readonly value: number | Operation;
}

interface Operation {
  readonly type: "operation";
  readonly operator: "+" | "-";
  readonly left: Expression;
  readonly right: Expression;
}

const Expression: S.Schema<Expression> = S.lazy(() =>
  S.struct({
    type: S.literal("expression"),
    value: S.union(S.number, Operation),
  })
);

const Operation: S.Schema<Operation> = S.lazy(() =>
  S.struct({
    type: S.literal("operation"),
    operator: S.union(S.literal("+"), S.literal("-")),
    left: Expression,
    right: Expression,
  })
);
```

## Transformations

In some cases, we may need to transform the output of a schema to a different type. For instance, we may want to parse a string into a number, or we may want to transform a date string into a `Date` object.

To perform these kinds of transformations, the `@fp-ts/schema` library provides the `transform` and `transformOrFail` combinators.

The `transform` combinator takes a target schema, a transformation function from the source type to the target type, and a reverse transformation function from the target type back to the source type. It returns a new schema that applies the transformation function to the output of the original schema before returning it. If the original schema fails to decode a value, the transformed schema will also fail.

```ts
import * as S from "@fp-ts/schema/Schema";

// define a schema for the string type
const stringSchema: S.Schema<string> = S.string;

// define a schema for a tuple with one element of type string
const tupleSchema: S.Schema<[string]> = S.tuple(S.string);

// define a function that converts a string into a tuple with one element of type string
const f = (s: string): [string] => [s];

// define a function that converts a tuple with one element of type string into a string
const g = ([s]: [string]): string => s;

// use the transform combinator to convert the string schema into the tuple schema
const transformedSchema: S.Schema<[string]> = pipe(
  stringSchema,
  S.transform(tupleSchema, f, g)
);
```

In the example above, we defined a schema for the `string` type and a schema for the tuple type `[string]`. We also defined the functions `f` and `g` that convert a `string` into a tuple and a tuple into a `string`, respectively. Then, we used the `transform` combinator to convert the string schema into a schema for the tuple type `[string]`. The resulting schema can be used to decode values of type `string` into values of type `[string]`.

The `transformOrFail` combinator works in a similar way, but allows the transformation function to return a `DecodeResult` object, which can either be a success or a failure. This allows us to specify custom error messages in case the transformation fails.

Here's an example of the `transformOrFail` combinator which converts a `string` into a `boolean`:

```ts
import { pipe } from "@fp-ts/data/Function";
import * as DE from "@fp-ts/schema/DecodeError";
import * as D from "@fp-ts/schema/Decoder";
import type { DecodeResult } from "@fp-ts/schema/Decoder";
import * as S from "@fp-ts/schema/Schema";

// define a schema for the string type
const stringSchema: S.Schema<string> = S.string;

// define a schema for the boolean type
const booleanSchema: S.Schema<boolean> = S.boolean;

// define a function that converts a string into a boolean
const f = (s: string): DecodeResult<boolean> =>
  s === "true"
    ? D.success(true)
    : s === "false"
    ? D.success(false)
    : D.failure(DE.transform("string", "boolean", s));

// define a function that converts a boolean into a string
const g = (b: boolean): DecodeResult<string> => D.success(String(b));

// use the transformOrFail combinator to convert the string schema into the boolean schema
const transformedSchema: S.Schema<boolean> = pipe(
  stringSchema,
  S.transformOrFail(booleanSchema, f, g)
);
```

## parseNumber

In the following section, we demonstrate how to use the `parseNumber` combinator to convert a `string` schema to a `number` schema and parse string inputs into numbers. The `parseNumber` combinator allows parsing special values such as `NaN`, `Infinity`, and `-Infinity` in addition to regular numbers.

```ts
import * as S from "@fp-ts/schema/Schema";
import * as C from "@fp-ts/schema/Codec";
import { parseNumber } from "@fp-ts/schema/data/parser";
import * as DE from "@fp-ts/schema/DecodeError";

const schema = parseNumber(S.string); // converts string schema to number schema
const codec = C.codecFor(schema);

// success cases
expect(codec.decode("1")).toEqual(C.success(1));
expect(codec.decode("-1")).toEqual(C.success(-1));
expect(codec.decode("1.5")).toEqual(C.success(1.5));
expect(codec.decode("NaN")).toEqual(C.success(NaN));
expect(codec.decode("Infinity")).toEqual(C.success(Infinity));
expect(codec.decode("-Infinity")).toEqual(C.success(-Infinity));

// failure cases
expect(codec.decode("a")).toEqual(C.failure(DE.parse("string", "number", "a")));
```

## Option

The `option` combinator allows you to specify that a field in a schema may be either an optional value or `null`. This is useful when working with JSON data that may contain `null` values for optional fields.

In the example below, we define a schema for an object with a required `a` field of type `string` and an optional `b` field of type `number`. We use the `option` combinator to specify that the `b` field may be either a `number` or `null`. We then use a codec created from this schema to decode some sample data and examine the results.

```ts
import * as S from "@fp-ts/schema/Schema";
import * as C from "@fp-ts/schema/Codec";
import { option } from "@fp-ts/schema/data/Option";
import * as DE from "@fp-ts/schema/DecodeError";
import * as O from "@fp-ts/data/Option";

const schema = S.struct({ a: S.string, b: option(S.number) });
const codec = C.codecFor(schema);

// success cases
expect(codec.decode({ a: "hello", b: 1 })).toEqual(
  C.success({ a: "hello", b: O.some(1) })
);
expect(codec.decode({ a: "hello", b: null })).toEqual(
  C.success({ a: "hello", b: O.none })
);

// failure cases
expect(codec.decode({ a: 1, b: 1 })).toEqual(
  C.failure(DE.key("a", [DE.type("string", 1)]))
); // wrong type for key "a"
expect(codec.decode({ a: "hello", b: "world" })).toEqual(
  C.failure(
    DE.key("b", [
      DE.member([DE.type("undefined", "world")]),
      DE.member([DE.equal(null, "world")]),
      DE.member([DE.type("number", "world")]),
    ])
  )
); // wrong type for key "b"
expect(codec.decode({ a: "hello" })).toEqual(
  C.failure(DE.key("b", [DE.missing]))
); // missing key "b"
```

## ReadonlySet

In the following section, we demonstrate how to use the `fromArray` combinator to decode a `ReadonlySet` from an array.

```ts
import * as S from "@fp-ts/schema/Schema";
import * as C from "@fp-ts/schema/Codec";
import { fromArray } from "@fp-ts/schema/data/ReadonlySet";
import * as DE from "@fp-ts/schema/DecodeError";

// define a schema for ReadonlySet of numbers
const schema = fromArray(S.number);

// create a codec based on the schema
const codec = C.codecFor(schema);

// test decoding a valid input
expect(codec.decode([1, 2, 3])).toEqual(C.success(new Set([1, 2, 3])));

// test decoding an invalid input with a wrong type for the third element
expect(codec.decode([1, 2, "a"])).toEqual(
  C.failure(DE.index(2, [DE.type("number", "a")]))
); // wrong type for values
```

## ReadonlyMap

In the following section, we demonstrate how to use the `fromEntries` combinator to create a `Codec` for a `ReadonlyMap` with specific key and value types.

```ts
import * as G from "@fp-ts/schema/Guard";
import { fromEntries } from "@fp-ts/schema/data/ReadonlyMap";
import * as C from "@fp-ts/schema/Codec";
import * as DE from "@fp-ts/schema/DecodeError";

// define the schema for a readonly map with number keys and string values
const schema = fromEntries(S.number, S.string);
// create a codec based on the schema
const codec = C.codecFor(schema);

// success cases
expect(
  codec.decode([
    [1, "a"],
    [2, "b"],
    [3, "c"],
  ])
).toEqual(
  C.success(
    new Map([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ])
  )
);

// failure cases
expect(
  codec.decode([
    ["a", 1],
    ["b", 2],
    ["c", 3],
  ])
).toEqual(
  C.failure(DE.index(0, [DE.index(0, [DE.type("number", "a")])])) // wrong type for keys
);
expect(
  codec.decode([
    [1, 2],
    [3, 4],
    [5, 6],
  ])
).toEqual(
  C.failure(DE.index(0, [DE.index(1, [DE.type("string", 2)])])) // wrong type for values
);
```

# Documentation

- [API Reference](https://fp-ts.github.io/schema/)

# License

The MIT License (MIT)
