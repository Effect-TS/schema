/**
 * @since 1.0.0
 */
import { pipe } from "@effect/data/Function";
import * as Number from "@effect/data/Number";
import * as O from "@effect/data/Option";
import * as Order from "@effect/data/Order";
import { isNumber, isString, isSymbol } from "@effect/data/Predicate";
import * as ReadonlyArray from "@effect/data/ReadonlyArray";
import * as I from "@effect/schema/internal/common";
/**
 * @category annotations
 * @since 1.0.0
 */
export const BrandAnnotationId = /*#__PURE__*/Symbol.for("@effect/schema/annotation/Brand");
/**
 * @category annotations
 * @since 1.0.0
 */
export const TypeAnnotationId = /*#__PURE__*/Symbol.for("@effect/schema/annotation/Type");
/**
 * @category annotations
 * @since 1.0.0
 */
export const MessageAnnotationId = /*#__PURE__*/Symbol.for("@effect/schema/annotation/Message");
/**
 * @category annotations
 * @since 1.0.0
 */
export const IdentifierAnnotationId = /*#__PURE__*/Symbol.for("@effect/schema/annotation/Identifier");
/**
 * @category annotations
 * @since 1.0.0
 */
export const TitleAnnotationId = /*#__PURE__*/Symbol.for("@effect/schema/annotation/Title");
/**
 * @category annotations
 * @since 1.0.0
 */
export const DescriptionAnnotationId = /*#__PURE__*/Symbol.for("@effect/schema/annotation/Description");
/**
 * @category annotations
 * @since 1.0.0
 */
export const ExamplesAnnotationId = /*#__PURE__*/Symbol.for("@effect/schema/annotation/Examples");
/**
 * @category annotations
 * @since 1.0.0
 */
export const JSONSchemaAnnotationId = /*#__PURE__*/Symbol.for("@effect/schema/annotation/JSONSchema");
/**
 * @category annotations
 * @since 1.0.0
 */
export const DocumentationAnnotationId = /*#__PURE__*/Symbol.for("@effect/schema/annotation/Documentation");
/**
 * @since 1.0.0
 */
export const getAnnotation = key => annotated => Object.prototype.hasOwnProperty.call(annotated.annotations, key) ? O.some(annotated.annotations[key]) : O.none();
/**
 * @category constructors
 * @since 1.0.0
 */
export const createDeclaration = (typeParameters, type, decode, annotations = {}) => ({
  _tag: "Declaration",
  typeParameters,
  type,
  decode,
  annotations
});
/**
 * @category guards
 * @since 1.0.0
 */
export const isDeclaration = ast => ast._tag === "Declaration";
/**
 * @category constructors
 * @since 1.0.0
 */
export const createLiteral = literal => ({
  _tag: "Literal",
  literal,
  annotations: {}
});
/**
 * @category guards
 * @since 1.0.0
 */
export const isLiteral = ast => ast._tag === "Literal";
/**
 * @category constructors
 * @since 1.0.0
 */
export const createUniqueSymbol = (symbol, annotations = {}) => ({
  _tag: "UniqueSymbol",
  symbol,
  annotations
});
/**
 * @category guards
 * @since 1.0.0
 */
export const isUniqueSymbol = ast => ast._tag === "UniqueSymbol";
/**
 * @category constructors
 * @since 1.0.0
 */
export const undefinedKeyword = {
  _tag: "UndefinedKeyword",
  annotations: {
    [TitleAnnotationId]: "undefined"
  }
};
/**
 * @category guards
 * @since 1.0.0
 */
export const isUndefinedKeyword = ast => ast._tag === "UndefinedKeyword";
/**
 * @category constructors
 * @since 1.0.0
 */
export const voidKeyword = {
  _tag: "VoidKeyword",
  annotations: {
    [TitleAnnotationId]: "void"
  }
};
/**
 * @category guards
 * @since 1.0.0
 */
export const isVoidKeyword = ast => ast._tag === "VoidKeyword";
/**
 * @category constructors
 * @since 1.0.0
 */
export const neverKeyword = {
  _tag: "NeverKeyword",
  annotations: {
    [TitleAnnotationId]: "never"
  }
};
/**
 * @category guards
 * @since 1.0.0
 */
export const isNeverKeyword = ast => ast._tag === "NeverKeyword";
/**
 * @category constructors
 * @since 1.0.0
 */
