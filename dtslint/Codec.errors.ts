import { pipe } from "@effect/data/Function";
import * as S from "@effect/schema/Schema";
import * as T from "@effect/schema/Codec";

// @ts-expect-error
pipe(S.boolean, S.optional, S.nullable)

// @ts-expect-error
pipe(S.boolean, T.optional, T.nullable)

// @ts-expect-error
S.struct({ a: S.string, b: S.number, c: T.optional(S.boolean).withDefault(() => true) });
