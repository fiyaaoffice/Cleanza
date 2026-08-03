import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, clearCart, cmsConfig } = useStore();
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const formattedSubtotal = `Rp${subtotal.toLocaleString('id-ID')}`;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const rawPhone = cmsConfig?.contact?.whatsapp || '+62 823-1141-0313';
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
    const targetPhone = cleanPhone.length > 0 ? cleanPhone : '6282311410313';

    let message = `*HALO CLEANZA, SAYA INGIN MEMESAN PRODUK:* \n\n`;
    cart.forEach((item, index) => {
      const itemSubtotal = item.product.price * item.quantity;
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   • Ukuran: ${item.product.volume}\n`;
      message += `   • Jumlah: ${item.quantity} x ${item.product.formattedPrice} = Rp${itemSubtotal.toLocaleString('id-ID')}\n\n`;
    });
    message += `*TOTAL PEMBAYARAN:* Rp${subtotal.toLocaleString('id-ID')}\n\n`;
    message += `Mohon informasi ketersediaan stok dan rekening pembayaran. Terima kasih!`;

    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;

    window.open(waUrl, '_blank');

    setIsCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setIsCheckoutSuccess(false);
      setIsCartOpen(false);
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-gray-100 relative z-10"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#F2F9F3]">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#239B4C]" />
                  <h2 className="font-bold text-lg text-[#1D241B]">
                    Keranjang Belanja ({cart.reduce((a, b) => a + b.quantity, 0)})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Item List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {isCheckoutSuccess ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#239B4C] mx-auto animate-bounce" />
                    <h3 className="text-2xl font-bold text-[#1D241B]">
                      Pesanan Terkirim ke WhatsApp!
                    </h3>
                    <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                      Terima kasih telah berbelanja produk Cleanza. Rincian pesanan Anda telah dibuka di aplikasi WhatsApp ke nomor penjual (+62 823-1141-0313).
                    </p>
                  </motion.div>
                ) : cart.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="font-semibold text-sm text-gray-700">Keranjang Anda masih kosong</p>
                    <p className="text-xs text-gray-400 mt-1">Jelajahi produk cairan pencuci piring Cleanza sekarang.</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, height: 0, y: 10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center space-x-4 p-3 bg-[#F2F9F3] rounded-xl border border-gray-100 overflow-hidden"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-contain bg-white rounded-lg p-1 border border-gray-100 shrink-0"
                        />

                        <div className="flex-1">
                          <h4 className="font-bold text-xs text-[#1D241B] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] text-gray-500 font-medium">
                            {item.product.volume}
                          </span>
                          <div className="font-bold text-xs text-[#239B4C] mt-1">
                            {item.product.formattedPrice}
                          </div>

                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 border rounded hover:bg-gray-200 text-gray-600 transition"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-1">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 border rounded hover:bg-gray-200 text-gray-600 transition"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer Subtotal & Checkout */}
              {!isCheckoutSuccess && cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-[#F2F9F3] space-y-4">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-base text-[#239B4C] font-bold">{formattedSubtotal}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Pajak dan biaya pengiriman dihitung saat checkout.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-[#239B4C] hover:bg-[#165B2D] text-white font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded-lg shadow-md transition flex items-center justify-center space-x-2"
                  >
                    <span>KIRIM PESANAN KE PENJUAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
