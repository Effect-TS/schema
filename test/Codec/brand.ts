import * as C from "@effect/schema/Codec"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("brand", () => {
  it("should move the brand annotations to the right", async () => {
    const codec = Util.X2.pipe(C.brand("X2"))
    expect(C.to(codec).ast).toEqual(S.string.pipe(S.brand("X2")).ast)
  })
})
