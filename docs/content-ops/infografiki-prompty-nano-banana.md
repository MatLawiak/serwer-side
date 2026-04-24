# Prompty do infografik (Nano Banana / Gemini)

Ten plik zawiera gotowe prompty do wygenerowania 6 infografik, które są już podstawione w podstronach usług. Po wygenerowaniu wrzuć pliki PNG do folderu `public/infografiki/` pod nazwami podanymi przy każdym prompt.

## Styl graficzny strony (używaj w każdym prompt)

**Design system serwer-side.pl:**
- **Estetyka:** neo-brutalist, flat illustration, minimalist, clean
- **Kolory główne:**
  - Tło: off-white (`#fafaf9` / stone-50)
  - Primary (ciemny navy): `#1e293b`
  - Accent (cyan): `#06b6d4`
  - Tekst: dark gray `#374151`
  - Błędy / alerty: red `#dc2626`
  - Sukces: emerald `#10b981`
- **Cechy wizualne:**
  - Grube ramki 2 px czarne lub navy
  - Offset shadows 4 px (neo-brutalist drop shadow)
  - Ostre rogi lub minimalne zaokrąglenia (max 8 px)
  - Sans-serif typography (Inter, bold)
  - Bez gradientów, bez efektów 3D, bez tekstur
  - Płaskie ikony liniowe lub lekko wypełnione
- **Format:** PNG z białym tłem, proporcje 3:2 (1800 x 1200 px zalecane), miejsce na marginesy
- **Język napisów w infografikach:** polski

---

## 1. Meta CAPI: Jak ginie konwersja

**Plik docelowy:** `public/infografiki/meta-capi-jak-ginie-konwersja.png`  
**Używana na:** [/uslugi/meta-power-vps](src/pages/uslugi/meta-power-vps.astro)

### Prompt

```
Stwórz infografikę w stylu neo-brutalist i flat illustration, porównującą dwie ścieżki konwersji w Meta Ads. Proporcje 3:2, białe tło (#fafaf9). Grube czarne kontury 2px, minimalne zaokrąglenia, offset shadows 4px w kolorze navy.

Podziel obraz na 2 poziome sekcje:

GÓRA — "Pixel klasyczny" (czerwona ramka z podpisem):
1. Ikona przeglądarki po lewej (laptop z logiem)
2. Strzałka w prawo do ikony Pixela Meta
3. Przed dotarciem do Meta, strzałka przechodzi przez 3 czerwone "zapory blokujące":
   - iOS 14+ ATT (ikona Apple)
   - Safari ITP (ikona Safari)
   - Adblock (ikona tarczy ze znakiem stop)
4. Każda zapora "zjada" część strzałki (grafiki pokazują straty 30%, 20%, 15%)
5. Na końcu dociera do Meta Ads Manager tylko 40% oryginalnej konwersji (mała, blada strzałka)
6. Podpis: "Tracisz 30–50% konwersji"

DÓŁ — "Meta CAPI na Twoim VPS" (cyan ramka z podpisem):
1. Ikona przeglądarki po lewej (laptop)
2. Strzałka do ikony VPS (server rack z subdomeną "dane.twojadomena.pl")
3. Z VPS idzie gruba, pełna strzałka bezpośrednio do Meta Ads Manager
4. Żadnych zapór na drodze
5. Na końcu pełna, gruba strzałka z napisem "100% konwersji"
6. Podpis: "Odzyskujesz wszystkie dane"

Na środku obu sekcji, pionowo, ikony użytkowników (mały kolorowy ludzik). Kolor cyan #06b6d4 dla sekcji dolnej (zwycięskiej), czerwony #dc2626 dla górnej (problemowej). Napisy po polsku, bold sans-serif.

Tytuł na górze: "Jak ginie Twoja konwersja w Meta Ads"
```

---

## 2. Meta CAPI: Przepływ danych

**Plik docelowy:** `public/infografiki/meta-capi-przeplyw-danych.png`  
**Używana na:** [/uslugi/meta-power-vps](src/pages/uslugi/meta-power-vps.astro)

### Prompt

