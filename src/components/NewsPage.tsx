import React from 'react';
import { useStore } from '../context/StoreContext';
import { Calendar, ArrowUpRight } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { news, cmsConfig } = useStore();

  return (
    <div className="bg-[#F2F9F3] min-h-screen py-12 text-[#1D241B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#239B4C] mb-2 block">
          Kabar & Tips Cleanza Dapur
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D241B] mb-8">
          News, Updates & Kitchen Care Guides
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <img src={cmsConfig.newsImages?.[item.id] || item.image} alt={item.title} className="w-full aspect-video object-cover" />
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#239B4C]" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-xs text-gray-600 font-light leading-relaxed line-clamp-3">
                    {item.content || item.excerpt}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <span className="text-xs font-bold text-[#239B4C] flex items-center space-x-1">
                  <span>Baca Selengkapnya</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
