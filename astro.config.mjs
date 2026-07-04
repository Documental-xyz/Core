import 'dotenv/config';
import { defineConfig } from 'astro/config';
import core from './integration.ts';

const SITE = process.env.SITE || 'http://localhost';

// Use environment variable or default to empty string for local development
let BASE_PATH = process.env.BASE_PATH || '';
if (BASE_PATH) {
  if (!BASE_PATH.startsWith('/')) BASE_PATH = `/${BASE_PATH}`;
  if (!BASE_PATH.endsWith('/')) BASE_PATH = `${BASE_PATH}/`;
}

// Test harness: this repo is both the @documental-xyz/core package AND the
// consumer app. The `core()` integration registers routes, global styles, and
// Vite plugins (YAML merge + override aliases) via `astro:config:setup`.
// T13 moved the YAML plugin registration (T8) out of this file and into the
// integration's `updateConfig` call.
export default defineConfig({
  site: SITE,
  base: BASE_PATH,
  //trailingSlash: 'always',
  output: 'static',
  build: {
    assets: 'assets',
    assetsPrefix: '',
  },
  integrations: [
    core({
      repo: process.env.REPO || 'documental-xyz/Documental',
      branch: process.env.BRANCH || 'main',
      authBaseUrl: process.env.AUTH_BASE_URL,
      mediaFolder: process.env.MEDIA_FOLDER,
      publicFolder: process.env.PUBLIC_FOLDER,
    }),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
});
