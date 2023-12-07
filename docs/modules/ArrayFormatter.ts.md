---
title: ArrayFormatter.ts
nav_order: 2
parent: Modules
---

## ArrayFormatter overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [formatting](#formatting)
  - [formatErrors](#formaterrors)
- [model](#model)
  - [Issue (interface)](#issue-interface)

---

# formatting

## formatErrors

**Signature**

```ts
export declare const formatErrors: (errors: readonly [ParseIssue, ...ParseIssue[]]) => Array<Issue>
```

Added in v1.0.0

# model

## Issue (interface)

**Signature**

```ts
export interface Issue {
  readonly _tag: ParseIssue["_tag"]
  readonly path: ReadonlyArray<PropertyKey>
  readonly message: string
}
```

Added in v1.0.0