export const unknownKeyword = {
  _tag: "UnknownKeyword",
  annotations: {
    [TitleAnnotationId]: "unknown"
  }
};
/**
 * @category guards
 * @since 1.0.0
 */
export const isUnknownKeyword = ast => ast._tag === "UnknownKeyword";
/**
 * @category constructors
 * @since 1.0.0
 */
export const anyKeyword = {
  _tag: "AnyKeyword",
  annotations: {
    [TitleAnnotationId]: "any"
  }
};
/**
 * @category guards
 * @since 1.0.0
 */
export const isAnyKeyword = ast => ast._tag === "AnyKeyword";
/**
 * @category constructors
 * @since 1.0.0
 */
export const stringKeyword = {
  _tag: "StringKeyword",
  annotations: {
    [TitleAnnotationId]: "string",
    [DescriptionAnnotationId]: "a string"
  }
};
/**
 * @category guards
 * @since 1.0.0
 */
export const isStringKeyword = I.isStringKeyword;
/**
 * @category constructors
 * @since 1.0.0
 */
export const numberKeyword = {
  _tag: "NumberKeyword",
  annotations: {
    [TitleAnnotationId]: "number",
    [DescriptionAnnotationId]: "a number"
  }
};
/**
 * @category guards
 * @since 1.0.0
 */
export const isNumberKeyword = ast => ast._tag === "NumberKeyword";
/**
 * @category constructors
 * @since 1.0.0
 */
export const booleanKeyword = {
  _tag: "BooleanKeyword",
  annotations: {
    [TitleAnnotationId]: "boolean",
    [DescriptionAnnotationId]: "a boolean"
  }
};
/**
 * @category guards
 * @since 1.0.0
 */
export const isBooleanKeyword = ast => ast._tag === "BooleanKeyword";
/**
 * @category constructors
 * @since 1.0.0
 */
export const bigIntKeyword = {
  _tag: "BigIntKeyword",
  annotations: {
    [TitleAnnotationId]: "bigint",
    [DescriptionAnnotationId]: "a bigint"
  }
};
/**
 * @category guards
 * @since 1.0.0
 */
export const isBigIntKeyword = ast => ast._tag === "BigIntKeyword";
/**
 * @category constructors
 * @since 1.0.0
 */
export const symbolKeyword = {
  _tag: "SymbolKeyword",
  annotations: {
    [TitleAnnotationId]: "symbol",
    [DescriptionAnnotationId]: "a symbol"
  }
};
/**
 * @category guards
 * @since 1.0.0
 */
export const isSymbolKeyword = I.isSymbolKeyword;
/**
 * @category constructors
 * @since 1.0.0
 */
export const objectKeyword = {
  _tag: "ObjectKeyword",
  annotations: {
    [TitleAnnotationId]: "object",
    [DescriptionAnnotationId]: "an object"
  }
};
/**
 * @category guards
 * @since 1.0.0
 */
export const isObjectKeyword = ast => ast._tag === "ObjectKeyword";
/**
 * @category constructors
 * @since 1.0.0
 */
export const createEnums = enums => ({
  _tag: "Enums",
  enums,
  annotations: {}
});
/**
 * @category guards
 * @since 1.0.0
 */
export const isEnums = ast => ast._tag === "Enums";
/**
 * @category constructors
 * @since 1.0.0
 */
export const createTemplateLiteral = (head, spans) => ReadonlyArray.isNonEmptyReadonlyArray(spans) ? {
  _tag: "TemplateLiteral",
  head,
  spans,
  annotations: {}
} : createLiteral(head);
/**
 * @category guards
 * @since 1.0.0
 */
export const isTemplateLiteral = ast => ast._tag === "TemplateLiteral";
/**
 * @since 1.0.0
 */
export const createElement = (type, isOptional) => ({
  type,
  isOptional
});
/**
 * @category constructors
 * @since 1.0.0
 */
export const createTuple = (elements, rest, isReadonly, annotations = {}) => ({
  _tag: "Tuple",
  elements,
  rest,
  isReadonly,
  annotations
});
/**
 * @category guards
 * @since 1.0.0
 */
export const isTuple = ast => ast._tag === "Tuple";
/**
 * @since 1.0.0
 */
export const createPropertySignature = (name, type, isOptional, isReadonly, annotations = {}) => ({
  name,
  type,
  isOptional,
  isReadonly,
  annotations
});
/**
 * @since 1.0.0
 */
