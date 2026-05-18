#!/usr/bin/env node
// Generuje grafiki do artykułu i karuzeli: PixelYourSite + GTM konfiguracja
// Slajdy 2, 4, 6 idą zarówno do public/infografiki/ (artykuł) jak i do carousel/assets/ (karuzela)
// Usage: node scripts/generate-pixelyoursite-content.mjs [slide_number]

import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CAROUSEL_DIR = resolve(ROOT, 'Socialmedia/instagram/carousel/assets/2026-05-18');
const INFOGRAFIKI_DIR = resolve(ROOT, 'public/infografiki');

const envFile = readFileSync(resolve(ROOT, '.env'), 'utf8');
const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(\S+)/);
if (!apiKeyMatch) throw new Error('GEMINI_API_KEY missing from .env');
const API_KEY = apiKeyMatch[1];

const MODEL = 'gemini-3-pro-image-preview';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

mkdirSync(CAROUSEL_DIR, { recursive: true });
mkdirSync(INFOGRAFIKI_DIR, { recursive: true });

// Slajdy 2, 4, 6 = dual-use (artykuł + karuzela)
const DUAL_USE = {
  2: 'pixelyoursite-duplikat-schemat.png',
  4: 'pixelyoursite-consent-rodo.png',
  6: 'pixelyoursite-checklista.png',
};

const BRAND_STYLE = `
DESIGN STYLE: Modern flat design, premium B2B tech aesthetic. Clean geometric shapes. No gradients on background.
COLOR PALETTE (strict):
- Background: #0f172a (dark navy, solid)
- Accent cyan (highlights, numbers, key words): #06b6d4
- Text and icons: #ffffff (pure white)
- Subtle dividers: white at 10% opacity
- Error/problem: #ef4444 (red)
- Success/fix: #22c55e (green)
TYPOGRAPHY: Modern geometric sans-serif similar to Inter. Bold for headlines. Regular for body.
FORMAT: Instagram carousel slide, 4:5 aspect ratio (portrait), 1080x1350 equivalent.
SAFE MARGIN: Keep all text at least 10% from edges.
LANGUAGE: All visible text must be in Polish with proper diacritical marks (ą ć ę ł ń ó ś ź ż).
`;

