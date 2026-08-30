import React from 'react';
import './SimpleHeader.css';
import { Search, ShoppingCart, Heart, Volume2, Music, X } from 'lucide-react';
import { CURRENCIES, DEPARTMENTS } from '../data/products';

export default function SimpleHeader({
  cartCount,
  wishlistCount,
  openCart,
  openWishlist,
  openVirtualStudio,
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  currency,
  setCurrency
}) {
  return (
    <header className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
      
      {/* Top Welcome Banner */}
      <div className="bg-blue-800 text-white text-xs font-bold py-1.5 px-4 text-center">
        🎵 <strong>WELCOME TO MUSICMART:</strong> Easy Online Instrument Shop • Free Shipping + Use Coupon <code className="bg-white/20 px-1 py-0.5 rounded text-yellow-300 font-mono">MUSIC10</code> for 10% OFF!
      </div>

      {/* Main Header Bar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Store Brand Logo */}
        <div
          onClick={() => setSelectedDepartment('all')}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-900 flex items-center justify-center font-black shadow">
            <Music className="w-6 h-6 fill-blue-900" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white font-heading leading-none">
              MusicMart
            </h1>
            <span className="text-[11px] text-blue-200 font-bold block">Musical Instruments Store</span>
          </div>
        </div>

        {/* Easy Search Bar & Category Dropdown */}
        <div className="flex-1 max-w-2xl hidden md:flex items-center bg-white rounded-lg overflow-hidden shadow-sm">
          
          {/* Department Selector */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-gray-100 border-r border-gray-300 text-xs font-bold px-3 py-2.5 text-gray-800 outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {DEPARTMENTS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search guitars, pianos, drums, mics, keyboards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent px-3 py-2 text-xs text-gray-900 placeholder-gray-500 outline-none font-medium"
          />

          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="px-2 text-gray-400 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="bg-blue-600 text-white px-4 py-2.5 font-bold flex items-center">
            <Search className="w-4 h-4" />
          </div>
        </div>

        {/* User Action Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Virtual Sound Test Button */}
          <button
            onClick={openVirtualStudio}
            className="hidden lg:flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-blue-950 text-xs font-extrabold py-2 px-3.5 rounded-lg shadow-sm transition-all"
          >
            <Volume2 className="w-4 h-4" />
            <span>Play Sound Test</span>
          </button>

          {/* Currency Selector */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-blue-700 border border-blue-400 text-xs font-bold rounded px-2 py-1.5 text-white outline-none cursor-pointer"
          >
            {Object.keys(CURRENCIES).map((curr) => (
              <option key={curr} value={curr} className="bg-slate-900 text-white">
                {CURRENCIES[curr].symbol} {curr}
              </option>
            ))}
          </select>

          {/* Saved Wishlist Button */}
          <button onClick={openWishlist} className="relative p-2 text-white hover:text-amber-300 transition-colors">
            <Heart className="w-6 h-6" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-amber-400 text-blue-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={openCart}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-xs px-4 py-2 rounded-lg shadow transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>My Cart</span>
            {cartCount > 0 && (
              <span className="bg-blue-900 text-white font-extrabold text-[11px] px-2 py-0.5 rounded-full ml-1">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
