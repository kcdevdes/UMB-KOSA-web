'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';

import {Link, usePathname, useRouter} from '@/i18n';

const NAV_ITEMS = ['/', '/about', '/contact', 
  // '/story'
] as const;

type NavItem = (typeof NAV_ITEMS)[number];

const SiteHeader = () => {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: Array<{ href: NavItem; label: string }> = NAV_ITEMS.map((href) => ({
    href,
    label: t(`nav.${href === '/' ? 'home' : href.slice(1)}`),
  }));

  const languageLabels = {
    en: t('language.eng'),
    ko: t('language.kor'),
  } as const;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ko' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const languageButtonAriaLabel =
    locale === 'en'
      ? t('language.switchTo.kor')
      : t('language.switchTo.eng');

  return (
    <header>
      <div className="fixed top-0 left-0 right-0 z-50 mx-auto flex items-center justify-between px-4 py-2 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-white/70 supports-[backdrop-filter]:shadow-sm bg-white/90">
        <Link href={'/'} onClick={closeMenu} className="flex items-center space-x-2">
          <Image
            src="/images/kosa-logo-transparent.png"
            width={100}
            height={100}
            alt={'/images/no-image.jpg'}
            className="rounded-full w-12"
          />
          <p className="font-semibold">{t('brand')}</p>
        </Link>

        <nav className="hidden items-center space-x-4 md:flex">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-pressed={locale === 'en'}
              aria-label={languageButtonAriaLabel}
              className="rounded-full border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:border-blue-500 hover:text-blue-600"
            >
              {languageLabels[locale as keyof typeof languageLabels]}
            </button>
          </div>
        </nav>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 backdrop-blur-sm md:hidden">
          <div className="mx-auto flex max-w-sm flex-col space-y-4 px-4 py-6 text-center text-lg">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="rounded-3xl py-2 hover:bg-gray-100/80"
              >
                {label}
              </Link>
            ))}
            <div className="rounded-md py-2">
              <button
                type="button"
                onClick={() => {
                  toggleLanguage();
                  closeMenu();
                }}
                aria-pressed={locale === 'en'}
                aria-label={languageButtonAriaLabel}
                className="w-full rounded-full border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-blue-500 hover:text-blue-600"
              >
                {languageLabels[locale as keyof typeof languageLabels]}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
