import * as A from "@effect/schema/Arbitrary"
import * as JSONSchema from "@effect/schema/JSONSchema"
import * as S from "@effect/schema/Schema"
import Ajv from "ajv"
import * as Predicate from "effect/Predicate"
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

const isJsonArray = (u: unknown): u is JsonArray => Array.isArray(u) && u.every(isJson)

const isJsonObject = (u: unknown): u is JsonObject =>
  Predicate.isRecord(u) && Object.keys(u).every((key) => isJson(u[key]))

const isJson = (u: unknown): u is Json =>
  u === null || typeof u === "string" || (typeof u === "number" && !isNaN(u) && isFinite(u)) ||
  typeof u === "boolean" ||
  isJsonArray(u) ||
  isJsonObject(u)

const property = <A>(schema: S.Schema<A>) => {
  const arbitrary = A.to(schema)
  const is = S.is(schema)
  const validate = new Ajv({ strict: false }).compile(JSONSchema.to(schema))
  const arb = arbitrary(fc).filter(isJson)
  // console.log(fc.sample(arb, 2))
  fc.assert(fc.property(arb, (a) => {
    return is(a) && validate(a)
  }))
}

const ajv = new Ajv({ strict: false })

export const assertTrue = <A>(schema: S.Schema<A>, input: unknown) => {
  const is = S.is(schema)
  const jsonschema = JSONSchema.to(schema)
  const validate = ajv.compile(jsonschema)
  expect(is(input)).toEqual(validate(input))
  expect(validate(input)).toEqual(true)
}

export const assertFalse = <A>(schema: S.Schema<A>, input: unknown) => {
  const is = S.is(schema)
  const jsonschema = JSONSchema.to(schema)
  const validate = ajv.compile(jsonschema)
  expect(is(input)).toEqual(validate(input))
  expect(validate(input)).toEqual(false)
}

describe("jsonSchemaFor", () => {
  it("any", () => {
    property(S.any)
  })

  it("unknown", () => {
    property(S.unknown)
  })

  it("object", () => {
    property(S.object)
  })

  it("string", () => {
    property(S.string)
  })

  it("number", () => {
    property(S.number)
  })

  it("boolean", () => {
    property(S.boolean)
  })

  it("literal. null", () => {
    property(S.null)
  })

  it("literal. string", () => {
    property(S.literal("a"))
  })

  it("literal. number", () => {
    property(S.literal(1))
  })

  it("literal. boolean", () => {
    property(S.literal(true))
    property(S.literal(false))
  })

  it("literals", () => {
    property(S.literal(1, "a"))
  })

  it("Numeric enums", () => {
    enum Fruits {
      Apple,
      Banana
    }
    property(S.enums(Fruits))
  })

  it("String enums", () => {
    enum Fruits {
      Apple = "apple",
      Banana = "banana",
      Cantaloupe = 0
    }
    property(S.enums(Fruits))
  })

  it("Const enums", () => {
    const Fruits = {
      Apple: "apple",
      Banana: "banana",
      Cantaloupe: 3
    } as const
    property(S.enums(Fruits))
  })

  it("union", () => {
    property(S.union(S.string, S.number))
  })

  it("tuple. empty", () => {
    property(S.tuple())
  })

  it("tuple. required element", () => {
    const schema = S.tuple(S.number)
    property(schema)
  })

  it("tuple. optional element", () => {
    const schema = S.tuple().pipe(S.optionalElement(S.number))
    property(schema)
  })

  it("tuple. e + e?", () => {
    const schema = S.tuple(S.string).pipe(S.optionalElement(S.number))
    property(schema)
  })

  it("tuple. e + r", () => {
    const schema = S.tuple(S.string).pipe(S.rest(S.number))
    property(schema)
  })

  it("tuple. e? + r", () => {
    const schema = S.tuple().pipe(S.optionalElement(S.string), S.rest(S.number))
    property(schema)
  })

  it("tuple. r", () => {
    const schema = S.array(S.number)
    property(schema)
  })

  it("struct. empty", () => {
    const schema = S.struct({})
    property(schema)
  })

  it("struct", () => {
    property(S.struct({ a: S.string, b: S.number }))
  })

  it("struct. optional property signature", () => {
    property(S.struct({ a: S.string, b: S.optional(S.number) }))
  })

  it("record(string, string)", () => {
    property(S.record(S.string, S.string))
  })

  it("record('a' | 'b', number)", () => {
    const schema = S.record(S.union(S.literal("a"), S.literal("b")), S.number)
    property(schema)
  })

  it("minLength", () => {
    const schema = S.string.pipe(S.minLength(1))
    const jsonSchema = JSONSchema.to(schema)
    expect(jsonSchema).toEqual({ type: "string", minLength: 1 })
    property(schema)
  })

  it("maxLength", () => {
    const schema = S.string.pipe(S.maxLength(1))
    const jsonSchema = JSONSchema.to(schema)
    expect(jsonSchema).toEqual({ type: "string", maxLength: 1 })
    property(schema)
  })

  it("greaterThan", () => {
    const schema = S.number.pipe(S.greaterThan(1))
    const jsonSchema = JSONSchema.to(schema)
    expect(jsonSchema).toEqual({ type: "number", exclusiveMinimum: 1 })
    property(schema)
  })

  it("greaterThanOrEqualTo", () => {
    const schema = S.number.pipe(S.greaterThanOrEqualTo(1))
    const jsonSchema = JSONSchema.to(schema)
    expect(jsonSchema).toEqual({ type: "number", minimum: 1 })
    property(schema)
  })

  it("lessThan", () => {
    const schema = S.number.pipe(S.lessThan(1))
    const jsonSchema = JSONSchema.to(schema)
    expect(jsonSchema).toEqual({ type: "number", exclusiveMaximum: 1 })
    property(schema)
  })

  it("lessThanOrEqualTo", () => {
    const schema = S.number.pipe(S.lessThanOrEqualTo(1))
    const jsonSchema = JSONSchema.to(schema)
    expect(jsonSchema).toEqual({ type: "number", maximum: 1 })
    property(schema)
  })

  it("pattern", () => {
    const schema = S.string.pipe(S.pattern(/^abb+$/))
    const jsonSchema = JSONSchema.to(schema)
    expect(jsonSchema).toEqual({ "pattern": "^abb+$", "type": "string" })
  })

  it("integer", () => {
    property(S.number.pipe(S.int()))
  })
})
