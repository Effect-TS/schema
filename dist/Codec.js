"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateFromString = exports.dataFromSelf = exports.data = exports.compose = exports.clampBigint = exports.clamp = exports.chunkFromSelf = exports.chunk = exports.brand = exports.betweenBigint = exports.between = exports.attachPropertySignature = exports.array = exports.Trim = exports.NumberFromString = exports.Date = void 0;
Object.defineProperty(exports, "decode", {
  enumerable: true,
  get: function () {
    return P.decode;
  }
});
Object.defineProperty(exports, "decodeEither", {
  enumerable: true,
  get: function () {
    return P.decodeEither;
  }
});
Object.defineProperty(exports, "decodeOption", {
  enumerable: true,
  get: function () {
    return P.decodeOption;
  }
});
Object.defineProperty(exports, "decodePromise", {
  enumerable: true,
  get: function () {
    return P.decodePromise;
  }
});
Object.defineProperty(exports, "decodeResult", {
  enumerable: true,
  get: function () {
    return P.decodeResult;
  }
});
Object.defineProperty(exports, "decodeSync", {
  enumerable: true,
  get: function () {
    return P.decodeSync;
  }
});
exports.element = exports.eitherFromSelf = exports.either = void 0;
Object.defineProperty(exports, "encode", {
  enumerable: true,
  get: function () {
    return P.encode;
  }
});
Object.defineProperty(exports, "encodeEither", {
  enumerable: true,
  get: function () {
    return P.encodeEither;
  }
});
Object.defineProperty(exports, "encodeOption", {
  enumerable: true,
  get: function () {
    return P.encodeOption;
  }
});
Object.defineProperty(exports, "encodePromise", {
  enumerable: true,
  get: function () {
    return P.encodePromise;
  }
});
Object.defineProperty(exports, "encodeResult", {
  enumerable: true,
  get: function () {
    return P.encodeResult;
  }
});
Object.defineProperty(exports, "encodeSync", {
  enumerable: true,
  get: function () {
    return P.encodeSync;
  }
});
exports.extend = exports.endsWith = void 0;
exports.filter = filter;
exports.optionalElement = exports.optional = exports.optionFromSelf = exports.optionFromNullable = exports.option = exports.omit = exports.numberFromString = exports.nullable = exports.not = exports.nonPositiveBigint = exports.nonPositive = exports.nonNegativeBigint = exports.nonNegative = exports.nonNaN = exports.nonEmptyArray = exports.nonEmpty = exports.negativeBigint = exports.negative = exports.multipleOf = exports.minLength = exports.minItems = exports.maxLength = exports.maxItems = exports.make = exports.lessThanOrEqualToBigint = exports.lessThanOrEqualTo = exports.lessThanBigint = exports.lessThan = exports.length = exports.lazy = exports.itemsCount = exports.isCodec = exports.int = exports.includes = exports.greaterThanOrEqualToBigint = exports.greaterThanOrEqualTo = exports.greaterThanBigint = exports.greaterThan = exports.from = exports.finite = void 0;
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return P.parse;
  }
});
Object.defineProperty(exports, "parseEither", {
  enumerable: true,
  get: function () {
    return P.parseEither;
  }
});
Object.defineProperty(exports, "parseOption", {
  enumerable: true,
  get: function () {
    return P.parseOption;
  }
});
Object.defineProperty(exports, "parsePromise", {
  enumerable: true,
  get: function () {
    return P.parsePromise;
  }
});
Object.defineProperty(exports, "parseResult", {
  enumerable: true,
  get: function () {
    return P.parseResult;
  }
});
Object.defineProperty(exports, "parseSync", {
  enumerable: true,
  get: function () {
    return P.parseSync;
  }
});
exports.union = exports.tuple = exports.trimmed = exports.trim = exports.transformResult = exports.transform = exports.to = exports.struct = exports.startsWith = exports.rest = exports.record = exports.readonlySetFromSelf = exports.readonlySet = exports.readonlyMapFromSelf = exports.readonlyMap = exports.propertySignature = exports.positiveBigint = exports.positive = exports.pick = exports.pattern = void 0;
var B = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Bigint"));
var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var N = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Number"));
var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var _Pipeable = /*#__PURE__*/require("@effect/data/Pipeable");
var _Predicate = /*#__PURE__*/require("@effect/data/Predicate");
var RA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/ReadonlyArray"));
var AST = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/AST"));
var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/internal/common"));
var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/Parser"));
var PR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/ParseResult"));
var S = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/Schema"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

