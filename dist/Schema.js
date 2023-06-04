"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.array = exports.any = exports.annotations = exports.addBrand = exports._trimmed = exports._startsWith = exports._positiveBigint = exports._positive = exports._pattern = exports._nonPositiveBigint = exports._nonPositive = exports._nonNegativeBigint = exports._nonNegative = exports._nonNaN = exports._negativeBigint = exports._negative = exports._multipleOf = exports._minLength = exports._minItems = exports._maxLength = exports._maxItems = exports._lessThanOrEqualToBigint = exports._lessThanOrEqualTo = exports._lessThanBigint = exports._lessThan = exports._itemsCount = exports._int = exports._includes = exports._greaterThanOrEqualToBigint = exports._greaterThanOrEqualTo = exports._greaterThanBigint = exports._greaterThan = exports._finite = exports._filter = exports._endsWith = exports._betweenBigint = exports._between = exports.ValidDateTypeId = exports.ValidDate = exports.UUIDTypeId = exports.UUID = exports.TrimmedTypeId = exports.Trimmed = exports.StartsWithTypeId = exports.SchemaTypeId = exports.PropertySignatureImpl = exports.PositiveBigint = exports.Positive = exports.PatternTypeId = exports.NonPositiveBigint = exports.NonPositive = exports.NonNegativeBigint = exports.NonNegative = exports.NonNaNTypeId = exports.NonNaN = exports.NegativeBigint = exports.Negative = exports.MultipleOfTypeId = exports.MinLengthTypeId = exports.MinItemsTypeId = exports.MaxLengthTypeId = exports.MaxItemsTypeId = exports.LessThanTypeId = exports.LessThanOrEqualToTypeId = exports.LessThanOrEqualToBigintTypeId = exports.LessThanBigintTypeId = exports.JsonNumberTypeId = exports.JsonNumber = exports.IntTypeId = exports.Int = exports.InstanceOfTypeId = exports.IncludesTypeId = exports.GreaterThanTypeId = exports.GreaterThanOrEqualToTypeId = exports.GreaterThanOrEqualToBigintTypeId = exports.GreaterThanBigintTypeId = exports.FiniteTypeId = exports.Finite = exports.EndsWithTypeId = exports.Date = exports.BrandTypeId = void 0;
Object.defineProperty(exports, "asserts", {
  enumerable: true,
  get: function () {
    return P.asserts;
  }
});
exports.enums = exports.endsWith = exports.element = exports.eitherPretty = exports.eitherArbitrary = exports.either = exports.declare = exports.dataPretty = exports.dataArbitrary = exports.data = exports.chunkPretty = exports.chunkArbitrary = exports.chunk = exports.brand = exports.boolean = exports.bigint = exports.betweenBigint = exports.between = void 0;
exports.extend = void 0;
exports.filter = filter;
exports.intersectUnionMembers = exports.int = exports.instanceOf = exports.includes = exports.greaterThanOrEqualToBigint = exports.greaterThanOrEqualTo = exports.greaterThanBigint = exports.greaterThan = exports.getBrands = exports.fromBrand = exports.finite = void 0;
Object.defineProperty(exports, "is", {
  enumerable: true,
  get: function () {
    return P.is;
  }
});
exports.validDate = exports.unknown = exports.uniqueSymbol = exports.union = exports.undefined = exports.tuple = exports.trimmed = exports.toData = exports.toAnnotations = exports.templateLiteral = exports.symbol = exports.struct = exports.string = exports.startsWith = exports.rest = exports.required = exports.record = exports.readonlySetPretty = exports.readonlySetArbitrary = exports.readonlySet = exports.readonlyMapPretty = exports.readonlyMapArbitrary = exports.readonlyMap = exports.propertySignature = exports.positiveBigint = exports.positive = exports.pick = exports.pattern = exports.partial = exports.optionalElement = exports.optional = exports.optionPretty = exports.optionArbitrary = exports.option = exports.omit = exports.object = exports.number = exports.nullable = exports.null = exports.nonPositiveBigint = exports.nonPositive = exports.nonNegativeBigint = exports.nonNegative = exports.nonNaN = exports.nonEmptyArray = exports.nonEmpty = exports.never = exports.negativeBigint = exports.negative = exports.multipleOf = exports.minLength = exports.minItems = exports.maxLength = exports.maxItems = exports.make = exports.literal = exports.lessThanOrEqualToBigint = exports.lessThanOrEqualTo = exports.lessThanBigint = exports.lessThan = exports.length = exports.lazy = exports.keyof = exports.json = exports.itemsCount = exports.isSet = exports.isMap = void 0;
Object.defineProperty(exports, "validate", {
  enumerable: true,
  get: function () {
    return P.validate;
  }
});
Object.defineProperty(exports, "validateEffect", {
  enumerable: true,
  get: function () {
    return P.validateEffect;
  }
});
Object.defineProperty(exports, "validateEither", {
  enumerable: true,
  get: function () {
    return P.validateEither;
  }
});
Object.defineProperty(exports, "validateOption", {
  enumerable: true,
  get: function () {
    return P.validateOption;
  }
});
Object.defineProperty(exports, "validatePromise", {
  enumerable: true,
  get: function () {
    return P.validatePromise;
  }
});
Object.defineProperty(exports, "validateResult", {
  enumerable: true,
  get: function () {
    return P.validateResult;
  }
});
exports.void = void 0;
var _Brand = /*#__PURE__*/require("@effect/data/Brand");
var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var D = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Data"));
var _Debug = /*#__PURE__*/require("@effect/data/Debug");
var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var N = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Number"));
var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var _Predicate = /*#__PURE__*/require("@effect/data/Predicate");
var ReadonlyArray = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/ReadonlyArray"));
var AST = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/AST"));
var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/internal/common"));
var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/Parser"));
var PR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/ParseResult"));
var _TreeFormatter = /*#__PURE__*/require("@effect/schema/TreeFormatter");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

