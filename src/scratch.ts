type Enumerate<N extends number, Acc extends Array<number> = []> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export type LiteralValue = string | number | boolean | bigint | null
export type KeyValue = StringKeyword | NumberKeyword | Literal<string | number> // The key part of a struct

export interface Literal<L extends LiteralValue> {
  readonly _tag: "Literal"
  readonly literal: L
}

export interface NumberKeyword {
  readonly _tag: "NumberKeyword"
}

export interface NullKeyword {
  readonly _tag: "NullKeyword"
}

export interface BooleanKeyword {
  readonly _tag: "BooleanKeyword"
}

export interface StringKeyword {
  readonly _tag: "StringKeyword"
}

type ASTArray = [AST] | [AST, AST] | [AST, AST, AST] | [AST, AST, AST, AST] | [
  AST,
  AST,
  AST,
  AST,
  AST
]

// type level
type ASTFnType<A, R> = A extends [AST] ? (a: Type<A[0]>) => R
  : A extends [AST, AST] ? (a: Type<A[0]>, b: Type<A[1]>) => R
  : A extends [AST, AST, AST] ? (a: Type<A[0]>, b: Type<A[1]>, c: Type<A[2]>) => R
  : A extends [AST, AST, AST, AST]
    ? (a: Type<A[0]>, b: Type<A[1]>, c: Type<A[2]>, d: Type<A[3]>) => R
  : A extends [AST, AST, AST, AST, AST]
    ? (a: Type<A[0]>, b: Type<A[1]>, c: Type<A[2]>, d: Type<A[3]>, e: Type<A[4]>) => R
  : never

export interface Function<AS extends ASTArray, A extends AST> {
  readonly _tag: "Function"
  readonly props: AS
  readonly ret: A
}

export interface Union<U extends ASTArray> {
  readonly _tag: "Union"
  readonly union: U
}

export interface NeverKeyword {
  readonly _tag: "NeverKeyword"
}

export interface Tuple<Arr extends ASTArray, Rest extends AST = NeverKeyword> {
  readonly _tag: "Tuple"
  readonly tuple: Arr
  readonly rest?: Array<Rest>
}

export interface ArrayKeyword<A extends AST> {
  readonly _tag: "ArrayKeyword"
  readonly array: A
}

export interface Intersection<U extends ASTArray> {
  readonly _tag: "Intersection"
  readonly intersection: U
}

export interface Struct<
  Key extends KeyValue,
  Value extends AST,
  Map extends Record<Type<Key>, Value>
> {
  readonly _tag: "Struct"
  readonly struct: Map
}

type UnionAstArray<A> = A extends [AST] ? Type<A[0]>
  : A extends [AST, AST] ? Type<A[0]> | Type<A[1]>
  : A extends [AST, AST, AST] ? Type<A[0]> | Type<A[1]> | Type<A[2]>
  : A extends [AST, AST, AST, AST] ? Type<A[0]> | Type<A[1]> | Type<A[2]> | Type<A[3]>
  : A extends [AST, AST, AST, AST, AST]
    ? Type<A[0]> | Type<A[1]> | Type<A[2]> | Type<A[3]> | Type<A[4]>
  : never

type IntersectAstArray<A> = A extends [AST] ? Type<A[0]>
  : A extends [AST, AST] ? Type<A[0]> & Type<A[1]>
  : A extends [AST, AST, AST] ? Type<A[0]> & Type<A[1]> & Type<A[2]>
  : A extends [AST, AST, AST, AST] ? Type<A[0]> & Type<A[1]> & Type<A[2]> & Type<A[3]>
  : A extends [AST, AST, AST, AST, AST]
    ? Type<A[0]> & Type<A[1]> & Type<A[2]> & Type<A[3]> & Type<A[4]>
  : never

