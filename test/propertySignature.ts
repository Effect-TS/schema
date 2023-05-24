import * as Option from "@effect/data/Option"
import * as T from "@effect/schema/Transform"

describe.concurrent("propertySignature", () => {
  it("should throw on duplicate optional() calls", () => {
    expect(() => T.propertySignature(T.string).optional().optional()).toThrowError(
      new Error("duplicate optional configuration")
    )
  })

  it("should throw on duplicate withDefault() calls", () => {
    expect(() => T.propertySignature(T.string).withDefault(() => "").withDefault(() => "-"))
      .toThrowError(
        new Error("duplicate optional configuration")
      )
  })

  it("should throw on duplicate toOption() calls", () => {
    expect(() => T.propertySignature(T.string).toOption().toOption()).toThrowError(
      new Error("duplicate optional configuration")
    )
  })

  it("should throw on duplicate withDefault() / toOption() calls", () => {
    expect(() => T.propertySignature(T.string).withDefault(() => "").toOption()).toThrowError(
      new Error("duplicate optional configuration")
    )
    expect(() => T.propertySignature(T.string).toOption().withDefault(() => Option.none()))
      .toThrowError(
        new Error("duplicate optional configuration")
      )
  })

  it("should add annotations to propertySignature", () => {
    const schema = T.struct({
      a: T.propertySignature(T.string, { a: "a" })
    })
    const ast: any = schema.ast
    expect(ast.propertySignatures[0].annotations).toEqual({ a: "a" })
  })

  it("should add annotations to propertySignature().optional()", () => {
    const schema = T.struct({
      a: T.propertySignature(T.string, { a: "a" }).optional()
    })
    const ast: any = schema.ast
    expect(ast.propertySignatures[0].annotations).toEqual({ a: "a" })
  })

  it("should add annotations to propertySignature().withDefault()", () => {
    const schema = T.struct({
      a: T.propertySignature(T.string, { a: "a" }).withDefault(() => "")
    })
    const ast: any = schema.ast
    expect(ast.to.propertySignatures[0].annotations).toEqual({ a: "a" })
  })

  it("should add annotations to propertySignature().toOption()", () => {
    const schema = T.struct({
      a: T.propertySignature(T.string, { a: "a" }).toOption()
    })
    const ast: any = schema.ast
    expect(ast.to.propertySignatures[0].annotations).toEqual({ a: "a" })
  })
})
