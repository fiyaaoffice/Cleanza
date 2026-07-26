import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Lock, X, ShieldCheck } from 'lucide-react';

export const AdminPinModal: React.FC = () => {
  const { isPinModalOpen, setIsPinModalOpen, verifyAdminPin } = useStore();
  const [pinInput, setPinInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const isValid = verifyAdminPin(pinInput);
    if (isValid) {
      setPinInput('');
      setIsPinModalOpen(false);
    } else {
      setErrorMessage('PIN Admin tidak valid. Silakan coba lagi.');
      setPinInput('');
    }
  };

  const handleClose = () => {
    setIsPinModalOpen(false);
    setPinInput('');
    setErrorMessage('');
  };

  return (
    <AnimatePresence>
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 p-4 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="max-w-md w-full bg-[#0E2915] text-white rounded-3xl p-6 sm:p-8 border border-[#239B4C]/40 shadow-2xl relative z-10"
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-[#239B4C] rounded-2xl flex items-center justify-center text-[#FFD000] mb-4 shadow-lg">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-bold mb-1">
              Verifikasi PIN Admin
            </h3>
            <p className="text-xs text-gray-300 font-light mb-6">
              Masukkan kode PIN Keamanan untuk membuka Dashboard Pengelolaan Live CMS & Katalog Cleanza.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  PIN Admin
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Masukkan PIN"
                  maxLength={6}
                  autoFocus
                  className="w-full px-4 py-3 bg-[#12381C] border border-[#239B4C]/30 rounded-xl text-center text-2xl font-mono text-white tracking-widest focus:outline-none focus:border-[#FFD000] transition"
                />
              </div>

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-900/40 border border-red-500/50 rounded-xl text-xs text-red-300 text-center font-medium"
                >
                  {errorMessage}
                </motion.div>
              )}

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-1/3 py-3 rounded-xl border border-gray-700 text-xs font-bold text-gray-300 hover:bg-white/5 transition"
                >
                  Batal
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-2/3 py-3 bg-[#239B4C] hover:bg-[#165B2D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-2 shadow-lg"
                >
                  <ShieldCheck className="w-4 h-4 text-[#FFD000]" />
                  <span>Masuk Admin</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
