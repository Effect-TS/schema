import { pipe } from "@effect/data/Function"
import * as AST from "@effect/schema/AST"
import * as S from "@effect/schema/Schema"
import * as T from "@effect/schema/Transform"

describe.concurrent("AST.guards", () => {
  it("isDeclaration", () => {
    expect(AST.isDeclaration(T.optionFromSelf(T.number).ast)).toEqual(true)
    expect(AST.isDeclaration(T.number.ast)).toEqual(false)
  })

  it("isTemplateLiteral", () => {
    expect(AST.isTemplateLiteral(T.templateLiteral(T.literal("a"), T.string).ast)).toEqual(true)
    expect(AST.isTemplateLiteral(T.number.ast)).toEqual(false)
  })

  it("isLazy", () => {
    expect(AST.isLazy(S.json.ast)).toEqual(true)
    expect(AST.isLazy(T.number.ast)).toEqual(false)
  })

  it("isTransform", () => {
    expect(AST.isTransform(pipe(T.string, T.trim).ast)).toEqual(true)
    expect(AST.isTransform(T.number.ast)).toEqual(false)
  })

  it("isUndefinedKeyword", () => {
    expect(AST.isUndefinedKeyword(T.undefined.ast)).toEqual(true)
    expect(AST.isUndefinedKeyword(T.number.ast)).toEqual(false)
  })

  it("isVoidKeyword", () => {
    expect(AST.isVoidKeyword(T.void.ast)).toEqual(true)
    expect(AST.isVoidKeyword(T.unknown.ast)).toEqual(false)
  })

  it("isSymbolKeyword", () => {
    expect(AST.isSymbolKeyword(T.symbol.ast)).toEqual(true)
    expect(AST.isSymbolKeyword(T.unknown.ast)).toEqual(false)
  })

  it("isObjectKeyword", () => {
    expect(AST.isObjectKeyword(T.object.ast)).toEqual(true)
    expect(AST.isObjectKeyword(T.unknown.ast)).toEqual(false)
  })

  it("isEnums", () => {
    enum Fruits {
      Apple,
      Banana
    }
    expect(AST.isEnums(T.enums(Fruits).ast)).toEqual(true)
    expect(AST.isEnums(T.unknown.ast)).toEqual(false)
  })

  it("isNeverKeyword", () => {
    expect(AST.isNeverKeyword(T.never.ast)).toEqual(true)
    expect(AST.isNeverKeyword(T.unknown.ast)).toEqual(false)
  })

  it("isUniqueSymbol", () => {
    expect(AST.isUniqueSymbol(T.uniqueSymbol(Symbol.for("@effect/schema/test/a")).ast)).toEqual(
      true
    )
    expect(AST.isUniqueSymbol(T.unknown.ast)).toEqual(false)
  })

  it("isUnknownKeyword", () => {
    expect(AST.isUnknownKeyword(T.unknown.ast)).toEqual(true)
    expect(AST.isUnknownKeyword(T.any.ast)).toEqual(false)
  })

  it("isAnyKeyword", () => {
    expect(AST.isAnyKeyword(T.any.ast)).toEqual(true)
    expect(AST.isAnyKeyword(T.unknown.ast)).toEqual(false)
  })

  it("isBooleanKeyword", () => {
    expect(AST.isBooleanKeyword(T.boolean.ast)).toEqual(true)
    expect(AST.isBooleanKeyword(T.unknown.ast)).toEqual(false)
  })

  it("isBigIntKeyword", () => {
    expect(AST.isBigIntKeyword(T.bigint.ast)).toEqual(true)
    expect(AST.isBigIntKeyword(T.unknown.ast)).toEqual(false)
  })

  it("isParameter", () => {
    expect(AST.isParameter(AST.stringKeyword)).toEqual(true)
    expect(AST.isParameter(AST.symbolKeyword)).toEqual(true)
    expect(AST.isParameter(T.templateLiteral(T.string, T.literal("-"), T.string).ast))
      .toEqual(true)
    expect(AST.isParameter(pipe(T.string, T.minLength(2)).ast)).toEqual(true)
    expect(AST.isParameter(pipe(T.number, T.int()).ast)).toEqual(false)
    expect(AST.isParameter(T.NumberFromString.ast)).toEqual(false)
    expect(AST.isParameter(pipe(T.NumberFromString, T.int()).ast))
    expect(AST.isParameter(T.templateLiteral(T.literal("a", "b"), T.literal("c")).ast)).toEqual(
      false
    )
  })
})
