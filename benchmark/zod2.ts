import { pipe } from "@effect/data/Function"
// import * as D from "@effect/io/Debug"
import * as S from "@effect/schema/Schema"
import * as Benchmark from "benchmark"
import { z } from "zod"

/*
1)
schema (good) x 24,401 ops/sec ±0.53% (75 runs sampled)
zod (good) x 1,357,847 ops/sec ±7.08% (81 runs sampled)
schema (bad) x 27,871 ops/sec ±0.60% (80 runs sampled)
zod (bad) x 130,448 ops/sec ±5.99% (83 runs sampled)
2)
schema (good) x 155,060 ops/sec ±0.53% (89 runs sampled)
zod (good) x 1,327,839 ops/sec ±7.00% (79 runs sampled)
schema (bad) x 120,482 ops/sec ±0.51% (90 runs sampled)
zod (bad) x 126,954 ops/sec ±6.93% (82 runs sampled)
*/

const suite = new Benchmark.Suite()

// const UserZod = z.object({
//   name: z.string().min(3).max(20),
//   age: z.number().min(0).max(120)
// })

// const schema = S.struct({
//   name: pipe(S.string, S.minLength(3), S.maxLength(20)),
//   age: pipe(S.number, S.greaterThanOrEqualTo(0), S.lessThanOrEqualTo(120))
// })

const UserZod = z.object({
  name: z.string().min(3),
  age: z.number()
}).strict()

const schema = S.struct({
  name: pipe(S.string, S.minLength(3)),
  age: pipe(S.number)
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
const options = { allErrors: true }

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
