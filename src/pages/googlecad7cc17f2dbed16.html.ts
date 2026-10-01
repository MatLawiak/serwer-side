import type { APIRoute } from 'astro';

// Plik weryfikacyjny Google Search Console (własność domeny dla ekranu zgody
// OAuth w projekcie „Raporty”). Trasa zamiast pliku w public/: Cloudflare Pages
// przekierowuje statyczne *.html na adres bez rozszerzenia, a Google wymaga
// odpowiedzi 200 dokładnie pod tym adresem. Nie usuwać: Google sprawdza plik
// okresowo i po jego zniknięciu cofa weryfikację.
export const prerender = false;

export const GET: APIRoute = () =>
  new Response('google-site-verification: googlecad7cc17f2dbed16.html', {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
