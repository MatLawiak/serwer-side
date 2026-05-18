# Leonardo.AI — Biblioteka Promptów serwer-side.pl

Gotowe prompty do generacji materiałów brandowych w Leonardo.AI.
Paleta: tło `#0f172a` (dark navy) · akcent `#06b6d4` (cyan) · tekst `#ffffff`

---

## Jak używać w Leonardo.AI

**Rekomendowane modele:**
- `Phoenix 1.0` — architektura, schematy, hero visuals (best quality, complex scenes)
- `Leonardo Diffusion XL` — abstract backgrounds, textures, dark moody renders
- `Flux Dev` — szybka iteracja, proste ikony, flat design

**WAŻNE — język polski na grafikach:**
> Każdy widoczny tekst na wszystkich grafikach i wideo musi być po polsku z polskimi znakami diakrytycznymi (ą ć ę ł ń ó ś ź ż). Do każdego promptu dopisz na końcu: `IMPORTANT: all visible text labels must be written in Polish language with proper diacritical marks (ą ć ę ł ń ó ś ź ż).`

**Preset stylu (wklej do "Style" lub "Image Guidance"):**
> Cinematic, dark tech, premium B2B, flat vector elements, no gradients on background, no cartoon style, no bright colors, all text in Polish language

**Negatywny prompt (kopiuj do "Negative Prompt" dla każdego promptu):**
> cartoon, anime, bright colors, white background, watermark, text, low quality, blurry, oversaturated, lens flare, lens distortion, generic stock photo, people faces, human figures (unless specified)

**Aspect ratios:**
- Rolki / Stories: `9:16` (1080×1920)
- Posty kwadratowe: `1:1` (1080×1080)
- Karuzele: `4:5` (1080×1350)
- YT Thumbnail / LinkedIn Banner: `16:9` (1920×1080)
- LinkedIn Header: `4:1` (2584×646)

---

## KATEGORIA 1 — Architektura server-side (schemat)

**Use case:** Explainer do rolki, slide karuzeli, infografika na stronę

### Wariant A — Clean tech diagram (16:9)
```
Minimalist dark tech architecture diagram on deep navy blue (#0f172a) background. Three labeled nodes connected by glowing cyan (#06b6d4) arrows flowing left to right: left node labeled "Piksel Przeglądarki" (white rounded rectangle with browser icon), center node labeled "Serwer VPS" (dark slate rectangle with server stack icon, cyan border glow), right node labeled "Meta CAPI" (right-side rectangle with infinity-like loop icon). Clean geometric sans-serif labels in pure white. Subtle cyan data packets (small glowing dots) animated along the arrow paths. Thin white separator lines at 10% opacity between sections. Premium B2B infographic style, flat design, ultra-clean, no background clutter. Dark navy solid fill, no gradients. 8K render quality. IMPORTANT: all visible text labels must be written in Polish language with proper diacritical marks (ą ć ę ł ń ó ś ź ż).
```
**Model:** Phoenix 1.0 | **Format:** 16:9

### Wariant B — Isometric 3D architecture (1:1)
```
Isometric 3D render of a server-side tracking architecture. Dark navy (#0f172a) background. Three isometric platform levels connected by glowing cyan fiber-optic cables: bottom level shows a browser window icon (white, glowing screen), middle level shows a sleek VPS server tower (dark slate with cyan LED strips), top level shows cloud API endpoint (floating server node with cyan pulse rings). Glowing data packets traveling along fiber cables, small cyan spheres with motion blur trails. Dramatic top-down isometric perspective, volumetric cyan glow emanating from server, subtle shadow casting, premium B2B tech illustration, Blender-style 3D render, ultra-detailed, 8K.
```
**Model:** Phoenix 1.0 | **Format:** 1:1

---

## KATEGORIA 2 — VPS Server Hero Visual

**Use case:** Okładka rolki, hero na landing page, thumbnail YouTube

