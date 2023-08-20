import * as AST from "@effect/schema/AST"
import * as S from "@effect/schema/Schema"

describe.concurrent("experimental", () => {
  it("rename", () => {
    const rename = <A, From extends keyof A, To extends PropertyKey>(
      from: From,
      to: To
    ) =>
    (
      schema: S.Schema<A>
    ): S.Schema<
      Omit<A, From> & { [K in To]: A[From] }
    > => {
      if (AST.isTypeLiteral(schema.ast)) {
        const propertySignatures = schema.ast.propertySignatures.slice()
        const i = propertySignatures.findIndex((ps) => ps.name === from)
        propertySignatures[i] = AST.createPropertySignature(
          to,
          propertySignatures[i].type,
          propertySignatures[i].isOptional,
          propertySignatures[i].isReadonly
        )
        return S.make(
          AST.createTypeLiteral(propertySignatures, schema.ast.indexSignatures)
        )
      }
      throw new Error("cannot rename")
    }

    const schema = S.struct({
      a: S.string,
      b: S.number
    }).pipe(
      rename("a", "aa")
    )
    const is = S.is(schema)
    expect(is({ a: "foo", b: 1 })).toEqual(false)
    expect(is({ aa: "foo", b: 1 })).toEqual(true)
  })

  it("crazy struct", () => {
    type OptionalKeys<A> = {
      [K in keyof A]: K extends `${string}?` ? K : never
    }[keyof A]

    type RequiredKeys<A> = {
      [K in keyof A]: K extends `${string}?` ? never : K
    }[keyof A]

    const struct = <Fields extends Record<PropertyKey, S.Schema<any>>>(
      fields: Fields
    ): S.Schema<
      S.Simplify<
        & { readonly [K in RequiredKeys<Fields>]: S.To<Fields[K]> }
        & {
          readonly [K in OptionalKeys<Fields> as K extends `${infer S}?` ? S : K]+?: S.To<
            Fields[K]
          >
        }
      >
    > =>
      S.make(
        AST.createTypeLiteral(
          Object.keys(fields).map((key) => {
            const isOptional = key.endsWith("?")
            return AST.createPropertySignature(
              isOptional ? key.substring(0, key.length - 1) : key,
              fields[key].ast,
              isOptional,
              true
            )
          }),
          []
        )
      )

    /*
    const schema: S.Schema<{
      readonly a: string;
      readonly b: number;
      readonly c?: boolean;
    }>
    */
    const schema = struct({
      a: S.string,
      b: S.number,
      "c?": S.boolean
    })

    const is = S.is(schema)
    expect(is({ a: "a", b: 1 })).toBe(true)
    expect(is({ a: "a", b: 1, c: true })).toBe(true)

    expect(is({ a: "a" })).toBe(false)
    expect(is({ a: "a", b: 1, c: 1 })).toBe(false)
  })
})
