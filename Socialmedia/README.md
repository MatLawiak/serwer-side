# Social Media — serwer-side.pl

Folder na posty, materiały i harmonogramy kanałów społecznościowych (LinkedIn, Instagram, Facebook, X/Twitter).

> Folder tymczasowy — strukturę uzupełniamy później. Na razie wskazuje jedynie na źródła prawdy dla generowania treści.

---

## Źródła prawdy dla AI / generatorów treści

Każdy automat generujący posty (n8n WF2, ChatGPT, Claude, ręczny copywriter) **musi** czytać te źródła zanim napisze jakikolwiek tekst:

### 1. Brandbook — voice, paleta, zasady
[../docs/brandbook/brandbook.md](../docs/brandbook/brandbook.md)

Zawiera m.in.:
- Misja, pozycjonowanie, hierarchia tematów (rdzeń: SST, rozszerzenie: AI)
- Brand voice w 5 słowach: Fachowy · Bezpośredni · Ironiczny · Na luzie · Konkretny
- Listę „czego NIE robimy" (zakaz korporacyjnej nowomowy, pasywów, hype)
- Paletę kolorów (do grafik)
- Wzorce dobrych/złych tonów (sekcja „Przykłady tonu")

### 2. Strona — przykłady zastosowanego voice'u
- **Produkcja:** https://serwer-side.pl
- **Lokalne źródła treści:**
  - [../src/content/wiedza/](../src/content/wiedza/) — artykuły merytoryczne (długa forma, ten sam voice)
  - [../src/pages/](../src/pages/) — landing page, oferta, case studies
  - [../src/components/](../src/components/) — komponenty wizualne (jeśli post ma być spójny graficznie z CTA ze strony)

### 3. Automaty generujące treści (n8n)
- [../automations/serwer-side.pl/WF2_generuj-tresci.json](../automations/serwer-side.pl/WF2_generuj-tresci.json) — workflow LinkedIn + Instagram
- [../automations/serwer-side.pl/WF3_generuj-grafike.json](../automations/serwer-side.pl/WF3_generuj-grafike.json) — DALL·E, grafiki do postów
- [../automations/serwer-side.pl/DEPLOYED.md](../automations/serwer-side.pl/DEPLOYED.md) — status wdrożenia

### 4. Prompty do grafik
[../docs/content-ops/infografiki-prompty-nano-banana.md](../docs/content-ops/infografiki-prompty-nano-banana.md) — biblioteka promptów Nano Banana / DALL·E spójnych z paletą

---

## Checklist przed publikacją posta

Zanim cokolwiek wyjdzie na kanał, post ma spełniać:

- [ ] Voice zgodny z brandbookiem (bezpośredni, konkret, bez korporacyjnej wody)
- [ ] Temat mieści się w hierarchii: rdzeń (SST), rozszerzenie (AI), lub łącznik obu
- [ ] Zero fraz z listy „czego NIE robimy" (brandbook § 2)
- [ ] Jeśli grafika: paleta zgodna z brandbookiem § 3 (`#0f172a`, `#06b6d4`, biały)
- [ ] Max 1–2 emotikonki, tylko jeśli pasują
- [ ] Link do artykułu / strony docelowej (jeśli ma sens)

---

## TODO — struktura do uzupełnienia później

Szkic na przyszłość (nie wdrażać teraz, tylko pomysł):

```
Socialmedia/
├── linkedin/
│   ├── drafts/           # robocze
│   ├── published/        # archiwum opublikowanych + metryki
│   └── templates/        # szablony formatów postów
├── instagram/
│   ├── posts/
│   ├── stories/
│   └── reels/
├── facebook/
├── calendar/             # harmonogram publikacji (csv / md)
└── assets/               # grafiki, video, thumbnails
```
