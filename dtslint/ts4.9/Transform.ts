import { Brand } from "@effect/data/Brand";
import { pipe } from "@effect/data/Function";
import * as T from "@effect/schema/Transform";

declare const NumberFromString: T.Transform<string, number>

// ---------------------------------------------
// From
// ---------------------------------------------

// $ExpectType never
export type FromNever = T.From<typeof T.never>

// ---------------------------------------------
// To
// ---------------------------------------------

// $ExpectType never
export type ToNever = T.To<typeof T.never>

// ---------------------------------------------
// Primitives
// ---------------------------------------------

// $ExpectType Transform<void, void>
T.void;

// $ExpectType Transform<undefined, undefined>
T.undefined;

// $ExpectType Transform<string, string>
T.string;

// $ExpectType Transform<number, number>
T.number;

// $ExpectType Transform<boolean, boolean>
T.boolean;

// $ExpectType Transform<bigint, bigint>
T.bigint;

// $ExpectType Transform<symbol, symbol>
T.symbol;

// $ExpectType Transform<unknown, unknown>
T.unknown;

// $ExpectType Transform<any, any>
T.any;

// $ExpectType Transform<object, object>
T.object;

// ---------------------------------------------
// literals
// ---------------------------------------------

// $ExpectType Transform<null, null>
T.null;

// $ExpectType Transform<never, never>
T.literal();

// $ExpectType Transform<"a", "a">
T.literal("a");

// $ExpectType Transform<"a" | "b" | "c", "a" | "b" | "c">
T.literal("a", "b", "c");

// $ExpectType Transform<1, 1>
T.literal(1);

// $ExpectType Transform<2n, 2n>
T.literal(2n); // bigint literal

// $ExpectType Transform<true, true>
T.literal(true);

// ---------------------------------------------
// strings
// ---------------------------------------------

// $ExpectType Transform<string, string>
pipe(T.string, T.maxLength(5));

// $ExpectType Transform<string, string>
pipe(T.string, T.minLength(5));

// $ExpectType Transform<string, string>
pipe(T.string, T.length(5));

// $ExpectType Transform<string, string>
pipe(T.string, T.pattern(/a/));

// $ExpectType Transform<string, string>
pipe(T.string, T.startsWith('a'));

// $ExpectType Transform<string, string>
pipe(T.string, T.endsWith('a'));

// $ExpectType Transform<string, string>
pipe(T.string, T.includes('a'));

// $ExpectType Transform<number, number>
pipe(T.number, T.greaterThan(5));

// $ExpectType Transform<number, number>
pipe(T.number, T.greaterThanOrEqualTo(5));

// $ExpectType Transform<number, number>
pipe(T.number, T.lessThan(5));

// $ExpectType Transform<number, number>
pipe(T.number, T.lessThanOrEqualTo(5));

// $ExpectType Transform<number, number>
pipe(T.number, T.int());

// $ExpectType Transform<number, number>
pipe(T.number, T.nonNaN()); // not NaN

// $ExpectType Transform<number, number>
pipe(T.number, T.finite()); // value must be finite, not Infinity or -Infinity

// ---------------------------------------------
// Native enums
// ---------------------------------------------

enum Fruits {
  Apple,
  Banana,
}

// $ExpectType Transform<Fruits, Fruits>
T.enums(Fruits);

//
// Nullables
//

// $ExpectType Transform<string | null, string | null>
T.nullable(T.string)

// $ExpectType Transform<string | null, number | null>
T.nullable(NumberFromString)

// ---------------------------------------------
// Unions
// ---------------------------------------------

// $ExpectType Transform<string | number, string | number>
T.union(T.string, T.number);

// $ExpectType Transform<string | boolean, number | boolean>
T.union(T.boolean, NumberFromString);

// ---------------------------------------------
// keyof
// ---------------------------------------------

// $ExpectType Transform<"a" | "b", "a" | "b">
T.keyof(T.struct({ a: T.string,  b: NumberFromString }));

// ---------------------------------------------
// Tuples
// ---------------------------------------------

// $ExpectType Transform<readonly [string, number], readonly [string, number]>
T.tuple(T.string, T.number);

// $ExpectType Transform<readonly [string, string], readonly [string, number]>
T.tuple(T.string, NumberFromString);

// ---------------------------------------------
// rest
// ---------------------------------------------

// $ExpectType Transform<readonly [string, number, ...boolean[]], readonly [string, number, ...boolean[]]>
pipe(T.tuple(T.string, T.number), T.rest(T.boolean))

// $ExpectType Transform<readonly [string, string, ...string[]], readonly [string, number, ...number[]]>
pipe(T.tuple(T.string, NumberFromString), T.rest(NumberFromString))

