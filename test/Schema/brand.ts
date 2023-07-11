import * as E from "@effect/data/Either"
import * as O from "@effect/data/Option"
import * as AST from "@effect/schema/AST"
import * as S from "@effect/schema/Schema"

describe.concurrent("brand", () => {
  it("brand/ annotations", () => {
    // const Branded: T.BrandTransform<string, number & Brand<"A"> & Brand<"B">>
    const Branded = S.number.pipe(
      S.int(),
      S.brand("A"),
      S.brand("B", {
        description: "a B brand"
      })
    )

    expect(Branded.ast.annotations).toEqual({
      [AST.TypeAnnotationId]: S.IntTypeId,
      [AST.BrandAnnotationId]: ["A", "B"],
      [AST.DescriptionAnnotationId]: "a B brand",
      [AST.JSONSchemaAnnotationId]: { type: "integer" }
    })
  })

  it("brand/symbol annotations", () => {
    const A = Symbol.for("A")
    const B = Symbol.for("B")
    const Branded = S.number.pipe(
      S.int(),
      S.brand(A),
      S.brand(B, {
        description: "a B brand"
      })
    )
    expect(Branded.ast.annotations).toEqual({
      [AST.TypeAnnotationId]: S.IntTypeId,
      [AST.BrandAnnotationId]: [A, B],
      [AST.DescriptionAnnotationId]: "a B brand",
      [AST.JSONSchemaAnnotationId]: { type: "integer" }
    })
  })

  it("brand/ ()", () => {
    const Int = S.number.pipe(S.int(), S.brand("Int"))
    expect(Int(1)).toEqual(1)
    expect(() => Int(1.2)).toThrowError(
      new Error(`error(s) found
└─ Expected an integer, actual 1.2`)
    )
  })

  it("brand/ option", () => {
    const Int = S.number.pipe(S.int(), S.brand("Int"))
    expect(Int.option(1)).toEqual(O.some(1))
    expect(Int.option(1.2)).toEqual(O.none())
  })

  it("brand/ either", () => {
    const Int = S.number.pipe(S.int(), S.brand("Int"))
    expect(Int.either(1)).toEqual(E.right(1))
    expect(Int.either(1.2)).toEqual(E.left([{
      meta: 1.2,
      message: `error(s) found
└─ Expected an integer, actual 1.2`
    }]))
  })

  it("brand/ refine", () => {
    const Int = S.number.pipe(S.int(), S.brand("Int"))
    expect(Int.refine(1)).toEqual(true)
    expect(Int.refine(1.2)).toEqual(false)
  })

  it("brand/ composition", () => {
    const int = <A extends number>(self: S.Schema<A>) => self.pipe(S.int(), S.brand("Int"))

    const positive = <A extends number>(self: S.Schema<A>) =>
      self.pipe(S.positive(), S.brand("Positive"))

    const PositiveInt = S.number.pipe(int, positive)

    expect(PositiveInt.refine(1)).toEqual(true)
    expect(PositiveInt.refine(-1)).toEqual(false)
    expect(PositiveInt.refine(1.2)).toEqual(false)
  })
})
