/**
 * Config inheritance helper for pageInclude.mainSlug fallback.
 *
 * When a sub-page renders on its own route (standalone:true) and declares
 * `pageInclude.mainSlug`, it inherits configs from the parent page as FALLBACK.
 * Own configs always win (deep merge by key). Arrays are atomic — if `own`
 * defines an array, it fully replaces the parent's array (no concatenation,
 * no element-by-element merge).
 *
 * See `.omo/notepads/page-include-config-inheritance/learnings.md` for context.
 */

export interface MergeOptions {
  /**
   * Keys that are NEVER inherited from parent. Used to avoid Zod-default
   * collisions — e.g. `pageSettings.animations` defaults to `'enable_all'`
   * via Zod, so if a sub-page omits it we want the Zod default to apply,
   * NOT the parent's explicit value.
   */
  excludeKeys?: ReadonlySet<string> | string[];
}

/**
 * Merge `own` (sub-page config) with `parent` (parent page config) as fallback.
 *
 * Semantics:
 *  - own undefined/null + parent undefined/null → undefined
 *  - own undefined/null + parent exists → parent
 *  - own exists + parent undefined/null → own
 *  - both exist → for each key in parent: if key is missing/undefined in own,
 *    use parent's value; otherwise keep own's value.
 *
 * Arrays are atomic: if `own[key]` is an array (even empty), it replaces
 * `parent[key]` entirely. No concat, no element merge.
 *
 * `options.excludeKeys` keys are never inherited from parent.
 */
export function mergeWithFallback<T extends Record<string, any> | undefined | null>(
  own: T,
  parent: Record<string, any> | undefined | null,
  options: MergeOptions = {}
): T | undefined {
  const ownIsNull = own === undefined || own === null;
  const parentIsNull = parent === undefined || parent === null;

  if (ownIsNull && parentIsNull) return undefined;
  if (ownIsNull) return parent as T;
  if (parentIsNull) return own;

  const excludeSet =
    options.excludeKeys instanceof Set
      ? options.excludeKeys
      : new Set(options.excludeKeys ?? []);

  // Both exist — shallow clone own, fill missing keys from parent.
  const merged: Record<string, any> = { ...(own as Record<string, any>) };
  for (const [key, parentValue] of Object.entries(parent as Record<string, any>)) {
    if (excludeSet.has(key)) continue;
    const ownValue = (own as Record<string, any>)[key];
    if (ownValue === undefined) {
      if (parentValue !== undefined) {
        merged[key] = parentValue;
      }
    }
    // else: keep own value (atomic for arrays/objects/primitives — own wins)
  }
  return merged as T;
}
