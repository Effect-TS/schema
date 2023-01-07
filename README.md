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

Once you have installed the library, you can import the necessary types and functions from the `@fp-ts/schema/Schema` module.

```ts
import * as S from "@fp-ts/schema/Schema";
```

## Defining a schema

To define a `Schema`, you can use the provided `struct` function to define a new `Schema` that describes an object with a fixed set of properties. Each property of the object is described by a `Schema`, which specifies the data type and validation rules for that property.

For example, consider the following `Schema` that describes a person object with a `name` property of type `string` and an `age` property of type `number`:

```ts
const Person = S.struct({
  name: S.string,
  age: S.number,
});
```

You can also use the `union` function to define a `Schema` that describes a value that can be one of a fixed set of types. For example, the following `Schema` describes a value that can be either a `string` or a `number`:

```ts
const StringOrNumber = S.union(S.string, S.number);
```

In addition to the provided `struct` and `union` functions, `@fp-ts/schema` also provides a number of other functions for defining `Schema`s, including functions for defining arrays, tuples, and records.

## Extracting the inferred type

Once you have defined a `Schema`, you can use the `Infer` type to extract the inferred type of the data described by the `Schema`.

For example, given the `Person` `Schema` defined above, you can extract the inferred type of a `Person` object as follows:

```ts
interface Person extends S.Infer<typeof Person> {}
/*
interface Person {
  readonly name: string;
  readonly age: number;
}
*/
```

## Decoding

To use the `Schema` defined above to decode a value from `unknown`, you can use the `decode` function:

```ts
import * as DE from "@fp-ts/schema/DecodeError";
import * as D from "@fp-ts/schema/Decoder";

const decodePerson = D.decode(Person);

expect(decodePerson({ name: "Alice", age: 30 })).toEqual(
  DE.success({ name: "Alice", age: 30 })
);
expect(decodePerson(null)).toEqual(
  DE.failure(DE.notType("{ readonly [x: string]: unknown }", null))
);
```

The `decodePerson` function returns a value of type `DecodeResult<A>`, which is a type alias for `These<NonEmptyReadonlyArray<DecodeError>, A>`, where `NonEmptyReadonlyArray<DecodeError>` represents a list of errors that occurred during the decoding process and `A` is the inferred type of the data described by the `Schema`. A successful decode will result in a `Right` or `Both` value, containing the decoded data. A `Right` value indicates that the decode was successful and no errors occurred. A `Both` value represents a successful decode that also includes some non-fatal decode errors (warnings). It is important to note that a `Both` value still represents a successful decode, as the data was able to be successfully decoded despite the presence of warnings. In the case of a failed decode, the result will be a `Left` value containing a list of `DecodeError`s.

The `decodeOrThrow` function is used to decode a value and throw an error if the decoding fails.
It is useful when you want to ensure that the value being decoded is in the correct format, and want to throw an error if it is not.

```ts
D.decodeOrThrow(Person)({});
/*
1 error(s) found
└─ key "name"
   └─ is missing
*/
```

### Excess properties

When using a `Schema` to decode a value, any properties that are not specified in the `Schema` will result in a decoding error. This is because the `Schema` is expecting a specific shape for the decoded value, and any excess properties do not conform to that shape.

However, you can use the `isUnexpectedAllowed` option to allow excess properties while decoding, and instead of a fatal error, it will return a warning and strip away the excess properties. This can be useful in cases where you want to be permissive in the shape of the decoded value, but still want to catch any potential errors or unexpected values.

Here's an example of how you might use `isUnexpectedAllowed`:

```ts
const Person = S.struct({
  name: S.string,
  age: S.number,
});

// This will succeed and return a value with no warnings
const result = D.decode(Person)(
  {
    name: "Alice",
    age: 30,
  },
  { isUnexpectedAllowed: true }
);

// This will succeed, but return a warning about the excess property "email"
console.log(
  "%o",
  D.decode(Person)(
    {
      name: "Bob",
      age: 40,
      email: "bob@example.com",
    },
    { isUnexpectedAllowed: true }
  )
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

### All errors

The `allErrors` option is a feature that allows you to receive all decoding errors when attempting to decode a value using a schema. By default, only the first error is returned, but by setting the `allErrors` option to `true`, you can receive all errors that occurred during the decoding process. This can be useful for debugging or for providing more comprehensive error messages to the user.

Here's an example of how you might use `allErrors`:

```ts
const Person = S.struct({
  name: S.string,
  age: S.number,
});

