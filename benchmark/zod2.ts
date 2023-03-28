import { pipe } from "@effect/data/Function"
import type { ParseOptions } from "@effect/schema/AST"
// import * as D from "@effect/data/Debug"
import * as S from "@effect/schema/Schema"
import * as Benchmark from "benchmark"
import { z } from "zod"

/*
1)
schema (good) x 338,786 ops/sec ±0.55% (88 runs sampled)
zod (good) x 1,312,221 ops/sec ±6.42% (79 runs sampled)
schema (bad) x 373,497 ops/sec ±1.22% (89 runs sampled)
zod (bad) x 126,029 ops/sec ±3.76% (85 runs sampled)
2)
schema (good) x 616,053 ops/sec ±0.55% (89 runs sampled)
zod (good) x 1,237,098 ops/sec ±7.91% (76 runs sampled)
schema (bad) x 546,779 ops/sec ±0.63% (86 runs sampled)
zod (bad) x 127,494 ops/sec ±5.93% (83 runs sampled)
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

// const UserZod = z.object({
//   name: z.string().min(3),
//   age: z.number()
// }).strict()

// const schema = S.struct({
//   name: pipe(S.string, S.minLength(3)),
//   age: pipe(S.number)
// })

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
