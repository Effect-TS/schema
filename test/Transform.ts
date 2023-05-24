import * as E from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import * as AST from "@effect/schema/AST"
import * as P from "@effect/schema/Parser"
import * as T from "@effect/schema/Transform"

describe.concurrent("Transform", () => {
  it("exports", () => {
    expect(T.parse).exist
    expect(T.parseOption).exist
    expect(T.parseEither).exist

    expect(T.GreaterThanBigintTypeId).exist
    expect(T.GreaterThanOrEqualToBigintTypeId).exist
    expect(T.LessThanBigintTypeId).exist
    expect(T.LessThanOrEqualToBigintTypeId).exist
    expect(T.BetweenBigintTypeId).exist
    expect(T.PositiveBigintTypeId).exist
    expect(T.NegativeBigintTypeId).exist
    expect(T.NonNegativeBigintTypeId).exist
    expect(T.NonPositiveBigintTypeId).exist
    expect(T.BrandTypeId).exist
    expect(T.FiniteTypeId).exist
    expect(T.GreaterThanTypeId).exist
    expect(T.GreaterThanOrEqualToTypeId).exist
    expect(T.MultipleOfTypeId).exist
    expect(T.IntTypeId).exist
    expect(T.LessThanTypeId).exist
    expect(T.LessThanOrEqualToTypeId).exist
    expect(T.BetweenTypeId).exist
    expect(T.NonNaNTypeId).exist
    expect(T.PositiveTypeId).exist
    expect(T.NegativeTypeId).exist
    expect(T.NonNegativeTypeId).exist
    expect(T.NonPositiveTypeId).exist
    expect(T.InstanceOfTypeId).exist
    expect(T.MinItemsTypeId).exist
    expect(T.MaxItemsTypeId).exist
    expect(T.ItemsCountTypeId).exist
    expect(T.TrimmedTypeId).exist
    expect(T.PatternTypeId).exist
    expect(T.StartsWithTypeId).exist
    expect(T.EndsWithTypeId).exist
    expect(T.IncludesTypeId).exist
    expect(T.UUIDTypeId).exist

    expect(T.nullable).exist

    expect(T.parseResult).exist
    expect(T.decodeResult).exist
    expect(T.validateResult).exist
    expect(T.encodeResult).exist
    expect(T.parsePromise).exist
    expect(T.decodePromise).exist
    expect(T.validatePromise).exist
    expect(T.encodePromise).exist

    expect(T.partial).exist
    expect(T.required).exist

    expect(T.numberFromString).exist
    expect(T.dateFromString).exist
    expect(T.trim).exist
    expect(T.clamp).exist
    expect(T.clampBigint).exist
  })

  it("brand/ annotations", () => {
    // const Branded: S.Schema<number & Brand<"A"> & Brand<"B">>
    const Branded = pipe(
      T.string,
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
      T.string,
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
    const Int = pipe(T.string, T.numberFromString, T.int(), T.brand("Int"))
    expect(Int(1)).toEqual(1)
    expect(() => Int(1.2)).toThrowError(
      new Error(`error(s) found
└─ Expected integer, actual 1.2`)
    )
  })

  it("brand/ option", () => {
    const Int = pipe(T.string, T.numberFromString, T.int(), T.brand("Int"))
    expect(Int.option(1)).toEqual(O.some(1))
    expect(Int.option(1.2)).toEqual(O.none())
  })

  it("brand/ either", () => {
    const Int = pipe(T.string, T.numberFromString, T.int(), T.brand("Int"))
    expect(Int.either(1)).toEqual(E.right(1))
    expect(Int.either(1.2)).toEqual(E.left([{
      meta: 1.2,
      message: `error(s) found
└─ Expected integer, actual 1.2`
    }]))
  })

  it("brand/ refine", () => {
    const Int = pipe(T.string, T.numberFromString, T.int(), T.brand("Int"))
    expect(Int.refine(1)).toEqual(true)
    expect(Int.refine(1.2)).toEqual(false)
  })

  it("brand/ composition", () => {
    const int = <I, A extends number>(self: T.Transform<I, A>) =>
      pipe(self, T.int(), T.brand("Int"))

    const positive = <I, A extends number>(self: T.Transform<I, A>) =>
      pipe(self, T.positive(), T.brand("Positive"))

    const PositiveInt = pipe(T.string, T.numberFromString, int, positive)

    expect(PositiveInt.refine(1)).toEqual(true)
    expect(PositiveInt.refine(-1)).toEqual(false)
    expect(PositiveInt.refine(1.2)).toEqual(false)
  })

  it("title", () => {
    expect(pipe(T.string, T.title("MyString")).ast.annotations).toEqual({
      [AST.TitleAnnotationId]: "MyString"
    })
  })

  it("description", () => {
    expect(pipe(T.string, T.description("description")).ast.annotations).toEqual({
      [AST.DescriptionAnnotationId]: "description",
      [AST.TitleAnnotationId]: "string"
    })
  })

  it("examples", () => {
    expect(pipe(T.string, T.examples(["example"])).ast.annotations).toEqual({
      [AST.ExamplesAnnotationId]: ["example"],
      [AST.TitleAnnotationId]: "string"
    })
  })

  it("documentation", () => {
    expect(pipe(T.string, T.documentation("documentation")).ast.annotations).toEqual({
      [AST.DocumentationAnnotationId]: "documentation",
      [AST.TitleAnnotationId]: "string"
    })
  })

  describe.concurrent("literal", () => {
    it("should return never with no literals", () => {
      expect(T.literal().ast).toEqual(AST.neverKeyword)
    })

    it("should return an unwrapped AST with exactly one literal", () => {
      expect(T.literal(1).ast).toEqual(AST.createLiteral(1))
    })

    it("should return a union with more than one literal", () => {
      expect(T.literal(1, 2).ast).toEqual(
        AST.createUnion([AST.createLiteral(1), AST.createLiteral(2)])
      )
    })
  })

  it("enums", () => {
    enum Fruits {
      Apple,
      Banana
    }
    const schema = T.enums(Fruits)
    const is = P.is(schema)
    expect(is(Fruits.Apple)).toEqual(true)
    expect(is(Fruits.Banana)).toEqual(true)
    expect(is(0)).toEqual(true)
    expect(is(1)).toEqual(true)
    expect(is(3)).toEqual(false)
  })

  describe.concurrent("experimental", () => {
    it("rename", () => {
      const rename = <A, From extends keyof A, To extends PropertyKey>(
        from: From,
        to: To
      ) =>
        (
          schema: T.Transform<A, A>
        ): T.Transform<
          Omit<A, From> & { [K in To]: A[From] },
          Omit<A, From> & { [K in To]: A[From] }
        > => {
          if (AST.isTypeLiteral(schema.ast)) {
            const propertySignatures = schema.ast.propertySignatures.slice()
            const i = propertySignatures.findIndex((ps) => ps.name === from)
            propertySignatures[i] = AST.createPropertySignature(
              to,
              propertySignatures[i].type,
              propertySignatures[i].isOptional,
              propertySignatures[i].isReadonly
            )
            return T.make(
              AST.createTypeLiteral(propertySignatures, schema.ast.indexSignatures)
            )
          }
          throw new Error("cannot rename")
        }

      const schema = pipe(
        T.struct({
          a: T.string,
          b: T.number
        }),
        rename("a", "aa")
      )
      const is = P.is(schema)
      expect(is({ a: "foo", b: 1 })).toEqual(false)
      expect(is({ aa: "foo", b: 1 })).toEqual(true)
    })

    it("crazy struct", () => {
      type OptionalKeys<A> = {
        [K in keyof A]: K extends `${string}?` ? K : never
      }[keyof A]

      type RequiredKeys<A> = {
        [K in keyof A]: K extends `${string}?` ? never : K
      }[keyof A]

      const struct = <Fields extends Record<PropertyKey, T.Transform<any, any>>>(
        fields: Fields
      ): T.Transform<
        T.Spread<
          & { readonly [K in RequiredKeys<Fields>]: T.To<Fields[K]> }
          & {
            readonly [K in OptionalKeys<Fields> as K extends `${infer S}?` ? S : K]+?: T.To<
              Fields[K]
            >
          }
        >,
        T.Spread<
          & { readonly [K in RequiredKeys<Fields>]: T.To<Fields[K]> }
          & {
            readonly [K in OptionalKeys<Fields> as K extends `${infer S}?` ? S : K]+?: T.To<
              Fields[K]
            >
          }
        >
      > =>
        T.make(
          AST.createTypeLiteral(
            Object.keys(fields).map((key) => {
              const isOptional = key.endsWith("?")
              return AST.createPropertySignature(
                isOptional ? key.substring(0, key.length - 1) : key,
                fields[key].ast,
                isOptional,
                true
              )
            }),
            []
          )
        )

      /*
      const schema: S.Schema<{
        readonly a: string;
        readonly b: number;
        readonly c?: boolean;
      }>
      */
      const schema = struct({
        a: T.string,
        b: T.number,
        "c?": T.boolean
      })

      const is = P.is(schema)
      expect(is({ a: "a", b: 1 })).toBe(true)
      expect(is({ a: "a", b: 1, c: true })).toBe(true)

      expect(is({ a: "a" })).toBe(false)
      expect(is({ a: "a", b: 1, c: 1 })).toBe(false)
    })
  })

  it("filter/ annotation options", () => {
    const schema = pipe(
      T.string,
      T.filter((s): s is string => s.length === 1, {
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
    const schema = pipe(T.tuple(), T.filter(() => true))
    expect(() => pipe(schema, T.rest(T.number))).toThrowError(
      new Error("`rest` is not supported on this schema")
    )
  })

  it("element/ should throw on unsupported schemas", () => {
    const schema = pipe(T.tuple(), T.filter(() => true))
    expect(() => pipe(schema, T.element(T.number))).toThrowError(
      new Error("`element` is not supported on this schema")
    )
  })

  it("optionalElement/ should throw on unsupported schemas", () => {
    const schema = pipe(T.tuple(), T.filter(() => true))
    expect(() => pipe(schema, T.optionalElement(T.number))).toThrowError(
      new Error("`optionalElement` is not supported on this schema")
    )
  })
})
