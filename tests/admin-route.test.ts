import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('admin.astro route entrypoint', () => {
  it('src/admin/admin.astro exists', () => {
    expect(fs.existsSync(path.resolve('src/admin/admin.astro'))).toBe(true);
  });
  it('contains Sveltia CMS script reference', () => {
    const content = fs.readFileSync(path.resolve('src/admin/admin.astro'), 'utf8');
    expect(content).toMatch(/sveltia-cms/i);
  });
  it('contains the showDirectoryPicker patch', () => {
    const content = fs.readFileSync(path.resolve('src/admin/admin.astro'), 'utf8');
    expect(content).toMatch(/showDirectoryPicker/);
  });
  it('package.json exports ./admin.astro', () => {
    const pkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));
    expect(pkg.exports['./admin.astro']).toBeDefined();
  });
});