### Wariant A — Cinematic server render (9:16)
```
Cinematic close-up 3D render of a premium server rack unit, ultra-sleek design, dark slate gray (#1e293b) body with glowing cyan LED status indicators, brushed aluminum panel details, fiber optic cables emitting soft teal light, multiple drive bays with pulsing cyan activity lights. Background: deep dark navy (#0f172a), volumetric light rays in cyan emanating from the server, dramatic studio lighting from the left casting sharp shadows. No text, no labels. Premium B2B tech hardware photography aesthetic, photorealistic, Cinema 4D quality render, shallow depth of field, 8K resolution, dramatic composition.
```
**Model:** Phoenix 1.0 | **Format:** 9:16

### Wariant B — Abstract server icon (1:1)
```
Premium minimal 3D icon of a server stack floating in center frame, dark navy background (#0f172a). Server design: three stacked horizontal rectangles, dark slate with brushed metal texture, glowing cyan border glow on each layer, small pulsing cyan LED dots on front panel. Subtle floating particles of cyan light around the icon. Clean drop shadow below. No gradients on background. Premium product icon style, Blender render quality, centered composition, generous white space, ultra-clean, 8K.
```
**Model:** Phoenix 1.0 | **Format:** 1:1

### Wariant C — Server hero z data streams (16:9)
```
Wide cinematic shot of a sleek VPS server in the center of frame, dark navy studio background (#0f172a). From the server, multiple glowing cyan data stream lines flow outward in both directions — toward left a browser window icon (white wireframe), toward right a cloud/API icon (white wireframe). Data streams made of fine glowing particles in cyan (#06b6d4) with motion blur. Volumetric glow from server center, dramatic backlighting, fog machine effect in dark background. Premium B2B tech illustration, ultra-detailed, cinematic lighting, 8K render.
```
**Model:** Phoenix 1.0 | **Format:** 16:9

---

## KATEGORIA 3 — Data Stream / Przepływ Danych

**Use case:** Tło rolki, animated overlay frame, abstract B-roll

### Wariant A — Particle data flow (9:16)
```
Abstract vertical data stream visualization. Dark navy background (#0f172a). Thousands of tiny glowing cyan (#06b6d4) and white data particles flowing vertically from top to bottom in organized streams, slight horizontal drift creating natural wave pattern. Particles vary in brightness creating depth. Subtle grid lines at 5% white opacity in background. Some particles cluster into dense data packets, then disperse. No text, no labels. Pure abstract digital aesthetic, like Matrix but premium B2B — not green, cyan only. Volumetric glow, depth of field blur on closest and farthest particles, 8K.
```
**Model:** Leonardo Diffusion XL | **Format:** 9:16

### Wariant B — Horizontal data pipeline (16:9)
```
Abstract horizontal data pipeline visualization for wide screen. Deep dark navy background (#0f172a). Three vertical columns of flowing data: left column = blue-white particles (browser side), center = merged glowing stream in bright cyan (server processing), right = clean organized cyan dots (API output). Visual metaphor of data being cleaned/processed in the center server zone. Center zone has soft white/cyan radial glow. Subtle circuit board texture at 8% opacity in background. Ultra-clean, premium B2B tech aesthetic, no text, no labels, 8K render quality.
```
**Model:** Leonardo Diffusion XL | **Format:** 16:9

---

## KATEGORIA 4 — Deduplikacja / Event Match

**Use case:** Explainer frame do rolki, slide karuzeli

### Wariant A — Match visual (1:1)
```
Minimal dark tech diagram showing event deduplication concept. Dark navy background (#0f172a). Two glowing rectangular event cards on left side (labeled "Zdarzenie: Przeglądarka" and "Zdarzenie: Serwer" in small white text, both with identical cyan ID code "evt_abc123" highlighted). A glowing cyan arrow points both cards toward a single merged card on the right labeled "1× Konwersja" with a green checkmark glow. Clean geometric flat design, premium icon style, white labels, cyan highlights. Subtle white separator lines. No other elements. Ultra-clean, 8K. IMPORTANT: all visible text labels must be written in Polish language with proper diacritical marks (ą ć ę ł ń ó ś ź ż).
```
**Model:** Phoenix 1.0 | **Format:** 1:1

