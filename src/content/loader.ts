import { glob } from 'astro/loaders';
import { pagesSchema, blogSchema, geoStorySchema } from './schema';

export { pagesSchema, blogSchema, geoStorySchema };

/**
 * Create a glob loader for the pages collection.
 *
 * `base` is resolved against the CONSUMER's CWD (verified in Wave 0 POC, T1),
 * so a starter project can call `createPagesLoader({ base: './pages' })` and
 * have it read the starter's own `./pages/` directory.
 *
 * Pass an optional `generateId` override to customise id derivation
 * (e.g. the test-harness non-ASCII filename fix from T4).
 */
export function createPagesLoader({
  base,
  generateId,
}: {
  base: string;
  generateId?: (opts: any) => string;
}) {
  return glob({
    pattern: '**/*.md',
    base,
    // pass through generateId if provided (T4's non-ASCII fix uses this)
    ...(generateId ? { generateId } : {}),
  });
}
