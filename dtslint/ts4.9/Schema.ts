import * as S from "@effect/schema/Schema";

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
