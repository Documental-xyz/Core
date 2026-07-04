import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('.');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));

describe('package.json npm publish config', () => {
  it('has scoped name @documental-xyz/core', () => {
    expect(pkg.name).toBe('@documental-xyz/core');
  });

  it('has version 0.1.0', () => {
    expect(pkg.version).toBe('0.1.0');
  });

  it('has type module', () => {
    expect(pkg.type).toBe('module');
  });

  it('has exports field with at least the integration entry', () => {
    expect(pkg.exports).toBeDefined();
    expect(pkg.exports['.']).toBeDefined();
  });

  it('has files field including src/', () => {
    expect(pkg.files).toContain('src/');
  });

  it('has astro in peerDependencies at ^5.0.0', () => {
    expect(pkg.peerDependencies?.astro).toBe('^5.0.0');
  });

  it('has publishConfig with public access', () => {
    expect(pkg.publishConfig?.access).toBe('public');
  });

  it('has astro-integration and astro-component keywords', () => {
    expect(pkg.keywords).toContain('astro-integration');
    expect(pkg.keywords).toContain('astro-component');
  });

  it('has description field', () => {
    expect(pkg.description).toBeTruthy();
    expect(typeof pkg.description).toBe('string');
  });

  it('has license field', () => {
    expect(pkg.license).toBeTruthy();
    expect(typeof pkg.license).toBe('string');
  });

  it('astro is NOT in dependencies (moved to peerDependencies)', () => {
    expect(pkg.dependencies?.astro).toBeUndefined();
  });
});
