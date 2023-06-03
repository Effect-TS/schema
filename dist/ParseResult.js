"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionMember = exports.unexpected = exports.type = exports.success = exports.parseError = exports.missing = exports.mapLeft = exports.map = exports.key = exports.index = exports.forbidden = exports.flatMap = exports.failures = exports.failure = exports.fail = exports.eitherOrUndefined = exports.bimap = void 0;
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Debug"));
var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Effect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Effect"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

/**
 * @since 1.0.0
 */
const parseError = errors => ({
  _tag: "ParseError",
  errors
});
/**
 * @category constructors
 * @since 1.0.0
 */
exports.parseError = parseError;
const type = (expected, actual, message) => ({
  _tag: "Type",
  expected,
  actual,
  message: O.fromNullable(message)
});
/**
 * @category constructors
 * @since 1.0.0
 */
exports.type = type;
const forbidden = {
  _tag: "Forbidden"
};
/**
 * @category constructors
 * @since 1.0.0
 */
exports.forbidden = forbidden;
const index = (index, errors) => ({
  _tag: "Index",
  index,
  errors
});
/**
 * @category constructors
 * @since 1.0.0
 */
exports.index = index;
const key = (key, errors) => ({
  _tag: "Key",
  key,
  errors
});
/**
 * @category constructors
 * @since 1.0.0
 */
exports.key = key;
const missing = {
  _tag: "Missing"
};
/**
 * @category constructors
 * @since 1.0.0
 */
exports.missing = missing;
const unexpected = actual => ({
  _tag: "Unexpected",
  actual
});
/**
 * @category constructors
 * @since 1.0.0
 */
exports.unexpected = unexpected;
const unionMember = errors => ({
  _tag: "UnionMember",
  errors
});
/**
 * @category constructors
 * @since 1.0.0
 */
exports.unionMember = unionMember;
const success = E.right;
/**
 * @category constructors
 * @since 1.0.0
 */
exports.success = success;
const fail = E.left;
/**
 * @category constructors
 * @since 1.0.0
 */
exports.fail = fail;
const failure = e => fail(parseError([e]));
/**
 * @category constructors
 * @since 1.0.0
 */
exports.failure = failure;
const failures = es => E.left(parseError(es));
/**
 * @category optimisation
 * @since 1.0.0
 */
exports.failures = failures;
const eitherOrUndefined = self => {
  const s = self;
  if (s["_tag"] === "Left" || s["_tag"] === "Right") {
    return s;
  }
};
/**
 * @category optimisation
 * @since 1.0.0
 */
exports.eitherOrUndefined = eitherOrUndefined;
const flatMap = (self, f) => {
  const s = self;
  if (s["_tag"] === "Left") {
    return s;
  }
  if (s["_tag"] === "Right") {
    return f(s.right);
  }
  return Debug.bodyWithTrace((trace, restore) => Effect.flatMap(self, a => restore(f)(a)).traced(trace));
};
/**
 * @category optimisation
 * @since 1.0.0
 */
exports.flatMap = flatMap;
const map = (self, f) => {
  const s = self;
  if (s["_tag"] === "Left") {
    return s;
  }
  if (s["_tag"] === "Right") {
    return E.right(f(s.right));
  }
  return Debug.bodyWithTrace((trace, restore) => Effect.map(self, restore(f)).traced(trace));
};
/**
 * @category optimisation
 * @since 1.0.0
 */
exports.map = map;
const mapLeft = (self, f) => {
  const s = self;
  if (s["_tag"] === "Left") {
    return E.left(f(s.left));
  }
  if (s["_tag"] === "Right") {
    s;
  }
  return Debug.bodyWithTrace((trace, restore) => Effect.mapError(self, restore(f)).traced(trace));
};
/**
 * @category optimisation
 * @since 1.0.0
 */
exports.mapLeft = mapLeft;
const bimap = (self, f, g) => {
  if (E.isEither(self)) {
    return E.bimap(self, f, g);
  }
  return Debug.bodyWithTrace((trace, restore) => Effect.mapBoth(self, restore(f), restore(g)).traced(trace));
};
exports.bimap = bimap;
//# sourceMappingURL=ParseResult.js.map