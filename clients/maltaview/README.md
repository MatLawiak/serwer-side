# MaltaView — status wdrożenia

**Klient:** ART-SALES Sp. z o.o.
**Produkt:** MaltaView — apartamenty premium nad Jeziorem Maltańskim (Poznań)
**Strona:** https://maltaview.pl
**Kontakt techniczny:** mateusz@twistedpixel.pl

---

## Stack techniczny

- WordPress + Elementor + Fluent Forms Pro
- Web GTM: `GTM-NWHV84GX`
- Server GTM: `GTM-P7H9R78S` (transport: `https://dane.maltaview.pl`)
- n8n self-hosted: `https://n8n.srv1076230.hstgr.cloud/`
- CookieYes (CMP)
- Meta Pixel: `2073661919762572`
- Meta Graph API v19.0
- GA4 Measurement ID: `G-G4J4S4MVCX`

## Wdrożone integracje (marzec 2026)

- Meta Pixel via GTM z event_id
- Meta CAPI — Lead (webhook Fluent Forms → n8n → Graph API)
- Meta CAPI — PageView (sGTM, real-time)
- GA4 Server-Side — zdarzenie `generate_lead` via Measurement Protocol
- Monitoring błędów — email na mateusz@twistedpixel.pl

## Deadline biznesowy

**Pokrycie CAPI musi osiągnąć minimum 75%.**

| Data | Pokrycie | Stan |
|---|---|---|
| Przed wdrożeniem | 36% | baseline |
| Marzec 2026 (po 1. wdrożeniu) | ~36% | wdrożone 5 integracji |
| 2026-04-21 (naprawa fbc) | **41%** | fbc wypełniany, ale inne parametry wciąż słabe |
| Cel | **75%+** | — |

## Aktualne hipotezy dlaczego 41%

1. PageView CAPI ma tylko 4–5 parametrów (fbp, fbc, IP, UA) zamiast 10+
2. Możliwy rozjazd `event_id` między Pixel a CAPI (brak deduplikacji)
3. Brak `external_id` stałego w cookie
4. Brak `ct`/`st`/`zp`/`country` w payloadach

## Plan naprawczy

Szczegółowo w [../../clients/maltaview/checklist-sgtm.md](./checklist-sgtm.md) + analiza z sesji Claude. Kolejność:

1. Weryfikacja event_id Pixel vs CAPI (30 min)
2. Wdrożenie `external_id` (1 dzień)
3. Reverse proxy `dane.maltaview.pl/wh/*` (2 dni)
4. Wzbogacenie user_data (country + GeoIP → ct/zp) (3 dni)
5. Flow `test_event_code` + iteracja do EMQ 8+ (tydzień)

## Pliki

- [checklist-sgtm.md](./checklist-sgtm.md) — checklist wdrożenia sGTM
- [raport-marzec-2026.docx](./raport-marzec-2026.docx) — raport dla klienta po pierwszym wdrożeniu
- [workflows/](./workflows/) — eksporty JSON produkcyjnych workflow z n8n

## Znane problemy / TODO

### Lead — brak deduplikacji Pixel ↔ CAPI

**Status:** Lead CAPI strzela (events_received: 1), ale `event_id` jest generowany losowo po stronie n8n (`lead_{ts}_{rand}`), bo Fluent Forms Pro nie przekazuje `event_id` z przeglądarki. Pixel Lead (GTM tag 43 `fbq('track', 'Lead')`) też nie wysyła `eventID`. Meta traktuje Pixel Lead i CAPI Lead jako **dwa osobne zdarzenia** — coverage Lead nigdy nie osiągnie 75%+.

**Naprawa (kolejna iteracja):**

1. **Fluent Forms:** dodać do formularza „Zapytaj o Apartament" ukryte pole `event_id`
2. **GTM Web:** nowy tag „Gen Lead EventID" (Custom HTML, trigger: `wiadomosc_wyslana` lub `przeslanie_formularza`), który:
   - Generuje `eventId = 'lead_' + Date.now() + '_' + Math.random()...`
   - Wypełnia ukryte pole `input[name="event_id"]` tym ID **przed** submitem
   - Zmienia tag 43 na: `fbq('track', 'Lead', {}, { eventID: eventId })`
3. **n8n Lead workflow:** po wdrożeniu powyższego, przywrócić guard `if (!eventId) return [];` — żeby odrzucać Leady bez event_id (pewnie nie przyjdą wtedy żadne)

Dopiero wtedy Lead CAPI ↔ Pixel Lead będą deduplikowane i coverage Lead wzrośnie.

### IP `172.18.0.1` w części executions

Reverse proxy (Traefik/Nginx) przed n8n na VPS klienta w części requestów nie przekazuje prawdziwego IP klienta (widać Docker-internal `172.18.0.1` zamiast realnego IP z internetu). Wpływa na EMQ (jakość dopasowania), ale nie na coverage. Naprawa: konfiguracja `X-Forwarded-For` / `X-Real-IP` w proxy. Wymaga dostępu do serwera.
