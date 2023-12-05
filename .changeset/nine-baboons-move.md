---
"@effect/schema": patch
---

Schema: add filter overloading returning Option<ParseError>

For more complex scenarios, you can return an `Option<ParseError>` type instead of a boolean. In this context, `None` indicates success, and `Some(error)` rejects the input with a specific error
