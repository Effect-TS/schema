import * as D from "@effect/data/Debug"
import type { ParseOptions } from "@effect/schema/AST"
import * as P from "@effect/schema/Parser"
import * as t from "@effect/schema/Schema"
import * as Benchmark from "benchmark"
import { z } from "zod"

D.runtimeDebug.tracingEnabled = true

/*
parseEither (good) x 258,771 ops/sec ±0.47% (86 runs sampled)
zod (good) x 171,941 ops/sec ±8.44% (77 runs sampled)
parseEither (bad) x 218,765 ops/sec ±2.90% (86 runs sampled)
zod (bad) x 54,979 ops/sec ±4.90% (83 runs sampled)
parseEither (bad2) x 198,661 ops/sec ±9.61% (78 runs sampled)
zod (bad2) x 182,703 ops/sec ±0.94% (86 runs sampled)
*/

const suite = new Benchmark.Suite()

const Vector = t.tuple(t.number, t.number, t.number)
const VectorZod = z.tuple([z.number(), z.number(), z.number()])

const Asteroid = t.struct({
  type: t.literal("asteroid"),
  location: Vector,
  mass: t.number
})
const AsteroidZod = z.object({
  type: z.literal("asteroid"),
  location: VectorZod,
  mass: z.number()
})

const Planet = t.struct({
  type: t.literal("planet"),
  location: Vector,
  mass: t.number,
  population: t.number,
  habitable: t.boolean
})
const PlanetZod = z.object({
  type: z.literal("planet"),
  location: VectorZod,
  mass: z.number(),
  population: z.number(),
  habitable: z.boolean()
})

const Rank = t.union(
  t.literal("captain"),
  t.literal("first mate"),
  t.literal("officer"),
  t.literal("ensign")
)
const RankZod = z.union([
  z.literal("captain"),
  z.literal("first mate"),
  z.literal("officer"),
  z.literal("ensign")
])

const CrewMember = t.struct({
  name: t.string,
  age: t.number,
  rank: Rank,
  home: Planet
})
const CrewMemberZod = z.object({
  name: z.string(),
  age: z.number(),
  rank: RankZod,
  home: PlanetZod
})

const Ship = t.struct({
  type: t.literal("ship"),
  location: Vector,
  mass: t.number,
  name: t.string,
  crew: t.array(CrewMember)
})
const ShipZod = z.object({
  type: z.literal("ship"),
  location: VectorZod,
  mass: z.number(),
  name: z.string(),
  crew: z.array(CrewMemberZod)
})

export const schema = t.union(Asteroid, Planet, Ship)
export const schemaZod = z.discriminatedUnion("type", [AsteroidZod, PlanetZod, ShipZod])

export const parseEither = P.parseEither(schema)
const options: ParseOptions = { errors: "all" }

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

const bad2 = {
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
  ],
  excess: 1
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
    schemaZod.safeParse(bad)
  })
  .add("parseEither (bad2)", function() {
    parseEither(bad2, options)
  })
  .add("zod (bad2)", function() {
    schemaZod.safeParse(bad2)
  })
  .on("cycle", function(event: any) {
    console.log(String(event.target))
  })
  .on("complete", function(this: any) {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  .run({ async: true })
