import { pipe } from "@effect/data/Function"
// import * as D from "@effect/io/Debug"
import * as S from "@effect/schema/Schema"
import * as Benchmark from "benchmark"
import { z } from "zod"

/*
schema (good) x 401,457 ops/sec ±0.44% (89 runs sampled)
zod (good) x 400,149 ops/sec ±6.77% (81 runs sampled)
schema (bad) x 3,559,130 ops/sec ±2.83% (86 runs sampled)
zod (bad) x 45,989 ops/sec ±2.33% (88 runs sampled)
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

const parseEither = S.validateEither(schema)
const options = { allErrors: false }

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
