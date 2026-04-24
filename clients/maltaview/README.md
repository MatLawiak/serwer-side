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
- [workflows/](./workflows/) — eksporty JSON produkcyjnych workflow (do uzupełnienia z n8n)