// ---------------------------------------------
// element
// ---------------------------------------------

// $ExpectType Transform<readonly [string, number, boolean], readonly [string, number, boolean]>
pipe(T.tuple(T.string, T.number), T.element(T.boolean))

// $ExpectType Transform<readonly [string, string, string], readonly [string, number, number]>
pipe(T.tuple(T.string, NumberFromString), T.element(NumberFromString))

// ---------------------------------------------
// optionalElement
// ---------------------------------------------

// $ExpectType Transform<readonly [string, number, boolean?], readonly [string, number, boolean?]>
pipe(T.tuple(T.string, T.number), T.optionalElement(T.boolean))

// $ExpectType Transform<readonly [string, string, string?], readonly [string, number, number?]>
pipe(T.tuple(T.string, NumberFromString), T.optionalElement(NumberFromString))

// ---------------------------------------------
// Arrays
// ---------------------------------------------

// $ExpectType Transform<readonly number[], readonly number[]>
T.array(T.number);

// $ExpectType Transform<readonly string[], readonly number[]>
T.array(NumberFromString);

// $ExpectType Transform<readonly [number, ...number[]], readonly [number, ...number[]]>
T.nonEmptyArray(T.number);

// $ExpectType Transform<readonly [string, ...string[]], readonly [number, ...number[]]>
T.nonEmptyArray(NumberFromString);

// ---------------------------------------------
// Structs
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: number; }, { readonly a: string; readonly b: number; }>
T.struct({ a: T.string,  b: T.number });

// $ExpectType Transform<{ readonly a: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
const MyModel = T.struct({ a: T.string,  b: NumberFromString });

// $ExpectType { readonly a: string; readonly b: string; }
export type MyModelFrom = T.From<typeof MyModel>

// $ExpectType { readonly a: string; readonly b: number; }
export type MyModelTo = T.To<typeof MyModel>

// $ExpectType Transform<{ readonly a: never; }, { readonly a: never; }>
T.struct({ a: T.never })

// ---------------------------------------------
// optional
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: number; readonly c?: boolean; }, { readonly a: string; readonly b: number; readonly c?: boolean; }>
T.struct({ a: T.string, b: T.number, c: T.optional(T.boolean) });

// $ExpectType Transform<{ readonly a: string; readonly b: number; readonly c?: string; }, { readonly a: string; readonly b: number; readonly c?: number; }>
T.struct({ a: T.string, b: T.number, c: T.optional(NumberFromString) });

// piping
// $ExpectType Transform<{ readonly a?: string; }, { readonly a?: string; }>
T.struct({ a: pipe(T.string, T.optional) })

// $ExpectType Transform<{ readonly a?: never; }, { readonly a?: never; }>
 T.struct({ a: T.optional(T.never) })

// ---------------------------------------------
// optional().withDefault()
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: number; readonly c?: boolean; }, { readonly a: string; readonly b: number; readonly c: boolean; }>
T.struct({ a: T.string, b: T.number, c: T.optional(T.boolean).withDefault(() => false) });

// $ExpectType Transform<{ readonly a: string; readonly b: number; readonly c?: string; }, { readonly a: string; readonly b: number; readonly c: number; }>
T.struct({ a: T.string, b: T.number, c: T.optional(NumberFromString).withDefault(() => 0) });

// piping
// $ExpectType Transform<{ readonly a?: string; }, { readonly a: string; }>
T.struct({ a: pipe(T.string, T.optional).withDefault(() => '') })

// ---------------------------------------------
// optional().toOption()
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: number; readonly c?: boolean; }, { readonly a: string; readonly b: number; readonly c: Option<boolean>; }>
T.struct({ a: T.string, b: T.number, c: T.optional(T.boolean).toOption() });

// $ExpectType Transform<{ readonly a: string; readonly b: number; readonly c?: string; }, { readonly a: string; readonly b: number; readonly c: Option<number>; }>
T.struct({ a: T.string, b: T.number, c: T.optional(NumberFromString).toOption() });

// piping
// $ExpectType Transform<{ readonly a?: string; }, { readonly a: Option<string>; }>
T.struct({ a: pipe(T.string, T.optional).toOption() })

// ---------------------------------------------
// pick
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: number; }, { readonly a: string; readonly b: number; }>
pipe(T.struct({ a: T.string,  b: T.number, c: T.boolean }), T.pick('a', 'b'));

// $ExpectType Transform<{ readonly a: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
pipe(T.struct({ a: T.string,  b: NumberFromString, c: T.boolean }), T.pick('a', 'b'));

// ---------------------------------------------
// pick - optional
// ---------------------------------------------

