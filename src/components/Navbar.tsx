import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { DEFAULT_CLEANZA_LOGO } from '../data/initialData';
import { Search, ShoppingBag, User, Shield, ChevronDown, Menu, X, Droplets, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cmsConfig,
    activePage,
    navigateTo,
    language,
    setLanguage,
    setIsSearchOpen,
    setIsCartOpen,
    cart,
    handleLogoClickAdmin,
    setSelectedCategory
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleShopCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    navigateTo('shop');
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E8E2] text-[#1D241B]">
      {/* Top Announcement Bar */}
      <div className="bg-[#1a1e19] text-[#E5E8E2] text-xs py-2 px-4 overflow-hidden relative border-b border-[#2A3328]">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="hidden md:flex items-center space-x-2 text-white/90">
            <span className="bg-[#239B4C] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
              PROMO
            </span>
            <span>{language === 'ID' ? cmsConfig.promoTextId : cmsConfig.promoText}</span>
          </div>

          {/* Marquee ticker on small screens */}
          <div className="md:hidden w-full overflow-hidden whitespace-nowrap">
            <div className="animate-marquee inline-block">
              <span className="mx-4">{language === 'ID' ? cmsConfig.promoTextId : cmsConfig.promoText}</span>
              <span className="mx-4">•</span>
              <span className="mx-4">Cleanza Varian Jeruk Nipis & Lemon Coming Soon</span>
              <span className="mx-4">•</span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setLanguage('ID')}
              className={`px-2 py-0.5 rounded text-[11px] ${language === 'ID' ? 'font-bold text-white bg-white/20' : 'text-gray-300 hover:text-white'}`}
            >
              ID
            </button>
            <span className="text-gray-600">|</span>
            <button
              onClick={() => setLanguage('EN')}
              className={`px-2 py-0.5 rounded text-[11px] ${language === 'EN' ? 'font-bold text-white bg-white/20' : 'text-gray-300 hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Mobile menu toggle & Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Cleanza Brand Logo Image Only (No Text) */}
          <div
            onClick={() => navigateTo('home')}
            className="cursor-pointer group flex items-center select-none"
            title="Cleanza"
          >
            <img
              src={cmsConfig.logoUrl || DEFAULT_CLEANZA_LOGO}
              alt="Cleanza Brand Logo"
              className="h-10 w-auto max-w-[180px] sm:max-w-[220px] object-contain transition group-hover:scale-105"
            />
          </div>
        </div>

        {/* Middle Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          <button
            onClick={() => navigateTo('shop')}
            className="bg-[#239B4C] hover:bg-[#165B2D] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition shadow-sm flex items-center space-x-1"
          >
            <span>Cleanza Catalog</span>
          </button>

          {/* Shop with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <button
              onClick={() => navigateTo('shop')}
              className={`flex items-center space-x-1 py-5 hover:text-[#239B4C] transition ${
                activePage === 'shop' ? 'text-[#239B4C] font-bold border-b-2 border-[#239B4C]' : ''
              }`}
            >
              <span>{language === 'ID' ? 'Produk Cleanza' : 'Products'}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {shopDropdownOpen && (
              <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-b-xl py-3 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  {language === 'ID' ? 'Kategori Produk' : 'Product Categories'}
                </div>
                <button
                  onClick={() => handleShopCategoryClick('All')}
                  className="w-full text-left px-4 py-2 hover:bg-[#F2F9F3] hover:text-[#239B4C] font-medium"
                >
                  {language === 'ID' ? 'Semua Produk (Shop All)' : 'All Products'}
                </button>
                <button
                  onClick={() => handleShopCategoryClick('Kemasan Rumah Tangga')}
                  className="w-full text-left px-4 py-2 hover:bg-[#F2F9F3] hover:text-[#239B4C]"
                >
                  Kemasan Rumah Tangga (450ml & 1000ml)
                </button>
                <button
                  onClick={() => handleShopCategoryClick('Cleanza Profesional')}
                  className="w-full text-left px-4 py-2 hover:bg-[#F2F9F3] hover:text-[#239B4C]"
                >
                  Cleanza Profesional (5000ml)
                </button>
                <button
                  onClick={() => handleShopCategoryClick('Varian Lemon')}
                  className="w-full text-left px-4 py-2 hover:bg-[#F2F9F3] hover:text-[#239B4C]"
                >
                  Varian Lemon (Coming Soon)
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => navigateTo('our-story')}
            className={`hover:text-[#239B4C] transition ${
              activePage === 'our-story' ? 'text-[#239B4C] font-bold border-b-2 border-[#239B4C] py-5' : ''
            }`}
          >
            Tentang Cleanza
          </button>

          <button
            onClick={() => navigateTo('news')}
            className={`hover:text-[#239B4C] transition ${
              activePage === 'news' ? 'text-[#239B4C] font-bold border-b-2 border-[#239B4C] py-5' : ''
            }`}
          >
            Tips & Berita
          </button>

          <button
            onClick={() => navigateTo('community')}
            className={`hover:text-[#239B4C] transition ${
              activePage === 'community' ? 'text-[#239B4C] font-bold border-b-2 border-[#239B4C] py-5' : ''
            }`}
          >
            Cleanza Profesional
          </button>

          <button
            onClick={() => navigateTo('ingredients')}
            className={`hover:text-[#239B4C] transition ${
              activePage === 'ingredients' ? 'text-[#239B4C] font-bold border-b-2 border-[#239B4C] py-5' : ''
            }`}
          >
            Formula & Kualitas
          </button>
        </nav>

        {/* Right Tools: Search, Cart, Admin */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-gray-600 hover:text-[#239B4C] transition rounded-full hover:bg-gray-100"
            title="Cari Produk Cleanza"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* 1 Single Official Position for Admin Access */}
          <button
            onClick={() => navigateTo('admin')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#239B4C]/10 text-[#239B4C] hover:bg-[#239B4C] hover:text-white rounded-lg text-xs font-bold transition shadow-sm"
            title="Dashboard Admin"
          >
            <Shield className="w-4 h-4" />
            <span>Admin</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-800 hover:text-[#239B4C] transition rounded-full hover:bg-gray-100"
            title="Keranjang Belanja"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#239B4C] text-[#FFD000] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3 font-medium text-sm animate-in fade-in slide-in-from-top-2">
          <div className="pt-2 pb-1 border-b border-gray-100 flex items-center justify-end">
            <div className="flex items-center space-x-2 text-xs">
              <button
                onClick={() => setLanguage('ID')}
                className={`px-2 py-1 rounded ${language === 'ID' ? 'bg-[#239B4C] text-white font-bold' : 'text-gray-600'}`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2 py-1 rounded ${language === 'EN' ? 'bg-[#239B4C] text-white font-bold' : 'text-gray-600'}`}
              >
                EN
              </button>
            </div>
          </div>

          <button
            onClick={() => handleShopCategoryClick('All')}
            className="w-full text-left py-2 font-semibold text-[#3d4d38] border-b border-gray-100"
          >
            Semua Produk Cleanza
          </button>
          <div className="pl-3 space-y-2 text-xs text-gray-600 border-b border-gray-100 pb-2">
            <button onClick={() => handleShopCategoryClick('Kemasan Rumah Tangga')} className="block py-1">
              Kemasan Rumah Tangga (450ml & 1000ml)
            </button>
            <button onClick={() => handleShopCategoryClick('Cleanza Profesional')} className="block py-1">
              Cleanza Profesional (5000ml)
            </button>
            <button onClick={() => handleShopCategoryClick('Varian Lemon')} className="block py-1">
              Varian Lemon (Coming Soon)
            </button>
          </div>

          <button
            onClick={() => {
              navigateTo('our-story');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2"
          >
            Tentang Cleanza
          </button>
          <button
            onClick={() => {
              navigateTo('news');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2"
          >
            Tips & Berita
          </button>
          <button
            onClick={() => {
              navigateTo('community');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2"
          >
            Cleanza Profesional
          </button>
          <button
            onClick={() => {
              navigateTo('ingredients');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2"
          >
            Formula & Kualitas
          </button>
        </div>
      )}
    </header>
  );
};
