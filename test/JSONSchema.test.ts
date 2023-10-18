import * as A from "@effect/schema/Arbitrary"
import * as AST from "@effect/schema/AST"
import * as JSONSchema from "@effect/schema/JSONSchema"
import * as ParseResult from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import Ajv from "ajv"
import * as fc from "fast-check"

type JsonArray = ReadonlyArray<Json>

type JsonObject = { readonly [key: string]: Json }

type Json =
  | null
  | boolean
  | number
  | string
  | JsonArray
  | JsonObject

const propertyTo = <I, A>(schema: S.Schema<I, A>) => {
  const arbitrary = A.to(schema)
  const is = S.is(schema)
  const validate = new Ajv({ strict: false }).compile(JSONSchema.to(schema))
  const arb = arbitrary(fc)
  // console.log(fc.sample(arb, 10))
  fc.assert(fc.property(arb, (a) => {
    return is(a) && validate(a)
  }))
}

const propertyFrom = <I, A>(schema: S.Schema<I, A>) => {
  const arbitrary = A.from(schema)
  const is = S.is(S.from(schema))
  const validate = new Ajv({ strict: false }).compile(JSONSchema.from(schema))
  const arb = arbitrary(fc)
  fc.assert(fc.property(arb, (a) => {
    return is(a) && validate(a)
  }))
}

