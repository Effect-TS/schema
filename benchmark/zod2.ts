import type { ParseOptions } from "@effect/schema/AST"
import * as Schema from "@effect/schema/Schema"
import * as Benchmark from "benchmark"
import { z } from "zod"

/*
schema (good) x 2,055,273 ops/sec ±4.37% (84 runs sampled)
zod (good) x 1,339,354 ops/sec ±6.95% (77 runs sampled)
schema (bad) x 1,593,588 ops/sec ±3.22% (82 runs sampled)
zod (bad) x 132,012 ops/sec ±4.79% (83 runs sampled)
*/

const suite = new Benchmark.Suite()

const UserZod = z.object({
  name: z.string().min(3).max(20),
  age: z.number().min(0).max(120)
})

const schema = Schema.struct({
  name: Schema.string.pipe(Schema.minLength(3), Schema.maxLength(20)),
  age: Schema.number.pipe(Schema.greaterThanOrEqualTo(0), Schema.lessThanOrEqualTo(120))
})

const good = {
  name: "Joe",
  age: 13
}

const bad = {
  name: "Jo",
  age: 13
}

const parseEither = Schema.parseEither(schema)
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