console.log(
  "%o",
  D.decode(Person)(
    {
      name: "Bob",
      age: "abc",
      email: "bob@example.com",
    },
    { allErrors: true }
  )
);
/*
{
  _tag: 'Left',
  left: [
    {
      _tag: 'Key',
      key: 'age',
      errors: [
        { _tag: 'Type', expected: 'number', actual: 'abc' },
        [length]: 1
      ]
    },
    {
      _tag: 'Key',
      key: 'email',
      errors: [
        { _tag: 'Unexpected', actual: 'bob@example.com' },
        [length]: 1
      ]
    },
    [length]: 2
  ]
}
*/
```

### Sensitive informations

You can use the `sensitive` combinator for storing sensitive information that you do not want to be visible in decode errors.

Here is an example of using the `sensitive` combinator to store a sensitive password:

```ts
import * as S from "@fp-ts/schema/Schema";
import * as D from "@fp-ts/schema/Decoder";
import * as DE from "@fp-ts/schema/DecodeError";

// define a schema for a password with a minimum length of 8 characters
const passwordSchema = pipe(S.string, S.minLength(8));

// use the `sensitive` combinator to create a schema for a sensitive password
const sensitivePasswordSchema = S.sensitive(passwordSchema);

// try to decode a password that is too short
const result = D.decode(sensitivePasswordSchema)("pwd123");
if (DE.isFailure(result)) {
  // the decode error will not show the actual value of the password
  console.log(result.left); // "********" did not satisfy refinement({"minLength":8})
}
```

Remember that using the `sensitive` combinator will not actually prevent sensitive data from being logged, traced, or encoded. It is only intended to mask the sensitive data in decode errors. It is important to handle sensitive data with care and to use appropriate security measures to protect it.

## Encoding

To use the `Schema` defined above to encode a value to `unknown`, you can use the `encode` function:

```ts
import * as DE from "@fp-ts/schema/DecodeError";
import * as E from "@fp-ts/schema/Encoder";

expect(E.encode(Person)({ name: "Alice", age: 30 })).toEqual(
  DE.success({
    name: "Alice",
    age: 30,
  })
);
```

## Formatting errors

To format errors when a `decode` or an `encode` function fails, you can use the `format` function from the `@fp-ts/schema/formatter/Tree` module.

```ts
import { format } from "@fp-ts/schema/formatter/Tree";

const result = D.decode(Person)({});
if (DE.isFailure(result)) {
  console.log(format(result.left));
}
/*
1 error(s) found
└─ key "name"
   └─ is missing
*/
```

**Note**. In the future, additional formatting functions will be available in the `@fp-ts/schema` library.

## Assertions

The `is` function provided by the `@fp-ts/schema/Guard` module represents a way of verifying that a value conforms to a given `Schema`. `is` is a refinement that takes a value of type `unknown` as an argument and returns a `boolean` indicating whether or not the value conforms to the `Schema`.

```ts
import * as G from "@fp-ts/schema/Guard";

// const isPerson: (u: unknown) => u is Person
const isPerson = G.is(Person);

expect(isPerson({ name: "Alice", age: 30 })).toEqual(true);
expect(isPerson(null)).toEqual(false);
```

The `asserts` function takes a `Schema` and an optional error message as arguments, and returns a function that takes an input value and checks if it matches the schema. If it does not match the schema, it throws an error with the specified message.

```ts
import * as G from "@fp-ts/schema/Guard";

// const assertsPerson: (input: unknown) => asserts input is Person
const assertsPerson = G.asserts(personSchema);

// this will throw an error with the message "Assertion failed"
assertsPerson({ name: "Alice", age: "30" });

// this will not throw an error
assertsPerson({ name: "Alice", age: 30 });
```

## [fast-check](https://github.com/dubzzz/fast-check) arbitraries

**Note**. The Arbitrary module will be extracted into a separate package in the near future.

The `arbitrary` function provided by the `@fp-ts/schema/Arbitrary` module represents a way of generating random values that conform to a given `Schema`. This can be useful for testing purposes, as it allows you to generate random test data that is guaranteed to be valid according to the `Schema`.

```ts
import * as A from "@fp-ts/schema/Arbitrary";
import * as fc from "fast-check";

const PersonArbitrary = A.arbitrary(Person)(fc);

