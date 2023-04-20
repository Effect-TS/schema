import * as Option from "@effect/data/Option"
import { DescriptionAnnotationId } from "@effect/schema/AST"
import * as S from "@effect/schema/Schema"

describe.concurrent("propertySignature", () => {
  it("should throw on duplicate optional() calls", () => {
    expect(() => S.propertySignature(S.string).optional().optional()).toThrowError(
      new Error("duplicate optional configuration")
    )
  })

  it("should throw on duplicate withDefault() calls", () => {
    expect(() => S.propertySignature(S.string).withDefault(() => "").withDefault(() => "-"))
      .toThrowError(
        new Error("duplicate optional configuration")
      )
  })

  it("should throw on duplicate toOption() calls", () => {
    expect(() => S.propertySignature(S.string).toOption().toOption()).toThrowError(
      new Error("duplicate optional configuration")
    )
  })

  it("should throw on duplicate withDefault() / toOption() calls", () => {
    expect(() => S.propertySignature(S.string).withDefault(() => "").toOption()).toThrowError(
      new Error("duplicate optional configuration")
    )
    expect(() => S.propertySignature(S.string).toOption().withDefault(() => Option.none()))
      .toThrowError(
        new Error("duplicate optional configuration")
      )
  })

  it("should add annotations", () => {
    const ps = S.propertySignature(S.string, { [DescriptionAnnotationId]: "my description" })
    expect((ps as any)._annotations).toEqual({ [DescriptionAnnotationId]: "my description" })
  })
})
