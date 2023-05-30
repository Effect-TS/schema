import { pipe } from "@effect/data/Function";
import * as S from "@effect/schema/Schema";

// ---------------------------------------------
// To
// ---------------------------------------------

// $ExpectType never
export type ToNever = S.To<typeof S.never>

// ---------------------------------------------
// Primitives
// ---------------------------------------------

// $ExpectType Schema<void>
S.void;

// $ExpectType Schema<undefined>
S.undefined;

// $ExpectType Schema<string>
S.string;

// $ExpectType Schema<number>
S.number;

// $ExpectType Schema<boolean>
S.boolean;

// $ExpectType Schema<bigint>
S.bigint;

// $ExpectType Schema<symbol>
S.symbol;

// $ExpectType Schema<unknown>
S.unknown;

// $ExpectType Schema<any>
S.any;

// $ExpectType Schema<object>
S.object;

// ---------------------------------------------
// literals
// ---------------------------------------------

// $ExpectType Schema<null>
S.null;

// $ExpectType Schema<never>
S.literal();

// $ExpectType Schema<"a">
S.literal("a");

// $ExpectType Schema<"a" | "b" | "c">
S.literal("a", "b", "c");

// $ExpectType Schema<1>
S.literal(1);

// $ExpectType Schema<2n>
S.literal(2n); // bigint literal

// $ExpectType Schema<true>
S.literal(true);

// ---------------------------------------------
// Native enums
// ---------------------------------------------

enum Fruits {
  Apple,
  Banana,
}

// $ExpectType Schema<Fruits>
S.enums(Fruits);

// ---------------------------------------------
// instanceOf
// ---------------------------------------------

class Test {
  constructor(readonly name: string) {}
}

// $ExpectType Schema<Test>
S.instanceOf(Test);

// ---------------------------------------------
// Unions
// ---------------------------------------------

// $ExpectType Schema<string | number>
S.union(S.string, S.number);

// ---------------------------------------------
// Template literals
// ---------------------------------------------

// $ExpectType Schema<`a${string}`>
S.templateLiteral(S.literal('a'), S.string)

// example from https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
const EmailLocaleIDs = S.literal("welcome_email", "email_heading")
const FooterLocaleIDs = S.literal("footer_title", "footer_sendoff")

// $ExpectType Schema<"welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id">
S.templateLiteral(S.union(EmailLocaleIDs, FooterLocaleIDs), S.literal("_id"))

// ---------------------------------------------
// Records
// ---------------------------------------------

// $ExpectType Schema<{ readonly [x: string]: string; }>
S.record(S.string, S.string)

// $ExpectType Schema<{ readonly [x: string]: string; }>
S.record(pipe(S.string, S.minLength(2)), S.string)

// $ExpectType Schema<{ readonly a: string; readonly b: string; }>
S.record(S.union(S.literal('a'), S.literal('b')), S.string)

// $ExpectType Schema<{ readonly [x: symbol]: string; }>
S.record(S.symbol, S.string)

// $ExpectType Schema<{ readonly [x: `a${string}`]: string; }>
S.record(S.templateLiteral(S.literal('a'), S.string), S.string)

// ---------------------------------------------
// strings
// ---------------------------------------------

// $ExpectType Schema<string>
pipe(S.string, S.maxLength(5));

// $ExpectType Schema<string>
pipe(S.string, S.minLength(5));

// $ExpectType Schema<string>
pipe(S.string, S.length(5));

// $ExpectType Schema<string>
pipe(S.string, S.pattern(/a/));

// $ExpectType Schema<string>
pipe(S.string, S.startsWith('a'));

// $ExpectType Schema<string>
pipe(S.string, S.endsWith('a'));

// $ExpectType Schema<string>
pipe(S.string, S.includes('a'));

// $ExpectType Schema<number>
pipe(S.number, S.greaterThan(5));

// $ExpectType Schema<number>
pipe(S.number, S.greaterThanOrEqualTo(5));

// $ExpectType Schema<number>
pipe(S.number, S.lessThan(5));

// $ExpectType Schema<number>
pipe(S.number, S.lessThanOrEqualTo(5));

// $ExpectType Schema<number>
pipe(S.number, S.int());

// $ExpectType Schema<number>
pipe(S.number, S.nonNaN()); // not NaN

