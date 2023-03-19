import type * as E from "@effect/data/Either"
import * as RA from "@effect/data/ReadonlyArray"
import type { ParseError } from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import * as Benchmark from "benchmark"

/*
n = 3
parseEither (good) x 471,313 ops/sec ±0.27% (89 runs sampled)
parseManual (good) x 450,417 ops/sec ±3.11% (87 runs sampled)
parseEither (bad) x 774,310 ops/sec ±1.81% (86 runs sampled)
parseManual (bad) x 1,015,965 ops/sec ±2.04% (87 runs sampled)
n = 10
parseEither (good) x 464,366 ops/sec ±0.25% (90 runs sampled)
parseManual (good) x 437,616 ops/sec ±3.07% (83 runs sampled)
parseEither (bad) x 785,114 ops/sec ±1.73% (84 runs sampled)
parseManual (bad) x 1,033,561 ops/sec ±1.62% (84 runs sampled)
n = 100
parseEither (good) x 477,261 ops/sec ±0.42% (91 runs sampled)
parseManual (good) x 447,762 ops/sec ±3.22% (87 runs sampled)
parseEither (bad) x 771,355 ops/sec ±1.84% (84 runs sampled)
parseManual (bad) x 1,042,424 ops/sec ±0.30% (91 runs sampled)
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

const parseManual = (input: unknown): E.Either<RA.NonEmptyReadonlyArray<ParseError>, {
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
