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
  age: z.number().min(0).max(120),
  address: z.object({
    street: z.string().min(3).max(200),
    number: z.number().min(0).max(120),
    city: z.string().min(3).max(200),
    country: z.string().min(3).max(200),
    zip: z.string().min(3).max(200)
  })
})

const schema = S.struct({
  name: pipe(S.string, S.minLength(3), S.maxLength(20)),
  age: pipe(S.number, S.greaterThanOrEqualTo(0), S.lessThanOrEqualTo(120)),
  address: S.struct({
    street: pipe(S.string, S.minLength(3), S.maxLength(200)),
    number: pipe(S.number, S.greaterThanOrEqualTo(0), S.lessThanOrEqualTo(120)),
    city: pipe(S.string, S.minLength(3), S.maxLength(200)),
    country: pipe(S.string, S.minLength(3), S.maxLength(200)),
    zip: pipe(S.string, S.minLength(3), S.maxLength(200))
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

const parseEither = S.validateEither(schema)

// console.log(UserZod.safeParse(good))
// console.log(parseEither(good))
// console.log(JSON.stringify(UserZod.safeParse(bad), null, 2))
// console.log(JSON.stringify(parseEither(bad), null, 2))

suite
  .add("schema (good)", function() {
    parseEither(good)
  })
  .add("zod (good)", function() {
    UserZod.safeParse(good)
  })
  .add("schema (bad)", function() {
    parseEither(bad)
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