### Wariant B — Before/After split (4:5)
```
Split-screen comparison infographic on dark navy background (#0f172a). Left half labeled "PRZED" (small white caps text top): shows two overlapping event icons with a red X symbol, red counter showing "2x" in crimson. Right half labeled "PO" (small white caps text top): shows two event icons connected by cyan arrow merging into one, green counter "1x" in cyan. Center dividing line is white at 20% opacity. Premium flat design, clean geometric icons, no background gradients, white and cyan color scheme only. B2B infographic style, 8K.
```
**Model:** Phoenix 1.0 | **Format:** 4:5

---

## KATEGORIA 5 — AdBlock blokuje Pixel

**Use case:** Explainer rolka — problem visualization

### Wariant A — Blocked signal (1:1)
```
Dark tech illustration showing blocked data signal concept. Dark navy background (#0f172a). Left side: a browser window icon labeled "Przeglądarka" emitting a dashed signal beam in cyan toward the right. Center: a semi-transparent grey wall/barrier with "AdBlock" in small subtle text, blocking the cyan beam (beam hits wall and dissipates with red X symbol and label "Zablokowany"). Right side: a ghosted/faded Meta logo placeholder (circle icon, grey) labeled "Meta". Below the blocked signal: a second solid cyan beam routes UNDERNEATH the wall via a server icon labeled "Serwer VPS" (VPS bypass route), reaching the right side successfully with a checkmark and label "Dotarł". Clean flat design, premium B2B illustration style, white labels, no background clutter. 8K. IMPORTANT: all visible text labels must be written in Polish language with proper diacritical marks (ą ć ę ł ń ó ś ź ż).
```
**Model:** Phoenix 1.0 | **Format:** 1:1

---

## KATEGORIA 6 — Analytics Dashboard

**Use case:** Thumbnail, hero visual, slide tła

### Wariant A — Dark dashboard UI (16:9)
```
Photorealistic dark mode analytics dashboard UI screenshot concept. Dark navy background (#0f172a). Dashboard shows: large headline number "92%" in bright cyan (#06b6d4) with label "Wskaźnik Dopasowania" below in small white text. Left panel: line chart trending upward (cyan line on dark grid, starting at 51% then rising to 92%). Right panel: three KPI cards — "Koszt Leada" with downward red arrow (-22%), "ROAS" with upward cyan arrow (+18%), "Śledzone Konwersje" with upward cyan arrow (+41%). Subtle white grid lines, clean sans-serif typography (Inter-like). Premium B2B SaaS dashboard aesthetic, not cartoon, photorealistic UI render, 8K. IMPORTANT: all visible text labels must be written in Polish language with proper diacritical marks (ą ć ę ł ń ó ś ź ż).
```
**Model:** Phoenix 1.0 | **Format:** 16:9

### Wariant B — Mobile dashboard (9:16)
```
Mockup of a mobile analytics app on dark navy background (#0f172a). Phone frame (dark slate, minimal bezels) showing dark mode dashboard: top metric "Stopień Deduplikacji" in large bold cyan "92%", subtitle "wzrost z 51%" in small white. Below: a clean bar chart with 4 bars (Tydzień 1-4) showing progression from short red bar to tall cyan bar. Bottom row: 3 mini cards — "Pokrycie event_id", "Synchronizacja event_time", "Pokrycie fbp" — each with percentage in cyan. Premium B2B mobile UI, photorealistic phone render, soft drop shadow, isolated on navy background. 8K. IMPORTANT: all visible text labels must be written in Polish language with proper diacritical marks (ą ć ę ł ń ó ś ź ż).
```
**Model:** Phoenix 1.0 | **Format:** 9:16

---

## KATEGORIA 7 — Abstract Tech Backgrounds (tła)

**Use case:** Tło do rolki, overlay layer, puste canvas do tekstu

