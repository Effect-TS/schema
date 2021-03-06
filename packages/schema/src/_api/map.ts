// ets_tracing: off

// tracing: off

import { Map } from "@effect-ts/core/Collections/Immutable/Map"
import { pipe } from "@effect-ts/core/Function"

import * as S from "../_schema/index.js"
import * as Arbitrary from "../Arbitrary/index.js"
import * as Encoder from "../Encoder/index.js"
import * as Guard from "../Guard/index.js"
import * as Parser from "../Parser/index.js"
import * as Th from "../These/index.js"
import { array } from "./array.js"
import { tuple } from "./tuple.js"
import type { DefaultSchema } from "./withDefaults.js"
import { withDefaults } from "./withDefaults.js"

export const mapIdentifier = S.makeAnnotation<{}>()

export function map<
  KeyParserInput,
  KeyParserError extends S.AnyError,
  KeyParsedShape,
  KeyConstructorInput,
  KeyConstructorError extends S.AnyError,
  KeyEncoded,
  KeyApi,
  ParserInput,
  ParserError extends S.AnyError,
  ParsedShape,
  ConstructorInput,
  ConstructorError extends S.AnyError,
  Encoded,
  Api
>(
  key: S.Schema<
    unknown,
    KeyParserError,
    KeyParsedShape,
    KeyConstructorInput,
    KeyConstructorError,
    KeyEncoded,
    KeyApi
  >,
  self: S.Schema<
    unknown,
    ParserError,
    ParsedShape,
    ConstructorInput,
    ConstructorError,
    Encoded,
    Api
  >
): DefaultSchema<
  unknown,
  S.AnyError,
  Map<KeyParsedShape, ParsedShape>,
  Map<KeyParsedShape, ParsedShape>,
  never,
  readonly (readonly [KeyEncoded, Encoded])[],
  {}
> {
  const keyGuard = Guard.for(key)

  const guard = Guard.for(self)

  const maparr = array(tuple(key, self))
  const mapParse = Parser.for(maparr)
  const mapEncode = Encoder.for(maparr)
  const mapArb = Arbitrary.for(maparr)

  const refinement = (_: unknown): _ is Map<KeyParsedShape, ParsedShape> =>
    _ instanceof Map &&
    Array.from(_.entries()).every(([key, value]) => keyGuard(key) && guard(value))

  return pipe(
    S.identity(refinement),
    S.constructor((s: Map<KeyParsedShape, ParsedShape>) => Th.succeed(s)),
    S.arbitrary((_) => mapArb(_).map((x) => new Map(x))),
    S.parser((i: unknown) =>
      mapParse(i)["|>"](Th.map((x) => new Map(x) as Map<KeyParsedShape, ParsedShape>))
    ),
    S.encoder((_) => Array.from(_.entries())["|>"](mapEncode)),
    S.mapApi(() => ({})),
    withDefaults,
    S.annotate(mapIdentifier, {})
  )
}
