import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ChevronDown, ChevronUp, ShieldCheck, Truck, RotateCcw, Plus, Minus, PackageCheck } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { products, selectedProductSlug, addToCart, navigateTo, language } = useStore();

  // Find selected product with resilient matching
  const findSelectedProduct = () => {
    if (!selectedProductSlug) return products[0];

    const target = selectedProductSlug.trim();
    const normTarget = target.toLowerCase().replace(/[^a-z0-9]/g, '');

    // 1. Direct exact slug or ID match
    let found = products.find(
      (p) => p.slug === target || p.id === target || (p.name && p.name === target)
    );
    if (found) return found;

    // 2. Normalized slug or ID or Name match
    found = products.find(
      (p) =>
        (p.slug && p.slug.toLowerCase().replace(/[^a-z0-9]/g, '') === normTarget) ||
        (p.id && p.id.toLowerCase().replace(/[^a-z0-9]/g, '') === normTarget) ||
        (p.name && p.name.toLowerCase().replace(/[^a-z0-9]/g, '') === normTarget)
    );
    if (found) return found;

    // 3. Check Volume/Size tokens FIRST before fuzzy string matching!
    const is5L =
      normTarget.includes('5000ml') ||
      normTarget.includes('5liter') ||
      normTarget.includes('5l') ||
      normTarget.includes('jeriken5') ||
      normTarget.includes('profesional');

    const is1L =
      normTarget.includes('1000ml') ||
      normTarget.includes('1liter') ||
      normTarget.includes('1l');

    const is450 = normTarget.includes('450ml') || normTarget.includes('450');

    if (is5L) {
      found = products.find(
        (p) =>
          p.volume === '5000ml' ||
          (p.name && (p.name.toLowerCase().includes('5 liter') || p.name.toLowerCase().includes('5000ml') || p.name.toLowerCase().includes('5l'))) ||
          (p.id && p.id.includes('5000ml')) ||
          (p.slug && p.slug.includes('5000ml'))
      );
      if (found) return found;
    }

    if (is1L) {
      found = products.find(
        (p) =>
          p.volume === '1000ml' ||
          (p.name && (p.name.toLowerCase().includes('1000ml') || p.name.toLowerCase().includes('1 liter'))) ||
          (p.id && p.id.includes('1000ml')) ||
          (p.slug && p.slug.includes('1000ml'))
      );
      if (found) return found;
    }

    if (is450) {
      found = products.find(
        (p) =>
          p.volume === '450ml' ||
          (p.name && p.name.toLowerCase().includes('450ml')) ||
          (p.id && p.id.includes('450ml')) ||
          (p.slug && p.slug.includes('450ml'))
      );
      if (found) return found;
    }

    // 4. Fallback partial matching with volume guard
    found = products.find((p) => {
      const pNormSlug = p.slug ? p.slug.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
      const pNormId = p.id ? p.id.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

      if (is5L && (p.volume === '450ml' || p.volume === '1000ml')) return false;
      if (is1L && (p.volume === '450ml' || p.volume === '5000ml')) return false;
      if (is450 && (p.volume === '1000ml' || p.volume === '5000ml')) return false;

      return (
        (pNormSlug && (normTarget.includes(pNormSlug) || pNormSlug.includes(normTarget))) ||
        (pNormId && (normTarget.includes(pNormId) || pNormId.includes(normTarget)))
      );
    });
    if (found) return found;

    return products.find((p) => p.volume === '5000ml') || products[0];
  };

  const product = findSelectedProduct();

  const [activeImage, setActiveImage] = useState<string>(product?.image || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [openAccordion, setOpenAccordion] = useState<'description' | 'benefits' | null>('description');

  // Reset active image, quantity and scroll to top whenever selected product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product?.id, product?.slug, product?.image]);

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product?.id)
    .slice(0, 4);

  const images = product?.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : product?.image ? [product.image] : [];

  const displayImage = activeImage && images.includes(activeImage) ? activeImage : (product?.image || '');

  return (
    <div className="bg-[#F2F9F3] min-h-screen py-8 text-[#1D241B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-gray-500 mb-8 flex items-center space-x-2">
          <span
            onClick={() => navigateTo('home')}
            className="hover:text-[#239B4C] cursor-pointer transition"
          >
            Home
          </span>
          <span>/</span>
          <span
            onClick={() => navigateTo('shop')}
            className="hover:text-[#239B4C] cursor-pointer transition"
          >
            Shop
          </span>
          <span>/</span>
          <span className="font-semibold text-gray-900 truncate">
            {product.name}
          </span>
        </nav>

        {/* Product Detail 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E8E2] shadow-sm mb-16">
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-4">
            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar justify-center md:justify-start">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-square w-16 rounded-xl overflow-hidden border-2 transition ${
                      activeImage === img
                        ? 'border-[#239B4C] ring-2 ring-[#239B4C]/20'
                        : 'border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Product Image */}
            <div className="flex-1 aspect-square rounded-2xl bg-white overflow-hidden relative flex items-center justify-center p-6 border border-gray-100">
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-sm text-white shadow-sm ${
                    product.badge === 'NEW PRODUCT'
                      ? 'bg-[#239B4C]'
                      : product.badge === 'COMING SOON'
                      ? 'bg-amber-600'
                      : 'bg-black'
                  }`}
                >
                  {product.badge}
                </span>
              )}

              <img
                src={displayImage}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Detail Information (7 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category */}
              <span className="text-xs font-bold uppercase tracking-widest text-[#239B4C] mb-2 block">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1D241B] tracking-tight leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating & Volume */}
              <div className="flex items-center space-x-4 mb-4 text-xs">
                <div className="flex items-center space-x-1.5 font-bold text-[#239B4C] bg-[#F2F9F3] px-2.5 py-1 rounded-md border border-[#239B4C]/20">
                  <PackageCheck className="w-4 h-4 text-[#239B4C]" />
                  <span>Stok Tersedia: {product.stock !== undefined ? product.stock : 100} unit</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">Volume: {product.volume}</span>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-[#239B4C] mb-6">
                {product.formattedPrice}
              </div>


              {/* Quantity & Buy Now Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                {product.badge === 'COMING SOON' ? (
                  <div className="w-full bg-amber-600 text-white font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-lg shadow-md text-center">
                    VARIUAN COMING SOON - SEGERA HADIR
                  </div>
                ) : (
                  <>
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 w-32 bg-gray-50">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-sm px-2">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* BUY NOW Button */}
                    <button
                      onClick={() => addToCart(product, quantity)}
                      className="flex-1 bg-[#239B4C] hover:bg-[#165B2D] text-white font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-lg shadow-md transition transform active:scale-[0.99] flex items-center justify-center space-x-2"
                    >
                      <span>TAMBAH KE KERANJANG</span>
                    </button>
                  </>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-100 text-[11px] text-gray-600 mb-6">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#239B4C] shrink-0" />
                  <span>100% Cleanza Original</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-[#239B4C] shrink-0" />
                  <span>Pengiriman Aman & Cepat</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4 text-[#239B4C] shrink-0" />
                  <span>Garansi Kualitas Cleanza</span>
                </div>
              </div>

              {/* Interactive Accordions */}
              <div className="space-y-3">
                <div className="border-b border-gray-200 pb-3">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'description' ? null : 'description')}
                    className="w-full flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-[#1D241B] py-2 hover:text-[#239B4C] transition"
                  >
                    <span>DESKRIPSI</span>
                    {openAccordion === 'description' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'description' && (
                    <div className="text-xs text-gray-600 pt-2 font-light leading-relaxed whitespace-pre-line animate-in fade-in duration-200">
                      {product.description}
                    </div>
                  )}
                </div>

                {product.benefits && product.benefits.length > 0 && (
                  <div className="border-b border-gray-200 pb-3">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === 'benefits' ? null : 'benefits')}
                      className="w-full flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-[#1D241B] py-2 hover:text-[#239B4C] transition"
                    >
                      <span>KEUNGGULAN UTAMA</span>
                      {openAccordion === 'benefits' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {openAccordion === 'benefits' && (
                      <ul className="text-xs text-gray-600 pt-2 font-light leading-relaxed space-y-1 list-disc list-inside animate-in fade-in duration-200">
                        {product.benefits.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Claims Bar */}
        {product.claims && product.claims.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#E5E8E2] p-8 mb-16 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {product.claims.map((claim, idx) => (
                <div key={idx} className="pt-4 md:pt-0 md:px-4">
                  <p className="font-bold text-lg text-[#1D241B]">
                    {claim}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#1D241B] mb-6">
            Rekomendasi Produk Cleanza Lainnya
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
