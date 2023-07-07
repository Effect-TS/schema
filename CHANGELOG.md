# @effect/schema

## 0.24.0

### Minor Changes

- [#318](https://github.com/Effect-TS/schema/pull/318) [`0c6cc97`](https://github.com/Effect-TS/schema/commit/0c6cc978616e7942fa1f2fafcdb8412c96f80b97) Thanks [@vecerek](https://github.com/vecerek)! - Add schema for [ULID](https://github.com/ulid/spec)

- [#321](https://github.com/Effect-TS/schema/pull/321) [`7f0e5bd`](https://github.com/Effect-TS/schema/commit/7f0e5bdaa9e2a92847cea98db77f39ecb1ee5afe) Thanks [@gcanti](https://github.com/gcanti)! - upgrade to latest versions

### Patch Changes

- [#320](https://github.com/Effect-TS/schema/pull/320) [`8f09893`](https://github.com/Effect-TS/schema/commit/8f09893fcbfee209081a6e78246b08be8b3891f0) Thanks [@gcanti](https://github.com/gcanti)! - UUID: add title annotation

## 0.23.0

### Minor Changes

- [#316](https://github.com/Effect-TS/schema/pull/316) [`7c9e0ae`](https://github.com/Effect-TS/schema/commit/7c9e0ae48d01ff687e93992ecfbc86fed2e803cd) Thanks [@gcanti](https://github.com/gcanti)! - update effect/io

## 0.22.0

### Minor Changes

- [#314](https://github.com/Effect-TS/schema/pull/314) [`81f2529`](https://github.com/Effect-TS/schema/commit/81f2529e71da2b8dcd00c903ff72fbabbe346fca) Thanks [@gcanti](https://github.com/gcanti)! - upgrade to latest deps

## 0.21.1

### Patch Changes

- [#312](https://github.com/Effect-TS/schema/pull/312) [`217a3ba`](https://github.com/Effect-TS/schema/commit/217a3ba9807dcdc71b5ab5a7b8bf6bac76c9a7be) Thanks [@gcanti](https://github.com/gcanti)! - struct should allow a "constructor" field name

## 0.21.0

### Minor Changes

- [#310](https://github.com/Effect-TS/schema/pull/310) [`10f8457`](https://github.com/Effect-TS/schema/commit/10f845702fb5017ec1635214c0f995c2da4f3188) Thanks [@sukovanej](https://github.com/sukovanej)! - Update /data and /io.

## 0.20.3

### Patch Changes

- [#307](https://github.com/Effect-TS/schema/pull/307) [`a325816`](https://github.com/Effect-TS/schema/commit/a32581607fc3941825a8d09fb4a70a04ea37e97d) Thanks [@gcanti](https://github.com/gcanti)! - extend should support transformations as both operands

## 0.20.2

### Patch Changes

- [#303](https://github.com/Effect-TS/schema/pull/303) [`0f70b22`](https://github.com/Effect-TS/schema/commit/0f70b22f9d0e6643a2c87a994f18ed4dd7775eda) Thanks [@sukovanej](https://github.com/sukovanej)! - Update @effect/data and fast-check.

## 0.20.1

### Patch Changes

- [#297](https://github.com/Effect-TS/schema/pull/297) [`8bfddc3`](https://github.com/Effect-TS/schema/commit/8bfddc3c45a1a2bf2d1470c40569f165a2ed9ff4) Thanks [@gcanti](https://github.com/gcanti)! - numberFromString should use `Number` instead of `parseFloat`

## 0.20.0

### Minor Changes

- [#292](https://github.com/Effect-TS/schema/pull/292) [`bd33211`](https://github.com/Effect-TS/schema/commit/bd33211772d8c10cd557045a8161a8fa571948f7) Thanks [@gcanti](https://github.com/gcanti)! - upgrade to latest /io

## 0.19.3

### Patch Changes

- [#285](https://github.com/Effect-TS/schema/pull/285) [`39d3c55`](https://github.com/Effect-TS/schema/commit/39d3c55e77463169ce3ea6071f656c03c0fff393) Thanks [@gcanti](https://github.com/gcanti)! - AST: memoize createLazy

- [#285](https://github.com/Effect-TS/schema/pull/285) [`39d3c55`](https://github.com/Effect-TS/schema/commit/39d3c55e77463169ce3ea6071f656c03c0fff393) Thanks [@gcanti](https://github.com/gcanti)! - Arbitrary: fix maximum call stack size exceeded when producing nested arrays and records that are too deep

## 0.19.2

### Patch Changes

- [#282](https://github.com/Effect-TS/schema/pull/282) [`9b9c3ee`](https://github.com/Effect-TS/schema/commit/9b9c3ee9d27c20a5bcb422f6d8ec3f46b648409a) Thanks [@gcanti](https://github.com/gcanti)! - handle excess properties for records

## 0.19.1

### Patch Changes

- [#280](https://github.com/Effect-TS/schema/pull/280) [`ec375dd`](https://github.com/Effect-TS/schema/commit/ec375dd23c061fedca370f73096cae9fba4b0cc1) Thanks [@gcanti](https://github.com/gcanti)! - Json should exclude NaN, +Infinity, -Infinity

## 0.19.0

### Minor Changes

- [#277](https://github.com/Effect-TS/schema/pull/277) [`1ac3d06`](https://github.com/Effect-TS/schema/commit/1ac3d06c90dc952b0beff9a722cfaace5162bb21) Thanks [@gcanti](https://github.com/gcanti)! - remove undefined from optionFromNullable

## 0.18.0

### Minor Changes

- [#274](https://github.com/Effect-TS/schema/pull/274) [`eae1614`](https://github.com/Effect-TS/schema/commit/eae16146096c42dabce8b06e28c9173f71924238) Thanks [@gcanti](https://github.com/gcanti)! - remove Schema.reverse API

- [#274](https://github.com/Effect-TS/schema/pull/274) [`eae1614`](https://github.com/Effect-TS/schema/commit/eae16146096c42dabce8b06e28c9173f71924238) Thanks [@gcanti](https://github.com/gcanti)! - remove getPropertySignatures API

- [#274](https://github.com/Effect-TS/schema/pull/274) [`eae1614`](https://github.com/Effect-TS/schema/commit/eae16146096c42dabce8b06e28c9173f71924238) Thanks [@gcanti](https://github.com/gcanti)! - rename AST.getTo -> to, AST.getFrom -> from

- [#274](https://github.com/Effect-TS/schema/pull/274) [`eae1614`](https://github.com/Effect-TS/schema/commit/eae16146096c42dabce8b06e28c9173f71924238) Thanks [@gcanti](https://github.com/gcanti)! - remove AST.reverse API

## 0.17.5

### Patch Changes

- [#272](https://github.com/Effect-TS/schema/pull/272) [`d91a7a7`](https://github.com/Effect-TS/schema/commit/d91a7a72eb4ca28633d2b9cfc3afdd07afadd98b) Thanks [@gcanti](https://github.com/gcanti)! - pick / omit: add support for structs with property signature transformations

## 0.17.4

### Patch Changes

- [#267](https://github.com/Effect-TS/schema/pull/267) [`8369823`](https://github.com/Effect-TS/schema/commit/83698237ee5098cfa4c04757b29cd9c8c71966c2) Thanks [@gcanti](https://github.com/gcanti)! - make extend dual

## 0.17.3

### Patch Changes

- [#264](https://github.com/Effect-TS/schema/pull/264) [`4488c09`](https://github.com/Effect-TS/schema/commit/4488c0933c3286aa99a4e18aa071fab18a582ad1) Thanks [@gcanti](https://github.com/gcanti)! - add arbitrary to AnnotationOptions

## 0.17.2

### Patch Changes

- [#258](https://github.com/Effect-TS/schema/pull/258) [`1b65e53`](https://github.com/Effect-TS/schema/commit/1b65e5348c7a93b2294e3429b4eddc78d054052e) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - Try publishing again

## 0.17.1

### Patch Changes

- [#256](https://github.com/Effect-TS/schema/pull/256) [`162e099`](https://github.com/Effect-TS/schema/commit/162e099b33d6092eca2a14f8a1c1c73a72621361) Thanks [@gcanti](https://github.com/gcanti)! - leverage annotations (e.g. maxLength, int, between) to improve fast-check performance

## 0.17.0

### Minor Changes

- [#254](https://github.com/Effect-TS/schema/pull/254) [`32e987a`](https://github.com/Effect-TS/schema/commit/32e987a8a82c0770def55835b3253e8e62017241) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - Update effect/io, make parsing fields of records and tuples parallel

## 0.16.0

### Minor Changes

- [#249](https://github.com/Effect-TS/schema/pull/249) [`ccee34e`](https://github.com/Effect-TS/schema/commit/ccee34ef87e9f0879ec674feaac1854ecb327614) Thanks [@gcanti](https://github.com/gcanti)! - upgrade to latest effect/io

## 0.15.0

### Minor Changes

- [#247](https://github.com/Effect-TS/schema/pull/247) [`28c7484`](https://github.com/Effect-TS/schema/commit/28c7484c53976657b84e72a1a4573d85920ba38d) Thanks [@gcanti](https://github.com/gcanti)! - update to latest @effect/io

- [#247](https://github.com/Effect-TS/schema/pull/247) [`28c7484`](https://github.com/Effect-TS/schema/commit/28c7484c53976657b84e72a1a4573d85920ba38d) Thanks [@gcanti](https://github.com/gcanti)! - refactor optional APIs (Default values and Optional fields as `Option`s)

## 0.14.1

### Patch Changes

- [#245](https://github.com/Effect-TS/schema/pull/245) [`6a7d7be`](https://github.com/Effect-TS/schema/commit/6a7d7be5a94139846e32d26667a24c662a306f84) Thanks [@gcanti](https://github.com/gcanti)! - add `never` handling to struct API

## 0.14.0

### Minor Changes

- [#238](https://github.com/Effect-TS/schema/pull/238) [`f4ce344`](https://github.com/Effect-TS/schema/commit/f4ce34472bb8a4371826c1bd4c310c50e7b1cd4e) Thanks [@sukovanej](https://github.com/sukovanej)! - update @effect/io dependency

- [#239](https://github.com/Effect-TS/schema/pull/239) [`58be561`](https://github.com/Effect-TS/schema/commit/58be5617395c7c77ff8bdbb2058524c4439ebdbd) Thanks [@gcanti](https://github.com/gcanti)! - refactor optional

- [#239](https://github.com/Effect-TS/schema/pull/239) [`58be561`](https://github.com/Effect-TS/schema/commit/58be5617395c7c77ff8bdbb2058524c4439ebdbd) Thanks [@gcanti](https://github.com/gcanti)! - rename date to DateFromSelf

- [#240](https://github.com/Effect-TS/schema/pull/240) [`87cb2f4`](https://github.com/Effect-TS/schema/commit/87cb2f4793824e478175b020775346d3d8342713) Thanks [@gcanti](https://github.com/gcanti)! - rename date to Date

- [#243](https://github.com/Effect-TS/schema/pull/243) [`87382ae`](https://github.com/Effect-TS/schema/commit/87382ae472f2b2f437dd8abf80caa04421e223ba) Thanks [@gcanti](https://github.com/gcanti)! - narrow down IndexSignature type

- [#239](https://github.com/Effect-TS/schema/pull/239) [`58be561`](https://github.com/Effect-TS/schema/commit/58be5617395c7c77ff8bdbb2058524c4439ebdbd) Thanks [@gcanti](https://github.com/gcanti)! - rename DateFromString to date

### Patch Changes

- [#243](https://github.com/Effect-TS/schema/pull/243) [`87382ae`](https://github.com/Effect-TS/schema/commit/87382ae472f2b2f437dd8abf80caa04421e223ba) Thanks [@gcanti](https://github.com/gcanti)! - Arbitrary: should throw on effectful refinements

- [#231](https://github.com/Effect-TS/schema/pull/231) [`2c2d749`](https://github.com/Effect-TS/schema/commit/2c2d7497c61e7a0f8704947d22a27e43059fe8da) Thanks [@tim-smart](https://github.com/tim-smart)! - add isValidDate filter

- [#217](https://github.com/Effect-TS/schema/pull/217) [`7911525`](https://github.com/Effect-TS/schema/commit/7911525f756e64c1c75fa7820489af1a9dbe0e4d) Thanks [@jessekelly881](https://github.com/jessekelly881)! - data/Boolean: added S.not transform

- [#243](https://github.com/Effect-TS/schema/pull/243) [`87382ae`](https://github.com/Effect-TS/schema/commit/87382ae472f2b2f437dd8abf80caa04421e223ba) Thanks [@gcanti](https://github.com/gcanti)! - createRecord: should throw on unsupported literals

- [#237](https://github.com/Effect-TS/schema/pull/237) [`2a911ef`](https://github.com/Effect-TS/schema/commit/2a911ef56abf5193a3f7f8b8c9d3f1d6fd9c920c) Thanks [@gcanti](https://github.com/gcanti)! - export ValidDateFromSelf and rename validDate filter

## 0.13.1

### Patch Changes

- [#234](https://github.com/Effect-TS/schema/pull/234) [`9ed0ee2`](https://github.com/Effect-TS/schema/commit/9ed0ee25d0287ca72a2584278bab67643d332009) Thanks [@gcanti](https://github.com/gcanti)! - attachPropertySignature as PropertySignatureTransformation

## 0.13.0

### Minor Changes

- [#232](https://github.com/Effect-TS/schema/pull/232) [`49ebaba`](https://github.com/Effect-TS/schema/commit/49ebabae7a8b2194f021670d65a227f9ef39e139) Thanks [@gcanti](https://github.com/gcanti)! - update to latest effect/io

- [#232](https://github.com/Effect-TS/schema/pull/232) [`49ebaba`](https://github.com/Effect-TS/schema/commit/49ebabae7a8b2194f021670d65a227f9ef39e139) Thanks [@gcanti](https://github.com/gcanti)! - rename OptionalSchema to PropertySignature

- [#232](https://github.com/Effect-TS/schema/pull/232) [`49ebaba`](https://github.com/Effect-TS/schema/commit/49ebabae7a8b2194f021670d65a227f9ef39e139) Thanks [@gcanti](https://github.com/gcanti)! - simplify keyof and getPropertySignatures implementations

- [#232](https://github.com/Effect-TS/schema/pull/232) [`49ebaba`](https://github.com/Effect-TS/schema/commit/49ebabae7a8b2194f021670d65a227f9ef39e139) Thanks [@gcanti](https://github.com/gcanti)! - remove optionsFromOptionals API

## 0.12.1

### Patch Changes

- [#229](https://github.com/Effect-TS/schema/pull/229) [`3ab5df0`](https://github.com/Effect-TS/schema/commit/3ab5df06f8d8b85e94f8f597569c27f8abc6cc00) Thanks [@gcanti](https://github.com/gcanti)! - add missing Forbidden handling

## 0.12.0

### Minor Changes

- [#227](https://github.com/Effect-TS/schema/pull/227) [`8ae866d`](https://github.com/Effect-TS/schema/commit/8ae866d3e767b9654901dc9564136159adacbd4d) Thanks [@gcanti](https://github.com/gcanti)! - upgrade to latest deps

## 0.11.1

### Patch Changes

- [#224](https://github.com/Effect-TS/schema/pull/224) [`6bf7243`](https://github.com/Effect-TS/schema/commit/6bf72435faa12a74c630a2e20792d18b36c471d1) Thanks [@gcanti](https://github.com/gcanti)! - move missing keys checks to improve perfs

## 0.11.0

### Minor Changes

- [#219](https://github.com/Effect-TS/schema/pull/219) [`10c505a`](https://github.com/Effect-TS/schema/commit/10c505a9a261266db9e7684e5a172ae8eeab2f5d) Thanks [@gcanti](https://github.com/gcanti)! - rename isEnum to isEnums

- [#215](https://github.com/Effect-TS/schema/pull/215) [`b47e8ab`](https://github.com/Effect-TS/schema/commit/b47e8ab2e66e90963787e51f6af1d47b46a93ade) Thanks [@tsteckenborn](https://github.com/tsteckenborn)! - aligns usage of dateFromString with numberFromString

- [#221](https://github.com/Effect-TS/schema/pull/221) [`0e3eabd`](https://github.com/Effect-TS/schema/commit/0e3eabd427ba05ef03eaab0c0a7c3d3b5ff83ece) Thanks [@gcanti](https://github.com/gcanti)! - upgrade to effect/io 0.18.0

- [#219](https://github.com/Effect-TS/schema/pull/219) [`10c505a`](https://github.com/Effect-TS/schema/commit/10c505a9a261266db9e7684e5a172ae8eeab2f5d) Thanks [@gcanti](https://github.com/gcanti)! - refactor Refinement AST

- [#219](https://github.com/Effect-TS/schema/pull/219) [`10c505a`](https://github.com/Effect-TS/schema/commit/10c505a9a261266db9e7684e5a172ae8eeab2f5d) Thanks [@gcanti](https://github.com/gcanti)! - remove hasTransformation optimisations

- [#223](https://github.com/Effect-TS/schema/pull/223) [`6cc1a56`](https://github.com/Effect-TS/schema/commit/6cc1a56e5b4c0e08d6e13f57742f67758ffe0180) Thanks [@gcanti](https://github.com/gcanti)! - upgrade to latest /data and /io

- [#219](https://github.com/Effect-TS/schema/pull/219) [`10c505a`](https://github.com/Effect-TS/schema/commit/10c505a9a261266db9e7684e5a172ae8eeab2f5d) Thanks [@gcanti](https://github.com/gcanti)! - keyof cannot handle refinements nor transformations

- [#219](https://github.com/Effect-TS/schema/pull/219) [`10c505a`](https://github.com/Effect-TS/schema/commit/10c505a9a261266db9e7684e5a172ae8eeab2f5d) Thanks [@gcanti](https://github.com/gcanti)! - fix transformation signatures

### Patch Changes

- [#219](https://github.com/Effect-TS/schema/pull/219) [`10c505a`](https://github.com/Effect-TS/schema/commit/10c505a9a261266db9e7684e5a172ae8eeab2f5d) Thanks [@gcanti](https://github.com/gcanti)! - cannot build an Arbitrary for transformations

- [#219](https://github.com/Effect-TS/schema/pull/219) [`10c505a`](https://github.com/Effect-TS/schema/commit/10c505a9a261266db9e7684e5a172ae8eeab2f5d) Thanks [@gcanti](https://github.com/gcanti)! - fix AST.getTo implementation for Transform

- [#219](https://github.com/Effect-TS/schema/pull/219) [`10c505a`](https://github.com/Effect-TS/schema/commit/10c505a9a261266db9e7684e5a172ae8eeab2f5d) Thanks [@gcanti](https://github.com/gcanti)! - export NumberFromString schema

- [#219](https://github.com/Effect-TS/schema/pull/219) [`10c505a`](https://github.com/Effect-TS/schema/commit/10c505a9a261266db9e7684e5a172ae8eeab2f5d) Thanks [@gcanti](https://github.com/gcanti)! - export Trim schema

- [#218](https://github.com/Effect-TS/schema/pull/218) [`c6c96a4`](https://github.com/Effect-TS/schema/commit/c6c96a4bada0ac54a028fd5319fdcf345b4362ec) Thanks [@OlaoluwaM](https://github.com/OlaoluwaM)! - Added missing assertion functions for some AST nodes

- [#219](https://github.com/Effect-TS/schema/pull/219) [`10c505a`](https://github.com/Effect-TS/schema/commit/10c505a9a261266db9e7684e5a172ae8eeab2f5d) Thanks [@gcanti](https://github.com/gcanti)! - export DateFromString schema

## 0.10.0

### Minor Changes

- [#211](https://github.com/Effect-TS/schema/pull/211) [`45c322b`](https://github.com/Effect-TS/schema/commit/45c322b455dd06a7eb55a5d03533fbac3575d57f) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - Update effect/data and effect/io

## 0.9.1

### Patch Changes

- [#209](https://github.com/Effect-TS/schema/pull/209) [`5affbf6`](https://github.com/Effect-TS/schema/commit/5affbf63671a3d16702fd67d1db36b65d031c17b) Thanks [@gcanti](https://github.com/gcanti)! - fix Spread definition

## 0.9.0

### Minor Changes

- [#206](https://github.com/Effect-TS/schema/pull/206) [`39da1cb`](https://github.com/Effect-TS/schema/commit/39da1cb794d7218674c14542d2c3b3a8f386d03b) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - Update effect/data and effect/io

## 0.8.3

### Patch Changes

- [#204](https://github.com/Effect-TS/schema/pull/204) [`c40237c`](https://github.com/Effect-TS/schema/commit/c40237cde61597272b376dcb3e784d72867c9c60) Thanks [@gcanti](https://github.com/gcanti)! - remove Spread from filter return type

## 0.8.2

### Patch Changes

- [#201](https://github.com/Effect-TS/schema/pull/201) [`5aa2d78`](https://github.com/Effect-TS/schema/commit/5aa2d78a527cbc488b7f330d1ad7afd3fb177127) Thanks [@gcanti](https://github.com/gcanti)! - cannot compute property signatures for refinements

- [#202](https://github.com/Effect-TS/schema/pull/202) [`6f51084`](https://github.com/Effect-TS/schema/commit/6f5108459534ba4c33ae54a79e4b2a1e06ad9af0) Thanks [@gcanti](https://github.com/gcanti)! - Schema: add support for never to From / To utility types

## 0.8.1

### Patch Changes

- [#199](https://github.com/Effect-TS/schema/pull/199) [`143a6a4`](https://github.com/Effect-TS/schema/commit/143a6a49f011bd5d46d15b9431c7f4e8daeacc79) Thanks [@gcanti](https://github.com/gcanti)! - improve filter signature

## 0.8.0

### Minor Changes

- [#197](https://github.com/Effect-TS/schema/pull/197) [`4f1b043`](https://github.com/Effect-TS/schema/commit/4f1b04325e9821b43920aeb858f8614573b88eb7) Thanks [@gcanti](https://github.com/gcanti)! - update to latest deps

- [#196](https://github.com/Effect-TS/schema/pull/196) [`96e5bf5`](https://github.com/Effect-TS/schema/commit/96e5bf519c91da759290aeaf21d7de1b951afe5c) Thanks [@gcanti](https://github.com/gcanti)! - tuples should always fail on excess indexes

- [#196](https://github.com/Effect-TS/schema/pull/196) [`96e5bf5`](https://github.com/Effect-TS/schema/commit/96e5bf519c91da759290aeaf21d7de1b951afe5c) Thanks [@gcanti](https://github.com/gcanti)! - refactor ParseOptions, closes #163

### Patch Changes

- [#173](https://github.com/Effect-TS/schema/pull/173) [`4090099`](https://github.com/Effect-TS/schema/commit/4090099799b4cea4ad633d83323e32d95c8be86a) Thanks [@jessekelly881](https://github.com/jessekelly881)! - Schema: added S.required

## 0.7.1

### Patch Changes

- [#190](https://github.com/Effect-TS/schema/pull/190) [`c52da9a`](https://github.com/Effect-TS/schema/commit/c52da9a6b2d249e2c823bbe8f4f7aaa51bd975a3) Thanks [@gcanti](https://github.com/gcanti)! - struct({}) should go in last position in a union

## 0.7.0

### Minor Changes

- [#188](https://github.com/Effect-TS/schema/pull/188) [`bb31acb`](https://github.com/Effect-TS/schema/commit/bb31acbfad0bd994914937bcd9da44fe0990df9a) Thanks [@gcanti](https://github.com/gcanti)! - getPropertySignatures: cannot compute property signatures for transformations

- [#188](https://github.com/Effect-TS/schema/pull/188) [`bb31acb`](https://github.com/Effect-TS/schema/commit/bb31acbfad0bd994914937bcd9da44fe0990df9a) Thanks [@gcanti](https://github.com/gcanti)! - upgrade to latest @effect/data @effect/io

- [#188](https://github.com/Effect-TS/schema/pull/188) [`bb31acb`](https://github.com/Effect-TS/schema/commit/bb31acbfad0bd994914937bcd9da44fe0990df9a) Thanks [@gcanti](https://github.com/gcanti)! - `partial` cannot handle refinement or transformations

## 0.6.0

### Minor Changes

- [#180](https://github.com/Effect-TS/schema/pull/180) [`25cbf46`](https://github.com/Effect-TS/schema/commit/25cbf46d62f97981534ec5c384618bc6b7af43b2) Thanks [@gcanti](https://github.com/gcanti)! - Allow symbols in Brand

### Patch Changes

- [#184](https://github.com/Effect-TS/schema/pull/184) [`b0b6423`](https://github.com/Effect-TS/schema/commit/b0b6423ae9368de246a6c0982cad8c4bbcbab2da) Thanks [@gcanti](https://github.com/gcanti)! - make optionsFromOptionals composable

- [#182](https://github.com/Effect-TS/schema/pull/182) [`f7899b7`](https://github.com/Effect-TS/schema/commit/f7899b7cbe930c133e1f764b4722df46998dfc07) Thanks [@gcanti](https://github.com/gcanti)! - optionsFromOptionals: ensure non overlapping property signatures

- [#181](https://github.com/Effect-TS/schema/pull/181) [`0062b25`](https://github.com/Effect-TS/schema/commit/0062b251cd20e4a29d75aca2287b0206c6e302a7) Thanks [@gcanti](https://github.com/gcanti)! - fix optionsFromOptionals implementation

## 0.5.0

### Minor Changes

- [#178](https://github.com/Effect-TS/schema/pull/178) [`f60341f`](https://github.com/Effect-TS/schema/commit/f60341f1c626145455c3ccd89c34b42905853bb5) Thanks [@gcanti](https://github.com/gcanti)! - merge transformEither and transformEffect into transformResult

## 0.4.0

### Minor Changes

- [#174](https://github.com/Effect-TS/schema/pull/174) [`c3a1230`](https://github.com/Effect-TS/schema/commit/c3a1230d9bd42b5779f8986e48571735b666b7a9) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - Only run effects when allowed

### Patch Changes

- [#172](https://github.com/Effect-TS/schema/pull/172) [`6277f5a`](https://github.com/Effect-TS/schema/commit/6277f5ac91422a3fe9584b80a184ebecc92ad610) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - Optimize ParseResult conditional functions

- [#176](https://github.com/Effect-TS/schema/pull/176) [`dbb0a59`](https://github.com/Effect-TS/schema/commit/dbb0a5976bbf16e89006d435bed44cd671168215) Thanks [@gcanti](https://github.com/gcanti)! - Optimize internal validations

## 0.3.1

### Patch Changes

- [#169](https://github.com/Effect-TS/schema/pull/169) [`6b0a45f`](https://github.com/Effect-TS/schema/commit/6b0a45f5fb33bbc9db7175573544903ab65d2e07) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - Add back missing commits from wrong rebase.

## 0.3.0

### Minor Changes

- [#165](https://github.com/Effect-TS/schema/pull/165) [`3704121`](https://github.com/Effect-TS/schema/commit/3704121eea6fe6415d260bafb24b0afa20981b94) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - AST: remove isReversed from Transform

- [#165](https://github.com/Effect-TS/schema/pull/165) [`3704121`](https://github.com/Effect-TS/schema/commit/3704121eea6fe6415d260bafb24b0afa20981b94) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - make ParseError tagged

- [#165](https://github.com/Effect-TS/schema/pull/165) [`3704121`](https://github.com/Effect-TS/schema/commit/3704121eea6fe6415d260bafb24b0afa20981b94) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - ParseResult: add optional message to Type error

- [#165](https://github.com/Effect-TS/schema/pull/165) [`3704121`](https://github.com/Effect-TS/schema/commit/3704121eea6fe6415d260bafb24b0afa20981b94) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - remove useless options argument from is

- [#165](https://github.com/Effect-TS/schema/pull/165) [`3704121`](https://github.com/Effect-TS/schema/commit/3704121eea6fe6415d260bafb24b0afa20981b94) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - Integrate Effect into Parser

- [#165](https://github.com/Effect-TS/schema/pull/165) [`3704121`](https://github.com/Effect-TS/schema/commit/3704121eea6fe6415d260bafb24b0afa20981b94) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - simplify dateFromString

- [#165](https://github.com/Effect-TS/schema/pull/165) [`3704121`](https://github.com/Effect-TS/schema/commit/3704121eea6fe6415d260bafb24b0afa20981b94) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - Schema: add reverse API

- [#165](https://github.com/Effect-TS/schema/pull/165) [`3704121`](https://github.com/Effect-TS/schema/commit/3704121eea6fe6415d260bafb24b0afa20981b94) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - rename decodeFromInput to decode and decode to parse

### Patch Changes

- [#165](https://github.com/Effect-TS/schema/pull/165) [`3704121`](https://github.com/Effect-TS/schema/commit/3704121eea6fe6415d260bafb24b0afa20981b94) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - add parse, parseOption, parseEither

- [#165](https://github.com/Effect-TS/schema/pull/165) [`3704121`](https://github.com/Effect-TS/schema/commit/3704121eea6fe6415d260bafb24b0afa20981b94) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - fix trim, clamp, clampBigint definition

## 0.2.1

### Patch Changes

- [#155](https://github.com/Effect-TS/schema/pull/155) [`0b86081`](https://github.com/Effect-TS/schema/commit/0b860818820d9b22ca17946175379c2334ec6a5a) Thanks [@gcanti](https://github.com/gcanti)! - fix attachPropertySignature bug ref #153

## 0.2.0

### Minor Changes

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - rename encodeOrThrow -> encode

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - AST: rename typeAlis to Declaration

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - rename `transformOrFail` to `transformEither`

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - rename encode -> encodeEither

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - AST: change Refinement definition form predicate to decode

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - move /formatter/Tree up and rename to TreeFormatter

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - remove /annotation/Hook module

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - refactor instanceOf as Declaration

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - rename decodeOrThrow -> decode

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - AST: refactor typeAlias adding decode

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - rename getOption -> decodeOption

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - remove /data folder

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - remove /annotation/AST module

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - remove /index module

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - rename decode -> decodeEither

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - formatErrors/ should collapse trees that have a branching factor of 1

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - simplify Arbitrary implementation

### Patch Changes

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - add validate, validateOption, validateEither

- [#144](https://github.com/Effect-TS/schema/pull/144) [`df9ea09`](https://github.com/Effect-TS/schema/commit/df9ea093623640a0e06cdd0147e8e7522ee05110) Thanks [@gcanti](https://github.com/gcanti)! - add encodeOption

## 0.1.0

### Minor Changes

- [#145](https://github.com/Effect-TS/schema/pull/145) [`cc05ffe`](https://github.com/Effect-TS/schema/commit/cc05ffea0f9844b58e7d3bf2e05fed6f827679e7) Thanks [@tim-smart](https://github.com/tim-smart)! - update /data to 0.4.1

### Patch Changes

- [#142](https://github.com/Effect-TS/schema/pull/142) [`bc30196`](https://github.com/Effect-TS/schema/commit/bc3019642d1c0620d82de9462d8dbd134a58c59f) Thanks [@gcanti](https://github.com/gcanti)! - add /data/Option/parseOptionals

## 0.0.5

### Patch Changes

- [#131](https://github.com/Effect-TS/schema/pull/131) [`d07b0f1`](https://github.com/Effect-TS/schema/commit/d07b0f1945d2153610e4ca2572113758af950de3) Thanks [@gcanti](https://github.com/gcanti)! - Pretty: use formatActual as default formatter

- [#134](https://github.com/Effect-TS/schema/pull/134) [`c935ff2`](https://github.com/Effect-TS/schema/commit/c935ff20d415c0baae92e113f64ac0cbb77f7d11) Thanks [@gcanti](https://github.com/gcanti)! - add BrandSchema, getOption

## 0.0.4

### Patch Changes

- [#115](https://github.com/Effect-TS/schema/pull/115) [`1555a81`](https://github.com/Effect-TS/schema/commit/1555a81fb814f612f7ad973add6e29c68f5635dc) Thanks [@gcanti](https://github.com/gcanti)! - Optimize decoding of unions using a heuristic based on literals

## 0.0.3

### Patch Changes

- [#127](https://github.com/Effect-TS/schema/pull/127) [`fd87ac6`](https://github.com/Effect-TS/schema/commit/fd87ac600e98b60da8de6d5792727e2ec8acb6dc) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - Fix release for github

## 0.0.2

### Patch Changes

- [#125](https://github.com/Effect-TS/schema/pull/125) [`41841a3`](https://github.com/Effect-TS/schema/commit/41841a379a97a80e298312d23a1985cc31336834) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - update release

## 0.0.1

### Patch Changes

- [#119](https://github.com/Effect-TS/schema/pull/119) [`62ed1b0`](https://github.com/Effect-TS/schema/commit/62ed1b0b5e7a3e91c62a40f258dbe185a8354b20) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - Move to the @effect org

- [#120](https://github.com/Effect-TS/schema/pull/120) [`6ddb736`](https://github.com/Effect-TS/schema/commit/6ddb736161a1cadc851ac51eb5457ee8534a4ea6) Thanks [@gcanti](https://github.com/gcanti)! - refactor custom types

- [#120](https://github.com/Effect-TS/schema/pull/120) [`6ddb736`](https://github.com/Effect-TS/schema/commit/6ddb736161a1cadc851ac51eb5457ee8534a4ea6) Thanks [@gcanti](https://github.com/gcanti)! - move parseNumber to /data/Number

- [#120](https://github.com/Effect-TS/schema/pull/120) [`6ddb736`](https://github.com/Effect-TS/schema/commit/6ddb736161a1cadc851ac51eb5457ee8534a4ea6) Thanks [@gcanti](https://github.com/gcanti)! - upgrade to latest effect/data

- [#120](https://github.com/Effect-TS/schema/pull/120) [`6ddb736`](https://github.com/Effect-TS/schema/commit/6ddb736161a1cadc851ac51eb5457ee8534a4ea6) Thanks [@gcanti](https://github.com/gcanti)! - /data/Option rename fromNullable to parseNullable

- [#120](https://github.com/Effect-TS/schema/pull/120) [`6ddb736`](https://github.com/Effect-TS/schema/commit/6ddb736161a1cadc851ac51eb5457ee8534a4ea6) Thanks [@gcanti](https://github.com/gcanti)! - move parseDate to /data/Date

- [#120](https://github.com/Effect-TS/schema/pull/120) [`6ddb736`](https://github.com/Effect-TS/schema/commit/6ddb736161a1cadc851ac51eb5457ee8534a4ea6) Thanks [@gcanti](https://github.com/gcanti)! - refactor instanceOf (to a constructor)

- [#120](https://github.com/Effect-TS/schema/pull/120) [`6ddb736`](https://github.com/Effect-TS/schema/commit/6ddb736161a1cadc851ac51eb5457ee8534a4ea6) Thanks [@gcanti](https://github.com/gcanti)! - Added clamp transform to Number and Bigint
