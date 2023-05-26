import { Brand } from "@effect/data/Brand";
import { pipe } from "@effect/data/Function";
import * as T from "@effect/schema/Transform";
import * as S from "@effect/schema/Schema";

// ---------------------------------------------
// From
// ---------------------------------------------

// $ExpectType never
export type FromNever = T.From<typeof S.never>

// ---------------------------------------------
// To
// ---------------------------------------------

// $ExpectType never
export type ToNever = T.To<typeof S.never>

// ---------------------------------------------
// strings
// ---------------------------------------------

// $ExpectType Transform<string, string>
pipe(S.string, T.filter(S.maxLength(5)));

// $ExpectType Transform<string, string>
pipe(S.string, T.filter(S.minLength(5)));

// $ExpectType Transform<string, string>
pipe(S.string, T.filter(S.length(5)));

// $ExpectType Transform<string, string>
pipe(S.string, T.filter(S.pattern(/a/)));

// $ExpectType Transform<string, string>
pipe(S.string, T.filter(S.startsWith('a')));

// $ExpectType Transform<string, string>
pipe(S.string, T.filter(S.endsWith('a')));

// $ExpectType Transform<string, string>
pipe(S.string, T.filter(S.includes('a')));

// $ExpectType Transform<number, number>
pipe(S.number, T.filter(S.greaterThan(5)));

// $ExpectType Transform<number, number>
pipe(S.number, T.filter(S.greaterThanOrEqualTo(5)));

// $ExpectType Transform<number, number>
pipe(S.number, T.filter(S.lessThan(5)));

// $ExpectType Transform<number, number>
pipe(S.number, T.filter(S.lessThanOrEqualTo(5)));

// $ExpectType Transform<number, number>
pipe(S.number, T.filter(S.int()));

// $ExpectType Transform<number, number>
pipe(S.number, T.filter(S.nonNaN())); // not NaN

// $ExpectType Transform<number, number>
pipe(S.number, T.filter(S.finite())); // value must be finite, not Infinity or -Infinity

// ---------------------------------------------
// nullable
// ---------------------------------------------

// $ExpectType Transform<string | null, number | null>
T.nullable(T.NumberFromString)

// ---------------------------------------------
// Unions
// ---------------------------------------------

// $ExpectType Transform<string | boolean, number | boolean>
T.union(S.boolean, T.NumberFromString);

// ---------------------------------------------
// Tuples
// ---------------------------------------------

// $ExpectType Transform<readonly [string, string], readonly [string, number]>
T.tuple(S.string, T.NumberFromString);

// ---------------------------------------------
// rest
// ---------------------------------------------

// $ExpectType Transform<readonly [string, string, ...string[]], readonly [string, number, ...number[]]>
pipe(T.tuple(S.string, T.NumberFromString), T.rest(T.NumberFromString))

// ---------------------------------------------
// element
// ---------------------------------------------

// $ExpectType Transform<readonly [string, string, string], readonly [string, number, number]>
pipe(T.tuple(S.string, T.NumberFromString), T.element(T.NumberFromString))

// ---------------------------------------------
// optionalElement
// ---------------------------------------------

// $ExpectType Transform<readonly [string, string, string?], readonly [string, number, number?]>
pipe(T.tuple(S.string, T.NumberFromString), T.optionalElement(T.NumberFromString))

// ---------------------------------------------
// arrays
// ---------------------------------------------

// $ExpectType Transform<readonly string[], readonly number[]>
T.array(T.NumberFromString);

// $ExpectType Transform<readonly [string, ...string[]], readonly [number, ...number[]]>
T.nonEmptyArray(T.NumberFromString);

// ---------------------------------------------
// Structs
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
const MyModel = T.struct({ a: S.string,  b: T.NumberFromString });

// $ExpectType { readonly a: string; readonly b: string; }
export type MyModelFrom = T.From<typeof MyModel>

// $ExpectType { readonly a: string; readonly b: number; }
export type MyModelTo = T.To<typeof MyModel>

// ---------------------------------------------
// optional
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: number; readonly c?: string; }, { readonly a: string; readonly b: number; readonly c?: number; }>
T.struct({ a: S.string, b: S.number, c: T.optional(T.NumberFromString) });

