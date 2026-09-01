import React, { useState } from 'react';
import './ProductQuickViewModal.css';
import { X, Star, Volume2, ShoppingCart, ShieldCheck, Truck, RotateCcw, Heart, Check, Zap } from 'lucide-react';
import { CURRENCIES, handleImageError } from '../data/products';
import { playInstrumentPreview } from '../utils/audioSynth';

export default function ProductQuickViewModal({
  isOpen,
  product,
  onClose,
  currency,
  onAddToCart,
  onBuyNow,
  isInWishlist,
  onToggleWishlist
}) {
  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  const activeFinish = product.finishes ? product.finishes[selectedFinishIndex] : null;
  const currentPrice = activeFinish ? activeFinish.price : (product.priceUSD || product.price || 0);
  const currentOriginal = activeFinish ? activeFinish.originalPrice : (product.originalPriceUSD || product.originalPrice || currentPrice * 1.1);
  const currentImage = activeFinish ? activeFinish.image : product.image;
  const currentStock = activeFinish ? activeFinish.stock : (product.stock || 10);

  const convertedPrice = (currentPrice * curr.rate * quantity).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const convertedOriginal = (currentOriginal * curr.rate * quantity).toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 btn-icon bg-slate-950/80 border-slate-700 hover:border-cyan-400 hover:text-cyan-300"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Gallery */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              <img
                src={currentImage}
                alt={product.name}
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => playInstrumentPreview(product.audioType, product.audioFreq)}
                className="absolute bottom-3 left-3 bg-slate-950/90 text-amber-300 text-xs font-bold py-2 px-4 rounded-full backdrop-blur-md border border-slate-700 flex items-center gap-2 shadow-xl"
              >
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Play Sound Sampler</span>
              </button>
            </div>

            {/* Finish Variants Thumbnails */}
            {product.finishes && product.finishes.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Select Color Finish & Price:</span>
                <div className="grid grid-cols-3 gap-2">
                  {product.finishes.map((finish, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFinishIndex(idx)}
                      className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        selectedFinishIndex === idx
                          ? 'bg-amber-500/20 border-amber-400 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-3 h-3 rounded-full border border-slate-700" style={{ backgroundColor: finish.color }}></span>
                        <span className="text-[11px] font-bold truncate">{finish.name}</span>
                      </div>
                      <span className="text-[11px] font-mono text-amber-400 font-extrabold">
                        {curr.symbol}{(finish.price * curr.rate).toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Product Details */}
          <div className="md:col-span-6 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="badge font-black tracking-widest text-cyan-400 border border-cyan-500/40 bg-cyan-950/60">{product.brand}</span>
                {product.badge && <span className="badge badge-deal">{product.badge}</span>}
                <span className="text-[10px] text-amber-300 font-bold bg-amber-950/40 border border-amber-800/40 px-2.5 py-0.5 rounded-full">
                  🔥 {product.purchasedCountText || '1,200+ bought in past month'}
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-white font-heading mt-1">
                {product.name}
              </h2>
              {activeFinish && (
                <p className="text-xs text-amber-400 font-bold mt-0.5">
                  Selected Color: {activeFinish.name} ({currentStock} in stock)
                </p>
              )}

              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-slate-200">{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount?.toLocaleString()} verified reviews)</span>
              </div>
            </div>

            {/* Price Showcase */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-amber-400 font-mono">
                {curr.symbol}{convertedPrice}
              </span>
              {currentOriginal > currentPrice && (
                <span className="text-sm line-through text-slate-500 font-mono">
                  {curr.symbol}{convertedOriginal}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed">
              {product.description || 'Professional grade musical instrument crafted for exceptional tone and performance.'}
            </p>

            {/* Verified Musician Review Highlight */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                <Check className="w-3.5 h-3.5" />
                <span>Verified Musician Review</span>
              </div>
              <p className="text-slate-300 italic text-[11px]">
                "Exceptionally built {product.brand} instrument with crystal-clear acoustics!"
              </p>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-900 text-slate-300 hover:text-white font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-900 text-slate-300 hover:text-white font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`btn-icon w-11 h-11 ${
                    isInWishlist ? 'bg-pink-600 text-white' : 'border-slate-700'
                  }`}
                  title="Add to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Side-by-Side Action Buttons: Add to Cart & Buy Now (Select Payment) */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      onAddToCart({
                        ...product,
                        price: currentPrice,
                        image: currentImage,
                        selectedFinish: activeFinish?.name
                      });
                    }
                    onClose();
                  }}
                  className="btn-cart py-3 w-full justify-center text-xs font-bold rounded-xl shadow-md"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add {quantity > 1 ? quantity : ''} to Cart</span>
                </button>

                <button
                  onClick={() => {
                    if (onBuyNow) {
                      onBuyNow({
                        ...product,
                        price: currentPrice,
                        image: currentImage,
                        selectedFinish: activeFinish?.name,
                        quantity
                      });
                    }
                    onClose();
                  }}
                  className="btn-buynow py-3 w-full justify-center text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4 text-white fill-white" />
                  <span>Buy Now (Select Payment)</span>
                </button>
              </div>
            </div>

            {/* Trust Footer */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span>FREE One-Day Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
                <span>2-Yr Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
                <span>30-Day Returns</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