### Wariant A — Subtle grid texture (9:16)
```
Minimal abstract tech background for social media vertical format. Deep dark navy solid color (#0f172a). Subtle geometric grid pattern at 6% white opacity — fine lines creating large squares, like a premium graph paper overlay. In bottom-right quadrant: faint circuit board trace pattern in white at 4% opacity. Top-left: barely visible hexagonal node pattern fading out. Zero focal elements, zero text, zero icons — pure texture background. Extremely minimal, premium B2B brand background. No gradients. Perfect for overlaying white text. 8K.
```
**Model:** Leonardo Diffusion XL | **Format:** 9:16

### Wariant B — Glowing edge background (9:16)
```
Abstract dark tech background vertical. Deep navy #0f172a base. Subtle cyan (#06b6d4) glow emanating from bottom-left corner at 15% opacity, fading to pure navy by center. From the glow source: extremely fine particle trails (single pixel dots in cyan) scattered sparsely across the lower third, density decreasing upward. Top 60% of image is pure deep navy — clean for text overlay. No shapes, no icons, no text. Minimal, premium, atmospheric. 8K.
```
**Model:** Leonardo Diffusion XL | **Format:** 9:16

### Wariant C — Tech circuit background (1:1)
```
Abstract square tech background. Base: solid deep navy #0f172a. Overlay: ultra-subtle circuit board trace lines in white at 7% opacity — horizontal and vertical paths with small square nodes at intersections. Some nodes pulse with very faint cyan dot (#06b6d4) at 20% opacity. No human elements, no recognizable icons. Pure abstract tech texture. Extremely minimal, designed as blank canvas for bold white text overlay. 8K resolution, tileable texture quality.
```
**Model:** Leonardo Diffusion XL | **Format:** 1:1

---

## KATEGORIA 8 — Rolka Cover / Reel Thumbnail

**Use case:** Okładka rolki na Instagramie

### Wariant A — Dark tech talking head frame (9:16)
```
Premium dark-themed talking head video frame background for Instagram Reels. Dark navy #0f172a solid background. Bottom third: subtle cyan gradient fade (5% opacity) suggesting studio floor. Sides: extremely thin cyan vertical accent lines (2px) at 30% opacity creating a "frame within frame" effect. Top area: empty for text overlay. Center-left area: clean empty space for person cutout. Right side: faint circuit board texture at 5% opacity. Professional, premium B2B video background. No faces, no people. 9:16 vertical. 8K.
```
**Model:** Leonardo Diffusion XL | **Format:** 9:16

### Wariant B — Bold stat cover (9:16)
```
Instagram Reel cover slide. Dark navy background (#0f172a). Center: massive bold white number "22,9%" (largest element, takes up 40% of frame height), geometric sans-serif, pure white. Below: smaller cyan text line (placeholder). Above: small white label placeholder line. Background texture: very subtle horizontal scan lines at 3% opacity. Bottom: thin cyan (#06b6d4) horizontal line at 10% from bottom edge. Top: same thin line. No other elements. Bold, scroll-stopping, ultra-minimal. 9:16, 8K.
```
**Model:** Phoenix 1.0 | **Format:** 9:16

---

## KATEGORIA 9 — Event_id / Event_time Visual

**Use case:** Explainer frame do rolki "co to event_id"

### Wariant A — Code aesthetic (1:1)
```
Premium dark code/terminal aesthetic visualization. Dark navy background (#0f172a). Center: a floating dark card (#1e293b, rounded corners, subtle cyan border glow) displaying styled code snippet — key term "event_id:" in cyan (#06b6d4) monospace font, value "pv_1778673823_abc123" in white monospace font below. Card has minimal padding, drop shadow. Background: extremely subtle grid at 4% opacity. No other elements. Clean, premium developer aesthetic, not cluttered. Isolated floating card on dark navy. 8K.
```
**Model:** Phoenix 1.0 | **Format:** 1:1

---