console.log(fc.sample(PersonArbitrary, 2));
/*
[
{ name: '!U?z/X', age: -2.5223372357846707e-44 },
{ name: 'valukeypro', age: -1.401298464324817e-45 }
]
*/
```

## Pretty print

**Note**. The Pretty module will be extracted into a separate package in the near future.

The `pretty` function provided by the `@fp-ts/schema/Pretty` module represents a way of pretty-printing values that conform to a given `Schema`.

You can use the `pretty` function to create a human-readable string representation of a value that conforms to a `Schema`. This can be useful for debugging or logging purposes, as it allows you to easily inspect the structure and data types of the value.

```ts
import * as P from "@fp-ts/schema/Pretty";

const PersonPretty = P.pretty(Person);

expect(PersonPretty({ name: "Alice", age: 30 })).toEqual(
  `{ "name": "Alice", "age": 30 }`
);
```

# Understanding Schemas

A schema is a description of a data structure that can be used to generate various artifacts from a single declaration.

From a technical point of view a schema is just a typed wrapper of an `AST` value:

```ts
interface Schema<in out A> {
  readonly ast: AST;
}
```

The `AST` type represents a tiny portion of the TypeScript AST, roughly speaking the part describing ADTs (algebraic data types),
i.e. products (like structs and tuples) and unions.

This means that you can define your own schema constructors / combinators as long as you are able to manipulate the `AST` value accordingly, let's see an example.

Say we want to define a `pair` schema constructor, which takes a `Schema<A>` as input and returns a `Schema<readonly [A, A]>` as output.

First of all we need to define the signature of `pair`

```ts
import * as S from "@fp-ts/schema/Schema";

declare const pair: <A>(schema: S.Schema<A>) => S.Schema<readonly [A, A]>;
```

Then we can implement the body using the APIs exported by the `@fp-ts/schema/AST` module

```ts
import * as S from "@fp-ts/schema/Schema";
import * as AST from "@fp-ts/schema/AST";
import * as O from "@fp-ts/data/Option";

const pair = <A>(schema: S.Schema<A>): S.Schema<readonly [A, A]> => {
  const element = AST.element(
    schema.ast, // <= the element type
    false // <= is optional?
  );
  const tuple = AST.tuple(
    [element, element], // <= elements definitions
    O.none, // <= rest element
    true // <= is readonly?
  );
  return S.make(tuple); // <= wrap the AST value in a Schema
};
```

The goal of this example was showing the low-level APIs of the `AST` module, but the same result can
be achieved using the much more handy APIs of the `Schema` module:

```ts
const pair = <A>(schema: S.Schema<A>): S.Schema<readonly [A, A]> =>
  S.tuple(schema, schema);
```

Please note that the `S.tuple` API itself is nothing special and can be defined in userland:

```ts
export const tuple = <Elements extends ReadonlyArray<Schema<any>>>(
  ...elements: Elements
): Schema<{ readonly [K in keyof Elements]: Infer<Elements[K]> }> =>
  makeSchema(
    AST.tuple(
      elements.map((schema) => AST.element(schema.ast, false)),
      O.none,
      true
    )
  );
```

# Basic usage

## Primitives

```ts
import * as S from "@fp-ts/schema/Schema";

// primitive values
S.string;
S.number;
S.bigint;
S.boolean;
S.symbol;
S.object;
S.json;

// empty types
S.undefined;
S.void; // accepts undefined

// catch-all types
// allows any value
S.any;
S.unknown;

// never type
// allows no values
S.never;
```

## Literals

```ts
S.null; // same as S.literal(null)
S.literal("a");
S.literal("a", "b", "c"); // union of literals
S.literal(1);
S.literal(2n); // bigint literal
S.literal(true);
```

## Template literals

The `templateLiteral` combinator allows you to create a schema for a TypeScript template literal type.

```ts
// $ExpectType Schema<`a${string}`>
S.templateLiteral(S.literal("a"), S.string);

// example from https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
const EmailLocaleIDs = S.literal("welcome_email", "email_heading");
const FooterLocaleIDs = S.literal("footer_title", "footer_sendoff");

// $ExpectType Schema<"welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id">
S.templateLiteral(S.union(EmailLocaleIDs, FooterLocaleIDs), S.literal("_id"));
```

## Filters

**Note**. Filters don't change the `Schema` type.

### Strings

```ts
pipe(S.string, S.maxLength(5));
pipe(S.string, S.minLength(5));
pipe(S.string, S.length(5));
pipe(S.string, S.regex(regex));
pipe(S.string, S.startsWith(string));
pipe(S.string, S.endsWith(string));
pipe(S.string, S.includes(searchString));
```

### Numbers

```ts
pipe(S.number, S.greaterThan(5));
pipe(S.number, S.greaterThanOrEqualTo(5));
pipe(S.number, S.lessThan(5));
pipe(S.number, S.lessThanOrEqualTo(5));

