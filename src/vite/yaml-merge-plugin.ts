/**
 * Vite plugin: merges Sveltia CMS YAML config fragments into a single
 * `public/admin/config.yml`, substituting placeholders from integration
 * options.
 *
 * ## Why text-concatenation, not parse-then-merge?
 *
 * The YAML fragments in `public/admin/config/components/*.yml` define anchors
 * (e.g. `&pageSettings`) that are aliased (`*pageSettings`) by the collections
 * fragments in `public/admin/config/collections/*.yml`. Anchors only resolve
 * within a single YAML document. The predecessor `vite.config.mjs` plugin had
 * a bug: it parsed each file independently (`mergedConfig = { ...mergedConfig,
 * ...parsed }`), which (a) shallow-merged and (b) dropped all cross-file
 * anchor resolution.
 *
 * The correct approach — inherited from the now-deleted `build-config.js` —
 * is to concatenate the fragment texts in order into one YAML stream, then
 * let `js-yaml` resolve anchors across the whole stream in a single pass.
 * Because each fragment contributes distinct top-level keys, the resulting
 * document is the deep union of all fragments. Placeholders are substituted
 * on the final concatenated text before parse.
 *
 * @packageDocumentation
 */

import { glob } from 'glob';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

/**
 * Root of the @documental-xyz/core package, resolved from this module's
 * location. Template YAML files (main.yml.template, components/, collections/)
 * live under `public/admin/config/` relative to this root. The output
 * `config.yml` is written to the consumer's `public/admin/`.
 */
const CORE_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..'
);

/** Options for {@link createYamlMergePlugin}. */
export interface YamlMergePluginOptions {
  /** GitHub repo in `owner/name` form. Required. Substitutes `${REPO}`. */
  repo: string;
  /** Git branch. Defaults to `'main'`. Substitutes `${BRANCH}`. */
  branch?: string;
  /** Auth base URL for Sveltia auth. Substitutes `${AUTH_BASE_URL}`. */
  authBaseUrl?: string;
  /** CMS media_folder. Defaults to `'public/uploads'`. Substitutes `${MEDIA_FOLDER}`. */
  mediaFolder?: string;
  /** CMS public_folder. Defaults to `'uploads'`. Substitutes `${PUBLIC_FOLDER}`. */
  publicFolder?: string;
  /** Pages collection folder path. Defaults to `'src/content/pages'`. Substitutes `${PAGES_FOLDER}`. */
  pagesFolder?: string;
  /**
   * Override the core package root for template resolution.
   * Defaults to `CORE_ROOT` (resolved from this module's location).
   * Only needed in tests or unusual consumption scenarios.
   */
  coreRoot?: string;
}

/** Resolved options after defaults applied. */
interface ResolvedOptions {
  repo: string;
  branch: string;
  authBaseUrl: string;
  mediaFolder: string;
  publicFolder: string;
  pagesFolder: string;
  coreRoot: string;
}

/** Default option values — kept here so tests can reference them too. */
export const YAML_MERGE_DEFAULTS = {
  branch: 'main',
  mediaFolder: 'public/uploads',
  publicFolder: 'uploads',
  pagesFolder: 'src/content/pages',
} as const;

function resolveOptions(opts: YamlMergePluginOptions): ResolvedOptions {
  if (!opts || typeof opts.repo !== 'string' || opts.repo.length === 0) {
    throw new Error(
      '[documental-yaml-merge] option `repo` is required (e.g. "owner/name").'
    );
  }
  return {
    repo: opts.repo,
    branch: opts.branch ?? YAML_MERGE_DEFAULTS.branch,
    authBaseUrl: opts.authBaseUrl ?? '',
    mediaFolder: opts.mediaFolder ?? YAML_MERGE_DEFAULTS.mediaFolder,
    publicFolder: opts.publicFolder ?? YAML_MERGE_DEFAULTS.publicFolder,
    pagesFolder: opts.pagesFolder ?? YAML_MERGE_DEFAULTS.pagesFolder,
    coreRoot: opts.coreRoot ?? CORE_ROOT,
  };
}

/**
 * Substitute `${PLACEHOLDER}` tokens in `text` using `values`.
 * Unknown placeholders are left untouched (they may be intended for a later
 * substitution pass, e.g. user-authored content).
 */