const SLIDES = [
  {
    n: 1,
    name: 'hook',
    prompt: `Instagram carousel cover slide. Dark navy background #0f172a.

LAYOUT: Strong centered composition, maximum scroll-stopping impact.

MAIN HEADLINE (large bold white, 3 lines centered):
Line 1: "Twój pixel w WordPressie"
Line 2 (cyan #06b6d4, bold): "zlicza konwersje dwa razy."
Line 3 (white, smaller): "I nie wiesz o tym."

VISUAL ELEMENT: Top area shows two overlapping red-bordered rectangles labeled "GTM" and "PYS" pointing dual arrows toward a "Meta" icon, with a red "×2" badge. Subtle, not overwhelming.

SUBTITLE below (white, small):
"3 błędy konfiguracji, które psują kampanie Meta Ads"

Bottom small cyan: "serwer-side.pl"

${BRAND_STYLE}`,
  },
  {
    n: 2,
    name: 'duplikat-schemat',
    prompt: `Instagram carousel slide 2. Dark navy background #0f172a.
This slide is also used as an article infographic — must be clearly legible.

LAYOUT: Two-part comparison diagram, stacked vertically with clear separation.

TOP HALF (problem) — labeled "ZŁA KONFIGURACJA" in small red caps:
Show two source boxes side by side:
- Box 1 (red border): "GTM" with small pixel icon
- Box 2 (red border): "PixelYourSite" with small pixel icon
Both boxes have red arrows pointing to single Meta box on the right.
Meta box shows counter "×2 Konwersje" in red with warning icon.
Thin red separator below.

BOTTOM HALF (solution) — labeled "DOBRA KONFIGURACJA" in small green caps:
Show ONE source box:
- Box 1 (cyan border): "PixelYourSite" with pixel + server icon (CAPI)
Single cyan arrow to Meta box showing "×1 Konwersja" in green with checkmark.

CENTER DIVIDER: White horizontal line at 15% opacity between halves.

BOTTOM: small cyan text "serwer-side.pl"

${BRAND_STYLE}`,
  },
  {
    n: 3,
    name: 'capi-wyjasnenie',
    prompt: `Instagram carousel slide 3. Dark navy background #0f172a.

LAYOUT: Large number top, flow diagram center, body text bottom.

TOP: Large cyan number "20-35%" (bold, #06b6d4)
Below it: small white text "zdarzeń konwersji ginie przez AdBlock i Safari"

CENTER DIAGRAM: Horizontal flow with two parallel paths:

Path 1 (top, red strikethrough):
"Piksel Przeglądarki" → red X wall labeled "AdBlock / ITP" → Meta (faded/greyed)
Label above path: "ZABLOKOWANY"

Path 2 (bottom, cyan):
"Serwer WordPress" → green checkmark → Meta (bright)
Label above path: "CAPI — zawsze dociera"

Visual: red path hits wall and stops. Cyan path bypasses and reaches Meta.

BOTTOM TEXT (white, small):
"PixelYourSite wysyła każde zdarzenie dwa razy."
"Serwer jako backup gdy przeglądarka zawodzi."

Bottom small cyan: "serwer-side.pl"

${BRAND_STYLE}`,
  },
  {
    n: 4,
    name: 'consent-rodo',
    prompt: `Instagram carousel slide 4. Dark navy background #0f172a.
This slide is also used as an article infographic — must be clearly legible.

LAYOUT: Two-column comparison side by side.

LEFT COLUMN header "ZŁA KONFIGURACJA" (red, small caps):
Stack of elements from top to bottom:
- Box: "CookieYes" (grey border) with label "jako tag GTM"
- Arrow down: "zarządza zgodami dla..."
- Box: "GA4" (white border, small checkmark "OK")
- Box: "PixelYourSite" (red border, X icon) labeled "NIE KONTROLOWANY"
- Small red text below: "Pixel działa mimo odrzucenia zgody = naruszenie RODO"

RIGHT COLUMN header "DOBRA KONFIGURACJA" (green, small caps):
Stack of elements:
- Box: "CookieYes" (cyan border) with label "jako wtyczka WordPress"
- Arrow down: "zarządza zgodami dla..."
- Box: "GA4" (white border, checkmark)
- Box: "PixelYourSite" (cyan border, checkmark) labeled "KONTROLOWANY"
- Small green text below: "Oba systemy blokowane przed zgodą"

CENTER: thin vertical dividing line white 15% opacity.

Bottom small cyan: "serwer-side.pl"

${BRAND_STYLE}`,
  },
  {
    n: 5,
    name: 'konfiguracja-mapa',
    prompt: `Instagram carousel slide 5. Dark navy background #0f172a.

LAYOUT: Clean tree/hierarchy diagram, centered.

HEADLINE top (white bold): "Poprawna architektura"
SUBHEADLINE (cyan smaller): "Każdy system ma swój zakres."

MAIN TREE DIAGRAM (centered, white lines connecting boxes):

Root: "WordPress" (white rounded box, top)
├── Branch 1: "PixelYourSite" (cyan border box)
│   ├── Sub: "Pixel ID + Token CAPI" (dark card, white text)
│   ├── Sub: "Event Lead → /dziekujemy" (dark card)
│   └── Sub: "Integracja CookieYes: ON" (dark card, green dot)
├── Branch 2: "CookieYes (wtyczka WP)" (cyan border box)
│   ├── Sub: "Kategoria Reklama: _fbp, _fbc" (dark card)
│   └── Sub: "Consent Mode: ON" (dark card, green dot)
└── Branch 3: "Google Tag Manager" (white border box)
    ├── Sub: "GA4 Configuration" (dark card)
    └── Sub: "Brak tagów Meta Pixel" (dark card, red strikethrough on "Meta")

All connecting lines in white at 40% opacity. Box corners rounded.

Bottom small cyan: "serwer-side.pl"

${BRAND_STYLE}`,
  },
  {
    n: 6,
    name: 'checklista',
    prompt: `Instagram carousel slide 6. Dark navy background #0f172a.
This slide is also used as an article infographic — must be clearly legible.

LAYOUT: Full checklist card, centered.

HEADLINE (white bold, top): "Checklista przed kampanią"
SUBHEADLINE (cyan, smaller): "8 punktów. Odhacz wszystkie."

MAIN CONTENT: 8 checklist items in a dark card (#1e293b, rounded corners, subtle cyan border).
Each item: green checkmark circle icon on left, white text on right.

Items (in order, Polish text):
1. ✅ "Pixel ID i token CAPI wpisane w PYS"
2. ✅ "Brak tagów Meta Pixel w GTM"
3. ✅ "CookieYes zainstalowany jako wtyczka WP"
4. ✅ "Integracja CookieYes włączona w PYS"
5. ✅ "Cookies _fbp i _fbc → kategoria Reklama"
6. ✅ "Event Lead: Page Visit → URL /dziekujemy"
7. ✅ "Test incognito: pixel blokowany przed zgodą"
8. ✅ "Test Events: event Lead dochodzi do Meta"

Items should be clearly separated by very thin white lines at 8% opacity.

Bottom small cyan: "serwer-side.pl"

${BRAND_STYLE}`,
  },
  {
    n: 7,
    name: 'cta-meta-power-up',
    prompt: `Instagram carousel slide 7 (final CTA). Dark navy background #0f172a with very subtle cyan glow at bottom (8% opacity).

LAYOUT: Strong CTA composition.

TOP HEADLINE (white bold, large, 2 lines):
"PixelYourSite to dobry start."
"Ale ma swoje limity."

SUBTITLE (cyan #06b6d4, bold):
"Opóźnienia PHP, brak kontroli nad event_time,"
"brak alertów gdy dane przestają płynąć."

MIDDLE SECTION — two problem points with red X icons:
- "event_time z serwera ≠ event_time z przeglądarki"
- "Deduplikacja 51% zamiast 92%"

DIVIDER: thin cyan horizontal line

LOWER SECTION — solution box (cyan border, dark fill):
HEADLINE in box (white bold): "Meta Power Up"
Description (white, smaller):
"Czysty CAPI na VPS."
"Pełna synchronizacja event_id i event_time."
"Monitoring. Bez zależności od wtyczek."

BOTTOM CTA box:
"Bezpłatna diagnoza → serwer-side.pl/kontakt"
(cyan background rectangle, white bold text)

Very bottom small white: "serwer-side.pl"

${BRAND_STYLE}`,
  },
];

