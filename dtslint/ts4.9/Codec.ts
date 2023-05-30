import { Brand } from "@effect/data/Brand";
import { pipe } from "@effect/data/Function";
import * as C from "@effect/schema/Codec";
import * as S from "@effect/schema/Schema";

// ---------------------------------------------
// From
// ---------------------------------------------

// $ExpectType never
export type FromNever = C.From<typeof S.never>

// ---------------------------------------------
// To
// ---------------------------------------------

// $ExpectType never
export type ToNever = C.To<typeof S.never>

// ---------------------------------------------
// strings
// ---------------------------------------------

// $ExpectType Codec<string, string>
pipe(S.string, C.filter(S.maxLength(5)));

// $ExpectType Codec<string, string>
pipe(S.string, C.filter(S.minLength(5)));

// $ExpectType Codec<string, string>
pipe(S.string, C.filter(S.length(5)));

// $ExpectType Codec<string, string>
pipe(S.string, C.filter(S.pattern(/a/)));

// $ExpectType Codec<string, string>
pipe(S.string, C.filter(S.startsWith('a')));

// $ExpectType Codec<string, string>
pipe(S.string, C.filter(S.endsWith('a')));

// $ExpectType Codec<string, string>
pipe(S.string, C.filter(S.includes('a')));

// $ExpectType Codec<number, number>
pipe(S.number, C.filter(S.greaterThan(5)));

// $ExpectType Codec<number, number>
pipe(S.number, C.filter(S.greaterThanOrEqualTo(5)));

// $ExpectType Codec<number, number>
pipe(S.number, C.filter(S.lessThan(5)));

// $ExpectType Codec<number, number>
pipe(S.number, C.filter(S.lessThanOrEqualTo(5)));

// $ExpectType Codec<number, number>
pipe(S.number, C.filter(S.int()));

// $ExpectType Codec<number, number>
pipe(S.number, C.filter(S.nonNaN())); // not NaN

// $ExpectType Codec<number, number>
pipe(S.number, C.filter(S.finite())); // value must be finite, not Infinity or -Infinity

// ---------------------------------------------
// nullable
// ---------------------------------------------

// $ExpectType Codec<string | null, number | null>
C.nullable(C.NumberFromString)

// ---------------------------------------------
// Unions
// ---------------------------------------------

// $ExpectType Codec<string | boolean, number | boolean>
C.union(S.boolean, C.NumberFromString);

// ---------------------------------------------
// Tuples
// ---------------------------------------------

// $ExpectType Codec<readonly [string, string], readonly [string, number]>
C.tuple(S.string, C.NumberFromString);

// ---------------------------------------------
// rest
// ---------------------------------------------

// $ExpectType Codec<readonly [string, string, ...string[]], readonly [string, number, ...number[]]>
pipe(C.tuple(S.string, C.NumberFromString), C.rest(C.NumberFromString))

// ---------------------------------------------
// element
// ---------------------------------------------

// $ExpectType Codec<readonly [string, string, string], readonly [string, number, number]>
pipe(C.tuple(S.string, C.NumberFromString), C.element(C.NumberFromString))

// ---------------------------------------------
// optionalElement
// ---------------------------------------------

// $ExpectType Codec<readonly [string, string, string?], readonly [string, number, number?]>
pipe(C.tuple(S.string, C.NumberFromString), C.optionalElement(C.NumberFromString))

// ---------------------------------------------
// arrays
// ---------------------------------------------

// $ExpectType Codec<readonly string[], readonly number[]>
C.array(C.NumberFromString);

// $ExpectType Codec<readonly [string, ...string[]], readonly [number, ...number[]]>
C.nonEmptyArray(C.NumberFromString);

// ---------------------------------------------
// Structs
// ---------------------------------------------

// $ExpectType Codec<{ readonly a: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
const MyModel = C.struct({ a: S.string,  b: C.NumberFromString });

// $ExpectType { readonly a: string; readonly b: string; }
export type MyModelFrom = C.From<typeof MyModel>

// $ExpectType { readonly a: string; readonly b: number; }
export type MyModelTo = C.To<typeof MyModel>

// ---------------------------------------------
// propertySignature
// ---------------------------------------------

