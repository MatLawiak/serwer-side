#!/usr/bin/env node
// Generuje grafiki do artykulu i karuzeli: Google Tag Gateway dla marketerow
// Slajdy 2, 4 ida zarowno do public/infografiki/ (artykul) jak i do carousel/assets/ (karuzela)
// Usage: node scripts/generate-tag-gateway-content.mjs [slide_number]
//   bez argumentu: generuje wszystkie 5
//   z numerem 1-5: generuje tylko ten slajd (do iteracji)

import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CAROUSEL_DIR = resolve(ROOT, 'Socialmedia/instagram/carousel/assets/2026-06-03');
const INFOGRAFIKI_DIR = resolve(ROOT, 'public/infografiki');

const envFile = readFileSync(resolve(ROOT, '.env'), 'utf8');
const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(\S+)/);
if (!apiKeyMatch) throw new Error('GEMINI_API_KEY missing from .env');
const API_KEY = apiKeyMatch[1];

const MODEL = 'gemini-3-pro-image-preview';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

mkdirSync(CAROUSEL_DIR, { recursive: true });
mkdirSync(INFOGRAFIKI_DIR, { recursive: true });

// Slajdy 2, 4 = dual-use (artykul + karuzela)
const DUAL_USE = {
  2: 'google-tag-gateway-schemat-routingu.png',
  4: 'google-tag-gateway-drzewko-decyzyjne.png',
};

const BRAND_STYLE = `
DESIGN STYLE: Modern flat design, premium B2B tech aesthetic. Clean geometric shapes. No gradients on background.
COLOR PALETTE (strict):
- Background: #0f172a (dark navy, solid)
- Accent cyan (highlights, numbers, key words): #06b6d4
- Text and icons: #ffffff (pure white)
- Subtle dividers: white at 10% opacity
- Error/blocked: #ef4444 (red)
- Success/works: #22c55e (green)
TYPOGRAPHY: Modern geometric sans-serif similar to Inter. Bold for headlines. Regular for body.
FORMAT: Instagram carousel slide, 4:5 aspect ratio (portrait), 1080x1350 equivalent.
SAFE MARGIN: Keep all text at least 10% from edges.
LANGUAGE: All visible text must be in Polish with PROPER DIACRITICAL MARKS (ą ć ę ł ń ó ś ź ż). Render exact text character by character. Double-check Polish letters.
`;

