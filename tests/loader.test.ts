import { describe, it, expect } from 'vitest';
import {
  createPagesLoader,
  pagesSchema,
  blogSchema,
  geoStorySchema,
} from '../src/content/loader';

describe('content loader exports', () => {
  it('createPagesLoader is a function', () => {
    expect(typeof createPagesLoader).toBe('function');
  });
  it('createPagesLoader returns an object (glob loader)', () => {
    const loader = createPagesLoader({ base: './pages' });
    expect(loader).toBeDefined();
    expect(typeof loader).toBe('object');
  });
  it('pagesSchema is a Zod schema (object with shape or parse)', () => {
    expect(pagesSchema).toBeDefined();
    expect(typeof pagesSchema.parse).toBe('function');
  });
  it('blogSchema and geoStorySchema are exported (dead code kept per user decision)', () => {
    expect(blogSchema).toBeDefined();
    expect(geoStorySchema).toBeDefined();
  });
});