// piping
// $ExpectType Transform<{ readonly a?: string; }, { readonly a?: number; }>
T.struct({ a: pipe(T.NumberFromString, T.optional) })

// ---------------------------------------------
// optional().withDefault()
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: number; readonly c?: boolean; }, { readonly a: string; readonly b: number; readonly c: boolean; }>
T.struct({ a: S.string, b: S.number, c: T.optional(S.boolean).withDefault(() => false) });

// $ExpectType Transform<{ readonly a: string; readonly b: number; readonly c?: string; }, { readonly a: string; readonly b: number; readonly c: number; }>
T.struct({ a: S.string, b: S.number, c: T.optional(T.NumberFromString).withDefault(() => 0) });

// piping
// $ExpectType Transform<{ readonly a?: string; }, { readonly a: string; }>
T.struct({ a: pipe(S.string, T.optional).withDefault(() => '') })

// ---------------------------------------------
// optional().toOption()
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: number; readonly c?: boolean; }, { readonly a: string; readonly b: number; readonly c: Option<boolean>; }>
T.struct({ a: S.string, b: S.number, c: T.optional(S.boolean).toOption() });

// $ExpectType Transform<{ readonly a: string; readonly b: number; readonly c?: string; }, { readonly a: string; readonly b: number; readonly c: Option<number>; }>
T.struct({ a: S.string, b: S.number, c: T.optional(T.NumberFromString).toOption() });

// piping
// $ExpectType Transform<{ readonly a?: string; }, { readonly a: Option<string>; }>
T.struct({ a: pipe(S.string, T.optional).toOption() })

// ---------------------------------------------
// pick
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
pipe(T.struct({ a: S.string,  b: T.NumberFromString, c: S.boolean }), T.pick('a', 'b'));

// ---------------------------------------------
// pick - optional
// ---------------------------------------------

// $ExpectType Transform<{ readonly a?: string; readonly b: string; }, { readonly a?: string; readonly b: number; }>
pipe(T.struct({ a: T.optional(S.string),  b: T.NumberFromString, c: S.boolean }), T.pick('a', 'b'));

// $ExpectType Transform<{ readonly a?: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
pipe(T.struct({ a: T.optional(S.string).withDefault(() => ''),  b: T.NumberFromString, c: S.boolean }), T.pick('a', 'b'));

// ---------------------------------------------
// omit
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
pipe(T.struct({ a: S.string,  b: T.NumberFromString, c: S.boolean }), T.omit('c'));

// ---------------------------------------------
// omit - optional
// ---------------------------------------------

// $ExpectType Transform<{ readonly a?: string; readonly b: string; }, { readonly a?: string; readonly b: number; }>
pipe(T.struct({ a: T.optional(S.string),  b: T.NumberFromString, c: S.boolean }), T.omit('c'));

// $ExpectType Transform<{ readonly a?: string; readonly b: string; }, { readonly a: string; readonly b: number; }>
pipe(T.struct({ a: T.optional(S.string).withDefault(() => ''),  b: T.NumberFromString, c: S.boolean }), T.omit('c'));

// ---------------------------------------------
// brand
// ---------------------------------------------

// $ExpectType BrandTransform<string, number & Brand<"Int">>
pipe(T.NumberFromString, T.filter(S.int()), T.filter(S.brand('Int')))

// ---------------------------------------------
// Partial
// ---------------------------------------------

// $ExpectType Transform<{ readonly a?: string; readonly b?: string; }, { readonly a?: string; readonly b?: number; }>
T.partial(T.struct({ a: S.string,  b: T.NumberFromString }));

// ---------------------------------------------
// Required
// ---------------------------------------------

// $ExpectType Transform<{ readonly b: string; readonly a: string; readonly c: string; }, { readonly b: number; readonly a: string; readonly c: number; }>
T.required(T.struct({ a: T.optional(S.string),  b: T.NumberFromString, c: T.optional(T.NumberFromString) }));

// ---------------------------------------------
// Records
// ---------------------------------------------

