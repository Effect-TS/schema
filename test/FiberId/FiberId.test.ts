import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import { describe, it } from "vitest"

describe("FiberId", () => {
  it("property tests", () => {
    Util.roundtrip(S.FiberId)
  })

  it("tmp", () => {
    Util.sample(S.FiberId, 10)
  })
})
