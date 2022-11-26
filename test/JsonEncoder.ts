import * as set from "@fp-ts/schema/data/Set"
import * as JE from "@fp-ts/schema/JsonEncoder"
import * as S from "@fp-ts/schema/Schema"

const unsafeEncoderFor = JE.provideUnsafeJsonEncoderFor(set.Provider)

describe("JsonEncoder", () => {
  describe("provideUnsafeJsonEncoderFor", () => {
    it("string", () => {
      const schema = S.string
      const encoder = unsafeEncoderFor(schema)
      expect(encoder.encode("a")).toEqual("a")
    })

    it("number", () => {
      const schema = S.number
      const encoder = unsafeEncoderFor(schema)
      expect(encoder.encode(1)).toEqual(1)
    })

    it("date", () => {
      const schema = S.date
      const encoder = unsafeEncoderFor(schema)
      expect(encoder.encode(new Date(Date.UTC(2022, 0, 1, 0, 0, 0, 0)))).toEqual(
        "2022-01-01T00:00:00.000Z"
      )
    })

    it("tuple", () => {
      const schema = S.tuple(S.string, S.number)
      const encoder = unsafeEncoderFor(schema)
      expect(encoder.encode(["a", 1])).toEqual(["a", 1])
    })
  })
})
