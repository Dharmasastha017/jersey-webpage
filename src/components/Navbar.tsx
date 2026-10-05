import React from 'react';
import { ShoppingBag, Search, Sparkles, SlidersHorizontal } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCustomizer: () => void;
  onOpenSizeGuide: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenCustomizer,
  onOpenSizeGuide,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0c0e12]/90 backdrop-blur-md border-b border-[#212631] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-display uppercase flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#ff3b30] outline-none"
          >
            <span>CURVA</span>
            <span className="text-[#ff3b30]">KITS</span>
          </a>

          {/* Zone 2: 4-5 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => onSelectCategory('All')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeCategory === 'All' ? 'text-white font-semibold' : ''
              }`}
            >
              All Shirts
            </button>
            <button
              onClick={() => onSelectCategory('Premier League')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeCategory === 'Premier League' ? 'text-white font-semibold' : ''
              }`}
            >
              Premier League
            </button>
            <button
              onClick={() => onSelectCategory('La Liga')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeCategory === 'La Liga' ? 'text-white font-semibold' : ''
              }`}
            >
              La Liga
            </button>
            <button
              onClick={() => onSelectCategory('Retro Archive')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeCategory === 'Retro Archive' ? 'text-white font-semibold' : ''
              }`}
            >
              Retro Vault
            </button>
            <button
              onClick={() => onSelectCategory('International')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeCategory === 'International' ? 'text-white font-semibold' : ''
              }`}
            >
              National Teams
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Customizer Quick Launch */}
            <button
              onClick={onOpenCustomizer}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#f1f3f7] bg-[#1a1f2c] border border-[#2b3345] hover:border-[#ff3b30]/60 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff3b30]" />
              <span>Kit Customizer</span>
            </button>

            {/* Sizing modal link */}
            <button
              onClick={onOpenSizeGuide}
              className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Fit Guide
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              aria-label={`Shopping bag with ${cartCount} items`}
              className="relative p-2.5 text-slate-200 hover:text-white bg-[#161a22] hover:bg-[#1f2532] border border-[#2b3345] rounded-md transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#ff3b30]"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ff3b30] text-white text-[11px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center tabular-nums shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
