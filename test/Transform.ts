import { pipe } from "@effect/data/Function"
import * as AST from "@effect/schema/AST"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("Transform", () => {
  it("filter", async () => {
    const transform = pipe(T.NumberFromString, T.filter(S.int()))

    await Util.expectParseSuccess(transform, "1", 1)
    await Util.expectParseFailure(transform, "1.2", "Expected integer, actual 1.2")

    // should work with `Schema`s too
    const schema = pipe(S.number, T.filter(S.int()))
    await Util.expectParseSuccess(schema, 1)
    await Util.expectParseFailure(schema, 1.2, "Expected integer, actual 1.2")
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
