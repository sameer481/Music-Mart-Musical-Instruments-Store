import React, { useState } from 'react';
import './AmazonHeader.css';
import {
  Search,
  ShoppingCart,
  Heart,
  MapPin,
  Sun,
  Moon,
  Volume2,
  Sparkles,
  X,
  SlidersHorizontal,
  Music,
  Zap
} from 'lucide-react';
import { CURRENCIES, DEPARTMENTS } from '../data/products';

export default function AmazonHeader({
  cartCount,
  wishlistCount,
  compareCount,
  openCart,
  openWishlist,
  openCompare,
  openVirtualStudio,
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  theme,
  toggleTheme,
  currency,
  setCurrency,
  products
}) {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800 shadow-2xl">
      
      {/* Top Ticker Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-pink-600 text-black text-xs font-bold py-1 px-4 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 fill-black" />
        <span>⚡ <strong>AMAZON PRIME MUSIC SALE:</strong> FREE One-Day Delivery + Use Code <code className="bg-black/20 px-1 py-0.5 rounded text-white font-mono">MUSIC10</code> for Extra 10% OFF!</span>
      </div>

      {/* Main Header Bar */}
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        
        {/* Amazon Logo & Brand */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer select-none" onClick={() => setSelectedDepartment('all')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-orange-500 to-pink-500 flex items-center justify-center text-black shadow-lg shadow-amber-500/20">
            <Music className="w-5 h-5 fill-black" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold tracking-tight text-white font-heading">amazon</span>
              <span className="text-xs font-bold text-amber-400 font-mono">musicmart</span>
            </div>
            <span className="text-[10px] text-slate-400 block font-semibold -mt-1">Instruments Store</span>
          </div>
        </div>

        {/* Deliver To Address Pill */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white cursor-pointer px-2 py-1 rounded-lg border border-slate-800 hover:border-slate-700 shrink-0">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-500 block leading-tight">Deliver to Sameer</span>
            <span className="font-bold text-slate-200 block leading-tight">New York 10001</span>
          </div>
        </div>

        {/* Amazon Search Bar with Department Selector */}
        <div className="relative flex-1 max-w-2xl hidden md:block">
          <div className="flex items-center bg-slate-900 border border-slate-700 focus-within:border-amber-400 rounded-xl overflow-hidden shadow-inner">
            
            {/* Department Dropdown */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-slate-800 border-r border-slate-700 text-xs font-semibold px-3 py-2.5 text-slate-200 outline-none cursor-pointer hover:bg-slate-750"
            >
              <option value="all">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search Amazon MusicMart guitars, synths, drums, Shure mic..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
              className="w-full bg-transparent px-3 py-2 text-xs text-slate-100 placeholder-slate-400 outline-none"
            />

            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="px-2 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}

            <button className="bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black px-4 py-2.5 font-bold transition-all">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Search Dropdown */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-md">
              <div className="p-2 text-xs font-semibold uppercase text-slate-400 border-b border-slate-800">
                Amazon Store Matches ({searchResults.length})
              </div>
              {searchResults.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSearchQuery(p.name);
                    setShowSearchDropdown(false);
                  }}
                  className="flex items-center gap-3 p-2.5 hover:bg-amber-950/40 cursor-pointer transition-colors border-b border-slate-800/40 last:border-0"
                >
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate text-slate-100">{p.name}</p>
                    <p className="text-[11px] text-amber-400 font-bold">{p.brand} • {CURRENCIES[currency].symbol}{(p.price * CURRENCIES[currency].rate).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Virtual Studio CTA Button */}
          <button
            onClick={openVirtualStudio}
            className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold py-1.5 px-3 rounded-full hover:bg-amber-500/30 transition-all"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>Virtual Studio</span>
          </button>

          {/* Currency Selector */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs font-semibold rounded-lg px-2.5 py-1.5 text-slate-200 outline-none cursor-pointer"
          >
            {Object.keys(CURRENCIES).map((curr) => (
              <option key={curr} value={curr}>
                {CURRENCIES[curr].symbol} {curr}
              </option>
            ))}
          </select>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="btn-icon">
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
          </button>

          {/* Wishlist Button */}
          <button onClick={openWishlist} className="btn-icon relative">
            <Heart className="w-4 h-4 text-pink-400" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Amazon Cart Button */}
          <button onClick={openCart} className="btn-amazon-cart relative py-1.5 px-3.5">
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline font-bold">Cart</span>
            {cartCount > 0 && (
              <span className="bg-slate-950 text-amber-400 font-extrabold text-[11px] px-2 py-0.5 rounded-full shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
