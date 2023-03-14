import * as RA from "@effect/data/ReadonlyArray"
import * as S from "@effect/schema"

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

const good = {
  kind: n - 1,
  a: "a",
  b: 1,
  c: true
}

// const bad = {
//   kind: n - 1,
//   a: "a",
//   b: 1,
//   c: "c"
// }

describe("Optimizer", () => {
  it("skips fiber", () => {
    decode(good)
  })
})
