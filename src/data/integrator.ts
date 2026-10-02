// Jedno źródło treści o Integratorze dla strony głównej i /integrator.
// Język ma być zrozumiały dla właściciela agencji, który nie jest techniczny:
// korzyść zamiast parametru. Opis musi przy tym odpowiadać temu, co aplikacja
// robi dziś, bo /integrator jest stroną główną aplikacji w weryfikacji Google.
// Stąd dopiski przy funkcjach, które jeszcze nie działają dla klientów.

export const PANEL_URL = 'https://integrator.serwer-side.pl';
export const TRIAL_URL = '/kontakt?usluga=integrator';
export const PREMIUM_URL = '/uslugi/infrastruktura-premium/';

export type Plan = {
  id: string;
  name: string;
  price: string;
  unit: string;
  lead: string;
  cta: string;
  href: string;
  featured?: boolean;
  badge?: string;
};

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '49 zł',
    unit: 'netto / miesiąc',
    lead: 'Dla jednej firmy albo własnych kampanii.',
    cta: 'Wypróbuj 7 dni',
    href: `${TRIAL_URL}&plan=starter`,
  },
  {
    id: 'agencja',
    name: 'Agencja / Pro',
    price: '99 zł',
    unit: 'netto / miesiąc',
    lead: 'Odkryj, które kreacje przynoszą zakwalifikowanego leada.',
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
    cta: 'Wypróbuj 7 dni',
    href: `${TRIAL_URL}&plan=scale`,
  },
  {
    id: 'custom',
    name: 'Custom / VPS Premium',
    price: 'Wycena',
    unit: 'indywidualna',
    lead: 'Własny serwer, pomiar i automatyzacje szyte na miarę.',
    cta: 'Dowiedz się więcej',
    href: PREMIUM_URL,
  },
];

const PO_ZATWIERDZENIU = 'po zatwierdzeniu przez Meta i Google';
const W_PRZYGOTOWANIU = 'w przygotowaniu';

// Wiersz tabeli cennika. `values` idzie w kolejności `plans`: true = jest,
// false = nie ma, tekst = wartość (np. limit klientów). Każda funkcja jest
// wypisana przy każdym planie, żeby nie trzeba było zgadywać, czy wyższy
// plan zawiera to, co niższy. `note` to dopisek o stanie funkcji.
export type FeatureRow = {
  text: string;
  note?: string;
  values: (boolean | string)[];
};

export const featureRows: FeatureRow[] = [
  { text: 'Liczba klientów', values: ['1', 'do 10', 'do 50', 'według ustaleń'] },
  { text: 'Meta Ads i Google Ads w jednym panelu', values: [true, true, true, true] },
  { text: 'Codzienny raport na e-mail i Slacka', values: [true, true, true, true] },
  { text: 'Podpowiedzi, co zmienić w kampaniach', values: [true, true, true, true] },
  { text: 'Rozmowa z AI o kampaniach (Claude)', note: 'ChatGPT wkrótce', values: [true, true, true, true] },
  { text: 'Edycja i tworzenie kampanii przez AI', note: PO_ZATWIERDZENIU, values: [true, true, true, true] },
  { text: 'Ocena leadów z CRM albo arkusza przy każdej reklamie', values: [false, true, true, true] },
  { text: 'Oceny leadów z formularzy wracają do Meta (Conversions API)', values: [false, true, true, true] },
  { text: 'Przesyłanie nowych leadów do CRM', note: W_PRZYGOTOWANIU, values: [false, true, true, true] },
  { text: 'Panel kontroli ustawień kont (Health Check)', note: W_PRZYGOTOWANIU, values: [false, true, true, true] },
  { text: 'Osobny dostęp AI dla każdego klienta', values: [false, false, true, true] },
  { text: 'Priorytetowe odświeżanie danych', note: W_PRZYGOTOWANIU, values: [false, false, true, true] },
  { text: 'Twój własny serwer w UE', values: [false, false, false, true] },
  { text: 'Pomiar konwersji po stronie serwera', values: [false, false, false, true] },
  { text: 'Automatyzacje na Twoim serwerze', values: [false, false, false, true] },
  { text: 'Dodatkowe źródła: TikTok Ads, Microsoft Ads i inne', values: [false, false, false, true] },
];

// Jeden klient w rozumieniu limitu planu. Zdanie stoi pod tabelą na obu stronach.
export const CLIENT_DEFINITION =
  'Jeden klient to jedno konto Meta Ads albo wybrany zestaw kampanii, jego konto Google Ads i jego CRM. W planie Scale obowiązuje zasada uczciwego korzystania.';
