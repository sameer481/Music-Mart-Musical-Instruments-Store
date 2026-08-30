import React, { useState } from 'react';
import './Navbar.css';
import {
  Music,
  Search,
  ShoppingCart,
  Heart,
  Volume2,
  Sparkles,
  X,
  Menu,
  Zap,
  Package,
  ShieldCheck,
  User
} from 'lucide-react';
import { CURRENCIES, DEPARTMENTS } from '../data/products';

export default function Navbar({
  cartCount,
  wishlistCount,
  _compareCount,
  openCart,
  openWishlist,
  _openCompare,
  openVirtualStudio,
  openOrderTracking,
  openAdminPanel,
  openUserProfile,
  currentUser,
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  currency,
  setCurrency,
  products,
  scrollToCatalog
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-xl">
      
      {/* 1. Top Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 text-slate-200 text-xs py-1.5 px-4 text-center border-b border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
          <span>
            <strong>PRO MUSIC SALE:</strong> Instant UPI Payments + Live Order Tracking • Code <code className="bg-purple-900/80 border border-purple-500/40 text-pink-300 px-2 py-0.5 rounded font-mono font-bold ml-1">MUSIC10</code> for 10% OFF!
          </span>
        </div>

        {/* Quick Admin Shortcut */}
        <button
          onClick={openAdminPanel}
          className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-rose-400 hover:text-rose-300 bg-rose-950/60 border border-rose-500/30 px-2.5 py-0.5 rounded-full"
        >
          <ShieldCheck className="w-3 h-3 text-rose-400" />
          <span>Admin Panel</span>
        </button>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div
          onClick={() => {
            setSelectedDepartment('all');
            if (scrollToCatalog) scrollToCatalog();
          }}
          className="flex items-center gap-3 cursor-pointer select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-md shadow-cyan-500/20">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-heading leading-none">
              MusicMart
            </h1>
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold block">
              Instruments & Sound Gear
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-2xl hidden md:block z-30">
          <div className="flex items-center bg-slate-950 border border-slate-700/80 focus-within:border-cyan-400 rounded-xl overflow-hidden shadow-inner">
            
            {/* Department Select Dropdown */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-slate-900 border-r border-slate-800 text-xs font-bold px-3 py-2.5 text-slate-300 outline-none cursor-pointer hover:text-white"
            >
              <option value="all">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>

            {/* Input */}
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search guitars, synths, pianos, microphones, drum kits..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                className="w-full bg-transparent pl-9 pr-8 py-2 text-xs text-slate-100 placeholder-slate-400 outline-none font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-slate-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Search Autocomplete Results Dropdown */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-2 text-[10px] font-bold uppercase text-slate-400 border-b border-slate-800 bg-slate-950">
                Matching Store Instruments ({searchResults.length})
              </div>
              {searchResults.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSearchQuery(p.name);
                    setShowSearchDropdown(false);
                    if (scrollToCatalog) scrollToCatalog();
                  }}
                  className="flex items-center gap-3 p-2.5 hover:bg-slate-800 cursor-pointer transition-colors border-b border-slate-800/60 last:border-0"
                >
                  <img src={p.image} alt={p.name} className="w-9 h-9 object-cover rounded-lg bg-slate-950" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-100 truncate">{p.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{p.brand} • ${p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right User Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Track Order Button */}
          <button
            onClick={openOrderTracking}
            className="hidden xl:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 text-xs font-bold py-2 px-3 rounded-xl transition-all"
            title="Track Shipment Status"
          >
            <Package className="w-4 h-4 text-cyan-400" />
            <span>Track Order</span>
          </button>

          {/* Virtual Sound Studio Button */}
          <button
            onClick={openVirtualStudio}
            className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-extrabold text-xs py-2 px-3 rounded-xl shadow-md transition-all border border-cyan-400/30 shrink-0"
          >
            <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Virtual Studio</span>
          </button>

          {/* Currency Selector */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs font-bold rounded-lg px-2 py-1.5 text-slate-200 outline-none cursor-pointer hover:border-cyan-400"
          >
            {Object.keys(CURRENCIES).map((curr) => (
              <option key={curr} value={curr} className="bg-slate-900 text-white">
                {CURRENCIES[curr].symbol} {curr}
              </option>
            ))}
          </select>

          {/* User Profile / Auth Button */}
          <button
            onClick={openUserProfile}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold py-1.5 px-3 rounded-xl transition-all"
            title="User Account & Register"
          >
            <User className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline truncate max-w-[80px]">{currentUser ? currentUser.name.split(' ')[0] : 'Profile'}</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={openWishlist}
            className="btn-icon relative bg-slate-800 border-slate-700 text-slate-300 hover:text-pink-400"
            title="Wishlist"
          >
            <Heart className="w-4 h-4 text-pink-400" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Drawer Button */}
          <button
            onClick={openCart}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs px-3 py-2 rounded-xl shadow-md transition-all shrink-0"
          >
            <ShoppingCart className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline font-heading">Cart</span>
            {cartCount > 0 && (
              <span className="bg-slate-950 text-amber-400 font-mono font-black text-[11px] px-2 py-0.5 rounded-full ml-0.5">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden btn-icon bg-slate-800 border-slate-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>

      </div>

      {/* 3. Horizontal Category Navigation Sub-Bar */}
      <div className="bg-slate-950 border-t border-slate-800/80 px-4">
        <div className="container mx-auto flex items-center gap-3 overflow-x-auto py-2 no-scrollbar text-xs font-bold text-slate-300">
          
          <button
            onClick={() => {
              setSelectedDepartment('all');
              if (scrollToCatalog) scrollToCatalog();
            }}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedDepartment === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span>All Departments</span>
          </button>

          {DEPARTMENTS.slice(0, 7).map((dept) => (
            <button
              key={dept.id}
              onClick={() => {
                setSelectedDepartment(dept.id);
                if (scrollToCatalog) scrollToCatalog();
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedDepartment === dept.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{dept.name}</span>
            </button>
          ))}

          <button
            onClick={() => {
              setSelectedDepartment('deals');
              if (scrollToCatalog) scrollToCatalog();
            }}
            className="px-3 py-1.5 rounded-lg whitespace-nowrap bg-rose-950/60 text-rose-300 border border-rose-500/40 hover:bg-rose-900/80 flex items-center gap-1 ml-auto"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Today's Flash Deals</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search store gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                openOrderTracking();
                setMobileMenuOpen(false);
              }}
              className="py-2.5 bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4 text-cyan-400" />
              Track Package
            </button>

            <button
              onClick={() => {
                openUserProfile();
                setMobileMenuOpen(false);
              }}
              className="py-2.5 bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-purple-400" />
              My Profile
            </button>
          </div>

          <button
            onClick={() => {
              openAdminPanel();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            Open Admin Dashboard
          </button>

          <div className="pt-2 border-t border-slate-800">
            <span className="text-[11px] font-bold uppercase text-slate-400 block mb-2">Store Departments</span>
            <div className="grid grid-cols-2 gap-2">
              {DEPARTMENTS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setSelectedDepartment(d.id);
                    setMobileMenuOpen(false);
                    if (scrollToCatalog) scrollToCatalog();
                  }}
                  className="text-left p-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
