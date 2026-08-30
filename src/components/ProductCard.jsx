import React, { useState } from 'react';
import './ProductCard.css';
import { Star, Heart, Volume2, ShoppingCart, Radio, Check, Zap } from 'lucide-react';
import { CURRENCIES, handleImageError } from '../data/products';
import { playInstrumentPreview } from '../utils/audioSynth';

export default function ProductCard({
  product,
  currency,
  onAddToCart,
  onQuickView,
  isInWishlist,
  onToggleWishlist
}) {
  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  // Active finish variant details
  const activeFinish = product.finishes ? product.finishes[selectedFinishIndex] : null;
  const currentPrice = activeFinish ? activeFinish.price : (product.priceUSD || product.price || 0);
  const currentOriginal = activeFinish ? activeFinish.originalPrice : (product.originalPriceUSD || product.originalPrice || currentPrice * 1.1);
  const currentImage = activeFinish ? activeFinish.image : product.image;
  const currentStock = activeFinish ? activeFinish.stock : (product.stock || 10);

  const convertedPrice = (currentPrice * curr.rate).toFixed(2);
  const convertedOriginal = (currentOriginal * curr.rate).toFixed(2);
  const discountPercent = Math.round(((currentOriginal - currentPrice) / currentOriginal) * 100);

  const handlePlayDemo = (e) => {
    e.stopPropagation();
    setIsPlayingAudio(true);
    playInstrumentPreview(product.audioType || 'guitar', product.audioFreq || 440);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 1800);
  };

  return (
    <div className="product-card-container group relative flex flex-col justify-between overflow-hidden bg-slate-900/90 border border-slate-800 rounded-2xl shadow-md hover:shadow-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 h-full">
      
      {/* 1. TOP IMAGE CONTAINER - Reserved strictly for clean image presentation */}
      <div className="relative h-56 bg-slate-900 overflow-hidden flex items-center justify-center p-3">
        
        {/* Product Image */}
        <img
          src={currentImage}
          alt={product.name}
          onError={handleImageError}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top-Left: Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-black text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md font-mono tracking-tight z-10">
            {discountPercent}% OFF
          </div>
        )}

        {/* Top-Right: Wishlist Heart & Stock Status */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={() => onToggleWishlist(product)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
              isInWishlist ? 'bg-pink-600 text-white scale-110' : 'bg-slate-950/80 text-white hover:text-pink-400'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-white' : ''}`} />
          </button>
        </div>

      </div>

      {/* 2. BOTTOM CONTENT CONTAINER - Strictly ordered & aligned metadata */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-slate-950/90 text-slate-100">
        
        {/* ORDER ITEM 1: Brand Name & Stock Status */}
        <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
          <span className="text-cyan-400 font-black tracking-widest">{product.brand}</span>
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
            currentStock > 0 ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60' : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
          }`}>
            {currentStock > 0 ? 'IN STOCK' : 'SOLD OUT'}
          </span>
        </div>

        {/* ORDER ITEM 2: Product Name (Uniform 2-line title height) */}
        <h3
          onClick={() => onQuickView({ ...product, selectedFinish: activeFinish })}
          className="font-bold text-sm text-slate-100 line-clamp-2 min-h-[2.5rem] font-heading hover:text-cyan-400 cursor-pointer transition-colors"
        >
          {product.name}
        </h3>

        {/* ORDER ITEM 3: Star Ratings & Reviews Count */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-black px-1.5 py-0.5 rounded">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-slate-400 text-[11px] font-medium">({product.reviewsCount?.toLocaleString()} reviews)</span>
          </div>

          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-400" /> Assured
          </span>
        </div>

        {/* ORDER ITEM 4: Number of People Purchased Badge */}
        <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-bold bg-amber-950/30 border border-amber-800/40 px-2 py-0.5 rounded-md w-fit">
          <Zap className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
          <span>{product.purchasedCountText || '1,200+ bought in past month'}</span>
        </div>

        {/* ORDER ITEM 4: Color Finishes Option Swatches */}
        {product.finishes && product.finishes.length > 0 && (
          <div className="flex items-center justify-between border-t border-b border-slate-800/80 py-1.5 my-1">
            <span className="text-[11px] text-slate-400 font-medium">
              Color: <strong className="text-slate-200 font-bold">{activeFinish?.name}</strong>
            </span>
            <div className="flex items-center gap-1.5">
              {product.finishes.map((finish, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFinishIndex(idx)}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedFinishIndex === idx
                      ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-125'
                      : 'border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: finish.color }}
                  title={finish.name}
                ></button>
              ))}
            </div>
          </div>
        )}

        {/* ORDER ITEM 5: Pricing Box & Audio Demo Button */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-100 font-mono">
                {curr.symbol}{convertedPrice}
              </span>
              {currentOriginal > currentPrice && (
                <span className="text-xs line-through text-slate-500 font-mono">
                  {curr.symbol}{convertedOriginal}
                </span>
              )}
            </div>
          </div>

          {/* Interactive Sound Demo Trigger Button */}
          <button
            onClick={handlePlayDemo}
            className={`text-[11px] font-bold py-1.5 px-3 rounded-full shadow-sm flex items-center gap-1.5 transition-all ${
              isPlayingAudio
                ? 'bg-purple-600 text-white scale-105 shadow-purple-500/40'
                : 'bg-slate-800 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 border border-slate-700'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Radio className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                <span>Playing</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Audio Demo</span>
              </>
            )}
          </button>
        </div>

        {/* ORDER ITEM 6: Side-by-Side Action Buttons (Add to Cart & Buy Now) */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
          <button
            onClick={() =>
              onAddToCart({
                ...product,
                price: currentPrice,
                image: currentImage,
                selectedFinish: activeFinish?.name
              })
            }
            className="btn-cart text-xs py-2.5 w-full justify-center rounded-xl font-bold shadow-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={() => {
              onAddToCart({
                ...product,
                price: currentPrice,
                image: currentImage,
                selectedFinish: activeFinish?.name
              });
              onQuickView({ ...product, selectedFinish: activeFinish });
            }}
            className="btn-buynow text-xs py-2.5 w-full justify-center rounded-xl font-bold shadow-sm"
          >
            <span>Buy Now</span>
          </button>
        </div>

      </div>
    </div>
  );
}
