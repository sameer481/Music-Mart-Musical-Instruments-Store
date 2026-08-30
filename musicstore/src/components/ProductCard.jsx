import React, { useState } from 'react';
import { Star, Heart, Volume2, ShoppingCart, SlidersHorizontal, Check } from 'lucide-react';
import { CURRENCIES } from '../data/products';
import { playInstrumentPreview } from '../utils/audioSynth';

export default function ProductCard({
  product,
  currency,
  onAddToCart,
  onQuickView,
  isInWishlist,
  onToggleWishlist,
  isInCompare,
  onToggleCompare
}) {
  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  // Active finish variant details
  const activeFinish = product.finishes ? product.finishes[selectedFinishIndex] : null;
  const currentPrice = activeFinish ? activeFinish.price : (product.price || 0);
  const currentOriginal = activeFinish ? activeFinish.originalPrice : (product.originalPrice || currentPrice * 1.1);
  const currentImage = activeFinish ? activeFinish.image : product.image;
  const currentStock = activeFinish ? activeFinish.stock : (product.stock || 10);

  const convertedPrice = (currentPrice * curr.rate).toFixed(2);
  const convertedOriginal = (currentOriginal * curr.rate).toFixed(2);
  const savingsUSD = currentOriginal > currentPrice ? currentOriginal - currentPrice : 0;

  return (
    <div className="glass-panel group relative flex flex-col justify-between overflow-hidden bg-white border-gray-200 rounded-xl shadow-sm hover:shadow-md">
      
      {/* Product Image Frame with Price & Title PRINTED INSIDE THE IMAGE */}
      <div className="relative h-64 bg-slate-900 overflow-hidden flex items-center justify-center p-2">
        
        {/* Instrument Image */}
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg brightness-95"
          loading="lazy"
        />

        {/* Gradient Overlay to ensure text inside image is 100% readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40 pointer-events-none"></div>

        {/* Top-Left: PRICE TAG printed INSIDE the image */}
        <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg border border-amber-300 font-mono">
          PRICE: {curr.symbol}{convertedPrice}
        </div>

        {/* Top-Right: Stock & Wishlist printed INSIDE the image */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <span className="bg-emerald-500 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded-full shadow">
            {currentStock > 0 ? 'In Stock' : 'Sold Out'}
          </span>
          <button
            onClick={() => onToggleWishlist(product)}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shadow ${
              isInWishlist ? 'bg-pink-600 text-white' : 'bg-slate-900/80 text-white hover:text-pink-400'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isInWishlist ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom-Left: PRODUCT TITLE & COLOR printed INSIDE the image frame */}
        <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none space-y-0.5">
          <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
            {product.brand}
          </span>
          <h3 className="font-extrabold text-sm text-white line-clamp-1 font-heading">
            {product.name}
          </h3>
          {activeFinish && (
            <span className="text-[11px] text-slate-300 font-medium block">
              Color: <strong className="text-amber-300">{activeFinish.name}</strong>
            </span>
          )}
        </div>

        {/* Sound Demo Button inside image */}
        <button
          onClick={() => playInstrumentPreview(product.audioType, product.audioFreq)}
          className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold py-1 px-2.5 rounded-full shadow flex items-center gap-1"
        >
          <Volume2 className="w-3 h-3 text-amber-300" />
          <span>Demo</span>
        </button>
      </div>

      {/* Product Details & Easy Order Buttons */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-white text-slate-900">
        
        {/* Color Finish Picker */}
        {product.finishes && product.finishes.length > 0 && (
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-500">Color Options:</span>
            <div className="flex items-center gap-1.5">
              {product.finishes.map((finish, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFinishIndex(idx)}
                  className={`w-5 h-5 rounded-full border-2 transition-all ${
                    selectedFinishIndex === idx
                      ? 'border-blue-600 scale-125 ring-2 ring-blue-400/30'
                      : 'border-slate-300 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: finish.color }}
                  title={`${finish.name} (${curr.symbol}${(finish.price * curr.rate).toFixed(2)})`}
                ></button>
              ))}
            </div>
          </div>
        )}

        {/* Rating & Simple Price Details */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-extrabold text-slate-900">{product.rating}</span>
            <span className="text-slate-500">({product.reviewsCount} reviews)</span>
          </div>

          <div className="text-right">
            <span className="text-base font-extrabold text-slate-900 font-mono">
              {curr.symbol}{convertedPrice}
            </span>
            {currentOriginal > currentPrice && (
              <span className="text-xs line-through text-slate-400 block font-mono">
                {curr.symbol}{convertedOriginal}
              </span>
            )}
          </div>
        </div>

        {/* Big Beginner-Friendly Action Buttons: 🟡 ADD TO CART & 🟠 BUY NOW */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() =>
              onAddToCart({
                ...product,
                price: currentPrice,
                image: currentImage,
                selectedFinish: activeFinish?.name
              })
            }
            className="btn-cart text-xs py-2.5 w-full justify-center"
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
            className="btn-buynow text-xs py-2.5 w-full justify-center"
          >
            <span>Buy Now</span>
          </button>
        </div>

      </div>
    </div>
  );
}
