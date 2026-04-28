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
    <section className="py-16 md:py-20 bg-[#0f172a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">Ile tracisz bez server-side tracking?</h2>
          <p className="text-gray-400">Wprowadź dane, żeby zobaczyć szacowane straty</p>
        </div>

        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 md:p-8">
          {/* Sliders */}
          <div className="space-y-8 mb-10">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="budget" className="text-sm font-medium text-gray-300">
                  Miesięczny budżet reklamowy
                </label>
                <span className="text-lg font-bold text-accent">{formatPLN(budget)}</span>
              </div>
              <input
                type="range"
                id="budget"
                min={5000}
                max={100000}
                step={5000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>5 000 zł</span>
                <span>100 000 zł</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="loss" className="text-sm font-medium text-gray-300">
                  Średni % utraty danych
                </label>
                <span className="text-lg font-bold text-accent">{lossPercent}%</span>
              </div>
              <input
                type="range"
                id="loss"
                min={15}
                max={50}
                step={1}
                value={lossPercent}
                onChange={(e) => setLossPercent(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>15%</span>
                <span>50%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="roas" className="text-sm font-medium text-gray-300">
                  Średni ROAS
                </label>
                <span className="text-lg font-bold text-accent">{roas.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                id="roas"
                min={2}
                max={10}
                step={0.5}
                value={roas}
                onChange={(e) => setRoas(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>2x</span>
                <span>10x</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-5 border border-red-500/20">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Niewidoczne konwersje / mies.</p>
              <p className="text-2xl font-bold text-red-400">{formatPLN(monthlyLoss)}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-red-500/30">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Potencjalna strata roczna</p>
              <p className="text-3xl font-extrabold text-red-400">{formatPLN(yearlyLoss)}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-emerald-500/20">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Koszt wdrożenia server-side</p>
              <p className="text-2xl font-bold text-emerald-400">od 5 000 zł</p>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-emerald-500/20">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">ROI wdrożenia</p>
              <p className="text-2xl font-bold text-emerald-400">{roi.toFixed(0)}× zwrot w skali roku</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <p className="text-gray-400 mb-4">Te liczby dotyczą Twojego biznesu?</p>
            <a
              href="/kontakt"
              className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Umów diagnozę →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
