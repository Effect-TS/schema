"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSync = exports.validateResult = exports.validatePromise = exports.validateOption = exports.validateEither = exports.validate = exports.parseSync = exports.parseResult = exports.parsePromise = exports.parseOption = exports.parseEither = exports.parse = exports.is = exports.getDecode = exports.encodeSync = exports.encodeResult = exports.encodePromise = exports.encodeOption = exports.encodeEither = exports.encode = exports.defaultParseOption = exports.decodeSync = exports.decodeResult = exports.decodePromise = exports.decodeOption = exports.decodeEither = exports.decode = exports.asserts = exports._getSearchTree = exports._getLiterals = void 0;
var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Predicate"));
var RA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/ReadonlyArray"));
var Effect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Effect"));
var AST = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/AST"));
var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/internal/common"));
var PR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/ParseResult"));
var _TreeFormatter = /*#__PURE__*/require("@effect/schema/TreeFormatter");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

const getSync = (ast, isDecoding) => {
  const parser = go(ast, isDecoding);
  return (input, options) => {
    const result = parser(input, options);
    // @ts-expect-error
    if (E.isLeft(result)) {
      throw new Error((0, _TreeFormatter.formatErrors)(result.left.errors));
    }
    // @ts-expect-error
    return result.right;
  };
};
const getOption = (ast, isDecoding) => {
  const parser = getEither(ast, isDecoding);
  return (input, options) => O.getRight(parser(input, options));
};
const getEither = (ast, isDecoding) => {
  const parser = go(ast, isDecoding);
  return (input, options) => parser(input, options);
};
const getPromise = (ast, isDecoding) => {
  const parser = go(ast, isDecoding);
  return (input, options) => Effect.runPromise(parser(input, {
    ...options,
    isEffectAllowed: true
  }));
};
const getEffect = (ast, isDecoding) => {
  const parser = go(ast, isDecoding);
  return (input, options) => parser(input, {
    ...options,
    isEffectAllowed: true
  });
};
/**
 * @category parsing
 * @since 1.0.0
 */
const parseSync = schema => getSync(schema.ast, true);
/**
 * @category parsing
 * @since 1.0.0
 */
exports.parseSync = parseSync;
const parseOption = schema => getOption(schema.ast, true);
/**
 * @category parsing
 * @since 1.0.0
 */
exports.parseOption = parseOption;
const parseEither = schema => getEither(schema.ast, true);
/**
 * @category parsing
 * @since 1.0.0
 */
exports.parseEither = parseEither;
const parseResult = schema => go(schema.ast, true);
/**
 * @category parsing
 * @since 1.0.0
 */
exports.parseResult = parseResult;
const parsePromise = schema => getPromise(schema.ast, true);
/**
 * @category parsing
 * @since 1.0.0
 */
exports.parsePromise = parsePromise;
const parse = schema => getEffect(schema.ast, true);
/**
 * @category decoding
 * @since 1.0.0
 */
exports.parse = parse;
const decodeSync = parseSync;
/**
 * @category decoding
 * @since 1.0.0
 */
exports.decodeSync = decodeSync;
const decodeOption = parseOption;
/**
 * @category decoding
 * @since 1.0.0
 */
exports.decodeOption = decodeOption;
const decodeEither = parseEither;
/**
 * @category decoding
 * @since 1.0.0
 */
exports.decodeEither = decodeEither;
const decodeResult = parseResult;
/**
 * @category decoding
 * @since 1.0.0
 */
exports.decodeResult = decodeResult;
const decodePromise = parsePromise;
/**
 * @category decoding
 * @since 1.0.0
 */
exports.decodePromise = decodePromise;
const decode = parse;
/**
 * @category validation
 * @since 1.0.0
 */
exports.decode = decode;
const validateSync = schema => getSync(schema.ast, true);
/**
 * @category validation
 * @since 1.0.0
 */
exports.validateSync = validateSync;
const validateOption = schema => getOption(schema.ast, true);
/**
 * @category validation
 * @since 1.0.0
 */
exports.validateOption = validateOption;
const validateEither = schema => getEither(schema.ast, true);
/**
 * @category validation
 * @since 1.0.0
 */
exports.validateEither = validateEither;
const validateResult = schema => go(schema.ast, true);
/**
 * @category validation
 * @since 1.0.0
 */
