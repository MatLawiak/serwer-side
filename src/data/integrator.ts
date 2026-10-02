import type { Plan } from '../components/integrator/PricingCards';

// Jedno źródło treści o Integratorze dla strony głównej i /integrator.
// Język ma być zrozumiały dla właściciela agencji, który nie jest techniczny:
// korzyść zamiast parametru. Opis musi przy tym odpowiadać temu, co aplikacja
// robi dziś, bo /integrator jest stroną główną aplikacji w weryfikacji Google.
// Stąd dopiski przy funkcjach, które jeszcze nie działają dla klientów.

export const PANEL_URL = 'https://integrator.serwer-side.pl';
export const TRIAL_URL = '/kontakt?usluga=integrator';
export const PREMIUM_URL = '/uslugi/infrastruktura-premium/';

const PO_ZATWIERDZENIU = 'po zatwierdzeniu przez Meta i Google';
const W_PRZYGOTOWANIU = 'w przygotowaniu';

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '49 zł',
    unit: 'netto / miesiąc',
    lead: 'Dla jednej firmy albo własnych kampanii.',
    features: [
      '1 konto (jedna przestrzeń robocza)',
      'Meta Ads i Google Ads w jednym panelu',
      { text: 'rozmowa z AI o kampaniach: Claude', note: 'ChatGPT wkrótce' },
      'codzienny raport na e-mail i Slacka',
      'podpowiedzi, co zmienić w kampaniach',
      { text: 'edycja i tworzenie kampanii przez AI', note: PO_ZATWIERDZENIU },
    ],
    cta: 'Wypróbuj 7 dni',
    href: `${TRIAL_URL}&plan=starter`,
  },
  {
    id: 'agencja',
    name: 'Agencja / Pro',
    price: '99 zł',
    unit: 'netto / miesiąc',
    lead: 'Odkryj, które kreacje przynoszą zakwalifikowanego leada.',
    features: [
      'do 10 klientów',
      'wszystko ze Startera',
      'ocena leadów z CRM albo arkusza przy każdej reklamie',
      'oceny leadów z formularzy wracają do Meta (Conversions API)',
      { text: 'przesyłanie nowych leadów do CRM', note: W_PRZYGOTOWANIU },
      { text: 'panel kontroli ustawień kont (Health Check)', note: W_PRZYGOTOWANIU },
    ],
    cta: 'Wypróbuj 7 dni',
    href: `${TRIAL_URL}&plan=agencja`,
    featured: true,
    badge: 'Najczęściej wybierany',
  },
  {
    id: 'scale',
    name: 'Scale / No Limit',
    price: '199 zł',
    unit: 'netto / miesiąc',
    lead: 'Dla agencji z dużą liczbą klientów.',
    features: [
      'do 50 klientów (zasada uczciwego korzystania)',
      'wszystko z planu Agencja / Pro',
      'osobny dostęp AI dla każdego klienta',
      { text: 'priorytetowe odświeżanie danych', note: W_PRZYGOTOWANIU },
    ],
    cta: 'Wypróbuj 7 dni',
    href: `${TRIAL_URL}&plan=scale`,
  },
  {
    id: 'custom',
    name: 'Custom / VPS Premium',
    price: 'Wycena',
    unit: 'indywidualna',
    lead: 'Własny serwer, pomiar i automatyzacje szyte na miarę.',
    features: [
      'Twój własny serwer w UE',
      'pomiar konwersji po stronie serwera',
      'automatyzacje n8n na Twoim serwerze',
      'Integrator ustawiony pod Twoje konta i CRM',
      'dla budżetów reklamowych od 10 000 zł miesięcznie',
    ],
    cta: 'Zapytaj o wycenę',
    href: PREMIUM_URL,
    dark: true,
  },
];

// Jeden klient w rozumieniu limitu planu. Zdanie stoi pod tabelą na obu stronach.
export const CLIENT_DEFINITION =
  'Jeden klient to jedno konto Meta Ads albo wybrany zestaw kampanii, jego konto Google Ads i jego CRM.';