// ---------------------------------------------
// converters
// ---------------------------------------------
/**
 * @category converters
 * @since 1.0.0
 */
const from = codec => S.make(AST.from(codec.ast));
/**
 * @category converters
 * @since 1.0.0
 */
exports.from = from;
const to = codec => S.make(AST.to(codec.ast));
// ---------------------------------------------
// decoding / encoding / parsing
// ---------------------------------------------
/* c8 ignore start */
exports.to = to;
/* c8 ignore end */
// ---------------------------------------------
// constructors
// ---------------------------------------------
class CodecImpl {
  ast;
  _codecId = S.CodecTypeId;
  From;
  To;
  constructor(ast) {
    this.ast = ast;
  }
  pipe() {
    return (0, _Pipeable.pipeArguments)(this, arguments);
  }
}
/**
 * @category constructors
 * @since 1.0.0
 */
const make = ast => new CodecImpl(ast);
/**
 * Tests if a value is a `Codec`.
 *
 * @category guards
 * @since 1.0.0
 */
exports.make = make;
const isCodec = input => (0, _Predicate.isObject)(input) && "_codecId" in input && input["_codecId"] === S.CodecTypeId;
// ---------------------------------------------
// codec combinators
// ---------------------------------------------
/**
 * Create a new `Codec` by transforming the input and output of an existing `Schema`
 * using the provided decoding functions.
 *
 * @category constructors
 * @since 1.0.0
 */
exports.isCodec = isCodec;
const transformResult = /*#__PURE__*/(0, _Function.dual)(4, (from, to, decode, encode, annotations) => make(AST.createTransform(from.ast, to.ast, AST.createFinalTransformation(decode, encode), annotations)));
/**
 * Create a new `Codec` by transforming the input and output of an existing `Schema`
 * using the provided mapping functions.
 *
 * @category constructors
 * @since 1.0.0
 */
exports.transformResult = transformResult;
const transform = /*#__PURE__*/(0, _Function.dual)(4, (from, to, decode, encode, annotations) => transformResult(from, to, a => E.right(decode(a)), b => E.right(encode(b)), annotations));
// ---------------------------------------------
// combinators
// ---------------------------------------------
/**
 * @category combinators
 * @since 1.0.0
 */
exports.transform = transform;
const union = (...members) => make(AST.createUnion(members.map(m => m.ast)));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.union = union;
const nullable = self => union(S.null, self);
/**
 * @category combinators
 * @since 1.0.0
 */
exports.nullable = nullable;
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
  throw new Error("`optionalElement` is not supported on this transformation");
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
  throw new Error("`rest` is not supported on this transformation");
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
  throw new Error("`element` is not supported on this transformation");
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
const nonEmptyArray = item => tuple(item).pipe(rest(item));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.nonEmptyArray = nonEmptyArray;
const lazy = (f, annotations) => make(AST.createLazy(() => f().ast, annotations));
/**
 * @since 1.0.0
 */
exports.lazy = lazy;
const propertySignature = (codec, options) => new S.PropertySignatureImpl({
  _tag: "PropertySignature",
  ast: codec.ast,
  annotations: S.toAnnotations(options)
});
/**
 * @since 1.0.0
 */
exports.propertySignature = propertySignature;
const optional = (codec, options) => new S.PropertySignatureImpl({
  _tag: "Optional",
  ast: codec.ast,
  annotations: S.toAnnotations(options)
});
/**
 * @category combinators
 * @since 1.0.0
 */
