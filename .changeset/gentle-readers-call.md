---
"@effect/schema": minor
---

Refactor `ParseResult` module:

- replace `UnionMember` with `Union`
- rename `UnionMember` to `Member`
- ast `ast` field to `Member`
- replace `Index` with `Tuple`
- `Unexpected`: rename `ast` to `expected` and make the field required
