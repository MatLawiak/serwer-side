import { BorderTrail } from '../motion/border-trail';

// `note` to dopisek o stanie funkcji („w przygotowaniu”), żeby cennik nie
// obiecywał czegoś, czego klient nie dostanie w dniu zakupu.
export type Feature = string | { text: string; note: string };

export type Plan = {
  id: string;
  name: string;
  price: string;
  unit: string;
  lead: string;
  features: Feature[];
  cta: string;
  href: string;
  featured?: boolean;
  badge?: string;
  dark?: boolean;
};

// Cztery plany obok siebie; wyróżniony dostaje światło biegnące po obramowaniu
// (jedyny ruchomy efekt na stronie, żeby nie konkurował z resztą). Ciemna
// karta to oferta indywidualna: inny kolor mówi, że to nie kolejny abonament.
export default function PricingCards({ plans }: { plans: Plan[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
      {plans.map((p) => {
        const karta = p.dark
          ? 'bg-primary text-white card-brutal-static'
          : p.featured
            ? 'bg-white card-brutal-accent lg:-translate-y-2'
            : 'bg-white card-brutal-static';
        const przycisk = p.featured
          ? 'bg-accent hover:bg-accent-dark text-white btn-brutal'
          : p.dark
            ? 'bg-accent hover:bg-accent-dark text-white btn-brutal-light'
            : 'bg-white hover:bg-stone-50 text-primary btn-brutal';
        return (
          <div key={p.id} className={`relative rounded-xl p-6 flex flex-col ${karta}`}>
            {p.featured && (
              <>
                <BorderTrail size={90} className="bg-gradient-to-l from-accent via-accent/60 to-transparent" />
                {p.badge && (
                  <span className="absolute -top-3 left-6 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                    {p.badge}
                  </span>
                )}
              </>
            )}
            <h3 className={`text-lg font-bold ${p.dark ? 'text-white' : 'text-primary'}`}>{p.name}</h3>
            <p className={`text-sm mt-1 mb-5 min-h-[3.75rem] ${p.dark ? 'text-gray-300' : 'text-gray-500'}`}>{p.lead}</p>
            <p className={`text-3xl font-extrabold ${p.dark ? 'text-accent' : 'text-primary'}`}>{p.price}</p>
            <p className={`text-sm mb-6 ${p.dark ? 'text-gray-400' : 'text-gray-500'}`}>{p.unit}</p>
            <ul className={`space-y-2.5 text-sm mb-8 flex-grow ${p.dark ? 'text-gray-200' : 'text-gray-700'}`}>
              {p.features.map((f) => {
                const text = typeof f === 'string' ? f : f.text;
                const note = typeof f === 'string' ? null : f.note;
                return (
                  <li key={text} className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-0.5" aria-hidden="true">✓</span>
                    <span>
                      {text}
                      {note && (
                        <span className="block mt-1 w-fit text-[11px] leading-tight px-2 py-0.5 rounded-full border border-amber-500/40 text-amber-700 bg-amber-50">
                          {note}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
            <a
              href={p.href}
              className={`relative z-10 text-center font-semibold px-5 py-3 rounded-lg transition-colors ${przycisk}`}
            >
              {p.cta}
            </a>
          </div>
        );
      })}
    </div>
  );
}
