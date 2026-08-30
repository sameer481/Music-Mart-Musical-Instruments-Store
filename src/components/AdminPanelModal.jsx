import React, { useState } from 'react';
import './AdminPanelModal.css';
import { X, ShieldCheck, Package, ShoppingBag, Users, DollarSign, Plus, Trash2, Edit, Save, CheckCircle2, TrendingUp, RefreshCw } from 'lucide-react';
import { CURRENCIES, DEPARTMENTS } from '../data/products';

export default function AdminPanelModal({
  isOpen,
  onClose,
  products = [],
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  orders = [],
  onUpdateOrderStatus,
  currency = 'USD'
}) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'products', 'orders'
  
  // Add Product Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: 'Fender',
    price: 499,
    originalPrice: 599,
    departmentId: 'guitars',
    stock: 15,
    rating: 4.8,
    reviewsCount: 24,
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80',
    audioType: 'guitar',
    audioFreq: 329.63
  });

  // Inline Product Editing State
  const [editingProductId, setEditingProductId] = useState(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editStock, setEditStock] = useState(0);

  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  // Stats calculation
  const totalRevenueUSD = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const createdObj = {
      ...newProduct,
      id: 'custom-' + Date.now(),
      price: parseFloat(newProduct.price),
      originalPrice: parseFloat(newProduct.originalPrice),
      stock: parseInt(newProduct.stock)
    };
    onAddProduct(createdObj);
    setShowAddForm(false);
    alert('New Instrument Product Created Successfully!');
  };

  const handleSaveInlineEdit = (prodId) => {
    onUpdateProduct(prodId, { price: parseFloat(editPrice), stock: parseInt(editStock) });
    setEditingProductId(null);
  };

  return (
    <div className="overlay">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 btn-icon border-slate-700 z-20">
          <X className="w-5 h-5" />
        </button>

        {/* Admin Header */}
        <div className="bg-slate-950 p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

          {/* Admin Navigation Tabs */}
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
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          
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
                      {orders.map((ord) => (
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
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase text-slate-300 tracking-wider">Store Product Inventory</h3>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="btn-primary py-2 px-4 text-xs bg-gradient-to-r from-emerald-500 to-cyan-600 text-slate-950 font-black rounded-xl shadow-lg flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Add New Product Form Modal */}
              {showAddForm && (
                <form onSubmit={handleCreateProduct} className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/40 space-y-4">
                  <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Create New Instrument Entry</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-slate-400 font-semibold">Instrument Name</label>
                      <input
                        type="text"
                        required
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="e.g. Gibson Les Paul Standard"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-semibold">Brand</label>
                      <input
                        type="text"
                        required
                        value={newProduct.brand}
                        onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-semibold">Department</label>
                      <select
                        value={newProduct.departmentId}
                        onChange={(e) => setNewProduct({ ...newProduct, departmentId: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1"
                      >
                        {DEPARTMENTS.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-400 font-semibold">Price (₹ INR / Base USD)</label>
                      <input
                        type="number"
                        required
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-semibold">Stock Quantity</label>
                      <input
                        type="number"
                        required
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-semibold">Image URL</label>
                      <input
                        type="text"
                        required
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary py-1.5 px-4 text-xs">
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary py-1.5 px-5 text-xs bg-emerald-500 text-slate-950 font-bold">
                      Save & Publish
                    </button>
                  </div>
                </form>
              )}

              {/* Products Table */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Image</th>
                      <th className="p-3">Product Name</th>
                      <th className="p-3">Brand</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/50">
                        <td className="p-2">
                          <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-slate-900" />
                        </td>
                        <td className="p-3 font-bold text-white max-w-xs truncate">{p.name}</td>
                        <td className="p-3 text-slate-400">{p.brand}</td>
                        <td className="p-3 font-mono font-bold text-amber-400">
                          {editingProductId === p.id ? (
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className="w-20 bg-slate-900 border border-cyan-400 rounded px-2 py-0.5 text-white"
                            />
                          ) : (
                            `${curr.symbol}${((p.priceUSD || p.price || 0) * curr.rate).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
                          )}
                        </td>
                        <td className="p-3">
                          {editingProductId === p.id ? (
                            <input
                              type="number"
                              value={editStock}
                              onChange={(e) => setEditStock(e.target.value)}
                              className="w-16 bg-slate-900 border border-cyan-400 rounded px-2 py-0.5 text-white"
                            />
                          ) : (
                            <span className={`px-2 py-0.5 rounded font-bold ${p.stock > 0 ? 'text-emerald-400 bg-emerald-950/40' : 'text-rose-400 bg-rose-950/40'}`}>
                              {p.stock || 10} in stock
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right space-x-2">
                          {editingProductId === p.id ? (
                            <button
                              onClick={() => handleSaveInlineEdit(p.id)}
                              className="p-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-500"
                              title="Save Edit"
                            >
                              <Save className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingProductId(p.id);
                                setEditPrice(p.priceUSD || p.price || 0);
                                setEditStock(p.stock || 10);
                              }}
                              className="p-1.5 bg-slate-800 text-cyan-400 rounded hover:bg-slate-700"
                              title="Edit Price/Stock"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-1.5 bg-slate-800 text-rose-400 rounded hover:bg-rose-950"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase text-slate-300 tracking-wider">Customer Orders & Delivery Status</h3>
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer Details</th>
                      <th className="p-3">Payment Method & Ref</th>
                      <th className="p-3">Total Amount</th>
                      <th className="p-3">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-900/50">
                        <td className="p-3 font-mono font-bold text-cyan-400">{ord.id}</td>
                        <td className="p-3 space-y-0.5">
                          <p className="font-bold text-white">{ord.shippingAddress?.fullName}</p>
                          <p className="text-slate-400 text-[11px]">{ord.shippingAddress?.city}, {ord.shippingAddress?.phone}</p>
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
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