exports.optional = optional;
const struct = fields => {
  const ownKeys = I.ownKeys(fields);
  const pss = [];
  const froms = [];
  const tos = [];
  const propertySignatureTransformations = [];
  for (let i = 0; i < ownKeys.length; i++) {
    const key = ownKeys[i];
    const field = fields[key];
    if ("config" in field) {
      const config = field.config;
      const from = config.ast;
      const to = AST.to(from);
      const annotations = config.annotations;
      switch (config._tag) {
        case "PropertySignature":
          pss.push(AST.createPropertySignature(key, from, false, true, annotations));
          froms.push(AST.createPropertySignature(key, from, false, true));
          tos.push(AST.createPropertySignature(key, to, false, true, annotations));
          break;
        case "Optional":
          pss.push(AST.createPropertySignature(key, from, true, true, annotations));
          froms.push(AST.createPropertySignature(key, from, true, true));
          tos.push(AST.createPropertySignature(key, to, true, true, annotations));
          break;
        case "Default":
          froms.push(AST.createPropertySignature(key, from, true, true));
          tos.push(AST.createPropertySignature(key, to, false, true, annotations));
          propertySignatureTransformations.push(AST.createPropertySignatureTransformation(key, key, AST.createFinalPropertySignatureTransformation(O.orElse(() => O.some(config.value())), _Function.identity)));
          break;
        case "Option":
          froms.push(AST.createPropertySignature(key, from, true, true));
          tos.push(AST.createPropertySignature(key, S.option(S.make(to)).ast, false, true, annotations));
          propertySignatureTransformations.push(AST.createPropertySignatureTransformation(key, key, AST.createFinalPropertySignatureTransformation(O.some, O.flatten)));
          break;
      }
    } else {
      pss.push(AST.createPropertySignature(key, field.ast, false, true));
      froms.push(AST.createPropertySignature(key, field.ast, false, true));
      tos.push(AST.createPropertySignature(key, AST.to(field.ast), false, true));
    }
  }
  if (RA.isNonEmptyReadonlyArray(propertySignatureTransformations)) {
    return make(AST.createTransform(AST.createTypeLiteral(froms, []), AST.createTypeLiteral(tos, []), AST.createTypeLiteralTransformation(propertySignatureTransformations)));
  }
  return make(AST.createTypeLiteral(pss, []));
};
/**
 * @category combinators
 * @since 1.0.0
 */
exports.struct = struct;
const record = (key, value) => make(AST.createRecord(key.ast, value.ast, true));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.record = record;
const extend = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => make(S.intersectUnionMembers(AST.isUnion(self.ast) ? self.ast.types : [self.ast], AST.isUnion(that.ast) ? that.ast.types : [that.ast])));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.extend = extend;
const pick = (...keys) => self => {
  const ast = self.ast;
  if (AST.isTransform(ast)) {
    if (AST.isTypeLiteralTransformation(ast.transformAST)) {
      const propertySignatureTransformations = ast.transformAST.propertySignatureTransformations.filter(t => keys.includes(t.to));
      if (RA.isNonEmptyReadonlyArray(propertySignatureTransformations)) {
        return make(AST.createTransform(AST.pick(ast.from, keys), AST.pick(ast.to, keys), AST.createTypeLiteralTransformation(propertySignatureTransformations)));
      } else {
        return make(AST.pick(ast.from, keys));
      }
    }
    throw new Error(`pick: cannot handle this kind of transformation`);
  }
  return make(AST.pick(ast, keys));
};
/**
 * @category combinators
 * @since 1.0.0
 */
exports.pick = pick;
const omit = (...keys) => self => {
  const ast = self.ast;
  if (AST.isTransform(ast)) {
    if (AST.isTypeLiteralTransformation(ast.transformAST)) {
      const propertySignatureTransformations = ast.transformAST.propertySignatureTransformations.filter(t => !keys.includes(t.to));
      if (RA.isNonEmptyReadonlyArray(propertySignatureTransformations)) {
        return make(AST.createTransform(AST.omit(ast.from, keys), AST.omit(ast.to, keys), AST.createTypeLiteralTransformation(propertySignatureTransformations)));
      } else {
        return make(AST.omit(ast.from, keys));
      }
    }
    throw new Error(`omit: cannot handle this kind of transformation`);
  }
  return make(AST.omit(ast, keys));
};
exports.omit = omit;
const recurseRight = f => (ast, ...a) => {
  if (AST.isTransform(ast)) {
    return AST.createTransform(ast.from, f(ast.to, ...a), ast.transformAST, ast.annotations);
  }
  return f(ast, ...a);
};
const addBrand = /*#__PURE__*/recurseRight(S.addBrand);
/**
 * @category combinators
 * @since 1.0.0
 */
