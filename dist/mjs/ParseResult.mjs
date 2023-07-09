/**
 * @since 1.0.0
 */
import * as E from "@effect/data/Either";
import * as O from "@effect/data/Option";
import * as Effect from "@effect/io/Effect";
/**
 * @since 1.0.0
 */
export const parseError = errors => ({
  _tag: "ParseError",
  errors
});
/**
 * @category constructors
 * @since 1.0.0
 */
export const type = (expected, actual, message) => ({
  _tag: "Type",
  expected,
  actual,
  message: O.fromNullable(message)
});
/**
 * @category constructors
 * @since 1.0.0
 */
export const forbidden = {
  _tag: "Forbidden"
};
/**
 * @category constructors
 * @since 1.0.0
 */
export const index = (index, errors) => ({
  _tag: "Index",
  index,
  errors
});
/**
 * @category constructors
 * @since 1.0.0
 */
export const key = (key, errors) => ({
  _tag: "Key",
  key,
  errors
});
/**
 * @category constructors
 * @since 1.0.0
 */
export const missing = {
  _tag: "Missing"
};
/**
 * @category constructors
 * @since 1.0.0
 */
export const unexpected = actual => ({
  _tag: "Unexpected",
  actual
});
/**
 * @category constructors
 * @since 1.0.0
 */
export const unionMember = errors => ({
  _tag: "UnionMember",
  errors
});
/**
 * @category constructors
 * @since 1.0.0
 */
export const success = E.right;
/**
 * @category constructors
 * @since 1.0.0
 */
export const fail = E.left;
/**
 * @category constructors
 * @since 1.0.0
 */
export const failure = e => fail(parseError([e]));
/**
 * @category constructors
 * @since 1.0.0
 */
export const failures = es => E.left(parseError(es));
/**
 * @category optimisation
 * @since 1.0.0
 */
export const eitherOrUndefined = self => {
  const s = self;
  if (s["_tag"] === "Left" || s["_tag"] === "Right") {
    return s;
  }
};
/**
 * @category optimisation
 * @since 1.0.0
 */
export const flatMap = (self, f) => {
  const s = self;
  if (s["_tag"] === "Left") {
    return s;
  }
  if (s["_tag"] === "Right") {
    return f(s.right);
  }
  return Effect.flatMap(self, f);
};
/**
 * @category optimisation
 * @since 1.0.0
 */
export const map = (self, f) => {
  const s = self;
  if (s["_tag"] === "Left") {
    return s;
  }
  if (s["_tag"] === "Right") {
    return E.right(f(s.right));
  }
  return Effect.map(self, f);
};
/**
 * @category optimisation
 * @since 1.0.0
 */
export const mapLeft = (self, f) => {
  const s = self;
  if (s["_tag"] === "Left") {
    return E.left(f(s.left));
  }
  if (s["_tag"] === "Right") {
    s;
  }
  return Effect.mapError(self, f);
};
/**
 * @category optimisation
 * @since 1.0.0
 */
export const bimap = (self, f, g) => {
  const s = self;
  if (s["_tag"] === "Left") {
    return E.left(f(s.left));
  }
  if (s["_tag"] === "Right") {
    return E.right(g(s.right));
  }
  return Effect.mapBoth(self, {
    onFailure: f,
    onSuccess: g
  });
};
//# sourceMappingURL=ParseResult.mjs.map