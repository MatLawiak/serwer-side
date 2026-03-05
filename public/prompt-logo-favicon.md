PROMPT DO CLAUDE CODE — WDROŻENIE LOGO I FAVICON
==================================================

Wgraj poniższe pliki do projektu i skonfiguruj je jako logo i favicon strony.

## 1. Skopiuj pliki do projektu

Skopiuj te pliki do katalogu `public/`:
- logo-server-side.png → public/logo.png (logo w headerze, 120px wysokości, transparentne tło)
- favicon.ico → public/favicon.ico
- favicon-32x32.png → public/favicon-32x32.png
- favicon-16x16.png → public/favicon-16x16.png  
- apple-touch-icon.png → public/apple-touch-icon.png
- og-image.png → public/og-image.png (Open Graph — podgląd linku na LinkedIn/FB/Slack)
- logo-512.png → public/logo-512.png (duże logo do strony "O mnie" i materiałów)

## 2. Zaktualizuj Layout.astro — sekcja <head>

Dodaj/zastąp tagi favicon i OG w <head>:

```html
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
<link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:image" content="https://server-side.pl/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://server-side.pl/og-image.png">
```

## 3. Zaktualizuj Header/nawigację — logo

W komponencie nagłówka (Header.astro lub Nav.astro) zamień tekst/placeholder logo na:

```html
<a href="/" class="flex items-center gap-2">
  <img src="/logo.png" alt="server-side.pl" class="h-10 w-auto" />
  <span class="font-bold text-lg text-slate-900">server-side.pl</span>
</a>
```

Logo (obrazek robota) po lewej + tekst "server-side.pl" obok. Na mobile tekst może być ukryty (hidden md:inline).

## 4. Footer — mniejsze logo

W footerze dodaj mniejszą wersję:

```html
<a href="/" class="flex items-center gap-2">
  <img src="/logo.png" alt="server-side.pl" class="h-8 w-auto opacity-80" />
  <span class="text-sm text-slate-400">server-side.pl</span>
</a>
```

Po dodaniu uruchom `npm run dev` i sprawdź:
- [ ] Favicon widoczny w zakładce przeglądarki
- [ ] Logo w headerze na każdej stronie
- [ ] Logo w footerze
- [ ] OG image — wklej URL strony w https://www.opengraph.xyz/ i sprawdź podgląd