```
Stwórz infografikę techniczną w stylu neo-brutalist flat illustration, pokazującą przepływ danych w Meta CAPI przez dedykowany VPS. Proporcje 3:2, białe tło #fafaf9, grube kontury 2px, offset shadows 4px. Sans-serif typography, bold.

Przedstaw poziomy flowchart z 4 blokami połączonymi strzałkami:

BLOK 1 (po lewej, kolor szary): "Strona klienta"
- Ikona laptopa z przeglądarką
- Pod nim mały tag: "GTM Web Container"
- Wychodząca strzałka oznaczona "event: Purchase"

BLOK 2 (środkowo-lewy, kolor cyan #06b6d4): "Twój VPS"
- Ikona serwera server rack
- Etykieta domeny: "dane.twojadomena.pl"
- Wewnątrz 3 mniejsze pudełka z etykietami: "sGTM", "Enhanced Matching", "event_id"
- Wychodząca strzałka oznaczona "hashed data + event_id"

BLOK 3 (środkowo-prawy, kolor cyan #06b6d4): "Deduplikacja"
- Ikona 2 strzałek się spotykających i łączących
- Tekst: "Pixel + CAPI"

BLOK 4 (po prawej, kolor navy #1e293b): "Meta Ads Manager"
- Ikona logo Meta
- Pod nim etykieta: "Event Match Quality 9/10"
- Ikona zielonej fajki (sukces)

Nad flowchartem, druga linia pokazująca przepływ Pixela klasycznego równolegle (ta sama ścieżka), z etykietą "event_id" — to samo id łączy oba źródła.

Tytuł: "Przepływ konwersji: strona → VPS → Meta"

Podkreśl, że komunikacja VPS → Meta to "server-to-server" (bez przeglądarki).
```

---

## 3. Google Power VPS: Przepływ danych

**Plik docelowy:** `public/infografiki/google-power-vps-przeplyw.png`  
**Używana na:** [/uslugi/google-power-vps](src/pages/uslugi/google-power-vps.astro)

### Prompt

```
Stwórz infografikę techniczną w stylu neo-brutalist flat illustration, pokazującą jak dane GA4 i Google Ads przepływają przez dedykowany VPS. Proporcje 3:2, białe tło #fafaf9, grube czarne kontury 2px, offset shadows 4px, sans-serif bold.

Layout: 1 strona klienta po lewej, VPS w środku, 2 cele po prawej (GA4 i Google Ads).

BLOK 1 (po lewej, szary #6b7280): "Twoja strona"
- Ikona laptopa
- Etykieta: "GTM Web Container"
- 2 wychodzące strzałki (jedna do każdego eventu): "pageview", "purchase"

BLOK 2 (środek, cyan #06b6d4): "Twój VPS"
- Ikona serwera
- Subdomena "dane.twojadomena.pl"
- Wewnątrz kontenera 3 mini-bloki: "sGTM", "Consent Mode v2", "Enhanced Matching"
- 2 wychodzące strzałki oznaczone: "Measurement Protocol" (do GA4) i "Enhanced Conversions API" (do Google Ads)

BLOK 3 (prawy górny, kolor pomarańczowy #f59e0b): "GA4"
- Logo GA4
- Etykieta: "Pełny obraz ścieżki użytkownika"

BLOK 4 (prawy dolny, kolor niebieski #4285f4 — Google blue): "Google Ads"
- Logo Google Ads
- Etykieta: "Enhanced Conversions: Excellent"

Nad VPS pokaż ikonę "hashed PII" (zamknięta kłódka z "email, phone") — wskazujące że dane są szyfrowane server-side zanim trafią do Google.

Tytuł: "GA4 i Google Ads server-side przez Twój VPS"

Zaznacz strzałkami: "bez abonamentu Stape", "bez limitu eventów".
```

---

## 4. Google Consent Mode v2

**Plik docelowy:** `public/infografiki/google-consent-mode-v2.png`  
**Używana na:** [/uslugi/google-power-vps](src/pages/uslugi/google-power-vps.astro)

### Prompt

