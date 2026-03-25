import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://centerforpta.com',
  integrations: [tailwind()],
  build: {
    inlineStylesheets: 'always'
  }
});
