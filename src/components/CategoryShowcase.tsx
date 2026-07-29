import React, { useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronRight, ChevronLeft, ArrowUpRight } from 'lucide-react';

interface CategoryItem {
  id?: string;
  name: string;
  titleIndo: string;
  image: string;
  count: string;
}

export const CategoryShowcase: React.FC = () => {
  const { navigateTo, setSelectedCategory, language, cmsConfig } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const defaultCategories: CategoryItem[] = [
    {
      id: 'cat-1',
      name: 'Kemasan Rumah Tangga',
      titleIndo: 'Refill 450ml & Botol 1000ml - Solusi praktis cuci piring harian keluarga dengan formula ekstrak jeruk nipis alami yang lembut di tangan.',
      image: cmsConfig.categoryImages?.['Kemasan Rumah Tangga'] || 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&q=80&w=600',
      count: '2 Produk'
    },
    {
      id: 'cat-2',
      name: 'Cleanza Profesional',
      titleIndo: 'Jeriken 5000ml (5 Liter) - Pilihan hemat resto & katering berdaya angkat lemak pekat instan untuk usaha kuliner.',
      image: cmsConfig.categoryImages?.['Cleanza Profesional'] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
      count: '1 Produk'
    },
    {
      id: 'cat-3',
      name: 'Varian Lemon',
      titleIndo: 'Ekstra Citrus Lemon - Keharuman lemon segar mediterania pembasmi bau amis ikan & minyak membandel.',
      image: cmsConfig.categoryImages?.['Varian Lemon'] || 'https://images.unsplash.com/photo-1534531141161-e41d133a4be3?auto=format&fit=crop&q=80&w=600',
      count: 'Coming Soon'
    }
  ];

  const categoriesToDisplay: CategoryItem[] = (cmsConfig.categoryShowcase?.items && cmsConfig.categoryShowcase.items.length > 0)
    ? cmsConfig.categoryShowcase.items.map((item) => ({
        id: item.id,
        name: item.name,
        titleIndo: item.titleIndo,
        image: cmsConfig.categoryImages?.[item.name] || item.image,
        count: item.count || 'Produk Cleanza'
      }))
    : defaultCategories;

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    navigateTo('shop');
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-[#F2F9F3] border-b border-[#E5E8E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E5E8E2]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1D241B] tracking-tight">
              {cmsConfig.categoryShowcase?.headline ||
                (language === 'ID'
                  ? 'Pilihan Kemasan Cleanza Pencuci Piring'
                  : 'Cleanza Product Lineup')}
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-xl font-light">
              {cmsConfig.categoryShowcase?.description ||
                (language === 'ID'
                  ? 'Tersedia ukuran konsumsi harian keluarga hingga ukuran ekonomis 5000ml untuk usaha kuliner.'
                  : 'From everyday family refills to 5000ml bulk jugs for catering and restaurants.')}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            {/* Desktop & Tablet Navigation Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => scroll('left')}
                className="p-2.5 rounded-full bg-white border border-[#E5E8E2] text-gray-700 hover:text-[#239B4C] hover:border-[#239B4C] hover:shadow-md transition"
                title="Geser Kiri"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2.5 rounded-full bg-white border border-[#E5E8E2] text-gray-700 hover:text-[#239B4C] hover:border-[#239B4C] hover:shadow-md transition"
                title="Geser Kanan"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('All');
                navigateTo('shop');
              }}
              className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-[#239B4C] hover:text-[#165B2D] underline decoration-1 underline-offset-4 transition"
            >
              <span>{language === 'ID' ? 'Lihat Semua' : 'View All'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swipe Hint */}
        <div className="flex items-center justify-between mb-3 text-[11px] text-gray-500 font-medium">
          <span className="flex items-center space-x-1.5 text-[#239B4C]">
            <span>Swipe / Geser ke samping untuk melihat varian kemasan</span>
            <span>➔</span>
          </span>
          <span className="bg-[#E5F4E8] text-[#239B4C] px-2 py-0.5 rounded-full font-bold">
            {categoriesToDisplay.length} Varian Kemasan
          </span>
        </div>

        {/* Universal Horizontal Swipe Carousel (All Devices: Mobile, Tablet & Desktop) */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none scroll-smooth"
        >
          {categoriesToDisplay.map((cat, idx) => (
            <div
              key={cat.id || cat.name || idx}
              onClick={() => handleCategorySelect(cat.name)}
              className="w-[82vw] sm:w-[320px] md:w-[360px] lg:w-[380px] shrink-0 snap-start group cursor-pointer bg-white rounded-2xl p-5 border border-[#E5E8E2] hover:border-[#239B4C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#F2F4F0] mb-4 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                  {cat.count}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-base font-bold text-[#1D241B] group-hover:text-[#239B4C] transition">
                  <span>{cat.name}</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition text-gray-400 group-hover:text-[#239B4C]" />
                </div>
                <p className="text-xs text-gray-500 mt-1 font-light leading-relaxed">
                  {cat.titleIndo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
