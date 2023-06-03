import * as AST from "@effect/schema/AST";
import * as S from "@effect/schema/Schema";
/**
 * @category model
 * @since 1.0.0
 */
export interface Pretty<To> {
    (a: To): string;
}
/**
 * @category hooks
 * @since 1.0.0
 */
export declare const PrettyHookId: symbol;
/**
 * @category prettify
 * @since 1.0.0
 */
export declare const build: <A>(schema: S.Schema<A>) => (a: A) => string;
/**
 * @since 1.0.0
 */
export declare const match: AST.Match<Pretty<any>>;
//# sourceMappingURL=Pretty.d.ts.map