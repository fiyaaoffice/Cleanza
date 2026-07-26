import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Eye, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart } = useStore();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group bg-white rounded-2xl border border-[#E5E8E2] hover:border-[#239B4C]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden p-4 h-full"
    >
      {/* Upper image container */}
      <div className="relative aspect-square w-full rounded-xl bg-[#F2F9F3] overflow-hidden mb-4 flex items-center justify-center">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm text-white shadow-sm ${
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
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 backdrop-blur-[2px]">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              navigateTo('product-detail', product.slug);
            }}
            className="p-3 bg-white text-gray-900 rounded-full hover:bg-[#239B4C] hover:text-white transition shadow-lg"
            title="Lihat Detail Produk"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
          {product.badge !== 'COMING SOON' && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="p-3 bg-[#239B4C] text-white rounded-full hover:bg-[#165B2D] transition shadow-lg"
              title="Tambah ke Keranjang"
            >
              <ShoppingBag className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Info Container */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[#239B4C]">
              {product.category}
            </span>
            <div className="flex items-center space-x-1 text-gray-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#239B4C]" />
              <span>{product.reviewsCount > 0 ? `${product.reviewsCount} Ulasan` : 'Segera Hadir'}</span>
            </div>
          </div>

          <h3
            onClick={() => navigateTo('product-detail', product.slug)}
            className="font-bold text-sm text-[#1D241B] hover:text-[#239B4C] cursor-pointer line-clamp-2 transition leading-tight mb-1"
          >
            {product.name}
          </h3>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{product.volume}</span>
            <span className="font-bold text-sm text-[#1D241B]">
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
              className="w-full bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-3 rounded-lg transition shadow-sm flex items-center justify-center space-x-1"
            >
              <span>COMING SOON</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('product-detail', product.slug)}
              className="w-full bg-[#239B4C] hover:bg-[#165B2D] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-3 rounded-lg transition shadow-sm flex items-center justify-center space-x-1"
            >
              <span>LIHAT DETAIL</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