// $ExpectType Transform<{ readonly a?: string; readonly b: number; }, { readonly a?: string; readonly b: number; }>
pipe(T.struct({ a: T.optional(T.string),  b: T.number, c: T.boolean }), T.pick('a', 'b'));

// $ExpectType Transform<{ readonly a?: string; readonly b: string; }, { readonly a?: string; readonly b: number; }>
pipe(T.struct({ a: T.optional(T.string),  b: NumberFromString, c: T.boolean }), T.pick('a', 'b'));

// $ExpectType Transform<{ readonly a?: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
pipe(T.struct({ a: T.optional(T.string).withDefault(() => ''),  b: NumberFromString, c: T.boolean }), T.pick('a', 'b'));

// ---------------------------------------------
// omit
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: number; }, { readonly a: string; readonly b: number; }>
pipe(T.struct({ a: T.string,  b: T.number, c: T.boolean }), T.omit('c'));

// $ExpectType Transform<{ readonly a: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
pipe(T.struct({ a: T.string,  b: NumberFromString, c: T.boolean }), T.omit('c'));

// ---------------------------------------------
// omit - optional
// ---------------------------------------------

// $ExpectType Transform<{ readonly a?: string; readonly b: number; }, { readonly a?: string; readonly b: number; }>
pipe(T.struct({ a: T.optional(T.string),  b: T.number, c: T.boolean }), T.omit('c'));

// $ExpectType Transform<{ readonly a?: string; readonly b: string; }, { readonly a?: string; readonly b: number; }>
pipe(T.struct({ a: T.optional(T.string),  b: NumberFromString, c: T.boolean }), T.omit('c'));

// $ExpectType Transform<{ readonly a?: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
pipe(T.struct({ a: T.optional(T.string).withDefault(() => ''),  b: NumberFromString, c: T.boolean }), T.omit('c'));

// ---------------------------------------------
// brand
// ---------------------------------------------

// $ExpectType BrandTransform<number, number & Brand<"Int">>
pipe(T.number, T.int(), T.brand('Int'))

// $ExpectType BrandTransform<string, number & Brand<"Int">>
pipe(NumberFromString, T.int(), T.brand('Int'))

// ---------------------------------------------
// Partial
// ---------------------------------------------

// $ExpectType Transform<{ readonly a?: string; readonly b?: number; }, { readonly a?: string; readonly b?: number; }>
T.partial(T.struct({ a: T.string,  b: T.number }));

// $ExpectType Transform<{ readonly a?: string; readonly b?: string; }, { readonly a?: string; readonly b?: number; }>
T.partial(T.struct({ a: T.string,  b: NumberFromString }));

// ---------------------------------------------
// Required
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: number; }, { readonly a: string; readonly b: number; }>
T.required(T.struct({ a: T.optional(T.string),  b: T.optional(T.number) }));

// $ExpectType Transform<{ readonly b: string; readonly a: string; readonly c: string; }, { readonly b: number; readonly a: string; readonly c: number; }>
T.required(T.struct({ a: T.optional(T.string),  b: NumberFromString, c: T.optional(NumberFromString) }));

// ---------------------------------------------
// Records
// ---------------------------------------------

// $ExpectType Transform<{ readonly [x: string]: string; }, { readonly [x: string]: string; }>
T.record(T.string, T.string)

// $ExpectType Transform<{ readonly [x: string]: string; }, { readonly [x: string]: number; }>
T.record(T.string, NumberFromString)

// $ExpectType Transform<{ readonly [x: string]: string; }, { readonly [x: string]: string; }>
T.record(pipe(T.string, T.minLength(2)), T.string)

// $ExpectType Transform<{ readonly a: string; readonly b: string; }, { readonly a: string; readonly b: string; }>
T.record(T.union(T.literal('a'), T.literal('b')), T.string)

// $ExpectType Transform<{ readonly [x: symbol]: string; }, { readonly [x: symbol]: string; }>
T.record(T.symbol, T.string)

// $ExpectType Transform<{ readonly [x: `a${string}`]: string; }, { readonly [x: `a${string}`]: string; }>
T.record(T.templateLiteral(T.literal('a'), T.string), T.string)

// ---------------------------------------------
// Extend
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: string; readonly c: string; }, { readonly a: string; readonly b: string; readonly c: string; }>
pipe(
  T.struct({ a: T.string, b: T.string }),
  T.extend(T.struct({ c: T.string })),
);

// dual
// $ExpectType Transform<{ readonly a: string; readonly b: string; readonly c: string; }, { readonly a: string; readonly b: string; readonly c: string; }>
T.extend(T.struct({ a: T.string, b: T.string }), T.struct({ c: T.string }));

