/**
 * @since 1.0.0
 */
import { RefinedConstructorsTypeId } from "@effect/data/Brand";
import * as C from "@effect/data/Chunk";
import * as D from "@effect/data/Data";
import { untracedMethod } from "@effect/data/Debug";
import * as E from "@effect/data/Either";
import * as Equal from "@effect/data/Equal";
import { dual, identity, pipe } from "@effect/data/Function";
import * as N from "@effect/data/Number";
import * as O from "@effect/data/Option";
import { isDate } from "@effect/data/Predicate";
import * as ReadonlyArray from "@effect/data/ReadonlyArray";
import * as AST from "@effect/schema/AST";
import * as I from "@effect/schema/internal/common";
import * as P from "@effect/schema/Parser";
import * as PR from "@effect/schema/ParseResult";
import { formatErrors } from "@effect/schema/TreeFormatter";
// ---------------------------------------------
// model
// ---------------------------------------------
/**
 * @category model
 * @since 1.0.0
 */
export const SchemaTypeId = /*#__PURE__*/Symbol.for("@effect/schema/Schema");
// ---------------------------------------------
// validating / asserts / guards
// ---------------------------------------------
/* c8 ignore start */
export {
/**
 * @category asserts
 * @since 1.0.0
 */
asserts,
/**
 * @category guards
 * @since 1.0.0
 */
is,
/**
 * @category validating
 * @since 1.0.0
 */
validate,
/**
 * @category validating
 * @since 1.0.0
 */
validateEffect,
/**
 * @category validating
 * @since 1.0.0
 */
validateEither,
/**
 * @category validating
 * @since 1.0.0
 */
validateOption,
/**
 * @category validating
 * @since 1.0.0
 */
validatePromise,
/**
 * @category validating
 * @since 1.0.0
 */
validateResult } from "@effect/schema/Parser";
// ---------------------------------------------
// annotations
// ---------------------------------------------
/**
 * @category combinators
 * @since 1.0.0
 */
export const annotations = options => self => make(AST.mergeAnnotations(self.ast, toAnnotations(options)));
// ---------------------------------------------
// constructors
// ---------------------------------------------
/**
 * @category constructors
 * @since 1.0.0
 */
export const make = ast => ({
  [SchemaTypeId]: identity,
  ast
});
/**
  @category constructors
  @since 1.0.0
*/
export const declare = (typeParameters, type, decode, annotations) => make(AST.createDeclaration(typeParameters.map(schema => schema.ast), type.ast, (...typeParameters) => decode(...typeParameters.map(make)), annotations));
/**
 * @category constructors
 * @since 1.0.0
 */
export const literal = (...literals) => make(AST.createUnion(literals.map(literal => AST.createLiteral(literal))));
/**
 * @category constructors
 * @since 1.0.0
 */
export const uniqueSymbol = (symbol, annotations) => make(AST.createUniqueSymbol(symbol, annotations));
/**
 * @category constructors
 * @since 1.0.0
 */
export const enums = enums => make(AST.createEnums(Object.keys(enums).filter(key => typeof enums[enums[key]] !== "number").map(key => [key, enums[key]])));
/**
 * @category constructors
 * @since 1.0.0
 */
export const templateLiteral = (...[head, ...tail]) => {
  let types = getTemplateLiterals(head.ast);
  for (const span of tail) {
    types = pipe(types, ReadonlyArray.flatMap(a => getTemplateLiterals(span.ast).map(b => combineTemplateLiterals(a, b))));
  }
  return make(AST.createUnion(types));
};
const combineTemplateLiterals = (a, b) => {
  if (AST.isLiteral(a)) {
    return AST.isLiteral(b) ? AST.createLiteral(String(a.literal) + String(b.literal)) : AST.createTemplateLiteral(String(a.literal) + b.head, b.spans);
  }
  if (AST.isLiteral(b)) {
    return AST.createTemplateLiteral(a.head, pipe(a.spans, ReadonlyArray.modifyNonEmptyLast(span => ({
      ...span,
      literal: span.literal + String(b.literal)
    }))));
  }
  return AST.createTemplateLiteral(a.head, pipe(a.spans, ReadonlyArray.modifyNonEmptyLast(span => ({
    ...span,
    literal: span.literal + String(b.head)
  })), ReadonlyArray.appendAll(b.spans)));
};
const getTemplateLiterals = ast => {
  switch (ast._tag) {
    case "Literal":
      return [ast];
    case "NumberKeyword":
    case "StringKeyword":
      return [AST.createTemplateLiteral("", [{
        type: ast,
        literal: ""
      }])];
    case "Union":
      return pipe(ast.types, ReadonlyArray.flatMap(getTemplateLiterals));
    default:
      throw new Error(`templateLiteral: unsupported template literal span ${ast._tag}`);
  }
};
/**
 * @category type id
 * @since 1.0.0
 */
export const InstanceOfTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/InstanceOf");
/**
 * @category constructors
 * @since 1.0.0
 */
export const instanceOf = (constructor, options) => declare([], struct({}), () => (input, _, self) => input instanceof constructor ? PR.success(input) : PR.failure(PR.type(self, input)), {
  [AST.TypeAnnotationId]: InstanceOfTypeId,
  [InstanceOfTypeId]: {
    constructor
  },
  [AST.DescriptionAnnotationId]: `an instance of ${constructor.name}`,
  ...toAnnotations(options)
});
/**
 * @category type id
 * @since 1.0.0
 */
export const BrandTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/Brand");
/**
 * @category constructors
 * @since 1.0.0
 */
