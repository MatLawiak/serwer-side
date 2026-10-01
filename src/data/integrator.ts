import type { Plan } from '../components/integrator/PricingCards';

// Jedno źródło treści o Integratorze dla /integrator i /uslugi.
// Opis funkcji ma odpowiadać temu, co panel robi dziś: strona jest też
// stroną główną aplikacji w weryfikacji Google, a recenzent porównuje ją z produktem.

export type Feature = { tag: string; title: string; text: string };

export const PANEL_URL = 'https://integrator.serwer-side.pl';
export const TRIAL_URL = '/kontakt?usluga=integrator';

export const features: Feature[] = [
  {
    tag: 'Wyróżnik',
    title: 'Koszt klienta, nie kontaktu',
    text: 'Łączymy koszt każdej reklamy z oceną handlowca. CPQL pokazuje, która kreacja przynosi zakwalifikowane leady, a nie tylko najtańsze formularze.',
  },
  {
    tag: 'Źródła',
    title: 'Meta Ads i Google Ads obok siebie',
    text: 'Koszty dzienne, kampanie, kreacje z miniaturami i słowa kluczowe. Performance Max rozbity na grupy zasobów.',
  },
  {
    tag: 'Leady',
    title: 'Formularze Meta, Google i strony',
    text: 'Leady z formularzy błyskawicznych i ze strony www trafiają do panelu z przypisaniem do kampanii i konkretnej reklamy.',
  },
  {
    tag: 'Jakość',
    title: 'Ocena w arkuszu albo w CRM',
    text: 'Handlowiec ocenia leady w Google Sheets albo w CRM. Ocena wraca do panelu co 15 minut, bez przepisywania.',
  },
  {
    tag: 'Codziennie',
    title: 'Poranny skrót e-mailem i na Slacku',
    text: 'O wybranej godzinie trzy wnioski i jedna akcja dla każdego klienta. Każda liczba w skrócie jest sprawdzana z danymi.',
  },
  {
    tag: 'AI',
    title: 'Asystent AI z twardymi limitami',
    text: 'Model AI (np. Claude) czyta dane przez MCP i odpowiada na pytania o kampanie. Zmiany w kontach, czyli budżet najwyżej +20% w 24 h i wstrzymanie kampanii, włączamy po zatwierdzeniu przez Meta i Google.',
  },
  {
    tag: 'Optymalizacja',
    title: 'Oceny wracają do Meta',
    text: 'Zakwalifikowane leady trafiają z powrotem do Meta przez Conversions API, więc algorytm uczy się na wartościowych klientach.',
  },
  {
    tag: 'Bezpieczeństwo',
    title: 'Dane klientów agencji osobno',
    text: 'Tokeny i kontakty szyfrowane kluczami w Google Cloud KMS, dane każdej agencji odizolowane w bazie, serwery w Unii Europejskiej.',
  },
];

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '149 zł',
    unit: 'netto / miesiąc',
    lead: 'Dla firmy, która prowadzi kampanie sama albo z jednym partnerem.',
    features: [
      'do 3 klientów (projektów)',
      'Meta Ads i Google Ads',
      'leady z formularzy i strony',
      'ocena leadów w arkuszu Google',
      'codzienny skrót e-mailem',
    ],
    cta: 'Wypróbuj 7 dni',
    href: `${TRIAL_URL}&plan=starter`,
  },
  {
    id: 'agencja',
    name: 'Agencja',
    price: '449 zł',
    unit: 'netto / miesiąc',
    lead: 'Dla agencji, która raportuje jakość leadów wielu klientom.',
    features: [
      'do 15 klientów',
      'wszystko ze Startera',
      'integracja z CRM',
      'skrót na Slacku',
      'asystent AI (MCP) z limitami zmian',
      'oceny wracają do Meta (Conversions API)',
    ],
    cta: 'Wypróbuj 7 dni',
    href: `${TRIAL_URL}&plan=agencja`,
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Wycena',
    unit: 'indywidualna',
    lead: 'Dla sieci agencji i dużych reklamodawców.',
    features: [
      'bez limitu klientów',
      'wszystko z planu Agencja',
      'integracje z Twoim CRM i hurtownią danych',
      'branding agencji w panelu (w przygotowaniu)',
      'umowa z gwarancją dostępności',
    ],
    cta: 'Umów rozmowę',
    href: `${TRIAL_URL}&plan=enterprise`,
  },
];
