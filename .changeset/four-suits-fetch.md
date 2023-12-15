---
"@effect/schema": minor
---

Schema: refactor `S.optional` API.

Upgrade Guide:

- `S.optional(schema, { exact: true })` replaces the old `S.optional(schema)`
- `S.optional(schema, { exact: true, default: () => A })` replaces the old `S.optional(schema).withDefault(() => A)`
- `S.optional(schema, { exact: true, toOption: true })` replaces the old `S.optional(schema).toOption()`
