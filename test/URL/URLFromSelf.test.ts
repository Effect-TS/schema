import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import { describe, expect, it } from "vitest"

describe("URL/URLFromSelf", () => {
  it("keyof", () => {
    expect(S.keyof(S.URLFromSelf)).toEqual(S.never)
  })

  it("property tests", () => {
    Util.roundtrip(S.URLFromSelf)
  })

  it("decoding", async () => {
    await Util.expectParseSuccess(
      S.URLFromSelf,
      new URL("http://example.com/"),
      new URL("http://example.com/")
    )

    await Util.expectParseFailure(S.URLFromSelf, null, `Expected URL, actual null`)
  })

  it("encoding", async () => {
    const now = new URL("http://example.com/")
    await Util.expectEncodeSuccess(S.URLFromSelf, now, now)
  })

  it("pretty", () => {
    const pretty = Pretty.to(S.URLFromSelf)
    expect(pretty(new URL("http://example.com/"))).toEqual("new URL(\"http://example.com/\")")
  })
})