type TupleAstArray<A, Rest extends AST> = A extends [AST] ? [Type<A[0]>]
  : A extends [AST, AST] ? [Type<A[0]>, Type<A[1]>, ...Array<Type<Rest>>]
  : A extends [AST, AST, AST] ? [Type<A[0]>, Type<A[1]>, Type<A[2]>, ...Array<Type<Rest>>]
  : A extends [AST, AST, AST, AST]
    ? [Type<A[0]>, Type<A[1]>, Type<A[2]>, Type<A[3]>, ...Array<Type<Rest>>]
  : A extends [AST, AST, AST, AST, AST]
    ? [Type<A[0]>, Type<A[1]>, Type<A[2]>, Type<A[3]>, Type<A[4]>, ...Array<Type<Rest>>]
  : never

export type Type<A extends AST> = A extends Literal<infer B> ? B
  : A extends NumberKeyword ? number
  : A extends StringKeyword ? string
  : A extends BooleanKeyword ? boolean
  : A extends Function<infer B, infer C> ? ASTFnType<B, Type<C>>
  : A extends Union<infer B> ? UnionAstArray<B>
  : A extends Intersection<infer B> ? IntersectAstArray<B>
  : A extends Struct<infer _, infer _, infer C> ? { [K in keyof C]: Type<C[K]> }
  : A extends Tuple<infer Arr, infer C> ? TupleAstArray<Arr, C>
  : A extends ArrayKeyword<infer B> ? Array<Type<B>>
  : never

export type AST =
  | Literal<LiteralValue>
  | NumberKeyword
  | BooleanKeyword
  | Function<ASTArray, AST>
  | Union<ASTArray>
  | StringKeyword
  | Intersection<ASTArray>
  | Struct<KeyValue, AST, Record<Type<KeyValue>, AST>>
  | Tuple<ASTArray, AST>
  | ArrayKeyword<AST>
  | NeverKeyword

export const literal = <A extends LiteralValue>(literal: A): Literal<A> => ({
  _tag: "Literal",
  literal
})

export const number: NumberKeyword = ({
  _tag: "NumberKeyword"
})

export const union = <A extends ASTArray>(...a: A): Union<A> => ({
  _tag: "Union",
  union: a
})

// fn: [AST, ..., AST] -> AST
export const fn = <Props extends ASTArray, Ret extends AST>(
  props: Props,
  ret: Ret
): Function<Props, Ret> => ({ _tag: "Function", props, ret })

export const tuple = <A extends ASTArray>(...a: A): Tuple<A> => ({
  _tag: "Tuple",
  tuple: a
})

type UnionASTType<A> = A extends [AST] ? A[0]
  : A extends [AST, AST] ? A[0] | A[1]
  : A extends [AST, AST, AST] ? A[0] | A[1] | A[2]
  : A extends [AST, AST, AST, AST] ? A[0] | A[1] | A[2] | A[3]
  : A extends [AST, AST, AST, AST, AST] ? A[0] | A[1] | A[2] | A[3] | A[4]
  : never

export const array = <A extends AST>(a: A): ArrayKeyword<A> => ({
  _tag: "ArrayKeyword",
  array: a
})

export const index = <A extends ASTArray, I extends IntRange<0, A["length"]>>(
  i: I
) => (u: Union<A>): Union<A>["union"][I] => u.union[i]

export const map = <A extends AST, B extends AST>(f: (a: A) => B) => (ast: A) => f(ast)
// zoom: Narrows an ast using an optic

export const intersection = <A extends ASTArray>(...a: A): Intersection<A> => ({
  _tag: "Intersection",
  intersection: a
})

export const struct = <A extends KeyValue, B extends AST, C extends Record<Type<A>, B>>(
  struct: C
): Struct<A, B, C> => ({
  _tag: "Struct",
  struct
})

// (a: number, b: number, c: {}) => { a: number }
const fn_ = fn([number, number, struct({})], struct({ a: number }))
export type TestA = Type<typeof fn_>

export type TestB = Type<ArrayKeyword<UnionASTType<[NumberKeyword, StringKeyword]>>> // (string | number)[]

const fns_ = array(fn_)
export type S = Type<typeof fns_>
