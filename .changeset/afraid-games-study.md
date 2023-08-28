---
"@effect/schema": minor
---

backport AST changes from POC:

- change decode in Declaration- change decode in Refinement (to filter)
- remove isReversed from Refinement
- add transformAST to Transform (and remove decode, encode, propertySignatureTransformations)
- refactor PropertySignature