pipe(S.number, S.int); // value must be an integer

pipe(S.number, S.nonNaN); // not NaN
pipe(S.number, S.finite); // value must be finite, not Infinity or -Infinity
```

## Native enums

```ts
enum Fruits {
  Apple,
  Banana,
}

// $ExpectType Schema<Fruits>
S.enums(Fruits);
```

## Nullables

```ts
// $ExpectType Schema<string | null>
S.nullable(S.string);
```

## Unions

```ts
// $ExpectType Schema<string | number>
S.union(S.string, S.number);
```

## Tuples

```ts
// $ExpectType Schema<readonly [string, number]>
S.tuple(S.string, S.number);
```

Append a required element

```ts
// $ExpectType Schema<readonly [string, number, boolean]>
pipe(S.tuple(S.string, S.number), S.element(S.boolean));
```

Append an optional element

```ts
// $ExpectType Schema<readonly [string, number, boolean?]>
pipe(S.tuple(S.string, S.number), S.optionalElement(S.boolean));
```

Append a rest element

```ts
// $ExpectType Schema<readonly [string, number, ...boolean[]]>
pipe(S.tuple(S.string, S.number), S.rest(S.boolean));
```

## Arrays

```ts
// $ExpectType Schema<readonly number[]>
S.array(S.number);
```

Non empty arrays

```ts
// $ExpectType Schema<readonly [number, ...number[]]>
S.nonEmptyArray(S.number);
```

## Structs

```ts
// $ExpectType Schema<{ readonly a: string; readonly b: number; }>
S.struct({ a: S.string, b: S.number });
```

Optional fields

```ts
// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c?: boolean; }>
S.struct({ a: S.string, b: S.number, c: S.optional(S.boolean) });
```

## Pick

```ts
// $ExpectType Schema<{ readonly a: string; }>
pipe(S.struct({ a: S.string, b: S.number }), C.pick("a"));
```

## Omit

```ts
// $ExpectType Schema<{ readonly b: number; }>
pipe(S.struct({ a: S.string, b: S.number }), C.omit("a"));
```

## Partial

```ts
// $ExpectType Schema<Partial<{ readonly a: string; readonly b: number; }>>
S.partial(S.struct({ a: S.string, b: S.number }));
```

## Records

String keys

```ts
// $ExpectType Schema<{ readonly [x: string]: string; }>
S.record(S.string, S.string);

// $ExpectType Schema<{ readonly a: string; readonly b: string; }>
S.record(S.union(S.literal("a"), S.literal("b")), S.string);
```

Keys refinements

```ts
// $ExpectType Schema<{ readonly [x: string]: string; }>
S.record(pipe(S.string, S.minLength(2)), S.string);
```

Symbol keys

```ts
// $ExpectType Schema<{ readonly [x: symbol]: string; }>
S.record(C.symbol, S.string);
```

Template literal keys

```ts
// $ExpectType Schema<{ readonly [x: `a${string}`]: string; }>
S.record(S.templateLiteral(S.literal("a"), S.string), S.string);
```

## Extend

The `extend` combinator allows you to add additional fields or index signatures to an existing `Schema` or `Schema`.

```ts
// $ExpectType Schema<{ [x: string]: string; readonly a: string; readonly b: string; readonly c: boolean; }>
pipe(
  S.struct({ a: S.string, b: S.string }),
  S.extend(S.struct({ c: S.boolean })), // <= you can add more fields
  S.extend(S.record(S.string, S.string)) // <= you can add index signatures
);
```

## InstanceOf

In the following section, we demonstrate how to use the `instanceOf` combinator to create a `Schema` for a class instance.

```ts
class Test {
  constructor(readonly name: string) {}
}

// $ExpectType Schema<Test>
pipe(S.object, S.instanceOf(Test));
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
import type { DecodeResult } from "@fp-ts/schema/Decoder";
import * as S from "@fp-ts/schema/Schema";

// define a schema for the string type
const stringSchema: S.Schema<string> = S.string;

// define a schema for the boolean type
const booleanSchema: S.Schema<boolean> = S.boolean;

// define a function that converts a string into a boolean
const f = (s: string): DecodeResult<boolean> =>
  s === "true"
    ? DE.success(true)
    : s === "false"
    ? DE.success(false)
    : DE.failure(DE.transform("string", "boolean", s));

