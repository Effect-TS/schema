import { pipe } from "@effect/data/Function"
import type { ParseOptions } from "@effect/schema/AST"
// import * as D from "@effect/data/Debug"
import * as S from "@effect/schema/Schema"
import * as Benchmark from "benchmark"
import { z } from "zod"

/*
schema (good) x 2,013,098 ops/sec ±0.52% (88 runs sampled)
zod (good) x 1,338,523 ops/sec ±7.56% (79 runs sampled)
schema (bad) x 1,554,092 ops/sec ±3.37% (80 runs sampled)
zod (bad) x 138,241 ops/sec ±4.44% (85 runs sampled)
*/

const suite = new Benchmark.Suite()

const UserZod = z.object({
  name: z.string().min(3).max(20),
  age: z.number().min(0).max(120)
})

const schema = S.struct({
  name: pipe(S.string, S.minLength(3), S.maxLength(20)),
  age: pipe(S.number, S.greaterThanOrEqualTo(0), S.lessThanOrEqualTo(120))
})

const good = {
  name: "Joe",
  age: 13
}

const bad = {
  name: "Jo",
  age: 13
}

const parseEither = S.parseEither(schema)
const options: ParseOptions = { errors: "all" }

// parseEither(good, options)
// console.log(UserZod.safeParse(good))
// console.log(parseEither(good))
// console.log(JSON.stringify(UserZod.safeParse(bad), null, 2))
// console.log(JSON.stringify(parseEither(bad), null, 2))

suite
  .add("schema (good)", function() {
    parseEither(good, options)
  })
  .add("zod (good)", function() {
    UserZod.safeParse(good)
  })
  .add("schema (bad)", function() {
    parseEither(bad, options)
  })
  .add("zod (bad)", function() {
    UserZod.safeParse(bad)
  })
  .on("cycle", function(event: any) {
    console.log(String(event.target))
  })
  .on("complete", function(this: any) {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  .run({ async: true })
