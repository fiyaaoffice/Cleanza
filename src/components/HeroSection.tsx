import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { cmsConfig, navigateTo } = useStore();
  const { hero } = cmsConfig;

  return (
    <section className="relative w-full min-h-[560px] md:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#1E251B] text-white">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {hero.mediaType === 'video' ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
          >
            <source src={hero.mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <motion.img
            initial={{ scale: 1.15, opacity: 0.4 }}
            animate={{ scale: 1.05, opacity: 0.65 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src={hero.mediaUrl}
            alt="Cleanza Dishwashing Hero"
            className="w-full h-full object-cover object-center"
          />
        )}
        {/* Soft Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2017] via-transparent to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col items-start justify-center">
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs text-gray-200 mb-6"
        >
          <span className="font-semibold tracking-wider uppercase text-[11px]">
            Cleanza Ultra Degreaser Technology
          </span>
        </motion.div>

        {/* Main Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.1] mb-6 drop-shadow-md"
        >
          {hero.tagline}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-gray-200 max-w-2xl font-light leading-relaxed mb-8"
        >
          {hero.subtext}
        </motion.p>

        {/* Floating Badge */}
        {hero.badgeText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 max-w-md shadow-2xl flex items-center space-x-4"
          >
            <div className="bg-[#239B4C] text-white p-2.5 rounded-lg border border-[#FFD000]/30 shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#FFD000]" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FFD000]">
                Formula Teruji Higienis
              </p>
              <p className="text-xs text-gray-200 font-medium mt-0.5">
                {hero.badgeText}
              </p>
            </div>
          </motion.div>
        )}

        {/* CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigateTo('shop')}
            className="bg-[#239B4C] hover:bg-[#165B2D] text-white hover:text-[#FFD000] px-7 py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest transition shadow-lg flex items-center space-x-2 border border-[#32BE5B]/40 group"
          >
            <span>{hero.primaryCtaText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigateTo('community')}
            className="bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest backdrop-blur-sm border border-white/30 transition"
          >
            {hero.secondaryCtaText}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