export const isParameter = ast => {
  switch (ast._tag) {
    case "StringKeyword":
    case "SymbolKeyword":
    case "TemplateLiteral":
      return true;
    case "Refinement":
      return isParameter(ast.from);
    default:
      return false;
  }
};
/**
 * @since 1.0.0
 */
export const createIndexSignature = (parameter, type, isReadonly) => {
  if (isParameter(parameter)) {
    return {
      parameter,
      type,
      isReadonly
    };
  }
  throw new Error("An index signature parameter type must be 'string', 'symbol', a template literal type or a refinement of the previous types");
};
/**
 * @category constructors
 * @since 1.0.0
 */
export const createTypeLiteral = (propertySignatures, indexSignatures, annotations = {}) => {
  // check for duplicate property signatures
  const keys = {};
  for (let i = 0; i < propertySignatures.length; i++) {
    const name = propertySignatures[i].name;
    if (Object.prototype.hasOwnProperty.call(keys, name)) {
      throw new Error(`Duplicate property signature ${String(name)}`);
    }
    keys[name] = null;
  }
  // check for duplicate index signatures
  const parameters = {
    string: false,
    symbol: false
  };
  for (let i = 0; i < indexSignatures.length; i++) {
    const parameter = getParameterBase(indexSignatures[i].parameter);
    if (isStringKeyword(parameter)) {
      if (parameters.string) {
        throw new Error("Duplicate index signature for type `string`");
      }
      parameters.string = true;
    } else if (isSymbolKeyword(parameter)) {
      if (parameters.symbol) {
        throw new Error("Duplicate index signature for type `symbol`");
      }
      parameters.symbol = true;
    }
  }
  return {
    _tag: "TypeLiteral",
    propertySignatures: sortPropertySignatures(propertySignatures),
    indexSignatures,
    annotations
  };
};
/**
 * @category guards
 * @since 1.0.0
 */
export const isTypeLiteral = ast => ast._tag === "TypeLiteral";
const isMembers = as => as.length > 1;
/**
 * @category constructors
 * @since 1.0.0
 */
export const createUnion = (candidates, annotations = {}) => {
  const types = unify(candidates);
  if (isMembers(types)) {
    return {
      _tag: "Union",
      types: sortUnionMembers(types),
      annotations
    };
  }
  if (ReadonlyArray.isNonEmptyReadonlyArray(types)) {
    return types[0];
  }
  return neverKeyword;
};
/**
 * @category guards
 * @since 1.0.0
 */
export const isUnion = ast => ast._tag === "Union";
/**
 * @category constructors
 * @since 1.0.0
 */
export const createLazy = (f, annotations = {}) => ({
  _tag: "Lazy",
  f: I.memoizeThunk(f),
  annotations
});
/**
 * @category guards
 * @since 1.0.0
 */
export const isLazy = ast => ast._tag === "Lazy";
/**
 * @category constructors
 * @since 1.0.0
 */
export const createRefinement = (from, filter, annotations = {}) => {
  if (isTransform(from)) {
    // recurse right
    return createTransform(from.from, createRefinement(from.to, filter, annotations), from.transformAST, from.annotations);
  }
  return {
    _tag: "Refinement",
    from,
    filter,
    annotations
  };
};
/**
 * @category guards
 * @since 1.0.0
 */
export const isRefinement = ast => ast._tag === "Refinement";
/**
 * @category constructors
 * @since 1.0.0
 */
export const createTransform = (from, to, transformAST, annotations = {}) => ({
  _tag: "Transform",
  from,
  to,
  transformAST,
  annotations
});
/**
 * @category guards
 * @since 1.0.0
 */
export const isTransform = ast => ast._tag === "Transform";
// -------------------------------------------------------------------------------------
// API
// -------------------------------------------------------------------------------------
/**
 * Adds a group of annotations, potentially overwriting existing annotations.
 *
 * @since 1.0.0
 */
export const mergeAnnotations = (ast, annotations) => ({
  ...ast,
  annotations: {
    ...ast.annotations,
    ...annotations
  }
});
/**
 * Adds a rest element to the end of a tuple, or throws an exception if the rest element is already present.
 *
 * @since 1.0.0
 */