// ---------------------------------------------
// model
// ---------------------------------------------
/**
 * @category model
 * @since 1.0.0
 */
const SchemaTypeId = /*#__PURE__*/Symbol.for("@effect/schema/Schema");
// ---------------------------------------------
// validating / asserts / guards
// ---------------------------------------------
/* c8 ignore start */
exports.SchemaTypeId = SchemaTypeId;
// ---------------------------------------------
// annotations
// ---------------------------------------------
/**
 * @category combinators
 * @since 1.0.0
 */
const annotations = options => self => make(AST.mergeAnnotations(self.ast, toAnnotations(options)));
// ---------------------------------------------
// constructors
// ---------------------------------------------
/**
 * @category constructors
 * @since 1.0.0
 */
exports.annotations = annotations;
const make = ast => ({
  [SchemaTypeId]: _Function.identity,
  ast
});
/**
  @category constructors
  @since 1.0.0
*/
exports.make = make;
const declare = (typeParameters, type, decode, annotations) => make(AST.createDeclaration(typeParameters.map(schema => schema.ast), type.ast, (...typeParameters) => decode(...typeParameters.map(make)), annotations));
/**
 * @category constructors
 * @since 1.0.0
 */
exports.declare = declare;
const literal = (...literals) => make(AST.createUnion(literals.map(literal => AST.createLiteral(literal))));
/**
 * @category constructors
 * @since 1.0.0
 */
exports.literal = literal;
const uniqueSymbol = (symbol, annotations) => make(AST.createUniqueSymbol(symbol, annotations));
/**
 * @category constructors
 * @since 1.0.0
 */
exports.uniqueSymbol = uniqueSymbol;
const enums = enums => make(AST.createEnums(Object.keys(enums).filter(key => typeof enums[enums[key]] !== "number").map(key => [key, enums[key]])));
/**
 * @category constructors
 * @since 1.0.0
 */
