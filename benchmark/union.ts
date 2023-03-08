import * as RA from "@effect/data/ReadonlyArray"
import * as S from "@effect/schema"
import * as Benchmark from "benchmark"

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

const decode = S.decodeEither(schema)

const decodeManual = (input: unknown) => {
  if (
    typeof input === "object" && input !== null && "kind" in input && typeof input.kind === "number"
  ) {
    const kind = input.kind
    return S.decodeEither(members[kind])(input)
  }
  return decode(input)
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
  .add("decode (good)", function() {
    decode(good)
  })
  .add("decodeManual (good)", function() {
    decodeManual(good)
  })
  .add("decode (bad)", function() {
    decode(bad)
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