const brand = (brand, options) => self => make(addBrand(self.ast, brand, options));
exports.brand = brand;
function filter(predicate, options) {
  return self => make(S._filter(self.ast, predicate, options));
}
/**
 * @category combinators
 * @since 1.0.0
 */
const compose = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => make(AST.createTransform(self.ast, that.ast, AST.composeTransformation)));
/**
 * Attaches a property signature with the specified key and value to the schema.
 * This API is useful when you want to add a property to your schema which doesn't describe the shape of the input,
 * but rather maps to another schema, for example when you want to add a discriminant to a simple union.
 *
 * @param self - The input schema.
 * @param key - The name of the property to add to the schema.
 * @param value - The value of the property to add to the schema.
 *
 * @example
 * import * as S from "@effect/schema/Schema"
 * import * as C from "@effect/schema/Codec"
 * import { pipe } from "@effect/data/Function"
 *
 * const Circle = S.struct({ radius: S.number })
 * const Square = S.struct({ sideLength: S.number })
 * const Shape = C.union(
 *   C.attachPropertySignature(Circle, "kind", "circle"),
 *   C.attachPropertySignature(Square, "kind", "square")
 * )
 *
 * assert.deepStrictEqual(C.decodeSync(Shape)({ radius: 10 }), {
 *   kind: "circle",
 *   radius: 10
 * })
 *
 * @category combinators
 * @since 1.0.0
 */
exports.compose = compose;
const attachPropertySignature = /*#__PURE__*/(0, _Function.dual)(3, (codec, key, value) => make(AST.createTransform(codec.ast, to(codec).pipe(extend(struct({
  [key]: S.literal(value)
}))).ast, AST.createTypeLiteralTransformation([AST.createPropertySignatureTransformation(key, key, AST.createFinalPropertySignatureTransformation(() => O.some(value), () => O.none()))]))));
// ---------------------------------------------
// string filters
// ---------------------------------------------
/**
 * @category string filters
 * @since 1.0.0
 */
exports.attachPropertySignature = attachPropertySignature;
const minLength = (minLength, options) => self => make(S._minLength(self.ast, minLength, options));
/**
 * @category string filters
 * @since 1.0.0
 */
exports.minLength = minLength;
const nonEmpty = options => minLength(1, options);
/**
 * @category string filters
 * @since 1.0.0
 */
exports.nonEmpty = nonEmpty;
const maxLength = (maxLength, options) => self => make(S._maxLength(self.ast, maxLength, options));
/**
 * @category string filters
 * @since 1.0.0
 */
exports.maxLength = maxLength;
const length = (length, options) => self => minLength(length, options)(maxLength(length)(self));
/**
 * @category string filters
 * @since 1.0.0
 */
exports.length = length;
const pattern = (regex, options) => self => make(S._pattern(self.ast, regex, options));
/**
 * @category string filters
 * @since 1.0.0
 */
exports.pattern = pattern;
const startsWith = (startsWith, options) => self => make(S._startsWith(self.ast, startsWith, options));
/**
 * @category string filters
 * @since 1.0.0
 */
exports.startsWith = startsWith;
const endsWith = (endsWith, options) => self => make(S._endsWith(self.ast, endsWith, options));
/**
 * @category string filters
 * @since 1.0.0
 */
exports.endsWith = endsWith;
const includes = (searchString, options) => self => make(S._includes(self.ast, searchString, options));
/**
 * Verifies that a string contains no leading or trailing whitespaces.
 *
 * Note. This combinator does not make any transformations, it only validates.
 * If what you were looking for was a combinator to trim strings, then check out the `trim` combinator.
 *
 * @category string filters
 * @since 1.0.0
 */
exports.includes = includes;
const trimmed = options => self => make(S._trimmed(self.ast, options));
// ---------------------------------------------
// number filters
// ---------------------------------------------
/**
 * @category number filters
 * @since 1.0.0
 */
exports.trimmed = trimmed;
const greaterThan = (min, options) => self => make(S._greaterThan(self.ast, min, options));
/**
 * @category number filters
 * @since 1.0.0
 */
exports.greaterThan = greaterThan;
const greaterThanOrEqualTo = (min, options) => self => make(S._greaterThanOrEqualTo(self.ast, min, options));
/**
 * @category number filters
 * @since 1.0.0
 */
