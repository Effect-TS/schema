import * as P from "@fp-ts/schema/Parser"
import * as t from "@fp-ts/schema/Schema"
import * as Benchmark from "benchmark"

/*
io-ts
space-object (good) x 476,424 ops/sec ±0.45% (92 runs sampled)
space-object (bad) x 434,563 ops/sec ±0.58% (87 runs sampled)
0.0.6
space-object (good) x 289,187 ops/sec ±0.25% (87 runs sampled)
space-object (bad) x 885,639 ops/sec ±5.38% (76 runs sampled)
0.0.8
decode (good) x 244,100 ops/sec ±4.51% (82 runs sampled)
decode (bad) x 698,427 ops/sec ±4.93% (81 runs sampled)
is (good) x 133,939 ops/sec ±0.56% (86 runs sampled)
is (bad) x 204,531 ops/sec ±7.83% (81 runs sampled)
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

export const decode = P.decode(T)
export const is = P.is(T)

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

// console.log(decode(good))
// console.log(decode(bad))

suite
  .add("decode (good)", function() {
    decode(good)
  })
  .add("decode (bad)", function() {
    decode(bad)
  })
  // .add("is (good)", function() {
  //   is(good)
  // })
  // .add("is (bad)", function() {
  //   is(bad)
  // })
  .on("cycle", function(event: any) {
    console.log(String(event.target))
  })
  .on("complete", function(this: any) {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  .run({ async: true })
