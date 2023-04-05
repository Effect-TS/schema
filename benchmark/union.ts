import * as D from "@effect/data/Debug"
import * as RA from "@effect/data/ReadonlyArray"
import type { ParseOptions } from "@effect/schema/AST"
import * as S from "@effect/schema/Schema"
import * as Benchmark from "benchmark"
import { z } from "zod"

D.runtimeDebug.tracingEnabled = true

/*
n = 100
parseEither (good) x 1,588,627 ops/sec ±0.48% (89 runs sampled)
zod (good) x 795,941 ops/sec ±10.56% (73 runs sampled)
parseEither (bad) x 1,072,065 ops/sec ±3.08% (82 runs sampled)
zod (bad) x 971,883 ops/sec ±0.55% (90 runs sampled)
*/

const suite = new Benchmark.Suite()

const n = 100
const members = RA.makeBy(n, (i) =>
  S.struct({
    kind: S.literal(i),
    a: S.string,
    b: S.number,
    c: S.boolean
  }))
const schema = S.union(...members)

const x = RA.makeBy(n, (i) =>
  z.object({
    kind: z.literal(i),
    a: z.string(),
    b: z.number(),
    c: z.boolean()
  }))

const schemaZod = z.discriminatedUnion("kind", x)

const parseEither = S.parseEither(schema)
const options: ParseOptions = { errors: "all" }

const good = {
  kind: n - 1,
  a: "a",
  b: 1,
  c: true
}

const bad = {
  kind: n - 1,
  a: "a",
  b: 1,
  c: "c"
}

// console.log(parseEither(good))
// console.log(parseEither(bad))

suite
  .add("parseEither (good)", function() {
    parseEither(good, options)
  })
  .add("zod (good)", function() {
    schemaZod.safeParse(good)
  })
  .add("parseEither (bad)", function() {
    parseEither(bad, options)
  })
  .add("zod (bad)", function() {
    schemaZod.safeParse(good)
  })
  .on("cycle", function(event: any) {
    console.log(String(event.target))
  })
  .on("complete", function(this: any) {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  .run({ async: true })
