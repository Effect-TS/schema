import * as D from "@effect/io/Debug"
import * as P from "@effect/schema/Parser"
import * as t from "@effect/schema/Schema"
import * as Benchmark from "benchmark"

D.runtimeDebug.tracingEnabled = true

/*
io-ts
space-object (good) x 476,424 ops/sec ±0.45% (92 runs sampled)
space-object (bad) x 434,563 ops/sec ±0.58% (87 runs sampled)
0.3.0
parseEither (good) x 96,815 ops/sec ±0.46% (88 runs sampled)
parseEither (bad) x 261,251 ops/sec ±4.72% (85 runs sampled)
*/

const suite = new Benchmark.Suite()

const Vector = t.tuple(t.number, t.number, t.number)

const Asteroid = t.struct({
  type: t.literal("asteroid"),
  location: Vector,
  mass: t.number
})

const Planet = t.struct({
  type: t.literal("planet"),
  location: Vector,
  mass: t.number,
  population: t.number,
  habitable: t.boolean
})

const Rank = t.union(
  t.literal("captain"),
  t.literal("first mate"),
  t.literal("officer"),
  t.literal("ensign")
)

const CrewMember = t.struct({
  name: t.string,
  age: t.number,
  rank: Rank,
  home: Planet
})

const Ship = t.struct({
  type: t.literal("ship"),
  location: Vector,
  mass: t.number,
  name: t.string,
  crew: t.array(CrewMember)
})

export const T = t.union(Asteroid, Planet, Ship)

export const parseEither = P.parseEither(T)

const good = {
  type: "ship",
  location: [1, 2, 3],
  mass: 4,
  name: "foo",
  crew: [
    {
      name: "bar",
      age: 44,
      rank: "captain",
      home: {
        type: "planet",
        location: [5, 6, 7],
        mass: 8,
        population: 1000,
        habitable: true
      }
    }
  ]
}

const bad = {
  type: "ship",
  location: [1, 2, "a"],
  mass: 4,
  name: "foo",
  crew: [
    {
      name: "bar",
      age: 44,
      rank: "captain",
      home: {
        type: "planet",
        location: [5, 6, 7],
        mass: 8,
        population: "a",
        habitable: true
      }
    }
  ]
}

// console.log(parseEither(good))
// console.log(parseEither(bad))

suite
  .add("parseEither (good)", function() {
    parseEither(good)
  })
  .add("parseEither (bad)", function() {
    parseEither(bad)
  })
  .on("cycle", function(event: any) {
    console.log(String(event.target))
  })
  .on("complete", function(this: any) {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  .run({ async: true })
