import React from 'react';
import { Package, Sparkles, Check, ShoppingBag } from 'lucide-react';
import { STUDIO_BUNDLES, CURRENCIES } from '../data/products';

export default function StudioBundleSection({ currency, onAddBundleToCart }) {
  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <section className="py-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">
              <Package className="w-4 h-4" />
              <span>Gear Bundles & Savings</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-100 font-heading">
              Complete Your Setup – Save Big
            </h2>
          </div>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STUDIO_BUNDLES.map((bundle) => {
            const convertedPrice = (bundle.bundlePrice * curr.rate).toFixed(2);
            const convertedOriginal = (bundle.originalTotal * curr.rate).toFixed(2);
            const convertedSavings = (bundle.savings * curr.rate).toFixed(2);

            return (
              <div
                key={bundle.id}
                className="glass-panel p-6 border-purple-500/30 hover:border-purple-500/60 relative overflow-hidden flex flex-col justify-between space-y-4"
              >
                {/* Savings Pill */}
                <div className="absolute top-4 right-4">
                  <span className="badge badge-deal font-bold text-xs">
                    SAVE {curr.symbol}{convertedSavings}
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Curated Studio Rig</span>
                  <h3 className="text-xl font-extrabold text-white font-heading">{bundle.title}</h3>
                  <p className="text-xs text-slate-300">{bundle.tagline}</p>

                  {/* Included Items list */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-1.5 text-xs text-slate-300">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Items Included:</span>
                    {bundle.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-pink-400">{curr.symbol}{convertedPrice}</span>
                      <span className="text-xs line-through text-slate-500">{curr.symbol}{convertedOriginal}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onAddBundleToCart(bundle)}
                    className="btn-primary text-xs py-2.5 px-5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy Bundle</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
