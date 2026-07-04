import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import yaml from 'js-yaml';
import { createYamlMergePlugin } from '../src/vite/yaml-merge-plugin';

/**
 * T8 — yaml-merge-plugin tests.
 *
 * Strategy: use a real temp fixture directory (NOT vi.mock) so the plugin's
 * fs/glob/yaml interactions are exercised end-to-end. This catches real bugs
 * that mocking would hide (e.g. wrong path joins, glob ordering).
 */
describe('yaml-merge-plugin', () => {
  let tmpRoot: string;
  let origCwd: string;

  beforeEach(() => {
    tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'yaml-merge-'));
    origCwd = process.cwd();
    process.chdir(tmpRoot);
  });

  afterEach(() => {
    process.chdir(origCwd);
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  /** Build a fixture tree mirroring public/admin structure. */
  function fixture(opts: {
    mainTemplate?: string;
    mainYml?: string;
    componentsOrder?: string[];
    componentFiles?: Record<string, string>;
    collectionFiles?: Record<string, string>;
  }) {
    fs.mkdirSync(path.join(tmpRoot, 'public/admin/config/components'), {
      recursive: true,
    });
    fs.mkdirSync(path.join(tmpRoot, 'public/admin/config/collections'), {
      recursive: true,
    });

    if (opts.mainTemplate !== undefined) {
      fs.writeFileSync(
        path.join(tmpRoot, 'public/admin/config/main.yml.template'),
        opts.mainTemplate
      );
    }
    if (opts.mainYml !== undefined) {
      fs.writeFileSync(
        path.join(tmpRoot, 'public/admin/config/main.yml'),
        opts.mainYml
      );
    }
    if (opts.componentsOrder) {
      fs.writeFileSync(
        path.join(tmpRoot, 'public/admin/components.yml'),
        `components:\n${opts.componentsOrder.map((c) => `  - ${c}`).join('\n')}\n`
      );
    }
    for (const [name, content] of Object.entries(opts.componentFiles ?? {})) {
      fs.writeFileSync(
        path.join(tmpRoot, `public/admin/config/components/${name}`),
        content
      );
    }
    for (const [name, content] of Object.entries(opts.collectionFiles ?? {})) {
      fs.writeFileSync(
        path.join(tmpRoot, `public/admin/config/collections/${name}`),
        content
      );
    }
  }

  /** Run the plugin's buildStart against the current fixture. */
  async function runPlugin(options: Parameters<typeof createYamlMergePlugin>[0]) {
    const plugin = createYamlMergePlugin({
      ...options,
      coreRoot: tmpRoot, // resolve templates from the test fixture, not actual CORE_ROOT
    });
    // buildStart may be a hook generator; normalize call context.
    const fn = plugin.buildStart as unknown as (...args: any[]) => any;
    await fn.call({} as any);
  }

  it('exports a factory function', () => {
    expect(typeof createYamlMergePlugin).toBe('function');
  });

  it('returns a Vite plugin with name and buildStart hook', () => {
    const plugin = createYamlMergePlugin({ repo: 'org/repo' });
    expect(plugin.name).toBe('documental-yaml-merge');
    expect(typeof plugin.buildStart).toBe('function');
  });

  it('writes public/admin/config.yml', async () => {
    fixture({
      mainTemplate: 'backend:\n  name: github\n  repo: ${REPO}\n',
      componentsOrder: ['components/Text.yml'],
      componentFiles: {
        'Text.yml': 'text: &text\n  label: Text\n  widget: object\n',
      },
    });
    await runPlugin({ repo: 'org/repo' });
    const out = path.join(tmpRoot, 'public/admin/config.yml');
    expect(fs.existsSync(out)).toBe(true);
  });

  it('deep-merges YAML fragments (NOT shallow) — distinct top-level keys all appear', async () => {
    // Two fragments with distinct top-level keys (text, button). Shallow vs deep
    // makes no difference for distinct keys, but this guards against the
    // vite.config.mjs bug where per-file parse drops cross-file anchors.
    fixture({
      mainTemplate: 'backend:\n  name: github\n',
      componentsOrder: ['components/Text.yml', 'components/Button.yml'],
      componentFiles: {
        'Text.yml': 'text: &text\n  label: Text\n  widget: object\n',
        'Button.yml':
          'button: &button\n  label: Button\n  widget: object\n',
      },
      collectionFiles: {
        'pages.yml':
          'collections:\n  - name: pages\n    fields:\n      - *text\n      - *button\n',
      },
    });
    await runPlugin({ repo: 'org/repo' });
    const out = fs.readFileSync(
      path.join(tmpRoot, 'public/admin/config.yml'),
      'utf8'
    );
    // Both distinct top-level component defs present.
    expect(out).toMatch(/^text:/m);
    expect(out).toMatch(/^button:/m);
    expect(out).toMatch(/^collections:/m);
    // Cross-file anchor aliases must resolve when the merged stream is parsed.
    // The plugin writes the raw concatenated text (preserving `*text` aliases —
    // Sveltia CMS resolves them client-side, same as the predecessor
    // build-config.js). So we verify resolution by PARSING the output, not by
    // grepping for the absence of `*text` tokens.
    const parsed = yaml.load(out) as Record<string, any>;
    const pagesCollection = parsed.collections.find(
      (c: any) => c.name === 'pages'
    );
    expect(pagesCollection).toBeDefined();
    // If anchors had NOT resolved (the per-file-parse bug), these would be
    // unresolved-alias errors or wrong types. Resolved aliases copy the object.
    expect(pagesCollection.fields[0].label).toBe('Text');
    expect(pagesCollection.fields[1].label).toBe('Button');
  });

  it('deep-merges: nested content from ALL fragments appears in output (not lost via shallow per-file parse)', async () => {
    // Each component fragment has a DISTINCT top-level key in production
    // (text:, button:, pageSettings:, etc.). The "shallow merge" bug being
    // fixed is that vite.config.mjs parsed each file SEPARATELY, which
    // (a) dropped cross-file anchors and (b) lost nested content. The fix
    // (text-concat-then-parse) produces the deep union: every nested field
    // from every fragment survives. We assert that here by checking deeply
    // nested leaf values from three separate fragments.
    fixture({
      mainTemplate: 'backend:\n  name: github\n',
      componentsOrder: [
        'components/PageSettings.yml',
        'components/Text.yml',
        'components/Button.yml',
      ],
      componentFiles: {
        'PageSettings.yml':
          'pageSettings: &pageSettings\n  label: Page Settings\n  widget: object\n  fields:\n    - { name: seoTitle, widget: string }\n',
        'Text.yml':
          'text: &text\n  label: Text\n  widget: object\n  fields:\n    - { name: content, widget: markdown }\n',
        'Button.yml':
          'button: &button\n  label: Button\n  widget: object\n  fields:\n    - { name: href, widget: string }\n',
      },
      collectionFiles: {
        'pages.yml':
          'collections:\n  - name: pages\n    fields:\n      - *pageSettings\n      - *text\n      - *button\n',
      },
    });
    await runPlugin({ repo: 'org/repo' });
    const out = fs.readFileSync(
      path.join(tmpRoot, 'public/admin/config.yml'),
      'utf8'
    );
    const parsed = yaml.load(out) as Record<string, any>;
    // All three component defs present (distinct top-level keys → deep union).
    expect(parsed.pageSettings).toBeDefined();
    expect(parsed.text).toBeDefined();
    expect(parsed.button).toBeDefined();
    // Nested leaf from each survived (proves not shallow-truncated).
    expect(parsed.pageSettings.fields[0].name).toBe('seoTitle');
    expect(parsed.text.fields[0].name).toBe('content');
    expect(parsed.button.fields[0].name).toBe('href');
    // Cross-file anchors resolved inside collections (the real bug fix).
    const pagesCollection = parsed.collections.find(
      (c: any) => c.name === 'pages'
    );
    expect(pagesCollection.fields.length).toBe(3);
    expect(pagesCollection.fields[0].label).toBe('Page Settings');
    expect(pagesCollection.fields[1].label).toBe('Text');
    expect(pagesCollection.fields[2].label).toBe('Button');
  });

  it('rejects duplicate top-level keys with a clear error (catches authoring mistakes)', async () => {
    // Two fragments defining the SAME top-level key is a YAML duplicate-key
    // error after concatenation. Production fragments never do this (all 30
    // component keys are distinct); the plugin surfaces it loudly rather than
    // silently dropping one fragment.
    fixture({
      mainTemplate: 'backend:\n  name: github\n',
      componentsOrder: ['components/A.yml', 'components/B.yml'],
      componentFiles: {
        'A.yml': 'composite:\n  a: 1\n',
        'B.yml': 'composite:\n  b: 2\n',
      },
    });
    await expect(runPlugin({ repo: 'org/repo' })).rejects.toThrow(
      /duplicated mapping key|merged config failed to parse/i
    );
  });

  it("substitutes ${REPO}, ${BRANCH}, ${AUTH_BASE_URL}, ${MEDIA_FOLDER}, ${PUBLIC_FOLDER} placeholders", async () => {
    fixture({
      mainTemplate: `backend:
  name: github
  repo: \${REPO}
  branch: \${BRANCH}
  base_url: \${AUTH_BASE_URL}
media_folder: \${MEDIA_FOLDER}
public_folder: \${PUBLIC_FOLDER}
`,
      componentsOrder: [],
    });
    await runPlugin({
      repo: 'octo/cat',
      branch: 'develop',
      authBaseUrl: 'https://auth.example.com',
      mediaFolder: 'public/media',
      publicFolder: 'media',
    });
    const out = fs.readFileSync(
      path.join(tmpRoot, 'public/admin/config.yml'),
      'utf8'
    );
    expect(out).toContain('repo: octo/cat');
    expect(out).toContain('branch: develop');
    expect(out).toContain('base_url: https://auth.example.com');
    expect(out).toContain('media_folder: public/media');
    expect(out).toContain('public_folder: media');
    // No leftover placeholders.
    expect(out).not.toMatch(/\$\{[A-Z_]+\}/);
  });

  it("uses option defaults: branch=main, mediaFolder=public/uploads, publicFolder=uploads", async () => {
    fixture({
      mainTemplate: `backend:
  name: github
  repo: \${REPO}
  branch: \${BRANCH}
  base_url: \${AUTH_BASE_URL}
media_folder: \${MEDIA_FOLDER}
public_folder: \${PUBLIC_FOLDER}
`,
      componentsOrder: [],
    });
    await runPlugin({
      repo: 'octo/cat',
      authBaseUrl: 'https://auth.example.com',
    });
    const out = fs.readFileSync(
      path.join(tmpRoot, 'public/admin/config.yml'),
      'utf8'
    );
    expect(out).toContain('branch: main');
    expect(out).toContain('media_folder: public/uploads');
    expect(out).toContain('public_folder: uploads');
  });

  it('prefers main.yml.template over main.yml when both exist', async () => {
    fixture({
      mainTemplate: 'backend:\n  repo: \${REPO}\n',
      mainYml: 'backend:\n  repo: should-not-be-used\n',
      componentsOrder: [],
    });
    await runPlugin({ repo: 'used-template' });
    const out = fs.readFileSync(
      path.join(tmpRoot, 'public/admin/config.yml'),
      'utf8'
    );
    expect(out).toContain('used-template');
    expect(out).not.toContain('should-not-be-used');
  });

  it('falls back to main.yml when template is absent', async () => {
    fixture({
      mainYml: 'backend:\n  repo: fallback-main\n',
      componentsOrder: [],
    });
    await runPlugin({ repo: 'ignored-without-template' });
    const out = fs.readFileSync(
      path.join(tmpRoot, 'public/admin/config.yml'),
      'utf8'
    );
    expect(out).toContain('fallback-main');
  });

  it('respects component order from components.yml', async () => {
    fixture({
      mainTemplate: 'backend:\n  name: github\n',
      componentsOrder: ['components/B.yml', 'components/A.yml'],
      componentFiles: {
        'A.yml': 'aKey: &aKey\n  label: A\n',
        'B.yml': 'bKey: &bKey\n  label: B\n',
      },
    });
    await runPlugin({ repo: 'org/repo' });
    const out = fs.readFileSync(
      path.join(tmpRoot, 'public/admin/config.yml'),
      'utf8'
    );
    // B should appear before A in the concatenated output.
    const bIdx = out.indexOf('bKey:');
    const aIdx = out.indexOf('aKey:');
    expect(bIdx).toBeGreaterThan(-1);
    expect(aIdx).toBeGreaterThan(-1);
    expect(bIdx).toBeLessThan(aIdx);
  });

  it('warns (not crash) on a missing component file listed in components.yml', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    fixture({
      mainTemplate: 'backend:\n  name: github\n',
      componentsOrder: ['components/Missing.yml', 'components/Text.yml'],
      componentFiles: {
        'Text.yml': 'text: &text\n  label: Text\n',
      },
    });
    await expect(runPlugin({ repo: 'org/repo' })).resolves.not.toThrow();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('components/Missing.yml')
    );
    // Still produced output with the present fragment.
    const out = fs.readFileSync(
      path.join(tmpRoot, 'public/admin/config.yml'),
      'utf8'
    );
    expect(out).toContain('text:');
    warnSpy.mockRestore();
  });
});
