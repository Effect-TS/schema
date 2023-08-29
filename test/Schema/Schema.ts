import * as AST from "@effect/schema/AST"
import * as P from "@effect/schema/Parser"
import * as S from "@effect/schema/Schema"

describe.concurrent("Schema", () => {
  it("exports", () => {
    expect(S.parse).exist
    expect(S.parseSync).exist
    expect(S.parseOption).exist
    expect(S.parseEither).exist
    expect(S.parseResult).exist

    expect(S.decode).exist
    expect(S.decodeSync).exist
    expect(S.decodeOption).exist
    expect(S.decodeEither).exist
    expect(S.decodeResult).exist

    expect(S.encode).exist
    expect(S.encodeSync).exist
    expect(S.encodeOption).exist
    expect(S.encodeEither).exist
    expect(S.encodeResult).exist

    expect(S.validate).exist
    expect(S.validateSync).exist
    expect(S.validateOption).exist
    expect(S.validateEither).exist
    expect(S.validateResult).exist

    expect(S.GreaterThanBigintTypeId).exist
    expect(S.GreaterThanOrEqualToBigintTypeId).exist
    expect(S.LessThanBigintTypeId).exist
    expect(S.LessThanOrEqualToBigintTypeId).exist
    expect(S.BetweenBigintTypeId).exist
    expect(S.BrandTypeId).exist
    expect(S.FiniteTypeId).exist
    expect(S.GreaterThanTypeId).exist
    expect(S.GreaterThanOrEqualToTypeId).exist
    expect(S.MultipleOfTypeId).exist
    expect(S.IntTypeId).exist
    expect(S.LessThanTypeId).exist
    expect(S.LessThanOrEqualToTypeId).exist
    expect(S.BetweenTypeId).exist
    expect(S.NonNaNTypeId).exist
    expect(S.InstanceOfTypeId).exist
    expect(S.MinItemsTypeId).exist
    expect(S.MaxItemsTypeId).exist
    expect(S.ItemsCountTypeId).exist
    expect(S.TrimmedTypeId).exist
    expect(S.PatternTypeId).exist
    expect(S.StartsWithTypeId).exist
    expect(S.EndsWithTypeId).exist
    expect(S.IncludesTypeId).exist
    expect(S.UUIDTypeId).exist
    expect(S.ULIDTypeId).exist

    expect(S.nullable).exist

    expect(S.partial).exist
    expect(S.required).exist

    expect(S.numberFromString).exist
    expect(S.dateFromString).exist
    expect(S.trim).exist
    expect(S.clamp).exist
    expect(S.clampBigint).exist
  })

  it("enums", () => {
    enum Fruits {
      Apple,
      Banana
    }
    const schema = S.enums(Fruits)
    const is = P.is(schema)
    expect(is(Fruits.Apple)).toEqual(true)
    expect(is(Fruits.Banana)).toEqual(true)
    expect(is(0)).toEqual(true)
    expect(is(1)).toEqual(true)
    expect(is(3)).toEqual(false)
  })

  it("filter/ annotation options", () => {
    const schema = S.string.pipe(
      S.filter((s): s is string => s.length === 1, {
        typeId: Symbol.for("Char"),
        description: "description",
        documentation: "documentation",
        examples: ["examples"],
        identifier: "identifier",
        jsonSchema: { minLength: 1, maxLength: 1 },
        title: "title"
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
      [AST.TitleAnnotationId]: "title"
    })
  })

  it("rest/ should throw on unsupported schemas", () => {
    const schema = S.tuple().pipe(S.filter(() => true))
    expect(() => schema.pipe(S.rest(S.number))).toThrowError(
      new Error("`rest` is not supported on this schema")
    )
  })

  it("element/ should throw on unsupported schemas", () => {
    const schema = S.tuple().pipe(S.filter(() => true))
    expect(() => schema.pipe(S.element(S.number))).toThrowError(
      new Error("`element` is not supported on this schema")
    )
  })

  it("optionalElement/ should throw on unsupported schemas", () => {
    const schema = S.tuple().pipe(S.filter(() => true))
    expect(() => schema.pipe(S.optionalElement(S.number))).toThrowError(
      new Error("`optionalElement` is not supported on this schema")
    )
  })
})
