import React, { useState } from 'react';
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
  Music,
  UserCheck
} from 'lucide-react';
import { CURRENCIES, DEPARTMENTS } from '../data/products';

export default function FlipkartHeader({
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
    <header className="sticky top-0 z-50 bg-[#2874f0] text-white shadow-md">
      
      {/* Top Flipkart Ticker */}
      <div className="bg-[#175bb8] text-white text-[11px] font-semibold py-1 px-4 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
        <span>⚡ <strong>FLIPKART BIG SOUND SALE:</strong> Up to 80% OFF • Extra 10% OFF with code <code className="bg-white/20 px-1 py-0.5 rounded text-yellow-300 font-mono font-bold">MUSIC10</code></span>
      </div>

      {/* Main Flipkart Header Bar */}
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        
        {/* Flipkart Logo & Brand */}
        <div className="flex items-center gap-2.5 shrink-0 cursor-pointer select-none" onClick={() => setSelectedDepartment('all')}>
          <div className="w-9 h-9 rounded-xl bg-yellow-400 text-blue-900 flex items-center justify-center font-extrabold shadow-md">
            <Music className="w-5 h-5 fill-blue-900" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black italic tracking-tight text-white font-heading">Flipkart</span>
              <span className="text-[11px] font-extrabold text-yellow-300 italic">MusicMart</span>
            </div>
            <span className="text-[9px] text-blue-100 uppercase tracking-widest block -mt-1 font-bold">Explore Plus ✦</span>
          </div>
        </div>

        {/* Pincode / Location Pill */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-blue-100 hover:text-white cursor-pointer px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/20 shrink-0">
          <MapPin className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
          <div>
            <span className="text-[10px] text-blue-200 block leading-tight">Deliver to Sameer</span>
            <span className="font-bold text-white block leading-tight">New York 10001</span>
          </div>
        </div>

        {/* Flipkart Search Bar */}
        <div className="relative flex-1 max-w-2xl hidden md:block">
          <div className="flex items-center bg-white rounded-sm overflow-hidden shadow-sm">
            
            {/* Department Dropdown */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-gray-100 border-r border-gray-300 text-xs font-semibold px-3 py-2.5 text-gray-800 outline-none cursor-pointer hover:bg-gray-200"
            >
              <option value="all">All Categories</option>
              {DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search for products, brands and instruments..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
              className="w-full bg-transparent px-3 py-2 text-xs text-gray-900 placeholder-gray-500 outline-none font-medium"
            />

            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="px-2 text-gray-400 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            )}

            <button className="bg-white text-[#2874f0] px-4 py-2.5 font-bold hover:bg-gray-50 transition-colors">
              <Search className="w-4 h-4 text-[#2874f0]" />
            </button>
          </div>

          {/* Search Dropdown */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-b shadow-xl overflow-hidden z-50 text-gray-800">
              <div className="p-2 text-[10px] font-extrabold uppercase text-gray-400 border-b border-gray-100 bg-gray-50">
                Flipkart Store Matches ({searchResults.length})
              </div>
              {searchResults.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSearchQuery(p.name);
                    setShowSearchDropdown(false);
                  }}
                  className="flex items-center gap-3 p-2.5 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                >
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-gray-900">{p.name}</p>
                    <p className="text-[11px] text-[#2874f0] font-bold">{p.brand} • {CURRENCIES[currency].symbol}{(p.price * CURRENCIES[currency].rate).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Virtual Studio Button */}
          <button
            onClick={openVirtualStudio}
            className="hidden lg:flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-blue-950 text-xs font-extrabold py-1.5 px-3 rounded shadow-sm transition-all"
          >
            <Volume2 className="w-4 h-4 text-blue-950" />
            <span>Virtual Studio</span>
          </button>

          {/* Currency Selector */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-[#175bb8] border border-blue-400 text-xs font-semibold rounded px-2 py-1 text-white outline-none cursor-pointer"
          >
            {Object.keys(CURRENCIES).map((curr) => (
              <option key={curr} value={curr} className="bg-slate-900 text-white">
                {CURRENCIES[curr].symbol} {curr}
              </option>
            ))}
          </select>

          {/* Wishlist Heart */}
          <button onClick={openWishlist} className="relative p-1.5 text-white hover:text-yellow-300 transition-colors">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-blue-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Flipkart Cart Button */}
          <button onClick={openCart} className="flex items-center gap-1.5 bg-white text-[#2874f0] px-3.5 py-1.5 rounded font-extrabold text-xs shadow hover:bg-blue-50 transition-all">
            <ShoppingCart className="w-4 h-4 text-[#2874f0]" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-[#ff9f00] text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded-full ml-1">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
