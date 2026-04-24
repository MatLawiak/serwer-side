# Wdrożone Workflow — serwer-side.pl
**Serwer:** https://zack105-20105.mikrus.cloud
**Data wdrożenia:** 2026-03-23

## Workflow IDs

| Workflow | ID n8n | Plik |
|----------|--------|------|
| WF1 — Telegram Notatka głosowa | `R6qCwkG1a52XTrAd` | serwer-side_WF1_telegram-notatka-glosowa.json |
| WF2 — Generuj treści LinkedIn+Instagram | `XNRVJe9j7jI4uL5L` | serwer-side_WF2_generuj-tresci.json |
| WF3 — Generuj grafikę DALL-E | `Ihzg7kqQVg2cD5pF` | serwer-side_WF3_generuj-grafike.json |

## Notion Database

| Nazwa | ID |
|-------|-----|
| Serwer-Side.pl — Planowanie Treści | `32cb80c840ae816789c9e46a2afb39f1` |

## Status wdrożenia: ⚠️ Wymaga konfiguracji

Wszystkie workflow są wdrożone ale NIEAKTYWNE (active: false).
Przed aktywacją skonfiguruj credentials w n8n:

### Wymagane credentials
1. **Telegram — serwer-side.pl** (type: telegramApi)
   - Bot Token z @BotFather

2. **OpenAI — serwer-side.pl** (type: openAiApi)
   - API Key z platform.openai.com

3. **Notion — serwer-side.pl** (type: notionApi)
   - Internal Integration Token: `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`

### Po skonfigurowaniu credentials
1. Otwórz każdy workflow w n8n
2. Przypisz credentials do nodów (kliknij node → Credentials)
3. Aktywuj workflow (toggle w prawym górnym rogu)
