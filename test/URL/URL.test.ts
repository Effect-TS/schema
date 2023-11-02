import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import { describe, it } from "vitest"

describe("URL/URL", () => {
  const schema = S.URL

  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("decoding", async () => {
    await Util.expectParseSuccess(
      schema,
      "http://example.com/",
      new URL("http://example.com/")
    )
    await Util.expectParseFailure(
      schema,
      "a",
      `Expected URL, actual "a"`
    )
  })

  it("encoding", async () => {
    await Util.expectEncodeSuccess(schema, new URL("http://example.com/"), "http://example.com/")
  })
})
