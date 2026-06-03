# Karuzela: Google Tag Gateway - 30 sekund decyzji

**Data publikacji:** 2026-06-04 (czwartek)
**Kanały:** Instagram + Facebook (carousel)
**Artykuł powiązany:** https://serwer-side.pl/wiedza/google-tag-gateway-vs-sgtm

---

## Specyfikacja grafik

- **Format:** 4:5 (1080 x 1350 px)
- **Liczba slajdów:** 5
- **Slajdy dual-use (karuzela + artykuł):** 2, 4
- **Generacja:** `node scripts/generate-tag-gateway-content.mjs`
- **Output:** `c:\Users\matla\Documents\Visual Studio Code\serwer-side PROJECT\Socialmedia\instagram\carousel\assets\2026-06-03\`
- **Dual-use kopie:** `c:\Users\matla\Documents\Visual Studio Code\serwer-side PROJECT\public\infografiki\google-tag-gateway-*.png`

---

## Slajdy

| # | Nazwa | Opis | W artykule? |
|---|---|---|---|
| 1 | hook | "30-42% konwersji ginie. Tag Gateway naprawia to za 0 zł" | nie |
| 2 | schemat-routingu | Diagram PRZED (BLOCKED) vs PO (twojadomena.pl/metrics) | TAK |
| 3 | dla-kogo | 3 typy biznesów: e-commerce, strony usługowe, blogi | nie |
| 4 | drzewko-decyzyjne | Drzewko: GTM tak/nie → Cloudflare tak/nie → Tag Gateway/Stape/GTM | TAK |
| 5 | cta | "Sprawdzimy Twoją stronę w 24h. kontakt@serwer-side.pl" | nie |

---

## Caption - Instagram

```
🚫 30-42% Twoich konwersji blokują adblocki.

Google Tag Gateway naprawia to za 0 zł miesięcznie.
1 dzień wdrożenia. Bez sGTM. Bez Stape.

Ale uwaga: nie działa na każdej stronie.

Dla kogo zadziała:
✅ WordPress self-hosted, WooCommerce
✅ Strony usługowe z formularzami
✅ E-commerce do 30 000 zł budżetu/m-c

Dla kogo NIE zadziała wprost:
❌ Wix, Squarespace
❌ WordPress.com (managed)
❌ Shopify Basic
❌ Hardcoded GA4 bez GTM

Dla każdego z nich w karuzeli pokazuję alternatywę.

3 pytania w 30 sekund i wiesz, czy Tag Gateway u Ciebie zadziała. Pełny przewodnik z drzewkiem decyzyjnym - link w bio.

#GoogleAds #ServerSide #GA4 #TagGateway #Cloudflare #DigitalMarketing #AnalyticsTools
```

Hashtagi do **pierwszego komentarza**, nie w treści.

---

## Caption - Facebook

```
📉 Adblocki kasują 30-42% Twoich konwersji w panelu Google Ads. ROAS wygląda gorzej niż faktyczne wyniki w biznesie. Optymalizacja kampanii uczy się na niepełnych danych.

Google Tag Gateway to nowe narzędzie, które rozwiązuje ten problem za 0 zł miesięcznie. 1 dzień wdrożenia, działa transparentnie, bez wymiany pixeli i bez kosztów Stape.io czy własnego serwera GTM.

Tyle, że nie działa na każdej stronie.

Wymaga trzech rzeczy: Google Tag Managera webowego, kontroli nad DNS Twojej domeny i platformy hostingowej, która pozwala na warstwę proxy (najczęściej Cloudflare).

Wix, Squarespace, WordPress.com w wersji managed i Shopify Basic - cztery najpopularniejsze platformy, na których Tag Gateway w czystej formie NIE zadziała. Dla każdej z nich jest jednak alternatywa.

W karuzeli pokazuję:
- Schemat działania Tag Gateway (PRZED vs PO)
- 3 typy biznesów, które najwięcej zyskują
- Drzewko decyzyjne: która droga jest dla Ciebie
- Co robić, jeśli Twoja platforma nie obsługuje Tag Gateway

Pełny przewodnik z 4 alternatywami w komentarzach: https://serwer-side.pl/wiedza/google-tag-gateway-vs-sgtm

Jeśli chcesz konkretną odpowiedź dla Twojej strony - napisz na kontakt@serwer-side.pl. Sprawdzę technologię, podam realny koszt wdrożenia, bez bullshitu o "kompletnym server-side za 7 500 zł".
```

---

## Pierwszy komentarz pod postem (oba kanały)

```
Link do pełnego przewodnika:
https://serwer-side.pl/wiedza/google-tag-gateway-vs-sgtm

Tabela platform, których Tag Gateway NIE obsługuje, plus konkretne alternatywy dla Wix, Squarespace, Shopify Basic i WordPress.com managed.
```

---

## Harmonogram

- **2026-06-03 (środa):** publikacja artykułu na stronie
- **2026-06-04 (czwartek):** post karuzela na IG + FB (oba o tej samej godzinie, najlepiej 10:00 lub 19:00)
- **2026-06-06 (sobota):** opcjonalny push-up posta jeśli zasięg organiczny słaby (Story z linkiem do artykułu)

---

## Po wygenerowaniu grafik (TODO)

1. Uruchom: `node scripts/generate-tag-gateway-content.mjs`
2. Sprawdź czy w grafikach są poprawne polskie znaki (ą ć ę ł ń ó ś ź ż) - Gemini czasem pomija
3. Jeśli któryś slajd wymaga regeneracji: `node scripts/generate-tag-gateway-content.mjs 3` (tylko slide 3)
4. Wgraj 5 slajdów do Mety Business Suite jako karuzelę
5. Skopiuj caption IG, dodaj hashtagi do pierwszego komentarza
6. Skopiuj caption FB, dodaj link do artykułu w pierwszym komentarzu
