# Karuzela: PixelYourSite + GTM — 3 błędy konfiguracji

**Data publikacji:** 2026-05-18
**Kanały:** Instagram + Facebook (carousel)
**Artykuł powiązany:** https://serwer-side.pl/wiedza/pixelyoursite-gtm-wordpress-konfiguracja

---

## Specyfikacja grafik

- **Format:** 4:5 (1080 × 1350 px)
- **Liczba slajdów:** 7
- **Slajdy dual-use (karuzela + artykuł):** 2, 4, 6
- **Generacja:** `node scripts/generate-pixelyoursite-content.mjs`

---

## Slajdy

| # | Nazwa | Opis | Artykuł? |
|---|---|---|---|
| 1 | hook | "Twój pixel zlicza dwa razy. I nie wiesz o tym." | nie |
| 2 | duplikat-schemat | Diagram ZŁA vs. DOBRA konfiguracja GTM+PYS | TAK |
| 3 | capi-wyjasnenie | 20-35% danych ginie. CAPI jako backup. | nie |
| 4 | consent-rodo | CookieYes w GTM vs. jako wtyczka WP | TAK |
| 5 | konfiguracja-mapa | Drzewo poprawnej architektury WordPress | nie |
| 6 | checklista | 8 punktów przed uruchomieniem kampanii | TAK |
| 7 | cta-meta-power-up | Limity PYS + Meta Power Up CTA | nie |

---

## Caption — Instagram

```
💸 Twój pixel w WordPressie zlicza konwersje dwa razy.

GTM + PixelYourSite bez konfiguracji = dwa osobne sygnały do Meta.
Brak wspólnego event_id = Meta liczy 2 konwersje zamiast 1.

ROAS wygląda rewelacyjnie. Kampania optymalizuje pod fikcję.

🔧 3 błędy, które psują dane:
1. GTM i PYS odpalają ten sam event
2. CookieYes w GTM nie chroni piksela PYS (luka RODO)
3. Token CAPI nie wpisany = 20-35% danych ginie

Checklista w karuzeli. Pełny artykuł: link w bio 👇

#MetaAds #WordPress #PixelYourSite #GoogleTagManager #CAPI #RODO #ServerSideTracking
```

Hashtagi do **pierwszego komentarza**, nie w treści.

---

## Caption — Facebook

```
📊 Konfiguracja PixelYourSite z Google Tag Managerem wygląda prosto. W praktyce trzy rzeczy najczęściej psują dane kampanii Meta.

🔴 Błąd 1: GTM i PYS odpaalają ten sam event Lead.
Meta dostaje dwa sygnały bez wspólnego event_id i liczy 2 konwersje zamiast 1. ROAS wygląda rewelacyjnie, kampania działa coraz gorzej.

🔴 Błąd 2: CookieYes zainstalowany tylko przez GTM.
Zarządza zgodami wyłącznie dla tagów GTM. Pixel z PYS działa poza tym systemem i zbiera dane mimo odrzucenia zgody przez użytkownika. To naruszenie RODO.

🔴 Błąd 3: Brak tokenu CAPI.
Bez niego PYS wysyła dane tylko z przeglądarki. AdBlock i Safari ITP blokują 20-35% zdarzeń konwersji.

W karuzeli pokazuję jak to naprawić i daję checklistę 8 punktów do odhaczenia przed uruchomieniem kampanii.

Pełny artykuł: https://serwer-side.pl/wiedza/pixelyoursite-gtm-wordpress-konfiguracja

#MetaAds #WordPress #PixelYourSite #GTM #CAPI #PerformanceMarketing
```

---

## Pipeline publikacji

1. Wygeneruj grafiki: `node scripts/generate-pixelyoursite-content.mjs`
2. Zweryfikuj build: `npm run build`
3. Grafiki slajdów 2, 4, 6 automatycznie trafiają do `public/infografiki/` i są widoczne w artykule
4. Wrzuć 7 PNG do Google Drive (folder serwer-side.pl)
5. Opublikuj na Instagram (carousel) + Facebook (carousel lub zdjęcia)
6. Po 7 dniach: dodaj metryki do `Socialmedia/instagram/published/`
