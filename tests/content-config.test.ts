import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('.');

describe('Astro 5 Content Layer config', () => {
  it('src/content.config.ts exists (new Astro 5 location)', () => {
    const target = path.join(ROOT, 'src', 'content.config.ts');
    expect(fs.existsSync(target)).toBe(true);
  });

  it('legacy src/content/config.ts is removed', () => {
    const legacy = path.join(ROOT, 'src', 'content', 'config.ts');
    expect(fs.existsSync(legacy)).toBe(false);
  });

  it('uses the Content Layer glob loader', () => {
    const target = path.join(ROOT, 'src', 'content.config.ts');
    const src = fs.readFileSync(target, 'utf8');
    expect(src).toContain('loader: glob(');
  });

  it('specifies a base directory for each collection', () => {
    const target = path.join(ROOT, 'src', 'content.config.ts');
    const src = fs.readFileSync(target, 'utf8');
    expect(src).toMatch(/base:\s*['"]/);
  });

  it('imports glob from astro/loaders', () => {
    const target = path.join(ROOT, 'src', 'content.config.ts');
    const src = fs.readFileSync(target, 'utf8');
    expect(src).toMatch(/from\s+['"]astro\/loaders['"]/);
  });
});