async function generateSlide(slide) {
  const body = {
    contents: [{ parts: [{ text: slide.prompt }] }],
    generationConfig: {
      responseModalities: ['IMAGE'],
      imageConfig: { aspectRatio: '4:5' },
    },
  };

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errText.slice(0, 500)}`);
  }

  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((p) => p.inlineData?.mimeType?.startsWith('image/'));
  if (!imagePart) {
    throw new Error(`No image in response. Got: ${JSON.stringify(data).slice(0, 500)}`);
  }

  const buffer = Buffer.from(imagePart.inlineData.data, 'base64');

  // Zawsze zapisz do folderu karuzeli
  const carouselPath = resolve(CAROUSEL_DIR, `slide-${String(slide.n).padStart(2, '0')}-${slide.name}.png`);
  writeFileSync(carouselPath, buffer);

  // Dla slajdów dual-use (2, 4, 6) zapisz też do public/infografiki/
  if (DUAL_USE[slide.n]) {
    const infografikaPath = resolve(INFOGRAFIKI_DIR, DUAL_USE[slide.n]);
    writeFileSync(infografikaPath, buffer);
    return { carouselPath, infografikaPath, bytes: buffer.length };
  }

  return { carouselPath, bytes: buffer.length };
}

const which = process.argv[2];
const target = which ? SLIDES.filter((s) => String(s.n) === which) : SLIDES;

if (target.length === 0) {
  console.error('Brak pasującego slajdu. Podaj numer 1-7.');
  process.exit(1);
}

console.log(`Generuję ${target.length} slajd(ów) — model: ${MODEL}`);
console.log('Slajdy 2, 4, 6 → karuzela + public/infografiki/ (artykuł)\n');

for (const slide of target) {
  process.stdout.write(`  Slajd ${slide.n} (${slide.name})... `);
  try {
    const result = await generateSlide(slide);
    console.log(`OK ${(result.bytes / 1024).toFixed(1)} KB`);
    console.log(`    Karuzela: ${result.carouselPath}`);
    if (result.infografikaPath) {
      console.log(`    Artykuł:  ${result.infografikaPath}`);
    }
  } catch (e) {
    console.log(`FAIL`);
    console.error(`    ${e.message}`);
  }
}

console.log('\nGotowe. Uruchom `npm run build` żeby zweryfikować artykuł.');