exports.greaterThanOrEqualTo = greaterThanOrEqualTo;
const lessThan = (max, options) => self => make(S._lessThan(self.ast, max, options));
/**
 * @category number filters
 * @since 1.0.0
 */
exports.lessThan = lessThan;
const lessThanOrEqualTo = (max, options) => self => make(S._lessThanOrEqualTo(self.ast, max, options));
/**
 * @category number filters
 * @since 1.0.0
 */
exports.lessThanOrEqualTo = lessThanOrEqualTo;
const int = options => self => make(S._int(self.ast, options));
/**
 * @category number filters
 * @since 1.0.0
 */
exports.int = int;
const finite = options => self => make(S._finite(self.ast, options));
/**
 * Tests if a `number` is between a minimum and a maximum value (included).
 *
 * @category number filters
 * @since 1.0.0
 */
exports.finite = finite;
const between = (min, max, options) => self => make(S._between(self.ast, min, max, options));
/**
 * @category number filters
 * @since 1.0.0
 */
exports.between = between;
const nonNaN = options => self => make(S._nonNaN(self.ast, options));
/**
 * @category number filters
 * @since 1.0.0
 */
exports.nonNaN = nonNaN;
const positive = options => self => make(S._positive(self.ast, options));
/**
 * @category number filters
 * @since 1.0.0
 */
exports.positive = positive;
const negative = options => self => make(S._negative(self.ast, options));
/**
 * @category number filters
 * @since 1.0.0
 */
exports.negative = negative;
const nonNegative = options => self => make(S._nonNegative(self.ast, options));
/**
 * @category number filters
 * @since 1.0.0
 */
exports.nonNegative = nonNegative;
const nonPositive = options => self => make(S._nonPositive(self.ast, options));
/**
 * @category number filters
 * @since 1.0.0
 */
exports.nonPositive = nonPositive;
const multipleOf = (divisor, options) => self => make(S._multipleOf(self.ast, divisor, options));
// ---------------------------------------------
// bigint filters
// ---------------------------------------------
/**
 * @category bigint filters
 * @since 1.0.0
 */
exports.multipleOf = multipleOf;
const greaterThanBigint = (min, options) => self => make(S._greaterThanBigint(self.ast, min, options));
/**
 * @category bigint filters
 * @since 1.0.0
 */
exports.greaterThanBigint = greaterThanBigint;
const greaterThanOrEqualToBigint = (min, options) => self => make(S._greaterThanOrEqualToBigint(self.ast, min, options));
/**
 * @category bigint filters
 * @since 1.0.0
 */
exports.greaterThanOrEqualToBigint = greaterThanOrEqualToBigint;
const lessThanBigint = (max, options) => self => make(S._lessThanBigint(self.ast, max, options));
/**
 * @category bigint filters
 * @since 1.0.0
 */
exports.lessThanBigint = lessThanBigint;
const lessThanOrEqualToBigint = (max, options) => self => make(S._lessThanOrEqualToBigint(self.ast, max, options));
/**
 * Tests if a `bigint` is between a minimum and a maximum value (included).
 *
 * @category bigint filters
 * @since 1.0.0
 */
exports.lessThanOrEqualToBigint = lessThanOrEqualToBigint;
const betweenBigint = (min, max, options) => self => make(S._betweenBigint(self.ast, min, max, options));
/**
 * @category bigint filters
 * @since 1.0.0
 */
exports.betweenBigint = betweenBigint;
const positiveBigint = options => self => make(S._positiveBigint(self.ast, options));
/**
 * @category bigint filters
 * @since 1.0.0
 */
exports.positiveBigint = positiveBigint;
const negativeBigint = options => self => make(S._negativeBigint(self.ast, options));
/**
 * @category bigint filters
 * @since 1.0.0
 */
exports.negativeBigint = negativeBigint;
const nonPositiveBigint = options => self => make(S._nonPositiveBigint(self.ast, options));
/**
 * @category bigint filters
 * @since 1.0.0
 */
exports.nonPositiveBigint = nonPositiveBigint;
const nonNegativeBigint = options => self => make(S._nonNegativeBigint(self.ast, options));
// ---------------------------------------------
// ReadonlyArray filters
// ---------------------------------------------
/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
exports.nonNegativeBigint = nonNegativeBigint;
const minItems = (n, options) => self => make(S._minItems(self.ast, n, options));
/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
exports.minItems = minItems;
const maxItems = (n, options) => self => make(S._maxItems(self.ast, n, options));
/**
 * @category ReadonlyArray filters
 * @since 1.0.0
 */