// $ExpectType Codec<{ readonly a: string; readonly b: number; readonly c: string; }, { readonly a: string; readonly b: number; readonly c: number; }>
C.struct({ a: S.string, b: S.number, c: C.propertySignature(C.NumberFromString) });

// ---------------------------------------------
// optional
// ---------------------------------------------

// $ExpectType Codec<{ readonly a: string; readonly b: number; readonly c?: string; }, { readonly a: string; readonly b: number; readonly c?: number; }>
C.struct({ a: S.string, b: S.number, c: C.optional(C.NumberFromString) });

// piping
// $ExpectType Codec<{ readonly a?: string; }, { readonly a?: number; }>
C.struct({ a: pipe(C.NumberFromString, C.optional) })

// $ExpectType Codec<{ readonly a?: never; }, { readonly a?: never; }>
C.struct({ a: C.optional(S.never) })

// ---------------------------------------------
// optional().withDefault()
// ---------------------------------------------

// $ExpectType Codec<{ readonly a: string; readonly b: number; readonly c?: boolean; }, { readonly a: string; readonly b: number; readonly c: boolean; }>
C.struct({ a: S.string, b: S.number, c: C.optional(S.boolean).withDefault(() => false) });

// $ExpectType Codec<{ readonly a: string; readonly b: number; readonly c?: string; }, { readonly a: string; readonly b: number; readonly c: number; }>
C.struct({ a: S.string, b: S.number, c: C.optional(C.NumberFromString).withDefault(() => 0) });

// piping
// $ExpectType Codec<{ readonly a?: string; }, { readonly a: string; }>
C.struct({ a: pipe(S.string, C.optional).withDefault(() => '') })

// ---------------------------------------------
// optional().toOption()
// ---------------------------------------------

// $ExpectType Codec<{ readonly a: string; readonly b: number; readonly c?: boolean; }, { readonly a: string; readonly b: number; readonly c: Option<boolean>; }>
C.struct({ a: S.string, b: S.number, c: C.optional(S.boolean).toOption() });

// $ExpectType Codec<{ readonly a: string; readonly b: number; readonly c?: string; }, { readonly a: string; readonly b: number; readonly c: Option<number>; }>
C.struct({ a: S.string, b: S.number, c: C.optional(C.NumberFromString).toOption() });

// piping
// $ExpectType Codec<{ readonly a?: string; }, { readonly a: Option<string>; }>
C.struct({ a: pipe(S.string, C.optional).toOption() })

// ---------------------------------------------
// pick
// ---------------------------------------------

// $ExpectType Codec<{ readonly a: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
pipe(C.struct({ a: S.string,  b: C.NumberFromString, c: S.boolean }), C.pick('a', 'b'));

// ---------------------------------------------
// pick - optional
// ---------------------------------------------

// $ExpectType Codec<{ readonly a?: string; readonly b: string; }, { readonly a?: string; readonly b: number; }>
pipe(C.struct({ a: C.optional(S.string),  b: C.NumberFromString, c: S.boolean }), C.pick('a', 'b'));

// $ExpectType Codec<{ readonly a?: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
pipe(C.struct({ a: C.optional(S.string).withDefault(() => ''),  b: C.NumberFromString, c: S.boolean }), C.pick('a', 'b'));

// ---------------------------------------------
// omit
// ---------------------------------------------

// $ExpectType Codec<{ readonly a: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
pipe(C.struct({ a: S.string,  b: C.NumberFromString, c: S.boolean }), C.omit('c'));

// ---------------------------------------------
// omit - optional
// ---------------------------------------------

// $ExpectType Codec<{ readonly a?: string; readonly b: string; }, { readonly a?: string; readonly b: number; }>
pipe(C.struct({ a: C.optional(S.string),  b: C.NumberFromString, c: S.boolean }), C.omit('c'));

// $ExpectType Codec<{ readonly a?: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
pipe(C.struct({ a: C.optional(S.string).withDefault(() => ''),  b: C.NumberFromString, c: S.boolean }), C.omit('c'));

// ---------------------------------------------
// Records
// ---------------------------------------------

// $ExpectType Codec<{ readonly [x: string]: string; }, { readonly [x: string]: number; }>
C.record(S.string, C.NumberFromString)

// ---------------------------------------------
// extend
// ---------------------------------------------

