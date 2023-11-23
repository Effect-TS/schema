import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import { BigDecimal } from "effect"
import { describe, it } from "vitest"

describe("Schema/DurationFromSelf", () => {
  const schema = S.BigDecimalFromSelf

  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("decoding", async () => {
    await Util.expectParseSuccess(schema, BigDecimal.make(0n, 0), BigDecimal.make(0n, 0))
    await Util.expectParseSuccess(schema, BigDecimal.make(123n, 5), BigDecimal.make(123n, 5))
    await Util.expectParseSuccess(
      schema,
      BigDecimal.make(-20000000n, 0),
      BigDecimal.make(-20000000n, 0)
    )
  })

  it("encoding", async () => {
    await Util.expectEncodeSuccess(schema, BigDecimal.make(0n, 0), BigDecimal.make(0n, 0))
    await Util.expectEncodeSuccess(schema, BigDecimal.make(123n, 5), BigDecimal.make(123n, 5))
    await Util.expectEncodeSuccess(
      schema,
      BigDecimal.make(-20000000n, 0),
      BigDecimal.make(-20000000n, 0)
    )
  })
})
