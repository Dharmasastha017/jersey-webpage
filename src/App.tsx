import React, { useState, useEffect, useMemo, useRef } from 'react';
import { JERSEYS_DATA } from './data/jerseys';
import { Jersey, CartItem, KitEdition, OrderConfirmation, League } from './types/jersey';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { JerseyCard } from './components/JerseyCard';
import { JerseyCustomizerModal } from './components/JerseyCustomizerModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AuthenticityBanner } from './components/AuthenticityBanner';
import { Footer } from './components/Footer';
import { Search, SlidersHorizontal, Sparkles, X, ChevronDown, Check } from 'lucide-react';

export default function App() {
  // Navigation & Filtering
  const [activeCategory, setActiveCategory] = useState<League>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEdition, setSelectedEdition] = useState<'All' | KitEdition>('All');
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'year-desc'>('featured');
  
  // Modals & Panels
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [customizerInitialJersey, setCustomizerInitialJersey] = useState<Jersey | null>(null);
  const [selectedJerseyForDetail, setSelectedJerseyForDetail] = useState<Jersey | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Cart & Promo
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('curva_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [discountRate, setDiscountRate] = useState<number>(0);
  const [bannerDismissed, setBannerDismissed] = useState<boolean>(false);

  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('curva_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Handle Add to Cart
  const handleAddToCart = (
    jersey: Jersey,
    size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL',
    edition: KitEdition,
    customization?: {
      name: string;
      number: string;
      fontStyle: 'modern' | 'retro-block' | 'continental';
      sleeveBadge?: string;
    }
  ) => {
    const customKey = customization
      ? `${customization.name}-${customization.number}-${customization.sleeveBadge || ''}`
      : 'plain';
    const itemId = `${jersey.id}-${size}-${edition}-${customKey}`;

    // Calculate item unit price
    let unitPrice = jersey.price;
    if (customization?.name) unitPrice += 15;
    if (customization?.sleeveBadge) unitPrice += 6;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          jersey,
          size,
          edition,
          customization,
          quantity: 1,
          unitPrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyPromo = (code: string): boolean => {
    if (code.trim().toUpperCase() === 'CURVA10') {
      setDiscountRate(0.1);
      return true;
    }
    return false;
  };

  const handleOrderSuccess = (order: OrderConfirmation) => {
    setCart([]);
  };

  // Filtered & Sorted Jerseys
  const filteredJerseys = useMemo(() => {
    return JERSEYS_DATA.filter((jersey) => {
      // League / Category
      if (activeCategory !== 'All' && jersey.league !== activeCategory) {
        return false;
      }
      // Edition
      if (selectedEdition !== 'All' && jersey.edition !== selectedEdition) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesClub = jersey.club.toLowerCase().includes(query);
        const matchesTitle = jersey.title.toLowerCase().includes(query);
        const matchesSeason = jersey.season.toLowerCase().includes(query);
        const matchesPlayer = jersey.playerPresets.some((p) =>
          p.name.toLowerCase().includes(query)
        );
        if (!matchesClub && !matchesTitle && !matchesSeason && !matchesPlayer) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'year-desc') return b.season.localeCompare(a.season);
      // default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [activeCategory, selectedEdition, searchQuery, sortOption]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discount = Math.round(subtotal * discountRate);
  const shipping = subtotal >= 120 || subtotal === 0 ? 0 : 12;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#f1f3f7] flex flex-col">
      
      {/* Slim Top Dismissible Banner (Section 2.C Promotional Restraint, <= 40px) */}
      {!bannerDismissed && (
        <div className="bg-[#ff3b30] text-white px-4 py-2 text-xs font-semibold flex items-center justify-between z-50">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-center truncate">
            <span>⚡️ MATCHDAY SPECIAL: Free DHL Express Shipping over $120 · Use code <strong>CURVA10</strong> for 10% off</span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            className="p-1 hover:bg-black/10 rounded cursor-pointer shrink-0 ml-2"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Strict 3-Zone Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomizer={() => {
          setCustomizerInitialJersey(null);
          setIsCustomizerOpen(true);
        }}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat as League);
          scrollToCatalog();
        }}
      />

      <main className="flex-1">
        {/* Campaign Hero Showcase */}
        <Hero
          onScrollToCatalog={scrollToCatalog}
          onOpenCustomizer={() => {
            setCustomizerInitialJersey(null);
            setIsCustomizerOpen(true);
          }}
        />

        {/* Product Catalog Section */}
        <section ref={catalogRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          
          {/* Header & Filter Controls Bar */}
          <div className="space-y-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#ff3b30] tracking-wider">
                  <span>Matchday Collection</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-400 tabular-nums">{filteredJerseys.length} Available Shirts</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                  Curated Matchday & Retro Shirts
                </h2>
              </div>

              {/* Search & Sort Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search Bar */}
                <div className="relative min-w-[220px] flex-1 sm:flex-initial">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search club, player, year..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#141822] border border-[#242c3c] focus:border-[#ff3b30] rounded-lg pl-9 pr-8 py-2 text-xs text-white outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as any)}
                    className="bg-[#141822] border border-[#242c3c] focus:border-[#ff3b30] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none cursor-pointer appearance-none pr-8"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="year-desc">Release Season</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Interactive Filter Tabs / Segmented Controls (Section 1.A DO) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#1d2330]">
              
              {/* League Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {(['All', 'Premier League', 'La Liga', 'Retro Archive', 'International'] as const).map(
                  (league) => (
                    <button
                      key={league}
                      onClick={() => setActiveCategory(league)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                        activeCategory === league
                          ? 'bg-white text-slate-950 shadow-sm'
                          : 'bg-[#141822] text-slate-400 hover:text-white border border-[#202737]'
                      }`}
                    >
                      {league === 'All' ? 'All Competitions' : league}
                    </button>
                  )
                )}
              </div>

              {/* Edition Segmented Control */}
              <div className="flex items-center gap-1 bg-[#131722] p-1 rounded-lg border border-[#222938]">
                <button
                  onClick={() => setSelectedEdition('All')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedEdition === 'All'
                      ? 'bg-[#222a3a] text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All Fits
                </button>
                <button
                  onClick={() => setSelectedEdition('Matchday Player Issue')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedEdition === 'Matchday Player Issue'
                      ? 'bg-[#222a3a] text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Player Issue
                </button>
                <button
                  onClick={() => setSelectedEdition('Stadium Replica')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedEdition === 'Stadium Replica'
                      ? 'bg-[#222a3a] text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Stadium Replica
                </button>
              </div>

            </div>
          </div>

          {/* Product Grid (3 columns desktop, 2 tablet, 1 mobile) */}
          {filteredJerseys.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredJerseys.map((jersey) => (
                <JerseyCard
                  key={jersey.id}
                  jersey={jersey}
                  onSelect={(j) => setSelectedJerseyForDetail(j)}
                  onQuickCustomize={(j) => {
                    setCustomizerInitialJersey(j);
                    setIsCustomizerOpen(true);
                  }}
                  onQuickAdd={(j) => {
                    handleAddToCart(j, 'L', j.edition);
                  }}
                />
              ))}
            </div>
          ) : (
            /* Empty Filter / Search State */
            <div className="py-16 text-center bg-[#10131c] rounded-2xl border border-[#202737] p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#181d28] border border-[#273245] flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-display">No jerseys match your filters</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try searching for another team (e.g. Real Madrid, Arsenal, Argentina), or reset your filter settings.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSelectedEdition('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#ff3b30] hover:bg-[#e03429] rounded-lg transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </section>

        {/* Craftsmanship & Authenticity Banner */}
        <AuthenticityBanner
          onOpenCustomizer={() => {
            setCustomizerInitialJersey(null);
            setIsCustomizerOpen(true);
          }}
        />

      </main>

      {/* Floating Action Button for Kit Customizer Studio (Mobile / Quick access) */}
      <button
        onClick={() => {
          setCustomizerInitialJersey(null);
          setIsCustomizerOpen(true);
        }}
        className="fixed bottom-6 right-6 z-30 lg:hidden px-4 py-3 bg-[#ff3b30] text-white font-bold text-xs rounded-full shadow-2xl flex items-center gap-2 border border-white/20 active:scale-95 transition-transform cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span>Kit Customizer</span>
      </button>

      {/* Editorial Footer */}
      <Footer
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat as League);
          scrollToCatalog();
        }}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        discountRate={discountRate}
        onApplyPromo={handleApplyPromo}
      />

      <JerseyCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        jerseys={JERSEYS_DATA}
        initialJersey={customizerInitialJersey}
        onAddToCart={handleAddToCart}
      />

      <ProductDetailModal
        jersey={selectedJerseyForDetail}
        onClose={() => setSelectedJerseyForDetail(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => {
          setIsSizeGuideOpen(true);
        }}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        subtotal={subtotal}
        discount={discount}
        shipping={shipping}
        total={grandTotal}
        onOrderSuccess={handleOrderSuccess}
      />

    </div>
  );
}
