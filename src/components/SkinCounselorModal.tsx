import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle, ArrowRight, Calculator } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const SkinCounselorModal: React.FC = () => {
  const { isSkinQuizOpen, setIsSkinQuizOpen, products, navigateTo } = useStore();

  const [step, setStep] = useState(1);
  const [kitchenScale, setKitchenScale] = useState<string>('Rumah Tangga');
  const [greaseType, setGreaseType] = useState<string>('Minyak Membandel');
  const [scentPref, setScentPref] = useState<string>('Jeruk Nipis');

  const handleFinishQuiz = () => {
    setStep(4);
  };

  // Filter recommended products based on answers
  const recommended = products.filter((p) => {
    if (kitchenScale === 'Usaha Resto') return p.category === 'Cleanza Profesional' || p.volume === '5000ml';
    if (scentPref === 'Lemon') return p.category === 'Varian Lemon';
    return p.category === 'Kemasan Rumah Tangga' || p.volume === '450ml' || p.volume === '1000ml';
  }).slice(0, 3);

  return (
    <AnimatePresence>
      {isSkinQuizOpen && (
        <div className="fixed inset-0 z-50 p-4 sm:p-6 overflow-y-auto flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsSkinQuizOpen(false)}
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="max-w-2xl w-full bg-[#0E2915] text-white rounded-3xl p-6 sm:p-8 border border-[#239B4C]/40 shadow-2xl relative z-10"
          >
            <button
              onClick={() => setIsSkinQuizOpen(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-[#FFD000] text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4 text-[#FFD000]" />
              <span>Kalkulator Kebutuhan Cleanza Dapur</span>
            </div>

            {step < 4 ? (
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Langkah {step} dari 3: Analisis Kebutuhan Cuci Piring Anda
                </h3>
                <div className="w-full bg-gray-800 h-1.5 rounded-full mb-6 overflow-hidden">
                  <motion.div
                    className="bg-[#239B4C] h-full"
                    initial={{ width: `${((step - 1) / 3) * 100}%` }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {step === 1 && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-300 font-light">
                      Berapa skala kebutuhan pencucian piring di tempat Anda setiap harinya?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'Rumah Tangga', label: 'Rumah Tangga (1-4 Orang)', desc: 'Penggunaan harian standar keluarga kecil/sedang' },
                        { id: 'Keluarga Besar', label: 'Keluarga Besar (5+ Orang)', desc: 'Pencucian piring dan peralatan masak rutin intensif' },
                        { id: 'Usaha Resto', label: 'Restoran / Katering / Kafe', desc: 'Dapur komersial & usaha kuliner profesional' },
                        { id: 'Kantor', label: 'Pantry Kantor / Instansi', desc: 'Penggunaan bersama seluruh staf dan tamu' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setKitchenScale(opt.id)}
                          className={`p-4 rounded-xl border text-left transition ${
                            kitchenScale === opt.id
                              ? 'bg-[#239B4C] border-[#FFD000] text-white'
                              : 'bg-[#122A19] border-gray-800 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          <h5 className="font-bold text-sm text-[#FFD000]">{opt.label}</h5>
                          <p className="text-xs text-gray-300 font-light mt-0.5">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-300 font-light">
                      Tantangan noda dapur atau bau amis yang paling sering Anda hadapi?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'Minyak Membandel', label: 'Minyak Goreng & Bumbu Pekat', desc: 'Gulai, rendang, wajan dan peralatan panggangan' },
                        { id: 'Bau Amis', label: 'Bau Amis Telur & Ikan/Daging', desc: 'Menghilangkan aroma amis menyengat dari piring & wadah' },
                        { id: 'Plastik Licin', label: 'Wadah Plastik & Tupperware', desc: 'Minyak yang menempel lama pada bahan plastik' },
                        { id: 'Panci Gosong', label: 'Kerak Lemak Masakan', desc: 'Lemak pekat yang perlu dilarutkan cepat' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setGreaseType(opt.id)}
                          className={`p-4 rounded-xl border text-left transition ${
                            greaseType === opt.id
                              ? 'bg-[#239B4C] border-[#FFD000] text-white'
                              : 'bg-[#122A19] border-gray-800 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          <h5 className="font-bold text-sm text-[#FFD000]">{opt.label}</h5>
                          <p className="text-xs text-gray-300 font-light mt-0.5">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-300 font-light">
                      Pilih varian kesegaran aroma alami favorit Anda:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'Jeruk Nipis', label: 'Jeruk Nipis Alami (Ready)', desc: 'Formula kesegaran alami klasik paling ampuh' },
                        { id: 'Lemon', label: 'Lemon Mediterania (Coming Soon)', desc: 'Keharuman citrus segar berdaya angkat lemak pekat' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setScentPref(opt.id)}
                          className={`p-4 rounded-xl border text-left transition ${
                            scentPref === opt.id
                              ? 'bg-[#239B4C] border-[#FFD000] text-white'
                              : 'bg-[#122A19] border-gray-800 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          <h5 className="font-bold text-sm text-[#FFD000]">{opt.label}</h5>
                          <p className="text-xs text-gray-300 font-light mt-0.5">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-800">
                  {step > 1 ? (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      Kembali
                    </button>
                  ) : <div />}

                  {step < 3 ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(step + 1)}
                      className="bg-[#239B4C] hover:bg-[#165B2D] text-white font-bold text-xs uppercase px-6 py-3 rounded-lg flex items-center space-x-1"
                    >
                      <span>Lanjut</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleFinishQuiz}
                      className="bg-[#239B4C] hover:bg-[#165B2D] text-white font-bold text-xs uppercase px-6 py-3 rounded-lg flex items-center space-x-1"
                    >
                      <span>Lihat Rekomendasi Cleanza</span>
                      <Calculator className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>
            ) : (
              /* Results View */
              <div>
                <div className="bg-[#122A19] p-4 rounded-2xl border border-[#239B4C]/40 mb-6 flex items-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-[#28A745] shrink-0" />
                  <div>
                    <h4 className="font-bold text-base text-white">
                      Rekomendasi Paket Cleanza Dapur Anda
                    </h4>
                    <p className="text-xs text-gray-300 font-light">
                      Kebutuhan: <span className="font-bold text-[#FFD000]">{kitchenScale}</span> • Masalah: <span className="font-bold text-[#FFD000]">{greaseType}</span> • Aroma: <span className="font-bold text-[#FFD000]">{scentPref}</span>
                    </p>
                  </div>
                </div>

                <h4 className="font-bold text-sm text-gray-200 mb-4 uppercase tracking-wider">
                  Produk Cleanza Paling Tepat Untuk Anda:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-gray-900">
                  {recommended.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsSkinQuizOpen(false);
                      navigateTo('shop');
                    }}
                    className="bg-[#239B4C] hover:bg-[#165B2D] text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-lg transition"
                  >
                    Lihat Katalog Selengkapnya
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
