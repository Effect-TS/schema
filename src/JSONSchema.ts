/**
 * @since 1.0.0
 */

import * as AST from "@effect/schema/AST"
import * as Parser from "@effect/schema/Parser"
import type * as Schema from "@effect/schema/Schema"
import * as Option from "effect/Option"
import * as ReadonlyArray from "effect/ReadonlyArray"
import * as ReadonlyRecord from "effect/ReadonlyRecord"

interface $Schema {
  $schema?: string
}

interface JsonSchema7AnyType extends $Schema {}

interface JsonSchema7NullType extends $Schema {
  type: "null"
}

interface JsonSchema7StringType extends $Schema {
  type: "string"
  minLength?: number
  maxLength?: number
  pattern?: string
  description?: string
}

interface JsonSchema7NumberType extends $Schema {
  type: "number" | "integer"
  minimum?: number
  exclusiveMinimum?: number
  maximum?: number
  exclusiveMaximum?: number
}

interface JsonSchema7BooleanType extends $Schema {
  type: "boolean"
}

interface JsonSchema7ConstType extends $Schema {
  const: string | number | boolean
}

interface JsonSchema7ArrayType extends $Schema {
  type: "array"
  items?: JsonSchema7Type | Array<JsonSchema7Type>
  minItems?: number
  maxItems?: number
  additionalItems?: JsonSchema7Type | boolean
}

interface JsonSchema7EnumType extends $Schema {
  "enum": Array<string | number>
}

interface JsonSchema7AnyOfType extends $Schema {
  anyOf: ReadonlyArray<JsonSchema7Type>
}

interface JsonSchema7AllOfType extends $Schema {
  allOf: Array<JsonSchema7Type>
}

interface JsonSchema7ObjectType extends $Schema {
  type: "object"
  required: Array<string>
  properties: Record<string, JsonSchema7Type>
  additionalProperties?: boolean | JsonSchema7Type
}

type JsonSchema7Type =
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

/**
 * @category JSON Schema
 * @since 1.0.0
 */
export const to = <I, A>(schema: Schema.Schema<I, A>): JsonSchema7Type => go(AST.to(schema.ast))

/**
 * @category JSON Schema
 * @since 1.0.0
 */
export const from = <I, A>(schema: Schema.Schema<I, A>): JsonSchema7Type => go(AST.from(schema.ast))

const nonNullable: JsonSchema7Type = {
  "anyOf": [
    { "type": "object", properties: {}, required: [] },
    { "type": "array" }
  ]
}

const decorate = <A, B>(f: (a: A) => B, decorator: (a: A, b: B) => B): (a: A) => B => (a) =>
  decorator(a, f(a))

const $schema = "http://json-schema.org/draft-07/schema#"

const getAnnotations = (annotated: AST.Annotated) => {
  return ReadonlyRecord.compact<unknown>({
    description: AST.getDescriptionAnnotation(annotated),
    title: AST.getTitleAnnotation(annotated),
    examples: AST.getExamplesAnnotation(annotated)
  })
}

const go = (ast: AST.AST): JsonSchema7Type => {
  const jsonSchema = _go(ast)
  jsonSchema.$schema = $schema
  return jsonSchema
}

/** @internal */
export const _go = decorate((ast: AST.AST): JsonSchema7Type => {
  switch (ast._tag) {
    case "Declaration": {
      const annotation = AST.getJSONSchemaAnnotation(ast)
      if (Option.isSome(annotation)) {
        return annotation.value
      }
      throw new Error(
        "cannot build a JSON Schema for declarations without a JSON Schema annotation"
      )
    }
    case "Literal": {
      if (typeof ast.literal === "bigint") {
        throw new Error("cannot convert `bigint` to JSON Schema")
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
    case "ObjectKeyword":
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
    case "Tuple": {
      const elements = ast.elements.map((e) => _go(e.type))
      const rest = Option.map(ast.rest, ReadonlyArray.mapNonEmpty(_go))
      const output: JsonSchema7ArrayType = { type: "array" }
      // ---------------------------------------------
      // handle elements
      // ---------------------------------------------
      const len = elements.length
      if (len > 0) {
        output.minItems = len - ast.elements.filter((element) => element.isOptional).length
        output.items = elements
      }
      // ---------------------------------------------
      // handle rest element
      // ---------------------------------------------
      if (Option.isSome(rest)) {
        const head = rest.value[0]
        if (len > 0) {
          output.additionalItems = head
        } else {
          output.items = head
        }

        // ---------------------------------------------
        // handle post rest elements
        // ---------------------------------------------
        if (rest.value.length > 1) {
          throw new Error(
            "Generating a JSON Schema for post-rest elements is not currently supported. You're welcome to contribute by submitting a Pull Request."
          )
        }
      } else {
        if (len > 0) {
          output.additionalItems = false
        } else {
          output.maxItems = 0
        }
      }

      return output
    }
    case "TypeLiteral": {
      if (ast.propertySignatures.length === 0 && ast.indexSignatures.length === 0) {
        return nonNullable
      }
      const propertySignatures = ast.propertySignatures.map((ps) => {
        return { ..._go(ps.type), ...getAnnotations(ps) }
      })
      const indexSignatures = ast.indexSignatures.map((is) => _go(is.type))
      const output: JsonSchema7ObjectType = {
        type: "object",
        required: [],
        properties: {},
        additionalProperties: false
      }
      // ---------------------------------------------
      // handle property signatures
      // ---------------------------------------------
      for (let i = 0; i < propertySignatures.length; i++) {
        const name = ast.propertySignatures[i].name
        if (typeof name === "string") {
          output.properties[name] = propertySignatures[i]
          // ---------------------------------------------
          // handle optional property signatures
          // ---------------------------------------------
          if (!ast.propertySignatures[i].isOptional) {
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
        output.additionalProperties = { allOf: indexSignatures }
      }

      return output
    }
    case "Union":
      return { "anyOf": ast.types.map(_go) }
    case "Enums":
      return { anyOf: ast.enums.map(([_, value]) => ({ const: value })) }
    case "Refinement": {
      const from = _go(ast.from)
      const annotation = AST.getJSONSchemaAnnotation(ast)
      if (Option.isSome(annotation)) {
        return { ...from, ...annotation.value }
      }
      throw new Error(
        "cannot build a JSON Schema for refinements without a JSON Schema annotation"
      )
    }
    case "TemplateLiteral": {
      const regex = Parser.getTemplateLiteralRegex(ast)
      return {
        type: "string",
        description: "a template literal",
        pattern: regex.source
      }
    }
    case "Lazy":
      throw new Error(
        "Generating a JSON Schema for lazy schemas is not currently supported. You're welcome to contribute by submitting a Pull Request."
      )
    case "Transform":
      throw new Error("cannot build a JSON Schema for transformations")
  }
}, (ast, jsonSchema) => {
  return {
    ...jsonSchema,
    ...getAnnotations(ast)
  }
})