```
Stwórz infografikę w stylu neo-brutalist flat illustration, pokazującą jak Consent Mode v2 pozwala modelować konwersje od użytkowników, którzy odmówili zgody na cookies. Proporcje 3:2, białe tło #fafaf9, grube kontury 2px, offset shadows 4px.

Podziel obraz pionowo na 2 ścieżki wychodzące od jednej strony internetowej z banerem cookies.

GÓRNA ŚCIEŻKA (zielona, sukces):
1. Użytkownik (ikona ludzika z zieloną fajką) → "Zaakceptowano cookies"
2. Strzałka do Twojego VPS (subdomena dane.twojadomena.pl)
3. VPS wysyła pełne dane do Google Ads i GA4
4. Podpis: "Pełne dane konwersji"
5. Ikona Google z podpisem: "Remarketing i optymalizacja działają"

DOLNA ŚCIEŻKA (szaro-pomarańczowa):
1. Użytkownik (ikona ludzika z czerwonym X) → "Odrzucono cookies"
2. Mała strzałka "consent signal" do Twojego VPS
3. VPS wysyła tylko sygnały consent v2 (bez PII) do Google
4. Ikona Google z napisem: "Modelowanie konwersji"
5. Podpis: "Google odtwarza dane statystycznie"
6. Efekt: "Twoje kampanie nadal się uczą, zamiast być ślepe"

Tytuł na górze: "Consent Mode v2: Twój biznes nie traci, nawet gdy klient nie wyraża zgody"

Pokaż datę: "Obowiązkowy w EOG od marca 2024".

Kolorystyka: cyan #06b6d4 dla VPS, Google blue #4285f4 dla celów, szary dla odrzuconych, zielony dla zaakceptowanych. Bold sans-serif, napisy po polsku.
```

---

## 5. Automatyzacje: 5 abonamentów w 1 VPS

**Plik docelowy:** `public/infografiki/automatyzacje-vps-5-w-1.png`  
**Używana na:** [/uslugi/automatyzacje-vps](src/pages/uslugi/automatyzacje-vps.astro)

### Prompt

```
Stwórz infografikę finansowo-porównawczą w stylu neo-brutalist flat illustration, pokazującą jak 5 drogich abonamentów zastępujemy jednym VPS. Proporcje 3:2, białe tło #fafaf9, grube kontury 2px.

Layout: strona podzielona pionowo na 2 części, po środku duża strzałka "→".

LEWA STRONA — "Pudełkowy stack" (czerwona ramka):
Ułożone jak pięć stosów fakturek lub logotypów narzędzi:
1. Klaviyo — "300–2000 zł/mies."
2. Mailchimp — "100–600 zł/mies."
3. Zapier — "80–400 zł/mies."
4. Intercom — "800–3000 zł/mies."
5. Supermetrics — "200–800 zł/mies."

Pod stosem: wielka czerwona etykieta "RAZEM: 1 480 do 6 800 zł / mies."

Nad stosem ikona portfela z "przeciekaniem" pieniędzy, symbolizująca wyciek.

PRAWA STRONA — "Twój VPS" (cyan ramka #06b6d4):
1. Duża ikona serwera w centrum
2. Wokół niego, jak satelity, 4 mniejsze ikony-kontenery: "n8n", "Listmonk", "AI chatbot", "Raporty"
3. Pod serwerem: wielka cyan etykieta "RAZEM: 0 zł / mies."
4. Mały napis: "(+ ok. 20 zł SMTP)"

Między obiema stronami, gruba cyan strzałka z napisem "MIGRACJA" albo "→".

Na samym dole duża suma: "Oszczędzasz 1 500 do 3 000 zł / mies."
Pod nią: "Zwrot kosztu wdrożenia w 1 do 2 miesięcy"

Tytuł: "5 abonamentów w 1 serwerze"

Bold sans-serif, napisy po polsku. Logotypy narzędzi w stylu flat (nie realistyczne), tylko rozpoznawalne sygnatury.
```

---

## 6. Automatyzacje: Architektura VPS

