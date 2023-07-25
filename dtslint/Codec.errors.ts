import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"

// @ts-expect-error
pipe(S.boolean, S.optional, S.nullable)

// @ts-expect-error
pipe(S.boolean, C.optional, C.nullable)

// @ts-expect-error
S.struct({ a: S.string, b: S.number, c: C.optional(S.boolean).withDefault(() => true) })
