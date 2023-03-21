import type * as E from "@effect/data/Either"
import * as RA from "@effect/data/ReadonlyArray"
import * as D from "@effect/io/Debug"
import type { ParseError } from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import * as Benchmark from "benchmark"

D.runtimeDebug.tracingEnabled = true

/*
n = 3
parseEither (good) x 406,821 ops/sec ±0.48% (88 runs sampled)
parseManual (good) x 376,234 ops/sec ±4.45% (81 runs sampled)
parseEither (bad) x 407,671 ops/sec ±2.12% (87 runs sampled)
parseManual (bad) x 514,905 ops/sec ±0.51% (88 runs sampled)
n = 10
parseEither (good) x 403,275 ops/sec ±0.46% (88 runs sampled)
parseManual (good) x 369,469 ops/sec ±4.57% (79 runs sampled)
parseEither (bad) x 383,222 ops/sec ±0.57% (84 runs sampled)
parseManual (bad) x 473,157 ops/sec ±3.27% (85 runs sampled)
n = 100
parseEither (good) x 366,276 ops/sec ±1.94% (85 runs sampled)
parseManual (good) x 373,495 ops/sec ±4.38% (80 runs sampled)
parseEither (bad) x 322,847 ops/sec ±0.64% (86 runs sampled)
parseManual (bad) x 408,789 ops/sec ±2.73% (85 runs sampled)
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

const parseEither = S.parseEither(schema)

const parseManual = (input: unknown): E.Either<ParseError, {
  readonly kind: number
  readonly a: string
  readonly b: number
  readonly c: boolean
}> => {
  if (
    typeof input === "object" && input !== null && "kind" in input && typeof input.kind === "number"
  ) {
    const kind = input.kind
    return S.parseEither(members[kind])(input)
  }
  return parseEither(input)
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

// console.log(parseEither(good))
// console.log(parseEither(bad))

suite
  .add("parseEither (good)", function() {
    parseEither(good)
  })
  .add("parseManual (good)", function() {
    parseManual(good)
  })
  .add("parseEither (bad)", function() {
    parseEither(bad)
  })
  .add("parseManual (bad)", function() {
    parseManual(bad)
  })
  .on("cycle", function(event: any) {
    console.log(String(event.target))
  })
  .on("complete", function(this: any) {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  .run({ async: true })
