import * as O from "@effect/data/Option"
import * as Codec from "@effect/schema/Codec"
import * as Schema from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it.skip("OptionFromString", async () => {
    const OptionFromString: Codec.Codec<string, O.Option<string>> = Codec.transform(
      Schema.string,
      Schema.option(Schema.string), // better: Schema.option(Schema.string.pipe(Schema.nonEmpty(), Schema.brand("NonEmptyString")))
      (s) => (s.length === 0 ? O.none() : O.some(s)),
      (a) => (O.isNone(a) ? "" : a.value)
    )
    Util.expectParseSuccess(OptionFromString, "", O.none())
    Util.expectParseSuccess(OptionFromString, "a", O.some("a"))
  })
})
