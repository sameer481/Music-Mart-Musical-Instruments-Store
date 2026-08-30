import React, { useState, useMemo } from 'react';
import './ProductCatalog.css';
import { Sliders, RotateCcw, Search, Sparkles, Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import { DEPARTMENTS, BRANDS, CURRENCIES } from '../data/products';

export default function ProductCatalog({
  products,
  selectedDepartment,
  setSelectedDepartment,
  searchQuery,
  setSearchQuery,
  currency,
  onAddToCart,
  onQuickView,
  wishlistIds,
  onToggleWishlist,
  compareIds,
  onToggleCompare,
  catalogRef
}) {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(5000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(24);

  // Filter & Sort Logic for 5,000 dataset
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Department Filter
        if (selectedDepartment !== 'all') {
          const deptMatch = p.department === selectedDepartment || p.departmentId === selectedDepartment;
          if (!deptMatch) return false;
        }
        // Search Filter
        if (
          searchQuery.trim() &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.brand.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        // Brand Filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
        // Price Filter
        const pPrice = p.priceUSD || p.price || 0;
        if (pPrice > priceRange) return false;
        // Rating Filter
        if (p.rating < minRating) return false;
        return true;
      })
      .sort((a, b) => {
        const priceA = a.priceUSD || a.price || 0;
        const priceB = b.priceUSD || b.price || 0;
        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'brand') return a.brand.localeCompare(b.brand);
        return 0; // featured
      });
  }, [products, selectedDepartment, searchQuery, selectedBrands, priceRange, minRating, sortBy]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetAllFilters = () => {
    setSelectedDepartment('all');
    setSelectedBrands([]);
    setPriceRange(5000);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('featured');
    setVisibleCount(24);
  };

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <section ref={catalogRef} id="catalog" className="py-12 bg-slate-950/60">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Store Collection ({filteredProducts.length.toLocaleString()} Products)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-heading">
              {selectedDepartment === 'all'
                ? 'All Department Instruments & Gear'
                : DEPARTMENTS.find((d) => d.id === selectedDepartment)?.name || 'Department Collection'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden btn-secondary text-xs py-2 px-4 flex items-center gap-2"
            >
              <Filter className="w-4 h-4 text-purple-400" />
              <span>Filters</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="catalog-sort-select text-xs font-medium cursor-pointer"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="brand">Brand A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Department Navigation Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setSelectedDepartment('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedDepartment === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            All Departments
          </button>

          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedDepartment === dept.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{dept.name}</span>
            </button>
          ))}
        </div>

        {/* Catalog Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Filters Sidebar */}
          <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block fixed inset-x-0 bottom-0 top-16 z-50 bg-slate-900/95 backdrop-blur-xl p-6 overflow-y-auto' : 'hidden lg:block'}`}>
            <div className="catalog-sidebar-panel p-5 space-y-6 glass-panel">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>Filter Gear</span>
                </div>
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              </div>

              {/* Department Dropdown */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Department</span>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
                >
                  <option value="all">All Departments (5,000 Items)</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Max Price</span>
                  <span className="text-pink-400 font-extrabold">{curr.symbol}{(priceRange * curr.rate).toFixed(0)}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer bg-slate-800 h-2 rounded-lg"
                />
              </div>

              {/* Brand Filter */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Brands</span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {BRANDS.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-purple-500"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Minimum Rating</span>
                <div className="flex gap-2">
                  {[0, 4.5, 4.8].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        minRating === rating
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {rating === 0 ? 'All' : `${rating}+ ★`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Close Mobile Filter */}
              {mobileFilterOpen && (
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full btn-primary py-2 text-xs font-bold mt-4"
                >
                  Apply Filters
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-9 space-y-8">
            {displayedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      currency={currency}
                      onAddToCart={onAddToCart}
                      onQuickView={onQuickView}
                      isInWishlist={wishlistIds.includes(product.id)}
                      onToggleWishlist={onToggleWishlist}
                      isInCompare={compareIds.includes(product.id)}
                      onToggleCompare={onToggleCompare}
                    />
                  ))}
                </div>

                {/* Load More Pagination Bar */}
                {visibleCount < filteredProducts.length && (
                  <div className="text-center pt-6 pb-2">
                    <p className="text-xs text-slate-400 mb-3">
                      Showing <span className="font-bold text-slate-200">{displayedProducts.length.toLocaleString()}</span> of{' '}
                      <span className="font-bold text-cyan-400">{filteredProducts.length.toLocaleString()}</span> products
                    </p>
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 24)}
                      className="px-8 py-3 rounded-full bg-slate-900 border border-slate-700/80 hover:border-cyan-500/80 text-xs font-extrabold text-cyan-300 hover:text-white transition-all shadow-lg hover:shadow-cyan-500/20 active:scale-95"
                    >
                      Load More Products 🎸
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="glass-panel p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-950/50 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-200">No Gear Matches Your Filter Criteria</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Try adjusting department filters, price range slider, or clearing search keywords.
                </p>
                <button onClick={resetAllFilters} className="btn-secondary text-xs py-2 px-6">
                  Reset All Store Filters
                </button>
              </div>
            )}
          </main>

        </div>
      </div>
    </section>
  );
}
