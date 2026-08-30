import React, { useState, useEffect, useRef } from 'react';
import SimpleHeader from './components/SimpleHeader';
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

import { PRODUCTS, DEPARTMENTS } from './data/products';

export default function App() {
  // Simple Beginner-Friendly State
  const [products] = useState(PRODUCTS);
  const [cart, setCart] = useState([
    { ...PRODUCTS[0], quantity: 1 }
  ]);
  const [wishlistIds, setWishlistIds] = useState(['guitar-02', 'synth-01']);
  const [compareIds, setCompareIds] = useState(['guitar-01', 'guitar-02']);
  
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState('light');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  // Modal State
  const [activeModal, setActiveModal] = useState(null);
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

  // Simple Cart Functions
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
      title: 'Bundle Outfit Added 🎁',
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

  const handleProceedToCheckout = (summaryObj) => {
    setCheckoutSummary(summaryObj);
    setActiveModal('checkout');
  };

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));
  const compareProducts = products.filter((p) => compareIds.includes(p.id));
  const dealProducts = products.filter((p) => p.isDealOfDay);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 md:pb-0">
      
      {/* Simple Header Bar */}
      <SimpleHeader
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        openCart={() => setActiveModal('cart')}
        openWishlist={() => setActiveModal('wishlist')}
        openVirtualStudio={() => setActiveModal('virtualStudio')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* Multi-Slide Hero Banner */}
        <HeroSection
          openVirtualStudio={() => setActiveModal('virtualStudio')}
          scrollToCatalog={scrollToCatalog}
        />

        {/* 14 Department Category Hub */}
        <DepartmentCategoryHub
          selectedDepartment={selectedDepartment}
          onSelectDepartment={(deptId) => setSelectedDepartment(deptId)}
          scrollToCatalog={scrollToCatalog}
        />

        {/* Big Deals of the Day */}
        <DealsSection
          dealProducts={dealProducts}
          currency={currency}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => {
            setQuickViewProduct(p);
            setActiveModal('quickView');
          }}
        />

        {/* Studio Combo Bundles */}
        <StudioBundleSection
          currency={currency}
          onAddBundleToCart={handleAddBundleToCart}
        />

        {/* Products Store Catalog */}
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

        {/* Customer Reviews */}
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

      {/* Drawers & Modals */}
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
        cartItems={cart}
        summary={checkoutSummary}
        currency={currency}
        onClearCart={handleClearCart}
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
