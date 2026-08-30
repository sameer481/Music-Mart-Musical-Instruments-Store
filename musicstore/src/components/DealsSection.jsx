import React, { useState, useEffect } from 'react';
import { Zap, Clock, ShoppingCart, Volume2 } from 'lucide-react';
import { CURRENCIES } from '../data/products';
import { playInstrumentPreview } from '../utils/audioSynth';

export default function DealsSection({ dealProducts, currency, onAddToCart, onQuickView }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 42 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  if (!dealProducts || dealProducts.length === 0) return null;

  return (
    <section className="py-8 bg-white border-y border-gray-200 my-4 shadow-sm">
      <div className="container mx-auto px-4">
        
        {/* Flipkart Deals Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded bg-[#2874f0] text-white flex items-center justify-center shrink-0 shadow">
              <Zap className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-heading">
                  Deals of the Day
                </h2>
                <span className="assured-badge">Flipkart Assured</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">Extra discounts on top rated musical instruments!</p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded">
            <Clock className="w-4 h-4 text-[#2874f0] animate-pulse" />
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Ends In:</span>
            <div className="flex items-center gap-1 font-mono text-sm font-black text-gray-900">
              <span className="bg-[#2874f0] text-white px-1.5 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span className="bg-[#2874f0] text-white px-1.5 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span className="bg-[#2874f0] text-white px-1.5 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        {/* Featured Deals Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dealProducts.map((p, idx) => {
            const activeFinish = p.finishes ? p.finishes[0] : null;
            const price = activeFinish ? activeFinish.price : p.price;
            const originalPrice = activeFinish ? activeFinish.originalPrice : p.originalPrice;

            const convertedPrice = (price * curr.rate).toFixed(2);
            const convertedOriginal = (originalPrice * curr.rate).toFixed(2);
            const percentClaimed = idx === 0 ? 82 : 65;
            const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

            return (
              <div
                key={p.id}
                className="glass-panel p-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-white border-gray-200 hover:border-[#2874f0] relative group rounded shadow-sm"
              >
                {/* Image */}
                <div className="sm:col-span-5 relative h-44 rounded bg-gray-50 flex items-center justify-center p-2">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  <button
                    onClick={() => playInstrumentPreview(p.audioType, p.audioFreq)}
                    className="absolute bottom-2 left-2 bg-gray-900/80 text-white text-[10px] font-bold py-0.5 px-2 rounded flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3 text-yellow-300" />
                    <span>Demo</span>
                  </button>
                </div>

                {/* Content */}
                <div className="sm:col-span-7 space-y-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{p.brand}</span>
                    <h3
                      onClick={() => onQuickView(p)}
                      className="font-bold text-sm text-gray-900 hover:text-[#2874f0] cursor-pointer transition-colors line-clamp-2"
                    >
                      {p.name}
                    </h3>
                  </div>

                  {/* Flipkart Price Box */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-gray-900 font-mono">{curr.symbol}{convertedPrice}</span>
                    <span className="text-xs line-through text-gray-400 font-mono">{curr.symbol}{convertedOriginal}</span>
                    <span className="text-xs font-bold text-[#388e3c]">{discountPercent}% off</span>
                  </div>

                  {/* Lightning Claimed Meter */}
                  <div className="space-y-1 text-[11px] font-semibold text-gray-600">
                    <div className="flex justify-between">
                      <span className="text-[#2874f0] font-bold">{percentClaimed}% claimed</span>
                      <span className="text-gray-400">Deal Progress</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                      <div className="h-full bg-[#2874f0]" style={{ width: `${percentClaimed}%` }}></div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button onClick={() => onAddToCart(p)} className="btn-flipkart-cart text-[11px] py-1.5 px-3 flex-1">
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
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
