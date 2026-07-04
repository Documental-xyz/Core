import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('.');

function listFiles(dir: string, suffix: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      listFiles(full, suffix, acc);
    } else if (entry.name.endsWith(suffix)) {
      acc.push(full);
    }
  }
  return acc;
}

describe('Blocker 1: no absolute /src/ imports', () => {
  it('no .astro file references /src/assets/ as a string', () => {
    const files = listFiles(path.join(ROOT, 'src'), '.astro');
    const offenders: string[] = [];
    for (const f of files) {
      const content = fs.readFileSync(f, 'utf8');
      if (content.includes('/src/assets/')) offenders.push(path.relative(ROOT, f));
    }
    expect(offenders).toEqual([]);
  });
});

describe('Blocker 2: PAGES_COLLECTION export exists and is used', () => {
  it('src/lib/collections.ts exports PAGES_COLLECTION', () => {
    const target = path.join(ROOT, 'src', 'lib', 'collections.ts');
    expect(fs.existsSync(target)).toBe(true);
    const src = fs.readFileSync(target, 'utf8');
    expect(src).toMatch(/export\s+const\s+PAGES_COLLECTION\s*=/);
  });

  it('[slug].astro imports and uses PAGES_COLLECTION (no bare getCollection(\'pages\'))', () => {
    // T13: route entrypoints moved from src/pages/ to src/routes/ to avoid
    // route conflict with the injectRoute call in the core integration.
    const target = path.join(ROOT, 'src', 'routes', '[slug].astro');
    const src = fs.readFileSync(target, 'utf8');
    expect(src).toMatch(/from\s+['"][^'"]*lib\/collections['"]/);
    // Bare string-literal 'pages' must NOT appear in a getCollection call
    expect(src).not.toMatch(/getCollection\(\s*['"]pages['"]\s*\)/);
  });

  it('PageLayout.astro imports and uses PAGES_COLLECTION (no bare getEntry(\'pages\', ...))', () => {
    const target = path.join(ROOT, 'src', 'layouts', 'pages', 'PageLayout.astro');
    const src = fs.readFileSync(target, 'utf8');
    expect(src).toMatch(/from\s+['"][^'"]*lib\/collections['"]/);
    expect(src).not.toMatch(/getEntry\(\s*['"]pages['"]\s*,/);
  });
});

describe('Blocker 3: main.yml.template with placeholders exists', () => {
  it('public/admin/config/main.yml.template exists', () => {
    const target = path.join(ROOT, 'public', 'admin', 'config', 'main.yml.template');
    expect(fs.existsSync(target)).toBe(true);
  });

  it('template has ${REPO}, ${BRANCH}, ${AUTH_BASE_URL}, ${MEDIA_FOLDER}, ${PUBLIC_FOLDER} placeholders', () => {
    const target = path.join(ROOT, 'public', 'admin', 'config', 'main.yml.template');
    const src = fs.readFileSync(target, 'utf8');
    expect(src).toContain('${REPO}');
    expect(src).toContain('${BRANCH}');
    expect(src).toContain('${AUTH_BASE_URL}');
    expect(src).toContain('${MEDIA_FOLDER}');
    expect(src).toContain('${PUBLIC_FOLDER}');
  });
});

describe('Blocker 5: dead map.png import removed from MapBox', () => {
  it('MapBox.astro does not import a non-existent map.png', () => {
    const target = path.join(ROOT, 'src', 'components', 'MapBox.astro');
    const src = fs.readFileSync(target, 'utf8');
    // The dead import referenced a file that doesn't exist; it must be gone
    expect(src).not.toMatch(/import\s+img\s+from\s+['"][^'"]*map\.png['"]/);
  });
});

describe('Blocker 6: favicon at public root', () => {
  it('public/favicon.svg exists', () => {
    expect(fs.existsSync(path.join(ROOT, 'public', 'favicon.svg'))).toBe(true);
  });

  it('original public/uploads/favicon.svg preserved (copy, not move)', () => {
    expect(fs.existsSync(path.join(ROOT, 'public', 'uploads', 'favicon.svg'))).toBe(true);
  });
});
