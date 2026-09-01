import React, { useState, useMemo, useCallback } from 'react';
import './AdminPanelModal.css';
import {
  X, ShieldCheck, Package, ShoppingBag, Users, DollarSign, Plus, Trash2, Edit, Save,
  CheckCircle2, TrendingUp, RefreshCw, Lock, Search, AlertTriangle, Eye, ChevronLeft, ChevronRight
} from 'lucide-react';
import { CURRENCIES, DEPARTMENTS, DEFAULT_INSTRUMENT_IMG } from '../data/products';

// Memoized Add Product Form Component to prevent re-rendering table on keystrokes
const AddProductForm = React.memo(({ onSave, onCancel }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: 'Fender',
    departmentId: DEPARTMENTS[0]?.id || 'electric-guitars',
    subcategory: 'Standard',
    price: 499,
    originalPrice: 599,
    stock: 15,
    rating: 4.8,
    reviewsCount: 24,
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80',
    description: '',
    audioType: 'guitar',
    audioFreq: 329.63
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name.trim()) {
      alert('Please enter an instrument name.');
      return;
    }
    onSave(newProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/40 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Create New Instrument Product</span>
        </h4>
        <span className="text-[10px] text-slate-400 font-mono">Will publish immediately to live catalog</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="text-slate-400 font-semibold">Instrument Name *</label>
          <input
            type="text"
            required
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="e.g. Gibson Les Paul Standard"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1 focus:border-emerald-400 outline-none"
          />
        </div>

        <div>
          <label className="text-slate-400 font-semibold">Brand *</label>
          <input
            type="text"
            required
            value={newProduct.brand}
            onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
            placeholder="e.g. Gibson"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1 focus:border-emerald-400 outline-none"
          />
        </div>

        <div>
          <label className="text-slate-400 font-semibold">Department *</label>
          <select
            value={newProduct.departmentId}
            onChange={(e) => setNewProduct({ ...newProduct, departmentId: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1 focus:border-emerald-400 outline-none cursor-pointer"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-slate-400 font-semibold">Price (Base USD / ₹ INR)</label>
          <input
            type="number"
            required
            step="0.01"
            min="1"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1 focus:border-emerald-400 outline-none"
          />
        </div>

        <div>
          <label className="text-slate-400 font-semibold">Original M.R.P. Price</label>
          <input
            type="number"
            step="0.01"
            value={newProduct.originalPrice}
            onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1 focus:border-emerald-400 outline-none"
          />
        </div>

        <div>
          <label className="text-slate-400 font-semibold">Stock Inventory Quantity</label>
          <input
            type="number"
            required
            min="0"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1 focus:border-emerald-400 outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-slate-400 font-semibold">Image URL</label>
          <input
            type="text"
            required
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1 focus:border-emerald-400 outline-none font-mono text-[11px]"
          />
        </div>

        <div>
          <label className="text-slate-400 font-semibold">Audio Synth Preview Type</label>
          <select
            value={newProduct.audioType}
            onChange={(e) => setNewProduct({ ...newProduct, audioType: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1 focus:border-emerald-400 outline-none cursor-pointer"
          >
            <option value="guitar">Guitar Riff Demo</option>
            <option value="synth">Analog Synth Lead</option>
            <option value="piano">Acoustic Grand Piano</option>
            <option value="drums">Drum Beat Kick & Snare</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <label className="text-slate-400 font-semibold">Product Description</label>
          <textarea
            rows="2"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            placeholder="Brief product description for store catalog..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1 focus:border-emerald-400 outline-none text-xs"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
        <button type="button" onClick={onCancel} className="btn-secondary py-1.5 px-4 text-xs">
          Cancel
        </button>
        <button type="submit" className="btn-primary py-1.5 px-5 text-xs bg-emerald-500 text-slate-950 font-extrabold rounded-xl shadow-lg">
          Save & Publish Product
        </button>
      </div>
    </form>
  );
});

// Memoized Table Row Component for fast rendering
const ProductRow = React.memo(({
  product,
  curr,
  isInlineEditing,
  editPrice,
  editStock,
  setEditPrice,
  setEditStock,
  onStartInlineEdit,
  onSaveInlineEdit,
  onOpenFullEdit,
  onDelete
}) => {
  return (
    <tr className="hover:bg-slate-900/50">
      <td className="p-2">
        <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg bg-slate-900 border border-slate-800" />
      </td>
      <td className="p-3 font-bold text-white max-w-xs truncate">
        <span>{product.name}</span>
        <span className="block text-[10px] text-slate-500 font-mono font-normal">{product.id}</span>
      </td>
      <td className="p-3 text-slate-400 font-semibold">{product.brand}</td>
      <td className="p-3 text-slate-400 font-mono text-[11px]">{product.department || product.departmentId}</td>
      <td className="p-3 font-mono font-bold text-amber-400">
        {isInlineEditing ? (
          <input
            type="number"
            step="0.01"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
            className="w-20 bg-slate-900 border border-cyan-400 rounded px-2 py-0.5 text-white"
          />
        ) : (
          `${curr.symbol}${((product.priceUSD || product.price || 0) * curr.rate).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
        )}
      </td>
      <td className="p-3">
        {isInlineEditing ? (
          <input
            type="number"
            value={editStock}
            onChange={(e) => setEditStock(e.target.value)}
            className="w-16 bg-slate-900 border border-cyan-400 rounded px-2 py-0.5 text-white"
          />
        ) : (
          <span className={`px-2 py-0.5 rounded font-bold ${product.stock > 0 ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/40' : 'text-rose-400 bg-rose-950/40 border border-rose-800/40'}`}>
            {product.stock || 0} in stock
          </span>
        )}
      </td>
      <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
        {isInlineEditing ? (
          <button
            onClick={() => onSaveInlineEdit(product.id)}
            className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500"
            title="Save Quick Edit"
          >
            <Save className="w-3.5 h-3.5" />
          </button>
        ) : (
          <>
            <button
              onClick={() => onStartInlineEdit(product)}
              className="p-1.5 bg-slate-800 text-cyan-400 rounded-lg hover:bg-slate-700 border border-slate-700"
              title="Quick Inline Edit (Price & Stock)"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenFullEdit(product)}
              className="p-1.5 bg-purple-950/60 text-purple-300 rounded-lg hover:bg-purple-900/80 border border-purple-800/50"
              title="Full Edit Details Modal"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </>
        )}
        <button
          onClick={() => onDelete(product)}
          className="p-1.5 bg-rose-950/60 text-rose-400 rounded-lg hover:bg-rose-900 border border-rose-800/50"
          title="Delete Product"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </td>
    </tr>
  );
});

export default function AdminPanelModal({
  isOpen,
  onClose,
  products = [],
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  orders = [],
  onUpdateOrderStatus,
  onDeleteOrder,
  currency = 'USD',
  onLockAdminSession
}) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'products', 'orders'
  
  // Search & Filter State
  const [productSearch, setProductSearch] = useState('');
  const [productDeptFilter, setProductDeptFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Pagination State for Admin Table (15 per page for 100x performance)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  // Add Product Form Toggle
  const [showAddForm, setShowAddForm] = useState(false);

  // Quick Inline Product Editing State
  const [editingProductId, setEditingProductId] = useState(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editStock, setEditStock] = useState(0);

  // Full Product Edit Modal State
  const [fullEditProduct, setFullEditProduct] = useState(null);

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  // Stats calculation
  const totalRevenueUSD = useMemo(() => orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0), [orders]);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;

  // Filtered Products for Admin Table (Memoized)
  const filteredAdminProducts = useMemo(() => {
    return products.filter((p) => {
      if (productDeptFilter !== 'all' && p.departmentId !== productDeptFilter && p.department !== productDeptFilter) {
        return false;
      }
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          (p.department && p.department.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [products, productDeptFilter, productSearch]);

  // Paginated Products Slice for Instant Performance
  const totalPages = Math.ceil(filteredAdminProducts.length / pageSize) || 1;
  const displayedAdminProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAdminProducts.slice(start, start + pageSize);
  }, [filteredAdminProducts, currentPage, pageSize]);

  // Filtered Orders for Admin Table (Memoized)
  const filteredAdminOrders = useMemo(() => {
    if (!orderSearch.trim()) return orders;
    const q = orderSearch.toLowerCase();
    return orders.filter((o) => (
      o.id.toLowerCase().includes(q) ||
      (o.shippingAddress?.fullName && o.shippingAddress.fullName.toLowerCase().includes(q)) ||
      (o.paymentMethod && o.paymentMethod.toLowerCase().includes(q)) ||
      (o.status && o.status.toLowerCase().includes(q))
    ));
  }, [orders, orderSearch]);

  // CREATE PRODUCT HANDLER
  const handleCreateProductSaved = useCallback((newProduct) => {
    const deptObj = DEPARTMENTS.find((d) => d.id === newProduct.departmentId);
    const parsedPrice = parseFloat(newProduct.price) || 99;
    const parsedOriginal = parseFloat(newProduct.originalPrice) || Math.round(parsedPrice * 1.25);
    const parsedStock = parseInt(newProduct.stock) || 10;
    const imgUrl = newProduct.image.trim() || DEFAULT_INSTRUMENT_IMG;

    const createdObj = {
      id: 'custom-' + Date.now(),
      name: newProduct.name.trim(),
      brand: newProduct.brand.trim() || 'Fender',
      departmentId: newProduct.departmentId || DEPARTMENTS[0].id,
      department: deptObj ? deptObj.name : 'Electric Guitars',
      subcategory: newProduct.subcategory.trim() || 'Standard',
      price: parsedPrice,
      priceUSD: parsedPrice,
      originalPrice: parsedOriginal,
      originalPriceUSD: parsedOriginal,
      stock: parsedStock,
      rating: parseFloat(newProduct.rating) || 4.8,
      reviewsCount: parseInt(newProduct.reviewsCount) || 18,
      image: imgUrl,
      description: newProduct.description.trim() || `High-performance ${newProduct.brand} ${newProduct.name} built with premium tonewoods and electronics.`,
      audioType: newProduct.audioType || 'guitar',
      audioFreq: parseFloat(newProduct.audioFreq) || 329.63,
      isFeatured: true,
      purchasedCountText: '300+ bought in past month',
      finishes: [
        {
          name: 'Classic Finish',
          color: '#090d16',
          price: parsedPrice,
          originalPrice: parsedOriginal,
          image: imgUrl,
          stock: parsedStock
        }
      ],
      specs: {
        'Craftsmanship': 'Professional Grade',
        'Warranty': '2 Years Full Warranty',
        'Package Contents': 'Instrument, Setup Guide & Hex Keys'
      }
    };

    onAddProduct(createdObj);
    setShowAddForm(false);
  }, [onAddProduct]);

  // SAVE QUICK INLINE EDIT
  const handleSaveInlineEdit = useCallback((prodId) => {
    const updatedPrice = parseFloat(editPrice) || 0;
    const updatedStock = parseInt(editStock) || 0;
    onUpdateProduct(prodId, {
      price: updatedPrice,
      priceUSD: updatedPrice,
      stock: updatedStock
    });
    setEditingProductId(null);
  }, [editPrice, editStock, onUpdateProduct]);

  const handleStartInlineEdit = useCallback((product) => {
    setEditingProductId(product.id);
    setEditPrice(product.priceUSD || product.price || 0);
    setEditStock(product.stock || 0);
  }, []);

  // SAVE FULL MODAL EDIT
  const handleSaveFullEdit = (e) => {
    e.preventDefault();
    if (!fullEditProduct) return;

    const parsedPrice = parseFloat(fullEditProduct.price) || 0;
    const parsedOriginal = parseFloat(fullEditProduct.originalPrice) || parsedPrice * 1.2;
    const parsedStock = parseInt(fullEditProduct.stock) || 0;
    const deptObj = DEPARTMENTS.find((d) => d.id === fullEditProduct.departmentId);

    const updatedFields = {
      ...fullEditProduct,
      price: parsedPrice,
      priceUSD: parsedPrice,
      originalPrice: parsedOriginal,
      originalPriceUSD: parsedOriginal,
      stock: parsedStock,
      department: deptObj ? deptObj.name : fullEditProduct.department,
      finishes: fullEditProduct.finishes && fullEditProduct.finishes.length > 0
        ? fullEditProduct.finishes.map((f, i) => i === 0 ? { ...f, price: parsedPrice, stock: parsedStock, image: fullEditProduct.image } : f)
        : [{ name: 'Standard Finish', color: '#090d16', price: parsedPrice, originalPrice: parsedOriginal, image: fullEditProduct.image, stock: parsedStock }]
    };

    onUpdateProduct(fullEditProduct.id, updatedFields);
    setFullEditProduct(null);
  };

  // DELETE PRODUCT CONFIRMATION
  const handleDeleteProductConfirm = useCallback((prod) => {
    if (window.confirm(`Are you sure you want to delete "${prod.name}" from catalog?`)) {
      onDeleteProduct(prod.id);
    }
  }, [onDeleteProduct]);

  // DELETE ORDER CONFIRMATION
  const handleDeleteOrderConfirm = useCallback((orderId) => {
    if (window.confirm(`Are you sure you want to remove Order ${orderId}?`)) {
      if (onDeleteOrder) onDeleteOrder(orderId);
    }
  }, [onDeleteOrder]);

  // FACTORY RESET CONFIRMATION
  const handleResetCatalog = useCallback(() => {
    if (window.confirm('⚠️ Reset catalog to default items? Custom added/edited products will be restored to default.')) {
      if (onResetProducts) onResetProducts();
    }
  }, [onResetProducts]);

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 btn-icon border-slate-700 z-20">
          <X className="w-5 h-5" />
        </button>

        {/* Admin Header */}
        <div className="bg-slate-950 p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-rose-600/20">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-white font-heading">Store Admin Dashboard</h2>
                <span className="badge badge-deal text-xs font-mono">Master Control</span>
              </div>
              <p className="text-xs text-slate-400">Manage catalog products, customer UPI orders, and store metrics</p>
            </div>
          </div>

          {/* Admin Navigation Tabs & Control Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'products'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Products ({totalProductsCount})
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'orders'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Orders ({totalOrdersCount})
              </button>
            </div>

            {onLockAdminSession && (
              <button
                onClick={() => {
                  onLockAdminSession();
                  onClose();
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-rose-950/80 border border-rose-500/40 text-rose-300 hover:bg-rose-900/90 transition-all flex items-center gap-1.5"
                title="Lock Admin Session & Logout Owner"
              >
                <Lock className="w-3.5 h-3.5 text-rose-400" />
                <span>Lock Session</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* TAB 1: OVERVIEW DASHBOARD STATS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stat Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-emerald-400">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Sales</span>
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-black text-white font-mono">{curr.symbol}{(totalRevenueUSD * curr.rate).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +18.4% this month
                  </span>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-cyan-400">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Orders</span>
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-black text-white font-mono">{totalOrdersCount}</p>
                  <span className="text-[10px] text-cyan-400 font-bold">UPI & Cards</span>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-purple-400">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Store Products</span>
                    <Package className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-black text-white font-mono">{totalProductsCount}</p>
                  <span className="text-[10px] text-slate-400">Active Inventory</span>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-pink-400">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Registered Users</span>
                    <Users className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-black text-white font-mono">1,482</p>
                  <span className="text-[10px] text-slate-400">Verified Customers</span>
                </div>

              </div>

              {/* Quick Actions & Store Reset */}
              <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-purple-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Catalog Management & Factory Restore</h4>
                    <p className="text-[11px] text-slate-400">Add custom products or restore catalog to default state</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTab('products');
                      setShowAddForm(true);
                    }}
                    className="btn-primary py-2 px-3 text-xs bg-emerald-500 text-slate-950 font-bold rounded-xl flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Product</span>
                  </button>

                  {onResetProducts && (
                    <button
                      onClick={handleResetCatalog}
                      className="px-3 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Restore Default Catalog</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Recent Activity Orders Table */}
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Recent Store Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-800">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3">Total Amount</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {orders.slice(0, 5).map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-900/50">
                          <td className="p-3 font-mono font-bold text-cyan-400">{ord.id}</td>
                          <td className="p-3 font-bold text-white">{ord.shippingAddress?.fullName || 'Customer'}</td>
                          <td className="p-3 font-mono text-emerald-400">{ord.paymentMethod}</td>
                          <td className="p-3 font-mono font-bold">{curr.symbol}{(ord.totalAmount * curr.rate).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCT MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold uppercase text-slate-300 tracking-wider">Store Product Inventory</h3>
                  <p className="text-xs text-slate-400">Showing {filteredAdminProducts.length} of {products.length} catalog items</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="btn-primary py-2 px-4 text-xs bg-gradient-to-r from-emerald-500 to-cyan-600 text-slate-950 font-black rounded-xl shadow-lg flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{showAddForm ? 'Close Form' : 'Add New Product'}</span>
                  </button>

                  {onResetProducts && (
                    <button
                      onClick={handleResetCatalog}
                      className="px-3 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 flex items-center gap-1.5 shrink-0"
                      title="Reset Catalog to Default Instruments"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden sm:inline">Reset Defaults</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Search & Department Filter Bar for Products Table */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="sm:col-span-8 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by product name, brand, or ID..."
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white outline-none focus:border-purple-500"
                  />
                </div>
                <div className="sm:col-span-4">
                  <select
                    value={productDeptFilter}
                    onChange={(e) => {
                      setProductDeptFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-purple-500 cursor-pointer"
                  >
                    <option value="all">All Departments</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add New Product Form */}
              {showAddForm && (
                <AddProductForm
                  onSave={handleCreateProductSaved}
                  onCancel={() => setShowAddForm(false)}
                />
              )}

              {/* Products Table */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 overflow-x-auto space-y-4">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Image</th>
                      <th className="p-3">Product Name</th>
                      <th className="p-3">Brand</th>
                      <th className="p-3">Department</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {displayedAdminProducts.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="p-8 text-center text-slate-500 font-medium">
                          No products found matching your search.
                        </td>
                      </tr>
                    ) : (
                      displayedAdminProducts.map((p) => (
                        <ProductRow
                          key={p.id}
                          product={p}
                          curr={curr}
                          isInlineEditing={editingProductId === p.id}
                          editPrice={editPrice}
                          editStock={editStock}
                          setEditPrice={setEditPrice}
                          setEditStock={setEditStock}
                          onStartInlineEdit={handleStartInlineEdit}
                          onSaveInlineEdit={handleSaveInlineEdit}
                          onOpenFullEdit={(prod) => setFullEditProduct({ ...prod })}
                          onDelete={handleDeleteProductConfirm}
                        />
                      ))
                    )}
                  </tbody>
                </table>

                {/* High-Performance Pagination Bar */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
                    <span className="text-slate-400 font-medium">
                      Showing <strong className="text-cyan-400">{(currentPage - 1) * pageSize + 1}</strong> to <strong className="text-cyan-400">{Math.min(currentPage * pageSize, filteredAdminProducts.length)}</strong> of <strong className="text-white">{filteredAdminProducts.length.toLocaleString()}</strong> items
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-bold"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Prev</span>
                      </button>

                      <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-mono font-bold">
                        Page {currentPage} of {totalPages}
                      </span>

                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-bold"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h3 className="text-sm font-bold uppercase text-slate-300 tracking-wider">Customer Orders & Delivery Status</h3>
                
                {/* Search Orders Input */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Filter orders by ID or customer..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer Details</th>
                      <th className="p-3">Payment Method & Ref</th>
                      <th className="p-3">Total Amount</th>
                      <th className="p-3">Update Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredAdminOrders.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-slate-500 font-medium">
                          No customer orders found.
                        </td>
                      </tr>
                    ) : (
                      filteredAdminOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-900/50">
                          <td className="p-3 font-mono font-bold text-cyan-400">{ord.id}</td>
                          <td className="p-3 space-y-0.5">
                            <p className="font-bold text-white">{ord.shippingAddress?.fullName || 'Customer'}</p>
                            <p className="text-slate-400 text-[11px]">{ord.shippingAddress?.city || 'India'}, {ord.shippingAddress?.phone || ''}</p>
                          </td>
                          <td className="p-3 space-y-0.5">
                            <span className="font-mono text-emerald-400 font-bold block">{ord.paymentMethod}</span>
                            {ord.upiRefId && <span className="text-[10px] text-amber-400 font-mono block">Ref: {ord.upiRefId}</span>}
                          </td>
                          <td className="p-3 font-mono font-bold text-white">{curr.symbol}{(ord.totalAmount * curr.rate).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                          <td className="p-3">
                            <select
                              value={ord.status}
                              onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                              className="bg-slate-900 border border-slate-700 text-xs font-bold rounded-lg px-2.5 py-1.5 text-cyan-300 outline-none cursor-pointer"
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped (In Transit)</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteOrderConfirm(ord.id)}
                              className="p-1.5 bg-slate-800 text-rose-400 rounded-lg hover:bg-rose-950 border border-rose-900/40"
                              title="Delete Order"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* FULL PRODUCT EDIT MODAL */}
        {fullEditProduct && (
          <div className="overlay z-50">
            <div className="bg-slate-900 border border-purple-500/50 rounded-3xl p-6 w-full max-w-xl relative space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button onClick={() => setFullEditProduct(null)} className="absolute top-4 right-4 btn-icon">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-purple-400">
                <Edit className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white font-heading">Edit Product Specifications</h3>
              </div>

              <form onSubmit={handleSaveFullEdit} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-semibold">Instrument Name</label>
                  <input
                    type="text"
                    required
                    value={fullEditProduct.name}
                    onChange={(e) => setFullEditProduct({ ...fullEditProduct, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-semibold">Brand</label>
                    <input
                      type="text"
                      required
                      value={fullEditProduct.brand}
                      onChange={(e) => setFullEditProduct({ ...fullEditProduct, brand: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold">Department</label>
                    <select
                      value={fullEditProduct.departmentId || 'electric-guitars'}
                      onChange={(e) => setFullEditProduct({ ...fullEditProduct, departmentId: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1 cursor-pointer"
                    >
                      {DEPARTMENTS.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-400 font-semibold">Price (Base USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={fullEditProduct.priceUSD || fullEditProduct.price || 0}
                      onChange={(e) => setFullEditProduct({ ...fullEditProduct, price: e.target.value, priceUSD: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold">Original Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={fullEditProduct.originalPriceUSD || fullEditProduct.originalPrice || 0}
                      onChange={(e) => setFullEditProduct({ ...fullEditProduct, originalPrice: e.target.value, originalPriceUSD: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold">Stock Quantity</label>
                    <input
                      type="number"
                      required
                      value={fullEditProduct.stock || 0}
                      onChange={(e) => setFullEditProduct({ ...fullEditProduct, stock: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold">Image URL</label>
                  <input
                    type="text"
                    required
                    value={fullEditProduct.image || ''}
                    onChange={(e) => setFullEditProduct({ ...fullEditProduct, image: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold">Description</label>
                  <textarea
                    rows="3"
                    value={fullEditProduct.description || ''}
                    onChange={(e) => setFullEditProduct({ ...fullEditProduct, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1 text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setFullEditProduct(null)} className="btn-secondary py-1.5 px-4 text-xs">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary py-1.5 px-5 text-xs bg-purple-600 text-white font-bold rounded-xl shadow-lg">
                    Save Product Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
