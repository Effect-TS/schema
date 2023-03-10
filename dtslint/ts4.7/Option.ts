import * as S from "@effect/schema/Schema"
import { pipe } from "@effect/data/Function"

// $ExpectType Schema<{ readonly a: string; readonly b: Option<number>; }>
pipe(S.struct({ a: S.string }), S.optionsFromOptionals({ b: S.number }))
