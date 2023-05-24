import { pipe } from "@effect/data/Function";
import * as T from "@effect/schema/Transform";

// optional/ should not allow combinators afterwards
// $ExpectError
pipe(T.boolean, T.optional, T.description('...'))
// $ExpectError
pipe(T.boolean, T.optional, T.nullable)
