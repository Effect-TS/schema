import { pipe } from "@fp-ts/data/Function"
import * as O from "@fp-ts/data/Option"
import * as RA from "@fp-ts/data/ReadonlyArray"
import { getJSONSchemaAnnotation } from "@fp-ts/schema/annotation/JSONSchemaAnnotation"
import * as A from "@fp-ts/schema/Arbitrary"
import type * as AST from "@fp-ts/schema/AST"
import * as G from "@fp-ts/schema/Guard"
import { isJson } from "@fp-ts/schema/internal/common"
import type { Schema } from "@fp-ts/schema/Schema"
import * as S from "@fp-ts/schema/Schema"
import Ajv from "ajv"
import * as fc from "fast-check"

export type JsonSchema7AnyType = {}

export type JsonSchema7NullType = {
  type: "null"
}

export type JsonSchema7StringType = {
  type: "string"
  minLength?: number
  maxLength?: number
}

export type JsonSchema7NumberType = {
  type: "number" | "integer"
  minimum?: number
  exclusiveMinimum?: number
  maximum?: number
  exclusiveMaximum?: number
}

export type JsonSchema7BooleanType = {
  type: "boolean"
}

export type JsonSchema7ConstType = {
  const: string | number | boolean
}

export type JsonSchema7ArrayType = {
  type: "array"
  items?: JsonSchema7Type | Array<JsonSchema7Type>
  minItems?: number
  maxItems?: number
  additionalItems?: JsonSchema7Type
}

export type JsonSchema7EnumType = {
  "enum": Array<string | number>
}

export type JsonSchema7AnyOfType = {
  anyOf: ReadonlyArray<JsonSchema7Type>
}

export type JsonSchema7AllOfType = {
  allOf: Array<JsonSchema7Type>
}

export type JsonSchema7ObjectType = {
  type: "object"
  required: Array<string>
  properties: { [x: string]: JsonSchema7Type }
  additionalProperties: boolean | JsonSchema7Type
}

export type JsonSchema7Type =
  | JsonSchema7AnyType
  | JsonSchema7NullType
  | JsonSchema7StringType
  | JsonSchema7NumberType
  | JsonSchema7BooleanType
  | JsonSchema7ConstType
  | JsonSchema7ArrayType
  | JsonSchema7EnumType
  | JsonSchema7AnyOfType
  | JsonSchema7AllOfType
  | JsonSchema7ObjectType

const jsonSchemaFor = <A>(schema: Schema<A>): JsonSchema7Type => {
  const go = (ast: AST.AST): JsonSchema7Type => {
    switch (ast._tag) {
      case "TypeAlias":
        return pipe(
          getJSONSchemaAnnotation(ast),
          O.match(
            () => go(ast.type),
            ({ schema }) => ({ ...go(ast.type), ...schema })
          )
        )
      case "Literal": {
        if (typeof ast.literal === "bigint") {
          return {} as any
        } else if (ast.literal === null) {
          return { type: "null" }
        }
        return { const: ast.literal }
      }
      case "UniqueSymbol":
        throw new Error("cannot convert a unique symbol to JSON Schema")
      case "UndefinedKeyword":
        throw new Error("cannot convert `undefined` to JSON Schema")
      case "VoidKeyword":
        throw new Error("cannot convert `void` to JSON Schema")
      case "NeverKeyword":
        throw new Error("cannot convert `never` to JSON Schema")
      case "UnknownKeyword":
      case "AnyKeyword":
        return {}
      case "StringKeyword":
        return { type: "string" }
      case "NumberKeyword":
        return { type: "number" }
      case "BooleanKeyword":
        return { type: "boolean" }
      case "BigIntKeyword":
        throw new Error("cannot convert `bigint` to JSON Schema")
      case "SymbolKeyword":
        throw new Error("cannot convert `symbol` to JSON Schema")
      case "ObjectKeyword":
        return {}
      case "Tuple": {
        const elements = ast.elements.map((e) => go(e.type))
        const rest = pipe(ast.rest, O.map(RA.mapNonEmpty(go)))
        const output: JsonSchema7ArrayType = { type: "array" }
        let i = 0
        // ---------------------------------------------
        // handle elements
        // ---------------------------------------------
        for (; i < ast.elements.length; i++) {
          if (output.minItems === undefined) {
            output.minItems = 0
          }
          if (output.maxItems === undefined) {
            output.maxItems = 0
          }
          // ---------------------------------------------
          // handle optional elements
          // ---------------------------------------------
          if (!ast.elements[i].isOptional) {
            output.minItems = output.minItems + 1
            output.maxItems = output.maxItems + 1
          }
          if (output.items === undefined) {
            output.items = []
          }
          if (Array.isArray(output.items)) {
            output.items.push(elements[i])
          }
        }
        // ---------------------------------------------
        // handle rest element
        // ---------------------------------------------
        if (O.isSome(rest)) {
          const head = RA.headNonEmpty(rest.value)
          if (output.items !== undefined) {
            delete output.maxItems
            output.additionalItems = head
          } else {
            output.items = head
          }
          // ---------------------------------------------
          // handle post rest elements
          // ---------------------------------------------
          // const tail = RA.tailNonEmpty(rest.value) // TODO
        }

        return output
      }
      case "Struct": {
        if (
          ast.indexSignatures.length <
            ast.indexSignatures.filter((is) => is.parameter._tag === "StringKeyword").length
        ) {
          throw new Error(`Cannot encode some index signature to JSON Schema`)
        }
        const fields = ast.fields.map((f) => go(f.type))
        const indexSignatures = ast.indexSignatures.map((is) => go(is.type))
        const output: JsonSchema7ObjectType = {
          type: "object",
          required: [],
          properties: {},
          additionalProperties: false
        }
        // ---------------------------------------------
        // handle fields
        // ---------------------------------------------
        for (let i = 0; i < fields.length; i++) {
          const name = ast.fields[i].name
          if (typeof name === "string") {
            output.properties[name] = fields[i]
            // ---------------------------------------------
            // handle optional fields
            // ---------------------------------------------
            if (!ast.fields[i].isOptional) {
              output.required.push(name)
            }
          } else {
            throw new Error(`Cannot encode ${String(name)} key to JSON Schema`)
          }
        }
        // ---------------------------------------------
        // handle index signatures
        // ---------------------------------------------
        if (indexSignatures.length > 0) {
          // TODO: handle key validation
          output.additionalProperties = { allOf: indexSignatures }
        }

        return output
      }
      case "Union":
        return { "anyOf": ast.types.map(go) }
      case "Enums":
        return { anyOf: ast.enums.map(([_, value]) => ({ const: value })) }
      case "Refinement":
        return go(ast.from)
    }
    throw new Error(`TODO: unhandled ${ast._tag}`)
  }

  return go(schema.ast)
}