exports.validateResult = validateResult;
const validatePromise = schema => getPromise(schema.ast, true);
/**
 * @category validation
 * @since 1.0.0
 */
exports.validatePromise = validatePromise;
const validate = schema => getEffect(schema.ast, true);
/**
 * @category validation
 * @since 1.0.0
 */
exports.validate = validate;
const is = schema => {
  const getEither = validateEither(schema);
  return a => E.isRight(getEither(a));
};
/**
 * @category validation
 * @since 1.0.0
 */
exports.is = is;
const asserts = schema => {
  const get = validateSync(schema);
  return (a, options) => {
    get(a, options);
  };
};
/**
 * @category encoding
 * @since 1.0.0
 */
exports.asserts = asserts;
const encodeSync = schema => getSync(schema.ast, false);
/**
 * @category encoding
 * @since 1.0.0
 */
exports.encodeSync = encodeSync;
const encodeOption = schema => getOption(schema.ast, false);
/**
 * @category encoding
 * @since 1.0.0
 */
exports.encodeOption = encodeOption;
const encodeEither = schema => getEither(schema.ast, false);
/**
 * @category encoding
 * @since 1.0.0
 */
exports.encodeEither = encodeEither;
const encodeResult = schema => go(schema.ast, false);
/**
 * @category encoding
 * @since 1.0.0
 */
exports.encodeResult = encodeResult;
const encodePromise = schema => getPromise(schema.ast, false);
/**
 * @category encoding
 * @since 1.0.0
 */
exports.encodePromise = encodePromise;
const encode = schema => getEffect(schema.ast, false);
/**
 * @since 1.0.0"decoding" | "encoding"
 */
