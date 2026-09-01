import React, { useState, useMemo } from 'react';
import { Sliders, RotateCcw, Search, Sparkles, Filter, LayoutGrid } from 'lucide-react';
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
  const [priceRange, setPriceRange] = useState(300);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Department Filter
        if (selectedDepartment !== 'all' && p.departmentId !== selectedDepartment) return false;
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
        if (p.price > priceRange) return false;
        // Rating Filter
        if (p.rating < minRating) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'brand') return a.brand.localeCompare(b.brand);
        return 0; // featured
      });
  }, [products, selectedDepartment, searchQuery, selectedBrands, priceRange, minRating, sortBy]);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetAllFilters = () => {
    setSelectedDepartment('all');
    setSelectedBrands([]);
    setPriceRange(300);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('featured');
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
              <span>Full Store Collection ({filteredProducts.length} Items)</span>
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

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs font-semibold rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="brand">Brand (A-Z)</option>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Filter Sidebar */}
          <aside
            className={`lg:col-span-3 space-y-6 ${
              mobileFilterOpen
                ? 'block fixed inset-x-0 bottom-0 top-16 z-50 bg-slate-900/95 backdrop-blur-xl p-6 overflow-y-auto'
                : 'hidden lg:block'
            }`}
          >
            <div className="glass-panel p-5 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-sm uppercase text-slate-200 tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-400" />
                  Filter Options
                </h3>
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] font-bold text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Department Select */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Department</span>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
                >
                  <option value="all">All 14 Store Departments</option>
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
                  min="15"
                  max="300"
                  step="5"
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
          <main className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