// $ExpectType Schema<number>
pipe(S.number, S.finite()); // value must be finite, not Infinity or -Infinity

// ---------------------------------------------
// nullable
// ---------------------------------------------

// $ExpectType Schema<string | null>
S.nullable(S.string)

// ---------------------------------------------
// keyof
// ---------------------------------------------

// $ExpectType Schema<"a" | "b">
S.keyof(S.struct({ a: S.string,  b: S.number }));

// ---------------------------------------------
// Tuples
// ---------------------------------------------

// $ExpectType Schema<readonly [string, number]>
S.tuple(S.string, S.number);

// ---------------------------------------------
// rest
// ---------------------------------------------

// $ExpectType Schema<readonly [string, number, ...boolean[]]>
pipe(S.tuple(S.string, S.number), S.rest(S.boolean))

// ---------------------------------------------
// element
// ---------------------------------------------

// $ExpectType Schema<readonly [string, number, boolean]>
pipe(S.tuple(S.string, S.number), S.element(S.boolean))

// ---------------------------------------------
// optionalElement
// ---------------------------------------------

// $ExpectType Schema<readonly [string, number, boolean?]>
pipe(S.tuple(S.string, S.number), S.optionalElement(S.boolean))

// ---------------------------------------------
// arrays
// ---------------------------------------------

// $ExpectType Schema<readonly number[]>
S.array(S.number);

// $ExpectType Schema<readonly [number, ...number[]]>
S.nonEmptyArray(S.number);

// ---------------------------------------------
// Structs
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; }>
S.struct({ a: S.string,  b: S.number });

// $ExpectType Schema<{ readonly a: never; }>
S.struct({ a: S.never })

// ---------------------------------------------
// optional
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c?: boolean; }>
S.struct({ a: S.string, b: S.number, c: S.optional(S.boolean) });

// piping
// $ExpectType Schema<{ readonly a?: string; }>
S.struct({ a: pipe(S.string, S.optional) })

// $ExpectType Schema<{ readonly a?: never; }>
S.struct({ a: S.optional(S.never) })

// ---------------------------------------------
// pick
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; }>
pipe(S.struct({ a: S.string,  b: S.number, c: S.boolean }), S.pick('a', 'b'));

// ---------------------------------------------
// pick - optional
// ---------------------------------------------

// $ExpectType Schema<{ readonly a?: string; readonly b: number; }>
pipe(S.struct({ a: S.optional(S.string),  b: S.number, c: S.boolean }), S.pick('a', 'b'));

// ---------------------------------------------
// omit
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; }>
pipe(S.struct({ a: S.string,  b: S.number, c: S.boolean }), S.omit('c'));

// ---------------------------------------------
// omit - optional
// ---------------------------------------------

// $ExpectType Schema<{ readonly a?: string; readonly b: number; }>
pipe(S.struct({ a: S.optional(S.string),  b: S.number, c: S.boolean }), S.omit('c'));

// ---------------------------------------------
// brand
// ---------------------------------------------

// $ExpectType BrandSchema<number & Brand<"Int">>
pipe(S.number, S.int(), S.brand('Int'))

// ---------------------------------------------
// partial
// ---------------------------------------------

// $ExpectType Schema<{ readonly a?: string; readonly b?: number; }>
S.partial(S.struct({ a: S.string,  b: S.number }));

// ---------------------------------------------
// required
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; }>
S.required(S.struct({ a: S.optional(S.string),  b: S.optional(S.number) }));

// ---------------------------------------------
// extend
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: string; readonly c: string; }>
pipe(
  S.struct({ a: S.string, b: S.string }),
  S.extend(S.struct({ c: S.string })),
);

// dual
// $ExpectType Schema<{ readonly a: string; readonly b: string; readonly c: string; }>
S.extend(S.struct({ a: S.string, b: S.string }), S.struct({ c: S.string }));

// $ExpectType Schema<{ readonly [x: string]: string; readonly a: string; readonly b: string; readonly c: string; }>
pipe(
  S.struct({ a: S.string, b: S.string }),
  S.extend(S.struct({ c: S.string })),
  S.extend(S.record(S.string, S.string))
);

// ---------------------------------------------
// option
// ---------------------------------------------

// $ExpectType Schema<Option<number>>
S.option(S.number)
