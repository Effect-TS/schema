import * as RA from "@effect/data/ReadonlyArray"
import type { ParseResult } from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import * as Benchmark from "benchmark"

/*
n = 3
-- before --
decode (good) x 297,211 ops/sec ±0.60% (87 runs sampled)
decodeManual (good) x 375,596 ops/sec ±4.45% (84 runs sampled)
decode (bad) x 395,804 ops/sec ±2.11% (87 runs sampled)
decodeManual (bad) x 675,493 ops/sec ±6.66% (80 runs sampled)
-- after --
decode (good) x 435,662 ops/sec ±0.27% (91 runs sampled)
decodeManual (good) x 404,485 ops/sec ±3.27% (88 runs sampled)
decode (bad) x 639,574 ops/sec ±1.53% (89 runs sampled)
decodeManual (bad) x 773,970 ops/sec ±1.93% (89 runs sampled)
n = 10
-- before --
decode (good) x 134,903 ops/sec ±0.67% (87 runs sampled)
decodeManual (good) x 404,799 ops/sec ±4.16% (84 runs sampled)
decode (bad) x 154,121 ops/sec ±2.94% (87 runs sampled)
decodeManual (bad) x 780,253 ops/sec ±1.57% (90 runs sampled)
-- after --
decode (good) x 425,938 ops/sec ±0.27% (89 runs sampled)
decodeManual (good) x 410,831 ops/sec ±3.15% (87 runs sampled)
decode (bad) x 644,174 ops/sec ±2.84% (88 runs sampled)
decodeManual (bad) x 780,113 ops/sec ±3.55% (88 runs sampled)
n = 100
-- before --
decode (good) x 14,793 ops/sec ±0.39% (88 runs sampled)
decodeManual (good) x 250,389 ops/sec ±4.54% (73 runs sampled)
decode (bad) x 15,118 ops/sec ±0.48% (83 runs sampled)
decodeManual (bad) x 381,230 ops/sec ±6.87% (63 runs sampled)
-- after --
decode (good) x 469,868 ops/sec ±0.46% (90 runs sampled)
decodeManual (good) x 262,868 ops/sec ±3.99% (73 runs sampled)
decode (bad) x 805,680 ops/sec ±0.50% (90 runs sampled)
decodeManual (bad) x 404,029 ops/sec ±5.83% (75 runs sampled)
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

const decodeEither = S.decodeEither(schema)

const decodeManual = (input: unknown): ParseResult<{
  readonly kind: number
  readonly a: string
  readonly b: number
  readonly c: boolean
}> => {
  if (
    typeof input === "object" && input !== null && "kind" in input && typeof input.kind === "number"
  ) {
    const kind = input.kind
    return S.decodeEither(members[kind])(input)
  }
  return decodeEither(input)
}

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

// console.log(decode(good))
// console.log(decode(bad))

suite
  .add("decodeEither (good)", function() {
    decodeEither(good)
  })
  .add("decodeManual (good)", function() {
    decodeManual(good)
  })
  .add("decodeEither (bad)", function() {
    decodeEither(bad)
  })
  .add("decodeManual (bad)", function() {
    decodeManual(bad)
  })
  .on("cycle", function(event: any) {
    console.log(String(event.target))
  })
  .on("complete", function(this: any) {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  .run({ async: true })
