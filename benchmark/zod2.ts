import { pipe } from "@effect/data/Function"
import type { ParseOptions } from "@effect/schema/AST"
// import * as D from "@effect/data/Debug"
import * as S from "@effect/schema/Schema"
import * as Benchmark from "benchmark"
import { z } from "zod"

/*
schema (good) x 2,216,849 ops/sec ±2.38% (94 runs sampled)
zod (good) x 1,903,219 ops/sec ±0.29% (98 runs sampled)
schema (bad) x 2,024,713 ops/sec ±2.67% (96 runs sampled)
zod (bad) x 185,096 ops/sec ±3.20% (91 runs sampled)
Fastest is schema (good)
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