exports.maxItems = maxItems;
const itemsCount = (n, options) => self => make(S._itemsCount(self.ast, n, options));
// ---------------------------------------------
// string transformations
// ---------------------------------------------
/**
 * This combinator allows removing whitespaces from the beginning and end of a string.
 *
 * @category string transformations
 * @since 1.0.0
 */
exports.itemsCount = itemsCount;
const trim = self => transform(self, to(self).pipe(S.trimmed()), s => s.trim(), _Function.identity, {
  [AST.DocumentationAnnotationId]: "trim"
});
/**
 * This transformation allows removing whitespaces from the beginning and end of a string.
 *
 * @category string transformations
 * @since 1.0.0
 */
exports.trim = trim;
const Trim = /*#__PURE__*/trim(S.string);
// ---------------------------------------------
// number transformations
// ---------------------------------------------
/**
 * Clamps a number between a minimum and a maximum value.
 *
 * @category number transformations
 * @since 1.0.0
 */
exports.Trim = Trim;
const clamp = (min, max) => self => transform(self, to(self).pipe(S.between(min, max)), n => N.clamp(n, min, max), _Function.identity, {
  [AST.DocumentationAnnotationId]: "clamp"
});
/**
 * This combinator transforms a `string` into a `number` by parsing the string using the `Number` function.
 *
 * It returns an error if the value can't be converted (for example when non-numeric characters are provided).
 *
 * The following special string values are supported: "NaN", "Infinity", "-Infinity".
 *
 * @param self - The codec representing the input string
 *
 * @category number transformations
 * @since 1.0.0
 */
exports.clamp = clamp;
const numberFromString = self => transformResult(self, S.number, (s, _, ast) => {
  if (s === "NaN") {
    return PR.success(NaN);
  }
  if (s === "Infinity") {
    return PR.success(Infinity);
  }
  if (s === "-Infinity") {
    return PR.success(-Infinity);
  }
  if (s.trim() === "") {
    return PR.failure(PR.type(ast, s));
  }
  const n = Number(s);
  return isNaN(n) ? PR.failure(PR.type(ast, s)) : PR.success(n);
}, n => PR.success(String(n)), {
  [AST.DocumentationAnnotationId]: "numberFromString"
});
/**
 * This codec transforms a `string` into a `number` by parsing the string using the `Number` function.
 *
 * It returns an error if the value can't be converted (for example when non-numeric characters are provided).
 *
 * The following special string values are supported: "NaN", "Infinity", "-Infinity".
 *
 * @category number transformations
 * @since 1.0.0
 */
exports.numberFromString = numberFromString;
const NumberFromString = /*#__PURE__*/numberFromString(S.string);
// ---------------------------------------------
// boolean transformations
// ---------------------------------------------
/**
 * Negates a boolean value
 *
 * @category boolean transformations
 * @since 1.0.0
 */
exports.NumberFromString = NumberFromString;
const not = self => transform(self, to(self), b => !b, b => !b, {
  [AST.DocumentationAnnotationId]: "not"
});
// ---------------------------------------------
// bigint transformations
// ---------------------------------------------
/**
 * Clamps a bigint between a minimum and a maximum value.
 *
 * @category bigint transformations
 * @since 1.0.0
 */
exports.not = not;
const clampBigint = (min, max) => self => transform(self, to(self).pipe(S.betweenBigint(min, max)), input => B.clamp(input, min, max), _Function.identity, {
  [AST.DocumentationAnnotationId]: "clampBigint"
});
// ---------------------------------------------
// Date transformations
// ---------------------------------------------
/**
 * A combinator that transforms a `string` into a valid `Date`.
 *
 * @category Date transformations
 * @since 1.0.0
 */
exports.clampBigint = clampBigint;
const dateFromString = self => transformResult(self, S.ValidDate, input => PR.success(new Date(input)), date => PR.success(date.toISOString()), {
  [AST.DocumentationAnnotationId]: "dateFromString"
});
exports.dateFromString = dateFromString;
const _Date = /*#__PURE__*/dateFromString(S.string);
exports.Date = _Date;
// ---------------------------------------------
// Option transformations
// ---------------------------------------------
/**
 * @category Option transformations
 * @since 1.0.0
 */
