import { pipe } from "@fp-ts/data/Function"
import * as O from "@fp-ts/data/Option"
import * as AST from "@fp-ts/schema/AST"
import { json } from "@fp-ts/schema/data/Json"
import * as DataOption from "@fp-ts/schema/data/Option"
import * as S from "@fp-ts/schema/Schema"

describe.concurrent("AST", () => {
  it("exports", () => {
    expect(AST.isUniqueSymbol).exist
    expect(AST.isTransform).exist
    expect(AST.isRefinement).exist
  })

  it("isTypeAlias", () => {
    expect(AST.isTypeAlias(DataOption.option(S.number).ast)).toEqual(true)
    expect(AST.isTypeAlias(S.number.ast)).toEqual(false)
  })

  it("isTemplateLiteral", () => {
    expect(AST.isTemplateLiteral(S.templateLiteral(S.literal("a"), S.string).ast)).toEqual(true)
    expect(AST.isTemplateLiteral(S.number.ast)).toEqual(false)
  })

  it("isLazy", () => {
    expect(AST.isLazy(json.ast)).toEqual(true)
    expect(AST.isLazy(S.number.ast)).toEqual(false)
  })

  it("isTransform", () => {
    expect(AST.isTransform(pipe(S.string, S.trim).ast)).toEqual(true)
    expect(AST.isTransform(S.number.ast)).toEqual(false)
  })

  it("createTemplateLiteral/ should return a literal if there are no template literal spans", () => {
    expect(AST.createTemplateLiteral("a", [])).toEqual(AST.createLiteral("a"))
  })

  it("getCardinality/ never", () => {
    expect(AST.getCardinality(AST.neverKeyword)).toEqual(0)
  })

  it("getCardinality/ object", () => {
    expect(AST.getCardinality(AST.objectKeyword)).toEqual(4)
  })

  it("getCardinality/ refinement", () => {
    expect(AST.getCardinality(pipe(S.string, S.nonEmpty()).ast)).toEqual(3)
  })

  it("getWeight/transform/ should return the weight of type", () => {
    expect(AST.getWeight(S.option(S.number).ast)).toEqual(3)
  })

  it("getWeight/union/ should return the sum of the members weight", () => {
    expect(AST.getWeight(S.union(S.struct({ a: S.string }), S.struct({ b: S.number })).ast))
      .toEqual(2)
  })

  it("getWeight/refinement/ should return the weight of the from type", () => {
    expect(AST.getWeight(pipe(S.array(S.string), S.filter((as) => as.length === 2)).ast)).toEqual(1)
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

  it("createRecord/ TypeAlias", () => {
    const string = AST.createTypeAlias([], AST.stringKeyword)
    expect(AST.createRecord(string, AST.numberKeyword, true)).toEqual(AST.createTypeLiteral([], [
      AST.createIndexSignature(AST.stringKeyword, AST.numberKeyword, true)
    ]))
  })

  it("createRecord/ numeric literal", () => {
    expect(AST.createRecord(AST.createLiteral(1), AST.numberKeyword, true)).toEqual(
      AST.createTypeLiteral([AST.createPropertySignature(1, AST.numberKeyword, false, true)], [])
    )
  })

  it("createRecord/ should throw on unsupported keys", () => {
    expect(() => AST.createRecord(AST.undefinedKeyword, AST.numberKeyword, true)).toThrowError(
      new Error("createRecord: Unsupported key UndefinedKeyword")
    )
  })

  it("union/ should unify string literals with string", () => {
    expect(S.union(S.literal("a"), S.string).ast).toEqual(S.string.ast)
  })

  it("union/ should unify number literals with number", () => {
    expect(S.union(S.literal(1), S.number).ast).toEqual(S.number.ast)
  })

  it("union/ should unify symbol literals with symbol", () => {
    expect(S.union(S.uniqueSymbol(Symbol.for("@fp-ts/schema/test/a")), S.symbol).ast).toEqual(
      S.symbol.ast
    )
  })

  describe.concurrent("union/ should give precedence to schemas containing more infos", () => {
    it("1 required vs 2 required", () => {
      const a = S.struct({ a: S.string })
      const ab = S.struct({ a: S.string, b: S.number })
      const schema = S.union(a, ab)
      expect(schema.ast).toEqual({
        _tag: "Union",
        types: [ab.ast, a.ast],
        annotations: {}
      })
    })

    it("1 required vs 2 optional", () => {
      const a = S.struct({ a: S.string })
      const ab = S.struct({ a: S.optional(S.string), b: S.optional(S.number) })
      const schema = S.union(a, ab)
      expect(schema.ast).toEqual({
        _tag: "Union",
        types: [ab.ast, a.ast],
        annotations: {}
      })
    })
  })

  it("keyof/ never", () => {
    expect(AST.keyof(S.never.ast)).toEqual(S.union(S.string, S.number, S.symbol).ast)
  })

  it("keyof/ any", () => {
    expect(AST.keyof(S.any.ast)).toEqual(S.union(S.string, S.number, S.symbol).ast)
  })

  it("keyof/ string", () => {
    expect(AST.keyof(S.string.ast)).toEqual(S.literal("length").ast)
  })

  it("keyof/ number", () => {
    expect(AST.keyof(S.number.ast)).toEqual(AST.neverKeyword)
  })

  it("keyof/ lazy", () => {
    expect(AST.keyof(json.ast)).toEqual(S.never.ast)
  })

  it("keyof/union/ symbol keys", () => {
    const a = Symbol.for("@fp-ts/schema/test/a")
    expect(AST.keyof(S.union(S.struct({ [a]: S.string }), S.struct({ [a]: S.number })).ast))
      .toEqual(AST.createUniqueSymbol(a))
  })

  it("keyof/ should unify string literals with string", () => {
    expect(AST.keyof(
      pipe(S.struct({ a: S.string }), S.extend(S.record(S.string, S.string))).ast
    )).toEqual(S.string.ast)
  })

  it("keyof/ should unify symbol literals with symbol", () => {
    const a = Symbol.for("@fp-ts/schema/test/a")
    expect(AST.keyof(
      pipe(S.struct({ [a]: S.string }), S.extend(S.record(S.symbol, S.string))).ast
    )).toEqual(S.symbol.ast)
  })

  it("partial/refinement", () => {
    expect(() =>
      pipe(S.struct({ a: S.string, b: S.string }), S.filter(({ a, b }) => a === b), S.partial)
    ).toThrowError(new Error("partial: Unsupported type Refinement"))
  })

  it("partial/transform", () => {
    expect(() => pipe(S.string, S.trim, S.partial)).toThrowError(
      new Error("partial: Unsupported type Transform")
    )
  })

  it("partial/tuple/ e", () => {
    // type A = [string]
    // type B = Partial<A>
    const tuple = AST.createTuple([AST.createElement(AST.stringKeyword, false)], O.none, true)
    expect(AST.partial(tuple)).toEqual(
      AST.createTuple([AST.createElement(AST.stringKeyword, true)], O.none, true)
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
    const tuple = AST.createTuple([AST.createElement(AST.stringKeyword, false)], O.none, true)
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
          AST.createTuple([AST.createElement(AST.stringKeyword, false)], O.none, true),
          AST.numberKeyword
        ),
        AST.booleanKeyword
      )
    ).toThrowError(new Error("A rest element cannot follow another rest element. ts(1265)"))
  })

  it("appendElement/ should append an element (rest element)", () => {
    const tuple = AST.createTuple([AST.createElement(AST.stringKeyword, false)], O.none, true)
    expect(AST.appendElement(tuple, AST.createElement(AST.numberKeyword, false))).toEqual(
      AST.createTuple(
        [
          AST.createElement(AST.stringKeyword, false),
          AST.createElement(AST.numberKeyword, false)
        ],
        O.none,
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
    const tuple = AST.createTuple([AST.createElement(AST.stringKeyword, true)], O.none, true)
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
      const schema = S.struct({ a: S.string, b: S.literal("b") })
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
      const schema = S.struct({ a: S.string, b: S.undefined })
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
      const schema = S.struct({ a: S.string, b: S.boolean })
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
      const schema = S.struct({ a: S.boolean, b: S.literal(null) })
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

  it("getPropertySignatures/ string", () => {
    const schema = S.string
    expect(AST.getPropertySignatures(schema.ast)).toEqual([])
  })

  it("getPropertySignatures/ type alias", () => {
    const schema = DataOption.fromNullable(S.number)
    expect(AST.getPropertySignatures(schema.ast)).toEqual([
      AST.createPropertySignature(
        "_tag",
        S.union(S.literal("Some"), S.literal("None")).ast,
        false,
        true
      )
    ])
  })

  it("getPropertySignatures/ Refinement", () => {
    const schema = pipe(
      S.struct({ a: S.string, b: S.string }),
      S.filter(({ a, b }) => a === b)
    )
    expect(AST.getPropertySignatures(schema.ast)).toEqual([
      AST.createPropertySignature("a", S.string.ast, false, true),
      AST.createPropertySignature("b", S.string.ast, false, true)
    ])
  })

  it("getPropertySignatures/ tuple", () => {
    const schema = S.tuple(S.string, S.number)
    expect(AST.getPropertySignatures(schema.ast)).toEqual([
      AST.createPropertySignature(0, S.string.ast, false, true),
      AST.createPropertySignature(1, S.number.ast, false, true)
    ])
  })

  it("getPropertySignatures/struct string keys", () => {
    const schema = S.struct({ a: S.string, b: S.number })
    expect(AST.getPropertySignatures(schema.ast)).toEqual([
      AST.createPropertySignature("a", S.string.ast, false, true),
      AST.createPropertySignature("b", S.number.ast, false, true)
    ])
  })

  it("getPropertySignatures/struct symbol keys", () => {
    const a = Symbol.for("@fp-ts/schema/test/a")
    const b = Symbol.for("@fp-ts/schema/test/b")
    const schema = S.struct({ [a]: S.string, [b]: S.number })
    expect(AST.getPropertySignatures(schema.ast)).toEqual([
      AST.createPropertySignature(a, S.string.ast, false, true),
      AST.createPropertySignature(b, S.number.ast, false, true)
    ])
  })

  it("getPropertySignatures/union required property signatures", () => {
    const schema = S.union(
      S.struct({ a: S.string, b: S.number }),
      S.struct({ a: S.boolean, c: S.boolean })
    )
    expect(AST.getPropertySignatures(schema.ast)).toEqual([
      AST.createPropertySignature(
        "a",
        AST.createUnion([S.string.ast, S.boolean.ast]),
        false,
        true
      )
    ])
  })

  it("getPropertySignatures/union optional property signatures", () => {
    const schema = S.union(
      S.struct({ a: S.string, b: S.number }),
      S.struct({ c: S.boolean, a: S.optional(S.boolean) })
    )
    expect(AST.getPropertySignatures(schema.ast)).toEqual([
      AST.createPropertySignature(
        "a",
        AST.createUnion([S.string.ast, S.boolean.ast]),
        true,
        true
      )
    ])
  })

  it("getPropertySignatures/ lazy", () => {
    interface Category {
      readonly name: string
      readonly categories: ReadonlyArray<Category>
    }
    const Category: S.Schema<Category> = S.lazy<Category>(() =>
      S.struct({
        name: S.string,
        categories: S.array(Category)
      })
    )
    expect(AST.getPropertySignatures(Category.ast)).toEqual([
      AST.createPropertySignature("name", S.string.ast, false, true),
      AST.createPropertySignature(
        "categories",
        AST.createTuple([], O.some([Category.ast]), true),
        false,
        true
      )
    ])
  })
})