// define a function that converts a boolean into a string
const g = (b: boolean): DecodeResult<string> => DE.success(String(b));

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
import { parseNumber } from "@fp-ts/schema/data/parser";
import * as D from "@fp-ts/schema/Decoder";
import * as DE from "@fp-ts/schema/DecodeError";

const schema = parseNumber(S.string); // converts string schema to number schema
const decode = D.decode(schema);

// success cases
expect(decode("1")).toEqual(DE.success(1));
expect(decode("-1")).toEqual(DE.success(-1));
expect(decode("1.5")).toEqual(DE.success(1.5));
expect(decode("NaN")).toEqual(DE.success(NaN));
expect(decode("Infinity")).toEqual(DE.success(Infinity));
expect(decode("-Infinity")).toEqual(DE.success(-Infinity));

// failure cases
expect(decode("a")).toEqual(DE.failure(DE.parse("string", "number", "a")));
```

## Option

The `option` combinator allows you to specify that a field in a schema may be either an optional value or `null`. This is useful when working with JSON data that may contain `null` values for optional fields.

In the example below, we define a schema for an object with a required `a` field of type `string` and an optional `b` field of type `number`. We use the `option` combinator to specify that the `b` field may be either a `number` or `null`.

```ts
import * as S from "@fp-ts/schema/Schema";
import * as D from "@fp-ts/schema/Decoder";
import * as DE from "@fp-ts/schema/DecodeError";
import * as O from "@fp-ts/data/Option";

const schema = S.struct({ a: S.string, b: S.option(S.number) });
const decode = D.decode(schema);

// success cases
expect(decode({ a: "hello", b: 1 })).toEqual(
  DE.success({ a: "hello", b: O.some(1) })
);
expect(decode({ a: "hello", b: null })).toEqual(
  DE.success({ a: "hello", b: O.none })
);

// failure cases
expect(decode({ a: 1, b: 1 })).toEqual(
  DE.failure(DE.key("a", [DE.type("string", 1)]))
); // wrong type for key "a"
expect(decode({ a: "hello", b: "world" })).toEqual(
  DE.failure(
    DE.key("b", [
      DE.member([DE.type("undefined", "world")]),
      DE.member([DE.equal(null, "world")]),
      DE.member([DE.type("number", "world")]),
    ])
  )
); // wrong type for key "b"
expect(decode({ a: "hello" })).toEqual(DE.failure(DE.key("b", [DE.missing]))); // missing key "b"
```

## ReadonlySet

In the following section, we demonstrate how to use the `fromValues` combinator to decode a `ReadonlySet` from an array of values.

```ts
import * as S from "@fp-ts/schema/Schema";
import { fromValues } from "@fp-ts/schema/data/ReadonlySet";
import * as D from "@fp-ts/schema/Decoder";
import * as DE from "@fp-ts/schema/DecodeError";

// define a schema for ReadonlySet of numbers
const schema = fromValues(S.number);
const decode = D.decode(schema);

// test decoding a valid input
expect(decode([1, 2, 3])).toEqual(DE.success(new Set([1, 2, 3])));

// test decoding an invalid input with a wrong type for the third element
expect(decode([1, 2, "a"])).toEqual(
  DE.failure(DE.index(2, [DE.type("number", "a")]))
); // wrong type for values
```

## ReadonlyMap

In the following section, we demonstrate how to use the `fromEntries` combinator to decode a `ReadonlyMap` from an array of entries.

```ts
import * as G from "@fp-ts/schema/Guard";
import { fromEntries } from "@fp-ts/schema/data/ReadonlyMap";
import * as D from "@fp-ts/schema/Decoder";
import * as DE from "@fp-ts/schema/DecodeError";

// define the schema for a readonly map with number keys and string values
const schema = fromEntries(S.number, S.string);
const decode = D.decode(schema);

// success cases
expect(
  decode([
    [1, "a"],
    [2, "b"],
    [3, "c"],
  ])
).toEqual(
  DE.success(
    new Map([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ])
  )
);

// failure cases
expect(
  decode([
    ["a", 1],
    ["b", 2],
    ["c", 3],
  ])
).toEqual(
  DE.failure(DE.index(0, [DE.index(0, [DE.type("number", "a")])])) // wrong type for keys
);
expect(
  decode([
    [1, 2],
    [3, 4],
    [5, 6],
  ])
).toEqual(
  DE.failure(DE.index(0, [DE.index(1, [DE.type("string", 2)])])) // wrong type for values
);
```

# Documentation

- [API Reference](https://fp-ts.github.io/schema/)

# License

The MIT License (MIT)