const optionFromSelf = value => {
  const parseResult = P.parseResult(value);
  const encodeResult = P.encodeResult(value);
  return transformResult(S.option(from(value)), S.option(to(value)), (option, options) => O.isNone(option) ? PR.success(O.none()) : PR.map(parseResult(option.value, options), O.some), (option, options) => O.isNone(option) ? PR.success(O.none()) : PR.map(encodeResult(option.value, options), O.some), {
    [AST.DocumentationAnnotationId]: "optionFromSelf"
  });
};
exports.optionFromSelf = optionFromSelf;
const optionAsJson = value => S.union(S.struct({
  _tag: S.literal("None")
}), S.struct({
  _tag: S.literal("Some"),
  value
}));
/**
 * @category Option transformations
 * @since 1.0.0
 */
const option = value => {
  const parseResult = P.parseResult(value);
  const encodeResult = P.encodeResult(value);
  return transformResult(optionAsJson(from(value)), S.option(to(value)), (optionAsJson, options) => optionAsJson._tag === "None" ? PR.success(O.none()) : PR.map(parseResult(optionAsJson.value, options), O.some), (o, options) => O.isNone(o) ? PR.success({
    _tag: "None"
  }) : PR.map(encodeResult(o.value, options), value => ({
    _tag: "Some",
    value
  })), {
    [AST.DocumentationAnnotationId]: "option"
  });
};
/**
 * @category Option transformations
 * @since 1.0.0
 */
exports.option = option;
const optionFromNullable = value => {
  const parseResult = P.parseResult(value);
  const encodeResult = P.encodeResult(value);
  return transformResult(S.nullable(from(value)), S.option(to(value)), (nullable, options) => nullable === null ? PR.success(O.none()) : PR.map(parseResult(nullable, options), O.some), (o, options) => O.isNone(o) ? PR.success(null) : encodeResult(o.value, options), {
    [AST.DocumentationAnnotationId]: "optionFromNullable"
  });
};
// ---------------------------------------------
// Either transformations
// ---------------------------------------------
/**
 * @category Either transformations
 * @since 1.0.0
 */
exports.optionFromNullable = optionFromNullable;
const eitherFromSelf = (left, right) => {
  const parseResultLeft = P.parseResult(left);
  const parseResultRight = P.parseResult(right);
  const encodeResultLeft = P.encodeResult(left);
  const encodeResultRight = P.encodeResult(right);
  return transformResult(S.either(from(left), from(right)), S.either(to(left), to(right)), (either, options) => E.isLeft(either) ? PR.map(parseResultLeft(either.left, options), E.left) : PR.map(parseResultRight(either.right, options), E.right), (either, options) => E.isLeft(either) ? PR.map(encodeResultLeft(either.left, options), E.left) : PR.map(encodeResultRight(either.right, options), E.right), {
    [AST.DocumentationAnnotationId]: "eitherFromSelf"
  });
};
exports.eitherFromSelf = eitherFromSelf;
const eitherAsJson = (left, right) => S.union(S.struct({
  _tag: S.literal("Left"),
  left
}), S.struct({
  _tag: S.literal("Right"),
  right
}));
/**
 * @category Either transformations
 * @since 1.0.0
 */
const either = (left, right) => {
  const parseResultLeft = P.parseResult(left);
  const parseResultRight = P.parseResult(right);
  const encodeResultLeft = P.encodeResult(left);
  const encodeResultRight = P.encodeResult(right);
  return transformResult(eitherAsJson(from(left), from(right)), S.either(to(left), to(right)), (eitherAsJson, options) => eitherAsJson._tag === "Left" ? PR.map(parseResultLeft(eitherAsJson.left, options), E.left) : PR.map(parseResultRight(eitherAsJson.right, options), E.right), (either, options) => E.isLeft(either) ? PR.map(encodeResultLeft(either.left, options), left => ({
    _tag: "Left",
    left
  })) : PR.map(encodeResultRight(either.right, options), right => ({
    _tag: "Right",
    right
  })), {
    [AST.DocumentationAnnotationId]: "either"
  });
};
// ---------------------------------------------
// ReadonlyMap transformations
// ---------------------------------------------
/**
 * @category ReadonlyMap transformations
 * @since 1.0.0
 */
