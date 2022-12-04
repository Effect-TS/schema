import * as JD from "@fp-ts/schema/JsonDecoder"
import * as t from "@fp-ts/schema/Schema"
import * as Benchmark from "benchmark"

/*
io-ts
space-object (good) x 476,424 ops/sec ±0.45% (92 runs sampled)
space-object (bad) x 434,563 ops/sec ±0.58% (87 runs sampled)
schema (NonEmptyChunk)
space-object (good) x 148,078 ops/sec ±4.17% (86 runs sampled)
space-object (bad) x 238,464 ops/sec ±5.36% (80 runs sampled)
schema (NonEmptyReadonlyArray)
space-object (good) x 163,626 ops/sec ±0.20% (90 runs sampled)
space-object (bad) x 276,694 ops/sec ±4.55% (82 runs sampled)
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

const decoder = JD.jsonDecoderFor(Ship)

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

// console.log(decoder.decode(good))
// console.log(decoder.decode(bad))

suite
  .add("space-object (good)", function() {
    decoder.decode(good)
  })
  .add("space-object (bad)", function() {
    decoder.decode(bad)
  })
  .on("cycle", function(event: any) {
    console.log(String(event.target))
  })
  .on("complete", function(this: any) {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  .run({ async: true })
