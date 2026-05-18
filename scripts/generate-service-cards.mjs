#!/usr/bin/env node
// Generuje 3 mini grafiki dla kart usług (Meta Power VPS, Google Power VPS, Automatyzacje VPS)
// Usage: node scripts/generate-service-cards.mjs [1|2|3]

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'public/infografiki/uslugi');

const envFile = readFileSync(resolve(ROOT, '.env'), 'utf8');
const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(\S+)/);
if (!apiKeyMatch) throw new Error('GEMINI_API_KEY missing from .env');
const API_KEY = apiKeyMatch[1];

const MODEL = 'gemini-3-pro-image-preview';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

mkdirSync(OUT_DIR, { recursive: true });

const BRAND = `
DESIGN RULES (strict):
- FORMAT: square 1:1, small card thumbnail style
- BACKGROUND: solid dark navy #0f172a, no gradients
- ACCENT COLOR: cyan #06b6d4
- TEXT COLOR: white #ffffff
- TYPOGRAPHY: bold geometric sans-serif (Inter-like), clean, legible at small size
- STYLE: flat vector icon style, minimal, modern B2B tech aesthetic
- SAFE MARGIN: all elements at least 10% from edges
- LANGUAGE: all visible text labels must be in Polish with correct diacritical marks (ą ć ę ł ń ó ś ź ż)
- NO English labels
- NO gradients, NO realistic photos, NO shadows (only subtle glow allowed)
`;

const CARDS = [
  {
    n: 1,
    filename: 'meta-power-vps-card.png',
    prompt: `Square card thumbnail for a Polish tech service. Dark navy background #0f172a.

SERVICE NAME (large bold white text, centered, top area): "Meta Power VPS"

MAIN VISUAL (center of card):
Flat icon composition:
- Small server rack icon (left side, white, geometric)
- Cyan arrow pointing right
- Meta "f" logo shape (right side, simple geometric, cyan #06b6d4)
- Small satellite/signal waves above the connection (cyan, subtle)

FEATURE PILLS (below visual, 3 small rounded tags):
- Dark bg (#1e293b), white small text
- "Meta CAPI" | "Deduplikacja" | "sGTM"

BOTTOM (small cyan text): "serwer-side.pl"

${BRAND}`,
  },
  {
    n: 2,
    filename: 'google-power-vps-card.png',
    prompt: `Square card thumbnail for a Polish tech service. Dark navy background #0f172a.

SERVICE NAME (large bold white text, centered, top area): "Google Power VPS"

MAIN VISUAL (center of card):
Flat icon composition:
- Small server rack icon (left, white, geometric)
- Cyan arrow pointing right
- Simple "G" letter shape (right, white, bold, representing Google Analytics) with small bar chart icon inside or below it (cyan)
- Small chart/analytics icon (cyan) above

FEATURE PILLS (below visual, 3 small rounded tags, dark bg #1e293b, white text):
- "GA4 Server-Side" | "Google Ads" | "Consent Mode v2"

BOTTOM (small cyan text): "serwer-side.pl"

${BRAND}`,
  },
  {
    n: 3,
    filename: 'automatyzacje-vps-card.png',
    prompt: `Square card thumbnail for a Polish tech service. Dark navy background #0f172a.

SERVICE NAME (large bold white text, centered, top area): "Automatyzacje VPS"

MAIN VISUAL (center of card):
Flat icon composition showing a workflow/automation diagram:
- Server icon (left, white, geometric)
- Cyan horizontal line branching into 3 outputs
- 3 small endpoint icons (right side, stacked vertically):
  top: gear/settings icon (n8n automation)
  middle: envelope icon (newsletter)
  bottom: robot/AI head icon (AI agents)
All icons in white, lines in cyan.

FEATURE PILLS (below visual, 3 small rounded tags, dark bg #1e293b, white text):
- "n8n Self-Hosted" | "Newsletter" | "AI Agenty"

BOTTOM (small cyan text): "serwer-side.pl"

${BRAND}`,
  },
];

async function generateCard(card) {
  const body = {
    contents: [{ parts: [{ text: card.prompt }] }],
    generationConfig: {
      responseModalities: ['IMAGE'],
      imageConfig: { aspectRatio: '1:1' },
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
    throw new Error(`Brak obrazu w odpowiedzi: ${JSON.stringify(data).slice(0, 500)}`);
  }

  const buffer = Buffer.from(imagePart.inlineData.data, 'base64');
  const outPath = resolve(OUT_DIR, card.filename);
  writeFileSync(outPath, buffer);
  return { outPath, bytes: buffer.length };
}

const which = process.argv[2];
const target = which ? CARDS.filter((c) => String(c.n) === which) : CARDS;

if (target.length === 0) {
  console.error('Brak pasującej karty. Podaj numer 1-3.');
  process.exit(1);
}

console.log(`Generuję ${target.length} mini grafik(ę) — model: ${MODEL}`);
console.log(`Output: ${OUT_DIR}\n`);

for (const card of target) {
  process.stdout.write(`  ${card.n}. ${card.filename}... `);
  try {
    const { outPath, bytes } = await generateCard(card);
    console.log(`OK ${(bytes / 1024).toFixed(1)} KB`);
    console.log(`    ${outPath}`);
  } catch (e) {
    console.log('FAIL');
    console.error(`    ${e.message}`);
  }
}

console.log('\nGotowe. Uruchom npm run build żeby sprawdzić.');
