import React, { useState } from 'react';
import {
  Music,
  Search,
  ShoppingCart,
  Heart,
  SlidersHorizontal,
  Sun,
  Moon,
  Volume2,
  Sparkles,
  X,
  Menu,
  Guitar
} from 'lucide-react';
import { CURRENCIES } from '../data/products';

export default function Navbar({
  cartCount,
  wishlistCount,
  compareCount,
  openCart,
  openWishlist,
  openCompare,
  openVirtualStudio,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  theme,
  toggleTheme,
  currency,
  setCurrency,
  categories,
  products
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="glass-nav sticky top-0 z-50 transition-colors">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900/60 via-pink-900/60 to-cyan-900/60 text-xs py-1.5 px-4 text-center border-b border-white/10 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
        <span>⚡ <strong>FLASH SALE:</strong> Use code <code className="bg-black/30 px-1.5 py-0.5 rounded text-pink-300 font-mono font-bold">MUSIC10</code> for 10% OFF all instruments! Free shipping over $500!</span>
      </div>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setSelectedCategory('all')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight gradient-text font-heading">MusicMart</span>
            <span className="hidden sm:block text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Pro Sound & Instruments</span>
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="relative flex-1 max-w-lg hidden md:block">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search guitars, synths, drums, Shure mic..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
              className="w-full bg-slate-900/60 border border-slate-700/60 focus:border-purple-500 rounded-full pl-10 pr-10 py-2 text-sm text-slate-100 placeholder-slate-400 outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-md">
              <div className="p-2 text-xs font-semibold uppercase text-slate-400 border-b border-slate-800">
                Matching Instruments ({searchResults.length})
              </div>
              {searchResults.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSearchQuery(p.name);
                    setShowSearchDropdown(false);
                  }}
                  className="flex items-center gap-3 p-2.5 hover:bg-purple-950/40 cursor-pointer transition-colors border-b border-slate-800/40 last:border-0"
                >
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-slate-100">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.brand} • {CURRENCIES[currency].symbol}{(p.price * CURRENCIES[currency].rate).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls & Navigation Badges */}
        <div className="flex items-center gap-2.5">
          {/* Virtual Studio CTA Button */}
          <button
            onClick={openVirtualStudio}
            className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 hover:from-cyan-600/50 hover:to-purple-600/50 border border-cyan-500/40 text-cyan-300 text-xs font-semibold py-2 px-3.5 rounded-full transition-all shadow-sm group"
            title="Interactive Sound Synthesizer Studio"
          >
            <Volume2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Virtual Studio</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          </button>

          {/* Currency Selector */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-slate-800/80 border border-slate-700/80 text-xs font-semibold rounded-lg px-2.5 py-1.5 outline-none cursor-pointer hover:border-purple-500 text-slate-200 transition-colors"
          >
            {Object.keys(CURRENCIES).map((curr) => (
              <option key={curr} value={curr} className="bg-slate-900 text-slate-100">
                {CURRENCIES[curr].symbol} {curr}
              </option>
            ))}
          </select>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn-icon"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-yellow-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-purple-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Compare Drawer Button */}
          <button
            onClick={openCompare}
            className="btn-icon relative"
            title="Product Specs Compare"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>

          {/* Wishlist Drawer Button */}
          <button
            onClick={openWishlist}
            className="btn-icon relative"
            title="Saved Wishlist"
          >
            <Heart className="w-4 h-4 text-pink-400" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Drawer Button */}
          <button
            onClick={openCart}
            className="btn-primary relative"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline font-bold">Cart</span>
            {cartCount > 0 && (
              <span className="bg-white text-purple-900 font-extrabold text-xs px-2 py-0.5 rounded-full shadow-inner">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden btn-icon"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 py-4 space-y-3 backdrop-blur-xl">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search instruments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100"
            />
          </div>

          <button
            onClick={() => {
              openVirtualStudio();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 py-2 rounded-lg font-semibold text-sm"
          >
            <Volume2 className="w-4 h-4 text-cyan-400" />
            Open Virtual Sound Studio
          </button>

          <div className="pt-2">
            <p className="text-xs uppercase font-bold text-slate-400 mb-2">Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
