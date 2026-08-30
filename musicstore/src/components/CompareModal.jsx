import React from 'react';
import { X, SlidersHorizontal, ShoppingCart, Volume2, Trash2 } from 'lucide-react';
import { CURRENCIES } from '../data/products';
import { playInstrumentPreview } from '../utils/audioSynth';

export default function CompareModal({
  isOpen,
  onClose,
  compareProducts,
  onRemoveFromCompare,
  onAddToCart,
  currency
}) {
  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <div className="overlay">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white font-heading">Product Specification Comparison</h2>
              <p className="text-xs text-slate-400">Comparing {compareProducts.length} instruments side-by-side</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X className="w-5 h-5" />
          </button>
        </div>

        {compareProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="p-3 text-slate-400 uppercase text-[10px] font-bold w-40">Feature</th>
                  {compareProducts.map((p) => (
                    <th key={p.id} className="p-3 min-w-[200px]">
                      <div className="space-y-2 relative">
                        <button
                          onClick={() => onRemoveFromCompare(p.id)}
                          className="absolute top-0 right-0 text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <img src={p.image} alt={p.name} className="w-24 h-24 object-cover rounded-xl border border-slate-800" />
                        <h4 className="font-bold text-sm text-slate-100 line-clamp-1">{p.name}</h4>
                        <p className="text-pink-400 font-extrabold text-sm">{curr.symbol}{(p.price * curr.rate).toFixed(2)}</p>
                        <div className="flex gap-2 pt-1">
                          <button onClick={() => onAddToCart(p)} className="btn-primary text-[10px] py-1 px-3 flex-1">
                            <ShoppingCart className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                          <button
                            onClick={() => playInstrumentPreview(p.audioType, p.audioFreq)}
                            className="btn-secondary text-[10px] py-1 px-2 text-cyan-300"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="p-3 font-bold text-slate-400">Brand</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 text-slate-200 font-semibold">{p.brand}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-400">Category</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 text-slate-200 capitalize font-semibold">{p.category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-400">Rating</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 text-yellow-400 font-bold">★ {p.rating} ({p.reviewsCount})</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-400">Stock Availability</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 text-emerald-400 font-medium">{p.stock} Units</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-400">Key Specs</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 text-slate-300 text-[11px] leading-relaxed">
                      {p.specs ? (
                        <ul className="space-y-1">
                          {Object.entries(p.specs).slice(0, 4).map(([k, v]) => (
                            <li key={k}>
                              <strong className="text-slate-400">{k}:</strong> {v}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        'Standard'
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 space-y-2">
            <SlidersHorizontal className="w-12 h-12 mx-auto text-slate-700" />
            <p className="text-sm font-semibold">No instruments selected for comparison.</p>
            <p className="text-xs text-slate-600">Click the sliders icon on product cards to add them to this table.</p>
          </div>
        )}

      </div>
    </div>
  );
}
