import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Eye, PackageCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart } = useStore();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group bg-white rounded-2xl border border-[#E5E8E2] hover:border-[#239B4C]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden p-3 sm:p-4 h-full"
    >
      {/* Upper image container */}
      <div className="relative aspect-square w-full rounded-xl bg-[#F2F9F3] overflow-hidden mb-3 sm:mb-4 flex items-center justify-center">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
            <span
              className={`text-[8px] sm:text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded text-white shadow-sm ${
                product.badge === 'NEW PRODUCT'
                  ? 'bg-[#239B4C]'
                  : product.badge === 'COMING SOON'
                  ? 'bg-amber-600'
                  : 'bg-[#165B2D]'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 sm:space-x-3 backdrop-blur-[2px]">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              navigateTo('product-detail', product.slug);
            }}
            className="p-2.5 sm:p-3 bg-white text-gray-900 rounded-full hover:bg-[#239B4C] hover:text-white transition shadow-lg"
            title="Lihat Detail Produk"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.button>
          {product.badge !== 'COMING SOON' && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="p-2.5 sm:p-3 bg-[#239B4C] text-white rounded-full hover:bg-[#165B2D] transition shadow-lg"
              title="Tambah ke Keranjang"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Info Container */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[#239B4C] truncate max-w-[90px] sm:max-w-none">
              {product.category}
            </span>
            <div className="flex items-center space-x-1 text-gray-600 font-medium shrink-0 bg-[#F2F9F3] px-1.5 py-0.5 rounded text-[10px] sm:text-xs border border-[#239B4C]/20">
              <PackageCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#239B4C]" />
              <span className="text-[10px] sm:text-xs font-semibold text-[#165B2D]">Stok: {product.stock !== undefined ? product.stock : 100}</span>
            </div>
          </div>

          <h3
            onClick={() => navigateTo('product-detail', product.slug)}
            className="font-bold text-xs sm:text-sm text-[#1D241B] hover:text-[#239B4C] cursor-pointer line-clamp-2 transition leading-snug mb-1.5"
          >
            {product.name}
          </h3>

          <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500 mb-2.5 gap-1">
            <span className="font-semibold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] sm:text-xs truncate">{product.volume}</span>
            <span className="font-bold text-xs sm:text-sm text-[#1D241B] shrink-0">
              {product.formattedPrice}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
          {product.badge === 'COMING SOON' ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('product-detail', product.slug)}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider py-2 sm:py-2.5 px-2 rounded-lg transition shadow-sm flex items-center justify-center"
            >
              <span>COMING SOON</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('product-detail', product.slug)}
              className="w-full bg-[#239B4C] hover:bg-[#165B2D] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider py-2 sm:py-2.5 px-2 rounded-lg transition shadow-sm flex items-center justify-center"
            >
              <span>LIHAT DETAIL</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
