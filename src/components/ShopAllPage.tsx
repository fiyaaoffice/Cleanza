import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { LayoutGrid, List, Droplets } from 'lucide-react';

export const ShopAllPage: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory, navigateTo, addToCart, cmsConfig } = useStore();

  const [localLayout, setLocalLayout] = useState<'grid' | 'list'>(cmsConfig.layoutMode || 'grid');

  const categories = [
    'All',
    'Kemasan Rumah Tangga',
    'Cleanza Profesional',
    'Varian Lemon'
  ];

  // Filter products based on category
  const filteredProducts = products.filter((p) => {
    return selectedCategory === 'All' ? true : p.category === selectedCategory;
  });

  return (
    <div className="bg-[#F2F9F3] min-h-screen pb-20 text-[#1D241B]">
      {/* 1. Header Banner */}
      <div className="relative bg-[#0E2915] text-white py-16 px-4 overflow-hidden mb-10 border-b border-[#239B4C]/40">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&q=80&w=1600"
            alt="Cleanza Products"
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFD000] mb-2 flex items-center space-x-2">
            <Droplets className="w-3.5 h-3.5 text-[#FFD000]" />
            <span>Katalog Resmi Cleanza Indonesia</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
            {cmsConfig.shopPage?.title || 'Cairan Pencuci Piring Cleanza'}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 font-light max-w-2xl leading-relaxed">
            {cmsConfig.shopPage?.description || 'Formula konsentrat tinggi peluruh minyak & bau amis. Tersedia kemasan praktis rumah tangga (450ml & 1000ml) dan jeriken hemat Cleanza Profesional (5000ml).'}
          </p>
        </div>
      </div>

      {/* 2. Filter Bar & Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E8E2]">
          {/* Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition border ${
                  selectedCategory === cat
                    ? 'bg-[#239B4C] text-white border-[#239B4C] font-bold shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                }`}
              >
                {cat === 'All' ? 'Semua Produk' : cat}
              </button>
            ))}
          </div>

          {/* Layout Toggle (Grid vs List) */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setLocalLayout('grid')}
              className={`p-2 rounded-lg border ${
                localLayout === 'grid'
                  ? 'bg-[#239B4C] text-white border-[#239B4C]'
                  : 'bg-white text-gray-600 border-gray-200'
              }`}
              title="Grid Layout"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLocalLayout('list')}
              className={`p-2 rounded-lg border ${
                localLayout === 'list'
                  ? 'bg-[#239B4C] text-white border-[#239B4C]'
                  : 'bg-white text-gray-600 border-gray-200'
              }`}
              title="List Layout"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="text-xs text-gray-500 my-4 flex items-center justify-between">
          <span>Menampilkan {filteredProducts.length} produk Cleanza</span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-[#239B4C] font-bold underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Product Catalog Display */}
        {localLayout === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          /* List Layout View */
          <div className="space-y-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-[#E5E8E2] p-4 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-24 h-24 object-contain rounded-xl bg-[#F4F5F2] p-2 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#239B4C] uppercase tracking-wider block">
                      {p.category} • {p.volume}
                    </span>
                    <h3
                      onClick={() => navigateTo('product-detail', p.slug)}
                      className="font-bold text-base text-[#1D241B] hover:text-[#239B4C] cursor-pointer transition"
                    >
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1 font-light mt-1">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
                  <span className="font-bold text-base text-[#239B4C]">
                    {p.formattedPrice}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateTo('product-detail', p.slug)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg transition"
                    >
                      Detail
                    </button>
                    {p.badge !== 'COMING SOON' && (
                      <button
                        onClick={() => addToCart(p)}
                        className="bg-[#239B4C] hover:bg-[#165B2D] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg transition shadow-sm"
                      >
                        Beli
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