## KATEGORIA 10 — LinkedIn Hero Banner

**Use case:** Nagłówek profilu LinkedIn

### Wariant A — Wide tech banner (4:1)
```
Ultra-wide professional LinkedIn banner. Deep dark navy background (#0f172a) solid. Left third: subtle VPS server icon cluster (3D minimal icons, white wireframe style, 30% opacity) suggesting server infrastructure. Center: pure empty dark navy — clean space for profile photo overlay. Right side: abstract data stream visualization — fine cyan particle lines flowing horizontally from left to right, suggesting data pipeline. Extreme right: subtle convergence point glow in cyan at 15% opacity. Very minimal, premium B2B tech brand banner. No text (will be added in LinkedIn UI). 8K, 4:1 aspect ratio.
```
**Model:** Leonardo Diffusion XL | **Format:** 4:1 (2584×646)

---

## PRIORYTET PRODUKCJI (kolejność generowania)

Generuj w tej kolejności, zaczynając od najpotrzebniejszych do rolek:

| Priorytet | Kategoria | Format | Model Leonardo |
|---|---|---|---|
| 1 | Abstrakcyjne tła x3 | 9:16, 1:1, 16:9 | Diffusion XL |
| 2 | VPS Server Hero (wariant C) | 16:9 | Phoenix 1.0 |
| 3 | Data Stream vertical | 9:16 | Diffusion XL |
| 4 | Architektura schemat (A) | 16:9 | Phoenix 1.0 |
| 5 | Reel Cover — bold stat | 9:16 | Phoenix 1.0 |
| 6 | Analytics Dashboard (A) | 16:9 | Phoenix 1.0 |
| 7 | AdBlock blocked signal | 1:1 | Phoenix 1.0 |
| 8 | Deduplikacja before/after | 4:5 | Phoenix 1.0 |
| 9 | LinkedIn Banner | 4:1 | Diffusion XL |
| 10 | Event_id code card | 1:1 | Phoenix 1.0 |

---

## PARAMETRY GLOBALNE LEONARDO.AI

Dla każdego promptu ustaw:

**Guidance Scale:** 7-9 (wyżej = bardziej dosłownie, niżej = więcej kreatywności)
**Steps:** 30-40 (więcej = lepszy detail)
**Alchemy:** ON (jeśli dostępne — znacząco poprawia jakość)
**Prompt Magic:** v3

**Negative Prompt (kopiuj wszędzie):**
```
cartoon, anime, illustration style, bright colors, white background, watermark, text watermark, blurry, low resolution, oversaturated, lens flare, human faces, people, person, stock photo style, generic corporate, clipart, emoji, gradient background, neon 80s
```

---

---

# CZĘŚĆ II — VIDEO I ANIMACJE

---

## Jak działają video prompty w Leonardo.AI

Leonardo oferuje dwa tryby generacji wideo:

**A) Image to Video (Motion)** — animujesz gotowy statyczny render.
Wpisujesz prompt RUCHU (co i jak się porusza). Najlepsza jakość, pełna kontrola nad startem.
Użyj na renderach z Kategorii 1-10 powyżej.

**B) Text to Video** — generujesz wideo bezpośrednio z tekstu.
Opisujesz całą scenę + ruch. Mniej przewidywalne, ale szybsze do testowania.

**Ustawienia video w Leonardo:**
- Duration: 4s lub 6s (krótkie loopy do rolek)
- Motion Strength: 3-5 (niżej = subtelniej, wyżej = dramatyczny ruch)
- Camera Motion: wg opisu w promptach poniżej

---

## VIDEO KAT. 1 — Data Stream Continuous Loop

**Use case:** Tło rolki (loop 4-6s), B-roll animacja, overlay

### Motion prompt (do Image to Video — użyj na statycznym Data Stream render):
```
Slow continuous downward drift of glowing cyan particle streams, subtle wave motion side to side, particles gently pulsing in brightness (fade in/out rhythm 2 seconds), faint depth of field shift — foreground particles slightly blurring and sharpening. Camera static, no movement. Loop-ready seamless motion.
```
**Motion Strength:** 4 | **Duration:** 6s

