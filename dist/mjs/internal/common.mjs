/**
 * @since 1.0.0
 */
// ---------------------------------------------
// hooks
// ---------------------------------------------
/** @internal */
export const ArbitraryHookId = /*#__PURE__*/Symbol.for("@effect/schema/ArbitraryHookId");
/** @internal */
export const PrettyHookId = /*#__PURE__*/Symbol.for("@effect/schema/PrettyHookId");
// ---------------------------------------------
// Schema APIs
// ---------------------------------------------
/** @internal */
export const getKeysForIndexSignature = (input, parameter) => {
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
export const ownKeys = o => Object.keys(o).concat(Object.getOwnPropertySymbols(o));
/** @internal */
export const memoizeThunk = f => {
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
export const isStringKeyword = ast => ast._tag === "StringKeyword";
/** @internal */
export const isSymbolKeyword = ast => ast._tag === "SymbolKeyword";
//# sourceMappingURL=common.mjs.map