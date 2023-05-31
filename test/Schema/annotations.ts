import { pipe } from "@effect/data/Function"
import { ArbitraryHookId } from "@effect/schema/Arbitrary"
import * as AST from "@effect/schema/AST"
import * as S from "@effect/schema/Schema"

describe.concurrent("annotations", () => {
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

  it("filter/ annotation options", () => {
    const schema = pipe(
      S.string,
      S.filter((s): s is string => s.length === 1, {
        typeId: Symbol.for("Char"),
        description: "description",
        documentation: "documentation",
        examples: ["examples"],
        identifier: "identifier",
        jsonSchema: { minLength: 1, maxLength: 1 },
        title: "title",
        [Symbol.for("custom-annotation")]: "custom-annotation-value"
      })
    )
    expect(schema.ast.annotations).toEqual({
      [AST.TypeAnnotationId]: Symbol.for("Char"),
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
      [AST.TitleAnnotationId]: "title",
      [Symbol.for("custom-annotation")]: "custom-annotation-value"
    })
  })

  it("toAnnotation (message)", () => {
    const schema = pipe(
      S.string,
      S.filter((s): s is string => s.length === 1, {
        message: () => "message"
      })
    )
    const annotation: any = schema.ast.annotations[AST.MessageAnnotationId]
    expect(annotation).toBeTypeOf("function")
    expect(annotation()).toEqual("message")
  })

  it("toAnnotation (arbitrary)", () => {
    const schema = pipe(
      S.string,
      S.filter((s): s is string => s.length === 1, {
        arbitrary: () => (fc) => fc.string({ minLength: 1, maxLength: 1 })
      })
    )
    expect(schema.ast.annotations[ArbitraryHookId]).exist
  })
})
