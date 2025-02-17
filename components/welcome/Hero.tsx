'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations();

  return (
    <div className="relative h-screen w-full z-0">
      <div className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-[url('/images/temple-bell.jpg')] opacity-100"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-[#005A8B] via-[#FFFFFF] to-[#B82647] opacity-50"></div>

      <motion.div
        className="relative w-full flex justify-center items-center h-screen flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: 'circIn',
        }}
      >
        <h1
          className="text-[6em] lg:text-[15em] text-white font-normal font-sans"
          style={{ textShadow: '4px 4px 10px rgba(0, 0, 0, 0.8)' }}
        >
          {t('home.hero.title')}
        </h1>

        <h1
          className="text-xl lg:text-[3em] text-white font-Shilla"
          style={{ textShadow: '4px 4px 10px rgba(0, 0, 0, 0.8)' }}
        >
          {t('home.hero.subtitle')}
        </h1>
      </motion.div>
    </div>
  );
}
