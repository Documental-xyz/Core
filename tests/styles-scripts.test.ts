import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';

describe('styles and scripts package exports', () => {
  it('package.json exports ./styles/*', () => {
    const pkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));
    expect(pkg.exports['./styles/*']).toBeDefined();
  });
  it('package.json exports ./scripts/*', () => {
    const pkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));
    expect(pkg.exports['./scripts/*']).toBeDefined();
  });
  it('no SCSS file uses absolute /src/ paths', () => {
    const scssFiles = globSync('src/assets/styles/**/*.scss');
    const offenders: string[] = [];
    for (const f of scssFiles) {
      const content = fs.readFileSync(f, 'utf8');
      if (content.includes('@use "/src/') || content.includes('@import "/src/')) {
        offenders.push(f);
      }
    }
    expect(offenders).toEqual([]);
  });
  it('main.scss exists and is non-empty', () => {
    const main = fs.readFileSync(path.resolve('src/assets/styles/main.scss'), 'utf8');
    expect(main.length).toBeGreaterThan(0);
  });
  it('App.js exists and is non-empty', () => {
    const app = fs.readFileSync(path.resolve('src/assets/scripts/App.js'), 'utf8');
    expect(app.length).toBeGreaterThan(0);
  });
});
