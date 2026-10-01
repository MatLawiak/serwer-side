import { BorderTrail } from '../motion/border-trail';

export type Plan = {
  id: string;
  name: string;
  price: string;
  unit: string;
  lead: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
};

// Trzy plany obok siebie; wyróżniony dostaje światło biegnące po obramowaniu
// (jedyny ruchomy efekt na stronie, żeby nie konkurował z resztą).
export default function PricingCards({ plans }: { plans: Plan[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 items-stretch">
      {plans.map((p) => (
        <div
          key={p.id}
          className={`relative bg-white rounded-xl p-7 flex flex-col ${
            p.featured ? 'card-brutal-accent md:-translate-y-2' : 'card-brutal-static'
          }`}
        >
          {p.featured && (
            <>
              <BorderTrail size={90} className="bg-gradient-to-l from-accent via-accent/60 to-transparent" />
              <span className="absolute -top-3 left-6 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                Dla agencji
              </span>
            </>
          )}
          <h3 className="text-xl font-bold text-primary">{p.name}</h3>
          <p className="text-sm text-gray-500 mt-1 mb-5 min-h-[2.5rem]">{p.lead}</p>
          <p className="text-3xl font-extrabold text-primary">{p.price}</p>
          <p className="text-sm text-gray-500 mb-6">{p.unit}</p>
          <ul className="space-y-2.5 text-sm text-gray-700 mb-8 flex-grow">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="text-accent font-bold mt-0.5" aria-hidden="true">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <a
            href={p.href}
            className={`relative z-10 text-center font-semibold px-5 py-3 rounded-lg transition-colors ${
              p.featured
                ? 'bg-accent hover:bg-accent-dark text-white btn-brutal'
                : 'bg-white hover:bg-stone-50 text-primary btn-brutal'
            }`}
          >
            {p.cta}
          </a>
        </div>
      ))}
    </div>
  );
}
