import * as E from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import * as AST from "@effect/schema/AST"
import * as S from "@effect/schema/Schema"
import * as T from "@effect/schema/Transform"

describe.concurrent("Transform", () => {
  it("brand/ annotations", () => {
    // const Branded: T.BrandTransform<string, number & Brand<"A"> & Brand<"B">>
    const Branded = pipe(
      S.string,
      T.numberFromString,
      T.int(),
      T.brand("A"),
      T.brand("B", {
        description: "a B brand"
      })
    )
    expect(Branded.ast.annotations).toEqual({
      [AST.TypeAnnotationId]: "@effect/schema/IntTypeId",
      [AST.BrandAnnotationId]: ["A", "B"],
      [AST.DescriptionAnnotationId]: "a B brand",
      [AST.JSONSchemaAnnotationId]: { type: "integer" }
    })
  })

  it("brand/symbol annotations", () => {
    const A = Symbol.for("A")
    const B = Symbol.for("B")
    const Branded = pipe(
      S.string,
      T.numberFromString,
      T.int(),
      T.brand(A),
      T.brand(B, {
        description: "a B brand"
      })
    )
    expect(Branded.ast.annotations).toEqual({
      [AST.TypeAnnotationId]: "@effect/schema/IntTypeId",
      [AST.BrandAnnotationId]: [A, B],
      [AST.DescriptionAnnotationId]: "a B brand",
      [AST.JSONSchemaAnnotationId]: { type: "integer" }
    })
  })

  it("brand/ ()", () => {
    const Int = pipe(S.string, T.numberFromString, T.int(), T.brand("Int"))
    expect(Int(1)).toEqual(1)
    expect(() => Int(1.2)).toThrowError(
      new Error(`error(s) found
└─ Expected integer, actual 1.2`)
    )
  })

  it("brand/ option", () => {
    const Int = pipe(S.string, T.numberFromString, T.int(), T.brand("Int"))
    expect(Int.option(1)).toEqual(O.some(1))
    expect(Int.option(1.2)).toEqual(O.none())
  })

  it("brand/ either", () => {
    const Int = pipe(S.string, T.numberFromString, T.int(), T.brand("Int"))
    expect(Int.either(1)).toEqual(E.right(1))
    expect(Int.either(1.2)).toEqual(E.left([{
      meta: 1.2,
      message: `error(s) found
└─ Expected integer, actual 1.2`
    }]))
  })

  it("brand/ refine", () => {
    const Int = pipe(S.string, T.numberFromString, T.int(), T.brand("Int"))
    expect(Int.refine(1)).toEqual(true)
    expect(Int.refine(1.2)).toEqual(false)
  })

  it("brand/ composition", () => {
    const int = <I, A extends number>(self: T.Transform<I, A>) =>
      pipe(self, T.int(), T.brand("Int"))

    const positive = <I, A extends number>(self: T.Transform<I, A>) =>
      pipe(self, T.positive(), T.brand("Positive"))

    const PositiveInt = pipe(S.string, T.numberFromString, int, positive)

    expect(PositiveInt.refine(1)).toEqual(true)
    expect(PositiveInt.refine(-1)).toEqual(false)
    expect(PositiveInt.refine(1.2)).toEqual(false)
  })

  it("title", () => {
    expect(pipe(S.string, S.title("MyString")).ast.annotations).toEqual({
      [AST.TitleAnnotationId]: "MyString"
    })
  })

  it("description", () => {
    expect(pipe(S.string, S.description("description")).ast.annotations).toEqual({
      [AST.DescriptionAnnotationId]: "description",
      [AST.TitleAnnotationId]: "string"
    })
  })

  it("examples", () => {
    expect(pipe(S.string, S.examples(["example"])).ast.annotations).toEqual({
      [AST.ExamplesAnnotationId]: ["example"],
      [AST.TitleAnnotationId]: "string"
    })
  })

  it("documentation", () => {
    expect(pipe(S.string, S.documentation("documentation")).ast.annotations).toEqual({
      [AST.DocumentationAnnotationId]: "documentation",
      [AST.TitleAnnotationId]: "string"
    })
  })

  describe.concurrent("literal", () => {
    it("should return never with no literals", () => {
      expect(S.literal().ast).toEqual(AST.neverKeyword)
    })

    it("should return an unwrapped AST with exactly one literal", () => {
      expect(S.literal(1).ast).toEqual(AST.createLiteral(1))
    })

    it("should return a union with more than one literal", () => {
      expect(S.literal(1, 2).ast).toEqual(
        AST.createUnion([AST.createLiteral(1), AST.createLiteral(2)])
      )
    })
  })

  it("filter/ annotation options", () => {
    const schema = pipe(
      S.string,
      S.filter((s): s is string => s.length === 1, {
        typeId: "Char",
        description: "description",
        documentation: "documentation",
        examples: ["examples"],
        identifier: "identifier",
        jsonSchema: { minLength: 1, maxLength: 1 },
        title: "title"
      })
    )
    expect(schema.ast.annotations).toEqual({
      [AST.TypeAnnotationId]: "Char",
      [AST.DescriptionAnnotationId]: "description",
      [AST.DocumentationAnnotationId]: "documentation",
      [AST.ExamplesAnnotationId]: [
        "examples"
      ],
      [AST.IdentifierAnnotationId]: "identifier",
      [AST.JSONSchemaAnnotationId]: {
        "maxLength": 1,
        "minLength": 1
      },
      [AST.TitleAnnotationId]: "title"
    })
  })

  it("rest/ should throw on unsupported schemas", () => {
    const schema = pipe(S.tuple(), S.filter(() => true))
    expect(() => pipe(schema, S.rest(S.number))).toThrowError(
      new Error("`rest` is not supported on this schema")
    )
  })

  it("element/ should throw on unsupported schemas", () => {
    const schema = pipe(S.tuple(), S.filter(() => true))
    expect(() => pipe(schema, S.element(S.number))).toThrowError(
      new Error("`element` is not supported on this schema")
    )
  })

  it("optionalElement/ should throw on unsupported schemas", () => {
    const schema = pipe(S.tuple(), S.filter(() => true))
    expect(() => pipe(schema, S.optionalElement(S.number))).toThrowError(
      new Error("`optionalElement` is not supported on this schema")
    )
  })
})
