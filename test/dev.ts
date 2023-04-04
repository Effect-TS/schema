import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import * as PR from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it.skip("dev", async () => {
    const NumberFromString = S.numberFromString(S.string)
    const schema = S.optionFromNullable(NumberFromString)
    // await Util.expectEncodeSuccess(schema, O.none(), null)
    await Util.expectEncodeSuccess(schema, O.some(1), "1")
  })

  it.skip("refinement", async () => {
    const numberFromString = <I, A extends string>(self: S.Schema<I, A>): S.Schema<I, number> => {
      const schema: S.Schema<I, number> = S.transformResult(
        self,
        S.number,
        (s) => {
          console.log("decoding")
          if (s === "NaN") {
            return PR.success(NaN)
          }
          if (s === "Infinity") {
            return PR.success(Infinity)
          }
          if (s === "-Infinity") {
            return PR.success(-Infinity)
          }
          const n = parseFloat(s)
          return isNaN(n) ? PR.failure(PR.type(schema.ast, s)) : PR.success(n)
        },
        (n) => {
          console.log("encoding")
          return S.validateResult(self)(String(n))
        }
      )
      return schema
    }
    const schema = pipe(
      numberFromString(pipe(
        S.string,
        S.filter(() => {
          console.log("filter 1")
          return true
        })
      )),
      S.filter(() => {
        console.log("filter 2")
        return true
      }),
      S.filter(() => {
        console.log("filter 3")
        return true
      }),
      S.filter(() => {
        console.log("filter 4")
        return true
      })
    )
    // console.log("%o", schema.ast)
    // expect(S.decode(schema)("1")).toEqual(1)
    expect(S.encode(schema)(1)).toEqual("1")
  })
})
