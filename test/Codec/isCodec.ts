import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"

describe.concurrent("isCodec", () => {
  it("Schema", () => {
    expect(C.isCodec(S.string)).toBe(true)
    expect(C.isCodec(S.propertySignature(S.string, {}))).toBe(false)
    expect(C.isCodec(S.optional(S.string))).toBe(false)
  })

  it("BrandSchema", () => {
    expect(C.isCodec(S.string.pipe(S.brand("my-brand")))).toBe(true)
  })

  it("Codec", () => {
    expect(C.isCodec(C.NumberFromString)).toBe(true)
    expect(C.isCodec(C.propertySignature(C.NumberFromString, {}))).toBe(false)
    expect(C.isCodec(C.optional(C.NumberFromString))).toBe(false)
  })
})