const SLIDES = [
  {
    n: 1,
    name: 'hook',
    prompt: `Instagram carousel cover slide. Dark navy background #0f172a.

LAYOUT: Strong cover composition. Massive percentage number top, headline middle, subtitle bottom.

TOP CENTER (HUGE cyan number #06b6d4, takes 35% of slide height, very bold geometric font):
"30-42%"

UNDER NUMBER (small white uppercase): "TWOICH KONWERSJI BLOKUJĄ ADBLOCKI"

MAIN HEADLINE (white bold, 3 lines centered, large):
Line 1: "Google Tag Gateway"
Line 2 (with the word "0 zł" in cyan #06b6d4): "naprawia to za 0 zł"
Line 3: "miesięcznie."

SUBTITLE (small cyan text at bottom): "1 dzień wdrożenia. Bez sGTM. Bez Stape."

Bottom right corner small cyan: "serwer-side.pl"

${BRAND_STYLE}`,
  },
  {
    n: 2,
    name: 'schemat-routingu',
    prompt: `Instagram carousel slide 2. Dark navy background #0f172a.

LAYOUT: Top headline, central comparison diagram (PRZED vs PO), bottom caption.

TOP HEADLINE (white bold, centered, 2 lines):
"Tag Gateway zmienia jedno:"
"adres, do którego leci ruch."

CENTER - Two-column comparison diagram:

LEFT COLUMN (label at top in red #ef4444 uppercase: "PRZED"):
- White rounded box at top: "Przeglądarka"
- Three arrows going down to three boxes with red X marks:
  Box 1 (red border): "googletagmanager.com" with red X
  Box 2 (red border): "google-analytics.com" with red X
  Box 3 (red border): "facebook.com/tr" with red X
- Below all three: red text "BLOCKED przez AdBlock"

VERTICAL DIVIDER (thin cyan line in middle)

RIGHT COLUMN (label at top in green #22c55e uppercase: "PO"):
- White rounded box at top: "Przeglądarka"
- One arrow down to single box with green checkmark:
  Box (green border): "twojadomena.pl/metrics" with green checkmark
- Below that box: small cyan arrow going right to text "Google"
- Caption in green: "Adblock nie widzi"

BOTTOM (white smaller text, centered):
"Twoja własna domena = ruch wewnętrzny."
(highlight "Twoja własna domena" in cyan #06b6d4)

Bottom right corner small cyan: "serwer-side.pl"

${BRAND_STYLE}`,
  },
  {
    n: 3,
    name: 'dla-kogo',
    prompt: `Instagram carousel slide 3. Dark navy background #0f172a.

LAYOUT: Top headline, three cards stacked or in grid, bottom note.

TOP HEADLINE (white bold, 2 lines):
"Dla kogo Tag Gateway"
(highlight "Dla kogo" in cyan #06b6d4)

UNDER HEADLINE (small cyan): "Trzy typy biznesów, które najwięcej zyskują"

MIDDLE - Three cards vertically stacked, each with cyan border, cyan icon on left, white text:

Card 1 (icon: shopping cart in cyan):
Title (white bold): "E-commerce do 30 000 zł/m-c"
Subtitle (white smaller): "WooCommerce, PrestaShop, Magento na Google Ads. ROAS rośnie o 30-40%."

Card 2 (icon: document with pen in cyan):
Title (white bold): "Strony usługowe z formularzami"
Subtitle (white smaller): "Kancelarie, agencje, deweloperzy. Każdy odbity Lead wraca do panelu."

Card 3 (icon: chart/analytics in cyan):
Title (white bold): "Blogi i content marketing"
Subtitle (white smaller): "Wiarygodne dane GA4. Wiesz który content faktycznie konwertuje."

BOTTOM (small white centered):
"Nie dla: aplikacji mobilnych, biznesów tylko na Meta Ads."

Bottom right corner small cyan: "serwer-side.pl"

${BRAND_STYLE}`,
  },
  {
    n: 4,
    name: 'drzewko-decyzyjne',
    prompt: `Instagram carousel slide 4. Dark navy background #0f172a.

LAYOUT: Top headline, central decision tree diagram, bottom legend.

TOP HEADLINE (white bold, centered):
"Czy Tag Gateway zadziała"
"na Twojej stronie?"
(highlight "Czy Tag Gateway" in cyan #06b6d4)

CENTER - Decision tree, top-to-bottom, with cyan connecting lines and Tak/Nie branches:

Level 1 (root, white box with cyan border):
"Masz Google Tag Manager?"
Two branches: "TAK" goes down, "NIE" goes right to small note

Level 2 (white box with cyan border, after Tak):
"Możesz dodać Cloudflare?"
Two branches: "TAK" goes down, "NIE" goes right to small note

Level 3 final answers (3 colored boxes):

Box A (green #22c55e border, large): "Tag Gateway"
Caption below: "1 dzień, 0 zł/m-c"

Box B (yellow/amber #f59e0b border, smaller, on right from Level 2 NIE): "Stape.io sGTM"
Caption below: "20 USD/m-c"

Box C (orange #f97316 border, smaller, on right from Level 1 NIE): "Najpierw dodaj GTM"
Caption below: "1 dzień extra"

BOTTOM LEGEND (small text, centered, in row):
Green dot "Idealny" - Yellow dot "Płatna alternatywa" - Orange dot "Wymaga przygotowania"

Bottom right corner small cyan: "serwer-side.pl"

${BRAND_STYLE}`,
  },
  {
    n: 5,
    name: 'cta',
    prompt: `Instagram carousel slide 5. Dark navy background #0f172a with subtle cyan glow at bottom (10% opacity gradient).

LAYOUT: Strong CTA composition. Question top, value proposition middle, contact box bottom.

TOP HEADLINE (white bold, 2 lines, large):
"Nie wiesz czy"
"Twoja strona to obsługuje?"
(highlight "Twoja strona" in cyan #06b6d4)

MIDDLE - White text, centered, smaller bold:
"Wyślij linka + listę platform reklamowych."
"W 24h dostajesz konkretną odpowiedź:"

Three bullet points with cyan checkmarks, white text:
"Czy Tag Gateway u Ciebie zadziała"
"Jakie alternatywy masz jeśli nie"
"Realny koszt pełnego wdrożenia"

BOTTOM BOX (cyan border, larger):
Title (cyan bold uppercase, small): "BEZPŁATNA DIAGNOZA"
Email in white bold large: "kontakt@serwer-side.pl"
Smaller white below: "Odpowiedź w 24 godziny"

VERY BOTTOM (centered small white): "serwer-side.pl"
Smaller cyan italic: "Tag Gateway, sGTM, Meta CAPI"

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
  const outPath = resolve(CAROUSEL_DIR, `slide-${String(slide.n).padStart(2, '0')}-${slide.name}.png`);
  writeFileSync(outPath, buffer);

  // Dual-use: kopiuj do public/infografiki
  if (DUAL_USE[slide.n]) {
    const infografikaPath = resolve(INFOGRAFIKI_DIR, DUAL_USE[slide.n]);
    copyFileSync(outPath, infografikaPath);
    return { path: outPath, bytes: buffer.length, dualUse: infografikaPath };
  }

  return { path: outPath, bytes: buffer.length };
}

const which = process.argv[2];
const target = which ? SLIDES.filter((s) => String(s.n) === which) : SLIDES;

if (target.length === 0) {
  console.error('No matching slide.');
  process.exit(1);
}

console.log(`Generating ${target.length} slide(s) with ${MODEL}...`);
for (const slide of target) {
  process.stdout.write(`  Slide ${slide.n} (${slide.name})... `);
  try {
    const result = await generateSlide(slide);
    console.log(`OK ${(result.bytes / 1024).toFixed(1)} KB`);
    console.log(`    -> ${result.path}`);
    if (result.dualUse) {
      console.log(`    -> ${result.dualUse}  (dual-use kopia)`);
    }
  } catch (e) {
    console.log(`FAIL`);
    console.error(`    ${e.message}`);
  }
}
