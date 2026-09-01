import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DepartmentCategoryHub from './components/DepartmentCategoryHub';
import StudioBundleSection from './components/StudioBundleSection';
import VirtualStudioModal from './components/VirtualStudioModal';
import ProductCatalog from './components/ProductCatalog';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import WishlistDrawer from './components/WishlistDrawer';
import CompareModal from './components/CompareModal';
import DealsSection from './components/DealsSection';
import CustomerReviews from './components/CustomerReviews';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import Toast from './components/Toast';

// New Features: Order Tracking, Admin Panel & User Profile
import OrderTrackingModal from './components/OrderTrackingModal';
import AdminPanelModal from './components/AdminPanelModal';
import UserProfileModal from './components/UserProfileModal';
import AdminAuthModal from './components/AdminAuthModal';

import { PRODUCTS, DEPARTMENTS } from './data/products';

export default function App() {
  const [products, setProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState([
    { ...PRODUCTS[0], quantity: 1 }
  ]);
  const [wishlistIds, setWishlistIds] = useState(['guitar-02', 'synth-01']);
  const [compareIds, setCompareIds] = useState(['guitar-01', 'guitar-02']);
  
  // Orders & Auth State
  const [ordersList, setOrdersList] = useState([
    {
      id: 'MM-948201',
      date: '2026-08-27',
      items: [{ ...PRODUCTS[0], quantity: 1 }],
      totalAmount: 1499,
      status: 'Shipped',
      paymentMethod: 'UPI (GPAY)',
      upiRefId: 'UPI-849204918239',
      estimatedDelivery: 'Tomorrow by 5 PM',
      shippingAddress: {
        fullName: 'Sameer Kumar',
        address: '42 Music Avenue, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        zip: '400050',
        phone: '+91 98765 43210'
      }
    }
  ]);

  const [currentUser, setCurrentUser] = useState({
    name: 'Sameer Kumar',
    email: 'sameer@example.com',
    phone: '+91 98765 43210',
    role: 'customer'
  });

  const [currency, setCurrency] = useState('INR');
  const [theme, setTheme] = useState('dark');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  // Modal State
  const [activeModal, setActiveModal] = useState(null); // 'cart', 'checkout', 'wishlist', 'compare', 'virtualStudio', 'quickView', 'tracking', 'admin', 'adminAuth', 'profile'
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('musicmart_admin_authenticated') === 'true';
  });
  const [activeTrackingId, setActiveTrackingId] = useState('MM-948201');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [checkoutSummary, setCheckoutSummary] = useState({
    subtotalUSD: 0,
    discountUSD: 0,
    estimatedTaxUSD: 0,
    totalUSD: 0
  });

  const [toast, setToast] = useState(null);

  const catalogRef = useRef(null);

  // Apply Theme Attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (toastObj) => {
    setToast(toastObj);
  };

  // Admin Access & Authentication Handlers
  const handleOpenAdminPanel = () => {
    if (isAdminAuthenticated) {
      setActiveModal('admin');
    } else {
      setActiveModal('adminAuth');
    }
  };

  const handleAdminAuthenticated = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('musicmart_admin_authenticated', 'true');
    setActiveModal('admin');
    showToast({ title: 'Owner Verified 🔓', message: 'Admin Panel master controls unlocked.' });
  };

  const handleLockAdminSession = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('musicmart_admin_authenticated');
    showToast({ title: 'Admin Session Locked 🔒', message: 'Owner access signed out.' });
  };

  // Product Inventory Admin Handlers
  const handleAddProduct = (newProd) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast({ title: 'Product Added 📦', message: `${newProd.name} added to catalog.` });
  };

  const handleUpdateProduct = (prodId, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === prodId ? { ...p, ...updatedFields } : p))
    );
    showToast({ title: 'Product Updated ✏️', message: 'Price and inventory saved.' });
  };

  const handleDeleteProduct = (prodId) => {
    setProducts((prev) => prev.filter((p) => p.id !== prodId));
    showToast({ title: 'Product Deleted 🗑️', message: 'Item removed from store.' });
  };

  // Order Status Handler
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrdersList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast({ title: 'Order Updated 🚚', message: `Order ${orderId} marked as ${newStatus}` });
  };

  // Cart Functions
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    showToast({
      title: 'Added to Cart 🛒',
      message: `${product.name} added to your cart.`
    });
  };

  const handleAddBundleToCart = (bundle) => {
    showToast({
      title: 'Bundle Added 🎁',
      message: `${bundle.title} added with discount!`
    });
    handleAddToCart(PRODUCTS[0]);
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Functions
  const handleToggleWishlist = (product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast({ title: 'Wishlist Updated', message: `Removed ${product.name}` });
        return prev.filter((id) => id !== product.id);
      } else {
        showToast({ title: 'Saved to Wishlist ❤️', message: `Added ${product.name}` });
        return [...prev, product.id];
      }
    });
  };

  // Compare Functions
  const handleToggleCompare = (product) => {
    setCompareIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast({ title: 'Removed from Compare', message: `Removed ${product.name}` });
        return prev.filter((id) => id !== product.id);
      } else {
        if (prev.length >= 3) {
          showToast({ title: 'Compare Limit', message: 'You can compare up to 3 instruments.' });
          return prev;
        }
        showToast({ title: 'Added to Compare 📊', message: `Added ${product.name}` });
        return [...prev, product.id];
      }
    });
  };

  const scrollToCatalog = () => {
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [checkoutCartItems, setCheckoutCartItems] = useState([]);

  const handleProceedToCheckout = (selectedItems, summaryObj) => {
    const itemsToPurchase = Array.isArray(selectedItems) && selectedItems.length > 0 ? selectedItems : cart;
    setCheckoutCartItems(itemsToPurchase);
    setCheckoutSummary(summaryObj);
    setActiveModal('checkout');
  };

  const handleOrderPlaced = (newOrderObj) => {
    setOrdersList((prev) => [newOrderObj, ...prev]);
    setActiveTrackingId(newOrderObj.id);
    
    // Remove ONLY the purchased items from cart
    if (newOrderObj.items && newOrderObj.items.length > 0) {
      const purchasedIds = newOrderObj.items.map((item) => item.id);
      setCart((prev) => prev.filter((item) => !purchasedIds.includes(item.id)));
    } else {
      setCart([]);
    }

    showToast({
      title: 'Payment Confirmed 🎉',
      message: `Order #${newOrderObj.id} is now being processed.`
    });
  };

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));
  const compareProducts = products.filter((p) => compareIds.includes(p.id));
  const dealProducts = products.filter((p) => p.isDealOfDay);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 pb-16 md:pb-0">
      
      {/* Real E-Commerce Store Header Navigation */}
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        compareCount={compareIds.length}
        openCart={() => setActiveModal('cart')}
        openWishlist={() => setActiveModal('wishlist')}
        openCompare={() => setActiveModal('compare')}
        openVirtualStudio={() => setActiveModal('virtualStudio')}
        openOrderTracking={() => setActiveModal('tracking')}
        openAdminPanel={handleOpenAdminPanel}
        openUserProfile={() => setActiveModal('profile')}
        currentUser={currentUser}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        currency={currency}
        setCurrency={setCurrency}
        products={products}
        scrollToCatalog={scrollToCatalog}
      />

      {/* Main E-Commerce Page Layout */}
      <main className="flex-1 space-y-2">
        {/* 1. Hero Showcase Banner */}
        <HeroSection
          openVirtualStudio={() => setActiveModal('virtualStudio')}
          scrollToCatalog={scrollToCatalog}
        />

        {/* 2. Store Department Category Hub */}
        <DepartmentCategoryHub
          selectedDepartment={selectedDepartment}
          onSelectDepartment={(deptId) => setSelectedDepartment(deptId)}
          scrollToCatalog={scrollToCatalog}
        />

        {/* 3. Flash Deals of the Day */}
        <DealsSection
          dealProducts={dealProducts}
          currency={currency}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => {
            setQuickViewProduct(p);
            setActiveModal('quickView');
          }}
        />

        {/* 4. Studio Combo Equipment Bundles */}
        <StudioBundleSection
          currency={currency}
          onAddBundleToCart={handleAddBundleToCart}
        />

        {/* 5. Main Store Product Catalog */}
        <ProductCatalog
          products={products}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currency={currency}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => {
            setQuickViewProduct(p);
            setActiveModal('quickView');
          }}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          compareIds={compareIds}
          onToggleCompare={handleToggleCompare}
          catalogRef={catalogRef}
        />

        {/* 6. Customer Reviews & Ratings */}
        <CustomerReviews />
      </main>

      {/* Footer */}
      <Footer
        onShowToast={showToast}
        openVirtualStudio={() => setActiveModal('virtualStudio')}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        openCart={() => setActiveModal('cart')}
        openWishlist={() => setActiveModal('wishlist')}
        openVirtualStudio={() => setActiveModal('virtualStudio')}
        scrollToCatalog={scrollToCatalog}
      />

      {/* Modals & Drawers */}
      <VirtualStudioModal
        isOpen={activeModal === 'virtualStudio'}
        onClose={() => setActiveModal(null)}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setActiveModal(null)}
        currency={currency}
        onAddToCart={handleAddToCart}
        isInWishlist={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={activeModal === 'cart'}
        onClose={() => setActiveModal(null)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currency={currency}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={activeModal === 'checkout'}
        onClose={() => setActiveModal(null)}
        cartItems={checkoutCartItems.length > 0 ? checkoutCartItems : cart}
        summary={checkoutSummary}
        currency={currency}
        onClearCart={() => {}}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={activeModal === 'tracking'}
        onClose={() => setActiveModal(null)}
        orders={ordersList}
        activeTrackingId={activeTrackingId}
        currency={currency}
      />

      {/* Admin Security Auth Modal */}
      <AdminAuthModal
        isOpen={activeModal === 'adminAuth'}
        onClose={() => setActiveModal(null)}
        onAuthenticate={handleAdminAuthenticated}
        ownerEmail={currentUser ? currentUser.email : 'sameer@example.com'}
      />

      {/* Admin Panel Master Modal */}
      <AdminPanelModal
        isOpen={activeModal === 'admin'}
        onClose={() => setActiveModal(null)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        orders={ordersList}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        currency={currency}
        onLockAdminSession={handleLockAdminSession}
      />

      {/* User Profile & Register Modal */}
      <UserProfileModal
        isOpen={activeModal === 'profile'}
        onClose={() => setActiveModal(null)}
        currentUser={currentUser}
        onLogin={(userObj) => setCurrentUser(userObj)}
        onLogout={() => setCurrentUser(null)}
        userOrders={ordersList}
        onOpenTracking={(id) => {
          setActiveTrackingId(id);
          setActiveModal('tracking');
        }}
        onOpenAdmin={handleOpenAdminPanel}
        currency={currency}
      />

      <WishlistDrawer
        isOpen={activeModal === 'wishlist'}
        onClose={() => setActiveModal(null)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={(id) => setWishlistIds((prev) => prev.filter((i) => i !== id))}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      <CompareModal
        isOpen={activeModal === 'compare'}
        onClose={() => setActiveModal(null)}
        compareProducts={compareProducts}
        onRemoveFromCompare={(id) => setCompareIds((prev) => prev.filter((i) => i !== id))}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Toast Alert */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