// $ExpectType Codec<{ readonly a: string; readonly b: string; readonly c: string; }, { readonly a: string; readonly b: string; readonly c: string; }>
pipe(
  C.struct({ a: S.string, b: S.string }),
  C.extend(C.struct({ c: S.string })),
);

// dual
// $ExpectType Codec<{ readonly a: string; readonly b: string; readonly c: string; }, { readonly a: string; readonly b: string; readonly c: string; }>
C.extend(C.struct({ a: S.string, b: S.string }), C.struct({ c: S.string }));

// $ExpectType Codec<{ readonly [x: string]: string; readonly a: string; readonly b: string; readonly c: string; }, { readonly [x: string]: string; readonly a: string; readonly b: string; readonly c: string; }>
pipe(
  C.struct({ a: S.string, b: S.string }),
  C.extend(C.struct({ c: S.string })),
  C.extend(C.record(S.string, S.string))
);

// ---------------------------------------------
// lazy
// ---------------------------------------------

interface LazyTo1 {
  readonly a: number
  readonly as: ReadonlyArray<LazyTo1>
}
const lazy1: C.Codec<LazyTo1, LazyTo1> = C.lazy(() =>
  C.struct({
    a: S.number,
    as: C.array(lazy1)
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
const lazy2: C.Codec<LazyFrom2, LazyTo2> = C.lazy(() =>
  C.struct({
    a: C.NumberFromString,
    as: C.array(lazy2)
  })
)

// ---------------------------------------------
// optionFromSelf
// ---------------------------------------------

// $ExpectType Codec<Option<number>, Option<number>>
C.optionFromSelf(S.number)

// $ExpectType Codec<Option<string>, Option<number>>
C.optionFromSelf(C.NumberFromString)

// ---------------------------------------------
// optionFromNullable
// ---------------------------------------------

// $ExpectType Codec<number | null, Option<number>>
C.optionFromNullable(S.number)

// $ExpectType Codec<string | null, Option<number>>
C.optionFromNullable(C.NumberFromString)

// ---------------------------------------------
// attachPropertySignature
// ---------------------------------------------

// $ExpectType Codec<{ readonly radius: number; }, { readonly radius: number; readonly kind: "circle"; }>
pipe(C.struct({ radius: S.number }), C.attachPropertySignature("kind", "circle"))

// $ExpectType Codec<{ readonly radius: string; }, { readonly radius: number; readonly kind: "circle"; }>
pipe(C.struct({ radius: C.NumberFromString }), C.attachPropertySignature("kind", "circle"))

// ---------------------------------------------
// filter
// ---------------------------------------------

const predicateFilter1 = (u: unknown) => typeof u === 'string'
const FromFilter = S.union(S.string, S.number)

// $ExpectType Codec<string | number, string | number>
pipe(FromFilter, C.filter(S.filter(predicateFilter1)))

const FromRefinement = S.struct({ a: S.optional(S.string), b: S.optional(S.number) })

// $ExpectType Codec<{ readonly a?: string; readonly b?: number; }, { readonly a?: string; readonly b?: number; } & { readonly b: number; }>
pipe(FromRefinement, C.filter(S.filter(S.is(S.struct({ b: S.number })))))

const LiteralFilter = S.literal('a', 'b')
const predicateFilter2 = (u: unknown): u is 'a' => typeof u === 'string' && u === 'a'

// $ExpectType Codec<"a" | "b", "a">
pipe(LiteralFilter, C.filter(S.filter(predicateFilter2)))

// $ExpectType Codec<"a" | "b", "a">
pipe(LiteralFilter, C.filter(S.filter(S.is(S.literal('a')))))

// $ExpectType Codec<"a" | "b", never>
pipe(LiteralFilter, C.filter(S.filter(S.is(S.literal('c')))))

declare const UnionFilter: C.Codec<{ readonly a: string } | { readonly b: string }, { readonly a: string } | { readonly b: string }>

// $ExpectType Codec<{ readonly a: string; } | { readonly b: string; }, ({ readonly a: string; } | { readonly b: string; }) & { readonly b: string; }>
pipe(UnionFilter, C.filter(S.filter(S.is(S.struct({ b: S.string })))))

// $ExpectType Codec<number, number & Brand<"MyNumber">>
pipe(S.number, C.filter(S.filter((n): n is number & Brand<"MyNumber"> => n > 0)))