exports.enums = enums;
const templateLiteral = (...[head, ...tail]) => {
  let types = getTemplateLiterals(head.ast);
  for (const span of tail) {
    types = (0, _Function.pipe)(types, ReadonlyArray.flatMap(a => getTemplateLiterals(span.ast).map(b => combineTemplateLiterals(a, b))));
  }
  return make(AST.createUnion(types));
};
exports.templateLiteral = templateLiteral;
const combineTemplateLiterals = (a, b) => {
  if (AST.isLiteral(a)) {
    return AST.isLiteral(b) ? AST.createLiteral(String(a.literal) + String(b.literal)) : AST.createTemplateLiteral(String(a.literal) + b.head, b.spans);
  }
  if (AST.isLiteral(b)) {
    return AST.createTemplateLiteral(a.head, (0, _Function.pipe)(a.spans, ReadonlyArray.modifyNonEmptyLast(span => ({
      ...span,
      literal: span.literal + String(b.literal)
    }))));
  }
  return AST.createTemplateLiteral(a.head, (0, _Function.pipe)(a.spans, ReadonlyArray.modifyNonEmptyLast(span => ({
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
      return (0, _Function.pipe)(ast.types, ReadonlyArray.flatMap(getTemplateLiterals));
    default:
      throw new Error(`templateLiteral: unsupported template literal span ${ast._tag}`);
  }
};
/**
 * @category type id
 * @since 1.0.0
 */
const InstanceOfTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/InstanceOf");
/**
 * @category constructors
 * @since 1.0.0
 */
exports.InstanceOfTypeId = InstanceOfTypeId;
const instanceOf = (constructor, options) => declare([], struct({}), () => (input, _, self) => input instanceof constructor ? PR.success(input) : PR.failure(PR.type(self, input)), {
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
exports.instanceOf = instanceOf;
const BrandTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/Brand");
/**
 * @category constructors
 * @since 1.0.0
 */
exports.BrandTypeId = BrandTypeId;
const fromBrand = (constructor, options) => self => {
  const filter = (0, _Debug.untracedMethod)(() => (a, _, self) => {
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
exports.fromBrand = fromBrand;
const _undefined = /*#__PURE__*/make(AST.undefinedKeyword);
exports.undefined = _undefined;
const _void = /*#__PURE__*/make(AST.voidKeyword);
exports.void = _void;
const _null = /*#__PURE__*/make( /*#__PURE__*/AST.createLiteral(null));
exports.null = _null;
/**
 * @category primitives
 * @since 1.0.0
 */
const never = /*#__PURE__*/make(AST.neverKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
exports.never = never;
const unknown = /*#__PURE__*/make(AST.unknownKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
exports.unknown = unknown;
const any = /*#__PURE__*/make(AST.anyKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
exports.any = any;
const string = /*#__PURE__*/make(AST.stringKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
exports.string = string;
const number = /*#__PURE__*/make(AST.numberKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
exports.number = number;
const boolean = /*#__PURE__*/make(AST.booleanKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
exports.boolean = boolean;
const bigint = /*#__PURE__*/make(AST.bigIntKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
exports.bigint = bigint;
const symbol = /*#__PURE__*/make(AST.symbolKeyword);
/**
 * @category primitives
 * @since 1.0.0
 */
exports.symbol = symbol;
const object = /*#__PURE__*/make(AST.objectKeyword);
// ---------------------------------------------
// combinators
// ---------------------------------------------
/**
 * @category combinators
 * @since 1.0.0
 */
exports.object = object;
const union = (...members) => make(AST.createUnion(members.map(m => m.ast)));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.union = union;
const nullable = self => union(_null, self);
/**
 * @category combinators
 * @since 1.0.0
 */
exports.nullable = nullable;
const keyof = schema => make(AST.keyof(schema.ast));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.keyof = keyof;
const tuple = (...elements) => make(AST.createTuple(elements.map(schema => AST.createElement(schema.ast, false)), O.none(), true));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.tuple = tuple;
const optionalElement = element => self => {
  if (AST.isTuple(self.ast)) {
    return make(AST.appendElement(self.ast, AST.createElement(element.ast, true)));
  }
  throw new Error("`optionalElement` is not supported on this schema");
};
/**
 * @category combinators
 * @since 1.0.0
 */
exports.optionalElement = optionalElement;
const rest = rest => self => {
  if (AST.isTuple(self.ast)) {
    return make(AST.appendRestElement(self.ast, rest.ast));
  }
  throw new Error("`rest` is not supported on this schema");
};
/**
 * @category combinators
 * @since 1.0.0
 */
exports.rest = rest;
const element = element => self => {
  if (AST.isTuple(self.ast)) {
    return make(AST.appendElement(self.ast, AST.createElement(element.ast, false)));
  }
  throw new Error("`element` is not supported on this schema");
};
/**
 * @category combinators
 * @since 1.0.0
 */
exports.element = element;
const array = item => make(AST.createTuple([], O.some([item.ast]), true));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.array = array;
const nonEmptyArray = item => (0, _Function.pipe)(tuple(item), rest(item));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.nonEmptyArray = nonEmptyArray;
const lazy = (f, annotations) => make(AST.createLazy(() => f().ast, annotations));
/** @internal */
exports.lazy = lazy;
class PropertySignatureImpl {
  config;
  [SchemaTypeId] = _Function.identity;
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
exports.PropertySignatureImpl = PropertySignatureImpl;
const propertySignature = (schema, options) => new PropertySignatureImpl({
  _tag: "PropertySignature",
  ast: schema.ast,
  annotations: toAnnotations(options)
});
/**
 * @since 1.0.0
 */
exports.propertySignature = propertySignature;
const optional = (schema, options) => new PropertySignatureImpl({
  _tag: "Optional",
  ast: schema.ast,
  annotations: toAnnotations(options)
});
/**
 * @category combinators
 * @since 1.0.0
 */
exports.optional = optional;
const struct = fields => make(AST.createTypeLiteral(I.ownKeys(fields).map(key => {
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
exports.struct = struct;
const record = (key, value) => make(AST.createRecord(key.ast, value.ast, true));
/** @internal */
exports.record = record;
const intersectUnionMembers = (xs, ys) => {
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
exports.intersectUnionMembers = intersectUnionMembers;
const extend = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => make(intersectUnionMembers(AST.isUnion(self.ast) ? self.ast.types : [self.ast], AST.isUnion(that.ast) ? that.ast.types : [that.ast])));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.extend = extend;
const pick = (...keys) => self => make(AST.pick(self.ast, keys));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.pick = pick;
const omit = (...keys) => self => make(AST.omit(self.ast, keys));
/** @internal */
exports.omit = omit;
const addBrand = (ast, brand, options) => {
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
exports.addBrand = addBrand;
const brand = (brand, options) => self => {
  const ast = addBrand(self.ast, brand, options);
  const schema = make(ast);
  const validate = P.validate(schema);
  const validateOption = P.validateOption(schema);
  const validateEither = P.validateEither(schema);
  const is = P.is(schema);
  const out = Object.assign(input => validate(input), {
    [_Brand.RefinedConstructorsTypeId]: _Brand.RefinedConstructorsTypeId,
    [SchemaTypeId]: _Function.identity,
    ast,
    option: input => validateOption(input),
    either: input => E.mapLeft(validateEither(input), e => [{
      meta: input,
      message: (0, _TreeFormatter.formatErrors)(e.errors)
    }]),
    refine: input => is(input)
  });
  return out;
};
/** @internal */
exports.brand = brand;
const getBrands = ast => ast.annotations[AST.BrandAnnotationId] || [];
/**
 * @category combinators
 * @since 1.0.0
 */
exports.getBrands = getBrands;
const partial = self => make(AST.partial(self.ast));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.partial = partial;
const required = self => make(AST.required(self.ast));
/** @internal */
exports.required = required;
const toAnnotations = options => {
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
exports.toAnnotations = toAnnotations;
const _filter = (from, predicate, options) => AST.createRefinement(from, (a, _, ast) => predicate(a) ? O.none() : O.some(PR.parseError([PR.type(ast, a)])), toAnnotations(options));
exports._filter = _filter;
function filter(predicate, options) {
  return self => make(_filter(self.ast, predicate, options));
}
// ---------------------------------------------
// string filters
// ---------------------------------------------
/**
 * @category type id
 * @since 1.0.0
 */
const MinLengthTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/MinLength");
/** @internal */
exports.MinLengthTypeId = MinLengthTypeId;
const _minLength = (ast, minLength, options) => _filter(ast, a => a.length >= minLength, {
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
exports._minLength = _minLength;
const minLength = (minLength, options) => self => make(_minLength(self.ast, minLength, options));
/**
 * @category string filters
 * @since 1.0.0
 */
exports.minLength = minLength;
const nonEmpty = options => minLength(1, options);
/**
 * @category type id
 * @since 1.0.0
 */
exports.nonEmpty = nonEmpty;
const MaxLengthTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/MaxLength");
/** @internal */
exports.MaxLengthTypeId = MaxLengthTypeId;
const _maxLength = (ast, maxLength, options) => _filter(ast, a => a.length <= maxLength, {
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
exports._maxLength = _maxLength;
const maxLength = (maxLength, options) => self => make(_maxLength(self.ast, maxLength, options));
/**
 * @category string filters
 * @since 1.0.0
 */
exports.maxLength = maxLength;
const length = (length, options) => self => (0, _Function.pipe)(self, minLength(length), maxLength(length, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.length = length;
const PatternTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/Pattern");
/** @internal */
exports.PatternTypeId = PatternTypeId;
const _pattern = (ast, regex, options) => _filter(ast, a => {
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
exports._pattern = _pattern;
const pattern = (regex, options) => self => make(_pattern(self.ast, regex, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.pattern = pattern;
const StartsWithTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/StartsWith");
/** @internal */
exports.StartsWithTypeId = StartsWithTypeId;
const _startsWith = (ast, startsWith, options) => _filter(ast, a => a.startsWith(startsWith), {
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
exports._startsWith = _startsWith;
const startsWith = (startsWith, options) => self => make(_startsWith(self.ast, startsWith, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.startsWith = startsWith;
const EndsWithTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/EndsWith");
/** @internal */
exports.EndsWithTypeId = EndsWithTypeId;
const _endsWith = (ast, endsWith, options) => _filter(ast, a => a.endsWith(endsWith), {
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
exports._endsWith = _endsWith;
const endsWith = (endsWith, options) => self => make(_endsWith(self.ast, endsWith, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.endsWith = endsWith;
const IncludesTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/Includes");
/** @internal */
exports.IncludesTypeId = IncludesTypeId;
const _includes = (ast, searchString, options) => _filter(ast, a => a.includes(searchString), {
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
exports._includes = _includes;
const includes = (searchString, options) => self => make(_includes(self.ast, searchString, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.includes = includes;
const TrimmedTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/Trimmed");
exports.TrimmedTypeId = TrimmedTypeId;
const trimmedRegex = /^\S.*\S$|^\S$|^$/;
/** @internal */
const _trimmed = (ast, options) => _filter(ast, a => trimmedRegex.test(a), {
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
exports._trimmed = _trimmed;
const trimmed = options => self => make(_trimmed(self.ast, options));
// ---------------------------------------------
// number filters
// ---------------------------------------------
/**
 * @category type id
 * @since 1.0.0
 */
exports.trimmed = trimmed;
const GreaterThanTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/GreaterThan");
/** @internal */
exports.GreaterThanTypeId = GreaterThanTypeId;
const _greaterThan = (ast, min, options) => _filter(ast, a => a > min, {
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
exports._greaterThan = _greaterThan;
const greaterThan = (min, options) => self => make(_greaterThan(self.ast, min, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.greaterThan = greaterThan;
const GreaterThanOrEqualToTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/GreaterThanOrEqualTo");
/** @internal */
exports.GreaterThanOrEqualToTypeId = GreaterThanOrEqualToTypeId;
const _greaterThanOrEqualTo = (ast, min, options) => _filter(ast, a => a >= min, {
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
exports._greaterThanOrEqualTo = _greaterThanOrEqualTo;
const greaterThanOrEqualTo = (min, options) => self => make(_greaterThanOrEqualTo(self.ast, min, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.greaterThanOrEqualTo = greaterThanOrEqualTo;
const LessThanTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/LessThan");
/** @internal */
exports.LessThanTypeId = LessThanTypeId;
const _lessThan = (ast, max, options) => _filter(ast, a => a < max, {
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
exports._lessThan = _lessThan;
const lessThan = (max, options) => self => make(_lessThan(self.ast, max, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.lessThan = lessThan;
const LessThanOrEqualToTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/LessThanOrEqualTo");
/** @internal */
exports.LessThanOrEqualToTypeId = LessThanOrEqualToTypeId;
const _lessThanOrEqualTo = (ast, max, options) => _filter(ast, a => a <= max, {
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
exports._lessThanOrEqualTo = _lessThanOrEqualTo;
const lessThanOrEqualTo = (max, options) => self => make(_lessThanOrEqualTo(self.ast, max, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.lessThanOrEqualTo = lessThanOrEqualTo;
const IntTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/Int");
/** @internal */
exports.IntTypeId = IntTypeId;
const _int = (ast, options) => _filter(ast, a => Number.isInteger(a), {
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
exports._int = _int;
const int = options => self => make(_int(self.ast, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.int = int;
const FiniteTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/Finite");
/** @internal */
exports.FiniteTypeId = FiniteTypeId;
const _finite = (ast, options) => _filter(ast, a => Number.isFinite(a), {
  typeId: FiniteTypeId,
  description: "a finite number",
  ...options
});
/**
 * @category number filters
 * @since 1.0.0
 */
exports._finite = _finite;
const finite = options => self => make(_finite(self.ast, options));
/**
 * @category number constructors
 * @since 1.0.0
 */
exports.finite = finite;
const Finite = /*#__PURE__*/(0, _Function.pipe)(number, /*#__PURE__*/finite());
/** @internal */
exports.Finite = Finite;
const _between = (ast, min, max, options) => _lessThanOrEqualTo(_greaterThanOrEqualTo(ast, min), max, {
  description: `a number between ${min} and ${max}`,
  ...options
});
/**
 * Tests if a `number` is between a minimum and a maximum value (included).
 *
 * @category number filters
 * @since 1.0.0
 */
exports._between = _between;
const between = (min, max, options) => self => make(_between(self.ast, min, max, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.between = between;
const NonNaNTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/NonNaN");
/** @internal */
exports.NonNaNTypeId = NonNaNTypeId;
const _nonNaN = (ast, options) => _filter(ast, a => !Number.isNaN(a), {
  typeId: NonNaNTypeId,
  description: "a number NaN excluded",
  ...options
});
/**
 * @category number filters
 * @since 1.0.0
 */
exports._nonNaN = _nonNaN;
const nonNaN = options => self => make(_nonNaN(self.ast, options));
/** @internal */
exports.nonNaN = nonNaN;
const _positive = (ast, options) => _greaterThan(ast, 0, options);
/**
 * @category number filters
 * @since 1.0.0
 */
exports._positive = _positive;
const positive = options => self => make(_positive(self.ast, options));
/** @internal */
exports.positive = positive;
const _negative = (ast, options) => _lessThan(ast, 0, options);
/**
 * @category number filters
 * @since 1.0.0
 */
exports._negative = _negative;
const negative = options => self => make(_negative(self.ast, options));
/** @internal */
exports.negative = negative;
const _nonNegative = (ast, options) => _greaterThanOrEqualTo(ast, 0, options);
/**
 * @category number filters
 * @since 1.0.0
 */
exports._nonNegative = _nonNegative;
const nonNegative = options => self => make(_nonNegative(self.ast, options));
/** @internal */
exports.nonNegative = nonNegative;
const _nonPositive = (ast, options) => _lessThanOrEqualTo(ast, 0, options);
/**
 * @category number filters
 * @since 1.0.0
 */
exports._nonPositive = _nonPositive;
const nonPositive = options => self => make(_nonPositive(self.ast, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.nonPositive = nonPositive;
const MultipleOfTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/MultipleOf");
/** @internal */
exports.MultipleOfTypeId = MultipleOfTypeId;
const _multipleOf = (ast, divisor, options) => _filter(ast, a => N.remainder(a, divisor) === 0, {
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
exports._multipleOf = _multipleOf;
const multipleOf = (divisor, options) => self => make(_multipleOf(self.ast, divisor, options));
// ---------------------------------------------
// bigint filters
// ---------------------------------------------
/**
 * @category type id
 * @since 1.0.0
 */
exports.multipleOf = multipleOf;
const GreaterThanBigintTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/GreaterThanBigint");
/** @internal */
exports.GreaterThanBigintTypeId = GreaterThanBigintTypeId;
const _greaterThanBigint = (ast, min, options) => _filter(ast, a => a > min, {
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
exports._greaterThanBigint = _greaterThanBigint;
const greaterThanBigint = (min, options) => self => make(_greaterThanBigint(self.ast, min, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.greaterThanBigint = greaterThanBigint;
const GreaterThanOrEqualToBigintTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/GreaterThanOrEqualToBigint");
/** @internal */
exports.GreaterThanOrEqualToBigintTypeId = GreaterThanOrEqualToBigintTypeId;
const _greaterThanOrEqualToBigint = (ast, min, options) => _filter(ast, a => a >= min, {
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
exports._greaterThanOrEqualToBigint = _greaterThanOrEqualToBigint;
const greaterThanOrEqualToBigint = (min, options) => self => make(_greaterThanOrEqualToBigint(self.ast, min, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.greaterThanOrEqualToBigint = greaterThanOrEqualToBigint;
const LessThanBigintTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/LessThanBigint");
/** @internal */
exports.LessThanBigintTypeId = LessThanBigintTypeId;
const _lessThanBigint = (ast, max, options) => _filter(ast, a => a < max, {
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
exports._lessThanBigint = _lessThanBigint;
const lessThanBigint = (max, options) => self => make(_lessThanBigint(self.ast, max, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.lessThanBigint = lessThanBigint;
const LessThanOrEqualToBigintTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/LessThanOrEqualToBigint");
/** @internal */
exports.LessThanOrEqualToBigintTypeId = LessThanOrEqualToBigintTypeId;
const _lessThanOrEqualToBigint = (ast, max, options) => _filter(ast, a => a <= max, {
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
exports._lessThanOrEqualToBigint = _lessThanOrEqualToBigint;
const lessThanOrEqualToBigint = (max, options) => self => make(_lessThanOrEqualToBigint(self.ast, max, options));
/** @internal */
exports.lessThanOrEqualToBigint = lessThanOrEqualToBigint;
const _betweenBigint = (ast, min, max, options) => _lessThanOrEqualToBigint(_greaterThanOrEqualToBigint(ast, min), max, {
  description: `a bigint between ${min}n and ${max}n`,
  ...options
});
/**
 * Tests if a `bigint` is between a minimum and a maximum value (included).
 *
 * @category bigint filters
 * @since 1.0.0
 */
exports._betweenBigint = _betweenBigint;
const betweenBigint = (min, max, options) => self => make(_betweenBigint(self.ast, min, max, options));
/** @internal */
exports.betweenBigint = betweenBigint;
const _positiveBigint = (ast, options) => _greaterThanBigint(ast, 0n, options);
/**
 * @category bigint filters
 * @since 1.0.0
 */
exports._positiveBigint = _positiveBigint;
const positiveBigint = options => self => make(_positiveBigint(self.ast, options));
/** @internal */
exports.positiveBigint = positiveBigint;
const _negativeBigint = (ast, options) => _lessThanBigint(ast, 0n, options);
/**
 * @category bigint filters
 * @since 1.0.0
 */
exports._negativeBigint = _negativeBigint;
const negativeBigint = options => self => make(_negativeBigint(self.ast, options));
/** @internal */
exports.negativeBigint = negativeBigint;
const _nonPositiveBigint = (ast, options) => _lessThanOrEqualToBigint(ast, 0n, options);
/**
 * @category bigint filters
 * @since 1.0.0
 */
exports._nonPositiveBigint = _nonPositiveBigint;
const nonPositiveBigint = options => self => make(_nonPositiveBigint(self.ast, options));
/** @internal */
exports.nonPositiveBigint = nonPositiveBigint;
const _nonNegativeBigint = (ast, options) => _greaterThanOrEqualToBigint(ast, 0n, options);
/**
 * @category bigint filters
 * @since 1.0.0
 */
exports._nonNegativeBigint = _nonNegativeBigint;
const nonNegativeBigint = options => self => make(_nonNegativeBigint(self.ast, options));
// ---------------------------------------------
// ReadonlyArray filters
// ---------------------------------------------
/**
 * @category type id
 * @since 1.0.0
 */
exports.nonNegativeBigint = nonNegativeBigint;
const MinItemsTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/MinItems");
/** @internal */
exports.MinItemsTypeId = MinItemsTypeId;
const _minItems = (ast, n, options) => _filter(ast, a => a.length >= n, {
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
exports._minItems = _minItems;
const minItems = (n, options) => self => make(_minItems(self.ast, n, options));
/**
 * @category type id
 * @since 1.0.0
 */
exports.minItems = minItems;
const MaxItemsTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/MaxItems");
/** @internal */
exports.MaxItemsTypeId = MaxItemsTypeId;
const _maxItems = (ast, n, options) => _filter(ast, a => a.length <= n, {
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
exports._maxItems = _maxItems;
const maxItems = (n, options) => self => make(_maxItems(self.ast, n, options));
/** @internal */
exports.maxItems = maxItems;
const _itemsCount = (ast, n, options) => _maxItems(_minItems(ast, n), n, {
  description: `an array of exactly ${n} items`,
  ...options
});
/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
exports._itemsCount = _itemsCount;
const itemsCount = (n, options) => self => make(_itemsCount(self.ast, n, options));
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
exports.itemsCount = itemsCount;
const Trimmed = /*#__PURE__*/(0, _Function.pipe)(string, /*#__PURE__*/trimmed());
/**
 * @category type id
 * @since 1.0.0
 */
exports.Trimmed = Trimmed;
const UUIDTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/UUID");
exports.UUIDTypeId = UUIDTypeId;
const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i;
/**
 * @category string constructors
 * @since 1.0.0
 */
const UUID = /*#__PURE__*/(0, _Function.pipe)(string, /*#__PURE__*/pattern(uuidRegex, {
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
exports.UUID = UUID;
const NonNaN = /*#__PURE__*/(0, _Function.pipe)(number, /*#__PURE__*/nonNaN());
/**
 * @category number constructors
 * @since 1.0.0
 */
exports.NonNaN = NonNaN;
const Int = /*#__PURE__*/(0, _Function.pipe)(number, /*#__PURE__*/int());
/**
 * @category number constructors
 * @since 1.0.0
 */
exports.Int = Int;
const Positive = /*#__PURE__*/(0, _Function.pipe)(number, /*#__PURE__*/positive());
/**
 * @category number constructors
 * @since 1.0.0
 */
exports.Positive = Positive;
const Negative = /*#__PURE__*/(0, _Function.pipe)(number, /*#__PURE__*/negative());
/**
 * @category number constructors
 * @since 1.0.0
 */
exports.Negative = Negative;
const NonNegative = /*#__PURE__*/(0, _Function.pipe)(number, /*#__PURE__*/nonNegative());
/**
 * @category number constructors
 * @since 1.0.0
 */
exports.NonNegative = NonNegative;
const NonPositive = /*#__PURE__*/(0, _Function.pipe)(number, /*#__PURE__*/nonPositive());
// ---------------------------------------------
// bigint constructors
// ---------------------------------------------
/**
 * @category bigint constructors
 * @since 1.0.0
 */
exports.NonPositive = NonPositive;
const PositiveBigint = /*#__PURE__*/(0, _Function.pipe)(bigint, /*#__PURE__*/positiveBigint());
/**
 * @category bigint constructors
 * @since 1.0.0
 */
exports.PositiveBigint = PositiveBigint;
const NegativeBigint = /*#__PURE__*/(0, _Function.pipe)(bigint, /*#__PURE__*/negativeBigint());
/**
 * @category bigint constructors
 * @since 1.0.0
 */
exports.NegativeBigint = NegativeBigint;
const NonNegativeBigint = /*#__PURE__*/(0, _Function.pipe)(bigint, /*#__PURE__*/nonNegativeBigint());
/**
 * @category bigint constructors
 * @since 1.0.0
 */
exports.NonNegativeBigint = NonNegativeBigint;
const NonPositiveBigint = /*#__PURE__*/(0, _Function.pipe)(bigint, /*#__PURE__*/nonPositiveBigint());
// ---------------------------------------------
// Date
// ---------------------------------------------
exports.NonPositiveBigint = NonPositiveBigint;
const dateArbitrary = () => fc => fc.date();
const datePretty = () => date => `new Date(${JSON.stringify(date)})`;
/**
 * @category Date constructors
 * @since 1.0.0
 */
const Date = /*#__PURE__*/declare([], /*#__PURE__*/struct({}), () => (u, _, self) => !(0, _Predicate.isDate)(u) ? PR.failure(PR.type(self, u)) : PR.success(u), {
  [AST.IdentifierAnnotationId]: "Date",
  [I.PrettyHookId]: datePretty,
  [I.ArbitraryHookId]: dateArbitrary
});
/**
 * @category type id
 * @since 1.0.0
 */
exports.Date = Date;
const ValidDateTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/ValidDate");
/**
 * A filter excluding invalid dates (e.g. `new Date("fail")`).
 *
 * @category Date combinators
 * @since 1.0.0
 */
exports.ValidDateTypeId = ValidDateTypeId;
const validDate = options => self => (0, _Function.pipe)(self, filter(a => !isNaN(a.getTime()), {
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
exports.validDate = validDate;
const ValidDate = /*#__PURE__*/(0, _Function.pipe)(Date, /*#__PURE__*/validDate());
// ---------------------------------------------
// Chunk
// ---------------------------------------------
/** @internal */
exports.ValidDate = ValidDate;
const chunkArbitrary = item => fc => fc.array(item(fc)).map(C.fromIterable);
/** @internal */
exports.chunkArbitrary = chunkArbitrary;
const chunkPretty = item => c => `Chunk(${C.toReadonlyArray(c).map(item).join(", ")})`;
/**
 * @category Chunk constructors
 * @since 1.0.0
 */
exports.chunkPretty = chunkPretty;
const chunk = item => declare([item], struct({
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
exports.chunk = chunk;
const toData = a => Array.isArray(a) ? D.array(a) : D.struct(a);
/** @internal */
exports.toData = toData;
const dataArbitrary = item => fc => item(fc).map(toData);
/** @internal */
exports.dataArbitrary = dataArbitrary;
const dataPretty = item => d => `Data(${item(d)})`;
/**
 * @category Data constructors
 * @since 1.0.0
 */
exports.dataPretty = dataPretty;
const data = item => declare([item], item, item => {
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
exports.data = data;
const eitherArbitrary = (left, right) => fc => fc.oneof(left(fc).map(E.left), right(fc).map(E.right));
/** @internal */
exports.eitherArbitrary = eitherArbitrary;
const eitherPretty = (left, right) => E.match(e => `left(${left(e)})`, a => `right(${right(a)})`);
exports.eitherPretty = eitherPretty;
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
const either = (left, right) => {
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
exports.either = either;
const arbitraryJson = fc => fc.jsonValue().map(json => json);
/**
 * @category type id
 * @since 1.0.0
 */
const JsonNumberTypeId = /*#__PURE__*/Symbol.for("@effect/schema/TypeId/JsonNumber");
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
exports.JsonNumberTypeId = JsonNumberTypeId;
const JsonNumber = /*#__PURE__*/(0, _Function.pipe)(number, /*#__PURE__*/filter(n => !isNaN(n) && isFinite(n), {
  typeId: JsonNumberTypeId,
  title: "JSONNumber",
  description: "a JSON number"
}));
/**
 * @category Json constructors
 * @since 1.0.0
 */
exports.JsonNumber = JsonNumber;
const json = /*#__PURE__*/lazy(() => union(_null, string, JsonNumber, boolean, array(json), record(string, json)), {
  [I.ArbitraryHookId]: () => arbitraryJson
});
// ---------------------------------------------
// Option
// ---------------------------------------------
/** @internal */
exports.json = json;
const optionArbitrary = value => fc => fc.oneof(fc.constant(O.none()), value(fc).map(O.some));
/** @internal */
exports.optionArbitrary = optionArbitrary;
const optionPretty = value => O.match(() => "none()", a => `some(${value(a)})`);
exports.optionPretty = optionPretty;
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
const option = value => {
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
exports.option = option;
const isMap = u => u instanceof Map;
/** @internal */
exports.isMap = isMap;
const readonlyMapArbitrary = (key, value) => fc => fc.array(fc.tuple(key(fc), value(fc))).map(as => new Map(as));
/** @internal */
exports.readonlyMapArbitrary = readonlyMapArbitrary;
const readonlyMapPretty = (key, value) => map => `new Map([${Array.from(map.entries()).map(([k, v]) => `[${key(k)}, ${value(v)}]`).join(", ")}])`;
/**
 * @category ReadonlyMap constructors
 * @since 1.0.0
 */
exports.readonlyMapPretty = readonlyMapPretty;
const readonlyMap = (key, value) => declare([key, value], struct({
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
exports.readonlyMap = readonlyMap;
const isSet = u => u instanceof Set;
/** @internal */
exports.isSet = isSet;
const readonlySetArbitrary = item => fc => fc.array(item(fc)).map(as => new Set(as));
/** @internal */
exports.readonlySetArbitrary = readonlySetArbitrary;
const readonlySetPretty = item => set => `new Set([${Array.from(set.values()).map(a => item(a)).join(", ")}])`;
/**
 * @category ReadonlySet constructors
 * @since 1.0.0
 */
exports.readonlySetPretty = readonlySetPretty;
const readonlySet = item => declare([item], struct({
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
exports.readonlySet = readonlySet;
//# sourceMappingURL=Schema.js.map