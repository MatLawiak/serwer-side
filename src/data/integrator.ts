import type { Plan } from '../components/integrator/PricingCards';

// Jedno źródło treści o Integratorze dla strony głównej, /integrator i /uslugi.
// Język ma być zrozumiały dla właściciela agencji, który nie jest techniczny:
// korzyść zamiast parametru. Opis musi przy tym odpowiadać temu, co aplikacja
// robi dziś, bo /integrator jest stroną główną aplikacji w weryfikacji Google.

export type Feature = { tag: string; title: string; text: string };

export const PANEL_URL = 'https://integrator.serwer-side.pl';
export const TRIAL_URL = '/kontakt?usluga=integrator';

export const features: Feature[] = [
  {
    tag: 'Jeden panel',
    title: 'Meta Ads i Google Ads obok siebie',
    text: 'Wydatki, wyniki i reklamy z obu platform w jednym miejscu. Koniec z przeklikiwaniem się między dwoma Menedżerami reklam.',
  },
  {
    tag: 'Codziennie',
    title: 'Raport na e-mail albo Slacka',
    text: 'Rano dostajesz krótkie podsumowanie każdego klienta: co działa, co wymaga uwagi i co warto zrobić dziś. Włączasz jednym przełącznikiem.',
  },
  {
    tag: 'Rekomendacje',
    title: 'Proste podpowiedzi, co zmienić',
    text: 'Integrator porównuje kampanie i reklamy ze sobą i mówi zwykłym językiem, które warto wspierać, a które przepalają budżet.',
  },
  {
    tag: 'AI',
    title: 'Rozmowa z AI o kampaniach',
    text: 'Podpinasz narzędzie AI, z którego korzystasz, i pytasz o wyniki tak, jak pytałbyś współpracownika. Dziś działa z Claude, ChatGPT dołączy wkrótce.',
  },
  {
    tag: 'Reklamy',
    title: 'Galeria reklam z wynikami',
    text: 'Widzisz grafiki i teksty swoich reklam razem z tym, ile kosztowały i co przyniosły. Od razu wiadomo, która reklama ciągnie kampanię.',
  },
  {
    tag: 'Bezpieczeństwo',
    title: 'Dane każdego klienta osobno',
    text: 'Dane są szyfrowane i przechowywane w Unii Europejskiej. Jedna agencja nigdy nie zobaczy danych drugiej.',
  },
];

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '49 zł',
    unit: 'netto / miesiąc',
    lead: 'Na start: kilku klientów albo własne kampanie.',
    features: [
      'do 5 klientów (kont reklamowych)',
      'Meta Ads i Google Ads w jednym panelu',
      'codzienny raport na e-mail i Slacka',
      'podpowiedzi, co zmienić w kampaniach',
      'podłączenie narzędzia AI',
    ],
    cta: 'Wypróbuj 7 dni',
    href: `${TRIAL_URL}&plan=starter`,
  },
  {
    id: 'agencja',
    name: 'Agencja',
    price: '150 zł',
    unit: 'netto / miesiąc',
    lead: 'Dla agencji, która prowadzi kampanie wielu klientów.',
    features: ['do 15 klientów (kont reklamowych)', 'wszystko ze Startera'],
    cta: 'Wypróbuj 7 dni',
    href: `${TRIAL_URL}&plan=agencja`,
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '200 zł',
    unit: 'netto / miesiąc',
    lead: 'Bez limitu, dla dużych agencji.',
    features: [
      'bez limitu klientów',
      'wszystko z planu Agencja',
      'osobny dostęp AI dla każdego klienta',
    ],
    cta: 'Wypróbuj 7 dni',
    href: `${TRIAL_URL}&plan=enterprise`,
  },
];