### Text to Video (standalone):
```
Abstract looping animation. Deep dark navy background (#0f172a). Thousands of tiny glowing cyan data particles flow continuously downward in organized vertical streams, slight horizontal drift creating gentle wave pattern. Particles vary in brightness with 2-second pulse cycle. Foreground particles larger and brighter, background particles faint. Subtle white grid overlay at 4% opacity. No text, no logos, no human figures. Seamless loop, 6 seconds. Cinematic, premium B2B tech aesthetic.
```
**Format:** 9:16

---

## VIDEO KAT. 2 — VPS Server Pulse / Breathing

**Use case:** Hero animacja, reel intro, thumbnail animowany

### Motion prompt (do Image to Video — użyj na Server Hero render):
```
Server LED indicator lights pulse rhythmically (2-second cycle, fade up then down), subtle cyan glow around server body gently breathes in and out, fiber optic cables have slow light-traveling animation along their length (pulse moving left to right), very slight camera push-in (zoom in 2-3% over 6 seconds), background particles drift slowly upward. No camera shake, no fast motion. Slow, cinematic, premium feel.
```
**Motion Strength:** 3 | **Duration:** 6s

### Text to Video:
```
Cinematic slow zoom-in animation. A premium VPS server rack unit, dark slate body with glowing cyan LED strips that pulse softly in a 2-second rhythm. Fiber optic cables emit moving light pulses traveling along their length from left to right. Surrounding the server, fine cyan particles drift slowly upward like rising embers. Dark navy background (#0f172a), volumetric cyan light glow from server center intensifying slightly over 6 seconds. No text, no people. Ultra-slow cinematic motion, premium B2B tech atmosphere. 9:16 vertical format.
```
**Format:** 9:16

---

## VIDEO KAT. 3 — Architecture Flow Animation (schemat ożywiony)

**Use case:** Explainer rolka (segment 3-5s), karuzela animowana

### Motion prompt (do Image to Video — użyj na Architecture Diagram render):
```
Data flow animation along connecting arrows: glowing cyan dots travel from left node (Browser Pixel) along the arrow path to center node (VPS Server), then a second batch of cyan dots travels from center to right node (Meta CAPI). Timing: browser to server 0-2s, server to meta 2-4s, brief pause, loop. Each node gently pulses when receiving data (slight brightness increase for 0.3s). Background static. Clean, precise, no camera movement.
```
**Motion Strength:** 3 | **Duration:** 6s

### Text to Video:
```
Animated tech diagram. Dark navy background (#0f172a). Three nodes arranged horizontally: "Piksel Przeglądarki" (white rounded rectangle, left), "Serwer VPS" (dark slate with cyan border glow, center), "Meta CAPI" (white rounded rectangle, right). Animation sequence: glowing cyan data packets travel along the connecting arrow from Piksel to Serwer (0-2s), then from Serwer to Meta (2-4s). Each receiving node pulses with a brief cyan glow flash on receipt. Seamless loop. Clean flat design, no camera motion, labels in white sans-serif. Premium B2B explainer animation. 16:9. IMPORTANT: all visible text labels must be written in Polish language with proper diacritical marks (ą ć ę ł ń ó ś ź ż).
```
**Format:** 16:9

---

## VIDEO KAT. 4 — Dashboard Counter (liczby rosną)

**Use case:** Najsilniejszy hook do rolki — "coverage skoczyło z 51% do 92%"

### Text to Video:
```
Animated dark mode analytics dashboard. Dark navy background (#0f172a). Center: large bold metric display showing percentage number counting up from 51% to 92% (smooth animation over 4 seconds), number in bright cyan (#06b6d4), counter font bold geometric sans-serif. Below the counter: thin progress bar fills from left, cyan fill on dark track, synchronized with number. Background static dark navy, subtle grid at 5% opacity. At 4s: number locks at 92% with soft cyan pulse glow. No camera motion. Premium B2B dashboard aesthetic. 1:1 square format.
```
**Format:** 1:1

