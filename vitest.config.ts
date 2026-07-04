import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      // `astro:content` is a build-time virtual module; under vitest we alias it
      // to `astro/zod` which re-exports Zod with the same `z`/`defineCollection`
      // surface that the schemas use. (Only the `z` export is exercised by tests.)
      'astro:content': 'astro/zod',
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});
