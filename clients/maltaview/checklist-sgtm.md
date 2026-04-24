# Checklist — sGTM maltaview.pl

## Przed startem — zbierz dane
- [ ] Facebook Pixel ID klienta
- [ ] Facebook Access Token
      Gdzie: Meta Business → Events Manager → Pixel → Settings → Conversions API → Generate access token

---

## Krok 1: Web GTM (GTM-NWHV84GX)
- [ ] Otwórz tag: [GA4] Przesłanie formularza kontaktowego
- [ ] Dodaj w sekcji "Pola do ustawienia":
      Nazwa pola: transport_url
      Wartość:    https://dane.maltaview.pl
- [ ] Zapisz (nie publikuj jeszcze)

---

## Krok 2: Server GTM (GTM-P7H9R78S)

### Clients
- [ ] Sprawdź czy istnieje klient GA4 (powinien być domyślnie)

### Trigger
- [ ] Nowy trigger → Custom Event → nazwa: wyslanie_formularza

### Tag 1 — GA4 forward
- [ ] Nowy tag → Google Analytics: GA4
- [ ] Measurement ID: G-G4J4S4MVCX
- [ ] Trigger: wyslanie_formularza

### Tag 2 — Meta CAPI
- [ ] Szablony → Search Gallery → "Facebook Conversions API"
- [ ] Pixel ID: [od klienta]
- [ ] Access Token: [od klienta]
- [ ] Event name: Lead
- [ ] Trigger: wyslanie_formularza

---

## Krok 3: Testowanie (przed publikacją)
- [ ] GTM Preview (web) → wejdź na /wiadomosc-wyslana → sprawdź czy tag GA4 formularza odpalił
- [ ] GTM Preview (server) → sprawdź czy event wyslanie_formularza dotarł
- [ ] Meta Events Manager → Test Events → sprawdź czy Lead dotarł

---

## Krok 4: Publikacja
- [ ] Opublikuj server GTM
- [ ] Opublikuj web GTM
- [ ] Wyślij testowy formularz na maltaview.pl
- [ ] Potwierdź konwersję w GA4 (DebugView)
- [ ] Potwierdź konwersję w Meta Events Manager
