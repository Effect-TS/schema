---
"@effect/schema": minor
---

Schema: refactor property signature APIs

- remove chainable APIs
- add `optionalExactToRequired` primitive
- rename `optional` to `optionalExact` (missing -> missing value)
- add `optional` (missing or `undefined` -> missing value or `undefined`)
- add `optionalExactToOption(schema)` (old `optional(schema).toOption()`)
- add `optionalExactWithDefault(schema, value)` (old `optional(schema).withDefault(value)`)
- add `optionalToOption` (missing value and `undefined` -> `Option.none()`)
- add `optionalWithDefault` (missing value and `undefined` -> default value)
