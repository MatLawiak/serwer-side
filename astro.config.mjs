// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

const WIEDZA_SLUGS = [
  'co-to-server-side-tracking',
  'ga4-traci-dane',
  'ga4-measurement-protocol-offline-konwersje',
  'meta-capi-server-side-case-study-maltaview',
  'parametr-fbc-meta-capi-niedoraportowane-konwersje',
  'plugin-capi-vs-server-side',
  'roas-spadl-sprzedaz-nie',
  'sgtm-server-side-gtm-google-ads-case-study',
  'cennik-server-side-polska',
  'koszt-leada-dewelopera-meta-capi',
  'formularz-2x-wiecej-leadow',
  'deduplikacja-meta-capi-pixel-parametry',
  'pixelyoursite-gtm-wordpress-konfiguracja',
];

export default defineConfig({
  site: 'https://serwer-side.pl',
  output: 'server',
  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [
    mdx(),
    sitemap({
      customPages: [
        'https://serwer-side.pl/',
        'https://serwer-side.pl/wiedza',
        'https://serwer-side.pl/uslugi',
        'https://serwer-side.pl/o-mnie',
        'https://serwer-side.pl/kontakt',
        'https://serwer-side.pl/server-side-tracking',
        'https://serwer-side.pl/uslugi/meta-power-vps',
        'https://serwer-side.pl/uslugi/google-power-vps',
        'https://serwer-side.pl/uslugi/automatyzacje-vps',
        ...WIEDZA_SLUGS.map((s) => `https://serwer-side.pl/wiedza/${s}`),
      ],
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