**Plik docelowy:** `public/infografiki/automatyzacje-vps-architektura.png`  
**Używana na:** [/uslugi/automatyzacje-vps](src/pages/uslugi/automatyzacje-vps.astro)

### Prompt

```
Stwórz infografikę technicznej architektury w stylu neo-brutalist flat illustration, pokazującą co stoi na VPS klienta. Proporcje 3:2, białe tło #fafaf9, grube kontury 2px czarne, offset shadows 4px.

Layout: duży prostokąt VPS w centrum, w nim wewnątrz 4 kontenery Docker (mniejsze prostokąty), a wokół zewnętrzne systemy łączące się strzałkami.

CENTRUM — Duży prostokąt "Twój VPS (Mikrus Pro / Hostinger KVM 4)":
W środku 4 mniejsze, kolorowe pudełka-kontenery Docker:
1. **n8n** (cyan #06b6d4) — "Silnik automatyzacji"
2. **Listmonk** (różowy #ec4899) — "Newsletter"
3. **sGTM** (pomarańczowy #f97316) — "Meta CAPI + Google Ads"
4. **AI chatbot** (fioletowy #8b5cf6) — "Claude/GPT"

Między nimi małe linie pokazujące że się komunikują.

GÓRA VPS — zewnętrzne wejścia:
- Strona klienta (ikona laptopa) → strzałka do sGTM
- Formularz kontaktowy → strzałka do n8n
- Webhook ze sklepu → strzałka do n8n

DÓŁ VPS — zewnętrzne wyjścia:
- Meta Ads (logo) ← ze sGTM
- Google Ads (logo) ← ze sGTM
- GA4 (logo) ← ze sGTM
- Amazon SES (ikona maila) ← z Listmonk
- Slack / Telegram (ikony) ← z n8n
- WhatsApp / SMS ← z n8n

PRAWA STRONA — panel właściciela:
- Ikona laptopa z podpisem "Panel n8n w przeglądarce"
- Ikona kluczyka z podpisem "Dostępy root do VPS"

Pod wszystkim napis: "Docker + Caddy + Let's Encrypt. Wszystko na jednej domenie."

Tytuł na górze: "Architektura Automatyzacji VPS"

Bold sans-serif, napisy po polsku, płaskie ikony liniowe.
```

---

## Jak generować w Nano Banana (Gemini)

1. Wejdź na [gemini.google.com](https://gemini.google.com) i wybierz model Gemini 3 Pro Image (Nano Banana Pro).
2. Wklej sekcję "Styl graficzny strony" + konkretny prompt dla infografiki. Całość w jednej wiadomości.
3. Jeśli wynik odbiega od stylu, dopytaj: "Zrób to bardziej brutalist, grubsze czarne kontury 2px, offset shadow 4px, tylko płaskie kolory bez gradientów."
4. Po wygenerowaniu: pobierz jako PNG (1800 x 1200 lub wyższe), wrzuć do `public/infografiki/` pod nazwą z "Plik docelowy".

## Jak podmienić na stronie

Pliki PNG są już zreferowane w podstronach:
- [src/pages/uslugi/meta-power-vps.astro](src/pages/uslugi/meta-power-vps.astro)
- [src/pages/uslugi/google-power-vps.astro](src/pages/uslugi/google-power-vps.astro)
- [src/pages/uslugi/automatyzacje-vps.astro](src/pages/uslugi/automatyzacje-vps.astro)

Wystarczy, że pliki znajdą się w `public/infografiki/` pod właściwymi nazwami i przy rebuildzie Astro same się podstawią. Bez edycji kodu.

## Wskazówki optymalizacyjne

- **Rozmiar pliku:** dąż do < 200 KB per infografika. Jeśli Nano Banana wygeneruje PNG 2 MB, przepuść przez [squoosh.app](https://squoosh.app) (tryb OxiPNG lub AVIF).
- **Alt text:** każdy `<img>` ma już poprawny `alt` z opisem dla screen readerów. Nie zmieniaj.
- **Dark mode:** infografiki mają białe tło, więc jeśli kiedyś włączysz dark mode na stronie, nadal będą czytelne (biała karta na ciemnym tle).