describe("JSONSchema", () => {
  it("from", () => {
    propertyFrom(S.struct({ a: S.string, b: S.NumberFromString }))
  })

  describe("declaration", () => {
    it("should raise an error when an annotation doesn't exist", () => {
      expect(() => JSONSchema.to(S.chunk(S.number))).toThrowError(
        new Error("cannot build a JSON Schema for Declaration")
      )
    })

    it("should return the provided JSON Schema when an annotation exists", () => {
      const schema = S.declare([], S.struct({}), () => (input) => ParseResult.success(input), {
        [AST.JSONSchemaAnnotationId]: { type: "string" },
        [A.ArbitraryHookId]: (): A.Arbitrary<string> => (fc) => fc.string()
      })
      propertyTo(schema)
    })
  })

  it("bigint should raise an error", () => {
    expect(() => JSONSchema.to(S.bigint)).toThrowError(
      new Error("cannot convert `bigint` to JSON Schema")
    )
  })

  it("symbol should raise an error", () => {
    expect(() => JSONSchema.to(S.symbol)).toThrowError(
      new Error("cannot convert `symbol` to JSON Schema")
    )
  })

  it("a unique symbol should raise an error", () => {
    expect(() => JSONSchema.to(S.uniqueSymbol(Symbol.for("@effect/schema/test/a")))).toThrowError(
      new Error("cannot convert a unique symbol to JSON Schema")
    )
  })

  it("undefined should raise an error", () => {
    expect(() => JSONSchema.to(S.undefined)).toThrowError(
      new Error("cannot convert `undefined` to JSON Schema")
    )
  })

  it("void should raise an error", () => {
    expect(() => JSONSchema.to(S.void)).toThrowError(
      new Error("cannot convert `void` to JSON Schema")
    )
  })

  it("never should raise an error", () => {
    expect(() => JSONSchema.to(S.never)).toThrowError(
      new Error("cannot convert `never` to JSON Schema")
    )
  })

  it("any", () => {
    propertyTo(S.any)
  })

  it("unknown", () => {
    propertyTo(S.unknown)
  })

  it("object", () => {
    propertyTo(S.object)
  })

  it("string", () => {
    propertyTo(S.string)
  })

  it("number", () => {
    propertyTo(S.number)
  })

  it("boolean", () => {
    propertyTo(S.boolean)
  })

  describe("literal", () => {
    it("null", () => {
      propertyTo(S.null)
    })

    it("string", () => {
      propertyTo(S.literal("a"))
    })

    it("number", () => {
      propertyTo(S.literal(1))
    })

    it("boolean", () => {
      propertyTo(S.literal(true))
      propertyTo(S.literal(false))
    })

    it("literals", () => {
      propertyTo(S.literal(1, "a"))
    })

    it("bigint should raise an error", () => {
      expect(() => JSONSchema.to(S.literal(1n))).toThrowError(
        new Error("cannot convert `bigint` to JSON Schema")
      )
    })
  })

  describe("enums", () => {
    it("Numeric enums", () => {
      enum Fruits {
        Apple,
        Banana
      }
      propertyTo(S.enums(Fruits))
    })

    it("String enums", () => {
      enum Fruits {
        Apple = "apple",
        Banana = "banana",
        Cantaloupe = 0
      }
      propertyTo(S.enums(Fruits))
    })

    it("Const enums", () => {
      const Fruits = {
        Apple: "apple",
        Banana: "banana",
        Cantaloupe: 3
      } as const
      propertyTo(S.enums(Fruits))
    })
  })

  it("union", () => {
    propertyTo(S.union(S.string, S.number))
  })

  describe("tuple", () => {
    it("empty", () => {
      propertyTo(S.tuple())
    })

    it("required element", () => {
      const schema = S.tuple(S.number)
      propertyTo(schema)
    })

    it("optional element", () => {
      const schema = S.tuple().pipe(S.optionalElement(S.number))
      propertyTo(schema)
    })

    it("e + e?", () => {
      const schema = S.tuple(S.string).pipe(S.optionalElement(S.number))
      propertyTo(schema)
    })

    it("e + r", () => {
      const schema = S.tuple(S.string).pipe(S.rest(S.number))
      propertyTo(schema)
    })

    it("e? + r", () => {
      const schema = S.tuple().pipe(S.optionalElement(S.string), S.rest(S.number))
      propertyTo(schema)
    })

    it("r", () => {
      const schema = S.array(S.number)
      propertyTo(schema)
    })
  })

  describe("struct", () => {
    it("empty", () => {
      const schema = S.struct({})
      propertyTo(schema)
    })

    it("struct", () => {
      propertyTo(S.struct({ a: S.string, b: S.number }))
    })

    it("optional property signature", () => {
      propertyTo(S.struct({ a: S.string, b: S.optional(S.number) }))
    })

    it("should raise an error if there is a property named with a symbol", () => {
      const a = Symbol.for("@effect/schema/test/a")
      expect(() => JSONSchema.to(S.struct({ [a]: S.string }))).toThrowError(
        new Error("Cannot encode Symbol(@effect/schema/test/a) key to JSON Schema")
      )
    })
  })

  describe("record", () => {
    it("record(string, string)", () => {
      propertyTo(S.record(S.string, S.string))
    })

    it("record('a' | 'b', number)", () => {
      const schema = S.record(S.union(S.literal("a"), S.literal("b")), S.number)
      propertyTo(schema)
    })
  })

  describe("refinement", () => {
    it("should return the JSON Schema of the from schema if there is no annotation", () => {
      const schema = S.string.pipe(S.filter(() => true))
      propertyTo(schema)
    })

    it("minLength", () => {
      const schema = S.string.pipe(S.minLength(1))
      const jsonSchema = JSONSchema.to(schema)
      expect(jsonSchema).toEqual({ type: "string", minLength: 1 })
      propertyTo(schema)
    })

    it("maxLength", () => {
      const schema = S.string.pipe(S.maxLength(1))
      const jsonSchema = JSONSchema.to(schema)
      expect(jsonSchema).toEqual({ type: "string", maxLength: 1 })
      propertyTo(schema)
    })

    it("greaterThan", () => {
      const schema = S.number.pipe(S.greaterThan(1))
      const jsonSchema = JSONSchema.to(schema)
      expect(jsonSchema).toEqual({ type: "number", exclusiveMinimum: 1 })
      propertyTo(schema)
    })

    it("greaterThanOrEqualTo", () => {
      const schema = S.number.pipe(S.greaterThanOrEqualTo(1))
      const jsonSchema = JSONSchema.to(schema)
      expect(jsonSchema).toEqual({ type: "number", minimum: 1 })
      propertyTo(schema)
    })

    it("lessThan", () => {
      const schema = S.number.pipe(S.lessThan(1))
      const jsonSchema = JSONSchema.to(schema)
      expect(jsonSchema).toEqual({ type: "number", exclusiveMaximum: 1 })
      propertyTo(schema)
    })

    it("lessThanOrEqualTo", () => {
      const schema = S.number.pipe(S.lessThanOrEqualTo(1))
      const jsonSchema = JSONSchema.to(schema)
      expect(jsonSchema).toEqual({ type: "number", maximum: 1 })
      propertyTo(schema)
    })

    it("pattern", () => {
      const schema = S.string.pipe(S.pattern(/^abb+$/))
      const jsonSchema = JSONSchema.to(schema)
      expect(jsonSchema).toEqual({ "pattern": "^abb+$", "type": "string" })
    })

    it("integer", () => {
      propertyTo(S.number.pipe(S.int()))
    })
  })

  it("TemplateLiteral should raise an error", () => {
    const schema = S.templateLiteral(S.literal("a"), S.string)
    propertyTo(schema)
  })

  it("Lazy should raise an error", () => {
    interface A {
      readonly a: string
      readonly as: ReadonlyArray<A>
    }
    const schema: S.Schema<A> = S.lazy<A>(() =>
      S.struct({
        a: S.string,
        as: S.array(schema)
      })
    )
    expect(() => JSONSchema.to(schema)).toThrowError(
      new Error("cannot build a JSON Schema for Lazy")
    )
  })

  it("Transform should raise an error", () => {
    expect(() => JSONSchema.go(S.NumberFromString.ast)).toThrowError(
      new Error("cannot build a JSON Schema for transformations")
    )
  })
})