### Wariant (9:16 do rolki):
```
Vertical animated stats reveal for Instagram Reels. Dark navy background (#0f172a). Sequence (6 seconds total): first 2s — large label fades in from bottom "Wskaźnik Dopasowania Zdarzeń" in small white text. 2-5s — massive bold cyan number counts up: "51%" → "92%", smooth easing. 5-6s — checkmark icon appears right of number with cyan glow pulse. Background: faint horizontal scan lines at 3% opacity. Minimal motion, maximum impact. No camera movement. 9:16. IMPORTANT: all visible text labels must be written in Polish language with proper diacritical marks (ą ć ę ł ń ó ś ź ż).
```
**Format:** 9:16

---

## VIDEO KAT. 5 — AdBlock Bypass Flow

**Use case:** Explainer segment rolki — "dlaczego server-side?"

### Text to Video:
```
Animated explainer diagram on dark navy background (#0f172a). Three elements: browser icon labeled "Przeglądarka" (left), grey barrier wall in center (labelled "AdBlock" in small grey text), Meta icon placeholder labeled "Meta" (right). Animation: first 0-2s — a cyan dashed beam travels from browser toward wall, hits it, dissipates into red X particles with label "Zablokowany". Second 2-5s — a second solid cyan beam routes beneath the wall along a curved path through a small server icon labeled "Serwer VPS" below, continues to the right target, ends with a green checkmark flash and label "Dotarł". Both paths visible simultaneously from 5-6s. Clean flat design. 16:9. IMPORTANT: all visible text labels must be written in Polish language with proper diacritical marks (ą ć ę ł ń ó ś ź ż).
```
**Format:** 16:9

---

## VIDEO KAT. 6 — Event ID Match Reveal

**Use case:** Explainer rolka — co to event_id i dlaczego musi być ten sam

### Motion prompt (do Image to Video — użyj na Event Match static render):
```
Sequential reveal animation: left card labeled "Zdarzenie: Przeglądarka" slides in from left edge (0-1s), right card labeled "Zdarzenie: Serwer" slides in from right edge (1-2s), both cards' event_id values highlight in bright cyan simultaneously (2-3s), connecting arrow draws itself from both cards toward center merge point (3-5s), merged single card labeled "1× Konwersja" fades in at center with green checkmark glow (5-6s). Background static. Clean, precise reveal sequence. IMPORTANT: all visible text labels must be written in Polish language with proper diacritical marks (ą ć ę ł ń ó ś ź ż).
```
**Motion Strength:** 4 | **Duration:** 6s

---

## VIDEO KAT. 7 — Reel Intro / Outro Brand Loop

**Use case:** 2-3 sekundowy wstęp lub zakończenie każdej rolki

### Reel Intro — Text to Video:
```
Premium 3-second brand intro animation. Deep dark navy background (#0f172a) solid fill. From center, a thin horizontal cyan line (#06b6d4) expands outward to both sides (0-1s) crossing full width. Then above and below the line, a single white text placeholder area reveals (1-2s). Line pulses once with bright glow at 2s. Subtle background particle drift — 5 or 6 tiny cyan dots float upward throughout. Clean, minimal, premium motion design aesthetic. No logos, no text (will be added in editing). 9:16.
```
**Format:** 9:16

### Reel Outro — Text to Video:
```
Minimal 3-second outro animation. Dark navy background (#0f172a). A single small cyan circle pulses in center: grows to 120% then contracts to 100% (0-1s). Then two thin lines radiate horizontally from the circle to both edges (1-2s). Circle fades to text-placeholder white dot (2-3s). Domain "serwer-side.pl" text area suggestion at bottom center in small white (leave blank for editing). Extremely minimal, 9:16 vertical.
```
**Format:** 9:16

---

## VIDEO KAT. 8 — Cinematic Server Reveal (hero do rolki)

