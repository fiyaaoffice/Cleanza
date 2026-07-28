import React from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

interface CategoryItem {
  name: string;
  titleIndo: string;
  image: string;
  count: string;
}

export const CategoryShowcase: React.FC = () => {
  const { navigateTo, setSelectedCategory, language, cmsConfig } = useStore();

  const categories: CategoryItem[] = [
    {
      name: 'Kemasan Rumah Tangga',
      titleIndo: 'Refill 450ml & Botol 1000ml',
      image: cmsConfig.categoryImages?.['Kemasan Rumah Tangga'] || 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&q=80&w=600',
      count: '2 Produk'
    },
    {
      name: 'Cleanza Profesional',
      titleIndo: 'Jeriken 5000ml (5 Liter)',
      image: cmsConfig.categoryImages?.['Cleanza Profesional'] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
      count: '1 Produk'
    },
    {
      name: 'Varian Lemon',
      titleIndo: 'Ekstra Citrus Lemon (Coming Soon)',
      image: cmsConfig.categoryImages?.['Varian Lemon'] || 'https://images.unsplash.com/photo-1534531141161-e41d133a4be3?auto=format&fit=crop&q=80&w=600',
      count: 'Coming Soon'
    }
  ];

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    navigateTo('shop');
  };

  return (
    <section className="py-16 bg-[#F2F9F3] border-b border-[#E5E8E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E5E8E2]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1D241B] tracking-tight">
              {language === 'ID'
                ? 'Pilihan Kemasan Cleanza Pencuci Piring'
                : 'Cleanza Product Lineup'}
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-xl font-light">
              {language === 'ID'
                ? 'Tersedia ukuran konsumsi harian keluarga hingga ukuran ekonomis 5000ml untuk usaha kuliner.'
                : 'From everyday family refills to 5000ml bulk jugs for catering and restaurants.'}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              navigateTo('shop');
            }}
            className="mt-4 sm:mt-0 inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-[#239B4C] hover:text-[#165B2D] underline decoration-1 underline-offset-4 transition"
          >
            <span>{language === 'ID' ? 'Lihat Semua Produk Cleanza' : 'View All Cleanza Products'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategorySelect(cat.name)}
              className="group cursor-pointer bg-white rounded-2xl p-5 border border-[#E5E8E2] hover:border-[#239B4C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#F2F4F0] mb-4 relative">
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
                <p className="text-xs text-gray-500 mt-1 font-light">
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