// $ExpectType Transform<{ [x: string]: string; readonly a: string; readonly b: string; readonly c: string; }, { [x: string]: string; readonly a: string; readonly b: string; readonly c: string; }>
pipe(
  T.struct({ a: T.string, b: T.string }),
  T.extend(T.struct({ c: T.string })),
  T.extend(T.record(T.string, T.string))
);

// ---------------------------------------------
// lazy
// ---------------------------------------------

interface LazyTo1 {
  readonly a: number
  readonly as: ReadonlyArray<LazyTo1>
}
const lazy1: T.Transform<LazyTo1, LazyTo1> = T.lazy(() =>
  T.struct({
    a: T.number,
    as: T.array(lazy1)
  })
)

interface LazyFrom2 {
  readonly a: string
  readonly as: ReadonlyArray<LazyFrom2>
}
interface LazyTo2 {
  readonly a: number
  readonly as: ReadonlyArray<LazyTo2>
}
const lazy2: T.Transform<LazyFrom2, LazyTo2> = T.lazy(() =>
  T.struct({
    a: NumberFromString,
    as: T.array(lazy2)
  })
)

// ---------------------------------------------
// optionFromSelf
// ---------------------------------------------

// $ExpectType Transform<Option<number>, Option<number>>
T.optionFromSelf(T.number)

// $ExpectType Transform<Option<string>, Option<number>>
T.optionFromSelf(NumberFromString)

// ---------------------------------------------
// optionFromNullable
// ---------------------------------------------

// $ExpectType Transform<number | null, Option<number>>
T.optionFromNullable(T.number)

// $ExpectType Transform<string | null, Option<number>>
T.optionFromNullable(NumberFromString)

// ---------------------------------------------
// instanceOf
// ---------------------------------------------

class Test {
  constructor(readonly name: string) {}
}

// $ExpectType Transform<Test, Test>
T.instanceOf(Test);

// ---------------------------------------------
// Template literals
// ---------------------------------------------

// $ExpectType Transform<`a${string}`, `a${string}`>
T.templateLiteral(T.literal('a'), T.string)

// example from https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
const EmailLocaleIDs = T.literal("welcome_email", "email_heading")
const FooterLocaleIDs = T.literal("footer_title", "footer_sendoff")

// $ExpectType Transform<"welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id", "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id">
T.templateLiteral(T.union(EmailLocaleIDs, FooterLocaleIDs), T.literal("_id"))

// ---------------------------------------------
// attachPropertySignature
// ---------------------------------------------

// $ExpectType Transform<{ readonly radius: number; }, { readonly radius: number; readonly kind: "circle"; }>
pipe(T.struct({ radius: T.number }), T.attachPropertySignature("kind", "circle"))

// $ExpectType Transform<{ readonly radius: string; }, { readonly radius: number; readonly kind: "circle"; }>
pipe(T.struct({ radius: NumberFromString }), T.attachPropertySignature("kind", "circle"))

// ---------------------------------------------
// filter
// ---------------------------------------------

const predicateFilter1 = (u: unknown) => typeof u === 'string'
const FromFilter = T.union(T.string, T.number)

// $ExpectType Transform<string | number, string | number>
pipe(FromFilter, T.filter(predicateFilter1))

const FromRefinement = T.struct({ a: T.optional(T.string), b: T.optional(T.number) })

// $ExpectType Transform<{ readonly a?: string; readonly b?: number; }, { readonly a?: string; readonly b?: number; } & { readonly b: number; }>
pipe(FromRefinement, T.filter(T.is(T.struct({ b: T.number }))))

const LiteralFilter = T.literal('a', 'b')
const predicateFilter2 = (u: unknown): u is 'a' => typeof u === 'string' && u === 'a'

// $ExpectType Transform<"a" | "b", "a">
pipe(LiteralFilter, T.filter(predicateFilter2))

// $ExpectType Transform<"a" | "b", "a">
pipe(LiteralFilter, T.filter(T.is(T.literal('a'))))

// $ExpectType Transform<"a" | "b", never>
pipe(LiteralFilter, T.filter(T.is(T.literal('c'))))

declare const UnionFilter: T.Transform<{ readonly a: string } | { readonly b: string }, { readonly a: string } | { readonly b: string }>

// $ExpectType Transform<{ readonly a: string; } | { readonly b: string; }, ({ readonly a: string; } | { readonly b: string; }) & { readonly b: string; }>
pipe(UnionFilter, T.filter(T.is(T.struct({ b: T.string }))))

// $ExpectType Transform<number, number & Brand<"MyNumber">>
pipe(T.number, T.filter((n): n is number & Brand<"MyNumber"> => n > 0))