export const appendRestElement = (ast, restElement) => {
  if (O.isSome(ast.rest)) {
    // example: `type A = [...string[], ...number[]]` is illegal
    throw new Error("A rest element cannot follow another rest element. ts(1265)");
  }
  return createTuple(ast.elements, O.some([restElement]), ast.isReadonly);
};
/**
 * Appends an element to a tuple or throws an exception in the following cases:
 * - A required element cannot follow an optional element. ts(1257)
 * - An optional element cannot follow a rest element. ts(1266)
 *
 * @since 1.0.0
 */
export const appendElement = (ast, newElement) => {
  if (ast.elements.some(e => e.isOptional) && !newElement.isOptional) {
    throw new Error("A required element cannot follow an optional element. ts(1257)");
  }
  return pipe(ast.rest, O.match({
    onNone: () => createTuple([...ast.elements, newElement], O.none(), ast.isReadonly),
    onSome: rest => {
      if (newElement.isOptional) {
        throw new Error("An optional element cannot follow a rest element. ts(1266)");
      }
      return createTuple(ast.elements, O.some([...rest, newElement.type]), ast.isReadonly);
    }
  }));
};
/**
 * Equivalent at runtime to the TypeScript type-level `keyof` operator.
 *
 * @since 1.0.0
 */
export const keyof = ast => createUnion(_keyof(ast));
/**
 * @since 1.0.0
 */
export const getPropertySignatures = ast => {
  switch (ast._tag) {
    case "TypeLiteral":
      return ast.propertySignatures;
    case "Lazy":
      return getPropertySignatures(ast.f());
  }
  throw new Error(`getPropertySignatures: unsupported schema (${ast._tag})`);
};
/**
 * Create a record with the specified key type and value type.
 *
 * @since 1.0.0
 */
export const createRecord = (key, value, isReadonly) => {
  const propertySignatures = [];
  const indexSignatures = [];
  const go = key => {
    switch (key._tag) {
      case "NeverKeyword":
        break;
      case "StringKeyword":
      case "SymbolKeyword":
      case "TemplateLiteral":
      case "Refinement":
        indexSignatures.push(createIndexSignature(key, value, isReadonly));
        break;
      case "Literal":
        if (isString(key.literal) || isNumber(key.literal)) {
          propertySignatures.push(createPropertySignature(key.literal, value, false, isReadonly));
        } else {
          throw new Error(`createRecord: unsupported literal ${String(key.literal)}`);
        }
        break;
      case "UniqueSymbol":
        propertySignatures.push(createPropertySignature(key.symbol, value, false, isReadonly));
        break;
      case "Union":
        key.types.forEach(go);
        break;
      default:
        throw new Error(`createRecord: unsupported key schema`);
    }
  };
  go(key);
  return createTypeLiteral(propertySignatures, indexSignatures);
};
/**
 * Equivalent at runtime to the built-in TypeScript utility type `Pick`.
 *
 * @since 1.0.0
 */
export const pick = (ast, keys) => createTypeLiteral(getPropertySignatures(ast).filter(ps => keys.includes(ps.name)), []);
/**
 * Equivalent at runtime to the built-in TypeScript utility type `Omit`.
 *
 * @since 1.0.0
 */
export const omit = (ast, keys) => createTypeLiteral(getPropertySignatures(ast).filter(ps => !keys.includes(ps.name)), []);
/**
 * Equivalent at runtime to the built-in TypeScript utility type `Partial`.
 *
 * @since 1.0.0
 */
export const partial = ast => {
  switch (ast._tag) {
    case "Tuple":
      return createTuple(ast.elements.map(e => createElement(e.type, true)), pipe(ast.rest, O.map(rest => [createUnion([...rest, undefinedKeyword])])), ast.isReadonly);
    case "TypeLiteral":
      return createTypeLiteral(ast.propertySignatures.map(f => createPropertySignature(f.name, f.type, true, f.isReadonly, f.annotations)), ast.indexSignatures);
    case "Union":
      return createUnion(ast.types.map(member => partial(member)));
    case "Lazy":
      return createLazy(() => partial(ast.f()));
    case "Declaration":
      throw new Error("`partial` cannot handle declarations");
    case "Refinement":
      throw new Error("`partial` cannot handle refinements");
    case "Transform":
      throw new Error("`partial` cannot handle transformations");
    default:
      return ast;
  }
};
/**
 * Equivalent at runtime to the built-in TypeScript utility type `Required`.
 *
 * @since 1.0.0
 */