export function substitutePlaceholders(
  text: string,
  values: Record<string, string>
): string {
  // First pass: remove entire lines where a placeholder is the sole value
  // and the placeholder resolves to empty string (e.g. `base_url: ${AUTH_BASE_URL}`
  // when AUTH_BASE_URL is unset → the line becomes `base_url: ` which YAML
  // interprets as `null`, crashing Sveltia CMS).
  let result = text.replace(
    /^([ \t]*\w+:[\t ]*)\$\{([A-Z_][A-Z0-9_]*)\}[\t ]*$/gm,
    (match, prefix, name) => {
      if (
        Object.prototype.hasOwnProperty.call(values, name) &&
        values[name] === ''
      ) {
        return ''; // Remove the line entirely
      }
      return match; // Leave it for the generic substitution below
    }
  );
  // Second pass: substitute all remaining placeholders normally
  result = result.replace(/\$\{([A-Z_][A-Z0-9_]*)\}/g, (match, name) =>
    Object.prototype.hasOwnProperty.call(values, name) ? values[name] : match
  );
  return result;
}

/** Read a file, returning empty string if it does not exist. */
function readIfExists(p: string): string | null {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return null;
  }
}

/**
 * Build the merged YAML text by concatenating fragments in the canonical
 * order: main (template preferred) → components (per `components.yml`) →
 * collections (alphabetical).
 *
 * Exposed for testability.
 */
export async function buildMergedYamlText(
  projectRoot: string,
  resolved: ResolvedOptions
): Promise<string> {
  const adminDir = path.join(resolved.coreRoot, 'public/admin');
  const configDir = path.join(adminDir, 'config');

  // 1. Main config — prefer T7's template, fall back to static main.yml.
  const templatePath = path.join(configDir, 'main.yml.template');
  const mainPath = path.join(configDir, 'main.yml');
  const mainRaw =
    readIfExists(templatePath) ?? readIfExists(mainPath) ?? '';
  if (mainRaw === '') {
    throw new Error(
      `[documental-yaml-merge] no main config found: expected ${templatePath} or ${mainPath}.`
    );
  }

  // 2. Components in the order declared by components.yml.
  const componentsManifestPath = path.join(adminDir, 'components.yml');
  const componentsManifestRaw = readIfExists(componentsManifestPath);
  let componentOrder: string[] = [];
  if (componentsManifestRaw) {
    const manifest = yaml.load(componentsManifestRaw) as {
      components?: string[];
    };
    componentOrder = Array.isArray(manifest?.components)
      ? (manifest!.components as string[])
      : [];
  }

  // 3. Collections (alphabetical — matches original build-config.js behavior).
  const collectionFiles = await glob(
    path.join(configDir, 'collections/*.yml').replace(/\\/g, '/')
  );
  collectionFiles.sort();

  // Concatenate everything into one YAML stream. Trailing newline separators
  // keep top-level keys from adjacent fragments on distinct document lines.
  const parts: string[] = [];
  parts.push(mainRaw.replace(/\s+$/, ''));
  for (const rel of componentOrder) {
    const full = path.join(configDir, rel);
    const content = readIfExists(full);
    if (content === null) {
      console.warn(
        `[documental-yaml-merge] component file listed in components.yml not found: ${rel}`
      );
      continue;
    }
    parts.push(content.replace(/\s+$/, ''));
  }
  for (const file of collectionFiles) {
    const content = readIfExists(file);
    if (content === null) continue;
    parts.push(content.replace(/\s+$/, ''));
  }

  const concatenated = parts.join('\n') + '\n';

  // Substitute placeholders on the merged text. Substituting AFTER concat
  // (rather than only on main.yml) keeps the door open to placeholders in any
  // fragment — harmless when none are present.
  return substitutePlaceholders(concatenated, {
    REPO: resolved.repo,
    BRANCH: resolved.branch,
    AUTH_BASE_URL: resolved.authBaseUrl,
    MEDIA_FOLDER: resolved.mediaFolder,
    PUBLIC_FOLDER: resolved.publicFolder,
    PAGES_FOLDER: resolved.pagesFolder,
  });
}

/**
 * Create a Vite plugin that merges Sveltia CMS YAML fragments into
 * `public/admin/config.yml` at build-start. Runs in BOTH `dev` and `build`.
 */
export function createYamlMergePlugin(options: YamlMergePluginOptions): {
  name: string;
  buildStart: () => Promise<void>;
} {
  const resolved = resolveOptions(options);

  return {
    name: 'documental-yaml-merge',
    async buildStart() {
      const projectRoot = process.cwd();
      const mergedText = await buildMergedYamlText(projectRoot, resolved);

      // Sanity: the merged stream must parse cleanly (catches broken anchors).
      // We discard the parsed value — the artifact is the text itself, to
      // preserve comments, anchor definitions, and original formatting.
      try {
        yaml.load(mergedText, { schema: yaml.DEFAULT_FULL_SCHEMA });
      } catch (err) {
        throw new Error(
          `[documental-yaml-merge] merged config failed to parse: ${(err as Error).message}`
        );
      }

      const outDir = path.join(projectRoot, 'public/admin');
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }
      fs.writeFileSync(path.join(outDir, 'config.yml'), mergedText);
    },
  };
}

export default createYamlMergePlugin;
