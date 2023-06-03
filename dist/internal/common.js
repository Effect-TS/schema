"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ownKeys = exports.memoizeThunk = exports.isSymbolKeyword = exports.isStringKeyword = exports.getKeysForIndexSignature = exports.PrettyHookId = exports.ArbitraryHookId = void 0;
/**
 * @since 1.0.0
 */
// ---------------------------------------------
// hooks
// ---------------------------------------------
/** @internal */
const ArbitraryHookId = /*#__PURE__*/Symbol.for("@effect/schema/ArbitraryHookId");
/** @internal */
exports.ArbitraryHookId = ArbitraryHookId;
const PrettyHookId = /*#__PURE__*/Symbol.for("@effect/schema/PrettyHookId");
// ---------------------------------------------
// Schema APIs
// ---------------------------------------------
/** @internal */
exports.PrettyHookId = PrettyHookId;
const getKeysForIndexSignature = (input, parameter) => {
  switch (parameter._tag) {
    case "StringKeyword":
    case "TemplateLiteral":
      return Object.keys(input);
    case "SymbolKeyword":
      return Object.getOwnPropertySymbols(input);
    case "Refinement":
      return getKeysForIndexSignature(input, parameter.from);
  }
};
// ---------------------------------------------
// general helpers
// ---------------------------------------------
/** @internal */
exports.getKeysForIndexSignature = getKeysForIndexSignature;
const ownKeys = o => Object.keys(o).concat(Object.getOwnPropertySymbols(o));
/** @internal */
exports.ownKeys = ownKeys;
const memoizeThunk = f => {
  let done = false;
  let a;
  return () => {
    if (done) {
      return a;
    }
    a = f();
    done = true;
    return a;
  };
};
/** @internal */
exports.memoizeThunk = memoizeThunk;
const isStringKeyword = ast => ast._tag === "StringKeyword";
/** @internal */
exports.isStringKeyword = isStringKeyword;
const isSymbolKeyword = ast => ast._tag === "SymbolKeyword";
exports.isSymbolKeyword = isSymbolKeyword;
//# sourceMappingURL=common.js.map