const property = <A>(schema: Schema<A>) => {
  const arbitrary = A.arbitraryFor(schema)
  const guard = G.guardFor(schema)
  const validate = new Ajv({ strict: false }).compile(jsonSchemaFor(schema))
  const arb = arbitrary.arbitrary(fc).filter(isJson)
  // console.log(fc.sample(arb, 2))
  fc.assert(fc.property(arb, (a) => {
    return guard.is(a) && validate(a)
  }))
}

export const assertTrue = <A>(schema: Schema<A>, input: unknown) => {
  const guard = G.guardFor(schema)
  const jsonschema = jsonSchemaFor(schema)
  const validate = new Ajv({ strict: false }).compile(jsonschema)
  expect(guard.is(input)).toEqual(validate(input))
  expect(validate(input)).toEqual(true)
}

export const assertFalse = <A>(schema: Schema<A>, input: unknown) => {
  const guard = G.guardFor(schema)
  const jsonschema = jsonSchemaFor(schema)
  const validate = new Ajv({ strict: false }).compile(jsonschema)
  expect(guard.is(input)).toEqual(validate(input))
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
    const schema = pipe(S.tuple(), S.optionalElement(S.number))
    property(schema)
  })

  it("tuple. e + e?", () => {
    const schema = pipe(S.tuple(S.string), S.optionalElement(S.number))
    property(schema)
  })

  it("tuple. e + r", () => {
    const schema = pipe(S.tuple(S.string), S.rest(S.number))
    property(schema)
  })

  it("tuple. e? + r", () => {
    const schema = pipe(S.tuple(), S.optionalElement(S.string), S.rest(S.number))
    property(schema)
  })

  it("tuple. r", () => {
    const schema = S.array(S.number)
    property(schema)
  })

  it.skip("tuple. r + e", () => {
    const schema = pipe(S.array(S.string), S.element(S.number))
    property(schema)
  })

  it.skip("tuple. e + r + e", () => {
    const schema = pipe(S.tuple(S.string), S.rest(S.number), S.element(S.boolean))
    property(schema)
  })

  it("struct. empty", () => {
    const schema = S.struct({})
    property(schema)
  })

  it("struct", () => {
    property(S.struct({ a: S.string, b: S.number }))
  })

  it("struct. optional field", () => {
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
    const schema = pipe(S.string, S.minLength(1))
    const jsonSchema = jsonSchemaFor(schema)
    expect(jsonSchema).toEqual({ type: "string", minLength: 1 })
    property(schema)
  })

  it("maxLength", () => {
    const schema = pipe(S.string, S.maxLength(1))
    const jsonSchema = jsonSchemaFor(schema)
    expect(jsonSchema).toEqual({ type: "string", maxLength: 1 })
    property(schema)
  })

  it("greaterThan", () => {
    const schema = pipe(S.number, S.greaterThan(1))
    const jsonSchema = jsonSchemaFor(schema)
    expect(jsonSchema).toEqual({ type: "number", exclusiveMinimum: 1 })
    property(schema)
  })

  it("greaterThanOrEqualTo", () => {
    const schema = pipe(S.number, S.greaterThanOrEqualTo(1))
    const jsonSchema = jsonSchemaFor(schema)
    expect(jsonSchema).toEqual({ type: "number", minimum: 1 })
    property(schema)
  })

  it("lessThan", () => {
    const schema = pipe(S.number, S.lessThan(1))
    const jsonSchema = jsonSchemaFor(schema)
    expect(jsonSchema).toEqual({ type: "number", exclusiveMaximum: 1 })
    property(schema)
  })

  it("lessThanOrEqualTo", () => {
    const schema = pipe(S.number, S.lessThanOrEqualTo(1))
    const jsonSchema = jsonSchemaFor(schema)
    expect(jsonSchema).toEqual({ type: "number", maximum: 1 })
    property(schema)
  })

  it("regex", () => {
    const schema = pipe(S.string, S.regex(/^abb+$/))
    const jsonSchema = jsonSchemaFor(schema)
    expect(jsonSchema).toEqual({ "pattern": "^abb+$", "type": "string" })
  })

  it("integer", () => {
    property(S.int(S.number))
  })
})
