import React from 'react';
import { X, Heart, ShoppingCart, Trash2, Volume2 } from 'lucide-react';
import { CURRENCIES } from '../data/products';
import { playInstrumentPreview } from '../utils/audioSynth';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  currency
}) {
  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <div className="overlay">
      <div className="drawer p-6 flex flex-col justify-between">
        
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
              <h2 className="font-extrabold text-lg text-slate-100 font-heading">Your Saved Wishlist</h2>
              <span className="badge font-bold">{wishlistProducts.length} Saved</span>
            </div>
            <button onClick={onClose} className="btn-icon">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 my-2">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((p) => (
              <div
                key={p.id}
                className="glass-panel p-3 flex items-center gap-3 border-slate-800/80 hover:border-slate-700"
              >
                <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-purple-400">{p.brand}</span>
                  <h4 className="font-bold text-xs text-slate-100 truncate">{p.name}</h4>
                  <p className="text-xs font-extrabold text-pink-400 mt-0.5">
                    {curr.symbol}{(p.price * curr.rate).toFixed(2)}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onAddToCart(p)}
                      className="btn-primary text-[11px] py-1 px-3"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => playInstrumentPreview(p.audioType, p.audioFreq)}
                      className="btn-icon w-7 h-7 text-cyan-400"
                      title="Play Demo"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(p.id)}
                      className="text-slate-500 hover:text-red-400 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-slate-500 space-y-3">
              <Heart className="w-12 h-12 mx-auto text-slate-700" />
              <p className="text-sm font-semibold">No saved instruments in your wishlist.</p>
            </div>
          )}
        </div>

        <button onClick={onClose} className="btn-secondary w-full py-2.5 justify-center text-xs">
          Close Wishlist
        </button>

      </div>
    </div>
  );
}
