import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://melanie-roy.fr',
  output: 'static',
  build: { inlineStylesheets: 'never' },
  integrations: [sitemap()],
});