export const required = ast => {
  switch (ast._tag) {
    case "Tuple":
      return createTuple(ast.elements.map(e => createElement(e.type, false)), pipe(ast.rest, O.map(rest => {
        const u = createUnion([...rest]);
        return ReadonlyArray.mapNonEmpty(rest, () => u);
      })), ast.isReadonly);
    case "TypeLiteral":
      return createTypeLiteral(ast.propertySignatures.map(f => createPropertySignature(f.name, f.type, false, f.isReadonly, f.annotations)), ast.indexSignatures);
    case "Union":
      return createUnion(ast.types.map(member => required(member)));
    case "Lazy":
      return createLazy(() => required(ast.f()));
    case "Declaration":
      throw new Error("`required` cannot handle declarations");
    case "Refinement":
      throw new Error("`required` cannot handle refinements");
    case "Transform":
      throw new Error("`required` cannot handle transformations");
    default:
      return ast;
  }
};
/**
 * @since 1.0.0
 */
export const getCompiler = match => {
  const compile = ast => match[ast._tag](ast, compile);
  return compile;
};
/** @internal */
export const getToPropertySignatures = ps => ps.map(p => createPropertySignature(p.name, to(p.type), p.isOptional, p.isReadonly, p.annotations));
/** @internal */
export const getToIndexSignatures = ps => ps.map(is => createIndexSignature(is.parameter, to(is.type), is.isReadonly));
/**
 * @since 1.0.0
 */
export const to = ast => {
  switch (ast._tag) {
    case "Tuple":
      return createTuple(ast.elements.map(e => createElement(to(e.type), e.isOptional)), O.map(ast.rest, ReadonlyArray.mapNonEmpty(to)), ast.isReadonly, ast.annotations);
    case "TypeLiteral":
      return createTypeLiteral(getToPropertySignatures(ast.propertySignatures), getToIndexSignatures(ast.indexSignatures), ast.annotations);
    case "Union":
      return createUnion(ast.types.map(to), ast.annotations);
    case "Lazy":
      return createLazy(() => to(ast.f()), ast.annotations);
    case "Refinement":
      return createRefinement(to(ast.from), ast.filter, ast.annotations);
    case "Transform":
      return to(ast.to);
  }
  return ast;
};
/**
 * @since 1.0.0
 */
