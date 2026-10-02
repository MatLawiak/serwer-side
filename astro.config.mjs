// @ts-check
import { readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// Artykuły renderują się na żądanie, więc wtyczka mapy ich nie widzi i trzeba
// je podać wprost. Lista czyta się z folderu: ręczna gubiła nowe artykuły.
const WIEDZA_SLUGS = readdirSync(new URL('./src/content/wiedza', import.meta.url))
  .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
  .map((f) => f.replace(/\.mdx?$/, ''))
  .sort();

export default defineConfig({
  site: 'https://serwer-side.pl',
  output: 'server',
  adapter: cloudflare({ imageService: 'compile' }),
  // Trzy podstrony usług i ich lista zostały zastąpione jedną ofertą.
  // 301, żeby linki z zewnątrz i pozycje w wyszukiwarce przeszły na nowy adres.
  redirects: Object.fromEntries(
    ['/uslugi', '/uslugi/meta-power-vps', '/uslugi/google-power-vps', '/uslugi/automatyzacje-vps'].map(
      (stary) => [stary, { status: 301, destination: '/uslugi/infrastruktura-premium/' }],
    ),
  ),
  integrations: [
    mdx(),
    sitemap({
      // Zwykłe podstrony wtyczka dodaje sama, z ukośnikiem na końcu. Ręcznie
      // podajemy tylko artykuły (trasa dynamiczna): wpisanie tu także podstron
      // dawało w mapie każdy adres dwa razy.
      customPages: WIEDZA_SLUGS.map((s) => `https://serwer-side.pl/wiedza/${s}`),
      // Podziękowanie po formularzu nie jest treścią do wyszukiwarki.
      filter: (page) => !page.includes('/wiadomosc-wyslana'),
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
