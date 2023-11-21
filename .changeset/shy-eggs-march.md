---
"@effect/schema": patch
---

improve JSON Schema output:

- rename `dependencies` to `$defs`
- remove `"type"` from const schemas
- use `"oneOf"` for enums and add `"title"`s
- add support for `record(pattern, number)`
- add `"$id"` and `"$comment"` properties
- literals should be converted to `enum` instead of `anyOf`, closes #579
