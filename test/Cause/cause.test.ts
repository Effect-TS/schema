import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import { Cause, FiberId } from "effect"
import { assert, describe, it } from "vitest"

describe("Cause/cause", () => {
  it("property tests", () => {
    Util.roundtrip(S.cause(S.string))
  })

  it("decoding", async () => {
    const schema = S.cause(S.string)
    await Util.expectParseSuccess(
      schema,
      JSON.parse(JSON.stringify({ _tag: "Fail", error: "error" })),
      Cause.fail("error")
    )
    await Util.expectParseSuccess(
      schema,
      JSON.parse(JSON.stringify({ _tag: "Empty" })),
      Cause.empty
    )
    await Util.expectParseSuccess(
      schema,
      JSON.parse(
        JSON.stringify({
          _tag: "Parallel",
          left: { _tag: "Fail", error: "error" },
          right: { _tag: "Empty" }
        })
      ),
      Cause.parallel(Cause.fail("error"), Cause.empty)
    )
    await Util.expectParseSuccess(
      schema,
      JSON.parse(
        JSON.stringify({
          _tag: "Sequential",
          left: { _tag: "Fail", error: "error" },
          right: { _tag: "Empty" }
        })
      ),
      Cause.sequential(Cause.fail("error"), Cause.empty)
    )
    await Util.expectParseSuccess(
      schema,
      JSON.parse(
        JSON.stringify({
          _tag: "Die",
          defect: { stack: "fail", message: "error" }
        })
      ),
      Cause.die({ stack: "fail", message: "error" })
    )
    await Util.expectParseSuccess(
      schema,
      JSON.parse(
        JSON.stringify({
          _tag: "Interrupt",
          fiberId: {
            _tag: "Composite",
            left: {
              _tag: "Runtime",
              id: 1,
              startTimeMillis: 1000
            },
            right: {
              _tag: "None"
            }
          }
        })
      ),
      Cause.interrupt(FiberId.composite(FiberId.runtime(1, 1000), FiberId.none))
    )
  })

  it("encoding", async () => {
    const schema = S.cause(S.string)
    await Util.expectEncodeSuccess(schema, Cause.fail("error"), { _tag: "Fail", error: "error" })
    await Util.expectEncodeSuccess(schema, Cause.empty, { _tag: "Empty" })
    await Util.expectEncodeSuccess(schema, Cause.parallel(Cause.fail("error"), Cause.empty), {
      _tag: "Parallel",
      left: { _tag: "Fail", error: "error" },
      right: { _tag: "Empty" }
    })
    await Util.expectEncodeSuccess(schema, Cause.sequential(Cause.fail("error"), Cause.empty), {
      _tag: "Sequential",
      left: { _tag: "Fail", error: "error" },
      right: { _tag: "Empty" }
    })
    await Util.expectEncodeSuccess(schema, Cause.die("fail"), {
      _tag: "Die",
      defect: "Error: fail"
    })
    await Util.expectEncodeSuccess(
      schema,
      Cause.interrupt(FiberId.composite(FiberId.runtime(1, 1000), FiberId.none)),
      {
        _tag: "Interrupt",
        fiberId: {
          _tag: "Composite",
          left: {
            _tag: "Runtime",
            id: 1,
            startTimeMillis: 1000
          },
          right: {
            _tag: "None"
          }
        }
      }
    )

    const failWithStack = S.encodeSync(schema)(Cause.die(new Error("fail")))
    assert(failWithStack._tag === "Die")
    assert.include(failWithStack.defect, "Error: fail")
    assert.include(failWithStack.defect, "cause.test.ts")
  })
})
