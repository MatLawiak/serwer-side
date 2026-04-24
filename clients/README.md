# clients — katalogi klientów

Jeden folder = jeden klient. Wszystko dotyczące tego klienta (checklisty, raporty, workflow produkcyjne, statusy) trzymamy tu razem.

## Aktywni klienci

- [maltaview/](./maltaview/) — ART-SALES Sp. z o.o., apartamenty premium, Poznań. Wdrożenie Meta CAPI + GA4 SS.

## Struktura folderu klienta

```
clients/<nazwa>/
├── README.md              # status wdrożenia, kontakty, deadline'y
├── checklist-*.md         # checklisty wdrożeniowe
├── raport-*.docx          # raporty dla klienta
└── workflows/             # eksporty JSON z n8n produkcyjnego klienta
```

## Jak dodać nowego klienta

1. `cp -r clients/_template clients/<nazwa>` (template powstanie po 2–3 wdrożeniach, gdy ustabilizujemy wzorzec)
2. Wypełnij README (kontakty, pixel ID, credentials n8n, deadline)
3. Sklonuj potrzebne template'y z [../automations/_templates/](../automations/_templates/) do `workflows/`