exports.encode = encode;
const defaultParseOption = {};
exports.defaultParseOption = defaultParseOption;
const go = (ast, isDecoding) => {
  switch (ast._tag) {
    case "Refinement":
      {
        if (isDecoding) {
          const from = go(ast.from, true);
          return (i, options) => handleForbidden(PR.flatMap(from(i, options), a => O.match(ast.filter(a, options ?? defaultParseOption, ast), {
            onNone: () => PR.success(a),
            onSome: PR.fail
          })), options);
        } else {
          const from = go(AST.to(ast), true);
          const to = go(dropRightRefinement(ast.from), false);
          return (i, options) => handleForbidden(PR.flatMap(from(i, options), a => to(a, options)), options);
        }
      }
    case "Transform":
      {
        const decode = getDecode(ast.transformAST, isDecoding);
        const from = isDecoding ? go(ast.from, true) : go(ast.to, false);
        const to = isDecoding ? go(ast.to, true) : go(ast.from, false);
        return (i1, options) => handleForbidden(PR.flatMap(from(i1, options), a => PR.flatMap(decode(a, options ?? defaultParseOption, ast), i2 => to(i2, options))), options);
      }
    case "Declaration":
      {
        if (isDecoding) {
          const parse = ast.decode(...ast.typeParameters);
          return (i, options) => handleForbidden(parse(i, options ?? defaultParseOption, ast), options);
        }
        return PR.success;
      }
    case "Literal":
      return fromRefinement(ast, u => u === ast.literal);
    case "UniqueSymbol":
      return fromRefinement(ast, u => u === ast.symbol);
    case "UndefinedKeyword":
      return fromRefinement(ast, P.isUndefined);
    case "VoidKeyword":
      return fromRefinement(ast, P.isUndefined);
    case "NeverKeyword":
      return fromRefinement(ast, P.isNever);
    case "UnknownKeyword":
    case "AnyKeyword":
      return PR.success;
    case "StringKeyword":
      return fromRefinement(ast, P.isString);
    case "NumberKeyword":
      return fromRefinement(ast, P.isNumber);
    case "BooleanKeyword":
      return fromRefinement(ast, P.isBoolean);
    case "BigIntKeyword":
      return fromRefinement(ast, P.isBigint);
    case "SymbolKeyword":
      return fromRefinement(ast, P.isSymbol);
    case "ObjectKeyword":
      return fromRefinement(ast, P.isObject);
    case "Enums":
      return fromRefinement(ast, u => ast.enums.some(([_, value]) => value === u));
    case "TemplateLiteral":
      {
        const regex = getTemplateLiteralRegex(ast);
        return fromRefinement(ast, u => P.isString(u) && regex.test(u));
      }
    case "Tuple":
      {
        const elements = ast.elements.map(e => go(e.type, isDecoding));
        const rest = (0, _Function.pipe)(ast.rest, O.map(RA.mapNonEmpty(ast => go(ast, isDecoding))));
        let requiredLen = ast.elements.filter(e => !e.isOptional).length;
        if (O.isSome(ast.rest)) {
          requiredLen += ast.rest.value.length - 1;
        }
        return (input, options) => {
          if (!Array.isArray(input)) {
            return PR.failure(PR.type(unknownArray, input));
          }
          const allErrors = options?.errors === "all";
          const es = [];
          let stepKey = 0;
          // ---------------------------------------------
          // handle missing indexes
          // ---------------------------------------------
          const len = input.length;
          for (let i = len; i <= requiredLen - 1; i++) {
            const e = PR.index(i, [PR.missing]);
            if (allErrors) {
              es.push([stepKey++, e]);
              continue;
            } else {
              return PR.failure(e);
            }
          }
          // ---------------------------------------------
          // handle excess indexes
          // ---------------------------------------------
          if (O.isNone(ast.rest)) {
            for (let i = ast.elements.length; i <= len - 1; i++) {
              const e = PR.index(i, [PR.unexpected(input[i])]);
              if (allErrors) {
                es.push([stepKey++, e]);
                continue;
              } else {
                return PR.failures(mutableAppend(sortByIndex(es), e));
              }
            }
          }
          const output = [];
          let i = 0;
          let queue = undefined;
          // ---------------------------------------------
          // handle elements
          // ---------------------------------------------
          for (; i < elements.length; i++) {
            if (len < i + 1) {
              // the input element is missing...
              if (ast.elements[i].isOptional) {
                continue;
              }
            } else {
              const parser = elements[i];
              const te = parser(input[i], options);
              const eu = PR.eitherOrUndefined(te);
              if (eu) {
                if (E.isLeft(eu)) {
                  // the input element is present but is not valid
                  const e = PR.index(i, eu.left.errors);
                  if (allErrors) {
                    es.push([stepKey++, e]);
                    continue;
                  } else {
                    return PR.failures(mutableAppend(sortByIndex(es), e));
                  }
                }
                output.push([stepKey++, eu.right]);
              } else {
                const nk = stepKey++;
                const index = i;
                if (!queue) {
                  queue = [];
                }
                queue.push(({
                  es,
                  output
                }) => Effect.flatMap(Effect.either(te), t => {
                  if (E.isLeft(t)) {
                    // the input element is present but is not valid
                    const e = PR.index(index, t.left.errors);
                    if (allErrors) {
                      es.push([nk, e]);
                      return Effect.unit;
                    } else {
                      return PR.failures(mutableAppend(sortByIndex(es), e));
                    }
                  }
                  output.push([nk, t.right]);
                  return Effect.unit;
                }));
              }
            }
          }
          // ---------------------------------------------
          // handle rest element
          // ---------------------------------------------
          if (O.isSome(rest)) {
            const head = RA.headNonEmpty(rest.value);
            const tail = RA.tailNonEmpty(rest.value);
            for (; i < len - tail.length; i++) {
              const te = head(input[i], options);
              const eu = PR.eitherOrUndefined(te);
              if (eu) {
                if (E.isLeft(eu)) {
                  const e = PR.index(i, eu.left.errors);
                  if (allErrors) {
                    es.push([stepKey++, e]);
                    continue;
                  } else {
                    return PR.failures(mutableAppend(sortByIndex(es), e));
                  }
                } else {
                  output.push([stepKey++, eu.right]);
                }
              } else {
                const nk = stepKey++;
                const index = i;
                if (!queue) {
                  queue = [];
                }
                queue.push(({
                  es,
                  output
                }) => Effect.flatMap(Effect.either(te), t => {
                  if (E.isLeft(t)) {
                    const e = PR.index(index, t.left.errors);
                    if (allErrors) {
                      es.push([nk, e]);
                      return Effect.unit;
                    } else {
                      return PR.failures(mutableAppend(sortByIndex(es), e));
                    }
                  } else {
                    output.push([nk, t.right]);
                    return Effect.unit;
                  }
                }));
              }
            }
            // ---------------------------------------------
            // handle post rest elements
            // ---------------------------------------------
            for (let j = 0; j < tail.length; j++) {
              i += j;
              if (len < i + 1) {
                continue;
              } else {
                const te = tail[j](input[i], options);
                const eu = PR.eitherOrUndefined(te);
                if (eu) {
                  if (E.isLeft(eu)) {
                    // the input element is present but is not valid
                    const e = PR.index(i, eu.left.errors);
                    if (allErrors) {
                      es.push([stepKey++, e]);
                      continue;
                    } else {
                      return PR.failures(mutableAppend(sortByIndex(es), e));
                    }
                  }
                  output.push([stepKey++, eu.right]);
                } else {
                  const nk = stepKey++;
                  const index = i;
                  if (!queue) {
                    queue = [];
                  }
                  queue.push(({
                    es,
                    output
                  }) => Effect.flatMap(Effect.either(te), t => {
                    if (E.isLeft(t)) {
                      // the input element is present but is not valid
                      const e = PR.index(index, t.left.errors);
                      if (allErrors) {
                        es.push([nk, e]);
                        return Effect.unit;
                      } else {
                        return PR.failures(mutableAppend(sortByIndex(es), e));
                      }
                    }
                    output.push([nk, t.right]);
                    return Effect.unit;
                  }));
                }
              }
            }
          }
          // ---------------------------------------------
          // compute output
          // ---------------------------------------------
          const computeResult = ({
            es,
            output
          }) => RA.isNonEmptyArray(es) ? PR.failures(sortByIndex(es)) : PR.success(sortByIndex(output));
          if (queue && queue.length > 0) {
            const cqueue = queue;
            return Effect.suspend(() => {
              const state = {
                es: Array.from(es),
                output: Array.from(output)
              };
              return Effect.flatMap(Effect.forEach(cqueue, f => f(state), {
                concurrency: "unbounded",
                discard: true
              }), () => computeResult(state));
            });
          }
          return computeResult({
            output,
            es
          });
        };
      }
    case "TypeLiteral":
      {
        if (ast.propertySignatures.length === 0 && ast.indexSignatures.length === 0) {
          return fromRefinement(ast, P.isNotNullable);
        }
        const propertySignatures = [];
        const expectedKeys = {};
        for (const ps of ast.propertySignatures) {
          propertySignatures.push(go(ps.type, isDecoding));
          expectedKeys[ps.name] = null;
        }
        const indexSignatures = [];
        const expectedKeyTypes = {};
        for (const is of ast.indexSignatures) {
          indexSignatures.push([go(is.parameter, isDecoding), go(is.type, isDecoding)]);
          const base = AST.getParameterBase(is.parameter);
          if (AST.isSymbolKeyword(base)) {
            expectedKeyTypes.symbol = true;
          } else {
            expectedKeyTypes.string = true;
          }
        }
        return (input, options) => {
          if (!P.isRecord(input)) {
            return PR.failure(PR.type(unknownRecord, input));
          }
          const allErrors = options?.errors === "all";
          const es = [];
          let stepKey = 0;
          // ---------------------------------------------
          // handle excess properties
          // ---------------------------------------------
          const onExcessPropertyError = options?.onExcessProperty === "error";
          if (onExcessPropertyError) {
            for (const key of I.ownKeys(input)) {
              if (!Object.prototype.hasOwnProperty.call(expectedKeys, key)) {
                if (!(typeof key in expectedKeyTypes)) {
                  const e = PR.key(key, [PR.unexpected(input[key])]);
                  if (allErrors) {
                    es.push([stepKey++, e]);
                    continue;
                  } else {
                    return PR.failures(mutableAppend(sortByIndex(es), e));
                  }
                }
              }
            }
          }
          // ---------------------------------------------
          // handle property signatures
          // ---------------------------------------------
          const output = {};
          let queue = undefined;
          for (let i = 0; i < propertySignatures.length; i++) {
            const ps = ast.propertySignatures[i];
            const parser = propertySignatures[i];
            const name = ps.name;
            if (Object.prototype.hasOwnProperty.call(input, name)) {
              const te = parser(input[name], options);
              const eu = PR.eitherOrUndefined(te);
              if (eu) {
                if (E.isLeft(eu)) {
                  // the input key is present but is not valid
                  const e = PR.key(name, eu.left.errors);
                  if (allErrors) {
                    es.push([stepKey++, e]);
                    continue;
                  } else {
                    return PR.failures(mutableAppend(sortByIndex(es), e));
                  }
                }
                output[name] = eu.right;
              } else {
                const nk = stepKey++;
                const index = name;
                if (!queue) {
                  queue = [];
                }
                queue.push(({
                  es,
                  output
                }) => Effect.flatMap(Effect.either(te), t => {
                  if (E.isLeft(t)) {
                    // the input key is present but is not valid
                    const e = PR.key(index, t.left.errors);
                    if (allErrors) {
                      es.push([nk, e]);
                      return Effect.unit;
                    } else {
                      return PR.failures(mutableAppend(sortByIndex(es), e));
                    }
                  }
                  output[index] = t.right;
                  return Effect.unit;
                }));
              }
            } else {
              // ---------------------------------------------
              // handle missing keys
              // ---------------------------------------------
              if (!ps.isOptional) {
                const e = PR.key(name, [PR.missing]);
                if (allErrors) {
                  es.push([stepKey++, e]);
                  continue;
                } else {
                  return PR.failure(e);
                }
              }
            }
          }
          // ---------------------------------------------
          // handle index signatures
          // ---------------------------------------------
          for (let i = 0; i < indexSignatures.length; i++) {
            const parameter = indexSignatures[i][0];
            const type = indexSignatures[i][1];
            const keys = I.getKeysForIndexSignature(input, ast.indexSignatures[i].parameter);
            for (const key of keys) {
              // ---------------------------------------------
              // handle keys
              // ---------------------------------------------
              const keu = PR.eitherOrUndefined(parameter(key, options));
              if (keu) {
                if (E.isLeft(keu)) {
                  const e = PR.key(key, keu.left.errors);
                  if (allErrors) {
                    es.push([stepKey++, e]);
                    continue;
                  } else {
                    return PR.failures(mutableAppend(sortByIndex(es), e));
                  }
                }
              }
              // there's no else here because index signature parameters are restricted to primitives
              // ---------------------------------------------
              // handle values
              // ---------------------------------------------
              const vpr = type(input[key], options);
              const veu = PR.eitherOrUndefined(vpr);
              if (veu) {
                if (E.isLeft(veu)) {
                  const e = PR.key(key, veu.left.errors);
                  if (allErrors) {
                    es.push([stepKey++, e]);
                    continue;
                  } else {
                    return PR.failures(mutableAppend(sortByIndex(es), e));
                  }
                } else {
                  if (!Object.prototype.hasOwnProperty.call(expectedKeys, key)) {
                    output[key] = veu.right;
                  }
                }
              } else {
                const nk = stepKey++;
                const index = key;
                if (!queue) {
                  queue = [];
                }
                queue.push(({
                  es,
                  output
                }) => Effect.flatMap(Effect.either(vpr), tv => {
                  if (E.isLeft(tv)) {
                    const e = PR.key(index, tv.left.errors);
                    if (allErrors) {
                      es.push([nk, e]);
                      return Effect.unit;
                    } else {
                      return PR.failures(mutableAppend(sortByIndex(es), e));
                    }
                  } else {
                    if (!Object.prototype.hasOwnProperty.call(expectedKeys, key)) {
                      output[key] = tv.right;
                    }
                    return Effect.unit;
                  }
                }));
              }
            }
          }
          // ---------------------------------------------
          // compute output
          // ---------------------------------------------
          const computeResult = ({
            es,
            output
          }) => RA.isNonEmptyArray(es) ? PR.failures(sortByIndex(es)) : PR.success(output);
          if (queue && queue.length > 0) {
            const cqueue = queue;
            return Effect.suspend(() => {
              const state = {
                es: Array.from(es),
                output: Object.assign({}, output)
              };
              return Effect.flatMap(Effect.forEach(cqueue, f => f(state), {
                concurrency: "unbounded",
                discard: true
              }), () => computeResult(state));
            });
          }
          return computeResult({
            es,
            output
          });
        };
      }
    case "Union":
      {
        const searchTree = _getSearchTree(ast.types);
        const ownKeys = I.ownKeys(searchTree.keys);
        const len = ownKeys.length;
        const map = new Map();
        for (let i = 0; i < ast.types.length; i++) {
          map.set(ast.types[i], go(ast.types[i], isDecoding));
        }
        return (input, options) => {
          const es = [];
          let stepKey = 0;
          let candidates = [];
          if (len > 0) {
            // if there is at least one key then input must be an object
            if (P.isRecord(input)) {
              for (let i = 0; i < len; i++) {
                const name = ownKeys[i];
                const buckets = searchTree.keys[name].buckets;
                // for each property that should contain a literal, check if the input contains that property
                if (Object.prototype.hasOwnProperty.call(input, name)) {
                  const literal = String(input[name]);
                  // check that the value obtained from the input for the property corresponds to an existing bucket
                  if (Object.prototype.hasOwnProperty.call(buckets, literal)) {
                    // retrive the minimal set of candidates for decoding
                    candidates = candidates.concat(buckets[literal]);
                  } else {
                    es.push([stepKey++, PR.key(name, [PR.type(searchTree.keys[name].ast, input[name])])]);
                  }
                } else {
                  es.push([stepKey++, PR.key(name, [PR.missing])]);
                }
              }
            } else {
              es.push([stepKey++, PR.type(unknownRecord, input)]);
            }
          }
          if (searchTree.otherwise.length > 0) {
            candidates = candidates.concat(searchTree.otherwise);
          }
          let queue = undefined;
          for (let i = 0; i < candidates.length; i++) {
            const pr = map.get(candidates[i])(input, options);
            // the members of a union are ordered based on which one should be decoded first,
            // therefore if one member has added a task, all subsequent members must
            // also add a task to the queue even if they are synchronous
            const eu = !queue || queue.length === 0 ? PR.eitherOrUndefined(pr) : undefined;
            if (eu) {
              if (E.isRight(eu)) {
                return PR.success(eu.right);
              } else {
                es.push([stepKey++, PR.unionMember(eu.left.errors)]);
              }
            } else {
              const nk = stepKey++;
              if (!queue) {
                queue = [];
              }
              queue.push(state => Effect.suspend(() => {
                if ("finalResult" in state) {
                  return Effect.unit;
                } else {
                  return Effect.flatMap(Effect.either(pr), t => {
                    if (E.isRight(t)) {
                      state.finalResult = PR.success(t.right);
                    } else {
                      state.es.push([nk, PR.unionMember(t.left.errors)]);
                    }
                    return Effect.unit;
                  });
                }
              }));
            }
          }
          // ---------------------------------------------
          // compute output
          // ---------------------------------------------
          const computeResult = es => RA.isNonEmptyArray(es) ? PR.failures(sortByIndex(es)) :
          // this should never happen
          PR.failure(PR.type(AST.neverKeyword, input));
          if (queue && queue.length > 0) {
            const cqueue = queue;
            return Effect.suspend(() => {
              const state = {
                es: Array.from(es)
              };
              return Effect.flatMap(Effect.forEach(cqueue, f => f(state), {
                concurrency: 1,
                discard: true
              }), () => {
                if ("finalResult" in state) {
                  return state.finalResult;
                }
                return computeResult(state.es);
              });
            });
          }
          return computeResult(es);
        };
      }
    case "Lazy":
      {
        const get = I.memoizeThunk(() => go(ast.f(), isDecoding));
        return (a, options) => get()(a, options);
      }
  }
};
const fromRefinement = (ast, refinement) => u => refinement(u) ? PR.success(u) : PR.failure(PR.type(ast, u));
/** @internal */
const _getLiterals = ast => {
  switch (ast._tag) {
    case "Declaration":
      return _getLiterals(ast.type);
    case "TypeLiteral":
      {
        const out = [];
        for (let i = 0; i < ast.propertySignatures.length; i++) {
          const propertySignature = ast.propertySignatures[i];
          const type = AST.from(propertySignature.type);
          if (AST.isLiteral(type) && !propertySignature.isOptional) {
            out.push([propertySignature.name, type]);
          }
        }
        return out;
      }
    case "Refinement":
    case "Transform":
      return _getLiterals(ast.from);
  }
  return [];
};
/**
 * The purpose of the algorithm is to narrow down the pool of possible candidates for decoding as much as possible.
 *
 * This function separates the schemas into two groups, `keys` and `otherwise`:
 *
 * - `keys`: the schema has at least one property with a literal value
 * - `otherwise`: the schema has no properties with a literal value
 *
 * If a schema has at least one property with a literal value, so it ends up in `keys`, first a namespace is created for
 * the name of the property containing the literal, and then within this namespace a "bucket" is created for the literal
 * value in which to store all the schemas that have the same property and literal value.
 *
 * @internal
 */
