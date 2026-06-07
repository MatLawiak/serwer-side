# Tag Gateway dla WordPress - uniwersalna instrukcja wdrożenia

Przewodnik wdrożenia Google Tag Gateway dla stron WordPress z formularzem jako główną konwersją (Contact Form 7, FluentForms, WPForms, Gravity Forms). Zakłada że klient ma już GTM + GA4 + zazwyczaj Consent Mode v2 (CookieYes / Cookiebot / CookieFirst).

---

## Co dostaje klient po wdrożeniu

- **+25-40% raportowanych konwersji** w Google Ads (odzyskane z adblockerów)
- **+20-35% sesji w GA4** (mniej "data not available" i "(not set)")
- **Cookies first-party** - ITP w Safari nie skraca już ich życia do 7 dni
- **Lepsze modeled conversions** w Google Ads (Consent Mode v2 unlock'uje pełną funkcjonalność)
- **Koszt utrzymania: 0 zł/m-c** (Cloudflare Workers Free plan do 100 000 requestów dziennie)

---

## Pre-flight check - 15 minut przed startem

Zanim cokolwiek ruszysz, zweryfikuj 4 rzeczy. Jeśli któreś nie pasuje, sprawdź sekcję **Co robić jeśli nie pasuje** na końcu.

### Check 1: WordPress self-hosted, nie WordPress.com

Pytasz klienta gdzie ma stronę. WordPress self-hosted (na własnym hostingu typu home.pl, Hostinger, OVH, Mikr.us, AWS) działa. WordPress.com w wersji zarządzanej (hostowanej przez Automattic na wordpress.com) **nie obsługuje**.

**Test:** otwórz źródło strony klienta (Ctrl+U), szukaj `wp-content/plugins/` w ścieżkach. Jeśli widzisz - WordPress self-hosted. Jeśli widzisz `wordpress.com` w paskach - nie zadziała.

### Check 2: GTM webowy istnieje

W źródle strony klienta szukaj `GTM-` (Ctrl+F). Powinieneś zobaczyć:

```html
<script>(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXXXXX');</script>
```

Jeśli widzisz tylko `gtag('config', 'G-...')` bez `GTM-` wyżej - klient nie ma GTM, ma hardcoded GA4. Najpierw trzeba dodać GTM (1 dzień extra roboty).

### Check 3: Klient ma dostęp do panelu GTM z uprawnieniami Edit

Klient (lub agencja klienta) musi mieć dostęp do kontenera GTM z uprawnieniami do edycji zmiennych. Bez tego nie można podpiąć `transport_url`.

Pytasz wprost: "Czy logujesz się do tagmanager.google.com i widzisz kontener `GTM-XXXXXXXX`? Czy masz tam prawo edytować zmienne?". Jeśli nie - trzeba klientowi dać uprawnienia lub odebrać od poprzedniej agencji.

### Check 4: Kontrola DNS domeny klienta

Klient (lub jego administrator) musi móc zmienić nameservery domeny. Większość polskich hostingów (home.pl, OVH, nazwa.pl, Hostinger) to umożliwia z poziomu panelu.

**Test:** poproś klienta o screenshot z panela rejestratora domeny z opcją "Zmień nameservery" lub "DNS Settings". Jeśli widzisz pole do edycji - OK.

---

## Faza 1: Migracja na Cloudflare - 30 minut

Jeśli klient już używa Cloudflare przed domeną, pomiń tę fazę.

### Kroki

**1.** Załóż konto klientowi na https://dash.cloudflare.com/sign-up (free plan).

**2.** W Cloudflare dashboard kliknij **Add a Site** → wpisz domenę klienta (np. `klient-domena.pl`) → wybierz **Free plan** → Continue.

**3.** Cloudflare zeskanuje istniejące rekordy DNS i je zaimportuje. Sprawdź wzrokowo czy wszystkie wpisy A, MX, TXT są poprawne (porównaj z oryginalnymi w panelu rejestratora).

**4.** Cloudflare poda dwa nameservery, np.:
```
nora.ns.cloudflare.com
todd.ns.cloudflare.com
```

**5.** Zaloguj się do panelu rejestratora domeny klienta (home.pl / OVH / nazwa.pl), zmień nameservery na te z Cloudflare. **Save.**

**6.** Czeka 1-24 godziny na propagację DNS. Sprawdzaj statusem w Cloudflare dashboard - gdy będzie zielone "Active", można iść dalej.

### Co dostaje klient gratis dzięki Cloudflare

Nawet bez Tag Gateway, Cloudflare daje za darmo:

- CDN globalny (strona ładuje się szybciej)
- WAF (Web Application Firewall) - chroni przed atakami
- DDoS protection
- Free SSL certificate (jeśli klient miał płatny - oszczędność 100-500 zł/rok)
- Analytics ruchu

To często samo w sobie sprzedaje migrację klientowi.

---

## Faza 2: Tag Gateway Worker - 1-2 godziny

### 2.1 Stwórz Worker file

Stwórz folder `workers/tag-gateway/src/` w projekcie deploymentowym (lub osobnym repo dla danego klienta). Plik `index.mjs`:

```javascript
// Google Tag Gateway - proxy GA4 + Google Ads + Floodlight przez klient-domena.pl/metrics/*

const EXACT_ROUTES = {
  '/metrics/gtm.js': 'https://www.googletagmanager.com/gtm.js',
  '/metrics/gtag/js': 'https://www.googletagmanager.com/gtag/js',
  '/metrics/ns.html': 'https://www.googletagmanager.com/ns.html',
  '/metrics/g/collect': 'https://www.google-analytics.com/g/collect',
  '/metrics/debug/collect': 'https://www.google-analytics.com/debug/collect',
  '/metrics/r/collect': 'https://www.google-analytics.com/r/collect',
  '/metrics/collect': 'https://www.google-analytics.com/collect',
  '/metrics/ccm/collect': 'https://www.googletagmanager.com/ccm/collect',
};

const PREFIX_ROUTES = [
  { prefix: '/metrics/pagead/', target: 'https://www.googleadservices.com/pagead/' },
  { prefix: '/metrics/td/', target: 'https://td.doubleclick.net/td/' },
  { prefix: '/metrics/ccm/', target: 'https://www.googletagmanager.com/ccm/' },
];

const SILENT_204_PATTERNS = [
  /^\/metrics\/sw_iframe\.html/,
  /^\/metrics\/service_worker\//,
];

const STRIP_HEADERS = ['cf-ray', 'cf-connecting-ip', 'cf-ipcountry', 'cf-visitor', 'cf-request-id', 'cf-worker', 'x-real-ip'];

function resolveTarget(pathname) {
  if (EXACT_ROUTES[pathname]) return EXACT_ROUTES[pathname];
  for (const { prefix, target } of PREFIX_ROUTES) {
    if (pathname.startsWith(prefix)) return target + pathname.slice(prefix.length);
  }
  return null;
}

function prepareHeaders(originalHeaders, clientIp) {
  const headers = new Headers(originalHeaders);
  if (clientIp) headers.set('X-Forwarded-For', clientIp);
  for (const h of STRIP_HEADERS) headers.delete(h);
  headers.delete('host');
  return headers;
}

function addCorsHeaders(headers) {
  const response = new Headers(headers);
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type, Cache-Control');
  response.set('Access-Control-Max-Age', '86400');
  return response;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: addCorsHeaders(new Headers()) });
    }

    for (const pattern of SILENT_204_PATTERNS) {
      if (pattern.test(pathname)) {
        return new Response(null, { status: 204, headers: addCorsHeaders(new Headers()) });
      }
    }

    const targetBase = resolveTarget(pathname);
    if (!targetBase) {
      return new Response(JSON.stringify({ error: 'Path not mapped', path: pathname }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const targetUrl = targetBase + url.search;
    const clientIp = request.headers.get('CF-Connecting-IP');
    const headers = prepareHeaders(request.headers, clientIp);

    try {
      const upstream = await fetch(targetUrl, {
        method: request.method,
        headers,
        body: (request.method === 'GET' || request.method === 'HEAD') ? undefined : request.body,
        redirect: 'manual',
      });
      return new Response(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers: addCorsHeaders(upstream.headers),
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Gateway error', message: error.message }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
```

### 2.2 Config wrangler.jsonc

Plik `workers/tag-gateway/wrangler.jsonc`:

```jsonc
{
  "name": "klient-tag-gateway",
  "main": "src/index.mjs",
  "compatibility_date": "2026-06-03",
  "routes": [
    { "pattern": "klient-domena.pl/metrics/*", "zone_name": "klient-domena.pl" }
  ],
  "observability": { "enabled": true }
}
```

Zmień `klient-tag-gateway` i `klient-domena.pl` na faktyczne wartości.

### 2.3 Deploy

W terminalu (PowerShell na Windows):

```
cd "sciezka/do/workers/tag-gateway"
npx wrangler login
npx wrangler deploy
```

Pierwszy raz wymaga OAuth login (otworzy browser). Po loginie - deploy w 5-10 sekund. W output zobaczysz potwierdzenie:

```
Uploaded klient-tag-gateway (5 sec)
Deployed klient-tag-gateway triggers (8 sec)
  klient-domena.pl/metrics/*
```

### 2.4 Test endpointów przez curl

Z dowolnego terminala:

```
curl -I "https://klient-domena.pl/metrics/gtm.js?id=GTM-XXXXXXXX"
```

Oczekiwany wynik: `HTTP/1.1 200 OK`, Content-Type: `application/javascript`. Jeśli widzisz - Worker działa.

```
curl -X POST "https://klient-domena.pl/metrics/g/collect?v=2&tid=G-XXXXXXXXXX" -w "HTTP: %{http_code}\n"
```

Oczekiwany: `HTTP: 204`. To poprawne zachowanie GA4 collect endpoint.

---

## Faza 3: Update GTM - 15 minut

To moment **cutover** - tutaj GA4 zaczyna wysyłać hits przez Tag Gateway zamiast bezpośrednio do Google.

### Kroki w panelu GTM

**1.** Zaloguj się na https://tagmanager.google.com → kontener klienta `GTM-XXXXXXXX`.

**2.** Lewy panel → **Tags** → znajdź główny tag **"Google Tag"** lub **"GA4 Configuration"** (czasem nazywany "Tag Google" w polskim).

**3.** W sekcji **Parametr konfiguracji** dodaj lub edytuj:

| Parametr | Wartość |
|---|---|
| `transport_url` | `https://klient-domena.pl/metrics` |
| `server_container_url` | `https://klient-domena.pl/metrics` |

Oba parametry mają ten sam URL - to świadoma decyzja, Worker obsługuje wszystkie endpoints które wcześniej były na bezpośrednim Google.

**4.** Zapisz tag (przycisk w prawym górnym).

**5.** Wróć do głównego widoku kontenera → prawy górny róg **Submit** (Wyślij).

**6.** Nazwa wersji: `Tag Gateway cutover`. Opis: `transport_url przekierowany na klient-domena.pl/metrics`. **Publish.**

---

## Faza 4: Test - 30 minut

### Test A: Network tab w incognito + uBlock Origin

Zainstaluj uBlock Origin w Chrome (jeśli nie masz).

**1.** Otwórz **incognito** (Ctrl+Shift+N).

**2.** Wpisz w pasku: `https://klient-domena.pl/`.

**3.** F12 → **Network** → filtr `metrics`.

Powinieneś widzieć:

- `metrics/gtm.js` → **200 OK** (GTM container)
- `metrics/g/collect?v=2&...` → **204** (GA4 PageView)
- Brak requestów do `googletagmanager.com` ani `google-analytics.com`

Jeśli widzisz `metrics/*` z 200/204 - **gratulacje, Tag Gateway omija adblocker u realnego usera**.

### Test B: GA4 Realtime

**1.** https://analytics.google.com → property klienta `G-XXXXXXXXXX` → **Realtime**.

**2.** W drugiej karcie odśwież `klient-domena.pl/`.

**3.** W ciągu 30 sekund widzisz **1 aktywny user**, event `page_view`.

Jeśli widzisz - GA4 dostaje hits przez Worker.

### Test C: Test konwersji formularza

**1.** Otwórz Twoją domenę testową, wypełnij formularz testowy (możesz użyć fake email typu `test+gateway@klient-domena.pl`).

**2.** GA4 Realtime → patrz na event `form_submit` lub `generate_lead` (zależnie od konfiguracji klienta).

**3.** Google Ads → Tools → Conversion Tracking → status powinien być "Active" plus zwiększyć się licznik konwersji.

### Test D: Cloudflare Workers Analytics

**1.** Cloudflare dashboard → Workers & Pages → `klient-tag-gateway`.

**2.** Sprawdź zakładkę **Metrics** lub **Logs** - powinieneś widzieć requesty z Twoich testów.

---

## Faza 5: Monitoring 7-14 dni

Pierwsza tydzień po cutover - klient powinien monitorować, czy nie ma regresji.

### Co monitorować

**GA4 Reports → Acquisition → Traffic acquisition:**
- Liczba sesji powinna **wzrosnąć o 15-30%** w stosunku do poprzedniego tygodnia
- `(data not available)` jako % powinien **spaść** z ~5-8% do ~2-3%
- `direct/none` jako % powinien też spaść (niektóre były atrybuowane jako direct po blokadzie GTM)

**Google Ads → Konwersje:**
- Liczba raportowanych konwersji per kampania powinna wzrosnąć o **20-30%**
- CPA (koszt za konwersję) powinien spaść proporcjonalnie

**Cloudflare Workers Analytics:**
- Liczba requestów dziennie - sprawdź czy nie przekraczamy 100 000 (próg Free planu)
- Status codes - większość 200/204, błędy 5xx powinny być <1%

**Jeśli ruchu jest dużo i przekraczamy 100k/dzień:**
- Cloudflare Workers Paid: 5 USD/m-c = 10M requestów/m-c (wystarcza dla ~70 000 wizyt dziennie)

---

## Co robić jeśli pre-flight check nie pasuje

| Sytuacja | Co robić |
|---|---|
| Klient nie ma GTM, tylko hardcoded GA4 | Dodaj GTM (1 dzień). Migracja istniejących tagów + nowa konfiguracja. |
| Klient ma WordPress.com zarządzany | Tag Gateway nie zadziała. Migracja na WordPress self-hosted lub Stape.io. |
| Klient nie ma kontroli nad DNS | Negocjuj z administratorem domeny. Jeśli niemożliwe - Stape.io. |
| Klient ma cache plugin agresywnie cache'ujący HTML | Po wdrożeniu GTM update - purge cache (LiteSpeed Cache, W3 Total, WP Rocket). |
| Klient ma już Cloudflare ale z Workers już wykorzystanym przez inne rzeczy | Sprawdź czy nie ma konfliktu routes. Można dodać drugi Worker dla `/metrics/*` niezależnie. |

---

## Kiedy Tag Gateway, a kiedy pełny sGTM (Stape)

Tag Gateway jest **wystarczający w 80% przypadków**. Pełny serwerowy GTM (Stape.io, własny Cloud Run) ma sens w konkretnych sytuacjach.

### Matryca decyzyjna

| Sytuacja klienta | Rekomendacja | Powód |
|---|---|---|
| Budżet reklamowy **do 30 000 zł/m-c**, tylko Google Ads | **Tag Gateway** | Inwestycja 20-99 USD/m-c w Stape nie zwraca się w skali. |
| **30-50 000 zł/m-c**, Google Ads + Meta Ads | **Tag Gateway + VPS dla Meta CAPI** | Hybryda: 0 zł dla Google przez Tag Gateway, 30-60 zł/m-c VPS dla Meta. Razem 2-7x taniej niż Stape. |
| **50 000+ zł/m-c**, dużo platform reklamowych | **Stape lub własny sGTM** | Koszt 80-396 zł/m-c rozkłada się na większy budżet. Stape obsługuje 10+ platform out-of-box. |
| Klient wymaga **modyfikacji eventów przed Google** (anonimizacja IP, redakcja PII, wzbogacanie z CRM) | **Stape lub własny sGTM** | Tag Gateway to czysty pass-through. Nie modyfikuje payloadu. |
| Klient wymaga **compliance EU vs USA** (Schrems II) | **Stape EU lub własny Cloud Run we Frankfurt** | Pełny sGTM hostowany w UE daje pełną kontrolę nad transferem danych. |
| Klient ma **Wix / Squarespace / Shopify Basic / WordPress.com zarządzany** | **Stape** | Tag Gateway wymaga kontroli nad DNS i `transport_url` w GTM - te platformy nie pozwalają. |
| Klient ma **>10 platform reklamowych** (Google, Meta, TikTok, LinkedIn, Pinterest, Spotify, etc.) | **Stape lub Cloud Run** | Każda platforma osobny VPS workflow = nieskalowalne. Stape ma to out-of-box. |

### Cenowe progi

| Setup | Roczny koszt utrzymania | Sens przy budżecie reklamowym |
|---|---|---|
| **Tag Gateway na Cloudflare Free** | **0 zł** | każdy budżet |
| **Tag Gateway + VPS dla Meta CAPI** | 360-720 zł | 5 000 - 50 000 zł/m-c |
| **Stape.io Startup** (20 USD/m-c) | ~960 zł | 30 000+ zł/m-c |
| **Stape.io Business** (99 USD/m-c) | ~4 752 zł | 100 000+ zł/m-c |
| **Cloud Run sGTM własny** (EU region) | 1 440-4 800 zł | 50 000+ zł/m-c, plus wymagania compliance |

Reguła kciuka: **Stape.io zaczyna mieć sens przy budżecie reklamowym powyżej 30 000 zł miesięcznie**. Poniżej tego pułapu hybryda Tag Gateway + VPS jest dramatycznie tańsza i daje to samo.

---

## Wycena wdrożenia Tag Gateway dla klienta

### Stawki rynkowe w PL (stan 2026)

Konkurencja proponuje:

| Oferta | Cena setup | Cena utrzymania |
|---|---|---|
| Stape przez agencję | 3 000 - 8 000 zł | 80-400 zł/m-c (przeniesienie kosztu Stape) |
| sGTM własny przez agencję | 5 000 - 15 000 zł | 200-500 zł/m-c (VPS) |
| "Server-side w 24h za 500 zł" (niskobudżetowe oferty) | 500 - 1 500 zł | 0 zł (zwykle niekompletne, bez Consent Mode) |

### Sugerowana wycena dla Tag Gateway

Patrząc na zakres roboty (1-2 dni dla doświadczonego wdrożeniowca), realna wycena dla pełnego pakietu:

**Pakiet podstawowy - Tag Gateway sam: 1 200 - 1 500 zł brutto**

Zawiera:
- Pre-flight check + audyt obecnego trackingu (1h)
- Migracja na Cloudflare jeśli potrzeba (30 min - 1h)
- Konfiguracja Worker + deploy (2h)
- Update GTM transport_url (15 min)
- Test paralelny + monitoring 7 dni (15 min/dzień przez tydzień)
- Dokumentacja dla klienta (1h)

**Pakiet rozszerzony - Tag Gateway + Consent Mode v2 + setup CookieYes: 1 800 - 2 500 zł brutto**

Plus:
- Setup CookieYes (lub Cookiebot) konto + konfiguracja banera (1-2h)
- Audyt tagów GTM pod kątem Consent Mode v2 settings (1-2h)
- Test scenariuszy accept/reject/preferences (1h)

**Pakiet pełen - Tag Gateway + Consent Mode + Meta CAPI przez VPS: 2 500 - 4 000 zł brutto**

Plus:
- Setup VPS (Hostinger / Mikr.us / OVH) - 1h
- Workflow n8n dla Meta CAPI (1-2 dni) - integracja z formularzami FluentForms / WPForms / Gravity Forms
- Test deduplikacji event_id między Pixel a CAPI (2h)

**Stawki utrzymania**

- Pakiet podstawowy: **0 zł/m-c** (Cloudflare Workers Free wystarcza)
- Pakiet rozszerzony: **0 zł/m-c** (CookieYes Free dla 1 strony)
- Pakiet pełen: **30-60 zł/m-c** (koszt VPS u klienta)

### Jak sprzedać tę wycenę

**Hook biznesowy dla klienta:**

> "Konkurencja proponuje Ci Stape za 99 USD miesięcznie (4 752 zł rocznie) plus 5 000 zł setupu. Razem rok 1 to 9 752 zł, każdy następny rok 4 752 zł.
>
> Moja propozycja: 1 500 zł jednorazowo, 0 zł utrzymania. W 5 lat oszczędzasz **22 510 zł**.
>
> Robię identyczny technologicznie efekt. Stape sam jest reverse proxy + kontener sGTM. Dla Twojego stack'u (Google Ads + GA4) sam reverse proxy w pełni wystarcza - kontener sGTM byłby nieużywany."

### Dla klientów premium

Jeśli klient ma budżet reklamowy 50 000+ zł/m-c i wymaga compliance (RODO/Schrems II), wycena może iść **wyżej** za pełny sGTM:

- Setup sGTM na własnym Cloud Run we Frankfurt: **5 000 - 10 000 zł**
- Utrzymanie infrastruktury chmurowej: **150-400 zł/m-c**

To uczciwie odzwierciedla pracę + odpowiada na realne wymagania prawne, których Tag Gateway nie pokrywa.

---

## Podsumowanie

Tag Gateway dla WordPress + GTM + GA4 to **najlepsza opcja kosztowa** dla 80% projektów reklamowych. 1-2 dni setupu, 0 zł utrzymania, +30-40% raportowanych konwersji.

Pełen sGTM (Stape, Cloud Run) ma sens tylko gdy budżet reklamowy przekracza 30-50k zł miesięcznie albo gdy klient ma wymagania compliance/PII których Tag Gateway nie obsługuje (czysty pass-through bez modyfikacji eventów).

Sugerowana wycena dla typowego pakietu **Tag Gateway + Consent Mode v2 setup: 1 500 - 2 500 zł brutto** jednorazowo, **0 zł/m-c** utrzymania. Konkurencyjne ofery Stape przez agencję są 3-5x droższe w cyklu 5-letnim, dając ten sam efekt techniczny.

---

*Dokument przygotowany jako wewnętrzna instrukcja wdrożeniowa. Można adaptować jako:*
- *Ofertę dla klienta (przepisz sekcję pricing pod stawki agencji)*
- *Artykuł na blog (skróć sekcje techniczne, rozwiń biznesowe)*
- *Checklistę wewnętrzną dla zespołu (zostaw tylko Fazy 1-5)*
- *SOP dla wdrożeniowca (rozbij każdą Fazę na sub-zadania)*
