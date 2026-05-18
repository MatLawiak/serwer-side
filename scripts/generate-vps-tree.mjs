#!/usr/bin/env node
// Generuje infografikę "drzewko VPS" dla sekcji Modułowy Stack na stronie głównej
// Usage: node scripts/generate-vps-tree.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'public/infografiki/vps-modular-stack-tree.png');

const envFile = readFileSync(resolve(ROOT, '.env'), 'utf8');
const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(\S+)/);
if (!apiKeyMatch) throw new Error('GEMINI_API_KEY missing from .env');
const API_KEY = apiKeyMatch[1];

const MODEL = 'gemini-3-pro-image-preview';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

mkdirSync(resolve(ROOT, 'public/infografiki'), { recursive: true });

const PROMPT = `
Infographic for a Polish B2B tech website. Premium, modern flat design. No gradients on background.

BACKGROUND: solid dark navy #0f172a, full image.

ASPECT RATIO: 16:9 landscape, wide format, balanced composition.

OVERALL CONCEPT: Radial tree / mind-map diagram. One central node "Twój Serwer VPS" in the middle of the image. Three branches radiate outward to three service modules. Each module has sub-feature pills below it. Bottom area shows savings comparison vs separate SaaS subscriptions.

---

CENTER NODE (large, prominent):
Rounded rectangle with bright cyan border (#06b6d4), cyan background at 15% opacity.
Bold white text: "Twój Serwer VPS"
Smaller cyan text below: "subdomena.twojafirma.pl"
Subtle cyan glow effect around the node.

---

BRANCH 1 — LEFT side, connected by a cyan line from center:
Node box (cyan border): "Meta Power VPS"
Label chip above node (tiny, green bg): "Główna usługa"
Below the node, 4 small dark pill tags (#1e293b background, white text):
  "Meta CAPI"  |  "sGTM"  |  "Deduplikacja"  |  "PageView / Lead / Purchase"

BRANCH 2 — TOP-RIGHT side, connected by cyan line from center:
Node box (cyan border): "Google Power VPS"
Label chip (tiny, accent bg): "Dopłata"
Below: 3 pill tags:
  "GA4 Server-Side"  |  "Google Ads Enhanced"  |  "Consent Mode v2"

BRANCH 3 — BOTTOM-RIGHT side, connected by cyan line from center:
Node box (cyan border): "Automatyzacje Biznesowe"
Label chip (tiny, accent bg): "Własny n8n"
Below: 4 pill tags:
  "n8n Self-Hosted"  |  "Newsletter Listmonk"  |  "Dashboard Grafana"  |  "AI Agenty"

---

BOTTOM BAR (full width, inside image, at bottom 15%):
Two-column layout separated by vertical line:

LEFT column — problem (crossed-out SaaS list):
Tiny header in red caps: "ZAMIAST TEGO"
5 small line items with red X icon and strikethrough text:
  ✗ PYS Pro — 79 zł/mies.
  ✗ n8n cloud — 250 zł/mies.
  ✗ Klaviyo — 450 zł/mies.
  ✗ Cookiebot — 90 zł/mies.
  ✗ Looker Studio — extras
Red total at bottom: "890+ zł/mies."

RIGHT column — solution savings (highlighted):
Tiny header in green caps: "JEDEN SERWER VPS"
Large bold white number: "5 000 - 8 000 zł"
Small text below: "średnia oszczędność roczna"
Smallest text: "Twoje dane. Twój serwer. Zero vendor lock-in."
Subtle green border around this column.

---

DESIGN RULES:
- COLOR PALETTE: Background #0f172a, cyan #06b6d4, white #ffffff, success green #22c55e, error red #ef4444, card bg #1e293b
- TYPOGRAPHY: Modern geometric sans-serif (Inter-like). Bold headlines, regular body.
- CONNECTING LINES: Cyan at 60% opacity, slightly curved (bezier), with small filled circle endpoints.
- SAFE MARGIN: Keep all elements at least 5% from image edges.
- NO GRADIENTS on background. Background must be solid #0f172a.
- LANGUAGE: IMPORTANT — every visible text label must be written in Polish language with correct Polish diacritical marks: ą ć ę ł ń ó ś ź ż. Do NOT use English words for labels.
- Quality: high resolution, sharp edges, no blur on text.
`;

console.log('Generuję infografikę drzewka VPS...');
console.log(`Model: ${MODEL}`);
console.log(`Output: ${OUT}\n`);

const body = {
  contents: [{ parts: [{ text: PROMPT }] }],
  generationConfig: {
    responseModalities: ['IMAGE'],
    imageConfig: { aspectRatio: '16:9' },
  },
};

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

if (!res.ok) {
  const errText = await res.text();
  console.error(`HTTP ${res.status}: ${errText.slice(0, 600)}`);
  process.exit(1);
}

const data = await res.json();
const parts = data?.candidates?.[0]?.content?.parts || [];
const imagePart = parts.find((p) => p.inlineData?.mimeType?.startsWith('image/'));

if (!imagePart) {
  console.error('Brak obrazu w odpowiedzi. Odpowiedź:', JSON.stringify(data).slice(0, 600));
  process.exit(1);
}

const buffer = Buffer.from(imagePart.inlineData.data, 'base64');
writeFileSync(OUT, buffer);

console.log(`OK — ${(buffer.length / 1024).toFixed(1)} KB`);
console.log(`Zapisano: ${OUT}`);
console.log('\nGotowe. Zrób npm run build żeby sprawdzić stronę.');
