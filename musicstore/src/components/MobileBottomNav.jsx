import React from 'react';
import { Home, ShoppingBag, Volume2, Heart, ShoppingCart } from 'lucide-react';

export default function MobileBottomNav({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  openCart,
  openWishlist,
  openVirtualStudio,
  scrollToCatalog
}) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-xl px-2 py-2 flex items-center justify-around shadow-2xl">
      {/* Home */}
      <button
        onClick={() => {
          setActiveTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
          activeTab === 'home' ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      {/* Store Catalog */}
      <button
        onClick={() => {
          setActiveTab('shop');
          scrollToCatalog();
        }}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
          activeTab === 'shop' ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="text-[10px]">Shop</span>
      </button>

      {/* Virtual Sound Studio */}
      <button
        onClick={openVirtualStudio}
        className="flex flex-col items-center justify-center -mt-5 bg-gradient-to-tr from-cyan-500 to-purple-600 text-white w-12 h-12 rounded-full shadow-lg shadow-cyan-500/30 border-2 border-slate-950 transition-transform active:scale-95"
      >
        <Volume2 className="w-6 h-6 animate-pulse" />
      </button>

      {/* Wishlist */}
      <button
        onClick={openWishlist}
        className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-slate-400 hover:text-slate-200 relative"
      >
        <Heart className="w-5 h-5 text-pink-400" />
        <span className="text-[10px]">Saved</span>
        {wishlistCount > 0 && (
          <span className="absolute top-0 right-2 bg-pink-500 text-white font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </button>

      {/* Cart */}
      <button
        onClick={openCart}
        className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-slate-400 hover:text-slate-200 relative"
      >
        <ShoppingCart className="w-5 h-5 text-cyan-400" />
        <span className="text-[10px]">Cart</span>
        {cartCount > 0 && (
          <span className="absolute top-0 right-2 bg-purple-600 text-white font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
}
