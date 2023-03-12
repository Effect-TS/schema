import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import * as _ from "@effect/schema/TreeFormatter"

describe.concurrent("TreeFormatter", () => {
  it("formatErrors/ Unexpected", () => {
    const schema = S.struct({ a: S.string })
    Util.expectDecodingFailureTree(
      schema,
      { a: "a", b: 1 },
      `1 error(s) found
└─ key "b"
   └─ is unexpected`
    )
  })

  it("formatActual/ catch", () => {
    const circular: any = { a: null }
    circular.a = circular
    expect(_.formatActual(circular)).toEqual("[object Object]")
  })
})
