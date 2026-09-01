import React, { useState, useMemo } from 'react';
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
  User,
  Lock
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

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    
    const results = [];
    const len = products.length;
    for (let i = 0; i < len; i++) {
      const p = products[i];
      const name = p.name ? p.name.toLowerCase() : '';
      const brand = p.brand ? p.brand.toLowerCase() : '';
      const category = p.category ? p.category.toLowerCase() : '';
      const dept = p.department ? p.department.toLowerCase() : '';
      const deptId = p.departmentId ? p.departmentId.toLowerCase() : '';
      const subcategory = p.subcategory ? p.subcategory.toLowerCase() : '';

      if (
        name.includes(q) ||
        brand.includes(q) ||
        category.includes(q) ||
        dept.includes(q) ||
        deptId.includes(q) ||
        subcategory.includes(q)
      ) {
        results.push(p);
        if (results.length >= 12) break;
      }
    }
    return results;
  }, [products, searchQuery]);

  const matchingDepts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return DEPARTMENTS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        (d.subcategories && d.subcategories.some((sub) => sub.toLowerCase().includes(q)))
    );
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-xl">
      
      {/* 1. Top Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 text-slate-200 text-xs py-1.5 px-4 text-center border-b border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
          <span>
            <strong>🏡 MIDDLE-CLASS FAMILY SPECIAL:</strong> Budget Friendly Instruments starting at ₹1,499 ($19.99)! Use Code <code className="bg-purple-900/80 border border-purple-500/40 text-pink-300 px-2 py-0.5 rounded font-mono font-bold ml-1">FAMILY50</code> for Extra 15% OFF!
          </span>
        </div>

        {/* Quick Admin Shortcut */}
        <button
          onClick={openAdminPanel}
          className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-rose-400 hover:text-rose-300 bg-rose-950/60 border border-rose-500/30 px-2.5 py-0.5 rounded-full"
          title="Store Owner Admin Control Panel"
        >
          <Lock className="w-3 h-3 text-amber-400" />
          <span>Owner Admin</span>
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
              onChange={(e) => {
                const deptId = e.target.value;
                setSelectedDepartment(deptId);
                if (scrollToCatalog) {
                  scrollToCatalog();
                }
              }}
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

          {/* Search Autocomplete Results Dropdown with Top Instrument Images */}
          {showSearchDropdown && searchQuery.trim() && (searchResults.length > 0 || matchingDepts.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden z-50 p-3 max-h-[85vh] overflow-y-auto space-y-4">
              
              {/* 1. TOP INSTRUMENT IMAGES SHOWCASE (Product Photos Displayed Prominently at Top) */}
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>Top Instrument Images ({searchResults.length})</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">Click photo to view instrument</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {searchResults.slice(0, 6).map((p) => {
                    const price = p.priceUSD || p.price || p.finishes?.[0]?.price || 0;
                    const displayPrice = `${curr.symbol}${(price * curr.rate).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
                    const imgUrl = p.image || p.finishes?.[0]?.image;

                    return (
                      <div
                        key={`top-img-${p.id}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSearchQuery(p.name);
                          setShowSearchDropdown(false);
                          if (scrollToCatalog) scrollToCatalog();
                        }}
                        className="bg-slate-950/80 border border-slate-800 hover:border-cyan-400 p-2 rounded-xl cursor-pointer group transition-all transform hover:-translate-y-0.5 shadow-md flex flex-col items-center relative overflow-hidden"
                      >
                        <div className="w-full h-24 rounded-lg bg-slate-900 p-1.5 flex items-center justify-center overflow-hidden mb-1.5 relative">
                          <img
                            src={imgUrl}
                            alt={p.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                          <span className="absolute top-1 right-1 bg-cyan-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded shadow">
                            {displayPrice}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 line-clamp-1 w-full text-left">
                          {p.name}
                        </p>
                        <div className="flex items-center justify-between w-full text-[10px] text-slate-400 mt-0.5">
                          <span className="font-semibold">{p.brand}</span>
                          <span className="text-amber-400 font-bold">★ {p.rating || 4.8}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. MATCHING INSTRUMENT CATEGORY IMAGE CARDS */}
              {matchingDepts.length > 0 && (
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 pb-1 border-b border-slate-800 mb-2">
                    Matching Instrument Categories
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {matchingDepts.map((d) => (
                      <div
                        key={`dept-card-${d.id}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSelectedDepartment(d.id);
                          setSearchQuery('');
                          setShowSearchDropdown(false);
                          if (scrollToCatalog) scrollToCatalog();
                        }}
                        className="flex items-center gap-2 bg-purple-950/40 border border-purple-500/30 hover:border-purple-400 p-2 rounded-xl cursor-pointer transition-all hover:bg-purple-900/50"
                      >
                        <img src={d.image} alt={d.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-purple-200 truncate">{d.name}</p>
                          <p className="text-[10px] text-purple-400 font-medium">{d.count} Products</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. ALL MATCHING ITEMS LIST */}
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-800 mb-1">
                  All Matching Products ({searchResults.length})
                </div>
                <div className="space-y-1">
                  {searchResults.slice(0, 6).map((p) => {
                    const price = p.priceUSD || p.price || p.finishes?.[0]?.price || 0;
                    const displayPrice = `${curr.symbol}${(price * curr.rate).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
                    const imgUrl = p.image || p.finishes?.[0]?.image;

                    return (
                      <div
                        key={`list-${p.id}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSearchQuery(p.name);
                          setShowSearchDropdown(false);
                          if (scrollToCatalog) scrollToCatalog();
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors border border-transparent hover:border-slate-700"
                      >
                        <img src={imgUrl} alt={p.name} className="w-10 h-10 object-contain rounded-lg bg-slate-950 p-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-100 truncate">{p.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{p.brand} • <span className="text-cyan-400 font-bold">{displayPrice}</span></p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

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
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Owner Admin Dashboard</span>
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