exports._getLiterals = _getLiterals;
const _getSearchTree = members => {
  const keys = {};
  const otherwise = [];
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    const tags = _getLiterals(member);
    if (tags.length > 0) {
      for (let j = 0; j < tags.length; j++) {
        const [key, literal] = tags[j];
        const hash = String(literal.literal);
        keys[key] = keys[key] || {
          buckets: {},
          ast: AST.neverKeyword
        };
        const buckets = keys[key].buckets;
        if (Object.prototype.hasOwnProperty.call(buckets, hash)) {
          if (j < tags.length - 1) {
            continue;
          }
          buckets[hash].push(member);
          keys[key].ast = AST.createUnion([keys[key].ast, literal]);
        } else {
          buckets[hash] = [member];
          keys[key].ast = AST.createUnion([keys[key].ast, literal]);
          break;
        }
      }
    } else {
      otherwise.push(member);
    }
  }
  return {
    keys,
    otherwise
  };
};
exports._getSearchTree = _getSearchTree;
const dropRightRefinement = ast => AST.isRefinement(ast) ? dropRightRefinement(ast.from) : ast;
const handleForbidden = (conditional, options) => {
  const eu = PR.eitherOrUndefined(conditional);
  return eu ? eu : options?.isEffectAllowed === true ? conditional : PR.failure(PR.forbidden);
};
const unknownArray = /*#__PURE__*/AST.createTuple([], /*#__PURE__*/O.some([AST.unknownKeyword]), true, {
  [AST.DescriptionAnnotationId]: "a generic array"
});
const unknownRecord = /*#__PURE__*/AST.createTypeLiteral([], [/*#__PURE__*/AST.createIndexSignature(AST.stringKeyword, AST.unknownKeyword, true), /*#__PURE__*/AST.createIndexSignature(AST.symbolKeyword, AST.unknownKeyword, true)], {
  [AST.DescriptionAnnotationId]: "a generic object"
});
const mutableAppend = (self, a) => {
  self.push(a);
  return self;
};
const getTemplateLiteralRegex = ast => {
  let pattern = `^${ast.head}`;
  for (const span of ast.spans) {
    if (AST.isStringKeyword(span.type)) {
      pattern += ".*";
    } else if (AST.isNumberKeyword(span.type)) {
      pattern += "-?\\d+(\\.\\d+)?";
    }
    pattern += span.literal;
  }
  pattern += "$";
  return new RegExp(pattern);
};
function sortByIndex(es) {
  return es.sort(([a], [b]) => a > b ? 1 : a < b ? -1 : 0).map(([_, a]) => a);
}
// -------------------------------------------------------------------------------------
// transformations interpreter
// -------------------------------------------------------------------------------------
const isFinalPropertySignatureTransformation = ast => ast._tag === "FinalPropertySignatureTransformation";
/** @internal */
const getDecode = (transform, isDecoding) => {
  switch (transform._tag) {
    case "FinalTransformation":
      return isDecoding ? transform.decode : transform.encode;
    case "ComposeTransformation":
      return PR.success;
    case "TypeLiteralTransformation":
      return (input, options, ast) => {
        let out = E.right(input);
        // ---------------------------------------------
        // handle property signature transformations
        // ---------------------------------------------
        for (const pst of transform.propertySignatureTransformations) {
          const [from, to] = isDecoding ? [pst.from, pst.to] : [pst.to, pst.from];
          const t = pst.transformation;
          if (isFinalPropertySignatureTransformation(t)) {
            const parse = isDecoding ? t.decode : t.encode;
            const f = input => {
              const o = parse(Object.prototype.hasOwnProperty.call(input, from) ? O.some(input[from]) : O.none());
              if (O.isSome(o)) {
                input[to] = o.value;
              } else {
                delete input[from];
              }
              return input;
            };
            out = PR.map(out, f);
          } else {
            const parse = getDecode(t, isDecoding);
            out = PR.flatMap(out, input => PR.bimap(parse(input[from], options, ast), e => PR.parseError([PR.key(from, e.errors)]), value => {
              input[to] = value;
              return input;
            }));
          }
        }
        return out;
      };
  }
};
exports.getDecode = getDecode;
//# sourceMappingURL=Parser.js.map