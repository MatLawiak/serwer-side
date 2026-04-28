import { useState } from 'react';

function formatPLN(value: number): string {
  return value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

type SaaS = {
  key: string;
  name: string;
  cost: number;
  enabled: boolean;
};

const initialSaas: SaaS[] = [
  { key: 'pys', name: 'PixelYourSite Pro (tracking)', cost: 1100, enabled: true },
  { key: 'klaviyo', name: 'Klaviyo (newsletter / cart abandonment)', cost: 2640, enabled: true },
  { key: 'cookiebot', name: 'Cookiebot lub CookieYes (consent)', cost: 600, enabled: true },
  { key: 'n8n', name: 'n8n cloud (automatyzacje)', cost: 960, enabled: false },
  { key: 'mailchimp', name: 'Mailchimp (newsletter alt.)', cost: 1320, enabled: false },
  { key: 'looker', name: 'Looker Studio Pro / dashboard SaaS', cost: 720, enabled: false },
];

const VPS_VARIANT_2_ONETIME = 500;
const VPS_VARIANT_2_MONTHLY = 45;

export default function TCOCalculator() {
  const [saas, setSaas] = useState<SaaS[]>(initialSaas);
  const [years, setYears] = useState(3);

  const toggleSaas = (key: string) => {
    setSaas(prev => prev.map(s => s.key === key ? { ...s, enabled: !s.enabled } : s));
  };

  const yearlyCost = saas.filter(s => s.enabled).reduce((sum, s) => sum + s.cost, 0);
  const totalSaaSCost = yearlyCost * years;

  const vpsCost = VPS_VARIANT_2_ONETIME + (VPS_VARIANT_2_MONTHLY * 12 * years);
  const savings = totalSaaSCost - vpsCost;
  const savingsPct = totalSaaSCost > 0 ? Math.round((savings / totalSaaSCost) * 100) : 0;

  return (
    <section className="py-16 md:py-20 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-4">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">Kalkulator TCO</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Ile naprawdę płacisz za swój stack SaaS?
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Zaznacz narzędzia których używasz. Pokażę ile zaoszczędzisz w {years} {years === 1 ? 'rok' : 'lata'} przechodząc na własny VPS.
        </p>

        <div className="bg-white rounded-2xl border-2 border-primary/15 p-6 md:p-8" style={{boxShadow: '4px 4px 0px rgba(15,23,42,0.12)'}}>
          {/* Lista SaaS */}
          <div className="mb-8">
            <h3 className="font-bold text-primary mb-4">Twoje aktualne abonamenty roczne:</h3>
            <div className="space-y-2">
              {saas.map((s) => (
                <label
                  key={s.key}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    s.enabled ? 'bg-red-50/40 border-red-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={s.enabled}
                    onChange={() => toggleSaas(s.key)}
                    className="w-5 h-5 accent-cyan-600"
                  />
                  <div className="flex-1 flex justify-between items-center">
                    <span className={`text-sm ${s.enabled ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
                      {s.name}
                    </span>
                    <span className={`font-bold ${s.enabled ? 'text-red-600' : 'text-gray-400'}`}>
                      {formatPLN(s.cost)}/rok
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Slider lat */}
          <div className="mb-8">
            <div className="flex justify-between items-baseline mb-2">
              <label htmlFor="years" className="text-sm font-medium text-gray-700">
                Okres porównania
              </label>
              <span className="text-lg font-bold text-primary">{years} {years === 1 ? 'rok' : years < 5 ? 'lata' : 'lat'}</span>
            </div>
            <input
              type="range"
              id="years"
              min={1}
              max={5}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 rok</span>
              <span>5 lat</span>
            </div>
          </div>

          {/* Wyniki */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-red-50 rounded-xl p-5 border-2 border-red-200" style={{boxShadow: '3px 3px 0px rgba(220,38,38,0.1)'}}>
              <p className="text-xs text-red-700 uppercase tracking-wider mb-1 font-semibold">Twój stack SaaS w {years} {years === 1 ? 'rok' : 'lata'}</p>
              <p className="text-3xl font-extrabold text-red-700">{formatPLN(totalSaaSCost)}</p>
              <p className="text-xs text-red-600 mt-1">{formatPLN(yearlyCost)} / rok</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-5 border-2 border-emerald-200" style={{boxShadow: '3px 3px 0px rgba(16,185,129,0.12)'}}>
              <p className="text-xs text-emerald-700 uppercase tracking-wider mb-1 font-semibold">Meta Power VPS Wariant 2</p>
              <p className="text-3xl font-extrabold text-emerald-700">{formatPLN(vpsCost)}</p>
              <p className="text-xs text-emerald-600 mt-1">500 zł jednorazowo + 45 zł/mc</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-accent to-accent-dark rounded-xl p-6 text-white text-center" style={{boxShadow: '4px 4px 0px rgba(15,23,42,0.15)'}}>
            <p className="text-sm opacity-90 mb-1">Twoja oszczędność w {years} {years === 1 ? 'rok' : 'lata'}</p>
            <p className="text-4xl md:text-5xl font-extrabold">
              {savings > 0 ? formatPLN(savings) : formatPLN(0)}
            </p>
            {savings > 0 && (
              <p className="text-sm opacity-90 mt-2">
                {savingsPct}% mniej niż obecny stack SaaS
              </p>
            )}
            {savings <= 0 && (
              <p className="text-sm opacity-90 mt-2">
                Z tym stackiem SaaS lepiej zostań przy obecnym rozwiązaniu. VPS opłaca się od ok. 1500 zł/y w SaaS.
              </p>
            )}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4 text-sm">Te liczby pasują do Twojego biznesu?</p>
            <a
              href="/kontakt"
              className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-all border-2 border-primary/15 hover:translate-x-[2px] hover:translate-y-[2px]"
              style={{boxShadow: '3px 3px 0px rgba(15,23,42,0.15)'}}
            >
              Umów demo Meta Power VPS →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
