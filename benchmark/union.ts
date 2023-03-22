import type * as E from "@effect/data/Either"
import * as RA from "@effect/data/ReadonlyArray"
import * as D from "@effect/io/Debug"
import type { ParseError } from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import * as Benchmark from "benchmark"

D.runtimeDebug.tracingEnabled = true

/*
n = 100
parseEither (good) x 425,815 ops/sec ±0.59% (86 runs sampled)
parseManual (good) x 333,999 ops/sec ±5.18% (81 runs sampled)
parseEither (bad) x 483,767 ops/sec ±0.43% (90 runs sampled)
parseManual (bad) x 416,222 ops/sec ±2.79% (87 runs sampled)
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
