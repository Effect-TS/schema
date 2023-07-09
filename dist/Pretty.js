"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.match = exports.build = exports.PrettyHookId = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var RA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/ReadonlyArray"));
var AST = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/AST"));
var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/internal/common"));
var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/Parser"));
var S = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/Schema"));
var _TreeFormatter = /*#__PURE__*/require("@effect/schema/TreeFormatter");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

/**
 * @category hooks
 * @since 1.0.0
 */
const PrettyHookId = I.PrettyHookId;
/**
 * @category prettify
 * @since 1.0.0
 */
exports.PrettyHookId = PrettyHookId;
const build = schema => compile(schema.ast);
exports.build = build;
const getHook = /*#__PURE__*/AST.getAnnotation(PrettyHookId);
const toString = () => String;
const stringify = () => a => JSON.stringify(a);
const format = () => _TreeFormatter.formatActual;
/**
 * @since 1.0.0
 */
const match = {
  "Declaration": (ast, go) => (0, _Function.pipe)(getHook(ast), O.match({
    onNone: () => go(ast.type),
    onSome: handler => handler(...ast.typeParameters.map(go))
  })),
  "VoidKeyword": () => () => "void(0)",
  "NeverKeyword": () => () => {
    throw new Error("cannot pretty print a `never` value");
  },
  "Literal": () => literal => typeof literal === "bigint" ? `${String(literal)}n` : JSON.stringify(literal),
  "SymbolKeyword": toString,
  "UniqueSymbol": toString,
  "TemplateLiteral": stringify,
  "UndefinedKeyword": toString,
  "UnknownKeyword": format,
  "AnyKeyword": format,
  "ObjectKeyword": format,
  "StringKeyword": stringify,
  "NumberKeyword": toString,
  "BooleanKeyword": toString,
  "BigIntKeyword": () => a => `${String(a)}n`,
  "Enums": stringify,
  "Tuple": (ast, go) => {
    const elements = ast.elements.map(e => go(e.type));
    const rest = (0, _Function.pipe)(ast.rest, O.map(RA.mapNonEmpty(go)));
    return input => {
      const output = [];
      let i = 0;
      // ---------------------------------------------
      // handle elements
      // ---------------------------------------------
      for (; i < elements.length; i++) {
        if (input.length < i + 1) {
          if (ast.elements[i].isOptional) {
            continue;
          }
        } else {
          output.push(elements[i](input[i]));
        }
      }
      // ---------------------------------------------
      // handle rest element
      // ---------------------------------------------
      if (O.isSome(rest)) {
        const head = RA.headNonEmpty(rest.value);
        const tail = RA.tailNonEmpty(rest.value);
        for (; i < input.length - tail.length; i++) {
          output.push(head(input[i]));
        }
        // ---------------------------------------------
        // handle post rest elements
        // ---------------------------------------------
        for (let j = 0; j < tail.length; j++) {
          i += j;
          output.push(tail[j](input[i]));
        }
      }
      return "[" + output.join(", ") + "]";
    };
  },
  "TypeLiteral": (ast, go) => {
    const propertySignaturesTypes = ast.propertySignatures.map(f => go(f.type));
    const indexSignatureTypes = ast.indexSignatures.map(is => go(is.type));
    const expectedKeys = {};
    for (let i = 0; i < propertySignaturesTypes.length; i++) {
      expectedKeys[ast.propertySignatures[i].name] = null;
    }
    return input => {
      const output = [];
      // ---------------------------------------------
      // handle property signatures
      // ---------------------------------------------
      for (let i = 0; i < propertySignaturesTypes.length; i++) {
        const ps = ast.propertySignatures[i];
        const name = ps.name;
        if (ps.isOptional && !Object.prototype.hasOwnProperty.call(input, name)) {
          continue;
        }
        output.push(`${getPrettyPropertyKey(name)}: ${propertySignaturesTypes[i](input[name])}`);
      }
      // ---------------------------------------------
      // handle index signatures
      // ---------------------------------------------
      if (indexSignatureTypes.length > 0) {
        for (let i = 0; i < indexSignatureTypes.length; i++) {
          const type = indexSignatureTypes[i];
          const keys = I.getKeysForIndexSignature(input, ast.indexSignatures[i].parameter);
          for (const key of keys) {
            if (Object.prototype.hasOwnProperty.call(expectedKeys, key)) {
              continue;
            }
            output.push(`${getPrettyPropertyKey(key)}: ${type(input[key])}`);
          }
        }
      }
      return RA.isNonEmptyReadonlyArray(output) ? "{ " + output.join(", ") + " }" : "{}";
    };
  },
  "Union": (ast, go) => {
    const types = ast.types.map(ast => [P.is(S.make(ast)), go(ast)]);
    return a => {
      const index = types.findIndex(([is]) => is(a));
      return types[index][1](a);
    };
  },
  "Lazy": (ast, go) => {
    const get = I.memoizeThunk(() => go(ast.f()));
    return a => get()(a);
  },
  "Refinement": (ast, go) => go(ast.from),
  "Transform": () => {
    throw new Error("cannot build a Pretty for transformations");
  }
};
exports.match = match;
const compile = /*#__PURE__*/AST.getCompiler(match);
const getPrettyPropertyKey = name => typeof name === "string" ? JSON.stringify(name) : String(name);
//# sourceMappingURL=Pretty.js.map