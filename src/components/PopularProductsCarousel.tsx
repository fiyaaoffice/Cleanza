import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

export const PopularProductsCarousel: React.FC = () => {
  const { products, navigateTo, addToCart, language } = useStore();
  const featuredProducts = products.filter((p) => p.isFeatured || p.badge === 'BEST SELLER');

  const [currentIndex, setCurrentIndex] = useState(0);

  if (featuredProducts.length === 0) return null;

  const currentProduct = featuredProducts[currentIndex % featuredProducts.length];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  return (
    <section className="py-16 bg-[#1A1E19] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Left Dark Content Panel */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-[#232B21] relative z-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A2DB38] mb-3 block">
                {language === 'ID' ? 'Produk Unggulan Cleanza' : 'Cleanza Spotlight'}
              </span>

              <span className="inline-block bg-[#3d4d38] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-4">
                {currentProduct.category}
              </span>

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4 leading-snug">
                {currentProduct.name}
              </h2>

              <p className="text-sm text-gray-300 font-light leading-relaxed mb-6 line-clamp-3">
                {currentProduct.description}
              </p>

              <div className="flex items-center space-x-4 mb-8">
                <span className="text-2xl font-bold text-[#A2DB38]">
                  {currentProduct.formattedPrice}
                </span>
                <span className="text-xs text-gray-400 border-l border-gray-600 pl-4">
                  Ukuran: {currentProduct.volume}
                </span>
              </div>
            </div>

            {/* Controls and Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigateTo('product-detail', currentProduct.slug)}
                  className="bg-[#3d4d38] hover:bg-[#A2DB38] hover:text-black text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition"
                >
                  {language === 'ID' ? 'LIHAT DETAIL' : 'DISCOVER MORE'}
                </button>
                {currentProduct.badge !== 'COMING SOON' && (
                  <button
                    onClick={() => addToCart(currentProduct)}
                    className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
                    title="Tambah ke Keranjang"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full border border-white/20 hover:border-[#A2DB38] hover:text-[#A2DB38] transition"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs text-gray-400 font-mono px-2">
                  0{currentIndex + 1} / 0{featuredProducts.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full border border-white/20 hover:border-[#A2DB38] hover:text-[#A2DB38] transition"
                  aria-label="Next product"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Product Showcase Image */}
          <div className="relative min-h-[320px] lg:min-h-[500px] bg-[#121612] flex items-center justify-center p-8">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="max-h-[420px] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] scale-105 hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] text-gray-300 border border-white/10">
              Cleanza Ultra Degreaser™ Formula
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
