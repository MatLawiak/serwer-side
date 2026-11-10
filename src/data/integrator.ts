// Jedno źródło treści o Integratorze dla strony głównej i /integrator.
// Język ma być zrozumiały dla właściciela agencji, który nie jest techniczny:
// korzyść zamiast parametru. Opis musi przy tym odpowiadać temu, co aplikacja
// robi dziś, bo /integrator jest stroną główną aplikacji w weryfikacji Google.
// Stąd dopiski przy funkcjach, które jeszcze nie działają dla klientów.

export const PANEL_URL = 'https://integrator.serwer-side.pl';
export const TRIAL_URL = '/kontakt?usluga=integrator';

// Dokąd prowadzi „Wypróbuj 7 dni za darmo” (hero, cennik, CTA). Rejestracja
// jest w panelu, zakładka „Załóż konto”. Panel pokazuje ją tylko przy
// SIGNUP_ENABLED=true; od 2026-11-10 flaga jest wyłączona do czasu
// produkcyjnych kluczy Stripe i P24, więc gość widzi na razie samo logowanie.
// Panel nie ma adresu otwierającego od razu zakładkę rejestracji.
export const SIGNUP_URL = PANEL_URL;

// Film w oknie „Sprawdź, jak to wygląda” (YouTube: watch?v=, youtu.be/,
// shorts/). Pusty = okno pokazuje informację, że film jest w przygotowaniu.
export const DEMO_VIDEO_URL = '';
export const PREMIUM_URL = '/uslugi/infrastruktura-premium/';
// Widoczna nazwa oferty pod PREMIUM_URL (adres bez zmian). VPS to sposób
// realizacji usługi, nie osobny produkt.
export const SERVER_SIDE_LABEL = 'Rozwiązania server-side';

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
    href: SIGNUP_URL,
  },
  {
    id: 'agencja',
    name: 'Agencja / Pro',
    price: '99 zł',
    unit: 'netto / miesiąc',
    lead: 'Odkryj, które kreacje przynoszą zakwalifikowanego leada.',
    cta: 'Wypróbuj 7 dni',
    href: SIGNUP_URL,
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
    href: SIGNUP_URL,
  },
  {
    id: 'custom',
    name: 'Custom / Rozwiązania server-side',
    price: 'Wycena',
    unit: 'indywidualna',
    lead: 'Własne środowisko danych: pomiar, integracje i automatyzacje.',
    cta: 'Dowiedz się więcej',
    href: PREMIUM_URL,
  },
];

// Zapis z AI działa na produkcji od 23.10.2026 (App Review Meta i weryfikacja
// Google przeszły); nowa kampania powstaje wstrzymana, włącza ją człowiek.
const SZKIC = 'nowa kampania czeka wstrzymana, włączasz ją Ty';
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
  { text: 'Edycja i tworzenie kampanii przez AI', note: SZKIC, values: [true, true, true, true] },
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

// Klauzula VAT pod cennikiem, ta sama co w Regulaminie (§ 5 ust. 6) i w panelu
// (`core/billing/plans.VAT_NOTE` w integratorze). Ceny są netto, a sprzedawca
// jest zwolniony z VAT, więc dziś cena netto jest kwotą do zapłaty.
export const VAT_NOTE =
  'Ceny netto (sprzedawca zwolniony z VAT na podstawie art. 113 ust. 1 ustawy o VAT). W przypadku powstania obowiązku podatkowego do ceny zostanie doliczony podatek VAT w obowiązującej stawce. Plan opłacany kartą odnawia się co miesiąc; odnowienie wyłączysz w panelu jednym kliknięciem.';

// Jeden klient w rozumieniu limitu planu. Zdanie stoi pod tabelą na obu stronach.
export const CLIENT_DEFINITION =
  'Jeden klient to jedno konto Meta Ads albo wybrany zestaw kampanii, jego konto Google Ads i jego CRM. W planie Scale obowiązuje zasada uczciwego korzystania.';
