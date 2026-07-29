import React, { useRef, useState, useEffect } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(0);

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

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const children = container.children;
      if (children.length > 0) {
        const scrollLeft = container.scrollLeft;
        let closestIndex = 0;
        let minDistance = Infinity;
        Array.from(children).forEach((child, idx) => {
          const childElement = child as HTMLElement;
          const distance = Math.abs(childElement.offsetLeft - container.offsetLeft - scrollLeft);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = idx;
          }
        });
        setActiveIndex(closestIndex);
      }
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const targetIndex = Math.max(0, Math.min(index, categoriesToDisplay.length - 1));
      const container = scrollRef.current;
      const children = container.children;
      if (children[targetIndex]) {
        const child = children[targetIndex] as HTMLElement;
        container.scrollTo({
          left: child.offsetLeft - container.offsetLeft,
          behavior: 'smooth'
        });
        setActiveIndex(targetIndex);
      }
    }
  };

  return (
    <section className="py-14 bg-[#F2F9F3] border-b border-[#E5E8E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hint Bar & Total Count */}
        <div className="flex items-center justify-between mb-4 text-xs font-semibold">
          <div className="flex items-center space-x-2 text-[#239B4C]">
            <span>Swipe / Geser ke samping untuk melihat varian kemasan</span>
            <span className="text-sm">➔</span>
          </div>
          <span className="bg-[#E5F4E8] text-[#239B4C] px-3 py-1 rounded-full font-bold shadow-sm">
            {categoriesToDisplay.length} Varian Kemasan
          </span>
        </div>

        {/* Carousel Outer Relative Container */}
        <div className="relative group/carousel">
          {/* Floating Left Arrow Button */}
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className={`absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-gray-800 shadow-xl border border-gray-100 flex items-center justify-center transition duration-200 ${
              activeIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#239B4C] hover:text-white hover:scale-105'
            }`}
            title="Kemasan Sebelumnya"
            aria-label="Previous category"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Floating Right Arrow Button */}
          <button
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === categoriesToDisplay.length - 1}
            className={`absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-gray-800 shadow-xl border border-gray-100 flex items-center justify-center transition duration-200 ${
              activeIndex === categoriesToDisplay.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#239B4C] hover:text-white hover:scale-105'
            }`}
            title="Kemasan Selanjutnya"
            aria-label="Next category"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Horizontal Scroll Track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-5 sm:gap-6 pb-6 pt-1 px-1 scrollbar-none scroll-smooth"
          >
            {categoriesToDisplay.map((cat, idx) => (
              <div
                key={cat.id || cat.name || idx}
                onClick={() => handleCategorySelect(cat.name)}
                className="w-[85vw] sm:w-[320px] md:w-[350px] lg:w-[370px] shrink-0 snap-start group/card cursor-pointer bg-white rounded-2xl p-5 border border-[#E5E8E2] hover:border-[#239B4C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Canvas */}
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#F2F4F0] mb-4 relative border border-gray-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-bold shadow">
                    {cat.count}
                  </div>
                </div>

                {/* Content Details */}
                <div>
                  <div className="flex items-center justify-between text-base font-bold text-[#1D241B] group-hover/card:text-[#239B4C] transition">
                    <span>{cat.name}</span>
                    <ChevronRight className="w-5 h-5 group-hover/card:translate-x-1 transition text-gray-400 group-hover/card:text-[#239B4C]" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-light leading-relaxed">
                    {cat.titleIndo}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Indicators (Dots) */}
          <div className="flex items-center justify-center space-x-2 mt-2">
            {categoriesToDisplay.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollTo(dotIdx)}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === dotIdx
                    ? 'w-3 h-3 bg-[#239B4C]'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                title={`Ke slide ${dotIdx + 1}`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