exports.either = either;
const readonlyMapFromSelf = (key, value) => {
  const entries = array(tuple(key, value));
  const parseResult = P.parseResult(entries);
  const encodeResult = P.encodeResult(entries);
  return transformResult(S.readonlyMap(from(key), from(value)), S.readonlyMap(to(key), to(value)), (map, options) => PR.map(parseResult(Array.from(map.entries()), options), as => new Map(as)), (map, options) => PR.map(encodeResult(Array.from(map.entries()), options), as => new Map(as)), {
    [AST.DocumentationAnnotationId]: "readonlyMapFromSelf"
  });
};
/**
 * @category ReadonlyMap transformations
 * @since 1.0.0
 */
exports.readonlyMapFromSelf = readonlyMapFromSelf;
const readonlyMap = (key, value) => transform(array(tuple(key, value)), S.readonlyMap(to(key), to(value)), entries => new Map(entries), map => Array.from(map.entries()), {
  [AST.DocumentationAnnotationId]: "readonlyMap"
});
// ---------------------------------------------
// ReadonlySet transformations
// ---------------------------------------------
/**
 * @category ReadonlySet transformations
 * @since 1.0.0
 */
exports.readonlyMap = readonlyMap;
const readonlySetFromSelf = item => {
  const parseResult = P.parseResult(array(item));
  const encodeResult = P.encodeResult(array(item));
  return transformResult(S.readonlySet(from(item)), S.readonlySet(to(item)), (set, options) => PR.map(parseResult(Array.from(set.values()), options), as => new Set(as)), (set, options) => PR.map(encodeResult(Array.from(set.values()), options), as => new Set(as)), {
    [AST.DocumentationAnnotationId]: "readonlySetFromSelf"
  });
};
/**
 * @category ReadonlySet transformations
 * @since 1.0.0
 */
exports.readonlySetFromSelf = readonlySetFromSelf;
const readonlySet = item => transform(array(item), S.readonlySet(to(item)), as => new Set(as), set => Array.from(set), {
  [AST.DocumentationAnnotationId]: "readonlySet"
});
// ---------------------------------------------
// Chunk transformations
// ---------------------------------------------
/**
 * @category Chunk transformations
 * @since 1.0.0
 */
exports.readonlySet = readonlySet;
const chunkFromSelf = item => {
  const parseResult = P.parseResult(array(item));
  const encodeResult = P.encodeResult(array(item));
  return transformResult(S.chunk(from(item)), S.chunk(to(item)), (chunk, options) => PR.map(parseResult(C.toReadonlyArray(chunk), options), C.fromIterable), (chunk, options) => PR.map(encodeResult(C.toReadonlyArray(chunk), options), C.fromIterable), {
    [AST.DocumentationAnnotationId]: "chunkFromSelf"
  });
};
/**
 * @category Chunk transformations
 * @since 1.0.0
 */
exports.chunkFromSelf = chunkFromSelf;
const chunk = item => transform(array(item), S.chunk(to(item)), C.fromIterable, C.toReadonlyArray, {
  [AST.DocumentationAnnotationId]: "chunk"
});
// ---------------------------------------------
// Data transformations
// ---------------------------------------------
exports.chunk = chunk;
const fromData = data => Array.isArray(data) ? Array.from(data) : Object.assign({}, data);
/**
 * @category Data transformations
 * @since 1.0.0
 */
const dataFromSelf = item => {
  const parseResult = P.parseResult(item);
  const encodeResult = P.encodeResult(item);
  return transformResult(S.data(from(item)), S.data(to(item)), (data, options) => PR.map(parseResult(fromData(data), options), S.toData), (data, options) => PR.map(encodeResult(fromData(data), options), S.toData), {
    [AST.DocumentationAnnotationId]: "dataFromSelf"
  });
};
/**
 * @category Data transformations
 * @since 1.0.0
 */
exports.dataFromSelf = dataFromSelf;
const data = item => transform(item, S.data(to(item)), S.toData, data => Array.isArray(data) ? Array.from(data) : Object.assign({}, data), {
  [AST.DocumentationAnnotationId]: "data"
});
exports.data = data;
//# sourceMappingURL=Codec.js.map