export const fromBrand = (constructor, options) => self => {
  const filter = untracedMethod(() => (a, _, self) => {
    const e = constructor.either(a);
    return E.isLeft(e) ? O.some(PR.parseError([PR.type(self, a, e.left.map(v => v.message).join(", "))])) : O.none();
  });
  const ast = AST.createRefinement(self.ast, filter, toAnnotations({
    typeId: {
      id: BrandTypeId,
      params: {
        constructor
      }
    },
    ...options
  }));
  return make(ast);
};
// ---------------------------------------------
// primitives
// ---------------------------------------------
const _undefined = /*#__PURE__*/make(AST.undefinedKeyword);
const _void = /*#__PURE__*/make(AST.voidKeyword);
const _null = /*#__PURE__*/make( /*#__PURE__*/AST.createLiteral(null));
export {
/**
 * @category primitives
 * @since 1.0.0
 */
_null as null,
/**
 * @category primitives
 * @since 1.0.0
 */
_undefined as undefined,
/**
 * @category primitives
 * @since 1.0.0
 */
_void as void };
/**
 * @category primitives
 * @since 1.0.0
 */
export const never = /*#__PURE__*/make(AST.neverKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
export const unknown = /*#__PURE__*/make(AST.unknownKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
export const any = /*#__PURE__*/make(AST.anyKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
export const string = /*#__PURE__*/make(AST.stringKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
export const number = /*#__PURE__*/make(AST.numberKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
export const boolean = /*#__PURE__*/make(AST.booleanKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
export const bigint = /*#__PURE__*/make(AST.bigIntKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
export const symbol = /*#__PURE__*/make(AST.symbolKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
export const object = /*#__PURE__*/make(AST.objectKeyword);
// ---------------------------------------------
// combinators
// ---------------------------------------------
/**
 * @category combinators
 * @since 1.0.0
 */
export const union = (...members) => make(AST.createUnion(members.map(m => m.ast)));
/**
 * @category combinators
 * @since 1.0.0
 */
export const nullable = self => union(_null, self);
/**
 * @category combinators
 * @since 1.0.0
 */
export const keyof = schema => make(AST.keyof(schema.ast));
/**
 * @category combinators
 * @since 1.0.0
 */
export const tuple = (...elements) => make(AST.createTuple(elements.map(schema => AST.createElement(schema.ast, false)), O.none(), true));
/**
 * @category combinators
 * @since 1.0.0
 */
export const optionalElement = element => self => {
  if (AST.isTuple(self.ast)) {
    return make(AST.appendElement(self.ast, AST.createElement(element.ast, true)));
  }
  throw new Error("`optionalElement` is not supported on this schema");
};
/**
 * @category combinators
 * @since 1.0.0
 */
export const rest = rest => self => {
  if (AST.isTuple(self.ast)) {
    return make(AST.appendRestElement(self.ast, rest.ast));
  }
  throw new Error("`rest` is not supported on this schema");
};
/**
 * @category combinators
 * @since 1.0.0
 */
export const element = element => self => {
  if (AST.isTuple(self.ast)) {
    return make(AST.appendElement(self.ast, AST.createElement(element.ast, false)));
  }
  throw new Error("`element` is not supported on this schema");
};
/**
 * @category combinators
 * @since 1.0.0
 */
export const array = item => make(AST.createTuple([], O.some([item.ast]), true));
/**
 * @category combinators
 * @since 1.0.0
 */
export const nonEmptyArray = item => pipe(tuple(item), rest(item));
/**
 * @category combinators
 * @since 1.0.0
 */
export const lazy = (f, annotations) => make(AST.createLazy(() => f().ast, annotations));
/** @internal */
export class PropertySignatureImpl {
  config;
  [SchemaTypeId] = identity;
  From;
  FromIsOptional;
  To;
  ToIsOptional;
  constructor(config) {
    this.config = config;
  }
  withDefault(value) {
    return new PropertySignatureImpl({
      _tag: "Default",
      ast: this.config.ast,
      value,
      annotations: this.config.annotations
    });
  }
  toOption() {
    return new PropertySignatureImpl({
      _tag: "Option",
      ast: this.config.ast,
      annotations: this.config.annotations
    });
  }
}
/**
 * @since 1.0.0
 * @category constructors
 */
export const propertySignature = (schema, options) => new PropertySignatureImpl({
  _tag: "PropertySignature",
  ast: schema.ast,
  annotations: toAnnotations(options)
});
/**
 * @since 1.0.0
 */
export const optional = (schema, options) => new PropertySignatureImpl({
  _tag: "Optional",
  ast: schema.ast,
  annotations: toAnnotations(options)
});
/**
 * @category combinators
 * @since 1.0.0
 */
export const struct = fields => make(AST.createTypeLiteral(I.ownKeys(fields).map(key => {
  const field = fields[key];
  const isOptional = ("config" in field);
  const ast = isOptional ? field.config.ast : field.ast;
  const annotations = isOptional ? field.config.annotations : undefined;
  return AST.createPropertySignature(key, ast, isOptional, true, annotations);
}), []));
/**
 * @category combinators
 * @since 1.0.0
 */
export const record = (key, value) => make(AST.createRecord(key.ast, value.ast, true));
/** @internal */
export const intersectUnionMembers = (xs, ys) => {
  return AST.createUnion(xs.flatMap(x => {
    return ys.map(y => {
      if (AST.isTypeLiteral(x)) {
        if (AST.isTypeLiteral(y)) {
          return AST.createTypeLiteral(x.propertySignatures.concat(y.propertySignatures), x.indexSignatures.concat(y.indexSignatures));
        } else if (AST.isTransform(y) && AST.isTypeLiteralTransformation(y.transformAST) && AST.isTypeLiteral(y.from) && AST.isTypeLiteral(y.to)) {
          const from = AST.createTypeLiteral(x.propertySignatures.concat(y.from.propertySignatures), x.indexSignatures.concat(y.from.indexSignatures));
          const to = AST.createTypeLiteral(x.propertySignatures.concat(y.to.propertySignatures), x.indexSignatures.concat(y.to.indexSignatures));
          return AST.createTransform(from, to, AST.createTypeLiteralTransformation(y.transformAST.propertySignatureTransformations));
        }
      } else if (AST.isTransform(x) && AST.isTypeLiteralTransformation(x.transformAST) && AST.isTypeLiteral(x.from) && AST.isTypeLiteral(x.to)) {
        if (AST.isTypeLiteral(y)) {
          const from = AST.createTypeLiteral(x.from.propertySignatures.concat(y.propertySignatures), x.from.indexSignatures.concat(y.indexSignatures));
          const to = AST.createTypeLiteral(x.to.propertySignatures.concat(y.propertySignatures), x.to.indexSignatures.concat(y.indexSignatures));
          return AST.createTransform(from, to, AST.createTypeLiteralTransformation(x.transformAST.propertySignatureTransformations));
        } else if (AST.isTransform(y) && AST.isTypeLiteralTransformation(y.transformAST) && AST.isTypeLiteral(y.from) && AST.isTypeLiteral(y.to)) {
          const from = AST.createTypeLiteral(x.from.propertySignatures.concat(y.from.propertySignatures), x.from.indexSignatures.concat(y.from.indexSignatures));
          const to = AST.createTypeLiteral(x.to.propertySignatures.concat(y.to.propertySignatures), x.to.indexSignatures.concat(y.to.indexSignatures));
          return AST.createTransform(from, to, AST.createTypeLiteralTransformation(x.transformAST.propertySignatureTransformations.concat(y.transformAST.propertySignatureTransformations)));
        }
      }
      throw new Error("`extend` can only handle type literals or unions of type literals");
    });
  }));
};
/**
 * @category combinators
 * @since 1.0.0
 */
export const extend = /*#__PURE__*/dual(2, (self, that) => make(intersectUnionMembers(AST.isUnion(self.ast) ? self.ast.types : [self.ast], AST.isUnion(that.ast) ? that.ast.types : [that.ast])));
/**
 * @category combinators
 * @since 1.0.0
 */
export const pick = (...keys) => self => make(AST.pick(self.ast, keys));
/**
 * @category combinators
 * @since 1.0.0
 */
export const omit = (...keys) => self => make(AST.omit(self.ast, keys));
/** @internal */
export const addBrand = (ast, brand, options) => {
  const annotations = toAnnotations(options);
  annotations[AST.BrandAnnotationId] = [...getBrands(ast), brand];
  return AST.mergeAnnotations(ast, annotations);
};
/**
 * Returns a nominal branded schema by applying a brand to a given schema.
 *
 * ```
 * Schema<A> + B -> Schema<A & Brand<B>>
 * ```
 *
 * @param self - The input schema to be combined with the brand.
 * @param brand - The brand to apply.
 *
 * @example
 * import * as S from "@effect/schema/Schema"
 * import { pipe } from "@effect/data/Function"
 *
 * const Int = pipe(S.number, S.int(), S.brand("Int"))
 * type Int = S.To<typeof Int> // number & Brand<"Int">
 *
 * @category combinators
 * @since 1.0.0
 */
export const brand = (brand, options) => self => {
  const ast = addBrand(self.ast, brand, options);
  const schema = make(ast);
  const validate = P.validate(schema);
  const validateOption = P.validateOption(schema);
  const validateEither = P.validateEither(schema);
  const is = P.is(schema);
  const out = Object.assign(input => validate(input), {
    [RefinedConstructorsTypeId]: RefinedConstructorsTypeId,
    [SchemaTypeId]: identity,
    ast,
    option: input => validateOption(input),
    either: input => E.mapLeft(validateEither(input), e => [{
      meta: input,
      message: formatErrors(e.errors)
    }]),
    refine: input => is(input)
  });
  return out;
};
/** @internal */
export const getBrands = ast => ast.annotations[AST.BrandAnnotationId] || [];
/**
 * @category combinators
 * @since 1.0.0
 */
export const partial = self => make(AST.partial(self.ast));
/**
 * @category combinators
 * @since 1.0.0
 */
export const required = self => make(AST.required(self.ast));
/** @internal */
export const toAnnotations = options => {
  if (!options) {
    return {};
  }
  const out = {};
  // symbols are reserved for custom annotations
  const custom = Object.getOwnPropertySymbols(options);
  for (const sym of custom) {
    out[sym] = options[sym];
  }
  // string keys are reserved as /schema namespace
  if (options.typeId !== undefined) {
    const typeId = options.typeId;
    if (typeof typeId === "object") {
      out[AST.TypeAnnotationId] = typeId.id;
      out[typeId.id] = typeId.params;
    } else {
      out[AST.TypeAnnotationId] = typeId;
    }
  }
  const move = (from, to) => {
    if (options[from] !== undefined) {
      out[to] = options[from];
    }
  };
  move("message", AST.MessageAnnotationId);
  move("identifier", AST.IdentifierAnnotationId);
  move("title", AST.TitleAnnotationId);
  move("description", AST.DescriptionAnnotationId);
  move("examples", AST.ExamplesAnnotationId);
  move("documentation", AST.DocumentationAnnotationId);
  move("jsonSchema", AST.JSONSchemaAnnotationId);
  move("arbitrary", I.ArbitraryHookId);
  return out;
};
/** @internal */
export const _filter = (from, predicate, options) => AST.createRefinement(from, (a, _, ast) => predicate(a) ? O.none() : O.some(PR.parseError([PR.type(ast, a)])), toAnnotations(options));
export function filter(predicate, options) {
  return self => make(_filter(self.ast, predicate, options));
}
// ---------------------------------------------
// string filters
// ---------------------------------------------
/**
 * @category type id
 * @since 1.0.0
 */
export const MinLengthTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/MinLength");
/** @internal */
export const _minLength = (ast, minLength, options) => _filter(ast, a => a.length >= minLength, {
  typeId: MinLengthTypeId,
  description: `a string at least ${minLength} character(s) long`,
  jsonSchema: {
    minLength
  },
  ...options
});
/**
 * @category string filters
 * @since 1.0.0
 */
export const minLength = (minLength, options) => self => make(_minLength(self.ast, minLength, options));
/**
 * @category string filters
 * @since 1.0.0
 */
export const nonEmpty = options => minLength(1, options);
/**
 * @category type id
 * @since 1.0.0
 */
export const MaxLengthTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/MaxLength");
/** @internal */
export const _maxLength = (ast, maxLength, options) => _filter(ast, a => a.length <= maxLength, {
  typeId: MaxLengthTypeId,
  description: `a string at most ${maxLength} character(s) long`,
  jsonSchema: {
    maxLength
  },
  ...options
});
/**
 * @category string filters
 * @since 1.0.0
 */
export const maxLength = (maxLength, options) => self => make(_maxLength(self.ast, maxLength, options));
/**
 * @category string filters
 * @since 1.0.0
 */
export const length = (length, options) => self => pipe(self, minLength(length), maxLength(length, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const PatternTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/Pattern");
/** @internal */
export const _pattern = (ast, regex, options) => _filter(ast, a => {
  // The following line ensures that `lastIndex` is reset to `0` in case the user has specified the `g` flag
  regex.lastIndex = 0;
  return regex.test(a);
}, {
  typeId: {
    id: PatternTypeId,
    params: {
      regex
    }
  },
  description: `a string matching the pattern ${regex.source}`,
  jsonSchema: {
    pattern
  },
  ...options
});
/**
 * @category string filters
 * @since 1.0.0
 */
export const pattern = (regex, options) => self => make(_pattern(self.ast, regex, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const StartsWithTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/StartsWith");
/** @internal */
export const _startsWith = (ast, startsWith, options) => _filter(ast, a => a.startsWith(startsWith), {
  typeId: {
    id: StartsWithTypeId,
    params: {
      startsWith
    }
  },
  description: `a string starting with ${JSON.stringify(startsWith)}`,
  jsonSchema: {
    pattern: `^${startsWith}`
  },
  ...options
});
/**
 * @category string filters
 * @since 1.0.0
 */
export const startsWith = (startsWith, options) => self => make(_startsWith(self.ast, startsWith, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const EndsWithTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/EndsWith");
/** @internal */
export const _endsWith = (ast, endsWith, options) => _filter(ast, a => a.endsWith(endsWith), {
  typeId: {
    id: EndsWithTypeId,
    params: {
      endsWith
    }
  },
  description: `a string ending with ${JSON.stringify(endsWith)}`,
  jsonSchema: {
    pattern: `^.*${endsWith}$`
  },
  ...options
});
/**
 * @category string filters
 * @since 1.0.0
 */
export const endsWith = (endsWith, options) => self => make(_endsWith(self.ast, endsWith, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const IncludesTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/Includes");
/** @internal */
export const _includes = (ast, searchString, options) => _filter(ast, a => a.includes(searchString), {
  typeId: {
    id: IncludesTypeId,
    params: {
      includes: searchString
    }
  },
  description: `a string including ${JSON.stringify(searchString)}`,
  jsonSchema: {
    pattern: `.*${searchString}.*`
  },
  ...options
});
/**
 * @category string filters
 * @since 1.0.0
 */
export const includes = (searchString, options) => self => make(_includes(self.ast, searchString, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const TrimmedTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/Trimmed");
const trimmedRegex = /^\S.*\S$|^\S$|^$/;
/** @internal */
export const _trimmed = (ast, options) => _filter(ast, a => trimmedRegex.test(a), {
  typeId: TrimmedTypeId,
  description: "a string with no leading or trailing whitespace",
  jsonSchema: {
    type: "string",
    pattern: trimmedRegex.source
  },
  ...options
});
/**
 * Verifies that a string contains no leading or trailing whitespaces.
 *
 * Note. This combinator does not make any transformations, it only validates.
 * If what you were looking for was a combinator to trim strings, then check out the `Codec.trim` combinator.
 *
 * @category string filters
 * @since 1.0.0
 */
export const trimmed = options => self => make(_trimmed(self.ast, options));
// ---------------------------------------------
// number filters
// ---------------------------------------------
/**
 * @category type id
 * @since 1.0.0
 */
export const GreaterThanTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/GreaterThan");
/** @internal */
export const _greaterThan = (ast, min, options) => _filter(ast, a => a > min, {
  typeId: GreaterThanTypeId,
  description: min === 0 ? "a positive number" : `a number greater than ${min}`,
  jsonSchema: {
    exclusiveMinimum: min
  },
  ...options
});
/**
 * @category number filters
 * @since 1.0.0
 */
export const greaterThan = (min, options) => self => make(_greaterThan(self.ast, min, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const GreaterThanOrEqualToTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/GreaterThanOrEqualTo");
/** @internal */
export const _greaterThanOrEqualTo = (ast, min, options) => _filter(ast, a => a >= min, {
  typeId: GreaterThanOrEqualToTypeId,
  description: min === 0 ? "a non-negative number" : `a number greater than or equal to ${min}`,
  jsonSchema: {
    minimum: min
  },
  ...options
});
/**
 * @category number filters
 * @since 1.0.0
 */
export const greaterThanOrEqualTo = (min, options) => self => make(_greaterThanOrEqualTo(self.ast, min, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const LessThanTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/LessThan");
/** @internal */
export const _lessThan = (ast, max, options) => _filter(ast, a => a < max, {
  typeId: LessThanTypeId,
  description: max === 0 ? "a negative number" : `a number less than ${max}`,
  jsonSchema: {
    exclusiveMaximum: max
  },
  ...options
});
/**
 * @category number filters
 * @since 1.0.0
 */
export const lessThan = (max, options) => self => make(_lessThan(self.ast, max, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const LessThanOrEqualToTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/LessThanOrEqualTo");
/** @internal */
export const _lessThanOrEqualTo = (ast, max, options) => _filter(ast, a => a <= max, {
  typeId: LessThanOrEqualToTypeId,
  description: max === 0 ? "a non-positive number" : `a number less than or equal to ${max}`,
  jsonSchema: {
    maximum: max
  },
  ...options
});
/**
 * @category number filters
 * @since 1.0.0
 */
export const lessThanOrEqualTo = (max, options) => self => make(_lessThanOrEqualTo(self.ast, max, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const IntTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/Int");
/** @internal */
export const _int = (ast, options) => _filter(ast, a => Number.isInteger(a), {
  typeId: IntTypeId,
  description: "an integer",
  jsonSchema: {
    type: "integer"
  },
  ...options
});
/**
 * @category number filters
 * @since 1.0.0
 */
export const int = options => self => make(_int(self.ast, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const FiniteTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/Finite");
/** @internal */
export const _finite = (ast, options) => _filter(ast, a => Number.isFinite(a), {
  typeId: FiniteTypeId,
  description: "a finite number",
  ...options
});
/**
 * @category number filters
 * @since 1.0.0
 */
export const finite = options => self => make(_finite(self.ast, options));
/**
 * @category number constructors
 * @since 1.0.0
 */
export const Finite = /*#__PURE__*/pipe(number, /*#__PURE__*/finite());
/** @internal */
export const _between = (ast, min, max, options) => _lessThanOrEqualTo(_greaterThanOrEqualTo(ast, min), max, {
  description: `a number between ${min} and ${max}`,
  ...options
});
/**
 * Tests if a `number` is between a minimum and a maximum value (included).
 *
 * @category number filters
 * @since 1.0.0
 */
export const between = (min, max, options) => self => make(_between(self.ast, min, max, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const NonNaNTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/NonNaN");
/** @internal */
export const _nonNaN = (ast, options) => _filter(ast, a => !Number.isNaN(a), {
  typeId: NonNaNTypeId,
  description: "a number NaN excluded",
  ...options
});
/**
 * @category number filters
 * @since 1.0.0
 */
export const nonNaN = options => self => make(_nonNaN(self.ast, options));
/** @internal */
export const _positive = (ast, options) => _greaterThan(ast, 0, options);
/**
 * @category number filters
 * @since 1.0.0
 */
export const positive = options => self => make(_positive(self.ast, options));
/** @internal */
export const _negative = (ast, options) => _lessThan(ast, 0, options);
/**
 * @category number filters
 * @since 1.0.0
 */
export const negative = options => self => make(_negative(self.ast, options));
/** @internal */
export const _nonNegative = (ast, options) => _greaterThanOrEqualTo(ast, 0, options);
/**
 * @category number filters
 * @since 1.0.0
 */
export const nonNegative = options => self => make(_nonNegative(self.ast, options));
/** @internal */
export const _nonPositive = (ast, options) => _lessThanOrEqualTo(ast, 0, options);
/**
 * @category number filters
 * @since 1.0.0
 */
export const nonPositive = options => self => make(_nonPositive(self.ast, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const MultipleOfTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/MultipleOf");
/** @internal */
export const _multipleOf = (ast, divisor, options) => _filter(ast, a => N.remainder(a, divisor) === 0, {
  typeId: MultipleOfTypeId,
  description: `a number divisible by ${divisor}`,
  jsonSchema: {
    multipleOf: Math.abs(divisor)
  },
  ...options
});
/**
 * @category number filters
 * @since 1.0.0
 */
export const multipleOf = (divisor, options) => self => make(_multipleOf(self.ast, divisor, options));
// ---------------------------------------------
// bigint filters
// ---------------------------------------------
/**
 * @category type id
 * @since 1.0.0
 */
export const GreaterThanBigintTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/GreaterThanBigint");
/** @internal */
export const _greaterThanBigint = (ast, min, options) => _filter(ast, a => a > min, {
  typeId: GreaterThanBigintTypeId,
  description: min === 0n ? "a positive bigint" : `a bigint greater than ${min}n`,
  jsonSchema: {
    exclusiveMinimum: min
  },
  ...options
});
/**
 * @category bigint filters
 * @since 1.0.0
 */
export const greaterThanBigint = (min, options) => self => make(_greaterThanBigint(self.ast, min, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const GreaterThanOrEqualToBigintTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/GreaterThanOrEqualToBigint");
/** @internal */
export const _greaterThanOrEqualToBigint = (ast, min, options) => _filter(ast, a => a >= min, {
  typeId: GreaterThanOrEqualToBigintTypeId,
  description: min === 0n ? "a non-negative bigint" : `a bigint greater than or equal to ${min}n`,
  jsonSchema: {
    minimum: min
  },
  ...options
});
/**
 * @category bigint filters
 * @since 1.0.0
 */
export const greaterThanOrEqualToBigint = (min, options) => self => make(_greaterThanOrEqualToBigint(self.ast, min, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const LessThanBigintTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/LessThanBigint");
/** @internal */
export const _lessThanBigint = (ast, max, options) => _filter(ast, a => a < max, {
  typeId: LessThanBigintTypeId,
  description: max === 0n ? "a negative bigint" : `a bigint less than ${max}n`,
  jsonSchema: {
    exclusiveMaximum: max
  },
  ...options
});
/**
 * @category bigint filters
 * @since 1.0.0
 */
export const lessThanBigint = (max, options) => self => make(_lessThanBigint(self.ast, max, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const LessThanOrEqualToBigintTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/LessThanOrEqualToBigint");
/** @internal */
export const _lessThanOrEqualToBigint = (ast, max, options) => _filter(ast, a => a <= max, {
  typeId: LessThanOrEqualToBigintTypeId,
  description: max === 0n ? "a non-positive bigint" : `a bigint less than or equal to ${max}n`,
  jsonSchema: {
    maximum: max
  },
  ...options
});
/**
 * @category bigint filters
 * @since 1.0.0
 */
export const lessThanOrEqualToBigint = (max, options) => self => make(_lessThanOrEqualToBigint(self.ast, max, options));
/** @internal */
export const _betweenBigint = (ast, min, max, options) => _lessThanOrEqualToBigint(_greaterThanOrEqualToBigint(ast, min), max, {
  description: `a bigint between ${min}n and ${max}n`,
  ...options
});
/**
 * Tests if a `bigint` is between a minimum and a maximum value (included).
 *
 * @category bigint filters
 * @since 1.0.0
 */
export const betweenBigint = (min, max, options) => self => make(_betweenBigint(self.ast, min, max, options));
/** @internal */
export const _positiveBigint = (ast, options) => _greaterThanBigint(ast, 0n, options);
/**
 * @category bigint filters
 * @since 1.0.0
 */
export const positiveBigint = options => self => make(_positiveBigint(self.ast, options));
/** @internal */
export const _negativeBigint = (ast, options) => _lessThanBigint(ast, 0n, options);
/**
 * @category bigint filters
 * @since 1.0.0
 */
export const negativeBigint = options => self => make(_negativeBigint(self.ast, options));
/** @internal */
export const _nonPositiveBigint = (ast, options) => _lessThanOrEqualToBigint(ast, 0n, options);
/**
 * @category bigint filters
 * @since 1.0.0
 */
export const nonPositiveBigint = options => self => make(_nonPositiveBigint(self.ast, options));
/** @internal */
export const _nonNegativeBigint = (ast, options) => _greaterThanOrEqualToBigint(ast, 0n, options);
/**
 * @category bigint filters
 * @since 1.0.0
 */
export const nonNegativeBigint = options => self => make(_nonNegativeBigint(self.ast, options));
// ---------------------------------------------
// ReadonlyArray filters
// ---------------------------------------------
/**
 * @category type id
 * @since 1.0.0
 */
export const MinItemsTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/MinItems");
/** @internal */
export const _minItems = (ast, n, options) => _filter(ast, a => a.length >= n, {
  typeId: MinItemsTypeId,
  description: `an array of at least ${n} items`,
  jsonSchema: {
    minItems: n
  },
  ...options
});
/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export const minItems = (n, options) => self => make(_minItems(self.ast, n, options));
/**
 * @category type id
 * @since 1.0.0
 */
export const MaxItemsTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/MaxItems");
/** @internal */
export const _maxItems = (ast, n, options) => _filter(ast, a => a.length <= n, {
  typeId: MaxItemsTypeId,
  description: `an array of at most ${n} items`,
  jsonSchema: {
    maxItems: n
  },
  ...options
});
/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export const maxItems = (n, options) => self => make(_maxItems(self.ast, n, options));
/** @internal */
export const _itemsCount = (ast, n, options) => _maxItems(_minItems(ast, n), n, {
  description: `an array of exactly ${n} items`,
  ...options
});
/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
export const itemsCount = (n, options) => self => make(_itemsCount(self.ast, n, options));
// ---------------------------------------------
// data types
// ---------------------------------------------
// ---------------------------------------------
// string constructors
// ---------------------------------------------
/**
 * @category string constructors
 * @since 1.0.0
 */
export const Trimmed = /*#__PURE__*/pipe(string, /*#__PURE__*/trimmed());
/**
 * @category type id
 * @since 1.0.0
 */
export const UUIDTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/UUID");
const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i;
/**
 * @category string constructors
 * @since 1.0.0
 */
export const UUID = /*#__PURE__*/pipe(string, /*#__PURE__*/pattern(uuidRegex, {
  typeId: UUIDTypeId,
  arbitrary: () => fc => fc.uuid()
}));
// ---------------------------------------------
// number constructors
// ---------------------------------------------
/**
 * @category number constructors
 * @since 1.0.0
 */
export const NonNaN = /*#__PURE__*/pipe(number, /*#__PURE__*/nonNaN());
/**
 * @category number constructors
 * @since 1.0.0
 */
export const Int = /*#__PURE__*/pipe(number, /*#__PURE__*/int());
/**
 * @category number constructors
 * @since 1.0.0
 */
export const Positive = /*#__PURE__*/pipe(number, /*#__PURE__*/positive());
/**
 * @category number constructors
 * @since 1.0.0
 */
export const Negative = /*#__PURE__*/pipe(number, /*#__PURE__*/negative());
/**
 * @category number constructors
 * @since 1.0.0
 */
export const NonNegative = /*#__PURE__*/pipe(number, /*#__PURE__*/nonNegative());
/**
 * @category number constructors
 * @since 1.0.0
 */
export const NonPositive = /*#__PURE__*/pipe(number, /*#__PURE__*/nonPositive());
// ---------------------------------------------
// bigint constructors
// ---------------------------------------------
/**
 * @category bigint constructors
 * @since 1.0.0
 */
export const PositiveBigint = /*#__PURE__*/pipe(bigint, /*#__PURE__*/positiveBigint());
/**
 * @category bigint constructors
 * @since 1.0.0
 */
export const NegativeBigint = /*#__PURE__*/pipe(bigint, /*#__PURE__*/negativeBigint());
/**
 * @category bigint constructors
 * @since 1.0.0
 */
export const NonNegativeBigint = /*#__PURE__*/pipe(bigint, /*#__PURE__*/nonNegativeBigint());
/**
 * @category bigint constructors
 * @since 1.0.0
 */
export const NonPositiveBigint = /*#__PURE__*/pipe(bigint, /*#__PURE__*/nonPositiveBigint());
// ---------------------------------------------
// Date
// ---------------------------------------------
const dateArbitrary = () => fc => fc.date();
const datePretty = () => date => `new Date(${JSON.stringify(date)})`;
/**
 * @category Date constructors
 * @since 1.0.0
 */
export const Date = /*#__PURE__*/declare([], /*#__PURE__*/struct({}), () => (u, _, self) => !isDate(u) ? PR.failure(PR.type(self, u)) : PR.success(u), {
  [AST.IdentifierAnnotationId]: "Date",
  [I.PrettyHookId]: datePretty,
  [I.ArbitraryHookId]: dateArbitrary
});
/**
 * @category type id
 * @since 1.0.0
 */
export const ValidDateTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/ValidDate");
/**
 * A filter excluding invalid dates (e.g. `new Date("fail")`).
 *
 * @category Date combinators
 * @since 1.0.0
 */
export const validDate = options => self => pipe(self, filter(a => !isNaN(a.getTime()), {
  typeId: ValidDateTypeId,
  description: "a valid Date",
  ...options
}));
/**
 * A schema representing valid dates, e.g. `new Date("fail")` is excluded, even though it is an instance of `Date`.
 *
 * @category Date constructors
 * @since 1.0.0
 */
export const ValidDate = /*#__PURE__*/pipe(Date, /*#__PURE__*/validDate());
// ---------------------------------------------
// Chunk
// ---------------------------------------------
/** @internal */
export const chunkArbitrary = item => fc => fc.array(item(fc)).map(C.fromIterable);
/** @internal */
export const chunkPretty = item => c => `Chunk(${C.toReadonlyArray(c).map(item).join(", ")})`;
/**
 * @category Chunk constructors
 * @since 1.0.0
 */
export const chunk = item => declare([item], struct({
  _id: uniqueSymbol(Symbol.for("@effect/data/Chunk")),
  length: number
}), item => {
  const parseResult = P.parseResult(array(item));
  return (u, options, self) => !C.isChunk(u) ? PR.failure(PR.type(self, u)) : PR.map(parseResult(C.toReadonlyArray(u), options), C.fromIterable);
}, {
  [AST.TitleAnnotationId]: "Chunk",
  [AST.DescriptionAnnotationId]: "a Chunk",
  [I.PrettyHookId]: chunkPretty,
  [I.ArbitraryHookId]: chunkArbitrary
});
// ---------------------------------------------
// Data
// ---------------------------------------------
/** @internal */
export const toData = a => Array.isArray(a) ? D.array(a) : D.struct(a);
/** @internal */
export const dataArbitrary = item => fc => item(fc).map(toData);
/** @internal */
export const dataPretty = item => d => `Data(${item(d)})`;
/**
 * @category Data constructors
 * @since 1.0.0
 */
export const data = item => declare([item], item, item => {
  const parseResult = P.parseResult(item);
  return (u, options, self) => !Equal.isEqual(u) ? PR.failure(PR.type(self, u)) : PR.map(parseResult(u, options), toData);
}, {
  [AST.TitleAnnotationId]: "Data",
  [AST.DescriptionAnnotationId]: "a Data",
  [I.PrettyHookId]: dataPretty,
  [I.ArbitraryHookId]: dataArbitrary
});
// ---------------------------------------------
// Either
// ---------------------------------------------
/** @internal */
export const eitherArbitrary = (left, right) => fc => fc.oneof(left(fc).map(E.left), right(fc).map(E.right));
/** @internal */
export const eitherPretty = (left, right) => E.match(e => `left(${left(e)})`, a => `right(${right(a)})`);
const eitherInline = (left, right) => union(struct({
  _tag: literal("Left"),
  left
}), struct({
  _tag: literal("Right"),
  right
}));
/**
 * @category Either constructors
 * @since 1.0.0
 */
export const either = (left, right) => {
  return declare([left, right], eitherInline(left, right), (left, right) => {
    const parseResultLeft = P.parseResult(left);
    const parseResultRight = P.parseResult(right);
    return (u, options, self) => !E.isEither(u) ? PR.failure(PR.type(self, u)) : E.isLeft(u) ? PR.map(parseResultLeft(u.left, options), E.left) : PR.map(parseResultRight(u.right, options), E.right);
  }, {
    [AST.TitleAnnotationId]: "Either",
    [AST.DescriptionAnnotationId]: "an Either",
    [I.PrettyHookId]: eitherPretty,
    [I.ArbitraryHookId]: eitherArbitrary
  });
};
const arbitraryJson = fc => fc.jsonValue().map(json => json);
/**
 * @category type id
 * @since 1.0.0
 */
export const JsonNumberTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/JsonNumber");
/**
 * The `JsonNumber` is a schema for representing JSON numbers. It ensures that the provided value is a valid
 * number by filtering out `NaN` and `(+/-) Infinity`. This is useful when you want to validate and represent numbers in JSON
 * format.
 *
 * @example
 * import * as S from "@effect/schema/Schema"
 *
 * const is = S.is(S.JsonNumber)
 *
 * assert.deepStrictEqual(is(42), true)
 * assert.deepStrictEqual(is(Number.NaN), false)
 * assert.deepStrictEqual(is(Number.POSITIVE_INFINITY), false)
 * assert.deepStrictEqual(is(Number.NEGATIVE_INFINITY), false)
 *
 * @category Json constructors
 * @since 1.0.0
 */
export const JsonNumber = /*#__PURE__*/pipe(number, /*#__PURE__*/filter(n => !isNaN(n) && isFinite(n), {
  typeId: JsonNumberTypeId,
  title: "JSONNumber",
  description: "a JSON number"
}));
/**
 * @category Json constructors
 * @since 1.0.0
 */
export const json = /*#__PURE__*/lazy(() => union(_null, string, JsonNumber, boolean, array(json), record(string, json)), {
  [I.ArbitraryHookId]: () => arbitraryJson
});
// ---------------------------------------------
// Option
// ---------------------------------------------
/** @internal */
export const optionArbitrary = value => fc => fc.oneof(fc.constant(O.none()), value(fc).map(O.some));
/** @internal */
export const optionPretty = value => O.match(() => "none()", a => `some(${value(a)})`);
const optionInline = value => union(struct({
  _tag: literal("None")
}), struct({
  _tag: literal("Some"),
  value
}));
/**
 * @category Option constructors
 * @since 1.0.0
 */
export const option = value => {
  return declare([value], optionInline(value), value => {
    const parseResult = P.parseResult(value);
    return (u, options, self) => !O.isOption(u) ? PR.failure(PR.type(self, u)) : O.isNone(u) ? PR.success(O.none()) : PR.map(parseResult(u.value, options), O.some);
  }, {
    [AST.TitleAnnotationId]: "Option",
    [AST.DescriptionAnnotationId]: "an Option",
    [I.PrettyHookId]: optionPretty,
    [I.ArbitraryHookId]: optionArbitrary
  });
};
// ---------------------------------------------
// ReadonlyMap
// ---------------------------------------------
/** @internal */
export const isMap = u => u instanceof Map;
/** @internal */
export const readonlyMapArbitrary = (key, value) => fc => fc.array(fc.tuple(key(fc), value(fc))).map(as => new Map(as));
/** @internal */
export const readonlyMapPretty = (key, value) => map => `new Map([${Array.from(map.entries()).map(([k, v]) => `[${key(k)}, ${value(v)}]`).join(", ")}])`;
/**
 * @category ReadonlyMap constructors
 * @since 1.0.0
 */
export const readonlyMap = (key, value) => declare([key, value], struct({
  size: number
}), (key, value) => {
  const parseResult = P.parseResult(array(tuple(key, value)));
  return (u, options, self) => !isMap(u) ? PR.failure(PR.type(self, u)) : PR.map(parseResult(Array.from(u.entries()), options), as => new Map(as));
}, {
  [AST.TitleAnnotationId]: "ReadonlyMap",
  [AST.DescriptionAnnotationId]: "a ReadonlyMap",
  [I.PrettyHookId]: readonlyMapPretty,
  [I.ArbitraryHookId]: readonlyMapArbitrary
});
// ---------------------------------------------
// ReadonlySet
// ---------------------------------------------
/** @internal */
export const isSet = u => u instanceof Set;
/** @internal */
export const readonlySetArbitrary = item => fc => fc.array(item(fc)).map(as => new Set(as));
/** @internal */
export const readonlySetPretty = item => set => `new Set([${Array.from(set.values()).map(a => item(a)).join(", ")}])`;
/**
 * @category ReadonlySet constructors
 * @since 1.0.0
 */
export const readonlySet = item => declare([item], struct({
  size: number
}), item => (u, options, self) => {
  const parseResult = P.parseResult(array(item));
  return !isSet(u) ? PR.failure(PR.type(self, u)) : PR.map(parseResult(Array.from(u.values()), options), as => new Set(as));
}, {
  [AST.TitleAnnotationId]: "ReadonlySet",
  [AST.DescriptionAnnotationId]: "a ReadonlySet",
  [I.PrettyHookId]: readonlySetPretty,
  [I.ArbitraryHookId]: readonlySetArbitrary
});
//# sourceMappingURL=Schema.mjs.map