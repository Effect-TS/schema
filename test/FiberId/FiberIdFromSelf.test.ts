import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import { describe, it } from "vitest"

describe("FiberIdFromSelf", () => {
  it("property tests", () => {
    Util.roundtrip(S.FiberIdFromSelf)
  })
})
