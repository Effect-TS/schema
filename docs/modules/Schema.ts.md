---
title: Schema.ts
nav_order: 10
parent: Modules
---

## Schema overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [BigDecimal constructors](#bigdecimal-constructors)
  - [BigDecimal](#bigdecimal)
  - [BigDecimalFromNumber](#bigdecimalfromnumber)
  - [BigDecimalFromSelf](#bigdecimalfromself)
  - [bigDecimalFromNumber](#bigdecimalfromnumber-1)
  - [bigDecimalFromString](#bigdecimalfromstring)
- [BigDecimal filters](#bigdecimal-filters)
  - [betweenBigDecimal](#betweenbigdecimal)
  - [greaterThanBigDecimal](#greaterthanbigdecimal)
  - [greaterThanOrEqualToBigDecimal](#greaterthanorequaltobigdecimal)
  - [lessThanBigDecimal](#lessthanbigdecimal)
  - [lessThanOrEqualToBigDecimal](#lessthanorequaltobigdecimal)
  - [negativeBigDecimal](#negativebigdecimal)
  - [nonNegativeBigDecimal](#nonnegativebigdecimal)
  - [nonPositiveBigDecimal](#nonpositivebigdecimal)
  - [positiveBigDecimal](#positivebigdecimal)
- [BigDecimal transformations](#bigdecimal-transformations)
  - [clampBigDecimal](#clampbigdecimal)
  - [negateBigDecimal](#negatebigdecimal)
- [Cause](#cause)
  - [CauseFrom (type alias)](#causefrom-type-alias)
  - [CauseTo (type alias)](#causeto-type-alias)
  - [cause](#cause-1)
  - [causeFromSelf](#causefromself)
- [Chunk transformations](#chunk-transformations)
  - [chunk](#chunk)
  - [chunkFromSelf](#chunkfromself)
- [Data transformations](#data-transformations)
  - [data](#data)
  - [dataFromSelf](#datafromself)
- [Date constructors](#date-constructors)
  - [Date](#date)
  - [DateFromSelf](#datefromself)
  - [DateFromString](#datefromstring)
  - [ValidDateFromSelf](#validdatefromself)
- [Date filters](#date-filters)
  - [validDate](#validdate)
- [Date transformations](#date-transformations)
  - [dateFromString](#datefromstring-1)
- [Duration constructors](#duration-constructors)
  - [Duration](#duration)
  - [DurationFromSelf](#durationfromself)
- [Duration transformations](#duration-transformations)
  - [durationFromHrTime](#durationfromhrtime)
- [Either transformations](#either-transformations)
  - [EitherFrom (type alias)](#eitherfrom-type-alias)
  - [either](#either)
  - [eitherFromSelf](#eitherfromself)
- [Exit](#exit)
  - [ExitFrom (type alias)](#exitfrom-type-alias)
  - [exit](#exit-1)
  - [exitFromSelf](#exitfromself)
- [Fiber id](#fiber-id)
  - [FiberId](#fiberid)
  - [FiberIdFrom (type alias)](#fiberidfrom-type-alias)
  - [FiberIdFromSelf](#fiberidfromself)
- [Option transformations](#option-transformations)
  - [OptionFrom (type alias)](#optionfrom-type-alias)
  - [option](#option)
  - [optionFromNullable](#optionfromnullable)
  - [optionFromSelf](#optionfromself)
- [ReadonlyArray filters](#readonlyarray-filters)
  - [itemsCount](#itemscount)
  - [maxItems](#maxitems)
  - [minItems](#minitems)
- [ReadonlyMap transformations](#readonlymap-transformations)
  - [readonlyMap](#readonlymap)
- [ReadonlySet transformations](#readonlyset-transformations)
  - [readonlySet](#readonlyset)
  - [readonlySetFromSelf](#readonlysetfromself)
- [Uint8Array constructors](#uint8array-constructors)
  - [Uint8Array](#uint8array)
  - [Uint8ArrayFromSelf](#uint8arrayfromself)
- [Uint8Array transformations](#uint8array-transformations)
  - [uint8ArrayFromNumbers](#uint8arrayfromnumbers)
- [annotations](#annotations)
  - [annotations](#annotations-1)
  - [default](#default)
  - [description](#description)
  - [documentation](#documentation)
  - [equivalence](#equivalence)
  - [examples](#examples)
  - [identifier](#identifier)
  - [jsonSchema](#jsonschema)
  - [message](#message)
  - [title](#title)
- [bigint constructors](#bigint-constructors)
  - [BigintFromNumber](#bigintfromnumber)
  - [NegativeBigint](#negativebigint)
  - [NegativeBigintFromSelf](#negativebigintfromself)
  - [NonNegativeBigint](#nonnegativebigint)
  - [NonNegativeBigintFromSelf](#nonnegativebigintfromself)
  - [NonPositiveBigint](#nonpositivebigint)
  - [NonPositiveBigintFromSelf](#nonpositivebigintfromself)
  - [PositiveBigint](#positivebigint)
  - [PositiveBigintFromSelf](#positivebigintfromself)
  - [bigint](#bigint)
- [bigint filters](#bigint-filters)
  - [betweenBigint](#betweenbigint)
  - [greaterThanBigint](#greaterthanbigint)
  - [greaterThanOrEqualToBigint](#greaterthanorequaltobigint)
  - [lessThanBigint](#lessthanbigint)
  - [lessThanOrEqualToBigint](#lessthanorequaltobigint)
  - [negativeBigint](#negativebigint-1)
  - [nonNegativeBigint](#nonnegativebigint-1)
  - [nonPositiveBigint](#nonpositivebigint-1)
  - [positiveBigint](#positivebigint-1)
- [bigint transformations](#bigint-transformations)
  - [bigintFromNumber](#bigintfromnumber-1)
  - [bigintFromString](#bigintfromstring)
  - [clampBigint](#clampbigint)
- [boolean constructors](#boolean-constructors)
  - [Not](#not)
- [boolean transformations](#boolean-transformations)
  - [not](#not-1)
- [classes](#classes)
  - [Class](#class)
  - [Class (interface)](#class-interface)
  - [TaggedClass](#taggedclass)
  - [TaggedError](#taggederror)
  - [TaggedRequest](#taggedrequest)
  - [TaggedRequest (interface)](#taggedrequest-interface)
  - [TaggedRequest (namespace)](#taggedrequest-namespace)
    - [Any (type alias)](#any-type-alias)
- [combinators](#combinators)
  - [array](#array)
  - [attachPropertySignature](#attachpropertysignature)
  - [brand](#brand)
  - [compose](#compose)
  - [element](#element)
  - [extend](#extend)
  - [filter](#filter)
  - [keyof](#keyof)
  - [lazy](#lazy)
  - [mutable](#mutable)
  - [nonEmptyArray](#nonemptyarray)
  - [nullable](#nullable)
  - [omit](#omit)
  - [optionalElement](#optionalelement)
  - [partial](#partial)
  - [pick](#pick)
  - [record](#record)
  - [required](#required)
  - [rest](#rest)
  - [struct](#struct)
  - [transform](#transform)
  - [transformOrFail](#transformorfail)
  - [tuple](#tuple)
  - [union](#union)
- [constructors](#constructors)
  - [declare](#declare)
  - [enums](#enums)
  - [fromBrand](#frombrand)
  - [instanceOf](#instanceof)
  - [literal](#literal)
  - [make](#make)
  - [templateLiteral](#templateliteral)
  - [uniqueSymbol](#uniquesymbol)
- [decoding](#decoding)
  - [decode](#decode)
  - [decodeEither](#decodeeither)
  - [decodeOption](#decodeoption)
  - [decodePromise](#decodepromise)
  - [decodeSync](#decodesync)
- [encoding](#encoding)
  - [encode](#encode)
  - [encodeEither](#encodeeither)
  - [encodeOption](#encodeoption)
  - [encodePromise](#encodepromise)
  - [encodeSync](#encodesync)
- [encoding constructors](#encoding-constructors)
  - [Base64](#base64)
  - [Base64Url](#base64url)
  - [Hex](#hex)
- [encoding transformations](#encoding-transformations)
  - [base64](#base64-1)
  - [base64url](#base64url-1)
  - [hex](#hex-1)
- [guards](#guards)
  - [isSchema](#isschema)
- [model](#model)
  - [BrandSchema (interface)](#brandschema-interface)
  - [Schema (interface)](#schema-interface)
- [number constructors](#number-constructors)
  - [Finite](#finite)
  - [Int](#int)
  - [JsonNumber](#jsonnumber)
  - [Negative](#negative)
  - [NonNaN](#nonnan)
  - [NonNegative](#nonnegative)
  - [NonPositive](#nonpositive)
  - [NumberFromString](#numberfromstring)
  - [Positive](#positive)
- [number filters](#number-filters)
  - [between](#between)
  - [finite](#finite-1)
  - [greaterThan](#greaterthan)
  - [greaterThanOrEqualTo](#greaterthanorequalto)
  - [int](#int-1)
  - [lessThan](#lessthan)
  - [lessThanOrEqualTo](#lessthanorequalto)
  - [multipleOf](#multipleof)
  - [negative](#negative-1)
  - [nonNaN](#nonnan-1)
  - [nonNegative](#nonnegative-1)
  - [nonPositive](#nonpositive-1)
  - [positive](#positive-1)
- [number transformations](#number-transformations)
  - [clamp](#clamp)
  - [numberFromString](#numberfromstring-1)
- [parsing](#parsing)
  - [parse](#parse)
  - [parseEither](#parseeither)
  - [parseOption](#parseoption)
  - [parsePromise](#parsepromise)
  - [parseSync](#parsesync)
- [primitives](#primitives)
  - [any](#any)
  - [bigintFromSelf](#bigintfromself)
  - [boolean](#boolean)
  - [never](#never)
  - [null](#null)
  - [number](#number)
  - [object](#object)
  - [string](#string)
  - [symbolFromSelf](#symbolfromself)
  - [undefined](#undefined)
  - [unknown](#unknown)
  - [void](#void)
- [renaming](#renaming)
  - [rename](#rename)
- [string constructors](#string-constructors)
  - [NonEmpty](#nonempty)
  - [ParseJson](#parsejson)
  - [Trim](#trim)
  - [Trimmed](#trimmed)
  - [ULID](#ulid)
  - [UUID](#uuid)
- [string filters](#string-filters)
  - [endsWith](#endswith)
  - [includes](#includes)
  - [length](#length)
  - [lowercased](#lowercased)
  - [maxLength](#maxlength)
  - [minLength](#minlength)
  - [nonEmpty](#nonempty-1)
  - [pattern](#pattern)
  - [startsWith](#startswith)
  - [trimmed](#trimmed-1)
  - [uppercased](#uppercased)
- [string transformations](#string-transformations)
  - [Lowercase](#lowercase)
  - [Uppercase](#uppercase)
  - [lowercase](#lowercase-1)
  - [parseJson](#parsejson-1)
  - [split](#split)
  - [trim](#trim-1)
  - [uppercase](#uppercase-1)
- [symbol](#symbol)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [symbol constructors](#symbol-constructors)
  - [symbol](#symbol-1)
- [symbol transformations](#symbol-transformations)
  - [symbolFromString](#symbolfromstring)
- [type id](#type-id)
  - [BetweenBigDecimalTypeId](#betweenbigdecimaltypeid)
  - [BetweenBigintTypeId](#betweenbiginttypeid)
  - [BetweenBigintTypeId (type alias)](#betweenbiginttypeid-type-alias)
  - [BetweenTypeId](#betweentypeid)
  - [BetweenTypeId (type alias)](#betweentypeid-type-alias)
  - [BrandTypeId](#brandtypeid)
  - [EndsWithTypeId](#endswithtypeid)
  - [FiniteTypeId](#finitetypeid)
  - [GreaterThanBigDecimalTypeId](#greaterthanbigdecimaltypeid)
  - [GreaterThanBigintTypeId](#greaterthanbiginttypeid)
  - [GreaterThanBigintTypeId (type alias)](#greaterthanbiginttypeid-type-alias)
  - [GreaterThanOrEqualToBigDecimalTypeId](#greaterthanorequaltobigdecimaltypeid)
  - [GreaterThanOrEqualToBigintTypeId](#greaterthanorequaltobiginttypeid)
  - [GreaterThanOrEqualToBigintTypeId (type alias)](#greaterthanorequaltobiginttypeid-type-alias)
  - [GreaterThanOrEqualToTypeId](#greaterthanorequaltotypeid)
  - [GreaterThanOrEqualToTypeId (type alias)](#greaterthanorequaltotypeid-type-alias)
  - [GreaterThanTypeId](#greaterthantypeid)
  - [GreaterThanTypeId (type alias)](#greaterthantypeid-type-alias)
  - [IncludesTypeId](#includestypeid)
  - [InstanceOfTypeId](#instanceoftypeid)
  - [IntTypeId](#inttypeid)
  - [IntTypeId (type alias)](#inttypeid-type-alias)
  - [ItemsCountTypeId](#itemscounttypeid)
  - [ItemsCountTypeId (type alias)](#itemscounttypeid-type-alias)
  - [JsonNumberTypeId](#jsonnumbertypeid)
  - [LengthTypeId](#lengthtypeid)
  - [LengthTypeId (type alias)](#lengthtypeid-type-alias)
  - [LessThanBigDecimalTypeId](#lessthanbigdecimaltypeid)
  - [LessThanBigintTypeId](#lessthanbiginttypeid)
  - [LessThanBigintTypeId (type alias)](#lessthanbiginttypeid-type-alias)
  - [LessThanOrEqualToBigDecimalTypeId](#lessthanorequaltobigdecimaltypeid)
  - [LessThanOrEqualToBigintTypeId](#lessthanorequaltobiginttypeid)
  - [LessThanOrEqualToBigintTypeId (type alias)](#lessthanorequaltobiginttypeid-type-alias)
  - [LessThanOrEqualToTypeId](#lessthanorequaltotypeid)
  - [LessThanOrEqualToTypeId (type alias)](#lessthanorequaltotypeid-type-alias)
  - [LessThanTypeId](#lessthantypeid)
  - [LessThanTypeId (type alias)](#lessthantypeid-type-alias)
  - [LowercasedTypeId](#lowercasedtypeid)
  - [MaxItemsTypeId](#maxitemstypeid)
  - [MaxItemsTypeId (type alias)](#maxitemstypeid-type-alias)
  - [MaxLengthTypeId](#maxlengthtypeid)
  - [MaxLengthTypeId (type alias)](#maxlengthtypeid-type-alias)
  - [MinItemsTypeId](#minitemstypeid)
  - [MinItemsTypeId (type alias)](#minitemstypeid-type-alias)
  - [MinLengthTypeId](#minlengthtypeid)
  - [MinLengthTypeId (type alias)](#minlengthtypeid-type-alias)
  - [MultipleOfTypeId](#multipleoftypeid)
  - [NegativeBigDecimalTypeId](#negativebigdecimaltypeid)
  - [NonNaNTypeId](#nonnantypeid)
  - [NonNegativeBigDecimalTypeId](#nonnegativebigdecimaltypeid)
  - [NonPositiveBigDecimalTypeId](#nonpositivebigdecimaltypeid)
  - [PatternTypeId](#patterntypeid)
  - [PositiveBigDecimalTypeId](#positivebigdecimaltypeid)
  - [StartsWithTypeId](#startswithtypeid)
  - [TrimmedTypeId](#trimmedtypeid)
  - [ULIDTypeId](#ulidtypeid)
  - [UUIDTypeId](#uuidtypeid)
  - [UppercasedTypeId](#uppercasedtypeid)
  - [ValidDateTypeId](#validdatetypeid)
- [utils](#utils)
  - [DocAnnotations (interface)](#docannotations-interface)
  - [FilterAnnotations (interface)](#filterannotations-interface)
  - [FromOptionalKeys (type alias)](#fromoptionalkeys-type-alias)
  - [FromStruct (type alias)](#fromstruct-type-alias)
  - [Join (type alias)](#join-type-alias)
  - [Mutable (type alias)](#mutable-type-alias)
  - [OptionalPropertySignature (interface)](#optionalpropertysignature-interface)
  - [PropertySignature (interface)](#propertysignature-interface)
  - [Schema (namespace)](#schema-namespace)
    - [Variance (interface)](#variance-interface)
    - [From (type alias)](#from-type-alias)
    - [To (type alias)](#to-type-alias)
    - [ToAsserts (type alias)](#toasserts-type-alias)
  - [StructFields (type alias)](#structfields-type-alias)
  - [ToOptionalKeys (type alias)](#tooptionalkeys-type-alias)
  - [ToStruct (type alias)](#tostruct-type-alias)
  - [from](#from)
  - [optional](#optional)
  - [propertySignature](#propertysignature)
  - [readonlyMapFromSelf](#readonlymapfromself)
  - [to](#to)
- [validation](#validation)
  - [asserts](#asserts)
  - [is](#is)
  - [validate](#validate)
  - [validateEither](#validateeither)
  - [validateOption](#validateoption)
  - [validatePromise](#validatepromise)
  - [validateSync](#validatesync)

---

# BigDecimal constructors

## BigDecimal

**Signature**

```ts
export declare const BigDecimal: Schema<string, BigDecimal.BigDecimal>
```

Added in v1.0.0

## BigDecimalFromNumber

A schema that transforms a `number` into a `BigDecimal`.
When encoding, this Schema will produce incorrect results if the BigDecimal exceeds the 64-bit range of a number.

**Signature**

```ts
export declare const BigDecimalFromNumber: Schema<number, BigDecimal.BigDecimal>
```

Added in v1.0.0

## BigDecimalFromSelf

**Signature**

```ts
export declare const BigDecimalFromSelf: Schema<BigDecimal.BigDecimal, BigDecimal.BigDecimal>
```

Added in v1.0.0

## bigDecimalFromNumber

A schema that transforms a `number` into a `BigDecimal`.
When encoding, this Schema will produce incorrect results if the BigDecimal exceeds the 64-bit range of a number.

**Signature**

```ts
export declare const bigDecimalFromNumber: <I, A extends number>(self: Schema<I, A>) => Schema<I, BigDecimal.BigDecimal>
```

Added in v1.0.0

## bigDecimalFromString

A schema that transforms a `string` into a `BigDecimal`.

**Signature**

```ts
export declare const bigDecimalFromString: <I, A extends string>(self: Schema<I, A>) => Schema<I, BigDecimal.BigDecimal>
```

Added in v1.0.0

# BigDecimal filters

## betweenBigDecimal

**Signature**

```ts
export declare const betweenBigDecimal: <A extends BigDecimal.BigDecimal>(
  minimum: BigDecimal.BigDecimal,
  maximum: BigDecimal.BigDecimal,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## greaterThanBigDecimal

**Signature**

```ts
export declare const greaterThanBigDecimal: <A extends BigDecimal.BigDecimal>(
  min: BigDecimal.BigDecimal,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## greaterThanOrEqualToBigDecimal

**Signature**

```ts
export declare const greaterThanOrEqualToBigDecimal: <A extends BigDecimal.BigDecimal>(
  min: BigDecimal.BigDecimal,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## lessThanBigDecimal

**Signature**

```ts
export declare const lessThanBigDecimal: <A extends BigDecimal.BigDecimal>(
  max: BigDecimal.BigDecimal,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## lessThanOrEqualToBigDecimal

**Signature**

```ts
export declare const lessThanOrEqualToBigDecimal: <A extends BigDecimal.BigDecimal>(
  max: BigDecimal.BigDecimal,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## negativeBigDecimal

**Signature**

```ts
export declare const negativeBigDecimal: <A extends BigDecimal.BigDecimal>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## nonNegativeBigDecimal

**Signature**

```ts
export declare const nonNegativeBigDecimal: <A extends BigDecimal.BigDecimal>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## nonPositiveBigDecimal

**Signature**

```ts
export declare const nonPositiveBigDecimal: <A extends BigDecimal.BigDecimal>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## positiveBigDecimal

**Signature**

```ts
export declare const positiveBigDecimal: <A extends BigDecimal.BigDecimal>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

# BigDecimal transformations

## clampBigDecimal

Clamps a `BigDecimal` between a minimum and a maximum value.

**Signature**

```ts
export declare const clampBigDecimal: (
  minimum: BigDecimal.BigDecimal,
  maximum: BigDecimal.BigDecimal
) => <I, A extends BigDecimal.BigDecimal>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## negateBigDecimal

Negates a `BigDecimal`.

**Signature**

```ts
export declare const negateBigDecimal: <I, A extends BigDecimal.BigDecimal>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

# Cause

## CauseFrom (type alias)

**Signature**

```ts
export type CauseFrom<E> =
  | {
      readonly _tag: "Die"
      readonly defect: unknown
    }
  | {
      readonly _tag: "Empty"
    }
  | {
      readonly _tag: "Fail"
      readonly error: E
    }
  | {
      readonly _tag: "Interrupt"
      readonly fiberId: FiberIdFrom
    }
  | {
      readonly _tag: "Parallel"
      readonly left: CauseFrom<E>
      readonly right: CauseFrom<E>
    }
  | {
      readonly _tag: "Sequential"
      readonly left: CauseFrom<E>
      readonly right: CauseFrom<E>
    }
```

Added in v1.0.0

## CauseTo (type alias)

**Signature**

```ts
export type CauseTo<E> =
  | {
      readonly _tag: "Die"
      readonly defect: unknown
    }
  | {
      readonly _tag: "Empty"
    }
  | {
      readonly _tag: "Fail"
      readonly error: E
    }
  | {
      readonly _tag: "Interrupt"
      readonly fiberId: FiberId.FiberId
    }
  | {
      readonly _tag: "Parallel"
      readonly left: CauseTo<E>
      readonly right: CauseTo<E>
    }
  | {
      readonly _tag: "Sequential"
      readonly left: CauseTo<E>
      readonly right: CauseTo<E>
    }
```

Added in v1.0.0

## cause

**Signature**

```ts
export declare const cause: <EI, E>(error: Schema<EI, E>) => Schema<CauseFrom<EI>, Cause.Cause<E>>
```

Added in v1.0.0

## causeFromSelf

**Signature**

```ts
export declare const causeFromSelf: <IE, E>(error: Schema<IE, E>) => Schema<Cause.Cause<IE>, Cause.Cause<E>>
```

Added in v1.0.0

# Chunk transformations

## chunk

**Signature**

```ts
export declare const chunk: <I, A>(item: Schema<I, A>) => Schema<readonly I[], Chunk.Chunk<A>>
```

Added in v1.0.0

## chunkFromSelf

**Signature**

```ts
export declare const chunkFromSelf: <I, A>(item: Schema<I, A>) => Schema<Chunk.Chunk<I>, Chunk.Chunk<A>>
```

Added in v1.0.0

# Data transformations

## data

**Signature**

```ts
export declare const data: <
  I extends readonly any[] | Readonly<Record<string, any>>,
  A extends readonly any[] | Readonly<Record<string, any>>
>(
  item: Schema<I, A>
) => Schema<I, Data.Data<A>>
```

Added in v1.0.0

## dataFromSelf

**Signature**

```ts
export declare const dataFromSelf: <
  I extends readonly any[] | Readonly<Record<string, any>>,
  A extends readonly any[] | Readonly<Record<string, any>>
>(
  item: Schema<I, A>
) => Schema<Data.Data<I>, Data.Data<A>>
```

Added in v1.0.0

# Date constructors

## Date

A schema that transforms a `string` into a **valid** `Date`, ensuring that invalid dates, such as `new Date("Invalid Date")`, are rejected.

**Signature**

```ts
export declare const Date: Schema<string, Date>
```

Added in v1.0.0

## DateFromSelf

Represents a schema for handling potentially **invalid** `Date` instances (e.g., `new Date("Invalid Date")` is not rejected).

**Signature**

```ts
export declare const DateFromSelf: Schema<Date, Date>
```

Added in v1.0.0

## DateFromString

Represents a schema that converts a `string` into a (potentially invalid) `Date` (e.g., `new Date("Invalid Date")` is not rejected).

**Signature**

```ts
export declare const DateFromString: Schema<string, Date>
```

Added in v1.0.0

## ValidDateFromSelf

Represents a schema for handling only **valid** dates. For example, `new Date("Invalid Date")` is rejected, even though it is an instance of `Date`.

**Signature**

```ts
export declare const ValidDateFromSelf: Schema<Date, Date>
```

Added in v1.0.0

# Date filters

## validDate

A filter that **excludes invalid** dates (e.g., `new Date("Invalid Date")` is rejected).

**Signature**

```ts
export declare const validDate: (options?: FilterAnnotations<Date>) => <I>(self: Schema<I, Date>) => Schema<I, Date>
```

Added in v1.0.0

# Date transformations

## dateFromString

A combinator that converts a `string` into a potentially **invalid** `Date` (e.g., `new Date("Invalid Date")` is not rejected).

**Signature**

```ts
export declare const dateFromString: <I, A extends string>(self: Schema<I, A>) => Schema<I, Date>
```

Added in v1.0.0

# Duration constructors

## Duration

A schema that transforms a `[number, number]` tuple into a `Duration`.

**Signature**

```ts
export declare const Duration: Schema<readonly [seconds: number, nanos: number], Duration.Duration>
```

Added in v1.0.0

## DurationFromSelf

**Signature**

```ts
export declare const DurationFromSelf: Schema<Duration.Duration, Duration.Duration>
```

Added in v1.0.0

# Duration transformations

## durationFromHrTime

A combinator that transforms a `[number, number]` tuple into a `Duration`.

**Signature**

```ts
export declare const durationFromHrTime: <I, A extends readonly [seconds: number, nanos: number]>(
  self: Schema<I, A>
) => Schema<I, Duration.Duration>
```

Added in v1.0.0

# Either transformations

## EitherFrom (type alias)

**Signature**

```ts
export type EitherFrom<IE, IA> =
  | {
      readonly _tag: "Left"
      readonly left: IE
    }
  | {
      readonly _tag: "Right"
      readonly right: IA
    }
```

Added in v1.0.0

## either

**Signature**

```ts
export declare const either: <IE, E, IA, A>(
  left: Schema<IE, E>,
  right: Schema<IA, A>
) => Schema<EitherFrom<IE, IA>, Either.Either<E, A>>
```

Added in v1.0.0

## eitherFromSelf

**Signature**

```ts
export declare const eitherFromSelf: <IE, E, IA, A>(
  left: Schema<IE, E>,
  right: Schema<IA, A>
) => Schema<Either.Either<IE, IA>, Either.Either<E, A>>
```

Added in v1.0.0

# Exit

## ExitFrom (type alias)

**Signature**

```ts
export type ExitFrom<E, A> =
  | {
      readonly _tag: "Failure"
      readonly cause: CauseFrom<E>
    }
  | {
      readonly _tag: "Success"
      readonly value: A
    }
```

Added in v1.0.0

## exit

**Signature**

```ts
export declare const exit: <IE, E, IA, A>(
  error: Schema<IE, E>,
  value: Schema<IA, A>
) => Schema<ExitFrom<IE, IA>, Exit.Exit<E, A>>
```

Added in v1.0.0

## exitFromSelf

**Signature**

```ts
export declare const exitFromSelf: <IE, E, IA, A>(
  error: Schema<IE, E>,
  value: Schema<IA, A>
) => Schema<Exit.Exit<IE, IA>, Exit.Exit<E, A>>
```

Added in v1.0.0

# Fiber id

## FiberId

**Signature**

```ts
export declare const FiberId: Schema<FiberIdFrom, FiberId.FiberId>
```

Added in v1.0.0

## FiberIdFrom (type alias)

**Signature**

```ts
export type FiberIdFrom =
  | {
      readonly _tag: "Composite"
      readonly left: FiberIdFrom
      readonly right: FiberIdFrom
    }
  | {
      readonly _tag: "None"
    }
  | {
      readonly _tag: "Runtime"
      readonly id: number
      readonly startTimeMillis: number
    }
```

Added in v1.0.0

## FiberIdFromSelf

**Signature**

```ts
export declare const FiberIdFromSelf: Schema<FiberId.FiberId, FiberId.FiberId>
```

Added in v1.0.0

# Option transformations

## OptionFrom (type alias)

**Signature**

```ts
export type OptionFrom<I> =
  | {
      readonly _tag: "None"
    }
  | {
      readonly _tag: "Some"
      readonly value: I
    }
```

Added in v1.0.0

## option

**Signature**

```ts
export declare const option: <I, A>(value: Schema<I, A>) => Schema<OptionFrom<I>, Option.Option<A>>
```

Added in v1.0.0

## optionFromNullable

**Signature**

```ts
export declare const optionFromNullable: <I, A>(value: Schema<I, A>) => Schema<I | null, Option.Option<A>>
```

Added in v1.0.0

## optionFromSelf

**Signature**

```ts
export declare const optionFromSelf: <I, A>(value: Schema<I, A>) => Schema<Option.Option<I>, Option.Option<A>>
```

Added in v1.0.0

# ReadonlyArray filters

## itemsCount

**Signature**

```ts
export declare const itemsCount: <A>(
  n: number,
  options?: FilterAnnotations<readonly A[]> | undefined
) => <I>(self: Schema<I, readonly A[]>) => Schema<I, readonly A[]>
```

Added in v1.0.0

## maxItems

**Signature**

```ts
export declare const maxItems: <A>(
  n: number,
  options?: FilterAnnotations<readonly A[]> | undefined
) => <I>(self: Schema<I, readonly A[]>) => Schema<I, readonly A[]>
```

Added in v1.0.0

## minItems

**Signature**

```ts
export declare const minItems: <A>(
  n: number,
  options?: FilterAnnotations<readonly A[]> | undefined
) => <I>(self: Schema<I, readonly A[]>) => Schema<I, readonly A[]>
```

Added in v1.0.0

# ReadonlyMap transformations

## readonlyMap

**Signature**

```ts
export declare const readonlyMap: <IK, K, IV, V>(
  key: Schema<IK, K>,
  value: Schema<IV, V>
) => Schema<readonly (readonly [IK, IV])[], ReadonlyMap<K, V>>
```

Added in v1.0.0

# ReadonlySet transformations

## readonlySet

**Signature**

```ts
export declare const readonlySet: <I, A>(item: Schema<I, A>) => Schema<readonly I[], ReadonlySet<A>>
```

Added in v1.0.0

## readonlySetFromSelf

**Signature**

```ts
export declare const readonlySetFromSelf: <I, A>(item: Schema<I, A>) => Schema<ReadonlySet<I>, ReadonlySet<A>>
```

Added in v1.0.0

# Uint8Array constructors

## Uint8Array

A schema that transforms a `number` array into a `Uint8Array`.

**Signature**

```ts
export declare const Uint8Array: Schema<readonly number[], Uint8Array>
```

Added in v1.0.0

## Uint8ArrayFromSelf

**Signature**

```ts
export declare const Uint8ArrayFromSelf: Schema<Uint8Array, Uint8Array>
```

Added in v1.0.0

# Uint8Array transformations

## uint8ArrayFromNumbers

A combinator that transforms a `number` array into a `Uint8Array`.

**Signature**

```ts
export declare const uint8ArrayFromNumbers: <I, A extends readonly number[]>(
  self: Schema<I, A>
) => Schema<I, Uint8Array>
```

Added in v1.0.0

# annotations

## annotations

**Signature**

```ts
export declare const annotations: (
  annotations: AST.Annotated["annotations"]
) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## default

**Signature**

```ts
export declare const default: <A>(value: A) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## description

**Signature**

```ts
export declare const description: (description: AST.DescriptionAnnotation) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## documentation

**Signature**

```ts
export declare const documentation: (
  documentation: AST.DocumentationAnnotation
) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## equivalence

**Signature**

```ts
export declare const equivalence: <A>(
  equivalence: Equivalence.Equivalence<A>
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## examples

**Signature**

```ts
export declare const examples: (examples: AST.ExamplesAnnotation) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## identifier

**Signature**

```ts
export declare const identifier: (identifier: AST.IdentifierAnnotation) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## jsonSchema

**Signature**

```ts
export declare const jsonSchema: (jsonSchema: AST.JSONSchemaAnnotation) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## message

**Signature**

```ts
export declare const message: (message: AST.MessageAnnotation<unknown>) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## title

**Signature**

```ts
export declare const title: (title: AST.TitleAnnotation) => <I, A>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

# bigint constructors

## BigintFromNumber

This schema transforms a `number` into a `bigint` by parsing the number using the `BigInt` function.

It returns an error if the value can't be safely encoded as a `number` due to being out of range.

**Signature**

```ts
export declare const BigintFromNumber: Schema<number, bigint>
```

Added in v1.0.0

## NegativeBigint

**Signature**

```ts
export declare const NegativeBigint: Schema<string, bigint>
```

Added in v1.0.0

## NegativeBigintFromSelf

**Signature**

```ts
export declare const NegativeBigintFromSelf: Schema<bigint, bigint>
```

Added in v1.0.0

## NonNegativeBigint

**Signature**

```ts
export declare const NonNegativeBigint: Schema<string, bigint>
```

Added in v1.0.0

## NonNegativeBigintFromSelf

**Signature**

```ts
export declare const NonNegativeBigintFromSelf: Schema<bigint, bigint>
```

Added in v1.0.0

## NonPositiveBigint

**Signature**

```ts
export declare const NonPositiveBigint: Schema<string, bigint>
```

Added in v1.0.0

## NonPositiveBigintFromSelf

**Signature**

```ts
export declare const NonPositiveBigintFromSelf: Schema<bigint, bigint>
```

Added in v1.0.0

## PositiveBigint

**Signature**

```ts
export declare const PositiveBigint: Schema<string, bigint>
```

Added in v1.0.0

## PositiveBigintFromSelf

**Signature**

```ts
export declare const PositiveBigintFromSelf: Schema<bigint, bigint>
```

Added in v1.0.0

## bigint

This schema transforms a `string` into a `bigint` by parsing the string using the `BigInt` function.

It returns an error if the value can't be converted (for example when non-numeric characters are provided).

**Signature**

```ts
export declare const bigint: Schema<string, bigint>
```

Added in v1.0.0

# bigint filters

## betweenBigint

**Signature**

```ts
export declare const betweenBigint: <A extends bigint>(
  min: bigint,
  max: bigint,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## greaterThanBigint

**Signature**

```ts
export declare const greaterThanBigint: <A extends bigint>(
  min: bigint,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## greaterThanOrEqualToBigint

**Signature**

```ts
export declare const greaterThanOrEqualToBigint: <A extends bigint>(
  min: bigint,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## lessThanBigint

**Signature**

```ts
export declare const lessThanBigint: <A extends bigint>(
  max: bigint,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## lessThanOrEqualToBigint

**Signature**

```ts
export declare const lessThanOrEqualToBigint: <A extends bigint>(
  max: bigint,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## negativeBigint

**Signature**

```ts
export declare const negativeBigint: <A extends bigint>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## nonNegativeBigint

**Signature**

```ts
export declare const nonNegativeBigint: <A extends bigint>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## nonPositiveBigint

**Signature**

```ts
export declare const nonPositiveBigint: <A extends bigint>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## positiveBigint

**Signature**

```ts
export declare const positiveBigint: <A extends bigint>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

# bigint transformations

## bigintFromNumber

This combinator transforms a `number` into a `bigint` by parsing the number using the `BigInt` function.

It returns an error if the value can't be safely encoded as a `number` due to being out of range.

**Signature**

```ts
export declare const bigintFromNumber: <I, A extends number>(self: Schema<I, A>) => Schema<I, bigint>
```

Added in v1.0.0

## bigintFromString

This combinator transforms a `string` into a `bigint` by parsing the string using the `BigInt` function.

It returns an error if the value can't be converted (for example when non-numeric characters are provided).

**Signature**

```ts
export declare const bigintFromString: <I, A extends string>(self: Schema<I, A>) => Schema<I, bigint>
```

Added in v1.0.0

## clampBigint

Clamps a bigint between a minimum and a maximum value.

**Signature**

```ts
export declare const clampBigint: (
  minimum: bigint,
  maximum: bigint
) => <I, A extends bigint>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

# boolean constructors

## Not

**Signature**

```ts
export declare const Not: Schema<boolean, boolean>
```

Added in v1.0.0

# boolean transformations

## not

Negates a boolean value

**Signature**

```ts
export declare const not: <I>(self: Schema<I, boolean>) => Schema<I, boolean>
```

Added in v1.0.0

# classes

## Class

**Signature**

```ts
export declare const Class: <Self>() => <Fields extends StructFields>(
  fields: Fields
) => [unknown] extends [Self]
  ? "Missing `Self` generic - use `class Self extends Class<Self>()({ ... })`"
  : Class<Simplify<FromStruct<Fields>>, Simplify<ToStruct<Fields>>, Simplify<ToStruct<Fields>>, Self, Data.Case>
```

Added in v1.0.0

## Class (interface)

**Signature**

```ts
export interface Class<I, A, C, Self, Inherited = Data.Case> extends Schema<I, Self> {
  new (props: Equals<C, {}> extends true ? void | {} : C, disableValidation?: boolean): A & Omit<Inherited, keyof A>

  readonly struct: Schema<I, A>

  readonly extend: <Extended>() => <FieldsB extends StructFields>(
    fields: FieldsB
  ) => [unknown] extends [Extended]
    ? MissingSelfGeneric<"Base.extend">
    : Class<
        Simplify<Omit<I, keyof FieldsB> & FromStruct<FieldsB>>,
        Simplify<Omit<A, keyof FieldsB> & ToStruct<FieldsB>>,
        Simplify<Omit<C, keyof FieldsB> & ToStruct<FieldsB>>,
        Extended,
        Self
      >

  readonly transform: <Transformed>() => <FieldsB extends StructFields>(
    fields: FieldsB,
    decode: (input: A) => ParseResult.ParseResult<Omit<A, keyof FieldsB> & ToStruct<FieldsB>>,
    encode: (input: Simplify<Omit<A, keyof FieldsB> & ToStruct<FieldsB>>) => ParseResult.ParseResult<A>
  ) => [unknown] extends [Transformed]
    ? MissingSelfGeneric<"Base.transform">
    : Class<
        I,
        Simplify<Omit<A, keyof FieldsB> & ToStruct<FieldsB>>,
        Simplify<Omit<C, keyof FieldsB> & ToStruct<FieldsB>>,
        Transformed,
        Self
      >

  readonly transformFrom: <Transformed>() => <FieldsB extends StructFields>(
    fields: FieldsB,
    decode: (input: I) => ParseResult.ParseResult<Omit<I, keyof FieldsB> & FromStruct<FieldsB>>,
    encode: (input: Simplify<Omit<I, keyof FieldsB> & FromStruct<FieldsB>>) => ParseResult.ParseResult<I>
  ) => [unknown] extends [Transformed]
    ? MissingSelfGeneric<"Base.transformFrom">
    : Class<
        I,
        Simplify<Omit<A, keyof FieldsB> & ToStruct<FieldsB>>,
        Simplify<Omit<C, keyof FieldsB> & ToStruct<FieldsB>>,
        Transformed,
        Self
      >
}
```

Added in v1.0.0

## TaggedClass

**Signature**

```ts
export declare const TaggedClass: <Self>() => <Tag extends string, Fields extends StructFields>(
  tag: Tag,
  fields: Fields
) => [unknown] extends [Self]
  ? 'Missing `Self` generic - use `class Self extends TaggedClass<Self>()("Tag", { ... })`'
  : Class<
      Simplify<
        { readonly _tag: Tag } & {
          readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: Schema.From<Fields[K]>
        } & { readonly [K in FromOptionalKeys<Fields>]?: Schema.From<Fields[K]> | undefined }
      >,
      Simplify<
        { readonly _tag: Tag } & {
          readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: Schema.To<Fields[K]>
        } & { readonly [K in ToOptionalKeys<Fields>]?: Schema.To<Fields[K]> | undefined }
      >,
      Simplify<ToStruct<Fields>>,
      Self,
      Data.Case
    >
```

Added in v1.0.0

## TaggedError

**Signature**

```ts
export declare const TaggedError: <Self>() => <Tag extends string, Fields extends StructFields>(
  tag: Tag,
  fields: Fields
) => [unknown] extends [Self]
  ? 'Missing `Self` generic - use `class Self extends TaggedError<Self>()("Tag", { ... })`'
  : Class<
      Simplify<
        { readonly _tag: Tag } & {
          readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: Schema.From<Fields[K]>
        } & { readonly [K in FromOptionalKeys<Fields>]?: Schema.From<Fields[K]> | undefined }
      >,
      Simplify<
        { readonly _tag: Tag } & {
          readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: Schema.To<Fields[K]>
        } & { readonly [K in ToOptionalKeys<Fields>]?: Schema.To<Fields[K]> | undefined }
      >,
      Simplify<ToStruct<Fields>>,
      Self,
      Effect.Effect<never, Self, never> & Error
    >
```

Added in v1.0.0

## TaggedRequest

**Signature**

```ts
export declare const TaggedRequest: <Self>() => <Tag extends string, Fields extends StructFields, EI, EA, AI, AA>(
  tag: Tag,
  Failure: Schema<EI, EA>,
  Success: Schema<AI, AA>,
  fields: Fields
) => [unknown] extends [Self]
  ? 'Missing `Self` generic - use `class Self extends TaggedRequest<Self>()("Tag", SuccessSchema, FailureSchema, { ... })`'
  : Class<
      Simplify<
        { readonly _tag: Tag } & {
          readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: Schema.From<Fields[K]>
        } & { readonly [K in FromOptionalKeys<Fields>]?: Schema.From<Fields[K]> | undefined }
      >,
      Simplify<
        { readonly _tag: Tag } & {
          readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: Schema.To<Fields[K]>
        } & { readonly [K in ToOptionalKeys<Fields>]?: Schema.To<Fields[K]> | undefined }
      >,
      Simplify<ToStruct<Fields>>,
      Self,
      TaggedRequest<
        Tag,
        Simplify<
          { readonly _tag: Tag } & {
            readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: Schema.From<Fields[K]>
          } & { readonly [K in FromOptionalKeys<Fields>]?: Schema.From<Fields[K]> | undefined }
        >,
        Self,
        EI,
        EA,
        AI,
        AA
      >
    >
```

Added in v1.0.0

## TaggedRequest (interface)

**Signature**

```ts
export interface TaggedRequest<Tag extends string, IS, S, IE, E, IA, A>
  extends Request.Request<A, A>,
    Serializable.SerializableWithResult<IS, S, IE, E, IA, A> {
  readonly _tag: Tag
}
```

Added in v1.0.0

## TaggedRequest (namespace)

Added in v1.0.0

### Any (type alias)

**Signature**

```ts
export type Any = TaggedRequest<string, any, any, any, any, any, any>
```

Added in v1.0.0

# combinators

## array

**Signature**

```ts
export declare const array: <I, A>(item: Schema<I, A>) => Schema<readonly I[], readonly A[]>
```

Added in v1.0.0

## attachPropertySignature

Attaches a property signature with the specified key and value to the schema.
This API is useful when you want to add a property to your schema which doesn't describe the shape of the input,
but rather maps to another schema, for example when you want to add a discriminant to a simple union.

**Signature**

```ts
export declare const attachPropertySignature: {
  <K extends PropertyKey, V extends symbol | AST.LiteralValue>(
    key: K,
    value: V
  ): <I, A extends object>(schema: Schema<I, A>) => Schema<I, Simplify<A & { readonly [k in K]: V }>>
  <I, A, K extends PropertyKey, V extends symbol | AST.LiteralValue>(
    schema: Schema<I, A>,
    key: K,
    value: V
  ): Schema<I, Simplify<A & { readonly [k in K]: V }>>
}
```

**Example**

```ts
import * as S from "@effect/schema/Schema"
import { pipe } from "effect/Function"

const Circle = S.struct({ radius: S.number })
const Square = S.struct({ sideLength: S.number })
const Shape = S.union(
  Circle.pipe(S.attachPropertySignature("kind", "circle")),
  Square.pipe(S.attachPropertySignature("kind", "square"))
)

assert.deepStrictEqual(S.decodeSync(Shape)({ radius: 10 }), {
  kind: "circle",
  radius: 10
})
```

Added in v1.0.0

## brand

Returns a nominal branded schema by applying a brand to a given schema.

```
Schema<A> + B -> Schema<A & Brand<B>>
```

**Signature**

```ts
export declare const brand: <B extends string | symbol, A>(
  brand: B,
  options?: DocAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => BrandSchema<I, A & Brand.Brand<B>>
```

**Example**

```ts
import * as Schema from "@effect/schema/Schema"

const Int = Schema.number.pipe(Schema.int(), Schema.brand("Int"))
type Int = Schema.Schema.To<typeof Int> // number & Brand<"Int">
```

Added in v1.0.0

## compose

**Signature**

```ts
export declare const compose: {
  <C, D>(bc: Schema<C, D>): <A, B>(ab: Schema<A, B>) => Schema<A, D>
  <A, B, C, D>(ab: Schema<A, B>, cd: Schema<C, D>): Schema<A, D>
}
```

Added in v1.0.0

## element

**Signature**

```ts
export declare const element: <IE, E>(
  element: Schema<IE, E>
) => <I extends readonly any[], A extends readonly any[]>(
  self: Schema<I, A>
) => Schema<readonly [...I, IE], readonly [...A, E]>
```

Added in v1.0.0

## extend

**Signature**

```ts
export declare const extend: {
  <IB, B>(that: Schema<IB, B>): <I, A>(self: Schema<I, A>) => Schema<Simplify<I & IB>, Simplify<A & B>>
  <I, A, IB, B>(self: Schema<I, A>, that: Schema<IB, B>): Schema<Simplify<I & IB>, Simplify<A & B>>
}
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare function filter<C extends A, B extends A, A = C>(
  refinement: Predicate.Refinement<A, B>,
  options?: FilterAnnotations<A>
): <I>(self: Schema<I, C>) => Schema<I, C & B>
export declare function filter<B extends A, A = B>(
  predicate: Predicate.Predicate<A>,
  options?: FilterAnnotations<A>
): <I>(self: Schema<I, B>) => Schema<I, B>
```

Added in v1.0.0

## keyof

**Signature**

```ts
export declare const keyof: <I, A>(schema: Schema<I, A>) => Schema<keyof A, keyof A>
```

Added in v1.0.0

## lazy

**Signature**

```ts
export declare const lazy: <I, A = I>(f: () => Schema<I, A>, annotations?: AST.Annotated["annotations"]) => Schema<I, A>
```

Added in v1.0.0

## mutable

Creates a new schema with shallow mutability applied to its properties.

**Signature**

```ts
export declare const mutable: <I, A>(schema: Schema<I, A>) => Schema<Simplify<Mutable<I>>, Simplify<Mutable<A>>>
```

Added in v1.0.0

## nonEmptyArray

**Signature**

```ts
export declare const nonEmptyArray: <I, A>(item: Schema<I, A>) => Schema<readonly [I, ...I[]], readonly [A, ...A[]]>
```

Added in v1.0.0

## nullable

**Signature**

```ts
export declare const nullable: <From, To>(self: Schema<From, To>) => Schema<From | null, To | null>
```

Added in v1.0.0

## omit

**Signature**

```ts
export declare const omit: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => <I extends { [K in keyof A]?: any }>(
  self: Schema<I, A>
) => Schema<Simplify<Omit<I, Keys[number]>>, Simplify<Omit<A, Keys[number]>>>
```

Added in v1.0.0

## optionalElement

**Signature**

```ts
export declare const optionalElement: <IE, E>(
  element: Schema<IE, E>
) => <I extends readonly any[], A extends readonly any[]>(
  self: Schema<I, A>
) => Schema<readonly [...I, (IE | undefined)?], readonly [...A, (E | undefined)?]>
```

Added in v1.0.0

## partial

**Signature**

```ts
export declare const partial: <I, A>(self: Schema<I, A>) => Schema<Simplify<Partial<I>>, Simplify<Partial<A>>>
```

Added in v1.0.0

## pick

**Signature**

```ts
export declare const pick: <A, Keys extends readonly (keyof A)[]>(
  ...keys: Keys
) => <I extends { [K in keyof A]?: any }>(
  self: Schema<I, A>
) => Schema<Simplify<Pick<I, Keys[number]>>, Simplify<Pick<A, Keys[number]>>>
```

Added in v1.0.0

## record

**Signature**

```ts
export declare const record: <IK extends string | symbol, AK extends IK, IV, AV>(
  key: Schema<IK, AK>,
  value: Schema<IV, AV>
) => Schema<{ readonly [k in IK]: IV }, { readonly [k in AK]: AV }>
```

Added in v1.0.0

## required

**Signature**

```ts
export declare const required: <I, A>(self: Schema<I, A>) => Schema<Simplify<Required<I>>, Simplify<Required<A>>>
```

Added in v1.0.0

## rest

**Signature**

```ts
export declare const rest: <IR, R>(
  rest: Schema<IR, R>
) => <I extends readonly any[], A extends readonly any[]>(
  self: Schema<I, A>
) => Schema<readonly [...I, ...IR[]], readonly [...A, ...R[]]>
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <Fields extends StructFields>(
  fields: Fields
) => Schema<Simplify<FromStruct<Fields>>, Simplify<ToStruct<Fields>>>
```

Added in v1.0.0

## transform

Create a new `Schema` by transforming the input and output of an existing `Schema`
using the provided mapping functions.

**Signature**

```ts
export declare const transform: {
  <C, D, B>(
    to: Schema<C, D>,
    decode: (b: B, options: ParseOptions, ast: AST.AST) => C,
    encode: (c: C, options: ParseOptions, ast: AST.AST) => B
  ): <A>(self: Schema<A, B>) => Schema<A, D>
  <C, D, B>(
    to: Schema<C, D>,
    decode: (b: B, options: ParseOptions, ast: AST.AST) => unknown,
    encode: (c: C, options: ParseOptions, ast: AST.AST) => unknown,
    options: { strict: false }
  ): <A>(self: Schema<A, B>) => Schema<A, D>
  <A, B, C, D>(
    from: Schema<A, B>,
    to: Schema<C, D>,
    decode: (b: B, options: ParseOptions, ast: AST.AST) => C,
    encode: (c: C, options: ParseOptions, ast: AST.AST) => B
  ): Schema<A, D>
  <A, B, C, D>(
    from: Schema<A, B>,
    to: Schema<C, D>,
    decode: (b: B, options: ParseOptions, ast: AST.AST) => unknown,
    encode: (c: C, options: ParseOptions, ast: AST.AST) => unknown,
    options: { strict: false }
  ): Schema<A, D>
}
```

Added in v1.0.0

## transformOrFail

Create a new `Schema` by transforming the input and output of an existing `Schema`
using the provided decoding functions.

**Signature**

```ts
export declare const transformOrFail: {
  <C, D, B>(
    to: Schema<C, D>,
    decode: (b: B, options: ParseOptions, ast: AST.AST) => ParseResult.ParseResult<C>,
    encode: (c: C, options: ParseOptions, ast: AST.AST) => ParseResult.ParseResult<B>
  ): <A>(self: Schema<A, B>) => Schema<A, D>
  <C, D, B>(
    to: Schema<C, D>,
    decode: (b: B, options: ParseOptions, ast: AST.AST) => ParseResult.ParseResult<unknown>,
    encode: (c: C, options: ParseOptions, ast: AST.AST) => ParseResult.ParseResult<unknown>,
    options: { strict: false }
  ): <A>(self: Schema<A, B>) => Schema<A, D>
  <A, B, C, D>(
    from: Schema<A, B>,
    to: Schema<C, D>,
    decode: (b: B, options: ParseOptions, ast: AST.AST) => ParseResult.ParseResult<C>,
    encode: (c: C, options: ParseOptions, ast: AST.AST) => ParseResult.ParseResult<B>
  ): Schema<A, D>
  <A, B, C, D>(
    from: Schema<A, B>,
    to: Schema<C, D>,
    decode: (b: B, options: ParseOptions, ast: AST.AST) => ParseResult.ParseResult<unknown>,
    encode: (c: C, options: ParseOptions, ast: AST.AST) => ParseResult.ParseResult<unknown>,
    options: { strict: false }
  ): Schema<A, D>
}
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <Elements extends readonly Schema<any, any>[]>(
  ...elements: Elements
) => Schema<
  { readonly [K in keyof Elements]: Schema.From<Elements[K]> },
  { readonly [K in keyof Elements]: Schema.To<Elements[K]> }
>
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: <Members extends readonly Schema<any, any>[]>(
  ...members: Members
) => Schema<Schema.From<Members[number]>, Schema.To<Members[number]>>
```

Added in v1.0.0

# constructors

## declare

**Signature**

```ts
export declare const declare: (
  typeParameters: ReadonlyArray<Schema<any>>,
  type: Schema<any>,
  decode: (
    isDecoding: boolean,
    ...typeParameters: ReadonlyArray<Schema<any>>
  ) => (input: any, options: ParseOptions, ast: AST.AST) => ParseResult.ParseResult<any>,
  annotations?: AST.Annotated["annotations"]
) => Schema<any>
```

Added in v1.0.0

## enums

**Signature**

```ts
export declare const enums: <A extends { [x: string]: string | number }>(enums: A) => Schema<A[keyof A], A[keyof A]>
```

Added in v1.0.0

## fromBrand

**Signature**

```ts
export declare const fromBrand: <C extends Brand.Brand<string | symbol>>(
  constructor: Brand.Brand.Constructor<C>,
  options?: FilterAnnotations<Brand.Brand.Unbranded<C>> | undefined
) => <I, A extends Brand.Brand.Unbranded<C>>(self: Schema<I, A>) => Schema<I, A & C>
```

Added in v1.0.0

## instanceOf

**Signature**

```ts
export declare const instanceOf: <A extends abstract new (...args: any) => any>(
  constructor: A,
  options?: FilterAnnotations<InstanceType<A>> | undefined
) => Schema<InstanceType<A>, InstanceType<A>>
```

Added in v1.0.0

## literal

**Signature**

```ts
export declare const literal: <Literals extends readonly AST.LiteralValue[]>(
  ...literals: Literals
) => Schema<Literals[number], Literals[number]>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <I, A>(ast: AST.AST) => Schema<I, A>
```

Added in v1.0.0

## templateLiteral

**Signature**

```ts
export declare const templateLiteral: <T extends [Schema<any, any>, ...Schema<any, any>[]]>(
  ...[head, ...tail]: T
) => Schema<Join<{ [K in keyof T]: Schema.To<T[K]> }>, Join<{ [K in keyof T]: Schema.To<T[K]> }>>
```

Added in v1.0.0

## uniqueSymbol

**Signature**

```ts
export declare const uniqueSymbol: <S extends symbol>(
  symbol: S,
  annotations?: AST.Annotated["annotations"]
) => Schema<S, S>
```

Added in v1.0.0

# decoding

## decode

**Signature**

```ts
export declare const decode: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => Effect.Effect<never, ParseResult.ParseError, A>
```

Added in v1.0.0

## decodeEither

**Signature**

```ts
export declare const decodeEither: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => Either.Either<ParseResult.ParseError, A>
```

Added in v1.0.0

## decodeOption

**Signature**

```ts
export declare const decodeOption: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => Option.Option<A>
```

Added in v1.0.0

## decodePromise

**Signature**

```ts
export declare const decodePromise: <I, A>(
  schema: Schema<I, A>
) => (i: I, options?: ParseOptions | undefined) => Promise<A>
```

Added in v1.0.0

## decodeSync

**Signature**

```ts
export declare const decodeSync: <I, A>(schema: Schema<I, A>) => (i: I, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

# encoding

## encode

**Signature**

```ts
export declare const encode: <I, A>(
  schema: Schema<I, A>
) => (a: A, options?: ParseOptions | undefined) => Effect.Effect<never, ParseResult.ParseError, I>
```

Added in v1.0.0

## encodeEither

**Signature**

```ts
export declare const encodeEither: <I, A>(
  schema: Schema<I, A>
) => (a: A, options?: ParseOptions | undefined) => Either.Either<ParseResult.ParseError, I>
```

Added in v1.0.0

## encodeOption

**Signature**

```ts
export declare const encodeOption: <I, A>(
  schema: Schema<I, A>
) => (input: A, options?: ParseOptions | undefined) => Option.Option<I>
```

Added in v1.0.0

## encodePromise

**Signature**

```ts
export declare const encodePromise: <I, A>(
  schema: Schema<I, A>
) => (a: A, options?: ParseOptions | undefined) => Promise<I>
```

Added in v1.0.0

## encodeSync

**Signature**

```ts
export declare const encodeSync: <I, A>(schema: Schema<I, A>) => (a: A, options?: ParseOptions | undefined) => I
```

Added in v1.0.0

# encoding constructors

## Base64

**Signature**

```ts
export declare const Base64: Schema<string, Uint8Array>
```

Added in v1.0.0

## Base64Url

**Signature**

```ts
export declare const Base64Url: Schema<string, Uint8Array>
```

Added in v1.0.0

## Hex

**Signature**

```ts
export declare const Hex: Schema<string, Uint8Array>
```

Added in v1.0.0

# encoding transformations

## base64

Transforms a base64 `string` into a `Uint8Array`.

**Signature**

```ts
export declare const base64: <I, A extends string>(self: Schema<I, A>) => Schema<I, Uint8Array>
```

Added in v1.0.0

## base64url

Transforms a base64url `string` into a `Uint8Array`.

**Signature**

```ts
export declare const base64url: <I, A extends string>(self: Schema<I, A>) => Schema<I, Uint8Array>
```

Added in v1.0.0

## hex

Transforms a hex `string` into a `Uint8Array`.

**Signature**

```ts
export declare const hex: <I, A extends string>(self: Schema<I, A>) => Schema<I, Uint8Array>
```

Added in v1.0.0

# guards

## isSchema

Tests if a value is a `Schema`.

**Signature**

```ts
export declare const isSchema: (u: unknown) => u is Schema<unknown, unknown>
```

Added in v1.0.0

# model

## BrandSchema (interface)

**Signature**

```ts
export interface BrandSchema<From, To extends Brand.Brand<any>> extends Schema<From, To>, Brand.Brand.Constructor<To> {}
```

Added in v1.0.0

## Schema (interface)

**Signature**

```ts
export interface Schema<From, To = From> extends Schema.Variance<From, To>, Pipeable {
  readonly ast: AST.AST
}
```

Added in v1.0.0

# number constructors

## Finite

**Signature**

```ts
export declare const Finite: Schema<number, number>
```

Added in v1.0.0

## Int

**Signature**

```ts
export declare const Int: Schema<number, number>
```

Added in v1.0.0

## JsonNumber

The `JsonNumber` is a schema for representing JSON numbers. It ensures that the provided value is a valid
number by filtering out `NaN` and `(+/-) Infinity`. This is useful when you want to validate and represent numbers in JSON
format.

**Signature**

```ts
export declare const JsonNumber: Schema<number, number>
```

**Example**

```ts
import * as S from "@effect/schema/Schema"

const is = S.is(S.JsonNumber)

assert.deepStrictEqual(is(42), true)
assert.deepStrictEqual(is(Number.NaN), false)
assert.deepStrictEqual(is(Number.POSITIVE_INFINITY), false)
assert.deepStrictEqual(is(Number.NEGATIVE_INFINITY), false)
```

Added in v1.0.0

## Negative

**Signature**

```ts
export declare const Negative: Schema<number, number>
```

Added in v1.0.0

## NonNaN

**Signature**

```ts
export declare const NonNaN: Schema<number, number>
```

Added in v1.0.0

## NonNegative

**Signature**

```ts
export declare const NonNegative: Schema<number, number>
```

Added in v1.0.0

## NonPositive

**Signature**

```ts
export declare const NonPositive: Schema<number, number>
```

Added in v1.0.0

## NumberFromString

This schema transforms a `string` into a `number` by parsing the string using the `Number` function.

It returns an error if the value can't be converted (for example when non-numeric characters are provided).

The following special string values are supported: "NaN", "Infinity", "-Infinity".

**Signature**

```ts
export declare const NumberFromString: Schema<string, number>
```

Added in v1.0.0

## Positive

**Signature**

```ts
export declare const Positive: Schema<number, number>
```

Added in v1.0.0

# number filters

## between

**Signature**

```ts
export declare const between: <A extends number>(
  min: number,
  max: number,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## finite

**Signature**

```ts
export declare const finite: <A extends number>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## greaterThan

**Signature**

```ts
export declare const greaterThan: <A extends number>(
  min: number,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## greaterThanOrEqualTo

**Signature**

```ts
export declare const greaterThanOrEqualTo: <A extends number>(
  min: number,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## int

**Signature**

```ts
export declare const int: <A extends number>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## lessThan

**Signature**

```ts
export declare const lessThan: <A extends number>(
  max: number,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## lessThanOrEqualTo

**Signature**

```ts
export declare const lessThanOrEqualTo: <A extends number>(
  max: number,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## multipleOf

**Signature**

```ts
export declare const multipleOf: <A extends number>(
  divisor: number,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## negative

**Signature**

```ts
export declare const negative: <A extends number>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## nonNaN

**Signature**

```ts
export declare const nonNaN: <A extends number>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## nonNegative

**Signature**

```ts
export declare const nonNegative: <A extends number>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## nonPositive

**Signature**

```ts
export declare const nonPositive: <A extends number>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## positive

**Signature**

```ts
export declare const positive: <A extends number>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

# number transformations

## clamp

Clamps a number between a minimum and a maximum value.

**Signature**

```ts
export declare const clamp: (
  minimum: number,
  maximum: number
) => <I, A extends number>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## numberFromString

This combinator transforms a `string` into a `number` by parsing the string using the `Number` function.

It returns an error if the value can't be converted (for example when non-numeric characters are provided).

The following special string values are supported: "NaN", "Infinity", "-Infinity".

**Signature**

```ts
export declare const numberFromString: <I, A extends string>(self: Schema<I, A>) => Schema<I, number>
```

Added in v1.0.0

# parsing

## parse

**Signature**

```ts
export declare const parse: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => Effect.Effect<never, ParseResult.ParseError, A>
```

Added in v1.0.0

## parseEither

**Signature**

```ts
export declare const parseEither: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => Either.Either<ParseResult.ParseError, A>
```

Added in v1.0.0

## parseOption

**Signature**

```ts
export declare const parseOption: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => Option.Option<A>
```

Added in v1.0.0

## parsePromise

**Signature**

```ts
export declare const parsePromise: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => Promise<A>
```

Added in v1.0.0

## parseSync

**Signature**

```ts
export declare const parseSync: <_, A>(schema: Schema<_, A>) => (i: unknown, options?: ParseOptions | undefined) => A
```

Added in v1.0.0

# primitives

## any

**Signature**

```ts
export declare const any: Schema<any, any>
```

Added in v1.0.0

## bigintFromSelf

**Signature**

```ts
export declare const bigintFromSelf: Schema<bigint, bigint>
```

Added in v1.0.0

## boolean

**Signature**

```ts
export declare const boolean: Schema<boolean, boolean>
```

Added in v1.0.0

## never

**Signature**

```ts
export declare const never: Schema<never, never>
```

Added in v1.0.0

## null

**Signature**

```ts
export declare const null: Schema<null, null>
```

Added in v1.0.0

## number

**Signature**

```ts
export declare const number: Schema<number, number>
```

Added in v1.0.0

## object

**Signature**

```ts
export declare const object: Schema<object, object>
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: Schema<string, string>
```

Added in v1.0.0

## symbolFromSelf

**Signature**

```ts
export declare const symbolFromSelf: Schema<symbol, symbol>
```

Added in v1.0.0

## undefined

**Signature**

```ts
export declare const undefined: Schema<undefined, undefined>
```

Added in v1.0.0

## unknown

**Signature**

```ts
export declare const unknown: Schema<unknown, unknown>
```

Added in v1.0.0

## void

**Signature**

```ts
export declare const void: Schema<void, void>
```

Added in v1.0.0

# renaming

## rename

**Signature**

```ts
export declare const rename: {
  <
    A,
    const M extends { readonly [K in keyof A]?: PropertyKey | undefined } & {
      readonly [K in Exclude<keyof M, keyof A>]: never
    }
  >(
    mapping: M
  ): <I>(self: Schema<I, A>) => Schema<I, Simplify<Rename<A, M>>>
  <
    I,
    A,
    const M extends { readonly [K in keyof A]?: PropertyKey | undefined } & {
      readonly [K in Exclude<keyof M, keyof A>]: never
    }
  >(
    self: Schema<I, A>,
    mapping: M
  ): Schema<I, Simplify<Rename<A, M>>>
}
```

Added in v1.0.0

# string constructors

## NonEmpty

**Signature**

```ts
export declare const NonEmpty: Schema<string, string>
```

Added in v1.0.0

## ParseJson

The `ParseJson` schema offers a method to convert JSON strings into the `unknown` type using the underlying
functionality of `JSON.parse`. It also employs `JSON.stringify` for encoding.

**Signature**

```ts
export declare const ParseJson: Schema<string, unknown>
```

Added in v1.0.0

## Trim

This schema allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const Trim: Schema<string, string>
```

Added in v1.0.0

## Trimmed

**Signature**

```ts
export declare const Trimmed: Schema<string, string>
```

Added in v1.0.0

## ULID

**Signature**

```ts
export declare const ULID: Schema<string, string>
```

Added in v1.0.0

## UUID

**Signature**

```ts
export declare const UUID: Schema<string, string>
```

Added in v1.0.0

# string filters

## endsWith

**Signature**

```ts
export declare const endsWith: <A extends string>(
  endsWith: string,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## includes

**Signature**

```ts
export declare const includes: <A extends string>(
  searchString: string,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## length

**Signature**

```ts
export declare const length: <A extends string>(
  length: number,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## lowercased

Verifies that a string is lowercased

Note. This combinator does not make any transformations, it only validates.
If what you were looking for was a combinator to lowercase strings, then check out the `lowercase` combinator.

**Signature**

```ts
export declare const lowercased: <A extends string>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## maxLength

**Signature**

```ts
export declare const maxLength: <A extends string>(
  maxLength: number,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## minLength

**Signature**

```ts
export declare const minLength: <A extends string>(
  minLength: number,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## nonEmpty

**Signature**

```ts
export declare const nonEmpty: <A extends string>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## pattern

**Signature**

```ts
export declare const pattern: <A extends string>(
  regex: RegExp,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## startsWith

**Signature**

```ts
export declare const startsWith: <A extends string>(
  startsWith: string,
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## trimmed

Verifies that a string contains no leading or trailing whitespaces.

Note. This combinator does not make any transformations, it only validates.
If what you were looking for was a combinator to trim strings, then check out the `trim` combinator.

**Signature**

```ts
export declare const trimmed: <A extends string>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## uppercased

Verifies that a string is uppercased

Note. This combinator does not make any transformations, it only validates.
If what you were looking for was a combinator to uppercase strings, then check out the `uppercase` combinator.

**Signature**

```ts
export declare const uppercased: <A extends string>(
  options?: FilterAnnotations<A> | undefined
) => <I>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

# string transformations

## Lowercase

This combinator converts a string to lowercase

**Signature**

```ts
export declare const Lowercase: Schema<string, string>
```

Added in v1.0.0

## Uppercase

This combinator converts a string to uppercase

**Signature**

```ts
export declare const Uppercase: Schema<string, string>
```

Added in v1.0.0

## lowercase

This combinator converts a string to lowercase

**Signature**

```ts
export declare const lowercase: <I, A extends string>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## parseJson

The `parseJson` combinator offers a method to convert JSON strings into the `unknown` type using the underlying
functionality of `JSON.parse`. It also employs `JSON.stringify` for encoding.

**Signature**

```ts
export declare const parseJson: <I, A extends string>(
  self: Schema<I, A>,
  options?: {
    reviver?: Parameters<typeof JSON.parse>[1]
    replacer?: Parameters<typeof JSON.stringify>[1]
    space?: Parameters<typeof JSON.stringify>[2]
  }
) => Schema<I, unknown>
```

Added in v1.0.0

## split

This combinator allows splitting a string into an array of strings.

**Signature**

```ts
export declare const split: {
  (separator: string): <I, A extends string>(self: Schema<I, A>) => Schema<I, readonly string[]>
  <I, A extends string>(self: Schema<I, A>, separator: string): Schema<I, readonly string[]>
}
```

Added in v1.0.0

## trim

This combinator allows removing whitespaces from the beginning and end of a string.

**Signature**

```ts
export declare const trim: <I, A extends string>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

## uppercase

This combinator converts a string to uppercase

**Signature**

```ts
export declare const uppercase: <I, A extends string>(self: Schema<I, A>) => Schema<I, A>
```

Added in v1.0.0

# symbol

## TypeId

**Signature**

```ts
export declare const TypeId: typeof TypeId
```

Added in v1.0.0

## TypeId (type alias)

**Signature**

```ts
export type TypeId = typeof TypeId
```

Added in v1.0.0

# symbol constructors

## symbol

This schema transforms a `string` into a `symbol`.

**Signature**

```ts
export declare const symbol: Schema<string, symbol>
```

Added in v1.0.0

# symbol transformations

## symbolFromString

This combinator transforms a `string` into a `symbol`.

**Signature**

```ts
export declare const symbolFromString: <I, A extends string>(self: Schema<I, A>) => Schema<I, symbol>
```

Added in v1.0.0

# type id

## BetweenBigDecimalTypeId

**Signature**

```ts
export declare const BetweenBigDecimalTypeId: typeof BetweenBigDecimalTypeId
```

Added in v1.0.0

## BetweenBigintTypeId

**Signature**

```ts
export declare const BetweenBigintTypeId: typeof BetweenBigintTypeId
```

Added in v1.0.0

## BetweenBigintTypeId (type alias)

**Signature**

```ts
export type BetweenBigintTypeId = typeof BetweenBigintTypeId
```

Added in v1.0.0

## BetweenTypeId

**Signature**

```ts
export declare const BetweenTypeId: typeof BetweenTypeId
```

Added in v1.0.0

## BetweenTypeId (type alias)

**Signature**

```ts
export type BetweenTypeId = typeof BetweenTypeId
```

Added in v1.0.0

## BrandTypeId

**Signature**

```ts
export declare const BrandTypeId: typeof BrandTypeId
```

Added in v1.0.0

## EndsWithTypeId

**Signature**

```ts
export declare const EndsWithTypeId: typeof EndsWithTypeId
```

Added in v1.0.0

## FiniteTypeId

**Signature**

```ts
export declare const FiniteTypeId: typeof FiniteTypeId
```

Added in v1.0.0

## GreaterThanBigDecimalTypeId

**Signature**

```ts
export declare const GreaterThanBigDecimalTypeId: typeof GreaterThanBigDecimalTypeId
```

Added in v1.0.0

## GreaterThanBigintTypeId

**Signature**

```ts
export declare const GreaterThanBigintTypeId: typeof GreaterThanBigintTypeId
```

Added in v1.0.0

## GreaterThanBigintTypeId (type alias)

**Signature**

```ts
export type GreaterThanBigintTypeId = typeof GreaterThanBigintTypeId
```

Added in v1.0.0

## GreaterThanOrEqualToBigDecimalTypeId

**Signature**

```ts
export declare const GreaterThanOrEqualToBigDecimalTypeId: typeof GreaterThanOrEqualToBigDecimalTypeId
```

Added in v1.0.0

## GreaterThanOrEqualToBigintTypeId

**Signature**

```ts
export declare const GreaterThanOrEqualToBigintTypeId: typeof GreaterThanOrEqualToBigintTypeId
```

Added in v1.0.0

## GreaterThanOrEqualToBigintTypeId (type alias)

**Signature**

```ts
export type GreaterThanOrEqualToBigintTypeId = typeof GreaterThanOrEqualToBigintTypeId
```

Added in v1.0.0

## GreaterThanOrEqualToTypeId

**Signature**

```ts
export declare const GreaterThanOrEqualToTypeId: typeof GreaterThanOrEqualToTypeId
```

Added in v1.0.0

## GreaterThanOrEqualToTypeId (type alias)

**Signature**

```ts
export type GreaterThanOrEqualToTypeId = typeof GreaterThanOrEqualToTypeId
```

Added in v1.0.0

## GreaterThanTypeId

**Signature**

```ts
export declare const GreaterThanTypeId: typeof GreaterThanTypeId
```

Added in v1.0.0

## GreaterThanTypeId (type alias)

**Signature**

```ts
export type GreaterThanTypeId = typeof GreaterThanTypeId
```

Added in v1.0.0

## IncludesTypeId

**Signature**

```ts
export declare const IncludesTypeId: typeof IncludesTypeId
```

Added in v1.0.0

## InstanceOfTypeId

**Signature**

```ts
export declare const InstanceOfTypeId: typeof InstanceOfTypeId
```

Added in v1.0.0

## IntTypeId

**Signature**

```ts
export declare const IntTypeId: typeof IntTypeId
```

Added in v1.0.0

## IntTypeId (type alias)

**Signature**

```ts
export type IntTypeId = typeof IntTypeId
```

Added in v1.0.0

## ItemsCountTypeId

**Signature**

```ts
export declare const ItemsCountTypeId: typeof ItemsCountTypeId
```

Added in v1.0.0

## ItemsCountTypeId (type alias)

**Signature**

```ts
export type ItemsCountTypeId = typeof ItemsCountTypeId
```

Added in v1.0.0

## JsonNumberTypeId

**Signature**

```ts
export declare const JsonNumberTypeId: typeof JsonNumberTypeId
```

Added in v1.0.0

## LengthTypeId

**Signature**

```ts
export declare const LengthTypeId: typeof LengthTypeId
```

Added in v1.0.0

## LengthTypeId (type alias)

**Signature**

```ts
export type LengthTypeId = typeof LengthTypeId
```

Added in v1.0.0

## LessThanBigDecimalTypeId

**Signature**

```ts
export declare const LessThanBigDecimalTypeId: typeof LessThanBigDecimalTypeId
```

Added in v1.0.0

## LessThanBigintTypeId

**Signature**

```ts
export declare const LessThanBigintTypeId: typeof LessThanBigintTypeId
```

Added in v1.0.0

## LessThanBigintTypeId (type alias)

**Signature**

```ts
export type LessThanBigintTypeId = typeof LessThanBigintTypeId
```

Added in v1.0.0

## LessThanOrEqualToBigDecimalTypeId

**Signature**

```ts
export declare const LessThanOrEqualToBigDecimalTypeId: typeof LessThanOrEqualToBigDecimalTypeId
```

Added in v1.0.0

## LessThanOrEqualToBigintTypeId

**Signature**

```ts
export declare const LessThanOrEqualToBigintTypeId: typeof LessThanOrEqualToBigintTypeId
```

Added in v1.0.0

## LessThanOrEqualToBigintTypeId (type alias)

**Signature**

```ts
export type LessThanOrEqualToBigintTypeId = typeof LessThanOrEqualToBigintTypeId
```

Added in v1.0.0

## LessThanOrEqualToTypeId

**Signature**

```ts
export declare const LessThanOrEqualToTypeId: typeof LessThanOrEqualToTypeId
```

Added in v1.0.0

## LessThanOrEqualToTypeId (type alias)

**Signature**

```ts
export type LessThanOrEqualToTypeId = typeof LessThanOrEqualToTypeId
```

Added in v1.0.0

## LessThanTypeId

**Signature**

```ts
export declare const LessThanTypeId: typeof LessThanTypeId
```

Added in v1.0.0

## LessThanTypeId (type alias)

**Signature**

```ts
export type LessThanTypeId = typeof LessThanTypeId
```

Added in v1.0.0

## LowercasedTypeId

**Signature**

```ts
export declare const LowercasedTypeId: typeof LowercasedTypeId
```

Added in v1.0.0

## MaxItemsTypeId

**Signature**

```ts
export declare const MaxItemsTypeId: typeof MaxItemsTypeId
```

Added in v1.0.0

## MaxItemsTypeId (type alias)

**Signature**

```ts
export type MaxItemsTypeId = typeof MaxItemsTypeId
```

Added in v1.0.0

## MaxLengthTypeId

**Signature**

```ts
export declare const MaxLengthTypeId: typeof MaxLengthTypeId
```

Added in v1.0.0

## MaxLengthTypeId (type alias)

**Signature**

```ts
export type MaxLengthTypeId = typeof MaxLengthTypeId
```

Added in v1.0.0

## MinItemsTypeId

**Signature**

```ts
export declare const MinItemsTypeId: typeof MinItemsTypeId
```

Added in v1.0.0

## MinItemsTypeId (type alias)

**Signature**

```ts
export type MinItemsTypeId = typeof MinItemsTypeId
```

Added in v1.0.0

## MinLengthTypeId

**Signature**

```ts
export declare const MinLengthTypeId: typeof MinLengthTypeId
```

Added in v1.0.0

## MinLengthTypeId (type alias)

**Signature**

```ts
export type MinLengthTypeId = typeof MinLengthTypeId
```

Added in v1.0.0

## MultipleOfTypeId

**Signature**

```ts
export declare const MultipleOfTypeId: typeof MultipleOfTypeId
```

Added in v1.0.0

## NegativeBigDecimalTypeId

**Signature**

```ts
export declare const NegativeBigDecimalTypeId: typeof NegativeBigDecimalTypeId
```

Added in v1.0.0

## NonNaNTypeId

**Signature**

```ts
export declare const NonNaNTypeId: typeof NonNaNTypeId
```

Added in v1.0.0

## NonNegativeBigDecimalTypeId

**Signature**

```ts
export declare const NonNegativeBigDecimalTypeId: typeof NonNegativeBigDecimalTypeId
```

Added in v1.0.0

## NonPositiveBigDecimalTypeId

**Signature**

```ts
export declare const NonPositiveBigDecimalTypeId: typeof NonPositiveBigDecimalTypeId
```

Added in v1.0.0

## PatternTypeId

**Signature**

```ts
export declare const PatternTypeId: typeof PatternTypeId
```

Added in v1.0.0

## PositiveBigDecimalTypeId

**Signature**

```ts
export declare const PositiveBigDecimalTypeId: typeof PositiveBigDecimalTypeId
```

Added in v1.0.0

## StartsWithTypeId

**Signature**

```ts
export declare const StartsWithTypeId: typeof StartsWithTypeId
```

Added in v1.0.0

## TrimmedTypeId

**Signature**

```ts
export declare const TrimmedTypeId: typeof TrimmedTypeId
```

Added in v1.0.0

## ULIDTypeId

**Signature**

```ts
export declare const ULIDTypeId: typeof ULIDTypeId
```

Added in v1.0.0

## UUIDTypeId

**Signature**

```ts
export declare const UUIDTypeId: typeof UUIDTypeId
```

Added in v1.0.0

## UppercasedTypeId

**Signature**

```ts
export declare const UppercasedTypeId: typeof UppercasedTypeId
```

Added in v1.0.0

## ValidDateTypeId

**Signature**

```ts
export declare const ValidDateTypeId: typeof ValidDateTypeId
```

Added in v1.0.0

# utils

## DocAnnotations (interface)

**Signature**

```ts
export interface DocAnnotations<A> extends AST.Annotations {
  readonly identifier?: AST.IdentifierAnnotation
  readonly title?: AST.TitleAnnotation
  readonly description?: AST.DescriptionAnnotation
  readonly examples?: AST.ExamplesAnnotation
  readonly default?: AST.DefaultAnnotation
  readonly documentation?: AST.DocumentationAnnotation
  readonly message?: AST.MessageAnnotation<A>
}
```

Added in v1.0.0

## FilterAnnotations (interface)

**Signature**

```ts
export interface FilterAnnotations<A> extends DocAnnotations<A> {
  readonly typeId?: AST.TypeAnnotation | { id: AST.TypeAnnotation; params: unknown }
  readonly jsonSchema?: AST.JSONSchemaAnnotation
  readonly arbitrary?: (...args: ReadonlyArray<Arbitrary<any>>) => Arbitrary<any>
  readonly pretty?: (...args: ReadonlyArray<Pretty<any>>) => Pretty<any>
  readonly equivalence?: () => Equivalence.Equivalence<A>
}
```

Added in v1.0.0

## FromOptionalKeys (type alias)

**Signature**

```ts
export type FromOptionalKeys<Fields> = {
  [K in keyof Fields]: Fields[K] extends
    | PropertySignature<any, true, any, boolean>
    | PropertySignature<never, true, never, boolean>
    ? K
    : never
}[keyof Fields]
```

Added in v1.0.0

## FromStruct (type alias)

**Signature**

```ts
export type FromStruct<Fields extends StructFields> = {
  readonly [K in Exclude<keyof Fields, FromOptionalKeys<Fields>>]: Schema.From<Fields[K]>
} & { readonly [K in FromOptionalKeys<Fields>]?: Schema.From<Fields[K]> }
```

Added in v1.0.0

## Join (type alias)

**Signature**

```ts
export type Join<T> = T extends [infer Head, ...infer Tail]
  ? `${Head & (string | number | bigint | boolean | null | undefined)}${Tail extends [] ? "" : Join<Tail>}`
  : never
```

Added in v1.0.0

## Mutable (type alias)

Make all properties in T mutable

**Signature**

```ts
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

Added in v1.0.0

## OptionalPropertySignature (interface)

**Signature**

```ts
export interface OptionalPropertySignature<From, FromIsOptional, To, ToIsOptional>
  extends PropertySignature<From, FromIsOptional, To, ToIsOptional> {
  readonly withDefault: (value: () => To) => PropertySignature<From, true, To, false>
  readonly toOption: () => PropertySignature<From, true, Option.Option<To>, false>
}
```

Added in v1.0.0

## PropertySignature (interface)

**Signature**

```ts
export interface PropertySignature<From, FromIsOptional, To, ToIsOptional> extends Schema.Variance<From, To> {
  readonly FromIsOptional: FromIsOptional
  readonly ToIsOptional: ToIsOptional
}
```

Added in v1.0.0

## Schema (namespace)

Added in v1.0.0

### Variance (interface)

**Signature**

```ts
export interface Variance<From, To> {
  readonly [TypeId]: {
    readonly From: (_: From) => From
    readonly To: (_: To) => To
  }
}
```

Added in v1.0.0

### From (type alias)

**Signature**

```ts
export type From<S extends { readonly [TypeId]: { readonly From: (..._: any) => any } }> = Parameters<
  S[TypeId]["From"]
>[0]
```

Added in v1.0.0

### To (type alias)

**Signature**

```ts
export type To<S extends { readonly [TypeId]: { readonly To: (..._: any) => any } }> = Parameters<S[TypeId]["To"]>[0]
```

Added in v1.0.0

### ToAsserts (type alias)

**Signature**

```ts
export type ToAsserts<S extends Schema<any>> = (
  input: unknown,
  options?: AST.ParseOptions
) => asserts input is Schema.To<S>
```

Added in v1.0.0

## StructFields (type alias)

**Signature**

```ts
export type StructFields = Record<
  PropertyKey,
  | Schema<any, any>
  | Schema<never, never>
  | PropertySignature<any, boolean, any, boolean>
  | PropertySignature<never, boolean, never, boolean>
>
```

Added in v1.0.0

## ToOptionalKeys (type alias)

**Signature**

```ts
export type ToOptionalKeys<Fields> = {
  [K in keyof Fields]: Fields[K] extends
    | PropertySignature<any, boolean, any, true>
    | PropertySignature<never, boolean, never, true>
    ? K
    : never
}[keyof Fields]
```

Added in v1.0.0

## ToStruct (type alias)

**Signature**

```ts
export type ToStruct<Fields extends StructFields> = {
  readonly [K in Exclude<keyof Fields, ToOptionalKeys<Fields>>]: Schema.To<Fields[K]>
} & { readonly [K in ToOptionalKeys<Fields>]?: Schema.To<Fields[K]> }
```

Added in v1.0.0

## from

**Signature**

```ts
export declare const from: <I, A>(schema: Schema<I, A>) => Schema<I, I>
```

Added in v1.0.0

## optional

**Signature**

```ts
export declare const optional: <I, A>(
  schema: Schema<I, A>,
  options?: DocAnnotations<A> | undefined
) => OptionalPropertySignature<I, true, A, true>
```

Added in v1.0.0

## propertySignature

**Signature**

```ts
export declare const propertySignature: <I, A>(
  schema: Schema<I, A>,
  options: DocAnnotations<A>
) => PropertySignature<I, false, A, false>
```

Added in v1.0.0

## readonlyMapFromSelf

**Signature**

```ts
export declare const readonlyMapFromSelf: <IK, K, IV, V>(
  key: Schema<IK, K>,
  value: Schema<IV, V>
) => Schema<ReadonlyMap<IK, IV>, ReadonlyMap<K, V>>
```

Added in v1.0.0

## to

**Signature**

```ts
export declare const to: <I, A>(schema: Schema<I, A>) => Schema<A, A>
```

Added in v1.0.0

# validation

## asserts

**Signature**

```ts
export declare const asserts: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions | undefined) => asserts a is A
```

Added in v1.0.0

## is

**Signature**

```ts
export declare const is: <_, A>(schema: Schema<_, A>) => (a: unknown) => a is A
```

Added in v1.0.0

## validate

**Signature**

```ts
export declare const validate: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions | undefined) => Effect.Effect<never, ParseResult.ParseError, A>
```

Added in v1.0.0

## validateEither

**Signature**

```ts
export declare const validateEither: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions | undefined) => Either.Either<ParseResult.ParseError, A>
```

Added in v1.0.0

## validateOption

**Signature**

```ts
export declare const validateOption: <_, A>(
  schema: Schema<_, A>
) => (a: unknown, options?: ParseOptions | undefined) => Option.Option<A>
```

Added in v1.0.0

## validatePromise

**Signature**

```ts
export declare const validatePromise: <_, A>(
  schema: Schema<_, A>
) => (i: unknown, options?: ParseOptions | undefined) => Promise<A>
```

Added in v1.0.0

## validateSync

**Signature**

```ts
export declare const validateSync: <_, A>(schema: Schema<_, A>) => (a: unknown, options?: ParseOptions | undefined) => A
```

Added in v1.0.0
