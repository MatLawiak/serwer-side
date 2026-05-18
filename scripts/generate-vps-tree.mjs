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
IMPORTANT: Do NOT add any title, heading, caption or label at the top or outside of the diagram itself. No "Infographic:", no "Polish B2B", no English or Polish heading outside the diagram. The image starts directly with the diagram content. NO title bar. NO top heading. Start straight with the mind-map.

Infographic diagram image. Premium, modern flat design. No gradients on background.

BACKGROUND: solid dark navy #0f172a fills the entire image edge-to-edge. No borders. No frames.

ASPECT RATIO: 16:9 landscape, wide format, balanced composition.

OVERALL CONCEPT: Radial tree / mind-map diagram. One central node in the middle-left area of the image. Three branches radiate outward to three service modules. Each module has sub-feature pills below it. Bottom strip shows SaaS tools list.

---

CENTER NODE (large, prominent):
Rounded rectangle. Dark navy fill (#0f172a). Bright cyan border (#06b6d4) 2px. Subtle cyan outer glow.
Bold WHITE text inside: "Twój Serwer VPS"
Text is white on dark background — NOT cyan fill, NOT light background.
NO subdomain text. NO extra subtitle. Just "Twój Serwer VPS" in white.

---

BRANCH 1 — LEFT side, connected by a cyan line from center:
Node box (cyan border): "Meta Power VPS"
NO label chip above — remove it entirely.
Below the node, 4 small dark pill tags (#1e293b background, white text):
  "Meta CAPI"  |  "sGTM"  |  "Deduplikacja"  |  "PageView / Lead / Purchase"

BRANCH 2 — TOP-RIGHT side, connected by cyan line from center:
Node box (cyan border): "Google Power VPS"
NO label chip — do not show any chip/badge.
Below: 3 pill tags:
  "GA4 Server-Side"  |  "Google Ads Enhanced"  |  "Consent Mode v2"

BRANCH 3 — BOTTOM-RIGHT side, connected by cyan line from center:
Node box (cyan border): "Automatyzacje Biznesowe"
NO label chip — do not show any chip/badge.
Below: 5 pill tags (practical automation examples, in Polish):
  "Automatyzacja newsletterów"  |  "Generowanie grafik AI"  |  "Automatyzacja treści"  |  "Powiadomienia leadów"  |  "Integracje CRM"

---

BOTTOM BAR (full width, inside image, at bottom 18%):
Dark card background (#1e293b), rounded top corners, full width.

Header centered in white bold: "Czy korzystasz z:"
Subheader in cyan smaller: "Przenieś te narzędzia na swój serwer i przestań płacić abonament."

Below the header: a horizontal row of 8 SaaS tool name tags/chips.
Each chip: dark rounded pill (#0f172a bg, white/30% border, white text), evenly spaced.
Chip labels (tool names, all as plain text — no logos):
  "Zapier"  |  "Mailerlite"  |  "GetResponse"  |  "Mailchimp"  |  "Brevo"  |  "Klaviyo"  |  "ActiveCampaign"  |  "HubSpot"

---

DESIGN RULES:
- COLOR PALETTE: Background #0f172a, cyan #06b6d4, white #ffffff, card bg #1e293b
- TYPOGRAPHY: Modern geometric sans-serif (Inter-like). Bold headlines, regular body.
- CONNECTING LINES: Cyan at 60% opacity, slightly curved (bezier), with small filled circle endpoints.
- SAFE MARGIN: Keep all elements at least 5% from image edges.
- NO GRADIENTS on background. Background must be solid #0f172a.
- NO prices, NO numbers, NO currency symbols anywhere in the image.
- NO label chips/badges on any branch node.
- LANGUAGE: IMPORTANT — every visible text label must be written in Polish language with correct Polish diacritical marks: ą ć ę ł ń ó ś ź ż. Exception: SaaS brand names (Zapier, Mailchimp etc.) stay as-is.
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
