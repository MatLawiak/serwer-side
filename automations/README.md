# automations — workflow n8n

Eksporty JSON workflow n8n. Wszystkie automatyzacje w jednym miejscu, podzielone po przeznaczeniu.

## Struktura

- [serwer-side.pl/](./serwer-side.pl/) — automaty dla własnej marki (content gen, Telegram, grafiki).
- [_templates/](./_templates/) — reużywalne szablony SST dla klientów (Meta CAPI, GA4 MP, Google Ads, error monitor). Klonujemy i dostosowujemy per klient.
- [_archive/](./_archive/) — stare workflow, lekcje, referencje (nie używane produkcyjnie).

## Workflow klientów

Workflow produkcyjne per klient trzymamy w [../clients/<nazwa>/workflows/](../clients/) — razem z dokumentacją i statusem wdrożenia tego klienta.

## Konwencja nazewnictwa

```
WF{numer}_{krotki-opis-kebab-case}.json
```

Przykłady:
- `WF1_telegram-notatka-glosowa.json`
- `WF2_generuj-tresci.json`
- `01_events-ingestion.json` (template)