**Use case:** Intro segment rolki premium, LinkedIn video post

### Text to Video:
```
Cinematic 6-second product reveal animation. Scene: deep dark void, pure black at start. From center-bottom, a sleek VPS server unit slowly rises into frame (0-3s), catching dramatic side lighting from left as it rises. Server: dark slate body, cyan LED strips lighting up sequentially as it enters frame (each strip activates 0.5s apart). Once in position (3s): camera slowly circles 15 degrees to the right (3-6s), revealing faint cyan particle glow around server. Background remains deep dark navy (#0f172a). Volumetric light shaft in cyan appears from server top at 4s. Photorealistic Cinema 4D quality render aesthetic. 9:16 vertical.
```
**Format:** 9:16

---

## VIDEO KAT. 9 — Abstract Background Loop (do overlay)

**Use case:** Pętla tła do wszystkich rolek — 6s seamless loop

### Text to Video:
```
Seamless 6-second abstract background loop for vertical video. Deep dark navy base (#0f172a). Very subtle slow-drifting horizontal layers of near-invisible texture — like deep ocean currents at 5% opacity white. In lower-left: an extremely faint cyan radial glow pulses slowly (brightens slightly every 3 seconds). Zero focal elements, zero text, zero icons. Pure atmospheric dark background. Loop is imperceptible — viewer should not notice the cut. 9:16, premium B2B brand ambiance.
```
**Format:** 9:16

---

## WORKFLOW: Image to Video — krok po kroku

1. Wygeneruj statyczny render z Części I (np. VPS Server Hero Wariant A)
2. W Leonardo: otwórz wygenerowany obraz → kliknij **"Motion"** (lub Image to Video)
3. Wklej odpowiedni **Motion prompt** z sekcji powyżej
4. Ustaw Motion Strength: **3** (subtelny) lub **4** (wyraźny)
5. Duration: **6s** (lepszy loop niż 4s)
6. Generuj 2-3 warianty, wybierz najlepszy
7. Pobierz MP4 i importuj do CapCut / Premiere do montażu rolki

## WORKFLOW: Text to Video — krok po kroku

1. Leonardo → **Video Generation** (zakładka Video)
2. Wklej prompt z sekcji "Text to Video"
3. Ustaw aspect ratio zgodny z formatem (9:16 dla rolek)
4. Model: **Leonardo Motion** (lub najnowszy dostępny)
5. Generuj → iteruj z drobnymi zmianami w prompcie

---

## PRIORYTET VIDEO (kolejność generowania)

| Priorytet | Kategoria | Tryb | Format |
|---|---|---|---|
| 1 | Data Stream Loop (tło) | Text to Video | 9:16 |
| 2 | VPS Server Pulse | Image to Video | 9:16 |
| 3 | Dashboard Counter 51→92% | Text to Video | 9:16 |
| 4 | Reel Intro brand | Text to Video | 9:16 |
| 5 | Architecture Flow | Image to Video | 16:9 |
| 6 | AdBlock Bypass | Text to Video | 16:9 |
| 7 | Cinematic Server Reveal | Text to Video | 9:16 |
| 8 | Event ID Match | Image to Video | 1:1 |
| 9 | Reel Outro | Text to Video | 9:16 |
| 10 | Abstract Background Loop | Text to Video | 9:16 |

---

## WSKAZÓWKI ITERACJI

1. **Pierwsze 3 generacje każdego promptu** — generuj x4 warianty naraz, wybierz najlepszy
2. **Jeśli tło nie jest wystarczająco ciemne** — dodaj do promptu: `ultra-dark background, no fill, pure #0f172a base`
3. **Jeśli cyan jest zbyt jasny/neonowy** — dodaj: `muted cyan, sophisticated teal, not neon, not fluorescent`
4. **Jeśli jakość tekstu na kartach jest zła** — generuj bez tekstu i dodaj w Canva
5. **Dla animacji (video w Leonardo)** — use Image to Video na gotowych static renders
