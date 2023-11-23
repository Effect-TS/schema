import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import { BigDecimal } from "effect"
import { describe, it } from "vitest"

describe("Schema/BigDecimal", () => {
  const schema = S.BigDecimal

  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("decoding", async () => {
    await Util.expectParseSuccess(schema, [0n, 5000], BigDecimal.make(0n, 5000))
    await Util.expectParseSuccess(schema, [2n, 0], BigDecimal.make(2n, 0))
    await Util.expectParseSuccess(schema, [123n, -5], BigDecimal.make(123n, -5))
  })

  it("decoding", async () => {
    await Util.expectEncodeSuccess(schema, BigDecimal.make(0n, 5000), [0n, 5000])
    await Util.expectEncodeSuccess(schema, BigDecimal.make(2n, 0), [2n, 0])
    await Util.expectEncodeSuccess(schema, BigDecimal.make(123n, -5), [123n, -5])
  })
})
