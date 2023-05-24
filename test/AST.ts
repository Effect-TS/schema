import * as O from "@effect/data/Option"
import * as AST from "@effect/schema/AST"
import * as Util from "@effect/schema/test/util"
import * as T from "@effect/schema/Transform"

describe.concurrent("AST", () => {
  it("createIndexSignature/ should throw on unsupported ASTs", () => {
    expect(() => AST.createIndexSignature(AST.booleanKeyword, AST.stringKeyword, true))
      .toThrowError(
        new Error(
          `An index signature parameter type must be 'string', 'symbol', a template literal type or a refinement of the previous types`
        )
      )
  })

  it("createTemplateLiteral/ should return a literal if there are no template literal spans", () => {
    expect(AST.createTemplateLiteral("a", [])).toEqual(AST.createLiteral("a"))
  })

  it("union/ should remove never from members", () => {
    expect(AST.createUnion([AST.neverKeyword, AST.neverKeyword])).toEqual(
      AST.neverKeyword
    )
    expect(AST.createUnion([AST.neverKeyword, AST.stringKeyword])).toEqual(AST.stringKeyword)
    expect(AST.createUnion([AST.stringKeyword, AST.neverKeyword])).toEqual(AST.stringKeyword)
    expect(
      AST.createUnion([
        AST.neverKeyword,
        AST.stringKeyword,
        AST.neverKeyword,
        AST.numberKeyword
      ])
    )
      .toEqual(AST.createUnion([AST.stringKeyword, AST.numberKeyword]))
  })

  it("createRecord/ numeric literal", () => {
    expect(AST.createRecord(AST.createLiteral(1), AST.numberKeyword, true)).toEqual(
      AST.createTypeLiteral([AST.createPropertySignature(1, AST.numberKeyword, false, true)], [])
    )
  })

  it("createRecord/ should throw on unsupported keys", () => {
    expect(() => AST.createRecord(AST.undefinedKeyword, AST.numberKeyword, true)).toThrowError(
      new Error("createRecord: unsupported key UndefinedKeyword")
    )
  })

  it("createRecord/ should throw on unsupported literals", () => {
    expect(() => AST.createRecord(AST.createLiteral(true), AST.numberKeyword, true)).toThrowError(
      new Error("createRecord: unsupported literal true")
    )
  })

  it("union/ should unify any with anything", () => {
    expect(T.union(T.literal("a"), T.any).ast).toEqual(T.any.ast)
  })

  it("union/ should unify unknown with anything", () => {
    expect(T.union(T.literal("a"), T.unknown).ast).toEqual(T.unknown.ast)
  })

  it("union/ should unify string literals with string", () => {
    expect(T.union(T.literal("a"), T.string).ast).toEqual(T.string.ast)
  })

  it("union/ should unify number literals with number", () => {
    expect(T.union(T.literal(1), T.number).ast).toEqual(T.number.ast)
  })

  it("union/ should unify boolean literals with boolean", () => {
    expect(T.union(T.literal(true), T.boolean).ast).toEqual(T.boolean.ast)
  })

  it("union/ should unify bigint literals with bigint", () => {
    expect(T.union(T.literal(1n), T.bigint).ast).toEqual(T.bigint.ast)
  })

  it("union/ should unify symbol literals with symbol", () => {
    expect(T.union(T.uniqueSymbol(Symbol.for("@effect/schema/test/a")), T.symbol).ast).toEqual(
      T.symbol.ast
    )
  })

  describe.concurrent("union/ should give precedence to schemas containing more infos", () => {
    it("1 required vs 2 required", () => {
      const a = T.struct({ a: T.string })
      const ab = T.struct({ a: T.string, b: T.number })
      const schema = T.union(a, ab)
      expect(schema.ast).toEqual({
        _tag: "Union",
        types: [ab.ast, a.ast],
        annotations: {}
      })
    })

    it("1 required vs 2 optional", () => {
      const a = T.struct({ a: T.string })
      const ab = T.struct({ a: T.optional(T.string), b: T.optional(T.number) })
      const schema = T.union(a, ab)
      expect(schema.ast).toEqual({
        _tag: "Union",
        types: [ab.ast, a.ast],
        annotations: {}
      })
    })

    it("struct({}) should go in last position in a union", () => {
      const a = T.object
      const b = T.struct({})
      const schema = T.union(b, a)
      expect(schema.ast).toEqual({
        _tag: "Union",
        types: [a.ast, b.ast],
        annotations: {}
      })
    })

    it("object precedence should be low", () => {
      const a = T.tuple()
      const b = T.object
      const schema = T.union(b, a)
      expect(schema.ast).toEqual({
        _tag: "Union",
        types: [a.ast, b.ast],
        annotations: {}
      })
    })
  })

  it("partial/tuple/ e", () => {
    // type A = [string]
    // type B = Partial<A>
    const tuple = AST.createTuple([AST.createElement(AST.stringKeyword, false)], O.none(), true)
    expect(AST.partial(tuple)).toEqual(
      AST.createTuple([AST.createElement(AST.stringKeyword, true)], O.none(), true)
    )
  })

  it("partial/tuple/ e + r", () => {
    // type A = readonly [string, ...Array<number>]
    // type B = Partial<A>
    const tuple = AST.createTuple(
      [AST.createElement(AST.stringKeyword, false)],
      O.some([AST.numberKeyword]),
      true
    )
    expect(AST.partial(tuple)).toEqual(
      AST.createTuple(
        [AST.createElement(AST.stringKeyword, true)],
        O.some([AST.createUnion([AST.numberKeyword, AST.undefinedKeyword])]),
        true
      )
    )
  })

  it("partial/tuple/ e + r + e", () => {
    // type A = readonly [string, ...Array<number>, boolean]
    // type B = Partial<A>
    const tuple = AST.createTuple(
      [AST.createElement(AST.stringKeyword, false)],
      O.some([AST.numberKeyword, AST.booleanKeyword]),
      true
    )
    expect(AST.partial(tuple)).toEqual(
      AST.createTuple(
        [AST.createElement(AST.stringKeyword, true)],
        O.some([AST.createUnion([AST.numberKeyword, AST.booleanKeyword, AST.undefinedKeyword])]),
        true
      )
    )
  })

  it("appendRestElement/ should add a rest element", () => {
    const tuple = AST.createTuple([AST.createElement(AST.stringKeyword, false)], O.none(), true)
    const actual = AST.appendRestElement(tuple, AST.numberKeyword)
    expect(actual).toEqual(
      AST.createTuple(
        [AST.createElement(AST.stringKeyword, false)],
        O.some([AST.numberKeyword]),
        true
      )
    )
  })

  it("appendRestElement/ multiple `rest` calls must throw", () => {
    expect(() =>
      AST.appendRestElement(
        AST.appendRestElement(
          AST.createTuple([AST.createElement(AST.stringKeyword, false)], O.none(), true),
          AST.numberKeyword
        ),
        AST.booleanKeyword
      )
    ).toThrowError(new Error("A rest element cannot follow another rest element. ts(1265)"))
  })

  it("appendElement/ should append an element (rest element)", () => {
    const tuple = AST.createTuple([AST.createElement(AST.stringKeyword, false)], O.none(), true)
    expect(AST.appendElement(tuple, AST.createElement(AST.numberKeyword, false))).toEqual(
      AST.createTuple(
        [
          AST.createElement(AST.stringKeyword, false),
          AST.createElement(AST.numberKeyword, false)
        ],
        O.none(),
        true
      )
    )
  })

  it("appendElement/ should append an element (existing rest element)", () => {
    const tuple = AST.createTuple(
      [AST.createElement(AST.stringKeyword, false)],
      O.some([AST.numberKeyword]),
      true
    )
    expect(AST.appendElement(tuple, AST.createElement(AST.booleanKeyword, false))).toEqual(
      AST.createTuple(
        [AST.createElement(AST.stringKeyword, false)],
        O.some([AST.numberKeyword, AST.booleanKeyword]),
        true
      )
    )
  })

  it("appendElement/ A required element cannot follow an optional element", () => {
    const tuple = AST.createTuple([AST.createElement(AST.stringKeyword, true)], O.none(), true)
    expect(() => AST.appendElement(tuple, AST.createElement(AST.numberKeyword, false)))
      .toThrowError(
        new Error("A required element cannot follow an optional element. ts(1257)")
      )
  })

  it("appendElement/ An optional element cannot follow a rest element", () => {
    const tuple = AST.createTuple([], O.some([AST.stringKeyword]), true)
    expect(() => AST.appendElement(tuple, AST.createElement(AST.numberKeyword, true)))
      .toThrowError(
        new Error("An optional element cannot follow a rest element. ts(1266)")
      )
  })

  describe.concurrent("struct/ should give precedence to property signatures / index signatures containing less inhabitants", () => {
    it("literal vs string", () => {
      const schema = T.struct({ a: T.string, b: T.literal("b") })
      expect(schema.ast).toEqual({
        _tag: "TypeLiteral",
        propertySignatures: [
          AST.createPropertySignature("b", AST.createLiteral("b"), false, true),
          AST.createPropertySignature("a", AST.stringKeyword, false, true)
        ],
        indexSignatures: [],
        annotations: {}
      })
    })

    it("undefined vs string", () => {
      const schema = T.struct({ a: T.string, b: T.undefined })
      expect(schema.ast).toEqual({
        _tag: "TypeLiteral",
        propertySignatures: [
          AST.createPropertySignature("b", AST.undefinedKeyword, false, true),
          AST.createPropertySignature("a", AST.stringKeyword, false, true)
        ],
        indexSignatures: [],
        annotations: {}
      })
    })

    it("boolean vs string", () => {
      const schema = T.struct({ a: T.string, b: T.boolean })
      expect(schema.ast).toEqual({
        _tag: "TypeLiteral",
        propertySignatures: [
          AST.createPropertySignature("b", AST.booleanKeyword, false, true),
          AST.createPropertySignature("a", AST.stringKeyword, false, true)
        ],
        indexSignatures: [],
        annotations: {}
      })
    })

    it("literal vs boolean", () => {
      const schema = T.struct({ a: T.boolean, b: T.literal(null) })
      expect(schema.ast).toEqual({
        _tag: "TypeLiteral",
        propertySignatures: [
          AST.createPropertySignature("b", AST.createLiteral(null), false, true),
          AST.createPropertySignature("a", AST.booleanKeyword, false, true)
        ],
        indexSignatures: [],
        annotations: {}
      })
    })
  })

  it("createLazy should memoize the thunk", async () => {
    let log = 0
    interface A {
      readonly a: string
      readonly as: ReadonlyArray<A>
    }
    const schema: T.Transform<A, A> = T.lazy(() => {
      log++
      return T.struct({
        a: T.string,
        as: T.array(schema)
      })
    })
    await Util.expectParseSuccess(schema, { a: "a1", as: [] })
    await Util.expectParseSuccess(schema, { a: "a1", as: [{ a: "a2", as: [] }] })
    expect(log).toEqual(1)
  })
})