// $ExpectType Transform<{ readonly [x: string]: string; }, { readonly [x: string]: number; }>
T.record(S.string, T.NumberFromString)

// ---------------------------------------------
// Extend
// ---------------------------------------------

// $ExpectType Transform<{ readonly a: string; readonly b: string; readonly c: string; }, { readonly a: string; readonly b: string; readonly c: string; }>
pipe(
  T.struct({ a: S.string, b: S.string }),
  T.extend(T.struct({ c: S.string })),
);

// dual
// $ExpectType Transform<{ readonly a: string; readonly b: string; readonly c: string; }, { readonly a: string; readonly b: string; readonly c: string; }>
T.extend(T.struct({ a: S.string, b: S.string }), T.struct({ c: S.string }));

// $ExpectType Transform<{ [x: string]: string; readonly a: string; readonly b: string; readonly c: string; }, { [x: string]: string; readonly a: string; readonly b: string; readonly c: string; }>
pipe(
  T.struct({ a: S.string, b: S.string }),
  T.extend(T.struct({ c: S.string })),
  T.extend(T.record(S.string, S.string))
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
    a: S.number,
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
    a: T.NumberFromString,
    as: T.array(lazy2)
  })
)

// ---------------------------------------------
// optionFromSelf
// ---------------------------------------------

// $ExpectType Transform<Option<number>, Option<number>>
T.optionFromSelf(S.number)

// $ExpectType Transform<Option<string>, Option<number>>
T.optionFromSelf(T.NumberFromString)

// ---------------------------------------------
// optionFromNullable
// ---------------------------------------------

// $ExpectType Transform<number | null, Option<number>>
T.optionFromNullable(S.number)

// $ExpectType Transform<string | null, Option<number>>
T.optionFromNullable(T.NumberFromString)

// ---------------------------------------------
// attachPropertySignature
// ---------------------------------------------

// $ExpectType Transform<{ readonly radius: number; }, { readonly radius: number; readonly kind: "circle"; }>
pipe(T.struct({ radius: S.number }), T.attachPropertySignature("kind", "circle"))

// $ExpectType Transform<{ readonly radius: string; }, { readonly radius: number; readonly kind: "circle"; }>
pipe(T.struct({ radius: T.NumberFromString }), T.attachPropertySignature("kind", "circle"))

// ---------------------------------------------
// filter
// ---------------------------------------------

const predicateFilter1 = (u: unknown) => typeof u === 'string'
const FromFilter = S.union(S.string, S.number)

// $ExpectType Transform<string | number, string | number>
pipe(FromFilter, T.filter(S.filter(predicateFilter1)))

const FromRefinement = S.struct({ a: S.optional(S.string), b: S.optional(S.number) })

// $ExpectType Transform<{ readonly a?: string; readonly b?: number; }, { readonly a?: string; readonly b?: number; } & { readonly b: number; }>
pipe(FromRefinement, T.filter(S.filter(S.is(S.struct({ b: S.number })))))

const LiteralFilter = S.literal('a', 'b')
const predicateFilter2 = (u: unknown): u is 'a' => typeof u === 'string' && u === 'a'

// $ExpectType Transform<"a" | "b", "a">
pipe(LiteralFilter, T.filter(S.filter(predicateFilter2)))

// $ExpectType Transform<"a" | "b", "a">
pipe(LiteralFilter, T.filter(S.filter(S.is(S.literal('a')))))

// $ExpectType Transform<"a" | "b", never>
pipe(LiteralFilter, T.filter(S.filter(S.is(S.literal('c')))))

declare const UnionFilter: T.Transform<{ readonly a: string } | { readonly b: string }, { readonly a: string } | { readonly b: string }>

// $ExpectType Transform<{ readonly a: string; } | { readonly b: string; }, ({ readonly a: string; } | { readonly b: string; }) & { readonly b: string; }>
pipe(UnionFilter, T.filter(S.filter(S.is(S.struct({ b: S.string })))))

// $ExpectType Transform<number, number & Brand<"MyNumber">>
pipe(S.number, T.filter(S.filter((n): n is number & Brand<"MyNumber"> => n > 0)))
