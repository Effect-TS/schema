import type * as S from "@effect/schema/Schema"

// $ExpectType { readonly [x: string]: string; readonly a: string; }
export type Test1 = S.Simplify<{ readonly a: string } & { readonly [_: string]: string }>

// $ExpectType { readonly [x: string]: string; readonly a: string; }
export type Test2 = S.Simplify<{ readonly a: string } & { [_: string]: string }>

// $ExpectType { readonly [x: string]: string; readonly a: string; }
export type Test3 = S.Simplify<{ a: string } & { readonly [_: string]: string }>

// $ExpectType { readonly [x: string]: string; readonly a: string; }
export type Test4 = S.Simplify<{ a: string } & { [_: string]: string }>
