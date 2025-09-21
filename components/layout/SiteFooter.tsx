'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

const SiteFooter = () => {
  const t = useTranslations('common');

  return (
    <footer className="w-full border-t bg-white text-gray-600 body-font">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-5 py-8 text-center sm:flex-row sm:text-left">
        <div className="title-font flex items-center justify-center font-medium text-gray-900 sm:justify-start">
          <Image
            src="/images/kosa-logo-transparent.png"
            width={100}
            height={100}
            alt="KOSA logo"
            className="rounded-full w-10"
          />
          <span className="ml-3 text-xl">{t('brand')}</span>
        </div>
        <p className="text-sm text-gray-500 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
