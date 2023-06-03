/**
 * @since 1.0.0
 */
import * as S from "@effect/schema/Schema";
import type * as FastCheck from "fast-check";
/**
 * @category model
 * @since 1.0.0
 */
export interface Arbitrary<A> {
    (fc: typeof FastCheck): FastCheck.Arbitrary<A>;
}
/**
 * @category hooks
 * @since 1.0.0
 */
export declare const ArbitraryHookId: symbol;
/**
 * @category arbitrary
 * @since 1.0.0
 */
export declare const build: <A>(schema: S.Schema<A>) => (fc: typeof FastCheck) => FastCheck.Arbitrary<A>;
//# sourceMappingURL=Arbitrary.d.ts.map