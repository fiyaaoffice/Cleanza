import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Search, X, ShoppingBag } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, products, navigateTo, addToCart } = useStore();

  const results = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.volume.toLowerCase().includes(query)
    );
  });

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 p-4 sm:p-6 overflow-y-auto flex items-start justify-center pt-12 sm:pt-20">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 relative z-10"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-xl text-[#1D241B] mb-4">
              Pencarian Produk Cleanza
            </h3>

            {/* Input */}
            <div className="relative mb-6">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Jeruk Nipis, Lemon, 450ml, 1000ml, Cleanza Profesional 5L..."
                className="w-full pl-12 pr-4 py-3 bg-[#F2F9F3] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#239B4C] transition"
                autoFocus
              />
            </div>

            {/* Quick Search Tags */}
            <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 overflow-x-auto no-scrollbar">
              <span className="font-bold text-gray-700 shrink-0">Pencarian Populer:</span>
              {['Jeruk Nipis', 'Lemon', '450ml', '1000ml', '5000ml', 'Cleanza Profesional'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="bg-gray-100 hover:bg-[#239B4C] hover:text-white px-3 py-1 rounded-full transition shrink-0 font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search Results Grid */}
            <div className="max-h-[50vh] overflow-y-auto space-y-3 pr-2">
              {results.length === 0 ? (
                <p className="text-center py-8 text-sm text-gray-500">
                  Tidak ditemukan produk Cleanza untuk "{searchQuery}".
                </p>
              ) : (
                results.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      navigateTo('product-detail', p.slug || p.id);
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-[#239B4C] bg-[#F2F9F3] cursor-pointer transition shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-gray-100" />
                      <div>
                        <span className="text-[10px] font-bold text-[#239B4C] uppercase block">
                          {p.category} • {p.volume}
                        </span>
                        <h4 className="font-bold text-xs text-[#1D241B] line-clamp-1">{p.name}</h4>
                        <span className="text-xs font-bold text-gray-700">{p.formattedPrice}</span>
                      </div>
                    </div>

                    {p.badge !== 'COMING SOON' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p);
                        }}
                        className="p-2 bg-[#239B4C] text-white rounded-lg hover:bg-[#165B2D] transition shadow-sm"
                        title="Beli"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
