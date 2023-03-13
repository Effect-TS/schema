import { pipe } from "@effect/data/Function";
import * as S from "@effect/schema/Schema";

//
// brand
//

// $ExpectType BrandSchema<number & Brand<"Int">>
pipe(S.number, S.int(), S.brand('Int'))

//
// Primitives
//

// $ExpectType Schema<void, void>
S.void;

// $ExpectType Schema<undefined, undefined>
S.undefined;

// $ExpectType Schema<string, string>
S.string;

// $ExpectType Schema<number, number>
S.number;

// $ExpectType Schema<boolean, boolean>
S.boolean;

// $ExpectType Schema<bigint, bigint>
S.bigint;

// $ExpectType Schema<symbol, symbol>
S.symbol;

// $ExpectType Schema<unknown, unknown>
S.unknown;

// $ExpectType Schema<any, any>
S.any;

// $ExpectType Schema<object, object>
S.object;

//
// literals
//

// $ExpectType Schema<null, null>
S.null;

// $ExpectType Schema<never, never>
S.literal();

// $ExpectType Schema<"a", "a">
S.literal("a");

// $ExpectType Schema<"a" | "b" | "c", "a" | "b" | "c">
S.literal("a", "b", "c");

// $ExpectType Schema<1, 1>
S.literal(1);

// $ExpectType Schema<2n, 2n>
S.literal(2n); // bigint literal

// $ExpectType Schema<true, true>
S.literal(true);

//
// strings
//

// $ExpectType Schema<string, string>
pipe(S.string, S.maxLength(5));

// $ExpectType Schema<string, string>
pipe(S.string, S.minLength(5));

// $ExpectType Schema<string, string>
pipe(S.string, S.length(5));

// $ExpectType Schema<string, string>
pipe(S.string, S.pattern(/a/));

// $ExpectType Schema<string, string>
pipe(S.string, S.startsWith('a'));

// $ExpectType Schema<string, string>
pipe(S.string, S.endsWith('a'));

// $ExpectType Schema<string, string>
pipe(S.string, S.includes('a'));

// $ExpectType Schema<number, number>
pipe(S.number, S.greaterThan(5));

// $ExpectType Schema<number, number>
pipe(S.number, S.greaterThanOrEqualTo(5));

// $ExpectType Schema<number, number>
pipe(S.number, S.lessThan(5));

// $ExpectType Schema<number, number>
pipe(S.number, S.lessThanOrEqualTo(5));

// $ExpectType Schema<number, number>
pipe(S.number, S.int());

// $ExpectType Schema<number, number>
pipe(S.number, S.nonNaN()); // not NaN

// $ExpectType Schema<number, number>
pipe(S.number, S.finite()); // value must be finite, not Infinity or -Infinity

//
// Native enums
//

enum Fruits {
  Apple,
  Banana,
}

// $ExpectType Schema<Fruits, Fruits>
S.enums(Fruits);

//
// Nullables
//

// $ExpectType Schema<string | null, string | null>
S.nullable(S.string)

//
// Unions
//

// $ExpectType Schema<string | number, string | number>
S.union(S.string, S.number);

//
// Tuples
//

// $ExpectType Schema<readonly [string, number], readonly [string, number]>
S.tuple(S.string, S.number);

// $ExpectType Schema<readonly [string, number, boolean], readonly [string, number, boolean]>
pipe(S.tuple(S.string, S.number), S.element(S.boolean))

// $ExpectType Schema<readonly [string, number, boolean?], readonly [string, number, boolean?]>
pipe(S.tuple(S.string, S.number), S.optionalElement(S.boolean))

// $ExpectType Schema<readonly [string, number, ...boolean[]], readonly [string, number, ...boolean[]]>
pipe(S.tuple(S.string, S.number), S.rest(S.boolean))

//
// Arrays
//

// $ExpectType Schema<readonly number[], readonly number[]>
S.array(S.number);

// $ExpectType Schema<readonly [number, ...number[]], readonly [number, ...number[]]>
S.nonEmptyArray(S.number);

//
// Structs
//

// $ExpectType Schema<{ readonly a: string; readonly b: number; }, { readonly a: string; readonly b: number; }>
const MyModel = S.struct({ a: S.string,  b: S.number });

// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c?: boolean; }, { readonly a: string; readonly b: number; readonly c?: boolean; }>
S.struct({ a: S.string, b: S.number, c: S.optional(S.boolean) });

// $ExpectType { readonly a: string; readonly b: number; }
export type MyModel = S.To<typeof MyModel>

// $ExpectType MyModel2
export interface MyModel2 extends S.To<typeof MyModel> {}

//
// Pick
//

// $ExpectType Schema<{ readonly a: string; }, { readonly a: string; }>
pipe(S.struct({ a: S.string,  b: S.number }), S.pick('a'));

//
// Omit
//

// $ExpectType Schema<{ readonly b: number; }, { readonly b: number; }>
pipe(S.struct({ a: S.string,  b: S.number }), S.omit('a'));

//
// Partial
//

// $ExpectType Schema<Partial<{ readonly a: string; readonly b: number; }>, Partial<{ readonly a: string; readonly b: number; }>>
S.partial(S.struct({ a: S.string,  b: S.number }));

//
// Records
//

// $ExpectType Schema<{ readonly [x: string]: string; }, { readonly [x: string]: string; }>
S.record(S.string, S.string)

// $ExpectType Schema<{ readonly [x: string]: string; }, { readonly [x: string]: string; }>
S.record(pipe(S.string, S.minLength(2)), S.string)

// $ExpectType Schema<{ readonly a: string; readonly b: string; }, { readonly a: string; readonly b: string; }>
S.record(S.union(S.literal('a'), S.literal('b')), S.string)

// $ExpectType Schema<{ readonly [x: symbol]: string; }, { readonly [x: symbol]: string; }>
S.record(S.symbol, S.string)

// $ExpectType Schema<{ readonly [x: `a${string}`]: string; }, { readonly [x: `a${string}`]: string; }>
S.record(S.templateLiteral(S.literal('a'), S.string), S.string)

//
// Extend
//

// $ExpectType Schema<{ [x: string]: string; readonly a: string; readonly b: string; readonly c: string; }, { [x: string]: string; readonly a: string; readonly b: string; readonly c: string; }>
pipe(
  S.struct({ a: S.string, b: S.string }),
  S.extend(S.struct({ c: S.string })), // <= you can add more fields
  S.extend(S.record(S.string, S.string)) // <= you can add more index signatures
);

//
// Option
//

// $ExpectType Schema<Option<number>, Option<number>>
S.optionFromSelf(S.number)

//
// instanceOf
//

class Test {
  constructor(readonly name: string) {}
}

// $ExpectType Schema<Test, Test>
S.instanceOf(Test);

//
// Template literals
//

// $ExpectType Schema<`a${string}`, `a${string}`>
S.templateLiteral(S.literal('a'), S.string)

// example from https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
const EmailLocaleIDs = S.literal("welcome_email", "email_heading")
const FooterLocaleIDs = S.literal("footer_title", "footer_sendoff")

// $ExpectType Schema<"welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id", "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id">
S.templateLiteral(S.union(EmailLocaleIDs, FooterLocaleIDs), S.literal("_id"))

//
// attachPropertySignature
//

// $ExpectType Schema<{ readonly radius: number; readonly kind: "circle"; }, { readonly radius: number; readonly kind: "circle"; }>
pipe(S.struct({ radius: S.number }), S.attachPropertySignature("kind", "circle"))
