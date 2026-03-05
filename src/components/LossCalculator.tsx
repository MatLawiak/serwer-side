import { useState } from 'react';

function formatPLN(value: number): string {
  return value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function LossCalculator() {
  const [budget, setBudget] = useState(20000);
  const [lossPercent, setLossPercent] = useState(30);
  const [roas, setRoas] = useState(4);

  const monthlyLoss = budget * roas * (lossPercent / 100);
  const yearlyLoss = monthlyLoss * 12;
  const roi = yearlyLoss / 5000;

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Ile tracisz bez server-side tracking?</h2>
          <p className="text-gray-500">Wprowadź dane, żeby zobaczyć szacowane straty</p>
        </div>

        <div className="bg-slate-50 rounded-2xl border-2 border-primary/15 p-6 md:p-8" style={{boxShadow: '4px 4px 0px rgba(15,23,42,0.12)'}}>
          {/* Sliders */}
          <div className="space-y-8 mb-10">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="budget" className="text-sm font-medium text-gray-700">
                  Miesięczny budżet reklamowy
                </label>
                <span className="text-lg font-bold text-primary">{formatPLN(budget)}</span>
              </div>
              <input
                type="range"
                id="budget"
                min={5000}
                max={100000}
                step={5000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>5 000 zł</span>
                <span>100 000 zł</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="loss" className="text-sm font-medium text-gray-700">
                  Średni % utraty danych
                </label>
                <span className="text-lg font-bold text-primary">{lossPercent}%</span>
              </div>
              <input
                type="range"
                id="loss"
                min={15}
                max={50}
                step={1}
                value={lossPercent}
                onChange={(e) => setLossPercent(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>15%</span>
                <span>50%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="roas" className="text-sm font-medium text-gray-700">
                  Średni ROAS
                </label>
                <span className="text-lg font-bold text-primary">{roas.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                id="roas"
                min={2}
                max={10}
                step={0.5}
                value={roas}
                onChange={(e) => setRoas(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>2x</span>
                <span>10x</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border-2 border-primary/10" style={{boxShadow: '3px 3px 0px rgba(15,23,42,0.08)'}}>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Niewidoczne konwersje / mies.</p>
              <p className="text-2xl font-bold text-red-600">{formatPLN(monthlyLoss)}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border-2 border-red-200" style={{boxShadow: '3px 3px 0px rgba(220,38,38,0.1)'}}>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Potencjalna strata roczna</p>
              <p className="text-3xl font-extrabold text-red-600">{formatPLN(yearlyLoss)}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border-2 border-emerald-200" style={{boxShadow: '3px 3px 0px rgba(16,185,129,0.12)'}}>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Koszt wdrożenia server-side</p>
              <p className="text-2xl font-bold text-emerald-600">od 5 000 zł</p>
            </div>
            <div className="bg-white rounded-xl p-5 border-2 border-emerald-200" style={{boxShadow: '3px 3px 0px rgba(16,185,129,0.12)'}}>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">ROI wdrożenia</p>
              <p className="text-2xl font-bold text-emerald-600">{roi.toFixed(0)}× zwrot w skali roku</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Te liczby dotyczą Twojego biznesu?</p>
            <a
              href="/kontakt"
              className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 border-2 border-primary/15 hover:translate-x-[2px] hover:translate-y-[2px]"
              style={{boxShadow: '3px 3px 0px rgba(15,23,42,0.15)'}}
            >
              Umów diagnozę →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
