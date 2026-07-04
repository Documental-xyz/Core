import fs from 'node:fs';
import path from 'node:path';

/**
 * Scan the consumer's `src/components/` and `src/layouts/` directories and
 * produce Vite `resolve.alias` entries that redirect `@documental-xyz/core`
 * bare-specifier imports to the consumer's local files.
 *
 * This is the override mechanism documented in T2 POC finding #3: a consumer
 * can drop a local `.astro` file with the same name as a core component/layout
 * and have it shadow the core's version. Only files that EXIST locally are
 * aliased — missing files fall through to the core package via `exports`.
 *
 * Key constraint (T2 POC): the alias `find` string MUST be the exact full
 * subpath including the `.astro` extension. A vague `@documental-xyz/core`
 * → dir alias is insufficient and breaks resolution.
 *
 * @param consumerRoot Absolute path to the consumer project root
 *                     (defaults to `process.cwd()`).
 * @returns Array of Vite alias entries `{ find, replacement }`.
 */
export function overrideAliases(
  consumerRoot: string = process.cwd()
): Array<{ find: string; replacement: string }> {
  const aliases: Array<{ find: string; replacement: string }> = [];
  const coreName = '@documental-xyz/core';

  // 1. Components — flat directory, one .astro file per override.
  const localComponentsDir = path.resolve(consumerRoot, 'src/components');
  if (fs.existsSync(localComponentsDir)) {
    for (const file of fs.readdirSync(localComponentsDir)) {
      if (file.endsWith('.astro')) {
        const localPath = path.resolve(localComponentsDir, file);
        aliases.push({
          find: `${coreName}/components/${file}`,
          replacement: localPath,
        });
      }
    }
  }

  // 2. Layouts — recursive walk (src/layouts/components/, src/layouts/pages/, etc).
  const localLayoutsDir = path.resolve(consumerRoot, 'src/layouts');
  if (fs.existsSync(localLayoutsDir)) {
    const scanLayouts = (dir: string, prefix: string = '') => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
          scanLayouts(
            path.resolve(dir, entry.name),
            `${prefix}${entry.name}/`
          );
        } else if (entry.name.endsWith('.astro')) {
          const localPath = path.resolve(dir, entry.name);
          aliases.push({
            find: `${coreName}/layouts/${prefix}${entry.name}`,
            replacement: localPath,
          });
        }
      }
    };
    scanLayouts(localLayoutsDir);
  }

  return aliases;
}

export default overrideAliases;
