import { pipe } from "@effect/data/Function"
import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("brand", () => {
  it("should move the brand annotations to the right", async () => {
    const codec = pipe(Util.X2, C.brand("X2"))
    expect(C.to(codec).ast).toEqual(pipe(S.string, S.brand("X2")).ast)
  })
})
