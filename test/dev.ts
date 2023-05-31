import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("dev", () => {
  it.skip("dev", async () => {
    // const jobs = ["IT doctor", "hacker"] as const
    // const Jobs = pipe(S.literal("IT doctor", "hacker"), S.description("Jobs"))
    // type Jobs = (typeof jobs)[number]

    // const User = C.struct({
    //   name: pipe(S.string, S.description("name")),
    //   age: pipe(S.number, S.description("age")),
    //   job: pipe(Jobs, S.description("job"))
    // })

    const User = S.struct({
      name: S.string
    })
    await Util.expectParseSuccess(User, { name: "name" })

    // const validateUserTuple = C.parseResult(
    //   C.tuple(
    //     pipe(S.string, S.description("tuple name")),
    //     pipe(C.NumberFromString, C.filter((schema) => pipe(schema, S.description("tuple age")))),
    //     Jobs
    //   )
    // )

    // const UserFromCsv = C.transformResult(
    //   pipe(S.string, S.description("csv")),
    //   User,
    //   (s) =>
    //     PR.map(validateUserTuple(s.split(";")), ([name, age, job]) => ({
    //       name,
    //       age,
    //       job
    //     })),
    //   (u) => PR.success(`${u.name};${u.age};${u.job}`)
    // )

    // await Util.expectParseSuccess(Jobs, "IT doctor")
    // await Util.expectParseSuccess(User, {
    //   name: "name",
    //   age: 18,
    //   job: "IT doctor"
    // })
    // await Util.expectParseSuccess(UserFromCsv, "name;18;IT doctor", {
    //   name: "name",
    //   age: 18,
    //   job: "IT doctor" as const
    // }, { onExcessProperty: "error" })
  })
})