export const from = ast => {
  switch (ast._tag) {
    case "Tuple":
      return createTuple(ast.elements.map(e => createElement(from(e.type), e.isOptional)), O.map(ast.rest, ReadonlyArray.mapNonEmpty(from)), ast.isReadonly);
    case "TypeLiteral":
      return createTypeLiteral(ast.propertySignatures.map(p => createPropertySignature(p.name, from(p.type), p.isOptional, p.isReadonly)), ast.indexSignatures.map(is => createIndexSignature(is.parameter, from(is.type), is.isReadonly)));
    case "Union":
      return createUnion(ast.types.map(from));
    case "Lazy":
      return createLazy(() => from(ast.f()));
    case "Transform":
      return from(ast.from);
  }
  return ast;
};
/** @internal */
export const getCardinality = ast => {
  switch (ast._tag) {
    case "Declaration":
      return getCardinality(ast.type);
    case "NeverKeyword":
      return 0;
    case "Literal":
    case "UndefinedKeyword":
    case "VoidKeyword":
    case "UniqueSymbol":
      return 1;
    case "BooleanKeyword":
      return 2;
    case "StringKeyword":
    case "NumberKeyword":
    case "BigIntKeyword":
    case "SymbolKeyword":
      return 3;
    case "ObjectKeyword":
      return 5;
    case "UnknownKeyword":
    case "AnyKeyword":
      return 6;
    default:
      return 4;
  }
};
const sortPropertySignatures = /*#__PURE__*/ReadonlyArray.sort( /*#__PURE__*/pipe(Number.Order, /*#__PURE__*/Order.mapInput(ps => getCardinality(ps.type))));
const WeightOrder = /*#__PURE__*/Order.tuple(Number.Order, Number.Order, Number.Order);
const maxWeight = /*#__PURE__*/Order.max(WeightOrder);
const emptyWeight = [0, 0, 0];
const maxWeightAll = weights => weights.reduce(maxWeight, emptyWeight);
/** @internal */
export const getWeight = ast => {
  switch (ast._tag) {
    case "Tuple":
      {
        const y = ast.elements.length;
        const z = O.isSome(ast.rest) ? ast.rest.value.length : 0;
        return [2, y, z];
      }
    case "TypeLiteral":
      {
        const y = ast.propertySignatures.length;
        const z = ast.indexSignatures.length;
        return y + z === 0 ? [-4, 0, 0] : [4, y, z];
      }
    case "Declaration":
      {
        const [_, y, z] = getWeight(ast.type);
        return [6, y, z];
      }
    case "Lazy":
      return [8, 0, 0];
    case "Union":
      return maxWeightAll(ast.types.map(getWeight));
    case "Refinement":
      {
        const [x, y, z] = getWeight(ast.from);
        return [x + 1, y, z];
      }
    case "Transform":
      return getWeight(ast.from);
    case "ObjectKeyword":
      return [-2, 0, 0];
    case "UnknownKeyword":
    case "AnyKeyword":
      return [-4, 0, 0];
    default:
      return emptyWeight;
  }
};
const sortUnionMembers = /*#__PURE__*/ReadonlyArray.sort( /*#__PURE__*/Order.reverse( /*#__PURE__*/Order.mapInput(WeightOrder, getWeight)));
const unify = candidates => {
  let out = pipe(candidates, ReadonlyArray.flatMap(ast => {
    switch (ast._tag) {
      case "NeverKeyword":
        return [];
      case "Union":
        return ast.types;
      default:
        return [ast];
    }
  }));
  if (out.some(isAnyKeyword)) {
    return [anyKeyword];
  }
  if (out.some(isUnknownKeyword)) {
    return [unknownKeyword];
  }
  let i;
  if ((i = out.findIndex(isStringKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isStringKeyword(m) && !(isLiteral(m) && typeof m.literal === "string"));
  }
  if ((i = out.findIndex(isNumberKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isNumberKeyword(m) && !(isLiteral(m) && typeof m.literal === "number"));
  }
  if ((i = out.findIndex(isBooleanKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isBooleanKeyword(m) && !(isLiteral(m) && typeof m.literal === "boolean"));
  }
  if ((i = out.findIndex(isBigIntKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isBigIntKeyword(m) && !(isLiteral(m) && typeof m.literal === "bigint"));
  }
  if ((i = out.findIndex(isSymbolKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isSymbolKeyword(m) && !isUniqueSymbol(m));
  }
  return out;
};
/** @internal */
export const getParameterBase = ast => {
  switch (ast._tag) {
    case "StringKeyword":
    case "SymbolKeyword":
    case "TemplateLiteral":
      return ast;
    case "Refinement":
      return getParameterBase(ast.from);
  }
};
const _keyof = ast => {
  switch (ast._tag) {
    case "Declaration":
      return _keyof(ast.type);
    case "TypeLiteral":
      return ast.propertySignatures.map(p => isSymbol(p.name) ? createUniqueSymbol(p.name) : createLiteral(p.name)).concat(ast.indexSignatures.map(is => getParameterBase(is.parameter)));
    case "Lazy":
      return _keyof(ast.f());
    default:
      throw new Error(`keyof: unsupported schema (${ast._tag})`);
  }
};
/**
 * @category constructors
 * @since 1.0.0
 */
export const createFinalTransformation = (decode, encode) => ({
  _tag: "FinalTransformation",
  decode,
  encode
});
/**
 * @category constructors
 * @since 1.0.0
 */
export const composeTransformation = {
  _tag: "ComposeTransformation"
};
/**
 * @category constructors
 * @since 1.0.0
 */
export const createFinalPropertySignatureTransformation = (decode, encode) => ({
  _tag: "FinalPropertySignatureTransformation",
  decode,
  encode
});
/**
 * @category constructors
 * @since 1.0.0
 */
export const createPropertySignatureTransformation = (from, to, transformation) => ({
  from,
  to,
  transformation
});
/**
 * @category constructors
 * @since 1.0.0
 */
export const createTypeLiteralTransformation = propertySignatureTransformations => {
  // check for duplicate property signature transformations
  const keys = {};
  for (const pst of propertySignatureTransformations) {
    const key = pst.from;
    if (keys[key]) {
      throw new Error(`Duplicate property signature transformation ${String(key)}`);
    }
    keys[key] = true;
  }
  return {
    _tag: "TypeLiteralTransformation",
    propertySignatureTransformations
  };
};
/**
 * @category guard
 * @since 1.0.0
 */
export const isTypeLiteralTransformation = ast => ast._tag === "TypeLiteralTransformation";
//# sourceMappingURL=AST.mjs.map