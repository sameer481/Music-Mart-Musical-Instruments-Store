import React from 'react';
import './FashionLookbookSection.css';
import { Sparkles, ShoppingBag, Check, Zap } from 'lucide-react';
import { STUDIO_BUNDLES, CURRENCIES } from '../data/products';

export default function FashionLookbookSection({ currency, onAddBundleToCart }) {
  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800 relative">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Editorial Lookbook & Rig Bundles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-heading">
              Shop The Look — Curated Gear Outfits
            </h2>
          </div>
        </div>

        {/* Lookbook Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STUDIO_BUNDLES.map((bundle) => {
            const convertedPrice = (bundle.bundlePrice * curr.rate).toFixed(2);
            const convertedOriginal = (bundle.originalTotal * curr.rate).toFixed(2);
            const convertedSavings = (bundle.savings * curr.rate).toFixed(2);

            return (
              <div
                key={bundle.id}
                className="glass-panel group relative overflow-hidden rounded-3xl border-purple-500/20 hover:border-pink-500/50 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Top Image Banner */}
                <div className="relative h-64 overflow-hidden bg-slate-950">
                  <img
                    src={bundle.image}
                    alt={bundle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                  <div className="absolute top-4 right-4">
                    <span className="badge badge-deal font-extrabold text-xs shadow-xl">
                      ⚡ SAVE {curr.symbol}{convertedSavings}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Complete Studio Outfit</span>
                    <h3 className="text-2xl font-extrabold text-white font-heading">{bundle.title}</h3>
                  </div>
                </div>

                {/* Bottom Bundle Details */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-300">{bundle.tagline}</p>

                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">What's in this Outfit:</span>
                    {bundle.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-200">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Add to Bag CTA */}
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-pink-400">{curr.symbol}{convertedPrice}</span>
                        <span className="text-xs line-through text-slate-500">{curr.symbol}{convertedOriginal}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddBundleToCart(bundle)}
                      className="btn-primary text-xs py-3 px-6 shadow-xl"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Shop Complete Outfit</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
