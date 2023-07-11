import type { ParseOptions } from "@effect/schema/AST"
import * as Schema from "@effect/schema/Schema"
import * as Benchmark from "benchmark"
import { z } from "zod"

/*
schema (good) x 580,995 ops/sec ±1.10% (89 runs sampled)
zod (good) x 423,724 ops/sec ±6.53% (78 runs sampled)
schema (bad) x 493,920 ops/sec ±2.51% (81 runs sampled)
zod (bad) x 98,215 ops/sec ±4.96% (82 runs sampled)
*/

const suite = new Benchmark.Suite()

const UserZod = z.object({
  name: z.string().min(3).max(20),
  age: z.number().min(0).max(120),
  address: z.object({
    street: z.string().min(3).max(200),
    number: z.number().min(0).max(120),
    city: z.string().min(3).max(200),
    country: z.string().min(3).max(200),
    zip: z.string().min(3).max(200)
  })
})

const schema = Schema.struct({
  name: Schema.string.pipe(Schema.minLength(3), Schema.maxLength(20)),
  age: Schema.number.pipe(Schema.greaterThanOrEqualTo(0), Schema.lessThanOrEqualTo(120)),
  address: Schema.struct({
    street: Schema.string.pipe(Schema.minLength(3), Schema.maxLength(200)),
    number: Schema.number.pipe(Schema.greaterThanOrEqualTo(0), Schema.lessThanOrEqualTo(120)),
    city: Schema.string.pipe(Schema.minLength(3), Schema.maxLength(200)),
    country: Schema.string.pipe(Schema.minLength(3), Schema.maxLength(200)),
    zip: Schema.string.pipe(Schema.minLength(3), Schema.maxLength(200))
  })
})

const good = {
  name: "Joe",
  age: 13,
  address: {
    street: "Main Street",
    number: 12,
    city: "New York",
    country: "USA",
    zip: "12345"
  }
}

const bad = {
  name: "Jo",
  age: 13,
  address: {
    street: "Main Street",
    number: 12,
    city: "New York",
    country: "USA",
    zip: "12345"
  }
}

const parseEither = Schema.parseEither(schema)
const options: ParseOptions = { errors: "all" }

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
