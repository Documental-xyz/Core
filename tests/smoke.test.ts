import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('documental smoke', () => {
  it('package.json has correct structure', () => {
    const pkg = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'));
    expect(pkg.name).toBeDefined();
    expect(pkg.scripts.dev).toBeDefined();
  });

  it('src/content/pages directory exists with markdown files', () => {
    const dir = path.resolve('./src/content/pages');
    expect(fs.existsSync(dir)).toBe(true);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    expect(files.length).toBeGreaterThan(0);
  });
});
