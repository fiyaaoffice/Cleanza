import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight, Calendar, X } from 'lucide-react';
import { NewsArticle } from '../types';

export const NewsSection: React.FC = () => {
  const { news, navigateTo, language } = useStore();
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);

  return (
    <section className="py-16 bg-[#F2F9F3] border-b border-[#E5E8E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E8E2]">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1D241B] tracking-tight">
            {language === 'ID' ? 'Kabar & Tips Dapur Cleanza' : 'Cleanza News & Tips'}
          </h2>
          <button
            onClick={() => navigateTo('news')}
            className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-[#239B4C] hover:text-[#165B2D] underline underline-offset-4 transition"
          >
            <span>{language === 'ID' ? 'Lihat Semua' : 'View All'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#E5E8E2] hover:border-[#239B4C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] w-full bg-gray-100 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#239B4C] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#239B4C]" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-bold text-base text-[#1D241B] group-hover:text-[#239B4C] transition line-clamp-2 leading-snug mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-2 font-light leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <span className="inline-flex items-center space-x-1 text-xs font-bold text-[#239B4C] group-hover:underline">
                  <span>Baca Selengkapnya</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Article Reader Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative border border-gray-200 shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-[#239B4C] bg-[#F2F9F3] px-3 py-1 rounded-full border border-[#239B4C]/20">
              {selectedNews.category}
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#1D241B] mt-4 mb-2">
              {selectedNews.title}
            </h2>

            <div className="flex items-center space-x-2 text-xs text-gray-400 mb-6">
              <Calendar className="w-4 h-4 text-[#239B4C]" />
              <span>{selectedNews.date}</span>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-6">
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-gray-700 leading-relaxed space-y-4 font-light">
              {selectedNews.content}
            </p>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="bg-[#239B4C] hover:bg-[#165B2D] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
