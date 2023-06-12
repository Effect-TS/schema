import type * as S from "@effect/schema/Schema"

// $ExpectType { readonly [x: string]: string; readonly a: string; }
export type Test1 = S.Spread<{ readonly a: string } & { readonly [_: string]: string }>

// $ExpectType { readonly [x: string]: string; readonly a: string; }
export type Test2 = S.Spread<{ readonly a: string } & { [_: string]: string }>

// $ExpectType { readonly [x: string]: string; readonly a: string; }
export type Test3 = S.Spread<{ a: string } & { readonly [_: string]: string }>

// $ExpectType { readonly [x: string]: string; readonly a: string; }
export type Test4 = S.Spread<{ a: string } & { [_: string]: string }>
