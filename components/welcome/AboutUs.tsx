'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function AboutUs() {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="relative w-full h-[80vh] bg-gray-100 flex flex-col justify-center items-center z-10"
      initial={{ opacity: 0, y: -50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 items-center">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.p
            className="mt-2 text-4xl font-Shilla tracking-tight text-pretty text-korean-black sm:text-5xl lg:text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {t('home.aboutUs.title')}
          </motion.p>
        </div>
        <motion.div
          className="md:text-xl lg:text-2xl text-gray-500 mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl lg:text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <span className="text-korean-blue font-bold">
            {t('home.aboutUs.kosaKo')}
          </span>
          <span className="text-korean-red font-bold">
            {t('home.aboutUs.kosaSa')}
          </span>{' '}
          {t('home.aboutUs.description')}
          <motion.span
            className="text-korean-black font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            {t('home.aboutUs.highlight')}
          </motion.span>{' '}
          {t('home.aboutUs.closing')}
        </motion.div>
      </div>
    </motion.div>
  );
}
