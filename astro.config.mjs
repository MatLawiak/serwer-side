// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://server-side.pl',
  output: 'server',
  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [
    mdx(),
    sitemap(),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
