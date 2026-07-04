import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import {
  createPagesLoader,
  pagesSchema,
  blogSchema,
  geoStorySchema,
} from './content/loader';

function readFrontmatterSlug(entry, base) {
  try {
    const filePath = fileURLToPath(new URL(entry, base));
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = matter(raw);
    return parsed.data.slug ? String(parsed.data.slug) : undefined;
  } catch {
    return undefined;
  }
}

const pagesCollection = defineCollection({
  loader: createPagesLoader({
    base: './src/content/pages',
    generateId: ({ entry, base, data }) => {
      // Preserve Astro 4 behaviour: frontmatter `slug` overrides filename-derived id.
      // Astro 5's glob loader fails to parse frontmatter for non-ASCII filenames
      // (data comes back empty), so we re-read the file as a fallback.
      const slug = (data && data.slug) || readFrontmatterSlug(entry, base);
      if (slug) return String(slug);
      return entry.replace(/\.md$/, '').replace(/[^a-zA-Z0-9-]/g, '');
    },
  }),
  schema: pagesSchema,
});

export const collections = {
  pages: pagesCollection,
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: blogSchema,
  }),
  geostorys: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/geostorys' }),
    schema: geoStorySchema,
  }),
};
